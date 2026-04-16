-- ─────────────────────────────────────────────────────────────────────────
-- Seed modules pédagogiques Paideia V1 — M1 à M8
-- À exécuter APRÈS 003_modules_schema.sql
-- ─────────────────────────────────────────────────────────────────────────

-- ── BADGES modules ────────────────────────────────────────────────────────
INSERT INTO public.badges (key, title, description, rarity, criteria) VALUES
  ('m1-cartographe-cerveau',   'Cartographe du cerveau',      'Vous comprenez comment le cerveau apprenant fonctionne et pourquoi la différence est une force.',                       'common',    '{"module_code": "M1", "quiz_min": 5}'::jsonb),
  ('m2-detecteur-forces',      'Détecteur de forces',         'Vous savez identifier et nommer les forces de votre enfant avant ses difficultés.',                                      'common',    '{"module_code": "M2", "quiz_min": 5}'::jsonb),
  ('m3-traducteur-signaux',    'Traducteur de signaux',       'Vous décodez les comportements difficiles comme des signaux de besoin, pas de mauvaise volonté.',                       'common',    '{"module_code": "M3", "quiz_min": 5}'::jsonb),
  ('m4-architecte-quotidien',  'Architecte du quotidien',     'Vous construisez des routines et environnements adaptés au profil de votre enfant.',                                    'rare',      '{"module_code": "M4", "quiz_min": 5}'::jsonb),
  ('m5-diplomate-ecole',       'Diplomate de l''école',       'Vous savez collaborer efficacement avec l''équipe pédagogique pour défendre les besoins de votre enfant.',              'rare',      '{"module_code": "M5", "quiz_min": 5}'::jsonb),
  ('m6-regulateur-emotions',   'Régulateur d''émotions',      'Vous accompagnez les tempêtes émotionnelles de votre enfant avec calme et efficacité.',                                'rare',      '{"module_code": "M6", "quiz_min": 5}'::jsonb),
  ('m7-gardien-equilibre',     'Gardien de l''équilibre',     'Vous prenez soin de vous pour mieux accompagner votre enfant sur le long terme.',                                       'epic',      '{"module_code": "M7", "quiz_min": 5}'::jsonb),
  ('m8-guide-complet',         'Guide complet',               'Vous avez traversé l''ensemble du parcours Paideia. Vous êtes prêt(e) à accompagner votre enfant avec confiance et lucidité.', 'legendary', '{"module_code": "M8", "quiz_min": 5}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ── MODULES ───────────────────────────────────────────────────────────────
INSERT INTO public.modules (id, code, slug, title, subtitle, description, audience, level, estimated_duration_min, sort_order, xp_reward_quiz, xp_reward_self_eval, xp_reward_activity, badge_key, quiz_pass_threshold) VALUES
(
  'a0000000-0000-0000-0000-000000000001', 'M1',
  'comprendre-neurodivergence-cerveau-apprenant',
  'Comprendre la neurodivergence et le cerveau apprenant',
  'Comment le cerveau de votre enfant fonctionne — et pourquoi c''est une force',
  'Module fondateur. Bases neuroscientifiques accessibles, modèle des forces, plasticité cérébrale, profils neurodivergents courants.',
  'parent', 'decouverte', 30, 1, 100, 40, 30, 'm1-cartographe-cerveau', 5
),
(
  'a0000000-0000-0000-0000-000000000002', 'M2',
  'identifier-forces-profil-unique',
  'Identifier les forces et le profil unique de votre enfant',
  'Voir votre enfant tel qu''il est — pas tel qu''il devrait être',
  'Méthodes d''observation clinique, évaluation informelle des forces, profil cognitif en dents de scie, passation d''un bilan d''observation parental.',
  'parent', 'decouverte', 35, 2, 100, 40, 30, 'm2-detecteur-forces', 5
),
(
  'a0000000-0000-0000-0000-000000000003', 'M3',
  'decoder-comportements-difficiles',
  'Décoder les comportements difficiles',
  'Ce que votre enfant ne peut pas encore vous dire avec des mots',
  'Modèle de l''iceberg comportemental, fenêtre de tolérance, signaux de surcharge, masking et épuisement, réponses adaptées vs réactives.',
  'parent', 'decouverte', 35, 3, 100, 40, 30, 'm3-traducteur-signaux', 5
),
(
  'a0000000-0000-0000-0000-000000000004', 'M4',
  'amenager-quotidien-environnement-adapte',
  'Aménager le quotidien et l''environnement',
  'Construire un contexte dans lequel votre enfant peut réussir',
  'Routines visuelles, environnement sensoriel, adaptation des devoirs, transitions, gestion du temps avec les profils TDAH/DYS.',
  'parent', 'intermediaire', 40, 4, 100, 40, 30, 'm4-architecte-quotidien', 5
),
(
  'a0000000-0000-0000-0000-000000000005', 'M5',
  'collaborer-ecole-equipe-pedagogique',
  'Collaborer avec l''école et l''équipe pédagogique',
  'Devenir un partenaire efficace — pas un adversaire',
  'Droits des élèves à besoins particuliers, PAP/PPS/PPRE, comment préparer un entretien, communiquer sans se défendre, suivre les aménagements.',
  'parent', 'intermediaire', 40, 5, 100, 40, 30, 'm5-diplomate-ecole', 5
),
(
  'a0000000-0000-0000-0000-000000000006', 'M6',
  'accompagner-regulation-emotionnelle',
  'Accompagner la régulation émotionnelle',
  'Traverser les tempêtes ensemble — sans se noyer',
  'Développement émotionnel et neurodivergence, co-régulation, stratégies de décharge sensorielle, plan de crise familial, estime de soi.',
  'parent', 'intermediaire', 40, 6, 100, 40, 30, 'm6-regulateur-emotions', 5
),
(
  'a0000000-0000-0000-0000-000000000007', 'M7',
  'prendre-soin-de-soi-parent-accompagnant',
  'Prendre soin de soi en tant que parent accompagnant',
  'Vous ne pouvez pas verser d''un vase vide',
  'Fatigue compassionnelle, charge mentale du parent d''enfant neurodivergent, deuil du "enfant imaginé", ressources communautaires, auto-compassion.',
  'parent', 'intermediaire', 35, 7, 100, 40, 30, 'm7-gardien-equilibre', 5
),
(
  'a0000000-0000-0000-0000-000000000008', 'M8',
  'construire-plan-accompagnement-long-terme',
  'Construire un plan d''accompagnement à long terme',
  'De la réaction à la stratégie : votre feuille de route',
  'Synthèse du parcours, plan d''action personnalisé, objectifs SMART adaptés, suivi des progrès, révision des priorités, ressources spécialisées.',
  'parent', 'avance', 45, 8, 100, 40, 30, 'm8-guide-complet', 5
)
ON CONFLICT (code) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M1 — Comprendre la neurodivergence et le cerveau apprenant
-- ═════════════════════════════════════════════════════════════════════════

-- Quiz M1
WITH m AS (SELECT id FROM public.modules WHERE code = 'M1')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT
  q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b1010000-0000-0000-0000-000000000001'::uuid, 'Qu''est-ce que la neurodivergence ?', 1),
  ('b1020000-0000-0000-0000-000000000002'::uuid, 'Que signifie avoir un profil cognitif "en dents de scie" ?', 2),
  ('b1030000-0000-0000-0000-000000000003'::uuid, 'La plasticité cérébrale signifie que :', 3),
  ('b1040000-0000-0000-0000-000000000004'::uuid, 'Pourquoi l''environnement est-il aussi important que le cerveau lui-même ?', 4),
  ('b1050000-0000-0000-0000-000000000005'::uuid, 'Qu''est-ce qu''un enfant "doublement exceptionnel" (2e) ?', 5),
  ('b1060000-0000-0000-0000-000000000006'::uuid, 'Qu''est-ce que le "masking" ou camouflage ?', 6),
  ('b1070000-0000-0000-0000-000000000007'::uuid, 'Quelle est la définition de la "fenêtre de tolérance" dans le contexte de l''apprentissage ?', 7),
  ('b1080000-0000-0000-0000-000000000008'::uuid, 'Un enfant qui se tient parfaitement en classe et obtient des résultats moyens :', 8),
  ('b1090000-0000-0000-0000-000000000009'::uuid, 'Quel est le rôle des "forces" dans l''accompagnement neurodivergent ?', 9),
  ('b10a0000-0000-0000-0000-00000000000a'::uuid, 'Pour soutenir efficacement un enfant neurodivergent, quelle est la première étape ?', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

-- Options M1 Q1
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1010000-0000-0000-0000-000000000001', 'Un trouble qui nécessite toujours une prise en charge médicale', false, 1, NULL, 'La neurodivergence n''implique pas systématiquement une prise en charge médicale. C''est avant tout une variation naturelle.'),
('b1010000-0000-0000-0000-000000000001', 'Une variation naturelle du fonctionnement neurologique', true, 2, 'La neurodivergence désigne des variations naturelles dans la façon dont le cerveau traite l''information. Ce n''est pas un trouble à corriger, mais un mode de fonctionnement différent qui a ses propres forces.', NULL),
('b1010000-0000-0000-0000-000000000001', 'Une forme de handicap mental héréditaire', false, 3, NULL, 'La neurodivergence n''est pas un handicap mental. Certains profils peuvent être héréditaires, mais ce n''est pas la définition du terme.'),
('b1010000-0000-0000-0000-000000000001', 'Un retard de développement corrigeable avec le temps', false, 4, NULL, 'La neurodivergence n''est pas un retard — c''est une différence de fonctionnement qui persiste tout au long de la vie.');

-- Options M1 Q2
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1020000-0000-0000-0000-000000000002', 'L''enfant a des résultats scolaires très irréguliers selon les jours', false, 1, NULL, 'Cela décrit une variabilité temporelle, pas un profil "en dents de scie" qui désigne des écarts entre domaines.'),
('b1020000-0000-0000-0000-000000000002', 'L''enfant alterne entre des phases d''hyperactivité et de calme', false, 2, NULL, 'Cela décrit un comportement, pas un profil cognitif. Le profil en dents de scie concerne les écarts entre compétences.'),
('b1020000-0000-0000-0000-000000000002', 'L''enfant présente des écarts marqués entre ses points forts et ses points faibles', true, 3, 'Exactement. Un profil "en dents de scie" décrit un enfant très avancé dans certains domaines et simultanément en grande difficulté dans d''autres. C''est l''une des caractéristiques les plus distinctives de la neurodivergence.', NULL),
('b1020000-0000-0000-0000-000000000002', 'L''enfant change d''humeur rapidement selon les contextes', false, 4, NULL, 'La labilité émotionnelle est distincte du profil cognitif en dents de scie, même si elles peuvent coexister.');

-- Options M1 Q3
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1030000-0000-0000-0000-000000000003', 'Le cerveau peut se réparer seul après une blessure grave', false, 1, NULL, 'La récupération après blessure est un aspect de la plasticité, mais ce n''est pas sa définition principale.'),
('b1030000-0000-0000-0000-000000000003', 'Le cerveau reste capable de créer de nouvelles connexions tout au long de la vie', true, 2, 'La neuroplasticité est fondamentale : le cerveau forme de nouvelles connexions en réponse à l''expérience et au soutien adapté — à tout âge. C''est la base scientifique de l''espoir.', NULL),
('b1030000-0000-0000-0000-000000000003', 'L''intelligence d''un enfant augmente mécaniquement avec des exercices', false, 3, NULL, 'La plasticité ne garantit pas une augmentation mécanique du QI. Elle indique que l''apprentissage est toujours possible.'),
('b1030000-0000-0000-0000-000000000003', 'Les difficultés d''apprentissage s''atténuent naturellement avec l''âge', false, 4, NULL, 'La plasticité n''implique pas une amélioration automatique. Sans accompagnement adapté, les difficultés persistent souvent.');

-- Options M1 Q4
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1040000-0000-0000-0000-000000000004', 'Parce qu''un bon environnement peut changer le diagnostic', false, 1, NULL, 'L''environnement ne change pas le diagnostic neurologique — il change le niveau de difficulté vécu.'),
('b1040000-0000-0000-0000-000000000004', 'Parce que les stimulations extérieures modifient définitivement le cerveau', false, 2, NULL, 'Les stimulations influencent le développement, mais l''idée de modification "définitive" est inexacte.'),
('b1040000-0000-0000-0000-000000000004', 'Parce que la difficulté vient souvent de l''inadéquation entre le cerveau et son contexte', true, 3, 'Le modèle social du handicap nous apprend que la difficulté est souvent dans le décalage entre les besoins d''un individu et ce que l''environnement lui propose. Adapter l''environnement change tout.', NULL),
('b1040000-0000-0000-0000-000000000004', 'Parce que les parents peuvent compenser tous les troubles avec un cadre adapté', false, 4, NULL, 'Les parents jouent un rôle crucial, mais ils ne peuvent pas compenser à eux seuls tous les besoins. L''environnement au sens large (école, soignants) est impliqué.');

-- Options M1 Q5
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1050000-0000-0000-0000-000000000005', 'Un enfant qui a deux diagnostics neurodéveloppementaux différents', false, 1, NULL, 'Deux diagnostics = comorbidité, pas "doublement exceptionnel". Le terme 2e a une signification précise.'),
('b1050000-0000-0000-0000-000000000005', 'Un enfant à la fois haut potentiel et porteur d''un trouble neurodéveloppemental', true, 2, 'Le profil 2e (twice exceptional) désigne un enfant qui présente simultanément un haut potentiel et un trouble neurodéveloppemental. Ces profils sont souvent invisibles car les forces masquent les difficultés.', NULL),
('b1050000-0000-0000-0000-000000000005', 'Un enfant dont les parents sont tous deux neurodivergents', false, 3, NULL, 'Le terme concerne l''enfant, pas ses parents. La génétique peut être un facteur mais ce n''est pas la définition.'),
('b1050000-0000-0000-0000-000000000005', 'Un enfant évalué par deux spécialistes indépendants', false, 4, NULL, 'Le nombre de spécialistes n''a pas de rapport avec ce terme. "Doublement exceptionnel" = HPI + trouble neurodéveloppemental.');

-- Options M1 Q6
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1060000-0000-0000-0000-000000000006', 'Un enfant qui refuse d''aller à l''école pour éviter les situations difficiles', false, 1, NULL, 'C''est du refus scolaire ou de l''évitement — pas du masking. Le masking est une dissimulation active des différences.'),
('b1060000-0000-0000-0000-000000000006', 'Un parent qui minimise les difficultés de son enfant face aux enseignants', false, 2, NULL, 'Le masking désigne le comportement de l''enfant lui-même, pas celui des parents.'),
('b1060000-0000-0000-0000-000000000006', 'L''effort de dissimuler ses différences pour paraître "comme les autres"', true, 3, 'Le masking est l''effort — souvent inconscient — de se conformer aux attentes sociales. Il est très coûteux en énergie et peut mener à l''épuisement. Particulièrement fréquent chez les filles autistes et les HPI.', NULL),
('b1060000-0000-0000-0000-000000000006', 'Une technique thérapeutique pour réduire l''anxiété sociale', false, 4, NULL, 'Le masking n''est pas une technique thérapeutique — c''est un mécanisme de survie souvent subi, pas choisi.');

-- Options M1 Q7
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1070000-0000-0000-0000-000000000007', 'La durée pendant laquelle un enfant peut maintenir son attention', false, 1, NULL, 'C''est la durée d''attention — une notion différente. La fenêtre de tolérance concerne l''état du système nerveux.'),
('b1070000-0000-0000-0000-000000000007', 'L''état de régulation nerveuse dans lequel l''apprentissage est possible', true, 2, 'La fenêtre de tolérance (Daniel Siegel) désigne la zone de régulation nerveuse dans laquelle l''intégration de l''apprentissage est possible. En dehors, le cerveau est en mode survie — il ne peut pas apprendre.', NULL),
('b1070000-0000-0000-0000-000000000007', 'Le niveau de bruit acceptable dans une salle de classe', false, 3, NULL, 'C''est une norme sensorielle externe — pas la fenêtre de tolérance, qui est un état interne.'),
('b1070000-0000-0000-0000-000000000007', 'La marge d''erreur tolérée dans une évaluation scolaire', false, 4, NULL, 'Rien à voir avec l''évaluation. La fenêtre de tolérance décrit l''état du système nerveux autonome.');

-- Options M1 Q8
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1080000-0000-0000-0000-000000000008', 'N''a probablement pas de profil neurodivergent', false, 1, NULL, 'La conformité comportementale ne garantit pas l''absence de neurodivergence. Beaucoup de profils sont invisibles.'),
('b1080000-0000-0000-0000-000000000008', 'A un profil neurodivergent discret qui ne nécessite pas d''accompagnement', false, 2, NULL, 'Un profil discret peut tout de même nécessiter un soutien. L''absence de signaux visibles ne signifie pas absence de besoin.'),
('b1080000-0000-0000-0000-000000000008', 'Peut présenter un profil neurodivergent masqué par des stratégies compensatoires', true, 3, 'Le masking peut produire une conformité apparente totale tout en cachant un épuisement intense. Certains enfants s''effondrent à la maison précisément parce qu''ils ont tout retenu à l''école.', NULL),
('b1080000-0000-0000-0000-000000000008', 'Bénéficie d''un environnement idéalement adapté', false, 4, NULL, 'Une conformité apparente peut signifier le contraire : que l''enfant compense énormément pour s''adapter à un environnement non adapté.');

-- Options M1 Q9
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b1090000-0000-0000-0000-000000000009', 'Les forces doivent être développées pour compenser les déficits', false, 1, NULL, 'L''approche "compensation" reste centrée sur les déficits. L''approche forces-premières est différente : elle part des forces comme levier.'),
('b1090000-0000-0000-0000-000000000009', 'Les forces sont secondaires — il faut d''abord traiter les difficultés', false, 2, NULL, 'C''est l''approche traditionnelle — et la moins efficace. Elle épuise l''enfant et fragilise l''estime de soi.'),
('b1090000-0000-0000-0000-000000000009', 'Les forces sont le point d''appui à partir duquel les difficultés peuvent être abordées', true, 3, 'L''approche basée sur les forces (strength-based) ne nie pas les difficultés — elle les aborde à partir de ce qui fonctionne. On construit la confiance, puis on navigue les zones difficiles.', NULL),
('b1090000-0000-0000-0000-000000000009', 'Les forces indiquent que l''enfant n''a pas besoin d''aide dans ces domaines', false, 4, NULL, 'Un enfant peut être fort dans un domaine et avoir tout de même besoin de soutien pour que cette force soit reconnue et utilisée.');

-- Options M1 Q10
INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b10a0000-0000-0000-0000-00000000000a', 'Trouver le bon traitement ou la bonne thérapie dès que possible', false, 1, NULL, 'Agir sans comprendre le profil mène souvent à des interventions inadaptées. La compréhension précède l''action efficace.'),
('b10a0000-0000-0000-0000-00000000000a', 'Comprendre son profil unique avant de décider d''une approche', true, 2, 'Avant toute intervention, comprendre le profil spécifique — forces, besoins, déclencheurs, environnement — est indispensable. Il n''existe pas deux profils TDAH identiques.', NULL),
('b10a0000-0000-0000-0000-00000000000a', 'Renforcer systématiquement les compétences déficitaires', false, 3, NULL, 'Cibler uniquement les déficits sans partir du profil global est contre-productif et épuisant pour l''enfant.'),
('b10a0000-0000-0000-0000-00000000000a', 'Adapter toutes les exigences à la baisse pour éviter les échecs', false, 4, NULL, 'Baisser les exigences sans comprendre le profil crée de nouveaux problèmes. L''adaptation doit être ciblée, pas globale.');

-- Auto-évaluation parent M1
WITH m AS (SELECT id FROM public.modules WHERE code = 'M1')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('Je comprends la différence entre neurodivergence, handicap intellectuel et retard de développement.', 1.0, 1),
  ('Je peux expliquer à mon enfant pourquoi son cerveau fonctionne différemment, avec des mots bienveillants.', 1.0, 2),
  ('Quand mon enfant échoue, ma première réaction est de chercher ce qui n''était pas adapté.', 1.0, 3),
  ('Je connais au moins deux domaines dans lesquels mon enfant est naturellement fort ou compétent.', 1.0, 4),
  ('Je me sens suffisamment informé(e) pour expliquer le profil de mon enfant à un enseignant.', 1.0, 5),
  ('Je distingue ce que mon enfant ne veut pas faire de ce qu''il ne peut pas encore faire.', 1.0, 6),
  ('J''adapte les moments de travail à l''état émotionnel de mon enfant, pas seulement à un horaire.', 1.0, 7),
  ('Je reconnais les signes de fatigue cognitive ou de surcharge sensorielle chez mon enfant.', 1.0, 8),
  ('Je parle du profil de mon enfant à l''école sans me sentir sur la défensive.', 1.0, 9),
  ('Je me donne de la bienveillance pour ne pas encore tout savoir sur la neurodivergence.', 1.5, 10)
) AS item(text, weight, sort_order);

-- Activité M1
WITH m AS (SELECT id FROM public.modules WHERE code = 'M1')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'carte-cerveau', 'La carte de mon cerveau',
  'Dresser une carte visuelle des forces et des défis de votre enfant pour mieux comprendre son profil.',
  '[
    {"numero": 1, "titre": "Observer sans juger", "duree_min": 10, "instruction": "Tracez une ligne verticale. À gauche : ''Ce qui vient facilement''. À droite : ''Ce qui demande beaucoup d''énergie''. Listez tout sans filtrer ni hiérarchiser."},
    {"numero": 2, "titre": "Lire le profil", "duree_min": 10, "instruction": "Regardez vos deux colonnes. Y a-t-il un écart marqué ? Certaines forces sont-elles inhabituelles ? Certaines difficultés disparaissent-elles dans des contextes particuliers ?"},
    {"numero": 3, "titre": "Trouver la métaphore juste", "duree_min": 10, "instruction": "Cherchez une image ou une métaphore qui décrit ce profil de façon neutre ou positive.", "exemples": ["Mon cerveau est comme un logiciel différent qui tourne sur le même ordinateur.", "Mon cerveau est un couteau suisse : certaines lames sont très aiguisées.", "Mon cerveau est comme une radio qui capte des fréquences que d''autres n''entendent pas."]}
  ]'::jsonb,
  'Qu''avez-vous découvert que vous ne saviez pas encore nommer ?',
  25, 35, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M1
