'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/auth/server'

export async function updateProfile(data: { full_name: string; phone: string }) {
  const user = await requireAuth()
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: data.full_name, phone: data.phone || null })
    .eq('id', user.id)

  if (error) return { error: error.message }
  revalidatePath('/app/parent/compte')
  return { success: true }
}

export async function updatePassword(data: { current_password: string; new_password: string }) {
  const supabase = await createClient()

  // Récupérer l'email de l'utilisateur actuel
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return { error: 'Session invalide.' }

  // Vérifier l'ancien mot de passe en essayant de se connecter
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: data.current_password,
  })
  if (signInError) return { error: 'Mot de passe actuel incorrect.' }

  // Mettre à jour le mot de passe
  const { error } = await supabase.auth.updateUser({ password: data.new_password })
  if (error) return { error: error.message }

  return { success: true }
}
