import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const platformLinks = [
  { href: '/offres',    label: 'Nos offres' },
  { href: '/methodes',  label: 'Nos méthodes' },
  { href: '/services',  label: 'Services' },
  { href: '/a-propos',  label: 'À propos' },
]

const resourceLinks = [
  { href: '/blog',      label: 'Blog pédagogique' },
  { href: '/faq',       label: 'Questions fréquentes' },
  { href: '/contact',   label: 'Nous contacter' },
  { href: '/auth/connexion', label: 'Se connecter' },
]

const legalLinks = [
  { href: '/mentions-legales',          label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
  { href: '/cgv',                       label: 'CGV' },
]

export function MarketingFooter() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="page-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center text-white text-base font-bold shadow-sm group-hover:bg-primary-400 transition-colors">
                Π
              </div>
              <span className="font-bold text-xl tracking-tight">Paideia</span>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed mb-5">
              Accompagnement scolaire personnalisé et structuré pour votre enfant. Méthodes pédagogiques éprouvées, suivi parental complet.
            </p>
            <div className="space-y-2 text-sm text-primary-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:contact@paideia.fr" className="hover:text-white transition-colors">
                  contact@paideia.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>France</span>
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="font-semibold text-sm mb-5 text-gold-300 uppercase tracking-wide">
              Plateforme
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-primary-200 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="font-semibold text-sm mb-5 text-gold-300 uppercase tracking-wide">
              Ressources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-primary-200 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-semibold text-sm mb-5 text-gold-300 uppercase tracking-wide">
              Légal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-primary-200 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-800 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-400">
            © {new Date().getFullYear()} Paideia. Tous droits réservés.
          </p>
          <p className="text-sm text-primary-400">
            Fait avec soin en France
          </p>
        </div>
      </div>
    </footer>
  )
}
