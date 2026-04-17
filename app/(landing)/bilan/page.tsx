import Link from 'next/link'
import Image from 'next/image'
import {
  Check, Star, Phone, MapPin, Clock, Users,
  BookOpen, Target, Heart, Zap, ArrowRight, ChevronRight,
  CheckCircle2, MessageCircle,
} from 'lucide-react'

// ─── Config ──────────────────────────────────────────────────────────────────
const WA_NUMBER  = '596696980180'
const WA_MESSAGE = encodeURIComponent(
  "Bonjour, je souhaite réserver un bilan pédagogique pour mon enfant et en savoir plus sur l'accompagnement Paideia."
)
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

// ─── Composants internes ──────────────────────────────────────────────────────

function WaButton({
  label = 'Réserver mon bilan gratuit',
  size = 'lg',
  className = '',
}: {
  label?: string
  size?: 'sm' | 'lg'
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-all duration-200 active:scale-95 hover:brightness-110'
  const sizes = {
    sm: 'px-5 py-3 text-sm',
    lg: 'px-7 py-4 text-base md:text-lg',
  }
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizes[size]} bg-[#25D366] text-white shadow-lg shadow-green-300/40 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.784a.5.5 0 0 0 .632.605l6.094-1.596A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.857 9.857 0 0 1-5.032-1.374l-.36-.214-3.732.978.996-3.638-.235-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
      </svg>
      {label}
    </a>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-widest mb-4">
      {children}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BilanPage() {
  return (
    <>
      {/* ── Sticky mobile CTA (toujours visible en bas sur mobile) ─────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full rounded-2xl bg-[#25D366] text-white font-bold py-3.5 text-base shadow-lg shadow-green-300/30 active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.784a.5.5 0 0 0 .632.605l6.094-1.596A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.857 9.857 0 0 1-5.032-1.374l-.36-.214-3.732.978.996-3.638-.235-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
          </svg>
          Réserver mon bilan gratuit
        </a>
      </div>

      <div className="pb-20 md:pb-0">

        {/* ── 1. TOP BAR ─────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Paideia"
                width={120}
                height={26}
                priority
              />
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              Bilan gratuit sur WhatsApp
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              Bilan gratuit
            </a>
          </div>
        </header>

        {/* ── 2. HERO ────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-[#162B50] text-white">
          <div className="max-w-5xl mx-auto px-5 py-16 md:py-24 lg:py-28">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

              {/* Left — copy */}
              <div className="space-y-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary-200 text-xs font-semibold uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" />
                  À domicile · Fort-de-France & Case Pilote
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                  Votre enfant mérite{' '}
                  <span className="text-gold-400">un accompagnement</span>{' '}
                  pensé pour lui.
                </h1>

                <p className="text-primary-200 text-base md:text-lg leading-relaxed">
                  Paideia accompagne les enfants et adolescents de Martinique
                  à domicile avec une méthode personnalisée — compréhension,
                  confiance, organisation. Pas juste des cours.
                  <strong className="text-white"> De vrais résultats.</strong>
                </p>

                <div className="space-y-4">
                  <WaButton size="lg" />
                  <p className="text-primary-300 text-sm">
                    À partir de{' '}
                    <strong className="text-gold-400 text-base">149,50€/mois</strong>
                    {' '}· après crédit d'impôt · Bilan offert · Sans engagement
                  </p>
                </div>

                {/* Trust micro-items */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {[
                    'À domicile, chez vous',
                    'Bilan pédagogique offert',
                    'Sans engagement',
                  ].map(item => (
                    <span key={item} className="flex items-center gap-1.5 text-xs text-primary-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — visual card */}
              <div className="hidden md:flex justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Main card */}
                  <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-gold-300" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Bilan pédagogique</p>
                        <p className="text-primary-300 text-xs">45 min · Entièrement gratuit</p>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        'Évaluation du niveau réel',
                        'Identification des blocages',
                        'Profil d\'apprentissage',
                        'Plan d\'accompagnement',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-[#25D366]" />
                          </div>
                          <span className="text-sm text-primary-100">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs text-primary-400 text-center">
                        ✦ Offert · Sans engagement · Sur WhatsApp
                      </p>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-gold-400 text-primary-900 rounded-2xl px-4 py-2 shadow-xl font-bold text-sm">
                    Gratuit 🎁
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. TRUST BAR ───────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-5 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-gray-100">
              {[
                { icon: Users,    value: '100%',        label: 'Accompagnement individuel' },
                { icon: Clock,    value: '45 min',      label: 'Bilan offert dès le départ' },
                { icon: MapPin,   value: 'À domicile',  label: 'Fort-de-France & Case Pilote' },
                { icon: Zap,      value: 'Sur mesure',  label: 'Méthode adaptée à chaque profil' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center text-center px-4 gap-1.5">
                  <Icon className="w-5 h-5 text-primary-500 mb-1" />
                  <span className="text-xl font-extrabold text-primary-900">{value}</span>
                  <span className="text-xs text-gray-500 leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. PAIN POINTS ─────────────────────────────────────────────────── */}
        <section className="bg-[#F8F6F2] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-5">

            {/* Header */}
            <div className="text-center mb-12">
              <SectionLabel>Vous vous reconnaissez ?</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                Vous reconnaissez votre enfant<br className="hidden sm:block" /> dans ces situations ?
              </h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto leading-relaxed">
                De nombreux parents vivent exactement ces situations chaque semaine.
                Vous n'êtes pas seul(e) — et ce n'est pas une fatalité.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  emoji: '😤',
                  title: "Chaque soir, les devoirs deviennent un combat",
                  desc: "Votre enfant refuse, s'agite, pleure. Vous aussi vous épuisez. La soirée finit dans la tension — encore.",
                },
                {
                  emoji: '😔',
                  title: '"Je suis nul, j\'y arriverai jamais" — il commence à y croire',
                  desc: "Les remarques, les mauvaises notes, les regards… Il intègre l'idée qu'il n'est pas fait pour l'école.",
                },
                {
                  emoji: '📉',
                  title: "Malgré les cours particuliers, rien ne change vraiment",
                  desc: "Les notes remontent un peu, puis rechutent. Vous avez l'impression de tourner en rond sans jamais avancer.",
                },
                {
                  emoji: '🌀',
                  title: "Il connaît ses leçons, mais ne sait pas les utiliser",
                  desc: "Il récite, mais ne comprend pas. Il sait, mais ne restitue pas. La méthode lui manque, pas l'intelligence.",
                },
                {
                  emoji: '🏫',
                  title: "À l'école, il passe entre les mailles",
                  desc: "Les classes sont chargées. Son profil n'est pas pris en compte. Il avance seul, sans vrai filet.",
                },
                {
                  emoji: '💡',
                  title: "Vous voyez son potentiel — mais quelque chose bloque",
                  desc: "Vous le savez : il peut faire beaucoup mieux. Il lui manque le bon cadre, la bonne méthode, la bonne personne.",
                },
              ].map(({ emoji, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col gap-4"
                >
                  <div className="text-3xl">{emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-700 font-semibold text-base mb-5">
                Si vous vous êtes reconnu(e) ne serait-ce qu'une fois,<br className="hidden sm:block" /> ce bilan est fait pour vous.
              </p>
              <WaButton label="Réserver un bilan pour mon enfant" />
            </div>

          </div>
        </section>

        {/* ── 5. SOLUTION / MÉTHODE ──────────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-5">
            <div className="text-center mb-12">
              <SectionLabel>Notre approche</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Paideia, ce n'est pas du{' '}
                <span className="line-through text-gray-400">soutien scolaire</span>.
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
                C'est un accompagnement pédagogique complet — centré sur la méthode,
                la confiance et l'autonomie de votre enfant. Pas juste refaire les exercices du soir.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  color: 'bg-blue-50 text-primary-600',
                  title: 'Un bilan précis d\'abord',
                  desc: 'On ne commence pas à enseigner avant de comprendre. Chaque enfant arrive avec son histoire, ses blocages, son fonctionnement. On prend le temps de les identifier — vraiment.',
                },
                {
                  icon: BookOpen,
                  color: 'bg-purple-50 text-purple-600',
                  title: 'Une méthode adaptée à son profil',
                  desc: 'Certains enfants apprennent mieux par le visuel. D\'autres par la répétition structurée. D\'autres encore ont besoin d\'un cadre très clair. On s\'adapte — pas l\'inverse.',
                },
                {
                  icon: Heart,
                  color: 'bg-rose-50 text-rose-500',
                  title: 'La confiance avant tout',
                  desc: 'Un enfant qui se croit nul ne peut pas apprendre. Avant d\'avancer, on reconstruit la relation à l\'école — avec patience, exigence bienveillante et des petites victoires régulières.',
                },
                {
                  icon: Users,
                  color: 'bg-green-50 text-green-600',
                  title: 'Un suivi transparent pour les parents',
                  desc: 'Vous n\'êtes pas tenu(e) à l\'écart. Après chaque période, vous avez un retour clair sur les progrès, les axes de travail, et ce que vous pouvez faire à la maison.',
                },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/30 transition-all duration-200">
                  <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. TÉMOIGNAGES ─────────────────────────────────────────────────── */}
        <section className="bg-primary-900 text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-5">
            <div className="text-center mb-12">
              <SectionLabel>Ce que disent les parents</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Des familles martiniquaises témoignent.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Marie-Claire P.',
                  child: 'Maman de Nathan, 14 ans',
                  stars: 5,
                  text: 'Nathan refusait d\'ouvrir ses cahiers. En deux mois, il a retrouvé une vraie dynamique. L\'intervenante a su le cerner dès le bilan initial. On a enfin des soirées sereines.',
                },
                {
                  name: 'Sandrine L.',
                  child: 'Maman de Léa, 10 ans',
                  stars: 5,
                  text: 'Ce qui m\'a convaincue, c\'est le bilan gratuit — sans engagement, sans pression. On a été écoutées dès le départ. Ma fille est plus organisée et a retrouvé le goût du travail.',
                },
                {
                  name: 'Thierry M.',
                  child: 'Papa de Maxime, 16 ans',
                  stars: 5,
                  text: 'Avec la Terminale qui approchait, on était vraiment stressés. Paideia a mis en place un suivi rigoureux et adapté. Maxime a progressé de 4 points en maths en un trimestre.',
                },
              ].map(({ name, child, stars, text }) => (
                <div key={name} className="bg-white/10 border border-white/15 rounded-3xl p-6 space-y-4 hover:bg-white/15 transition-colors duration-200">
                  <div className="flex gap-1">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-primary-100 text-sm leading-relaxed">"{text}"</p>
                  <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-sm font-bold shrink-0">
                      {name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{name}</p>
                      <p className="text-primary-400 text-xs">{child}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. POUR QUI ────────────────────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-5">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel>Pour qui ?</SectionLabel>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Pour les enfants qui ont besoin{' '}
                  <span className="text-primary-600">d'un cadre sur mesure.</span>
                </h2>

                <div className="space-y-3">
                  {[
                    { emoji: '📚', label: 'Du CP à la Terminale' },
                    { emoji: '🔍', label: 'Difficultés de compréhension ou de méthode' },
                    { emoji: '⚡', label: 'Manque de concentration ou d\'organisation' },
                    { emoji: '📉', label: 'Décrochage scolaire ou perte de motivation' },
                    { emoji: '🧩', label: 'Profils dys, TDAH ou besoins particuliers' },
                    { emoji: '🎯', label: 'Préparation aux examens (Brevet, Bac)' },
                  ].map(({ emoji, label }) => (
                    <div key={label} className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-primary-50/50 transition-colors">
                      <span className="text-xl w-8 text-center shrink-0">{emoji}</span>
                      <span className="text-gray-700 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F8F6F2] rounded-3xl p-7 space-y-5">
                <h3 className="font-bold text-gray-900 text-lg">
                  Pas sûr(e) que Paideia soit adapté à votre situation ?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  C'est exactement pour ça que le bilan existe. En 45 minutes,
                  on évalue la situation réelle de votre enfant — et on vous dit
                  honnêtement si et comment on peut l'aider.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Si Paideia n'est pas la bonne solution, on vous le dira.
                  Ce qu'on veut, c'est que votre enfant progresse — pas vous
                  vendre quelque chose qui ne lui correspond pas.
                </p>
                <WaButton label="Échanger sur WhatsApp" size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. PRICING ─────────────────────────────────────────────────────── */}
        <section className="bg-[#F8F6F2] py-16 md:py-24" id="offres">
          <div className="max-w-5xl mx-auto px-5">
            <div className="text-center mb-10">
              <SectionLabel>Nos offres</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
                Vous ne payez que la moitié.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Le soutien scolaire à domicile est éligible au crédit d'impôt avec avance immédiate —
                l'État déduit 50% directement au paiement, sans attendre votre déclaration fiscale.
              </p>
            </div>

            {/* Encart crédit d'impôt */}
            <div className="max-w-3xl mx-auto mb-8 bg-primary-50 border border-primary-200 rounded-2xl px-5 py-4 flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-700 font-black text-sm">50%</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong className="text-primary-900">Avance immédiate de crédit d'impôt (URSSAF) :</strong>{' '}
                vous vous inscrivez une fois, et à chaque séance, la moitié du tarif est automatiquement
                prise en charge par l'État — sans avance de fonds, sans paperasse mensuelle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

              {/* Card Essentiel */}
              <div className="bg-white rounded-3xl border border-gray-200 p-7 space-y-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div>
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2">Paideia Essentiel</p>
                  <h3 className="text-xl font-extrabold text-gray-900">2h de soutien / semaine</h3>
                  <p className="text-gray-500 text-sm mt-1.5">Un suivi régulier et structuré pour ancrer les bonnes méthodes.</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-primary-700">149,50€</span>
                    <span className="text-gray-400 text-sm">/mois</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">après avance immédiate · 299€ brut</p>
                  <p className="text-xs text-gray-400 mt-0.5">Sans engagement · Résiliable à tout moment</p>
                </div>

                <ul className="space-y-2.5">
                  {[
                    '2h de soutien scolaire / semaine',
                    'À domicile, chez vous',
                    'Spécialiste dys & TDAH',
                    'Bilan pédagogique initial offert',
                    'Suivi mensuel des progrès',
                    'Communication régulière avec les parents',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <WaButton label="Démarrer · Essentiel" size="sm" className="w-full" />
              </div>

              {/* Card Intensif — mise en avant */}
              <div className="relative bg-primary-900 rounded-3xl border border-primary-700 p-7 space-y-6 shadow-xl hover:shadow-2xl transition-shadow duration-200">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-400 text-primary-900 text-xs font-bold shadow-lg whitespace-nowrap">
                    ✦ Le plus choisi
                  </span>
                </div>

                <div className="pt-3">
                  <p className="text-xs font-bold text-primary-300 uppercase tracking-widest mb-2">Paideia Intensif</p>
                  <h3 className="text-xl font-extrabold text-white">4h de soutien / semaine</h3>
                  <p className="text-primary-300 text-sm mt-1.5">Pour un accompagnement dense et des résultats visibles rapidement.</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-gold-400">249,50€</span>
                    <span className="text-primary-400 text-sm">/mois</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-0.5">après avance immédiate · 499€ brut</p>
                  <p className="text-xs text-primary-400 mt-0.5">Sans engagement · Résiliable à tout moment</p>
                </div>

                <ul className="space-y-2.5">
                  {[
                    '4h de soutien scolaire / semaine',
                    'À domicile, chez vous',
                    'Spécialiste dys & TDAH',
                    'Bilan pédagogique initial offert',
                    'Suivi hebdomadaire des progrès',
                    'Communication renforcée avec les parents',
                    'Plan de progression personnalisé',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-primary-100">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <WaButton label="Démarrer · Intensif" size="sm" className="w-full bg-gold-400 text-primary-900 hover:brightness-105 shadow-gold-400/30" />
              </div>
            </div>

          </div>
        </section>

        {/* ── 9. BILAN OFFERT ────────────────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-5">
            <div className="text-center mb-12">
              <SectionLabel>Par où commencer ?</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
                Un bilan gratuit, sans engagement.
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Avant de parler tarifs ou programme, on prend le temps de comprendre
                votre enfant. C'est le point de départ de tout.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  step: '01',
                  icon: MessageCircle,
                  color: 'bg-blue-50 text-primary-600',
                  title: 'On échange sur WhatsApp',
                  desc: '15 minutes pour comprendre la situation de votre enfant. Aucun engagement, zéro pression.',
                },
                {
                  step: '02',
                  icon: BookOpen,
                  color: 'bg-purple-50 text-purple-600',
                  title: 'Bilan pédagogique à domicile',
                  desc: '45 minutes offertes. On identifie les blocages réels, le profil d\'apprentissage et ce qui peut vraiment changer.',
                },
                {
                  step: '03',
                  icon: ArrowRight,
                  color: 'bg-green-50 text-green-600',
                  title: 'Une proposition sur mesure',
                  desc: 'Si le bilan révèle qu\'on peut aider, on vous propose un accompagnement adapté. Vous décidez librement.',
                },
              ].map(({ step, icon: Icon, color, title, desc }) => (
                <div key={step} className="relative flex flex-col items-center text-center p-6 rounded-3xl border border-gray-100 hover:border-primary-100 hover:shadow-sm transition-all duration-200">
                  <div className="absolute -top-3 left-6 bg-primary-900 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {step}
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 mt-2`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <WaButton size="lg" />
              <p className="text-gray-400 text-xs mt-3">Réponse sous 24h · Sans engagement</p>
            </div>
          </div>
        </section>

        {/* ── 10. CTA FINAL ──────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-5 text-center space-y-7">
            <div className="text-5xl">✨</div>
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
              Votre enfant a le potentiel.
              <br />
              <span className="text-gold-400">Il a besoin de la bonne méthode.</span>
            </h2>
            <p className="text-primary-200 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Un bilan gratuit, sans engagement, pour comprendre où en est votre enfant
              et ce qui peut réellement changer. Prenez rendez-vous en 30 secondes sur WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WaButton size="lg" />
              <div className="text-primary-300 text-sm">
                <span className="block font-semibold">Méthode structurée</span>
                <span className="text-xs">Adaptée au profil de votre enfant</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2">
              {['Bilan offert', 'Sans engagement', 'À domicile — Fort-de-France & Case Pilote'].map(item => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-primary-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. FOOTER ─────────────────────────────────────────────────────── */}
        <footer className="bg-gray-950 text-gray-400 py-8">
          <div className="max-w-5xl mx-auto px-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <Image
                  src="/images/logo.svg"
                  alt="Paideia"
                  width={100}
                  height={22}
                  className="brightness-0 invert opacity-70"
                />
              </div>
              <div className="flex gap-6 text-xs">
                <Link href="/" className="hover:text-white transition-colors">Site principal</Link>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
                <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4 text-xs text-gray-500">
              <p>© {new Date().getFullYear()} Paideia. Tous droits réservés.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
