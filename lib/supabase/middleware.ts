import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

const ROLE_COOKIE = 'paideia-role'

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes publiques : pas besoin de vérifier la session
  const isPublicRoute = (
    pathname === '/' ||
    pathname.startsWith('/offres') ||
    pathname.startsWith('/methodes') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/a-propos') ||
    pathname.startsWith('/faq') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/reserver') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/mentions-legales') ||
    pathname.startsWith('/confidentialite')
  )
  if (isPublicRoute) return NextResponse.next({ request })

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as Parameters<typeof supabaseResponse.cookies.set>[2])
          )
        },
      },
    }
  )

  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Supabase unreachable — treat as unauthenticated
  }

  const isProtectedApp   = pathname.startsWith('/app')
  const isProtectedAdmin = pathname.startsWith('/admin')
  const isAuthRoute      = pathname.startsWith('/auth')

  // Pas d'utilisateur => redirection vers connexion
  if (!user && (isProtectedApp || isProtectedAdmin)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/connexion'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Pour les routes qui nécessitent le rôle, on utilise un cookie cache
  if (user && (isAuthRoute || isProtectedAdmin)) {
    // Lire le rôle depuis le cookie (évite une requête DB à chaque navigation)
    let role = request.cookies.get(ROLE_COOKIE)?.value

    if (!role) {
      // Cache miss : requête DB unique, puis on met en cache
      try {
        const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        role = (data as { role: string } | null)?.role ?? 'parent'
      } catch {
        role = 'parent'
      }
      supabaseResponse.cookies.set(ROLE_COOKIE, role, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 3600, // 1 heure
      })
    }

    // Utilisateur connecté sur une page auth => redirection dashboard
    if (isAuthRoute && !pathname.includes('callback')) {
      const url = request.nextUrl.clone()
      url.pathname = role === 'admin' ? '/admin'
        : role === 'eleve'  ? '/app/eleve/dashboard'
        : '/app/parent/dashboard'
      return NextResponse.redirect(url)
    }

    // Guard admin : seuls les admins accèdent à /admin
    if (isProtectedAdmin && role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/app/parent/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