WITH m AS (SELECT id FROM public.modules WHERE code = 'M1')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-ou-mythe', 'Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "c1", "affirmation": "Un enfant TDAH manque simplement de volonté ou de discipline.", "reponse": "MYTHE", "explication": "Le TDAH est une différence dans la régulation dopaminergique du cerveau. La volonté ne peut pas compenser un système neurologique différent — pas plus qu''on ne peut ''vouloir'' mieux voir sans lunettes."},
      {"id": "c2", "affirmation": "La neurodivergence peut coexister avec un haut potentiel intellectuel.", "reponse": "VRAI", "explication": "Les profils 2e (twice exceptional) sont réels et souvent sous-identifiés. Un enfant peut être très avancé dans un domaine et en grande difficulté dans un autre simultanément."},
      {"id": "c3", "affirmation": "Avec le bon traitement, un enfant neurodivergent finit par fonctionner comme un enfant neurotypique.", "reponse": "MYTHE", "explication": "L''objectif n''est pas la normativisation mais le développement optimal. Certaines thérapies atténuent des symptômes — aucune ne change le câblage neurologique fondamental."},
      {"id": "c4", "affirmation": "Un enfant qui lit bien ne peut pas être dyslexique.", "reponse": "MYTHE", "explication": "Des stratégies compensatoires peuvent masquer la dyslexie pendant des années. Le diagnostic repose sur le traitement phonologique — pas sur la fluidité de lecture observée en surface."},
      {"id": "c5", "affirmation": "Le cerveau adulte ne peut plus apprendre aussi facilement qu''un cerveau d''enfant.", "reponse": "VRAI_PARTIEL", "explication": "La plasticité est maximale dans l''enfance — mais elle ne disparaît jamais. Les adultes apprennent différemment, pas moins."},
      {"id": "c6", "affirmation": "La neurodivergence est plus fréquente chez les garçons que chez les filles.", "reponse": "MYTHE", "explication": "Les garçons sont sur-diagnostiqués parce que les filles présentent souvent des profils différents — plus internalisés, plus camouflés. Les filles autistes ou TDAH sont massivement sous-identifiées."},
      {"id": "c7", "affirmation": "Un enfant calme et bien intégré en classe ne peut pas être en souffrance.", "reponse": "MYTHE", "explication": "Le masking peut produire une conformité apparente totale tout en cachant un épuisement intense. Certains enfants s''effondrent à la maison précisément parce qu''ils ont tout retenu à l''école."},
      {"id": "c8", "affirmation": "Comprendre le cerveau de mon enfant change réellement les interactions quotidiennes.", "reponse": "VRAI", "explication": "Les études sur la psychoéducation parentale montrent des effets mesurables sur la qualité relationnelle, la réduction des conflits et les résultats scolaires."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M2 — Identifier les forces et le profil unique de votre enfant
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M2')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b2010000-0000-0000-0000-000000000001'::uuid, 'L''observation des forces d''un enfant neurodivergent doit se faire :', 1),
  ('b2020000-0000-0000-0000-000000000002'::uuid, 'Quelle est la principale limite des tests psychométriques standardisés pour les enfants neurodivergents ?', 2),
  ('b2030000-0000-0000-0000-000000000003'::uuid, 'Une "force cachée" chez un enfant neurodivergent, c''est souvent :', 3),
  ('b2040000-0000-0000-0000-000000000004'::uuid, 'Pourquoi est-il important de distinguer les intérêts intenses des simples loisirs chez un enfant neurodivergent ?', 4),
  ('b2050000-0000-0000-0000-000000000005'::uuid, 'Le "bilan informel parental" consiste à :', 5),
  ('b2060000-0000-0000-0000-000000000006'::uuid, 'Quand un enfant réussit facilement quelque chose que ses camarades trouvent difficile, c''est :', 6),
  ('b2070000-0000-0000-0000-000000000007'::uuid, 'Quelle est la meilleure façon de valider une observation parentale sur les forces de son enfant ?', 7),
  ('b2080000-0000-0000-0000-000000000008'::uuid, 'La notion de "flow" (état de flux) est pertinente pour identifier les forces car :', 8),
  ('b2090000-0000-0000-0000-000000000009'::uuid, 'Un enfant qui refuse catégoriquement une activité scolaire peut en réalité :', 9),
  ('b20a0000-0000-0000-0000-00000000000a'::uuid, 'Transmettre à son enfant la connaissance de ses propres forces :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2010000-0000-0000-0000-000000000001', 'Uniquement lors des évaluations formelles', false, 1, NULL, 'Les évaluations formelles captent une partie du tableau — mais les forces s''expriment souvent en dehors.'),
