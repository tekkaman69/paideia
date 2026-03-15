/**
 * functions/src/daily-token.ts
 * Callable Cloud Function: génère un token Daily pour rejoindre une room.
 * Appelée depuis le client via firebase/functions SDK.
 */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

interface DailyTokenRequest {
  bookingId: string
  userName:  string
  isOwner?:  boolean
}

export const getDailyToken = functions
  .region('europe-west1')
  .runWith({ secrets: ['DAILY_API_KEY', 'DAILY_DOMAIN'] })
  .https.onCall(async (data: DailyTokenRequest, context) => {
    // Vérifier l'authentification
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Authentification requise')
    }

    const { bookingId, userName, isOwner = false } = data
    const uid = context.auth.uid

    // Charger le booking
    const bookingSnap = await db.collection('bookings').doc(bookingId).get()
    if (!bookingSnap.exists) {
      throw new functions.https.HttpsError('not-found', 'Booking introuvable')
    }
    const booking = bookingSnap.data()!

    // Vérifier les droits
    const userSnap = await db.collection('users').doc(uid).get()
    const userRole = userSnap.data()?.role as string
    const isStaff  = userRole === 'admin' || userRole === 'intervenante'

    if (booking.parentUid !== uid && !isStaff) {
      throw new functions.https.HttpsError('permission-denied', 'Non autorisé')
    }

    if (!['paid', 'completed'].includes(booking.status)) {
      throw new functions.https.HttpsError('failed-precondition', 'Booking non payé')
    }

    const dailyApiKey = process.env.DAILY_API_KEY
    const dailyDomain = process.env.DAILY_DOMAIN

    if (!dailyApiKey || !dailyDomain) {
      throw new functions.https.HttpsError('internal', 'Daily non configuré')
    }

    // Créer la room si elle n'existe pas
    let roomName = booking.meetingRoomId as string | null

    if (!roomName) {
      const roomRes = await fetch('https://api.daily.co/v1/rooms', {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${dailyApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    `paideia-${bookingId}`,
          privacy: 'private',
          properties: { max_participants: 6, enable_recording: false, lang: 'fr' },
        }),
      })
      if (!roomRes.ok) throw new functions.https.HttpsError('internal', 'Impossible de créer la room Daily')
      const room = await roomRes.json()
      roomName = room.name as string
      await db.collection('bookings').doc(bookingId).update({ meetingRoomId: roomName })
    }

    // Générer le token
    const expiresAt = Math.floor(Date.now() / 1000) + 10800 // 3h
    const tokenRes  = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${dailyApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          user_id:   uid,
          user_name: userName ?? 'Participant',
          is_owner:  isOwner || isStaff,
          exp:       expiresAt,
        },
      }),
    })

    if (!tokenRes.ok) {
      throw new functions.https.HttpsError('internal', 'Impossible de générer le token Daily')
    }

    const tokenData = await tokenRes.json()
    const joinUrl   = `https://${dailyDomain}/${roomName}?t=${tokenData.token}`

    return { token: tokenData.token, joinUrl, roomName }
  })
