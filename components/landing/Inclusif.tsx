/**
 * components/landing/Inclusif.tsx
 * Section "Pour neurotypiques et neurodivergents"
 */

import React from 'react'

const PROFILES = [
  { emoji: '🧩', label: 'Dyslexie', text: 'Lecture, orthographe, décodage.' },
  { emoji: '⚡', label: 'TDAH', text: 'Concentration, organisation, routines.' },
  { emoji: '📐', label: 'Dyscalculie', text: 'Calcul, sens du nombre, logique.' },
  { emoji: '✍️', label: 'Dysorthographie', text: 'Écriture, mémorisation, règles.' },
  { emoji: '🎯', label: 'Dyspraxie', text: 'Coordination, planning, stratégies.' },
  { emoji: '⭐', label: 'Haut potentiel', text: 'Stimulation, profondeur, nuance.' },
  { emoji: '🌱', label: 'Neurotypique', text: 'Méthodes, confiance, régularité.' },
  { emoji: '🌈', label: 'Profil mixte', text: 'Adaptations combinées sur-mesure.' },
]

export function Inclusif() {
  return (
    <section className="py-20 bg-sand-50" aria-labelledby="inclusif-title">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 id="inclusif-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Pour chaque enfant, une approche sur-mesure
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Que votre enfant ait un diagnostic ou non, Paideia s'adapte.
            Nous ne traitons pas des troubles — nous construisons des stratégies
            pour que chaque élève trouve <strong>sa</strong> manière d'apprendre.
          </p>
          <p className="text-sm text-gray-400 mt-4 italic">
            Paideia complète — sans remplacer — le suivi d'un orthophoniste,
            psychomotricien ou tout autre professionnel de santé.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PROFILES.map(({ emoji, label, text }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 border border-sand-200 shadow-card text-center"
            >
              <div className="text-3xl mb-2" aria-hidden>{emoji}</div>
              <div className="font-semibold text-primary-900 text-sm mb-1">{label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
