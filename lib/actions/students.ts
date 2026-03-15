'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/server'

export type StudentFormData = {
  profile_id: string
  parent_id: string | null
  display_name: string
  age_range: string | null
  grade_level: string | null
  neuro_profile: string[]
  accommodations: string | null
  goals_text: string | null
}

/** Crée un élève + la liaison parent_student_links de façon atomique */
export async function createStudentWithLink(data: StudentFormData) {
  await requireAdmin()
  const supabase = await createClient()

  const { data: student, error } = await supabase
    .from('students')
    .insert({
      profile_id:    data.profile_id,
      parent_id:     data.parent_id,
      display_name:  data.display_name,
      age_range:     data.age_range as '6-8' | '9-11' | '12-15' | '16+' | null,
      grade_level:   data.grade_level,
      neuro_profile: data.neuro_profile,
      accommodations: data.accommodations,
      goals_text:    data.goals_text,
    })
    .select('id')
    .single()

  if (error) return { error: error.message }

  // Créer la liaison parent_student_links si un parent est spécifié
  if (data.parent_id && student) {
    const { error: linkError } = await supabase
      .from('parent_student_links')
      .insert({ parent_id: data.parent_id, student_id: student.id, relationship: 'parent' })
    if (linkError && !linkError.message.includes('duplicate')) {
      console.error('parent_student_links insert error:', linkError.message)
    }
  }

  revalidatePath('/admin/eleves')
  return { success: true, studentId: student.id }
}

/** Met à jour les infos d'un élève et gère le changement de parent */
export async function updateStudent(
  studentId: string,
  data: Partial<StudentFormData> & { old_parent_id?: string | null }
) {
  await requireAdmin()
  const supabase = await createClient()

  const { old_parent_id, ...fields } = data

  const { error } = await supabase
    .from('students')
    .update({
      ...(fields.display_name   !== undefined && { display_name: fields.display_name }),
      ...(fields.parent_id      !== undefined && { parent_id: fields.parent_id }),
      ...(fields.age_range      !== undefined && { age_range: fields.age_range as '6-8' | '9-11' | '12-15' | '16+' | null }),
      ...(fields.grade_level    !== undefined && { grade_level: fields.grade_level }),
      ...(fields.neuro_profile  !== undefined && { neuro_profile: fields.neuro_profile }),
      ...(fields.accommodations !== undefined && { accommodations: fields.accommodations }),
      ...(fields.goals_text     !== undefined && { goals_text: fields.goals_text }),
    })
    .eq('id', studentId)

  if (error) return { error: error.message }

  // Gérer le changement de parent dans parent_student_links
  if (fields.parent_id !== undefined) {
    // Supprimer l'ancienne liaison
    if (old_parent_id) {
      await supabase
        .from('parent_student_links')
        .delete()
        .eq('parent_id', old_parent_id)
        .eq('student_id', studentId)
    }
    // Créer la nouvelle liaison
    if (fields.parent_id) {
      await supabase
        .from('parent_student_links')
        .upsert(
          { parent_id: fields.parent_id, student_id: studentId, relationship: 'parent' },
          { onConflict: 'parent_id,student_id' }
        )
    }
  }

  revalidatePath('/admin/eleves')
  revalidatePath(`/admin/eleves/${studentId}`)
  return { success: true }
}
