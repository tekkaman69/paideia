'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Send, Loader2, MapPin, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ContactSchema } from '@/types'
import type { z } from 'zod'

type FormData = z.infer<typeof ContactSchema>

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const form = useForm<FormData>({ resolver: zodResolver(ContactSchema) })

  async function onSubmit(data: FormData) {
    setSending(true)
    // TODO: send email via API route or Supabase function
    await new Promise(r => setTimeout(r, 1000)) // simulate
    toast.success('Message envoyé ! Nous vous répondrons sous 24h.')
    form.reset()
    setSending(false)
  }

  return (
    <div className="py-16 lg:py-24">
      <div className="page-container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une question sur nos services ? Nous vous répondrons sous 24 heures.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: Mail,   label: 'Email',     value: 'contact@paideia.fr' },
              { icon: Phone,  label: 'Téléphone',  value: '+33 1 23 45 67 89' },
              { icon: MapPin, label: 'Zone',       value: 'Fort-de-France / Case Pilote (Martinique)' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-sm text-gray-500">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" placeholder="Jean Dupont" {...form.register('name')} />
                      {form.formState.errors.name && <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="jean@email.com" {...form.register('email')} />
                      {form.formState.errors.email && <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" placeholder="Votre question..." {...form.register('subject')} />
                    {form.formState.errors.subject && <p className="text-xs text-red-600">{form.formState.errors.subject.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={5}
                      className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Décrivez votre besoin..."
                      {...form.register('message')}
                    />
                    {form.formState.errors.message && <p className="text-xs text-red-600">{form.formState.errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full gap-2 bg-primary-600 hover:bg-primary-700" disabled={sending}>
                    {sending ? <><Loader2 className="w-4 h-4 animate-spin" />Envoi...</> : <><Send className="w-4 h-4" />Envoyer le message</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