('b2010000-0000-0000-0000-000000000001', 'Dans des contextes variés, notamment lors de jeu libre et d''activités choisies', true, 2, 'Les forces apparaissent surtout quand l''enfant est en sécurité émotionnelle et dans un contexte non évaluatif. Le jeu libre est l''un des meilleurs révélateurs.', NULL),
('b2010000-0000-0000-0000-000000000001', 'Seulement pendant les activités scolaires', false, 3, NULL, 'Les forces scolaires sont importantes, mais elles ne représentent qu''une fraction du profil réel.'),
('b2010000-0000-0000-0000-000000000001', 'En comparant l''enfant à ses camarades de classe', false, 4, NULL, 'La comparaison avec les pairs mesure la norme — pas les forces individuelles. Un enfant peut être fort dans un domaine non évalué en classe.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2020000-0000-0000-0000-000000000002', 'Ils ne sont pas fiables scientifiquement', false, 1, NULL, 'Les tests standardisés sont scientifiquement valides — leur limite est ailleurs.'),
('b2020000-0000-0000-0000-000000000002', 'Ils mesurent la performance dans des conditions qui défavorisent souvent les profils neurodivergents', true, 2, 'Un test chronométré dans une salle silencieuse peut sous-estimer massivement les capacités d''un enfant TDAH ou anxieux. Le score reflète autant le contexte de passation que les capacités réelles.', NULL),
('b2020000-0000-0000-0000-000000000002', 'Ils sont trop coûteux pour être accessibles', false, 3, NULL, 'L''accessibilité est un enjeu réel, mais ce n''est pas la limite principale des tests pour identifier les forces.'),
('b2020000-0000-0000-0000-000000000002', 'Ils ne couvrent pas les matières artistiques', false, 4, NULL, 'C''est un manque, mais la limite centrale est la standardisation elle-même — qui défavorise structurellement les profils non-standard.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2030000-0000-0000-0000-000000000003', 'Une compétence que l''enfant développe en thérapie', false, 1, NULL, 'Une force cachée n''est pas acquise en thérapie — elle est déjà là, non reconnue.'),
('b2030000-0000-0000-0000-000000000003', 'Une capacité masquée par les difficultés visibles ou non valorisée par l''environnement scolaire', true, 2, 'Beaucoup d''enfants neurodivergents ont des forces dans des domaines que l''école ne mesure pas : mémoire associative, pensée systémique, empathie intense, créativité. Ces forces restent invisibles faute d''être nommées.', NULL),
('b2030000-0000-0000-0000-000000000003', 'Une force que l''enfant connaît mais préfère ne pas montrer', false, 3, NULL, 'Le terme "cachée" désigne une invisibilité externe, pas un choix de l''enfant.'),
('b2030000-0000-0000-0000-000000000003', 'Une capacité qui apparaît seulement sous pression', false, 4, NULL, 'Certaines forces s''expriment sous pression, mais ce n''est pas la définition — et la pression est souvent contre-productive.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2040000-0000-0000-0000-000000000004', 'Parce que les intérêts intenses peuvent mener à une carrière professionnelle', false, 1, NULL, 'C''est possible, mais ce n''est pas la raison principale de les distinguer dans le contexte de l''accompagnement.'),
('b2040000-0000-0000-0000-000000000004', 'Parce que les intérêts intenses sont souvent des vecteurs d''apprentissage et de régulation émotionnelle', true, 2, 'Un intérêt intense (dinosaures, trains, codage) n''est pas un caprice — c''est souvent un système de régulation et un moteur d''apprentissage puissant. L''utiliser comme levier pédagogique est une stratégie reconnue.', NULL),
('b2040000-0000-0000-0000-000000000004', 'Parce que les loisirs ne doivent pas prendre trop de temps', false, 3, NULL, 'Réduire le temps des intérêts intenses peut être contre-productif — ils jouent un rôle de régulation crucial.'),
('b2040000-0000-0000-0000-000000000004', 'Parce que les intérêts intenses indiquent souvent un trouble spécifique', false, 4, NULL, 'Les intérêts intenses ne signalent pas un trouble — ils sont une caractéristique fréquente, notamment dans les profils autistiques et HPI, mais pas un critère diagnostique en soi.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2050000-0000-0000-0000-000000000005', 'Faire remplir à l''enfant un questionnaire de personnalité', false, 1, NULL, 'Un questionnaire de personnalité n''est pas un bilan informel parental — et il est peu adapté aux enfants jeunes.'),
('b2050000-0000-0000-0000-000000000005', 'Observer et noter systématiquement les moments de plaisir, de facilité et d''engagement de l''enfant', true, 2, 'Le bilan informel parental repose sur une observation structurée mais accessible : quand l''enfant est-il dans l''aisance ? Quand perd-il la notion du temps ? Quand demande-t-il à recommencer ? Ces données construisent un profil de forces réel.', NULL),
('b2050000-0000-0000-0000-000000000005', 'Demander à l''enseignant de fournir une évaluation narrative', false, 3, NULL, 'Le point de vue de l''enseignant est précieux, mais le bilan informel parental est centré sur l''observation à la maison — dans un contexte différent.'),
('b2050000-0000-0000-0000-000000000005', 'Comparer les compétences de l''enfant avec celles de ses frères et sœurs', false, 4, NULL, 'La comparaison fraternelle n''est pas une méthode valide — elle introduit des biais affectifs et ne capture pas le profil individuel.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2060000-0000-0000-0000-000000000006', 'Un signe que cette activité est trop simple pour lui', false, 1, NULL, 'Pas nécessairement. Une activité peut correspondre au niveau ET représenter une force réelle de l''enfant.'),
('b2060000-0000-0000-0000-000000000006', 'Un indicateur potentiel de force dans ce domaine, à observer et à nommer', true, 2, 'Nommer ce que l''enfant fait facilement — même si ce n''est pas "impressionnant" — est fondamental. Beaucoup d''enfants neurodivergents ne savent pas qu''ils sont forts dans quelque chose parce qu''on leur parle surtout de leurs difficultés.', NULL),
('b2060000-0000-0000-0000-000000000006', 'La preuve qu''il n''a pas besoin d''aide dans ce domaine', false, 3, NULL, 'Être fort quelque part ne supprime pas le besoin de soutien dans d''autres domaines ou dans la valorisation de cette force elle-même.'),
('b2060000-0000-0000-0000-000000000006', 'Quelque chose que les autres enfants trouveront facile avec du travail', false, 4, NULL, 'Ramener la force de l''enfant à un potentiel égalisable efface ce qui est précieux : sa singularité.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2070000-0000-0000-0000-000000000007', 'En cherchant un deuxième avis médical', false, 1, NULL, 'Un deuxième avis médical est utile pour le diagnostic — pas pour valider des observations de forces au quotidien.'),
('b2070000-0000-0000-0000-000000000007', 'En la partageant avec d''autres adultes qui connaissent l''enfant (enseignants, grands-parents, entraîneurs)', true, 2, 'La triangulation — obtenir confirmation de plusieurs observateurs dans différents contextes — est la méthode la plus fiable pour valider une observation informelle. Si plusieurs adultes indépendants notent la même force, elle est réelle.', NULL),
('b2070000-0000-0000-0000-000000000007', 'En lui faisant passer un test en ligne', false, 3, NULL, 'Les tests en ligne non validés scientifiquement ne constituent pas une validation fiable.'),
('b2070000-0000-0000-0000-000000000007', 'En la comparant aux données du dossier scolaire', false, 4, NULL, 'Le dossier scolaire ne reflète que ce qui est évalué à l''école — il manque souvent les forces non académiques.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2080000-0000-0000-0000-000000000008', 'Le flow n''est accessible qu''aux enfants neurotypiques', false, 1, NULL, 'Faux. Le flow est universel — mais les conditions pour l''atteindre varient selon le profil.'),
('b2080000-0000-0000-0000-000000000008', 'Un enfant en flow est dans son domaine de force et dans les conditions optimales d''apprentissage', true, 2, 'Le flow (Csikszentmihalyi) est cet état où le défi correspond exactement aux capacités. Observer quand un enfant entre dans cet état — oublie l''heure, refuse de s''arrêter — révèle à la fois ses forces et ses conditions optimales.', NULL),
('b2080000-0000-0000-0000-000000000008', 'Le flow indique que la tâche est trop facile et doit être difficultée', false, 3, NULL, 'Le flow ne signale pas une tâche trop facile — il indique un équilibre parfait entre compétence et défi.'),
('b2080000-0000-0000-0000-000000000008', 'Le flow est dangereux pour les enfants TDAH car il renforce les comportements d''évitement', false, 4, NULL, 'C''est une idée reçue. Le flow chez un enfant TDAH est souvent un des rares moments de régulation naturelle — pas d''évitement.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b2090000-0000-0000-0000-000000000009', 'Être paresseux ou mal élevé', false, 1, NULL, 'Le refus systématique traduit rarement de la paresse — il signale le plus souvent un besoin non satisfait ou une peur.'),
('b2090000-0000-0000-0000-000000000009', 'Avoir une difficulté dans ce domaine précis plutôt qu''une mauvaise volonté générale', true, 2, 'Le refus est un signal : difficulté non identifiée, surcharge, anxiété de performance ou incompréhension de la tâche. Avant d''interpréter comme opposition, chercher la compétence spécifique qui manque change tout.', NULL),
('b2090000-0000-0000-0000-000000000009', 'Manifester un intérêt intense pour autre chose', false, 3, NULL, 'Un intérêt intense peut expliquer la distraction, mais le refus catégoriel pointe plus souvent vers une difficulté réelle.'),
('b2090000-0000-0000-0000-000000000009', 'Avoir besoin d''un diagnostic supplémentaire', false, 4, NULL, 'Un refus isolé n''indique pas systématiquement un nouveau diagnostic — il mérite d''abord une exploration contextuelle.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b20a0000-0000-0000-0000-00000000000a', 'Risque de développer son arrogance', false, 1, NULL, 'Connaître ses forces ne produit pas de l''arrogance — au contraire, elle réduit l''anxiété et construit une identité stable.'),
('b20a0000-0000-0000-0000-00000000000a', 'Construit son identité et sa résilience face aux difficultés', true, 2, 'Un enfant qui sait qu''il est fort dans certains domaines traverse mieux les échecs dans d''autres. La connaissance de soi est un facteur de résilience documenté. "Je suis nul" vs "Je suis fort en X et j''ai du mal en Y" — la nuance change tout.', NULL),
('b20a0000-0000-0000-0000-00000000000a', 'N''a d''intérêt que si l''enfant a un diagnostic', false, 3, NULL, 'Tous les enfants bénéficient de connaître leurs forces — pas seulement les enfants diagnostiqués.'),
('b20a0000-0000-0000-0000-00000000000a', 'Est suffisant pour compenser les difficultés sans autre soutien', false, 4, NULL, 'Connaître ses forces est une base essentielle — mais elle ne remplace pas un soutien adapté aux difficultés réelles.');

