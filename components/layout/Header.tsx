/**
 * components/layout/Header.tsx
 * En-tête public du site avec navigation, CTA et menu mobile.
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCalmMode } from '@/hooks/useCalmMode'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/methodes',  label: 'Méthodes' },
  { href: '/offres',    label: 'Offres' },
  { href: '/blog',      label: 'Blog' },
  { href: '/faq',       label: 'FAQ' },
  { href: '/a-propos',  label: 'À propos' },
]

export function Header() {
  const pathname  = usePathname()
  const router    = useRouter()
  const { calmMode, toggleCalmMode } = useCalmMode()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-shadow duration-200',
        'bg-white/95 backdrop-blur-sm',
        scrolled ? 'shadow-sm border-b border-sand-100' : 'border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl" aria-hidden>🏛️</span>
            <span className="font-bold text-xl text-primary-900 tracking-tight">Paideia</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  pathname === href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Toggle mode calme */}
            <button
              onClick={toggleCalmMode}
              title={calmMode ? 'Désactiver le mode calme' : 'Activer le mode calme'}
              className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              aria-pressed={calmMode}
            >
              {calmMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {!loading && (
              user ? (
                // Connecté
                <div className="flex items-center gap-2">
                  <Link href="/app" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-sand-50 transition-colors">
                    <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.email}
                    </span>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Déconnexion
                  </Button>
                </div>
              ) : (
                // Non connecté
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/auth/connexion">
                    <Button variant="ghost" size="sm">Connexion</Button>
                  </Link>
                  <Link href="/reserver">
                    <Button variant="gold" size="sm">Réserver une séance</Button>
                  </Link>
                </div>
              )
            )}

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-sand-100 transition-colors"
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-sand-100 bg-white px-4 py-4 space-y-1 animate-fade-in">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-sand-50'
              )}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-sand-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/app" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">Mon espace</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/connexion" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Connexion</Button>
                </Link>
                <Link href="/reserver" onClick={() => setMenuOpen(false)}>
                  <Button variant="gold" size="sm" className="w-full">Réserver une séance</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
