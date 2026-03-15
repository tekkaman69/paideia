import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistance, isAfter } from 'date-fns'
import { fr } from 'date-fns/locale'
import slugifyLib from 'slugify'

// ── CSS Utilities ─────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Slugify ───────────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return slugifyLib(text, { lower: true, strict: true, locale: 'fr' })
}

// ── Dates (French locale) ─────────────────────────────────────────────────
export function formatDateFr(date: Date | string | null | undefined): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'dd MMMM yyyy', { locale: fr })
}

export function formatTimeFr(date: Date | string | null | undefined): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'HH:mm', { locale: fr })
}

export function formatDateTimeFr(date: Date | string | null | undefined): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, "dd MMM yyyy 'à' HH:mm", { locale: fr })
}

export function fromNow(date: Date | string | null | undefined): string {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistance(d, new Date(), { addSuffix: true, locale: fr })
}

export function isDatePast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date
  return isAfter(new Date(), d)
}

// ── Pricing ───────────────────────────────────────────────────────────────
export function formatPrice(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

// ── Text ──────────────────────────────────────────────────────────────────
export function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function initials(name: string | null | undefined): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ── Gamification ──────────────────────────────────────────────────────────
export function xpToLevel(xp: number): number {
  if (xp < 100)   return 1
  if (xp < 250)   return 2
  if (xp < 500)   return 3
  if (xp < 1000)  return 4
  if (xp < 2000)  return 5
  if (xp < 3500)  return 6
  if (xp < 5500)  return 7
  if (xp < 8000)  return 8
  if (xp < 11000) return 9
  return 10
}

export function xpProgress(xp: number): {
  level: number
  current: number
  needed: number
  percent: number
} {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 999999]
  const level      = xpToLevel(xp)
  const prev       = thresholds[level - 1] ?? 0
  const next       = thresholds[level] ?? 999999
  const current    = xp - prev
  const needed     = next - prev
  const percent    = Math.min(100, Math.round((current / needed) * 100))
  return { level, current, needed, percent }
}

// ── Array ─────────────────────────────────────────────────────────────────
export function textToArray(text: string): string[] {
  return text.split(',').map(s => s.trim()).filter(Boolean)
}