-- Auto-évaluation M2
WITH m AS (SELECT id FROM public.modules WHERE code = 'M2')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('J''ai observé mon enfant en jeu libre ou en activité choisie cette semaine.', 1.0, 1),
  ('Je peux nommer trois domaines spécifiques dans lesquels mon enfant est naturellement compétent.', 1.0, 2),
  ('Je connais les conditions dans lesquelles mon enfant entre dans un état de "flow" (perd la notion du temps).', 1.0, 3),
  ('J''ai récemment dit à mon enfant ce qu''il fait bien — avec des mots précis, pas juste "bravo".', 1.0, 4),
  ('Je distingue les forces académiques et les forces non académiques de mon enfant.', 1.0, 5),
  ('Je comprends comment un intérêt intense de mon enfant peut être utilisé comme levier d''apprentissage.', 1.0, 6),
  ('J''ai partagé mes observations sur les forces de mon enfant avec au moins un autre adulte qui le connaît.', 1.0, 7),
  ('Quand mon enfant refuse une activité, je cherche d''abord la difficulté cachée avant d''interpréter.', 1.0, 8),
  ('Je suis capable d''expliquer le profil de forces de mon enfant sans mentionner ses difficultés en premier.', 1.5, 9),
  ('Je crois sincèrement que mon enfant a des forces réelles — même si elles ne sont pas encore visibles à l''école.', 1.5, 10)
) AS item(text, weight, sort_order);

