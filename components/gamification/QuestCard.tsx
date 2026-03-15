/**
 * components/gamification/QuestCard.tsx
 */

import React from 'react'
import type { Goal } from '@/types'

export function QuestCard({ quest }: { quest: Goal }) {
  return (
    <div className="bg-white rounded-xl border border-sand-200 p-4 flex items-start gap-3">
      {quest.icon && <div className="text-2xl flex-shrink-0" aria-hidden>{quest.icon}</div>}
      <div className="flex-1">
        <div className="font-medium text-primary-900 text-sm mb-0.5">{quest.title}</div>
        <div className="text-xs text-gray-500 leading-relaxed">{quest.description}</div>
      </div>
      <div className="flex-shrink-0 bg-gold-50 text-gold-700 font-bold text-sm px-2 py-1 rounded-lg">
        +{quest.xp_reward} XP
      </div>
    </div>
  )
}
