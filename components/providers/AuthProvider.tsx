'use client'

/**
 * AuthProvider — avec Supabase SSR, l'auth est gérée côté serveur.
 * Ce provider est conservé comme wrapper léger pour la compatibilité.
 * L'état utilisateur est lu via les Server Components (lib/auth/server.ts).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
