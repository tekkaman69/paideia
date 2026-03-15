'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Save,
  ArrowLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Loader2,
  Link as LinkIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn, slugify } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { BlogPost } from '@/types'

// ── Schema ────────────────────────────────────────────────────────────────────

const BlogPostSchema = z.object({
  title:            z.string().min(1, 'Le titre est requis'),
  slug:             z.string().min(1, 'Le slug est requis'),
  excerpt:          z.string().optional().nullable(),
  category:         z.string().optional().nullable(),
  tags:             z.array(z.string()).optional().nullable(),
  cover_image_url:  z.string().optional().nullable(),
  meta_title:       z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  status:           z.enum(['draft', 'published']),
  content_html:     z.string().optional().nullable(),
})

type FormData = z.infer<typeof BlogPostSchema>

// ── Props ─────────────────────────────────────────────────────────────────────

interface BlogEditorProps {
  mode: 'create' | 'edit'
  initialData?: Partial<BlogPost>
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BlogEditor({ mode, initialData }: BlogEditorProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(initialData?.tags) ? (initialData.tags as string[]).join(', ') : ''
  )

  const form = useForm<FormData>({
    resolver: zodResolver(BlogPostSchema),
    defaultValues: {
      title:            initialData?.title            ?? '',
      slug:             initialData?.slug             ?? '',
      excerpt:          initialData?.excerpt           ?? '',
      category:         initialData?.category          ?? '',
      tags:             (initialData?.tags as string[]) ?? [],
      cover_image_url:  initialData?.cover_image_url   ?? '',
      meta_title:       initialData?.meta_title         ?? '',
      meta_description: initialData?.meta_description   ?? '',
      status:           (initialData?.status as 'draft' | 'published') ?? 'draft',
      content_html:     initialData?.content_html       ?? '',
    },
  })

