'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createStudentWithLink } from '@/lib/actions/students'

const NEURO_OPTIONS = [
  { value: 'TDAH',          label: 'TDAH' },
  { value: 'Dyslexie',      label: 'Dyslexie' },
  { value: 'Dyscalculie',   label: 'Dyscalculie' },
  { value: 'Dyspraxie',     label: 'Dyspraxie' },
  { value: 'TSA',           label: 'TSA (autisme)' },
  { value: 'HPI',           label: 'HPI' },
  { value: 'Dysorthographie', label: 'Dysorthographie' },
  { value: 'Dysphasie',     label: 'Dysphasie' },
]

type ProfileOption = { id: string; full_name: string | null; email: string }

interface Props {
  eleveProfiles: ProfileOption[]
  parentProfiles: ProfileOption[]
}

export function NewEleveForm({ eleveProfiles, parentProfiles }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [neuroProfile, setNeuroProfile] = useState<string[]>([])

  function toggleNeuro(value: string) {
    setNeuroProfile(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const display_name = form.get('display_name') as string
    if (!display_name.trim()) { toast.error('Le prénom/pseudo est requis.'); return }

    const profile_id = form.get('profile_id') as string
    if (!profile_id) { toast.error('Sélectionnez un compte élève.'); return }

    setSaving(true)
    try {
      const result = await createStudentWithLink({
        profile_id,
        parent_id:     (form.get('parent_id') as string) || null,
        display_name:  display_name.trim(),
        age_range:     (form.get('age_range') as string) || null,
        grade_level:   (form.get('grade_level') as string).trim() || null,
        neuro_profile: neuroProfile,
        accommodations:(form.get('accommodations') as string).trim() || null,
        goals_text:    (form.get('goals_text') as string).trim() || null,
      })
      if (result.error) { toast.error(result.error); return }
      toast.success('Élève créé et lié au parent !')
      router.push('/admin/eleves')
    } catch {
      toast.error('Une erreur inattendue est survenue.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

      {/* Comptes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5"><CardTitle className="text-base">Liaison des comptes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="profile_id">Compte élève *</Label>
            <select
              id="profile_id" name="profile_id" required
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">— Sélectionner un compte élève —</option>
              {eleveProfiles.map(p => (
                <option key={p.id} value={p.id}>
                  {p.full_name ? `${p.full_name} (${p.email})` : p.email}
                </option>
              ))}
            </select>
            {!eleveProfiles.length && (
              <p className="text-xs text-amber-600">Aucun compte élève disponible. Créez d'abord un compte avec le rôle "élève".</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="parent_id">Compte parent</Label>
            <select
              id="parent_id" name="parent_id"
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">— Aucun parent lié (optionnel) —</option>
              {parentProfiles.map(p => (
                <option key={p.id} value={p.id}>
                  {p.full_name ? `${p.full_name} (${p.email})` : p.email}
                </option>
              ))}
            </select>
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
              <Input id="display_name" name="display_name" placeholder="Ex: Thomas" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="grade_level">Classe</Label>
              <Input id="grade_level" name="grade_level" placeholder="Ex: 5ème, CM2, Terminale…" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="age_range">Tranche d'âge</Label>
            <select
              id="age_range" name="age_range"
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
              className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Tiers-temps, supports adaptés, aménagements spécifiques…"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="goals_text">Objectifs initiaux</Label>
            <textarea
              id="goals_text" name="goals_text"
              className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Remonter le niveau en maths, regagner confiance en lecture…"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" className="gap-2 bg-primary-600 hover:bg-primary-700" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Créer l'élève
        </Button>
        <Link href="/admin/eleves"><Button variant="outline" type="button">Annuler</Button></Link>
      </div>
    </form>
  )
}
