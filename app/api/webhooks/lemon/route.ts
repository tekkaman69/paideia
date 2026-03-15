import { NextResponse } from 'next/server'
// Legacy Lemon Squeezy webhook - replaced by Stripe webhook at /api/webhooks/stripe
export async function POST() {
  return NextResponse.json({ message: 'Deprecated. Use /api/webhooks/stripe' }, { status: 410 })
}
