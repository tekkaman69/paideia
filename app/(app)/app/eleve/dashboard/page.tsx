import Link from 'next/link'
import {
  Zap, Star, Target, CheckCircle, BookOpen,
  Calendar, Video, ChevronRight, TrendingUp, Award,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { requireStudent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { xpProgress, formatDateFr, formatTimeFr, initials } from '@/lib/utils'
import type { Student, StudentGoal, Goal, StudentBadge, Badge as BadgeType, Event } from '@/types'

type GoalWithGoal   = StudentGoal & { goal: Goal }
type BadgeWithBadge = StudentBadge & { badge: BadgeType }
type EventWithRoom  = Event & { virtual_room?: { room_url?: string | null } | null }

export default async function EleveDashboardPage() {
  const profile  = await requireStudent()
  const supabase = await createClient()

  // Fetch the student record linked to this profile
  const { data: rawStudent } = await supabase
    .from('students')
    .select('*')
    .eq('profile_id', profile.id)
    .maybeSingle()
  const student = rawStudent as Student | null

  if (!student) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Profil élève introuvable. Contactez votre enseignant.</p>
      </div>
    )
  }

  // Fetch active goals
  const { data: studentGoals } = await supabase
    .from('student_goals')
    .select('*, goal:goals(*)')
    .eq('student_id', student.id)
    .in('status', ['in_progress', 'not_started'])
    .order('updated_at', { ascending: false })
    .limit(4)

  // Fetch recently earned badges
  const { data: recentBadges } = await supabase
    .from('student_badges')
    .select('*, badge:badges(*)')
    .eq('student_id', student.id)
    .order('earned_at', { ascending: false })
    .limit(6)

  // Completed goals count
  const { count: completedCount } = await supabase
    .from('student_goals')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', student.id)
    .eq('status', 'completed')

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*, virtual_room:virtual_rooms(*), event_participants!inner(profile_id)')
    .eq('event_participants.profile_id', profile.id)
    .gte('start_at', new Date().toISOString())
    .order('start_at', { ascending: true })
    .limit(3)

  const xp    = student.xp_total ?? 0
  const prog  = xpProgress(xp)
  const goals = (studentGoals ?? []) as GoalWithGoal[]
  const badges = (recentBadges ?? []) as BadgeWithBadge[]
  const events = (upcomingEvents ?? []) as EventWithRoom[]
  const nextEvent = events[0]

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Hero welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white p-6 lg:p-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-primary-200 text-sm font-medium mb-1">Tableau de bord</p>
              <h1 className="text-2xl lg:text-3xl font-bold">
                Bonjour, {student.display_name} ! 🎉
              </h1>
              {(student.streak_days ?? 0) > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-primary-200 font-semibold">
                    {student.streak_days} jours de suite — continue comme ça !
                  </span>
                </div>
              )}
            </div>
            <Avatar className="w-14 h-14 ring-4 ring-white/20 shrink-0">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                {initials(student.display_name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* XP bar */}
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold-400 flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Niveau {prog.level}</span>
              </div>
              <span className="text-primary-200 text-sm font-medium tabular-nums">
                {prog.current} / {prog.needed} XP
              </span>
            </div>
            <Progress value={prog.percent} className="h-3 bg-white/20 [&>div]:bg-gold-400" />
            <p className="text-xs text-primary-200 mt-2">
              Encore {prog.needed - prog.current} XP pour atteindre le niveau {prog.level + 1} !
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, bg: 'bg-primary-100', ic: 'text-primary-600', grad: 'from-primary-50', value: prog.level,          label: 'Niveau actuel',     sub: null },
          { icon: Zap,        bg: 'bg-gold-100',    ic: 'text-gold-600',    grad: 'from-gold-50',    value: xp,                   label: 'XP total',          sub: null },
          { icon: CheckCircle,bg: 'bg-green-100',   ic: 'text-green-600',   grad: 'from-green-50',   value: completedCount ?? 0,  label: 'Objectifs terminés', sub: null },
          { icon: Award,      bg: 'bg-purple-100',  ic: 'text-purple-600',  grad: 'from-purple-50',  value: badges.length,        label: 'Badges obtenus',    sub: null },
        ].map(({ icon: Icon, bg, ic, grad, value, label }) => (
          <Card key={label} className={`border-0 shadow-sm bg-gradient-to-br ${grad} to-white`}>
            <CardContent className="p-5 text-center">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-5 h-5 ${ic}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active goals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-500" />
              Mes objectifs
            </h2>
            <Link href="/app/eleve/objectifs" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              Voir tout <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!goals.length ? (
            <Card className="border-dashed border-2 border-gray-200 shadow-none">
              <CardContent className="p-8 text-center">
                <Target className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium mb-1">Pas d'objectifs actifs</p>
                <p className="text-sm text-gray-400">Tes objectifs apparaîtront ici quand ils seront assignés.</p>
              </CardContent>
            </Card>
          ) : (
            goals.map(sg => {
              const isInProgress = sg.status === 'in_progress'
              return (
                <Card key={sg.id} className="border-0 shadow-sm hover:shadow-md transition-shadow group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isInProgress ? 'bg-primary-100' : 'bg-gray-100'}`}>
                        <Target className={`w-4 h-4 ${isInProgress ? 'text-primary-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-1.5">
                          <h3 className="font-semibold text-gray-800 text-sm">{sg.goal?.title}</h3>
                          {sg.goal?.xp_reward && (
                            <Badge variant="secondary" className="text-xs bg-gold-100 text-gold-700 border-0 px-1.5">
                              <Zap className="w-3 h-3 mr-0.5" />
                              {sg.goal.xp_reward} XP
                            </Badge>
                          )}
                          <Badge variant="secondary" className={`text-xs border-0 px-1.5 ml-auto ${isInProgress ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                            {isInProgress ? 'En cours' : 'À démarrer'}
                          </Badge>
                        </div>
                        {isInProgress && sg.progress_percent != null && (
                          <div className="flex items-center gap-2">
                            <Progress value={sg.progress_percent} className="h-2 flex-1" />
                            <span className="text-xs text-gray-400 tabular-nums whitespace-nowrap">{sg.progress_percent}%</span>
                          </div>
                        )}
                        {sg.goal?.description && (
                          <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{sg.goal.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Next event */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                Prochaine séance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {!nextEvent ? (
                <div className="text-center py-5">
                  <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Aucune séance planifiée</p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-primary-50 border border-primary-100">
                  <p className="font-semibold text-primary-900 text-sm mb-1">{nextEvent.title}</p>
                  <p className="text-xs text-primary-600 mb-3">
                    {formatDateFr(nextEvent.start_at)} à {formatTimeFr(nextEvent.start_at)}
                  </p>
                  {nextEvent.virtual_room?.room_url && (
                    <a href={nextEvent.virtual_room.room_url} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700 w-full h-8 text-xs">
                        <Video className="w-3.5 h-3.5" />
                        Rejoindre la classe
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent badges */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <CardTitle className="text-sm flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-500" />
                Mes derniers badges
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {!badges.length ? (
                <div className="text-center py-4">
                  <Award className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Gagne des badges en accomplissant tes objectifs !</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {badges.slice(0, 6).map(sb => (
                    <div
                      key={sb.id}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gradient-to-b from-gold-50 to-white border border-gold-100 text-center group hover:shadow-sm transition-shadow cursor-pointer"
                      title={sb.badge?.title}
                    >
                      <span className="text-2xl">{sb.badge?.icon ?? '🏅'}</span>
                      <span className="text-[10px] font-medium text-gold-800 leading-tight line-clamp-2">
                        {sb.badge?.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick access */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-5">
              <CardTitle className="text-sm">Accès rapide</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-1">
              {[
                { href: '/app/eleve/ressources',       icon: BookOpen, bg: 'bg-primary-100', ic: 'text-primary-600', label: 'Mes ressources' },
                { href: '/app/eleve/planning',         icon: Calendar, bg: 'bg-gold-100',    ic: 'text-gold-600',    label: 'Mon planning' },
                { href: '/app/eleve/classe-virtuelle', icon: Video,    bg: 'bg-green-100',   ic: 'text-green-600',   label: 'Classe virtuelle' },
                { href: '/app/eleve/objectifs',        icon: Target,   bg: 'bg-purple-100',  ic: 'text-purple-600',  label: 'Mes objectifs' },
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
    </div>
  )
}
