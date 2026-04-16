import { z } from 'zod'
import type { Database } from './database'

// ── Re-exports depuis la DB ───────────────────────────────────────────────
export type Profile       = Database['public']['Tables']['profiles']['Row']
export type Student       = Database['public']['Tables']['students']['Row']
export type Plan          = Database['public']['Tables']['plans']['Row']
export type Subscription  = Database['public']['Tables']['subscriptions']['Row']
export type Payment       = Database['public']['Tables']['payments']['Row']
export type Goal          = Database['public']['Tables']['goals']['Row']
export type StudentGoal   = Database['public']['Tables']['student_goals']['Row']
export type Badge         = Database['public']['Tables']['badges']['Row']
export type StudentBadge  = Database['public']['Tables']['student_badges']['Row']
export type XpEvent       = Database['public']['Tables']['xp_events']['Row']
export type ContentItem   = Database['public']['Tables']['content_items']['Row']
export type ContentCategory = Database['public']['Tables']['content_categories']['Row']
export type ContentAssignment = Database['public']['Tables']['content_assignments']['Row']
export type Event         = Database['public']['Tables']['events']['Row']
export type EventParticipant = Database['public']['Tables']['event_participants']['Row']
export type VirtualRoom   = Database['public']['Tables']['virtual_rooms']['Row']
export type BlogPost      = Database['public']['Tables']['blog_posts']['Row']
export type Notification  = Database['public']['Tables']['notifications']['Row']

// ── Enums ─────────────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'parent' | 'eleve' | 'teacher' | 'staff'
export type AgeRange = '6-8' | '9-11' | '12-15' | '16+'
export type SubscriptionStatus = Subscription['status']
export type ContentType   = ContentItem['content_type']
export type ContentStatus = ContentItem['status']
export type EventType     = Event['event_type']
export type EventStatus   = Event['status']
export type BadgeRarity   = Badge['rarity']

// ── Enums constants ───────────────────────────────────────────────────────
export const USER_ROLES = ['admin', 'parent', 'eleve', 'teacher', 'staff'] as const
export const AGE_RANGES: AgeRange[] = ['6-8', '9-11', '12-15', '16+']
export const NEURO_PROFILES = [
  'dyslexie', 'dyspraxie', 'dyscalculie', 'dysorthographie',
  'tdah', 'haut-potentiel', 'neurotypique', 'autre',
] as const
export const CONTENT_TYPES: ContentType[] = ['article', 'exercise', 'video', 'document', 'quiz', 'worksheet']
export const EVENT_TYPES: EventType[] = ['cours', 'rdv_parent', 'atelier', 'classe_virtuelle', 'autre']

// ── Types composites enrichis ─────────────────────────────────────────────
export type StudentWithProfile = Student & {
  profile: Pick<Profile, 'id' | 'email' | 'full_name' | 'avatar_url'>
}

export type ParentWithStudents = Profile & {
  students: Student[]
  subscription: (Subscription & { plan: Plan }) | null
}

export type EventWithParticipants = Event & {
  participants: (EventParticipant & { profile: Pick<Profile, 'id' | 'full_name' | 'avatar_url'> })[]
  virtual_room: VirtualRoom | null
}

export type ContentItemWithCategory = ContentItem & {
  category: ContentCategory | null
}

export type StudentGoalWithGoal = StudentGoal & {
  goal: Goal
}

export type SubscriptionWithPlan = Subscription & {
  plan: Plan
}

// ── Zod schemas de formulaires ────────────────────────────────────────────
export const LoginSchema = z.object({
  email:    z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
})

export const RegisterSchema = z.object({
  full_name:        z.string().min(2, 'Nom trop court'),
  email:            z.string().email('Email invalide'),
  password:         z.string().min(8, 'Au moins 8 caractères'),
  password_confirm: z.string(),
  role:             z.enum(['parent', 'eleve']),
  accept_terms:     z.boolean().refine(v => v, 'Vous devez accepter les CGU'),
}).refine(d => d.password === d.password_confirm, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['password_confirm'],
})

export const StudentFormSchema = z.object({
  display_name:  z.string().min(2, 'Prénom requis'),
  age_range:     z.enum(['6-8', '9-11', '12-15', '16+']).optional(),
  grade_level:   z.string().optional(),
  neuro_profile: z.array(z.string()).optional(),
  accommodations:z.string().optional(),
  goals_text:    z.string().optional(),
})

export const ContactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
})

export const ContentItemSchema = z.object({
  title:        z.string().min(3, 'Titre requis'),
  slug:         z.string().min(3),
  excerpt:      z.string().optional(),
  content_html: z.string().optional(),
  category_id:  z.string().uuid().optional().nullable(),
  content_type: z.enum(['article', 'exercise', 'video', 'document', 'quiz', 'worksheet']),
  status:       z.enum(['draft', 'published', 'archived']),
  access_level: z.enum(['public', 'all_subscribers', 'plan_specific', 'student_specific']),
  tags:         z.array(z.string()).optional(),
})

export const EventSchema = z.object({
  title:      z.string().min(2),
  event_type: z.enum(['cours', 'rdv_parent', 'atelier', 'classe_virtuelle', 'autre']),
  start_at:   z.string(),
  end_at:     z.string(),
  description:z.string().optional(),
  notes:      z.string().optional(),
  location:   z.string().optional(),
})

export const GoalSchema = z.object({
  title:      z.string().min(2),
  description:z.string().optional(),
  category:   z.string().optional(),
  xp_reward:  z.number().min(0).max(1000),
  icon:       z.string().optional(),
  color:      z.string().optional(),
})

// ── Types modules pédagogiques ────────────────────────────────────────────

