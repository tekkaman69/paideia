'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Target,
  Award,
  Calendar,
  Video,
  CreditCard,
  Package,
  Receipt,
  FileText,
  Settings,
  Activity,
  ChevronRight,
  LogOut,
  UserCheck,
  GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/lib/auth/actions'

// ── Nav sections ──────────────────────────────────────────────
const navSections = [
  {
    title: 'Vue d\'ensemble',
    items: [
      { href: '/admin',           icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    title: 'Utilisateurs',
    items: [
      { href: '/admin/parents',   icon: UserCheck,    label: 'Parents' },
      { href: '/admin/eleves',    icon: GraduationCap,label: 'Élèves' },
    ],
  },
  {
    title: 'Pédagogie',
    items: [
      { href: '/admin/ressources',icon: BookOpen,     label: 'Ressources' },
      { href: '/admin/objectifs', icon: Target,       label: 'Objectifs' },
      { href: '/admin/badges',    icon: Award,        label: 'Badges' },
    ],
  },
  {
    title: 'Planning',
    items: [
      { href: '/admin/calendrier',    icon: Calendar, label: 'Calendrier' },
      { href: '/admin/classes-virtuelles', icon: Video, label: 'Classes virtuelles' },
    ],
  },
  {
    title: 'Commercial',
    items: [
      { href: '/admin/plans',         icon: Package,  label: 'Plans' },
      { href: '/admin/abonnements',   icon: CreditCard,label: 'Abonnements' },
      { href: '/admin/paiements',     icon: Receipt,  label: 'Paiements' },
    ],
  },
  {
    title: 'Blog',
    items: [
      { href: '/admin/blog',          icon: FileText,  label: 'Articles' },
    ],
  },
  {
    title: 'Système',
    items: [
      { href: '/admin/parametres',    icon: Settings,  label: 'Paramètres' },
      { href: '/admin/logs',          icon: Activity,  label: 'Logs' },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────
export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border flex-shrink-0 sticky top-0">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border flex-shrink-0">
        <Link href="/" className="flex flex-col gap-0.5 group">
          <Image src="/images/logo.svg" alt="Paideia" width={110} height={24} className="h-6 w-auto" />
          <span className="text-[10px] text-sidebar-foreground/40 leading-tight tracking-wide">Administration</span>
        </Link>
        <span className="ml-auto inline-flex items-center rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-300 uppercase tracking-wide">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" aria-label="Navigation admin">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold text-sidebar-foreground/35 uppercase tracking-widest">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, icon: Icon, label }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150',
                      active
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 flex-shrink-0',
                        active ? 'text-sidebar-primary' : 'text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70'
                      )}
                    />
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight className="h-3 w-3 text-sidebar-primary opacity-60" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3 flex-shrink-0">
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  )
}
