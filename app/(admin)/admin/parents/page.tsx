import { Mail, Phone, Users, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

export default async function AdminParentsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: parents } = await supabase
    .from('profiles')
    .select('*, students:students(id, display_name)')
    .eq('role', 'parent')
    .order('created_at', { ascending: false })

  type ParentRow = { id: string; email: string; full_name: string | null; phone: string | null; created_at: string; students: { id: string; display_name: string }[] }
  const rows = (parents ?? []) as unknown as ParentRow[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parents</h1>
          <p className="text-gray-500 text-sm mt-1">{rows.length} parent(s) inscrit(s) sur la plateforme.</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-primary-500" />Tous les parents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!rows.length ? (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucun parent inscrit</p>
              <p className="text-sm text-gray-400">Les parents apparaîtront ici après leur inscription.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Parent', 'Email', 'Téléphone', 'Élèves', 'Inscrit le'].map(h => (
                      <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                            {(p.full_name ?? p.email)[0].toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{p.full_name ?? '—'}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <a href={`mailto:${p.email}`} className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600">
                          <Mail className="w-3.5 h-3.5" />{p.email}
                        </a>
                      </td>
                      <td className="py-3 pr-4">
                        {p.phone ? (
                          <a href={`tel:${p.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600">
                            <Phone className="w-3.5 h-3.5" />{p.phone}
                          </a>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {p.students.length ? p.students.map(s => (
                            <Badge key={s.id} variant="secondary" className="text-xs border-0 bg-primary-50 text-primary-700">{s.display_name}</Badge>
                          )) : <span className="text-gray-300 text-xs">Aucun</span>}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-400">
                        {new Date(p.created_at).toLocaleDateString('fr-FR')}
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
