'use client'
import { useState } from 'react'
import { Bell, Menu, LogOut, UserCircle, Settings } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { initials } from '@/lib/utils'
import { signOut } from '@/lib/auth/actions'
import type { Profile } from '@/types'

interface AppTopBarProps {
  profile: Profile
  notificationCount?: number
  onMobileMenuToggle?: () => void
}

export function AppTopBar({ profile, notificationCount = 0, onMobileMenuToggle }: AppTopBarProps) {
  const profileHref =
    profile.role === 'eleve'
      ? '/app/eleve/profil'
      : '/app/parent/compte'

  return (
    <header className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center justify-between border-b border-sand-200 bg-white/95 backdrop-blur-sm px-4 sm:px-6">

      {/* Left: Mobile hamburger + page context */}
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-sand-100 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="hidden sm:block">
          <p className="text-xs text-gray-400 font-medium">Bonjour,</p>
          <p className="text-sm font-semibold text-primary-900 -mt-0.5">
            {profile.full_name?.split(' ')[0] ?? 'Bienvenue'}
          </p>
        </div>
      </div>

      {/* Right: notifications + user menu */}
      <div className="flex items-center gap-2">

        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-primary-700" asChild>
          <Link href={profile.role === 'eleve' ? '/app/eleve/notifications' : '/app/parent/notifications'}>
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white leading-none">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm hover:bg-sand-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-8 w-8">
                {profile.avatar_url && <AvatarImage src={profile.avatar_url} alt={profile.full_name ?? ''} />}
                <AvatarFallback className="text-xs">{initials(profile.full_name)}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block font-medium text-gray-700 max-w-[140px] truncate">
                {profile.full_name}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-primary-900">{profile.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={profileHref} className="cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                Mon profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={profile.role === 'eleve' ? '/app/eleve/profil' : '/app/parent/compte'} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={signOut} className="w-full">
                <button type="submit" className="flex w-full items-center text-red-600 hover:text-red-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
