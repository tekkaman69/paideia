import Link from 'next/link'
import { Target, Zap, CheckCircle, Clock, Circle, ChevronRight, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { requireStudent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr } from '@/lib/utils'
import type { StudentGoal, Goal } from '@/types'

type GoalWithGoal = StudentGoal & { goal: Goal }

export default async function EleveObjectifsPage() {
  const profile  = await requireStudent()
  const supabase = await createClient()

  const { data: rawStudent } = await supabase
    .from('students')
    .select('id, display_name')
    .eq('profile_id', profile.id)
    .maybeSingle()
  const student = rawStudent as { id: string; display_name: string } | null

  if (!student) return (
    <div className="p-8 text-center text-gray-500">Profil élève introuvable.</div>
  )

  const { data: allGoals } = await supabase
    .from('student_goals')
    .select('*, goal:goals(*)')
    .eq('student_id', student.id)
    .order('updated_at', { ascending: false })

  const goals = (allGoals ?? []) as unknown as GoalWithGoal[]
  const inProgress  = goals.filter(g => g.status === 'in_progress')
  const notStarted  = goals.filter(g => g.status === 'not_started')
  const completed   = goals.filter(g => g.status === 'completed')

  const totalXP = completed.reduce((sum, g) => sum + (g.goal?.xp_reward ?? 0), 0)

  function GoalCard({ sg, showCompleted = false }: { sg: GoalWithGoal; showCompleted?: boolean }) {
    const isCompleted   = sg.status === 'completed'
    const isInProgress  = sg.status === 'in_progress'
    return (
      <Card className={`border-0 shadow-sm transition-all ${isCompleted ? 'opacity-80' : 'hover:shadow-md'}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isCompleted  ? 'bg-green-100'   :
              isInProgress ? 'bg-primary-100' :
              'bg-gray-100'
            }`}>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : isInProgress ? (
                <Clock className="w-4 h-4 text-primary-600" />
              ) : (
                <Circle className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start flex-wrap gap-2 mb-1.5">
                <h3 className={`font-semibold text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {sg.goal?.title}
                </h3>
                <div className="ml-auto flex items-center gap-1.5">
                  {sg.goal?.category && (
                    <Badge variant="secondary" className="text-xs border-0 bg-sand-100 text-sand-700 px-1.5">
                      {sg.goal.category}
                    </Badge>
                  )}
                  {sg.goal?.xp_reward && (
                    <Badge variant="secondary" className={`text-xs border-0 px-1.5 ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-gold-100 text-gold-700'}`}>
                      <Zap className="w-3 h-3 mr-0.5" />
                      {sg.goal.xp_reward} XP
                    </Badge>
                  )}
                </div>
              </div>
              {sg.goal?.description && (
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">{sg.goal.description}</p>
              )}
              {isInProgress && sg.progress_percent != null && (
                <div className="flex items-center gap-2">
                  <Progress value={sg.progress_percent} className="h-2 flex-1" />
                  <span className="text-xs text-gray-400 tabular-nums">{sg.progress_percent}%</span>
                </div>
              )}
              {isCompleted && sg.completed_at && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Terminé le {formatDateFr(sg.completed_at)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-500" />
            Mes objectifs
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Tes progrès et objectifs pédagogiques.</p>
        </div>
        {totalXP > 0 && (
          <div className="flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-2xl px-4 py-2">
            <Star className="w-4 h-4 text-gold-500" />
            <span className="font-bold text-gold-700">{totalXP} XP</span>
            <span className="text-xs text-gold-600">gagnés</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'En cours',    value: inProgress.length,  bg: 'bg-blue-50 border-blue-200',    text: 'text-blue-700' },
          { label: 'À démarrer', value: notStarted.length,  bg: 'bg-gray-50 border-gray-200',    text: 'text-gray-600' },
          { label: 'Terminés',   value: completed.length,   bg: 'bg-green-50 border-green-200',  text: 'text-green-700' },
        ].map(s => (
          <Card key={s.label} className={`border ${s.bg} shadow-none`}>
            <CardContent className="p-4 text-center">
              <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!goals.length ? (
        <Card className="border-dashed border-2 border-gray-200 shadow-none">
          <CardContent className="p-10 text-center">
            <Target className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Pas encore d'objectifs assignés</p>
            <p className="text-sm text-gray-400 mt-1">Tes objectifs apparaîtront ici quand ils seront assignés par ton enseignant.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {inProgress.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-gray-700 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-500" /> En cours ({inProgress.length})
              </h2>
              {inProgress.map(sg => <GoalCard key={sg.id} sg={sg} />)}
            </div>
          )}
          {notStarted.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-gray-700 flex items-center gap-2 text-sm">
                <Circle className="w-4 h-4 text-gray-400" /> À démarrer ({notStarted.length})
              </h2>
              {notStarted.map(sg => <GoalCard key={sg.id} sg={sg} />)}
            </div>
          )}
          {completed.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-gray-500 flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" /> Terminés ({completed.length})
              </h2>
              {completed.map(sg => <GoalCard key={sg.id} sg={sg} showCompleted />)}
            </div>
          )}
        </>
      )}
    </div>
  )
}
