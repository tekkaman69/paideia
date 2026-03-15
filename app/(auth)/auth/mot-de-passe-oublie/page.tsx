'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/lib/auth/actions'

const schema = z.object({
  email: z.string().email('Adresse email invalide'),
})
type FormData = z.infer<typeof schema>

export default function MotDePasseOubliePage() {
  const [error, setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  const form = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setPending(true)
    setError(null)
    const fd = new FormData()
    fd.set('email', data.email)
    const result = await resetPassword(fd)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    } else {
      setSuccess(true)
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-white to-primary-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-primary-700 transition-colors">
              Π
            </div>
            <span className="text-2xl font-bold text-primary-900 tracking-tight">Paideia</span>
          </Link>
        </div>

        <Card className="shadow-xl border border-sand-200/60 rounded-2xl overflow-hidden">
          {success ? (
            <CardContent className="px-6 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email envoyé !</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Si un compte existe avec cette adresse, vous recevrez un email avec les instructions
                pour réinitialiser votre mot de passe.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                Pensez à vérifier vos spams si vous ne trouvez pas l'email.
              </p>
              <Link href="/auth/connexion">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Button>
              </Link>
            </CardContent>
          ) : (
            <>
              <CardHeader className="pb-2 pt-6 px-6">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Mot de passe oublié
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Entrez votre adresse email et nous vous enverrons un lien de réinitialisation.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
                      <span className="shrink-0 mt-0.5">⚠</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      autoComplete="email"
                      className="h-11"
                      {...form.register('email')}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium bg-primary-600 hover:bg-primary-700 transition-colors"
                    disabled={pending}
                  >
                    {pending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Envoi en cours…
                      </>
                    ) : (
                      'Envoyer le lien'
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                  <Link
                    href="/auth/connexion"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la connexion
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Paideia — Plateforme d'accompagnement scolaire
        </p>
      </div>
    </div>
  )
}