export type ModuleAudience = 'parent' | 'eleve' | 'both'
export type ModuleLevel    = 'decouverte' | 'intermediaire' | 'avance'
export type ModuleStatus   = 'not_started' | 'in_progress' | 'completed'
export type QuestionType   = 'mcq' | 'true_false'
export type ActivityMode   = 'solo' | 'duo_enfant'

export type Module = {
  id:                     string
  slug:                   string
  code:                   string
  title:                  string
  subtitle:               string | null
  description:            string | null
  audience:               ModuleAudience
  level:                  ModuleLevel
  estimated_duration_min: number | null
  cover_image_url:        string | null
  sort_order:             number
  is_active:              boolean
  xp_reward_quiz:         number
  xp_reward_self_eval:    number
  xp_reward_activity:     number
  badge_key:              string | null
  quiz_pass_threshold:    number
  created_at:             string
  updated_at:             string
}

export type QuizQuestion = {
  id:         string
  module_id:  string
  type:       QuestionType
  text:       string
  sort_order: number
  created_at: string
}

export type QuizOption = {
  id:                 string
  question_id:        string
  text:               string
  is_correct:         boolean
  sort_order:         number
  feedback_correct:   string | null
  feedback_incorrect: string | null
}

export type SelfEvalItem = {
  id:         string
  module_id:  string
  audience:   ModuleAudience
  text:       string
  weight:     number
  sort_order: number
}

export type ActivityStep = {
  numero:      number
  titre:       string
  duree_min:   number
  instruction: string
  exemples?:   string[]
}

export type Activity = {
  id:                   string
  module_id:            string
  slug:                 string
  title:                string
  description:          string | null
  instructions:         ActivityStep[]
  reflection_prompt:    string | null
  duration_min:         number | null
  duration_max:         number | null
  xp_solo:              number
  xp_duo:               number
  xp_bonus_reflection:  number
  created_at:           string
}

export type MiniGameCard = {
  id:          string
  affirmation: string
  reponse:     'VRAI' | 'MYTHE' | 'VRAI_PARTIEL'
  explication: string
}

export type MiniGame = {
  id:         string
  module_id:  string
  slug:       string
  title:      string
  type:       string
  config:     { cartes?: MiniGameCard[]; [key: string]: unknown }
  created_at: string
}

export type ProfileModuleProgress = {
  id:                   string
  profile_id:           string
  module_id:            string
  status:               ModuleStatus
  quiz_score:           number | null
  quiz_score_max:       number | null
  quiz_attempts:        number
  self_eval_score:      number | null
  self_eval_score_max:  number | null
  self_eval_answers:    Record<string, number> | null
  activity_completed:   boolean
  activity_mode:        ActivityMode | null
  activity_reflection:  string | null
  mini_game_score:      number | null
  xp_earned:            number
  badge_awarded:        boolean
  started_at:           string | null
  completed_at:         string | null
  created_at:           string
  updated_at:           string
}

export type ProfileBadge = {
  id:         string
  profile_id: string
  badge_id:   string
  earned_at:  string
}

export type ProfileXpEvent = {
  id:           string
  profile_id:   string
  event_type:   string
  points:       number
  description:  string | null
  reference_id: string | null
  created_at:   string
}

// ── Types composites modules ──────────────────────────────────────────────

export type QuizQuestionWithOptions = QuizQuestion & {
  options: QuizOption[]
}

export type ModuleWithContent = Module & {
  questions:      QuizQuestionWithOptions[]
  self_eval_items: SelfEvalItem[]
  activities:     Activity[]
  mini_games:     MiniGame[]
}

export type ModuleWithProgress = Module & {
  progress: ProfileModuleProgress | null
}

// ── Seuils niveaux parent ────────────────────────────────────────────────
export const PARENT_LEVEL_THRESHOLDS = [0, 201, 601, 1201, 2501] as const
export const PARENT_LEVEL_NAMES = ['Découvreur', 'En chemin', 'Compagnon', 'Expert', 'Guide'] as const

export function parentXpToLevel(xp: number): number {
  if (xp <= 200)  return 1
  if (xp <= 600)  return 2
  if (xp <= 1200) return 3
  if (xp <= 2500) return 4
  return 5
}

export function parentXpProgress(xp: number): { level: number; name: string; current: number; needed: number; percent: number } {
  const thresholds = [0, 200, 600, 1200, 2500, 999999]
  const level   = parentXpToLevel(xp)
  const prev    = thresholds[level - 1]
  const next    = thresholds[level]
  const current = xp - prev
  const needed  = next - prev
  const percent = Math.min(100, Math.round((current / needed) * 100))
  return { level, name: PARENT_LEVEL_NAMES[level - 1], current, needed, percent }
}

// ── API types ─────────────────────────────────────────────────────────────
export type ApiResponse<T = unknown> = {
  ok: true
  data: T
} | {
  ok: false
  error: string
}

// ── Gamification ─────────────────────────────────────────────────────────
export function xpToLevel(xp: number): number {
  if (xp < 100)  return 1
  if (xp < 250)  return 2
  if (xp < 500)  return 3
  if (xp < 1000) return 4
  if (xp < 2000) return 5
  if (xp < 3500) return 6
  if (xp < 5500) return 7
  if (xp < 8000) return 8
  if (xp < 11000) return 9
  return 10
}

export function xpForNextLevel(level: number): number {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 999999]
  return thresholds[level] ?? 999999
}

export function xpProgress(xp: number): { level: number; current: number; needed: number; percent: number } {
  const level   = xpToLevel(xp)
  const prev    = xpForNextLevel(level - 1)
  const next    = xpForNextLevel(level)
  const current = xp - prev
  const needed  = next - prev
  const percent = Math.min(100, Math.round((current / needed) * 100))
  return { level, current, needed, percent }
}
