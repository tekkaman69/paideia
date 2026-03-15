import Link from 'next/link'
import { CreditCard, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import type { Plan } from '@/types'

export default async function AdminPlansPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: plans } = await supabase
    .from('plans')
    .select('*')
    .order('price_monthly', { ascending: true })

  const allPlans = (plans ?? []) as unknown as Plan[]

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plans & abonnements</h1>
          <p className="text-gray-500 mt-1">Gérez les offres disponibles sur la plateforme.</p>
        </div>
        <Button className="gap-2 bg-primary-600 hover:bg-primary-700" asChild>
          <Link href="/admin/plans/new">
            <Plus className="w-4 h-4" /> Nouveau plan
          </Link>
        </Button>
      </div>

      {!allPlans.length ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <CreditCard className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Aucun plan configuré</p>
            <p className="text-gray-400 text-sm mt-1">Créez votre premier plan tarifaire.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPlans.map(plan => (
            <Card key={plan.id} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={plan.is_active ? 'bg-green-100 text-green-700 border-0' : 'bg-gray-100 text-gray-500 border-0'}
                  >
                    {plan.is_active ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-2xl font-bold text-primary-900">{formatPrice(plan.price_monthly)}</span>
                  <span className="text-sm text-gray-400">/mois</span>
                  {plan.price_yearly && (
                    <div className="text-xs text-gray-400 mt-0.5">{formatPrice(plan.price_yearly)}/an</div>
                  )}
                </div>
                {plan.description && (
                  <p className="text-sm text-gray-500">{plan.description}</p>
                )}
                {plan.stripe_price_id_monthly && (
                  <p className="text-xs font-mono text-gray-400 truncate">
                    Stripe: {plan.stripe_price_id_monthly}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
