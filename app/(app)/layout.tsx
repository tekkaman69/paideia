import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/lib/auth/server'
import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { AppTopBar } from '@/components/dashboard/AppTopBar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/auth/connexion')

  return (
    <div className="flex h-screen bg-sand-50 overflow-hidden">
      <AppSidebar role={profile.role} profile={profile} />
      <div className="flex flex-1 flex-col min-w-0">
        <AppTopBar profile={profile} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
