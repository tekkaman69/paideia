import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function RedirectPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/connexion')

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = (data as { role: string } | null)?.role ?? 'parent'

  if (role === 'admin') redirect('/admin')
  if (role === 'eleve') redirect('/app/eleve/dashboard')
  redirect('/app/parent/dashboard')
}
