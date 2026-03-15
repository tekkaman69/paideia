import { redirect } from 'next/navigation'
export default function OldParentLayout({ children }: { children: React.ReactNode }) {
  redirect('/app/parent/dashboard')
}
