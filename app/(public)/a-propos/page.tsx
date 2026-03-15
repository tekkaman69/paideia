import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'À propos de Paideia',
  description: 'L\'histoire et la philosophie de Paideia, plateforme de soutien scolaire adapté aux enfants DYS et TDAH.',
}

export default function AProposPage() {
  return (
    <div className="page-container max-w-3xl mx-auto">
      <div className="mb-12">
        <div className="text-5xl mb-6">🏛️</div>
        <h1 className="text-4xl font-bold text-primary-900 mb-4">À propos de Paideia</h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          Le mot grec <em>paideia</em> désigne l'éducation globale de l'être humain — corps, esprit, caractère.
          C'est cette vision que nous portons.
        </p>
      </div>

      <div className="prose max-w-none space-y-6 text-gray-700">
        <h2>Notre mission</h2>
        <p>
          Paideia est née d'un constat simple : trop d'enfants "DYS" ou avec un profil TDAH
          arrivent au collège en croyant qu'ils sont moins intelligents que les autres.
          Ce n'est pas vrai. Ils apprennent différemment — et c'est une différence qui mérite
          une pédagogie adaptée, pas une pédagogie de rattrapage.
        </p>
        <p>
          Notre mission : donner à chaque enfant les outils pour comprendre comment
          <em> son</em> cerveau fonctionne, et en faire une force.
        </p>

        <h2>Pourquoi "en ligne" ?</h2>
        <p>
          Pour les enfants DYS et TDAH, le trajet jusqu'au lieu de cours est lui-même une source de fatigue.
          Le domicile est souvent l'environnement où ils se sentent le plus en sécurité.
          La visio permet aussi à l'intervenante de voir l'enfant dans son contexte réel — son bureau,
          ses cahiers, ses affichages muraux — et d'adapter ses conseils en conséquence.
        </p>

        <h2>Notre philosophie</h2>
        <ul>
          <li><strong>Pas de jugement.</strong> L'erreur est une information, pas un échec.</li>
          <li><strong>Pas de sur-diagnostic.</strong> Nous ne posons pas de diagnostics. Nous adaptons.</li>
          <li><strong>Pas de miracle.</strong> Le progrès est lent, réel, et durable.</li>
          <li><strong>Transparence totale.</strong> Les parents savent exactement ce qui se passe en séance.</li>
        </ul>

        <h2>L'équipe</h2>
        <p>
          Paideia est porté par une intervenante spécialisée dans l'accompagnement des élèves à besoins
          particuliers — DYS, TDAH, HPI. Formée aux méthodes de remédiation cognitive et aux approches
          multisensorielles, elle a accompagné des dizaines d'élèves sur plusieurs années.
        </p>
        <p>
          <em>Avis de transparence :</em> Paideia est une petite structure à taille humaine.
          Si la demande dépasse la capacité, nous préférons vous l'indiquer plutôt que de promettre
          ce que nous ne pouvons pas tenir.
        </p>

        <div className="not-prose bg-gold-50 border border-gold-200 rounded-2xl p-6">
          <p className="text-gold-800 font-medium italic text-sm">
            "L'éducation n'est pas le remplissage d'un seau, mais l'allumage d'un feu."
          </p>
          <p className="text-gold-600 text-xs mt-1">— William Butler Yeats</p>
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <Link href="/reserver">
          <Button variant="default" size="lg">Prendre rendez-vous</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg">Nous écrire</Button>
        </Link>
      </div>
    </div>
  )
}
