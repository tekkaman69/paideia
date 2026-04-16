'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { saveMiniGameResult } from '@/lib/actions/modules'
import type { Module, MiniGame, MiniGameCard } from '@/types'

interface Props {
  module:     Module
  game:       MiniGame
  moduleSlug: string
}

type CardState = 'idle' | 'correct' | 'wrong' | 'revealed'

export function MiniGamePlayer({ module: mod, game, moduleSlug }: Props) {
  const router  = useRouter()
  const cards: MiniGameCard[] = game.config?.cartes ?? []

  const [current, setCurrent]     = useState(0)
  const [cardState, setCardState] = useState<CardState>('idle')
  const [score, setScore]         = useState(0)
  const [saving, setSaving]       = useState(false)
  const [phase, setPhase]         = useState<'game' | 'results'>('game')
  const [flipped, setFlipped]     = useState(false)

  const card = cards[current]
  const totalCards = cards.length
  const progressPct = Math.round((current / totalCards) * 100)

  const handleAnswer = useCallback((answer: 'VRAI' | 'MYTHE') => {
    if (cardState !== 'idle' || !card) return
    const correct =
      card.reponse === answer ||
      (answer === 'VRAI' && card.reponse === 'VRAI_PARTIEL')

    setCardState(correct ? 'correct' : 'wrong')
    setFlipped(true)
    if (correct) setScore(s => s + 1)
  }, [cardState, card])

  function handleNext() {
    if (current < totalCards - 1) {
      setCurrent(c => c + 1)
      setCardState('idle')
      setFlipped(false)
    } else {
      setPhase('results')
    }
  }

  async function handleFinish() {
    setSaving(true)
    await saveMiniGameResult(mod.id, moduleSlug, score)
    setSaving(false)
    router.push(`/app/parent/modules/${moduleSlug}`)
  }

  function handleRestart() {
    setCurrent(0)
    setCardState('idle')
    setScore(0)
    setFlipped(false)
    setPhase('game')
  }

  // ── Results ───────────────────────────────────────────────────────────
  if (phase === 'results') {
    const pct = Math.round((score / totalCards) * 100)
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-8 text-center ${pct >= 70 ? 'bg-green-50 border border-green-200' : 'bg-sand-50 border border-sand-200'}`}>
          <p className="text-5xl mb-4">{pct >= 70 ? '🧠' : '💪'}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {pct >= 70 ? 'Excellent !' : 'Bon effort !'}
          </h2>
          <p className="text-gray-600 mb-1">
            <strong>{score}/{totalCards}</strong> bonnes réponses
          </p>
          <div className="mt-4">
            <Progress value={pct} className="h-3 max-w-xs mx-auto" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRestart} className="flex-1 gap-2">
            <RotateCcw className="w-4 h-4" />
            Rejouer
          </Button>
          <Button
            onClick={handleFinish}
            disabled={saving}
            className="flex-1 bg-primary-600 hover:bg-primary-700"
          >
            {saving ? 'Sauvegarde…' : 'Terminer'}
          </Button>
        </div>
      </div>
    )
  }

  if (!card) return null

  // ── Game ──────────────────────────────────────────────────────────────
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
            <span>{current + 1}/{totalCards}</span>
            <span className="font-medium text-green-600">{score} ✓</span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{game.title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">Est-ce vrai ou un mythe ?</p>
      </div>

      {/* Card */}
      <div className={cn(
        'rounded-2xl border-2 p-6 transition-colors',
        cardState === 'correct' ? 'border-green-400 bg-green-50'
        : cardState === 'wrong'  ? 'border-red-400 bg-red-50'
        : 'border-sand-200 bg-white shadow-sm'
      )}>
        {/* Affirmation */}
        <p className="text-base font-medium text-gray-900 leading-relaxed mb-6 min-h-[60px]">
          {card.affirmation}
        </p>

        {/* Answer buttons */}
        {cardState === 'idle' && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAnswer('VRAI')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-green-200
                bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all font-semibold text-green-700"
            >
              <span className="text-2xl">✅</span>
              <span>VRAI</span>
            </button>
            <button
              onClick={() => handleAnswer('MYTHE')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-red-200
                bg-red-50 hover:bg-red-100 hover:border-red-400 transition-all font-semibold text-red-700"
            >
              <span className="text-2xl">❌</span>
              <span>MYTHE</span>
            </button>
          </div>
        )}

        {/* Result + explication */}
        {flipped && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {cardState === 'correct'
                ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                : <XCircle    className="w-5 h-5 text-red-500   shrink-0" />}
              <span className={cn(
                'font-semibold',
                cardState === 'correct' ? 'text-green-700' : 'text-red-700'
              )}>
                {cardState === 'correct' ? 'Correct !' : 'Pas tout à fait.'}
              </span>
              <span className="ml-auto text-sm font-bold px-2.5 py-0.5 rounded-full
                bg-white border border-gray-200 text-gray-600">
                {card.reponse}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed bg-white/60 rounded-xl p-4">
              {card.explication}
            </p>

            <Button
              onClick={handleNext}
              className="w-full bg-primary-600 hover:bg-primary-700"
            >
              {current < totalCards - 1 ? 'Carte suivante →' : 'Voir les résultats'}
            </Button>
          </div>
        )}
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-1.5">
        {cards.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              i < current   ? 'bg-primary-400'
              : i === current ? 'bg-primary-600 w-4'
              : 'bg-sand-300'
            )}
          />
        ))}
      </div>
    </div>
  )
}
