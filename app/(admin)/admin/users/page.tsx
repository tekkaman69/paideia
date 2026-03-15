import { Search, Filter, UserCheck, UserX } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, initials } from '@/lib/utils'
import type { Profile } from '@/types'

const ROLE_META: Record<string, { label: string; color: string }> = {
  admin:   { label: 'Admin',       color: 'bg-red-100 text-red-700' },
  parent:  { label: 'Parent',      color: 'bg-primary-100 text-primary-700' },
  eleve:   { label: 'Élève',       color: 'bg-gold-100 text-gold-700' },
  teacher: { label: 'Enseignant',  color: 'bg-green-100 text-green-700' },
  staff:   { label: 'Staff',       color: 'bg-purple-100 text-purple-700' },
}

export default async function AdminUsersPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: profiles, count } = await supabase
    .from('profiles')
    .select('*, subscriptions(status)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-500 mt-1">{count ?? 0} utilisateurs inscrits sur la plateforme.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input type="search" placeholder="Rechercher par nom ou email…" className="pl-9 h-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(ROLE_META).map(([role, meta]) => (
            <Button key={role} variant="outline" size="sm" className="h-10 text-xs gap-1.5">
              <span className={`w-2 h-2 rounded-full ${meta.color.split(' ')[0]}`} />
              {meta.label}
            </Button>
          ))}
        </div>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Utilisateur', 'Email', 'Rôle', 'Inscription', 'Abonnement', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!profiles?.length ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                (profiles as Array<Profile & { subscriptions?: { status: string }[] }>).map(profile => {
                  const sub   = profile.subscriptions?.[0]
                  const meta  = ROLE_META[profile.role] ?? { label: profile.role, color: 'bg-gray-100 text-gray-600' }
                  return (
                    <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 shrink-0">
                            {profile.avatar_url && <img src={profile.avatar_url} alt="" />}
                            <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-xs">
                              {initials(profile.full_name ?? profile.email)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-800 truncate max-w-[150px]">
                            {profile.full_name ?? '—'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500 truncate max-w-[180px]">
                        {profile.email}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className={`text-xs border-0 ${meta.color}`}>
                          {meta.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">
                        {formatDateFr(profile.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        {sub ? (
                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-xs text-green-600 capitalize">{sub.status}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <UserX className="w-3.5 h-3.5 text-gray-300" />
                            <span className="text-xs text-gray-400">Aucun</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-primary-600">
                            Voir
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Modifier
                          </Button>
                        </div>
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
