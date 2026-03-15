import { CreditCard, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatPrice, initials } from '@/lib/utils'
import type { Subscription, Plan, Profile } from '@/types'

const STATUS_META: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  active:     { label: 'Actif',      color: 'bg-green-100 text-green-700',   icon: CheckCircle },
  trialing:   { label: 'Essai',      color: 'bg-blue-100 text-blue-700',     icon: Clock },
  past_due:   { label: 'Impayé',     color: 'bg-orange-100 text-orange-700', icon: AlertCircle },
  canceled:   { label: 'Annulé',     color: 'bg-red-100 text-red-700',       icon: XCircle },
  unpaid:     { label: 'Non payé',   color: 'bg-red-100 text-red-700',       icon: XCircle },
  incomplete: { label: 'Incomplet',  color: 'bg-gray-100 text-gray-600',     icon: Clock },
}

type SubscriptionRow = Subscription & {
  plan:    Plan | null
  profile: Pick<Profile, 'id' | 'full_name' | 'email' | 'avatar_url'> | null
}

export default async function AdminSubscriptionsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: subscriptions, count } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*), profile:profiles(id, full_name, email, avatar_url)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(100)

  const rows = (subscriptions ?? []) as unknown as SubscriptionRow[]

  // Aggregate stats
  const active   = rows.filter(s => s.status === 'active').length
  const trialing = rows.filter(s => s.status === 'trialing').length
  const canceled = rows.filter(s => s.status === 'canceled').length
  const pastDue  = rows.filter(s => s.status === 'past_due').length

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Abonnements</h1>
        <p className="text-gray-500 mt-1">{count ?? 0} abonnements au total.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Actifs',    value: active,   bg: 'bg-green-50',  text: 'text-green-700',  icon: CheckCircle },
          { label: 'En essai',  value: trialing, bg: 'bg-blue-50',   text: 'text-blue-700',   icon: Clock },
          { label: 'Impayés',   value: pastDue,  bg: 'bg-orange-50', text: 'text-orange-700', icon: AlertCircle },
          { label: 'Annulés',   value: canceled, bg: 'bg-red-50',    text: 'text-red-700',    icon: XCircle },
        ].map(({ label, value, bg, text, icon: Icon }) => (
          <Card key={label} className={`border-0 shadow-sm ${bg}`}>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Icon className={`w-5 h-5 ${text}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${text}`}>{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Client', 'Plan', 'Statut', 'Facturation', 'Période', 'Début', 'Renouvellement'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!rows.length ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                    Aucun abonnement.
                  </td>
                </tr>
              ) : (
                rows.map(sub => {
                  const meta = STATUS_META[sub.status] ?? { label: sub.status, color: 'bg-gray-100 text-gray-600', icon: Clock }
                  const StatusIcon = meta.icon
                  return (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-xs">
                              {initials(sub.profile?.full_name ?? sub.profile?.email ?? '?')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate max-w-[140px]">
                              {sub.profile?.full_name ?? '—'}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[140px]">
                              {sub.profile?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{sub.plan?.name ?? '—'}</p>
                          {sub.plan && (
                            <p className="text-xs text-gray-400">
                              {formatPrice(sub.plan.price_monthly)}/mois
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className={`text-xs border-0 gap-1 ${meta.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {meta.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs capitalize">
                        {sub.billing_cycle === 'yearly' ? 'Annuelle' : 'Mensuelle'}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                        {sub.current_period_start
                          ? `${formatDateFr(sub.current_period_start)} →`
                          : '—'}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatDateFr(sub.created_at)}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                        {sub.current_period_end ? formatDateFr(sub.current_period_end) : '—'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
