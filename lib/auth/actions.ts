'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(2),
  role: z.enum(['parent', 'eleve']),
})

export type AuthActionResult = {
  error?: string
  success?: boolean
}

export async function signIn(formData: FormData): Promise<AuthActionResult> {
  const raw = {
    email:    formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = LoginSchema.safeParse(raw)
  if (!parsed.success) return { error: 'Données invalides.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email ou mot de passe incorrect.' }
    }
    return { error: error.message }
  }

  redirect('/app/redirect')
}

export async function signUp(formData: FormData): Promise<AuthActionResult> {
  const raw = {
    email:     formData.get('email') as string,
    password:  formData.get('password') as string,
    full_name: formData.get('full_name') as string,
    role:      formData.get('role') as string,
  }

  const parsed = RegisterSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Données invalides.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email:    parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.full_name,
        role:      parsed.data.role,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) return { error: error.message }
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  const cookieStore = await cookies()
  cookieStore.delete('paideia-role')
  redirect('/')
}

export async function resetPassword(formData: FormData): Promise<AuthActionResult> {
  const email = formData.get('email') as string
  if (!email) return { error: 'Email requis.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) return { error: error.message }
  return { success: true }
}
