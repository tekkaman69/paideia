/**
 * lib/db/posts.ts
 * Repository Firestore pour la collection `posts` (blog).
 */

import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs,
  query, where, orderBy, limit, startAfter, serverTimestamp,
  type DocumentSnapshot,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Post, PostStatus } from '@/types'
import { slugify } from '@/lib/utils'

const COL = 'posts'

/** Récupère les posts publiés (pageinés) */
export async function getPublishedPosts(
  pageSize = 9,
  lastDoc?: DocumentSnapshot
): Promise<{ posts: Post[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    collection(db, COL),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    limit(pageSize)
  )
  if (lastDoc) {
    q = query(
      collection(db, COL),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      startAfter(lastDoc),
      limit(pageSize)
    )
  }
  const snap = await getDocs(q)
  const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Post)
  const newLastDoc = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null
  return { posts, lastDoc: newLastDoc }
}

/** Récupère un post par son slug */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(
    collection(db, COL),
    where('slug', '==', slug),
    where('status', '==', 'published')
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() } as Post
}

/** Récupère tous les posts (admin) */
export async function getAllPosts(): Promise<Post[]> {
  const q = query(collection(db, COL), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Post)
}

/** Récupère un post par son ID (admin) */
export async function getPostById(postId: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, COL, postId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Post
}

/** Crée un post */
export async function createPost(
  data: Omit<Post, 'id' | 'updatedAt' | 'authorUid'>,
  authorUid: string
): Promise<string> {
  const slug = data.slug || slugify(data.title)
  const ref = await addDoc(collection(db, COL), {
    ...data,
    slug,
    authorUid,
    updatedAt: serverTimestamp(),
    ...(data.status === 'published' && !data.publishedAt
      ? { publishedAt: serverTimestamp() }
      : {}),
  })
  return ref.id
}

/** Met à jour un post */
export async function updatePost(
  postId: string,
  data: Partial<Omit<Post, 'id' | 'authorUid'>>
): Promise<void> {
  const updates: Record<string, unknown> = {
    ...data,
    updatedAt: serverTimestamp(),
  }
  // Si on publie pour la première fois, définir publishedAt
  if (data.status === 'published') {
    const existing = await getPostById(postId)
    if (!existing?.publishedAt) {
      updates.publishedAt = serverTimestamp()
    }
  }
  await updateDoc(doc(db, COL, postId), updates)
}

/** Supprime un post */
export async function deletePost(postId: string): Promise<void> {
  await deleteDoc(doc(db, COL, postId))
}

/** Récupère les posts par tag */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const q = query(
    collection(db, COL),
    where('status', '==', 'published'),
    where('tags', 'array-contains', tag),
    orderBy('publishedAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Post)
}
