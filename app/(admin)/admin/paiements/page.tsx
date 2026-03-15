import { Receipt, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatPrice, initials } from '@/lib/utils'
import type { Payment, Profile } from '@/types'

const STATUS_META: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  succeeded: { label: 'Réussi',     color: 'bg-green-100 text-green-700',   icon: CheckCircle },
  failed:    { label: 'Échoué',     color: 'bg-red-100 text-red-700',       icon: XCircle },
  pending:   { label: 'En cours',   color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  refunded:  { label: 'Remboursé',  color: 'bg-gray-100 text-gray-600',     icon: RefreshCw },
}

type PaymentRow = Payment & {
  profile: Pick<Profile, 'id' | 'full_name' | 'email' | 'avatar_url'> | null
}

export default async function AdminPaymentsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: payments, count } = await supabase
    .from('payments')
    .select('*, profile:profiles(id, full_name, email, avatar_url)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(100)

  const rows = (payments ?? []) as unknown as PaymentRow[]

  // Aggregate stats
  const succeeded = rows.filter(p => p.status === 'succeeded')
  const failed    = rows.filter(p => p.status === 'failed').length
  const refunded  = rows.filter(p => p.status === 'refunded').length
  const revenue   = succeeded.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Paiements</h1>
        <p className="text-gray-500 mt-1">{count ?? 0} paiements enregistrés.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenus (EUR)',  value: formatPrice(revenue), bg: 'bg-green-50',  text: 'text-green-700',  icon: Receipt },
          { label: 'Réussis',        value: succeeded.length,     bg: 'bg-primary-50', text: 'text-primary-700', icon: CheckCircle },
          { label: 'Échoués',        value: failed,               bg: 'bg-red-50',    text: 'text-red-700',    icon: XCircle },
          { label: 'Remboursés',     value: refunded,             bg: 'bg-gray-50',   text: 'text-gray-600',   icon: RefreshCw },
        ].map(({ label, value, bg, text, icon: Icon }) => (
          <Card key={label} className={`border-0 shadow-sm ${bg}`}>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Icon className={`w-5 h-5 ${text}`} />
              </div>
              <div>
                <p className={`text-xl font-bold ${text}`}>{value}</p>
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
                {['Client', 'Montant', 'Statut', 'Description', 'Référence Stripe', 'Date'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!rows.length ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    Aucun paiement.
                  </td>
                </tr>
              ) : (
                rows.map(payment => {
                  const meta = STATUS_META[payment.status] ?? { label: payment.status, color: 'bg-gray-100 text-gray-600', icon: Clock }
                  const StatusIcon = meta.icon
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-xs">
                              {initials(payment.profile?.full_name ?? payment.profile?.email ?? '?')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate max-w-[140px]">
                              {payment.profile?.full_name ?? '—'}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[140px]">
                              {payment.profile?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">
                        {formatPrice(payment.amount, payment.currency)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className={`text-xs border-0 gap-1 ${meta.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {meta.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-500 max-w-[200px]">
                        <span className="truncate block text-xs">
                          {payment.description ?? '—'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs text-gray-400 truncate max-w-[160px] block">
                          {payment.stripe_invoice_id ?? payment.stripe_payment_intent_id ?? '—'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatDateFr(payment.created_at)}
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
