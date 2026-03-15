/**
 * lib/auth/guards.ts
 * Guards de routes: vérifient l'authentification et les rôles.
 * - Côté serveur: via adminAuth + cookies (pour Server Components)
 * - Côté client: via useUser hook
 */

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import type { UserRole } from '@/types'

// ── Guard côté serveur (Server Components) ───────────────────
/**
 * Vérifie que l'utilisateur est connecté et a le bon rôle.
 * Utilise le cookie de session Firebase ou le token stocké.
 * Redirige vers /auth/connexion si non autorisé.
 *
 * NOTE MVP: On vérifie le rôle via Firestore (pas custom claims).
 * Pour production, migrer vers custom claims Firebase.
 */
export async function requireAuth(requiredRoles?: UserRole[]) {
  const { adminAuth, adminDb } = await import('@/lib/firebase/admin')
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value
  const idToken = cookieStore.get('__firebase_token')?.value

  const token = sessionCookie || idToken

  if (!token) {
    redirect('/auth/connexion')
  }

  try {
    let uid: string

    // Essai avec session cookie (plus sécurisé)
    if (sessionCookie) {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie, true)
      uid = decoded.uid
    } else if (idToken) {
      const decoded = await adminAuth.verifyIdToken(idToken)
      uid = decoded.uid
    } else {
      redirect('/auth/connexion')
      return null as never
    }

    if (requiredRoles && requiredRoles.length > 0) {
      const userDoc = await adminDb.collection('users').doc(uid).get()
      const userRole = userDoc.data()?.role as UserRole

      if (!requiredRoles.includes(userRole)) {
        // Redirige vers le dashboard approprié au rôle
        redirect(getRoleDashboard(userRole))
      }
    }

    return uid
  } catch {
    redirect('/auth/connexion')
  }
}

/** Redirige chaque rôle vers son espace par défaut */
export function getRoleDashboard(role: UserRole): string {
  switch (role) {
    case 'admin':
    case 'teacher' as UserRole:
    case 'staff' as UserRole:
      return '/admin'
    case 'parent':
      return '/compte'
    case 'eleve':
      return '/eleve'
    default:
      return '/'
  }
}

// ── Middleware helper (pour next/middleware.ts) ───────────────
/**
 * Routes protégées et leurs rôles requis.
 * Utilisé dans middleware.ts pour la protection côté edge.
 */
export const protectedRoutes: Record<string, UserRole[]> = {
  '/compte':        ['parent'],
  '/reserver':      ['parent'],
  '/reservations':  ['parent'],
  '/eleve':         ['eleve', 'parent'],
  '/admin':         ['admin', 'teacher', 'staff'],
  '/classe':        ['parent', 'eleve', 'teacher', 'staff', 'admin'],
}
