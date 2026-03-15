-- ─────────────────────────────────────────────────────────────────────────
-- Migration 001 : Schéma initial Paideia
-- ─────────────────────────────────────────────────────────────────────────

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUM Types ────────────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('admin', 'parent', 'eleve', 'teacher', 'staff');
CREATE TYPE age_range AS ENUM ('6-8', '9-11', '12-15', '16+');
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete');
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly');
CREATE TYPE payment_status AS ENUM ('succeeded', 'pending', 'failed', 'refunded');
CREATE TYPE content_type AS ENUM ('article', 'exercise', 'video', 'document', 'quiz', 'worksheet');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE content_access_level AS ENUM ('public', 'all_subscribers', 'plan_specific', 'student_specific');
CREATE TYPE event_type AS ENUM ('cours', 'rdv_parent', 'atelier', 'classe_virtuelle', 'autre');
CREATE TYPE event_status AS ENUM ('scheduled', 'confirmed', 'cancelled', 'completed');
CREATE TYPE participant_type AS ENUM ('student', 'parent', 'teacher', 'observer');
CREATE TYPE participant_status AS ENUM ('invited', 'confirmed', 'declined', 'attended');
CREATE TYPE goal_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE badge_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error');
CREATE TYPE virtual_room_provider AS ENUM ('daily', 'meet', 'zoom', 'custom');

-- ── PROFILES ──────────────────────────────────────────────────────────────
-- Extension de auth.users
CREATE TABLE public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT NOT NULL,
  full_name           TEXT,
  avatar_url          TEXT,
  role                user_role NOT NULL DEFAULT 'parent',
  phone               TEXT,
  calm_mode           BOOLEAN NOT NULL DEFAULT false,
  dys_font_enabled    BOOLEAN NOT NULL DEFAULT false,
  stripe_customer_id  TEXT UNIQUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_stripe ON public.profiles(stripe_customer_id);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── STUDENTS ──────────────────────────────────────────────────────────────
