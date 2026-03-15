# 🏛️ Paideia — Soutien scolaire adapté DYS & TDAH

Plateforme SaaS de coaching scolaire à distance pour enfants DYS (dyslexie, dyspraxie, dyscalculie), TDAH et neurotypiques.

**Stack**: Next.js 14 · TypeScript · Tailwind CSS · Firebase · Lemon Squeezy · Daily.co · Vercel

---

## Table des matières

1. [Setup local](#1-setup-local)
2. [Configuration Firebase](#2-configuration-firebase)
3. [Configuration Lemon Squeezy](#3-configuration-lemon-squeezy)
4. [Configuration Daily.co (classe virtuelle)](#4-configuration-dailyco)
5. [Cloud Functions Firebase](#5-cloud-functions-firebase)
6. [Déploiement Vercel](#6-déploiement-vercel)
7. [Architecture du projet](#7-architecture-du-projet)
8. [Modèle de données Firestore](#8-modèle-de-données-firestore)
9. [Rôles et accès](#9-rôles-et-accès)
10. [Fonctionnalités](#10-fonctionnalités)
11. [Hypothèses et choix techniques](#11-hypothèses-et-choix-techniques)

---

## 1. Setup local

### Prérequis

- Node.js 18+
- npm 9+
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

```bash
# 1. Cloner / ouvrir le dossier
cd paideia

# 2. Installer les dépendances
npm install

# 3. Copier et configurer les variables d'environnement
cp .env.example .env.local
# → Remplissez .env.local avec vos clés (voir sections ci-dessous)

# 4. Lancer le serveur de développement
npm run dev
```

Le site est accessible sur http://localhost:3000.

### Variables manquantes au démarrage

Si Firebase n'est pas configuré, les pages publiques (landing, blog) fonctionneront mais l'authentification et Firestore seront inactifs.

---

## 2. Configuration Firebase

### 2.1 Créer le projet Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un projet → "Paideia"
3. Activer: **Authentication** (email/mot de passe), **Firestore**, **Storage**, **Functions**

### 2.2 Clés Firebase Client (public)

1. Projet Firebase → Paramètres → Applications web → "Ajouter une application"
2. Copier les clés dans `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paideia-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=paideia-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paideia-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 2.3 Clé Firebase Admin (serveur)

1. Projet Firebase → Paramètres → Comptes de service → "Générer une nouvelle clé privée"
2. Télécharger le JSON
3. Encoder en base64 pour Vercel:
   ```bash
   base64 -i serviceAccountKey.json | tr -d '\n'
   ```
4. Ajouter dans `.env.local`:
   ```bash
   FIREBASE_ADMIN_PROJECT_ID=paideia-xxx
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@paideia-xxx.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY_BASE64=eyJh...
   ```

### 2.4 Déployer les règles Firestore

```bash
firebase login
firebase use paideia-xxx
firebase deploy --only firestore:rules,firestore:indexes
```

### 2.5 Configurer Storage (CORS pour images)

Créer un fichier `cors.json`:
```json
[{
  "origin": ["https://paideia.fr", "http://localhost:3000"],
  "method": ["GET", "PUT", "POST"],
  "maxAgeSeconds": 3600
}]
```

```bash
gsutil cors set cors.json gs://paideia-xxx.appspot.com
```

### 2.6 Créer le premier compte admin

1. Créer un compte via `/auth/inscription` (rôle = parent par défaut)
2. Dans Firestore Console → `users/{uid}` → modifier `role` en `admin`

---

## 3. Configuration Lemon Squeezy

### 3.1 Créer les produits

1. [app.lemonsqueezy.com](https://app.lemonsqueezy.com) → Produits → Créer 3 produits:
   - **Séance Solo** — 55,00 €
   - **Séance Duo** — 35,00 €
   - **Mini-groupe Agora** — 25,00 €

2. Pour chaque produit, créer une **variante** et noter l'**ID de variante**

### 3.2 Variables d'environnement

```bash
LEMON_SQUEEZY_API_KEY=eyJ0eXAiOiJ...
LEMON_SQUEEZY_STORE_ID=12345
LEMON_SQUEEZY_WEBHOOK_SECRET=votre_secret_webhook
NEXT_PUBLIC_LEMON_VARIANT_SEANCE_SOLO=11111
NEXT_PUBLIC_LEMON_VARIANT_SEANCE_DUO=22222
NEXT_PUBLIC_LEMON_VARIANT_SEANCE_TRIO=33333
```

### 3.3 Configurer le webhook

1. Lemon Squeezy → Paramètres → Webhooks → Ajouter endpoint
2. **URL**: `https://votre-site.vercel.app/api/webhooks/lemon`
3. **Events**: `order_created`
4. **Signing secret**: copier dans `LEMON_SQUEEZY_WEBHOOK_SECRET`

### 3.4 Tester le webhook en local

Utiliser [ngrok](https://ngrok.com) pour exposer localhost:
```bash
ngrok http 3000
# Copier l'URL ngrok dans Lemon Squeezy → Webhooks
```

Ou simuler avec curl:
```bash
# Générer la signature (remplacer SECRET et BODY)
BODY='{"meta":{"event_name":"order_created","custom_data":{"booking_id":"TEST123"}},"data":{"id":"9999","attributes":{"total":5500,"currency":"EUR"}}}'
SIG=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "VOTRE_SECRET" | cut -d' ' -f2)
curl -X POST http://localhost:3000/api/webhooks/lemon \
  -H "Content-Type: application/json" \
  -H "x-signature: $SIG" \
  -d "$BODY"
```

---

## 4. Configuration Daily.co

### 4.1 Créer un compte Daily

1. [daily.co](https://www.daily.co) → Sign up → créer un domaine (ex: `paideia`)
2. Dashboard → Developers → API keys

### 4.2 Variables d'environnement

```bash
DAILY_API_KEY=votre_daily_api_key
DAILY_DOMAIN=paideia.daily.co
NEXT_PUBLIC_DAILY_DOMAIN=paideia.daily.co
```

### 4.3 Test de la classe virtuelle

1. Créer une réservation et simuler le paiement (webhook)
2. Aller sur `/reservations`
3. Cliquer "Rejoindre" → la room Daily s'ouvre dans un iframe

### 4.4 Fallback Discord

Si Daily n'est pas configuré, modifier le booking dans Firestore:
```json
{
  "meetingProvider": "discord",
  "discordUrl": "https://discord.gg/votre-lien",
  "status": "paid"
}
```
La page `/classe/[bookingId]` affichera le guide Discord.

---

## 5. Cloud Functions Firebase

### 5.1 Installation

```bash
cd functions
npm install
```

### 5.2 Variables d'environnement des functions

```bash
# Configurer les secrets Firebase
firebase functions:secrets:set LEMON_SQUEEZY_WEBHOOK_SECRET
firebase functions:secrets:set DAILY_API_KEY
firebase functions:secrets:set DAILY_DOMAIN
```

### 5.3 Build et déploiement

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions
```

### 5.4 Functions disponibles

| Nom | Type | Description |
|---|---|---|
| `lemonWebhook` | HTTP | Webhook Lemon Squeezy → met booking en `paid` |
| `getDailyToken` | Callable | Génère un token Daily pour rejoindre une room |
| `completeBooking` | Callable | Marque une séance terminée + attribue XP |

> **Note MVP**: En développement, les fonctions équivalentes sont dans les API Routes Next.js (`/api/webhooks/lemon`, `/api/daily/token`). Les Cloud Functions sont pour la production si vous préférez les découpler.

---

## 6. Déploiement Vercel

### 6.1 Lier le repo Vercel

```bash
npm install -g vercel
vercel login
vercel link
```

### 6.2 Ajouter les variables d'environnement

Dans Vercel Dashboard → Settings → Environment Variables, ajouter **toutes** les variables de `.env.example`.

⚠️ **Important**: `FIREBASE_ADMIN_PRIVATE_KEY_BASE64` doit contenir la clé encodée en base64 (sans retours à la ligne).

### 6.3 Déployer

```bash
vercel deploy --prod
```

### 6.4 Configurer le domaine custom

Vercel Dashboard → Settings → Domains → Ajouter `paideia.fr`

---

## 7. Architecture du projet

```
app/
├── (public)/          # Pages publiques (landing, blog, offres...)
├── (auth)/            # Auth (connexion, inscription)
├── (parent)/          # Espace parent (compte, réservations)
├── (eleve)/           # Espace élève (gamification)
├── (class)/           # Classe virtuelle Daily.co
├── (admin)/           # Back-office (planning, blog CMS, réservations)
└── api/
    ├── daily/token/   # API route: génère token Daily
    └── webhooks/lemon/ # API route: webhook Lemon Squeezy

components/
├── ui/                # Design system (Button, Card, Badge, Input...)
├── layout/            # Header, Footer, AdminSidebar
├── landing/           # Sections de la landing page
├── blog/              # PostCard, MarkdownRenderer
├── booking/           # Stepper de réservation
├── gamification/      # XpBar, BadgeCard, QuestCard
└── providers/         # AuthProvider, CalmModeProvider

lib/
├── firebase/client.ts  # SDK Firebase client
├── firebase/admin.ts   # SDK Firebase Admin (serveur)
├── auth/guards.ts      # Guards de routes
├── lemon/api.ts        # Helpers Lemon Squeezy
├── meet/daily.ts       # Helpers Daily.co
├── db/*.ts             # Repositories Firestore typés
└── utils.ts            # cn(), slugify, formatters

functions/src/          # Cloud Functions Firebase
types/index.ts          # Schémas Zod + types TypeScript
hooks/                  # useUser, useRole, useCalmMode
```

---

## 8. Modèle de données Firestore

### Collections

```
users/{uid}
  uid, role, displayName, email, phone?, preferences: { calmMode, dysFontEnabled }

students/{id}
  parentUid, name, ageRange, neuroProfile[], accommodations[], goals[]

offers/{id}
  title, duration, price (centimes), groupSize, description, features[], lemonVariantId, active

slots/{id}
  startAt, endAt, capacity, offerIds[], createdBy, status, bookedCount

bookings/{id}
  slotId, offerId, parentUid, studentIds[], status, lemonOrderId?,
  meetingProvider, meetingRoomId?, meetingJoinUrl?, discordUrl?,
  cancellableUntil, cancelledAt?, cancelReason?, createdAt, updatedAt

payments/{id}
  bookingId, lemonOrderId, status, amount, currency, createdAt

posts/{id}
  slug, title, excerpt, contentMarkdown, coverImageUrl?, tags[],
  category, status, publishedAt?, updatedAt, authorUid, metaTitle?, metaDescription?

xpEvents/{id}
  studentId, type, points, description?, createdAt

badges/{id}
  key, title, description, icon, criteria, points

studentBadges/{id}
  studentId, badgeKey, earnedAt

quests/{id}
  title, description, points, weekly, active, icon?
```

---

## 9. Rôles et accès

| Rôle | Accès |
|---|---|
| `parent` | /compte, /reserver, /reservations, /eleve (lecture enfants) |
| `eleve` | /eleve, /eleve/progression |
| `intervenante` | /admin (planning, réservations, élèves, blog) |
| `admin` | Tout + suppression données |

**Changer le rôle**: Firestore Console → `users/{uid}` → modifier `role`

---

## 10. Fonctionnalités

### Réservation (flow complet)
1. Parent choisit offre → créneau → enfant(s)
2. Booking créé en `pending` dans Firestore
3. Redirection vers Lemon Squeezy checkout
4. Lemon envoie webhook → booking passe en `paid`
5. Room Daily créée automatiquement
6. Parent voit le bouton "Rejoindre" dans /reservations

### Classe virtuelle
- Daily.co embed (iframe) dans `/classe/[bookingId]`
- Token JWT généré à la demande via `/api/daily/token`
- Room privée par booking (accès uniquement aux participants)
- Intervenante = owner (peut muter les participants)
- Fallback Discord si Daily non configuré

### Blog CMS
- Éditeur Markdown CodeMirror dans `/admin/blog/[id]`
- Upload image de couverture (Firebase Storage)
- Statuts draft/published
- SEO: metaTitle, metaDescription, OpenGraph
- Auto-génération du slug

### Gamification
- XP par séance complétée (+20 XP)
- 8 badges inspirés de la Grèce antique
- Attribution automatique des badges (Cloud Function)
- Quêtes hebdomadaires configurables
- Mode calme + police Atkinson (DYS)

---

## 11. Hypothèses et choix techniques

| Décision | Choix | Raison |
|---|---|---|
| Classe virtuelle | Daily.co | API REST simple, rooms privées, tokens JWT, pas d'install client |
| Paiement | Lemon Squeezy | Simple, webhooks fiables, support Stripe-like |
| Auth guards | Firestore role check | Plus simple que custom claims Firebase pour MVP |
| Blog | Markdown in-app | Pas de CMS externe, données dans Firestore |
| Calendrier | Liste de créneaux | Léger, sans librairie calendrier complexe |
| Emails | Log + TODO | Placeholder Resend/SendGrid à brancher |
| Fonts | Inter + Atkinson | Accessibilité DYS maximale |

### Ce qui est "mock" vs "réel"
- ✅ **Réel**: Firebase Auth, Firestore CRUD, Lemon Squeezy checkout, Daily.co rooms, webhook signature
- 🟡 **Mock/placeholder**: Emails (log seulement), testimonials landing (contenu fictif), Stripe-like metadata Lemon
- ⚙️ **À configurer**: Variables d'environnement, webhook URL, domaine Daily, SIRET mentions légales

---

## Scripts disponibles

```bash
npm run dev              # Développement local
npm run build            # Build production
npm run typecheck        # Vérification TypeScript
npm run lint             # ESLint
npm run functions:serve  # Émulateur Cloud Functions
npm run functions:deploy # Déploiement Cloud Functions
firebase deploy --only firestore:rules  # Déployer les règles
```

---

## Support

- Email: contact@paideia.fr
- Issues: ouvrir une issue sur le repo

*Paideia ne remplace pas le suivi d'un orthophoniste, psychomotricien ou tout autre professionnel de santé.*
