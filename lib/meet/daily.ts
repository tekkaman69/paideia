/**
 * lib/meet/daily.ts
 * Helpers Daily.co: création de rooms privées + génération de tokens JWT.
 * Documentation: https://docs.daily.co/reference/rest-api
 */

const DAILY_API_BASE = 'https://api.daily.co/v1'

// ── Types Daily ───────────────────────────────────────────────

export interface DailyRoomOptions {
  roomName?: string     // si non fourni, Daily génère un nom aléatoire
  expiresIn?: number    // secondes avant expiration de la room (défaut: 2h)
  maxParticipants?: number
}

export interface DailyRoom {
  id: string
  name: string
  url: string           // URL publique de la room (non utilisée directement)
  privacy: 'private' | 'public'
  config: Record<string, unknown>
}

export interface DailyTokenOptions {
  roomName: string
  userId: string
  userName: string
  isOwner?: boolean     // intervenante = owner (peut muter, kick)
  expiresIn?: number    // secondes (défaut: 3h)
}

export interface DailyMeetingToken {
  token: string
  joinUrl: string       // URL avec token pour rejoindre
}

// ── Création d'une room privée ────────────────────────────────
/**
 * Crée une room Daily privée pour un booking.
 * Privacy = "private" → accès uniquement via token.
 */
export async function createDailyRoom(opts: DailyRoomOptions = {}): Promise<DailyRoom> {
  const apiKey = process.env.DAILY_API_KEY
  if (!apiKey) throw new Error('DAILY_API_KEY non configuré')

  const expiresAt = Math.floor(Date.now() / 1000) + (opts.expiresIn ?? 7200) // 2h par défaut

  const body: Record<string, unknown> = {
    privacy: 'private',
    properties: {
      exp: expiresAt,
      max_participants: opts.maxParticipants ?? 6,
      // Désactive enregistrement pour RGPD
      enable_recording: false,
      // Chat activé
      enable_chat: true,
      // Désactive caméra par défaut (moins stressant)
      start_video_off: true,
      // Micro désactivé par défaut
      start_audio_off: true,
      // Titre de la room
      lang: 'fr',
    },
  }

  if (opts.roomName) {
    body.name = opts.roomName
  }

  const res = await fetch(`${DAILY_API_BASE}/rooms`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Daily room creation failed: ${res.status} — ${error}`)
  }

  return res.json()
}

// ── Génération d'un token de réunion ─────────────────────────
/**
 * Génère un token JWT Daily pour un utilisateur spécifique.
 * Ce token permet de rejoindre une room privée.
 */
export async function createDailyToken(opts: DailyTokenOptions): Promise<DailyMeetingToken> {
  const apiKey = process.env.DAILY_API_KEY
  const domain = process.env.NEXT_PUBLIC_DAILY_DOMAIN

  if (!apiKey) throw new Error('DAILY_API_KEY non configuré')
  if (!domain) throw new Error('NEXT_PUBLIC_DAILY_DOMAIN non configuré')

  const expiresAt = Math.floor(Date.now() / 1000) + (opts.expiresIn ?? 10800) // 3h

  const body = {
    properties: {
      room_name: opts.roomName,
      user_id:   opts.userId,
      user_name:  opts.userName,
      is_owner:  opts.isOwner ?? false,
      exp:       expiresAt,
      // Propriétés supplémentaires pour les owners (intervenantes)
      ...(opts.isOwner && {
        enable_recording:   false,
        start_video_off:    false,
        start_audio_off:    false,
      }),
    },
  }

  const res = await fetch(`${DAILY_API_BASE}/meeting-tokens`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Daily token creation failed: ${res.status} — ${error}`)
  }

  const data = await res.json()
  const joinUrl = `https://${domain}/${opts.roomName}?t=${data.token}`

  return {
    token:   data.token,
    joinUrl,
  }
}

// ── Suppression d'une room ────────────────────────────────────
/** Supprime une room Daily (après la séance, optionnel) */
export async function deleteDailyRoom(roomName: string): Promise<void> {
  const apiKey = process.env.DAILY_API_KEY!
  await fetch(`${DAILY_API_BASE}/rooms/${roomName}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${apiKey}` },
  })
}

// ── Récupère les infos d'une room ────────────────────────────
export async function getDailyRoom(roomName: string): Promise<DailyRoom | null> {
  const apiKey = process.env.DAILY_API_KEY!
  const res = await fetch(`${DAILY_API_BASE}/rooms/${roomName}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` },
  })
  if (!res.ok) return null
  return res.json()
}
