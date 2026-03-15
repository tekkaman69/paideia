import type { Metadata } from 'next'
import { FaqSection } from '@/components/landing/FaqSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes',
  description: 'Toutes les réponses à vos questions sur Paideia : méthodes, tarifs, annulations, RGPD, accessibilité.',
}

const EXTRA_FAQ = [
  {
    category: 'Séances et organisation',
    items: [
      { q: 'Combien de séances par semaine est-il conseillé ?', a: 'Pour la plupart des enfants, 1 séance par semaine est un bon rythme de départ. La régularité prime sur la fréquence.' },
      { q: 'Peut-on changer de formule en cours de route ?', a: 'Oui, librement, en fonction des disponibilités.' },
      { q: 'Les séances ont-elles lieu pendant les vacances ?', a: 'Nous proposons des créneaux selon les disponibilités. Les vacances scolaires sont souvent l\'occasion de séances de consolidation.' },
    ],
  },
  {
    category: 'Technique',
    items: [
      { q: 'Quel navigateur utiliser pour la classe virtuelle ?', a: 'Chrome, Firefox ou Edge à jour. Safari sur iOS est également compatible.' },
      { q: 'La séance peut-elle être enregistrée ?', a: 'Non. Pour respecter le RGPD et la vie privée des enfants, aucun enregistrement n\'est effectué.' },
    ],
  },
  {
    category: 'Données & RGPD',
    items: [
      { q: 'Quelles données sont collectées sur mon enfant ?', a: 'Seulement le prénom, la tranche d\'âge et les pistes pédagogiques (tags). Aucune donnée médicale. Voir notre politique de confidentialité.' },
      { q: 'Puis-je demander la suppression des données ?', a: 'Oui, à tout moment. Un email à contact@paideia.fr suffit.' },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="page-container max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">Questions fréquentes</h1>
        <p className="text-gray-500 text-lg">
          Vous ne trouvez pas votre réponse ?{' '}
          <Link href="/contact" className="text-primary-600 underline">Contactez-nous</Link>.
        </p>
      </div>

      <FaqSection />

      <div className="mt-12 space-y-10">
        {EXTRA_FAQ.map(({ category, items }) => (
          <section key={category}>
            <h2 className="text-xl font-bold text-primary-900 mb-4 pb-2 border-b border-sand-200">
              {category}
            </h2>
            <div className="space-y-4">
              {items.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl border border-sand-200 p-5">
                  <h3 className="font-medium text-primary-900 mb-2">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
