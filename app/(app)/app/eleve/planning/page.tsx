import { Calendar, Clock, Video, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { requireStudent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatTimeFr } from '@/lib/utils'
import type { Event } from '@/types'

const EVENT_TYPE_COLORS: Record<string, string> = {
  cours:            'bg-primary-100 text-primary-700',
  rdv_parent:       'bg-purple-100 text-purple-700',
  atelier:          'bg-orange-100 text-orange-700',
  classe_virtuelle: 'bg-green-100 text-green-700',
  autre:            'bg-gray-100 text-gray-700',
}
const EVENT_TYPE_LABELS: Record<string, string> = {
  cours:            'Cours',
  rdv_parent:       'RDV',
  atelier:          'Atelier',
  classe_virtuelle: 'Classe virtuelle',
  autre:            'Autre',
}

type EventWithRoom = Event & { virtual_room?: { room_url?: string | null } | null }

function groupByDate(events: Event[]): Record<string, Event[]> {
  return events.reduce<Record<string, Event[]>>((acc, e) => {
    const key = e.start_at.slice(0, 10)
    ;(acc[key] = acc[key] ?? []).push(e)
    return acc
  }, {})
}

export default async function ElevePlanningPage() {
  const profile  = await requireStudent()
  const supabase = await createClient()

  const { data: rawStudent } = await supabase
    .from('students')
    .select('id')
    .eq('profile_id', profile.id)
    .maybeSingle()
  const student = rawStudent as { id: string } | null

  const { data: events } = student
    ? await supabase
        .from('events')
        .select('*, virtual_room:virtual_rooms(*), event_participants!inner(profile_id)')
        .eq('event_participants.profile_id', profile.id)
        .gte('start_at', new Date().toISOString())
        .order('start_at', { ascending: true })
        .limit(30)
    : { data: [] }

  const grouped  = groupByDate((events ?? []) as Event[])
  const dateKeys = Object.keys(grouped).sort()

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Mon planning</h1>
        <p className="text-gray-500 mt-1">Toutes tes prochaines séances et activités.</p>
      </div>

      {!dateKeys.length ? (
        <Card className="border-dashed border-2 border-gray-200 shadow-none">
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-700 mb-1">Aucune séance planifiée</h3>
            <p className="text-sm text-gray-400">Tes prochains cours et événements apparaîtront ici.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {dateKeys.map(dateKey => {
            const dayEvents = grouped[dateKey]
            const date      = new Date(dateKey + 'T12:00:00')
            return (
              <div key={dateKey}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col items-center justify-center shrink-0 shadow-md">
                    <span className="text-primary-200 text-[10px] font-semibold uppercase tracking-wide leading-none">
                      {date.toLocaleDateString('fr-FR', { month: 'short' })}
                    </span>
                    <span className="text-white text-xl font-bold leading-tight">{date.getDate()}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 capitalize text-base">
                      {date.toLocaleDateString('fr-FR', { weekday: 'long' })}
                    </p>
                    <p className="text-xs text-gray-400">{formatDateFr(date)}</p>
                  </div>
                </div>

                <div className="space-y-3 pl-6 border-l-2 border-primary-100 ml-7">
                  {(dayEvents as EventWithRoom[]).map(event => (
                    <Card key={event.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2 mb-1.5">
                              <h3 className="font-semibold text-gray-800 text-sm">{event.title}</h3>
                              <Badge variant="secondary" className={`text-xs border-0 ${EVENT_TYPE_COLORS[event.event_type] ?? 'bg-gray-100 text-gray-700'}`}>
                                {EVENT_TYPE_LABELS[event.event_type] ?? event.event_type}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                {formatTimeFr(event.start_at)}{event.end_at && ` – ${formatTimeFr(event.end_at)}`}
                              </span>
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{event.description}</p>
                            )}
                            {event.virtual_room?.room_url && (
                              <a href={event.virtual_room.room_url} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700 h-8 text-xs">
                                  <Video className="w-3.5 h-3.5" />
                                  Rejoindre
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
