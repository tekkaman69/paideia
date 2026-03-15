/**
 * components/landing/CtaFinal.tsx
 * CTA final de la landing.
 */

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, MessageCircle } from 'lucide-react'

export function CtaFinal() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
      <div className="section-container text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-6" aria-hidden>🏛️</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à faire le premier pas ?
          </h2>
          <p className="text-primary-200 text-lg mb-8 leading-relaxed">
            Commencez par un échange découverte gratuit.
            On discute de votre enfant, de ses besoins, de vos attentes.
            Sans pression, sans engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reserver">
              <Button size="xl" variant="gold">
                <Calendar size={20} />
                Réserver un échange gratuit
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <MessageCircle size={20} />
                Poser une question
              </Button>
            </Link>
          </div>

          <p className="text-primary-400 text-sm mt-6">
            Réponse sous 24h · Données protégées · Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
