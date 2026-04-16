'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { saveEleveQuizResult } from '@/lib/actions/student-modules'
import type { Module, QuizQuestionWithOptions, QuizOption } from '@/types'

interface Props {
  module:     Module
  questions:  QuizQuestionWithOptions[]
  moduleSlug: string
}

type Phase = 'quiz' | 'feedback' | 'results'

const ANSWER_LETTERS = ['A', 'B', 'C', 'D']

export function EleveQuizPlayer({ module: mod, questions, moduleSlug }: Props) {
  const router  = useRouter()
  const [phase, setPhase]       = useState<Phase>('quiz')
  const [current, setCurrent]   = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers]   = useState<Record<number, { optionId: string; correct: boolean }>>({})
  const [saving, setSaving]     = useState(false)

  const question      = questions[current]
  const totalQ        = questions.length
  const answered      = selected !== null
  const correctOption = question?.options.find(o => o.is_correct)
  const selectedOption = question?.options.find(o => o.id === selected)
  const isCorrect     = selectedOption?.is_correct ?? false
  const progressPct   = Math.round((current / totalQ) * 100)

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
    const score = Object.values(answers).filter(a => a.correct).length
    await saveEleveQuizResult(mod.id, moduleSlug, score, totalQ)
    setSaving(false)
    router.push(`/app/eleve/modules/${moduleSlug}`)
  }

  // ── Results ───────────────────────────────────────────────────────────
  if (phase === 'results') {
    const score  = Object.values(answers).filter(a => a.correct).length
    const passed = score >= (mod.quiz_pass_threshold ?? 5)

    return (
      <div className="space-y-8">
        <div className={`rounded-3xl p-8 text-center ${passed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' : 'bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200'}`}>
          <p className="text-6xl mb-4">{passed ? '🏆' : '💪'}</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {passed ? 'Bravo !' : 'Continue comme ça !'}
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            Tu as eu <strong>{score}</strong> bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur <strong>{totalQ}</strong> !
          </p>
          {passed ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-100 text-green-700 font-bold">
              <Zap className="w-4 h-4" />
              +{mod.xp_reward_quiz} XP gagnés !
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-white rounded-xl p-3">
              Il faut au moins {mod.quiz_pass_threshold ?? 5}/{totalQ} pour valider. Tu peux réessayer !
            </p>
          )}
        </div>

        {/* Answer recap */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800 text-lg">Récapitulatif 📋</h3>
          {questions.map((q, i) => {
            const ans = answers[i]
            return (
              <div key={q.id} className={`flex items-start gap-3 p-3.5 rounded-2xl ${ans?.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                {ans?.correct
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
              onClick={() => { setCurrent(0); setSelected(null); setAnswers({}); setPhase('quiz') }}
              className="flex-1 rounded-2xl h-12"
            >
              🔄 Réessayer
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 text-base font-bold"
          >
            {saving ? 'Sauvegarde…' : passed ? '✨ Continuer le module' : 'Enregistrer'}
          </Button>
        </div>
      </div>
    )
  }

  if (!question) return null

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
            <span className="font-medium">Question {current + 1} / {totalQ}</span>
            <span className="flex items-center gap-1 text-yellow-600 font-bold">
              <Zap className="w-3.5 h-3.5" />
              {mod.xp_reward_quiz} XP
            </span>
          </div>
          <Progress value={progressPct} className="h-3 [&>div]:bg-violet-500" />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-7">
        <p className="text-xl font-bold text-gray-900 leading-snug mb-6">
          {question.text}
        </p>

        <div className="space-y-3">
          {question.options
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((option, idx) => {
              const isSelected = selected === option.id
              const showResult = phase === 'feedback'

              let style = 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50'
              if (showResult && option.is_correct) {
                style = 'border-green-400 bg-green-50'
              } else if (showResult && isSelected && !option.is_correct) {
                style = 'border-red-400 bg-red-50'
              } else if (isSelected) {
                style = 'border-violet-500 bg-violet-50'
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  disabled={answered}
                  className={cn(
                    'w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-medium transition-all leading-snug',
                    style,
                    !answered && 'cursor-pointer active:scale-[0.99]',
                    answered && 'cursor-default',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      'w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 text-sm font-bold',
                      showResult && option.is_correct ? 'border-green-500 bg-green-500 text-white' :
                      showResult && isSelected && !option.is_correct ? 'border-red-500 bg-red-500 text-white' :
                      isSelected ? 'border-violet-500 bg-violet-500 text-white' :
                      'border-gray-300 text-gray-400'
                    )}>
                      {ANSWER_LETTERS[idx]}
                    </span>
                    <span className="text-gray-800 text-base">{option.text}</span>
                  </div>
                </button>
              )
            })}
        </div>
      </div>

      {/* Feedback */}
      {phase === 'feedback' && (
        <div className={cn(
          'rounded-2xl p-5 border-2',
          isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
        )}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{isCorrect ? '🎉' : '🤔'}</span>
            <div>
              <p className={cn('font-bold text-base mb-1', isCorrect ? 'text-green-800' : 'text-red-800')}>
                {isCorrect ? 'Bonne réponse !' : 'Pas tout à fait…'}
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
          className="w-full bg-violet-600 hover:bg-violet-700 rounded-2xl h-12 text-base font-bold gap-2"
        >
          {current < totalQ - 1 ? (
            <><span>Question suivante</span><ChevronRight className="w-5 h-5" /></>
          ) : (
            <span>Voir les résultats 🏁</span>
          )}
        </Button>
      )}
    </div>
  )
}
