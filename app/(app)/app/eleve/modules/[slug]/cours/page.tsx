import { notFound } from 'next/navigation'
import { requireEleve } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import { EleveLessonReader, type LessonSection } from '@/components/modules/EleveLessonReader'
import type { Module } from '@/types'

export default async function EleveCoursPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  await requireEleve()
  const supabase = await createModulesClient()

  const { data: rawMod } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .in('audience', ['eleve', 'both'])
    .maybeSingle()

  if (!rawMod) notFound()
  const mod = rawMod as Module & { lesson_sections?: LessonSection[] }

  if (!mod.lesson_sections || mod.lesson_sections.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-20">
        <p className="text-4xl mb-4">🚧</p>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Cours bientôt disponible</h1>
        <p className="text-gray-500 text-sm">Le contenu de ce module arrive très vite !</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <EleveLessonReader
        module={mod}
        sections={mod.lesson_sections}
        moduleSlug={slug}
      />
    </div>
  )
}
