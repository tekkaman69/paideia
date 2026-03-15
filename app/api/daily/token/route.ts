import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/server'

export async function POST(request: Request) {
  const user = await requireAuth()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  // Daily.co token generation (requires DAILY_API_KEY env var)
  const { roomName } = await request.json()

  if (!process.env.DAILY_API_KEY || !roomName) {
    return NextResponse.json({ error: 'Configuration manquante' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.daily.co/v1/meeting-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          user_id: user.id,
          exp: Math.floor(Date.now() / 1000) + 3600,
        },
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur Daily.co' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ token: data.token })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
