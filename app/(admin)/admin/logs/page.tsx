import { Activity, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLogsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: logs } = await supabase
    .from('audit_logs')
    .select('*, actor:profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(100)

  type LogRow = { id: string; action: string; resource_type: string | null; resource_id: string | null; ip_address: string | null; created_at: string; actor: { full_name: string | null; email: string } | null }
  const rows = (logs ?? []) as LogRow[]

  const ACTION_COLORS: Record<string, string> = {
    create: 'bg-green-100 text-green-700',
    update: 'bg-blue-100 text-blue-700',
    delete: 'bg-red-100 text-red-700',
    login:  'bg-purple-100 text-purple-700',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Logs d&apos;audit</h1>
        <p className="text-gray-500 text-sm mt-1">Historique des actions sur la plateforme.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary-500" />Dernières actions ({rows.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!rows.length ? (
            <div className="text-center py-12">
              <Activity className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucun log enregistré</p>
              <p className="text-sm text-gray-400">Les actions des utilisateurs apparaîtront ici.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Acteur', 'Action', 'Ressource', 'IP', 'Date'].map(h => (
                      <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map(log => {
                    const actionKey = log.action.split('.')[0] ?? log.action
                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="py-2.5 pr-4 text-xs text-gray-600">{log.actor?.full_name ?? log.actor?.email ?? 'Système'}</td>
                        <td className="py-2.5 pr-4">
                          <Badge variant="secondary" className={`text-xs border-0 ${ACTION_COLORS[actionKey] ?? 'bg-gray-100 text-gray-600'}`}>{log.action}</Badge>
                        </td>
                        <td className="py-2.5 pr-4 text-xs text-gray-500">{log.resource_type ?? '—'}</td>
                        <td className="py-2.5 pr-4 text-xs text-gray-400">{log.ip_address ?? '—'}</td>
                        <td className="py-2.5 pr-4 text-xs text-gray-400">{new Date(log.created_at).toLocaleString('fr-FR')}</td>
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
