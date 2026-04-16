import { notFound } from 'next/navigation'
import { requireParent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import { SelfEvalPlayer } from '@/components/modules/SelfEvalPlayer'
import type { Module, SelfEvalItem } from '@/types'

export default async function SelfEvalPage({
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

  const { data: rawItems } = await supabase
    .from('self_eval_items')
    .select('*')
    .eq('module_id', mod.id)
    .eq('audience', 'parent')
    .order('sort_order', { ascending: true })

  const items = (rawItems ?? []) as SelfEvalItem[]

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <SelfEvalPlayer
        module={mod}
        items={items}
        moduleSlug={slug}
      />
    </div>
  )
}
