'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, GraduationCap, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { signUp } from '@/lib/auth/actions'

const schema = z.object({
  role:             z.enum(['parent', 'eleve'], { required_error: 'Choisissez un rôle' }),
  full_name:        z.string().min(2, 'Nom trop court (min. 2 caractères)'),
  email:            z.string().email('Adresse email invalide'),
  password:         z.string().min(8, 'Au moins 8 caractères requis'),
  password_confirm: z.string().min(1, 'Confirmez le mot de passe'),
  accept_terms:     z.boolean().refine(v => v === true, 'Vous devez accepter les conditions'),
}).refine(d => d.password === d.password_confirm, {
  message: 'Les mots de passe ne correspondent pas',
  path:    ['password_confirm'],
})
type FormData = z.infer<typeof schema>

const ROLES = [
  {
    value:       'parent' as const,
    label:       'Parent',
    description: 'Suivez la progression de votre enfant',
    icon:        Users,
    color:       'blue',
  },
  {
    value:       'eleve' as const,
    label:       'Élève',
    description: 'Accédez à vos cours et objectifs',
    icon:        GraduationCap,
    color:       'gold',
  },
]

export default function InscriptionPage() {
  const [showPassword, setShowPassword]        = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [error, setError]                      = useState<string | null>(null)
  const [success, setSuccess]                  = useState(false)
  const [pending, setPending]                  = useState(false)

  const form = useForm<FormData>({
    resolver:     zodResolver(schema),
    defaultValues: { role: undefined, accept_terms: false },
  })

  const selectedRole = form.watch('role')

  async function onSubmit(data: FormData) {
    setPending(true)
    setError(null)
    const fd = new FormData()
    fd.set('email',     data.email)
    fd.set('password',  data.password)
    fd.set('full_name', data.full_name)
    fd.set('role',      data.role)
    const result = await signUp(fd)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    } else if (result?.success) {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-white to-primary-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Compte créé !</h2>
          <p className="text-gray-500 mb-6">
            Vérifiez votre boîte mail et cliquez sur le lien de confirmation pour activer votre compte.
          </p>
          <Link href="/auth/connexion">
            <Button className="bg-primary-600 hover:bg-primary-700">Aller à la connexion</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-white to-primary-50 px-4 py-10">
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
            Rejoignez la plateforme d'accompagnement scolaire.
          </p>
        </div>

        <Card className="shadow-xl border border-sand-200/60 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="text-xl font-semibold text-gray-900">Créer un compte</CardTitle>
            <CardDescription className="text-gray-500">
              Remplissez le formulaire pour commencer.
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

              {/* Role selector */}
              <div className="space-y-2">
                <Label>Vous êtes…</Label>
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map(role => {
                    const Icon     = role.icon
                    const selected = selectedRole === role.value
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => form.setValue('role', role.value, { shouldValidate: true })}
                        className={cn(
                          'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center',
                          selected
                            ? role.color === 'blue'
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gold-500 bg-gold-50 text-gold-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300',
                        )}
                      >
                        {selected && (
                          <span className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-current" />
                          </span>
                        )}
                        <Icon className="w-6 h-6" />
                        <div>
                          <p className="font-semibold text-sm">{role.label}</p>
                          <p className="text-xs opacity-75 leading-tight mt-0.5">{role.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
                {form.formState.errors.role && (
                  <p className="text-xs text-red-600">{form.formState.errors.role.message}</p>
                )}
              </div>

              {/* Full name */}
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Prénom et nom</Label>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Marie Dupont"
                  autoComplete="name"
                  className="h-11"
                  {...form.register('full_name')}
                />
                {form.formState.errors.full_name && (
                  <p className="text-xs text-red-600">{form.formState.errors.full_name.message}</p>
                )}
              </div>

              {/* Email */}
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

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 caractères"
                    autoComplete="new-password"
                    className="h-11 pr-10"
                    {...form.register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-red-600">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <Label htmlFor="password_confirm">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password_confirm"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    placeholder="Retapez le mot de passe"
                    autoComplete="new-password"
                    className="h-11 pr-10"
                    {...form.register('password_confirm')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.password_confirm && (
                  <p className="text-xs text-red-600">{form.formState.errors.password_confirm.message}</p>
                )}
              </div>

              {/* Terms */}
              <div className="space-y-1.5">
                <div className="flex items-start gap-3">
                  <input
                    id="accept_terms"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    {...form.register('accept_terms')}
                  />
                  <label htmlFor="accept_terms" className="text-sm text-gray-600 leading-snug cursor-pointer">
                    J'accepte les{' '}
                    <Link href="/mentions-legales" target="_blank" className="text-primary-600 hover:underline">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link href="/politique-confidentialite" target="_blank" className="text-primary-600 hover:underline">
                      politique de confidentialité
                    </Link>.
                  </label>
                </div>
                {form.formState.errors.accept_terms && (
                  <p className="text-xs text-red-600">{form.formState.errors.accept_terms.message}</p>
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
                    Création du compte…
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center text-sm text-gray-500">
              Déjà un compte ?{' '}
              <Link href="/auth/connexion" className="text-primary-600 font-medium hover:underline transition-colors">
                Se connecter
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
