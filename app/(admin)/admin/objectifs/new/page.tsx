'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GoalSchema } from '@/types'
import { createClient } from '@/lib/supabase/client'
import type { z } from 'zod'

type FormData = z.infer<typeof GoalSchema>

const GOAL_CATEGORIES = ['Mathématiques','Français','Sciences','Histoire-Géographie','Anglais','Méthodes de travail','Lecture','Expression écrite']
const GOAL_ICONS = ['📚','✏️','🔬','🧮','🌍','🏛️','🎯','💡','⭐','🔥','✅','÷','📝','🗺️','💬','🎨']

export default function NewObjectifPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState('🎯')

  const form = useForm<FormData>({
    resolver: zodResolver(GoalSchema),
    defaultValues: { xp_reward: 100 },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    try {
      const supabase = createClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('goals').insert({ ...data, icon: selectedIcon, is_active: true })
      if (error) { toast.error('Erreur : ' + error.message); return }
      toast.success('Objectif créé !')
      router.push('/admin/objectifs')
    } catch (e) {
      toast.error('Une erreur inattendue est survenue.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/objectifs"><Button variant="ghost" size="icon" className="h-9 w-9"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvel objectif</h1>
          <p className="text-gray-500 text-sm">Créez un objectif pédagogique pour vos élèves.</p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 pt-5"><CardTitle className="text-base">Informations</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Titre *</Label>
              <Input id="title" placeholder="Ex: Maîtriser les tables de multiplication" {...form.register('title')} />
              {form.formState.errors.title && <p className="text-xs text-red-600">{form.formState.errors.title.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea id="description" className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Description détaillée…" {...form.register('description')} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="category">Catégorie</Label>
                <select id="category" className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" {...form.register('category')}>
                  <option value="">Sélectionner…</option>
                  {GOAL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="xp_reward">Récompense XP</Label>
                <div className="relative">
                  <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-500" />
                  <Input id="xp_reward" type="number" min={0} max={1000} className="pl-9" {...form.register('xp_reward', { valueAsNumber: true })} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 pt-5"><CardTitle className="text-base">Icône <span className="ml-2 font-normal">{selectedIcon}</span></CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {GOAL_ICONS.map(icon => (
                <button key={icon} type="button" onClick={() => setSelectedIcon(icon)}
                  className={`w-10 h-10 rounded-xl text-xl transition-all ${selectedIcon === icon ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  {icon}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-3">
          <Button type="submit" className="gap-2 bg-primary-600 hover:bg-primary-700" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Créer l&apos;objectif
          </Button>
          <Link href="/admin/objectifs"><Button variant="outline">Annuler</Button></Link>
        </div>
      </form>
    </div>
  )
}
