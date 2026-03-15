'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Save, Loader2, Link2, Link2Off } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { updateStudent } from '@/lib/actions/students'
import type { Student, Profile } from '@/types'

const NEURO_OPTIONS = [
  { value: 'TDAH',            label: 'TDAH' },
  { value: 'Dyslexie',        label: 'Dyslexie' },
  { value: 'Dyscalculie',     label: 'Dyscalculie' },
  { value: 'Dyspraxie',       label: 'Dyspraxie' },
  { value: 'TSA',             label: 'TSA (autisme)' },
  { value: 'HPI',             label: 'HPI' },
  { value: 'Dysorthographie', label: 'Dysorthographie' },
  { value: 'Dysphasie',       label: 'Dysphasie' },
]

type ProfileOption = { id: string; full_name: string | null; email: string }

interface Props {
  student: Student & {
    profile: Pick<Profile, 'id' | 'email' | 'full_name'> | null
    parent_profile: Pick<Profile, 'id' | 'full_name' | 'email'> | null
  }
  parentProfiles: ProfileOption[]
}

export function EditEleveForm({ student, parentProfiles }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [neuroProfile, setNeuroProfile] = useState<string[]>(student.neuro_profile ?? [])
  const [changingParent, setChangingParent] = useState(false)

  function toggleNeuro(value: string) {
    setNeuroProfile(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    setSaving(true)
    try {
      const result = await updateStudent(student.id, {
        display_name:   (form.get('display_name') as string).trim(),
        age_range:      (form.get('age_range') as string) || null,
        grade_level:    (form.get('grade_level') as string).trim() || null,
        neuro_profile:  neuroProfile,
        accommodations: (form.get('accommodations') as string).trim() || null,
        goals_text:     (form.get('goals_text') as string).trim() || null,
        ...(changingParent && {
          parent_id:    (form.get('parent_id') as string) || null,
          old_parent_id: student.parent_id,
        }),
      })
      if (result.error) { toast.error(result.error); return }
      toast.success('Élève mis à jour !')
      router.push('/admin/eleves')
    } catch {
      toast.error('Une erreur inattendue est survenue.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

      {/* Comptes liés */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5"><CardTitle className="text-base">Comptes liés</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* Compte élève (non modifiable) */}
          <div className="space-y-1.5">
            <Label>Compte élève</Label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                {(student.profile?.full_name ?? student.profile?.email ?? '?')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{student.profile?.full_name ?? '—'}</p>
                <p className="text-xs text-gray-400">{student.profile?.email}</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-xs border-0 bg-primary-50 text-primary-700">Élève</Badge>
            </div>
          </div>

          {/* Compte parent */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Compte parent lié</Label>
              <button
                type="button"
                onClick={() => setChangingParent(v => !v)}
                className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                {changingParent ? <Link2Off className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                {changingParent ? 'Annuler le changement' : 'Modifier la liaison'}
              </button>
            </div>
            {changingParent ? (
              <select
                name="parent_id"
                defaultValue={student.parent_id ?? ''}
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">— Aucun parent lié —</option>
                {parentProfiles.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.full_name ? `${p.full_name} (${p.email})` : p.email}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                {student.parent_profile ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">
                      {(student.parent_profile.full_name ?? student.parent_profile.email)[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{student.parent_profile.full_name ?? '—'}</p>
                      <p className="text-xs text-gray-400">{student.parent_profile.email}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs border-0 bg-green-50 text-green-700">Parent</Badge>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 italic">Aucun parent lié</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Infos élève */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5"><CardTitle className="text-base">Profil de l'élève</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="display_name">Prénom / Pseudo *</Label>
              <Input id="display_name" name="display_name" defaultValue={student.display_name} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="grade_level">Classe</Label>
              <Input id="grade_level" name="grade_level" defaultValue={student.grade_level ?? ''} placeholder="5ème, CM2, Terminale…" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="age_range">Tranche d'âge</Label>
            <select
              id="age_range" name="age_range" defaultValue={student.age_range ?? ''}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">— Non renseigné —</option>
              <option value="6-8">6 – 8 ans</option>
              <option value="9-11">9 – 11 ans</option>
              <option value="12-15">12 – 15 ans</option>
              <option value="16+">16 ans et plus</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Profil neuro */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5"><CardTitle className="text-base">Profil neurodéveloppement</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {NEURO_OPTIONS.map(opt => (
              <label
                key={opt.value}
                className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors text-sm ${
                  neuroProfile.includes(opt.value)
                    ? 'border-primary-400 bg-primary-50 text-primary-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={neuroProfile.includes(opt.value)}
                  onChange={() => toggleNeuro(opt.value)}
                />
                <span className="flex-1">{opt.label}</span>
              </label>
            ))}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="accommodations">Aménagements</Label>
            <textarea
              id="accommodations" name="accommodations"
              defaultValue={student.accommodations ?? ''}
              className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Tiers-temps, supports adaptés…"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="goals_text">Objectifs</Label>
            <textarea
              id="goals_text" name="goals_text"
              defaultValue={student.goals_text ?? ''}
              className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Remonter le niveau en maths…"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" className="gap-2 bg-primary-600 hover:bg-primary-700" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Enregistrer
        </Button>
        <Link href="/admin/eleves"><Button variant="outline" type="button">Annuler</Button></Link>
      </div>
    </form>
  )
}
