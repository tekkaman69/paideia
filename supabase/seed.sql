-- ─────────────────────────────────────────────────────────────────────────
-- Seed Paideia : données de démonstration
-- ─────────────────────────────────────────────────────────────────────────

-- Plans d'abonnement
INSERT INTO public.plans (id, name, slug, description, price_monthly, price_yearly, features, has_virtual_class, max_students, sessions_per_month, sort_order) VALUES
(
  'a1b2c3d4-0000-0000-0000-000000000001',
  'Découverte',
  'decouverte',
  'Idéal pour commencer et découvrir la plateforme Paideia.',
  2900,
  29000,
  ARRAY['Accès à tous les contenus pédagogiques', '2 séances par mois', 'Suivi de progression', 'Support par email'],
  false, 1, 2, 1
),
(
  'a1b2c3d4-0000-0000-0000-000000000002',
  'Essentiel',
  'essentiel',
  'La formule complète pour un accompagnement régulier et efficace.',
  4900,
  49000,
  ARRAY['Tout le plan Découverte', '4 séances par mois', 'Classe virtuelle incluse', 'Objectifs personnalisés', 'Rapports de progression'],
  true, 2, 4, 2
),
(
  'a1b2c3d4-0000-0000-0000-000000000003',
  'Premium',
  'premium',
  'L''accompagnement le plus complet pour des résultats exceptionnels.',
  7900,
  79000,
  ARRAY['Tout le plan Essentiel', 'Séances illimitées', 'Jusqu''à 3 élèves', 'Suivi parental renforcé', 'Support prioritaire', 'Bilan mensuel'],
  true, 3, NULL, 3
);

-- Objectifs pédagogiques
INSERT INTO public.goals (title, description, category, xp_reward, icon, color, sort_order) VALUES
('Maîtriser les tables de multiplication', 'Apprendre et réciter parfaitement les tables de 1 à 12', 'Mathématiques', 100, '✕', '#3B82F6', 1),
('Lire 5 livres ce trimestre', 'Lire des ouvrages adaptés à son niveau et en rendre compte', 'Lecture', 150, '📚', '#10B981', 2),
('Améliorer l''orthographe', 'Réduire les erreurs d''orthographe de 50%', 'Français', 120, '✏️', '#F59E0B', 3),
('Maîtriser les fractions', 'Comprendre et calculer avec les fractions simples', 'Mathématiques', 100, '÷', '#3B82F6', 4),
('Apprendre 50 nouveaux mots de vocabulaire', 'Enrichir son vocabulaire avec des mots du quotidien et scolaires', 'Français', 80, '💬', '#8B5CF6', 5),
('Compléter un projet de sciences', 'Réaliser une expérience scientifique et rédiger un compte-rendu', 'Sciences', 200, '🔬', '#06B6D4', 6),
('Réciter 10 dates historiques', 'Mémoriser les dates clés de l''histoire de France', 'Histoire', 90, '🏛️', '#D97706', 7),
('Progression en anglais', 'Atteindre le niveau A2 en expression orale', 'Anglais', 130, '🌍', '#EC4899', 8);

-- Badges
INSERT INTO public.badges (key, title, description, icon, xp_required, rarity) VALUES
('premier_pas', 'Premiers Pas', 'Bienvenue sur Paideia ! Tu as complété ton profil.', '🎯', NULL, 'common'),
('scribe', 'Le Scribe', 'Tu as complété ton premier objectif d''écriture.', '✍️', NULL, 'common'),
('explorateur', 'L''Explorateur', 'Tu as consulté 10 ressources pédagogiques.', '🧭', NULL, 'common'),
('stratege', 'Le Stratège', 'Tu as atteint le niveau 3.', '♟️', 500, 'rare'),
('agora', 'L''Agora', 'Tu as participé à ta première classe virtuelle.', '🏛️', NULL, 'rare'),
('philosophe', 'Le Philosophe', 'Tu as atteint le niveau 5.', '🦉', 2000, 'epic'),
('perseverant', 'La Persévérance', 'Tu as maintenu un streak de 7 jours.', '🔥', NULL, 'rare'),
('curieux', 'La Curiosité', 'Tu as consulté 25 ressources différentes.', '🔍', NULL, 'common'),
('champion', 'Le Champion', 'Tu as atteint le niveau maximum !', '🏆', 11000, 'legendary');

-- Catégories de contenu
INSERT INTO public.content_categories (name, slug, description, color, icon, sort_order) VALUES
('Mathématiques', 'mathematiques', 'Cours, exercices et fiches de révision en mathématiques', '#3B82F6', '📐', 1),
('Français', 'francais', 'Grammaire, orthographe, lecture et expression écrite', '#10B981', '📝', 2),
('Sciences', 'sciences', 'Physique-chimie, SVT et sciences de la vie', '#06B6D4', '🔬', 3),
('Histoire-Géographie', 'histoire-geo', 'Histoire, géographie et éducation civique', '#F59E0B', '🗺️', 4),
('Langues', 'langues', 'Anglais, espagnol et autres langues vivantes', '#8B5CF6', '🌍', 5),
('Méthodes', 'methodes', 'Organisation, prise de notes et méthodes de travail', '#EC4899', '🎯', 6);

-- Paramètres de la plateforme
INSERT INTO public.platform_settings (key, value, description) VALUES
('site_name', '"Paideia"', 'Nom de la plateforme'),
('site_description', '"Plateforme d''accompagnement scolaire premium"', 'Description courte'),
('contact_email', '"contact@paideia.fr"', 'Email de contact principal'),
('maintenance_mode', 'false', 'Mode maintenance activé/désactivé'),
('allow_registrations', 'true', 'Autoriser les nouvelles inscriptions'),
('default_plan_id', '"a1b2c3d4-0000-0000-0000-000000000001"', 'Plan par défaut à l''inscription');
