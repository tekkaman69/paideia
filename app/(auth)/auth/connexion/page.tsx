'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from '@/lib/auth/actions'

const schema = z.object({
  email:    z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})
type FormData = z.infer<typeof schema>

export default function ConnexionPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [pending, setPending]           = useState(false)

  const form = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setPending(true)
    setError(null)
    const fd = new FormData()
    fd.set('email', data.email)
    fd.set('password', data.password)
    const result = await signIn(fd)
    if (result?.error) {
      setError(result.error)
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
          <p className="text-gray-500 text-sm mt-3">
            Bienvenue ! Connectez-vous à votre espace.
          </p>
        </div>

        <Card className="shadow-xl border border-sand-200/60 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="text-xl font-semibold text-gray-900">Connexion</CardTitle>
            <CardDescription className="text-gray-500">
              Entrez vos identifiants pour accéder à votre espace.
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

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    href="/auth/mot-de-passe-oublie"
                    className="text-xs text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-11 pr-10"
                    {...form.register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-red-600">{form.formState.errors.password.message}</p>
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
                    Connexion en cours…
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center text-sm text-gray-500">
              Pas encore de compte ?{' '}
              <Link href="/auth/inscription" className="text-primary-600 font-medium hover:underline transition-colors">
                Créer un compte
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Paideia — Plateforme d'accompagnement scolaire
        </p>
      </div>
    </div>
  )
}
