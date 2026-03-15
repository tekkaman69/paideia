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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn, slugify } from '@/lib/utils'
import { ContentItemSchema } from '@/types'
import { createClient } from '@/lib/supabase/client'
import type { ContentCategory, Plan } from '@/types'
import type { z } from 'zod'

type FormData = z.infer<typeof ContentItemSchema>

interface ResourceEditorProps {
  categories: Pick<ContentCategory, 'id' | 'name' | 'slug'>[]
  plans: Pick<Plan, 'id' | 'name'>[]
  mode: 'create' | 'edit'
  initialData?: Partial<FormData & { id: string; content_html: string }>
}

export function ResourceEditor({ categories, plans, mode, initialData }: ResourceEditorProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') ?? '')

  const form = useForm<FormData>({
    resolver: zodResolver(ContentItemSchema),
    defaultValues: {
      title:        initialData?.title        ?? '',
      slug:         initialData?.slug         ?? '',
      excerpt:      initialData?.excerpt       ?? '',
      content_html: initialData?.content_html ?? '',
      category_id:  initialData?.category_id  ?? null,
      content_type: initialData?.content_type ?? 'article',
      status:       initialData?.status       ?? 'draft',
      access_level: initialData?.access_level ?? 'public',
      tags:         initialData?.tags          ?? [],
    },
  })

  const watchTitle       = form.watch('title')
  const watchAccessLevel = form.watch('access_level')
  const watchStatus      = form.watch('status')

  // Auto-generate slug from title (only in create mode)
  useEffect(() => {
    if (mode === 'create' && watchTitle) {
      form.setValue('slug', slugify(watchTitle))
    }
  }, [watchTitle, mode, form])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Rédigez le contenu de votre ressource ici…' }),
    ],
    content: initialData?.content_html ?? '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[320px] px-4 py-3 focus:outline-none text-gray-800',
      },
    },
    onUpdate({ editor }) {
      form.setValue('content_html', editor.getHTML())
    },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    const supabase = createClient()

    // Parse tags from comma-separated input
    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : []

    const payload = {
      ...data,
      content_html: editor?.getHTML() ?? '',
      tags,
      published_at:
        data.status === 'published' && mode === 'create'
          ? new Date().toISOString()
          : undefined,
    }

    let error: { message: string } | null = null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAny = supabase as any
    if (mode === 'create') {
      const result = await supabaseAny.from('content_items').insert(payload)
      error = result.error
    } else if (initialData?.id) {
      const result = await supabaseAny
        .from('content_items')
        .update(payload)
        .eq('id', initialData.id)
      error = result.error
    }

    setSaving(false)

    if (error) {
      toast.error('Erreur : ' + error.message)
      return
    }

    toast.success(mode === 'create' ? 'Ressource créée avec succès !' : 'Ressource mise à jour !')
    router.push('/admin/resources')
    router.refresh()
  }

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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push('/admin/resources')}
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
          {mode === 'create' ? 'Créer la ressource' : 'Enregistrer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── Left: Main editor ── */}
        <div className="lg:col-span-2 space-y-5">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  placeholder="Titre de la ressource"
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
                  placeholder="slug-de-la-ressource"
                  className="font-mono text-sm text-gray-600"
                  {...form.register('slug')}
                />
                {form.formState.errors.slug && (
                  <p className="text-xs text-red-600">{form.formState.errors.slug.message}</p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Extrait / Description courte</Label>
                <textarea
                  id="excerpt"
                  rows={2}
                  className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Courte description de la ressource…"
                  {...form.register('excerpt')}
                />
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
        </div>

        {/* ── Right: Publication settings ── */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-1.5">
                <Label htmlFor="status">Statut</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register('status')}
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>

              {/* Content type */}
              <div className="space-y-1.5">
                <Label htmlFor="content_type">Type de contenu</Label>
                <select
                  id="content_type"
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register('content_type')}
                >
                  <option value="article">Article</option>
                  <option value="exercise">Exercice</option>
                  <option value="video">Vidéo</option>
                  <option value="document">Document</option>
                  <option value="quiz">Quiz</option>
                  <option value="worksheet">Fiche de travail</option>
                </select>
              </div>

              <Separator />

              {/* Access level */}
              <div className="space-y-1.5">
                <Label htmlFor="access_level">Niveau d'accès</Label>
                <select
                  id="access_level"
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...form.register('access_level')}
                >
                  <option value="public">Public</option>
                  <option value="all_subscribers">Tous les abonnés</option>
                  <option value="plan_specific">Plan spécifique</option>
                  <option value="student_specific">Élève spécifique</option>
                </select>
              </div>

              {/* Plan selector — only when plan_specific */}
              {watchAccessLevel === 'plan_specific' && plans.length > 0 && (
                <div className="space-y-1.5">
                  <Label htmlFor="plan_id">Plan requis</Label>
                  <select
                    id="plan_id"
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Tous les plans</option>
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...form.register('category_id')}
              >
                <option value="">Sans catégorie</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="maths, fractions, cm2 …"
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
