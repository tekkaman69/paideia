import Link from 'next/link'
import {
  CheckCircle, Lock, PlayCircle, ChevronRight,
  Zap, Star, Clock,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { requireStudent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import type { Module, ProfileModuleProgress } from '@/types'

// ── Series metadata ───────────────────────────────────────────────────────

const SERIES_META: Record<number, { label: string; emoji: string; color: string; bg: string; ring: string }> = {
  1: { label: 'Mon cerveau et moi',        emoji: '🧠', color: 'text-violet-700', bg: 'bg-violet-50',  ring: 'ring-violet-200' },
  2: { label: 'Mes émotions',              emoji: '💭', color: 'text-rose-700',   bg: 'bg-rose-50',    ring: 'ring-rose-200'   },
  3: { label: 'Je m\'organise',             emoji: '📅', color: 'text-blue-700',  bg: 'bg-blue-50',    ring: 'ring-blue-200'   },
  4: { label: 'J\'apprends autrement',      emoji: '📚', color: 'text-amber-700', bg: 'bg-amber-50',   ring: 'ring-amber-200'  },
  5: { label: 'Je vis avec les autres',    emoji: '🤝', color: 'text-green-700', bg: 'bg-green-50',   ring: 'ring-green-200'  },
  6: { label: 'Mes compétences scolaires', emoji: '✏️', color: 'text-teal-700',  bg: 'bg-teal-50',    ring: 'ring-teal-200'   },
}

// ── Unlock logic ──────────────────────────────────────────────────────────

function isSeriesUnlocked(
  seriesNum: number,
  modulesBySeries: Map<number, Module[]>,
  progressMap: Map<string, ProfileModuleProgress>,
): boolean {
  if (seriesNum === 1 || seriesNum === 6) return true

  const hasCompleted = (sNum: number) => {
    const mods = modulesBySeries.get(sNum) ?? []
    return mods.some(m => progressMap.get(m.id)?.status === 'completed')
  }

  if (seriesNum === 2 || seriesNum === 3) return hasCompleted(1)
  if (seriesNum === 4) return hasCompleted(2)
  if (seriesNum === 5) return hasCompleted(3)
  return false
}

function isModuleLocked(
  mod: Module,
  seriesModules: Module[],
  progressMap: Map<string, ProfileModuleProgress>,
  seriesUnlocked: boolean,
): boolean {
  if (!seriesUnlocked) return true
  const idx = seriesModules.indexOf(mod)
  if (idx === 0) return false
  const prev = seriesModules[idx - 1]
  return progressMap.get(prev.id)?.status !== 'completed'
}

function moduleCompletionPercent(prog: ProfileModuleProgress | null): number {
  if (!prog) return 0
  const done =
    (prog.quiz_score !== null && prog.quiz_score >= 5 ? 1 : 0) +
    (prog.self_eval_score !== null ? 1 : 0) +
    (prog.activity_completed ? 1 : 0)
  return Math.round((done / 3) * 100)
}

// ── Page ─────────────────────────────────────────────────────────────────

export default async function EleveModulesPage() {
  const profile  = await requireStudent()
  const supabase = await createModulesClient()

  const { data: rawModules } = await supabase
    .from('modules')
    .select('*')
    .in('audience', ['eleve', 'both'])
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

  // Group by series
  const modulesBySeries = new Map<number, Module[]>()
  for (const mod of modules) {
    const s = Math.floor(mod.sort_order / 10)
    if (!modulesBySeries.has(s)) modulesBySeries.set(s, [])
    modulesBySeries.get(s)!.push(mod)
  }

  const completedCount  = [...progressMap.values()].filter(p => p.status === 'completed').length
  const totalXp         = [...progressMap.values()].reduce((s, p) => s + (p.xp_earned ?? 0), 0)
  const seriesNums      = [...modulesBySeries.keys()].sort((a, b) => a - b)

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
          <div className="w-full h-full rounded-full bg-white" style={{ transform: 'translate(30%, -30%)' }} />
        </div>
        <div className="relative">
          <p className="text-violet-200 text-sm font-medium mb-1">Mon parcours d'apprentissage</p>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Mes modules 🚀
          </h1>
          <p className="text-violet-200 text-sm">
            Explore les séries et gagne des XP à chaque module complété !
          </p>
          <div className="flex gap-6 mt-5">
            <div className="text-center">
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-xs text-violet-200">modules terminés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-300" />
                {totalXp}
              </p>
              <p className="text-xs text-violet-200">XP gagnés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{modules.length}</p>
              <p className="text-xs text-violet-200">modules au total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Series */}
      {seriesNums.map(sNum => {
        const meta    = SERIES_META[sNum] ?? { label: `Série ${sNum}`, emoji: '📦', color: 'text-gray-700', bg: 'bg-gray-50', ring: 'ring-gray-200' }
        const mods    = modulesBySeries.get(sNum) ?? []
        const unlocked = isSeriesUnlocked(sNum, modulesBySeries, progressMap)
        const seriesCompleted = mods.filter(m => progressMap.get(m.id)?.status === 'completed').length

        return (
          <div key={sNum}>
            {/* Series header */}
            <div className={`flex items-center gap-3 mb-4 p-4 rounded-2xl ${meta.bg} ring-1 ${meta.ring}`}>
              <span className="text-3xl">{meta.emoji}</span>
              <div className="flex-1">
                <h2 className={`font-bold text-lg ${meta.color}`}>{meta.label}</h2>
                <p className="text-sm text-gray-500">
                  {unlocked
                    ? `${seriesCompleted}/${mods.length} modules complétés`
                    : 'Série verrouillée — complète la série précédente !'}
                </p>
              </div>
              {!unlocked && <Lock className="w-5 h-5 text-gray-400" />}
            </div>

            {/* Modules in series */}
            <div className="space-y-3 pl-0 lg:pl-4">
              {mods.map((mod) => {
                const prog   = progressMap.get(mod.id) ?? null
                const status = prog?.status ?? 'not_started'
                const locked = isModuleLocked(mod, mods, progressMap, unlocked)
                const pct    = moduleCompletionPercent(prog)

                return (
                  <Card
                    key={mod.id}
                    className={`border-0 shadow-sm transition-all ${locked ? 'opacity-50' : 'hover:shadow-md'}`}
                  >
                    <CardContent className="p-4 lg:p-5">
                      <div className="flex items-start gap-4">

                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-bold text-lg
                          ${status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : status === 'in_progress'
                            ? `${meta.bg} ${meta.color}`
                            : 'bg-sand-100 text-sand-500'}`}
                        >
                          {status === 'completed'
                            ? <CheckCircle className="w-6 h-6" />
                            : locked
                            ? <Lock className="w-5 h-5 text-gray-400" />
                            : <span className="text-xl">{meta.emoji}</span>}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                {mod.estimated_duration_min && (
                                  <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {mod.estimated_duration_min} min
                                  </span>
                                )}
                                {status === 'completed' && (
                                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    {prog?.xp_earned ?? 0} XP gagnés
                                  </span>
                                )}
                              </div>
                              <h3 className="font-semibold text-gray-900 leading-snug">{mod.title}</h3>
                              {mod.subtitle && (
                                <p className="text-sm text-gray-500 mt-0.5 leading-snug line-clamp-1">{mod.subtitle}</p>
                              )}
                            </div>

                            {/* CTA */}
                            {locked ? (
                              <span className="text-xs text-gray-400 shrink-0 flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" />
                                Verrouillé
                              </span>
                            ) : (
                              <Link
                                href={`/app/eleve/modules/${mod.slug}`}
                                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                                  ${status === 'completed'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : `bg-violet-600 text-white hover:bg-violet-700`}`}
                              >
                                {status === 'not_started'
                                  ? <><PlayCircle className="w-4 h-4" />Commencer</>
                                  : status === 'completed'
                                  ? <><CheckCircle className="w-4 h-4" />Revoir</>
                                  : <><ChevronRight className="w-4 h-4" />Continuer</>}
                              </Link>
                            )}
                          </div>

                          {/* Progress bar */}
                          {status !== 'not_started' && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex gap-2">
                                  {[
                                    { label: 'Quiz',       done: prog?.quiz_score !== null && (prog?.quiz_score ?? 0) >= (mod.quiz_pass_threshold ?? 5) },
                                    { label: 'Réflexion',  done: prog?.self_eval_score !== null },
                                    { label: 'Activité',   done: prog?.activity_completed ?? false },
                                  ].map(({ label, done }) => (
                                    <span
                                      key={label}
                                      className={`text-xs px-2 py-0.5 rounded-full font-medium
                                        ${done ? 'bg-green-100 text-green-700' : 'bg-sand-100 text-sand-500'}`}
                                    >
                                      {done ? '✓ ' : ''}{label}
                                    </span>
                                  ))}
                                </div>
                                <span className="text-xs font-medium text-gray-400">{pct}%</span>
                              </div>
                              <Progress value={pct} className="h-1.5" />
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
      })}
    </div>
  )
}