-- Activité M2
WITH m AS (SELECT id FROM public.modules WHERE code = 'M2')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'portrait-forces', 'Le portrait des forces',
  'Construire un portrait visuel et narratif des forces de votre enfant à partager avec lui.',
  '[
    {"numero": 1, "titre": "Observer pendant 3 jours", "duree_min": 15, "instruction": "Pendant trois jours, notez chaque fois que vous voyez votre enfant : facilement absorbé dans une activité, fier de quelque chose qu''il a fait, demandant à recommencer, aidant naturellement quelqu''un. Ne filtrez pas selon les critères scolaires."},
    {"numero": 2, "titre": "Classer en catégories", "duree_min": 10, "instruction": "Regroupez vos observations : forces cognitives (mémoire, logique, créativité), forces relationnelles (empathie, humour, écoute), forces sensorielles (précision motrice, sensibilité artistique), forces d''intérêt intense."},
    {"numero": 3, "titre": "Formuler en phrases-forces", "duree_min": 10, "instruction": "Transformez chaque observation en phrase à la première personne, pour votre enfant. Exemple : ''Je remarque les détails que les autres ne voient pas.'' ''Quand quelque chose m''intéresse, j''apprends très vite.'' ''Je suis capable de rester concentré longtemps sur ce que j''aime.''"},
    {"numero": 4, "titre": "Partager avec l''enfant", "duree_min": 10, "instruction": "Lisez les phrases à votre enfant, ou faites-les lire ensemble. Demandez-lui : ''Est-ce que tu te reconnais dans ces phrases ? Est-ce qu''il en manque ?'' Laissez-le ajouter, corriger, compléter."}
  ]'::jsonb,
  'Quelle force avez-vous découvert chez votre enfant que vous n''aviez jamais nommée avant ?',
  30, 40, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M3 — Décoder les comportements difficiles
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M3')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b3010000-0000-0000-0000-000000000001'::uuid, 'Le "modèle de l''iceberg comportemental" signifie que :', 1),
  ('b3020000-0000-0000-0000-000000000002'::uuid, 'Un enfant qui fait une crise à la sortie de l''école tous les jours probablement :', 2),
  ('b3030000-0000-0000-0000-000000000003'::uuid, 'La "réponse réactive" d''un parent face à un comportement difficile :', 3),
  ('b3040000-0000-0000-0000-000000000004'::uuid, 'Quand un enfant est en dehors de sa fenêtre de tolérance, la première priorité est :', 4),
  ('b3050000-0000-0000-0000-000000000005'::uuid, 'Le masking quotidien à l''école produit souvent à la maison :', 5),
  ('b3060000-0000-0000-0000-000000000006'::uuid, 'Qu''est-ce qu''une "demande différée" dans le contexte du comportement neurodivergent ?', 6),
  ('b3070000-0000-0000-0000-000000000007'::uuid, 'L''hypersensibilité sensorielle peut se manifester comme :', 7),
  ('b3080000-0000-0000-0000-000000000008'::uuid, 'Face à un comportement d''opposition, la question la plus utile est :', 8),
  ('b3090000-0000-0000-0000-000000000009'::uuid, 'La co-régulation parentale signifie :', 9),
  ('b30a0000-0000-0000-0000-00000000000a'::uuid, 'Comprendre les déclencheurs d''un enfant permet avant tout de :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3010000-0000-0000-0000-000000000001', 'Les comportements difficiles sont la partie cachée que les parents ne voient pas', false, 1, NULL, 'C''est l''inverse : les comportements sont la partie visible — les besoins sous-jacents sont cachés.'),