CREATE TABLE public.students (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  display_name    TEXT NOT NULL,
  age_range       age_range,
  grade_level     TEXT,
  neuro_profile   TEXT[] NOT NULL DEFAULT '{}',
  accommodations  TEXT,
  goals_text      TEXT,
  xp_total        INTEGER NOT NULL DEFAULT 0,
  level           SMALLINT NOT NULL DEFAULT 1,
  streak_days     SMALLINT NOT NULL DEFAULT 0,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_students_profile ON public.students(profile_id);
CREATE INDEX idx_students_parent  ON public.students(parent_id);

CREATE TRIGGER students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── PARENT-STUDENT LINKS ──────────────────────────────────────────────────
CREATE TABLE public.parent_student_links (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id      UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  relationship    TEXT NOT NULL DEFAULT 'parent',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(parent_id, student_id)
);

CREATE INDEX idx_psl_parent  ON public.parent_student_links(parent_id);
CREATE INDEX idx_psl_student ON public.parent_student_links(student_id);

-- ── PLANS ────────────────────────────────────────────────────────────────
CREATE TABLE public.plans (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                      TEXT NOT NULL,
  slug                      TEXT NOT NULL UNIQUE,
  description               TEXT,
  price_monthly             INTEGER NOT NULL, -- en centimes
  price_yearly              INTEGER,
  currency                  TEXT NOT NULL DEFAULT 'eur',
  features                  TEXT[] NOT NULL DEFAULT '{}',
  stripe_price_id_monthly   TEXT,
  stripe_price_id_yearly    TEXT,
  has_virtual_class         BOOLEAN NOT NULL DEFAULT false,
  max_students              SMALLINT,
  sessions_per_month        SMALLINT,
  is_active                 BOOLEAN NOT NULL DEFAULT true,
  sort_order                SMALLINT NOT NULL DEFAULT 0,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_plans_slug     ON public.plans(slug);
CREATE INDEX idx_plans_active   ON public.plans(is_active);

CREATE TRIGGER plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── SUBSCRIPTIONS ─────────────────────────────────────────────────────────
CREATE TABLE public.subscriptions (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id                UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id                   UUID NOT NULL REFERENCES public.plans(id),
  stripe_subscription_id    TEXT UNIQUE,
  stripe_customer_id        TEXT,
  status                    subscription_status NOT NULL DEFAULT 'incomplete',
  billing_cycle             billing_cycle NOT NULL DEFAULT 'monthly',
  current_period_start      TIMESTAMPTZ,
  current_period_end        TIMESTAMPTZ,
  cancel_at_period_end      BOOLEAN NOT NULL DEFAULT false,
  canceled_at               TIMESTAMPTZ,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_profile ON public.subscriptions(profile_id);
CREATE INDEX idx_subscriptions_status  ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_stripe  ON public.subscriptions(stripe_subscription_id);

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── PAYMENTS ──────────────────────────────────────────────────────────────
CREATE TABLE public.payments (
  id                        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id                UUID NOT NULL REFERENCES public.profiles(id),
  subscription_id           UUID REFERENCES public.subscriptions(id),
  stripe_payment_intent_id  TEXT UNIQUE,
  stripe_invoice_id         TEXT,
  amount                    INTEGER NOT NULL,
  currency                  TEXT NOT NULL DEFAULT 'eur',
  status                    payment_status NOT NULL DEFAULT 'pending',
  description               TEXT,
  metadata                  JSONB,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_profile ON public.payments(profile_id);
CREATE INDEX idx_payments_status  ON public.payments(status);

-- ── GOALS ────────────────────────────────────────────────────────────────
CREATE TABLE public.goals (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT,
  xp_reward   INTEGER NOT NULL DEFAULT 50,
  icon        TEXT,
  color       TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_goals_active   ON public.goals(is_active);
CREATE INDEX idx_goals_category ON public.goals(category);

CREATE TRIGGER goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── STUDENT GOALS ─────────────────────────────────────────────────────────
CREATE TABLE public.student_goals (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id       UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  goal_id          UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  status           goal_status NOT NULL DEFAULT 'not_started',
  progress_percent SMALLINT NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  started_at       TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  notes            TEXT,
  assigned_by      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, goal_id)
);

CREATE INDEX idx_student_goals_student ON public.student_goals(student_id);
CREATE INDEX idx_student_goals_status  ON public.student_goals(status);

CREATE TRIGGER student_goals_updated_at
  BEFORE UPDATE ON public.student_goals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── BADGES ───────────────────────────────────────────────────────────────
CREATE TABLE public.badges (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key          TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  description  TEXT,
  icon         TEXT,
  image_url    TEXT,
  xp_required  INTEGER,
  criteria     JSONB,
  rarity       badge_rarity NOT NULL DEFAULT 'common',
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_badges_key    ON public.badges(key);
CREATE INDEX idx_badges_active ON public.badges(is_active);

-- ── STUDENT BADGES ────────────────────────────────────────────────────────
CREATE TABLE public.student_badges (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  badge_id   UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

CREATE INDEX idx_student_badges_student ON public.student_badges(student_id);

-- ── XP EVENTS ────────────────────────────────────────────────────────────
CREATE TABLE public.xp_events (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id   UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  event_type   TEXT NOT NULL,
  points       INTEGER NOT NULL,
  description  TEXT,
  reference_id UUID,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_xp_events_student ON public.xp_events(student_id);

-- ── CONTENT CATEGORIES ───────────────────────────────────────────────────
CREATE TABLE public.content_categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  color       TEXT,
  icon        TEXT,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_categories_slug ON public.content_categories(slug);

-- ── CONTENT ITEMS ─────────────────────────────────────────────────────────
CREATE TABLE public.content_items (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  excerpt          TEXT,
  content_html     TEXT,
  cover_image_url  TEXT,
  category_id      UUID REFERENCES public.content_categories(id) ON DELETE SET NULL,
  content_type     content_type NOT NULL DEFAULT 'article',
  status           content_status NOT NULL DEFAULT 'draft',
  access_level     content_access_level NOT NULL DEFAULT 'all_subscribers',
  required_plan_id UUID REFERENCES public.plans(id) ON DELETE SET NULL,
  tags             TEXT[] NOT NULL DEFAULT '{}',
  sort_order       SMALLINT NOT NULL DEFAULT 0,
  view_count       INTEGER NOT NULL DEFAULT 0,
  author_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_items_slug        ON public.content_items(slug);
CREATE INDEX idx_content_items_status      ON public.content_items(status);
CREATE INDEX idx_content_items_category    ON public.content_items(category_id);
CREATE INDEX idx_content_items_access      ON public.content_items(access_level);
CREATE INDEX idx_content_items_published   ON public.content_items(published_at DESC NULLS LAST);

CREATE TRIGGER content_items_updated_at
  BEFORE UPDATE ON public.content_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── CONTENT ASSIGNMENTS ───────────────────────────────────────────────────
CREATE TABLE public.content_assignments (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id               UUID NOT NULL REFERENCES public.content_items(id) ON DELETE CASCADE,
  assigned_to_student_id   UUID REFERENCES public.students(id) ON DELETE CASCADE,
  assigned_to_plan_id      UUID REFERENCES public.plans(id) ON DELETE CASCADE,
  assigned_by              UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  due_date                 DATE,
  is_completed             BOOLEAN NOT NULL DEFAULT false,
  completed_at             TIMESTAMPTZ,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_assignments_student ON public.content_assignments(assigned_to_student_id);
CREATE INDEX idx_content_assignments_content ON public.content_assignments(content_id);

-- ── VIRTUAL ROOMS ─────────────────────────────────────────────────────────
CREATE TABLE public.virtual_rooms (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  provider          virtual_room_provider NOT NULL DEFAULT 'daily',
  room_url          TEXT,
  provider_room_id  TEXT,
  provider_token    TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  max_participants  SMALLINT,
  scheduled_start   TIMESTAMPTZ,
  scheduled_end     TIMESTAMPTZ,
  created_by        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER virtual_rooms_updated_at
  BEFORE UPDATE ON public.virtual_rooms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── EVENTS ───────────────────────────────────────────────────────────────
CREATE TABLE public.events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  description     TEXT,
  event_type      event_type NOT NULL DEFAULT 'cours',
  start_at        TIMESTAMPTZ NOT NULL,
  end_at          TIMESTAMPTZ NOT NULL,
  status          event_status NOT NULL DEFAULT 'scheduled',
  virtual_room_id UUID REFERENCES public.virtual_rooms(id) ON DELETE SET NULL,
  location        TEXT,
  notes           TEXT,
  created_by      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (end_at > start_at)
);

CREATE INDEX idx_events_start    ON public.events(start_at);
CREATE INDEX idx_events_type     ON public.events(event_type);
CREATE INDEX idx_events_status   ON public.events(status);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── EVENT PARTICIPANTS ────────────────────────────────────────────────────
CREATE TABLE public.event_participants (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id         UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  profile_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_type participant_type NOT NULL DEFAULT 'student',
  status           participant_status NOT NULL DEFAULT 'invited',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, profile_id)
);

CREATE INDEX idx_event_participants_event   ON public.event_participants(event_id);
CREATE INDEX idx_event_participants_profile ON public.event_participants(profile_id);

-- ── BLOG POSTS ────────────────────────────────────────────────────────────
CREATE TABLE public.blog_posts (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  excerpt          TEXT,
  content_html     TEXT,
  cover_image_url  TEXT,
  author_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status           TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  tags             TEXT[] NOT NULL DEFAULT '{}',
  category         TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug      ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status    ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at DESC NULLS LAST);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── NOTIFICATIONS ─────────────────────────────────────────────────────────
CREATE TABLE public.notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  message     TEXT,
  type        notification_type NOT NULL DEFAULT 'info',
  is_read     BOOLEAN NOT NULL DEFAULT false,
  action_url  TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_profile ON public.notifications(profile_id);
CREATE INDEX idx_notifications_read    ON public.notifications(is_read);

-- ── AUDIT LOGS ────────────────────────────────────────────────────────────
CREATE TABLE public.audit_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action        TEXT NOT NULL,
  resource_type TEXT,
  resource_id   UUID,
  metadata      JSONB,
  ip_address    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_actor    ON public.audit_logs(actor_id);
CREATE INDEX idx_audit_logs_action   ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON public.audit_logs(resource_type, resource_id);

-- ── PLATFORM SETTINGS ────────────────────────────────────────────────────
CREATE TABLE public.platform_settings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL,
  description TEXT,
  updated_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_platform_settings_key ON public.platform_settings(key);

-- ── FUNCTION: handle new user ─────────────────────────────────────────────
-- Crée automatiquement un profil quand un utilisateur s'inscrit
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── FUNCTION: get user role ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role::TEXT FROM public.profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── FUNCTION: award XP ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.award_xp(
  p_student_id  UUID,
  p_event_type  TEXT,
  p_points      INTEGER,
  p_description TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Insérer l'événement XP
  INSERT INTO public.xp_events (student_id, event_type, points, description)
  VALUES (p_student_id, p_event_type, p_points, p_description);

  -- Mettre à jour le total XP et le niveau
  UPDATE public.students
  SET
    xp_total = xp_total + p_points,
    level = (
      CASE
        WHEN xp_total + p_points < 100   THEN 1
        WHEN xp_total + p_points < 250   THEN 2
        WHEN xp_total + p_points < 500   THEN 3
        WHEN xp_total + p_points < 1000  THEN 4
        WHEN xp_total + p_points < 2000  THEN 5
        WHEN xp_total + p_points < 3500  THEN 6
        WHEN xp_total + p_points < 5500  THEN 7
        WHEN xp_total + p_points < 8000  THEN 8
        WHEN xp_total + p_points < 11000 THEN 9
        ELSE 10
      END
    ),
    updated_at = NOW()
  WHERE id = p_student_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
