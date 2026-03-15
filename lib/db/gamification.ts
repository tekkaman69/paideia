/**
 * lib/db/gamification.ts
 * Repository Firestore pour XP, badges et quêtes.
 */

import {
  collection, doc, addDoc, getDocs, setDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, getDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { XpEvent, Badge, StudentBadge, Quest, BadgeKey, XpEventType } from '@/types'

// ── XP Events ─────────────────────────────────────────────────

const XP_COL = 'xpEvents'

/** Ajoute un événement XP pour un élève */
export async function addXpEvent(
  studentId: string,
  type: XpEventType,
  points: number,
  description?: string
): Promise<string> {
  const ref = await addDoc(collection(db, XP_COL), {
    studentId,
    type,
    points,
    description,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Calcule le total XP d'un élève */
export async function getStudentTotalXp(studentId: string): Promise<number> {
  const q = query(collection(db, XP_COL), where('studentId', '==', studentId))
  const snap = await getDocs(q)
  return snap.docs.reduce((sum, d) => sum + (d.data().points ?? 0), 0)
}

/** Récupère les événements XP d'un élève */
export async function getStudentXpEvents(studentId: string): Promise<XpEvent[]> {
  const q = query(
    collection(db, XP_COL),
    where('studentId', '==', studentId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as XpEvent)
}

// ── Badges ────────────────────────────────────────────────────

const BADGES_COL = 'badges'
const STUDENT_BADGES_COL = 'studentBadges'

/** Récupère la définition de tous les badges */
export async function getAllBadges(): Promise<Badge[]> {
  const snap = await getDocs(collection(db, BADGES_COL))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Badge)
}

/** Badges obtenus par un élève */
export async function getStudentBadges(studentId: string): Promise<StudentBadge[]> {
  const q = query(
    collection(db, STUDENT_BADGES_COL),
    where('studentId', '==', studentId)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as StudentBadge)
}

/** Attribue un badge à un élève (idempotent) */
export async function awardBadge(studentId: string, badgeKey: BadgeKey): Promise<void> {
  // Vérifie qu'il ne l'a pas déjà
  const q = query(
    collection(db, STUDENT_BADGES_COL),
    where('studentId', '==', studentId),
    where('badgeKey', '==', badgeKey)
  )
  const existing = await getDocs(q)
  if (!existing.empty) return // déjà attribué

  await addDoc(collection(db, STUDENT_BADGES_COL), {
    studentId,
    badgeKey,
    earnedAt: serverTimestamp(),
  })
}

// ── Quêtes ────────────────────────────────────────────────────

const QUESTS_COL = 'quests'

/** Récupère les quêtes actives */
export async function getActiveQuests(): Promise<Quest[]> {
  const q = query(collection(db, QUESTS_COL), where('active', '==', true))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Quest)
}

/** Crée ou met à jour une quête (admin) */
export async function upsertQuest(id: string, data: Omit<Quest, 'id'>): Promise<void> {
  await setDoc(doc(db, QUESTS_COL, id), data, { merge: true })
}

// ── Badges par défaut (seed) ──────────────────────────────────
export const DEFAULT_BADGES: Omit<Badge, 'id'>[] = [
  {
    key: 'premier_pas',
    title: 'Premier Pas',
    description: 'Ta première séance Paideia est terminée. Le voyage commence.',
    icon: '🏛️',
    criteria: 'Compléter 1 séance',
    points: 50,
  },
  {
    key: 'scribe',
    title: 'Scribe',
    description: 'Tu consignes tes apprentissages avec régularité. Comme les scribes de l\'Antiquité.',
    icon: '📜',
    criteria: 'Compléter 5 séances',
    points: 100,
  },
  {
    key: 'explorateur',
    title: 'Explorateur',
    description: 'Tu explores de nouveaux savoirs sans craindre l\'inconnu.',
    icon: '🧭',
    criteria: 'Compléter 10 séances',
    points: 150,
  },
  {
    key: 'stratege',
    title: 'Stratège',
    description: 'Tu organises ta pensée avec méthode. Les Grecs auraient dit : tu as de la métis.',
    icon: '⚡',
    criteria: 'Compléter 20 séances',
    points: 200,
  },
  {
    key: 'agora',
    title: 'Agora',
    description: 'Tu brilles dans les séances en groupe. L\'échange est ta force.',
    icon: '🏟️',
    criteria: 'Participer à 5 séances en groupe',
    points: 100,
  },
  {
    key: 'philosophe',
    title: 'Philosophe',
    description: 'Ami de la sagesse. Tu as parcouru un long chemin.',
    icon: '🦉',
    criteria: 'Compléter 50 séances',
    points: 500,
  },
  {
    key: 'perseverant',
    title: 'Persévérant',
    description: 'Trois semaines consécutives. La régularité est ta superforce.',
    icon: '🌿',
    criteria: 'Venir 3 semaines consécutives',
    points: 150,
  },
  {
    key: 'curieux',
    title: 'Curieux',
    description: 'Les questions sont le début de la connaissance.',
    icon: '✨',
    criteria: 'Compléter 5 quêtes',
    points: 100,
  },
]

/** Quêtes par défaut */
export const DEFAULT_QUESTS: Omit<Quest, 'id'>[] = [
  {
    title: 'Séance de la semaine',
    description: 'Participe à au moins une séance cette semaine.',
    points: 20,
    weekly: true,
    active: true,
    icon: '📅',
  },
  {
    title: 'Je prépare ma séance',
    description: 'Note 2 questions ou sujets que tu veux aborder avant la séance.',
    points: 10,
    weekly: true,
    active: true,
    icon: '✍️',
  },
  {
    title: 'Mon défi lecture',
    description: 'Lis pendant 15 minutes et partage avec ton intervenant ce que tu as compris.',
    points: 15,
    weekly: true,
    active: true,
    icon: '📖',
  },
]
