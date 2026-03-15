/**
 * components/gamification/BadgeCard.tsx
 */

import React from 'react'
import { fromNow } from '@/lib/utils'
import type { Badge, StudentBadge } from '@/types'

interface BadgeCardProps {
  badge: Badge
  earned?: StudentBadge
  locked?: boolean
}

export function BadgeCard({ badge, earned, locked = false }: BadgeCardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center transition-all ${
        locked
          ? 'border-sand-100 bg-sand-50 opacity-50 grayscale'
          : 'border-gold-200 bg-gold-50 shadow-sm hover:shadow-gold'
      }`}
      title={badge.criteria as string | undefined}
    >
      <div className={`text-3xl mb-2 ${locked ? 'grayscale' : ''}`} aria-hidden>
        {badge.icon}
      </div>
      <div className="font-semibold text-primary-900 text-sm mb-1">{badge.title}</div>
      <div className="text-xs text-gray-500 mb-2 leading-snug">{badge.description}</div>
      {earned && (
        <div className="text-xs text-gold-600 font-medium">
          Obtenu {fromNow(earned.earned_at)}
        </div>
      )}
      {locked && (
        <div className="text-xs text-gray-400 mt-1">🔒 {badge.criteria as string}</div>
      )}
    </div>
  )
}
