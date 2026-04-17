/**
 * components/landing/Hero.tsx
 * Section héro de la landing — promesse + CTA.
 */

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      {/* Décoration de fond */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        {/* Colonnes grecques stylisées */}
        <div className="absolute right-8 bottom-0 text-white/5 text-[180px] font-bold select-none leading-none">
          𝜙
        </div>
      </div>

      <div className="section-container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/30 text-gold-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span>🏛️</span>
            <span>Soutien scolaire à domicile — Fort-de-France / Case Pilote</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Ton enfant apprend{' '}
            <span className="text-gold-400">différemment ?</span>{' '}
            <br className="hidden sm:block" />
            Nous avançons{' '}
            <span className="text-gold-400">ensemble.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl">
            Paideia propose un accompagnement scolaire bienveillant,
            adapté aux profils DYS (dyslexie, dyspraxie, dyscalculie),
            TDAH et à tous les élèves qui ont besoin d'une approche différente.
            <strong className="text-white"> À domicile, secteur Fort-de-France et Case Pilote.</strong>
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/reserver">
              <Button size="xl" variant="gold">
                Réserver un échange gratuit
                <Calendar size={20} />
              </Button>
            </Link>
            <Link href="/methodes">
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Découvrir nos méthodes
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

          {/* Rassurances */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-200">
            {[
              '✓ Premier échange offert',
              '✓ Sans engagement',
              '✓ Séances de 55 min',
              '✓ Intervenant qualifié',
            ].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
