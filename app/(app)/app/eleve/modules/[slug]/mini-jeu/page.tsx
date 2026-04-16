import { notFound } from 'next/navigation'
import { requireStudent } from '@/lib/auth/server'
import { createModulesClient } from '@/lib/supabase/server'
import { EleveMiniGamePlayer } from '@/components/modules/EleveMiniGamePlayer'
import type { Module, MiniGame } from '@/types'

export default async function EleveMiniJeuPage({
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

  const { data: rawGame } = await supabase
    .from('mini_games')
    .select('*')
    .eq('module_id', mod.id)
    .maybeSingle()
  if (!rawGame) notFound()
  const game = rawGame as MiniGame

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <EleveMiniGamePlayer
        module={mod}
        game={game}
        moduleSlug={slug}
      />
    </div>
  )
}
