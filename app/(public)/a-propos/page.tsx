import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Heart, Target, Lightbulb, Shield,
  ArrowRight, CheckCircle, Layers,
  BookOpen, Sparkles, Users, Compass,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos — Paideia',
  description: "Découvrez la vision, la mission et la philosophie de Paideia — un accompagnement scolaire plus humain, structuré et personnalisé.",
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
      light
        ? 'bg-white/10 text-primary-200'
        : 'bg-primary-100 text-primary-700'
    }`}>
      {children}
    </span>
  )
}

export default function AProposPage() {
  return (
    <div className="bg-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-[#162B50] py-20 lg:py-28 text-white overflow-hidden">
        {/* Subtle noise / depth overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="max-w-2xl">
            <SectionLabel light>Notre vision</SectionLabel>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Une autre façon d'accompagner les enfants dans leurs apprentissages.
            </h1>
            <p className="text-lg text-primary-200 leading-relaxed mb-8">
              Chez Paideia, nous croyons qu'un enfant ne progresse pas seulement
              parce qu'on lui réexplique une leçon. Il progresse lorsqu'il se sent :
            </p>

            {/* Emotional state pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                'Compris',
                'Guidé',
                'Encouragé',
                'Accompagné à sa façon',
              ].map(label => (
                <span
                  key={label}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Ambition callout */}
            <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5">
              <p className="text-white text-base leading-relaxed">
                Notre ambition est simple : offrir un accompagnement{' '}
                <strong className="text-gold-400">plus humain, plus structuré et plus intelligent</strong>{' '}
                que le soutien scolaire classique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy */}
            <div>
              <SectionLabel>La vision</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-5">
                Chaque enfant peut progresser lorsqu'on lui donne les bons outils.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Trop d'enfants grandissent avec l'impression qu'ils "ne sont pas
                faits pour l'école" — alors qu'en réalité, ils ont surtout besoin
                d'un cadre, d'une méthode, et d'un accompagnement qui leur correspond vraiment.
              </p>
              <p className="text-gray-500 leading-relaxed mt-4">
                Chez Paideia, nous pensons que la progression scolaire ne repose pas
                uniquement sur les résultats, mais aussi sur la confiance, l'autonomie
                et la capacité à apprendre plus sereinement.
              </p>
            </div>

            {/* Right — pillars */}
            <div className="space-y-3">
              {[
                {
                  icon:  Target,
                  title: 'Un cadre plus clair',
                  desc:  "Des repères stables, une structure lisible, des objectifs atteignables.",
                },
                {
                  icon:  BookOpen,
                  title: 'Une meilleure méthode',
                  desc:  "Apprendre à apprendre — pas seulement répéter sans vraiment comprendre.",
                },
                {
                  icon:  Compass,
                  title: 'Un accompagnement sur mesure',
                  desc:  "Chaque enfant fonctionne différemment. Nous nous adaptons, pas l'inverse.",
                },
                {
                  icon:  Sparkles,
                  title: 'La confiance comme moteur',
                  desc:  "Un enfant qui se croit capable progresse. Nous aidons à (re)construire cette conviction.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/40 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 group-hover:bg-primary-200 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">{title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFFÉRENCIATION ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8F6F2]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <SectionLabel>Ce qui nous différencie</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              Paideia ne se limite pas à "faire les devoirs".
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Notre approche va plus loin qu'un simple soutien ponctuel. Nous cherchons
              à aider chaque enfant à construire des bases solides et à développer
              une relation plus saine avec l'apprentissage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon:  Lightbulb,
                title: 'Compréhension réelle',
                desc:  "On s'assure que les notions sont vraiment assimilées — pas juste récitées.",
              },
              {
                icon:  Layers,
                title: 'Organisation & méthode',
                desc:  "Planification, prise de notes, relecture — les outils qui changent tout sur la durée.",
              },
              {
                icon:  Heart,
                title: 'Confiance en soi',
                desc:  "Chaque petite victoire compte. Nous aidons l'enfant à se redécouvrir capable.",
              },
              {
                icon:  Compass,
                title: 'Autonomie progressive',
                desc:  "L'objectif, c'est que l'enfant ait de moins en moins besoin de nous.",
              },
              {
                icon:  Shield,
                title: 'Respect du rythme',
                desc:  "Pas de pression inutile. On avance au rythme de l'enfant.",
              },
              {
                icon:  Users,
                title: 'Lien avec les parents',
                desc:  "Vous êtes informés, vous comprenez ce qui se passe. Jamais tenus à l'écart.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — dark callout */}
            <div className="bg-primary-900 rounded-3xl p-8 lg:p-10 text-white order-2 md:order-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-300 mb-6">
                Ce que vivent les parents
              </p>
              <div className="space-y-4">
                {[
                  "Du stress à chaque soirée de devoirs",
                  "Une fatigue qui s'accumule semaine après semaine",
                  "Des tensions inutiles à la maison",
                  "Un sentiment d'impuissance face aux difficultés",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0 mt-2" />
                    <p className="text-primary-100 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white font-semibold text-sm mb-1">
                  Paideia a aussi été pensé pour répondre à cela.
                </p>
                <p className="text-primary-300 text-sm leading-relaxed">
                  Redonner du souffle, de la structure et de la sérénité dans le quotidien scolaire.
                </p>
              </div>
            </div>

            {/* Right — copy */}
            <div className="order-1 md:order-2">
              <SectionLabel>Notre mission</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-5">
                Créer un cadre rassurant pour les enfants… et pour les parents.
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Nous savons que les difficultés scolaires ne concernent jamais
                  uniquement l'école. Elles débordent sur la maison, le soir,
                  les week-ends — et épuisent tout le monde.
                </p>
                <p>
                  Paideia veut proposer un accompagnement qui aide non seulement
                  l'enfant à avancer, mais aussi la famille à retrouver un peu
                  plus de calme et de confiance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POUR QUI ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-primary-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel light>Pour qui ?</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Un accompagnement pour ceux qui ont besoin de plus.
            </h2>
            <p className="text-primary-300 max-w-xl mx-auto leading-relaxed">
              Chaque profil est différent. C'est pourquoi nous croyons davantage
              à un accompagnement personnalisé qu'à une approche standardisée.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                emoji: '📋',
                label: 'Les enfants qui manquent de méthode',
                desc:  "Ils savent leurs leçons mais n'arrivent pas à les restituer.",
              },
              {
                emoji: '🌀',
                label: "Ceux qui ont du mal à se concentrer",
                desc:  "L'environnement, la structure et la séance adaptée changent tout.",
              },
              {
                emoji: '📉',
                label: 'Ceux qui se découragent facilement',
                desc:  "La confiance avant la performance.",
              },
              {
                emoji: '📚',
                label: 'Les élèves avec des lacunes accumulées',
                desc:  "On reprend à la bonne base, sans jugement, sans pression.",
              },
              {
                emoji: '🧩',
                label: 'Les profils DYS, TDAH, HPI',
                desc:  "Une pédagogie pensée pour leur façon d'apprendre.",
              },
              {
                emoji: '🎯',
                label: 'Ceux qui veulent un cadre individualisé',
                desc:  "Un accompagnement 100% dédié à leur progression.",
              },
            ].map(({ emoji, label, desc }) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="text-2xl mb-3">{emoji}</div>
                <h3 className="font-bold text-white text-sm mb-1.5">{label}</h3>
                <p className="text-primary-300 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHIE ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8F6F2]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <SectionLabel>Notre philosophie</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              Mieux apprendre, c'est souvent apprendre autrement.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Nous croyons qu'un accompagnement de qualité repose sur quatre principes simples.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon:  Lightbulb,
                bg:    'bg-blue-50 text-primary-600',
                title: 'Clair',
                desc:  "Pour éviter la confusion et les blocages. Un enfant qui comprend ce qu'on attend de lui avance plus sereinement.",
              },
              {
                icon:  Heart,
                bg:    'bg-rose-50 text-rose-500',
                title: 'Humain',
                desc:  "Pour que l'enfant se sente compris et soutenu, pas simplement évalué. La relation est au cœur de tout.",
              },
              {
                icon:  Shield,
                bg:    'bg-violet-50 text-violet-600',
                title: 'Structuré',
                desc:  "Pour redonner un cadre rassurant. La régularité et la méthode créent un sentiment de sécurité.",
              },
              {
                icon:  Target,
                bg:    'bg-green-50 text-green-600',
                title: 'Progressif',
                desc:  "Pour construire des bases solides sans pression inutile. Chaque étape compte — on ne brûle pas les étapes.",
              },
            ].map(({ icon: Icon, bg, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="bg-white border border-amber-100 rounded-2xl p-7 max-w-2xl mx-auto text-center shadow-sm">
            <p className="text-amber-800 font-medium italic text-base leading-relaxed mb-2">
              "L'éducation n'est pas le remplissage d'un seau, mais l'allumage d'un feu."
            </p>
            <p className="text-amber-400 text-xs font-semibold tracking-wide uppercase">— William Butler Yeats</p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-4xl mb-6 text-gold-400">✦</div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-5">
            Découvrir l'accompagnement Paideia.
          </h2>
          <p className="text-primary-200 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Si vous cherchez un accompagnement plus humain, plus structuré et plus
            adapté pour votre enfant — commençons par un bilan gratuit, sans engagement.
          </p>
          <Link
            href="/bilan"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gold-400 text-primary-900 font-bold text-base hover:brightness-110 transition-all duration-200 shadow-lg shadow-black/20"
          >
            Réserver mon bilan gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {['Bilan offert', 'Sans engagement', 'En visio depuis chez vous'].map(item => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-primary-300">
                <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
