import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' })

// Admin Supabase client (bypasses RLS)
function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session        = event.data.object as Stripe.Checkout.Session
        const customerId     = session.customer as string
        const subscriptionId = session.subscription as string

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const priceId      = subscription.items.data[0]?.price.id

          // Find plan by stripe price id
          const { data: plan } = await supabase
            .from('plans')
            .select('id')
            .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
            .maybeSingle()

          // Find profile by stripe customer id
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .maybeSingle()

          if (profile && plan) {
            await supabase.from('subscriptions').upsert({
              profile_id:              profile.id,
              plan_id:                 plan.id,
              stripe_subscription_id:  subscriptionId,
              stripe_customer_id:      customerId,
              status:                  'active',
              billing_cycle:           subscription.items.data[0]?.price.recurring?.interval === 'year' ? 'yearly' : 'monthly',
              current_period_start:    new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end:      new Date(subscription.current_period_end * 1000).toISOString(),
            }, { onConflict: 'stripe_subscription_id' })
          }
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice    = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .maybeSingle()

        if (profile) {
          await supabase.from('payments').insert({
            profile_id:               profile.id,
            stripe_invoice_id:        invoice.id,
            stripe_payment_intent_id: (invoice.payment_intent as string) ?? null,
            amount:                   invoice.amount_paid,
            currency:                 invoice.currency,
            status:                   'succeeded',
            description:              'Paiement abonnement Paideia',
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice    = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .maybeSingle()

        if (profile) {
          await supabase.from('payments').insert({
            profile_id:        profile.id,
            stripe_invoice_id: invoice.id,
            amount:            invoice.amount_due,
            currency:          invoice.currency,
            status:            'failed',
          })

          // Update subscription status to past_due
          if (invoice.subscription) {
            await supabase
              .from('subscriptions')
              .update({ status: 'past_due' })
              .eq('stripe_subscription_id', invoice.subscription as string)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await supabase
          .from('subscriptions')
          .update({
            status:               subscription.status as any,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end:   new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            canceled_at:          subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000).toISOString()
              : null,
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', canceled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
