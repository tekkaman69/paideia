'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen, Lightbulb, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { markLessonRead } from '@/lib/actions/modules'
import type { Module } from '@/types'

export interface LessonSection {
  titre:      string
  contenu:    string
  points_cles?: string[]
  exemple?:   string
}

interface Props {
  module:     Module
  sections:   LessonSection[]
  moduleSlug: string
}

export function LessonReader({ module: mod, sections, moduleSlug }: Props) {
  const router  = useRouter()
  const [current, setCurrent] = useState(0)
  const [saving,  setSaving]  = useState(false)
  const [done,    setDone]    = useState(false)

  const section    = sections[current]
  const total      = sections.length
  const progressPct = Math.round(((current + 1) / total) * 100)
  const isLast     = current === total - 1

  async function handleFinish() {
    setSaving(true)
    await markLessonRead(mod.id, moduleSlug)
    setSaving(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 text-center border border-primary-200">
          <p className="text-6xl mb-4">📖</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cours lu !</h2>
          <p className="text-gray-600 mb-4">Vous pouvez maintenant passer aux exercices.</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary-100 text-primary-700 font-bold">
            <Zap className="w-4 h-4" />
            Cours complété ✓
          </div>
        </div>
        <Button
          onClick={() => router.push(`/app/parent/modules/${moduleSlug}`)}
          className="w-full bg-primary-600 hover:bg-primary-700 rounded-2xl h-12 text-base font-bold"
        >
          Retour au module →
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/app/parent/modules/${moduleSlug}`)}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          Module
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="font-medium">{current + 1} / {total}</span>
            <span className="font-semibold text-primary-600 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Cours
            </span>
          </div>
          <Progress value={progressPct} className="h-3 [&>div]:bg-primary-500" />
        </div>
      </div>

      {/* Module title */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-5 text-white">
        <p className="text-primary-300 text-xs font-semibold uppercase tracking-widest mb-1">{mod.title}</p>
        <h1 className="text-xl font-bold leading-snug">{section.titre}</h1>
      </div>

      {/* Section content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">

        {/* Main text */}
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
          {section.contenu.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4 last:mb-0">{para}</p>
          ))}
        </div>

        {/* Key points */}
        {section.points_cles && section.points_cles.length > 0 && (
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-primary-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Points clés
            </p>
            <ul className="space-y-2">
              {section.points_cles.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-primary-900">
                  <span className="text-primary-500 font-bold mt-0.5 shrink-0">→</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Example */}
        {section.exemple && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              En pratique
            </p>
            <p className="text-sm text-amber-900 leading-relaxed italic">{section.exemple}</p>
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-2.5 rounded-full transition-all',
              i < current    ? 'bg-primary-400 w-2.5'
              : i === current ? 'bg-primary-600 w-6'
              : 'bg-gray-200 w-2.5'
            )}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {current > 0 && (
          <Button
            variant="outline"
            onClick={() => setCurrent(c => c - 1)}
            className="gap-2 rounded-2xl"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </Button>
        )}
        {isLast ? (
          <Button
            onClick={handleFinish}
            disabled={saving}
            className="flex-1 bg-primary-600 hover:bg-primary-700 rounded-2xl h-12 font-bold text-base"
          >
            {saving ? 'Sauvegarde…' : '✅ J\'ai lu ce cours'}
          </Button>
        ) : (
          <Button
            onClick={() => setCurrent(c => c + 1)}
            className="flex-1 bg-primary-600 hover:bg-primary-700 rounded-2xl h-11 font-bold gap-2"
          >
            <span>Section suivante</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
