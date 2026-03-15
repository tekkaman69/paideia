import Link from 'next/link'
import { Plus, Edit, FileText, BookOpen, Video, FileDown, Layers } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { requireAdmin } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { formatDateFr, truncate } from '@/lib/utils'
import type { ContentItem, ContentCategory } from '@/types'

type ContentWithCategory = ContentItem & { category: ContentCategory | null }

export default async function AdminRessourcesPage() {
  await requireAdmin()
  const supabase = await createClient()

  const { data: items } = await supabase
    .from('content_items')
    .select('*, category:content_categories(*)')
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('content_categories')
    .select('*')
    .order('sort_order')

  const contents = (items ?? []) as ContentWithCategory[]

  const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    article:   FileText,
    exercise:  Layers,
    video:     Video,
    document:  FileDown,
    quiz:      BookOpen,
    worksheet: FileText,
  }

  const STATUS_COLORS: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft:     'bg-yellow-100 text-yellow-700',
    archived:  'bg-gray-100 text-gray-500',
  }

  const ACCESS_LABELS: Record<string, string> = {
    public:           'Public',
    all_subscribers:  'Abonnés',
    plan_specific:    'Plan spécifique',
    student_specific: 'Élève spécifique',
  }

  const stats = {
    total:     contents.length,
    published: contents.filter(c => c.status === 'published').length,
    draft:     contents.filter(c => c.status === 'draft').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ressources pédagogiques</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez le contenu pédagogique de la plateforme.</p>
        </div>
        <Link href="/admin/ressources/new">
          <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4" />
            Nouvelle ressource
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total',      value: stats.total,     bg: 'bg-primary-50 border-primary-200',  text: 'text-primary-700' },
          { label: 'Publiés',    value: stats.published, bg: 'bg-green-50 border-green-200',      text: 'text-green-700' },
          { label: 'Brouillons', value: stats.draft,     bg: 'bg-yellow-50 border-yellow-200',    text: 'text-yellow-700' },
        ].map(s => (
          <Card key={s.label} className={`border ${s.bg} shadow-none`}>
            <CardContent className="p-4 text-center">
              <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 pt-5">
          <CardTitle className="text-base">Toutes les ressources</CardTitle>
        </CardHeader>
        <CardContent>
          {!contents.length ? (
            <div className="text-center py-12">
              <BookOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Aucune ressource créée</p>
              <p className="text-sm text-gray-400 mb-4">Créez votre première ressource pédagogique.</p>
              <Link href="/admin/ressources/new">
                <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                  <Plus className="w-4 h-4" />
                  Créer une ressource
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Ressource', 'Catégorie', 'Type', 'Accès', 'Statut', 'Publié le', 'Actions'].map(h => (
                      <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contents.map(item => {
                    const TypeIcon = TYPE_ICONS[item.content_type] ?? FileText
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 group">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                              <TypeIcon className="w-3.5 h-3.5 text-primary-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 truncate max-w-[200px]">{item.title}</p>
                              {item.excerpt && (
                                <p className="text-xs text-gray-400 truncate max-w-[200px]">{truncate(item.excerpt, 60)}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          {item.category ? (
                            <Badge variant="secondary" className="text-xs border-0 bg-primary-50 text-primary-700">
                              {item.category.name}
                            </Badge>
                          ) : <span className="text-xs text-gray-300">—</span>}
                        </td>
                        <td className="py-3 pr-4"><span className="text-xs text-gray-600 capitalize">{item.content_type}</span></td>
                        <td className="py-3 pr-4"><span className="text-xs text-gray-500">{ACCESS_LABELS[item.access_level] ?? item.access_level}</span></td>
                        <td className="py-3 pr-4">
                          <Badge variant="secondary" className={`text-xs border-0 ${STATUS_COLORS[item.status] ?? 'bg-gray-100 text-gray-600'}`}>
                            {item.status === 'published' ? 'Publié' : item.status === 'draft' ? 'Brouillon' : 'Archivé'}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-400">{item.published_at ? formatDateFr(item.published_at) : '—'}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/ressources/${item.id}`}>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
