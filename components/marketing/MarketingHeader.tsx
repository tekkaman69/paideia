'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { Menu, X, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, initials } from '@/lib/utils'
import { signOut } from '@/lib/auth/actions'
import type { Profile } from '@/types'

const navLinks = [
  { label: 'Offres & tarifs', href: '/offres' },
  { label: 'Méthodes',        href: '/methodes' },
  { label: 'Blog',            href: '/blog' },
  { label: 'À propos',        href: '/a-propos' },
  { label: 'FAQ',             href: '/faq' },
]

function dashboardHref(role: string) {
  if (role === 'admin') return '/admin'
  if (role === 'eleve') return '/app/eleve/dashboard'
  return '/app/parent/dashboard'
}

interface MarketingHeaderProps {
  profile?: Profile | null
}

export function MarketingHeader({ profile }: MarketingHeaderProps) {
  const [open, setOpen]       = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close account menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-account-menu]')) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-sand-200 shadow-sm">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/images/logo.svg" alt="Paideia" width={130} height={28} className="h-7 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-700 hover:bg-sand-100 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — connecté ou non */}
          <div className="hidden md:flex items-center gap-2">
            {profile ? (
              <div className="relative" data-account-menu>
                <button
                  onClick={() => setMenuOpen(v => !v)}
                  className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-sand-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold flex-shrink-0">
                    {initials(profile.full_name)}
                  </div>
                  <span className="max-w-[120px] truncate">{profile.full_name ?? profile.email}</span>
                  <ChevronDown className={cn('w-3.5 h-3.5 text-gray-400 transition-transform', menuOpen && 'rotate-180')} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white shadow-lg py-1.5 z-50">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-gray-800 truncate">{profile.full_name}</p>
                      <p className="text-xs text-gray-400 truncate">{profile.email}</p>
                    </div>
                    <Link
                      href={dashboardHref(profile.role)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-sand-100 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary-500" />
                      Mon tableau de bord
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <form action={signOut}>
                        <button type="submit" className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/connexion">Se connecter</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/inscription">Commencer gratuitement</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-sand-100 transition-colors text-gray-600"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-sand-200 py-4 bg-white animate-slide-up">
            <nav className="flex flex-col gap-0.5 mb-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-sand-100 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {profile ? (
              <div className="px-2 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sand-50">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold flex-shrink-0">
                    {initials(profile.full_name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{profile.full_name}</p>
                    <p className="text-xs text-gray-400 truncate">{profile.email}</p>
                  </div>
                </div>
                <Button variant="secondary" asChild className="w-full gap-2">
                  <Link href={dashboardHref(profile.role)} onClick={() => setOpen(false)}>
                    <LayoutDashboard className="w-4 h-4" />
                    Mon tableau de bord
                  </Link>
                </Button>
                <form action={signOut} className="w-full">
                  <Button type="submit" variant="outline" className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-2">
                <Button variant="secondary" asChild className="w-full">
                  <Link href="/auth/connexion" onClick={() => setOpen(false)}>
                    Se connecter
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/inscription" onClick={() => setOpen(false)}>
                    Commencer gratuitement
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
