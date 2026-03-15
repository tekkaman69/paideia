'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  TrendingUp,
  BookOpen,
  CreditCard,
  User,
  Target,
  Video,
  Flame,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/lib/auth/actions'
import { initials } from '@/lib/utils'
import type { UserRole, Profile } from '@/types'

// ── Nav configs ───────────────────────────────────────────────
const parentNav = [
  { href: '/app/parent/dashboard',        icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/app/parent/planning',         icon: Calendar,        label: 'Planning' },
  { href: '/app/parent/progression',      icon: TrendingUp,      label: 'Progression' },
  { href: '/app/parent/classe-virtuelle', icon: Video,           label: 'Classe virtuelle' },
  { href: '/app/parent/ressources',       icon: BookOpen,        label: 'Ressources' },
  { href: '/app/parent/facturation',      icon: CreditCard,      label: 'Facturation' },
  { href: '/app/parent/compte',           icon: User,            label: 'Compte' },
]

const eleveNav = [
  { href: '/app/eleve/dashboard',       icon: Flame,           label: 'Mon espace' },
  { href: '/app/eleve/objectifs',       icon: Target,          label: 'Mes objectifs' },
  { href: '/app/eleve/ressources',      icon: BookOpen,        label: 'Ressources' },
  { href: '/app/eleve/planning',        icon: Calendar,        label: 'Planning' },
  { href: '/app/eleve/classe-virtuelle',icon: Video,           label: 'Classe virtuelle' },
  { href: '/app/eleve/profil',          icon: User,            label: 'Mon profil' },
]

// ── Types ─────────────────────────────────────────────────────
interface AppSidebarProps {
  role: UserRole
  profile?: Profile | null
  mobileOpen?: boolean
  onMobileClose?: () => void
}

// ── Component ─────────────────────────────────────────────────
export function AppSidebar({ role, profile, mobileOpen = false, onMobileClose }: AppSidebarProps) {
  const pathname = usePathname()
  const navItems = role === 'eleve' ? eleveNav : parentNav

  const sidebarContent = (
    <aside className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo + close button on mobile */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/images/logo.svg" alt="Paideia" width={110} height={24} className="h-6 w-auto" />
        </Link>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-widest">
          {role === 'eleve' ? 'Espace élève' : 'Espace parent'}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4 space-y-0.5 overflow-y-auto" aria-label="Navigation principale">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onMobileClose}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 flex-shrink-0 transition-colors',
                  isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'
                )}
              />
              <span className="flex-1">{label}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-sidebar-primary opacity-70" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: user info + logout */}
      <div className="border-t border-sidebar-border p-3 flex-shrink-0">
        {profile && (
          <div className="flex items-center gap-3 px-2 py-2 mb-1 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-primary text-xs font-bold flex-shrink-0">
              {initials(profile.full_name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {profile.full_name}
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{profile.email}</p>
            </div>
          </div>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:flex h-screen flex-shrink-0 sticky top-0">
        {sidebarContent}
      </div>

      {/* Mobile: overlay drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="relative flex h-full animate-slide-up">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
