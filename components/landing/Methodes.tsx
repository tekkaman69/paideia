/**
 * components/landing/Methodes.tsx
 * Section "Nos méthodes pédagogiques"
 */

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const METHODS = [
  {
    emoji: '🧠',
    title: 'Approche multisensorielle',
    text: "Associer le visuel, l'auditif et le kinesthésique pour ancrer les apprentissages. Voir, entendre et faire simultanément.",
  },
  {
    emoji: '🔍',
    title: 'Métacognition',
    text: 'Apprendre à apprendre. Comprendre comment son propre cerveau fonctionne, pour mieux le piloter.',
  },
  {
    emoji: '📦',
    title: 'Chunking',
    text: 'Découper chaque notion en petites unités claires. Une étape à la fois, sans surcharge cognitive.',
  },
  {
    emoji: '📅',
    title: 'Routines et rituels',
    text: "Des repères stables à chaque séance : ouverture, travail, bilan, clôture. La prévisibilité réduit l'anxiété.",
  },
  {
    emoji: '✅',
    title: 'Renforcement positif',
    text: 'Valoriser les progrès, même minimes. Construire la confiance en soi est au cœur de chaque séance.',
  },
  {
    emoji: '🎯',
    title: 'Objectifs courts',
    text: "Des mini-objectifs atteignables en séance. L'enfant voit sa progression en temps réel.",
  },
]

export function Methodes() {
  return (
    <section className="py-20 bg-white" aria-labelledby="methodes-title">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 id="methodes-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Nos méthodes pédagogiques
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Des stratégies concrètes, validées par la recherche en sciences cognitives
            et adaptées aux besoins de chaque enfant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METHODS.map(({ emoji, title, text }) => (
            <div
              key={title}
              className="bg-sand-50 rounded-2xl p-6 border border-sand-200 hover:border-primary-200 transition-colors"
            >
              <div className="text-3xl mb-3" aria-hidden>{emoji}</div>
              <h3 className="font-semibold text-primary-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/methodes"
            className="inline-flex items-center gap-2 text-primary-700 font-medium hover:gap-3 transition-all"
          >
            En savoir plus sur nos méthodes
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
