import { BookOpen, FileText, Video, Puzzle, ClipboardList, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { requireParent } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr } from '@/lib/utils'
import type { ContentItem } from '@/types'

const CONTENT_TYPE_META: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  article:   { icon: FileText,      label: 'Article',    color: 'bg-blue-100 text-blue-700' },
  video:     { icon: Video,         label: 'Vidéo',      color: 'bg-purple-100 text-purple-700' },
  exercise:  { icon: Puzzle,        label: 'Exercice',   color: 'bg-green-100 text-green-700' },
  document:  { icon: FileText,      label: 'Document',   color: 'bg-gray-100 text-gray-700' },
  quiz:      { icon: ClipboardList, label: 'Quiz',       color: 'bg-orange-100 text-orange-700' },
  worksheet: { icon: BookOpen,      label: 'Fiche',      color: 'bg-teal-100 text-teal-700' },
}

type ContentWithCategory = ContentItem & {
  category: { id: string; name: string; color: string } | null
}

export default async function ParentRessourcesPage() {
  await requireParent()
  const supabase = await createClient()

  const { data: rawCategories } = await supabase
    .from('content_categories')
    .select('id, name, color')
    .order('name')
  const categories = (rawCategories ?? []) as { id: string; name: string; color: string }[]

  const { data: rawContent } = await supabase
    .from('content_items')
    .select('*, category:content_categories(id, name, color)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  const content = (rawContent ?? []) as ContentWithCategory[]

  const grouped = categories.reduce<Record<string, ContentWithCategory[]>>((acc, cat) => {
    acc[cat.id] = content.filter(c => c.category_id === cat.id)
    return acc
  }, {})

  const uncategorized = content.filter(c => !c.category_id)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Ressources</h1>
          <p className="text-gray-500 mt-1">
            Tous les documents et contenus disponibles pour accompagner votre enfant.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Rechercher une ressource…"
          className="pl-9 h-10"
        />
      </div>

      {/* Category filter chips */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="px-3 py-1.5 text-xs font-medium cursor-pointer bg-primary-100 text-primary-700 border-0">
            Toutes les catégories
          </Badge>
          {categories.map(cat => (
            <Badge key={cat.id} variant="outline" className="px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-gray-50">
              {cat.name}
            </Badge>
          ))}
        </div>
      )}

      {!content.length ? (
        <Card className="border-dashed border-2 border-gray-200 shadow-none">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-700 mb-1">Aucune ressource disponible</h3>
            <p className="text-sm text-gray-400">Les contenus partagés par l'équipe Paideia apparaîtront ici.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-10">
          {categories.map(cat => {
            const items = grouped[cat.id] ?? []
            if (!items.length) return null
            return (
              <div key={cat.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color ?? '#888' }}
                  />
                  <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>
                  <Badge variant="secondary" className="text-xs">{items.length}</Badge>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => {
                    const meta = CONTENT_TYPE_META[item.content_type] ?? CONTENT_TYPE_META.document
                    const Icon = meta.icon
                    return (
                      <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-9 h-9 rounded-xl ${meta.color} flex items-center justify-center shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                                {item.title}
                              </h3>
                              <Badge variant="secondary" className={`text-xs border-0 mt-1 ${meta.color}`}>
                                {meta.label}
                              </Badge>
                            </div>
                          </div>
                          {item.excerpt && (
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                          )}
                          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                            <span className="text-xs text-gray-400">
                              {item.published_at ? formatDateFr(item.published_at) : 'Récent'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {uncategorized.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Autres ressources</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {uncategorized.map(item => {
                  const meta = CONTENT_TYPE_META[item.content_type] ?? CONTENT_TYPE_META.document
                  const Icon = meta.icon
                  return (
                    <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-xl ${meta.color} flex items-center justify-center shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            <Badge variant="secondary" className={`text-xs border-0 mt-1 ${meta.color}`}>
                              {meta.label}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