  const watchTitle  = form.watch('title')
  const watchStatus = form.watch('status')

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (mode === 'create' && watchTitle) {
      form.setValue('slug', slugify(watchTitle))
    }
  }, [watchTitle, mode, form])

  // TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Rédigez le contenu de votre article ici…' }),
    ],
    content: initialData?.content_html ?? '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[320px] px-4 py-3 focus:outline-none text-gray-800',
      },
    },
    onUpdate({ editor }) {
      form.setValue('content_html', editor.getHTML())
    },
  })

  // Insert a link in the editor
  const handleInsertLink = () => {
    const url = prompt('URL du lien :')
    if (!url || !editor) return
    editor.chain().focus().setLink({ href: url }).run()
  }

  async function onSubmit(data: FormData) {
    setSaving(true)
    const supabase = createClient()

    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : []

    const payload = {
      title:            data.title,
      slug:             data.slug,
      excerpt:          data.excerpt || null,
      category:         data.category || null,
      tags,
      cover_image_url:  data.cover_image_url || null,
      meta_title:       data.meta_title || null,
      meta_description: data.meta_description || null,
      status:           data.status,
      content_html:     editor?.getHTML() ?? '',
      published_at:
        data.status === 'published' && !initialData?.published_at
          ? new Date().toISOString()
          : initialData?.published_at ?? null,
    }

    let error: { message: string } | null = null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAny = supabase as any
    if (mode === 'create') {
      const result = await supabaseAny.from('blog_posts').insert(payload)
      error = result.error
    } else if (initialData?.id) {
      const result = await supabaseAny
        .from('blog_posts')
        .update(payload)
        .eq('id', initialData.id)
      error = result.error
    }

    setSaving(false)

    if (error) {
      toast.error('Erreur : ' + error.message)
      return
    }

    toast.success(mode === 'create' ? 'Article créé avec succès !' : 'Article mis à jour !')
    router.push('/admin/blog')
    router.refresh()
  }

  // ── Toolbar button helper ──────────────────────────────────────────────────

  const ToolbarButton = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void
    active?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'p-1.5 rounded-md transition-colors',
        active
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
      )}
    >
      {children}
    </button>
  )

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Top action bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <Button
          type="submit"
          className="gap-2 bg-primary-600 hover:bg-primary-700"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {mode === 'create' ? "Créer l'article" : 'Enregistrer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── Left: Main editor ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  placeholder="Titre de l'article"
                  className="text-lg font-semibold"
                  {...form.register('title')}
                />
                {form.formState.errors.title && (
                  <p className="text-xs text-red-600">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  placeholder="slug-de-l-article"
                  className="font-mono text-sm text-gray-600"
                  {...form.register('slug')}
                />
                {form.formState.errors.slug && (
                  <p className="text-xs text-red-600">{form.formState.errors.slug.message}</p>
                )}
                <p className="text-xs text-gray-400">/blog/{form.watch('slug') || 'votre-slug'}</p>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Extrait</Label>
                <textarea
                  id="excerpt"
                  rows={2}
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Courte description de l'article…"
                  {...form.register('excerpt')}
                />
              </div>

              {/* Cover image */}
              <div className="space-y-1.5">
                <Label htmlFor="cover_image_url">Image de couverture (URL)</Label>
                <Input
                  id="cover_image_url"
                  placeholder="https://..."
                  {...form.register('cover_image_url')}
                />
                {form.watch('cover_image_url') && (
                  <img
                    src={form.watch('cover_image_url') ?? ''}
                    alt="Aperçu couverture"
                    className="w-full h-32 object-cover rounded-lg mt-2"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* TipTap editor */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader className="pb-0 pt-4 px-4">
              <CardTitle className="text-sm text-gray-600">Contenu</CardTitle>
            </CardHeader>

            {/* Toolbar */}
            <div className="flex items-center flex-wrap gap-0.5 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive('bold')}
                title="Gras"
              >
                <Bold className="w-3.5 h-3.5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive('italic')}
                title="Italique"
              >
                <Italic className="w-3.5 h-3.5" />
              </ToolbarButton>

              <div className="w-px h-4 bg-gray-200 mx-1" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor?.isActive('heading', { level: 2 })}
                title="Titre 2"
              >
                <Heading2 className="w-3.5 h-3.5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor?.isActive('heading', { level: 3 })}
                title="Titre 3"
              >
                <Heading3 className="w-3.5 h-3.5" />
              </ToolbarButton>

              <div className="w-px h-4 bg-gray-200 mx-1" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive('bulletList')}
                title="Liste à puces"
              >
                <List className="w-3.5 h-3.5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                active={editor?.isActive('orderedList')}
                title="Liste numérotée"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </ToolbarButton>

              <div className="w-px h-4 bg-gray-200 mx-1" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                active={editor?.isActive('blockquote')}
                title="Citation"
              >
                <Quote className="w-3.5 h-3.5" />
              </ToolbarButton>

              <ToolbarButton
                onClick={handleInsertLink}
                active={editor?.isActive('link')}
                title="Insérer un lien"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </ToolbarButton>

              <div className="w-px h-4 bg-gray-200 mx-1" />

              <ToolbarButton
                onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                title="Séparateur"
              >
                <span className="text-xs font-mono text-gray-500">—</span>
              </ToolbarButton>
            </div>

            <EditorContent editor={editor} />
          </Card>

          {/* SEO */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="meta_title">Meta title</Label>
                <Input
                  id="meta_title"
                  placeholder="Titre pour les moteurs de recherche"
                  {...form.register('meta_title')}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="meta_description">Meta description</Label>
                <textarea
                  id="meta_description"
                  rows={2}
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Description pour les moteurs de recherche (150–160 caractères recommandés)…"
                  {...form.register('meta_description')}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right: Publication settings ───────────────────────────────── */}
        <div className="space-y-4">
          {/* Publication */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="status">Statut</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register('status')}
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>

              {watchStatus === 'published' && initialData?.published_at && (
                <p className="text-xs text-gray-400">
                  Publié le {new Date(initialData.published_at).toLocaleDateString('fr-FR')}
                </p>
              )}

              <Separator />

              <Button
                type="submit"
                className="w-full gap-2 bg-primary-600 hover:bg-primary-700"
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {mode === 'create' ? "Créer l'article" : 'Enregistrer'}
              </Button>
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Ex: pédagogie, dys, parents…"
                {...form.register('category')}
              />
              <p className="text-xs text-gray-400 mt-1.5">Une seule catégorie par article.</p>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="tdah, dys, maths …"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
              />
              <p className="text-xs text-gray-400">Séparez les tags par des virgules.</p>
              {tagsInput && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {tagsInput
                    .split(',')
                    .map(t => t.trim())
                    .filter(Boolean)
                    .map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
