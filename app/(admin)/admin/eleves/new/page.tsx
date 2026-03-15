import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { NewEleveForm } from './NewEleveForm'

export default async function NewElevePage() {
  await requireAdmin()
  const supabase = await createClient()

  // Profils élèves qui n'ont pas encore de fiche students
  const { data: allEleveProfiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'eleve')
    .order('full_name')

  const { data: existingStudents } = await supabase
    .from('students')
    .select('profile_id')

  const usedProfileIds = new Set((existingStudents ?? []).map(s => s.profile_id))
  const eleveProfiles = (allEleveProfiles ?? []).filter(p => !usedProfileIds.has(p.id))

  // Profils parents
  const { data: parentProfiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'parent')
    .order('full_name')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/eleves">
          <Button variant="ghost" size="icon" className="h-9 w-9"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvel élève</h1>
          <p className="text-gray-500 text-sm">Créez la fiche élève et liez-la au compte parent.</p>
        </div>
      </div>
      <NewEleveForm
        eleveProfiles={eleveProfiles ?? []}
        parentProfiles={parentProfiles ?? []}
      />
    </div>
  )
}
