/**
 * app/(public)/page.tsx
 * Landing page — route /
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen, Brain, Users, Video, Zap,
  CheckCircle, ArrowRight, GraduationCap,
  BarChart3, Shield, ChevronRight, Clock, Award,
  Sparkles, Target, MessageCircle, Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paideia — L\'accompagnement scolaire qui transforme votre enfant',
  description:
    'Coaching scolaire à distance pour enfants DYS (dyslexie, dyspraxie, dyscalculie) et TDAH. Méthodes structurées, suivi gamifié, espace parent, cours virtuels.',
}

export default function LandingPage() {
  return (
    <div className="bg-white">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex flex-col justify-center h-screen" style={{ height: '100dvh' }}>

        {/* ── Images de fond responsive ── */}

        {/* Mobile (< 768px) : version portrait */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/mobile.png"
            alt="Enfants qui apprennent"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        </div>

        {/* Desktop (768px – 1535px) : version 16:9 */}
        <div className="absolute inset-0 hidden md:block 2xl:hidden">
          <Image
            src="/images/hero-desktop.png"
            alt="Enfants qui apprennent"
            fill
            className="object-cover object-right"
            priority
            sizes="100vw"
          />
        </div>

        {/* Ultrawide (≥ 1536px) : version 21:9 */}
        <div className="absolute inset-0 hidden 2xl:block">
          <Image
            src="/images/hero-ultrawide.png"
            alt="Enfants qui apprennent"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>


        {/* ── Dégradés pour lisibilité du texte ── */}
        {/* Mobile : top → bottom */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(to bottom, #1E40AF 0%, rgba(30,64,175,0.70) 60%, transparent 100%)' }}
        />
        {/* Desktop : left → right */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, #1E40AF 0%, rgba(30,64,175,0.75) 40%, rgba(30,64,175,0.20) 65%, transparent 100%)' }}
        />

        {/* ── Contenu ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10">
          <div className="w-full md:max-w-[52%] lg:max-w-[46%] text-center md:text-left">

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-7 border border-white/20">
              <Sparkles className="w-4 h-4 text-gold-300 shrink-0" />
              Accompagnement 100 % personnalisé
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
              L&apos;accompagnement scolaire qui{' '}
              <span className="text-gold-300">transforme</span>{' '}
              votre enfant
            </h1>

            <p className="text-base sm:text-lg text-primary-100 mb-8 leading-relaxed">
              Méthodes structurées, suivi gamifié et espace parent en temps réel.
              Pour chaque enfant, une approche adaptée — y compris DYS et TDAH.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-9">
              <Link
                href="/auth/inscription"
                className="inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-primary-900 font-bold text-base px-7 py-3.5 rounded-2xl transition-all hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/offres"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-base px-7 py-3.5 rounded-2xl border border-white/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Voir les offres
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-200 justify-center md:justify-start">
              {['Sans engagement', 'Première séance offerte', 'Satisfaction garantie'].map(label => (
                <div key={label} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ─── WHY PAIDEIA ──────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">
              Pourquoi Paideia ?
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tout ce qu&apos;il faut pour progresser
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              Une plateforme complète pensée pour l&apos;épanouissement scolaire de chaque enfant.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon:  Brain,
                color: 'bg-primary-100 text-primary-600',
                title: 'Méthode structurée',
                desc:  'Objectifs clairs, progressions étape par étape, bilan hebdomadaire pour chaque élève.',
              },
              {
                icon:  Zap,
                color: 'bg-gold-100 text-gold-600',
                title: 'Suivi gamifié',
                desc:  'XP, niveaux, badges et défis pour maintenir la motivation et célébrer chaque victoire.',
              },
              {
                icon:  Users,
                color: 'bg-blue-100 text-blue-600',
                title: 'Espace parent',
                desc:  'Tableau de bord en temps réel : progression, planning, factures — tout en un seul endroit.',
              },
              {
                icon:  Video,
                color: 'bg-green-100 text-green-600',
                title: 'Cours virtuels',
                desc:  'Salles de classe en ligne intégrées. Rejoignez une séance en un clic, où que vous soyez.',
              },
              {
                icon:  BookOpen,
                color: 'bg-purple-100 text-purple-600',
                title: 'Contenu adapté',
                desc:  'Bibliothèque de ressources pédagogiques triée par matière, niveau et profil d\'apprentissage.',
              },
              {
                icon:  Shield,
                color: 'bg-rose-100 text-rose-600',
                title: 'Accompagnement DYS',
                desc:  'Approche multisensorielle spécialement conçue pour dyslexie, dyspraxie, dyscalculie et TDAH.',
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-3xl bg-sand-50 hover:bg-white border border-transparent hover:border-sand-200 hover:shadow-card transition-all"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOR WHO ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-sand-50 to-sand-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">
              Pour qui ?
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Conçu pour toute la famille
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Parents */}
            <div className="bg-white rounded-3xl p-8 shadow-card">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-bold px-3 py-1.5 rounded-full mb-6">
                <Users className="w-4 h-4" />
                Pour les parents
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Suivez la progression de vos enfants en temps réel
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Tableau de bord unifié pour tous vos enfants',
                  'Notifications de progression et d\'objectifs atteints',
                  'Accès aux ressources pédagogiques utilisées',
                  'Historique des séances et comptes rendus',
                  'Gestion de l\'abonnement et facturation simplifiée',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/inscription"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all"
              >
                Créer un espace parent <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Eleves */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 shadow-card text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-bold px-3 py-1.5 rounded-full mb-6">
                <GraduationCap className="w-4 h-4" />
                Pour les élèves
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Apprends à ton rythme et décroche des récompenses
              </h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Interface ludique et motivante avec XP et badges',
                  'Objectifs personnalisés et progression visible',
                  'Accès à la classe virtuelle en un clic',
                  'Bibliothèque de ressources adaptées à ton niveau',
                  'Suivi de tes séries de travail (streak)',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-primary-100">
                    <CheckCircle className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/inscription"
                className="inline-flex items-center gap-2 text-gold-300 font-semibold text-sm hover:gap-3 transition-all"
              >
                Rejoindre l&apos;aventure <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">
              Comment ça marche ?
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Démarrez en 3 étapes simples
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-primary-200 via-gold-300 to-primary-200" />

            {[
              {
                step:  '01',
                icon:  Users,
                color: 'bg-primary-100 text-primary-600 ring-primary-200',
                title: 'Inscription',
                desc:  'Créez votre espace en 2 minutes. Renseignez le profil de votre enfant pour que nous puissions personnaliser son parcours.',
              },
              {
                step:  '02',
                icon:  Target,
                color: 'bg-gold-100 text-gold-600 ring-gold-200',
                title: 'Bilan personnalisé',
                desc:  'Notre équipe réalise un bilan complet des besoins, du niveau et des spécificités d\'apprentissage de votre enfant.',
              },
              {
                step:  '03',
                icon:  Sparkles,
                color: 'bg-green-100 text-green-600 ring-green-200',
                title: 'Accompagnement',
                desc:  'Les séances démarrent, les objectifs s\'enchaînent, les progrès s\'accumulent. Vous suivez tout en temps réel.',
              },
            ].map(({ step, icon: Icon, color, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className={`relative z-10 w-20 h-20 rounded-full ${color} ring-4 flex items-center justify-center mb-5 shadow-sm`}>
                  <Icon className="w-8 h-8" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MÉTHODE ──────────────────────────────────────────── */}
      <section id="methode" className="py-20 lg:py-28 bg-sand-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">
              Nos méthodes
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Des approches fondées sur les sciences cognitives
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              Adaptées aux besoins spécifiques des enfants DYS, TDAH et de tous ceux qui apprennent autrement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: '🧠',
                title: 'Apprentissage multisensoriel',
                desc:  'Sons, visuels et gestes combinés pour créer des connexions neuronales durables. Particulièrement efficace pour les profils DYS.',
              },
              {
                emoji: '🔍',
                title: 'Métacognition',
                desc:  'Apprendre à se connaître comme apprenant. L\'enfant comprend comment il apprend le mieux — un outil puissant pour le TDAH.',
              },
              {
                emoji: '📦',
                title: 'Chunking',
                desc:  'Chaque notion découpée en micro-étapes maîtrisables. Zéro surcharge cognitive, progression claire et validée.',
              },
              {
                emoji: '✅',
                title: 'Renforcement positif',
                desc:  'Nommer précisément ce qui fonctionne pour que l\'enfant puisse le reproduire. Plus efficace que la simple flatterie.',
              },
              {
                emoji: '📅',
                title: 'Rituels de séance',
                desc:  'Une structure prévisible à chaque séance réduit l\'anxiété et libère l\'énergie cognitive pour apprendre.',
              },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-card border border-sand-200 hover:shadow-card-hover transition-shadow">
                <div className="text-3xl mb-4" aria-hidden>{emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────── */}
      <section id="tarifs" className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">
              Tarifs
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Des formules claires, sans frais cachés
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Sans engagement, résiliable à tout moment. Le bilan pédagogique de départ est toujours offert.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {[
              {
                title:     'Paideia Essentiel',
                subtitle:  'Accompagnement régulier',
                price:     '180€',
                highlight: false,
                tag:       null,
                desc:      "Idéal pour un suivi léger et constant au fil de l'année.",
                sub:       'Sans engagement · Résiliable à tout moment',
                features:  [
                  "2h d'accompagnement / semaine",
                  'Séances en visio depuis chez vous',
                  'Bilan pédagogique initial offert',
                  'Suivi mensuel des progrès',
                  'Communication régulière avec les parents',
                ],
              },
              {
                title:     'Paideia Intensif',
                subtitle:  'Accompagnement soutenu',
                price:     '290€',
                highlight: true,
                tag:       'Le plus choisi',
                desc:      'Pour les situations qui demandent un suivi plus dense et des résultats rapides.',
                sub:       'Sans engagement · Résiliable à tout moment',
                features:  [
                  "4h d'accompagnement / semaine",
                  'Séances en visio depuis chez vous',
                  'Bilan pédagogique initial offert',
                  'Suivi hebdomadaire des progrès',
                  'Communication renforcée avec les parents',
                  'Plan de progression personnalisé',
                ],
              },
            ].map(({ title, subtitle, price, highlight, tag, desc, sub, features }) => (
              <div
                key={title}
                className={`relative flex flex-col rounded-3xl border-2 p-8 transition-all ${
                  highlight ? 'bg-primary-900 border-primary-700 shadow-xl' : 'bg-white border-sand-200 shadow-card'
                }`}
              >
                {tag && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-400 text-primary-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-gold whitespace-nowrap">
                    ✦ {tag}
                  </div>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 pt-2 ${highlight ? 'text-primary-300' : 'text-primary-600'}`}>{title}</p>
                <h3 className={`text-xl font-bold mb-1.5 ${highlight ? 'text-white' : 'text-primary-900'}`}>{subtitle}</h3>
                <p className={`text-sm leading-relaxed mb-5 ${highlight ? 'text-primary-200' : 'text-gray-600'}`}>{desc}</p>
                <div className="mb-1">
                  <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-primary-900'}`}>{price}</span>
                  <span className={`text-sm ml-1 ${highlight ? 'text-primary-300' : 'text-gray-400'}`}>/mois</span>
                </div>
                <p className={`text-xs mb-5 ${highlight ? 'text-primary-400' : 'text-gray-400'}`}>{sub}</p>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? 'text-gold-400' : 'text-green-500'}`} />
                      <span className={highlight ? 'text-primary-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/bilan"
                  className={`inline-flex items-center justify-center gap-2 w-full font-bold py-3.5 rounded-2xl transition-all hover:-translate-y-0.5 ${
                    highlight ? 'bg-gold-400 hover:bg-gold-300 text-primary-900' : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  Réserver mon bilan gratuit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA intermédiaire */}
          <div className="text-center bg-primary-50 rounded-2xl p-10 border border-primary-100 mb-12">
            <h3 className="text-xl font-bold text-primary-900 mb-2">Pas sûr de quelle formule choisir ?</h3>
            <p className="text-gray-600 mb-5 text-sm">Le bilan pédagogique est offert et sans engagement. On évalue ensemble les besoins réels de votre enfant avant de recommander quoi que ce soit.</p>
            <Link
              href="/bilan"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-2xl transition-all"
            >
              Réserver le bilan gratuit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQ tarifs */}
          <div className="max-w-2xl mx-auto bg-sand-50 rounded-2xl p-8 border border-sand-200">
            <h3 className="text-lg font-bold text-primary-900 mb-6">Questions fréquentes sur les tarifs</h3>
            <div className="space-y-4 text-sm">
              {[
                ['Les tarifs incluent-ils la TVA ?', 'Oui, tous les prix sont TTC.'],
                ["Y a-t-il un engagement de durée ?", "Aucun. L'abonnement est résiliable à tout moment, sans frais."],
                ['Le bilan de départ est-il payant ?', 'Non. Le bilan pédagogique initial (45 min) est entièrement offert.'],
                ['Quels moyens de paiement acceptez-vous ?', 'Carte bancaire (Visa, Mastercard, American Express). Paiement sécurisé.'],
                ["Puis-je changer de formule en cours de route ?", "Oui, vous pouvez passer d'Essentiel à Intensif (ou l'inverse) à tout moment, en fonction des disponibilités."],
              ].map(([q, a]) => (
                <div key={q} className="border-b border-sand-200 pb-4 last:border-0 last:pb-0">
                  <div className="font-medium text-primary-900 mb-1">{q}</div>
                  <div className="text-gray-600">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-primary-600 text-sm font-bold uppercase tracking-widest mb-3">
              Témoignages
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos familles
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name:   'Marie-Claire D.',
                role:   'Maman de Lucas, 11 ans',
                avatar: 'MC',
                stars:  5,
                quote:  'En 3 mois, Lucas est passé de 8/20 à 15/20 en mathématiques. La méthode gamifiée l\'a complètement transformé. Il a maintenant hâte de faire ses devoirs !',
              },
              {
                name:   'Thomas & Élise B.',
                role:   'Parents de Sofia, DYS',
                avatar: 'TE',
                stars:  5,
                quote:  'Notre fille est dyslexique et les méthodes classiques ne fonctionnaient pas pour elle. Paideia a tout changé : les exercices adaptés et la patience des intervenants sont remarquables.',
              },
              {
                name:   'Romain P.',
                role:   'Papa de Mathis, 14 ans',
                avatar: 'RP',
                stars:  5,
                quote:  'Le tableau de bord parent est une révélation. Je vois en temps réel où en est Mathis, ses objectifs, ses badges. C\'est rassurant et motivant pour toute la famille.',
              },
            ].map(({ name, role, avatar, stars, quote }) => (
              <div key={name} className="bg-sand-50 rounded-3xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <MessageCircle className="w-6 h-6 text-primary-200 mb-3" />
                <blockquote className="text-gray-600 text-sm leading-relaxed flex-1 mb-5 italic">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-sand-200">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,168,122,0.15)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400/20 rounded-3xl mb-6 border border-gold-400/30">
            <Award className="w-8 h-8 text-gold-300" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Prêt à voir votre enfant{' '}
            <span className="text-gold-300">briller</span> ?
          </h2>
          <p className="text-primary-200 text-lg mb-10 leading-relaxed">
            Rejoignez plus de 200 familles qui font confiance à Paideia.
            Première séance offerte, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/auth/inscription"
              className="inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-primary-900 font-bold text-lg px-10 py-4 rounded-2xl transition-all hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#tarifs"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-10 py-4 rounded-2xl border border-white/25 transition-all hover:-translate-y-0.5"
            >
              Voir les offres
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Inscription en 2 minutes
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              Résultats visibles dès le 1er mois
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Données sécurisées RGPD
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
