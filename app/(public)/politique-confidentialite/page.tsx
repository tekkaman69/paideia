import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="page-container max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-900 mb-8">Politique de confidentialité</h1>

      <div className="prose space-y-8">
        <p>
          La protection des données personnelles, notamment celles concernant des enfants mineurs,
          est une priorité absolue pour Paideia. Cette politique explique quelles données nous collectons,
          pourquoi, et comment vous pouvez exercer vos droits.
        </p>

        <section>
          <h2>Responsable du traitement</h2>
          <p>
            Paideia — [Nom complet] — contact@paideia.fr
          </p>
        </section>

        <section>
          <h2>Données collectées</h2>
          <h3>Données des parents (compte)</h3>
          <ul>
            <li>Nom, prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Historique de réservations et paiements</li>
          </ul>

          <h3>Données des élèves</h3>
          <p>
            Nous collectons uniquement le minimum strictement nécessaire :
          </p>
          <ul>
            <li>Prénom</li>
            <li>Tranche d'âge (et non la date de naissance précise)</li>
            <li>Tags de profil pédagogique (ex: "dyslexie", "TDAH") — saisis par les parents</li>
            <li>Aménagements pédagogiques souhaités (texte libre)</li>
            <li>Objectifs d'apprentissage (texte libre)</li>
          </ul>
          <p>
            <strong>Aucune donnée médicale n'est collectée ni stockée.</strong>
            Les informations de profil sont des pistes pédagogiques choisies par les parents,
            et non des diagnostics.
          </p>
        </section>

        <section>
          <h2>Base légale des traitements</h2>
          <ul>
            <li><strong>Exécution du contrat</strong> — pour les données nécessaires aux séances</li>
            <li><strong>Intérêt légitime</strong> — pour l'amélioration du service</li>
            <li><strong>Consentement</strong> — pour les communications marketing optionnelles</li>
          </ul>
        </section>

        <section>
          <h2>Partage des données</h2>
          <p>Vos données ne sont jamais vendues. Elles peuvent être partagées avec :</p>
          <ul>
            <li><strong>Firebase / Google</strong> — hébergement et authentification</li>
            <li><strong>Lemon Squeezy</strong> — traitement des paiements</li>
            <li><strong>Daily.co</strong> — classe virtuelle (uniquement pendant la séance)</li>
          </ul>
          <p>Tous nos prestataires sont conformes RGPD ou opèrent avec des clauses contractuelles types (CCT).</p>
        </section>

        <section>
          <h2>Conservation des données</h2>
          <ul>
            <li>Données de compte : durée du contrat + 3 ans</li>
            <li>Données de paiement : 10 ans (obligation légale comptable)</li>
            <li>Données élèves : durée du contrat + 1 an</li>
          </ul>
        </section>

        <section>
          <h2>Vos droits (RGPD)</h2>
          <p>Vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Accès</strong> — obtenir une copie de vos données</li>
            <li><strong>Rectification</strong> — corriger des données inexactes</li>
            <li><strong>Effacement</strong> — demander la suppression</li>
            <li><strong>Portabilité</strong> — recevoir vos données dans un format lisible</li>
            <li><strong>Opposition</strong> — vous opposer à certains traitements</li>
          </ul>
          <p>
            Pour exercer ces droits : <a href="mailto:contact@paideia.fr">contact@paideia.fr</a>
            <br />
            En cas de litige non résolu : <a href="https://www.cnil.fr" rel="noopener noreferrer">CNIL</a>.
          </p>
        </section>

        <section>
          <h2>Mineurs et consentement parental</h2>
          <p>
            Les comptes élèves sont créés et gérés par les parents ou représentants légaux.
            Aucun compte ne peut être créé directement par un mineur de moins de 15 ans.
            Le parent consent au traitement des données de son enfant lors de l'inscription.
          </p>
        </section>

        <p className="text-xs text-gray-400 mt-8">Dernière mise à jour : {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
