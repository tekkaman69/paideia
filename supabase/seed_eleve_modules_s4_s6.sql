-- ─────────────────────────────────────────────────────────────────────────
-- Seed modules élèves Paideia — Séries 4, 5, 6
-- À exécuter APRÈS seed_eleve_modules_s1_s3.sql
-- ─────────────────────────────────────────────────────────────────────────

-- ═══════════════════════════════════════════════════════════════════════
-- BADGES supplémentaires
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.badges (key, title, description, rarity, criteria) VALUES
  ('e13-decoder-dys',        'Décodeur DYS',             'Tu as des stratégies concrètes pour lire et écrire avec ta façon de traiter l''écrit.',              'epic',      '{"module_code": "E13", "quiz_min": 5}'::jsonb),
  ('e14-communicateur',      'Super communicateur',       'Tu sais te faire comprendre et comprendre les autres dans les situations complexes.',                 'rare',      '{"module_code": "E14", "quiz_min": 5}'::jsonb),
  ('e15-navigateur-social',  'Navigateur social',         'Tu navigues dans les situations sociales avec confiance et assertivité.',                             'rare',      '{"module_code": "E15", "quiz_min": 5}'::jsonb),
  ('e16-gestionnaire-conf',  'Gestionnaire de conflits',  'Tu résous les conflits avec calme et justice.',                                                       'epic',      '{"module_code": "E16", "quiz_min": 5}'::jsonb),
  ('e17-as-des-maths',       'As des maths à ma façon',  'Tu as trouvé tes stratégies pour apprivoiser les maths.',                                             'rare',      '{"module_code": "E17", "quiz_min": 5}'::jsonb),
  ('e18-lecteur-actif',      'Lecteur actif',             'Tu lis avec des stratégies qui t''aident à comprendre et retenir.',                                   'rare',      '{"module_code": "E18", "quiz_min": 5}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- MODULES élèves — Série 4 : J'apprends autrement (E11-E13)
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.modules (id, code, slug, title, subtitle, description, audience, level, estimated_duration_min, sort_order, xp_reward_quiz, xp_reward_self_eval, xp_reward_activity, badge_key, quiz_pass_threshold) VALUES
(
  'e0000000-0000-0000-0000-000000000011', 'E11',
  'apprendre-a-ma-facon',
  'Apprendre à ma façon',
  'Découvrir les stratégies qui marchent vraiment pour TON cerveau',
  'Styles d''apprentissage adaptatifs, multimodalité, méthode de Cornell, sketchnoting, apprentissage par l''enseignement (Feynman).',
  'eleve', 'intermediaire', 30, 40, 100, 40, 30, 'e11-stratege-apprenant', 5
),
(
  'e0000000-0000-0000-0000-000000000012', 'E12',
  'reviser-intelligemment',
  'Réviser intelligemment',
  'Travailler moins mais mieux — les vraies techniques de révision',
  'Révision active vs passive, interleaving, testing effect, planification d''un plan de révision complet avant un examen.',
  'eleve', 'intermediaire', 25, 41, 100, 40, 30, 'e12-expert-revisions', 5
),
(
  'e0000000-0000-0000-0000-000000000013', 'E13',
  'lire-et-ecrire-avec-dys',
  'Lire et écrire avec DYS',
  'Des outils concrets pour les profils dyslexiques et dysorthographiques',
  'Stratégies de décodage, lecteurs vocaux, mind mapping pour l''écrit, orthographe par la mémoire visuelle, outils numériques adaptés.',
  'eleve', 'intermediaire', 30, 42, 100, 40, 30, 'e13-decoder-dys', 5
),
-- Série 5 : Je vis avec les autres (E14-E16)
(
  'e0000000-0000-0000-0000-000000000014', 'E14',
  'me-faire-comprendre',
  'Me faire comprendre',
  'Communiquer ce que je vis sans que ça devienne une dispute',
  'Communication non-violente adaptée enfant, exprimer ses besoins, demander des aménagements, savoir dire non, l''assertivité.',
  'eleve', 'intermediaire', 25, 50, 100, 40, 30, 'e14-communicateur', 5
),
(
  'e0000000-0000-0000-0000-000000000015', 'E15',
  'lamitie-et-moi',
  'L''amitié et moi',
  'Naviguer dans les relations sociales quand on fonctionne différemment',
  'Codes sociaux implicites, trouver sa tribu, gérer les malentendus, différence entre amis et connaissances, solitude choisie vs subie.',
  'eleve', 'intermediaire', 25, 51, 100, 40, 30, 'e15-navigateur-social', 5
),
(
  'e0000000-0000-0000-0000-000000000016', 'E16',
  'gerer-conflits-injustices',
  'Gérer les conflits et les injustices',
  'Quand c''est pas juste — sans tout faire exploser',
  'Résolution de conflits, harcèlement scolaire (reconnaître et réagir), la colère juste, demander de l''aide aux adultes efficacement.',
  'eleve', 'avance', 30, 52, 100, 40, 30, 'e16-gestionnaire-conf', 5
),
-- Série 6 : Mes compétences scolaires (E17-E18 — parallèles, libres d'accès)
(
  'e0000000-0000-0000-0000-000000000017', 'E17',
  'les-maths-a-ma-facon',
  'Les maths à ma façon',
  'Stratégies concrètes pour apprivoiser les nombres',
  'Dyscalculie et TDAH en maths, méthodes de calcul alternatives, matériel concret (doigts, réglettes), automatisation des tables, résolution de problèmes étape par étape.',
  'eleve', 'decouverte', 30, 60, 100, 40, 30, 'e17-as-des-maths', 5
),
(
  'e0000000-0000-0000-0000-000000000018', 'E18',
  'comprendre-ce-que-je-lis',
  'Comprendre ce que je lis',
  'Lire pour comprendre vraiment — pas juste déchiffrer',
  'Compréhension en lecture (inférences, idée principale), lecture active avec questions, résumé et carte mentale après lecture, lire avec stratégies de prédiction.',
  'eleve', 'decouverte', 25, 61, 100, 40, 30, 'e18-lecteur-actif', 5
)
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E11 : Apprendre à ma façon
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E11') m,
(VALUES
  ('ea010000-0000-0000-0000-000000000001'::uuid, 'Apprendre de façon "multimodale" signifie :', 1),
  ('ea020000-0000-0000-0000-000000000002'::uuid, 'Le sketchnoting (prise de notes dessinée) est efficace parce que :', 2),
  ('ea030000-0000-0000-0000-000000000003'::uuid, 'La méthode Feynman consiste à :', 3),
  ('ea040000-0000-0000-0000-000000000004'::uuid, 'Pourquoi reformuler avec ses propres mots aide-t-il à apprendre ?', 4),
  ('ea050000-0000-0000-0000-000000000005'::uuid, 'La carte mentale (mind map) est particulièrement utile pour les apprenants qui :', 5),
  ('ea060000-0000-0000-0000-000000000006'::uuid, 'L''interleaving (mélanger les sujets) est plus efficace que de travailler un seul sujet en bloc parce que :', 6),
  ('ea070000-0000-0000-0000-000000000007'::uuid, 'Si une méthode marche bien pour ton camarade mais pas pour toi, tu dois :', 7),
  ('ea080000-0000-0000-0000-000000000008'::uuid, 'Expliquer un concept à quelqu''un d''autre est un excellent outil d''apprentissage parce que :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea010000-0000-0000-0000-000000000001', 'Apprendre plusieurs langues en même temps', false, 1, NULL, 'Non — multimodal parle des sens et canaux utilisés pour apprendre, pas des langues.'),
('ea010000-0000-0000-0000-000000000001', 'Utiliser plusieurs sens et formats (visuel, auditif, kinesthésique, écrit) pour apprendre la même chose', true, 2, 'Exactement ! Quand tu lis, dessines, écoutes ET manipules le même concept, les connexions neurologiques sont plus fortes et plus durables.', NULL),
('ea010000-0000-0000-0000-000000000001', 'Apprendre en regardant des vidéos uniquement', false, 3, NULL, 'Les vidéos sont un canal (visuel/auditif), mais la multimodalité combine plusieurs canaux différents.'),
('ea010000-0000-0000-0000-000000000001', 'Apprendre dans plusieurs pièces différentes', false, 4, NULL, 'Changer d''endroit peut aider la mémorisation (principe du contexte), mais ce n''est pas ce que veut dire multimodal.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea020000-0000-0000-0000-000000000002', 'Les dessins sont plus jolis que les textes', false, 1, NULL, 'L''esthétique peut aider la motivation, mais l''efficacité du sketchnoting est neurologique.'),
('ea020000-0000-0000-0000-000000000002', 'Il force le cerveau à traiter, comprendre et encoder visuellement l''information en même temps', true, 2, 'Parfait ! Dessiner une idée, ce n''est pas la copier — c''est la comprendre. Le double encodage (verbal + visuel) crée des traces mémorielles plus riches.', NULL),
('ea020000-0000-0000-0000-000000000002', 'Il est plus rapide que d''écrire', false, 3, NULL, 'Le sketchnoting n''est pas forcément plus rapide — il est plus efficace pour l''encodage et la mémorisation.'),
('ea020000-0000-0000-0000-000000000002', 'Il permet d''éviter d''écrire beaucoup de texte', false, 4, NULL, 'Réduire le texte est un avantage pour les DYS, mais ce n''est pas l''effet principal sur l''apprentissage.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea030000-0000-0000-0000-000000000003', 'Lire un texte le plus vite possible', false, 1, NULL, 'Non — la méthode Feynman est plus profonde que ça.'),
('ea030000-0000-0000-0000-000000000003', 'Expliquer ce qu''on vient d''apprendre comme si on l''enseignait à un enfant de 10 ans', true, 2, 'Exactement ! Richard Feynman (Prix Nobel de physique) utilisait cette méthode. Si tu peux expliquer simplement, tu comprends vraiment. Si tu bloques, tu sais exactement où retravailler.', NULL),
('ea030000-0000-0000-0000-000000000003', 'Mémoriser par cœur toutes les formules', false, 3, NULL, 'Feynman était contre la mémorisation sans compréhension. L''objectif est la compréhension profonde.'),
('ea030000-0000-0000-0000-000000000003', 'Faire beaucoup d''exercices répétitifs', false, 4, NULL, 'La pratique aide, mais la méthode Feynman met l''accent sur l''explication et la simplification.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea040000-0000-0000-0000-000000000004', 'Le cerveau traite plus profondément ce qu''il reconstruit activement', true, 1, 'Oui ! Reformuler force le cerveau à traiter le sens, pas juste les mots. C''est la différence entre comprendre et répéter — une trace mémorielle bien plus solide.', NULL),
('ea040000-0000-0000-0000-000000000004', 'Les professeurs préfèrent les reformulations', false, 2, NULL, 'Les profs apprécient souvent les reformulations — mais l''avantage est avant tout neurologique, pas social.'),
('ea040000-0000-0000-0000-000000000004', 'On évite de copier et d''être accusé de plagiat', false, 3, NULL, 'Éviter le plagiat est un bonus — l''effet sur l''apprentissage est la vraie raison de reformuler.'),
('ea040000-0000-0000-0000-000000000004', 'C''est plus court que de copier mot à mot', false, 4, NULL, 'La longueur n''est pas le critère — la profondeur du traitement est ce qui compte.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea050000-0000-0000-0000-000000000005', 'Pensent de façon linéaire, une idée après l''autre', false, 1, NULL, 'Les cartes mentales sont justement non-linéaires — elles conviennent plutôt aux penseurs globaux.'),
('ea050000-0000-0000-0000-000000000005', 'Pensent en "toile d''araignée" — voient les connexions entre idées', true, 2, 'Exactement ! Les cartes mentales reflètent la façon dont le cerveau connecte naturellement les informations. Très adapté aux profils qui voient d''abord le tableau d''ensemble.', NULL),
('ea050000-0000-0000-0000-000000000005', 'Aiment les listes et l''ordre', false, 3, NULL, 'Les listes sont plus adaptées aux penseurs séquentiels. Les cartes mentales sont pour les penseurs relationnels.'),
('ea050000-0000-0000-0000-000000000005', 'Ont du mal à dessiner', false, 4, NULL, 'Les cartes mentales ne demandent pas de savoir bien dessiner — juste de connecter des mots et des idées.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea060000-0000-0000-0000-000000000006', 'Ça force le cerveau à distinguer activement les concepts similaires', true, 1, 'Parfait ! Alterner entre sujets proches (géométrie/algèbre, imparfait/passé composé) force le cerveau à discriminer — ce qui renforce la compréhension et le transfert vers des situations nouvelles.', NULL),
('ea060000-0000-0000-0000-000000000006', 'Ça prend moins de temps', false, 2, NULL, 'L''interleaving peut prendre plus de temps — mais l''efficacité de mémorisation est supérieure.'),
('ea060000-0000-0000-0000-000000000006', 'Ça évite de s''ennuyer', false, 3, NULL, 'La variété peut aider la motivation, mais l''effet sur l''apprentissage est neurologique et profond.'),
('ea060000-0000-0000-0000-000000000006', 'Ça permet de tout faire en même temps', false, 4, NULL, 'L''interleaving n''est pas du multitasking — on alterne, on ne fait pas tout en même temps.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea070000-0000-0000-0000-000000000007', 'Adopter sa méthode parce que c''est lui qui a raison', false, 1, NULL, 'Non ! Ce qui marche pour quelqu''un d''autre peut ne pas marcher pour toi — et ce n''est pas un problème.'),
('ea070000-0000-0000-0000-000000000007', 'Continuer à chercher ce qui marche pour TON cerveau', true, 2, 'Exactement ! Il n''y a pas de méthode universelle. Expérimenter et observer ce qui marche pour toi est la clé. Ton profil cognitif est unique.', NULL),
('ea070000-0000-0000-0000-000000000007', 'Conclure que tu es moins doué que lui', false, 3, NULL, 'Absolument pas ! Les méthodes ne sont pas universelles. Une méthode inadaptée à ton profil n''est pas un signe de moins grande intelligence.'),
('ea070000-0000-0000-0000-000000000007', 'Mélanger sa méthode avec la tienne pour être sûr', false, 4, NULL, 'Mélanger peut parfois aider, mais le plus important est de tester et observer ce qui produit des résultats pour toi spécifiquement.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ea080000-0000-0000-0000-000000000008', 'Tu fais plaisir à l''autre personne', false, 1, NULL, 'Aider les autres est sympa, mais l''avantage sur l''apprentissage est bien plus profond.'),
('ea080000-0000-0000-0000-000000000008', 'Tu identifies immédiatement ce que tu n''as pas vraiment compris', true, 2, 'Exactement ! C''est l''effet Feynman — quand tu bloques sur une explication, tu repères exactement le trou dans ta compréhension. Et enseigner force le cerveau à organiser l''information différemment.', NULL),
('ea080000-0000-0000-0000-000000000008', 'Tu révises deux fois plus vite', false, 3, NULL, 'L''objectif n''est pas la vitesse — c''est la profondeur de compréhension.'),
('ea080000-0000-0000-0000-000000000008', 'Tu es dispensé de faire les exercices ensuite', false, 4, NULL, 'Enseigner aide beaucoup à comprendre, mais la pratique d''exercices reste souvent nécessaire.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E12 : Réviser intelligemment
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E12') m,
(VALUES
  ('eb010000-0000-0000-0000-000000000001'::uuid, 'La différence entre révision active et passive est :', 1),
  ('eb020000-0000-0000-0000-000000000002'::uuid, 'Commencer à réviser 3 semaines avant un examen plutôt que la veille est utile parce que :', 2),
  ('eb030000-0000-0000-0000-000000000003'::uuid, 'Lors de l''auto-test (se poser des questions), l''erreur est :', 3),
  ('eb040000-0000-0000-0000-000000000004'::uuid, 'Travailler plusieurs sujets différents dans la même session (interleaving) aide parce que :', 4),
  ('eb050000-0000-0000-0000-000000000005'::uuid, 'L''effet d''espacement (spaced repetition) dit que :', 5),
  ('eb060000-0000-0000-0000-000000000006'::uuid, 'La meilleure façon de savoir si tu es vraiment prêt pour un contrôle est :', 6),
  ('eb070000-0000-0000-0000-000000000007'::uuid, 'Réviser dans le même contexte que celui de l''examen aide parce que :', 7),
  ('eb080000-0000-0000-0000-000000000008'::uuid, 'Un plan de révision efficace doit inclure :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb010000-0000-0000-0000-000000000001', 'La révision active est plus longue', false, 1, NULL, 'Pas forcément plus longue — mais bien plus efficace même en moins de temps.'),
('eb010000-0000-0000-0000-000000000001', 'La révision active engage le cerveau (se tester, résumer, enseigner) ; la passive le laisse spectateur (relire, regarder)', true, 2, 'Parfait ! La révision passive crée une illusion de maîtrise. La révision active force la récupération et l''utilisation réelle de l''information — ce qui crée de vraies traces mémorielles.', NULL),
('eb010000-0000-0000-0000-000000000001', 'La révision passive n''existe pas vraiment', false, 3, NULL, 'Si — relire passivement sans s''interroger est de la révision passive. Et elle est nettement moins efficace.'),
('eb010000-0000-0000-0000-000000000001', 'Elles sont également efficaces si on est concentré', false, 4, NULL, 'Non — la concentration aide toujours, mais le type d''engagement (actif vs passif) fait une différence majeure sur la mémorisation.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb020000-0000-0000-0000-000000000002', 'On a plus de temps pour bachoter', false, 1, NULL, 'Commencer tôt permet la révision espacée — pas juste plus de bachotage.'),
('eb020000-0000-0000-0000-000000000002', 'On peut utiliser la révision espacée avec des intervalles croissants qui ancrent durablement', true, 2, 'Exactement ! Commencer tôt = révision j-21, j-14, j-7, j-3, j-1. Chaque révision renforce et les intervalles permettent au cerveau de consolider entre chaque session.', NULL),
('eb020000-0000-0000-0000-000000000002', 'On évite le stress de la veille', false, 3, NULL, 'Éviter le stress est un bénéfice, mais l''effet principal est neurologique : la révision espacée ancre dans la mémoire long terme.'),
('eb020000-0000-0000-0000-000000000002', 'Les professeurs sont mieux disposés envers ceux qui commencent tôt', false, 4, NULL, 'Les profs ne savent généralement pas quand tu commences — l''avantage est pour TOI, pas pour eux.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb030000-0000-0000-0000-000000000003', 'Un signe d''échec à éviter', false, 1, NULL, 'L''erreur lors de l''auto-test est précieuse — c''est une information, pas un échec.'),
('eb030000-0000-0000-0000-000000000003', 'Une information précieuse qui indique exactement où retravailler', true, 2, 'Parfait ! Se tromper lors de l''auto-test et le découvrir AVANT l''examen est le meilleur scénario possible. L''erreur dirigée est le cœur de l''apprentissage actif.', NULL),
('eb030000-0000-0000-0000-000000000003', 'Prouve qu''on n''est pas prêt et qu''il faut tout recommencer', false, 3, NULL, 'Non — une erreur ciblée montre exactement quoi retravailler. C''est bien plus efficace que de tout recommencer.'),
('eb030000-0000-0000-0000-000000000003', 'Rare si on a bien lu le cours', false, 4, NULL, 'Avoir lu le cours ne garantit pas de se rappeler — c''est précisément pourquoi l''auto-test révèle des erreurs que la relecture masque.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb040000-0000-0000-0000-000000000004', 'Ça évite de s''ennuyer sur un même sujet', false, 1, NULL, 'La variété peut aider la motivation, mais l''effet sur l''apprentissage est plus profond.'),
('eb040000-0000-0000-0000-000000000004', 'Ça force le cerveau à discriminer entre les concepts et à mieux les transférer', true, 2, 'Oui ! Alterner imparfait/passé composé force le cerveau à distinguer les deux — bien plus efficace que de les réviser séparément en blocs isolés.', NULL),
('eb040000-0000-0000-0000-000000000004', 'Ça permet de finir les révisions plus vite', false, 3, NULL, 'L''interleaving n''est pas forcément plus rapide — il est plus efficace pour la compréhension profonde.'),
('eb040000-0000-0000-0000-000000000004', 'Ça imite ce qui se passe à l''examen où tout est mélangé', false, 4, NULL, 'C''est vrai et utile — mais l''effet neurologique profond est la discrimination active entre concepts, pas juste la simulation d''examen.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb050000-0000-0000-0000-000000000005', 'Il faut réviser plus longtemps pour mieux mémoriser', false, 1, NULL, 'La durée n''est pas le critère — c''est le timing (juste avant d''oublier) et la fréquence croissante.'),
('eb050000-0000-0000-0000-000000000005', 'Réviser juste avant d''oublier (intervalles croissants) maximise la mémorisation', true, 2, 'Exactement ! La courbe d''Ebbinghaus montre qu''on oublie vite. Réviser juste avant d''oublier "relance" la trace mémorielle au moment optimal — et l''interval peut s''allonger à chaque fois.', NULL),
('eb050000-0000-0000-0000-000000000005', 'Il faut attendre longtemps entre deux révisions', false, 3, NULL, 'L''intervalle augmente progressivement — mais doit être calibré sur la vitesse d''oubli, pas être trop long.'),
('eb050000-0000-0000-0000-000000000005', 'La fréquence des révisions n''a pas d''importance', false, 4, NULL, 'La fréquence ET le timing sont essentiels. C''est l''ensemble (intervalles croissants) qui produit l''effet d''espacement.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb060000-0000-0000-0000-000000000006', 'Quand tu as tout relu plusieurs fois', false, 1, NULL, 'Relire crée une impression de familiarité — pas forcément de vraie maîtrise.'),
('eb060000-0000-0000-0000-000000000006', 'Quand tu peux répondre aux questions sans regarder tes notes', true, 2, 'Exactement ! Le seul vrai test de préparation est la récupération sans aide. Si tu peux expliquer ou répondre de mémoire, tu es prêt.', NULL),
('eb060000-0000-0000-0000-000000000006', 'Quand tu as passé assez d''heures à réviser', false, 3, NULL, 'Le temps passé n''est pas le bon indicateur — la qualité et la méthode de révision le sont.'),
('eb060000-0000-0000-0000-000000000006', 'Quand tu as fait tous les exercices du livre', false, 4, NULL, 'Faire les exercices aide, mais le test ultime reste la récupération de mémoire sans aide.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb070000-0000-0000-0000-000000000007', 'C''est plus agréable et moins stressant', false, 1, NULL, 'Le confort peut aider, mais l''effet est neurologique — lié à la mémoire contextuelle.'),
('eb070000-0000-0000-0000-000000000007', 'La mémoire est contextuelle — les indices de l''environnement facilitent la récupération', true, 2, 'Oui ! Si tu révises dans le silence, il est plus facile de retrouver les informations dans un examen silencieux. Certains étudiants mâchent le même chewing-gum à la révision et à l''examen — et ça marche !', NULL),
('eb070000-0000-0000-0000-000000000007', 'Les professeurs évaluent mieux ceux qui ont révisé dans de bonnes conditions', false, 3, NULL, 'Les profs ne savent pas dans quelles conditions tu as révisé. L''effet est sur ta propre mémoire.'),
('eb070000-0000-0000-0000-000000000007', 'Ça n''a aucun effet réel', false, 4, NULL, 'Si ! La mémoire dépendante du contexte est un phénomène bien documenté en psychologie cognitive.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('eb080000-0000-0000-0000-000000000008', 'Une liste de tout ce qu''il faut apprendre', false, 1, NULL, 'Une liste est un début, mais un plan doit inclure quand, comment et comment vérifier la maîtrise.'),
('eb080000-0000-0000-0000-000000000008', 'Des sessions spécifiques, des méthodes actives, des auto-tests et du temps de récupération (sommeil)', true, 2, 'Parfait ! Un plan de révision efficace combine : calendrier d''intervalles espacés, méthodes actives (flashcards, Feynman), auto-tests réguliers, et assez de sommeil pour consolider.', NULL),
('eb080000-0000-0000-0000-000000000008', 'Uniquement du temps de révision sans breaks', false, 3, NULL, 'Les pauses et le sommeil sont des parties essentielles du plan — pas des extras.'),
('eb080000-0000-0000-0000-000000000008', 'Une playlist de musique pour se motiver', false, 4, NULL, 'La musique peut aider la motivation, mais elle ne fait pas partie du plan de révision en lui-même.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E13 : Lire et écrire avec DYS
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E13') m,
(VALUES
  ('ec010000-0000-0000-0000-000000000001'::uuid, 'Un lecteur vocal (text-to-speech) aide les élèves dyslexiques parce que :', 1),
  ('ec020000-0000-0000-0000-000000000002'::uuid, 'La police de caractères OpenDyslexic est conçue pour :', 2),
  ('ec030000-0000-0000-0000-000000000003'::uuid, 'Pour un élève dysorthographique, le correcteur orthographique informatique est :', 3),
  ('ec040000-0000-0000-0000-000000000004'::uuid, 'Le mind mapping (carte mentale) aide à l''écrit parce que :', 4),
  ('ec050000-0000-0000-0000-000000000005'::uuid, 'Utiliser le doigt ou une règle pour suivre les lignes quand on lit :', 5),
  ('ec060000-0000-0000-0000-000000000006'::uuid, 'La méthode de lecture à voix haute aide la compréhension parce que :', 6),
  ('ec070000-0000-0000-0000-000000000007'::uuid, 'Pour mémoriser l''orthographe d''un mot difficile, une bonne stratégie est :', 7),
  ('ec080000-0000-0000-0000-000000000008'::uuid, 'Les aménagements scolaires (tiers-temps, ordinateur) pour les DYS sont :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec010000-0000-0000-0000-000000000001', 'Il évite d''avoir à apprendre à lire', false, 1, NULL, 'Le lecteur vocal est un outil compensatoire — il ne remplace pas l''apprentissage de la lecture.'),
('ec010000-0000-0000-0000-000000000001', 'Il contourne la difficulté de décodage pour accéder directement au contenu et à la compréhension', true, 2, 'Exactement ! La dyslexie affecte le décodage — mais pas l''intelligence ni la compréhension. Le lecteur vocal permet d''accéder au sens sans être bloqué par le décodage.', NULL),
('ec010000-0000-0000-0000-000000000001', 'Il corrige la dyslexie à long terme', false, 3, NULL, 'Le lecteur vocal compense la difficulté — il ne la "corrige" pas. Mais une compensation efficace change tout.'),
('ec010000-0000-0000-0000-000000000001', 'Il remplace le besoin de lire des textes', false, 4, NULL, 'C''est un outil d''accès à l''information, pas un remplacement définitif. L''objectif reste de développer ses compétences de lecture.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec020000-0000-0000-0000-000000000002', 'Rendre les textes plus jolis', false, 1, NULL, 'OpenDyslexic est conçu pour la fonctionnalité, pas l''esthétique.'),
('ec020000-0000-0000-0000-000000000002', 'Réduire la confusion visuelle entre certaines lettres en les rendant plus distinctes', true, 2, 'Oui ! Les lettres OpenDyslexic ont une base plus lourde qui réduit le risque de les retourner (b/d, p/q). Cela aide certains lecteurs dyslexiques — mais pas tous. Essaie et vois !', NULL),
('ec020000-0000-0000-0000-000000000002', 'Permettre de lire plus vite', false, 3, NULL, 'L''objectif n''est pas la vitesse — c''est la réduction des erreurs de décodage.'),
('ec020000-0000-0000-0000-000000000002', 'Aider tous les élèves, pas seulement les DYS', false, 4, NULL, 'OpenDyslexic est spécifiquement conçu pour les profils dyslexiques. Pour les autres lecteurs, les polices standard sont souvent plus confortables.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec030000-0000-0000-0000-000000000003', 'Un outil qui fait tout le travail à la place', false, 1, NULL, 'Le correcteur ne fait pas le travail — il aide à identifier et corriger les erreurs.'),
('ec030000-0000-0000-0000-000000000003', 'Un outil d''aide légitime qui permet de se concentrer sur le fond plutôt que la forme', true, 2, 'Exactement ! Comme une calculatrice en maths pour la dyscalculie, le correcteur orthographique libère des ressources cognitives pour se concentrer sur ce qui compte vraiment : les idées.', NULL),
('ec030000-0000-0000-0000-000000000003', 'Interdit en classe parce que c''est tricher', false, 3, NULL, 'Le correcteur orthographique fait partie des aménagements légitimes pour les DYS — et est souvent autorisé avec un PAP/PPS.'),
('ec030000-0000-0000-0000-000000000003', 'Inutile car la dysorthographie disparaît avec l''âge', false, 4, NULL, 'La dysorthographie ne disparaît généralement pas complètement — elle s''améliore avec le travail spécifique, mais les outils compensatoires restent utiles.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec040000-0000-0000-0000-000000000004', 'Il permet d''écrire moins', false, 1, NULL, 'Réduire l''écrit peut être un avantage pour les DYS, mais ce n''est pas l''effet principal sur la qualité du travail.'),
('ec040000-0000-0000-0000-000000000004', 'Il permet d''organiser ses idées visuellement AVANT d''écrire, séparant la pensée de la rédaction', true, 2, 'Parfait ! Beaucoup d''élèves DYS ont du mal à penser ET écrire en même temps. La carte mentale permet de capturer toutes les idées d''abord, puis de les organiser — et d''écrire ensuite seulement.', NULL),
('ec040000-0000-0000-0000-000000000004', 'Il remplace la nécessité d''écrire un texte complet', false, 3, NULL, 'La carte mentale est une étape préparatoire — elle aide à produire un texte de meilleure qualité, pas à en éviter la rédaction.'),
('ec040000-0000-0000-0000-000000000004', 'Il fonctionne uniquement pour les DYS très créatifs', false, 4, NULL, 'Le mind mapping est utile pour tous les élèves — encore plus pour ceux qui ont des difficultés d''organisation de l''écrit.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec050000-0000-0000-0000-000000000005', 'Est une mauvaise habitude à corriger', false, 1, NULL, 'Non ! Ce geste ajoute un ancrage tactile qui aide à maintenir le suivi visuel.'),
('ec050000-0000-0000-0000-000000000005', 'Aide à garder le fil de lecture et réduit les erreurs de saut de ligne', true, 2, 'Exactement ! Cela aide à maintenir le suivi visuel, surtout quand les mots "bougent" ou que l''œil saute des lignes. C''est un outil simple et efficace.', NULL),
('ec050000-0000-0000-0000-000000000005', 'Ralentit la lecture et doit être évité', false, 3, NULL, 'Ralentir n''est pas un problème si ça améliore la compréhension. La vitesse de lecture viendra avec la pratique.'),
('ec050000-0000-0000-0000-000000000005', 'N''aide que les très jeunes lecteurs', false, 4, NULL, 'Cet outil reste utile à tous les âges pour les profils qui ont du mal à suivre les lignes visuellement.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec060000-0000-0000-0000-000000000006', 'Elle ralentit le décodage et aide à ne pas sauter de mots', true, 1, 'Oui ! Lire à voix haute engage en même temps le canal auditif, ce qui renforce l''encodage et réduit les omissions ou substitutions de mots.', NULL),
('ec060000-0000-0000-0000-000000000006', 'Elle aide à ne pas s''endormir en lisant', false, 2, NULL, 'Rester éveillé peut être un bénéfice, mais l''effet principal est sur le traitement et la compréhension.'),
('ec060000-0000-0000-0000-000000000006', 'Elle impressionne les profs qui t''entendent', false, 3, NULL, 'L''avantage est pour toi — la compréhension est améliorée, indépendamment de qui t''entend.'),
('ec060000-0000-0000-0000-000000000006', 'Elle fonctionne uniquement pour les textes de fiction', false, 4, NULL, 'La lecture à voix haute aide pour tous types de textes.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec070000-0000-0000-0000-000000000007', 'Écrire le mot 20 fois', false, 1, NULL, 'La répétition mécanique est peu efficace pour la mémoire orthographique — c''est une technique réputée mais peu validée.'),
('ec070000-0000-0000-0000-000000000007', 'Créer une image mentale du mot ou une histoire autour de ses lettres particulières', true, 2, 'Parfait ! La mémorisation visuelle et narrative du mot (''le HERONier de la GUÊpe'') crée des ancrages mémorables. La mémoire orthographique visuelle est souvent plus forte que la phonologie pour les DYS.', NULL),
('ec070000-0000-0000-0000-000000000007', 'Utiliser uniquement la règle grammaticale', false, 3, NULL, 'Les règles aident, mais pour les cas irréguliers (nombreux en français), des stratégies mnémotechniques sont souvent plus efficaces.'),
('ec070000-0000-0000-0000-000000000007', 'Éviter ce mot dans ses productions', false, 4, NULL, 'Éviter ne fait pas apprendre. Mieux vaut construire une stratégie de mémorisation pour pouvoir l''utiliser.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ec080000-0000-0000-0000-000000000008', 'Des faveurs que les profs donnent aux élèves faibles', false, 1, NULL, 'Pas du tout ! Les aménagements rétablissent une équité — ils donnent aux élèves DYS les mêmes chances d''exprimer leurs compétences que les autres.'),
('ec080000-0000-0000-0000-000000000008', 'Des outils qui rétablissent l''équité en permettant d''exprimer les compétences malgré les difficultés', true, 2, 'Exactement ! La dyslexie n''affecte pas l''intelligence — mais sans aménagement, l''élève est évalué sur sa difficulté, pas sur ses compétences. Le tiers-temps ou l''ordinateur rétablissent cette équité.', NULL),
('ec080000-0000-0000-0000-000000000008', 'Des solutions permanentes qui résolvent la dyslexie', false, 3, NULL, 'Les aménagements compensent — ils ne ''guérissent'' pas la dyslexie. Mais une compensation efficace change tout.'),
('ec080000-0000-0000-0000-000000000008', 'Uniquement utiles pour les examens importants', false, 4, NULL, 'Les aménagements s''appliquent à toutes les évaluations — et souvent aussi au quotidien scolaire.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E14 : Me faire comprendre
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E14') m,
(VALUES
  ('ed010000-0000-0000-0000-000000000001'::uuid, 'La communication assertive, c''est :', 1),
  ('ed020000-0000-0000-0000-000000000002'::uuid, 'Dire "je me sens débordé quand il y a trop de bruit" plutôt que "tu fais trop de bruit" est efficace parce que :', 2),
  ('ed030000-0000-0000-0000-000000000003'::uuid, 'Demander un aménagement à un professeur sera mieux reçu si tu :', 3),
  ('ed040000-0000-0000-0000-000000000004'::uuid, 'Savoir dire "non" à une demande est :', 4),
  ('ed050000-0000-0000-0000-000000000005'::uuid, 'Quand tu veux expliquer ta neurodivergence à quelqu''un, la meilleure approche est :', 5),
  ('ed060000-0000-0000-0000-000000000006'::uuid, 'Face à un adulte qui ne comprend pas tes besoins, tu peux :', 6),
  ('ed070000-0000-0000-0000-000000000007'::uuid, 'La communication non-violente (CNV) repose sur :', 7),
  ('ed080000-0000-0000-0000-000000000008'::uuid, 'Si quelqu''un dit quelque chose de blessant involontairement sur ta neurodivergence, tu peux :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed010000-0000-0000-0000-000000000001', 'Dire tout ce qu''on pense sans filtre', false, 1, NULL, 'C''est plutôt de l''agressivité — l''assertivité respecte les autres tout en s''exprimant clairement.'),
('ed010000-0000-0000-0000-000000000001', 'Exprimer ses besoins et opinions clairement, sans agressivité ni passivité', true, 2, 'Parfait ! L''assertivité est le juste milieu entre le silence passif (ne rien dire) et l''agression (écraser l''autre). C''est une compétence qui s''apprend.', NULL),
('ed010000-0000-0000-0000-000000000001', 'Toujours céder pour garder la paix', false, 3, NULL, 'C''est de la passivité — qui finit souvent par exploser en frustration accumulée.'),
('ed010000-0000-0000-0000-000000000001', 'Convaincre les autres d''avoir raison', false, 4, NULL, 'L''assertivité n''est pas de la persuasion — c''est d''exprimer clairement ses propres besoins et limites.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed020000-0000-0000-0000-000000000002', 'Ça fait moins de reproche et ouvre le dialogue', true, 1, 'Oui ! Les messages en "je" (je ressens, j''ai besoin) communiquent ta réalité sans accuser. L''autre peut entendre et répondre sans se défendre.', NULL),
('ed020000-0000-0000-0000-000000000002', 'C''est plus poli', false, 2, NULL, 'La politesse est un bénéfice — mais l''effet sur la communication est plus profond : éviter la défensivité de l''autre.'),
('ed020000-0000-0000-0000-000000000002', 'L''autre ne peut pas te contredire', false, 3, NULL, 'Il peut toujours répondre — mais il est moins sur la défensive car tu parles de toi, pas de lui.'),
('ed020000-0000-0000-0000-000000000002', 'Ça ne change rien — les mots ne comptent pas', false, 4, NULL, 'Les mots changent la façon dont le cerveau de l''autre traite le message. La formulation impacte directement la réception.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed030000-0000-0000-0000-000000000003', 'Le fais à un moment calme et en expliquant comment ça t''aide concrètement', true, 1, 'Exactement ! Un professeur détendu, une demande concrete et une explication du bénéfice pédagogique = la meilleure combinaison pour être entendu.', NULL),
('ed030000-0000-0000-0000-000000000003', 'Le fais devant tous les élèves pour que ce soit officiel', false, 2, NULL, 'Devant les autres peut mettre le prof en position délicate et lui être difficile à accorder. Un moment privé est bien meilleur.'),
('ed030000-0000-0000-0000-000000000003', 'Insistes jusqu''à ce qu''il accepte', false, 3, NULL, 'L''insistance peut créer des tensions. Mieux vaut être clair, respectueux, et si refusé, impliquer tes parents ou le référent.'),
('ed030000-0000-0000-0000-000000000003', 'Demandes à tes parents de le faire à ta place', false, 4, NULL, 'Les parents peuvent soutenir, mais développer ta propre capacité à défendre tes besoins est une compétence précieuse pour la vie.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed040000-0000-0000-0000-000000000004', 'Égoïste et à éviter pour ne pas blesser', false, 1, NULL, 'Non — dire non est une compétence saine et nécessaire. L''incapacité à dire non mène à l''épuisement.'),
('ed040000-0000-0000-0000-000000000004', 'Une compétence saine qui protège ton énergie et ton intégrité', true, 2, 'Exactement ! Dire non protège tes ressources limitées. Tu ne peux pas dire oui à tout — choisir ce qui compte pour toi est une compétence, pas de l''égoïsme.', NULL),
('ed040000-0000-0000-0000-000000000004', 'Toujours impoli', false, 3, NULL, 'Non peut être dit avec gentillesse et respect. La politesse n''exige pas l''accord systématique.'),
('ed040000-0000-0000-0000-000000000004', 'Seulement acceptable pour les adultes', false, 4, NULL, 'L''assertivité, dont le droit de dire non, s''apprend et se pratique dès l''enfance.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed050000-0000-0000-0000-000000000005', 'Donner le diagnostic médical complet avec tous les détails', false, 1, NULL, 'Un diagnostic médical peut être difficile à comprendre pour quelqu''un sans formation. Mieux vaut expliquer avec des mots simples.'),
('ed050000-0000-0000-0000-000000000005', 'Expliquer en termes concrets ce que tu vis et ce qui t''aide — pas forcément le terme médical', true, 2, 'Parfait ! "Mon cerveau traite les sons très fort, c''est pour ça que j''ai besoin de calme pour travailler" est bien plus compréhensible que "j''ai une hypersensibilité auditive liée à mon TDAH".', NULL),
('ed050000-0000-0000-0000-000000000005', 'Ne pas en parler — c''est trop personnel', false, 3, NULL, 'C''est ton choix — tu n''es pas obligé d''expliquer. Mais savoir comment le faire si tu le souhaites est une compétence précieuse.'),
('ed050000-0000-0000-0000-000000000005', 'Attendre que l''autre pose des questions', false, 4, NULL, 'Attendre est une option, mais prendre l''initiative d''expliquer te donne plus de contrôle sur la façon dont tu es perçu.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed060000-0000-0000-0000-000000000006', 'Abandonner — s''il ne comprend pas, rien ne changera', false, 1, NULL, 'Il existe souvent d''autres recours avant d''abandonner.'),
('ed060000-0000-0000-0000-000000000006', 'Chercher un autre adulte de confiance (parent, référent, CPE) pour t''aider à te faire entendre', true, 2, 'Exactement ! Tu n''as pas à te débrouiller seul. Savoir à qui s''adresser quand un premier interlocuteur ne répond pas est une compétence importante.', NULL),
('ed060000-0000-0000-0000-000000000006', 'Faire une scène pour qu''il comprenne l''urgence', false, 3, NULL, 'La démonstration émotionnelle forte peut fermer le dialogue plutôt qu''ouvrir. La stratégie calme et avec soutien est plus efficace.'),
('ed060000-0000-0000-0000-000000000006', 'Décider de te débrouiller tout seul', false, 4, NULL, 'L''autonomie est une force — mais demander de l''aide quand c''est nécessaire est aussi une compétence.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed070000-0000-0000-0000-000000000007', 'Être toujours doux et ne jamais exprimer la colère', false, 1, NULL, 'La CNV permet d''exprimer même les émotions difficiles — de façon non-violente, pas absente.'),
('ed070000-0000-0000-0000-000000000007', 'Observer → Ressentir → Besoin → Demander — sans jugement ni accusation', true, 2, 'Exactement ! Ce modèle en 4 étapes (Marshall Rosenberg) est une des méthodes de communication les plus validées pour résoudre les conflits et exprimer ses besoins.', NULL),
('ed070000-0000-0000-0000-000000000007', 'Ne jamais dire non à qui que ce soit', false, 3, NULL, 'La CNV inclut l''expression claire de ses limites et besoins — ce qui inclut parfois de dire non.'),
('ed070000-0000-0000-0000-000000000007', 'Utiliser uniquement l''écrit pour communiquer', false, 4, NULL, 'La CNV s''applique à toutes les formes de communication — orale, écrite, et même interne (comment on se parle à soi-même).');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ed080000-0000-0000-0000-000000000008', 'Répondre avec la même blessure', false, 1, NULL, 'La réciprocité blessante escalade le conflit — ce n''est généralement pas ce qu''on cherche.'),
('ed080000-0000-0000-0000-000000000008', 'Lui expliquer calmement ce que ça fait et ce que tu préfères entendre', true, 2, 'Parfait ! Les personnes qui disent des choses blessantes involontairement ne le savent souvent pas. Une explication calme est une chance de changer la relation positivement.', NULL),
('ed080000-0000-0000-0000-000000000008', 'Faire comme si ça n''avait pas eu lieu', false, 3, NULL, 'Ignorer peut préserver la paix à court terme — mais si ça arrive régulièrement, le problème ne se résout pas.'),
('ed080000-0000-0000-0000-000000000008', 'Conclure que cette personne ne t''aimera jamais', false, 4, NULL, 'Les maladresses involontaires ne reflètent pas forcément l''affection. La plupart des gens peuvent apprendre si on leur explique.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E15 : L'amitié et moi
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E15') m,
(VALUES
  ('ee010000-0000-0000-0000-000000000001'::uuid, 'Les "codes sociaux implicites" sont des règles que :', 1),
  ('ee020000-0000-0000-0000-000000000002'::uuid, 'Quand une amitié te demande de masquer constamment qui tu es vraiment, c''est :', 2),
  ('ee030000-0000-0000-0000-000000000003'::uuid, 'Préférer avoir 1 ou 2 amis proches plutôt qu''un grand groupe :', 3),
  ('ee040000-0000-0000-0000-000000000004'::uuid, 'Les malentendus en amitié chez les neurodivergents viennent souvent de :', 4),
  ('ee050000-0000-0000-0000-000000000005'::uuid, 'La "solitude choisie" (avoir besoin de temps seul) est :', 5),
  ('ee060000-0000-0000-0000-000000000006'::uuid, 'Pour trouver des amis qui te correspondent vraiment, la meilleure piste est :', 6),
  ('ee070000-0000-0000-0000-000000000007'::uuid, 'Quand tu te sens exclu d''un groupe, une bonne réaction est de :', 7),
  ('ee080000-0000-0000-0000-000000000008'::uuid, 'Une amitié saine entre deux personnes différentes repose sur :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee010000-0000-0000-0000-000000000001', 'Les règles écrites dans les livres de politesse', false, 1, NULL, 'Non — les codes sociaux implicites ne sont pas écrits. C''est là leur difficulté pour les neurodivergents.'),
('ee010000-0000-0000-0000-000000000001', 'La plupart des gens apprennent automatiquement, sans qu''elles soient enseignées explicitement', true, 2, 'Exactement ! "Ne pas couper la parole", "savoir quand une conversation est terminée" — ces règles sont apprises implicitement par la plupart. Les neurodivergents ont souvent besoin d''un apprentissage plus explicite.', NULL),
('ee010000-0000-0000-0000-000000000001', 'Des règles inventées pour exclure les gens différents', false, 3, NULL, 'Ce n''est pas leur intention — elles existent parce que la plupart des gens les partagent naturellement. Mais elles peuvent exclure involontairement ceux qui ne les perçoivent pas.'),
('ee010000-0000-0000-0000-000000000001', 'Uniquement importantes pour les adultes dans le monde professionnel', false, 4, NULL, 'Les codes sociaux sont importants à tous les âges — et s''apprennent plus facilement pendant l''enfance et l''adolescence.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee020000-0000-0000-0000-000000000002', 'Normal — on doit s''adapter à ses amis', false, 1, NULL, 'S''adapter est normal et sain. Mais devoir CACHER qui on est entièrement est différent — c''est épuisant et ne dure pas.'),
('ee020000-0000-0000-0000-000000000002', 'Un signe que cette amitié n''est peut-être pas dans ton intérêt', true, 2, 'Exactement ! Les amitiés qui demandent de masquer constamment qui tu es coûtent énormément d''énergie. Les vraies amitiés te permettent d''être toi-même — imparfait et authentique.', NULL),
('ee020000-0000-0000-0000-000000000002', 'Quelque chose que tu dois apprendre à mieux gérer', false, 3, NULL, 'S''adapter socialement est une compétence — mais devoir se cacher entièrement n''est pas de l''adaptation, c''est de la suppression.'),
('ee020000-0000-0000-0000-000000000002', 'Acceptable si cette personne est populaire', false, 4, NULL, 'La popularité de l''autre ne justifie pas de renoncer à être soi-même. Le coût est trop élevé.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee030000-0000-0000-0000-000000000003', 'Est un signe de problème social à corriger', false, 1, NULL, 'Non — la qualité des liens prime sur la quantité. Beaucoup de neurodivergents (et de neurotypiques !) fonctionnent mieux avec quelques liens profonds.'),
('ee030000-0000-0000-0000-000000000003', 'Est une préférence légitime — la qualité des liens prime sur la quantité', true, 2, 'Exactement ! Il n''y a pas de "bonne" façon d''avoir des amis. Certains s''épanouissent dans les grands groupes, d''autres dans des liens forts et peu nombreux.', NULL),
('ee030000-0000-0000-0000-000000000003', 'Prouve qu''on est asocial', false, 3, NULL, 'L''asociabilité et la préférence pour les liens profonds ne sont pas la même chose. On peut aimer profondément et choisir des amitiés ciblées.'),
('ee030000-0000-0000-0000-000000000003', 'Doit changer à l''adolescence obligatoirement', false, 4, NULL, 'Il n''y a pas d''obligation — les préférences sociales varient selon les individus et évoluent naturellement.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee040000-0000-0000-0000-000000000004', 'Une mauvaise intention de leur part', false, 1, NULL, 'La plupart des malentendus ne viennent pas de mauvaises intentions — ils viennent de différences de communication.'),
('ee040000-0000-0000-0000-000000000004', 'Des façons différentes de comprendre et exprimer les émotions, les attentes et les sous-entendus', true, 2, 'Exactement ! Un neurodivergent peut prendre une phrase littéralement quand l''autre voulait dire le contraire, ou ne pas percevoir un signal de gêne. Ce ne sont pas des défauts — juste des différences à apprendre.', NULL),
('ee040000-0000-0000-0000-000000000004', 'Un manque d''intelligence sociale', false, 3, NULL, 'L''intelligence sociale est une capacité à développer et s''améliore — ce n''est pas un trait fixe.'),
('ee040000-0000-0000-0000-000000000004', 'Le fait que les neurodivergents ne s''intéressent pas aux autres', false, 4, NULL, 'Beaucoup de neurodivergents ont une empathie très forte. Les malentendus viennent de différences de communication, pas de désintérêt.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee050000-0000-0000-0000-000000000005', 'Un défaut social à corriger rapidement', false, 1, NULL, 'Non ! Le besoin de temps seul est un besoin légitime de recharge — pas un défaut.'),
('ee050000-0000-0000-0000-000000000005', 'Un besoin légitime de recharge pour les personnalités introvertites ou après effort social', true, 2, 'Parfait ! Après des interactions sociales intenses, les neurodivergents ont souvent besoin de temps seul pour récupérer. Ce n''est pas de l''isolement — c''est de la régulation.', NULL),
('ee050000-0000-0000-0000-000000000005', 'Un signe de dépression à surveiller absolument', false, 3, NULL, 'Préférer parfois être seul est normal et sain. C''est une dépression qui dure longtemps, avec tristesse et perte de plaisir, qui mérite attention.'),
('ee050000-0000-0000-0000-000000000005', 'Quelque chose à cacher à ses amis', false, 4, NULL, 'Tes amis proches peuvent comprendre ton besoin de recharge. Expliquer tes besoins renforce les amitiés authentiques.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee060000-0000-0000-0000-000000000006', 'Devenir ami avec les personnes les plus populaires', false, 1, NULL, 'La popularité n''est pas un critère de compatibilité. Les amis qui te correspondent partageront souvent tes intérêts et valeurs.'),
('ee060000-0000-0000-0000-000000000006', 'Rejoindre des activités ou groupes centrés sur tes passions — les amis suivent naturellement', true, 2, 'Exactement ! Autour d''une passion commune (jeu, musique, sport, sciences), les conversations viennent naturellement et les compatibilités se révèlent. C''est bien plus organique que de "chercher des amis".', NULL),
('ee060000-0000-0000-0000-000000000006', 'Changer de personnalité pour plaire à plus de monde', false, 3, NULL, 'Changer qui tu es attire des amitiés pour quelqu''un que tu n''es pas — ce qui crée des liens fragiles et épuisants.'),
('ee060000-0000-0000-0000-000000000006', 'Attendre que les autres viennent vers toi', false, 4, NULL, 'Attendre peut fonctionner parfois, mais rejoindre des activités augmente significativement les chances de rencontrer des personnes compatibles.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee070000-0000-0000-0000-000000000007', 'Conclure que personne ne t''aimera jamais', false, 1, NULL, 'Être exclu d''un groupe ne dit rien sur ton worth en tant qu''ami — ça dit surtout que ce groupe n''était peut-être pas le bon pour toi.'),
('ee070000-0000-0000-0000-000000000007', 'Chercher à comprendre pourquoi, puis explorer d''autres cercles si ce groupe n''est pas le bon pour toi', true, 2, 'Exactement ! L''exclusion fait mal — c''est normal. Mais elle peut aussi indiquer qu''un autre groupe te conviendrait mieux. Chercher sa "tribu" prend parfois du temps.', NULL),
('ee070000-0000-0000-0000-000000000007', 'Faire tout ce que le groupe veut pour être accepté', false, 3, NULL, 'S''adapter pour être accepté peut mener à renoncer à soi-même — et l''appartenance ainsi gagnée est souvent fragile.'),
('ee070000-0000-0000-0000-000000000007', 'Ignorer tes propres besoins pour te fondre dans le groupe', false, 4, NULL, 'Ignorer ses besoins est une stratégie à court terme qui s''effondre sur le long terme — et coûte cher en bien-être.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ee080000-0000-0000-0000-000000000008', 'Être identiques — mêmes goûts, mêmes façons de voir les choses', false, 1, NULL, 'La similitude peut aider le démarrage, mais les amitiés entre personnes différentes sont souvent très enrichissantes.'),
('ee080000-0000-0000-0000-000000000008', 'Le respect mutuel, l''acceptation des différences et la sécurité émotionnelle réciproque', true, 2, 'Parfait ! Une amitié saine ne nécessite pas la similitude — elle nécessite le respect, l''acceptation et le sentiment d''être en sécurité pour être soi-même.', NULL),
('ee080000-0000-0000-0000-000000000008', 'Passer beaucoup de temps ensemble obligatoirement', false, 3, NULL, 'La quantité de temps n''est pas le critère — la qualité de la connexion compte davantage.'),
('ee080000-0000-0000-0000-000000000008', 'Que l''un d''eux s''adapte complètement à l''autre', false, 4, NULL, 'Une amitié où un seul s''adapte n''est pas saine — c''est une relation asymétrique qui s''épuise.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E16 : Gérer les conflits et les injustices
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E16') m,
(VALUES
  ('ef010000-0000-0000-0000-000000000001'::uuid, 'La différence entre un conflit normal et du harcèlement est :', 1),
  ('ef020000-0000-0000-0000-000000000002'::uuid, 'Face à une situation injuste, la meilleure première réaction est :', 2),
  ('ef030000-0000-0000-0000-000000000003'::uuid, 'Quand tu es en colère à cause d''une injustice, tu dois :', 3),
  ('ef040000-0000-0000-0000-000000000004'::uuid, 'Demander de l''aide à un adulte face au harcèlement n''est pas :', 4),
  ('ef050000-0000-0000-0000-000000000005'::uuid, 'La stratégie "gagne-gagne" dans un conflit, c''est :', 5),
  ('ef060000-0000-0000-0000-000000000006'::uuid, 'Si tu es témoin d''une situation de harcèlement envers quelqu''un d''autre, tu peux :', 6),
  ('ef070000-0000-0000-0000-000000000007'::uuid, 'La colère face à une injustice :', 7),
  ('ef080000-0000-0000-0000-000000000008'::uuid, 'Pour résoudre un conflit avec quelqu''un, une bonne approche est de :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef010000-0000-0000-0000-000000000001', 'Le conflit fait plus mal que le harcèlement', false, 1, NULL, 'Les deux peuvent faire mal — mais les caractéristiques sont différentes.'),
('ef010000-0000-0000-0000-000000000001', 'Le harcèlement est répétitif, délibéré, et crée un déséquilibre de pouvoir — le conflit est ponctuel', true, 2, 'Exactement ! Un conflit entre égaux peut se résoudre. Le harcèlement se répète, est intentionnel, et la victime n''a pas les mêmes ressources que l''agresseur. C''est fondamentalement différent.', NULL),
('ef010000-0000-0000-0000-000000000001', 'Il n''y a pas vraiment de différence', false, 3, NULL, 'Si — la distinction est importante pour savoir quelle réponse apporter. Le harcèlement nécessite l''aide d''adultes.'),
('ef010000-0000-0000-0000-000000000001', 'Le conflit implique toujours des adultes', false, 4, NULL, 'Non — les conflits entre élèves sont fréquents et normaux. Le harcèlement est la version répétée et déséquilibrée de la méchanceté.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef020000-0000-0000-0000-000000000002', 'Réagir immédiatement et fortement pour montrer qu''on n''est pas faible', false, 1, NULL, 'Réagir à chaud peut escalader la situation. Prendre un temps est généralement plus efficace.'),
('ef020000-0000-0000-0000-000000000002', 'Observer la situation avec du recul pour mieux comprendre ce qui se passe vraiment', true, 2, 'Exactement ! Avant d''agir, comprendre : qu''est-ce qui s''est vraiment passé ? Qui est impliqué ? Quelle est mon intention ? Cette pause réduit les malentendus et les escalades.', NULL),
('ef020000-0000-0000-0000-000000000002', 'Ne rien faire pour ne pas aggraver', false, 3, NULL, 'Ne rien faire peut laisser la situation s''enraciner. Observer puis agir de façon réfléchie est mieux que l''inaction totale.'),
('ef020000-0000-0000-0000-000000000002', 'Appeler immédiatement ses parents', false, 4, NULL, 'Les parents peuvent aider, mais d''abord comprendre la situation permet de mieux leur expliquer et de choisir la bonne réponse.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef030000-0000-0000-0000-000000000003', 'Cacher ta colère pour paraître mature', false, 1, NULL, 'Cacher la colère ne la fait pas disparaître — elle accumule. L''exprimer de façon adaptée est plus sain.'),
('ef030000-0000-0000-0000-000000000003', 'Reconnaître ta colère comme légitime, la réguler, puis agir de façon réfléchie', true, 2, 'Parfait ! La colère face à l''injustice est normale et utile — elle signale quelque chose d''important. La réguler d''abord (respiration, mouvement) permet d''agir efficacement ensuite.', NULL),
('ef030000-0000-0000-0000-000000000003', 'Agir directement pour corriger l''injustice tant que tu es en colère', false, 3, NULL, 'Agir en pleine colère mène souvent à des actions qu''on regrette. Réguler d''abord, agir ensuite.'),
('ef030000-0000-0000-0000-000000000003', 'Accepter que c''est toujours comme ça et passer à autre chose', false, 4, NULL, 'Accepter toutes les injustices sans réagir n''est pas sain non plus. La colère juste mérite une réponse — réfléchie et appropriée.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef040000-0000-0000-0000-000000000004', 'Une compétence — c''est courageux de demander de l''aide', false, 1, NULL, 'Si — demander de l''aide quand on en a besoin est une force, pas une faiblesse.'),
('ef040000-0000-0000-0000-000000000004', 'De la faiblesse ou de la dénonciation — c''est de l''intelligence situationnelle', true, 2, 'Exactement ! Le harcèlement ne se résout généralement pas seul. Impliquer un adulte n''est pas "cafeter" — c''est se protéger et permettre à la situation de changer.', NULL),
('ef040000-0000-0000-0000-000000000004', 'Toujours la première chose à faire dans n''importe quel conflit', false, 3, NULL, 'Pour les conflits ordinaires, on peut souvent tenter une résolution entre pairs d''abord. Pour le harcèlement, l''adulte est souvent nécessaire dès le début.'),
('ef040000-0000-0000-0000-000000000004', 'Quelque chose que les adultes ne peuvent pas vraiment résoudre', false, 4, NULL, 'Les adultes peuvent beaucoup — surtout si tu leur expliques clairement ce qui se passe, depuis combien de temps, et ce que tu as déjà essayé.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef050000-0000-0000-0000-000000000005', 'Qu''une personne gagne et l''autre accepte de perdre', false, 1, NULL, 'C''est une solution gagne-perd — l''une avance, l''autre recule. Pas durable.'),
('ef050000-0000-0000-0000-000000000005', 'Chercher une solution qui satisfait les besoins des deux parties', true, 2, 'Parfait ! La stratégie gagne-gagne cherche à comprendre les besoins de chacun et à trouver une issue qui convient aux deux. C''est plus difficile mais bien plus durable.', NULL),
('ef050000-0000-0000-0000-000000000005', 'Que les deux personnes abandonnent ce qu''elles veulent', false, 3, NULL, 'Le compromis (chacun abandonne quelque chose) est différent du gagne-gagne. Dans le gagne-gagne, les deux obtiennent l''essentiel.'),
('ef050000-0000-0000-0000-000000000005', 'Que la personne la plus forte decide', false, 4, NULL, 'Celui qui décide par la force crée une solution fragile — la partie qui cède se souviendra de l''injustice.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef060000-0000-0000-0000-000000000006', 'Ne rien faire — ça ne te concerne pas', false, 1, NULL, 'Le silence des témoins renforce le harcèlement. Même une petite action peut changer la situation.'),
('ef060000-0000-0000-0000-000000000006', 'Montrer de la solidarité à la victime (même discrètement) et/ou en parler à un adulte', true, 2, 'Exactement ! Des études montrent que l''action d''UN seul témoin peut changer la dynamique du harcèlement. Tu n''as pas à affronter l''agresseur directement — être gentil avec la victime ou en parler en privé à un adulte peut suffire.', NULL),
('ef060000-0000-0000-0000-000000000006', 'Régler le problème en confrontant l''agresseur directement', false, 3, NULL, 'Confronter directement un agresseur peut être risqué. Les actions de soutien indirect ou l''implication d''adultes sont souvent plus efficaces.'),
('ef060000-0000-0000-0000-000000000006', 'Rire avec le groupe pour ne pas devenir la prochaine cible', false, 4, NULL, 'Participer renforce le harcèlement — et cette complicité a des effets sur soi-même (culpabilité, image de soi).');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef070000-0000-0000-0000-000000000007', 'Est toujours mauvaise et doit être supprimée', false, 1, NULL, 'Non — la colère face à l''injustice est une émotion morale utile. C''est la façon de l''exprimer qui peut être problématique.'),
('ef070000-0000-0000-0000-000000000007', 'Est une émotion légitime qui signal une transgression de valeurs — son expression est ce qui doit être régulée', true, 2, 'Parfait ! La colère juste est un signal moral — elle dit "quelque chose d''important a été violé". Apprendre à exprimer cette colère de façon constructive est la clé, pas de la supprimer.', NULL),
('ef070000-0000-0000-0000-000000000007', 'N''est utile que si elle mène à une confrontation physique', false, 3, NULL, 'Non — la confrontation physique est rarement la meilleure réponse. La colère peut mener à des actions verbales, des demandes d''aide, des démarches sociales.'),
('ef070000-0000-0000-0000-000000000007', 'Est toujours causée par une mauvaise journée et passera toute seule', false, 4, NULL, 'La colère face à l''injustice a une cause réelle et mérite une réponse. Attendre passivement ne résout pas l''injustice.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('ef080000-0000-0000-0000-000000000008', 'Attendre que l''autre vienne s''excuser en premier', false, 1, NULL, 'Attendre peut geler le conflit indéfiniment. Prendre l''initiative de parler est souvent plus efficace.'),
('ef080000-0000-0000-0000-000000000008', 'Choisir un moment calme, exprimer ce que tu as ressenti et ce dont tu as besoin, puis écouter sa version', true, 2, 'Parfait ! Cette séquence (moment calme + expression de soi + écoute de l''autre) est la base de la résolution constructive. Elle ne garantit pas la résolution — mais crée les meilleures conditions.', NULL),
('ef080000-0000-0000-0000-000000000008', 'Prouver que tu as raison avec des arguments irréfutables', false, 3, NULL, 'Avoir raison ne résout pas un conflit si l''autre ne se sent pas entendu. L''écoute réciproque compte autant que les arguments.'),
('ef080000-0000-0000-0000-000000000008', 'Éviter la personne indéfiniment', false, 4, NULL, 'L''évitement peut réduire la tension à court terme — mais le conflit non-résolu reste en suspens et peut se raviver.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E17 : Les maths à ma façon
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E17') m,
(VALUES
  ('17010000-0000-0000-0000-000000000001'::uuid, 'La dyscalculie affecte principalement :', 1),
  ('17020000-0000-0000-0000-000000000002'::uuid, 'Utiliser ses doigts pour compter :', 2),
  ('17030000-0000-0000-0000-000000000003'::uuid, 'Pour comprendre un problème de maths complexe, la première étape est de :', 3),
  ('17040000-0000-0000-0000-000000000004'::uuid, 'Mémoriser les tables de multiplication est plus facile si :', 4),
  ('17050000-0000-0000-0000-000000000005'::uuid, 'Quand tu ne comprends pas une notion mathématique, la meilleure stratégie est :', 5),
  ('17060000-0000-0000-0000-000000000006'::uuid, 'Le matériel concret (réglettes, jetons, dessins) en maths aide parce que :', 6),
  ('17070000-0000-0000-0000-000000000007'::uuid, 'L''estimation (arrondir pour calculer rapidement) est utile parce que :', 7),
  ('17080000-0000-0000-0000-000000000008'::uuid, 'Une calculatrice pour un élève dyscalculique, c''est comme :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17010000-0000-0000-0000-000000000001', 'La capacité à comprendre les problèmes complexes', false, 1, NULL, 'Non — la dyscalculie affecte le traitement des quantités et symboles numériques, pas la logique ou la résolution de problèmes.'),
('17010000-0000-0000-0000-000000000001', 'Le sens des quantités, des symboles numériques et des opérations de base', true, 2, 'Exactement ! La dyscalculie affecte le "sens du nombre" — pas l''intelligence. Des strategies visuelles et concrètes compensent efficacement cette difficulté.', NULL),
('17010000-0000-0000-0000-000000000001', 'Uniquement la mémorisation des tables', false, 3, NULL, 'La difficulté avec les tables est un symptôme, mais la dyscalculie va plus loin — elle touche la compréhension des quantités et relations numériques.'),
('17010000-0000-0000-0000-000000000001', 'La capacité à compter', false, 4, NULL, 'Compter est l''une des compétences affectées, mais la dyscalculie est plus large — elle touche tout le système de traitement numérique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17020000-0000-0000-0000-000000000002', 'Est une honte à corriger dès que possible', false, 1, NULL, 'Non ! Les doigts sont un outil mathématique légitime. Des cultures entières et des experts l''utilisent.'),
('17020000-0000-0000-0000-000000000002', 'Est un outil mathématique légitime — même les adultes et experts l''utilisent parfois', true, 2, 'Exactement ! Les doigts activent des zones du cerveau liées au sens spatial et numérique. Des recherches montrent que les enfants qui utilisent leurs doigts développent souvent une meilleure compréhension des nombres.', NULL),
('17020000-0000-0000-0000-000000000002', 'Montre qu''on n''a pas compris les maths', false, 3, NULL, 'Pas du tout — utiliser des supports concrets est une stratégie d''apprentissage, pas une lacune.'),
('17020000-0000-0000-0000-000000000002', 'Ne fonctionne que pour les petits nombres', false, 4, NULL, 'Les doigts ont des limites naturelles, mais ils peuvent être un point de départ pour construire la compréhension, même pour des opérations plus grandes.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17030000-0000-0000-0000-000000000003', 'Le résoudre le plus vite possible', false, 1, NULL, 'La vitesse est rarement la bonne priorité — la compréhension d''abord.'),
('17030000-0000-0000-0000-000000000003', 'Le reformuler avec ses propres mots et identifier ce qu''on cherche', true, 2, 'Exactement ! Beaucoup d''erreurs en maths viennent de ne pas avoir compris CE QUE demande le problème. Reformuler, dessiner, identifier la question — avant tout calcul.', NULL),
('17030000-0000-0000-0000-000000000003', 'Appliquer la formule qu''on vient d''apprendre', false, 3, NULL, 'Appliquer une formule sans comprendre le problème mène souvent à appliquer la mauvaise. Comprendre d''abord.'),
('17030000-0000-0000-0000-000000000003', 'Demander immédiatement à quelqu''un la réponse', false, 4, NULL, 'Obtenir la réponse sans comprendre le processus ne permet pas d''apprendre. Essaie d''abord, demande de l''aide sur le raisonnement ensuite.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17040000-0000-0000-0000-000000000004', 'On les répète le plus possible en boucle', false, 1, NULL, 'La répétition mécanique est peu efficace pour les tables. Les stratégies contextuelles et musicales fonctionnent mieux.'),
('17040000-0000-0000-0000-000000000004', 'On utilise des patterns, comptines, ou connections avec des situations réelles', true, 2, 'Parfait ! Les tables ont des patterns (le 5 finit toujours en 0 ou 5, le 9 : la somme des chiffres fait toujours 9...). Les mettre en musique ou les connecter à des histoires aide énormément.', NULL),
('17040000-0000-0000-0000-000000000004', 'On les apprend toutes en même temps', false, 3, NULL, 'L''apprentissage espacé et progressif (une table à la fois, bien maîtrisée) est bien plus efficace que tout en même temps.'),
('17040000-0000-0000-0000-000000000004', 'On demande à ses parents de nous interroger tous les soirs', false, 4, NULL, 'L''aide parentale peut être utile, mais c''est la stratégie d''encodage (patterns, musique) qui fait la différence — pas la fréquence de l''interrogation seule.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17050000-0000-0000-0000-000000000005', 'Passer à la notion suivante et espérer que ça viendra', false, 1, NULL, 'En maths, les notions s''accumulent — ne pas comprendre une base crée des problèmes sur tout ce qui vient après.'),
('17050000-0000-0000-0000-000000000005', 'Revenir au concret (dessins, manipulations) pour reconstruire la compréhension depuis la base', true, 2, 'Exactement ! Les abstractions mathématiques s''appuient toujours sur du concret. Quand on bloque, revenir aux objets réels ou aux dessins permet souvent de débloquer.', NULL),
('17050000-0000-0000-0000-000000000005', 'Faire le maximum d''exercices du même type pour s''habituer', false, 3, NULL, 'Faire plus d''exercices sans comprendre n''ancre pas la compréhension — ça renforce parfois une erreur de raisonnement.'),
('17050000-0000-0000-0000-000000000005', 'Conclure que les maths ne sont pas faites pour toi', false, 4, NULL, 'Les maths ne sont pas faites pour UN type de cerveau — elles ont besoin d''être enseignées différemment selon les profils.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17060000-0000-0000-0000-000000000006', 'Il rend les maths plus faciles', false, 1, NULL, 'L''objectif n''est pas la facilité — c''est la compréhension profonde que la manipulation physique rend possible.'),
('17060000-0000-0000-0000-000000000006', 'Il ancre les concepts abstraits dans le concret, ce que le cerveau comprend mieux', true, 2, 'Parfait ! Le cerveau comprend d''abord le concret, puis l''abstrait. Les réglettes, jetons et dessins permettent de "voir" et "toucher" les concepts — avant de les symboliser avec des chiffres.', NULL),
('17060000-0000-0000-0000-000000000006', 'Il n''est utile que pour les petits de maternelle', false, 3, NULL, 'Le matériel concret reste utile à tous les niveaux — même pour des adultes qui apprennent des concepts nouveaux.'),
('17060000-0000-0000-0000-000000000006', 'Il compense le fait qu''on n''a pas compris le cours', false, 4, NULL, 'Le matériel concret n''est pas un rattrapage — c''est une méthode d''apprentissage efficace pour tous les profils, à utiliser dès le départ.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17070000-0000-0000-0000-000000000007', 'Elle permet de vérifier rapidement si une réponse est plausible', true, 1, 'Exactement ! "Est-ce que 248 × 3 peut donner 5000 ?" — une estimation rapide (250 × 3 = 750) dit non tout de suite. C''est une compétence de contrôle du résultat essentielle.', NULL),
('17070000-0000-0000-0000-000000000007', 'Elle remplace le calcul exact', false, 2, NULL, 'L''estimation complète le calcul exact — elle ne le remplace pas. Elle sert à vérifier et contrôler.'),
('17070000-0000-0000-0000-000000000007', 'Elle n''est utile qu''en mesure et physique', false, 3, NULL, 'L''estimation est utile dans toutes les situations mathématiques — et dans la vie quotidienne (budget, timing...).'),
('17070000-0000-0000-0000-000000000007', 'Elle est trop imprécise pour être vraiment utile', false, 4, NULL, 'L''imprécision est l''objectif de l''estimation ! Elle donne une ordre de grandeur qui permet de repérer les erreurs évidentes.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('17080000-0000-0000-0000-000000000008', 'Un avantage injuste sur les autres', false, 1, NULL, 'Non — comme les lunettes pour la vue, c''est un outil compensatoire qui rétablit l''équité, pas un avantage.'),
('17080000-0000-0000-0000-000000000008', 'Des lunettes pour quelqu''un qui a des difficultés visuelles — un outil de compensation légitime', true, 2, 'Exactement ! Les lunettes ne "trichent" pas — elles permettent à quelqu''un qui voit mal d''accéder à ce que les autres font naturellement. La calculatrice fait de même pour la dyscalculie.', NULL),
('17080000-0000-0000-0000-000000000008', 'Un signe qu''il ne comprend pas les maths', false, 3, NULL, 'Comprendre les maths et calculer rapidement de tête sont deux choses différentes. La calculatrice libère la compréhension de la charge du calcul.'),
('17080000-0000-0000-0000-000000000008', 'Acceptable seulement à la maison, jamais en classe', false, 4, NULL, 'La calculatrice est souvent incluse dans les aménagements scolaires (PAP/PPS) pour les dyscalculiques — elle est légitime en classe.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E18 : Comprendre ce que je lis
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E18') m,
(VALUES
  ('18010000-0000-0000-0000-000000000001'::uuid, 'La compréhension en lecture est différente du décodage parce que :', 1),
  ('18020000-0000-0000-0000-000000000002'::uuid, 'Avant de lire un texte, regarder le titre, les images et les sous-titres aide à :', 2),
  ('18030000-0000-0000-0000-000000000003'::uuid, 'Une "inférence" en lecture, c''est :', 3),
  ('18040000-0000-0000-0000-000000000004'::uuid, 'La meilleure façon de trouver l''idée principale d''un texte est :', 4),
  ('18050000-0000-0000-0000-000000000005'::uuid, 'Résumer un texte avec ses propres mots est utile parce que :', 5),
  ('18060000-0000-0000-0000-000000000006'::uuid, 'Face à un mot inconnu dans un texte, la meilleure stratégie est :', 6),
  ('18070000-0000-0000-0000-000000000007'::uuid, 'Se poser des questions sur le texte en lisant (lire activement) aide parce que :', 7),
  ('18080000-0000-0000-0000-000000000008'::uuid, 'Un élève qui décode bien mais comprend mal ce qu''il lit a besoin de :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18010000-0000-0000-0000-000000000001', 'Il n''y a pas de différence', false, 1, NULL, 'Si — on peut déchiffrer les mots correctement sans comprendre leur sens.'),
('18010000-0000-0000-0000-000000000001', 'Le décodage lit les mots ; la compréhension en construit le sens', true, 2, 'Exactement ! On peut lire "le chien est mélancolique" en décodant parfaitement mais sans savoir ce que veut dire "mélancolique". La compréhension va au-delà du décodage.', NULL),
('18010000-0000-0000-0000-000000000001', 'La compréhension est automatique si le décodage est bon', false, 3, NULL, 'Non — la compréhension en lecture est une compétence distincte qui nécessite ses propres stratégies.'),
('18010000-0000-0000-0000-000000000001', 'Le décodage n''est important que pour les jeunes enfants', false, 4, NULL, 'Le décodage reste important — mais la compréhension devient la compétence principale à mesure qu''on avance dans les études.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18020000-0000-0000-0000-000000000002', 'Aller plus vite dans la lecture', false, 1, NULL, 'L''objectif n''est pas la vitesse — c''est la compréhension.'),
('18020000-0000-0000-0000-000000000002', 'Activer ses connaissances sur le sujet et formuler des prédictions', true, 2, 'Exactement ! Cette stratégie "pre-lecture" prépare le cerveau à recevoir l''information. Avoir un cadre de référence avant de lire améliore significativement la compréhension.', NULL),
('18020000-0000-0000-0000-000000000002', 'Décider si le texte est intéressant ou non', false, 3, NULL, 'Juger l''intérêt peut faire partie de la réaction — mais l''objectif de la pré-lecture est de préparer la compréhension.'),
('18020000-0000-0000-0000-000000000002', 'Mémoriser les titres pour les examens', false, 4, NULL, 'L''objectif est la compréhension en temps réel — pas la mémorisation des titres.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18030000-0000-0000-0000-000000000003', 'Un mot très difficile à lire', false, 1, NULL, 'Non — une inférence est une compétence de compréhension, pas de décodage.'),
('18030000-0000-0000-0000-000000000003', 'Une information qu''on déduit du texte sans qu''elle soit écrite explicitement', true, 2, 'Parfait ! "Il pleuvait et Paul regardait par la fenêtre" → on peut inférer que Paul est triste ou impatient — c''est écrit nulle part mais le texte le suggère. Les inférences sont au cœur de la compréhension avancée.', NULL),
('18030000-0000-0000-0000-000000000003', 'Une erreur de lecture', false, 3, NULL, 'Non — les inférences sont des déductions correctes et nécessaires pour comprendre les textes.'),
('18030000-0000-0000-0000-000000000003', 'Une opinion personnelle sur le texte', false, 4, NULL, 'L''inférence est basée sur les indices du texte — pas sur l''opinion personnelle. C''est une déduction logique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18040000-0000-0000-0000-000000000004', 'Chercher la phrase la plus longue', false, 1, NULL, 'La longueur d''une phrase n''indique pas son importance dans le texte.'),
('18040000-0000-0000-0000-000000000004', 'Se demander : si je devais dire ce texte en une phrase, que dirais-je ?', true, 2, 'Parfait ! Cette question force à synthétiser. L''idée principale est ce qu''on retiendrait si on ne pouvait garder qu''une seule chose du texte.', NULL),
('18040000-0000-0000-0000-000000000004', 'Chercher le mot qui revient le plus souvent', false, 3, NULL, 'Le mot le plus fréquent peut être un article ou un mot commun — pas forcément l''idée principale.'),
('18040000-0000-0000-0000-000000000004', 'Lire uniquement la première et la dernière phrase', false, 4, NULL, 'Ces phrases peuvent donner des indices, mais l''idée principale est parfois au milieu ou distribuée dans tout le texte.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18050000-0000-0000-0000-000000000005', 'Ça prend moins de place dans le cahier', false, 1, NULL, 'C''est un avantage pratique — mais l''effet principal sur l''apprentissage est bien plus profond.'),
('18050000-0000-0000-0000-000000000005', 'Ça force à traiter et comprendre le sens — pas juste à copier des mots', true, 2, 'Exactement ! Résumer avec SES PROPRES mots force le cerveau à comprendre avant d''écrire. C''est une révision active — pas passive comme la relecture.', NULL),
('18050000-0000-0000-0000-000000000005', 'Ça remplace la lecture complète', false, 3, NULL, 'Un résumé efficace nécessite d''abord une lecture complète. Ce n''est pas un raccourci pour éviter de lire.'),
('18050000-0000-0000-0000-000000000005', 'C''est ce que les professeurs demandent toujours', false, 4, NULL, 'L''avantage est avant tout pour toi — la compréhension est meilleure après un résumé actif, quelle que soit la demande du prof.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18060000-0000-0000-0000-000000000006', 'Chercher immédiatement dans le dictionnaire', false, 1, NULL, 'Chercher au dictionnaire interrompt le flux de lecture. Essaie d''abord de déduire du contexte.'),
('18060000-0000-0000-0000-000000000006', 'Déduire son sens du contexte (phrase, images, situation) puis vérifier si besoin', true, 2, 'Parfait ! Les bons lecteurs utilisent d''abord le contexte pour inférer le sens d''un mot inconnu. Cette compétence s''entraîne et s''améliore le vocabulaire naturellement.', NULL),
('18060000-0000-0000-0000-000000000006', 'Ignorer le mot et continuer', false, 3, NULL, 'Ignorer peut être raisonnable pour les mots secondaires — mais si c''est un mot clé, ça bloque la compréhension.'),
('18060000-0000-0000-0000-000000000006', 'Relire le paragraphe jusqu''à comprendre', false, 4, NULL, 'Relire aide parfois, mais déduire du contexte est une stratégie plus active et efficace pour les mots inconnus.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18070000-0000-0000-0000-000000000007', 'Ça prend plus de temps mais vérifie qu''on a bien lu', false, 1, NULL, 'Ça peut prendre un peu plus de temps, mais l''effet va bien au-delà d''une simple vérification.'),
('18070000-0000-0000-0000-000000000007', 'Le cerveau traite l''information plus profondément quand il cherche des réponses actives', true, 2, 'Exactement ! "Pourquoi le personnage fait-il ça ?" "Qu''est-ce qui va se passer ensuite ?" Ces questions transforment la lecture passive en processus actif de construction du sens.', NULL),
('18070000-0000-0000-0000-000000000007', 'Ça aide à lire plus vite', false, 3, NULL, 'La lecture active peut être plus lente à court terme — mais bien plus efficace pour la compréhension et la mémorisation.'),
('18070000-0000-0000-0000-000000000007', 'Ça ne sert à rien pour les textes qu''on trouve ennuyeux', false, 4, NULL, 'Se poser des questions aide particulièrement pour les textes difficiles ou peu intéressants — en créant un engagement artificiel qui aide à maintenir l''attention.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('18080000-0000-0000-0000-000000000008', 'Lire plus vite pour s''entraîner', false, 1, NULL, 'La vitesse de lecture n''est pas le problème ici — c''est la compréhension.'),
('18080000-0000-0000-0000-000000000008', 'Travailler spécifiquement les stratégies de compréhension (inférences, idée principale, vocabulaire)', true, 2, 'Exactement ! Le décodage et la compréhension sont deux compétences distinctes. Un bon décodeur qui comprend mal a besoin de stratégies de compréhension — pas d''exercices de décodage.', NULL),
('18080000-0000-0000-0000-000000000008', 'Plus d''exercices de lecture à voix haute', false, 3, NULL, 'La lecture à voix haute peut aider le décodage (déjà bon ici) — mais ne travaille pas directement la compréhension.'),
('18080000-0000-0000-0000-000000000008', 'Écouter plus d''audiobooks pour compenser', false, 4, NULL, 'Les audiobooks peuvent aider l''accès au contenu — mais ne développent pas les stratégies de compréhension de texte écrit nécessaires à l''école.');

-- ═══════════════════════════════════════════════════════════════════════
-- SELF-EVAL — Séries 4, 5, 6
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E11') m,
(VALUES
  ('J''ai expérimenté au moins 2 méthodes d''apprentissage différentes et comparé les résultats', 1.5, 1),
  ('Je connais ma façon préférentielle d''apprendre (visuelle, auditive, kinesthésique...)', 1.5, 2),
  ('J''ai essayé le sketchnoting ou la carte mentale pour prendre des notes', 1.0, 3),
  ('J''ai expliqué quelque chose que j''ai appris à quelqu''un d''autre', 1.0, 4),
  ('Je reformule avec mes propres mots plutôt que de copier-coller', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E12') m,
(VALUES
  ('Je distingue révision active (se tester) de révision passive (relire)', 1.5, 1),
  ('J''ai planifié mes révisions avec des intervalles espacés pour au moins un prochain contrôle', 1.5, 2),
  ('J''utilise des flashcards ou l''auto-questionnement régulièrement', 1.0, 3),
  ('Je commence à réviser suffisamment en avance (pas la veille)', 1.0, 4),
  ('Je sais identifier ce que je ne maîtrise pas encore grâce aux erreurs lors de l''auto-test', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E13') m,
(VALUES
  ('Je connais au moins 2 outils numériques ou stratégies adaptées à mes difficultés DYS', 1.5, 1),
  ('J''ai essayé au moins un outil (lecteur vocal, polices adaptées, mind map avant d''écrire)', 1.5, 2),
  ('Je comprends que les aménagements ne sont pas de la triche', 1.0, 3),
  ('Je peux demander un aménagement à mon prof si j''en ai besoin', 1.0, 4),
  ('J''ai une stratégie pour mémoriser l''orthographe des mots qui me posent problème', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E14') m,
(VALUES
  ('Je comprends la différence entre assertivité, passivité et agressivité', 1.0, 1),
  ('J''utilise des messages en "je" pour exprimer ce que je ressens', 1.5, 2),
  ('J''ai réussi à demander quelque chose de difficile à un adulte de façon calme', 1.5, 3),
  ('Je sais dire non quand c''est important pour moi', 1.0, 4),
  ('Je peux expliquer ma neurodivergence simplement à quelqu''un si je le souhaite', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E15') m,
(VALUES
  ('Je comprends ce que sont les codes sociaux implicites et comment je les vis', 1.0, 1),
  ('Je sais identifier une amitié où je peux être moi-même vs une où je dois me cacher', 1.5, 2),
  ('J''ai au moins une activité ou communauté où je rencontre des gens qui partagent mes intérêts', 1.5, 3),
  ('Je respecte mon besoin de temps seul sans me culpabiliser', 1.0, 4),
  ('Je comprends pourquoi les malentendus arrivent et comment les résoudre calmement', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E16') m,
(VALUES
  ('Je fais la différence entre conflit ponctuel et harcèlement', 1.5, 1),
  ('Je sais que demander de l''aide à un adulte face au harcèlement est intelligent, pas faible', 1.5, 2),
  ('J''ai essayé une stratégie de résolution de conflit gagne-gagne', 1.0, 3),
  ('Je peux exprimer ma colère face à l''injustice sans exploser', 1.0, 4),
  ('Je sais à qui m''adresser dans mon école si je vis ou vois du harcèlement', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E17') m,
(VALUES
  ('Je comprends ce qu''est la dyscalculie et si elle m''affecte', 1.0, 1),
  ('J''ai au moins une stratégie pour les tables de multiplication qui marche pour moi', 1.5, 2),
  ('Je décompose les problèmes complexes en étapes avant de calculer', 1.5, 3),
  ('J''utilise du matériel concret ou des dessins quand une notion est floue', 1.0, 4),
  ('Je sais utiliser une calculatrice de façon efficace (et je sais quand c''est autorisé)', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E18') m,
(VALUES
  ('Je fais une pré-lecture (titre, images, sous-titres) avant de lire un texte long', 1.0, 1),
  ('Je me pose des questions sur le texte en lisant (lecture active)', 1.5, 2),
  ('Je peux trouver l''idée principale d''un paragraphe ou d''un texte', 1.5, 3),
  ('Je sais déduire le sens d''un mot inconnu grâce au contexte', 1.0, 4),
  ('Je résume ce que j''ai lu avec mes propres mots après une lecture', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- ACTIVITIES — Séries 4, 5, 6
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'mon-kit-apprentissage', 'Mon kit d''apprentissage sur mesure',
  'Teste 3 méthodes différentes sur le même contenu et garde la meilleure',
  '[
    {"numero": 1, "titre": "Choisir le contenu", "duree_min": 2, "instruction": "Choisis une leçon que tu dois apprendre cette semaine (10-15 lignes maximum). Tu vas apprendre le même contenu de 3 façons différentes et comparer.", "exemples": ["Un paragraphe d''histoire", "5 définitions de sciences"]},
    {"numero": 2, "titre": "Méthode 1 : Relecture", "duree_min": 4, "instruction": "Lis le contenu 2 fois normalement. Note combien tu retiens immédiatement après.", "exemples": ["Relecture × 2 → J''ai retenu 3 choses sur 5"]},
    {"numero": 3, "titre": "Méthode 2 : Sketchnote ou carte mentale", "duree_min": 5, "instruction": "Reprends le même contenu. Crée une carte mentale ou des dessins pour représenter les idées clés. Note combien tu retiens maintenant.", "exemples": ["Carte mentale → J''ai retenu 4 choses sur 5"]},
    {"numero": 4, "titre": "Méthode 3 : S''auto-tester", "duree_min": 5, "instruction": "Reprends le même contenu. Cache-le et essaie de te souvenir sans aide. Note tes erreurs, relis, et reteste. Note le résultat final.", "exemples": ["Auto-test → D''abord 3/5, après correction 5/5"]},
    {"numero": 5, "titre": "Mon verdict", "duree_min": 2, "instruction": "Compare tes 3 résultats. Quelle méthode a le mieux marché pour toi ? Engage-toi à l''utiliser lors de ta prochaine révision.", "exemples": ["Ma méthode gagnante : auto-test après carte mentale"]}
  ]'::jsonb,
  'Quelle méthode t''a le plus surpris ? Tu t''y attendais, ou tu as découvert quelque chose de nouveau sur comment tu apprends ?',
  18, 25, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E11') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'plan-revision-prochain-controle', 'Mon plan de révision pour mon prochain contrôle',
  'Construis un vrai plan de révision espacée pour un prochain examen',
  '[
    {"numero": 1, "titre": "Le contrôle cible", "duree_min": 2, "instruction": "Note la date de ton prochain contrôle ou examen. Calcule combien de jours il reste. Si moins de 7 jours : plan accéléré. Si plus : plan spacé.", "exemples": ["Contrôle de géographie le 18 = dans 14 jours"]},
    {"numero": 2, "titre": "Ce que je dois maîtriser", "duree_min": 4, "instruction": "Décompose le contenu du contrôle en 4-6 blocs thématiques. Évalue ton niveau actuel sur chaque (0=rien, 5=je maîtrise).", "exemples": ["Bloc 1 : Les fleuves → niveau 2", "Bloc 2 : Les régions → niveau 4"]},
    {"numero": 3, "titre": "Mon planning espacé", "duree_min": 6, "instruction": "Place tes sessions dans ton agenda selon la règle : Révision 1 (maintenant) → 3 jours → 7 jours → 2 jours avant. Pour les blocs moins maîtrisés, prévois plus de sessions.", "exemples": ["Mardi : fleuves (60min)", "Vendredi : fleuves + régions (45min)", "Mardi suivant : tout (30min)", "Jeudi : mini-test (20min)"]},
    {"numero": 4, "titre": "Mes méthodes de révision", "duree_min": 3, "instruction": "Pour chaque session, note quelle méthode active tu utiliseras : flashcards, expliquer à voix haute, schéma, exercices...", "exemples": ["Session 1 : flashcards fleuves", "Session 2 : expliquer la carte à voix haute"]}
  ]'::jsonb,
  'Est-ce que planifier tes révisions te fait te sentir plus ou moins stressé ? Qu''est-ce qui était difficile à planifier ?',
  15, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E12') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'ma-boite-outils-dys', 'Ma boîte à outils DYS',
  'Configure et teste tes outils numériques adaptés',
  '[
    {"numero": 1, "titre": "Audit de mes difficultés", "duree_min": 4, "instruction": "Note tes 3 principales difficultés à l''écrit ou en lecture (exemples : confondre b/d, lire lentement, faire des fautes d''orthographe, mal organiser mes idées). Pour chacune, note à quel point ça t''impacte (1-10).", "exemples": ["Confusion b/d → 7/10", "Orthographe → 8/10"]},
    {"numero": 2, "titre": "Trouver mes outils", "duree_min": 5, "instruction": "Pour chaque difficulté, cherche un outil ou stratégie : lecteur vocal (voix naturelle sur téléphone), police OpenDyslexic, carte mentale avant d''écrire, correcteur orthographique... Note celui qui te semble le plus utile pour toi.", "exemples": ["Orthographe → Correcteur + je photographie les mots bien orthographiés pour mémorisation visuelle"]},
    {"numero": 3, "titre": "Tester pendant 10 minutes", "duree_min": 10, "instruction": "Teste ton outil principal sur un vrai devoir ou exercice. Observe : est-ce que ça aide vraiment ? Est-ce que tu comprends mieux ? Est-ce plus rapide ou plus confortable ?", "exemples": ["J''ai utilisé le lecteur vocal sur le texte d''histoire → j''ai compris 80% vs 50% avant"]},
    {"numero": 4, "titre": "Mon dossier d''aménagements", "duree_min": 3, "instruction": "Note les aménagements que tu voudrais avoir en classe (tiers-temps, ordinateur, agrandissement...). Prépare comment tu vas en parler à tes parents et à ton prof référent.", "exemples": ["Je veux demander : ordinateur en rédaction + tiers-temps aux contrôles"]}
  ]'::jsonb,
  'Quel outil t''a le plus aidé ? Comment tu te sens à l''idée de demander des aménagements officiels ?',
  22, 30, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E13') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'exprimer-mes-besoins', 'Exprimer mes besoins',
  'Prépare et pratique une vraie conversation difficile',
  '[
    {"numero": 1, "titre": "Identifier ma situation", "duree_min": 3, "instruction": "Pense à une situation où tu voudrais exprimer un besoin ou un problème (à un prof, un camarade, tes parents). Décris-la précisément : qui, quoi, depuis quand.", "exemples": ["Je veux demander à ma prof de français de me laisser utiliser un ordinateur", "Je veux dire à mon ami qu''il me parle trop fort"]},
    {"numero": 2, "titre": "Préparer mon message en ''je''", "duree_min": 5, "instruction": "Formule ce que tu veux dire avec la structure CNV : (1) Ce que je constate, (2) Ce que je ressens, (3) Ce dont j''ai besoin, (4) Ce que je demande. Évite ''tu'' accusateur.", "exemples": ["''Quand il n''y a pas d''aménagement pour ma dyslexie (constat), je me sens découragé (sentiment), parce que j''ai besoin de plus de temps pour montrer ce que je sais (besoin). Est-ce qu''on peut parler des options ? (demande)''"]},
    {"numero": 3, "titre": "S''entraîner à voix haute", "duree_min": 4, "instruction": "Dis ton message à voix haute 2 fois, comme si la personne était là. Observe : tu te sens comment ? Qu''est-ce qui est encore difficile ?", "exemples": ["La voix tremble au début, puis c''est plus fluide"]},
    {"numero": 4, "titre": "Choisir le bon moment", "duree_min": 3, "instruction": "Planifie quand tu vas avoir cette conversation : quel moment est le plus calme ? La personne sera-t-elle disponible ? Qu''est-ce que tu feras si ça ne se passe pas comme prévu ?", "exemples": ["Je vais parler à ma prof après le cours de demain, quand tout le monde sera parti"]}
  ]'::jsonb,
  'Comment tu te sens à l''idée d''avoir cette conversation ? Qu''est-ce qui t''a le plus aidé à la préparer ?',
  15, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E14') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'ma-tribu-a-moi', 'Trouver ma tribu',
  'Explore des pistes pour rencontrer des personnes qui te correspondent',
  '[
    {"numero": 1, "titre": "Qui je suis (socialement)", "duree_min": 4, "instruction": "Réponds honnêtement : je préfère (1 ami proche / plusieurs amis / les deux). Je me sens bien (seul parfois / souvent en groupe). Mes amitiés se passent mieux (avec mes intérêts communs / avec la proximité géographique / autre).", "exemples": ["Moi : 1-2 amis proches, intérêts communs, j''aime les discussions profondes"]},
    {"numero": 2, "titre": "Mes passions comme portes", "duree_min": 5, "instruction": "Liste tes 3 passions ou intérêts les plus forts. Pour chacun, note : est-ce qu''il y a un club, une association, un forum, un groupe autour de ça dans ta ville ou en ligne ? Est-ce que tu l''as déjà exploré ?", "exemples": ["Passion : codage → Club info au collège (pas encore essayé)", "Passion : manga → groupe lecture médiathèque"]},
    {"numero": 3, "titre": "Décoder un malentendu passé", "duree_min": 4, "instruction": "Pense à un malentendu ou une situation sociale difficile récente. Essaie de voir la situation du point de vue de l''autre : qu''est-ce qu''il/elle a peut-être compris ? Comment aurais-tu pu formuler différemment ?", "exemples": ["J''ai répondu laconiquement et il a pensé que j''étais froid. Prochaine fois : ajouter une question de retour"]},
    {"numero": 4, "titre": "Mon engagement social de la semaine", "duree_min": 3, "instruction": "Choisis UNE petite action sociale concrète cette semaine : rejoindre un club, répondre plus longuement à quelqu''un, inviter une personne à une activité. Juste une.", "exemples": ["Lundi : je vais demander à rejoindre le club info"]}
  ]'::jsonb,
  'Comment tu te sens à l''idée de faire cette action sociale ? Est-ce que la vision de "trouver sa tribu" change ta façon de voir les amitiés ?',
  16, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E15') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'resoudre-un-conflit-reel', 'Résoudre un vrai conflit',
  'Applique les étapes de résolution à une situation que tu vis',
  '[
    {"numero": 1, "titre": "Identifier le conflit", "duree_min": 3, "instruction": "Décris un conflit ou une tension que tu vis en ce moment (pas le plus grave — un qui est gérable). Qui est impliqué ? Depuis combien de temps ? Qu''est-ce qui a déclenché ?", "exemples": ["Tension avec mon camarade car il utilise mes affaires sans demander"]},
    {"numero": 2, "titre": "Les deux côtés", "duree_min": 5, "instruction": "Note TON point de vue : ce que tu as ressenti, ce que tu voulais. Maintenant essaie de noter le SIEN : qu''est-ce qu''il voulait probablement ? Pourquoi a-t-il agi ainsi selon toi ?", "exemples": ["Moi : frustration, besoin de respect. Lui : il pensait peut-être que c''était OK entre amis"]},
    {"numero": 3, "titre": "La solution gagne-gagne", "duree_min": 5, "instruction": "Cherche une solution où vous obtenez tous les deux l''essentiel de ce dont vous avez besoin. Formule-la en une phrase : ''Je propose que...''. Comment pourrais-tu présenter ça calmement ?", "exemples": ["''Je propose qu''on se demande toujours avant d''utiliser les affaires de l''autre — même entre amis''"]},
    {"numero": 4, "titre": "Mon plan d''action", "duree_min": 3, "instruction": "Décide : vas-tu parler à cette personne ? Quand ? De quelle façon ? As-tu besoin d''aide d''un adulte ? Note ce que tu vas faire.", "exemples": ["Demain midi, je vais lui parler calmement. Si ça ne marche pas, j''en parle au CPE"]}
  ]'::jsonb,
  'En cherchant le point de vue de l''autre, tu as découvert quoi ? Est-ce que ça a changé comment tu vois la situation ?',
  16, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E16') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'mes-strategies-maths', 'Mes stratégies maths à moi',
  'Construis ta boîte à outils mathématique personnalisée',
  '[
    {"numero": 1, "titre": "Mon bilan maths", "duree_min": 4, "instruction": "Note tes 3 plus grandes difficultés en maths (exemple : tables × 7, fractions, lire l''heure, problèmes complexes). Pour chacune, note à quel point ça t''impacte (1-10).", "exemples": ["Tables de 7 → 8/10", "Fractions → 6/10"]},
    {"numero": 2, "titre": "Stratégies visuelles et concrètes", "duree_min": 5, "instruction": "Pour ta difficulté principale, essaie de la résoudre de façon VISUELLE (dessine, colorie, découpe en parties). Observe si le concret aide ta compréhension.", "exemples": ["Fractions : dessiner des pizzas découpées → j''ai compris 2/3 et 3/4 visuellement"]},
    {"numero": 3, "titre": "Mon astuce pour les tables", "duree_min": 5, "instruction": "Choisis une table difficile pour toi. Cherche un pattern (× 9 : les dizaines montent, les unités descendent : 9, 18, 27...) ou invente une comptine ou histoire. Teste si ça marche pour toi.", "exemples": ["Table de 6 : 6×6=36, 6×7=42... je fais : '' 6, 12, 18... je compte de 6 en 6 en sautant''"]},
    {"numero": 4, "titre": "Méthode de résolution de problème", "duree_min": 4, "instruction": "Prends un problème de ton cours. Avant de calculer : (1) lis 2 fois, (2) reformule avec tes mots, (3) dessine si possible, (4) identifie ce qu''on cherche. Puis calcule. Compare avec faire directement.", "exemples": ["En reformulant d''abord, j''ai compris que c''était une division et non une multiplication"]}
  ]'::jsonb,
  'Quelle stratégie mathématique as-tu trouvée la plus utile ? Est-ce que tu vois les maths différemment maintenant ?',
  18, 25, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E17') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'lire-comme-un-detective', 'Lire comme un détective',
  'Applique des stratégies de lecture active sur un vrai texte',
  '[
    {"numero": 1, "titre": "Pré-lecture", "duree_min": 3, "instruction": "Prends un texte de ton cours (histoire, sciences, français). Sans lire, regarde : titre, sous-titres, images, premier et dernier paragraphe. Formule une prédiction : de quoi parle ce texte ?", "exemples": ["Je pense que ça parle de... parce que le titre dit... et l''image montre..."]},
    {"numero": 2, "titre": "Lecture avec questions", "duree_min": 6, "instruction": "Lis le texte en te posant ces questions : Qui ? Quoi ? Pourquoi ? Et alors ? Surligne ou note les réponses au fur et à mesure. Si tu trouves un mot inconnu, essaie de deviner son sens avant de chercher.", "exemples": ["J''ai surligné 3 réponses au ''pourquoi'', j''ai deviné 2 mots inconnus"]},
    {"numero": 3, "titre": "Trouver l''idée principale", "duree_min": 3, "instruction": "Ferme ou cache le texte. Essaie de répondre en 1 phrase : de quoi parle ce texte EN RÉSUMÉ ? Puis vérifie en relisant rapidement.", "exemples": ["Ce texte parle de... sa cause principale est... sa conséquence est..."]},
    {"numero": 4, "titre": "Résumé en 5 mots", "duree_min": 3, "instruction": "Résume le texte en 5 mots clés seulement. Ces 5 mots doivent capturer l''essentiel. Puis écris 2-3 phrases de résumé avec tes propres mots.", "exemples": ["5 mots : révolution, causes, peuple, roi, conséquences"]}
  ]'::jsonb,
  'Est-ce que lire activement (avec des questions) a changé ta compréhension ? Qu''est-ce qui était le plus difficile ?',
  15, 20, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E18') m
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- MINI-JEUX — Séries 4, 5, 6
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-apprentissage', 'Vrai ou Mythe ? — Apprendre à ma façon', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e11mg1", "affirmation": "Il existe UN seul style d''apprentissage optimal pour tout le monde.", "reponse": "MYTHE", "explication": "Non ! Chaque cerveau apprend différemment. Expérimenter plusieurs méthodes et garder ce qui marche pour TOI est la clé."},
      {"id": "e11mg2", "affirmation": "Expliquer ce qu''on a appris à quelqu''un d''autre est une excellente façon de réviser.", "reponse": "VRAI", "explication": "Oui ! Enseigner force à traiter, organiser et reformuler l''information — ce qui crée des traces mémorielles bien plus solides."},
      {"id": "e11mg3", "affirmation": "La carte mentale ne convient qu''aux matières artistiques.", "reponse": "MYTHE", "explication": "Non ! Les cartes mentales fonctionnent pour toutes les matières — histoire, sciences, maths, langues. Elles cartographient les connexions entre concepts."},
      {"id": "e11mg4", "affirmation": "Reformuler avec ses propres mots est plus efficace que de copier le cours.", "reponse": "VRAI", "explication": "Oui — reformuler force le cerveau à comprendre avant d''écrire. C''est de la révision active, pas passive."},
      {"id": "e11mg5", "affirmation": "Si une méthode marche pour ton camarade, elle marchera forcément pour toi.", "reponse": "MYTHE", "explication": "Non ! Les profils cognitifs sont uniques. Ce qui fonctionne pour l''un peut être inefficace pour l''autre."},
      {"id": "e11mg6", "affirmation": "Le sketchnoting (notes dessinées) active plus de zones du cerveau que la prise de notes écrite classique.", "reponse": "VRAI", "explication": "Oui ! Le double encodage (verbal + visuel) crée des traces mémorielles plus riches et plus durables."},
      {"id": "e11mg7", "affirmation": "L''interleaving (mélanger les sujets) est moins efficace que travailler un sujet d''un bloc.", "reponse": "MYTHE", "explication": "Non — l''interleaving est souvent plus efficace car il force le cerveau à discriminer entre concepts, ce qui renforce la compréhension."},
      {"id": "e11mg8", "affirmation": "La méthode Feynman (expliquer simplement) révèle immédiatement les zones qu''on ne maîtrise pas encore.", "reponse": "VRAI", "explication": "Exactement ! Quand tu bloques sur une explication simple, tu sais exactement quoi retravailler. C''est un outil de diagnostic puissant."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E11') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-revision', 'Vrai ou Mythe ? — Réviser intelligemment', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e12mg1", "affirmation": "Relire son cours plusieurs fois est la méthode de révision la plus efficace.", "reponse": "MYTHE", "explication": "Non ! La relecture crée une illusion de maîtrise. S''auto-tester (flashcards, questions) est bien plus efficace — c''est le testing effect."},
      {"id": "e12mg2", "affirmation": "Faire des erreurs lors de l''auto-test est une bonne chose.", "reponse": "VRAI", "explication": "Oui ! Une erreur découverte pendant l''auto-test te dit exactement quoi retravailler — bien mieux que de découvrir ses erreurs à l''examen."},
      {"id": "e12mg3", "affirmation": "Bachoter la veille de l''examen est aussi efficace que la révision espacée.", "reponse": "MYTHE", "explication": "Non — le bachotage aide à court terme mais disparaît vite. La révision espacée ancre dans la mémoire long terme."},
      {"id": "e12mg4", "affirmation": "Le sommeil joue un rôle actif dans la consolidation des apprentissages.", "reponse": "VRAI", "explication": "Oui — pendant le sommeil, le cerveau trie, consolide et organise ce qui a été appris dans la journée."},
      {"id": "e12mg5", "affirmation": "Réviser dans un contexte similaire à l''examen peut améliorer les performances.", "reponse": "VRAI", "explication": "Oui — la mémoire est contextuelle. Les indices de l''environnement facilitent la récupération."},
      {"id": "e12mg6", "affirmation": "Travailler plusieurs sujets en alternance (interleaving) nuit à la mémorisation.", "reponse": "MYTHE", "explication": "Non — l''interleaving force le cerveau à discriminer activement entre concepts, ce qui renforce la compréhension à long terme."},
      {"id": "e12mg7", "affirmation": "Planifier ses révisions réduit le stress lié aux examens.", "reponse": "VRAI", "explication": "Oui — savoir ce qu''on fait et quand réduit l''anxiété de l''incertitude. Un plan transforme une montagne en étapes gérables."},
      {"id": "e12mg8", "affirmation": "Le nombre d''heures de révision est le meilleur indicateur de préparation.", "reponse": "MYTHE", "explication": "Non — la qualité et la méthode de révision comptent bien plus que la durée. 30 minutes actives > 2 heures de relecture passive."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E12') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-dys-outils', 'Vrai ou Mythe ? — Les outils DYS', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e13mg1", "affirmation": "Utiliser un lecteur vocal ou un ordinateur en classe, c''est tricher.", "reponse": "MYTHE", "explication": "Non — ce sont des aménagements qui rétablissent l''équité. Comme des lunettes pour la vue, ils permettent d''accéder au même niveau que les autres."},
      {"id": "e13mg2", "affirmation": "La dyslexie affecte l''intelligence.", "reponse": "MYTHE", "explication": "Non ! La dyslexie affecte le traitement du langage écrit — pas le raisonnement, la créativité, ou la compréhension orale."},
      {"id": "e13mg3", "affirmation": "Créer une carte mentale AVANT d''écrire aide les élèves DYS à organiser leurs idées.", "reponse": "VRAI", "explication": "Oui — le mind mapping permet de capturer les idées sans contrainte d''écriture, puis de les organiser avant de rédiger."},
      {"id": "e13mg4", "affirmation": "Utiliser son doigt pour suivre les lignes est une mauvaise habitude.", "reponse": "MYTHE", "explication": "Non — cet ancrage tactile aide à maintenir le suivi visuel et réduire les sauts de lignes. C''est un outil simple et efficace."},
      {"id": "e13mg5", "affirmation": "Les polices de caractères adaptées (comme OpenDyslexic) peuvent aider certains lecteurs dyslexiques.", "reponse": "VRAI", "explication": "Pour certains profils, les polices avec bases lourdes réduisent la confusion entre lettres. Ce n''est pas universel — essaie et vois !"},
      {"id": "e13mg6", "affirmation": "La dysorthographie disparaît complètement avec l''âge sans aide spécifique.", "reponse": "MYTHE", "explication": "Non — elle s''améliore avec un travail spécifique adapté, mais des stratégies compensatoires restent souvent utiles à l''âge adulte."},
      {"id": "e13mg7", "affirmation": "Répéter un mot 10 fois est la meilleure façon d''en mémoriser l''orthographe.", "reponse": "MYTHE", "explication": "Non — créer une image visuelle ou une histoire autour du mot est généralement plus efficace pour la mémoire orthographique."},
      {"id": "e13mg8", "affirmation": "Le tiers-temps (temps supplémentaire aux examens) permet aux élèves DYS de montrer leurs vraies compétences.", "reponse": "VRAI", "explication": "Oui — sans le temps supplémentaire, les examens évaluent la rapidité et la difficulté DYS, pas les compétences scolaires réelles."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E13') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-communication', 'Vrai ou Mythe ? — Communication et relations', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e14mg1", "affirmation": "Dire ''tu m''as blessé'' est moins efficace que ''je me suis senti blessé''.", "reponse": "VRAI", "explication": "Oui — les messages en ''je'' décrivent ta réalité sans accuser. L''autre peut entendre sans se défendre, ce qui ouvre le dialogue."},
      {"id": "e14mg2", "affirmation": "Le harcèlement scolaire s''arrête toujours tout seul si on l''ignore.", "reponse": "MYTHE", "explication": "Non — le harcèlement tend à s''aggraver sans intervention. Impliquer un adulte n''est pas de la dénonciation, c''est se protéger."},
      {"id": "e14mg3", "affirmation": "Dire non à une demande est égoïste.", "reponse": "MYTHE", "explication": "Non — savoir dire non protège ton énergie et tes limites. C''est une compétence saine et nécessaire."},
      {"id": "e14mg4", "affirmation": "L''assertivité est différente de l''agressivité et de la passivité.", "reponse": "VRAI", "explication": "Oui — l''assertivité exprime clairement ses besoins sans écraser l''autre (agressivité) ni s''écraser soi-même (passivité)."},
      {"id": "e14mg5", "affirmation": "Préférer avoir 1-2 amis proches plutôt qu''un grand groupe est un problème social.", "reponse": "MYTHE", "explication": "Non — c''est une préférence légitime. La qualité des liens prime sur la quantité."},
      {"id": "e14mg6", "affirmation": "Les codes sociaux implicites peuvent s''apprendre explicitement.", "reponse": "VRAI", "explication": "Oui ! Ce qui s''apprend naturellement pour certains peut être appris de façon plus explicite. C''est une compétence, pas un don inné."},
      {"id": "e14mg7", "affirmation": "La stratégie gagne-gagne dans un conflit est toujours possible.", "reponse": "MYTHE", "explication": "Pas toujours — mais c''est la stratégie à chercher en priorité car elle crée des solutions durables. Parfois un compromis est la meilleure option disponible."},
      {"id": "e14mg8", "affirmation": "Expliquer sa neurodivergence en termes concrets est plus efficace qu''utiliser les termes médicaux.", "reponse": "VRAI", "explication": "Oui — ''Mon cerveau traite les sons très fort'' est plus compréhensible que ''hypersensibilité auditive liée au TDAH'' pour quelqu''un sans formation."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E14') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-maths', 'Vrai ou Mythe ? — Les maths à ma façon', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e17mg1", "affirmation": "Utiliser ses doigts pour compter est une mauvaise habitude à corriger.", "reponse": "MYTHE", "explication": "Non — les doigts sont un outil mathématique légitime. Des recherches montrent qu''ils aident à construire le sens du nombre."},
      {"id": "e17mg2", "affirmation": "La dyscalculie affecte le sens des quantités, pas l''intelligence.", "reponse": "VRAI", "explication": "Oui — la dyscalculie est une différence dans le traitement numérique. Elle n''impacte pas les capacités de raisonnement général."},
      {"id": "e17mg3", "affirmation": "Pour résoudre un problème, il faut toujours commencer par calculer.", "reponse": "MYTHE", "explication": "Non — d''abord comprendre ce que le problème demande (reformuler, dessiner), PUIS calculer. Beaucoup d''erreurs viennent de ne pas avoir compris la question."},
      {"id": "e17mg4", "affirmation": "Le matériel concret (réglettes, jetons) n''est utile qu''en maternelle.", "reponse": "MYTHE", "explication": "Non — le concret aide à comprendre les abstractions mathématiques à tous les niveaux. Même les universitaires utilisent des représentations concrètes pour les nouveaux concepts."},
      {"id": "e17mg5", "affirmation": "L''estimation permet de détecter rapidement une erreur de calcul évidente.", "reponse": "VRAI", "explication": "Oui — une estimation rapide dit si le résultat est dans le bon ordre de grandeur. C''est un outil puissant de vérification."},
      {"id": "e17mg6", "affirmation": "Utiliser une calculatrice est toujours de la triche.", "reponse": "MYTHE", "explication": "Non — la calculatrice est un outil compensatoire légitime, inclus dans les aménagements scolaires pour les dyscalculiques."},
      {"id": "e17mg7", "affirmation": "Les tables de multiplication ont des patterns qu''on peut utiliser pour les retenir.", "reponse": "VRAI", "explication": "Oui ! × 9 : la somme des chiffres fait 9 (9, 18, 27...). × 5 : finit toujours en 0 ou 5. Ces patterns facilitent énormément la mémorisation."},
      {"id": "e17mg8", "affirmation": "Dessiner un problème de maths est une aide valide pour le résoudre.", "reponse": "VRAI", "explication": "Absolument — visualiser un problème permet souvent de comprendre la structure qui était abstraite dans le texte."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E17') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-lecture', 'Vrai ou Mythe ? — Comprendre ce que je lis', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e18mg1", "affirmation": "Bien déchiffrer les mots garantit de bien comprendre le texte.", "reponse": "MYTHE", "explication": "Non — le décodage et la compréhension sont deux compétences distinctes. On peut lire tous les mots correctement sans en comprendre le sens."},
      {"id": "e18mg2", "affirmation": "Regarder le titre et les images avant de lire améliore la compréhension.", "reponse": "VRAI", "explication": "Oui — la pré-lecture active les connaissances préalables et prépare le cerveau à recevoir l''information."},
      {"id": "e18mg3", "affirmation": "Les inférences (déduire ce qui n''est pas dit) ne sont utiles qu''en littérature.", "reponse": "MYTHE", "explication": "Non — les inférences sont nécessaires dans tous les types de textes : scientifiques, historiques, d''actualité..."},
      {"id": "e18mg4", "affirmation": "Se tromper dans ses prédictions avant de lire est un signe de mauvaise compréhension.", "reponse": "MYTHE", "explication": "Non — faire des prédictions et les vérifier est le processus normal de lecture active. Les prédictions imparfaites créent de l''engagement !"},
      {"id": "e18mg5", "affirmation": "Déduire le sens d''un mot inconnu grâce au contexte est une compétence qui s''améliore avec la pratique.", "reponse": "VRAI", "explication": "Oui — les bons lecteurs utilisent le contexte pour inférer. Cette compétence s''entraîne et enrichit le vocabulaire naturellement."},
      {"id": "e18mg6", "affirmation": "Résumer avec ses propres mots après lecture aide à mieux mémoriser.", "reponse": "VRAI", "explication": "Oui — le résumé actif force la compréhension et la mémorisation. C''est bien plus efficace que relire passivement."},
      {"id": "e18mg7", "affirmation": "L''idée principale est toujours dans la première phrase d''un paragraphe.", "reponse": "MYTHE", "explication": "Non — l''idée principale peut être au début, au milieu, à la fin, ou distribuée dans tout le paragraphe."},
      {"id": "e18mg8", "affirmation": "Se poser des questions pendant la lecture améliore la compréhension et la mémorisation.", "reponse": "VRAI", "explication": "Oui — la lecture active (questionnement pendant la lecture) engage plus profondément le cerveau que la lecture passive."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E18') m
ON CONFLICT DO NOTHING;
