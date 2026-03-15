import Link from 'next/link'
import {
  Users, GraduationCap, CreditCard, TrendingUp,
  Calendar, BookOpen, AlertCircle, ChevronRight,
  UserPlus, Activity, DollarSign,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatTimeFr, formatPrice, initials } from '@/lib/utils'
import type { Profile, Event, Subscription, Payment } from '@/types'

export default async function AdminDashboardPage() {
  await requireAdmin()
  const supabase = await createClient()

  // Parallel data fetching
  const [
    { count: totalUsers },
    { count: totalStudents },
    { count: totalParents },
    { count: activeSubscriptions },
    { data: recentProfiles },
    { data: upcomingEvents },
    { data: recentPayments },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('students').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'parent'),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).in('status', ['active', 'trialing']),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('events').select('*').gte('start_at', new Date().toISOString()).order('start_at', { ascending: true }).limit(5),
    supabase.from('payments').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  // Monthly revenue
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  const { data: monthlyPayments } = await supabase
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded')
    .gte('created_at', startOfMonth.toISOString())

  const monthlyRevenue = (monthlyPayments ?? []).reduce((sum: number, p: { amount: number }) => sum + (p.amount ?? 0), 0)

  const STATS = [
    { icon: Users,         bg: 'bg-primary-100',  ic: 'text-primary-600',  grad: 'from-primary-50',  value: totalUsers ?? 0,          label: 'Utilisateurs total',     href: '/admin/users' },
    { icon: GraduationCap, bg: 'bg-gold-100',      ic: 'text-gold-600',     grad: 'from-gold-50',     value: totalStudents ?? 0,        label: 'Élèves',                 href: '/admin/eleves' },
    { icon: CreditCard,    bg: 'bg-green-100',     ic: 'text-green-600',    grad: 'from-green-50',    value: activeSubscriptions ?? 0, label: 'Abonnements actifs',     href: '/admin/subscriptions' },
    { icon: DollarSign,    bg: 'bg-teal-100',      ic: 'text-teal-600',     grad: 'from-teal-50',     value: formatPrice(monthlyRevenue), label: 'Revenus ce mois',      href: '/admin/payments' },
  ]

  const ROLE_COLORS: Record<string, string> = {
    admin:   'bg-red-100 text-red-700',
    parent:  'bg-primary-100 text-primary-700',
    eleve:   'bg-gold-100 text-gold-700',
    teacher: 'bg-green-100 text-green-700',
    staff:   'bg-purple-100 text-purple-700',
  }

  const PAYMENT_STATUS_COLORS: Record<string, string> = {
    succeeded: 'bg-green-100 text-green-700',
    failed:    'bg-red-100 text-red-700',
    pending:   'bg-yellow-100 text-yellow-700',
    refunded:  'bg-gray-100 text-gray-700',
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
        <p className="text-gray-500 mt-1">Vue d'ensemble de la plateforme Paideia.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, bg, ic, grad, value, label, href }) => (
          <Link key={label} href={href}>
            <Card className={`border-0 shadow-sm bg-gradient-to-br ${grad} to-white hover:shadow-md transition-shadow cursor-pointer`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${ic}`} />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent registrations */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-primary-500" />
                  Inscriptions récentes
                </CardTitle>
                <Link href="/admin/users">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary-600">
                    Voir tout <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {!recentProfiles?.length ? (
                <p className="text-sm text-gray-400 py-6 text-center">Aucun utilisateur inscrit.</p>
              ) : (
                <div className="space-y-0 divide-y divide-gray-50">
                  {(recentProfiles as unknown as Profile[]).map(p => (
                    <div key={p.id} className="flex items-center gap-3 py-3 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
                      <Avatar className="w-9 h-9 shrink-0">
                        <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-xs">
                          {initials(p.full_name ?? p.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{p.full_name ?? '—'}</p>
                        <p className="text-xs text-gray-400 truncate">{p.email}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="secondary" className={`text-xs border-0 ${ROLE_COLORS[p.role] ?? 'bg-gray-100 text-gray-600'}`}>
                          {p.role}
                        </Badge>
                        <span className="text-xs text-gray-400 hidden sm:block">{formatDateFr(p.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming events */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  Prochains événements
                </CardTitle>
                <Link href="/admin/calendar">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary-600 h-7 px-2">
                    Tout <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-1 pb-4">
              {!upcomingEvents?.length ? (
                <p className="text-xs text-gray-400 py-4 text-center">Aucun événement planifié.</p>
              ) : (
                <div className="space-y-2">
                  {(upcomingEvents as unknown as Event[]).map(e => (
                    <div key={e.id} className="p-2.5 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                      <p className="text-xs font-semibold text-gray-800 truncate">{e.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDateFr(e.start_at)} à {formatTimeFr(e.start_at)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <CardTitle className="text-sm">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="pt-1 pb-4 space-y-1">
              {[
                { href: '/admin/users',         icon: Users,         label: 'Gérer les utilisateurs' },
                { href: '/admin/eleves',        icon: GraduationCap, label: 'Voir les élèves' },
                { href: '/admin/calendar',      icon: Calendar,      label: 'Gérer le planning' },
                { href: '/admin/resources',     icon: BookOpen,      label: 'Gérer les ressources' },
                { href: '/admin/subscriptions', icon: CreditCard,    label: 'Abonnements' },
              ].map(({ href, icon: Icon, label }) => (
                <Link key={href} href={href} className="block">
                  <Button variant="ghost" className="w-full justify-start gap-2.5 h-9 text-xs text-gray-700 hover:bg-gray-50">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    {label}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent payments */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Paiements récents
            </CardTitle>
            <Link href="/admin/payments">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary-600">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {!recentPayments?.length ? (
            <p className="text-sm text-gray-400 py-6 text-center">Aucun paiement enregistré.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Utilisateur', 'Montant', 'Statut', 'Date'].map(h => (
                      <th key={h} className="text-left py-2.5 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(recentPayments as unknown as Payment[]).map(payment => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="py-3 pr-4">
                        <span className="font-mono text-xs text-gray-500 truncate block max-w-[120px]">
                          {payment.profile_id.slice(0, 12)}…
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-semibold text-gray-800">{formatPrice(payment.amount)}</td>
                      <td className="py-3 pr-4">
                        <Badge variant="secondary" className={`text-xs border-0 ${PAYMENT_STATUS_COLORS[payment.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs text-gray-500">{formatDateFr(payment.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
