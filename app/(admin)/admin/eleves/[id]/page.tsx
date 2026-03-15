import { notFound } from 'next/navigation'
import { ArrowLeft, Zap, Flame } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { xpProgress } from '@/lib/utils'
import { EditEleveForm } from './EditEleveForm'
import type { Student, Profile } from '@/types'

type FullStudent = Student & {
  profile: Pick<Profile, 'id' | 'email' | 'full_name'> | null
  parent_profile: Pick<Profile, 'id' | 'full_name' | 'email'> | null
}

export default async function EditElevePage({ params }: { params: { id: string } }) {
  await requireAdmin()
  const supabase = await createClient()

  const { data: raw } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_profile_id_fkey(id, email, full_name),
      parent_profile:profiles!students_parent_id_fkey(id, full_name, email)
    `)
    .eq('id', params.id)
    .single()

  if (!raw) notFound()
  const student = raw as unknown as FullStudent

  const { data: parentProfiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'parent')
    .order('full_name')

  const prog = xpProgress(student.xp_total ?? 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/eleves">
          <Button variant="ghost" size="icon" className="h-9 w-9"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{student.display_name}</h1>
            <Badge variant="secondary" className="text-xs border-0 bg-gold-100 text-gold-700">Niv. {prog.level}</Badge>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-gold-500" />{student.xp_total ?? 0} XP
            </span>
            {(student.streak_days ?? 0) > 0 && (
              <span className="text-xs text-orange-500 flex items-center gap-1">
                <Flame className="w-3 h-3" />{student.streak_days}j
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-0.5">Modifier la fiche élève et la liaison parent.</p>
        </div>
      </div>

      <EditEleveForm
        student={student}
        parentProfiles={parentProfiles ?? []}
      />
    </div>
  )
}
