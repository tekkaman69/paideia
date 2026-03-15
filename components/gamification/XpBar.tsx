/**
 * components/gamification/XpBar.tsx
 * Barre de progression XP.
 */

import React from 'react'
import { xpProgress } from '@/lib/utils'

export function XpBar({ xp }: { xp: number }) {
  const { level, current, needed, percent } = xpProgress(xp)

  return (
    <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Niveau {level}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gold-600">{xp}</div>
          <div className="text-xs text-gray-400">points XP</div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="bg-sand-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{current} / {needed} XP</span>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  )
}
