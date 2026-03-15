import { Plus, Video, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

export default async function AdminClassesVirtuellesPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: rooms } = await supabase
    .from('virtual_rooms')
    .select('*')
    .order('created_at', { ascending: false })

  type RoomRow = { id: string; name: string; provider: string; room_url: string | null; is_active: boolean; max_participants: number | null; scheduled_start: string | null; scheduled_end: string | null }
  const rows = (rooms ?? []) as unknown as RoomRow[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes virtuelles</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les salles de classe virtuelle.</p>
        </div>
        <Button className="gap-2 bg-primary-600 hover:bg-primary-700" disabled>
          <Plus className="w-4 h-4" />Nouvelle salle
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Video className="w-4 h-4 text-primary-500" />Salles disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!rows.length ? (
            <div className="text-center py-12">
              <Video className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucune salle virtuelle</p>
              <p className="text-sm text-gray-400">Les salles sont créées automatiquement lors de la planification d&apos;un événement de type &quot;Classe virtuelle&quot;.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map(room => (
                <div key={room.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <Video className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{room.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-xs border-0 bg-gray-100 text-gray-600">{room.provider}</Badge>
                        {room.max_participants && (
                          <span className="text-xs text-gray-400">Max {room.max_participants} participants</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`text-xs border-0 ${room.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {room.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {room.room_url ? (
                      <a href={room.room_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Rejoindre
                        </Button>
                      </a>
                    ) : (
                      <Button size="sm" variant="outline" className="text-xs" disabled>
                        Lien indisponible
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
