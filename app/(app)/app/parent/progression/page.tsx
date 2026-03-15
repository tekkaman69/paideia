import Link from 'next/link'
import { TrendingUp, Star, Target, CheckCircle, Circle, Clock, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { requireParent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { xpProgress, initials, formatDateFr } from '@/lib/utils'
import type { Student, StudentGoal, Goal, StudentBadge, Badge as unknown as BadgeType } from '@/types'

type StudentGoalWithGoal   = StudentGoal & { goal: Goal }
type StudentBadgeWithBadge = StudentBadge & { badge: BadgeType }

const GOAL_STATUS_MAP = {
  completed:   { label: 'Terminé',     icon: CheckCircle, color: 'text-green-600',  bg: 'bg-green-100' },
  in_progress: { label: 'En cours',    icon: Clock,       color: 'text-blue-600',   bg: 'bg-blue-100' },
  not_started: { label: 'Non démarré', icon: Circle,      color: 'text-gray-400',   bg: 'bg-gray-100' },
}

export default async function ParentProgressionPage() {
  const profile  = await requireParent()
  const supabase = await createClient()

  const { data: rawStudents } = await supabase
    .from('students')
    .select(`
      *,
      student_goals(*, goal:goals(*)),
      student_badges(*, badge:badges(*))
    `)
    .eq('parent_id', profile.id)
  const students = (rawStudents ?? []) as unknown as Array<Student & { student_goals: StudentGoalWithGoal[]; student_badges: StudentBadgeWithBadge[] }>

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Progression</h1>
        <p className="text-gray-500 mt-1">Suivez l'avancement et les réussites de vos enfants.</p>
      </div>

      {!students.length ? (
        <Card className="border-dashed border-2 border-gray-200 shadow-none">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-700 mb-1">Aucun élève lié</h3>
            <p className="text-sm text-gray-400">Ajoutez un enfant depuis les paramètres de votre compte.</p>
          </CardContent>
        </Card>
      ) : (
        students.map((student, idx, arr) => {
          const xp         = student.xp_total ?? 0
          const prog       = xpProgress(xp)
          const goals      = student.student_goals ?? []
          const completed  = goals.filter(g => g.status === 'completed')
          const inProgress = goals.filter(g => g.status === 'in_progress')
          const badges     = student.student_badges ?? []

          return (
            <div key={student.id} className="space-y-4">
              {/* Student header */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 ring-4 ring-white/20 shrink-0">
                      <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                        {initials(student.display_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h2 className="text-xl font-bold">{student.display_name}</h2>
                        <Badge className="bg-gold-400 text-white border-0 font-bold">
                          Niveau {prog.level}
                        </Badge>
                        {(student.streak_days ?? 0) > 0 && (
                          <span className="text-sm font-semibold text-yellow-200">
                            🔥 {student.streak_days} jours
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={prog.percent} className="h-2.5 flex-1 bg-white/20 [&>div]:bg-gold-400" />
                        <span className="text-sm text-primary-200 whitespace-nowrap tabular-nums">
                          {prog.current}/{prog.needed} XP
                        </span>
                      </div>
                      <p className="text-xs text-primary-200">
                        {xp} XP total · Prochain niveau à {prog.needed - prog.current} XP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: completed.length,  label: 'Terminés',  color: 'text-green-600', bg: 'bg-green-50',  icon: CheckCircle },
                  { value: inProgress.length, label: 'En cours',  color: 'text-blue-600',  bg: 'bg-blue-50',   icon: Clock },
                  { value: badges.length,     label: 'Badges',    color: 'text-gold-600',  bg: 'bg-gold-50',   icon: Star },
                ].map(({ value, label, color, bg, icon: Icon }) => (
                  <Card key={label} className={`border-0 shadow-sm ${bg}`}>
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <p className={`text-2xl font-bold ${color}`}>{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Goals */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2 pt-5">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary-500" />
                      Objectifs ({goals.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2 space-y-2">
                    {!goals.length ? (
                      <p className="text-sm text-gray-400 py-4 text-center">Aucun objectif assigné.</p>
                    ) : (
                      goals.slice(0, 6).map(sg => {
                        const meta = GOAL_STATUS_MAP[sg.status as keyof typeof GOAL_STATUS_MAP] ?? GOAL_STATUS_MAP.not_started
                        const Icon = meta.icon
                        return (
                          <div key={sg.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50">
                            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${meta.color}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{sg.goal?.title}</p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <Badge variant="secondary" className={`text-xs border-0 px-1.5 py-0 ${meta.bg} ${meta.color}`}>
                                  {meta.label}
                                </Badge>
                                {sg.goal?.xp_reward && (
                                  <span className="text-xs text-gold-600 flex items-center gap-0.5">
                                    <Zap className="w-3 h-3" />{sg.goal.xp_reward} XP
                                  </span>
                                )}
                              </div>
                              {sg.status === 'in_progress' && sg.progress_percent != null && (
                                <Progress value={sg.progress_percent} className="h-1.5 mt-1.5" />
                              )}
                              {sg.status === 'completed' && sg.completed_at && (
                                <p className="text-xs text-green-600 mt-1">
                                  Terminé le {formatDateFr(sg.completed_at)}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2 pt-5">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold-500" />
                      Badges obtenus ({badges.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    {!badges.length ? (
                      <p className="text-sm text-gray-400 py-4 text-center">Aucun badge encore obtenu.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {badges.slice(0, 9).map(sb => (
                          <div key={sb.id} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gold-50 text-center">
                            <span className="text-2xl">{sb.badge?.icon ?? '🏅'}</span>
                            <span className="text-xs font-medium text-gold-800 leading-tight line-clamp-2">
                              {sb.badge?.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {idx < arr.length - 1 && <Separator className="mt-4" />}
            </div>
          )
        })
      )}
    </div>
  )
}
