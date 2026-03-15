import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { ResourceEditor } from '@/components/admin/ResourceEditor'

export default async function NewResourcePage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('content_categories')
    .select('id, name, slug')
    .order('sort_order')

  const { data: plans } = await supabase
    .from('plans')
    .select('id, name')
    .eq('is_active', true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle ressource</h1>
        <p className="text-gray-500 text-sm mt-1">Créez une nouvelle ressource pédagogique.</p>
      </div>
      <ResourceEditor
        categories={categories ?? []}
        plans={plans ?? []}
        mode="create"
      />
    </div>
  )
}