('b3010000-0000-0000-0000-000000000001', 'Les comportements visibles ne sont que la surface — les besoins et causes non satisfaits sont en dessous', true, 2, 'Le comportement (crise, refus, agression) est la pointe émergée. En dessous : peur, surcharge sensorielle, faim, fatigue, incompréhension, besoin de connexion. Agir sur la surface sans descendre sous l''eau ne change rien de durable.', NULL),
('b3010000-0000-0000-0000-000000000001', 'Il faut ignorer les comportements et se concentrer sur les causes', false, 3, NULL, 'On ne peut pas ignorer les comportements — mais on les aborde différemment quand on comprend ce qu''ils signalent.'),
('b3010000-0000-0000-0000-000000000001', 'Les comportements difficiles sont toujours intentionnels et prémédités', false, 4, NULL, 'La plupart des comportements difficiles des enfants neurodivergents ne sont pas intentionnels — ils sont des réponses à un besoin non satisfait.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3020000-0000-0000-0000-000000000002', 'Cherche à manipuler ses parents', false, 1, NULL, 'Un enfant qui s''effondre régulièrement à la même heure ne manipule pas — il signale une surcharge prévisible.'),
('b3020000-0000-0000-0000-000000000002', 'Libère à la maison la pression accumulée toute la journée à l''école', true, 2, 'L''école demande un effort de contrôle et d''adaptation intense. Arriver à la maison — espace sûr — déclenche un lâcher-prise. La crise n''est pas une punition pour les parents : c''est la preuve que l''enfant se sent en sécurité chez lui.', NULL),
('b3020000-0000-0000-0000-000000000002', 'N''est pas bien encadré à l''école', false, 3, NULL, 'Un encadrement insuffisant peut contribuer, mais la cause principale est la décharge après un effort de contention intense.'),
('b3020000-0000-0000-0000-000000000002', 'A un trouble de l''humeur à évaluer', false, 4, NULL, 'Un pattern prévisible de crise post-école est un signal de surcharge — pas nécessairement un trouble de l''humeur.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3030000-0000-0000-0000-000000000003', 'Est la stratégie la plus efficace à court terme', false, 1, NULL, 'Elle peut sembler efficace à court terme, mais elle renforce souvent les cycles négatifs.'),
('b3030000-0000-0000-0000-000000000003', 'Escalade souvent la situation et rate l''information contenue dans le comportement', true, 2, 'Réagir (hausser la voix, punir immédiatement) coupe la communication et escalade. Le comportement difficile contient une information — la réaction réactive empêche de la lire.', NULL),
('b3030000-0000-0000-0000-000000000003', 'Est nécessaire pour maintenir l''autorité parentale', false, 3, NULL, 'L''autorité parentale peut être maintenue avec des réponses adaptées — pas nécessairement réactives.'),
('b3030000-0000-0000-0000-000000000003', 'N''a pas d''impact sur l''enfant à long terme', false, 4, NULL, 'Les patterns de réponse réactive influencent la relation et les comportements de l''enfant à long terme.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3040000-0000-0000-0000-000000000004', 'Expliquer les règles clairement pour éviter la répétition', false, 1, NULL, 'Expliquer les règles à un cerveau en dehors de sa fenêtre de tolérance est inefficace — le cortex préfrontal n''est pas en ligne.'),
('b3040000-0000-0000-0000-000000000004', 'Aider l''enfant à revenir dans un état de régulation suffisant', true, 2, 'Aucun apprentissage, aucune discussion, aucune règle ne peut être intégrée quand le cerveau est en mode survie. La régulation précède toujours la raison. D''abord : co-réguler. Ensuite : parler.', NULL),
('b3040000-0000-0000-0000-000000000004', 'Appliquer une conséquence immédiate pour stopper le comportement', false, 3, NULL, 'Une conséquence appliquée hors fenêtre de tolérance n''enseigne rien — elle ajoute de l''activation à un système déjà en surcharge.'),
('b3040000-0000-0000-0000-000000000004', 'Laisser l''enfant seul jusqu''à ce qu''il se calme', false, 4, NULL, 'L''isolement peut aggraver la détresse, particulièrement pour les enfants qui ont besoin de co-régulation pour revenir à l''équilibre.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3050000-0000-0000-0000-000000000005', 'Un comportement exemplaire en compensation', false, 1, NULL, 'Certains enfants ont des comportements plus faciles à la maison, mais beaucoup produisent l''effet inverse.'),
('b3050000-0000-0000-0000-000000000005', 'Une décharge comportementale — crises, pleurs, effondrement — reflet de l''épuisement du masking', true, 2, 'L''énergie dépensée à paraître "normal" toute la journée doit se décharger quelque part. La maison est l''espace sûr où ce lâcher-prise se produit. Ce n''est pas un dysfonctionnement — c''est une réponse saine à un effort épuisant.', NULL),
('b3050000-0000-0000-0000-000000000005', 'Une indifférence émotionnelle totale', false, 3, NULL, 'L''indifférence peut être un signal de dissociation ou d''épuisement profond — pas la forme habituelle de décharge post-masking.'),
('b3050000-0000-0000-0000-000000000005', 'Un attachement excessif aux parents', false, 4, NULL, 'Un besoin accru de proximité peut exister, mais l''effet principal du masking épuisant est la décharge comportementale.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3060000-0000-0000-0000-000000000006', 'Une demande que l''enfant formule longtemps après en avoir besoin', false, 1, NULL, 'Ce n''est pas la définition utilisée dans ce contexte.'),
('b3060000-0000-0000-0000-000000000006', 'Le délai entre l''exposition à une demande stressante et la réaction comportementale observable', true, 2, 'Un enfant peut sembler aller bien pendant la situation difficile, puis exploser 2 heures plus tard. La cause est dans le passé récent, pas dans le déclencheur immédiat de la crise. Comprendre ce délai évite de chercher la mauvaise cause.', NULL),
('b3060000-0000-0000-0000-000000000006', 'Une demande que l''enfant refuse de formuler', false, 3, NULL, 'Un refus de formuler est un autre phénomène — l''anhédonie ou la difficulté d''accès aux mots (alexithymie).'),
('b3060000-0000-0000-0000-000000000006', 'Une technique de communication alternative pour les enfants non verbaux', false, 4, NULL, 'Ce n''est pas une technique — c''est un pattern comportemental observé chez de nombreux enfants neurodivergents.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3070000-0000-0000-0000-000000000007', 'Un refus catégorique de certaines textures, sons ou lumières — parfois interprété comme de l''opposition', true, 1, 'Un enfant qui refuse un vêtement, une lumière, un son n''est pas difficile : son système nerveux traite ces stimuli avec une intensité que nous ne percevons pas. Ce qui semble capricieux est souvent neurologique.', NULL),
('b3070000-0000-0000-0000-000000000007', 'Une hypersensibilité aux critiques des adultes', false, 2, NULL, 'La sensibilité aux critiques (sensibilité au rejet) est un phénomène distinct — l''hypersensibilité sensorielle concerne les stimuli environnementaux.'),
('b3070000-0000-0000-0000-000000000007', 'Une peur irrationnelle que la thérapie peut éliminer', false, 3, NULL, 'L''hypersensibilité sensorielle est neurologique — elle ne disparaît pas avec la thérapie, mais peut être accompagnée par des stratégies d''adaptation.'),
('b3070000-0000-0000-0000-000000000007', 'Uniquement chez les enfants autistes', false, 4, NULL, 'L''hypersensibilité sensorielle est présente dans de nombreux profils neurodivergents : TDAH, HPI, anxiété, etc. Elle n''est pas exclusive à l''autisme.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3080000-0000-0000-0000-000000000008', '"Pourquoi tu fais ça ?"', false, 1, NULL, 'Cette question met l''enfant en position de devoir justifier quelque chose qu''il ne comprend souvent pas lui-même.'),
('b3080000-0000-0000-0000-000000000008', '"Qu''est-ce qu''il se passe pour toi en ce moment ?"', true, 2, 'Cette question ouvre, sans accuser. Elle invite l''enfant à identifier son état interne plutôt qu''à se défendre. Elle positionne le parent comme allié, pas comme juge.', NULL),
('b3080000-0000-0000-0000-000000000008', '"Tu sais que ce comportement est inacceptable ?"', false, 3, NULL, 'Cette question est rhétorique et culpabilisante — elle ferme le dialogue et augmente la honte.'),
('b3080000-0000-0000-0000-000000000008', '"Combien de fois dois-je te répéter ?"', false, 4, NULL, 'Cette question exprime la frustration du parent sans apporter d''information utile à l''enfant sur ce qu''il vit.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b3090000-0000-0000-0000-000000000009', 'Réguler les émotions de l''enfant à sa place', false, 1, NULL, 'La co-régulation n''est pas de faire "à la place" — c''est de fournir un ancrage externe pendant que l''enfant apprend à se réguler seul.'),
('b3090000-0000-0000-0000-000000000009', 'Utiliser son propre système nerveux régulé pour aider l''enfant à revenir au calme', true, 2, 'Le système nerveux de l''enfant se synchronise avec celui du parent. Si le parent reste régulé (voix calme, corps détendu), il offre un modèle que le cerveau de l''enfant peut imiter. C''est biologique — pas seulement psychologique.', NULL),
('b3090000-0000-0000-0000-000000000009', 'Faire des exercices de respiration avec l''enfant pendant la crise', false, 3, NULL, 'Les exercices peuvent faire partie des outils, mais la co-régulation est plus fondamentale : c''est la présence calme du parent, pas la technique.'),
('b3090000-0000-0000-0000-000000000009', 'Éviter toute stimulation pendant les moments difficiles', false, 4, NULL, 'L''évitement des stimulations peut aider dans certains cas, mais ce n''est pas la définition de la co-régulation.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b30a0000-0000-0000-0000-00000000000a', 'Éviter toutes les situations difficiles', false, 1, NULL, 'Éviter toutes les situations difficiles n''est ni possible ni souhaitable. L''objectif est d''y répondre mieux, pas de les supprimer.'),
('b30a0000-0000-0000-0000-00000000000a', 'Anticiper, prévenir et répondre de façon adaptée plutôt que de réagir', true, 2, 'Un parent qui connaît les déclencheurs de son enfant peut réduire l''exposition inutile, préparer les transitions et répondre avec calme quand la crise arrive malgré tout. L''anticipation transforme la réaction en stratégie.', NULL),
('b30a0000-0000-0000-0000-00000000000a', 'Punir plus efficacement les comportements indésirables', false, 3, NULL, 'Connaître les déclencheurs ne sert pas à punir plus ciblément — ça sert à prévenir et accompagner.'),
('b30a0000-0000-0000-0000-00000000000a', 'Prouver à l''école que les comportements ont une cause légitime', false, 4, NULL, 'C''est un bénéfice secondaire, pas l''objectif principal. La compréhension des déclencheurs sert d''abord l''enfant et la famille.');

