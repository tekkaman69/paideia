'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Zap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { saveSelfEvalResult } from '@/lib/actions/modules'
import type { Module, SelfEvalItem } from '@/types'

interface Props {
  module:     Module
  items:      SelfEvalItem[]
  moduleSlug: string
}

const SCALE_LABELS = ['Pas du tout', 'Rarement', 'Parfois', 'Souvent', 'Toujours']
const SCALE_COLORS = [
  'bg-red-100 border-red-300 text-red-700',
  'bg-orange-100 border-orange-300 text-orange-700',
  'bg-yellow-100 border-yellow-300 text-yellow-700',
  'bg-blue-100 border-blue-300 text-blue-700',
  'bg-green-100 border-green-300 text-green-700',
]

export function SelfEvalPlayer({ module: mod, items, moduleSlug }: Props) {
  const router  = useRouter()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [saving, setSaving]   = useState(false)
  const [done, setDone]       = useState(false)

  const answeredCount = Object.keys(answers).length
  const allAnswered   = answeredCount === items.length
  const progressPct   = Math.round((answeredCount / items.length) * 100)

  // Weighted score
  const totalWeight   = items.reduce((s, i) => s + i.weight, 0)
  const weightedScore = items.reduce((s, item) => {
    const val = answers[item.id] ?? 0
    return s + (val / 4) * item.weight
  }, 0)
  const score    = Math.round((weightedScore / totalWeight) * 10 * 10) / 10 // out of 10
  const scoreMax = 10

  async function handleSubmit() {
    if (!allAnswered) return
    setSaving(true)
    await saveSelfEvalResult(mod.id, moduleSlug, answers, Math.round(score), scoreMax)
    setSaving(false)
    setDone(true)
  }

  if (done) {
    const level = score >= 8 ? 'expert' : score >= 5 ? 'en progression' : 'débutant'
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 text-center border border-purple-100">
          <p className="text-4xl mb-4">📊</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Auto-évaluation complétée !</h2>
          <p className="text-gray-600 mb-4">
            Votre score : <strong className="text-purple-700 text-xl">{score}/10</strong>
          </p>
          <p className="text-sm text-gray-500 capitalize mb-2">
            Profil : <strong>{level}</strong>
          </p>
          <p className="text-purple-700 font-medium flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            +{mod.xp_reward_self_eval} XP débloqués
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
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span>{answeredCount}/{items.length} répondus</span>
            <span className="flex items-center gap-1 text-purple-600 font-medium">
              <Zap className="w-3.5 h-3.5" />
              {mod.xp_reward_self_eval} XP
            </span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>
      </div>

      {/* Intro */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
        <p className="text-sm text-purple-800 leading-relaxed">
          Pour chaque affirmation, indiquez honnêtement à quelle fréquence c'est vrai pour vous.
          Il n'y a pas de bonne ou mauvaise réponse — l'objectif est de voir où vous en êtes.
        </p>
      </div>

      {/* Items */}
      <div className="space-y-5">
        {items.map((item, idx) => {
          const val = answers[item.id]
          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-sand-200 p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm font-medium text-gray-800 leading-relaxed">{item.text}</p>
                {val !== undefined && (
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                )}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {SCALE_LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [item.id]: i }))}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all text-center
                      ${val === i
                        ? SCALE_COLORS[i]
                        : 'border-sand-200 bg-white hover:border-gray-300 hover:bg-sand-50'
                      }`}
                  >
                    <span className="text-lg font-bold">{i + 1}</span>
                    <span className="text-xs leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!allAnswered || saving}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {saving
          ? 'Sauvegarde…'
          : !allAnswered
          ? `Répondez aux ${items.length - answeredCount} affirmations restantes`
          : 'Valider l\'auto-évaluation'}
      </Button>
    </div>
  )
}
