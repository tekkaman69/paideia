/**
 * components/blog/PostCard.tsx
 */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { fromNow, truncate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
      {post.cover_image_url && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        {(post.tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(post.tags ?? []).slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
        <h2 className="font-bold text-primary-900 mb-2 line-clamp-2 leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {truncate(post.excerpt ?? '', 150)}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{post.category}</span>
          {post.published_at && <span>{fromNow(post.published_at)}</span>}
        </div>
      </div>
    </article>
  )
}