-- Auto-évaluation M3
WITH m AS (SELECT id FROM public.modules WHERE code = 'M3')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('Quand mon enfant a un comportement difficile, je cherche d''abord ce qui se passe "sous l''iceberg".', 1.0, 1),
  ('Je connais au moins trois déclencheurs récurrents des comportements difficiles de mon enfant.', 1.0, 2),
  ('Je reconnais les signes physiques qui indiquent que mon enfant est en dehors de sa fenêtre de tolérance.', 1.0, 3),
  ('Je comprends pourquoi mon enfant peut s''effondrer à la maison après une bonne journée à l''école.', 1.0, 4),
  ('Ma première réaction face à un comportement difficile est de co-réguler avant d''expliquer ou de punir.', 1.5, 5),
  ('Je sais distinguer un refus lié à une difficulté réelle d''un refus lié à de la mauvaise volonté.', 1.0, 6),
  ('J''ai identifié des patterns de comportements difficiles qui se répètent aux mêmes moments.', 1.0, 7),
  ('Je sais poser des questions ouvertes à mon enfant sur ce qu''il vit, sans accuser.', 1.0, 8),
  ('Je maintiens une présence calme (voix, corps) même quand mon enfant est en crise.', 1.5, 9),
  ('J''ai un plan préparé pour les situations de crise récurrentes.', 1.0, 10)
) AS item(text, weight, sort_order);

-- Activité M3
WITH m AS (SELECT id FROM public.modules WHERE code = 'M3')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'carte-declencheurs', 'La carte des déclencheurs',
  'Identifier et cartographier les déclencheurs connus de votre enfant pour mieux anticiper et prévenir.',
  '[
    {"numero": 1, "titre": "Lister les 5 dernières crises", "duree_min": 10, "instruction": "Pensez aux cinq dernières situations difficiles. Pour chacune, notez : Quand ? (heure, jour, contexte). Quoi juste avant ? (transition, bruit, faim, fatigue, demande). Quelle intensité ? (1 à 5). Combien de temps après l''école ou un effort de contrôle ?"},
    {"numero": 2, "titre": "Chercher les patterns", "duree_min": 10, "instruction": "Relisez vos 5 fiches. Repérez les récurrences : même heure, même type de demande, même contexte sensoriel, même état de fatigue. Ce qui se répète n''est pas un hasard — c''est un signal."},
    {"numero": 3, "titre": "Classer les déclencheurs", "duree_min": 10, "instruction": "Groupez vos déclencheurs en catégories : Sensoriels (bruit, lumière, texture). Cognitifs (changement de plan, consigne floue). Émotionnels (frustration, rejet, honte). Physiologiques (faim, fatigue, hyperactivité). Relationnels (conflit, incompréhension)."},
    {"numero": 4, "titre": "Définir une action préventive", "duree_min": 10, "instruction": "Pour chaque catégorie identifiée, formulez une action préventive concrète. Exemple : ''Quand il revient de l''école, 20 minutes de temps libre sans demande avant tout devoir.'' ''Si le bruit est le déclencheur, prévoir des protections auditives en sortie d''école.''"}
  ]'::jsonb,
  'Quelle découverte sur les déclencheurs de votre enfant vous a le plus surpris(e) ?',
  30, 40, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════
-- MODULES M4–M8 : structure de base
-- (Quiz et activités complets dans seed_modules_m4_m8.sql)
-- ═════════════════════════════════════════════════════════════════════════

-- Auto-évaluation M4
WITH m AS (SELECT id FROM public.modules WHERE code = 'M4')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('Notre maison dispose d''espaces visuellement distincts pour le travail, le repos et le jeu.', 1.0, 1),
  ('J''utilise des supports visuels (planning, minuteur, liste) pour aider mon enfant à s''organiser.', 1.0, 2),
  ('Les devoirs se font toujours dans les mêmes conditions (heure, lieu, durée).', 1.0, 3),
  ('Les transitions difficiles (fin d''activité, départ pour l''école) sont annoncées à l''avance.', 1.0, 4),
  ('L''environnement sensoriel est adapté au profil de mon enfant (bruit, lumière, rangement).', 1.5, 5),
  ('Mon enfant a accès à des outils de régulation sensorielle à la maison (coussin, ballon, casque).', 1.0, 6),
  ('Je sais adapter la durée et le format des tâches selon l''état énergétique de mon enfant.', 1.0, 7),
  ('Les routines du matin et du soir sont stabilisées et connues de mon enfant.', 1.5, 8),
  ('Mon enfant a une zone de retrait accessible quand il est en surcharge.', 1.0, 9),
  ('J''adapte l''environnement en prévention, pas seulement en réaction aux crises.', 1.0, 10)
) AS item(text, weight, sort_order);

-- Auto-évaluation M5
WITH m AS (SELECT id FROM public.modules WHERE code = 'M5')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('Je connais les dispositifs d''accompagnement scolaire disponibles pour mon enfant (PAP, PPS, PPRE).', 1.5, 1),
  ('Je sais comment demander un rendez-vous avec l''équipe pédagogique sans me sentir en position de faiblesse.', 1.0, 2),
  ('Je prépare les réunions scolaires avec une liste d''observations concrètes et de demandes précises.', 1.0, 3),
  ('Je sais décrire les besoins de mon enfant sans diagnostics médicaux comme seul argument.', 1.0, 4),
  ('J''entends les retours de l''école sans me défendre automatiquement.', 1.5, 5),
  ('Je fais le suivi des aménagements mis en place pour vérifier qu''ils sont réellement appliqués.', 1.0, 6),
  ('Je sais quand escalader (inspecteur, MDPH) et quand négocier.', 1.0, 7),
  ('Je maintiens une relation de coopération avec les enseignants même en cas de désaccord.', 1.0, 8),
  ('Mon enfant sait ce que nous défendons pour lui à l''école et pourquoi.', 1.0, 9),
  ('Je tiens un dossier de suivi des échanges avec l''école (emails, comptes-rendus).', 1.0, 10)
) AS item(text, weight, sort_order);

-- Auto-évaluation M6
WITH m AS (SELECT id FROM public.modules WHERE code = 'M6')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('Je comprends pourquoi les enfants neurodivergents ont souvent des difficultés de régulation émotionnelle.', 1.0, 1),
  ('Je distingue la co-régulation (présence calme) de la résolution de problème (explication, punition).', 1.5, 2),
  ('J''ai des stratégies concrètes pour rester régulé(e) moi-même pendant les crises de mon enfant.', 1.5, 3),
  ('Mon enfant dispose d''un "kit de régulation" (objets, activités) qui l''aide à se calmer.', 1.0, 4),
  ('Je parle des émotions avec mon enfant en dehors des crises, dans des moments calmes.', 1.0, 5),
  ('Je nomme les émotions sans les juger quand mon enfant est en détresse.', 1.0, 6),
  ('J''ai un plan de crise connu de toute la famille pour les situations d''intensité maximale.', 1.0, 7),
  ('Je travaille activement l''estime de soi de mon enfant en dehors des moments difficiles.', 1.0, 8),
  ('Je reconnais les signes précurseurs d''une crise avant qu''elle éclate.', 1.0, 9),
  ('Après une crise, je prends le temps de reconnecter avec mon enfant avant de tirer des leçons.', 1.0, 10)
) AS item(text, weight, sort_order);

-- Auto-évaluation M7
WITH m AS (SELECT id FROM public.modules WHERE code = 'M7')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('Je reconnais les signes de fatigue compassionnelle dans mon propre comportement.', 1.5, 1),
  ('Je me permets des temps de repos sans culpabilité liée à mon rôle de parent.', 1.5, 2),
  ('J''ai fait (ou je suis prêt(e) à faire) le deuil de l''enfant "idéal" que j''imaginais.', 1.0, 3),
  ('Je parle de mon vécu de parent à au moins une personne en dehors de la famille immédiate.', 1.0, 4),
  ('Je connais au moins un groupe de soutien ou une ressource pour parents d''enfants neurodivergents.', 1.0, 5),
  ('Je pratique au moins une activité de ressourcement régulière pour moi-même.', 1.0, 6),
  ('Je ne porte pas seul(e) la charge de l''accompagnement — elle est partagée.', 1.0, 7),
  ('Je distingue mes peurs pour mon enfant de la réalité de sa situation actuelle.', 1.0, 8),
  ('Je me traite avec la même bienveillance que j''offrirais à un ami dans la même situation.', 1.5, 9),
  ('Je sais demander de l''aide professionnelle pour moi-même si nécessaire.', 1.0, 10)
) AS item(text, weight, sort_order);

-- Auto-évaluation M8
WITH m AS (SELECT id FROM public.modules WHERE code = 'M8')
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'parent'::module_audience, item.text, item.weight, item.sort_order
FROM m, (VALUES
  ('J''ai une vision claire des besoins prioritaires de mon enfant pour les 6 prochains mois.', 1.0, 1),
  ('Je sais formuler des objectifs SMART adaptés à son profil.', 1.0, 2),
  ('J''ai un système de suivi simple pour noter les progrès et les difficultés.', 1.0, 3),
  ('Je peux ajuster le plan sans me sentir en échec si quelque chose ne fonctionne pas.', 1.5, 4),
  ('J''ai identifié les ressources professionnelles dont mon enfant a besoin à court terme.', 1.0, 5),
  ('Mon enfant est impliqué dans la définition de ses propres objectifs selon son âge.', 1.0, 6),
  ('Je sais quand réviser les priorités du plan et comment le faire.', 1.0, 7),
  ('L''ensemble de l''entourage proche (autre parent, grands-parents, école) est aligné sur l''approche.', 1.0, 8),
  ('Je peux nommer trois apprentissages majeurs de ce parcours qui ont changé mes pratiques.', 1.0, 9),
  ('Je me sens plus confiant(e) et moins seul(e) qu''au début de ce parcours.', 1.5, 10)
) AS item(text, weight, sort_order);

