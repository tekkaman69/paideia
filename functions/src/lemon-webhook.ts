/**
 * functions/src/lemon-webhook.ts
 * Cloud Function HTTP: webhook Lemon Squeezy.
 * Alternative à l'API Route Next.js si déployé séparément.
 *
 * URL: https://[region]-[project].cloudfunctions.net/lemonWebhook
 * Configurer dans Lemon Squeezy > Webhooks > Add Endpoint
 */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as crypto from 'crypto'

const db = admin.firestore()

// ── Vérification signature ────────────────────────────────────
function verifySignature(rawBody: string, signature: string | undefined, secret: string): boolean {
  if (!signature) return false
  const hmac = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(signature, 'hex'))
  } catch { return false }
}

// ── Cloud Function ────────────────────────────────────────────
export const lemonWebhook = functions
  .region('europe-west1')
  .runWith({ secrets: ['LEMON_SQUEEZY_WEBHOOK_SECRET', 'DAILY_API_KEY', 'DAILY_DOMAIN'] })
  .https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed')
      return
    }

    const rawBody  = JSON.stringify(req.body)
    const signature = req.headers['x-signature'] as string | undefined
    const secret    = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET ?? ''

    if (!verifySignature(rawBody, signature, secret)) {
      functions.logger.error('Invalid Lemon Squeezy signature')
      res.status(401).json({ error: 'Invalid signature' })
      return
    }

    const eventName = req.body?.meta?.event_name as string
    functions.logger.info('Lemon Webhook event:', eventName)

    if (eventName !== 'order_created') {
      res.json({ ok: true, skipped: true })
      return
    }

    try {
      const lemonOrderId = String(req.body.data?.id)
      const attributes   = req.body.data?.attributes
      const bookingId    = req.body.meta?.custom_data?.booking_id as string

      if (!bookingId) {
        functions.logger.error('bookingId manquant')
        res.status(400).json({ error: 'bookingId manquant' })
        return
      }

      const bookingRef  = db.collection('bookings').doc(bookingId)
      const bookingSnap = await bookingRef.get()

      if (!bookingSnap.exists) {
        res.status(404).json({ error: 'Booking not found' })
        return
      }

      const booking = bookingSnap.data()!

      if (booking.status === 'paid') {
        res.json({ ok: true, duplicate: true })
        return
      }

      // Créer la room Daily via REST
      let meetingRoomId: string | null = booking.meetingRoomId ?? null

      if (!meetingRoomId) {
        const dailyApiKey = process.env.DAILY_API_KEY
        const dailyDomain = process.env.DAILY_DOMAIN

        if (dailyApiKey) {
          try {
            const roomRes = await fetch('https://api.daily.co/v1/rooms', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${dailyApiKey}`,
                'Content-Type':  'application/json',
              },
              body: JSON.stringify({
                name:    `paideia-${bookingId}`,
                privacy: 'private',
                properties: {
                  max_participants: 6,
                  enable_recording: false,
                  enable_chat:      true,
                  lang:             'fr',
                },
              }),
            })
            if (roomRes.ok) {
              const roomData = await roomRes.json()
              meetingRoomId = roomData.name
            }
          } catch (dailyErr) {
            functions.logger.error('Daily room error:', dailyErr)
          }
        }
      }

      // Mettre à jour le booking
      await bookingRef.update({
        status:         'paid',
        lemonOrderId,
        meetingRoomId:  meetingRoomId ?? null,
        meetingJoinUrl: meetingRoomId
          ? `https://${process.env.DAILY_DOMAIN}/${meetingRoomId}`
          : null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      // Créer le document payment
      await db.collection('payments').add({
        bookingId,
        lemonOrderId,
        status:    'paid',
        amount:    attributes?.total ?? 0,
        currency:  attributes?.currency ?? 'EUR',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      functions.logger.info(`Booking ${bookingId} → paid`)
      res.json({ ok: true })
    } catch (err) {
      functions.logger.error('Webhook error:', err)
      res.status(500).json({ error: 'Internal error' })
    }
  })
