import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Profile, UserRole } from '@/types'

/**
 * Récupère l'utilisateur Supabase actuel côté serveur.
 * Retourne null si non authentifié.
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

/**
 * Récupère le profil complet (avec rôle) de l'utilisateur connecté.
 * Utilise getSession() (lecture locale) pour l'ID, puis 1 seule requête DB.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  // getSession lit le JWT depuis le cookie sans appel réseau (le middleware a déjà validé la session)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return null

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return rawProfile as Profile | null
}

/**
 * Exige une authentification.
 * Redirige vers /auth/connexion si non connecté.
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/connexion')
  return user
}

/**
 * Exige un rôle spécifique.
 * Redirige selon le rôle si non autorisé.
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const profile = await getCurrentProfile()

  if (!profile) redirect('/auth/connexion')

  if (!allowedRoles.includes(profile.role)) {
    if (profile.role === 'admin') redirect('/admin')
    if (profile.role === 'eleve') redirect('/app/eleve/dashboard')
    redirect('/app/parent/dashboard')
  }

  return profile
}

/**
 * Require admin role specifically.
 */
export async function requireAdmin() {
  return requireRole(['admin'])
}

/**
 * Require parent role.
 */
export async function requireParent() {
  return requireRole(['parent', 'admin'])
}

/**
 * Require student role.
 */
export async function requireStudent() {
  return requireRole(['eleve', 'admin'])
}

/**
 * Vérifie si un parent peut accéder à un élève (relation parent-enfant).
 */
export async function canAccessStudent(studentId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  const profile = rawProfile as { role: string } | null

  if (profile?.role === 'admin') return true
  if (profile?.role === 'eleve' && user.id === studentId) return true

  if (profile?.role === 'parent') {
    const { data } = await supabase
      .from('parent_student_links')
      .select('id')
      .eq('parent_id', user.id)
      .eq('student_id', studentId)
      .single()
    return !!data
  }

  return false
}