-- Activités M4–M8 (version simplifiée — à enrichir)
WITH m AS (SELECT id FROM public.modules WHERE code = 'M4')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'audit-environnement', 'L''audit de l''environnement',
  'Évaluer et réaménager un espace clé du quotidien de votre enfant.',
  '[
    {"numero": 1, "titre": "Choisir un espace", "duree_min": 5, "instruction": "Choisissez un espace problématique : coin devoirs, chambre, cuisine au petit-déjeuner. Observez-le avec les yeux de votre enfant : bruits, lumière, rangement, température, encombrement."},
    {"numero": 2, "titre": "Identifier les frictions", "duree_min": 10, "instruction": "Notez tout ce qui peut constituer une friction sensorielle ou cognitive : lumière fluorescente, télévision allumée, bureau encombré, chaise inconfortable, consignes affichées à un endroit non visible."},
    {"numero": 3, "titre": "Proposer trois modifications", "duree_min": 10, "instruction": "Pour chaque friction identifiée, proposez une modification accessible cette semaine. Pas de grand chantier — des ajustements simples et testables."},
    {"numero": 4, "titre": "Tester et évaluer", "duree_min": 10, "instruction": "Après une semaine, revenez sur cet espace. Qu''est-ce qui a changé dans le comportement de votre enfant dans ce contexte ? Quel ajustement a eu le plus d''impact ?"}
  ]'::jsonb,
  'Quelle modification de l''environnement a eu l''impact le plus surprenant sur votre enfant ?',
  30, 40, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

WITH m AS (SELECT id FROM public.modules WHERE code = 'M5')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'preparation-rdv-ecole', 'Préparer un rendez-vous avec l''école',
  'Structurer une rencontre avec l''équipe pédagogique pour être efficace et entendu(e).',
  '[
    {"numero": 1, "titre": "Définir l''objectif du rendez-vous", "duree_min": 5, "instruction": "Formulez en une phrase l''objectif principal : ''Je veux que mon enfant bénéficie d''un temps supplémentaire aux évaluations.'' ou ''Je veux comprendre ce qui se passe en cours de maths.'' Un objectif clair évite la dispersion."},
    {"numero": 2, "titre": "Rassembler les observations", "duree_min": 10, "instruction": "Listez des faits concrets, datés et observables — pas des ressentis. ''Le 12 mars, il a mis 3 heures sur un devoir qui en nécessitait 30 minutes'' est plus utile que ''il souffre beaucoup à la maison''."},
    {"numero": 3, "titre": "Formuler des demandes précises", "duree_min": 10, "instruction": "Pour chaque problème identifié, formulez une demande d''action précise. ''Pourriez-vous lui donner les consignes à l''oral en plus de l''écrit ?'' est plus actionnable que ''Il faudrait mieux l''aider''."},
    {"numero": 4, "titre": "Préparer sa posture", "duree_min": 10, "instruction": "Réfléchissez à ce qui vous met en difficulté dans ces rendez-vous (défensive, émotions, sentiment de jugement). Préparez une phrase d''ancrage : ''Je suis là pour collaborer, pas pour me battre.'' Imaginez l''enseignant comme un allié potentiel."}
  ]'::jsonb,
  'Qu''avez-vous dit dans ce rendez-vous que vous n''osiez pas dire avant ?',
  30, 40, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

WITH m AS (SELECT id FROM public.modules WHERE code = 'M6')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'plan-crise-familial', 'Le plan de crise familial',
  'Créer un protocole simple et connu de tous pour les moments d''intensité maximale.',
  '[
    {"numero": 1, "titre": "Identifier les crises récurrentes", "duree_min": 10, "instruction": "Notez les deux ou trois situations de crise qui se répètent dans votre famille. Décrivez les signes avant-coureurs (corps, voix, comportement) qui précèdent la crise de 5 à 15 minutes."},
    {"numero": 2, "titre": "Définir les rôles", "duree_min": 10, "instruction": "Dans votre famille, qui fait quoi en cas de crise ? Qui co-régule l''enfant ? Qui s''occupe des frères et sœurs ? Qui ne dit rien et laisse de l''espace ? Un plan clair évite la surenchère adulte qui aggrave."},
    {"numero": 3, "titre": "Créer le kit de régulation de l''enfant", "duree_min": 10, "instruction": "Avec votre enfant (si l''âge le permet), identifiez 3 à 5 choses qui l''aident à se calmer : objet sensoriel, musique, espace particulier, activité physique, présence silencieuse. Ce kit doit être accessible sans demander la permission."},
    {"numero": 4, "titre": "Écrire le plan en une page", "duree_min": 10, "instruction": "Rédigez un plan d''une page maximum : Signes avant-coureurs → Actions préventives → Rôles en crise → Kit de l''enfant → Reconnecter après. Partagez-le avec tous les adultes qui gardent régulièrement votre enfant."}
  ]'::jsonb,
  'Quel moment du plan de crise vous a le plus aidé à vous sentir préparé(e) ?',
  35, 45, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

WITH m AS (SELECT id FROM public.modules WHERE code = 'M7')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'bilan-ressources-parentales', 'Mon bilan de ressources personnelles',
  'Identifier vos ressources actuelles et vos zones de vulnérabilité pour mieux vous soutenir.',
  '[
    {"numero": 1, "titre": "La jauge d''énergie", "duree_min": 10, "instruction": "Imaginez votre réserve d''énergie comme une jauge de 0 à 10. Où êtes-vous en ce moment ? Listez ce qui vous a pris de l''énergie cette semaine (charge mentale, conflits, nuits coupées) et ce qui vous en a donné (moment seul, conversation agréable, activité)."},
    {"numero": 2, "titre": "Identifier vos ressources actuelles", "duree_min": 10, "instruction": "Qui ou quoi vous soutient réellement ? Listez les personnes (conjoint, ami, thérapeute), les pratiques (sport, lecture, nature) et les ressources (groupe de parents, communauté en ligne). Aucune ressource n''est trop petite."},
    {"numero": 3, "titre": "Repérer les angles morts", "duree_min": 10, "instruction": "Y a-t-il des signaux que vous ignorez ? (Irritabilité chronique, pleurs fréquents, sentiment de solitude, perte de plaisir.) Y a-t-il une ressource que vous devriez avoir mais que vous n''avez pas encore cherchée ?"},
    {"numero": 4, "titre": "Une action concrète", "duree_min": 10, "instruction": "Choisissez une seule action que vous pouvez faire cette semaine pour prendre soin de vous. Écrivez-la. Notez quand vous allez la faire. Une action concrète, pas une intention générale."}
  ]'::jsonb,
  'Quelle ressource avez-vous réalisé manquer et que vous allez chercher ?',
  30, 40, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

WITH m AS (SELECT id FROM public.modules WHERE code = 'M8')
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'plan-accompagnement-6-mois', 'Mon plan d''accompagnement sur 6 mois',
  'Construire une feuille de route personnalisée et actionnable pour les 6 prochains mois.',
  '[
    {"numero": 1, "titre": "Synthèse du parcours", "duree_min": 10, "instruction": "Relisez vos activités des modules M1 à M7. Notez les trois apprentissages qui ont le plus changé votre pratique quotidienne. Notez aussi les trois domaines où vous sentez encore une marge de progression."},
    {"numero": 2, "titre": "Définir 3 objectifs prioritaires", "duree_min": 15, "instruction": "Formulez 3 objectifs SMART pour les 6 prochains mois. Exemple : ''D''ici septembre, mon enfant dispose d''un planning visuel de sa semaine qu''il peut consulter seul.'' Chaque objectif : Spécifique, Mesurable, Atteignable, Réaliste, Temporel."},
    {"numero": 3, "titre": "Identifier les ressources nécessaires", "duree_min": 10, "instruction": "Pour chaque objectif : Quel professionnel ? Quelle démarche administrative ? Quel budget ? Quel soutien familial ? Listez les obstacles probables et une stratégie pour chacun."},
    {"numero": 4, "titre": "Planifier les points de révision", "duree_min": 10, "instruction": "Définissez deux dates de révision de votre plan dans les 6 mois. À chaque révision : Qu''est-ce qui fonctionne ? Qu''est-ce qui doit changer ? L''objectif évolue-t-il ? Un plan vivant est plus utile qu''un plan parfait."}
  ]'::jsonb,
  'Quel est l''engagement le plus important que vous prenez envers votre enfant à la fin de ce parcours ?',
  40, 50, 20, 30, 10
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;
