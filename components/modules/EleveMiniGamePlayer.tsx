'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { saveEleveMiniGameResult } from '@/lib/actions/student-modules'
import type { Module, MiniGame, MiniGameCard } from '@/types'

interface Props {
  module:     Module
  game:       MiniGame
  moduleSlug: string
}

type CardState = 'idle' | 'correct' | 'wrong'

export function EleveMiniGamePlayer({ module: mod, game, moduleSlug }: Props) {
  const router  = useRouter()
  const cards: MiniGameCard[] = game.config?.cartes ?? []

  const [current, setCurrent]     = useState(0)
  const [cardState, setCardState] = useState<CardState>('idle')
  const [score, setScore]         = useState(0)
  const [saving, setSaving]       = useState(false)
  const [phase, setPhase]         = useState<'game' | 'results'>('game')

  const card        = cards[current]
  const totalCards  = cards.length
  const progressPct = Math.round((current / totalCards) * 100)

  const handleAnswer = useCallback((answer: 'VRAI' | 'MYTHE') => {
    if (cardState !== 'idle' || !card) return
    const correct =
      card.reponse === answer ||
      (answer === 'VRAI' && card.reponse === 'VRAI_PARTIEL')

    setCardState(correct ? 'correct' : 'wrong')
    if (correct) setScore(s => s + 1)
  }, [cardState, card])

  function handleNext() {
    if (current < totalCards - 1) {
      setCurrent(c => c + 1)
      setCardState('idle')
    } else {
      setPhase('results')
    }
  }

  async function handleFinish() {
    setSaving(true)
    await saveEleveMiniGameResult(mod.id, moduleSlug, score)
    setSaving(false)
    router.push(`/app/eleve/modules/${moduleSlug}`)
  }

  function handleRestart() {
    setCurrent(0)
    setCardState('idle')
    setScore(0)
    setPhase('game')
  }

  // ── Results ───────────────────────────────────────────────────────────
  if (phase === 'results') {
    const pct = Math.round((score / totalCards) * 100)
    const emoji = pct >= 80 ? '🧠' : pct >= 60 ? '💪' : '🌱'
    const msg   = pct >= 80 ? 'Excellent !' : pct >= 60 ? 'Bien joué !' : 'Bon effort !'

    return (
      <div className="space-y-6">
        <div className={`rounded-3xl p-8 text-center border-2 ${
          pct >= 80 ? 'bg-green-50 border-green-200' :
          pct >= 60 ? 'bg-blue-50 border-blue-200' :
          'bg-orange-50 border-orange-200'
        }`}>
          <p className="text-6xl mb-4">{emoji}</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{msg}</h2>
          <p className="text-gray-600 text-lg mb-4">
            <strong>{score}</strong> bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur <strong>{totalCards}</strong>
          </p>
          <Progress value={pct} className="h-4 max-w-xs mx-auto rounded-full" />
          <p className="mt-2 text-sm text-gray-500">{pct}%</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRestart}
            className="flex-1 gap-2 rounded-2xl h-12"
          >
            <RotateCcw className="w-4 h-4" />
            Rejouer
          </Button>
          <Button
            onClick={handleFinish}
            disabled={saving}
            className="flex-1 bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 font-bold"
          >
            {saving ? 'Sauvegarde…' : 'Terminer ✅'}
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
          href={`/app/eleve/modules/${moduleSlug}`}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          Module
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="font-medium">{current + 1} / {totalCards}</span>
            <span className="font-bold text-green-600">{score} ✓</span>
          </div>
          <Progress value={progressPct} className="h-3 [&>div]:bg-green-500" />
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{game.title}</h1>
        <p className="text-gray-500 mt-0.5">Est-ce vrai ou un mythe ?</p>
      </div>

      {/* Card */}
      <div className={cn(
        'rounded-3xl border-3 p-6 transition-all',
        cardState === 'correct' ? 'border-green-400 bg-green-50 shadow-lg shadow-green-100'
        : cardState === 'wrong'  ? 'border-red-400 bg-red-50 shadow-lg shadow-red-100'
        : 'border-2 border-gray-200 bg-white shadow-sm'
      )}>
        <p className="text-lg font-semibold text-gray-900 leading-relaxed mb-6 min-h-[60px]">
          {card.affirmation}
        </p>

        {/* Buttons */}
        {cardState === 'idle' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('VRAI')}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-green-200
                bg-green-50 hover:bg-green-100 hover:border-green-400 hover:scale-105 active:scale-100
                transition-all font-bold text-green-700 text-lg"
            >
              <span className="text-4xl">✅</span>
              <span>VRAI</span>
            </button>
            <button
              onClick={() => handleAnswer('MYTHE')}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-red-200
                bg-red-50 hover:bg-red-100 hover:border-red-400 hover:scale-105 active:scale-100
                transition-all font-bold text-red-700 text-lg"
            >
              <span className="text-4xl">❌</span>
              <span>MYTHE</span>
            </button>
          </div>
        )}

        {/* Result */}
        {cardState !== 'idle' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {cardState === 'correct'
                ? <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                : <XCircle    className="w-6 h-6 text-red-500   shrink-0" />}
              <span className={cn(
                'font-bold text-lg',
                cardState === 'correct' ? 'text-green-700' : 'text-red-700'
              )}>
                {cardState === 'correct' ? '🎉 Correct !' : '🤔 Pas tout à fait…'}
              </span>
              <span className="ml-auto text-sm font-bold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                {card.reponse}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed bg-white/70 rounded-2xl p-4">
              {card.explication}
            </p>

            <Button
              onClick={handleNext}
              className="w-full bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 font-bold text-base"
            >
              {current < totalCards - 1 ? 'Carte suivante →' : 'Voir les résultats 🏁'}
            </Button>
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2.5 rounded-full transition-all',
              i < current    ? 'bg-violet-400 w-2.5'
              : i === current ? 'bg-violet-600 w-6'
              : 'bg-gray-200 w-2.5'
            )}
          />
        ))}
      </div>
    </div>
  )
}
