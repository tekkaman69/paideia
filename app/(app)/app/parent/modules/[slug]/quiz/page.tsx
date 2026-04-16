import { notFound } from 'next/navigation'
import { requireParent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import { QuizPlayer } from '@/components/modules/QuizPlayer'
import type { Module, QuizQuestionWithOptions } from '@/types'

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  await requireParent()
  const supabase = await createModulesClient()

  const { data: rawMod } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()
  if (!rawMod) notFound()
  const mod = rawMod as Module

  const { data: rawQuestions } = await supabase
    .from('quiz_questions')
    .select('*, options:quiz_options(*)')
    .eq('module_id', mod.id)
    .order('sort_order', { ascending: true })

  const questions = (rawQuestions ?? []) as QuizQuestionWithOptions[]

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <QuizPlayer
        module={mod}
        questions={questions}
        moduleSlug={slug}
      />
    </div>
  )
}
