import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { getCurrentProfile } from '@/lib/auth/server'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Lecture locale (cookie JWT) — aucun appel réseau si non connecté
  const profile = await getCurrentProfile()

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader profile={profile} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </div>
  )
}
