-- ─────────────────────────────────────────────────────────────────────────
-- Migration 004 : Contenu théorique des modules (socle pédagogique)
-- ─────────────────────────────────────────────────────────────────────────

-- Ajouter les sections de cours sur la table modules
ALTER TABLE public.modules
  ADD COLUMN IF NOT EXISTS lesson_sections JSONB;
-- Format : [{ "titre": "", "contenu": "", "points_cles": [], "exemple": "" }]

-- Ajouter le suivi de lecture du cours sur profile_module_progress
ALTER TABLE public.profile_module_progress
  ADD COLUMN IF NOT EXISTS lesson_read       BOOLEAN    NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lesson_read_at    TIMESTAMPTZ;
