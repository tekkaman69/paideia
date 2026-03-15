/**
 * components/layout/AdminSidebar.tsx
 * Sidebar de l'espace admin/intervenante.
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Calendar, BookOpen, Users,
  FileText, LogOut, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/admin',              icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/admin/planning',     icon: Calendar,        label: 'Planning' },
  { href: '/admin/reservations', icon: BookOpen,        label: 'Réservations' },
  { href: '/admin/eleves',       icon: Users,           label: 'Élèves' },
  { href: '/admin/blog',         icon: FileText,        label: 'Blog' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-primary-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-800">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          <div>
            <div className="font-bold text-white text-sm">Paideia</div>
            <div className="text-primary-400 text-xs">Espace admin</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1" aria-label="Navigation admin">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                'transition-colors duration-150',
                isActive
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-200 hover:bg-primary-800 hover:text-white'
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={14} className="opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-primary-800">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-primary-300 hover:text-white hover:bg-primary-800 transition-colors"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
