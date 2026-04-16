/**
 * components/landing/Offres.tsx
 * Cartes des offres sur la landing.
 */

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OFFERS = [
  {
    id: 'essentiel',
    title: 'Paideia Essentiel',
    subtitle: 'Accompagnement régulier',
    price: '180€',
    period: '/mois',
    highlight: false,
    tag: null,
    desc: "Idéal pour un suivi léger et constant au fil de l'année.",
    sub: 'Sans engagement · Résiliable à tout moment',
    features: [
      "2h d'accompagnement / semaine",
      'Séances en visio depuis chez vous',
      'Bilan pédagogique initial offert',
      'Suivi mensuel des progrès',
      'Communication régulière avec les parents',
    ],
  },
  {
    id: 'intensif',
    title: 'Paideia Intensif',
    subtitle: 'Accompagnement soutenu',
    price: '290€',
    period: '/mois',
    highlight: true,
    tag: 'Le plus choisi',
    desc: 'Pour les situations qui demandent un suivi plus dense et des résultats rapides.',
    sub: 'Sans engagement · Résiliable à tout moment',
    features: [
      "4h d'accompagnement / semaine",
      'Séances en visio depuis chez vous',
      'Bilan pédagogique initial offert',
      'Suivi hebdomadaire des progrès',
      'Communication renforcée avec les parents',
      'Plan de progression personnalisé',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {OFFERS.map(({ id, title, subtitle, price, period, highlight, tag, desc, sub, features }) => (
            <div
              key={id}
              className={`relative rounded-2xl p-7 border flex flex-col ${
                highlight
                  ? 'bg-primary-900 text-white border-primary-700 shadow-xl'
                  : 'bg-white border-sand-200 shadow-card'
              }`}
            >
              {tag && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-400 text-primary-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  ✦ {tag}
                </div>
              )}

              <div className="mb-5 pt-2">
                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? 'text-primary-300' : 'text-primary-600'}`}>
                  {title}
                </p>
                <h3 className={`text-xl font-bold mb-1 ${highlight ? 'text-white' : 'text-primary-900'}`}>
                  {subtitle}
                </h3>
                <p className={`text-sm ${highlight ? 'text-primary-300' : 'text-gray-500'}`}>
                  {desc}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-1">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-primary-900'}`}>
                    {price}
                  </span>
                  <span className={`text-sm ${highlight ? 'text-primary-300' : 'text-gray-400'}`}>
                    {period}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${highlight ? 'text-primary-400' : 'text-gray-400'}`}>
                  {sub}
                </p>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-2.5 mb-8 mt-5">
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

              <Link href="/bilan">
                <Button
                  variant={highlight ? 'gold' : 'default'}
                  size="lg"
                  className="w-full"
                >
                  Réserver mon bilan gratuit
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Bilan pédagogique offert · Sans engagement · Réponse sous 24h
        </p>
      </div>
    </section>
  )
}
