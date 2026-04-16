import Link from 'next/link'
import {
  GraduationCap, Lock, CheckCircle, Clock, ChevronRight,
  Zap, Star, PlayCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { requireParent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import type { Module, ProfileModuleProgress } from '@/types'

// ── helpers ──────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, string> = {
  decouverte:    'Découverte',
  intermediaire: 'Intermédiaire',
  avance:        'Avancé',
}

const LEVEL_COLORS: Record<string, string> = {
  decouverte:    'bg-green-100 text-green-700',
  intermediaire: 'bg-blue-100 text-blue-700',
  avance:        'bg-purple-100 text-purple-700',
}

function moduleProgress(p: ProfileModuleProgress | null) {
  if (!p) return { percent: 0, done: 0, total: 3 }
  const done =
    (p.quiz_score !== null && p.quiz_score >= 5 ? 1 : 0) +
    (p.self_eval_score !== null ? 1 : 0) +
    (p.activity_completed ? 1 : 0)
  return { percent: Math.round((done / 3) * 100), done, total: 3 }
}

// ── page ─────────────────────────────────────────────────────────────────

export default async function ParentModulesPage() {
  const profile  = await requireParent()
  const supabase = await createModulesClient()

  const { data: rawModules } = await supabase
    .from('modules')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  const modules = (rawModules ?? []) as Module[]

  const { data: rawProgress } = await supabase
    .from('profile_module_progress')
    .select('*')
    .eq('profile_id', profile.id)
  const progressMap = new Map<string, ProfileModuleProgress>(
    ((rawProgress ?? []) as ProfileModuleProgress[]).map(p => [p.module_id, p])
  )

  const totalXp       = (rawProgress ?? []).reduce((sum: number, p: any) => sum + (p.xp_earned ?? 0), 0)
  const completedCount = (rawProgress ?? []).filter((p: any) => p.status === 'completed').length
  const inProgressCount = (rawProgress ?? []).filter((p: any) => p.status === 'in_progress').length

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary-600" />
          Mon parcours
        </h1>
        <p className="text-gray-500 mt-1">
          8 modules pour accompagner votre enfant neurodivergent avec confiance.
        </p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: completedCount,  label: 'Modules terminés',  color: 'text-green-600', bg: 'bg-green-50',   icon: CheckCircle },
          { value: inProgressCount, label: 'En cours',          color: 'text-blue-600',  bg: 'bg-blue-50',    icon: Clock },
          { value: totalXp,         label: 'XP gagnés',         color: 'text-gold-600',  bg: 'bg-gold-50',    icon: Zap },
        ].map(({ value, label, color, bg, icon: Icon }) => (
          <Card key={label} className={`border-0 shadow-sm ${bg}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 leading-tight">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module list */}
      <div className="space-y-3">
        {modules.map((mod, idx) => {
          const prog    = progressMap.get(mod.id) ?? null
          const mp      = moduleProgress(prog)
          const status  = prog?.status ?? 'not_started'
          const isLocked = idx > 0 && !progressMap.has(modules[idx - 1].id)

          return (
            <Card
              key={mod.id}
              className={`border-0 shadow-sm transition-shadow ${isLocked ? 'opacity-60' : 'hover:shadow-md'}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">

                  {/* Module number bubble */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg
                    ${status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : status === 'in_progress'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-sand-100 text-sand-500'}`}
                  >
                    {status === 'completed'
                      ? <CheckCircle className="w-6 h-6" />
                      : <span>M{idx + 1}</span>}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant="secondary" className={`text-xs border-0 px-2 ${LEVEL_COLORS[mod.level]}`}>
                            {LEVEL_LABELS[mod.level]}
                          </Badge>
                          {mod.estimated_duration_min && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {mod.estimated_duration_min} min
                            </span>
                          )}
                          {status === 'completed' && (
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {prog?.xp_earned ?? 0} XP gagnés
                            </span>
                          )}
                        </div>
                        <h2 className="font-semibold text-gray-900 leading-snug">{mod.title}</h2>
                        {mod.subtitle && (
                          <p className="text-sm text-gray-500 mt-0.5 leading-snug">{mod.subtitle}</p>
                        )}
                      </div>

                      {/* CTA */}
                      {isLocked ? (
                        <div className="flex items-center gap-1.5 text-sm text-gray-400 shrink-0">
                          <Lock className="w-4 h-4" />
                          <span className="hidden sm:inline">Verrouillé</span>
                        </div>
                      ) : (
                        <Link
                          href={`/app/parent/modules/${mod.slug}`}
                          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                            bg-primary-600 text-white hover:bg-primary-700"
                        >
                          {status === 'not_started'
                            ? <><PlayCircle className="w-4 h-4" />Commencer</>
                            : status === 'completed'
                            ? <><CheckCircle className="w-4 h-4" />Revoir</>
                            : <><ChevronRight className="w-4 h-4" />Continuer</>}
                        </Link>
                      )}
                    </div>

                    {/* Progress bar (only if started) */}
                    {status !== 'not_started' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-400">
                            {mp.done}/{mp.total} étapes complétées
                          </span>
                          <span className="text-xs font-medium text-primary-600">{mp.percent}%</span>
                        </div>
                        <Progress value={mp.percent} className="h-1.5" />
                      </div>
                    )}

                    {/* Steps chips */}
                    {status !== 'not_started' && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {[
                          { label: 'Quiz',          done: prog?.quiz_score !== null && (prog?.quiz_score ?? 0) >= 5 },
                          { label: 'Auto-évaluation', done: prog?.self_eval_score !== null },
                          { label: 'Activité',      done: prog?.activity_completed ?? false },
                        ].map(({ label, done }) => (
                          <span
                            key={label}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium
                              ${done ? 'bg-green-100 text-green-700' : 'bg-sand-100 text-sand-500'}`}
                          >
                            {done ? '✓ ' : ''}{label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
