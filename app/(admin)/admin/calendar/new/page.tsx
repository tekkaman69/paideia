'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EventSchema } from '@/types'
import { createClient } from '@/lib/supabase/client'
import type { z } from 'zod'

type FormData = z.infer<typeof EventSchema>

export default function NewEventPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: { event_type: 'cours' },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('events').insert({
      ...data,
      status: 'scheduled',
    })
    setSaving(false)
    if (error) {
      toast.error('Erreur : ' + error.message)
      return
    }
    toast.success('Événement créé avec succès !')
    router.push('/admin/calendar')
    router.refresh()
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/calendar">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvel événement</h1>
          <p className="text-gray-500 text-sm">Planifiez un cours, RDV ou classe virtuelle.</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-base">Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Ex: Cours de maths — Thomas"
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <p className="text-xs text-red-600">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="event_type">Type</Label>
                <select
                  id="event_type"
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register('event_type')}
                >
                  <option value="cours">Cours</option>
                  <option value="rdv_parent">RDV Parent</option>
                  <option value="atelier">Atelier</option>
                  <option value="classe_virtuelle">Classe virtuelle</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Lieu / Lien</Label>
                <Input
                  id="location"
                  placeholder="Salle virtuelle, adresse…"
                  {...form.register('location')}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="start_at">Début *</Label>
                <Input
                  id="start_at"
                  type="datetime-local"
                  {...form.register('start_at')}
                />
                {form.formState.errors.start_at && (
                  <p className="text-xs text-red-600">{form.formState.errors.start_at.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end_at">Fin *</Label>
                <Input
                  id="end_at"
                  type="datetime-local"
                  {...form.register('end_at')}
                />
                {form.formState.errors.end_at && (
                  <p className="text-xs text-red-600">{form.formState.errors.end_at.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                placeholder="Détails sur l'événement…"
                {...form.register('description')}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes internes</Label>
              <Input
                id="notes"
                placeholder="Notes pour l'équipe…"
                {...form.register('notes')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            className="gap-2 bg-primary-600 hover:bg-primary-700"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Créer l&apos;événement
          </Button>
          <Link href="/admin/calendar">
            <Button variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
