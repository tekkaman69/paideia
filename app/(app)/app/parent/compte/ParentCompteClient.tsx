'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { User, Phone, Shield, Eye, Moon, Type, Loader2, Save, Users, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn, initials } from '@/lib/utils'
import { updateProfile, updatePassword } from '@/lib/actions/profile'
import type { Profile, Student } from '@/types'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Nom requis'),
  phone:     z.string().optional(),
})
type ProfileForm = z.infer<typeof profileSchema>

const passwordSchema = z.object({
  current_password: z.string().min(1, 'Requis'),
  new_password:     z.string().min(8, 'Minimum 8 caractères'),
  confirm_password: z.string(),
}).refine(d => d.new_password === d.confirm_password, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirm_password'],
})
type PasswordForm = z.infer<typeof passwordSchema>

interface Props {
  profile: Profile
  students: Student[]
}

export function ParentCompteClient({ profile, students }: Props) {
  const [calmMode, setCalmMode] = useState(false)
  const [dysFont,  setDysFont]  = useState(false)
  const [savingProfile,  setSavingProfile]  = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const profileForm = useForm<ProfileForm>({
    resolver:     zodResolver(profileSchema),
    defaultValues: { full_name: profile.full_name ?? '', phone: (profile as any).phone ?? '' },
  })
  const passwordForm = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) })

  async function onSaveProfile(data: ProfileForm) {
    setSavingProfile(true)
    try {
      const result = await updateProfile({ full_name: data.full_name, phone: data.phone ?? '' })
      if (result.error) { toast.error(result.error); return }
      toast.success('Profil mis à jour !')
    } catch {
      toast.error('Une erreur inattendue est survenue.')
    } finally {
      setSavingProfile(false)
    }
  }

  async function onSavePassword(data: PasswordForm) {
    setSavingPassword(true)
    try {
      const result = await updatePassword({
        current_password: data.current_password,
        new_password:     data.new_password,
      })
      if (result.error) { toast.error(result.error); return }
      toast.success('Mot de passe modifié !')
      passwordForm.reset()
    } catch {
      toast.error('Une erreur inattendue est survenue.')
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Mon compte</h1>
        <p className="text-gray-500 mt-1">Gérez votre profil, vos préférences et vos enfants.</p>
      </div>

      {/* Profile */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary-500" />Informations personnelles
          </CardTitle>
          <CardDescription>Vos coordonnées et informations de profil.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 ring-2 ring-primary-100">
              <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-xl">
                {initials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-800">{profile.full_name ?? profile.email}</p>
              <Badge variant="secondary" className="text-xs bg-primary-50 text-primary-700 border-0 mt-1">Parent</Badge>
            </div>
          </div>
          <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Nom complet</Label>
                <Input id="full_name" placeholder="Marie Dupont" className="h-10" {...profileForm.register('full_name')} />
                {profileForm.formState.errors.full_name && (
                  <p className="text-xs text-red-600">{profileForm.formState.errors.full_name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input id="phone" placeholder="0696 12 34 56" className="h-10 pl-8" {...profileForm.register('phone')} />
                </div>
              </div>
            </div>
            <Button type="submit" size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700" disabled={savingProfile}>
              {savingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Enregistrer
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Children */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary-500" />Mes enfants
          </CardTitle>
          <CardDescription>Profils élèves liés à votre compte.</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {!students.length ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
              <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-medium mb-1">Aucun enfant lié</p>
              <p className="text-xs text-gray-400">Votre conseiller pédagogique liera le compte de votre enfant à votre espace.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {students.map(student => (
                <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-sm">
                      {initials(student.display_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{student.display_name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <Badge variant="secondary" className="text-xs bg-gold-100 text-gold-700 border-0 px-1.5">
                        Niv. {student.level}
                      </Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-0.5">
                        <Zap className="w-3 h-3 text-gold-500" />{student.xp_total} XP
                      </span>
                      {student.age_range && (
                        <span className="text-xs text-gray-400">{student.age_range} ans</span>
                      )}
                      {student.grade_level && (
                        <span className="text-xs text-gray-400">{student.grade_level}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary-500" />Accessibilité et confort
          </CardTitle>
          <CardDescription>Adaptez l'interface à vos préférences.</CardDescription>
        </CardHeader>
        <CardContent className="pt-2 space-y-4">
          {[
            { icon: Moon, label: 'Mode calme', desc: 'Réduire les animations et stimuli visuels', color: 'indigo', state: calmMode, toggle: () => setCalmMode(v => !v) },
            { icon: Type, label: 'Police DYS', desc: 'Utiliser OpenDyslexic pour les textes',       color: 'orange', state: dysFont,  toggle: () => setDysFont(v => !v)  },
          ].map(({ icon: Icon, label, desc, color, state, toggle }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-${color}-100 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 text-${color}-600`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
              <button
                type="button" onClick={toggle}
                className={cn('relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2', state ? 'bg-primary-600' : 'bg-gray-200')}
              >
                <span className={cn('inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform', state ? 'translate-x-6' : 'translate-x-1')} />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Password */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary-500" />Sécurité
          </CardTitle>
          <CardDescription>Modifiez votre mot de passe.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={passwordForm.handleSubmit(onSavePassword)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="current_password">Mot de passe actuel</Label>
              <Input id="current_password" type="password" placeholder="••••••••" className="h-10" {...passwordForm.register('current_password')} />
              {passwordForm.formState.errors.current_password && (
                <p className="text-xs text-red-600">{passwordForm.formState.errors.current_password.message}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="new_password">Nouveau mot de passe</Label>
                <Input id="new_password" type="password" placeholder="Minimum 8 caractères" className="h-10" {...passwordForm.register('new_password')} />
                {passwordForm.formState.errors.new_password && (
                  <p className="text-xs text-red-600">{passwordForm.formState.errors.new_password.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm_password">Confirmer</Label>
                <Input id="confirm_password" type="password" placeholder="Retapez le nouveau" className="h-10" {...passwordForm.register('confirm_password')} />
                {passwordForm.formState.errors.confirm_password && (
                  <p className="text-xs text-red-600">{passwordForm.formState.errors.confirm_password.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700" disabled={savingPassword}>
              {savingPassword ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Changer le mot de passe
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border border-red-100 shadow-sm">
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="text-base text-red-700">Zone de danger</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-gray-500 mb-4">La suppression de votre compte est définitive. Toutes vos données seront effacées.</p>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
