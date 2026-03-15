import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, truncate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export const metadata = {
  title: 'Blog — Conseils et ressources pédagogiques',
  description: 'Découvrez nos articles sur l\'accompagnement scolaire, les méthodes pédagogiques et les conseils pour les familles.',
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_image_url, category, tags, published_at, created_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20)

  const allPosts = (posts ?? []) as BlogPost[]
  const categories = [...new Set(allPosts.map(p => p.category).filter(Boolean))]

  return (
    <div className="py-16 lg:py-24">
      <div className="page-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Blog Paideia
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">Ressources & conseils</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Articles, guides et conseils pour accompagner au mieux vos enfants dans leur scolarité.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <Badge key={cat} variant="secondary" className="px-4 py-1.5 text-sm bg-white text-gray-600 border border-gray-200">
                {cat}
              </Badge>
            ))}
          </div>
        )}

        {!allPosts.length ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">Aucun article publié pour l'instant</p>
            <p className="text-gray-400 text-sm mt-2">Revenez bientôt pour découvrir nos premiers articles.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <Card className="h-full border-0 shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-sand-200 relative overflow-hidden">
                    {post.cover_image_url ? (
                      <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary-300" />
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/95 text-primary-700 border-0 text-xs font-medium">
                          {post.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h2 className="font-semibold text-gray-900 text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">{truncate(post.excerpt, 120)}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.published_at ? formatDateFr(post.published_at) : formatDateFr(post.created_at)}
                      </span>
                      <span className="text-primary-500 font-medium flex items-center gap-1">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
