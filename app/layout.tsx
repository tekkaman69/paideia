/**
 * app/layout.tsx
 * Layout racine: fonts, providers, Toaster.
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Quicksand } from 'next/font/google'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { CalmModeProvider } from '@/components/providers/CalmModeProvider'
import './globals.css'

// ── Fonts ─────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

// ── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://paideia.fr'),
  title: {
    default: 'Paideia — Soutien scolaire premium',
    template: '%s | Paideia',
  },
  description:
    'Accompagnement scolaire personnalisé et structuré pour votre enfant. Méthodes pédagogiques éprouvées, interface motivante et suivi parental complet.',
  keywords: ['soutien scolaire', 'cours particuliers', 'accompagnement scolaire', 'plateforme éducative'],
  authors: [{ name: 'Paideia' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Paideia',
    title: 'Paideia — Soutien scolaire premium',
    description: 'Accompagnement scolaire personnalisé et structuré pour votre enfant.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E3A5F',
}

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${quicksand.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Atkinson Hyperlegible — police optimisée pour la lisibilité / DYS
          Chargée via Google Fonts (self-host recommandé pour production)
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AuthProvider>
          <CalmModeProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </CalmModeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
