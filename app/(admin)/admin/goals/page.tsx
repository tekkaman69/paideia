import Link from 'next/link'
import { Plus, Zap, Target, Edit } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import type { Goal } from '@/types'

export default async function AdminGoalsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: goals } = await supabase
    .from('goals')
    .select('*')
    .order('sort_order')

  const cats = [...new Set((goals ?? []).map((g: Goal) => g.category).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Objectifs pédagogiques</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les objectifs assignables aux élèves.</p>
        </div>
        <Link href="/admin/goals/new">
          <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4" />
            Nouvel objectif
          </Button>
        </Link>
      </div>

      {/* Stats by category */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0 px-3 py-1.5">
          Tous ({goals?.length ?? 0})
        </Badge>
        {cats.map(cat => (
          <Badge
            key={cat}
            variant="secondary"
            className="bg-primary-50 text-primary-700 border-0 px-3 py-1.5"
          >
            {cat} ({(goals ?? []).filter((g: Goal) => g.category === cat).length})
          </Badge>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {!(goals ?? []).length ? (
            <div className="text-center py-12">
              <Target className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucun objectif créé</p>
              <p className="text-sm text-gray-400 mb-4">
                Créez des objectifs pour les assigner à vos élèves.
              </p>
              <Link href="/admin/goals/new">
                <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                  <Plus className="w-4 h-4" />
                  Créer un objectif
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Objectif', 'Catégorie', 'XP', 'Statut', 'Actions'].map(h => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(goals as Goal[]).map(goal => (
                    <tr key={goal.id} className="hover:bg-gray-50 group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {goal.icon && (
                            <span className="text-xl w-8 text-center">{goal.icon}</span>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">{goal.title}</p>
                            {goal.description && (
                              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                                {goal.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {goal.category ? (
                          <Badge
                            variant="secondary"
                            className="text-xs border-0 bg-primary-50 text-primary-700"
                          >
                            {goal.category}
                          </Badge>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-yellow-500" />
                          <span className="font-semibold text-gray-700">{goal.xp_reward}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="secondary"
                          className={`text-xs border-0 ${
                            goal.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {goal.is_active ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/goals/${goal.id}`}>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </td>
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
