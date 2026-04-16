'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  {
    id: 'approche',
    label: "Accompagnement & méthode",
    emoji: '🎯',
    items: [
      {
        q: "Paideia est-il adapté à mon enfant sans diagnostic ?",
        a: "Absolument. Paideia accompagne tous les élèves : DYS, TDAH, haut potentiel, ou simplement un enfant qui a besoin d'une méthode différente. Aucun diagnostic n'est requis pour commencer.",
      },
      {
        q: "En quoi est-ce différent d'un soutien scolaire classique ?",
        a: "Un soutien classique reprend les leçons du cours. Paideia travaille sur la méthode d'apprentissage : comment votre enfant apprend, comment il s'organise, comment il gère sa concentration. Nous construisons des stratégies durables, pas juste des réponses à un devoir.",
      },
      {
        q: "Paideia remplace-t-il le suivi d'un orthophoniste ou d'un thérapeute ?",
        a: "Non, et c'est important de le préciser. Paideia est un complément pédagogique. Si votre enfant suit déjà une rééducation (orthophonie, psychomotricité…), nous travaillons en cohérence avec ce suivi — jamais à sa place.",
      },
      {
        q: "Combien de séances par semaine est-il conseillé ?",
        a: "Pour la plupart des enfants, la régularité prime sur la fréquence. Un accompagnement régulier et bien cadré produit de meilleurs résultats qu'un suivi intensif mais irrégulier. Nous définissons le rythme adapté lors du bilan.",
      },
      {
        q: "Peut-on changer de formule en cours de route ?",
        a: "Oui, librement. Vous pouvez passer d'Essentiel à Intensif (ou l'inverse) à tout moment, en fonction des besoins de votre enfant et des disponibilités.",
      },
    ],
  },
  {
    id: 'organisation',
    label: "Organisation & séances",
    emoji: '📅',
    items: [
      {
        q: "Comment se déroule le bilan pédagogique initial ?",
        a: "Le bilan dure 45 minutes en visio. Il nous permet d'évaluer le niveau réel de votre enfant, d'identifier ses blocages, de cerner son profil d'apprentissage et de définir ensemble un plan d'accompagnement. Il est entièrement offert.",
      },
      {
        q: "Que se passe-t-il si on veut annuler ou reprogrammer une séance ?",
        a: "Vous pouvez annuler ou reprogrammer jusqu'à 24 heures avant la séance, sans frais, depuis votre espace parent. En deçà de ce délai, la séance est due.",
      },
      {
        q: "Les séances ont-elles lieu pendant les vacances scolaires ?",
        a: "Nous proposons des créneaux selon les disponibilités. Les vacances sont souvent l'occasion de séances de consolidation ou de rattrapage — une opportunité précieuse pour avancer sans la pression du quotidien scolaire.",
      },
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Carte bancaire (Visa, Mastercard, American Express). Le paiement est sécurisé. Aucun frais caché.",
      },
    ],
  },
  {
    id: 'technique',
    label: "Technique & visio",
    emoji: '💻',
    items: [
      {
        q: "Le logiciel de visio est-il compliqué pour les enfants ?",
        a: "Non. La classe virtuelle Paideia s'ouvre directement dans le navigateur — aucun logiciel à installer. Un clic suffit. L'interface est simple, avec caméra, micro et chat.",
      },
      {
        q: "Quel matériel faut-il avoir pour les séances ?",
        a: "Un ordinateur, une tablette ou un smartphone avec caméra et micro. Une connexion internet stable. C'est tout — pas d'imprimante, pas de logiciel spécifique requis.",
      },
      {
        q: "Quel navigateur utiliser pour la classe virtuelle ?",
        a: "Chrome, Firefox ou Edge à jour. Safari sur iOS est également compatible. Nous recommandons Chrome pour une expérience optimale.",
      },
      {
        q: "La séance peut-elle être enregistrée ?",
        a: "Non. Pour respecter le RGPD et la vie privée des enfants, aucun enregistrement n'est effectué. La confidentialité de chaque séance est garantie.",
      },
    ],
  },
  {
    id: 'donnees',
    label: "Données & confidentialité",
    emoji: '🔐',
    items: [
      {
        q: "Quelles données sont collectées sur mon enfant ?",
        a: "Uniquement le prénom, la tranche d'âge et les pistes pédagogiques nécessaires à l'accompagnement. Aucune donnée médicale, aucune donnée sensible. Consultez notre politique de confidentialité pour le détail complet.",
      },
      {
        q: "Puis-je demander la suppression des données ?",
        a: "Oui, à tout moment et sans justification. Un email à contact@paideia.fr suffit. Nous donnons suite sous 72h.",
      },
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

function AccordionItem({
  q, a, isOpen, onToggle,
}: {
  q: string; a: string; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      isOpen ? 'border-primary-200 shadow-sm bg-white' : 'border-gray-100 bg-white hover:border-gray-200'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base leading-snug transition-colors duration-200 ${
          isOpen ? 'text-primary-700' : 'text-gray-900'
        }`}>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 mt-0.5 transition-all duration-300 ${
            isOpen ? 'rotate-180 text-primary-500' : 'text-gray-400'
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-5 md:pb-6">
            <div className="pt-0 border-t border-gray-100 pt-4">
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  function toggle(key: string) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F6F2] border-b border-gray-200 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest mb-5">
            Questions fréquentes
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            Tout ce que vous voulez savoir sur Paideia.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-xl mx-auto">
            Des réponses claires, sans jargon. Si vous ne trouvez pas ce que vous cherchez,
            on est là pour en parler.
          </p>
          <Link
            href="/bilan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Poser une question directement
          </Link>
        </div>
      </section>

      {/* ── FAQ CATEGORIES ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 space-y-16">

          {FAQ_CATEGORIES.map(({ id, label, emoji, items }) => (
            <div key={id}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{emoji}</span>
                <h2 className="text-xl font-extrabold text-gray-900">{label}</h2>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {items.map((item, idx) => {
                  const key = `${id}-${idx}`
                  return (
                    <AccordionItem
                      key={key}
                      q={item.q}
                      a={item.a}
                      isOpen={openKey === key}
                      onToggle={() => toggle(key)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-2xl mb-5">💬</p>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Échangeons directement. Le bilan pédagogique est offert et c'est l'occasion
            idéale pour poser toutes vos questions sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/bilan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors"
            >
              Réserver mon bilan gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Nous écrire
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
