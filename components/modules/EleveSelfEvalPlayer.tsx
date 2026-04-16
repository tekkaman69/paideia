'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Zap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { saveEleveSelfEvalResult } from '@/lib/actions/student-modules'
import type { Module, SelfEvalItem } from '@/types'

interface Props {
  module:     Module
  items:      SelfEvalItem[]
  moduleSlug: string
}

const SCALE: { label: string; emoji: string; color: string }[] = [
  { label: 'Jamais',   emoji: '😞', color: 'border-red-300 bg-red-50 text-red-700' },
  { label: 'Rarement', emoji: '😕', color: 'border-orange-300 bg-orange-50 text-orange-700' },
  { label: 'Parfois',  emoji: '😐', color: 'border-yellow-300 bg-yellow-50 text-yellow-700' },
  { label: 'Souvent',  emoji: '🙂', color: 'border-blue-300 bg-blue-50 text-blue-700' },
  { label: 'Toujours', emoji: '😄', color: 'border-green-300 bg-green-50 text-green-700' },
]

export function EleveSelfEvalPlayer({ module: mod, items, moduleSlug }: Props) {
  const router  = useRouter()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [saving, setSaving]   = useState(false)
  const [done, setDone]       = useState(false)

  const answeredCount = Object.keys(answers).length
  const allAnswered   = answeredCount === items.length
  const progressPct   = Math.round((answeredCount / items.length) * 100)

  const totalWeight   = items.reduce((s, i) => s + i.weight, 0)
  const weightedScore = items.reduce((s, item) => {
    const val = answers[item.id] ?? 0
    return s + (val / 4) * item.weight
  }, 0)
  const score    = Math.round((weightedScore / totalWeight) * 10 * 10) / 10
  const scoreMax = 10

  async function handleSubmit() {
    if (!allAnswered) return
    setSaving(true)
    await saveEleveSelfEvalResult(mod.id, moduleSlug, answers, Math.round(score), scoreMax)
    setSaving(false)
    setDone(true)
  }

  if (done) {
    const emoji = score >= 8 ? '🌟' : score >= 5 ? '💪' : '🌱'
    const msg   = score >= 8
      ? 'Tu gères super bien ça !'
      : score >= 5
      ? 'Tu progresses bien, continue !'
      : 'C\'est le début de ton apprentissage !'

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 text-center border border-rose-200">
          <p className="text-6xl mb-4">{emoji}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Réflexion terminée !</h2>
          <p className="text-lg text-gray-600 mb-2">{msg}</p>
          <p className="text-rose-700 font-medium mb-4">Ton score : <strong className="text-2xl">{score}/10</strong></p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-100 text-rose-700 font-bold">
            <Zap className="w-4 h-4" />
            +{mod.xp_reward_self_eval} XP gagnés !
          </div>
        </div>
        <Button
          onClick={() => router.push(`/app/eleve/modules/${moduleSlug}`)}
          className="w-full bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 text-base font-bold"
        >
          Continuer le module ✨
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
            <span className="font-medium">{answeredCount}/{items.length} répondus</span>
            <span className="flex items-center gap-1 text-yellow-600 font-bold">
              <Zap className="w-3.5 h-3.5" />
              {mod.xp_reward_self_eval} XP
            </span>
          </div>
          <Progress value={progressPct} className="h-3 [&>div]:bg-rose-400" />
        </div>
      </div>

      {/* Intro */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
        <p className="text-rose-900 font-bold mb-1">Comment je me sens ? 💭</p>
        <p className="text-sm text-rose-700 leading-relaxed">
          Pour chaque phrase, choisis la smiley qui correspond le mieux à toi.
          Il n'y a pas de bonne ou mauvaise réponse — sois honnête !
        </p>
      </div>

      {/* Items */}
      <div className="space-y-5">
        {items.map((item, idx) => {
          const val = answers[item.id]
          return (
            <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-base font-semibold text-gray-800 leading-relaxed">{item.text}</p>
                {val !== undefined && (
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 ml-auto" />
                )}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {SCALE.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [item.id]: i }))}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border-2 transition-all text-center
                      ${val === i
                        ? s.color
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="text-xs font-medium leading-tight text-gray-600">{s.label}</span>
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
        className="w-full bg-rose-500 hover:bg-rose-600 rounded-2xl h-12 text-base font-bold"
      >
        {saving
          ? 'Sauvegarde…'
          : !allAnswered
          ? `${items.length - answeredCount} phrase${items.length - answeredCount > 1 ? 's' : ''} restante${items.length - answeredCount > 1 ? 's' : ''}`
          : '✅ Valider mes réponses'}
      </Button>
    </div>
  )
}
