import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="page-container max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-900 mb-8">Mentions légales</h1>

      <div className="prose space-y-8">
        <section>
          <h2>Éditeur du site</h2>
          <p>
            <strong>Paideia</strong><br />
            [Nom complet de l'entreprise / micro-entreprise]<br />
            [Adresse]<br />
            SIRET : [à compléter]<br />
            Email : contact@paideia.fr
          </p>
        </section>

        <section>
          <h2>Directeur de publication</h2>
          <p>[Prénom Nom], responsable du site.</p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 701, San Francisco, CA 94104, USA<br />
            <a href="https://vercel.com" rel="noopener noreferrer">vercel.com</a>
          </p>
          <p>
            Les données Firestore sont hébergées par <strong>Google Firebase</strong> sur des serveurs européens (région europe-west1).
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site Paideia (textes, images, logos, structure) est protégé par le droit d'auteur.
            Toute reproduction, même partielle, sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2>Limitation de responsabilité</h2>
          <p>
            Les informations contenues sur ce site sont données à titre indicatif.
            Paideia ne saurait être tenu responsable des décisions prises sur la base
            des informations publiées sur ce site.
          </p>
          <p>
            <strong>Important :</strong> Paideia est un service de soutien pédagogique.
            Il ne se substitue en aucun cas à un suivi médical, orthophonique ou paramédical.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            Le site utilise des cookies strictement nécessaires au fonctionnement (authentification).
            Aucun cookie publicitaire n'est utilisé. Voir notre{' '}
            <a href="/politique-confidentialite">politique de confidentialité</a> pour plus de détails.
          </p>
        </section>

        <section>
          <h2>Droit applicable</h2>
          <p>Le présent site est soumis au droit français. Tout litige relève de la compétence des tribunaux français.</p>
        </section>

        <p className="text-xs text-gray-400 mt-8">Dernière mise à jour : {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
