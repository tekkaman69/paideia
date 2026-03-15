import { Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

export default async function AdminSettingsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: rawSettings } = await supabase
    .from('platform_settings')
    .select('*')
    .order('key', { ascending: true })

  type Setting = { id: string; key: string; value: unknown; description: string | null }
  const settings = (rawSettings ?? []) as unknown as Setting[]

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres plateforme</h1>
        <p className="text-gray-500 mt-1">Configuration globale de la plateforme Paideia.</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary-500" />
            Paramètres système
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!settings?.length ? (
            <p className="text-sm text-gray-400 py-4 text-center">Aucun paramètre configuré.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {settings.map(s => (
                <div key={s.key} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-800 font-mono">{s.key}</p>
                    {s.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{s.description}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 max-w-xs text-right truncate">
                    {typeof s.value === 'object' ? JSON.stringify(s.value) : String(s.value ?? '—')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
