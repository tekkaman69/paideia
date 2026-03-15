/**
 * lib/db/payments.ts
 * Repository Firestore pour la collection `payments`.
 */

import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Payment } from '@/types'

const COL = 'payments'

/** Crée un document de paiement */
export async function createPayment(
  data: Omit<Payment, 'id' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Récupère les paiements d'un booking */
export async function getPaymentsByBooking(bookingId: string): Promise<Payment[]> {
  const q = query(collection(db, COL), where('bookingId', '==', bookingId))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Payment)
}
