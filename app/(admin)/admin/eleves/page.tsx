import Link from 'next/link'
import { GraduationCap, Zap, Plus, Pencil } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, xpProgress, initials } from '@/lib/utils'
import type { Student, Profile } from '@/types'

type StudentWithProfile = Student & {
  profile: Pick<Profile, 'id' | 'email' | 'full_name'> | null
  parent_profile: Pick<Profile, 'id' | 'full_name' | 'email'> | null
  student_goals: [{ count: number }] | null
  student_badges: [{ count: number }] | null
}

export default async function AdminElevesPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: students } = await supabase
    .from('students')
    .select(`
      *,
      profile:profiles!students_profile_id_fkey(id, email, full_name),
      parent_profile:profiles!students_parent_id_fkey(id, full_name, email),
      student_goals(count),
      student_badges(count)
    `)
    .order('created_at', { ascending: false })

  const data = (students ?? []) as unknown as StudentWithProfile[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Élèves</h1>
          <p className="text-gray-500 text-sm mt-1">{data.length} élève(s) inscrit(s) sur la plateforme.</p>
        </div>
        <Link href="/admin/eleves/new">
          <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4" />Nouvel élève
          </Button>
        </Link>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {!data.length ? (
            <div className="text-center py-12">
              <GraduationCap className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucun élève inscrit</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Élève', 'Parent', 'Niveau / XP', 'Objectifs', 'Badges', 'Inscrit le'].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map(student => {
                    const prog = xpProgress(student.xp_total ?? 0)
                    return (
                      <tr key={student.id} className="hover:bg-gray-50 group cursor-pointer">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-xs">
                                {initials(student.display_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-800">{student.display_name}</p>
                              <p className="text-xs text-gray-400">{student.profile?.email ?? '—'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm text-gray-700">{student.parent_profile?.full_name ?? '—'}</p>
                            <p className="text-xs text-gray-400">{student.parent_profile?.email ?? ''}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs border-0 bg-gold-100 text-gold-700 px-1.5">
                                Niv. {prog.level}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center gap-0.5">
                                <Zap className="w-3 h-3 text-gold-500" />{student.xp_total ?? 0} XP
                              </span>
                            </div>
                            <Progress value={prog.percent} className="h-1.5 w-24" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">{student.student_goals?.[0]?.count ?? 0}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">{student.student_badges?.[0]?.count ?? 0}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-400">{formatDateFr(student.created_at)}</td>
                        <td className="py-3 px-4">
                          <Link href={`/admin/eleves/${student.id}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
