import Link from 'next/link'
import {
  Users, Calendar, BookOpen, CreditCard,
  Star, Clock, ChevronRight, Plus, Zap, Target,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { requireParent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, formatTimeFr, xpProgress, initials } from '@/lib/utils'
import type { Student, Event, ContentItem, Subscription, Plan } from '@/types'

export default async function ParentDashboardPage() {
  const profile  = await requireParent()
  const supabase = await createClient()

  const { data: students } = await supabase
    .from('students')
    .select('*, student_goals(count), student_badges(count)')
    .eq('parent_id', profile.id)

  const { data: rawSubscription } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*)')
    .eq('profile_id', profile.id)
    .in('status', ['active', 'trialing'])
    .maybeSingle()
  const subscription = rawSubscription as (Subscription & { plan: Plan }) | null

  const studentIds = (students ?? []).map((s: Student) => s.id)

  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true })
    .limit(5)

  const { data: recentContent } = await supabase
    .from('content_items')
    .select('*, category:content_categories(name, color)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(4)

  const sub       = subscription
  const nextEvent = upcomingEvents?.[0] as Event | undefined

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Bonjour, {profile.full_name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Voici le résumé du suivi de {students?.length === 1 ? 'votre enfant' : 'vos enfants'}.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/parent/planning">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              Planning
            </Button>
          </Link>
          <Link href="/app/parent/ressources">
            <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
              <BookOpen className="w-4 h-4" />
              Ressources
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon:  Users,
            bg:    'bg-primary-100',
            ic:    'text-primary-600',
            grad:  'from-primary-50',
            value: students?.length ?? 0,
            label: students?.length === 1 ? 'Élève suivi' : 'Élèves suivis',
            sub:   null,
          },
          {
            icon:  CreditCard,
            bg:    'bg-green-100',
            ic:    'text-green-600',
            grad:  'from-green-50',
            value: sub ? (sub.status === 'trialing' ? 'Essai' : 'Actif') : 'Inactif',
            label: 'Abonnement',
            sub:   sub?.plan?.name ?? 'Aucun plan',
          },
          {
            icon:  Clock,
            bg:    'bg-gold-100',
            ic:    'text-gold-600',
            grad:  'from-gold-50',
            value: null,
            label: 'Prochaine séance',
            sub:   nextEvent ? formatDateFr(nextEvent.start_at) : 'Aucune planifiée',
          },
          {
            icon:  BookOpen,
            bg:    'bg-purple-100',
            ic:    'text-purple-600',
            grad:  'from-purple-50',
            value: recentContent?.length ?? 0,
            label: 'Nouvelles ressources',
            sub:   null,
          },
        ].map(({ icon: Icon, bg, ic, grad, value, label, sub: subLabel }) => (
          <Card key={label} className={`border-0 shadow-sm bg-gradient-to-br ${grad} to-white`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${ic}`} />
                </div>
                {value !== null && (
                  <span className="text-2xl font-bold text-gray-900">{value}</span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-600">{label}</p>
              {subLabel && <p className="text-xs text-gray-400 mt-0.5 truncate">{subLabel}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Progression des élèves</h2>
            <Link href="/app/parent/progression" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Voir tout <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!students?.length ? (
            <Card className="border-dashed border-2 border-gray-200 shadow-none">
              <CardContent className="p-10 text-center">
                <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium mb-1">Aucun élève lié à votre compte</p>
                <p className="text-sm text-gray-400 mb-4">Ajoutez votre premier enfant pour commencer le suivi.</p>
                <Link href="/app/parent/compte">
                  <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Ajouter un enfant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            (students as Array<Student & { student_goals: [{ count: number }]; student_badges: [{ count: number }] }>).map(student => {
              const xp   = student.xp_total ?? 0
              const prog = xpProgress(xp)
              return (
                <Card key={student.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-primary-100 shrink-0">
                        <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-sm">
                          {initials(student.display_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <h3 className="font-semibold text-gray-900">{student.display_name}</h3>
                          <Badge variant="secondary" className="text-xs bg-gold-100 text-gold-700 border-0 px-2">
                            Niveau {prog.level}
                          </Badge>
                          {(student.streak_days ?? 0) > 0 && (
                            <span className="text-xs text-orange-500 font-semibold">
                              🔥 {student.streak_days} jour{student.streak_days > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Progress value={prog.percent} className="h-2 flex-1" />
                          <span className="text-xs text-gray-400 whitespace-nowrap tabular-nums">
                            {prog.current}/{prog.needed} XP
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Target className="w-3.5 h-3.5 text-primary-400" />
                            {student.student_goals?.[0]?.count ?? 0} objectifs
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-gold-400" />
                            {student.student_badges?.[0]?.count ?? 0} badges
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-yellow-400" />
                            {xp} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming events */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                Prochains événements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {!upcomingEvents?.length ? (
                <div className="text-center py-5">
                  <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Aucun événement à venir</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingEvents.slice(0, 4).map((event: Event) => (
                    <div key={event.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-primary-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDateFr(event.start_at)} à {formatTimeFr(event.start_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/app/parent/planning">
                <Button variant="outline" size="sm" className="w-full mt-3 gap-1 text-xs">
                  Voir le planning <ChevronRight className="w-3 h-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <CardTitle className="text-base">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-1">
              {[
                { href: '/app/parent/planning',     icon: Calendar,    bg: 'bg-primary-100', ic: 'text-primary-600', label: 'Voir le planning' },
                { href: '/app/parent/ressources',   icon: BookOpen,    bg: 'bg-gold-100',    ic: 'text-gold-600',    label: 'Voir les ressources' },
                { href: '/app/parent/compte',       icon: Users,       bg: 'bg-purple-100',  ic: 'text-purple-600',  label: 'Gérer les enfants' },
                { href: '/app/parent/facturation',  icon: CreditCard,  bg: 'bg-green-100',   ic: 'text-green-600',   label: 'Facturation' },
              ].map(({ href, icon: Icon, bg, ic, label }) => (
                <Link key={href} href={href} className="block">
                  <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    <div className={`w-6 h-6 rounded-md ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${ic}`} />
                    </div>
                    <span className="text-sm">{label}</span>
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent resources */}
      {recentContent && recentContent.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ressources récentes</h2>
            <Link href="/app/parent/ressources" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Voir tout <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(recentContent as Array<ContentItem & { category: { name: string; color: string } | null }>).map(item => (
              <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    {item.category && (
                      <Badge variant="secondary" className="text-xs border-0 bg-primary-50 text-primary-700">
                        {item.category.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs capitalize ml-auto">
                      {item.content_type}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
