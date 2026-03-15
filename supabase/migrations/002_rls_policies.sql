-- ─────────────────────────────────────────────────────────────────────────
-- Migration 002 : Row Level Security Policies
-- ─────────────────────────────────────────────────────────────────────────

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_goals        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_events            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_categories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_assignments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_rooms        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings    ENABLE ROW LEVEL SECURITY;

-- ── Helper: vérifier si l'utilisateur est admin ───────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── Helper: vérifier si parent d'un élève ────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_parent_of(student_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.parent_student_links
    WHERE parent_id = auth.uid() AND student_id = student_uuid
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── PROFILES ─────────────────────────────────────────────────────────────
-- Chacun voit son propre profil, les admins voient tout
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (id = auth.uid());

-- ── STUDENTS ─────────────────────────────────────────────────────────────
-- L'élève voit son propre profil, les parents voient leurs enfants, les admins voient tout
CREATE POLICY "students_select" ON public.students
  FOR SELECT USING (
    profile_id = auth.uid()
    OR public.is_parent_of(id)
    OR public.is_admin()
  );

CREATE POLICY "students_insert_parent" ON public.students
  FOR INSERT WITH CHECK (
    parent_id = auth.uid()
    OR public.is_admin()
  );

CREATE POLICY "students_update" ON public.students
  FOR UPDATE USING (
    profile_id = auth.uid()
    OR public.is_parent_of(id)
    OR public.is_admin()
  );

CREATE POLICY "students_delete_admin" ON public.students
  FOR DELETE USING (public.is_admin());

-- ── PARENT_STUDENT_LINKS ──────────────────────────────────────────────────
CREATE POLICY "psl_select" ON public.parent_student_links
  FOR SELECT USING (
    parent_id = auth.uid()
    OR student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "psl_insert" ON public.parent_student_links
  FOR INSERT WITH CHECK (parent_id = auth.uid() OR public.is_admin());

CREATE POLICY "psl_delete" ON public.parent_student_links
  FOR DELETE USING (parent_id = auth.uid() OR public.is_admin());

-- ── PLANS ─────────────────────────────────────────────────────────────────
-- Les plans actifs sont publics, modification admin seulement
CREATE POLICY "plans_select_active" ON public.plans
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "plans_insert_admin" ON public.plans
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "plans_update_admin" ON public.plans
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "plans_delete_admin" ON public.plans
  FOR DELETE USING (public.is_admin());

-- ── SUBSCRIPTIONS ─────────────────────────────────────────────────────────
CREATE POLICY "subscriptions_select_own" ON public.subscriptions
  FOR SELECT USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "subscriptions_insert_admin" ON public.subscriptions
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "subscriptions_update_admin" ON public.subscriptions
  FOR UPDATE USING (public.is_admin());

-- ── PAYMENTS ──────────────────────────────────────────────────────────────
CREATE POLICY "payments_select_own" ON public.payments
  FOR SELECT USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "payments_insert_admin" ON public.payments
  FOR INSERT WITH CHECK (public.is_admin());

-- ── GOALS ────────────────────────────────────────────────────────────────
-- Goals sont lisibles par tous les utilisateurs authentifiés, modifiables par admin
CREATE POLICY "goals_select_auth" ON public.goals
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "goals_insert_admin" ON public.goals
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "goals_update_admin" ON public.goals
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "goals_delete_admin" ON public.goals
  FOR DELETE USING (public.is_admin());

-- ── STUDENT_GOALS ─────────────────────────────────────────────────────────
CREATE POLICY "student_goals_select" ON public.student_goals
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_parent_of(student_id)
    OR public.is_admin()
  );

CREATE POLICY "student_goals_insert" ON public.student_goals
  FOR INSERT WITH CHECK (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_parent_of(student_id)
    OR public.is_admin()
  );

CREATE POLICY "student_goals_update" ON public.student_goals
  FOR UPDATE USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_admin()
  );

-- ── BADGES ───────────────────────────────────────────────────────────────
-- Tous peuvent voir les badges actifs
CREATE POLICY "badges_select" ON public.badges
  FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "badges_insert_admin" ON public.badges
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "badges_update_admin" ON public.badges
  FOR UPDATE USING (public.is_admin());

-- ── STUDENT_BADGES ────────────────────────────────────────────────────────
CREATE POLICY "student_badges_select" ON public.student_badges
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_parent_of(student_id)
    OR public.is_admin()
  );

CREATE POLICY "student_badges_insert_admin" ON public.student_badges
  FOR INSERT WITH CHECK (public.is_admin());

-- ── XP_EVENTS ────────────────────────────────────────────────────────────
CREATE POLICY "xp_events_select" ON public.xp_events
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_parent_of(student_id)
    OR public.is_admin()
  );

