'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { saveEleveActivityResult } from '@/lib/actions/student-modules'
import type { Module, Activity } from '@/types'

interface Props {
  module:     Module
  activity:   Activity
  moduleSlug: string
}

export function EleveActivityPlayer({ module: mod, activity, moduleSlug }: Props) {
  const router = useRouter()
  const steps  = activity.instructions ?? []

  const [currentStep, setCurrentStep] = useState(0)
  const [reflection, setReflection]   = useState('')
  const [phase, setPhase]             = useState<'steps' | 'reflection' | 'done'>('steps')
  const [saving, setSaving]           = useState(false)

  const progressPct = phase === 'steps'
    ? Math.round(((currentStep + 1) / steps.length) * 100)
    : 100

  async function handleSubmit() {
    setSaving(true)
    await saveEleveActivityResult(mod.id, moduleSlug, reflection)
    setSaving(false)
    setPhase('done')
  }

  const xpBonus = reflection.trim().length > 50 ? 10 : 0
  const totalXp = 25 + xpBonus

  // ── Done ─────────────────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 text-center border border-amber-200">
          <p className="text-6xl mb-4">🌟</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Activité terminée !</h2>
          <p className="text-gray-600 mb-4 text-base">{activity.title}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 text-amber-700 font-bold">
            <Zap className="w-4 h-4" />
            +{totalXp} XP gagnés !
          </div>
        </div>
        <Button
          onClick={() => router.push(`/app/eleve/modules/${moduleSlug}`)}
          className="w-full bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 text-base font-bold"
        >
          Retour au module ✨
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href={`/app/eleve/modules/${moduleSlug}`}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          Module
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="font-medium">
              {phase === 'steps' ? `Étape ${currentStep + 1}/${steps.length}` : 'Réflexion'}
            </span>
            <span className="flex items-center gap-1 text-yellow-600 font-bold">
              <Zap className="w-3.5 h-3.5" />
              25+ XP
            </span>
          </div>
          <Progress value={progressPct} className="h-3 [&>div]:bg-amber-400" />
        </div>
      </div>

      {/* Activity header */}
      <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl p-5 text-white">
        <h1 className="text-xl font-bold mb-1">{activity.title}</h1>
        {activity.description && (
          <p className="text-amber-100 text-sm leading-relaxed">{activity.description}</p>
        )}
        {(activity.duration_min || activity.duration_max) && (
          <p className="text-xs text-amber-200 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {activity.duration_min}–{activity.duration_max} minutes
          </p>
        )}
      </div>

      {/* Phase: steps */}
      {phase === 'steps' && steps[currentStep] && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 font-bold text-lg flex items-center justify-center shrink-0">
                {steps[currentStep].numero}
              </span>
              <h2 className="font-bold text-gray-900 text-base">{steps[currentStep].titre}</h2>
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3" />
                {steps[currentStep].duree_min} min
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">{steps[currentStep].instruction}</p>

            {steps[currentStep].exemples && steps[currentStep].exemples!.length > 0 && (
              <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Exemples 💡</p>
                <ul className="space-y-2">
                  {steps[currentStep].exemples!.map((ex, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5 font-bold">→</span>
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
                className="gap-2 rounded-2xl"
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
              className="flex-1 bg-amber-500 hover:bg-amber-600 rounded-2xl h-11 font-bold gap-2"
            >
              {currentStep < steps.length - 1
                ? <><span>Étape suivante</span><ChevronRight className="w-4 h-4" /></>
                : <span>Terminer les étapes ✅</span>}
            </Button>
          </div>
        </div>
      )}

      {/* Phase: reflection */}
      {phase === 'reflection' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="font-bold text-amber-800 mb-2 text-lg">✏️ Ta réflexion</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              {activity.reflection_prompt ?? 'Qu\'est-ce que tu as retenu de cette activité ?'}
            </p>
          </div>

          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="Écris tes pensées, ce que tu as appris, ce qui t'a surpris…"
            rows={5}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-700
              focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
              placeholder:text-gray-400 resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-gray-500">
              {reflection.trim().length > 50
                ? <span className="text-green-600 font-semibold">🎉 Bonus de +10 XP débloqué !</span>
                : <span>{Math.max(0, 50 - reflection.trim().length)} caractères de plus pour +10 XP bonus</span>}
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full bg-amber-500 hover:bg-amber-600 rounded-2xl h-12 text-base font-bold"
          >
            {saving ? 'Sauvegarde…' : '🌟 Valider l\'activité'}
          </Button>
        </div>
      )}
    </div>
  )
}
