/**
 * lib/db/users.ts
 * Repository Firestore pour la collection `users`.
 */

import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { User, UserRole, UserPreferences } from '@/types'

const COL = 'users'

/** Crée ou met à jour un document utilisateur */
export async function upsertUser(
  uid: string,
  data: Partial<Omit<User, 'uid' | 'createdAt'>>
): Promise<void> {
  const ref = doc(db, COL, uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      ...data,
      preferences: data.preferences ?? { calmMode: false, dysFontEnabled: false },
      createdAt: serverTimestamp(),
    })
  } else {
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
  }
}

/** Récupère un utilisateur par son uid */
export async function getUser(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, COL, uid))
  if (!snap.exists()) return null
  return { uid: snap.id, ...snap.data() } as User
}

/** Met à jour les préférences utilisateur */
export async function updateUserPreferences(
  uid: string,
  prefs: Partial<UserPreferences>
): Promise<void> {
  const ref = doc(db, COL, uid)
  // Merge partiel des préférences
  const updates: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(prefs)) {
    updates[`preferences.${key}`] = val
  }
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() })
}

/** Met à jour le rôle d'un utilisateur (admin seulement) */
export async function setUserRole(uid: string, role: UserRole): Promise<void> {
  await updateDoc(doc(db, COL, uid), { role, updatedAt: serverTimestamp() })
}
