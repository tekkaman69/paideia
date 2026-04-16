'use server'

import { revalidatePath } from 'next/cache'
import { createModulesClient } from '@/lib/supabase/server'
import { getCurrentProfile } from '@/lib/auth/server'

export async function markLessonRead(moduleId: string, moduleSlug: string) {
  const supabase = await createModulesClient()
  const profile  = await getCurrentProfile()
  if (!profile) return

  const prog = await getOrCreateProgress(supabase, profile.id, moduleId)
  if (!prog || (prog as any).lesson_read) return

  await supabase
    .from('profile_module_progress')
    .update({ lesson_read: true, lesson_read_at: new Date().toISOString() })
    .eq('profile_id', profile.id)
    .eq('module_id', moduleId)

  revalidatePath(`/app/parent/modules/${moduleSlug}`)
}

type Supabase = Awaited<ReturnType<typeof createModulesClient>>

// ── Helpers ───────────────────────────────────────────────────────────────

async function getOrCreateProgress(supabase: Supabase, profileId: string, moduleId: string) {
  const { data: existing } = await supabase
    .from('profile_module_progress')
    .select('*')
    .eq('profile_id', profileId)
    .eq('module_id', moduleId)
    .maybeSingle()

  if (existing) return existing

  const { data: created } = await supabase
    .from('profile_module_progress')
    .insert({
      profile_id: profileId,
      module_id:  moduleId,
      status:     'in_progress',
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  return created
}

async function awardXp(supabase: Supabase, profileId: string, points: number, eventType: string, description: string, referenceId: string) {
  await supabase.rpc('award_profile_xp', {
    p_profile_id:   profileId,
    p_points:       points,
    p_event_type:   eventType,
    p_description:  description,
    p_reference_id: referenceId,
  })
}

async function checkAndCompleteModule(supabase: Supabase, profileId: string, moduleId: string, moduleSlug: string) {
  const { data: prog } = await supabase
    .from('profile_module_progress')
    .select('*, module:modules(xp_reward_quiz, xp_reward_self_eval, xp_reward_activity, badge_key, quiz_pass_threshold)')
    .eq('profile_id', profileId)
    .eq('module_id', moduleId)
    .maybeSingle()

  if (!prog || prog.status === 'completed') return

  const mod        = (prog as any).module as any
  const quizPassed = prog.quiz_score !== null && prog.quiz_score >= (mod?.quiz_pass_threshold ?? 5)
  const allDone    = quizPassed && prog.self_eval_score !== null && (prog as any).activity_completed

  if (!allDone) return

  const quizXp     = mod?.xp_reward_quiz     ?? 0
  const selfEvalXp = mod?.xp_reward_self_eval ?? 0
  const actXp      = mod?.xp_reward_activity  ?? 0
  const totalXp    = quizXp + selfEvalXp + actXp

  await supabase
    .from('profile_module_progress')
    .update({
      status:        'completed',
      xp_earned:     totalXp,
      badge_awarded: !!mod?.badge_key,
      completed_at:  new Date().toISOString(),
    })
    .eq('profile_id', profileId)
    .eq('module_id',  moduleId)

  if (totalXp > 0) {
    await awardXp(supabase, profileId, totalXp, 'module_completed', 'Module complété', moduleId)
  }

  if (mod?.badge_key) {
    const { data: badge } = await supabase
      .from('badges')
      .select('id')
      .eq('key', mod.badge_key)
      .maybeSingle()

    if (badge) {
      await supabase
        .from('profile_badges')
        .upsert({ profile_id: profileId, badge_id: (badge as any).id }, { onConflict: 'profile_id,badge_id' })
    }
  }

  revalidatePath(`/app/parent/modules/${moduleSlug}`)
  revalidatePath('/app/parent/modules')
}

// ── Save quiz result ───────────────────────────────────────────────────────

export async function saveQuizResult(moduleId: string, moduleSlug: string, score: number, scoreMax: number) {
  const profile = await getCurrentProfile()
  if (!profile) return { ok: false, error: 'Non authentifié' }

  const supabase = await createModulesClient()
  await getOrCreateProgress(supabase, profile.id, moduleId)

  // Get current attempts count then increment
  const { data: current } = await supabase
    .from('profile_module_progress')
    .select('quiz_attempts, quiz_score')
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)
    .maybeSingle()

  const prevScore    = (current as any)?.quiz_score ?? null
  const prevAttempts = (current as any)?.quiz_attempts ?? 0
  const newScore     = prevScore === null || score > prevScore ? score : prevScore

  await supabase
    .from('profile_module_progress')
    .update({
      quiz_score:     newScore,
      quiz_score_max: scoreMax,
      quiz_attempts:  prevAttempts + 1,
    })
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)

  // Award XP on first pass only
  if (prevScore === null || prevScore < 5) {
    const { data: mod } = await supabase
      .from('modules')
      .select('xp_reward_quiz, quiz_pass_threshold')
      .eq('id', moduleId)
      .maybeSingle()

    if (mod && score >= ((mod as any).quiz_pass_threshold ?? 5)) {
      await awardXp(supabase, profile.id, (mod as any).xp_reward_quiz, 'quiz_passed', 'Quiz validé', moduleId)
    }
  }

  await checkAndCompleteModule(supabase, profile.id, moduleId, moduleSlug)
  revalidatePath(`/app/parent/modules/${moduleSlug}`)

  return { ok: true }
}

