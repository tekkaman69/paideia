/**
 * lib/db/offers.ts
 * Repository Firestore pour la collection `offers`.
 */

import {
  collection, doc, addDoc, updateDoc, getDocs,
  query, where, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Offer } from '@/types'

const COL = 'offers'

/** Récupère toutes les offres actives */
export async function getActiveOffers(): Promise<Offer[]> {
  const q = query(
    collection(db, COL),
    where('active', '==', true),
    orderBy('price', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Offer)
}

/** Récupère toutes les offres (admin) */
export async function getAllOffers(): Promise<Offer[]> {
  const snap = await getDocs(collection(db, COL))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Offer)
}

/** Crée une offre */
export async function createOffer(data: Omit<Offer, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Met à jour une offre */
export async function updateOffer(
  offerId: string,
  data: Partial<Omit<Offer, 'id'>>
): Promise<void> {
  await updateDoc(doc(db, COL, offerId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ── Offres par défaut (seed initial) ─────────────────────────
/**
 * Offres initiales à créer via l'admin au démarrage.
 * Prix en centimes (4500 = 45€).
 */
export const DEFAULT_OFFERS: Omit<Offer, 'id'>[] = [
  {
    title: 'Séance Solo',
    duration: 55,
    price: 5500,
    groupSize: 1,
    description: 'Une séance individuelle de 55 minutes, entièrement dédiée à votre enfant. Suivi personnalisé, rythme adapté, progression visible dès les premières séances.',
    features: [
      'Bilan de départ inclus',
      'Méthodes adaptées au profil',
      'Compte-rendu envoyé aux parents',
      'Ressources partagées après la séance',
    ],
    lemonVariantId: process.env.NEXT_PUBLIC_LEMON_VARIANT_SEANCE_SOLO,
    active: true,
  },
  {
    title: 'Séance Duo',
    duration: 60,
    price: 3500,
    groupSize: 2,
    description: "Deux élèves, une dynamique. Le duo crée une émulation positive et permet un travail collaboratif. Idéal pour les enfants qui aiment apprendre ensemble.",
    features: [
      "Jusqu'à 2 élèves",
      'Activités collaboratives',
      'Tarif réduit par enfant',
      'Compatible profils différents',
    ],
    lemonVariantId: process.env.NEXT_PUBLIC_LEMON_VARIANT_SEANCE_DUO,
    active: true,
  },
  {
    title: 'Mini-groupe Agora',
    duration: 60,
    price: 2500,
    groupSize: 4,
    description: "Jusqu'à 4 élèves dans un espace d'apprentissage inspiré de l'Agora grecque : débat, entraide, projets communs. La force du collectif au service de chacun.",
    features: [
      '3 à 4 élèves maximum',
      'Projets et ateliers thématiques',
      'Tarif le plus accessible',
      'Développe les compétences sociales',
    ],
    lemonVariantId: process.env.NEXT_PUBLIC_LEMON_VARIANT_SEANCE_TRIO,
    active: true,
  },
]
