import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Mail, Phone, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Réserver une séance — Paideia',
  description: 'Réservez votre premier échange découverte gratuit. Évaluation des besoins, présentation des méthodes, sans engagement.',
}

export default function ReserverPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="page-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Prise de rendez-vous
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Premier échange découverte — offert
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            30 minutes pour se présenter, évaluer les besoins de votre enfant et répondre à vos questions. Sans engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-sand-50 rounded-2xl border border-sand-200 p-6">
              <h2 className="font-semibold text-primary-900 mb-4">Ce qui vous attend</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  30 minutes en visioconférence
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  Au créneau qui vous convient
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  Présentation de nos méthodes pédagogiques
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  Évaluation des besoins de votre enfant
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  Questions / réponses sans engagement
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-sand-200 p-6">
              <h2 className="font-semibold text-primary-900 mb-4">Nous contacter directement</h2>
              <div className="space-y-3">
                <a
                  href="mailto:contact@paideia.fr"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary-500" />
                  contact@paideia.fr
                </a>
                <a
                  href="tel:+33600000000"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary-500" />
                  +33 6 00 00 00 00
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-sand-200 p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-lg font-semibold text-primary-900">Calendrier de réservation</h2>
            <p className="text-sm text-gray-500">
              Le module de réservation en ligne sera bientôt disponible.
              En attendant, contactez-nous par email ou via le formulaire.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:underline"
            >
              Nous écrire <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
