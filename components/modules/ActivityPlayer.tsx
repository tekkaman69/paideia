'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, Users, User, Zap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { saveActivityResult } from '@/lib/actions/modules'
import type { Module, Activity, ActivityMode } from '@/types'

interface Props {
  module:     Module
  activity:   Activity
  moduleSlug: string
}

export function ActivityPlayer({ module: mod, activity, moduleSlug }: Props) {
  const router  = useRouter()
  const steps   = activity.instructions ?? []

  const [currentStep, setCurrentStep] = useState(0)
  const [mode, setMode]               = useState<ActivityMode | null>(null)
  const [reflection, setReflection]   = useState('')
  const [phase, setPhase]             = useState<'mode' | 'steps' | 'reflection' | 'done'>('mode')
  const [saving, setSaving]           = useState(false)

  const progressPct = phase === 'steps'
    ? Math.round(((currentStep + 1) / steps.length) * 100)
    : phase === 'reflection' ? 100
    : 0

  async function handleSubmit() {
    if (!mode) return
    setSaving(true)
    await saveActivityResult(mod.id, moduleSlug, mode, reflection)
    setSaving(false)
    setPhase('done')
  }

  // ── Done ─────────────────────────────────────────────────────────────
  if (phase === 'done') {
    const xp = (mode === 'duo_enfant' ? 30 : 20) + (reflection.trim().length > 50 ? 10 : 0)
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl p-8 text-center border border-gold-200">
          <p className="text-4xl mb-4">🌟</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Activité complétée !</h2>
          <p className="text-gray-600 mb-4">{activity.title}</p>
          <p className="text-gold-700 font-medium flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            +{xp} XP débloqués
          </p>
        </div>
        <Button
          onClick={() => router.push(`/app/parent/modules/${moduleSlug}`)}
          className="w-full bg-primary-600 hover:bg-primary-700"
        >
          Continuer le module
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href={`/app/parent/modules/${moduleSlug}`}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Module
        </Link>
        {phase === 'steps' && (
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>Étape {currentStep + 1}/{steps.length}</span>
              <span className="flex items-center gap-1 text-gold-600 font-medium">
                <Zap className="w-3.5 h-3.5" />
                {mode === 'duo_enfant' ? 30 : 20} XP
              </span>
            </div>
            <Progress value={progressPct} className="h-2" />
          </div>
        )}
      </div>

      {/* Activity title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{activity.title}</h1>
        {activity.description && (
          <p className="text-gray-500 mt-1 text-sm leading-relaxed">{activity.description}</p>
        )}
        {(activity.duration_min || activity.duration_max) && (
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {activity.duration_min}–{activity.duration_max} minutes
          </p>
        )}
      </div>

      {/* Phase: choose mode */}
      {phase === 'mode' && (
        <div className="space-y-4">
          <p className="font-medium text-gray-800">Comment allez-vous faire cette activité ?</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                value: 'solo' as ActivityMode,
                icon:  User,
                label: 'Seul(e)',
                desc:  `+20 XP`,
                color: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
                selected: 'border-blue-500 bg-blue-50',
              },
              {
                value: 'duo_enfant' as ActivityMode,
                icon:  Users,
                label: 'Avec mon enfant',
                desc:  `+30 XP`,
                color: 'border-gold-200 hover:border-gold-400 hover:bg-gold-50',
                selected: 'border-gold-500 bg-gold-50',
              },
            ].map(({ value, icon: Icon, label, desc, color, selected }) => (
              <button
                key={value}
                onClick={() => setMode(value)}
                className={cn(
                  'flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-center',
                  mode === value ? selected : color
                )}
              >
                <Icon className={cn('w-8 h-8', mode === value ? 'text-primary-600' : 'text-gray-400')} />
                <div>
                  <p className="font-semibold text-gray-800">{label}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                {mode === value && <CheckCircle className="w-5 h-5 text-green-500" />}
              </button>
            ))}
          </div>
          <Button
            onClick={() => setPhase('steps')}
            disabled={!mode}
            className="w-full bg-primary-600 hover:bg-primary-700"
          >
            Commencer l'activité
          </Button>
        </div>
      )}

      {/* Phase: steps */}
      {phase === 'steps' && steps[currentStep] && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-gold-100 text-gold-700 font-bold text-sm flex items-center justify-center shrink-0">
                {steps[currentStep].numero}
              </span>
              <h2 className="font-semibold text-gray-900">{steps[currentStep].titre}</h2>
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {steps[currentStep].duree_min} min
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm">{steps[currentStep].instruction}</p>

            {steps[currentStep].exemples && steps[currentStep].exemples!.length > 0 && (
              <div className="mt-4 p-4 bg-sand-50 rounded-xl border border-sand-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Exemples</p>
                <ul className="space-y-1.5">
                  {steps[currentStep].exemples!.map((ex, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gold-400 mt-0.5">→</span>
                      <span className="italic">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(s => s - 1)}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(s => s + 1)
                } else {
                  setPhase('reflection')
                }
              }}
              className="flex-1 bg-primary-600 hover:bg-primary-700 gap-2"
            >
              {currentStep < steps.length - 1
                ? <><span>Étape suivante</span><ChevronRight className="w-4 h-4" /></>
                : <span>Terminer les étapes</span>}
            </Button>
          </div>
        </div>
      )}

      {/* Phase: reflection */}
      {phase === 'reflection' && (
        <div className="space-y-4">
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
            <p className="font-medium text-gold-800 mb-1">Temps de réflexion</p>
            <p className="text-sm text-gold-700 leading-relaxed">
              {activity.reflection_prompt ?? 'Qu\'avez-vous retenu de cette activité ?'}
            </p>
          </div>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="Vos observations, découvertes, engagements…"
            rows={5}
            className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              placeholder:text-gray-400 resize-none leading-relaxed"
          />
          <p className="text-xs text-gray-400 text-right">
            {reflection.trim().length > 50
              ? '✓ Bonus de 10 XP pour la réflexion'
              : `${Math.max(0, 50 - reflection.trim().length)} caractères de plus pour le bonus XP`}
          </p>
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full bg-gold-500 hover:bg-gold-600 text-white"
          >
            {saving ? 'Sauvegarde…' : 'Valider l\'activité'}
          </Button>
        </div>
      )}
    </div>
  )
}
