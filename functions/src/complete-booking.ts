/**
 * functions/src/complete-booking.ts
 * Callable Cloud Function: marque une séance comme terminée (admin/intervenante).
 * Attribue XP et vérifie les badges.
 */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

interface CompleteBookingRequest {
  bookingId: string
  studentIds: string[]
}

export const completeBooking = functions
  .region('europe-west1')
  .https.onCall(async (data: CompleteBookingRequest, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Authentification requise')
    }

    // Vérifier le rôle
    const userSnap = await db.collection('users').doc(context.auth.uid).get()
    const role     = userSnap.data()?.role as string
    if (!['admin', 'intervenante'].includes(role)) {
      throw new functions.https.HttpsError('permission-denied', 'Rôle insuffisant')
    }

    const { bookingId, studentIds } = data

    // Mettre le booking en "completed"
    const bookingRef = db.collection('bookings').doc(bookingId)
    const snap       = await bookingRef.get()
    if (!snap.exists) {
      throw new functions.https.HttpsError('not-found', 'Booking introuvable')
    }

    await bookingRef.update({
      status:    'completed',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    // Attribuer XP aux élèves (20 points par séance)
    const XP_PER_SESSION = 20

    const batch = db.batch()
    for (const studentId of studentIds) {
      const xpRef = db.collection('xpEvents').doc()
      batch.set(xpRef, {
        studentId,
        type:        'session_completed',
        points:      XP_PER_SESSION,
        description: `Séance ${bookingId} terminée`,
        createdAt:   admin.firestore.FieldValue.serverTimestamp(),
      })
    }
    await batch.commit()

    // Vérifier et attribuer badges
    for (const studentId of studentIds) {
      await checkAndAwardBadges(studentId)
    }

    functions.logger.info(`Booking ${bookingId} completed, XP attributed to ${studentIds.length} students`)
    return { ok: true }
  })

// ── Attribution automatique des badges ───────────────────────
async function checkAndAwardBadges(studentId: string): Promise<void> {
  // Compter les séances complétées
  const sessionsSnap = await db.collection('xpEvents')
    .where('studentId', '==', studentId)
    .where('type', '==', 'session_completed')
    .get()
  const sessionCount = sessionsSnap.size

  // Vérifier les badges déjà obtenus
  const existingSnap = await db.collection('studentBadges')
    .where('studentId', '==', studentId)
    .get()
  const existingKeys = new Set(existingSnap.docs.map(d => d.data().badgeKey as string))

  const toAward: string[] = []

  if (sessionCount >= 1  && !existingKeys.has('premier_pas'))  toAward.push('premier_pas')
  if (sessionCount >= 5  && !existingKeys.has('scribe'))       toAward.push('scribe')
  if (sessionCount >= 10 && !existingKeys.has('explorateur'))  toAward.push('explorateur')
  if (sessionCount >= 20 && !existingKeys.has('stratege'))     toAward.push('stratege')
  if (sessionCount >= 50 && !existingKeys.has('philosophe'))   toAward.push('philosophe')

  if (toAward.length === 0) return

  const batch = db.batch()
  for (const badgeKey of toAward) {
    // XP bonus pour le badge
    const xpRef = db.collection('xpEvents').doc()
    batch.set(xpRef, {
      studentId,
      type:        'badge_earned',
      points:      50,
      description: `Badge "${badgeKey}" obtenu`,
      createdAt:   admin.firestore.FieldValue.serverTimestamp(),
    })

    const badgeRef = db.collection('studentBadges').doc()
    batch.set(badgeRef, {
      studentId,
      badgeKey,
      earnedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
  }
  await batch.commit()

  functions.logger.info(`Badges awarded to ${studentId}: ${toAward.join(', ')}`)
}
