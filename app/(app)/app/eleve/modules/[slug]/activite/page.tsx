import { notFound } from 'next/navigation'
import { requireStudent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import { EleveActivityPlayer } from '@/components/modules/EleveActivityPlayer'
import type { Module, Activity } from '@/types'

export default async function EleveActivitePage({
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

  const { data: rawActivity } = await supabase
    .from('activities')
    .select('*')
    .eq('module_id', mod.id)
    .maybeSingle()
  if (!rawActivity) notFound()
  const activity = rawActivity as Activity

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <EleveActivityPlayer
        module={mod}
        activity={activity}
        moduleSlug={slug}
      />
    </div>
  )
}
