import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { BlogEditor } from '@/components/admin/BlogEditor'
import type { BlogPost } from '@/types'

interface Props { params: { id: string } }

export default async function BlogPostEditorPage({ params }: Props) {
  await requireAdmin()

  if (params.id === 'new') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nouvel article</h1>
          <p className="text-gray-500 text-sm mt-1">Rédigez un nouvel article de blog.</p>
        </div>
        <BlogEditor mode="create" />
      </div>
    )
  }

  const supabase = await createClient()
  const { data: rawPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()
  const post = rawPost as unknown as BlogPost | null

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Modifier l'article</h1>
        <p className="text-gray-500 text-sm mt-1">Éditez et publiez votre article.</p>
      </div>
      <BlogEditor mode="edit" initialData={post} />
    </div>
  )
}
