/**
 * lib/lemon/api.ts
 * Helpers Lemon Squeezy: création de checkout, vérification webhook.
 */

import crypto from 'crypto'

const LEMON_API_BASE = 'https://api.lemonsqueezy.com/v1'

// ── Types Lemon Squeezy ───────────────────────────────────────

export interface LemonCheckoutOptions {
  variantId: string          // ID variante du produit Lemon
  bookingId: string          // Notre bookingId (passé en custom_data)
  customerEmail?: string
  customerName?: string
  redirectUrl?: string       // URL de retour après paiement
  webhookUrl?: string
}

export interface LemonCheckoutResponse {
  checkoutUrl: string
  checkoutId: string
}

// ── Création checkout ─────────────────────────────────────────
/**
 * Crée une session de checkout Lemon Squeezy.
 * Retourne l'URL de checkout à rediriger le client.
 */
export async function createLemonCheckout(
  opts: LemonCheckoutOptions
): Promise<LemonCheckoutResponse> {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID

  if (!apiKey || !storeId) {
    throw new Error('Lemon Squeezy non configuré (LEMON_SQUEEZY_API_KEY ou STORE_ID manquant)')
  }

  const body = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: {
          embed: false,
          media: false,
          logo: true,
        },
        checkout_data: {
          email: opts.customerEmail,
          name:  opts.customerName,
          // custom_data est renvoyé dans le webhook
          custom: {
            booking_id: opts.bookingId,
          },
        },
        product_options: {
          redirect_url: opts.redirectUrl ?? `${process.env.NEXT_PUBLIC_APP_URL}/reservations`,
          receipt_button_text: 'Voir mes réservations',
          receipt_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/reservations`,
        },
      },
      relationships: {
        store: {
          data: { type: 'stores', id: storeId },
        },
        variant: {
          data: { type: 'variants', id: opts.variantId },
        },
      },
    },
  }

  const res = await fetch(`${LEMON_API_BASE}/checkouts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/vnd.api+json',
      'Accept':        'application/vnd.api+json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Lemon Squeezy checkout error: ${res.status} — ${error}`)
  }

  const data = await res.json()
  return {
    checkoutUrl: data.data.attributes.url,
    checkoutId:  data.data.id,
  }
}

// ── Vérification signature webhook ────────────────────────────
/**
 * Vérifie la signature HMAC-SHA256 du webhook Lemon Squeezy.
 * Le secret est dans LEMON_SQUEEZY_WEBHOOK_SECRET.
 */
export function verifyLemonWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  if (!secret) {
    console.warn('[Lemon Webhook] Secret non configuré — vérification ignorée en dev')
    return process.env.NODE_ENV === 'development'
  }

  if (!signatureHeader) return false

  const hmac = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex')

  // Comparaison timing-safe
  try {
    return crypto.timingSafeEqual(
      Buffer.from(hmac, 'hex'),
      Buffer.from(signatureHeader, 'hex')
    )
  } catch {
    return false
  }
}

// ── Récupérer une commande ────────────────────────────────────
export async function getLemonOrder(orderId: string) {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY!
  const res = await fetch(`${LEMON_API_BASE}/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept':        'application/vnd.api+json',
    },
  })
  if (!res.ok) throw new Error(`Lemon order ${orderId} non trouvé`)
  return res.json()
}

// ── Émission email (placeholder) ─────────────────────────────
/**
 * TODO: Connecter un vrai provider email (Resend, SendGrid...).
 * Pour l'instant, log seulement.
 */
export async function sendEmail(opts: {
  to: string
  subject: string
  html: string
}) {
  // En développement: log dans la console
  console.log('[Email]', opts)

  // TODO: implémenter avec Resend
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ from: process.env.EMAIL_FROM, ...opts })
}
