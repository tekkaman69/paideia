/**
 * components/landing/SessionDeroule.tsx
 * Section "Déroulé d'une séance"
 */

import React from 'react'

const STEPS = [
  {
    num: '1',
    title: 'Ouverture & météo intérieure',
    text: "Chaque séance commence par un court rituel : comment ça va ? Y a-t-il quelque chose qui t'a préoccupé cette semaine ? Ce temps crée un espace sécurisant.",
    duration: '5 min',
  },
  {
    num: '2',
    title: 'Rappel & ancrage',
    text: "On revient brièvement sur ce qui a été vu lors de la dernière séance. Consolider avant d'avancer. Pas de surcharge.",
    duration: '10 min',
  },
  {
    num: '3',
    title: 'Travail actif',
    text: "Le cœur de la séance. Exercices adaptés, jeux de compréhension, lecture, calcul ou méthode d'organisation — en utilisant les supports visuels et les techniques multisensorielles.",
    duration: '30 min',
  },
  {
    num: '4',
    title: 'Bilan & quête du jour',
    text: "L'enfant verbalise ce qu'il a appris (métacognition). On attribue des points d'expérience et on valide la quête du jour ensemble.",
    duration: '8 min',
  },
  {
    num: '5',
    title: 'Clôture & prochaine étape',
    text: "On fixe ensemble un mini-objectif pour la semaine. Parents informés par message après la séance.",
    duration: '5 min',
  },
]

export function SessionDeroule() {
  return (
    <section className="py-20 bg-primary-900 text-white" aria-labelledby="session-title">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 id="session-title" className="text-3xl md:text-4xl font-bold mb-4">
            Une séance Paideia, concrètement
          </h2>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            Chaque séance suit une structure claire et rassurante.
            {"L'enfant sait toujours où il en est."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Ligne verticale */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-700"
              aria-hidden
            />

            <div className="space-y-8">
              {STEPS.map(({ num, title, text, duration }) => (
                <div key={num} className="flex gap-6">
                  {/* Numéro */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-500 text-white font-bold text-lg flex items-center justify-center z-10">
                    {num}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{title}</h3>
                      <span className="text-xs bg-primary-700 text-primary-300 px-2 py-0.5 rounded-full">
                        {duration}
                      </span>
                    </div>
                    <p className="text-primary-200 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
