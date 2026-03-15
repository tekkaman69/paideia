/**
 * hooks/useRole.ts
 * Hook pour vérifier les rôles de l'utilisateur.
 * Le rôle est stocké dans user_metadata ou dans la table profiles.
 */

'use client'

import { useUser } from '@/hooks/useUser'
import type { UserRole } from '@/types'

export function useRole() {
  const { user } = useUser()
  const role = (user?.user_metadata?.role as UserRole | undefined) ?? null

  return {
    role,
    isParent:       role === 'parent',
    isEleve:        role === 'eleve',
    isIntervenante: role === 'teacher' || role === 'staff',
    isAdmin:        role === 'admin',
    isStaff:        role === 'admin' || role === 'staff',
    hasRole:        (r: UserRole) => role === r,
  }
}
