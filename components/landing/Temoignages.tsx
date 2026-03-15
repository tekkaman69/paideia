/**
 * components/landing/Temoignages.tsx
 * Témoignages — mock pour le MVP.
 */

import React from 'react'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Sophie L.',
    role: 'Mère de Mathieu, 9 ans (dyslexie)',
    text: 'En 3 mois, Mathieu a retrouvé confiance en lui. Il ne redoute plus la lecture. L\'intervenante sait exactement comment l\'aborder, avec patience et humour. Un grand merci.',
    stars: 5,
    initials: 'SL',
  },
  {
    name: 'David M.',
    role: 'Père de Chloé, 12 ans (TDAH)',
    text: 'Chloé dit que c\'est "la seule aide qui ne la stresse pas". Les séances sont bien structurées, avec des pauses au bon moment. Sa moyenne a remonté de 2 points cette année.',
    stars: 5,
    initials: 'DM',
  },
  {
    name: 'Marie-Claire B.',
    role: 'Mère de Lucas, 14 ans',
    text: 'Lucas avait abandonné l\'idée de comprendre les maths. Avec les méthodes de Paideia — tout petits morceaux, beaucoup de schémas — il a réussi son brevet. On n\'y croyait plus.',
    stars: 5,
    initials: 'MB',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
      ))}
    </div>
  )
}

export function Temoignages() {
  return (
    <section className="py-20 bg-white" aria-labelledby="temoignages-title">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 id="temoignages-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Ce que disent les familles
          </h2>
          <p className="text-gray-500 text-lg">
            Des résultats concrets, mesurés en confiance retrouvée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, text, stars, initials }) => (
            <blockquote
              key={name}
              className="bg-sand-50 rounded-2xl p-6 border border-sand-200 flex flex-col gap-4"
            >
              <StarRating count={stars} />
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{text}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-primary-900 text-sm">{name}</div>
                  <div className="text-gray-400 text-xs">{role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
