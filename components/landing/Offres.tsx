import React from 'react'
import Link from 'next/link'
import { Check, Home, Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OFFERS = [
  {
    id: 'essentiel',
    title: 'Paideia Essentiel',
    subtitle: '2h de soutien / semaine',
    priceBrut: '299€',
    priceNet: '149,50€',
    highlight: false,
    tag: null,
    desc: 'Un suivi régulier et structuré pour ancrer les bonnes méthodes de travail.',
    sub: 'Sans engagement · Résiliable à tout moment',
    features: [
      '2h de soutien scolaire / semaine',
      'À domicile, chez vous',
      'Spécialiste dys & TDAH',
      'Bilan pédagogique initial offert',
      'Suivi mensuel des progrès',
      'Communication régulière avec les parents',
    ],
  },
  {
    id: 'intensif',
    title: 'Paideia Intensif',
    subtitle: '4h de soutien / semaine',
    priceBrut: '499€',
    priceNet: '249,50€',
    highlight: true,
    tag: 'Le plus choisi',
    desc: 'Pour un accompagnement dense et des résultats visibles rapidement.',
    sub: 'Sans engagement · Résiliable à tout moment',
    features: [
      '4h de soutien scolaire / semaine',
      'À domicile, chez vous',
      'Spécialiste dys & TDAH',
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
        <div className="text-center mb-10">
          <h2 id="offres-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Séances à domicile par une intervenante spécialisée dys & TDAH,
            aux horaires qui vous conviennent.
          </p>
        </div>

        {/* Bandeau crédit d'impôt */}
        <div className="max-w-3xl mx-auto mb-8 bg-primary-50 border border-primary-200 rounded-2xl px-6 py-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <Percent className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-bold text-primary-900 text-sm mb-0.5">
              Crédit d'impôt avec avance immédiate — vous ne payez que la moitié
            </p>
            <p className="text-gray-600 text-sm">
              Le soutien scolaire à domicile est un service à la personne éligible à 50% de crédit d'impôt.
              Grâce à l'avance immédiate (dispositif URSSAF), cette réduction est déduite{' '}
              <strong>directement au moment du paiement</strong> — sans attendre votre déclaration fiscale.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {OFFERS.map(({ id, title, subtitle, priceBrut, priceNet, highlight, tag, desc, sub, features }) => (
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
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-extrabold ${highlight ? 'text-gold-400' : 'text-primary-900'}`}>
                    {priceNet}
                  </span>
                  <span className={`text-sm ${highlight ? 'text-primary-300' : 'text-gray-400'}`}>/mois</span>
                </div>
                <p className={`text-xs mt-0.5 ${highlight ? 'text-primary-400' : 'text-gray-400'}`}>
                  après avance immédiate · {priceBrut} brut
                </p>
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
