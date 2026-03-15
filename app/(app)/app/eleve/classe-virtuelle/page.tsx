import Link from 'next/link'
import { Video, Calendar, Clock, ExternalLink, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireStudent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatTimeFr } from '@/lib/utils'
import type { Event } from '@/types'

export default async function ClasseVirtuelleePage() {
  const profile  = await requireStudent()
  const supabase = await createClient()

  const { data: rawStudent } = await supabase
    .from('students')
    .select('id')
    .eq('profile_id', profile.id)
    .maybeSingle()
  const student = rawStudent as { id: string } | null

  // Check if they have an active subscription with virtual class access
  const { data: rawSubscription } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(has_virtual_class)')
    .eq('profile_id', profile.id)
    .in('status', ['active', 'trialing'])
    .maybeSingle()
  const subscription = rawSubscription as { plan: { has_virtual_class: boolean } } | null

  const hasAccess = subscription?.plan?.has_virtual_class ?? false

  // Fetch upcoming virtual class events
  const { data: upcomingClasses } = await supabase
    .from('events')
    .select('*, virtual_room:virtual_rooms(*), event_participants!inner(profile_id)')
    .eq('event_participants.profile_id', profile.id)
    .eq('event_type', 'classe_virtuelle')
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true })
    .limit(5)

  type EventWithRoom = Event & { virtual_room: { room_url: string | null; provider: string } | null }
  const classes = (upcomingClasses ?? []) as unknown as EventWithRoom[]
  const nextClass = classes[0]

  if (!hasAccess) {
    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Classe virtuelle</h1>
          <p className="text-gray-500 mb-6">La classe virtuelle est disponible à partir du plan Essentiel.</p>
          <Link href="/app/parent/facturation">
            <Button className="bg-primary-600 hover:bg-primary-700">Voir les offres</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Video className="w-6 h-6 text-primary-500" />
          Classe virtuelle
        </h1>
        <p className="text-gray-500 mt-1 text-sm">Rejoins tes cours en ligne.</p>
      </div>

      {/* Next class highlight */}
      {nextClass ? (
        <Card className="border-0 shadow-md bg-gradient-to-br from-primary-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">Prochaine séance</p>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{nextClass.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-400" />
                    {formatDateFr(nextClass.start_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary-400" />
                    {formatTimeFr(nextClass.start_at)} — {formatTimeFr(nextClass.end_at)}
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center shrink-0">
                <Video className="w-7 h-7 text-white" />
              </div>
            </div>
            {nextClass.virtual_room?.room_url ? (
              <div className="mt-5">
                <a href={nextClass.virtual_room.room_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                    <Video className="w-5 h-5" />
                    Rejoindre la classe
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <p className="text-xs text-gray-400 mt-2">La classe s'ouvrira dans un nouvel onglet.</p>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                Le lien de connexion n'est pas encore disponible. Il sera ajouté avant la séance.
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 border-gray-200 shadow-none">
          <CardContent className="p-10 text-center">
            <Video className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aucune classe virtuelle planifiée</p>
            <p className="text-sm text-gray-400 mt-1">Ta prochaine classe apparaîtra ici quand elle sera planifiée.</p>
          </CardContent>
        </Card>
      )}

      {/* All upcoming classes */}
      {classes.length > 1 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-3 text-sm">Prochaines classes</h2>
          <div className="space-y-2">
            {classes.slice(1).map(cls => (
              <Card key={cls.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary-700">{new Date(cls.start_at).getDate()}</span>
                    <span className="text-[10px] text-primary-500">{new Date(cls.start_at).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{cls.title}</p>
                    <p className="text-xs text-gray-400">{formatTimeFr(cls.start_at)} — {formatTimeFr(cls.end_at)}</p>
                  </div>
                  {cls.virtual_room?.room_url && (
                    <a href={cls.virtual_room.room_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Video className="w-3.5 h-3.5" />
                        Rejoindre
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
