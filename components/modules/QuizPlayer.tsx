'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Zap, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { saveQuizResult } from '@/lib/actions/modules'
import type { Module, QuizQuestionWithOptions, QuizOption } from '@/types'

interface Props {
  module:      Module
  questions:   QuizQuestionWithOptions[]
  moduleSlug:  string
}

type Phase = 'quiz' | 'feedback' | 'results'

export function QuizPlayer({ module: mod, questions, moduleSlug }: Props) {
  const router  = useRouter()
  const [phase, setPhase]       = useState<Phase>('quiz')
  const [current, setCurrent]   = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers]   = useState<Record<number, { optionId: string; correct: boolean }>>({})
  const [saving, setSaving]     = useState(false)

  const question     = questions[current]
  const totalQ       = questions.length
  const progress     = Math.round(((current) / totalQ) * 100)
  const answered     = selected !== null
  const correctOption = question?.options.find(o => o.is_correct)
  const selectedOption = question?.options.find(o => o.id === selected)
  const isCorrect    = selectedOption?.is_correct ?? false

  function handleSelect(option: QuizOption) {
    if (answered) return
    setSelected(option.id)
    setAnswers(prev => ({
      ...prev,
      [current]: { optionId: option.id, correct: option.is_correct },
    }))
    setPhase('feedback')
  }

  function handleNext() {
    if (current < totalQ - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setPhase('quiz')
    } else {
      setPhase('results')
    }
  }

  async function handleSubmit() {
    setSaving(true)
    const score    = Object.values(answers).filter(a => a.correct).length
    await saveQuizResult(mod.id, moduleSlug, score, totalQ)
    setSaving(false)
    router.push(`/app/parent/modules/${moduleSlug}`)
  }

  // ── Results screen ────────────────────────────────────────────────────
  if (phase === 'results') {
    const score   = Object.values(answers).filter(a => a.correct).length
    const passed  = score >= (mod.quiz_pass_threshold ?? 5)

    return (
      <div className="space-y-8">
        <div className={`rounded-2xl p-8 text-center ${passed ? 'bg-green-50' : 'bg-sand-50'}`}>
          <p className="text-5xl mb-4">{passed ? '🎉' : '💪'}</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Quiz validé !' : 'Continuez vos efforts !'}
          </h2>
          <p className="text-gray-600 mb-4">
            Vous avez répondu correctement à <strong>{score}/{totalQ}</strong> questions.
          </p>
          {passed ? (
            <p className="text-green-700 font-medium flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              +{mod.xp_reward_quiz} XP débloqués
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              Il faut au moins {mod.quiz_pass_threshold ?? 5}/10 pour valider. Vous pouvez réessayer.
            </p>
          )}
        </div>

        {/* Answer recap */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Récapitulatif</h3>
          {questions.map((q, i) => {
            const ans      = answers[i]
            const correct  = ans?.correct
            return (
              <div key={q.id} className={`flex items-start gap-3 p-3 rounded-xl ${correct ? 'bg-green-50' : 'bg-red-50'}`}>
                {correct
                  ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  : <XCircle    className="w-5 h-5 text-red-500   shrink-0 mt-0.5" />}
                <p className="text-sm text-gray-700 leading-snug">{q.text}</p>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          {!passed && (
            <Button
              variant="outline"
              onClick={() => {
                setCurrent(0); setSelected(null); setAnswers({}); setPhase('quiz')
              }}
              className="flex-1"
            >
              Réessayer
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 bg-primary-600 hover:bg-primary-700"
          >
            {saving ? 'Sauvegarde…' : passed ? 'Continuer le module' : 'Enregistrer et revenir'}
          </Button>
        </div>
      </div>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────
  if (!question) return null

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
            <span>Question {current + 1}/{totalQ}</span>
            <span className="flex items-center gap-1 text-gold-600 font-medium">
              <Trophy className="w-3.5 h-3.5" />
              {mod.xp_reward_quiz} XP
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6">
        <p className="text-lg font-semibold text-gray-900 leading-snug mb-6">
          {question.text}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((option) => {
              const isSelected = selected === option.id
              const showResult = phase === 'feedback'

              let style = 'border-sand-200 bg-white hover:border-primary-300 hover:bg-primary-50'
              if (showResult && option.is_correct) {
                style = 'border-green-400 bg-green-50'
              } else if (showResult && isSelected && !option.is_correct) {
                style = 'border-red-400 bg-red-50'
              } else if (isSelected) {
                style = 'border-primary-500 bg-primary-50'
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  disabled={answered}
                  className={cn(
                    'w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all leading-snug',
                    style,
                    !answered && 'cursor-pointer',
                    answered && 'cursor-default',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5',
                      showResult && option.is_correct ? 'border-green-500 bg-green-500 text-white' :
                      showResult && isSelected && !option.is_correct ? 'border-red-500 bg-red-500 text-white' :
                      isSelected ? 'border-primary-500 bg-primary-500 text-white' :
                      'border-gray-300 text-gray-400'
                    )}>
                      {['A','B','C','D'][option.sort_order - 1]}
                    </span>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                </button>
              )
            })}
        </div>
      </div>

      {/* Feedback */}
      {phase === 'feedback' && (
        <div className={cn(
          'rounded-xl p-4 border',
          isCorrect
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        )}>
          <div className="flex items-start gap-2.5">
            {isCorrect
              ? <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              : <XCircle    className="w-5 h-5 text-red-500   shrink-0 mt-0.5" />}
            <div>
              <p className={cn('font-semibold text-sm mb-1', isCorrect ? 'text-green-800' : 'text-red-800')}>
                {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait.'}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isCorrect
                  ? selectedOption?.feedback_correct
                  : correctOption?.feedback_incorrect ?? `La bonne réponse était : ${correctOption?.text}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {phase === 'feedback' && (
        <Button
          onClick={handleNext}
          className="w-full bg-primary-600 hover:bg-primary-700 gap-2"
        >
          {current < totalQ - 1 ? (
            <><span>Question suivante</span><ChevronRight className="w-4 h-4" /></>
          ) : (
            <span>Voir les résultats</span>
          )}
        </Button>
      )}
    </div>
  )
}
