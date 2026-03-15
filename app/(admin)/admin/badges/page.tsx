import { Plus, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

const RARITY_COLORS: Record<string, string> = {
  common:    'bg-gray-100 text-gray-600',
  rare:      'bg-blue-100 text-blue-700',
  epic:      'bg-purple-100 text-purple-700',
  legendary: 'bg-yellow-100 text-yellow-700',
}

const RARITY_LABELS: Record<string, string> = {
  common: 'Commun', rare: 'Rare', epic: 'Épique', legendary: 'Légendaire',
}

export default async function AdminBadgesPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: badges } = await supabase
    .from('badges')
    .select('*')
    .order('rarity')

  type BadgeRow = { id: string; key: string; title: string; description: string | null; icon: string | null; xp_required: number | null; rarity: string; is_active: boolean }
  const rows = (badges ?? []) as unknown as BadgeRow[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badges</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les badges de la gamification.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!rows.length ? (
          <div className="col-span-full text-center py-12">
            <Award className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aucun badge créé</p>
            <p className="text-sm text-gray-400">Lancez le seed pour avoir des badges de démo.</p>
          </div>
        ) : rows.map(badge => (
          <Card key={badge.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 text-center">
              <div className="text-3xl mb-2">{badge.icon ?? '🏅'}</div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{badge.title}</h3>
              {badge.description && <p className="text-xs text-gray-400 mb-3 line-clamp-2">{badge.description}</p>}
              <div className="flex flex-wrap gap-1 justify-center">
                <Badge variant="secondary" className={`text-xs border-0 ${RARITY_COLORS[badge.rarity] ?? 'bg-gray-100 text-gray-600'}`}>
                  {RARITY_LABELS[badge.rarity] ?? badge.rarity}
                </Badge>
                {badge.xp_required && (
                  <Badge variant="secondary" className="text-xs border-0 bg-yellow-50 text-yellow-700">
                    {badge.xp_required} XP
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
