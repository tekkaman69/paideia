import { requireParent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { ParentCompteClient } from './ParentCompteClient'
import type { Student } from '@/types'

export default async function ParentComptePage() {
  const profile = await requireParent()
  const supabase = await createClient()

  // Récupérer les enfants liés via parent_id (index rapide)
  // RLS garantit que seul le parent voit ses propres enfants (is_parent_of)
  const { data: rawStudents } = await supabase
    .from('students')
    .select('id, display_name, age_range, grade_level, level, xp_total, streak_days, neuro_profile')
    .eq('parent_id', profile.id)
    .order('display_name')

  const students = (rawStudents ?? []) as Student[]

  return <ParentCompteClient profile={profile} students={students} />
}
