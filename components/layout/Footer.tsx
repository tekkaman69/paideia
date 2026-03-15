/**
 * components/layout/Footer.tsx
 */

import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Marque */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏛️</span>
              <span className="font-bold text-xl">Paideia</span>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed max-w-sm">
              Soutien scolaire à distance, adapté à chaque enfant.
              Pour les élèves DYS, TDAH et tous ceux qui ont besoin
              d'une approche différente.
            </p>
            <p className="text-primary-300 text-xs mt-3 italic">
              Paideia ne remplace pas le suivi d'un orthophoniste,
              psychomotricien ou professionnel de santé.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-gold-300">Découvrir</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              {[
                ['/methodes', 'Nos méthodes'],
                ['/offres', 'Offres & tarifs'],
                ['/blog', 'Blog pédagogique'],
                ['/faq', 'Questions fréquentes'],
                ['/a-propos', 'À propos'],
                ['/contact', 'Nous contacter'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-gold-300">Informations</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              {[
                ['/mentions-legales', 'Mentions légales'],
                ['/politique-confidentialite', 'Politique de confidentialité'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/auth/connexion" className="hover:text-white transition-colors">
                  Espace intervenante
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-400">
          <p>© {new Date().getFullYear()} Paideia. Tous droits réservés.</p>
          <p>Fait avec soin en France 🇫🇷</p>
        </div>
      </div>
    </footer>
  )
}
