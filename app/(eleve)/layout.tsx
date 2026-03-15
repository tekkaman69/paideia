import { redirect } from 'next/navigation'
export default function OldEleveLayout({ children }: { children: React.ReactNode }) {
  redirect('/app/eleve/dashboard')
}
