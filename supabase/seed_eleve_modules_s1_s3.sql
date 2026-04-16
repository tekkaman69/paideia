-- ─────────────────────────────────────────────────────────────────────────
-- Seed modules élèves Paideia — Séries 1, 2, 3
-- À exécuter APRÈS seed_modules.sql et seed_modules_m4_m8.sql
-- ─────────────────────────────────────────────────────────────────────────

-- ═══════════════════════════════════════════════════════════════════════
-- BADGES élèves
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.badges (key, title, description, rarity, criteria) VALUES
  ('e1-explorateur-cerveau',  'Explorateur du cerveau',   'Tu comprends comment ton cerveau fonctionne et ce qui te rend unique.',                         'common',    '{"module_code": "E1", "quiz_min": 5}'::jsonb),
  ('e2-detecteur-super',      'Détecteur de super-pouvoirs', 'Tu as identifié tes forces cachées et tu sais les utiliser.',                              'common',    '{"module_code": "E2", "quiz_min": 5}'::jsonb),
  ('e3-lecteur-signaux',      'Lecteur de signaux',       'Tu reconnais les signaux de ton corps quand tu es en surcharge.',                               'common',    '{"module_code": "E3", "quiz_min": 5}'::jsonb),
  ('e4-dompteur-attention',   'Dompteur d''attention',    'Tu maîtrises des stratégies pour garder ton attention là où tu veux.',                          'common',    '{"module_code": "E4", "quiz_min": 5}'::jsonb),
  ('e5-surfeur-emotions',     'Surfeur d''émotions',      'Tu sais surfer sur tes émotions au lieu de te noyer dedans.',                                   'rare',      '{"module_code": "E5", "quiz_min": 5}'::jsonb),
  ('e6-anti-colere',          'Anti-colère',              'Tu possèdes ta boîte à outils pour calmer les tempêtes.',                                        'rare',      '{"module_code": "E6", "quiz_min": 5}'::jsonb),
  ('e7-anxieux-courageux',    'Anxieux courageux',        'Tu comprends ton anxiété et tu as des outils pour avancer malgré elle.',                         'rare',      '{"module_code": "E7", "quiz_min": 5}'::jsonb),
  ('e8-architecte-temps',     'Architecte du temps',      'Tu organises ton temps et tes tâches comme un pro.',                                             'rare',      '{"module_code": "E8", "quiz_min": 5}'::jsonb),
  ('e9-chasseur-distractions','Chasseur de distractions', 'Tu as repéré et neutralisé tes ennemis de concentration.',                                       'rare',      '{"module_code": "E9", "quiz_min": 5}'::jsonb),
  ('e10-memoire-magique',     'Mémoire magique',          'Tu connais les secrets pour retenir ce qui compte vraiment.',                                     'epic',      '{"module_code": "E10", "quiz_min": 5}'::jsonb),
  ('e11-stratege-apprenant',  'Stratège apprenant',       'Tu utilises des stratégies d''apprentissage adaptées à ton cerveau.',                            'epic',      '{"module_code": "E11", "quiz_min": 5}'::jsonb),
  ('e12-expert-revisions',    'Expert révisions',         'Tu révises intelligemment, pas longtemps.',                                                       'epic',      '{"module_code": "E12", "quiz_min": 5}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- MODULES élèves — Série 1 : Mon cerveau et moi (E1-E4)
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.modules (id, code, slug, title, subtitle, description, audience, level, estimated_duration_min, sort_order, xp_reward_quiz, xp_reward_self_eval, xp_reward_activity, badge_key, quiz_pass_threshold) VALUES
(
  'e0000000-0000-0000-0000-000000000001', 'E1',
  'mon-cerveau-est-different',
  'Mon cerveau est différent — et c''est cool !',
  'Comprendre ta neurodivergence pour mieux te connaître',
  'Module fondateur. Comment fonctionne le cerveau, qu''est-ce que la neurodivergence, les profils DYS et TDAH en mots simples, le modèle des forces.',
  'eleve', 'decouverte', 25, 10, 80, 30, 25, 'e1-explorateur-cerveau', 5
),
(
  'e0000000-0000-0000-0000-000000000002', 'E2',
  'mes-super-pouvoirs-caches',
  'Mes super-pouvoirs cachés',
  'Trouver et nommer ce que tu fais mieux que tout le monde',
  'Identifier ses forces cognitives, sociales et créatives. Construire son profil de forces. Comprendre pourquoi les difficultés cachent souvent des talents.',
  'eleve', 'decouverte', 20, 11, 80, 30, 25, 'e2-detecteur-super', 5
),
(
  'e0000000-0000-0000-0000-000000000003', 'E3',
  'les-signaux-de-mon-corps',
  'Les signaux de mon corps',
  'Reconnaître quand ton cerveau est en surcharge',
  'Intéroception et signaux corporels, fenêtre de tolérance adaptée enfant, signaux de surcharge sensorielle, signaux d''ennui vs de défi.',
  'eleve', 'decouverte', 20, 12, 80, 30, 25, 'e3-lecteur-signaux', 5
),
(
  'e0000000-0000-0000-0000-000000000004', 'E4',
  'mon-attention-a-moi',
  'Mon attention à moi',
  'L''attention, ça s''apprivoise — même quand elle part dans tous les sens',
  'Comprendre son profil attentionnel. Stratégies de retour au focus. Environnements propices à la concentration selon son profil.',
  'eleve', 'decouverte', 25, 13, 80, 30, 25, 'e4-dompteur-attention', 5
),
-- Série 2 : Mes émotions (E5-E7)
(
  'e0000000-0000-0000-0000-000000000005', 'E5',
  'je-comprends-mes-emotions',
  'Je comprends mes émotions',
  'Mettre des mots sur ce que tu ressens — pour ne plus être débordé',
  'Vocabulaire émotionnel enrichi, roue des émotions, lien émotion-corps, pourquoi les neurodivergents ressentent plus intensément.',
  'eleve', 'decouverte', 25, 20, 80, 30, 25, 'e5-surfeur-emotions', 5
),
(
  'e0000000-0000-0000-0000-000000000006', 'E6',
  'calmer-la-tempete',
  'Calmer la tempête',
  'Ta boîte à outils anti-explosion',
  'Stratégies de régulation émotionnelle adaptées enfant. Techniques corporelles (respiration, mouvement). Le plan de crise personnel.',
  'eleve', 'intermediaire', 25, 21, 80, 30, 25, 'e6-anti-colere', 5
),
(
  'e0000000-0000-0000-0000-000000000007', 'E7',
  'apprivoiser-mon-anxiete',
  'Apprivoiser mon anxiété',
  'Comprendre la peur pour pouvoir avancer malgré elle',
  'Mécanisme de l''anxiété en mots enfant, déclencheurs courants chez les neurodivergents, évitement vs exposition graduelle, auto-compassion.',
  'eleve', 'intermediaire', 25, 22, 80, 30, 25, 'e7-anxieux-courageux', 5
),
-- Série 3 : Je m'organise (E8-E10)
(
  'e0000000-0000-0000-0000-000000000008', 'E8',
  'je-dompte-le-temps',
  'Je dompte le temps',
  'Quand le temps s''échappe — stratégies pour l''attraper',
  'Temps subjectif et TDAH, outils de gestion du temps adaptés (minuteur visuel, time-boxing), routines en blocs, procrastination et comment s''en sortir.',
  'eleve', 'decouverte', 25, 30, 80, 30, 25, 'e8-architecte-temps', 5
),
(
  'e0000000-0000-0000-0000-000000000009', 'E9',
  'chasser-les-distractions',
  'Chasser les distractions',
  'Reprendre le contrôle de ton attention',
  'Types de distractions (internes vs externes), aménagement de l''espace de travail, stratégies anti-distraction numériques et environnementales.',
  'eleve', 'intermediaire', 20, 31, 80, 30, 25, 'e9-chasseur-distractions', 5
),
(
  'e0000000-0000-0000-0000-000000000010', 'E10',
  'secrets-de-la-memoire',
  'Les secrets de ma mémoire',
  'Comment retenir vraiment ce qu''on apprend',
  'Fonctionnement de la mémoire (courts terme, long terme, de travail), stratégies mnémotechniques, révision espacée, chunking.',
  'eleve', 'intermediaire', 25, 32, 80, 30, 25, 'e10-memoire-magique', 5
)
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E1 : Mon cerveau est différent
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E1') m,
(VALUES
  ('e1010000-0000-0000-0000-000000000001'::uuid, 'Un cerveau neurodivergent, c''est quoi ?', 1),
  ('e1020000-0000-0000-0000-000000000002'::uuid, 'La dyslexie, c''est surtout un problème avec :', 2),
  ('e1030000-0000-0000-0000-000000000003'::uuid, 'Le TDAH signifie que l''enfant :', 3),
  ('e1040000-0000-0000-0000-000000000004'::uuid, 'Les neurodivergents ont souvent :', 4),
  ('e1050000-0000-0000-0000-000000000005'::uuid, 'La plasticité cérébrale, c''est :', 5),
  ('e1060000-0000-0000-0000-000000000006'::uuid, 'Un point fort très courant chez les personnes TDAH est :', 6),
  ('e1070000-0000-0000-0000-000000000007'::uuid, 'Pourquoi certains enfants neurodivergents semblent "normaux" en cours mais sont épuisés à la maison ?', 7),
  ('e1080000-0000-0000-0000-000000000008'::uuid, 'Être neurodivergent signifie que :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q1
('e1010000-0000-0000-0000-000000000001', 'Un cerveau malade qu''il faut réparer', false, 1, NULL, 'Non ! Neurodivergent ne veut pas dire malade. C''est juste une façon différente de fonctionner.'),
('e1010000-0000-0000-0000-000000000001', 'Un cerveau qui fonctionne différemment de la majorité', true, 2, 'Exactement ! "Neuro" = cerveau, "divergent" = différent. Ton cerveau prend des chemins différents — pas des chemins incorrects.', NULL),
('e1010000-0000-0000-0000-000000000001', 'Un cerveau plus intelligent que la moyenne', false, 3, NULL, 'Pas exactement. Les neurodivergents ne sont pas forcément plus ou moins intelligents — ils pensent différemment.'),
('e1010000-0000-0000-0000-000000000001', 'Un cerveau qui n''aime pas l''école', false, 4, NULL, 'Ce n''est pas ça. Beaucoup de neurodivergents adorent apprendre — juste pas toujours de la façon scolaire classique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q2
('e1020000-0000-0000-0000-000000000002', 'Voir les lettres à l''envers', false, 1, NULL, 'C''est un mythe ! La dyslexie n''inverse pas les lettres dans le cerveau.'),
('e1020000-0000-0000-0000-000000000002', 'Le traitement du langage écrit dans le cerveau', true, 2, 'Oui ! La dyslexie affecte la façon dont le cerveau décode les sons et les lettres — pas la vue, pas l''intelligence.', NULL),
('e1020000-0000-0000-0000-000000000002', 'Un problème de vue qu''on corrige avec des lunettes', false, 3, NULL, 'Non, les lunettes ne changent pas la dyslexie. C''est dans la façon dont le cerveau traite les sons, pas dans les yeux.'),
('e1020000-0000-0000-0000-000000000002', 'La paresse à lire', false, 4, NULL, 'Absolument pas ! Les dyslexiques travaillent souvent beaucoup plus dur que les autres pour lire.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q3
('e1030000-0000-0000-0000-000000000003', 'Fait exprès de ne pas écouter', false, 1, NULL, 'Non ! Le TDAH n''est pas une question de volonté. Le cerveau TDAH a du mal à réguler l''attention — ce n''est pas un choix.'),
('e1030000-0000-0000-0000-000000000003', 'A un cerveau qui cherche constamment de la stimulation', true, 2, 'Exactement ! Le cerveau TDAH a besoin de plus de dopamine pour rester engagé. Quand c''est intéressant, la concentration est souvent extraordinaire.', NULL),
('e1030000-0000-0000-0000-000000000003', 'Ne peut jamais se concentrer sur quoi que ce soit', false, 3, NULL, 'Pas tout à fait — un enfant TDAH peut se concentrer intensément sur ce qui le passionne. C''est l''hyperconcentration (hyperfocus) !'),
('e1030000-0000-0000-0000-000000000003', 'Mange trop de sucre', false, 4, NULL, 'C''est un mythe ! Le sucre n''est pas la cause du TDAH. Le TDAH est neurologique et génétique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q4
('e1040000-0000-0000-0000-000000000004', 'Que des difficultés et des problèmes', false, 1, NULL, 'Ce n''est pas toute la réalité ! Les difficultés sont réelles, mais il y a aussi des forces — souvent étonnantes.'),
('e1040000-0000-0000-0000-000000000004', 'Un profil en "dents de scie" : des points très forts et des points plus difficiles', true, 2, 'Parfait ! Le profil cognitif neurodivergent est rarement "plat". Il y a souvent des zones de génie ET des zones de défi — c''est ça qui le rend unique.', NULL),
('e1040000-0000-0000-0000-000000000004', 'Exactement les mêmes difficultés que tout le monde', false, 3, NULL, 'Non — les profils neurodivergents ont des défis spécifiques, différents des difficultés classiques.'),
('e1040000-0000-0000-0000-000000000004', 'Un QI toujours très élevé', false, 4, NULL, 'Pas forcément. La neurodivergence n''est pas liée au QI — on peut être neurodivergent avec tous niveaux d''intelligence.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q5
('e1050000-0000-0000-0000-000000000005', 'Que le cerveau ne change plus après 7 ans', false, 1, NULL, 'C''est faux ! Le cerveau se remodèle toute la vie — et encore plus vite pendant l''enfance.'),
('e1050000-0000-0000-0000-000000000005', 'La capacité du cerveau à se remodeler grâce à l''expérience', true, 2, 'Exactement ! Chaque fois que tu apprends quelque chose de nouveau, ton cerveau crée de nouvelles connexions. Tu peux t''améliorer dans des choses difficiles pour toi !', NULL),
('e1050000-0000-0000-0000-000000000005', 'La souplesse physique du cerveau', false, 3, NULL, 'Non, c''est une métaphore. La plasticité cérébrale parle de la capacité à changer comment on pense et apprend.'),
('e1050000-0000-0000-0000-000000000005', 'Le fait que tous les cerveaux se ressemblent', false, 4, NULL, 'Au contraire ! La plasticité explique pourquoi chaque cerveau devient unique selon ses expériences.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q6
('e1060000-0000-0000-0000-000000000006', 'La patience infinie', false, 1, NULL, 'En général pas — les profils TDAH peuvent avoir du mal avec la patience. Mais ce n''est pas universel !'),
('e1060000-0000-0000-0000-000000000006', 'La créativité et la pensée en dehors des sentiers battus', true, 2, 'Oui ! Des études montrent que les personnes TDAH ont souvent une pensée divergente plus développée — elles trouvent des solutions originales que les autres ne voient pas.', NULL),
('e1060000-0000-0000-0000-000000000006', 'La mémorisation de textes longs', false, 3, NULL, 'Ce n''est généralement pas un point fort TDAH. La mémoire de travail peut être challengée.'),
('e1060000-0000-0000-0000-000000000006', 'L''organisation de l''espace', false, 4, NULL, 'C''est souvent un défi pour les profils TDAH — pas une force typique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q7
('e1070000-0000-0000-0000-000000000007', 'Parce qu''ils font semblant d''être fatigués à la maison', false, 1, NULL, 'Non ! C''est un phénomène réel qui s''appelle le "masking" — et la fatigue après est vraiment épuisante.'),
('e1070000-0000-0000-0000-000000000007', 'Parce qu''ils dépensent énormément d''énergie à masquer leurs difficultés en classe', true, 2, 'Exactement ! Le "masking" (se cacher), c''est imiter les comportements neurotypiques pour passer inaperçu. C''est épuisant. La maison devient l''endroit où le masque tombe.', NULL),
('e1070000-0000-0000-0000-000000000007', 'Parce que l''école est trop facile pour eux', false, 3, NULL, 'Ce n''est généralement pas la raison. Le masking est lié à la sécurité sociale, pas au niveau scolaire.'),
('e1070000-0000-0000-0000-000000000007', 'Parce qu''ils n''aiment pas être à la maison', false, 4, NULL, 'Non — c''est souvent l''inverse. La maison est l''endroit sûr où ils peuvent enfin relâcher la pression.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
-- Q8
('e1080000-0000-0000-0000-000000000008', 'Tu seras toujours moins bon que les autres à l''école', false, 1, NULL, 'Faux ! Beaucoup de neurodivergents excellent dans leurs domaines. Les bonnes stratégies font toute la différence.'),
('e1080000-0000-0000-0000-000000000008', 'Tu as un cerveau unique qui apprend différemment — et c''est une chance', true, 2, 'Parfait ! Des gens comme Albert Einstein, Leonardo da Vinci, et Simone Biles sont neurodivergents. Ta façon différente de penser est une ressource, pas un obstacle.', NULL),
('e1080000-0000-0000-0000-000000000008', 'Tu dois travailler deux fois plus que les autres pour réussir', false, 3, NULL, 'Pas forcément ! Avec les bonnes stratégies adaptées à TON cerveau, tu peux travailler mieux — pas forcément plus.'),
('e1080000-0000-0000-0000-000000000008', 'Tu es exactement comme tout le monde en fait', false, 4, NULL, 'Non — ton cerveau fonctionne vraiment différemment. Et c''est OK ! La différence n''est pas un défaut.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E2 : Mes super-pouvoirs cachés
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E2') m,
(VALUES
  ('e2010000-0000-0000-0000-000000000001'::uuid, 'Une "force" dans le contexte des apprentissages, c''est :', 1),
  ('e2020000-0000-0000-0000-000000000002'::uuid, 'La pensée en images (visualisation), souvent présente chez les DYS, est utile pour :', 2),
  ('e2030000-0000-0000-0000-000000000003'::uuid, 'Pourquoi est-il important de connaître ses forces en plus de ses difficultés ?', 3),
  ('e2040000-0000-0000-0000-000000000004'::uuid, 'L''hyperfocus chez une personne TDAH, c''est :', 4),
  ('e2050000-0000-0000-0000-000000000005'::uuid, 'Un enfant qui pose beaucoup de questions "pourquoi" manifeste souvent :', 5),
  ('e2060000-0000-0000-0000-000000000006'::uuid, 'La pensée "big picture" (voir le tableau d''ensemble) est une force car :', 6),
  ('e2070000-0000-0000-0000-000000000007'::uuid, 'Pour identifier tes forces, la meilleure méthode est :', 7),
  ('e2080000-0000-0000-0000-000000000008'::uuid, 'Utiliser ses forces pour apprendre, c''est :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2010000-0000-0000-0000-000000000001', 'Quelque chose qu''on fait parfaitement sans effort', false, 1, NULL, 'Pas tout à fait — une force peut demander du travail. C''est quelque chose qui vient naturellement ou qu''on aime vraiment.'),
('e2010000-0000-0000-0000-000000000001', 'Une capacité naturelle ou apprise qui te donne de l''énergie et des résultats', true, 2, 'Exactement ! Les forces ne sont pas forcément "faciles" — elles sont énergisantes. Quand tu utilises une force, le temps passe vite et tu te sens compétent.', NULL),
('e2010000-0000-0000-0000-000000000001', 'Ce que les adultes te disent que tu fais bien', false, 3, NULL, 'Les adultes peuvent t''aider à les identifier, mais les forces sont les tiennes — pas une étiquette que les autres te collent.'),
('e2010000-0000-0000-0000-000000000001', 'Les matières où tu as les meilleures notes', false, 4, NULL, 'Les notes ne reflètent pas toutes les forces ! L''empathie, la créativité, la mémoire visuelle ne sont pas notées en classe.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2020000-0000-0000-0000-000000000002', 'Seulement regarder des films au lieu de lire', false, 1, NULL, 'La pensée en images est bien plus que ça — c''est une façon de résoudre des problèmes, d''innover, de comprendre.'),
('e2020000-0000-0000-0000-000000000002', 'Résoudre des problèmes, visualiser des solutions, créer et innover', true, 2, 'Parfait ! Les personnes qui pensent en images traitent souvent les informations complexes plus vite. C''est un avantage en mathématiques 3D, en design, en ingénierie.', NULL),
('e2020000-0000-0000-0000-000000000002', 'Dessiner pendant les cours sans écouter', false, 3, NULL, 'La visualisation est une compétence cognitive — pas une distraction. Dessiner pour comprendre est une vraie stratégie d''apprentissage !'),
('e2020000-0000-0000-0000-000000000002', 'Mémoriser des textes en les illustrant uniquement', false, 4, NULL, 'C''est une application parmi d''autres — la pensée en images a beaucoup d''autres usages puissants.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2030000-0000-0000-0000-000000000003', 'Pour pouvoir se vanter auprès des autres', false, 1, NULL, 'Les forces ne sont pas pour l''ego — elles sont des outils pour apprendre et avancer.'),
('e2030000-0000-0000-0000-000000000003', 'Pour construire de la confiance et trouver des stratégies qui marchent vraiment pour toi', true, 2, 'Exactement ! Quand tu sais ce qui marche pour toi, tu peux l''utiliser pour compenser les difficultés. La confiance en soi se construit sur les forces, pas sur les efforts pour corriger les faiblesses.', NULL),
('e2030000-0000-0000-0000-000000000003', 'Parce que les difficultés ne comptent pas vraiment', false, 3, NULL, 'Les difficultés sont réelles et méritent attention. Mais se focaliser uniquement sur elles épuise et décourage.'),
('e2030000-0000-0000-0000-000000000003', 'Pour éviter de travailler sur ses points faibles', false, 4, NULL, 'Non — connaître ses forces aide à travailler smarter sur ses difficultés, pas à les ignorer.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2040000-0000-0000-0000-000000000004', 'Un problème de concentration extrême qui empêche de faire autre chose', false, 1, NULL, 'C''est une façon de le voir, mais l''hyperfocus est plutôt une super-capacité qui peut être canalisée.'),
('e2040000-0000-0000-0000-000000000004', 'Une concentration intense et prolongée sur un sujet qui passionne', true, 2, 'Oui ! L''hyperfocus peut durer des heures et produire un travail exceptionnel. Des ingénieurs, artistes et scientifiques TDAH l''utilisent comme avantage compétitif.', NULL),
('e2040000-0000-0000-0000-000000000004', 'Un symptôme dangereux du TDAH à traiter d''urgence', false, 3, NULL, 'Pas du tout — l''hyperfocus est plutôt un point fort à comprendre et orienter vers des activités utiles.'),
('e2040000-0000-0000-0000-000000000004', 'La même chose que la concentration normale, juste plus longue', false, 4, NULL, 'L''hyperfocus est qualitativement différent — c''est un état de flow intense où le temps disparaît et les performances sont souvent exceptionnelles.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2050000-0000-0000-0000-000000000005', 'De l''insolence et du manque de respect', false, 1, NULL, 'Non ! Poser des "pourquoi" est un signe de pensée critique et de curiosité — des qualités précieuses.'),
('e2050000-0000-0000-0000-000000000005', 'Une curiosité intellectuelle et une pensée critique naturelles', true, 2, 'Parfait ! Les enfants qui questionnent les règles et cherchent le sens sont souvent d''excellents penseurs critiques. Cette force mène souvent à des carrières dans la recherche, le droit, la philosophie.', NULL),
('e2050000-0000-0000-0000-000000000005', 'Qu''ils n''ont pas compris la leçon', false, 3, NULL, 'Souvent c''est l''inverse — ils ont trop bien compris et veulent aller plus loin !'),
('e2050000-0000-0000-0000-000000000005', 'Un problème de comportement à corriger', false, 4, NULL, 'Non — les questions "pourquoi" sont le moteur de l''apprentissage profond. À encourager, pas à éteindre.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2060000-0000-0000-0000-000000000006', 'Elle permet de voir les connexions entre les sujets que d''autres ratent', true, 1, 'Exactement ! Voir le tableau d''ensemble — comprendre comment les choses s''interconnectent — est une compétence rare et précieuse en leadership, stratégie, et création.', NULL),
('e2060000-0000-0000-0000-000000000006', 'Elle remplace le besoin d''apprendre les détails', false, 2, NULL, 'Non — les détails restent importants. La force est de pouvoir faire les deux : zoom out ET zoom in.'),
('e2060000-0000-0000-0000-000000000006', 'Elle facilite la mémorisation des définitions', false, 3, NULL, 'Ce n''est pas sa principale utilité. La pensée globale aide à comprendre le sens avant les détails.'),
('e2060000-0000-0000-0000-000000000006', 'Elle n''est utile qu''en arts et en créativité', false, 4, NULL, 'Pas du tout ! C''est aussi très utile en sciences, en entreprise, en politique — partout où il faut voir les systèmes.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2070000-0000-0000-0000-000000000007', 'Demander à tes profs quelles matières tu rates le moins', false, 1, NULL, 'Les notes scolaires ne capturent pas toutes les forces — surtout les forces sociales, créatives et intuitives.'),
('e2070000-0000-0000-0000-000000000007', 'Observer ce qui te donne de l''énergie, ce dans quoi le temps passe vite, ce qu''on te dit souvent que tu fais bien', true, 2, 'Oui ! Ces trois signaux (énergie, temps, retours positifs) sont les meilleurs indicateurs de tes vraies forces. Tiens un journal de tes moments de flow !', NULL),
('e2070000-0000-0000-0000-000000000007', 'Faire un test de QI en ligne', false, 3, NULL, 'Les tests de QI ne mesurent qu''un type d''intelligence. Les forces sont bien plus larges et variées.'),
('e2070000-0000-0000-0000-000000000007', 'Chercher ce que tu n''as pas de mal à faire du tout', false, 4, NULL, 'Les vraies forces peuvent demander des efforts — ce qui compte, c''est que ça t''énergise, pas que ça soit facile.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e2080000-0000-0000-0000-000000000008', 'Tricher en utilisant ce qu''on sait déjà', false, 1, NULL, 'Non ! Utiliser ses forces pour apprendre, c''est de la pédagogie intelligente — pas de la triche.'),
('e2080000-0000-0000-0000-000000000008', 'Apprendre par des chemins qui correspondent à comment ton cerveau fonctionne vraiment', true, 2, 'Parfait ! Si tu penses en images, utilise des schémas. Si tu aimes raconter, transforme les leçons en histoires. Apprendre avec tes forces rend les difficultés plus gérables.', NULL),
('e2080000-0000-0000-0000-000000000008', 'Ignorer les parties difficiles', false, 3, NULL, 'Non — les forces sont des ponts, pas des façons d''éviter. On les utilise pour traverser les zones difficiles.'),
('e2080000-0000-0000-0000-000000000008', 'Attendre que l''école s''adapte à toi', false, 4, NULL, 'L''école s''adapte peu à peu, mais toi tu peux commencer maintenant à apprendre à ta façon. Tu n''as pas à attendre !');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E3 : Les signaux de mon corps
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E3') m,
(VALUES
  ('e3010000-0000-0000-0000-000000000001'::uuid, 'Quand ton cerveau est "en surcharge", tu pourrais ressentir :', 1),
  ('e3020000-0000-0000-0000-000000000002'::uuid, 'La "fenêtre de tolérance", c''est :', 2),
  ('e3030000-0000-0000-0000-000000000003'::uuid, 'Ton corps te signale souvent la surcharge AVANT que tu t''en rendes compte mentalement. C''est utile car :', 3),
  ('e3040000-0000-0000-0000-000000000004'::uuid, 'Quand tu te sens "vide" et incapable de rien faire après l''école, c''est souvent :', 4),
  ('e3050000-0000-0000-0000-000000000005'::uuid, 'Un signal que tu ES dans ta fenêtre de tolérance (état optimal) c''est :', 5),
  ('e3060000-0000-0000-0000-000000000006'::uuid, 'Pour apprendre à reconnaître tes signaux corporels, tu peux :', 6),
  ('e3070000-0000-0000-0000-000000000007'::uuid, 'Pourquoi les neurodivergents ont-ils souvent du mal à repérer leurs signaux de surcharge à temps ?', 7),
  ('e3080000-0000-0000-0000-000000000008'::uuid, 'Reconnaître ses signaux de surcharge permet de :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3010000-0000-0000-0000-000000000001', 'De la joie et de l''enthousiasme', false, 1, NULL, 'Non — en surcharge, le corps envoie des signaux d''alarme, pas de bien-être.'),
('e3010000-0000-0000-0000-000000000001', 'Mal à la tête, estomac serré, envie de pleurer ou de tout envoyer balader', true, 2, 'Oui ! Ces signaux physiques sont des alarmes que ton cerveau envoie pour dire "trop, c''est trop !". Apprendre à les reconnaître, c''est comme avoir un détecteur d''incendie interne.', NULL),
('e3010000-0000-0000-0000-000000000001', 'Uniquement de la fatigue physique', false, 3, NULL, 'La fatigue peut en faire partie, mais la surcharge cognitive a beaucoup d''autres signaux : irritabilité, blocage, sensibilité exacerbée.'),
('e3010000-0000-0000-0000-000000000001', 'Rien — la surcharge ne se ressent pas physiquement', false, 4, NULL, 'Si ! Le corps et le cerveau sont connectés. La surcharge mentale a toujours des manifestations physiques.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3020000-0000-0000-0000-000000000002', 'La période de temps où tu peux regarder par la fenêtre pendant les cours', false, 1, NULL, 'Non — c''est un terme de neurosciences qui parle de ton état interne, pas de la fenêtre de la classe !'),
('e3020000-0000-0000-0000-000000000002', 'La zone dans laquelle tu peux apprendre, t''adapter et gérer tes émotions correctement', true, 2, 'Exactement ! Dans ta fenêtre de tolérance, tu es ni trop agité ni trop vide — c''est la zone optimale pour apprendre et vivre. Hors de cette zone, tout devient plus difficile.', NULL),
('e3020000-0000-0000-0000-000000000002', 'Le temps maximum que tu peux passer devant un écran', false, 3, NULL, 'Ce n''est pas ça. La fenêtre de tolérance concerne ton état neurologique et émotionnel.'),
('e3020000-0000-0000-0000-000000000002', 'La durée pendant laquelle tu peux être patient', false, 4, NULL, 'La patience peut être affectée par ta fenêtre de tolérance, mais ce n''est pas la même chose.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3030000-0000-0000-0000-000000000003', 'Tu peux agir avant que la situation devienne une crise', true, 1, 'Parfait ! Si tu reconnais les signaux tôt (gorge serrée, agitation), tu peux prendre une stratégie de régulation avant d''exploser ou de te bloquer.', NULL),
('e3030000-0000-0000-0000-000000000003', 'Ça ne sert à rien — la surcharge arrive toujours sans prévenir', false, 2, NULL, 'Si le corps envoie des signaux AVANT la crise — et tu peux apprendre à les lire pour agir à temps.'),
('e3030000-0000-0000-0000-000000000003', 'Tu peux ignorer les signaux du corps', false, 3, NULL, 'Ignorer les signaux du corps ne les fait pas disparaître — ça mène souvent à une crise plus forte.'),
('e3030000-0000-0000-0000-000000000003', 'Les adultes peuvent mieux te surveiller', false, 4, NULL, 'L''idée c''est que TOI tu deviens autonome — pas que les adultes te contrôlent.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3040000-0000-0000-0000-000000000004', 'Que tu es paresseux', false, 1, NULL, 'Non ! Ce vide est réel et a une cause neurologique — ton cerveau a épuisé ses ressources.'),
('e3040000-0000-0000-0000-000000000004', 'Un épuisement cérébral normal après une journée de masking et d''adaptation intense', true, 2, 'Exactement ! S''adapter à un environnement pas conçu pour toi toute la journée est épuisant. Ce vide est légitime et ton corps a besoin de récupérer.', NULL),
('e3040000-0000-0000-0000-000000000004', 'Que tu n''as pas assez mangé', false, 3, NULL, 'L''alimentation joue un rôle, mais cet état est surtout de l''épuisement neurologique, pas caloriques.'),
('e3040000-0000-0000-0000-000000000004', 'Un symptôme de dépression à signaler d''urgence', false, 4, NULL, 'Pas forcément — cet épuisement post-école est courant chez les neurodivergents. Si ça dure longtemps, parles-en à un adulte de confiance.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3050000-0000-0000-0000-000000000005', 'Tu peux penser clairement et réagir sans tout dramatiser', true, 1, 'Oui ! Dans ta fenêtre de tolérance, ton cerveau peut résoudre des problèmes, apprendre, et gérer les frustrations. C''est l''état à cultiver.', NULL),
('e3050000-0000-0000-0000-000000000005', 'Tu ne ressens aucune émotion', false, 2, NULL, 'Non — dans la fenêtre de tolérance tu ressens des émotions, mais tu peux les gérer sans être débordé.'),
('e3050000-0000-0000-0000-000000000005', 'Tu es tellement calme que tu pourrais t''endormir', false, 3, NULL, 'Non — être trop calme et vide peut indiquer un état hypo-arousal, hors de la fenêtre aussi !'),
('e3050000-0000-0000-0000-000000000005', 'Tu n''as besoin de personne pour t''aider', false, 4, NULL, 'Même dans ta fenêtre, demander de l''aide est une compétence — pas un signe de faiblesse.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3060000-0000-0000-0000-000000000006', 'Attendre une crise pour remarquer ce qui s''est passé', false, 1, NULL, 'Attendre la crise, c''est apprendre trop tard. L''objectif est d''apprendre AVANT la crise.'),
('e3060000-0000-0000-0000-000000000006', 'Tenir un journal de tes émotions et sensations, surtout après des moments difficiles', true, 2, 'Parfait ! Un journal corporel t''aide à repérer les patterns — "chaque fois que j''ai cours de sport le matin, je me sens saturé à midi." Ces données t''appartiennent et te donnent du pouvoir.', NULL),
('e3060000-0000-0000-0000-000000000006', 'Demander à tes parents d''observer à ta place', false, 3, NULL, 'Les adultes peuvent aider, mais toi seul ressens ce qui se passe à l''intérieur. Développer cette conscience intérieure est une compétence clé.'),
('e3060000-0000-0000-0000-000000000006', 'Ignorer les signaux pour ne pas paraître sensible', false, 4, NULL, 'Ignorer ne fait pas disparaître — ça accumule jusqu''à la surcharge. La sensibilité est une information, pas une faiblesse.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3070000-0000-0000-0000-000000000007', 'Parce qu''ils ne font pas attention à eux-mêmes', false, 1, NULL, 'Ce n''est pas une question d''attention volontaire — c''est neurologique.'),
('e3070000-0000-0000-0000-000000000007', 'Parce que l''intéroception (sensation des états internes) peut être moins développée', true, 2, 'Exactement ! L''intéroception — la capacité à sentir ce qui se passe à l''intérieur du corps — est souvent atypique chez les neurodivergents. Ça se travaille et ça s''améliore !', NULL),
('e3070000-0000-0000-0000-000000000007', 'Parce qu''ils ne veulent pas se plaindre', false, 3, NULL, 'Ce n''est pas la raison principale. Le problème est plus profond — c''est la perception même des signaux qui est atypique.'),
('e3070000-0000-0000-0000-000000000007', 'Parce qu''ils ont moins de signaux physiques que les autres', false, 4, NULL, 'En fait, souvent c''est l''inverse — les neurodivergents peuvent avoir PLUS de sensations, mais du mal à les identifier et nommer.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e3080000-0000-0000-0000-000000000008', 'D''éviter toutes les situations stressantes', false, 1, NULL, 'L''objectif n''est pas l''évitement — c''est l''anticipation et la gestion. Tu ne peux pas éviter la vie !'),
('e3080000-0000-0000-0000-000000000008', 'D''intervenir avant la crise et de garder le contrôle de ta journée', true, 2, 'Exactement ! Quand tu reconnais "je commence à me saturer", tu peux prendre une micro-pause, boire de l''eau, bouger — et revenir dans ta fenêtre avant que ça explose.', NULL),
('e3080000-0000-0000-0000-000000000008', 'De te plaindre auprès des adultes à temps', false, 3, NULL, 'Prévenir les adultes peut aider, mais l''objectif premier est de développer ton autonomie dans la régulation.'),
('e3080000-0000-0000-0000-000000000008', 'De ne plus jamais sortir de ta fenêtre de tolérance', false, 4, NULL, 'Impossible ! Tout le monde sort de sa fenêtre parfois. Le but est de s''y remettre plus vite et mieux.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E4 : Mon attention à moi
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E4') m,
(VALUES
  ('e4010000-0000-0000-0000-000000000001'::uuid, 'L''attention, c''est comme un muscle : elle :', 1),
  ('e4020000-0000-0000-0000-000000000002'::uuid, 'Quand tu te distrais facilement, c''est souvent parce que :', 2),
  ('e4030000-0000-0000-0000-000000000003'::uuid, 'Une bonne stratégie pour "re-focus" après une distraction est :', 3),
  ('e4040000-0000-0000-0000-000000000004'::uuid, 'L''environnement idéal pour se concentrer dépend de :', 4),
  ('e4050000-0000-0000-0000-000000000005'::uuid, 'Pourquoi les pauses régulières AMÉLIORENT la concentration ?', 5),
  ('e4060000-0000-0000-0000-000000000006'::uuid, 'La technique Pomodoro (25 min travail / 5 min pause) aide surtout :', 6),
  ('e4070000-0000-0000-0000-000000000007'::uuid, 'Une distraction "interne" c''est :', 7),
  ('e4080000-0000-0000-0000-000000000008'::uuid, 'Quand une tâche est très longue et ennuyeuse, la meilleure stratégie est de :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4010000-0000-0000-0000-000000000001', 'Est fixe — on l''a ou on ne l''a pas', false, 1, NULL, 'Faux ! L''attention est une compétence entraînable — pas un don inné.'),
('e4010000-0000-0000-0000-000000000001', 'Se renforce avec de la pratique et se fatigue sans repos', true, 2, 'Exactement ! Comme un muscle, l''attention se développe avec de l''entraînement. Et comme un muscle, elle se fatigue — d''où l''importance des pauses.', NULL),
('e4010000-0000-0000-0000-000000000001', 'Fonctionne mieux quand on est stressé', false, 3, NULL, 'Le stress peut créer une vigilance temporaire, mais il nuit à l''attention profonde et à la mémorisation sur le long terme.'),
('e4010000-0000-0000-0000-000000000001', 'Ne peut pas être améliorée sans médicaments', false, 4, NULL, 'Faux ! Des stratégies comportementales et environnementales améliorent significativement l''attention, avec ou sans traitement.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4020000-0000-0000-0000-000000000002', 'Ton cerveau cherche de la nouveauté et de la stimulation', true, 1, 'Parfait ! Le cerveau est câblé pour remarquer ce qui est nouveau (survie). Quand la tâche est répétitive, il cherche de la stimulation ailleurs. Varier les formats aide.', NULL),
('e4020000-0000-0000-0000-000000000002', 'Tu es moins intelligent que les autres', false, 2, NULL, 'Absolument pas. Se distraire facilement est un trait neurologique — pas un indicateur d''intelligence.'),
('e4020000-0000-0000-0000-000000000002', 'Tu n''as pas envie de travailler', false, 3, NULL, 'La motivation peut jouer, mais les distractions involontaires ont une base neurologique — elles ne dépendent pas uniquement de la volonté.'),
('e4020000-0000-0000-0000-000000000002', 'Quelque chose ne va pas chez toi', false, 4, NULL, 'Rien ne "va pas" — ton cerveau fonctionne d''une façon spécifique. Comprendre comment il fonctionne te permet de t''adapter.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4030000-0000-0000-0000-000000000003', 'Se punir de s''être distrait et reprendre immédiatement', false, 1, NULL, 'La punition ne recharge pas l''attention — elle ajoute du stress qui aggrave la situation.'),
('e4030000-0000-0000-0000-000000000003', 'Prendre 3 respirations, noter où on en était, et reprendre doucement', true, 2, 'Excellent ! Les respirations réactivent le cortex préfrontal (zone du focus). Noter où tu en étais évite la frustration de devoir tout relire.', NULL),
('e4030000-0000-0000-0000-000000000003', 'Abandonner la tâche pour l''instant', false, 3, NULL, 'Abandonner peut créer une habitude d''évitement. Re-focus progressive est plus efficace.'),
('e4030000-0000-0000-0000-000000000003', 'S''obliger à ne pas se distraire la prochaine fois', false, 4, NULL, 'La volonté seule ne suffit pas — il faut des stratégies concrètes et un environnement adapté.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4040000-0000-0000-0000-000000000004', 'De ce que font tes camarades', false, 1, NULL, 'L''environnement optimal est personnel — il dépend de TON profil neurologique, pas de celui des autres.'),
('e4040000-0000-0000-0000-000000000004', 'De ton profil sensoriel et de tes préférences personnelles', true, 2, 'Exactement ! Certains se concentrent mieux avec un fond sonore doux, d''autres dans le silence total. Certains ont besoin de bouger, d''autres de s''asseoir. Experimente pour trouver TON environnement optimal.', NULL),
('e4040000-0000-0000-0000-000000000004', 'Ce que l''école recommande', false, 3, NULL, 'L''école a des contraintes collectives — mais tu peux appliquer tes stratégies personnelles même en classe (casque, place stratégique, etc.).'),
('e4040000-0000-0000-0000-000000000004', 'Du silence absolu pour tout le monde', false, 4, NULL, 'Le silence absolu n''est pas optimal pour tout le monde — certains profils ont besoin d''un bruit de fond léger pour rester engagés.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4050000-0000-0000-0000-000000000005', 'Elles permettent au cerveau de consolider l''information et de récupérer de l''énergie', true, 1, 'Parfait ! Des études en neurosciences montrent que pendant les pauses, le cerveau traite et consolide ce qu''il vient d''apprendre. Travailler sans pause = retenir moins !', NULL),
('e4050000-0000-0000-0000-000000000005', 'Elles ne sont utiles que pour les enfants TDAH', false, 2, NULL, 'Tout le monde bénéficie des pauses — pas seulement les TDAH. C''est universel.'),
('e4050000-0000-0000-0000-000000000005', 'Elles n''améliorent rien — c''est juste agréable', false, 3, NULL, 'Non — l''effet des pauses sur l''apprentissage est documenté scientifiquement. C''est une stratégie validée.'),
('e4050000-0000-0000-0000-000000000005', 'Elles fonctionnent seulement si on dort pendant', false, 4, NULL, 'Même une pause active (marcher, boire de l''eau) améliore la concentration. Pas besoin de dormir.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4060000-0000-0000-0000-000000000006', 'À rendre les tâches longues plus gérables et à créer des micro-objectifs', true, 1, 'Exactement ! 25 minutes, c''est atteignable même pour les cerveaux qui s''impatientent. Chaque Pomodoro est une petite victoire qui relance la dopamine.', NULL),
('e4060000-0000-0000-0000-000000000006', 'À travailler plus vite en moins de temps', false, 2, NULL, 'L''objectif n''est pas la vitesse — c''est la régularité et la qualité du focus.'),
('e4060000-0000-0000-0000-000000000006', 'À éliminer toutes les distractions', false, 3, NULL, 'Les distractions ne disparaissent pas — mais les blocs courts les rendent moins envahissantes.'),
('e4060000-0000-0000-0000-000000000006', 'À ne travailler que 25 minutes par jour', false, 4, NULL, 'Non — un Pomodoro est une unité de travail. On peut en faire plusieurs dans une session !');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4070000-0000-0000-0000-000000000007', 'Le bruit des autres élèves dans la classe', false, 1, NULL, 'Ça, c''est une distraction externe — elle vient de l''environnement.'),
('e4070000-0000-0000-0000-000000000007', 'Une pensée ou une inquiétude qui surgit dans ta tête', true, 2, 'Exactement ! Les distractions internes viennent de TOI — une idée qui surgit, une inquiétude, un souvenir. Elles sont souvent plus difficiles à gérer que les distractions externes.', NULL),
('e4070000-0000-0000-0000-000000000007', 'La notification de ton téléphone', false, 3, NULL, 'C''est une distraction externe (technologique). Les internes viennent de tes propres pensées.'),
('e4070000-0000-0000-0000-000000000007', 'La chaleur dans la pièce', false, 4, NULL, 'C''est une distraction environnementale externe. Les internes sont dans ta tête.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e4080000-0000-0000-0000-000000000008', 'La faire d''un coup pour en finir vite', false, 1, NULL, 'Forcer une longue tâche en une fois épuise rapidement — et la qualité baisse vers la fin.'),
('e4080000-0000-0000-0000-000000000008', 'La couper en petits morceaux avec des mini-récompenses entre chaque', true, 2, 'Parfait ! Le cerveau répond aux récompenses immédiates. "Je fais ces 5 exercices, puis je bois quelque chose" — chaque mini-fin est une décharge de dopamine qui maintient l''élan.', NULL),
('e4080000-0000-0000-0000-000000000008', 'Attendre d''avoir la motivation pour commencer', false, 3, NULL, 'La motivation suit souvent l''action — pas l''inverse. Commencer (même petit) crée l''élan.'),
('e4080000-0000-0000-0000-000000000008', 'La déléguer à quelqu''un d''autre', false, 4, NULL, 'Pas toujours possible ! Mais la stratégie du fractionnement te permet de gérer même les tâches qu''on ne peut pas éviter.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E5 : Je comprends mes émotions
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E5') m,
(VALUES
  ('e5010000-0000-0000-0000-000000000001'::uuid, 'Les émotions servent à :', 1),
  ('e5020000-0000-0000-0000-000000000002'::uuid, 'Les neurodivergents ressentent souvent les émotions plus intensément. C''est parce que :', 2),
  ('e5030000-0000-0000-0000-000000000003'::uuid, 'Nommer une émotion (dire "je suis en colère") aide à :', 3),
  ('e5040000-0000-0000-0000-000000000004'::uuid, 'La différence entre "je suis triste" et "je suis déçu", c''est :', 4),
  ('e5050000-0000-0000-0000-000000000005'::uuid, 'Quand une émotion est trop forte, elle peut :', 5),
  ('e5060000-0000-0000-0000-000000000006'::uuid, 'Se sentir vide et sans émotion peut indiquer :', 6),
  ('e5070000-0000-0000-0000-000000000007'::uuid, 'La meilleure façon de gérer une émotion difficile est :', 7),
  ('e5080000-0000-0000-0000-000000000008'::uuid, 'Avoir un vocabulaire émotionnel riche (beaucoup de mots pour les émotions) permet de :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5010000-0000-0000-0000-000000000001', 'Gêner et compliquer la vie', false, 1, NULL, 'Non — les émotions sont utiles ! Ce sont des signaux, pas des ennemis.'),
('e5010000-0000-0000-0000-000000000001', 'T''informer sur ce qui se passe et te préparer à agir', true, 2, 'Exactement ! La peur te protège, la tristesse t''aide à guérir, la joie renforce les liens. Même les émotions difficiles ont un rôle.', NULL),
('e5010000-0000-0000-0000-000000000001', 'Montrer aux autres comment tu vas', false, 3, NULL, 'Les émotions ne sont pas que pour la communication externe — elles ont d''abord un rôle interne.'),
('e5010000-0000-0000-0000-000000000001', 'Être contrôlées et cachées pour être poli', false, 4, NULL, 'Contrôler l''expression de ses émotions est une compétence sociale utile — mais cacher TOUTES ses émotions est néfaste pour la santé.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5020000-0000-0000-0000-000000000002', 'Ils sont trop sensibles et trop dramatiques', false, 1, NULL, 'Ce n''est pas de la dramatisation — c''est une réalité neurologique. L''intensité émotionnelle neurodivergente est réelle et mesurable.'),
('e5020000-0000-0000-0000-000000000002', 'Leur système nerveux traite les informations différemment, avec moins de filtre', true, 2, 'Parfait ! Le système nerveux neurodivergent filtre moins les stimuli émotionnels — tout entre plus fort. Ce n''est pas une faiblesse, c''est une différence neurologique.', NULL),
('e5020000-0000-0000-0000-000000000002', 'Ils n''ont pas appris à contrôler leurs émotions', false, 3, NULL, 'Ce n''est pas une question d''apprentissage manqué — c''est neurologique. Apprendre des stratégies aide, mais ça ne "corrige" pas le câblage de base.'),
('e5020000-0000-0000-0000-000000000002', 'Ils vivent dans des familles plus émotionnelles', false, 4, NULL, 'L''environnement familial influence l''expression des émotions, mais l''intensité neurologique est innée.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5030000-0000-0000-0000-000000000003', 'Réduire l''intensité de l''émotion dans le cerveau', true, 1, 'Oui ! Des études en neurosciences (avec IRM) montrent que nommer une émotion active le cortex préfrontal et réduit l''activité de l''amygdale — le centre d''alarme. En d''autres termes : mettre des mots calme littéralement le cerveau.', NULL),
('e5030000-0000-0000-0000-000000000003', 'Faire disparaître l''émotion immédiatement', false, 2, NULL, 'Les émotions ne disparaissent pas sur commande, mais nommer aide à les gérer plus facilement.'),
('e5030000-0000-0000-0000-000000000003', 'Montrer aux autres qu''on est faible', false, 3, NULL, 'Exprimer ses émotions est un signe de conscience de soi et de maturité — pas de faiblesse.'),
('e5030000-0000-0000-0000-000000000003', 'Ça ne change rien — c''est juste des mots', false, 4, NULL, 'Les mots changent l''activité du cerveau — c''est documenté scientifiquement. Les mots ont un pouvoir réel sur notre physiologie.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5040000-0000-0000-0000-000000000004', 'Rien — c''est la même émotion', false, 1, NULL, 'Ce ne sont pas les mêmes ! Plus on différencie les émotions, mieux on peut les gérer.'),
('e5040000-0000-0000-0000-000000000004', 'Que le mot précis décrit mieux la situation et guide mieux l''action à prendre', true, 2, 'Exactement ! La tristesse appelle le réconfort. La déception appelle la réflexion sur les attentes. Plus tu es précis, plus tu sais quoi faire avec ce que tu ressens.', NULL),
('e5040000-0000-0000-0000-000000000004', 'Que "déçu" est toujours plus grave que "triste"', false, 3, NULL, 'Pas forcément — les intensités varient selon les personnes et les situations.'),
('e5040000-0000-0000-0000-000000000004', 'Que les grands utilisent "déçu" et les petits "triste"', false, 4, NULL, 'Le vocabulaire émotionnel s''apprend avec l''âge, mais les deux mots sont utilisables par tous.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5050000-0000-0000-0000-000000000005', 'Bloquer la capacité à réfléchir clairement', true, 1, 'Oui ! Quand l''amygdale est en feu (émotion intense), le cortex préfrontal se met "hors ligne". Tu peux littéralement ne plus être capable de raisonner normalement. C''est le "flooding" émotionnel.', NULL),
('e5050000-0000-0000-0000-000000000005', 'Ne jamais être trop forte', false, 2, NULL, 'Si ! Une émotion peut dépasser la capacité de régulation et créer un débordement (flooding). C''est normal et ça arrive à tout le monde.'),
('e5050000-0000-0000-0000-000000000005', 'Toujours te rendre meilleur dans ce que tu fais', false, 3, NULL, 'Une émotion positive et légère peut booster les performances, mais les émotions très intenses (stress, colère) nuisent généralement aux performances cognitives.'),
('e5050000-0000-0000-0000-000000000005', 'Disparaître d''elle-même en l''ignorant', false, 4, NULL, 'Ignorer une émotion très intense peut mener à un débordement — pas à une résolution.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5060000-0000-0000-0000-000000000006', 'Que tu n''as pas d''émotions', false, 1, NULL, 'Tout le monde a des émotions. Se sentir vide est lui-même une information émotionnelle.'),
('e5060000-0000-0000-0000-000000000006', 'Un état d''épuisement émotionnel ou de protection (shutdown)', true, 2, 'Exactement ! Le "shutdown" est une réponse de protection du système nerveux face à une surcharge trop longue. C''est un signal que quelque chose doit changer.', NULL),
('e5060000-0000-0000-0000-000000000006', 'Que tu es en parfaite harmonie avec toi-même', false, 3, NULL, 'Le vide émotionnel n''est généralement pas de la sérénité — c''est souvent de l''épuisement ou de la déconnexion.'),
('e5060000-0000-0000-0000-000000000006', 'Que tu fais semblant', false, 4, NULL, 'Le shutdown est involontaire — personne ne choisit de se sentir vide.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5070000-0000-0000-0000-000000000007', 'L''ignorer et penser à autre chose', false, 1, NULL, 'L''évitement temporaire peut aider à ne pas s''emballer, mais ignorer durablement accumule les tensions.'),
('e5070000-0000-0000-0000-000000000007', 'La reconnaître, la nommer, et choisir une stratégie de régulation adaptée', true, 2, 'Parfait ! Reconnaître → Nommer → Réguler. Ce cycle en 3 étapes est la base de la gestion émotionnelle. La stratégie dépend de l''émotion et de l''intensité.', NULL),
('e5070000-0000-0000-0000-000000000007', 'La laisser s''exprimer sans aucune limite', false, 3, NULL, 'Exprimer est sain — mais sans régulation, ça peut nuire aux relations et à soi-même.'),
('e5070000-0000-0000-0000-000000000007', 'Demander à quelqu''un de la gérer à ta place', false, 4, NULL, 'Les adultes peuvent aider, mais développer ta propre capacité de régulation est l''objectif à long terme.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e5080000-0000-0000-0000-000000000008', 'D''impressionner les adultes avec de grands mots', false, 1, NULL, 'Le vocabulaire émotionnel est pour toi — pas pour impressionner. Il te donne des outils internes.'),
('e5080000-0000-0000-0000-000000000008', 'De mieux identifier, communiquer et gérer ce que tu ressens', true, 2, 'Exactement ! Les chercheurs appellent ça la "granularité émotionnelle". Plus tu as de mots précis, plus tu as d''outils pour agir. C''est comme avoir plus de couleurs dans ta boîte de peinture.', NULL),
('e5080000-0000-0000-0000-000000000008', 'De ne plus jamais être en colère', false, 3, NULL, 'Le vocabulaire ne supprime pas les émotions — il aide à les naviguer.'),
('e5080000-0000-0000-0000-000000000008', 'De parler de ses émotions à tout le monde', false, 4, NULL, 'C''est un choix personnel. Le vocabulaire t''aide d''abord à comprendre toi-même — partager est une décision séparée.');

-- ═══════════════════════════════════════════════════════════════════════
-- SELF-EVAL items — Séries 1 et 2
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E1') m,
(VALUES
  ('Je comprends ce que veut dire "neurodivergent"', 1.0, 1),
  ('Je sais nommer au moins une de mes difficultés liée à mon profil', 1.0, 2),
  ('Je vois au moins une force dans la façon dont mon cerveau fonctionne', 1.5, 3),
  ('Je sais que la dyslexie ou le TDAH ne m''empêchent pas de réussir', 1.0, 4),
  ('Je comprends ce qu''est la plasticité cérébrale', 0.5, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E2') m,
(VALUES
  ('Je peux nommer au moins 2 de mes forces personnelles', 1.5, 1),
  ('Je sais repérer les activités qui me donnent de l''énergie', 1.0, 2),
  ('Je comprends ce qu''est l''hyperfocus et si je le vis', 1.0, 3),
  ('Je me vois comme quelqu''un qui a des forces (pas seulement des difficultés)', 1.5, 4),
  ('J''utilise au moins une force pour m''aider à apprendre', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E3') m,
(VALUES
  ('Je reconnais au moins 2 signaux dans mon corps quand je suis en surcharge', 1.5, 1),
  ('Je sais ce qu''est ma fenêtre de tolérance', 1.0, 2),
  ('Je peux dire si je suis dans ou hors de ma fenêtre de tolérance maintenant', 1.5, 3),
  ('Je connais au moins 1 chose qui m''aide à revenir dans ma fenêtre', 1.0, 4),
  ('J''ai commencé à noter mes signaux corporels dans un journal ou sur une fiche', 0.5, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E4') m,
(VALUES
  ('Je connais mon profil attentionnel (ce qui m''aide à me concentrer)', 1.5, 1),
  ('J''ai essayé au moins une stratégie de focus que j''ai trouvée utile', 1.5, 2),
  ('Je sais la différence entre distractions internes et externes', 1.0, 3),
  ('Je peux re-focus après une distraction sans me critiquer', 1.0, 4),
  ('Je fais des pauses régulières quand je travaille', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E5') m,
(VALUES
  ('Je peux nommer au moins 5 émotions différentes avec des nuances', 1.0, 1),
  ('Je comprends pourquoi je ressens les émotions plus fort que certains', 1.0, 2),
  ('Je sais que nommer mes émotions aide à les calmer', 1.5, 3),
  ('J''arrive à reconnaître mes émotions dans le moment où je les vis', 1.5, 4),
  ('Je ne me juge pas quand j''ai des émotions difficiles', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- ACTIVITIES — Séries 1 et 2
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'ma-carte-cerveau', 'Ma carte cerveau',
  'Crée ta propre carte visuelle de comment ton cerveau fonctionne',
  '[
    {"numero": 1, "titre": "Mon profil en mots", "duree_min": 5, "instruction": "Écris ou dessine ton profil : TDAH ? DYS ? Les deux ? Écris comment tu l''as découvert et comment tu te sens par rapport à ça.", "exemples": ["J''ai su que j''avais un TDAH quand j''avais 8 ans", "Parfois ça me frustre, parfois je trouve ça cool"]},
    {"numero": 2, "titre": "Mon cerveau en dessin", "duree_min": 5, "instruction": "Dessine un cerveau et écris dedans : d''un côté tes difficultés, de l''autre tes forces. Utilise des couleurs différentes.", "exemples": ["Rouge = lire lentement", "Bleu = voir les détails que les autres ratent"]},
    {"numero": 3, "titre": "Mon personnes inspirantes", "duree_min": 3, "instruction": "Cherche 1 personne célèbre ou réelle qui a le même profil que toi et qui fait quelque chose de cool. Écris ce qu''ils ont accompli.", "exemples": ["Simone Biles (TDAH) — gymnaste la plus titrée de l''histoire", "Albert Einstein (probablement DYS)"]},
    {"numero": 4, "titre": "Ma phrase de force", "duree_min": 2, "instruction": "Invente une phrase courte sur toi qui parle de ta façon unique de voir le monde. Commence par ''Mon cerveau...''. Colle-la quelque part que tu verras souvent.", "exemples": ["Mon cerveau fait des connexions que personne d''autre ne voit", "Mon cerveau pense en grand et en images"]}
  ]'::jsonb,
  'Comment tu te sens en regardant ta carte cerveau ? Qu''est-ce que tu as découvert sur toi-même que tu ne savais pas avant ?',
  15, 20, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E1') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'chasse-aux-super-pouvoirs', 'Chasse aux super-pouvoirs',
  'Une enquête sur toi-même pour découvrir tes vraies forces',
  '[
    {"numero": 1, "titre": "L''enquête énergie", "duree_min": 5, "instruction": "Pense aux 3 dernières semaines. Note 3 moments où le temps a passé très vite parce que tu étais trop absorbé dans ce que tu faisais. Ces moments montrent tes forces naturelles !", "exemples": ["J''ai passé 2h à construire un truc en LEGO sans m''en rendre compte", "J''ai lu ce livre de science jusqu''à minuit"]},
    {"numero": 2, "titre": "Les retours positifs", "duree_min": 4, "instruction": "Qu''est-ce que les adultes (famille, profs) te disent souvent que tu fais bien ? Qu''est-ce que tes amis te demandent d''aide pour faire ? Liste tout.", "exemples": ["On me demande toujours d''expliquer les jeux", "Ma prof dit que j''explique bien les choses"]},
    {"numero": 3, "titre": "Mon profil de forces", "duree_min": 4, "instruction": "Classe tes forces en catégories : Créative, Sociale, Logique, Physique, Artistique, Technique... Quel profil se dessine ?", "exemples": ["Je suis surtout Créatif + Logique", "Je suis fort en Social + Artistique"]},
    {"numero": 4, "titre": "Mon plan d''utilisation", "duree_min": 3, "instruction": "Choisis ta force principale. Comment pourrais-tu l''utiliser pour rendre un apprentissage difficile plus facile cette semaine ?", "exemples": ["Je suis fort en dessin → je vais faire un schéma pour apprendre mes conjugaisons"]}
  ]'::jsonb,
  'Quelle est la force qui t''a le plus surpris de découvrir ? Comment tu te sens à l''idée de l''utiliser pour apprendre ?',
  16, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E2') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'ma-meteo-interieure', 'Ma météo intérieure',
  'Crée ton système personnel de détection des signaux corporels',
  '[
    {"numero": 1, "titre": "Le scan corporel", "duree_min": 5, "instruction": "Ferme les yeux 30 secondes. Scan ton corps de la tête aux pieds : est-ce que tes épaules sont montées ? Tu as mal au ventre ? Ta mâchoire est serrée ? Note tout ce que tu ressens maintenant.", "exemples": ["Épaules tendues → je suis stressé", "Ventre vide et calme → je suis OK"]},
    {"numero": 2, "titre": "Ma carte des signaux", "duree_min": 5, "instruction": "Dessine un bonhomme. Sur chaque partie du corps, note le signal que TU ressens quand tu es : (1) en surcharge, (2) fatigué, (3) dans ta fenêtre de tolérance (bien).", "exemples": ["Tête = mal de crâne en surcharge", "Ventre = papillons = anxiété"]},
    {"numero": 3, "titre": "Mon thermomètre émotionnel", "duree_min": 4, "instruction": "Crée ton thermomètre personnel de 1 à 10. Décris comment tu te sens à chaque niveau. 1 = épuisé total, 5 = dans ta fenêtre, 10 = surcharge maximale.", "exemples": ["Niveau 3 = je fonctionne mais je suis fatigué", "Niveau 8 = je peux plus, je veux partir"]},
    {"numero": 4, "titre": "Mon plan d''action", "duree_min": 3, "instruction": "À quel niveau vas-tu agir pour te réguler ? Qu''est-ce que tu fais quand tu es à ce niveau ?", "exemples": ["Quand je suis à 7, je demande à partir aux toilettes pour respirer", "Quand je suis à 6, je bois de l''eau et bouge les pieds"]}
  ]'::jsonb,
  'Quel est le signal corporel le plus utile que tu as découvert aujourd''hui ? Est-ce que tu avais déjà remarqué ce signal avant sans savoir ce qu''il voulait dire ?',
  17, 23, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E3') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'mon-kit-focus', 'Mon kit focus personnel',
  'Construis ta trousse d''outils pour te concentrer',
  '[
    {"numero": 1, "titre": "Mon profil attentionnel", "duree_min": 4, "instruction": "Réponds à ces questions honnêtement : Je me concentre mieux (matin/soir) ? J''ai besoin de (silence/fond sonore) ? Je préfère travailler (assis/en bougeant) ? Je dois faire (beaucoup de petites pauses/peu de longues) ?", "exemples": ["Moi : matin + fond sonore + assis + beaucoup de petites pauses"]},
    {"numero": 2, "titre": "Mon environnement idéal", "duree_min": 4, "instruction": "Décris ou dessine ton espace de concentration idéal. Où es-tu ? Qu''est-ce qu''il y a autour de toi ? Qu''est-ce qu''il n''y a PAS ?", "exemples": ["Bureau avec lampe, casque, plante, PAS de téléphone visible", "Table de la cuisine avec fond sonore de café"]},
    {"numero": 3, "titre": "Mes stratégies anti-distraction", "duree_min": 4, "instruction": "Liste 3 distractions fréquentes pour toi (internes et externes). Pour chacune, trouve une stratégie concrète.", "exemples": ["Distraction : téléphone → Stratégie : dans un autre pièce", "Distraction : idées qui surgissent → Stratégie : carnet à côté pour noter et revenir"]},
    {"numero": 4, "titre": "Mon planning de focus", "duree_min": 4, "instruction": "Crée ton planning de travail pour demain en utilisant tes découvertes. Quand ? Combien de temps ? Quelles pauses ?", "exemples": ["17h-17h25 (Pomodoro 1) → pause 5min → 17h30-17h55 (Pomodoro 2)"]}
  ]'::jsonb,
  'Quelle est la stratégie de focus que tu vas vraiment essayer demain ? Pourquoi tu penses qu''elle va marcher pour toi ?',
  16, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E4') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'mon-dictionnaire-emotions', 'Mon dictionnaire d''émotions',
  'Construis ton vocabulaire émotionnel personnel',
  '[
    {"numero": 1, "titre": "La roue de base", "duree_min": 4, "instruction": "Écris les 6 émotions de base : Joie, Tristesse, Colère, Peur, Dégoût, Surprise. Pour chacune, note : comment tu la reconnais dans ton corps, et dans quelle situation tu la ressens.", "exemples": ["Colère : gorge serrée, chaleur dans les joues → quand quelqu''un est injuste avec moi"]},
    {"numero": 2, "titre": "Les nuances", "duree_min": 5, "instruction": "Prends la Joie et la Colère. Trouve 3 mots différents pour chacune, du plus doux au plus intense. Exemple pour la colère : agacé → irrité → furieux.", "exemples": ["Joie : content → heureux → extatique", "Peur : inquiet → anxieux → terrifié"]},
    {"numero": 3, "titre": "Mes émotions à moi", "duree_min": 4, "instruction": "Quelles sont les 3 émotions que tu ressens le plus souvent ? Pour chacune : Qu''est-ce qui la déclenche généralement ? Qu''est-ce qui t''aide à la gérer ?", "exemples": ["Frustration → quand je n''arrive pas du premier coup → me lever et bouger 1 min"]},
    {"numero": 4, "titre": "Mon code secret", "duree_min": 3, "instruction": "Crée une façon discrète de signaler ton état émotionnel à un adulte de confiance. Un mot, un geste, une couleur. Propose-lui et testez-le.", "exemples": ["Je dis ''niveau 3'' et ça veut dire que j''ai besoin d''une pause", "Je montre le pouce vers le bas = j''ai besoin d''aide"]}
  ]'::jsonb,
  'Quelle émotion as-tu découverte ou mieux comprise aujourd''hui ? Comment ça t''aide de savoir la nommer ?',
  16, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E5') m
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- MINI-JEUX — Série 1 : Mon cerveau et moi
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-cerveau', 'Vrai ou Mythe ? — Les idées reçues sur le cerveau', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e1mg1", "affirmation": "La dyslexie, c''est voir les lettres à l''envers.", "reponse": "MYTHE", "explication": "La dyslexie affecte le traitement du langage dans le cerveau — pas la vision. Les lettres ne sont pas vraiment retournées."},
      {"id": "e1mg2", "affirmation": "Les cerveaux TDAH peuvent se concentrer pendant des heures sur quelque chose de passionnant.", "reponse": "VRAI", "explication": "L''hyperfocus ! Le TDAH n''est pas l''absence totale d''attention — c''est un contrôle atypique de l''attention."},
      {"id": "e1mg3", "affirmation": "Manger trop de sucre provoque le TDAH.", "reponse": "MYTHE", "explication": "Le TDAH est neurologique et génétique. Le sucre n''en est pas la cause — c''est une idée reçue populaire non validée."},
      {"id": "e1mg4", "affirmation": "Le cerveau continue à se modifier et à apprendre tout au long de la vie.", "reponse": "VRAI", "explication": "C''est la plasticité cérébrale ! Le cerveau crée de nouvelles connexions quand on apprend, à tout âge."},
      {"id": "e1mg5", "affirmation": "On n''utilise que 10% de notre cerveau.", "reponse": "MYTHE", "explication": "Faux ! On utilise la totalité de notre cerveau — différentes zones selon ce qu''on fait."},
      {"id": "e1mg6", "affirmation": "Les neurodivergents peuvent avoir des forces exceptionnelles dans certains domaines.", "reponse": "VRAI", "explication": "Oui ! Le profil cognitif en dents de scie inclut souvent des zones de génie aux côtés des zones de défi."},
      {"id": "e1mg7", "affirmation": "Le masking (se cacher) ne coûte pas vraiment d''énergie.", "reponse": "MYTHE", "explication": "Le masking est épuisant ! S''adapter constamment à un environnement pas conçu pour soi est une source majeure de fatigue."},
      {"id": "e1mg8", "affirmation": "Des personnes dyslexiques ont inventé des avions, fondé des entreprises et reçu des prix Nobel.", "reponse": "VRAI", "explication": "Oui ! Richard Branson (Virgin), les frères Wright, et beaucoup d''autres entrepreneurs et innovateurs sont dyslexiques."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E1') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-forces', 'Vrai ou Mythe ? — Les forces neurodivergentes', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e2mg1", "affirmation": "Les bonnes notes à l''école sont le meilleur indicateur de tes forces.", "reponse": "MYTHE", "explication": "Les notes mesurent certains apprentissages académiques — pas l''empathie, la créativité, la visualisation, ou le leadership."},
      {"id": "e2mg2", "affirmation": "L''hyperfocus peut être un avantage dans les métiers créatifs ou techniques.", "reponse": "VRAI", "explication": "Oui ! Des programmeurs, artistes, et scientifiques TDAH utilisent l''hyperfocus comme avantage compétitif."},
      {"id": "e2mg3", "affirmation": "Si quelque chose est difficile, c''est que tu n''as pas de force dans ce domaine.", "reponse": "MYTHE", "explication": "Une force peut demander des efforts ! Ce qui compte c''est que ça t''énergise, pas que ça soit facile."},
      {"id": "e2mg4", "affirmation": "La pensée en images est utilisée par de nombreux architectes et ingénieurs.", "reponse": "VRAI", "explication": "Oui ! Visualiser dans l''espace est une compétence précieuse en conception, en science, et en création."},
      {"id": "e2mg5", "affirmation": "Poser beaucoup de questions ''pourquoi'' est un signe de manque de respect.", "reponse": "MYTHE", "explication": "Pas du tout ! C''est une marque de pensée critique et de curiosité — des qualités que les chercheurs et innovateurs ont en commun."},
      {"id": "e2mg6", "affirmation": "Les personnes qui voient le ''big picture'' (tableau d''ensemble) sont souvent de bons leaders.", "reponse": "VRAI", "explication": "Oui ! Comprendre les systèmes et connexions est une compétence clé en management et en stratégie."},
      {"id": "e2mg7", "affirmation": "Utiliser ses forces pour apprendre, c''est tricher.", "reponse": "MYTHE", "explication": "Non ! C''est de la pédagogie intelligente. Apprendre par ses forces est plus efficace et plus durable."},
      {"id": "e2mg8", "affirmation": "L''empathie forte, fréquente chez certains neurodivergents, est utile dans beaucoup de métiers.", "reponse": "VRAI", "explication": "Oui ! Médecins, thérapeutes, enseignants, travailleurs sociaux — l''empathie forte est un atout professionnel majeur."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E2') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-signaux', 'Vrai ou Mythe ? — Les signaux du corps', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e3mg1", "affirmation": "Le corps envoie des signaux de surcharge AVANT que le cerveau s''en rende compte.", "reponse": "VRAI", "explication": "Oui ! Les signaux physiques (gorge serrée, épaules montées) précèdent souvent la prise de conscience mentale."},
      {"id": "e3mg2", "affirmation": "Si tu ignores la surcharge, elle disparaît toute seule.", "reponse": "MYTHE", "explication": "Non — ignorer accumule. La surcharge ignorée mène souvent à une explosion ou un shutdown plus fort."},
      {"id": "e3mg3", "affirmation": "L''intéroception (sentir ce qui se passe à l''intérieur de toi) est une compétence qui s''apprend.", "reponse": "VRAI", "explication": "Oui ! Comme la lecture ou le sport, l''intéroception s''entraîne. Des exercices de scan corporel réguliers l''améliorent."},
      {"id": "e3mg4", "affirmation": "Se sentir très fatigué après l''école est un signe de paresse.", "reponse": "MYTHE", "explication": "Non ! C''est souvent de l''épuisement neurologique réel lié au masking et à l''adaptation constante."},
      {"id": "e3mg5", "affirmation": "Dans la fenêtre de tolérance, tu peux apprendre et résoudre des problèmes efficacement.", "reponse": "VRAI", "explication": "Exactement ! La fenêtre de tolérance est la zone optimale pour l''apprentissage."},
      {"id": "e3mg6", "affirmation": "Tout le monde ressent la surcharge de la même façon.", "reponse": "MYTHE", "explication": "Non ! Les signaux sont très personnels. Pour certains c''est le ventre, pour d''autres les oreilles bourdonnent, etc."},
      {"id": "e3mg7", "affirmation": "Une micro-pause de 3 minutes peut aider à revenir dans sa fenêtre de tolérance.", "reponse": "VRAI", "explication": "Oui ! Même une courte pause avec respiration ou mouvement peut réinitialiser le système nerveux."},
      {"id": "e3mg8", "affirmation": "Les neurodivergents ont forcément moins de signaux corporels que les autres.", "reponse": "MYTHE", "explication": "Souvent c''est l''inverse — ils peuvent avoir plus de sensations, mais du mal à les identifier et nommer précisément."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E3') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-attention', 'Vrai ou Mythe ? — L''attention et la concentration', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e4mg1", "affirmation": "L''attention est un muscle qu''on peut entraîner.", "reponse": "VRAI", "explication": "Oui ! Comme un muscle, l''attention se renforce avec la pratique et se fatigue sans repos."},
      {"id": "e4mg2", "affirmation": "Il faut travailler 2 heures d''affilée pour vraiment bien apprendre.", "reponse": "MYTHE", "explication": "Non ! Des sessions plus courtes avec pauses sont plus efficaces. Le cerveau consolide pendant les pauses."},
      {"id": "e4mg3", "affirmation": "L''environnement idéal de concentration est le même pour tout le monde.", "reponse": "MYTHE", "explication": "Non ! Chaque cerveau est différent. Certains ont besoin de silence, d''autres d''un fond sonore. Expérimente !"},
      {"id": "e4mg4", "affirmation": "Se distraire facilement peut indiquer que le cerveau cherche de la stimulation.", "reponse": "VRAI", "explication": "Exactement ! Le cerveau est câblé pour chercher la nouveauté. Ce n''est pas un défaut — c''est de la neurologie."},
      {"id": "e4mg5", "affirmation": "Les pauses pendant le travail améliorent la mémorisation.", "reponse": "VRAI", "explication": "Oui ! Pendant les pauses, le cerveau consolide les informations apprises. Travailler sans pause = retenir moins."},
      {"id": "e4mg6", "affirmation": "Se forcer à se concentrer par la seule volonté est la meilleure stratégie.", "reponse": "MYTHE", "explication": "La volonté seule est limitée. L''environnement, les stratégies, et les habitudes sont beaucoup plus puissants."},
      {"id": "e4mg7", "affirmation": "Noter une idée qui surgit pendant le travail aide à s''en débarrasser et à re-focus.", "reponse": "VRAI", "explication": "Oui ! Le cerveau continue de ressasser ce qui n''est pas traité. Écrire l''idée lui permet de ''lâcher prise''."},
      {"id": "e4mg8", "affirmation": "La technique Pomodoro n''est utile que pour les adultes.", "reponse": "MYTHE", "explication": "Pas du tout ! Les blocs de travail structurés fonctionnent très bien pour les enfants — souvent avec des blocs un peu plus courts (15-20 min)."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E4') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-emotions', 'Vrai ou Mythe ? — Les émotions et le cerveau', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e5mg1", "affirmation": "Nommer une émotion réduit son intensité dans le cerveau.", "reponse": "VRAI", "explication": "Oui ! Des études avec IRM montrent que mettre des mots sur une émotion active le cortex préfrontal et calme l''amygdale."},
      {"id": "e5mg2", "affirmation": "Les émotions difficiles (colère, peur) ne servent à rien.", "reponse": "MYTHE", "explication": "Toutes les émotions ont un rôle ! La peur protège, la colère signale l''injustice, la tristesse aide à traiter les pertes."},
      {"id": "e5mg3", "affirmation": "Les neurodivergents ressentent souvent les émotions plus intensément.", "reponse": "VRAI", "explication": "Oui ! Le système nerveux neurodivergent filtre moins les stimuli émotionnels — tout entre plus fort."},
      {"id": "e5mg4", "affirmation": "Cacher toutes ses émotions est la meilleure stratégie pour gérer sa vie.", "reponse": "MYTHE", "explication": "Non ! Réprimer les émotions nuit à la santé physique et mentale. Les exprimer de façon adaptée est l''objectif."},
      {"id": "e5mg5", "affirmation": "Avoir beaucoup de mots pour décrire ses émotions aide à mieux les gérer.", "reponse": "VRAI", "explication": "Oui ! La granularité émotionnelle — avoir plein de mots précis — est liée à une meilleure régulation émotionnelle."},
      {"id": "e5mg6", "affirmation": "Une émotion très intense peut bloquer la capacité à réfléchir.", "reponse": "VRAI", "explication": "Exactement ! Le flooding émotionnel met le cortex préfrontal ''hors ligne'' — on ne peut plus raisonner normalement."},
      {"id": "e5mg7", "affirmation": "Se sentir vide émotionnellement est un signe de santé parfaite.", "reponse": "MYTHE", "explication": "Pas forcément — le vide peut indiquer un shutdown (épuisement). La sérénité et le vide ne sont pas la même chose."},
      {"id": "e5mg8", "affirmation": "Un vocabulaire émotionnel riche s''apprend et se développe avec la pratique.", "reponse": "VRAI", "explication": "Oui ! Plus tu pratiques à nommer tes émotions, plus ton vocabulaire s''enrichit — et plus tu peux les gérer."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E5') m
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E6 : Calmer la tempête
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E6') m,
(VALUES
  ('e6010000-0000-0000-0000-000000000001'::uuid, 'La respiration lente (4 secondes in, 6 secondes out) aide à se calmer parce que :', 1),
  ('e6020000-0000-0000-0000-000000000002'::uuid, 'Le mouvement (bouger, sauter, marcher) aide à réguler les émotions parce que :', 2),
  ('e6030000-0000-0000-0000-000000000003'::uuid, 'Quand tu es en plein "flooding" émotionnel (débordé), la première étape est de :', 3),
  ('e6040000-0000-0000-0000-000000000004'::uuid, 'Un "plan de crise" personnel, c''est :', 4),
  ('e6050000-0000-0000-0000-000000000005'::uuid, 'La "méthode 5-4-3-2-1" (5 choses que tu vois, 4 que tu touches...) aide à :', 5),
  ('e6060000-0000-0000-0000-000000000006'::uuid, 'Demander une pause quand on se sent submergé, c''est :', 6),
  ('e6070000-0000-0000-0000-000000000007'::uuid, 'Après une crise émotionnelle, il est important de :', 7),
  ('e6080000-0000-0000-0000-000000000008'::uuid, 'Quelle est la différence entre "exprimer" et "décharger" une émotion ?', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6010000-0000-0000-0000-000000000001', 'Elle force le corps à s''endormir', false, 1, NULL, 'Non — la respiration lente active le système parasympathique (repos), mais ne provoque pas le sommeil.'),
('e6010000-0000-0000-0000-000000000001', 'Elle active le système nerveux parasympathique qui calme le corps et le cerveau', true, 2, 'Exactement ! La respiration lente envoie un signal de sécurité au cerveau. L''expiration longue est particulièrement puissante pour activer le frein naturel du corps.', NULL),
('e6010000-0000-0000-0000-000000000001', 'Elle distrait le cerveau de l''émotion', false, 3, NULL, 'La respiration lente ne distrait pas — elle change l''état physiologique réel du corps.'),
('e6010000-0000-0000-0000-000000000001', 'Elle n''a pas d''effet prouvé — c''est juste une habitude', false, 4, NULL, 'Si ! La respiration cohérente est validée par de nombreuses études sur la régulation du système nerveux autonome.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6020000-0000-0000-0000-000000000002', 'Ça épuise le corps et l''émotion s''en va par fatigue', false, 1, NULL, 'Non — le mouvement n''agit pas par épuisement mais par neurochimie.'),
('e6020000-0000-0000-0000-000000000002', 'Le mouvement libère des endorphines et aide à "métaboliser" les hormones de stress', true, 2, 'Parfait ! Le cortisol et l''adrénaline sont des hormones de stress — le mouvement les métabolise physiquement. C''est pour ça que bouger après une émotion forte aide vraiment.', NULL),
('e6020000-0000-0000-0000-000000000002', 'Ça montre aux autres qu''on n''est pas en colère', false, 3, NULL, 'L''effet du mouvement est interne et neurochimique — pas une démonstration sociale.'),
('e6020000-0000-0000-0000-000000000002', 'Ça change les idées en pensant à autre chose', false, 4, NULL, 'C''est un effet secondaire possible, mais l''effet principal est chimique et corporel.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6030000-0000-0000-0000-000000000003', 'Expliquer calmement pourquoi tu es en colère', false, 1, NULL, 'Quand tu es en flooding, le cortex préfrontal est hors ligne — impossible d''expliquer calmement. D''abord calmer le corps.'),
('e6030000-0000-0000-0000-000000000003', 'Calmer le corps en utilisant une stratégie physique (respiration, mouvement, eau froide)', true, 2, 'Exactement ! En état de flooding, le cerveau pensant est déconnecté. Les stratégies corporelles court-circuitent la spirale émotionnelle et permettent de revenir à un état où on peut réfléchir.', NULL),
('e6030000-0000-0000-0000-000000000003', 'Demander à quelqu''un de résoudre le problème à ta place', false, 3, NULL, 'Le soutien peut aider, mais en état de crise, la priorité est de réguler le système nerveux — pas de résoudre.'),
('e6030000-0000-0000-0000-000000000003', 'Ignorer l''émotion et continuer ce qu''on faisait', false, 4, NULL, 'En état de flooding, continuer est souvent impossible et contreproductif — ça aggrave généralement la situation.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6040000-0000-0000-0000-000000000004', 'Un accord avec ses parents sur les punitions en cas de crise', false, 1, NULL, 'Non — un plan de crise est un outil de régulation autonome, pas une liste de punitions.'),
('e6040000-0000-0000-0000-000000000004', 'Une liste préparée à l''avance des stratégies qui marchent pour toi en cas de grande émotion', true, 2, 'Parfait ! Préparer le plan quand tu vas bien (pas en crise) est essentiel. En crise, tu ne peux plus réfléchir clairement — le plan te guide automatiquement.', NULL),
('e6040000-0000-0000-0000-000000000004', 'Un planning de la semaine pour éviter les situations stressantes', false, 3, NULL, 'Anticiper aide, mais le plan de crise s''active pendant la crise — pas avant.'),
('e6040000-0000-0000-0000-000000000004', 'Quelque chose que l''adulte te donne pendant la crise', false, 4, NULL, 'Le plan de crise est le tien — l''adulte peut t''aider à le créer, mais c''est toi qui l''appliques.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6050000-0000-0000-0000-000000000005', 'Ramener l''attention dans le moment présent pour sortir de la spirale mentale', true, 1, 'Exactement ! Cette technique d''ancrage (grounding) utilise les 5 sens pour ramener le cerveau ici et maintenant — coupant la rumination et la spirale d''anxiété ou de colère.', NULL),
('e6050000-0000-0000-0000-000000000005', 'Entraîner les 5 sens à être plus performants', false, 2, NULL, 'Ce n''est pas un entraînement sensoriel — c''est une technique de grounding émotionnel.'),
('e6050000-0000-0000-0000-000000000005', 'Trouver 5 solutions à un problème rapidement', false, 3, NULL, 'Non — les chiffres font référence aux sens (vue, toucher, ouïe, odorat, goût), pas à des solutions.'),
('e6050000-0000-0000-0000-000000000005', 'Distraire complètement le cerveau de l''émotion', false, 4, NULL, 'Le grounding n''est pas une distraction — c''est une régulation par ancrage dans le présent.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6060000-0000-0000-0000-000000000006', 'Une façon d''éviter ses responsabilités', false, 1, NULL, 'Non — une pause pour réguler n''est pas de l''évitement. C''est de l''intelligence émotionnelle.'),
('e6060000-0000-0000-0000-000000000006', 'Une compétence de régulation autonome qui permet de revenir mieux ensuite', true, 2, 'Exactement ! Reconnaître qu''on a besoin d''une pause et la demander est une forme de maturité émotionnelle. Revenir régulé est bien plus productif que rester en crise.', NULL),
('e6060000-0000-0000-0000-000000000006', 'Un signe qu''on ne peut pas gérer ses émotions', false, 3, NULL, 'Au contraire — demander une pause montre qu''on connaît ses besoins et qu''on les gère proactivement.'),
('e6060000-0000-0000-0000-000000000006', 'Quelque chose qu''on ne devrait faire que si on crie', false, 4, NULL, 'La pause est plus efficace AVANT la crise — dès qu''on reconnaît les signaux précoces.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6070000-0000-0000-0000-000000000007', 'Oublier ce qui s''est passé et faire comme si rien n''était', false, 1, NULL, 'Faire semblant empêche d''apprendre et peut laisser de la honte ou de la confusion.'),
('e6070000-0000-0000-0000-000000000007', 'Récupérer, puis réfléchir à ce qui s''est passé sans se juger', true, 2, 'Parfait ! Après une crise, le cerveau a besoin de récupérer. Ensuite, réfléchir (pas se punir) sur ce qui a déclenché la crise aide à mieux la gérer la prochaine fois.', NULL),
('e6070000-0000-0000-0000-000000000007', 'Se punir pour s''en souvenir et ne plus recommencer', false, 3, NULL, 'La punition après une crise n''est pas un outil de régulation efficace — elle ajoute de la honte qui peut augmenter les futures crises.'),
('e6070000-0000-0000-0000-000000000007', 'Expliquer immédiatement à tout le monde ce qui s''est passé', false, 4, NULL, 'Partager peut aider, mais d''abord récupérer. Parler en état de post-crise (encore fragilisé) n''est pas optimal.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e6080000-0000-0000-0000-000000000008', 'C''est la même chose — les deux servent à se défouler', false, 1, NULL, 'Non — il y a une différence importante en termes d''impact neurologique et social.'),
('e6080000-0000-0000-0000-000000000008', 'Exprimer = communiquer l''émotion. Décharger = laisser l''émotion exploser sans contrôle', true, 2, 'Exactement ! Exprimer sa colère ("je suis vraiment en colère parce que...") est différent de décharger (crier, frapper). L''un construit la relation, l''autre peut la détruire.', NULL),
('e6080000-0000-0000-0000-000000000008', 'Exprimer est mal vu, décharger est acceptable', false, 3, NULL, 'C''est plutôt l''inverse. Exprimer de façon adaptée est une compétence sociale précieuse.'),
('e6080000-0000-0000-0000-000000000008', 'Décharger est toujours plus utile car c''est plus honnête', false, 4, NULL, 'La décharge peut soulager temporairement, mais ses effets sur les relations et l''image de soi sont souvent négatifs.');

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E7 : Apprivoiser mon anxiété
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E7') m,
(VALUES
  ('e7010000-0000-0000-0000-000000000001'::uuid, 'L''anxiété est d''abord :', 1),
  ('e7020000-0000-0000-0000-000000000002'::uuid, 'Éviter systématiquement ce qui angoisse a tendance à :', 2),
  ('e7030000-0000-0000-0000-000000000003'::uuid, 'Les neurodivergents ont souvent plus d''anxiété parce que :', 3),
  ('e7040000-0000-0000-0000-000000000004'::uuid, 'La "catastrophisation" (imaginer le pire), c''est :', 4),
  ('e7050000-0000-0000-0000-000000000005'::uuid, 'Une pensée anxieuse n''est pas forcément :', 5),
  ('e7060000-0000-0000-0000-000000000006'::uuid, 'L''exposition progressive à ce qu''on craint aide parce que :', 6),
  ('e7070000-0000-0000-0000-000000000007'::uuid, 'L''auto-compassion dans les moments d''anxiété signifie :', 7),
  ('e7080000-0000-0000-0000-000000000008'::uuid, 'Quand tu dois faire quelque chose qui t''angoisse, la meilleure approche est :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7010000-0000-0000-0000-000000000001', 'Un signe de faiblesse de caractère', false, 1, NULL, 'Pas du tout ! L''anxiété est neurologique et universelle — tout le monde en ressent.'),
('e7010000-0000-0000-0000-000000000001', 'Un mécanisme de protection du cerveau face à une menace perçue', true, 2, 'Exactement ! L''anxiété est le système d''alarme du cerveau. Il a l''inconvénient de parfois se déclencher pour des fausses alertes — mais son intention est de te protéger.', NULL),
('e7010000-0000-0000-0000-000000000001', 'Un problème mental grave qui nécessite toujours un médecin', false, 3, NULL, 'L''anxiété légère est normale. Une anxiété forte et persistante mérite un soutien professionnel — mais ce n''est pas grave automatiquement.'),
('e7010000-0000-0000-0000-000000000001', 'Un choix de certaines personnes de s''inquiéter', false, 4, NULL, 'L''anxiété n''est pas un choix — c''est une réponse neurologique souvent automatique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7020000-0000-0000-0000-000000000002', 'Réduire l''anxiété sur le long terme', false, 1, NULL, 'Non — l''évitement réduit l''anxiété à court terme mais l''augmente sur le long terme.'),
('e7020000-0000-0000-0000-000000000002', 'Renforcer et amplifier l''anxiété sur le long terme', true, 2, 'Exactement ! Chaque évitement dit au cerveau "c''était vraiment dangereux — bien fait d''avoir fui". Le cerveau devient de plus en plus sensible. L''exposition progressive est l''antidote.', NULL),
('e7020000-0000-0000-0000-000000000002', 'Ne rien changer — c''est neutre', false, 3, NULL, 'L''évitement n''est pas neutre — il entretient et renforce l''anxiété.'),
('e7020000-0000-0000-0000-000000000002', 'Aider à se concentrer sur d''autres choses', false, 4, NULL, 'Temporairement oui, mais le problème d''anxiété n''est pas résolu — il grandit.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7030000-0000-0000-0000-000000000003', 'Ils sont moins courageux que les autres', false, 1, NULL, 'Faux ! L''anxiété plus élevée chez les neurodivergents a des causes neurologiques — pas un manque de courage.'),
('e7030000-0000-0000-0000-000000000003', 'Leur cerveau traite plus d''informations et anticipe plus les imprévus, dans un monde pas conçu pour eux', true, 2, 'Parfait ! Être neurodivergent dans un monde neurotypique signifie naviguer dans des codes, espaces, et rythmes pas adaptés. Ça génère de l''anxiété chronique de fond — c''est logique.', NULL),
('e7030000-0000-0000-0000-000000000003', 'L''anxiété est contagieuse dans les familles neurodivergentes', false, 3, NULL, 'L''environnement familial influence, mais l''anxiété neurodivergente a d''abord des bases neurologiques.'),
('e7030000-0000-0000-0000-000000000003', 'Ils regardent trop les nouvelles et les films d''horreur', false, 4, NULL, 'Ce n''est pas la cause principale. L''anxiété neurodivergente est liée au fonctionnement neurologique, pas aux contenus consommés.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7040000-0000-0000-0000-000000000004', 'Un mode de pensée qui amplifie les risques et minimise les capacités à y faire face', true, 1, 'Exactement ! La catastrophisation est un piège cognitif courant dans l''anxiété. Identifier ces pensées et les questionner ("est-ce vraiment probable ?") aide à les désamorcer.', NULL),
('e7040000-0000-0000-0000-000000000004', 'Une capacité utile à prévoir tous les problèmes possibles', false, 2, NULL, 'Anticiper les risques peut être utile — mais la catastrophisation va au-delà : elle imagine le pire comme certain.'),
('e7040000-0000-0000-0000-000000000004', 'Toujours avoir raison dans ses prédictions négatives', false, 3, NULL, 'Les pensées catastrophistes sont rarement exactes — mais elles se sentent très réelles.'),
('e7040000-0000-0000-0000-000000000004', 'Ne concerner que les personnes adultes anxieuses', false, 4, NULL, 'La catastrophisation commence souvent dès l''enfance et peut être travaillée à tout âge.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7050000-0000-0000-0000-000000000005', 'Vraie — il faut vérifier si les dangers sont réels', false, 1, NULL, 'Parfois vérifier aide, mais souvent la vérification alimente l''anxiété.'),
('e7050000-0000-0000-0000-000000000005', 'Un fait — c''est une pensée, pas une réalité', true, 2, 'Excellent ! Une pensée ("je vais rater" "tout le monde va se moquer") n''est pas un fait. Apprendre à voir les pensées comme des hypothèses, pas des vérités, est une compétence centrale.', NULL),
('e7050000-0000-0000-0000-000000000005', 'Utile à partager avec tout le monde immédiatement', false, 3, NULL, 'Partager peut aider — mais la première étape est de comprendre que la pensée anxieuse n''est pas forcément vraie.'),
('e7050000-0000-0000-0000-000000000005', 'Quelque chose qui doit être éliminé à tout prix', false, 4, NULL, 'L''objectif n''est pas d''éliminer les pensées anxieuses — c''est d''apprendre à les voir avec du recul.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7060000-0000-0000-0000-000000000006', 'Elle prouve au cerveau que la situation était moins dangereuse qu''il pensait', true, 1, 'Parfait ! Chaque exposition réussie dit au cerveau "regarde, on a survécu et ce n''était pas si terrible". Le cerveau apprend et diminue graduellement l''alarme.', NULL),
('e7060000-0000-0000-0000-000000000006', 'Elle force le corps à s''habituer par fatigue', false, 2, NULL, 'L''exposition ne fonctionne pas par épuisement — elle fonctionne par apprentissage et recalibration du cerveau.'),
('e7060000-0000-0000-0000-000000000006', 'Elle montre aux autres qu''on est courageux', false, 3, NULL, 'L''exposition est pour soi — pas pour prouver quelque chose aux autres.'),
('e7060000-0000-0000-0000-000000000006', 'Elle fonctionne mieux si on saute directement au plus difficile', false, 4, NULL, 'La progression est essentielle — aller trop vite peut traumatiser plutôt qu''aider. Petits pas d''abord.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7070000-0000-0000-0000-000000000007', 'Faire semblant que tout va bien pour ne pas inquiéter les autres', false, 1, NULL, 'Ce n''est pas de l''auto-compassion — c''est du masking qui augmente la charge émotionnelle.'),
('e7070000-0000-0000-0000-000000000007', 'Se parler avec la gentillesse qu''on aurait envers un ami qui traverse la même chose', true, 2, 'Exactement ! Si un ami te disait "je suis trop nul", tu ne l''insultais pas — tu l''encouragerais. L''auto-compassion, c''est appliquer cette même gentillesse à toi-même.', NULL),
('e7070000-0000-0000-0000-000000000007', 'S''accorder tout ce qu''on veut pour se sentir mieux', false, 3, NULL, 'L''auto-compassion n''est pas tout se permettre — c''est être doux avec soi-même tout en prenant soin de ses vrais besoins.'),
('e7070000-0000-0000-0000-000000000007', 'Ignorer l''anxiété pour ne pas lui donner d''importance', false, 4, NULL, 'L''auto-compassion reconnaît l''anxiété sans la dramatiser — elle ne l''ignore pas.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e7080000-0000-0000-0000-000000000008', 'Attendre que l''envie vienne pour se sentir prêt', false, 1, NULL, 'Le courage n''est pas l''absence de peur — c''est agir malgré la peur. L''envie ne vient souvent qu''après avoir commencé.'),
('e7080000-0000-0000-0000-000000000008', 'Commencer par la toute première petite étape, même si elle est minuscule', true, 2, 'Parfait ! "La plus grande étape est la première" — mais si la première est trop grande, divise-la encore. Un email à écrire ? Commence par ouvrir la fenêtre de rédaction. L''action crée l''élan.', NULL),
('e7080000-0000-0000-0000-000000000008', 'Le faire d''un coup pour ne plus y penser', false, 3, NULL, 'Aller trop vite peut intensifier l''anxiété. L''exposition progressive est plus durable.'),
('e7080000-0000-0000-0000-000000000008', 'Demander à quelqu''un d''autre de le faire à ta place', false, 4, NULL, 'Déléguer perpétuellement renforce l''évitement. L''objectif est de développer ta propre capacité à faire face.');

-- Self-eval E6, E7
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E6') m,
(VALUES
  ('Je connais au moins 2 stratégies physiques pour me calmer quand je suis submergé', 1.5, 1),
  ('J''ai un plan de crise personnalisé que je peux utiliser', 1.5, 2),
  ('Je comprends la différence entre exprimer et décharger une émotion', 1.0, 3),
  ('Je sais demander une pause quand j''en ai besoin', 1.0, 4),
  ('Après une crise, je peux récupérer sans me juger trop dur', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E7') m,
(VALUES
  ('Je comprends pourquoi j''ai parfois de l''anxiété (c''est un mécanisme de protection)', 1.0, 1),
  ('Je reconnais quand une pensée anxieuse est une pensée — pas forcément la réalité', 1.5, 2),
  ('Je sais que l''évitement renforce l''anxiété et j''essaie de l''affronter progressivement', 1.5, 3),
  ('Je peux me parler avec gentillesse quand j''ai peur', 1.0, 4),
  ('J''ai identifié un déclencheur d''anxiété et une stratégie pour y faire face', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

-- Activities E6, E7
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'ma-boite-outils-calme', 'Ma boîte à outils calme',
  'Construis ta trousse personnelle de stratégies anti-tempête',
  '[
    {"numero": 1, "titre": "Test de respiration", "duree_min": 3, "instruction": "Essaie la respiration 4-6 : inspire 4 secondes, expire 6 secondes. Fais-le 4 fois. Comment tu te sens avant et après ?", "exemples": ["Avant : 6/10 tendu", "Après : 4/10 — ça aide vraiment"]},
    {"numero": 2, "titre": "Test de mouvement", "duree_min": 3, "instruction": "Quand tu te sens stressé, essaie : 10 sauts sur place, ou secouer les mains fort, ou marcher vite 2 minutes. Note lequel aide le plus.", "exemples": ["Sauts = aide beaucoup", "Secouer mains = peu efficace pour moi"]},
    {"numero": 3, "titre": "Test d''ancrage", "duree_min": 3, "instruction": "Essaie la méthode 5-4-3-2-1 : nomme 5 choses que tu vois, 4 que tu touches, 3 que tu entends, 2 que tu sens, 1 que tu goûtes. Comment ça va maintenant ?", "exemples": ["Je me sens plus ancré dans la pièce, moins dans ma tête"]},
    {"numero": 4, "titre": "Mon plan de crise", "duree_min": 6, "instruction": "Crée ta carte plan de crise : (1) Mon signal précoce de surcharge : ... (2) Ce que je fais en premier : ... (3) Ce que je fais si ça ne suffit pas : ... (4) La personne à qui je peux dire que j''ai besoin d''aide : ...", "exemples": ["Signal : ventre serré + envie de fuir", "Premier : respiration 4-6 × 4", "Ensuite : demander à sortir 5 min", "Personne : ma prof principale"]}
  ]'::jsonb,
  'Quelle stratégie a le mieux marché pour toi ? Tu penses que tu l''utiliseras vraiment en situation de crise ? Pourquoi ?',
  15, 20, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E6') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'apprivoiser-peur', 'Apprivoiser une peur',
  'Construis ton plan d''exposition progressive à quelque chose qui t''angoisse',
  '[
    {"numero": 1, "titre": "Identifier ma peur", "duree_min": 3, "instruction": "Pense à une situation qui te stresse régulièrement (pas la plus grave — une gérrable). Décris-la précisément : qu''est-ce qui se passe exactement ? Qu''est-ce que tu imagines de pire ?", "exemples": ["Lever la main en classe", "Aller manger seul à la cantine"]},
    {"numero": 2, "titre": "Tester ma pensée catastrophique", "duree_min": 4, "instruction": "Note ta pensée la plus négative sur cette situation. Maintenant : (1) Est-ce que c''est vraiment sûr que ça va arriver ? (2) Si ça arrivait, est-ce vraiment la catastrophe que j''imagine ? (3) Qu''est-ce que je me dirais si c''était mon meilleur ami ?", "exemples": ["Pensée : tout le monde va se moquer", "Réalité : peut-être 1-2 personnes, et encore..."]},
    {"numero": 3, "titre": "Mon escalier de peur", "duree_min": 5, "instruction": "Dessine un escalier de 5 marches. La marche 1 = ce qui est légèrement anxiogène (5/10 de peur). La marche 5 = la situation que tu évites. Remplis les marches intermédiaires.", "exemples": ["Marche 1 : penser à lever la main", "Marche 2 : dire quelque chose en petit groupe", "Marche 5 : répondre devant toute la classe"]},
    {"numero": 4, "titre": "Mon défi de la semaine", "duree_min": 3, "instruction": "Engage-toi à tenter la marche 1 cette semaine. Juste la marche 1. Pas plus. Note quand tu vas le faire et avec qui si tu as besoin de soutien.", "exemples": ["Jeudi pendant le cours de français, je vais lever la main au moins une fois"]}
  ]'::jsonb,
  'Comment tu te sens à l''idée de faire ce premier défi ? Est-ce que visualiser l''escalier t''aide à voir que c''est faisable pas à pas ?',
  15, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E7') m
ON CONFLICT DO NOTHING;

-- Mini-jeux E6, E7
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-regulation', 'Vrai ou Mythe ? — Calmer la tempête', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e6mg1", "affirmation": "L''expiration longue active le frein naturel du corps plus vite que l''inspiration.", "reponse": "VRAI", "explication": "Oui ! L''expiration longue stimule le nerf vague et active le système parasympathique — plus efficacement que l''inspiration."},
      {"id": "e6mg2", "affirmation": "Frapper un coussin pour se défouler réduit durablement la colère.", "reponse": "MYTHE", "explication": "Des études montrent que se défouler physiquement amplifie souvent la colère plutôt qu''elle ne la calme. La respiration et le mouvement doux sont plus efficaces."},
      {"id": "e6mg3", "affirmation": "Le mouvement physique aide le corps à métaboliser les hormones de stress.", "reponse": "VRAI", "explication": "Oui ! Bouger aide à dégrader le cortisol et l''adrénaline — les hormones qui maintiennent le corps en état d''alarme."},
      {"id": "e6mg4", "affirmation": "En pleine crise, tu peux toujours raisonner et expliquer calmement.", "reponse": "MYTHE", "explication": "Non ! En flooding émotionnel, le cortex préfrontal est hors ligne. D''abord calmer le corps, ensuite parler."},
      {"id": "e6mg5", "affirmation": "Préparer son plan de crise quand on va bien est plus efficace.", "reponse": "VRAI", "explication": "Exactement ! En crise, tu ne peux plus réfléchir clairement. Le plan préparé à l''avance te guide automatiquement."},
      {"id": "e6mg6", "affirmation": "Exprimer sa colère verbalement et la décharger en criant, c''est pareil.", "reponse": "MYTHE", "explication": "Non — exprimer (dire ''je suis en colère parce que...'') construit la relation. Décharger (crier, claquer) peut la détruire."},
      {"id": "e6mg7", "affirmation": "Se punir après une crise aide à ne plus recommencer.", "reponse": "MYTHE", "explication": "Non — la punition post-crise ajoute de la honte qui peut augmenter les futures crises. Réfléchir sans se juger est plus efficace."},
      {"id": "e6mg8", "affirmation": "Une micro-pause de régulation permet souvent de revenir à la tâche plus efficacement.", "reponse": "VRAI", "explication": "Oui ! Une courte pause de qualité (avec respiration ou mouvement) vaut mieux qu''une longue heure de travail en état de surcharge."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E6') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-anxiete', 'Vrai ou Mythe ? — L''anxiété', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e7mg1", "affirmation": "L''anxiété est le cerveau qui essaie de te protéger.", "reponse": "VRAI", "explication": "Oui ! L''alarme d''anxiété existe pour te protéger des dangers. Parfois elle se déclenche pour de fausses alertes — mais l''intention est bonne."},
      {"id": "e7mg2", "affirmation": "Éviter ce qui angoisse réduit l''anxiété sur le long terme.", "reponse": "MYTHE", "explication": "Non — chaque évitement renforce le message que la situation est dangereuse. L''anxiété grandit avec l''évitement."},
      {"id": "e7mg3", "affirmation": "Une pensée anxieuse est toujours basée sur des faits réels.", "reponse": "MYTHE", "explication": "Non ! Les pensées anxieuses sont des hypothèses, pas des faits. ''Je vais rater'' est une pensée, pas une certitude."},
      {"id": "e7mg4", "affirmation": "L''exposition progressive aide le cerveau à recalibrer son alarme anxieuse.", "reponse": "VRAI", "explication": "Oui ! Chaque exposition réussie dit au cerveau ''on a survécu'' — l''alarme devient progressivement moins intense."},
      {"id": "e7mg5", "affirmation": "Le courage, c''est ne jamais avoir peur.", "reponse": "MYTHE", "explication": "Non ! Le courage, c''est agir MALGRÉ la peur. Tout le monde a peur — les courageux avancent quand même."},
      {"id": "e7mg6", "affirmation": "Les neurodivergents ont statistiquement plus de risques de développer de l''anxiété.", "reponse": "VRAI", "explication": "Oui — naviguer dans un monde pas conçu pour soi génère du stress chronique. Mais des stratégies adaptées aident beaucoup."},
      {"id": "e7mg7", "affirmation": "S''insulter intérieurement quand on a peur aide à se motiver.", "reponse": "MYTHE", "explication": "Non — l''auto-critique intensive augmente l''anxiété. L''auto-compassion (se parler gentiment) est plus efficace pour avancer."},
      {"id": "e7mg8", "affirmation": "Commencer par la plus petite étape possible est souvent la meilleure stratégie face à la peur.", "reponse": "VRAI", "explication": "Oui ! La première étape crée l''élan. Plus elle est petite, plus il est facile de commencer — et l''action réduit l''anxiété."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E7') m
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E8 : Je dompte le temps
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E8') m,
(VALUES
  ('e8010000-0000-0000-0000-000000000001'::uuid, 'La "cécité temporelle" (mal sentir le temps qui passe) est particulièrement fréquente chez :', 1),
  ('e8020000-0000-0000-0000-000000000002'::uuid, 'Un minuteur visuel (comme le Time Timer) aide parce que :', 2),
  ('e8030000-0000-0000-0000-000000000003'::uuid, 'Pourquoi procrastine-t-on souvent les tâches difficiles ?', 3),
  ('e8040000-0000-0000-0000-000000000004'::uuid, 'La méthode "2 minutes" dit que :', 4),
  ('e8050000-0000-0000-0000-000000000005'::uuid, 'Pour estimer le temps qu''une tâche prend, la meilleure stratégie est de :', 5),
  ('e8060000-0000-0000-0000-000000000006'::uuid, 'Une routine fixe aide parce qu''elle :', 6),
  ('e8070000-0000-0000-0000-000000000007'::uuid, 'Quand il reste 10 minutes pour terminer un devoir, la meilleure approche est de :', 7),
  ('e8080000-0000-0000-0000-000000000008'::uuid, 'Le "time-boxing" (bloquer du temps pour une tâche précise) aide à :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8010000-0000-0000-0000-000000000001', 'Les enfants qui ne s''intéressent pas à l''école', false, 1, NULL, 'La cécité temporelle n''est pas liée à la motivation scolaire.'),
('e8010000-0000-0000-0000-000000000001', 'Les profils TDAH, qui ont un rapport au temps subjectif très différent', true, 2, 'Exactement ! Le TDAH affecte la perception subjective du temps. Ce n''est pas de la mauvaise volonté — le cerveau TDAH a littéralement du mal à "sentir" le temps s''écouler.', NULL),
('e8010000-0000-0000-0000-000000000001', 'Les enfants qui passent trop de temps sur les écrans', false, 3, NULL, 'Les écrans peuvent affecter la perception du temps, mais la cécité temporelle est un trait neurologique lié au TDAH.'),
('e8010000-0000-0000-0000-000000000001', 'Tout le monde de la même façon', false, 4, NULL, 'La cécité temporelle est significativement plus fréquente dans les profils TDAH.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8020000-0000-0000-0000-000000000002', 'Il rend le temps visible et concret pour les cerveaux qui le "voient mal"', true, 1, 'Parfait ! Un minuteur visuel externalise le temps abstrait en quelque chose de visible. Pour les cerveaux qui ne "sentent" pas le temps, c''est un outil transformateur.', NULL),
('e8020000-0000-0000-0000-000000000002', 'Il fait du bruit qui rappelle à se dépêcher', false, 2, NULL, 'Ce n''est pas l''essentiel — c''est la visualisation du temps restant qui est le plus puissant.'),
('e8020000-0000-0000-0000-000000000002', 'Il crée de la pression et de l''urgence pour travailler vite', false, 3, NULL, 'L''objectif n''est pas la pression — c''est la visualisation du temps comme information concrète.'),
('e8020000-0000-0000-0000-000000000002', 'Il remplace le besoin de montre', false, 4, NULL, 'Ce n''est pas juste une montre — c''est une représentation visuelle du temps qui reste, accessible aux cerveaux visuels.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8030000-0000-0000-0000-000000000003', 'Parce qu''on est paresseux', false, 1, NULL, 'La procrastination n''est pas de la paresse — c''est souvent de l''évitement d''une émotion difficile (ennui, anxiété, perfectionnisme).'),
('e8030000-0000-0000-0000-000000000003', 'Parce que le cerveau évite l''inconfort émotionnel associé à la tâche', true, 2, 'Exactement ! La procrastination est un problème de régulation émotionnelle, pas de gestion du temps. On évite l''ennui, la peur d''échouer, ou la frustration de ne pas comprendre.', NULL),
('e8030000-0000-0000-0000-000000000003', 'Parce qu''on n''est pas organisé', false, 3, NULL, 'L''organisation peut aider, mais la cause profonde de la procrastination est émotionnelle.'),
('e8030000-0000-0000-0000-000000000003', 'Parce que la tâche n''est pas importante', false, 4, NULL, 'On procrastine souvent les choses les plus importantes ! La procrastination et l''importance d''une tâche ne sont pas liées de cette façon.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8040000-0000-0000-0000-000000000004', 'Si une tâche prend moins de 2 minutes, fais-la immédiatement', true, 1, 'Oui ! Cette règle simple empêche l''accumulation de petites tâches qui créent un sentiment de chaos. "Répondre à ce message prend 1 minute — je le fais maintenant."', NULL),
('e8040000-0000-0000-0000-000000000004', 'Il faut faire des pauses toutes les 2 minutes', false, 2, NULL, 'Non — 2 minutes, c''est le seuil de décision pour faire ou reporter une tâche, pas la durée des pauses.'),
('e8040000-0000-0000-0000-000000000004', 'Il faut travailler maximum 2 minutes sur chaque tâche', false, 3, NULL, 'Non — la règle des 2 minutes aide à décider si une courte tâche doit être faite immédiatement ou planifiée.'),
('e8040000-0000-0000-0000-000000000004', 'Il faut se reposer 2 minutes avant de commencer', false, 4, NULL, 'Ce n''est pas la règle des 2 minutes. Commence la tâche directement quand elle est courte.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8050000-0000-0000-0000-000000000005', 'Diviser la tâche en étapes et estimer chaque étape séparément', true, 1, 'Parfait ! Les humains (surtout les profils TDAH) sous-estiment systématiquement le temps des grandes tâches. Estimer étape par étape est bien plus précis.', NULL),
('e8050000-0000-0000-0000-000000000005', 'Demander à quelqu''un d''autre combien de temps ça lui prend', false, 2, NULL, 'Les autres ne sont pas toi. Les temps peuvent varier énormément selon le profil.'),
('e8050000-0000-0000-0000-000000000005', 'Faire confiance à son instinct', false, 3, NULL, 'L''instinct sous-estime souvent le temps nécessaire. La décomposition en étapes est plus fiable.'),
('e8050000-0000-0000-0000-000000000005', 'Prévoir le double du temps que tu penses', false, 4, NULL, 'Doubler peut aider comme règle approximative, mais estimer étape par étape est plus précis.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8060000-0000-0000-0000-000000000006', 'Élimine le besoin de décider à chaque fois quoi faire', true, 1, 'Exactement ! Chaque décision coûte de l''énergie mentale. Une routine fixe automatise les séquences — l''énergie économisée peut aller à l''apprentissage.', NULL),
('e8060000-0000-0000-0000-000000000006', 'Rend la vie plus ennuyeuse et prévisible', false, 2, NULL, 'Pour certains, les routines peuvent paraître contraignantes. Mais pour les cerveaux TDAH/DYS, elles libèrent de l''espace mental.'),
('e8060000-0000-0000-0000-000000000006', 'Force les enfants à être disciplinés', false, 3, NULL, 'Les routines ne sont pas des punitions — elles sont des scaffolds (soutiens) qui réduisent la charge cognitive.'),
('e8060000-0000-0000-0000-000000000006', 'N''aide que les enfants neurotypiques', false, 4, NULL, 'Au contraire ! Les routines aident particulièrement les profils TDAH et DYS qui ont du mal avec les fonctions exécutives.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8070000-0000-0000-0000-000000000007', 'Paniquer et se dépêcher de tout faire à la fois', false, 1, NULL, 'La panique nuit à la qualité et à la concentration. Mieux vaut trier et se concentrer.'),
('e8070000-0000-0000-0000-000000000007', 'Identifier ce qui est essentiel, le faire bien, et laisser le reste pour plus tard', true, 2, 'Parfait ! La gestion du temps sous pression passe par la priorisation, pas la panique. Ce qui compte : finir l''essentiel correctement.', NULL),
('e8070000-0000-0000-0000-000000000007', 'Abandonner le devoir et l''expliquer à l''enseignant', false, 3, NULL, 'Mieux vaut rendre quelque chose d''incomplet fait correctement qu''abandonner. Et préparer un plan pour la prochaine fois.'),
('e8070000-0000-0000-0000-000000000007', 'Faire tout en même temps très vite', false, 4, NULL, 'Multitasker en stress nuit à la qualité de tout. Prioriser et se concentrer sur l''essentiel est plus efficace.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e8080000-0000-0000-0000-000000000008', 'Éviter la procrastination en rendant la tâche concrète et délimitée', true, 1, 'Exactement ! "Je travaille sur les maths de 17h à 17h45" est beaucoup plus actionnable que "je dois faire mes devoirs". Le time-boxing réduit l''anxiété de la tâche infinie.', NULL),
('e8080000-0000-0000-0000-000000000008', 'Travailler plus longtemps en finissant toujours', false, 2, NULL, 'Le time-boxing fixe une fin — pas l''obligation de tout finir. C''est rassurant, pas contraignant.'),
('e8080000-0000-0000-0000-000000000008', 'Ne faire qu''une seule chose par jour', false, 3, NULL, 'Non — le time-boxing divise la journée en blocs pour différentes tâches. On peut en faire plusieurs.'),
('e8080000-0000-0000-0000-000000000008', 'Éviter les pauses pendant le travail', false, 4, NULL, 'Les pauses restent importantes même avec le time-boxing — on peut les intégrer dans les blocs.');

-- Self-eval E8
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E8') m,
(VALUES
  ('Je comprends ce qu''est la cécité temporelle et si je la vis', 1.0, 1),
  ('J''utilise au moins un outil de visualisation du temps (minuteur, planner)', 1.5, 2),
  ('Je peux identifier quand je procrastine et pourquoi', 1.5, 3),
  ('J''ai créé une routine pour au moins une partie de ma journée', 1.0, 4),
  ('Je décompose les grandes tâches en étapes estimées', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

-- Activities E8
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'mon-planning-intelligent', 'Mon planning intelligent',
  'Crée un planning adapté à ton profil pour cette semaine',
  '[
    {"numero": 1, "titre": "Mon profil temporel", "duree_min": 3, "instruction": "Réponds : Je suis plutôt (matin / après-midi / soir) ? Ma concentration dure (10 / 20 / 30 / 45) minutes ? J''ai besoin de (beaucoup / peu) de pauses ? Utilise ces infos pour créer ton planning.", "exemples": ["Moi : après-midi, 20 min, beaucoup de pauses"]},
    {"numero": 2, "titre": "Estimer mes tâches", "duree_min": 5, "instruction": "Liste les tâches que tu dois faire cette semaine. Pour chacune, décompose-la en étapes et estime le temps de chaque étape. Compare avec ce que tu pensais d''abord.", "exemples": ["Réviser maths : étape 1 revoir cours (15min) + étape 2 exercices (20min) = 35 min total"]},
    {"numero": 3, "titre": "Construire les blocs", "duree_min": 5, "instruction": "Place tes tâches dans ton planning en blocs de temps qui correspondent à ta durée de concentration. Mets des pauses entre chaque bloc.", "exemples": ["Lundi 17h-17h20 : français", "Pause 5min", "17h25-17h45 : maths"]},
    {"numero": 4, "titre": "Anti-procrastination", "duree_min": 3, "instruction": "Identifie la tâche que tu as le plus envie d''éviter cette semaine. Applique la règle : décompose-la en 3 étapes, et engage-toi à faire juste la première étape demain à heure fixe.", "exemples": ["Tâche redoutée : exposé oral → Étape 1 : écrire le plan (15 min mardi 18h)"]}
  ]'::jsonb,
  'Est-ce que tu te sens plus organisé après cet exercice ? Qu''est-ce qui était le plus difficile à planifier et pourquoi ?',
  16, 22, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E8') m
ON CONFLICT DO NOTHING;

-- Mini-jeux E8, E9, E10
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-temps', 'Vrai ou Mythe ? — La gestion du temps', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e8mg1", "affirmation": "La procrastination est due à la paresse.", "reponse": "MYTHE", "explication": "Non ! La procrastination est un problème de régulation émotionnelle — on évite l''inconfort lié à la tâche, pas la tâche elle-même."},
      {"id": "e8mg2", "affirmation": "Les profils TDAH ont souvent du mal à sentir le temps qui passe.", "reponse": "VRAI", "explication": "Oui — c''est la cécité temporelle. Les outils visuels (minuteur, time timer) compensent cette difficulté."},
      {"id": "e8mg3", "affirmation": "Estimer le temps d''une grande tâche d''un bloc est souvent précis.", "reponse": "MYTHE", "explication": "Non ! On sous-estime presque toujours les grandes tâches. Décomposer et estimer par étapes est bien plus fiable."},
      {"id": "e8mg4", "affirmation": "Une routine fixe libère de l''énergie mentale pour apprendre.", "reponse": "VRAI", "explication": "Oui — automatiser les séquences évite de dépenser de l''énergie à décider. Plus d''énergie disponible pour l''essentiel."},
      {"id": "e8mg5", "affirmation": "Multitasker (faire plusieurs choses en même temps) améliore la productivité.", "reponse": "MYTHE", "explication": "Non — le multitasking réduit la qualité et augmente les erreurs. Le focus unique est plus efficace."},
      {"id": "e8mg6", "affirmation": "Si une tâche prend moins de 2 minutes, mieux vaut la faire immédiatement.", "reponse": "VRAI", "explication": "Oui ! La règle des 2 minutes évite d''accumuler les petites tâches qui créent un sentiment de chaos."},
      {"id": "e8mg7", "affirmation": "Le time-boxing (bloquer un temps précis pour une tâche) aide à démarrer.", "reponse": "VRAI", "explication": "Oui ! Savoir que la tâche a une fin prévue réduit l''anxiété et facilite le démarrage."},
      {"id": "e8mg8", "affirmation": "Travailler sans pause est plus efficace pour les élèves TDAH.", "reponse": "MYTHE", "explication": "Non — les cerveaux TDAH se fatiguent vite sans pauses. Des sessions courtes avec pauses sont bien plus productives."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E8') m
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E9 : Chasser les distractions
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E9') m,
(VALUES
  ('e9010000-0000-0000-0000-000000000001'::uuid, 'Les notifications de téléphone nuisent à la concentration parce que :', 1),
  ('e9020000-0000-0000-0000-000000000002'::uuid, 'Une distraction interne efficacement gérée, c''est :', 2),
  ('e9030000-0000-0000-0000-000000000003'::uuid, 'Le "bruit blanc" ou musique instrumentale aide certains élèves à se concentrer parce que :', 3),
  ('e9040000-0000-0000-0000-000000000004'::uuid, 'Mettre son téléphone dans une autre pièce (pas seulement en silencieux) aide parce que :', 4),
  ('e9050000-0000-0000-0000-000000000005'::uuid, 'L''encombrement visuel sur le bureau nuit à la concentration parce que :', 5),
  ('e9060000-0000-0000-0000-000000000006'::uuid, 'Un enfant qui griffonne pendant un cours :', 6),
  ('e9070000-0000-0000-0000-000000000007'::uuid, 'Reconnaître ses propres distracteurs principaux est important parce que :', 7),
  ('e9080000-0000-0000-0000-000000000008'::uuid, 'La meilleure façon de gérer une pensée distrayante qui surgit est de :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9010000-0000-0000-0000-000000000001', 'Elles prouvent qu''on est populaire', false, 1, NULL, 'La popularité n''a rien à voir avec la nuisance des notifications sur la concentration !'),
('e9010000-0000-0000-0000-000000000001', 'Chaque notification interrompt le flux de concentration et il faut 20+ minutes pour le retrouver', true, 2, 'Exactement ! Des études montrent qu''après une interruption, même brève, il faut en moyenne 23 minutes pour retrouver un niveau de concentration profond. Les notifications cassent le flux en permanence.', NULL),
('e9010000-0000-0000-0000-000000000001', 'Elles font du bruit désagréable', false, 3, NULL, 'Le son n''est pas le seul problème — même une notification silencieuse (lumière qui clignote) interrompt le flux.'),
('e9010000-0000-0000-0000-000000000001', 'Elles n''ont aucun impact réel si on est discipliné', false, 4, NULL, 'Si ! La tentation de vérifier crée une charge mentale même sans regarder. La seule solution fiable est d''enlever le téléphone de la vue.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9020000-0000-0000-0000-000000000002', 'Une idée qui surgit, notée rapidement dans un carnet pour y revenir plus tard', true, 1, 'Parfait ! "Capture et reviens" — noter l''idée décharge le cerveau qui n''a plus besoin de la retenir, et permet de revenir au travail sans la perdre.', NULL),
('e9020000-0000-0000-0000-000000000002', 'Une idée qu''on doit approfondir immédiatement pour ne pas l''oublier', false, 2, NULL, 'Approfondir immédiatement interrompt le travail en cours. Mieux vaut noter et revenir après.'),
('e9020000-0000-0000-0000-000000000002', 'Une pensée qu''on doit chasser par la volonté', false, 3, NULL, 'Chasser une pensée par la volonté consomme de l''énergie et souvent échoue. La noter est plus efficace.'),
('e9020000-0000-0000-0000-000000000002', 'Une distraction qu''on ne peut pas contrôler', false, 4, NULL, 'Les distractions internes sont contrôlables — avec les bonnes stratégies comme le carnet de capture.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9030000-0000-0000-0000-000000000003', 'Elle crée une "barrière sonore" contre les sons distrayants de l''environnement', true, 1, 'Exactement ! Un fond sonore constant (bruit blanc, musique instrumentale) masque les sons irréguliers (voix, bruit de chaise) qui attirent involontairement l''attention.', NULL),
('e9030000-0000-0000-0000-000000000003', 'Elle rend l''apprentissage plus amusant', false, 2, NULL, 'Ce n''est pas l''effet principal. Le mécanisme est neurologique — masquer les sons distrayants.'),
('e9030000-0000-0000-0000-000000000003', 'Elle force le cerveau à s''endormir moins vite', false, 3, NULL, 'Ce n''est pas son effet principal sur la concentration.'),
('e9030000-0000-0000-0000-000000000003', 'Elle fonctionne de la même façon pour tout le monde', false, 4, NULL, 'Pas du tout ! Certains se concentrent mieux dans le silence total. C''est personnel — teste et adapte.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9040000-0000-0000-0000-000000000004', 'Le simple fait de savoir que le téléphone est là crée une charge mentale', true, 1, 'Parfait ! Des recherches montrent que même un téléphone retourné sur la table réduit la capacité cognitive — parce que le cerveau dépense des ressources à résister à la tentation de le regarder.', NULL),
('e9040000-0000-0000-0000-000000000004', 'Pour éviter de l''abîmer', false, 2, NULL, 'C''est bien de protéger son téléphone, mais ce n''est pas la raison de le mettre dans une autre pièce pour travailler.'),
('e9040000-0000-0000-0000-000000000004', 'Parce que le wifi ne fonctionne pas dans une autre pièce', false, 3, NULL, 'Non — l''enjeu est psychologique, pas technique.'),
('e9040000-0000-0000-0000-000000000004', 'Ça ne change rien si on est vraiment concentré', false, 4, NULL, 'Si ! Même les personnes très concentrées voient leurs performances baisser si leur téléphone est visible.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9050000-0000-0000-0000-000000000005', 'Chaque objet visible est une invitation pour l''attention à se déplacer', true, 1, 'Exactement ! L''attention est attirée par ce qui est visible — c''est neurologique. Un espace de travail épuré réduit les demandes faites à l''attention.', NULL),
('e9050000-0000-0000-0000-000000000005', 'C''est juste une question d''esthétique', false, 2, NULL, 'Non — l''encombrement a un effet neurologique réel sur la capacité attentionnelle.'),
('e9050000-0000-0000-0000-000000000005', 'Ça nuit seulement aux enfants très jeunes', false, 3, NULL, 'L''encombrement visuel nuit à la concentration à tous les âges.'),
('e9050000-0000-0000-0000-000000000005', 'Ça n''a d''impact que si l''enfant est TDAH', false, 4, NULL, 'L''encombrement nuit à tout le monde — l''effet est amplifié pour les TDAH, mais universel.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9060000-0000-0000-0000-000000000006', 'N''écoute pas et doit être arrêté immédiatement', false, 1, NULL, 'Pas forcément ! Des études montrent que griffer peut aider certains cerveaux à maintenir l''attention auditive.'),
('e9060000-0000-0000-0000-000000000006', 'Pourrait utiliser un mouvement pour maintenir son niveau d''activation et mieux écouter', true, 2, 'Oui ! Pour certains profils (notamment TDAH), le mouvement léger (griffer, agiter un pied) maintient le niveau d''activation nécessaire à l''écoute. Ce n''est pas de l''inattention.', NULL),
('e9060000-0000-0000-0000-000000000006', 'Prouve qu''il n''est pas intéressé par le cours', false, 3, NULL, 'Le griffonnage peut coexister avec un intérêt réel. Ce n''est pas forcément un signe de désintérêt.'),
('e9060000-0000-0000-0000-000000000006', 'Doit choisir entre griffer et écouter', false, 4, NULL, 'Pour certains profils, les deux sont possibles simultanément — griffer peut même aider à écouter.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9070000-0000-0000-0000-000000000007', 'Les stratégies anti-distraction sont personnelles — pas universelles', true, 1, 'Parfait ! Ce qui distrait l''un ne distrait pas l''autre. Connaître SES propres distracteurs permet de choisir les bons outils personnellement.', NULL),
('e9070000-0000-0000-0000-000000000007', 'Pour pouvoir les expliquer à ses parents et professeurs', false, 2, NULL, 'Communiquer avec les adultes peut aider, mais la connaissance de soi a d''abord un bénéfice personnel.'),
('e9070000-0000-0000-0000-000000000007', 'Pour éviter toutes les situations potentiellement distrayantes', false, 3, NULL, 'L''objectif n''est pas l''évitement total (impossible) — c''est d''avoir des stratégies adaptées à ses distracteurs spécifiques.'),
('e9070000-0000-0000-0000-000000000007', 'Pour se comparer aux autres élèves', false, 4, NULL, 'La comparaison n''est pas l''objectif. Chaque profil est unique — se connaître soi-même est la clé.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e9080000-0000-0000-0000-000000000008', 'L''ignorer absolument et continuer coûte que coûte', false, 1, NULL, 'Ignorer coûte de l''énergie. La noter est plus efficace.'),
('e9080000-0000-0000-0000-000000000008', 'La noter sur un bout de papier et s''engager à y revenir plus tard', true, 2, 'Parfait ! "Capture et reviens" libère le cerveau de la charge de retenir l''idée, et permet de reprendre le travail sans culpabilité.', NULL),
('e9080000-0000-0000-0000-000000000008', 'La suivre immédiatement pour s''en débarrasser', false, 3, NULL, 'Suivre une distraction interne interrompt le travail et en crée souvent d''autres.'),
('e9080000-0000-0000-0000-000000000008', 'Se punir de s''être distrait', false, 4, NULL, 'La punition augmente l''anxiété, qui elle-même nuit à la concentration. Noter et revenir est neutre et efficace.');

-- Self-eval E9, E10
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E9') m,
(VALUES
  ('Je connais mes 3 principales distractions (internes et externes)', 1.5, 1),
  ('J''ai essayé au moins une stratégie anti-distraction externe (téléphone, espace)', 1.5, 2),
  ('J''utilise un carnet ou une méthode pour capturer mes pensées distrayantes', 1.0, 3),
  ('Mon espace de travail est épuré quand je dois me concentrer', 1.0, 4),
  ('Je comprends que ce qui me distrait peut être différent de ce qui distrait les autres', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════
-- QUIZ — E10 : Les secrets de ma mémoire
-- ═══════════════════════════════════════════════════════════════════════
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E10') m,
(VALUES
  ('e0010000-0000-0000-0000-000000000001'::uuid, 'La mémoire de travail, c''est :', 1),
  ('e0020000-0000-0000-0000-000000000002'::uuid, 'La révision espacée consiste à :', 2),
  ('e0030000-0000-0000-0000-000000000003'::uuid, 'Pourquoi dormir aide-t-il à mémoriser ?', 3),
  ('e0040000-0000-0000-0000-000000000004'::uuid, 'Le "chunking" (regrouper les informations) aide parce que :', 4),
  ('e0050000-0000-0000-0000-000000000005'::uuid, 'Pour mémoriser un texte, relire plusieurs fois est :', 5),
  ('e0060000-0000-0000-0000-000000000006'::uuid, 'Un moyen mnémotechnique efficace pour retenir une liste est :', 6),
  ('e0070000-0000-0000-0000-000000000007'::uuid, 'La mémoire épisodique (souvenirs personnels) est souvent plus forte parce que :', 7),
  ('e0080000-0000-0000-0000-000000000008'::uuid, 'Réviser en s''auto-testant (se poser des questions) est plus efficace que relire parce que :', 8)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0010000-0000-0000-0000-000000000001', 'La mémoire pour tout ce qui s''est passé dans sa vie', false, 1, NULL, 'Ce sont les souvenirs personnels (mémoire épisodique). La mémoire de travail est différente.'),
('e0010000-0000-0000-0000-000000000001', 'L''espace mental temporaire pour traiter les informations en cours', true, 2, 'Exactement ! Comme un bureau de travail (vs une armoire = mémoire long terme). Elle est limitée — environ 7 éléments à la fois. Souvent plus petite chez les profils TDAH/DYS.', NULL),
('e0010000-0000-0000-0000-000000000001', 'La capacité à mémoriser ce qu''on a appris au travail', false, 3, NULL, 'Non — la mémoire de travail n''est pas spécifique au lieu de travail. C''est la mémoire "en direct" pour traiter l''information.'),
('e0010000-0000-0000-0000-000000000001', 'Le même que la RAM d''un ordinateur — mais en beaucoup plus grand', false, 4, NULL, 'L''analogie avec la RAM est bonne (mémoire temporaire de traitement), mais la mémoire de travail est limitée — pas immense !');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0020000-0000-0000-0000-000000000002', 'Réviser une seule fois très longtemps puis ne plus y revenir', false, 1, NULL, 'C''est le bachotage — efficace à court terme, catastrophique pour la mémorisation durable.'),
('e0020000-0000-0000-0000-000000000002', 'Réviser à intervalles croissants (1j, 3j, 7j, 14j) pour ancrer dans la mémoire long terme', true, 2, 'Exactement ! La courbe d''Ebbinghaus montre qu''on oublie rapidement sans répétition. Réviser juste avant d''oublier (intervalle optimal) est la méthode la plus efficace scientifiquement.', NULL),
('e0020000-0000-0000-0000-000000000002', 'Réviser tous les jours exactement à la même heure', false, 3, NULL, 'La régularité aide, mais l''espace progressif entre les révisions (croissant) est la clé de la mémorisation durable.'),
('e0020000-0000-0000-0000-000000000002', 'Ne réviser que ce qui a été raté au contrôle', false, 4, NULL, 'Réviser les erreurs est utile, mais la révision espacée s''applique à tout le contenu à apprendre.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0030000-0000-0000-0000-000000000003', 'On a plus d''énergie le lendemain pour se souvenir', false, 1, NULL, 'L''énergie aide, mais l''effet du sommeil sur la mémoire est plus profond — c''est une consolidation active.'),
('e0030000-0000-0000-0000-000000000003', 'Pendant le sommeil, le cerveau consolide et transfère les informations en mémoire long terme', true, 2, 'Parfait ! Le sommeil n''est pas passif — le cerveau trie, consolide et organise activement les informations apprises dans la journée. Apprendre puis dormir > apprendre et rester éveillé.', NULL),
('e0030000-0000-0000-0000-000000000003', 'On ne fait pas d''autres activités qui interfèrent', false, 3, NULL, 'L''absence d''interférence contribue, mais la consolidation active pendant le sommeil est l''effet principal.'),
('e0030000-0000-0000-0000-000000000003', 'Le sommeil n''a pas vraiment d''effet sur la mémoire', false, 4, NULL, 'Si ! Des dizaines d''études confirment que le sommeil est essentiel à la consolidation des apprentissages.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0040000-0000-0000-0000-000000000004', 'La mémoire de travail traite des "groupes" plutôt que des éléments individuels', true, 1, 'Exactement ! La mémoire de travail a une capacité d''environ 7 items. En regroupant (ex: un numéro de téléphone en groupes de 3 chiffres), on stocke moins d''items et mémorise plus.', NULL),
('e0040000-0000-0000-0000-000000000004', 'Ça prend moins de temps à écrire', false, 2, NULL, 'Le gain de temps est un bénéfice secondaire. L''effet principal est sur la capacité de mémorisation.'),
('e0040000-0000-0000-0000-000000000004', 'Les informations groupées sont plus jolies visuellement', false, 3, NULL, 'L''esthétique peut aider l''encodage visuel, mais ce n''est pas l''effet principal du chunking.'),
('e0040000-0000-0000-0000-000000000004', 'Ça réduit le besoin de réviser', false, 4, NULL, 'Le chunking aide à mémoriser, mais ne remplace pas la pratique et la révision.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0050000-0000-0000-0000-000000000005', 'La méthode la plus efficace pour bien mémoriser', false, 1, NULL, 'Non — relire donne une illusion de maîtrise. Les techniques actives (se tester, enseigner) sont bien plus efficaces.'),
('e0050000-0000-0000-0000-000000000005', 'Peu efficace — le cerveau s''habitue au texte et cesse de traiter l''information activement', true, 2, 'Exactement ! La relecture passive crée une "familiarité" sans véritable mémorisation. S''auto-tester force le cerveau à récupérer l''information — ce qui est le vrai travail de mémorisation.', NULL),
('e0050000-0000-0000-0000-000000000005', 'Efficace seulement si on surligne en même temps', false, 3, NULL, 'Surligner + relire reste passif. Ce sont les techniques actives qui font la différence.'),
('e0050000-0000-0000-0000-000000000005', 'Efficace pour les textes longs uniquement', false, 4, NULL, 'La relecture passive est peu efficace pour tout type de texte, long ou court.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0060000-0000-0000-0000-000000000006', 'Créer une histoire ou une image mentale qui lie les éléments entre eux', true, 1, 'Exactement ! Le cerveau retient beaucoup mieux les histoires et images que les listes abstraites. "Mon chien mange des pommes sur la tour Eiffel" est plus mémorable que 3 mots isolés.', NULL),
('e0060000-0000-0000-0000-000000000006', 'Écrire la liste 10 fois de suite', false, 2, NULL, 'La répétition mécanique est moins efficace que les techniques d''encodage actif (histoire, image).'),
('e0060000-0000-0000-0000-000000000006', 'Mettre la liste en musique uniquement', false, 3, NULL, 'La musique peut aider, mais créer une image ou une histoire est souvent encore plus efficace.'),
('e0060000-0000-0000-0000-000000000006', 'Mémoriser dans l''ordre alphabétique', false, 4, NULL, 'L''ordre alphabétique est une structure, mais sans image ou histoire associée, c''est moins mémorable.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0070000-0000-0000-0000-000000000007', 'Elle est attachée à des émotions et des contextes qui renforcent l''encodage', true, 1, 'Parfait ! Les événements chargés émotionnellement sont encodés plus profondément. C''est pourquoi "apprendre en faisant" et "relier aux expériences vécues" est si efficace.', NULL),
('e0070000-0000-0000-0000-000000000007', 'Elle est stockée dans une zone du cerveau plus grande', false, 2, NULL, 'Ce n''est pas une question de taille — c''est une question d''encodage émotionnel et contextuel.'),
('e0070000-0000-0000-0000-000000000007', 'On a eu le temps de la vivre plusieurs fois', false, 3, NULL, 'La fréquence contribue, mais l''émotion attachée au souvenir est souvent plus déterminante.'),
('e0070000-0000-0000-0000-000000000007', 'Elle n''est pas vraiment plus forte — c''est une illusion', false, 4, NULL, 'Non — la mémoire épisodique est effectivement plus robuste, surtout quand elle est émotionnellement chargée. C''est documenté.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('e0080000-0000-0000-0000-000000000008', 'Ça prend moins de temps', false, 1, NULL, 'L''auto-test peut prendre plus de temps — mais il est beaucoup plus efficace.'),
('e0080000-0000-0000-0000-000000000008', 'L''acte de récupérer l''information renforce la trace mémorielle', true, 2, 'Exactement ! "Testing effect" — récupérer une information depuis la mémoire (pas juste la lire) crée une trace plus forte. Plus tu te souviens, plus tu te souviendras.', NULL),
('e0080000-0000-0000-0000-000000000008', 'Ça montre qu''on est prêt pour l''examen', false, 3, NULL, 'L''auto-test est un outil d''apprentissage, pas seulement une évaluation.'),
('e0080000-0000-0000-0000-000000000008', 'Ça crée du stress bénéfique', false, 4, NULL, 'Un peu de stress peut aider, mais l''effet principal de l''auto-test est neurologique : le rappel actif renforce la trace mémorielle.');

-- Self-eval E10
INSERT INTO public.self_eval_items (module_id, audience, text, weight, sort_order)
SELECT m.id, 'eleve'::module_audience, s.text, s.weight, s.sort_order
FROM (SELECT id FROM public.modules WHERE code = 'E10') m,
(VALUES
  ('Je comprends la différence entre mémoire de travail et mémoire long terme', 1.0, 1),
  ('J''utilise la révision espacée (pas de bachotage de dernière minute)', 1.5, 2),
  ('Je me teste moi-même (flashcards, questions) plutôt que de juste relire', 1.5, 3),
  ('J''utilise des techniques mnémotechniques pour mémoriser', 1.0, 4),
  ('Je dors suffisamment avant les contrôles importants', 1.0, 5)
) AS s(text, weight, sort_order)
ON CONFLICT DO NOTHING;

-- Activities E9, E10
INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'chasse-distracteurs', 'Chasse aux distracteurs',
  'Identifie et neutralise tes ennemis de concentration',
  '[
    {"numero": 1, "titre": "L''audit de mon espace", "duree_min": 5, "instruction": "Regarde ton espace de travail habituel. Note tout ce qui pourrait attirer ton attention (téléphone, objets, fenêtre, bruit...). Compte le nombre de distracteurs potentiels.", "exemples": ["Téléphone (visible), fenêtre sur la rue, coussin de jeu, magazine..."]},
    {"numero": 2, "titre": "Mes Top 3 distracteurs", "duree_min": 4, "instruction": "Parmi tout ce que tu as listé, choisis les 3 qui t''ont le plus souvent fait perdre du temps. Pour chacun, note : est-ce externe (environnement) ou interne (dans ta tête) ?", "exemples": ["1. Téléphone (externe)", "2. Pensées sur YouTube (interne)", "3. Bruit des autres (externe)"]},
    {"numero": 3, "titre": "Stratégies sur mesure", "duree_min": 5, "instruction": "Pour chacun de tes 3 distracteurs, conçois une stratégie concrète. Exemples : carnet de capture (interne), téléphone dans boite (externe), casque antibruit (externe).", "exemples": ["Téléphone → boîte dans une autre pièce pendant le travail", "Pensées → carnet d''idées à côté"]},
    {"numero": 4, "titre": "Mon espace optimisé", "duree_min": 3, "instruction": "Applique maintenant tes stratégies et observe : ton espace est-il différent ? Comment tu te sens par rapport à tes sessions de travail ?", "exemples": ["Téléphone rangé, bureau épuré, carnet prêt : 3 changements simples, impact immédiat"]}
  ]'::jsonb,
  'Quel a été le plus grand changement que tu as fait dans ton espace ? Est-ce que ça a déjà eu un impact sur ta concentration ?',
  17, 23, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E9') m
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (module_id, slug, title, description, instructions, reflection_prompt, duration_min, duration_max, xp_solo, xp_duo, xp_bonus_reflection)
SELECT m.id, 'mes-techniques-memoire', 'Mes techniques mémoire',
  'Expérimente et construis ta boîte à outils mémoire',
  '[
    {"numero": 1, "titre": "Test de mémorisation", "duree_min": 5, "instruction": "Mémorise cette liste de 10 mots en 1 minute : POMME, BATEAU, LUNE, CHEVAL, TABLE, NUAGE, ROSE, ROBOT, ÉTOILE, PONT. Écris autant que tu peux de mémoire. Combien as-tu retenu ?", "exemples": ["Sans technique : généralement 5-7 mots en désordre"]},
    {"numero": 2, "titre": "La même liste avec une histoire", "duree_min": 5, "instruction": "Maintenant crée une histoire absurde avec les 10 mots dans l''ordre. Lis-la une fois. Attends 2 minutes en faisant autre chose. Essaie de retrouver les 10 mots.", "exemples": ["''Une POMME tombe d''un BATEAU sur la LUNE où un CHEVAL mange à TABLE sous un NUAGE de ROSES et un ROBOT compte les ÉTOILES sous un PONT''"]},
    {"numero": 3, "titre": "Flashcards de révision", "duree_min": 5, "instruction": "Prends un cours que tu dois réviser. Crée 5 flashcards : recto = question, verso = réponse. Ensuite, teste-toi sans regarder les réponses. Comment ça marche ?", "exemples": ["Recto : ''Quelle est la formule de l''énergie ?''", "Verso : ''E = mc²''"]},
    {"numero": 4, "titre": "Mon plan de révision espacée", "duree_min": 3, "instruction": "Pour le prochain contrôle, planifie tes révisions : première session (j-14), deuxième (j-7), troisième (j-3), quatrième (j-1 : court). Note dans ton agenda.", "exemples": ["Contrôle de maths le 15 → révisions : 1er, 8, 12, 14"]}
  ]'::jsonb,
  'Quelle technique a le mieux marché pour toi ? L''histoire absurde, les flashcards, ou les deux ? Qu''est-ce que tu vas utiliser pour ton prochain contrôle ?',
  18, 25, 25, 35, 10
FROM (SELECT id FROM public.modules WHERE code = 'E10') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-distractions', 'Vrai ou Mythe ? — Les distractions', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e9mg1", "affirmation": "Après une interruption, il faut en moyenne 20+ minutes pour retrouver un focus profond.", "reponse": "VRAI", "explication": "Oui — des études mesurent ce temps à environ 23 minutes. Les notifications sont donc très coûteuses pour la concentration."},
      {"id": "e9mg2", "affirmation": "Un téléphone en silencieux sur le bureau n''a aucun impact sur la concentration.", "reponse": "MYTHE", "explication": "Non ! La simple présence visible d''un téléphone réduit la capacité cognitive — même sans notification."},
      {"id": "e9mg3", "affirmation": "Griffonner pendant un cours peut aider certains cerveaux à mieux écouter.", "reponse": "VRAI", "explication": "Oui ! Pour les profils qui ont besoin de stimulation motrice, le griffonnage maintient l''éveil attentionnel."},
      {"id": "e9mg4", "affirmation": "Les distractions internes (pensées) ne peuvent pas être gérées.", "reponse": "MYTHE", "explication": "Si ! Les noter rapidement dans un carnet décharge la mémoire de travail et permet de revenir au travail."},
      {"id": "e9mg5", "affirmation": "Le même environnement de travail est optimal pour tous les élèves.", "reponse": "MYTHE", "explication": "Non — chaque cerveau a ses préférences sensorielles. Silence, bruit blanc, musique : expérimente ce qui marche pour toi."},
      {"id": "e9mg6", "affirmation": "Un bureau encombré peut réduire la capacité de concentration.", "reponse": "VRAI", "explication": "Oui — chaque objet visible est une invitation pour l''attention à se déplacer. Un espace épuré réduit ces demandes."},
      {"id": "e9mg7", "affirmation": "Se forcer à ignorer une distraction est aussi efficace que de la supprimer physiquement.", "reponse": "MYTHE", "explication": "Non ! Résister à une distraction consomme de l''énergie mentale. Supprimer physiquement (ranger le téléphone) est bien plus efficace."},
      {"id": "e9mg8", "affirmation": "Connaître ses propres distracteurs aide à choisir les bonnes stratégies.", "reponse": "VRAI", "explication": "Oui ! Les stratégies anti-distraction sont personnelles. Ce qui marche pour l''un ne marche pas forcément pour l''autre."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E9') m
ON CONFLICT DO NOTHING;

INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'vrai-mythe-memoire', 'Vrai ou Mythe ? — Les secrets de la mémoire', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "e0mg1", "affirmation": "Relire plusieurs fois un cours est la méthode la plus efficace pour le mémoriser.", "reponse": "MYTHE", "explication": "Non — la relecture passive crée une familiarité sans vraie mémorisation. S''auto-tester est bien plus efficace."},
      {"id": "e0mg2", "affirmation": "Dormir après avoir appris aide à consolider les informations.", "reponse": "VRAI", "explication": "Oui ! Pendant le sommeil, le cerveau consolide activement les apprentissages de la journée."},
      {"id": "e0mg3", "affirmation": "La mémoire de travail peut contenir une quantité illimitée d''informations.", "reponse": "MYTHE", "explication": "Non — la mémoire de travail est limitée (environ 7 éléments). Le chunking aide à compenser cette limite."},
      {"id": "e0mg4", "affirmation": "Réviser à intervalles croissants (espacé) est plus efficace que de tout réviser en une fois.", "reponse": "VRAI", "explication": "Oui ! La révision espacée est la méthode la plus validée scientifiquement pour la mémorisation durable."},
      {"id": "e0mg5", "affirmation": "Les histoires absurdes aident à mémoriser des listes.", "reponse": "VRAI", "explication": "Oui ! Le cerveau retient mieux ce qui est vivant, bizarre et connecté. Une histoire absurde crée des connexions mémorables."},
      {"id": "e0mg6", "affirmation": "Se tester soi-même (flashcards, questions) renforce moins la mémoire que relire.", "reponse": "MYTHE", "explication": "Non — l''auto-test est plus efficace. L''acte de récupérer l''information renforce la trace mémorielle bien plus que la lecture."},
      {"id": "e0mg7", "affirmation": "Les souvenirs chargés émotionnellement sont généralement mieux mémorisés.", "reponse": "VRAI", "explication": "Oui ! L''émotion renforce l''encodage mémoriel. C''est pourquoi apprendre en faisant (et en ressentant) est si efficace."},
      {"id": "e0mg8", "affirmation": "Bachoter la veille d''un examen est une bonne stratégie de révision.", "reponse": "MYTHE", "explication": "Non — le bachotage est efficace à très court terme mais disparaît vite. La révision espacée est bien plus durable."}
    ]
  }'::jsonb
FROM (SELECT id FROM public.modules WHERE code = 'E10') m
ON CONFLICT DO NOTHING;
