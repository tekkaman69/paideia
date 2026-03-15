import { notFound } from 'next/navigation'
import { ExternalLink, Video, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { requireAuth } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import type { VirtualRoom } from '@/types'

interface Props { params: { bookingId: string } }

export default async function ClassePage({ params }: Props) {
  await requireAuth()
  const supabase = await createClient()

  const { data: rawRoom } = await supabase
    .from('virtual_rooms')
    .select('*')
    .eq('id', params.bookingId)
    .maybeSingle()
  const room = rawRoom as VirtualRoom | null

  if (!room) notFound()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-gray-800 border-gray-700 text-white">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-6">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{room.name}</h1>
          <p className="text-gray-400 mb-6">Classe virtuelle Paideia</p>
          {room.room_url ? (
            <a href={room.room_url} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700">
                <Video className="w-5 h-5" />
                Rejoindre la classe
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          ) : (
            <p className="text-yellow-400 text-sm">Le lien de connexion n'est pas encore disponible.</p>
          )}
          <Link href="/app/eleve/dashboard" className="block mt-4">
            <Button variant="ghost" className="text-gray-400 hover:text-white gap-2 w-full">
              <ArrowLeft className="w-4 h-4" />
              Retour au tableau de bord
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
