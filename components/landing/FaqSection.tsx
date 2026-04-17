/**
 * components/landing/FaqSection.tsx
 * Accordion FAQ sur la landing.
 */

'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQ_ITEMS = [
  {
    q: 'Paideia est-il adapté à mon enfant sans diagnostic ?',
    a: 'Absolument. Paideia accompagne tous les élèves : DYS, TDAH, haut potentiel, ou simplement un enfant qui a besoin d\'une méthode différente. Aucun diagnostic n\'est requis.',
  },
  {
    q: 'En quoi est-ce différent d\'un soutien scolaire classique ?',
    a: 'Un soutien classique reprend les leçons du cours. Paideia travaille sur la méthode d\'apprentissage : comment ton enfant apprend, comment il s\'organise, comment il gère sa concentration. On construit des stratégies durables, pas juste des réponses à un devoir.',
  },
  {
    q: 'Que se passe-t-il si on veut annuler ou reprogrammer ?',
    a: 'Vous pouvez annuler ou reprogrammer jusqu\'à 24 heures avant la séance, sans frais, depuis votre espace parent. En deçà, la séance est due.',
  },
  {
    q: 'Les séances se déroulent-elles vraiment à domicile ?',
    a: 'Oui, notre intervenante se déplace directement chez vous. Nous intervenons actuellement dans le secteur Fort-de-France et Case Pilote. Contactez-nous pour vérifier votre zone.',
  },
  {
    q: 'Quel matériel faut-il prévoir à la maison ?',
    a: 'Une table de travail calme et bien éclairée. Nous apportons le matériel pédagogique adapté au profil de votre enfant. Aucun équipement spécifique n\'est requis de votre côté.',
  },
  {
    q: 'Paideia remplace-t-il le suivi d\'un orthophoniste ?',
    a: 'Non, et c\'est important. Paideia est un complément pédagogique. Si votre enfant suit déjà une rééducation (orthophonie, psychomotricité…), nous travaillons en cohérence avec ce suivi, jamais à sa place.',
  },
]

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="py-20 bg-sand-50" aria-labelledby="faq-title">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Questions fréquentes
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_ITEMS.map(({ q, a }, idx) => (
            <div
              key={q}
              className="bg-white rounded-xl border border-sand-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-sand-50 transition-colors"
                aria-expanded={openIdx === idx}
              >
                <span className="font-medium text-primary-900 pr-4">{q}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-gray-400 flex-shrink-0 transition-transform duration-200',
                    openIdx === idx && 'rotate-180'
                  )}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-sand-100">
                  <p className="pt-4">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
