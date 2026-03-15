import Link from 'next/link'
import { CreditCard, Calendar, CheckCircle, ExternalLink, Receipt, ArrowUpRight, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { requireParent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatPrice } from '@/lib/utils'
import type { Subscription, Plan, Payment } from '@/types'

const STATUS_META: Record<string, { label: string; color: string }> = {
  active:     { label: 'Actif',      color: 'bg-green-100 text-green-700 border-green-200' },
  trialing:   { label: 'Essai',      color: 'bg-blue-100 text-blue-700 border-blue-200' },
  canceled:   { label: 'Annulé',     color: 'bg-red-100 text-red-700 border-red-200' },
  past_due:   { label: 'Impayé',     color: 'bg-orange-100 text-orange-700 border-orange-200' },
  unpaid:     { label: 'Impayé',     color: 'bg-orange-100 text-orange-700 border-orange-200' },
  incomplete: { label: 'Incomplet',  color: 'bg-gray-100 text-gray-700 border-gray-200' },
}

const PAYMENT_STATUS_META: Record<string, { label: string; color: string }> = {
  succeeded: { label: 'Réussi',     color: 'bg-green-100 text-green-700' },
  failed:    { label: 'Échoué',     color: 'bg-red-100 text-red-700' },
  pending:   { label: 'En cours',   color: 'bg-yellow-100 text-yellow-700' },
  refunded:  { label: 'Remboursé',  color: 'bg-gray-100 text-gray-700' },
}

export default async function ParentFacturationPage() {
  const profile  = await requireParent()
  const supabase = await createClient()

  const { data: rawSubscription } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*)')
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false })
    .maybeSingle()
  const subscription = rawSubscription as (Subscription & { plan: Plan }) | null

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const sub = subscription

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Facturation</h1>
        <p className="text-gray-500 mt-1">Gérez votre abonnement et consultez vos paiements.</p>
      </div>

      {/* Subscription card */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="w-5 h-5 text-primary-200" />
                <span className="text-primary-200 text-sm font-medium">Abonnement actuel</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {sub?.plan?.name ?? 'Aucun abonnement'}
              </h2>
              {sub && (
                <Badge className={`border text-xs font-medium ${STATUS_META[sub.status]?.color ?? 'bg-gray-100 text-gray-700'}`}>
                  {STATUS_META[sub.status]?.label ?? sub.status}
                </Badge>
              )}
            </div>
            {sub?.plan && (
              <div className="text-right shrink-0">
                <p className="text-3xl font-bold">
                  {formatPrice(sub.plan.price_monthly)}
                </p>
                <p className="text-primary-200 text-sm">
                  /{sub.billing_cycle === 'yearly' ? 'an' : 'mois'}
                </p>
              </div>
            )}
          </div>
        </div>

        {sub ? (
          <CardContent className="p-6 space-y-5">
            {/* Plan features */}
            {sub.plan?.features && Array.isArray(sub.plan.features) && sub.plan.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Inclus dans votre plan</h3>
                <ul className="space-y-2">
                  {(sub.plan.features as string[]).map((feat: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sub.plan?.features && sub.plan.features.length > 0 && <Separator />}

            {/* Billing details */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {sub.current_period_start && (
                <div>
                  <p className="text-gray-500 mb-0.5">Début de la période</p>
                  <p className="font-medium text-gray-800">{formatDateFr(sub.current_period_start)}</p>
                </div>
              )}
              {sub.current_period_end && (
                <div>
                  <p className="text-gray-500 mb-0.5">
                    {sub.status === 'canceled' ? "Fin d'accès" : 'Prochain renouvellement'}
                  </p>
                  <p className="font-medium text-gray-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {formatDateFr(sub.current_period_end)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-500 mb-0.5">Facturation</p>
                <p className="font-medium text-gray-800 capitalize">
                  {sub.billing_cycle === 'yearly' ? 'Annuelle' : 'Mensuelle'}
                </p>
              </div>
              {sub.plan?.has_virtual_class && (
                <div>
                  <p className="text-gray-500 mb-0.5">Classe virtuelle</p>
                  <p className="font-medium text-green-600 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Incluse
                  </p>
                </div>
              )}
              {sub.plan?.max_students != null && (
                <div>
                  <p className="text-gray-500 mb-0.5">Élèves max</p>
                  <p className="font-medium text-gray-800">{sub.plan.max_students}</p>
                </div>
              )}
              {sub.plan?.sessions_per_month != null && (
                <div>
                  <p className="text-gray-500 mb-0.5">Séances par mois</p>
                  <p className="font-medium text-gray-800">{sub.plan.sessions_per_month}</p>
                </div>
              )}
              {sub.stripe_subscription_id && (
                <div>
                  <p className="text-gray-500 mb-0.5">Référence</p>
                  <p className="font-mono text-xs text-gray-600 truncate">{sub.stripe_subscription_id}</p>
                </div>
              )}
            </div>

            {sub.cancel_at_period_end && (
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-sm">
                Votre abonnement sera résilié à la fin de la période en cours ({formatDateFr(sub.current_period_end)}).
              </div>
            )}

            <Separator />

            <div className="flex flex-wrap gap-3">
              <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                <ArrowUpRight className="w-4 h-4" />
                Gérer l'abonnement
              </Button>
              {sub.status === 'active' && !sub.cancel_at_period_end && (
                <Button size="sm" variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                  Résilier
                </Button>
              )}
            </div>
          </CardContent>
        ) : (
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-2">Vous n'avez pas d'abonnement actif.</p>
            <p className="text-sm text-gray-400 mb-5">Choisissez un plan pour accéder à toutes les fonctionnalités Paideia.</p>
            <Link href="/offres">
              <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                <ExternalLink className="w-4 h-4" />
                Voir les offres
              </Button>
            </Link>
          </CardContent>
        )}
      </Card>

      {/* Payment history */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Receipt className="w-4 h-4 text-gray-500" />
            Historique des paiements
          </CardTitle>
          <CardDescription>Tous vos paiements Paideia.</CardDescription>
        </CardHeader>
        <CardContent>
          {!payments?.length ? (
            <div className="text-center py-8">
              <Receipt className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Aucun paiement enregistré.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2.5 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="text-left py-2.5 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Montant</th>
                    <th className="text-left py-2.5 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                    <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(payments as Payment[]).map(payment => {
                    const meta = PAYMENT_STATUS_META[payment.status] ?? { label: payment.status, color: 'bg-gray-100 text-gray-700' }
                    return (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">
                          {formatDateFr(payment.created_at)}
                        </td>
                        <td className="py-3 pr-4 font-semibold text-gray-900 whitespace-nowrap">
                          {formatPrice(payment.amount, payment.currency)}
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="secondary" className={`text-xs border-0 ${meta.color}`}>
                            {meta.label}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <span className="text-xs text-gray-500 truncate max-w-[200px] block">
                            {payment.description ?? payment.stripe_invoice_id ?? '—'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
