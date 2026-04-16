import { notFound } from 'next/navigation'
import { requireStudent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import { EleveSelfEvalPlayer } from '@/components/modules/EleveSelfEvalPlayer'
import type { Module, SelfEvalItem } from '@/types'

export default async function EleveSelfEvalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  await requireStudent()
  const supabase = await createModulesClient()

  const { data: rawMod } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
    .in('audience', ['eleve', 'both'])
    .eq('is_active', true)
    .maybeSingle()
  if (!rawMod) notFound()
  const mod = rawMod as Module

  const { data: rawItems } = await supabase
    .from('self_eval_items')
    .select('*')
    .eq('module_id', mod.id)
    .eq('audience', 'eleve')
    .order('sort_order', { ascending: true })

  const items = (rawItems ?? []) as SelfEvalItem[]

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <EleveSelfEvalPlayer
        module={mod}
        items={items}
        moduleSlug={slug}
      />
    </div>
  )
}
