/**
 * lib/db/students.ts
 * Repository Firestore pour la collection `students`.
 */

import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, query, where, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Student } from '@/types'
import { textToArray } from '@/lib/utils'

const COL = 'students'

/** Récupère tous les élèves d'un parent */
export async function getStudentsByParent(parentUid: string): Promise<Student[]> {
  const q = query(collection(db, COL), where('parentUid', '==', parentUid))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Student)
}

/** Crée un élève */
export async function createStudent(
  parentUid: string,
  data: Omit<Student, 'id' | 'parentUid' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    parentUid,
    ...data,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Met à jour un élève */
export async function updateStudent(
  studentId: string,
  data: Partial<Omit<Student, 'id' | 'parentUid' | 'createdAt'>>
): Promise<void> {
  await updateDoc(doc(db, COL, studentId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

/** Supprime un élève */
export async function deleteStudent(studentId: string): Promise<void> {
  await deleteDoc(doc(db, COL, studentId))
}

/** Helper: convertit le texte du formulaire en objet Student */
export function formToStudentData(form: {
  name: string
  ageRange: string
  neuroProfile: string[]
  accommodations?: string
  goals?: string
}) {
  return {
    name:           form.name,
    ageRange:       form.ageRange as Student['ageRange'],
    neuroProfile:   form.neuroProfile as Student['neuroProfile'],
    accommodations: form.accommodations ? textToArray(form.accommodations) : [],
    goals:          form.goals ? textToArray(form.goals) : [],
  }
}
