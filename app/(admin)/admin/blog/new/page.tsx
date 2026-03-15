import { BlogEditor } from '@/components/admin/BlogEditor'
import { requireAdmin } from '@/lib/auth/server'

export default async function NewBlogPostPage() {
  await requireAdmin()
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
