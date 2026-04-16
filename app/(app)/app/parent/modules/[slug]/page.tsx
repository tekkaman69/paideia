import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronLeft, Clock, CheckCircle, Circle,
  BookOpen, ClipboardList, Dumbbell, Gamepad2, Zap, Lock,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { requireParent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import type { Module, ProfileModuleProgress } from '@/types'

// ── helpers ──────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  decouverte:    'Découverte',
  intermediaire: 'Intermédiaire',
  avance:        'Avancé',
}

const LEVEL_COLORS: Record<string, string> = {
  decouverte:    'bg-green-100 text-green-700',
  intermediaire: 'bg-blue-100 text-blue-700',
  avance:        'bg-purple-100 text-purple-700',
}

// ── page ─────────────────────────────────────────────────────────────────

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug }  = await params
  const profile   = await requireParent()
  const supabase  = await createModulesClient()

  const { data: rawMod } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
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

  const hasLesson    = Array.isArray((mod as any).lesson_sections) && (mod as any).lesson_sections.length > 0

  const steps = [
    ...(hasLesson ? [{
      key:     'cours',
      label:   'Cours',
      desc:    'Lire le contenu théorique du module',
      icon:    BookOpen,
      xp:      0,
      href:    `/app/parent/modules/${slug}/cours`,
      done:    lessonDone,
      locked:  false,
      color:   'text-indigo-600',
      bg:      'bg-indigo-50',
      ring:    'ring-indigo-200',
    }] : []),
    {
      key:     'quiz',
      label:   'Quiz',
      desc:    `${mod.quiz_pass_threshold ?? 5}/10 bonnes réponses pour valider`,
      icon:    ClipboardList,
      xp:      mod.xp_reward_quiz,
      href:    `/app/parent/modules/${slug}/quiz`,
      done:    quizDone,
      locked:  false,
      color:   'text-blue-600',
      bg:      'bg-blue-50',
      ring:    'ring-blue-200',
    },
    {
      key:     'self-eval',
      label:   'Auto-évaluation',
      desc:    'Mesurer vos pratiques actuelles sur 10 critères',
      icon:    BookOpen,
      xp:      mod.xp_reward_self_eval,
      href:    `/app/parent/modules/${slug}/self-eval`,
      done:    selfEvalDone,
      locked:  false,
      color:   'text-purple-600',
      bg:      'bg-purple-50',
      ring:    'ring-purple-200',
    },
    {
      key:     'activite',
      label:   'Activité pratique',
      desc:    'Exercice concret à réaliser chez vous',
      icon:    Dumbbell,
      xp:      mod.xp_reward_activity,
      href:    `/app/parent/modules/${slug}/activite`,
      done:    activityDone,
      locked:  !selfEvalDone,
      color:   'text-gold-600',
      bg:      'bg-gold-50',
      ring:    'ring-gold-200',
    },
    ...(rawMiniGame ? [{
      key:     'mini-jeu',
      label:   'Mini-jeu',
      desc:    rawMiniGame.title as string,
      icon:    Gamepad2,
      xp:      20,
      href:    `/app/parent/modules/${slug}/mini-jeu`,
      done:    miniGameDone,
      locked:  false,
      color:   'text-green-600',
      bg:      'bg-green-50',
      ring:    'ring-green-200',
    }] : []),
  ]

  const completedSteps = steps.filter(s => s.done).length
  const progressPct    = Math.round((completedSteps / steps.length) * 100)

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">

      {/* Back */}
      <Link
        href="/app/parent/modules"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Retour au parcours
      </Link>

      {/* Module header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Badge className={`border-0 font-medium ${LEVEL_COLORS[mod.level]}`}>
            {LEVEL_LABELS[mod.level]}
          </Badge>
          {mod.estimated_duration_min && (
            <span className="text-sm text-primary-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {mod.estimated_duration_min} min
            </span>
          )}
          <span className="text-sm text-primary-200 flex items-center gap-1.5 ml-auto">
            <Zap className="w-3.5 h-3.5 text-gold-300" />
            {mod.xp_reward_quiz + mod.xp_reward_self_eval + mod.xp_reward_activity} XP disponibles
          </span>
        </div>

        <h1 className="text-xl lg:text-2xl font-bold leading-snug mb-2">{mod.title}</h1>
        {mod.subtitle && (
          <p className="text-primary-200 text-sm leading-relaxed">{mod.subtitle}</p>
        )}

        {/* Progress */}
        {prog && (
          <div className="mt-5 pt-5 border-t border-white/20">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-primary-200">{completedSteps}/{steps.length} étapes</span>
              <span className="font-semibold">{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-2 bg-white/20 [&>div]:bg-gold-400" />
          </div>
        )}
      </div>

      {/* Description */}
      {mod.description && (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 leading-relaxed">{mod.description}</p>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Étapes du module</h2>

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
                      <p className="font-medium text-gray-500">{step.label}</p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Complétez l'auto-évaluation d'abord
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }

          return (
            <Link key={step.key} href={step.href} className="block group">
              <Card className={`border-0 shadow-sm transition-all group-hover:shadow-md
                ${step.done ? 'ring-1 ' + step.ring : ''}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center shrink-0
                      ring-2 ${step.done ? step.ring : 'ring-transparent'} transition-all`}>
                      {step.done
                        ? <CheckCircle className={`w-6 h-6 ${step.color}`} />
                        : <Icon className={`w-5 h-5 ${step.color}`} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                          {step.label}
                        </p>
                        {step.done && (
                          <Badge variant="secondary" className="text-xs border-0 bg-green-100 text-green-700 px-2">
                            Complété
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-snug">{step.desc}</p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm font-semibold text-gold-600 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        +{step.xp} XP
                      </span>
                      <Circle className={`w-4 h-4 transition-colors
                        ${step.done ? 'text-green-500' : 'text-gray-300 group-hover:text-primary-400'}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Completion message */}
      {prog?.status === 'completed' && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <h3 className="font-bold text-green-800 text-lg mb-1">Module complété !</h3>
          <p className="text-green-700 text-sm">
            Vous avez gagné <strong>{prog.xp_earned} XP</strong> et débloqué votre badge.
          </p>
          <Link
            href="/app/parent/modules"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Continuer le parcours
          </Link>
        </div>
      )}
    </div>
  )
}
