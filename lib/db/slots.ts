/**
 * lib/db/slots.ts
 * Repository Firestore pour la collection `slots` (créneaux disponibles).
 */

import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, orderBy, Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Slot, SlotStatus } from '@/types'
import { startOfDay, endOfDay, addDays } from 'date-fns'

const COL = 'slots'

/** Récupère les créneaux disponibles dans les N prochains jours */
export async function getAvailableSlots(daysAhead = 30): Promise<Slot[]> {
  const now = Timestamp.fromDate(new Date())
  const future = Timestamp.fromDate(addDays(new Date(), daysAhead))

  const q = query(
    collection(db, COL),
    where('status', '==', 'open'),
    where('startAt', '>=', now),
    where('startAt', '<=', future),
    orderBy('startAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Slot)
}

/** Récupère un créneau par son ID */
export async function getSlot(slotId: string): Promise<Slot | null> {
  const snap = await getDoc(doc(db, COL, slotId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Slot
}

/** Récupère tous les créneaux (admin) */
export async function getAllSlots(fromDate?: Date): Promise<Slot[]> {
  const from = fromDate ?? new Date()
  const q = query(
    collection(db, COL),
    where('startAt', '>=', Timestamp.fromDate(from)),
    orderBy('startAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Slot)
}

/** Crée un créneau (intervenante/admin) */
export async function createSlot(
  data: Omit<Slot, 'id' | 'bookedCount'>,
  createdBy: string
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdBy,
    bookedCount: 0,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Met à jour le statut d'un créneau */
export async function updateSlotStatus(slotId: string, status: SlotStatus): Promise<void> {
  await updateDoc(doc(db, COL, slotId), { status, updatedAt: serverTimestamp() })
}

/** Incrémente le compteur de réservations (et passe en 'full' si capacité atteinte) */
export async function incrementSlotBookings(slotId: string, capacity: number): Promise<void> {
  const ref = doc(db, COL, slotId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const current = snap.data().bookedCount ?? 0
  const next = current + 1
  await updateDoc(ref, {
    bookedCount: next,
    status: next >= capacity ? 'full' : 'open',
    updatedAt: serverTimestamp(),
  })
}

/** Décrémente le compteur (annulation) */
export async function decrementSlotBookings(slotId: string): Promise<void> {
  const ref = doc(db, COL, slotId)
  const snap = await getDoc(ref)
  if (!snap.exists()) return
  const current = snap.data().bookedCount ?? 1
  const next = Math.max(0, current - 1)
  await updateDoc(ref, {
    bookedCount: next,
    status: 'open',
    updatedAt: serverTimestamp(),
  })
}

/** Supprime un créneau (admin) */
export async function deleteSlot(slotId: string): Promise<void> {
  await deleteDoc(doc(db, COL, slotId))
}
