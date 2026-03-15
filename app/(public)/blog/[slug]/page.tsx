import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient()
  const { data: rawPost } = await supabase
    .from('blog_posts')
    .select('title, excerpt, meta_title, meta_description, cover_image_url')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()
  const post = rawPost as { title: string; excerpt: string | null; meta_title: string | null; meta_description: string | null; cover_image_url: string | null } | null

  if (!post) return { title: 'Article introuvable' }
  return {
    title: post.meta_title ?? post.title,
    description: post.meta_description ?? post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      type: 'article',
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const supabase = await createClient()
  const { data: rawPost2 } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()
  const post = rawPost2 as BlogPost | null

  if (!post) notFound()
  const p = post

  return (
    <article className="py-12 lg:py-20">
      <div className="page-container max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {/* Cover */}
        {p.cover_image_url && (
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
            <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-400">
          {p.category && (
            <Badge variant="secondary" className="bg-primary-50 text-primary-700 border-0">
              {p.category}
            </Badge>
          )}
          {p.tags?.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-gray-400">
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
          {p.published_at && (
            <span className="flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" />
              {formatDateFr(p.published_at)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 leading-tight">
          {p.title}
        </h1>
        {p.excerpt && (
          <p className="text-lg text-gray-500 mb-8 leading-relaxed border-b border-sand-200 pb-8">
            {p.excerpt}
          </p>
        )}

        {/* Content */}
        {p.content_html ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-primary-900 prose-a:text-primary-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: p.content_html }}
          />
        ) : (
          <p className="text-gray-400 italic">Contenu non disponible.</p>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-sand-200">
          <p className="text-sm text-gray-400 italic">
            Paideia — Accompagnement scolaire premium. Cet article est fourni à titre informatif.
          </p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:underline mt-3">
            <ArrowLeft className="w-4 h-4" />
            Voir tous les articles
          </Link>
        </div>
      </div>
    </article>
  )
}
