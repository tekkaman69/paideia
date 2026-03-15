/**
 * components/landing/WhyPaideia.tsx
 * Section "Pourquoi Paideia ?"
 */

import React from 'react'
import { Heart, Zap, Shield, BookOpen } from 'lucide-react'

const BENEFITS = [
  {
    icon: Heart,
    title: 'Une approche bienveillante',
    text: 'Pas de jugement, pas de pression. Chaque enfant avance à son rythme dans un cadre sécurisant. L\'erreur est une étape, pas un échec.',
    color: 'text-rose-500 bg-rose-50',
  },
  {
    icon: Zap,
    title: 'Des méthodes qui fonctionnent',
    text: 'Multisensoriel, métacognition, chunking, renforcement positif : des stratégies éprouvées, adaptées aux spécificités de chaque profil.',
    color: 'text-gold-600 bg-gold-50',
  },
  {
    icon: Shield,
    title: 'Pensé pour les profils DYS & TDAH',
    text: 'Interface apaisée, instructions courtes, pauses régulières, supports visuels. Chaque séance est construite pour favoriser la concentration.',
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: BookOpen,
    title: 'Suivi transparent pour les parents',
    text: 'Un compte-rendu après chaque séance. Vous savez exactement ce qui a été travaillé et les prochaines étapes. Sans jargon.',
    color: 'text-green-600 bg-green-50',
  },
]

export function WhyPaideia() {
  return (
    <section className="py-20 bg-white" aria-labelledby="why-paideia-title">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 id="why-paideia-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Pourquoi choisir Paideia ?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Une approche humaine, structurée et réellement adaptée à votre enfant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map(({ icon: Icon, title, text, color }) => (
            <div
              key={title}
              className="flex gap-4 p-6 rounded-2xl border border-sand-100 hover:border-sand-200 transition-colors"
            >
              <div className={`p-3 rounded-xl flex-shrink-0 h-fit ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
