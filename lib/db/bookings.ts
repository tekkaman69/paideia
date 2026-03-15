/**
 * lib/db/bookings.ts
 * Repository Firestore pour la collection `bookings`.
 */

import {
  collection, doc, addDoc, updateDoc, getDoc, getDocs,
  query, where, orderBy, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Booking, BookingStatus } from '@/types'
import { addHours } from 'date-fns'

const COL = 'bookings'

/** Crée une réservation en statut "pending" */
export async function createBooking(
  data: Pick<Booking, 'slotId' | 'offerId' | 'parentUid' | 'studentIds'>,
  slotStartAt: Date
): Promise<string> {
  // Deadline d'annulation: 24h avant le slot
  const cancellableUntil = Timestamp.fromDate(addHours(slotStartAt, -24))

  const ref = await addDoc(collection(db, COL), {
    ...data,
    status: 'pending',
    meetingProvider: 'daily',
    cancellableUntil,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

/** Récupère un booking par son ID */
export async function getBooking(bookingId: string): Promise<Booking | null> {
  const snap = await getDoc(doc(db, COL, bookingId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Booking
}

/** Récupère tous les bookings d'un parent */
export async function getBookingsByParent(parentUid: string): Promise<Booking[]> {
  const q = query(
    collection(db, COL),
    where('parentUid', '==', parentUid),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Booking)
}

/** Récupère tous les bookings (admin) */
export async function getAllBookings(status?: BookingStatus): Promise<Booking[]> {
  let q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  if (status) {
    q = query(collection(db, COL), where('status', '==', status), orderBy('createdAt', 'desc'))
  }
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Booking)
}

/** Met à jour le statut d'un booking */
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  extraData?: Record<string, unknown>
): Promise<void> {
  await updateDoc(doc(db, COL, bookingId), {
    status,
    ...extraData,
    updatedAt: serverTimestamp(),
  })
}

/** Ajoute les infos de réunion Daily à un booking */
export async function setBookingMeeting(
  bookingId: string,
  meeting: {
    meetingProvider: 'daily' | 'discord'
    meetingRoomId?: string
    meetingJoinUrl?: string
    discordUrl?: string
  }
): Promise<void> {
  await updateDoc(doc(db, COL, bookingId), {
    ...meeting,
    updatedAt: serverTimestamp(),
  })
}

/** Annule un booking */
export async function cancelBooking(
  bookingId: string,
  reason?: string
): Promise<void> {
  await updateDoc(doc(db, COL, bookingId), {
    status: 'cancelled',
    cancelledAt: serverTimestamp(),
    cancelReason: reason ?? 'Annulé par le parent',
    updatedAt: serverTimestamp(),
  })
}

/** Recherche un booking par lemonOrderId */
export async function getBookingByLemonOrder(lemonOrderId: string): Promise<Booking | null> {
  const q = query(collection(db, COL), where('lemonOrderId', '==', lemonOrderId))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() } as Booking
}