// ── Save self-eval result ─────────────────────────────────────────────────

export async function saveSelfEvalResult(
  moduleId:   string,
  moduleSlug: string,
  answers:    Record<string, number>,
  score:      number,
  scoreMax:   number,
) {
  const profile = await getCurrentProfile()
  if (!profile) return { ok: false, error: 'Non authentifié' }

  const supabase = await createModulesClient()
  await getOrCreateProgress(supabase, profile.id, moduleId)

  const { data: current } = await supabase
    .from('profile_module_progress')
    .select('self_eval_score')
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)
    .maybeSingle()

  await supabase
    .from('profile_module_progress')
    .update({
      self_eval_score:     score,
      self_eval_score_max: scoreMax,
      self_eval_answers:   answers,
    })
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)

  // Award XP first time only
  if ((current as any)?.self_eval_score === null) {
    const { data: mod } = await supabase
      .from('modules')
      .select('xp_reward_self_eval')
      .eq('id', moduleId)
      .maybeSingle()

    if (mod) {
      await awardXp(supabase, profile.id, (mod as any).xp_reward_self_eval, 'self_eval_completed', 'Auto-évaluation complétée', moduleId)
    }
  }

  await checkAndCompleteModule(supabase, profile.id, moduleId, moduleSlug)
  revalidatePath(`/app/parent/modules/${moduleSlug}`)

  return { ok: true }
}

// ── Save activity result ──────────────────────────────────────────────────

export async function saveActivityResult(
  moduleId:   string,
  moduleSlug: string,
  mode:       'solo' | 'duo_enfant',
  reflection: string,
) {
  const profile = await getCurrentProfile()
  if (!profile) return { ok: false, error: 'Non authentifié' }

  const supabase = await createModulesClient()
  await getOrCreateProgress(supabase, profile.id, moduleId)

  const { data: current } = await supabase
    .from('profile_module_progress')
    .select('activity_completed')
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)
    .maybeSingle()

  const xpBonus = reflection.trim().length > 50 ? 10 : 0

  await supabase
    .from('profile_module_progress')
    .update({
      activity_completed:  true,
      activity_mode:       mode,
      activity_reflection: reflection || null,
    })
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)

  // Award XP first time only
  if (!(current as any)?.activity_completed) {
    const xp = (mode === 'duo_enfant' ? 30 : 20) + xpBonus
    await awardXp(supabase, profile.id, xp, 'activity_completed', `Activité complétée (${mode})`, moduleId)
  }

  await checkAndCompleteModule(supabase, profile.id, moduleId, moduleSlug)
  revalidatePath(`/app/parent/modules/${moduleSlug}`)

  return { ok: true }
}

// ── Save mini-game result ─────────────────────────────────────────────────

export async function saveMiniGameResult(moduleId: string, moduleSlug: string, score: number) {
  const profile = await getCurrentProfile()
  if (!profile) return { ok: false, error: 'Non authentifié' }

  const supabase = await createModulesClient()
  await getOrCreateProgress(supabase, profile.id, moduleId)

  await supabase
    .from('profile_module_progress')
    .update({ mini_game_score: score })
    .eq('profile_id', profile.id)
    .eq('module_id',  moduleId)

  revalidatePath(`/app/parent/modules/${moduleSlug}`)
  return { ok: true }
}
