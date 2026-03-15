'use client'

/**
 * CalmModeProvider — Mode Calme / DYS
 * - Fond beige chaud, texte brun, police Atkinson Hyperlegible
 * - Persisté en localStorage, optionnellement synchronisé avec Supabase
 */

import React, { createContext, useEffect, useState } from 'react'

interface CalmModeContextValue {
  calmMode: boolean
  dysFontEnabled: boolean
  toggleCalmMode: () => void
  toggleDysFont: () => void
}

export const CalmModeContext = createContext<CalmModeContextValue | null>(null)

const LS_CALM = 'paideia_calm_mode'
const LS_DYS  = 'paideia_dys_font'

export function CalmModeProvider({ children }: { children: React.ReactNode }) {
  const [calmMode, setCalmMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(LS_CALM) === 'true'
  })

  const [dysFontEnabled, setDysFontEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(LS_DYS) === 'true'
  })

  useEffect(() => {
    const html = document.documentElement
    calmMode ? html.classList.add('calm') : html.classList.remove('calm')
  }, [calmMode])

  useEffect(() => {
    const html = document.documentElement
    dysFontEnabled ? html.classList.add('dys-font') : html.classList.remove('dys-font')
  }, [dysFontEnabled])

  const toggleCalmMode = () => {
    const next = !calmMode
    setCalmMode(next)
    localStorage.setItem(LS_CALM, String(next))
  }

  const toggleDysFont = () => {
    const next = !dysFontEnabled
    setDysFontEnabled(next)
    localStorage.setItem(LS_DYS, String(next))
  }

  return (
    <CalmModeContext.Provider value={{ calmMode, dysFontEnabled, toggleCalmMode, toggleDysFont }}>
      {children}
    </CalmModeContext.Provider>
  )
}
