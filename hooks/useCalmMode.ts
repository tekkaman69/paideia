/**
 * hooks/useCalmMode.ts
 * Hook pour le Mode Calme (UX accessible DYS/TDAH).
 * Persisté dans localStorage + synchronisé avec le profil Firestore.
 */

'use client'

import { useContext } from 'react'
import { CalmModeContext } from '@/components/providers/CalmModeProvider'

export function useCalmMode() {
  const ctx = useContext(CalmModeContext)
  if (!ctx) {
    throw new Error('useCalmMode doit être utilisé dans un <CalmModeProvider>')
  }
  return ctx
}