CREATE POLICY "xp_events_insert_admin" ON public.xp_events
  FOR INSERT WITH CHECK (public.is_admin());

-- ── CONTENT_CATEGORIES ────────────────────────────────────────────────────
CREATE POLICY "content_categories_select" ON public.content_categories
  FOR SELECT USING (auth.uid() IS NOT NULL OR public.is_admin());

CREATE POLICY "content_categories_write_admin" ON public.content_categories
  FOR ALL USING (public.is_admin());

-- ── CONTENT_ITEMS ─────────────────────────────────────────────────────────
-- Public: items with access_level 'public' and status 'published'
-- Subscribers: all published items except 'student_specific' + 'plan_specific'
-- Admin: everything
CREATE POLICY "content_items_select_public" ON public.content_items
  FOR SELECT USING (
    (status = 'published' AND access_level = 'public')
    OR (
      auth.uid() IS NOT NULL
      AND status = 'published'
      AND access_level IN ('all_subscribers', 'plan_specific')
    )
    OR (
      auth.uid() IS NOT NULL
      AND status = 'published'
      AND access_level = 'student_specific'
      AND id IN (
        SELECT content_id FROM public.content_assignments
        WHERE assigned_to_student_id IN (
          SELECT id FROM public.students WHERE profile_id = auth.uid()
        )
      )
    )
    OR public.is_admin()
  );

CREATE POLICY "content_items_write_admin" ON public.content_items
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "content_items_update_admin" ON public.content_items
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "content_items_delete_admin" ON public.content_items
  FOR DELETE USING (public.is_admin());

-- ── CONTENT_ASSIGNMENTS ───────────────────────────────────────────────────
CREATE POLICY "content_assignments_select" ON public.content_assignments
  FOR SELECT USING (
    assigned_to_student_id IN (SELECT id FROM public.students WHERE profile_id = auth.uid())
    OR public.is_parent_of(COALESCE(assigned_to_student_id, uuid_nil()))
    OR public.is_admin()
  );

CREATE POLICY "content_assignments_write_admin" ON public.content_assignments
  FOR ALL USING (public.is_admin());

-- ── VIRTUAL_ROOMS ─────────────────────────────────────────────────────────
CREATE POLICY "virtual_rooms_select" ON public.virtual_rooms
  FOR SELECT USING (
    is_active = true
    AND (
      auth.uid() IS NOT NULL
      OR public.is_admin()
    )
  );

CREATE POLICY "virtual_rooms_write_admin" ON public.virtual_rooms
  FOR ALL USING (public.is_admin());

-- ── EVENTS ───────────────────────────────────────────────────────────────
CREATE POLICY "events_select" ON public.events
  FOR SELECT USING (
    id IN (
      SELECT event_id FROM public.event_participants WHERE profile_id = auth.uid()
    )
    OR public.is_admin()
  );

CREATE POLICY "events_write_admin" ON public.events
  FOR ALL USING (public.is_admin());

-- ── EVENT_PARTICIPANTS ────────────────────────────────────────────────────
CREATE POLICY "event_participants_select" ON public.event_participants
  FOR SELECT USING (
    profile_id = auth.uid()
    OR event_id IN (
      SELECT event_id FROM public.event_participants WHERE profile_id = auth.uid()
    )
    OR public.is_admin()
  );

CREATE POLICY "event_participants_write_admin" ON public.event_participants
  FOR ALL USING (public.is_admin());

-- ── BLOG_POSTS ────────────────────────────────────────────────────────────
CREATE POLICY "blog_posts_select_public" ON public.blog_posts
  FOR SELECT USING (status = 'published' OR public.is_admin());

CREATE POLICY "blog_posts_write_admin" ON public.blog_posts
  FOR ALL USING (public.is_admin());

-- ── NOTIFICATIONS ─────────────────────────────────────────────────────────
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE USING (profile_id = auth.uid() OR public.is_admin());

CREATE POLICY "notifications_insert_admin" ON public.notifications
  FOR INSERT WITH CHECK (public.is_admin());

-- ── AUDIT_LOGS ────────────────────────────────────────────────────────────
CREATE POLICY "audit_logs_select_admin" ON public.audit_logs
  FOR SELECT USING (public.is_admin());

CREATE POLICY "audit_logs_insert" ON public.audit_logs
  FOR INSERT WITH CHECK (actor_id = auth.uid() OR public.is_admin());

-- ── PLATFORM_SETTINGS ─────────────────────────────────────────────────────
CREATE POLICY "platform_settings_select_admin" ON public.platform_settings
  FOR SELECT USING (public.is_admin());

CREATE POLICY "platform_settings_write_admin" ON public.platform_settings
  FOR ALL USING (public.is_admin());
