import Link from 'next/link'
import { Plus, Calendar, Clock, Users, Video, MapPin, Edit } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatTimeFr } from '@/lib/utils'
import type { Event } from '@/types'

const EVENT_TYPE_LABELS: Record<string, string> = {
  cours:            'Cours',
  rdv_parent:       'RDV Parent',
  atelier:          'Atelier',
  classe_virtuelle: 'Classe virtuelle',
  autre:            'Autre',
}

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-gray-100 text-gray-600',
}

type EventRow = Event & {
  virtual_room?: { room_url?: string | null } | null
  event_participants?: [{ count: number }]
}

function EventCard({ event }: { event: EventRow }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-primary-100 flex flex-col items-center justify-center shrink-0 text-center">
        <span className="text-xs font-bold text-primary-700 leading-none">
          {new Date(event.start_at).getDate()}
        </span>
        <span className="text-[10px] text-primary-500 capitalize">
          {new Date(event.start_at).toLocaleDateString('fr-FR', { month: 'short' })}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 text-sm">{event.title}</h3>
          <Badge
            variant="secondary"
            className={`text-xs border-0 ${STATUS_COLORS[event.status] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {event.status}
          </Badge>
          <Badge variant="secondary" className="text-xs border-0 bg-amber-50 text-amber-700">
            {EVENT_TYPE_LABELS[event.event_type] ?? event.event_type}
          </Badge>
        </div>
        <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTimeFr(event.start_at)} — {formatTimeFr(event.end_at)}
          </span>
          {event.event_participants?.[0]?.count != null && (
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.event_participants[0].count} participant(s)
            </span>
          )}
          {event.virtual_room?.room_url && (
            <span className="flex items-center gap-1 text-green-600">
              <Video className="w-3 h-3" />
              Salle virtuelle
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {event.location}
            </span>
          )}
        </div>
      </div>
      <Link
        href={`/admin/calendar/${event.id}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  )
}

export default async function AdminCalendarPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: upcoming } = await supabase
    .from('events')
    .select('*, virtual_room:virtual_rooms(id, room_url, provider), event_participants(count)')
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true })
    .limit(20)

  const { data: past } = await supabase
    .from('events')
    .select('*, virtual_room:virtual_rooms(id, room_url), event_participants(count)')
    .lt('start_at', new Date().toISOString())
    .order('start_at', { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planning & Événements</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gérez les cours, rendez-vous et classes virtuelles.
          </p>
        </div>
        <Link href="/admin/calendar/new">
          <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4" />
            Nouvel événement
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Upcoming events */}
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-500" />
            À venir ({upcoming?.length ?? 0})
          </h2>
          {!(upcoming ?? []).length ? (
            <Card className="border-dashed border-2 border-gray-200 shadow-none">
              <CardContent className="p-8 text-center">
                <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Aucun événement à venir</p>
                <Link href="/admin/calendar/new" className="mt-3 inline-block">
                  <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Planifier un événement
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {(upcoming as unknown as EventRow[]).map(e => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>

        {/* Past events */}
        {(past ?? []).length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-500 mb-3">
              Passés ({past!.length})
            </h2>
            <div className="space-y-2 opacity-70">
              {(past as unknown as EventRow[]).slice(0, 5).map(e => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
