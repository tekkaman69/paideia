-- ─────────────────────────────────────────────────────────────────────────
-- Migration 003 : Système de modules pédagogiques
-- Cohérent avec 001_initial_schema.sql et 002_rls_policies.sql
-- ─────────────────────────────────────────────────────────────────────────

-- ── ENUM nouveaux ─────────────────────────────────────────────────────────
DO $$ BEGIN CREATE TYPE module_audience AS ENUM ('parent', 'eleve', 'both');       EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE module_level    AS ENUM ('decouverte', 'intermediaire', 'avance'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE module_status   AS ENUM ('not_started', 'in_progress', 'completed'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE question_type   AS ENUM ('mcq', 'true_false');              EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE activity_mode   AS ENUM ('solo', 'duo_enfant');             EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── COLONNES SUPPLÉMENTAIRES SUR PROFILES ────────────────────────────────
-- XP et progression pour les parents (symétrique avec students)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS xp_total       INTEGER   NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level          SMALLINT  NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS streak_days    SMALLINT  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ;

-- ── MODULES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.modules (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                  TEXT NOT NULL UNIQUE,
  code                  TEXT NOT NULL UNIQUE,          -- ex: 'M1', 'M2'
  title                 TEXT NOT NULL,
  subtitle              TEXT,
  description           TEXT,
  audience              module_audience NOT NULL DEFAULT 'parent',
  level                 module_level NOT NULL DEFAULT 'decouverte',
  estimated_duration_min SMALLINT,
  cover_image_url       TEXT,
  sort_order            SMALLINT NOT NULL DEFAULT 0,
  is_active             BOOLEAN NOT NULL DEFAULT true,
  xp_reward_quiz        INTEGER NOT NULL DEFAULT 100,  -- XP max quiz
  xp_reward_self_eval   INTEGER NOT NULL DEFAULT 40,   -- XP auto-évaluation
  xp_reward_activity    INTEGER NOT NULL DEFAULT 30,   -- XP activité
  badge_key             TEXT REFERENCES public.badges(key) ON DELETE SET NULL,
  quiz_pass_threshold   SMALLINT NOT NULL DEFAULT 5,   -- score min pour valider
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_modules_slug     ON public.modules(slug);
CREATE INDEX IF NOT EXISTS idx_modules_code     ON public.modules(code);
CREATE INDEX IF NOT EXISTS idx_modules_audience ON public.modules(audience);
CREATE INDEX IF NOT EXISTS idx_modules_active   ON public.modules(is_active);

DROP TRIGGER IF EXISTS modules_updated_at ON public.modules;
CREATE TRIGGER modules_updated_at
  BEFORE UPDATE ON public.modules
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── QUIZ QUESTIONS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id   UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  type        question_type NOT NULL DEFAULT 'mcq',
  text        TEXT NOT NULL,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_module ON public.quiz_questions(module_id);

-- ── QUIZ OPTIONS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_options (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id         UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  text                TEXT NOT NULL,
  is_correct          BOOLEAN NOT NULL DEFAULT false,
  sort_order          SMALLINT NOT NULL DEFAULT 0,
  feedback_correct    TEXT,   -- affiché si cette option est choisie ET correcte
  feedback_incorrect  TEXT    -- affiché si cette option est choisie ET incorrecte
);

CREATE INDEX IF NOT EXISTS idx_quiz_options_question ON public.quiz_options(question_id);

-- ── SELF EVAL ITEMS ───────────────────────────────────────────────────────
-- Items d'auto-évaluation parent (ou élève) liés à un module
CREATE TABLE IF NOT EXISTS public.self_eval_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id   UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  audience    module_audience NOT NULL DEFAULT 'parent',
  text        TEXT NOT NULL,
  weight      NUMERIC(3,1) NOT NULL DEFAULT 1.0,  -- ex: 1.5 pour item pondéré
  sort_order  SMALLINT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_self_eval_items_module ON public.self_eval_items(module_id);

-- ── ACTIVITIES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.activities (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id           UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  slug                TEXT NOT NULL,
  title               TEXT NOT NULL,
  description         TEXT,
  instructions        JSONB NOT NULL DEFAULT '[]',  -- tableau d'étapes
  reflection_prompt   TEXT,
  duration_min        SMALLINT,
  duration_max        SMALLINT,
  xp_solo             INTEGER NOT NULL DEFAULT 20,
  xp_duo              INTEGER NOT NULL DEFAULT 30,
  xp_bonus_reflection INTEGER NOT NULL DEFAULT 10,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(module_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_activities_module ON public.activities(module_id);

-- ── MINI GAMES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.mini_games (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id   UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  slug        TEXT NOT NULL,
  title       TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'flashcard_drag',  -- extensible
  config      JSONB NOT NULL DEFAULT '{}',             -- cartes, règles, etc.
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(module_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_mini_games_module ON public.mini_games(module_id);

-- ── PROFILE MODULE PROGRESS ───────────────────────────────────────────────
-- Progression d'un parent (ou élève via profile_id) sur un module
CREATE TABLE IF NOT EXISTS public.profile_module_progress (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id            UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id             UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  status                module_status NOT NULL DEFAULT 'not_started',
  -- Quiz
  quiz_score            SMALLINT,
  quiz_score_max        SMALLINT,
  quiz_attempts         SMALLINT NOT NULL DEFAULT 0,
  -- Auto-évaluation
  self_eval_score       NUMERIC(5,1),
  self_eval_score_max   NUMERIC(5,1),
  self_eval_answers     JSONB,  -- { item_id: value, ... }
  -- Activité
  activity_completed    BOOLEAN NOT NULL DEFAULT false,
  activity_mode         activity_mode,
  activity_reflection   TEXT,   -- texte libre sauvegardé, privé
  -- Mini jeu
  mini_game_score       SMALLINT,
  -- XP et badge
  xp_earned             INTEGER NOT NULL DEFAULT 0,
  badge_awarded         BOOLEAN NOT NULL DEFAULT false,
  -- Timestamps
  started_at            TIMESTAMPTZ,
  completed_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_pmp_profile ON public.profile_module_progress(profile_id);
CREATE INDEX IF NOT EXISTS idx_pmp_module  ON public.profile_module_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_pmp_status  ON public.profile_module_progress(status);

DROP TRIGGER IF EXISTS profile_module_progress_updated_at ON public.profile_module_progress;
CREATE TRIGGER profile_module_progress_updated_at
  BEFORE UPDATE ON public.profile_module_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── PROFILE BADGES ────────────────────────────────────────────────────────
-- Badges gagnés par les parents (symétrique avec student_badges)
CREATE TABLE IF NOT EXISTS public.profile_badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id    UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, badge_id)
);

CREATE INDEX IF NOT EXISTS idx_profile_badges_profile ON public.profile_badges(profile_id);

-- ── PROFILE XP EVENTS ─────────────────────────────────────────────────────
-- Historique XP des parents (symétrique avec xp_events)
CREATE TABLE IF NOT EXISTS public.profile_xp_events (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type   TEXT NOT NULL,
  points       INTEGER NOT NULL,
  description  TEXT,
  reference_id UUID,   -- ex: profile_module_progress.id
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profile_xp_events_profile ON public.profile_xp_events(profile_id);

-- ── FONCTION: award_profile_xp ────────────────────────────────────────────
-- Symétrique de award_xp() pour les parents
CREATE OR REPLACE FUNCTION public.award_profile_xp(
  p_profile_id  UUID,
  p_event_type  TEXT,
  p_points      INTEGER,
  p_description TEXT DEFAULT NULL,
  p_reference_id UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Insérer l'événement XP
  INSERT INTO public.profile_xp_events (profile_id, event_type, points, description, reference_id)
  VALUES (p_profile_id, p_event_type, p_points, p_description, p_reference_id);

  -- Mettre à jour le total XP et le niveau du profil
  -- Niveaux parent: 1=0-200, 2=201-600, 3=601-1200, 4=1201-2500, 5=2501+
  UPDATE public.profiles
  SET
    xp_total = xp_total + p_points,
    level = (
      CASE
        WHEN xp_total + p_points <= 200  THEN 1
        WHEN xp_total + p_points <= 600  THEN 2
        WHEN xp_total + p_points <= 1200 THEN 3
        WHEN xp_total + p_points <= 2500 THEN 4
        ELSE 5
      END
    ),
    last_activity_at = NOW(),
    updated_at = NOW()
  WHERE id = p_profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── FONCTION: complete_module ─────────────────────────────────────────────
-- Valide un module, attribue XP + badge si conditions remplies
CREATE OR REPLACE FUNCTION public.complete_module(
  p_profile_id   UUID,
  p_module_id    UUID,
  p_quiz_score   SMALLINT,
  p_self_eval_done BOOLEAN DEFAULT false,
  p_activity_done  BOOLEAN DEFAULT false,
  p_activity_mode  activity_mode DEFAULT 'solo',
  p_reflection_written BOOLEAN DEFAULT false
)
RETURNS JSONB AS $$
DECLARE
  v_module        public.modules%ROWTYPE;
  v_progress      public.profile_module_progress%ROWTYPE;
  v_xp_earned     INTEGER := 0;
  v_badge_awarded BOOLEAN := false;
  v_badge_id      UUID;
BEGIN
  -- Récupérer le module
  SELECT * INTO v_module FROM public.modules WHERE id = p_module_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Module not found');
  END IF;

  -- Calculer XP quiz (proportionnel au score)
  IF p_quiz_score IS NOT NULL AND v_module.quiz_score_max > 0 THEN
    v_xp_earned := v_xp_earned + ROUND(
      (p_quiz_score::NUMERIC / v_module.quiz_pass_threshold) * v_module.xp_reward_quiz
    )::INTEGER;
    -- Plafonner à xp_reward_quiz
    v_xp_earned := LEAST(v_xp_earned, v_module.xp_reward_quiz);
  END IF;

  -- XP auto-évaluation
  IF p_self_eval_done THEN
    v_xp_earned := v_xp_earned + v_module.xp_reward_self_eval;
  END IF;

  -- XP activité
  IF p_activity_done THEN
    v_xp_earned := v_xp_earned + CASE
      WHEN p_activity_mode = 'duo_enfant' THEN v_module.xp_reward_activity + 10
      ELSE v_module.xp_reward_activity
    END;
    IF p_reflection_written THEN
      v_xp_earned := v_xp_earned + 10;
    END IF;
  END IF;

  -- Vérifier si badge à attribuer
  IF p_quiz_score >= v_module.quiz_pass_threshold
     AND p_self_eval_done
     AND p_activity_done
     AND v_module.badge_key IS NOT NULL
  THEN
    SELECT id INTO v_badge_id FROM public.badges WHERE key = v_module.badge_key;
    IF FOUND THEN
      INSERT INTO public.profile_badges (profile_id, badge_id)
      VALUES (p_profile_id, v_badge_id)
      ON CONFLICT (profile_id, badge_id) DO NOTHING;
      v_badge_awarded := true;
    END IF;
  END IF;

  -- Mettre à jour ou créer la progression
  INSERT INTO public.profile_module_progress (
    profile_id, module_id, status,
    quiz_score, quiz_score_max,
    self_eval_score, -- à calculer côté app, passé séparément si besoin
    activity_completed, activity_mode,
    xp_earned, badge_awarded,
    started_at, completed_at
  ) VALUES (
    p_profile_id, p_module_id, 'completed',
    p_quiz_score, v_module.quiz_pass_threshold,
    NULL,
    p_activity_done, p_activity_mode,
    v_xp_earned, v_badge_awarded,
    NOW(), NOW()
  )
  ON CONFLICT (profile_id, module_id) DO UPDATE SET
    status             = 'completed',
    quiz_score         = EXCLUDED.quiz_score,
    activity_completed = EXCLUDED.activity_completed,
    activity_mode      = EXCLUDED.activity_mode,
    xp_earned          = EXCLUDED.xp_earned,
    badge_awarded      = EXCLUDED.badge_awarded,
    completed_at       = NOW(),
    updated_at         = NOW();

  -- Attribuer XP au profil
  IF v_xp_earned > 0 THEN
    PERFORM public.award_profile_xp(
      p_profile_id,
      'module_completed',
      v_xp_earned,
      'Module ' || v_module.code || ' : ' || v_module.title,
      p_module_id
    );
  END IF;

  RETURN jsonb_build_object(
    'ok', true,
    'xp_earned', v_xp_earned,
    'badge_awarded', v_badge_awarded,
    'badge_key', v_module.badge_key
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── RLS : nouvelles tables ─────────────────────────────────────────────────
ALTER TABLE public.modules                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.self_eval_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mini_games               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_module_progress  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_badges           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_xp_events        ENABLE ROW LEVEL SECURITY;

-- Modules
DROP POLICY IF EXISTS "modules_read_authenticated" ON public.modules;
DROP POLICY IF EXISTS "modules_admin"               ON public.modules;
CREATE POLICY "modules_read_authenticated" ON public.modules FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "modules_admin"              ON public.modules FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Quiz questions
DROP POLICY IF EXISTS "quiz_questions_read"  ON public.quiz_questions;
DROP POLICY IF EXISTS "quiz_questions_admin" ON public.quiz_questions;
CREATE POLICY "quiz_questions_read"  ON public.quiz_questions FOR SELECT TO authenticated USING (true);
CREATE POLICY "quiz_questions_admin" ON public.quiz_questions FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Quiz options
DROP POLICY IF EXISTS "quiz_options_read"  ON public.quiz_options;
DROP POLICY IF EXISTS "quiz_options_admin" ON public.quiz_options;
CREATE POLICY "quiz_options_read"  ON public.quiz_options FOR SELECT TO authenticated USING (true);
CREATE POLICY "quiz_options_admin" ON public.quiz_options FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Self eval items
DROP POLICY IF EXISTS "self_eval_items_read"  ON public.self_eval_items;
DROP POLICY IF EXISTS "self_eval_items_admin" ON public.self_eval_items;
CREATE POLICY "self_eval_items_read"  ON public.self_eval_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "self_eval_items_admin" ON public.self_eval_items FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Activities
DROP POLICY IF EXISTS "activities_read"  ON public.activities;
DROP POLICY IF EXISTS "activities_admin" ON public.activities;
CREATE POLICY "activities_read"  ON public.activities FOR SELECT TO authenticated USING (true);
CREATE POLICY "activities_admin" ON public.activities FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Mini games
DROP POLICY IF EXISTS "mini_games_read"  ON public.mini_games;
DROP POLICY IF EXISTS "mini_games_admin" ON public.mini_games;
CREATE POLICY "mini_games_read"  ON public.mini_games FOR SELECT TO authenticated USING (true);
CREATE POLICY "mini_games_admin" ON public.mini_games FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Profile module progress
DROP POLICY IF EXISTS "pmp_select_own" ON public.profile_module_progress;
DROP POLICY IF EXISTS "pmp_insert_own" ON public.profile_module_progress;
DROP POLICY IF EXISTS "pmp_update_own" ON public.profile_module_progress;
DROP POLICY IF EXISTS "pmp_admin"      ON public.profile_module_progress;
CREATE POLICY "pmp_select_own" ON public.profile_module_progress FOR SELECT TO authenticated USING (profile_id = auth.uid());
CREATE POLICY "pmp_insert_own" ON public.profile_module_progress FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "pmp_update_own" ON public.profile_module_progress FOR UPDATE TO authenticated USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());
CREATE POLICY "pmp_admin"      ON public.profile_module_progress FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Profile badges
DROP POLICY IF EXISTS "profile_badges_select_own" ON public.profile_badges;
DROP POLICY IF EXISTS "profile_badges_admin"       ON public.profile_badges;
CREATE POLICY "profile_badges_select_own" ON public.profile_badges FOR SELECT TO authenticated USING (profile_id = auth.uid());
CREATE POLICY "profile_badges_admin"      ON public.profile_badges FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Profile XP events
DROP POLICY IF EXISTS "profile_xp_events_select_own" ON public.profile_xp_events;
DROP POLICY IF EXISTS "profile_xp_events_admin"       ON public.profile_xp_events;
CREATE POLICY "profile_xp_events_select_own" ON public.profile_xp_events FOR SELECT TO authenticated USING (profile_id = auth.uid());
CREATE POLICY "profile_xp_events_admin"      ON public.profile_xp_events FOR ALL    TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
