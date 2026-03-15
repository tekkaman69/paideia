import Link from 'next/link'
import { Plus, FileText, Edit, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, truncate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export default async function AdminBlogPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  const allPosts = (posts ?? []) as unknown as BlogPost[]
  const published = allPosts.filter(p => p.status === 'published').length
  const draft     = allPosts.filter(p => p.status === 'draft').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les articles de blog Paideia.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total',      value: allPosts.length, bg: 'bg-primary-50 border-primary-200', text: 'text-primary-700' },
          { label: 'Publiés',    value: published,       bg: 'bg-green-50 border-green-200',     text: 'text-green-700' },
          { label: 'Brouillons', value: draft,           bg: 'bg-yellow-50 border-yellow-200',   text: 'text-yellow-700' },
        ].map(s => (
          <Card key={s.label} className={`border ${s.bg} shadow-none`}>
            <CardContent className="p-4 text-center">
              <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          {!allPosts.length ? (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucun article créé</p>
              <p className="text-sm text-gray-400 mb-4">Créez votre premier article de blog.</p>
              <Link href="/admin/blog/new">
                <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                  <Plus className="w-4 h-4" />
                  Créer un article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {allPosts.map(post => (
                <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 group">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-800 truncate">{post.title}</p>
                      <Badge variant="secondary" className={`text-xs border-0 shrink-0 ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {post.status === 'published' ? 'Publié' : 'Brouillon'}
                      </Badge>
                    </div>
                    {post.excerpt && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{truncate(post.excerpt, 80)}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">
                      {post.published_at ? `Publié le ${formatDateFr(post.published_at)}` : `Créé le ${formatDateFr(post.created_at)}`}
                      {post.category && ` · ${post.category}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {post.status === 'published' && (
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/blog/${post.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
