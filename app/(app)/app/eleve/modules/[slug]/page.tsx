import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronLeft, Clock, CheckCircle, Circle,
  ClipboardList, Smile, Dumbbell, Gamepad2, Zap, Lock, BookOpen,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { requireStudent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import type { Module, ProfileModuleProgress } from '@/types'

// ── Page ─────────────────────────────────────────────────────────────────

export default async function EleveModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug }  = await params
  const profile   = await requireStudent()
  const supabase  = await createModulesClient()

  const { data: rawMod } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
    .in('audience', ['eleve', 'both'])
    .eq('is_active', true)
    .maybeSingle()
  if (!rawMod) notFound()
  const mod = rawMod as Module

  const { data: rawProgress } = await supabase
    .from('profile_module_progress')
    .select('*')
    .eq('profile_id', profile.id)
    .eq('module_id', mod.id)
    .maybeSingle()
  const prog = rawProgress as ProfileModuleProgress | null

  const { data: rawMiniGame } = await supabase
    .from('mini_games')
    .select('id, slug, title')
    .eq('module_id', mod.id)
    .maybeSingle()

  const lessonDone   = (prog as any)?.lesson_read ?? false
  const quizDone     = prog?.quiz_score !== null && (prog?.quiz_score ?? 0) >= (mod.quiz_pass_threshold ?? 5)
  const selfEvalDone = prog?.self_eval_score !== null
  const activityDone = prog?.activity_completed ?? false
  const miniGameDone = prog?.mini_game_score !== null

  const hasLesson = Array.isArray((mod as any).lesson_sections) && (mod as any).lesson_sections.length > 0

  const steps = [
    ...(hasLesson ? [{
      key:    'cours',
      label:  'Cours',
      desc:   'Lis le cours pour comprendre le sujet',
      icon:   BookOpen,
      xp:     0,
      href:   `/app/eleve/modules/${slug}/cours`,
      done:   lessonDone,
      locked: false,
      color:  'text-indigo-600',
      bg:     'bg-indigo-50',
      ring:   'ring-indigo-200',
    }] : []),
    {
      key:    'quiz',
      label:  'Quiz',
      desc:   `${mod.quiz_pass_threshold ?? 5}/8 bonnes réponses pour valider`,
      icon:   ClipboardList,
      xp:     mod.xp_reward_quiz,
      href:   `/app/eleve/modules/${slug}/quiz`,
      done:   quizDone,
      locked: false,
      color:  'text-violet-600',
      bg:     'bg-violet-50',
      ring:   'ring-violet-200',
    },
    {
      key:    'self-eval',
      label:  'Comment je me sens ?',
      desc:   'Réponds à 5 questions sur toi-même',
      icon:   Smile,
      xp:     mod.xp_reward_self_eval,
      href:   `/app/eleve/modules/${slug}/self-eval`,
      done:   selfEvalDone,
      locked: false,
      color:  'text-rose-600',
      bg:     'bg-rose-50',
      ring:   'ring-rose-200',
    },
    {
      key:    'activite',
      label:  'Activité',
      desc:   'Un exercice concret à faire',
      icon:   Dumbbell,
      xp:     mod.xp_reward_activity,
      href:   `/app/eleve/modules/${slug}/activite`,
      done:   activityDone,
      locked: !selfEvalDone,
      color:  'text-amber-600',
      bg:     'bg-amber-50',
      ring:   'ring-amber-200',
    },
    ...(rawMiniGame ? [{
      key:    'mini-jeu',
      label:  'Mini-jeu',
      desc:   rawMiniGame.title as string,
      icon:   Gamepad2,
      xp:     20,
      href:   `/app/eleve/modules/${slug}/mini-jeu`,
      done:   miniGameDone,
      locked: false,
      color:  'text-green-600',
      bg:     'bg-green-50',
      ring:   'ring-green-200',
    }] : []),
  ]

  const completedSteps = steps.filter(s => s.done).length
  const progressPct    = Math.round((completedSteps / steps.length) * 100)
  const totalXp        = mod.xp_reward_quiz + mod.xp_reward_self_eval + mod.xp_reward_activity

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">

      {/* Back */}
      <Link
        href="/app/eleve/modules"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Retour aux modules
      </Link>

      {/* Module header */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {mod.estimated_duration_min && (
            <span className="text-sm text-violet-200 flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {mod.estimated_duration_min} min
            </span>
          )}
          <span className="text-sm text-violet-200 flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full ml-auto">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            {totalXp} XP disponibles
          </span>
        </div>

        <h1 className="text-xl lg:text-2xl font-bold leading-snug mb-2">{mod.title}</h1>
        {mod.subtitle && (
          <p className="text-violet-200 text-sm leading-relaxed">{mod.subtitle}</p>
        )}

        {/* Progress */}
        {prog && (
          <div className="mt-5 pt-5 border-t border-white/20">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-violet-200">{completedSteps}/{steps.length} étapes</span>
              <span className="font-bold">{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-3 bg-white/20 [&>div]:bg-yellow-400" />
          </div>
        )}
      </div>

      {/* Description */}
      {mod.description && (
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
          <p className="text-sm text-violet-900 leading-relaxed">{mod.description}</p>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Ce que tu vas faire 👇</h2>

        {steps.map((step) => {
          const Icon = step.icon

          if (step.locked) {
            return (
              <Card key={step.key} className="border-0 shadow-sm opacity-50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shrink-0`}>
                      <Lock className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-500">{step.label}</p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Complète "Comment je me sens ?" d'abord !
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

          return (
            <Link key={step.key} href={step.href} className="block group">
              <Card className={`border-0 shadow-sm transition-all group-hover:shadow-lg group-hover:-translate-y-0.5
                ${step.done ? 'ring-1 ' + step.ring : ''}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center shrink-0
                      ring-2 ${step.done ? step.ring : 'ring-transparent'} transition-all text-2xl`}>
                      {step.done
                        ? <CheckCircle className={`w-7 h-7 ${step.color}`} />
                        : <Icon className={`w-6 h-6 ${step.color}`} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="font-bold text-gray-900 group-hover:text-violet-700 transition-colors text-base">
                          {step.label}
                        </p>
                        {step.done && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                            ✓ Fait !
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-snug">{step.desc}</p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm font-bold text-yellow-600 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        +{step.xp} XP
                      </span>
                      <Circle className={`w-4 h-4 transition-colors
                        ${step.done ? 'text-green-500' : 'text-gray-300 group-hover:text-violet-400'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Completion */}
      {prog?.status === 'completed' && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6 text-center">
          <p className="text-5xl mb-3">🎉</p>
          <h3 className="font-bold text-green-800 text-xl mb-1">Module complété !</h3>
          <p className="text-green-700 text-sm mb-4">
            Tu as gagné <strong>{prog.xp_earned} XP</strong> et débloqué ton badge !
          </p>
          <Link
            href="/app/eleve/modules"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-2xl text-sm font-bold hover:bg-green-700 transition-colors"
          >
            Continuer l'aventure 🚀
          </Link>
        </div>
      )}
    </div>
  )
}
