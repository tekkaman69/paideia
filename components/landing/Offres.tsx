/**
 * components/landing/Offres.tsx
 * Cartes des offres sur la landing.
 */

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

const OFFERS = [
  {
    id: 'solo',
    title: 'Séance Solo',
    subtitle: 'L\'accompagnement 100% dédié',
    price: 5500,
    duration: '55 min',
    groupSize: '1 enfant',
    highlight: false,
    features: [
      'Bilan de départ offert',
      'Méthodes adaptées au profil',
      'Compte-rendu après chaque séance',
      'Ressources partagées',
      'Ajustements continus',
    ],
  },
  {
    id: 'duo',
    title: 'Séance Duo',
    subtitle: 'La dynamique de l\'échange',
    price: 3500,
    duration: '60 min',
    groupSize: '2 enfants',
    highlight: true,
    tag: 'Populaire',
    features: [
      'Émulation positive entre élèves',
      'Activités collaboratives',
      'Tarif réduit par enfant',
      'Profils compatibles ou différents',
      'Compte-rendu partagé',
    ],
  },
  {
    id: 'agora',
    title: 'Mini-groupe Agora',
    subtitle: 'La force du collectif',
    price: 2500,
    duration: '60 min',
    groupSize: '3-4 enfants',
    highlight: false,
    features: [
      'Ateliers thématiques stimulants',
      'Entraide et coopération',
      'Tarif le plus accessible',
      'Développe les compétences sociales',
      'Idéal pour sortir de l\'isolement',
    ],
  },
]

export function Offres() {
  return (
    <section className="py-20 bg-sand-50" id="offres" aria-labelledby="offres-title">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 id="offres-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Toutes les séances sont dispensées en visio, par une intervenante qualifiée,
            selon les disponibilités qui vous conviennent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {OFFERS.map(({ id, title, subtitle, price, duration, groupSize, highlight, tag, features }) => (
            <div
              key={id}
              className={`relative rounded-2xl p-6 border flex flex-col ${
                highlight
                  ? 'bg-primary-900 text-white border-primary-700 shadow-xl scale-[1.02]'
                  : 'bg-white border-sand-200 shadow-card'
              }`}
            >
              {tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {tag}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${highlight ? 'text-white' : 'text-primary-900'}`}>
                  {title}
                </h3>
                <p className={`text-sm ${highlight ? 'text-primary-200' : 'text-gray-500'}`}>
                  {subtitle}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${highlight ? 'text-gold-400' : 'text-primary-900'}`}>
                    {formatPrice(price)}
                  </span>
                  <span className={`text-sm ${highlight ? 'text-primary-300' : 'text-gray-400'}`}>
                    / séance
                  </span>
                </div>
                <div className={`text-xs mt-1 ${highlight ? 'text-primary-300' : 'text-gray-400'}`}>
                  {duration} · {groupSize}
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2.5 mb-8">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${highlight ? 'text-gold-400' : 'text-primary-500'}`}
                    />
                    <span className={`text-sm ${highlight ? 'text-primary-100' : 'text-gray-600'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/reserver">
                <Button
                  variant={highlight ? 'gold' : 'default'}
                  size="lg"
                  className="w-full"
                >
                  Réserver cette formule
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Premier échange découverte gratuit et sans engagement · Paiement sécurisé
        </p>
      </div>
    </section>
  )
}
