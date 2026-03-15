'use client'
import Link from 'next/link'
import { Bell, LogOut, UserCircle, Settings, Shield } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

interface AdminTopBarProps {
  profile: Profile
  notificationCount?: number
}

export function AdminTopBar({ profile, notificationCount = 0 }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 sm:px-6">

      {/* Left: admin context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-semibold text-gray-800">Administration</span>
        </div>
        <Badge variant="admin" className="hidden sm:inline-flex">
          Admin
        </Badge>
      </div>

      {/* Right: notifications + user menu */}
      <div className="flex items-center gap-2">

        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-purple-700" asChild>
          <Link href="/admin/notifications">
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
            <button className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-8 w-8">
                {profile.avatar_url && (
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name ?? ''} />
                )}
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-semibold">
                  {initials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-700 leading-tight max-w-[140px] truncate">
                  {profile.full_name}
                </p>
                <p className="text-[10px] text-purple-600 font-semibold leading-tight uppercase tracking-wide">
                  Administrateur
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-primary-900">{profile.full_name}</p>
                <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
                <Badge variant="admin" className="w-fit text-[10px] mt-0.5">Administrateur</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profil" className="cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                Mon profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/parametres" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <form action={signOut} className="w-full">
                <button type="submit" className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-accent hover:text-red-700 cursor-pointer">
                  <LogOut className="h-4 w-4" />
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
