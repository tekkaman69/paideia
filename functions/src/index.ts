/**
 * functions/src/index.ts
 * Point d'entrée des Firebase Cloud Functions Paideia.
 */

import * as admin from 'firebase-admin'

// Initialisation Firebase Admin (une seule fois)
admin.initializeApp()

// Export des fonctions
export { lemonWebhook } from './lemon-webhook'
export { getDailyToken } from './daily-token'
export { completeBooking } from './complete-booking'
