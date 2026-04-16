-- ─────────────────────────────────────────────────────────────────────────
-- Seed quiz M4–M8 + mini-jeux M2–M8
-- À exécuter APRÈS seed_modules.sql
-- ─────────────────────────────────────────────────────────────────────────

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M4 — Aménager le quotidien et l'environnement
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M4')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b4010000-0000-0000-0000-000000000001'::uuid, 'Pourquoi les routines visuelles sont-elles particulièrement efficaces pour les enfants neurodivergents ?', 1),
  ('b4020000-0000-0000-0000-000000000002'::uuid, 'Un enfant TDAH a du mal à terminer ses devoirs chaque soir. Quelle intervention environnementale est la plus pertinente ?', 2),
  ('b4030000-0000-0000-0000-000000000003'::uuid, 'Qu''est-ce que la "charge cognitive" et pourquoi est-elle importante à gérer dans l''environnement de l''enfant ?', 3),
  ('b4040000-0000-0000-0000-000000000004'::uuid, 'Une transition difficile (ex : fin d''écran, départ pour l''école) peut être améliorée en :', 4),
  ('b4050000-0000-0000-0000-000000000005'::uuid, 'Le bruit de fond dans l''espace de travail d''un enfant hypersensible au son :', 5),
  ('b4060000-0000-0000-0000-000000000006'::uuid, 'Pourquoi fractionner les tâches en petits blocs est-il efficace pour les profils TDAH/DYS ?', 6),
  ('b4070000-0000-0000-0000-000000000007'::uuid, 'Un enfant dyspraxique a du mal à s''organiser dans son cartable. La meilleure adaptation est :', 7),
  ('b4080000-0000-0000-0000-000000000008'::uuid, 'La "zone de retrait" dans la maison sert à :', 8),
  ('b4090000-0000-0000-0000-000000000009'::uuid, 'Concernant les devoirs, quelle approche est la plus adaptée à un enfant en surcharge post-école ?', 9),
  ('b40a0000-0000-0000-0000-00000000000a'::uuid, 'Adapter l''environnement en prévention plutôt qu''en réaction signifie :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4010000-0000-0000-0000-000000000001', 'Parce qu''elles dispensent les parents de donner des instructions verbales', false, 1, NULL, 'Les routines visuelles ne remplacent pas la relation — elles réduisent la dépendance à la mémoire de travail.'),
('b4010000-0000-0000-0000-000000000001', 'Parce qu''elles externalisent la mémoire de travail et réduisent la charge cognitive', true, 2, 'La mémoire de travail est souvent déficitaire dans les profils TDAH et DYS. Un planning visuel permet à l''enfant de suivre les étapes sans avoir à tout retenir mentalement — libérant de l''énergie pour la tâche elle-même.', NULL),
('b4010000-0000-0000-0000-000000000001', 'Parce qu''elles sont plus faciles à créer que les instructions orales', false, 3, NULL, 'La facilité de création n''est pas le critère — c''est l''effet neurologique de l''externalisation de la mémoire.'),
('b4010000-0000-0000-0000-000000000001', 'Parce que les enfants neurodivergents apprennent mieux en lisant', false, 4, NULL, 'Les routines visuelles fonctionnent avec des images ou pictogrammes — elles ne dépendent pas des compétences de lecture.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4020000-0000-0000-0000-000000000002', 'Augmenter le temps de devoirs pour rattraper le retard', false, 1, NULL, 'Augmenter la durée aggrave la surcharge et renforce l''aversion pour les devoirs.'),
('b4020000-0000-0000-0000-000000000002', 'Créer un espace dédié, une heure fixe et des blocs de 15-20 minutes avec pauses', true, 2, 'Un espace invariant réduit les décisions à prendre avant de commencer. Une heure fixe crée un automatisme. Les blocs courts correspondent à la capacité d''attention soutenue du profil TDAH — qui n''est pas absente, mais brève.', NULL),
('b4020000-0000-0000-0000-000000000002', 'Faire les devoirs uniquement quand l''enfant le demande', false, 3, NULL, 'Laisser l''initiative à l''enfant seul peut fonctionner pour certains profils, mais ce n''est pas l''adaptation structurelle la plus efficace.'),
('b4020000-0000-0000-0000-000000000002', 'Supprimer les devoirs jusqu''à consultation médicale', false, 4, NULL, 'Une consultation peut être utile, mais en attendant, adapter l''environnement produit des effets immédiats.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4030000-0000-0000-0000-000000000003', 'La tendance de l''enfant à trop penser pendant les cours', false, 1, NULL, 'La charge cognitive est un concept neuropsychologique précis — pas un jugement sur le comportement.'),
('b4030000-0000-0000-0000-000000000003', 'La quantité de ressources mentales utilisées pour traiter l''information — limitée et épuisable', true, 2, 'Quand la charge cognitive dépasse la capacité disponible (bruit, consignes complexes, transitions), l''apprentissage s''arrête. Réduire les frictions environnementales libère de la capacité pour ce qui compte.', NULL),
('b4030000-0000-0000-0000-000000000003', 'La quantité de devoirs donnés par l''école chaque soir', false, 3, NULL, 'La charge scolaire peut contribuer à la charge cognitive, mais ce ne sont pas des synonymes.'),
('b4030000-0000-0000-0000-000000000003', 'La fatigue physique accumulée pendant la journée', false, 4, NULL, 'La fatigue physique et la charge cognitive sont liées mais distinctes — l''une est corporelle, l''autre est neurologique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4040000-0000-0000-0000-000000000004', 'Donnant un ultimatum clair 2 minutes avant', false, 1, NULL, 'L''ultimatum crée une pression qui augmente la résistance — surtout pour les profils rigides ou anxieux.'),
('b4040000-0000-0000-0000-000000000004', 'Annonçant la transition plusieurs minutes à l''avance avec un signal visuel ou sonore', true, 2, 'Le cerveau de l''enfant neurodivergent ne passe pas facilement d''un mode à l''autre. Un préavis — "dans 5 minutes on arrête" — permet une préparation cognitive. Le minuteur visuel externalise le temps qui passe de façon concrète.', NULL),
('b4040000-0000-0000-0000-000000000004', 'Supprimant l''activité qui précède la transition difficile', false, 3, NULL, 'Supprimer l''activité ne résout pas le problème de transition — et prive l''enfant d''un moment potentiellement régulateur.'),
('b4040000-0000-0000-0000-000000000004', 'Ignorant la résistance pour habituer l''enfant aux transitions', false, 4, NULL, 'L''extinction (ignorer) n''est pas efficace sur les comportements liés à une difficulté neurologique — elle augmente souvent la détresse.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4050000-0000-0000-0000-000000000005', 'N''a pas d''impact réel sur les performances si l''enfant y est habitué', false, 1, NULL, 'L''habituation ne neutralise pas l''impact neurologique du bruit sur le traitement de l''information.'),
('b4050000-0000-0000-0000-000000000005', 'Peut significativement réduire les capacités de concentration et augmenter la fatigue cognitive', true, 2, 'Les enfants hypersensibles au son ne filtrent pas les bruits de fond comme les enfants neurotypiques. Chaque son entre dans leur traitement attentionnel, consommant des ressources disponibles pour l''apprentissage. Casque antibruit, pièce calme ou musique blanche sont des adaptations validées.', NULL),
('b4050000-0000-0000-0000-000000000005', 'Peut aider la concentration en donnant un rythme de fond', false, 3, NULL, 'Certains enfants fonctionnent mieux avec un fond sonore léger, mais pour un enfant hypersensible au son, c''est généralement délétère.'),
('b4050000-0000-0000-0000-000000000005', 'N''est problématique que s''il dépasse 70 décibels', false, 4, NULL, 'Il n''y a pas de seuil universel — la sensibilité est individuelle et dépend du profil neurologique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4060000-0000-0000-0000-000000000006', 'Parce que les petits blocs sont moins fatigants physiquement', false, 1, NULL, 'La fatigue physique est un facteur, mais l''effet principal est neurologique.'),
('b4060000-0000-0000-0000-000000000006', 'Parce que chaque bloc complété donne un signal de réussite et relance la dopamine', true, 2, 'Les profils TDAH ont un système dopaminergique différent — difficile à activer sur des tâches longues et monotones. Chaque petit objectif atteint crée une microdécharge de dopamine qui maintient l''engagement. Le fractionnement transforme une longue tâche en suite de petites victoires.', NULL),
('b4060000-0000-0000-0000-000000000006', 'Parce que les enfants DYS lisent mieux en petites quantités', false, 3, NULL, 'Le fractionnement n''est pas spécifique à la lecture — il s''applique à toutes les tâches cognitives demandant attention soutenue.'),
('b4060000-0000-0000-0000-000000000006', 'Parce que cela permet à l''enseignant de mieux évaluer l''enfant', false, 4, NULL, 'Le fractionnement sert l''enfant — pas l''évaluation de l''enseignant.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4070000-0000-0000-0000-000000000007', 'Le punir quand il oublie ses affaires', false, 1, NULL, 'La dyspraxie affecte les fonctions exécutives — punir un déficit neurologique ne le corrige pas.'),
('b4070000-0000-0000-0000-000000000007', 'Créer un système de code couleur par matière et une liste de contrôle plastifiée', true, 2, 'Les systèmes visuels externalisent les séquences organisationnelles que le cerveau dyspraxique a du mal à automatiser. Une liste de contrôle plastifiée à cocher chaque soir transforme un processus cognitif complexe en routine motrice simple.', NULL),
('b4070000-0000-0000-0000-000000000007', 'Lui acheter un cartable plus grand avec plus de rangements', false, 3, NULL, 'Plus d''espace sans système d''organisation aggrave souvent le désordre pour un enfant dyspraxique.'),
('b4070000-0000-0000-0000-000000000007', 'Préparer le cartable à sa place jusqu''à ses 12 ans', false, 4, NULL, 'Faire à la place de l''enfant empêche le développement de l''autonomie — l''objectif est de lui fournir des outils, pas de compenser indéfiniment.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4080000-0000-0000-0000-000000000008', 'Isoler l''enfant comme punition pendant les crises', false, 1, NULL, 'La zone de retrait n''est pas une punition — la confondre avec l''isolement punitif est contre-productif.'),
('b4080000-0000-0000-0000-000000000008', 'Offrir un espace sécurisé pour se réguler volontairement quand la surcharge approche', true, 2, 'La zone de retrait est un outil de régulation proactive — pas une conséquence. L''enfant y va (idéalement) avant la crise, de façon volontaire. Elle doit être accessible, confortable, et associée à la sécurité plutôt qu''à la punition.', NULL),
('b4080000-0000-0000-0000-000000000008', 'Remplacer la chambre de l''enfant pour les nuits difficiles', false, 3, NULL, 'La zone de retrait est distincte de la chambre — elle sert à la régulation diurne, pas au sommeil.'),
('b4080000-0000-0000-0000-000000000008', 'Permettre à l''enfant de faire ce qu''il veut sans supervision', false, 4, NULL, 'La zone de retrait est structurée avec des outils de régulation — ce n''est pas un espace sans règles.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b4090000-0000-0000-0000-000000000009', 'Imposer les devoirs immédiatement au retour de l''école pendant que c''est frais', false, 1, NULL, 'Un enfant en surcharge post-école est neurologiquement incapable d''apprendre efficacement — forcer les devoirs à ce moment produit conflits et inefficacité.'),
('b4090000-0000-0000-0000-000000000009', 'Prévoir un temps de décompression de 20-30 minutes avant toute activité scolaire', true, 2, 'Après une journée de contrôle émotionnel et cognitif intense, le cerveau doit se "réinitialiser". Un temps libre non structuré (snack, jeu, mouvement) permet au cortex préfrontal de récupérer avant une nouvelle demande d''effort.', NULL),
('b4090000-0000-0000-0000-000000000009', 'Supprimer les devoirs le soir et les faire le matin avant l''école', false, 3, NULL, 'Décaler peut aider dans certains cas, mais l''adaptation principale concerne le temps de récupération — pas l''horaire.'),
('b4090000-0000-0000-0000-000000000009', 'Laisser l''enfant décider seul du moment pour les devoirs', false, 4, NULL, 'L''autonomie totale peut fonctionner pour certains adolescents matures — mais sans structure, beaucoup de profils TDAH repoussent indéfiniment.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b40a0000-0000-0000-0000-00000000000a', 'Modifier l''espace uniquement après une crise pour éviter qu''elle se reproduise', false, 1, NULL, 'Agir uniquement après la crise, c''est toujours en réaction — l''adaptation préventive anticipe avant la surcharge.'),
('b40a0000-0000-0000-0000-00000000000a', 'Identifier les contextes à risque et les modifier avant qu''ils déclenchent une surcharge', true, 2, 'Un parent qui connaît le profil de son enfant peut anticiper : "le vendredi soir après une semaine chargée, il est à bout" → prévoir repas simple, pas de devoirs, temps libre. La prévention réduit la fréquence et l''intensité des crises.', NULL),
('b40a0000-0000-0000-0000-00000000000a', 'Surveiller en permanence l''enfant pour intervenir dès les premiers signes', false, 3, NULL, 'La surveillance constante est épuisante et peut créer une dépendance. L''objectif est de construire un environnement stable, pas de surveiller.'),
('b40a0000-0000-0000-0000-00000000000a', 'Expliquer à l''enfant les règles environnementales pour qu''il s''adapte lui-même', false, 4, NULL, 'L''explication verbale seule est insuffisante — l''enfant doit être soutenu par des structures concrètes, pas seulement informé.');

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M5 — Collaborer avec l'école et l'équipe pédagogique
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M5')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b5010000-0000-0000-0000-000000000001'::uuid, 'Quelle est la différence principale entre un PAP et un PPS ?', 1),
  ('b5020000-0000-0000-0000-000000000002'::uuid, 'Lors d''un entretien avec l''école, la stratégie la plus efficace pour un parent est :', 2),
  ('b5030000-0000-0000-0000-000000000003'::uuid, 'Quand un enseignant dit "votre enfant pourrait faire mieux s''il se concentrait", la réponse la plus constructive est :', 3),
  ('b5040000-0000-0000-0000-000000000004'::uuid, 'Qu''est-ce que le PPRE et dans quel cas est-il mis en place ?', 4),
  ('b5050000-0000-0000-0000-000000000005'::uuid, 'Pour qu''un aménagement scolaire soit efficace, il doit être :', 5),
  ('b5060000-0000-0000-0000-000000000006'::uuid, 'Pourquoi vaut-il mieux éviter d''utiliser uniquement le diagnostic médical comme argument à l''école ?', 6),
  ('b5070000-0000-0000-0000-000000000007'::uuid, 'Si l''école refuse de mettre en place des aménagements malgré un diagnostic reconnu, le parent peut :', 7),
  ('b5080000-0000-0000-0000-000000000008'::uuid, 'Communiquer "sans se défendre" dans un contexte scolaire signifie :', 8),
  ('b5090000-0000-0000-0000-000000000009'::uuid, 'L''implication de l''enfant dans les réunions scolaires (selon son âge) permet de :', 9),
  ('b50a0000-0000-0000-0000-00000000000a'::uuid, 'Tenir un dossier de suivi des échanges avec l''école est utile parce que :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5010000-0000-0000-0000-000000000001', 'Le PAP est pour les élèves en difficulté scolaire générale, le PPS pour les troubles du comportement', false, 1, NULL, 'Cette distinction est incorrecte — les deux dispositifs ont des critères précis différents.'),
('b5010000-0000-0000-0000-000000000001', 'Le PAP est mis en place par l''école pour les troubles dys, le PPS implique la MDPH pour les situations de handicap reconnues', true, 2, 'Le PAP (Plan d''Accompagnement Personnalisé) est accessible sans passage MDPH pour les troubles des apprentissages (dys). Le PPS (Projet Personnalisé de Scolarisation) nécessite une reconnaissance MDPH et ouvre à plus d''aménagements — y compris l''AVS/AESH.', NULL),
('b5010000-0000-0000-0000-000000000001', 'Le PPS est réservé aux enfants en établissement spécialisé', false, 3, NULL, 'Le PPS peut concerner des enfants scolarisés en milieu ordinaire — il n''est pas réservé aux établissements spécialisés.'),
('b5010000-0000-0000-0000-000000000001', 'Le PAP est temporaire, le PPS est définitif', false, 4, NULL, 'Les deux dispositifs sont révisables — le PPS est réexaminé régulièrement par la MDPH.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5020000-0000-0000-0000-000000000002', 'Défendre énergiquement son enfant face aux enseignants pour lui montrer qu''on le soutient', false, 1, NULL, 'La défense agressive ferme le dialogue et positionne le parent en adversaire — ce qui nuit à la collaboration long terme.'),
('b5020000-0000-0000-0000-000000000002', 'Arriver avec des observations concrètes, des demandes précises, et une posture de collaboration', true, 2, 'Un parent préparé avec des faits (pas des ressentis), des demandes actionnables (pas des plaintes) et une posture d''allié obtient beaucoup plus que celui qui arrive en position de conflit. L''enseignant doit repartir avec une liste claire de ce qui est demandé.', NULL),
('b5020000-0000-0000-0000-000000000002', 'Laisser parler l''enseignant et ne pas contredire pour maintenir la relation', false, 3, NULL, 'L''écoute est importante, mais ne pas exprimer ses observations prive l''enseignant d''informations cruciales sur l''enfant à la maison.'),
('b5020000-0000-0000-0000-000000000002', 'Apporter tous les documents médicaux pour prouver que son enfant a bien un trouble', false, 4, NULL, 'Les documents médicaux sont un support, pas un argument en soi — l''enseignant a besoin de comprendre les besoins concrets, pas seulement le diagnostic.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5030000-0000-0000-0000-000000000003', 'Expliquer que l''enfant est diagnostiqué et qu''il ne peut pas se concentrer', false, 1, NULL, 'Mentionner le diagnostic sans expliquer les mécanismes ne change pas la compréhension de l''enseignant.'),
('b5030000-0000-0000-0000-000000000003', 'Partager une observation concrète sur ce qui aide et demander ce qui fonctionne en classe', true, 2, 'Transformer une remarque en invitation à la co-construction : "À la maison, il se concentre mieux quand la tâche est fractionnée. Est-ce que c''est quelque chose qu''on pourrait tester en classe ?" positionne le parent comme ressource, pas comme contradicteur.', NULL),
('b5030000-0000-0000-0000-000000000003', 'Demander un rapport écrit sur les observations de l''enseignant', false, 3, NULL, 'Demander un rapport en réponse à un commentaire informel peut sembler défensif ou menaçant.'),
('b5030000-0000-0000-0000-000000000003', 'Contacter le directeur pour signaler un manque de compréhension', false, 4, NULL, 'Escalader immédiatement détruit la relation avec l''enseignant — c''est une stratégie de dernier recours, pas de première réponse.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5040000-0000-0000-0000-000000000004', 'Un programme personnalisé de réussite éducative, mis en place par l''école pour des élèves en fragilité scolaire', true, 1, 'Le PPRE est un dispositif interne à l''école, mis en place sans passage MDPH, pour des élèves qui risquent de ne pas maîtriser les compétences du socle commun. Il est plus souple que le PAP ou le PPS — mais aussi moins contraignant pour l''école.', NULL),
('b5040000-0000-0000-0000-000000000004', 'Un projet médical financé par la sécurité sociale pour les enfants neurodivergents', false, 2, NULL, 'Le PPRE est un dispositif éducatif — il ne relève pas du médical ni de la sécurité sociale.'),
('b5040000-0000-0000-0000-000000000004', 'Un programme proposé uniquement en collège pour les élèves décrocheurs', false, 3, NULL, 'Le PPRE concerne les cycles 2, 3 et le collège — il n''est pas réservé au décrochage scolaire.'),
('b5040000-0000-0000-0000-000000000004', 'Un plan de soutien financé par les parents pour des cours particuliers', false, 4, NULL, 'Le PPRE est un dispositif public interne à l''école nationale — il ne nécessite pas de financement parental.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5050000-0000-0000-0000-000000000005', 'Permanent et appliqué de façon identique toute l''année', false, 1, NULL, 'Un aménagement figé peut devenir inadapté si l''enfant progresse ou si le contexte change.'),
('b5050000-0000-0000-0000-000000000005', 'Connu de tous les intervenants, suivi régulièrement et ajusté si nécessaire', true, 2, 'Un aménagement efficace est connu de chaque enseignant (pas seulement le titulaire), suivi avec un point de contrôle régulier, et révisé si l''enfant évolue. Un aménagement que personne n''applique réellement ne sert à rien.', NULL),
('b5050000-0000-0000-0000-000000000005', 'Discret pour ne pas stigmatiser l''enfant devant ses camarades', false, 3, NULL, 'La discrétion peut être une valeur en soi, mais elle ne garantit pas l''efficacité — un aménagement non appliqué parce qu''il est "discret" est un aménagement perdu.'),
('b5050000-0000-0000-0000-000000000005', 'Décidé unilatéralement par le médecin scolaire', false, 4, NULL, 'Le médecin scolaire est un acteur parmi d''autres — les aménagements sont co-construits avec l''équipe pédagogique, les parents et parfois l''enfant.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5060000-0000-0000-0000-000000000006', 'Parce que les enseignants n''ont pas accès aux données médicales', false, 1, NULL, 'La confidentialité médicale est réelle, mais ce n''est pas la raison principale d''éviter le seul argument du diagnostic.'),
('b5060000-0000-0000-0000-000000000006', 'Parce que le diagnostic seul ne dit pas à l''enseignant quoi faire concrètement en classe', true, 2, '"Mon enfant est TDAH" n''aide pas l''enseignant à changer sa pratique. "Il a besoin d''instructions orales répétées et d''un bureau sans distraction visuelle" est actionnable. Les besoins concrets sont plus utiles que l''étiquette diagnostique.', NULL),
('b5060000-0000-0000-0000-000000000006', 'Parce que les diagnostics peuvent être contestés par l''école', false, 3, NULL, 'Un diagnostic officiel est rarement contesté — mais il peut être mal interprété ou mal utilisé.'),
('b5060000-0000-0000-0000-000000000006', 'Parce que cela peut mettre l''enfant dans une catégorie négative', false, 4, NULL, 'La stigmatisation est un risque réel, mais la raison principale d''aller au-delà du diagnostic est son manque d''opérationnalité pour l''enseignant.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5070000-0000-0000-0000-000000000007', 'Retirer l''enfant de l''école immédiatement', false, 1, NULL, 'Retirer l''enfant n''est pas une stratégie — c''est une conséquence extreme qui prive l''enfant de son droit à la scolarisation.'),
('b5070000-0000-0000-0000-000000000007', 'Contacter l''inspecteur de circonscription ou l''IEN, et si nécessaire la MDPH ou le DASEN', true, 2, 'Il existe une hiérarchie d''escalade : directeur → inspecteur de circonscription (IEN) → DASEN → Tribunal administratif. La MDPH peut notifier des droits opposables. Le parent qui connaît ces voies de recours est beaucoup plus efficace.', NULL),
('b5070000-0000-0000-0000-000000000007', 'Accepter la décision de l''école qui est l''autorité compétente', false, 3, NULL, 'L''école n''est pas souveraine — elle est soumise aux obligations légales en matière d''inclusion scolaire. Le refus d''aménagements justifiés peut être contesté.'),
('b5070000-0000-0000-0000-000000000007', 'Organiser une pétition parmi les autres parents', false, 4, NULL, 'Une pétition ne change pas les obligations légales de l''école et peut détériorer les relations.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5080000-0000-0000-0000-000000000008', 'Ne jamais critiquer les pratiques des enseignants', false, 1, NULL, 'Il ne s''agit pas d''éviter toute critique, mais de formuler les observations de façon non défensive.'),
('b5080000-0000-0000-0000-000000000008', 'Formuler ses observations à la première personne et ses demandes de façon positive et précise', true, 2, '"J''observe que depuis le changement de classe, il rentre plus épuisé" est moins défensif que "Votre organisation le détruit". La communication non défensive préserve la relation tout en transmettant l''information.', NULL),
('b5080000-0000-0000-0000-000000000008', 'Valider systématiquement les observations de l''enseignant avant de parler', false, 3, NULL, 'La validation peut aider, mais elle ne doit pas empêcher le parent d''exprimer ses propres observations.'),
('b5080000-0000-0000-0000-000000000008', 'Éviter les sujets qui pourraient créer des tensions', false, 4, NULL, 'Éviter les sujets difficiles laisse des problèmes non résolus — la communication non défensive permet d''aborder les sujets sensibles sans créer de conflit.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b5090000-0000-0000-0000-000000000009', 'Réduire la durée des réunions en faisant parler l''enfant à sa place', false, 1, NULL, 'L''implication de l''enfant ne vise pas à accélérer les réunions.'),
('b5090000-0000-0000-0000-000000000009', 'Renforcer son sentiment d''agentivité et sa compréhension de ses propres besoins', true, 2, 'Un enfant qui comprend pourquoi des aménagements sont mis en place pour lui peut les utiliser, les défendre, et développer son autonomie. À partir d''un certain âge, savoir nommer ses besoins est une compétence de vie essentielle.', NULL),
('b5090000-0000-0000-0000-000000000009', 'Permettre à l''enseignant de voir que l''enfant va bien', false, 3, NULL, 'Ce n''est pas l''objectif principal — l''enseignant a ses propres observations en classe.'),
('b5090000-0000-0000-0000-000000000009', 'Éviter que l''enfant pense que ses parents se battent pour lui', false, 4, NULL, 'L''implication sert au développement de l''enfant, pas à masquer la démarche parentale.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b50a0000-0000-0000-0000-00000000000a', 'Cela permet de comparer les résultats scolaires d''une année à l''autre', false, 1, NULL, 'Le dossier de suivi n''est pas un bulletin scolaire — il documente les interactions et engagements.'),
('b50a0000-0000-0000-0000-00000000000a', 'Cela permet de suivre les engagements pris et de disposer d''une trace en cas de litige', true, 2, 'Un email confirmant un accord verbal, un compte-rendu de réunion, une liste des aménagements convenus : ces traces protègent l''enfant et le parent en cas de changement d''enseignant, de conflit ou de procédure administrative.', NULL),
('b50a0000-0000-0000-0000-00000000000a', 'Cela montre à l''école que le parent est très impliqué', false, 3, NULL, 'L''implication perçue est un effet secondaire, pas l''objectif du dossier de suivi.'),
('b50a0000-0000-0000-0000-00000000000a', 'Cela est obligatoire pour ouvrir un PAP', false, 4, NULL, 'Le dossier de suivi n''est pas une condition formelle au PAP — c''est une pratique recommandée pour le parent.');

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M6 — Accompagner la régulation émotionnelle
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M6')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b6010000-0000-0000-0000-000000000001'::uuid, 'Pourquoi les enfants neurodivergents ont-ils souvent un développement émotionnel décalé ?', 1),
  ('b6020000-0000-0000-0000-000000000002'::uuid, 'Durant une crise émotionnelle intense, la priorité absolue est de :', 2),
  ('b6030000-0000-0000-0000-000000000003'::uuid, 'La "co-régulation" fonctionne parce que :', 3),
  ('b6040000-0000-0000-0000-000000000004'::uuid, 'Enseigner le vocabulaire émotionnel à un enfant est important pour la régulation parce que :', 4),
  ('b6050000-0000-0000-0000-000000000005'::uuid, 'Après une crise, le meilleur moment pour "tirer les leçons" est :', 5),
  ('b6060000-0000-0000-0000-000000000006'::uuid, 'Un enfant qui dit "je ne ressens rien" pendant ou après une crise :', 6),
  ('b6070000-0000-0000-0000-000000000007'::uuid, 'Les stratégies de régulation sensorielle (serrer un objet, se balancer) sont utiles parce que :', 7),
  ('b6080000-0000-0000-0000-000000000008'::uuid, 'L''estime de soi d''un enfant neurodivergent est le plus efficacement construite quand :', 8),
  ('b6090000-0000-0000-0000-000000000009'::uuid, 'Un plan de crise familial efficace doit contenir :', 9),
  ('b60a0000-0000-0000-0000-00000000000a'::uuid, 'Quand un parent est lui-même en surcharge émotionnelle, la première chose à faire est :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6010000-0000-0000-0000-000000000001', 'Parce qu''ils sont moins intelligents émotionnellement', false, 1, NULL, 'Il n''y a pas de déficit d''intelligence émotionnelle — c''est le développement des fonctions exécutives émotionnelles qui est décalé.'),
('b6010000-0000-0000-0000-000000000001', 'Parce que la maturation du cortex préfrontal (régulation) est souvent plus lente dans ces profils', true, 2, 'Le cortex préfrontal — siège de la régulation émotionnelle — mature plus lentement chez beaucoup d''enfants neurodivergents. Un enfant TDAH de 10 ans peut avoir un profil de régulation comparable à un enfant neurotypique de 7 ans. Ce n''est pas de la mauvaise volonté.', NULL),
('b6010000-0000-0000-0000-000000000001', 'Parce qu''ils ont subi plus de traumatismes', false, 3, NULL, 'Certains enfants neurodivergents ont vécu des traumatismes, mais le décalage émotionnel est neurologique, pas systématiquement lié à des événements.'),
('b6010000-0000-0000-0000-000000000001', 'Parce que leurs parents gèrent moins bien leurs propres émotions', false, 4, NULL, 'Le modèle parental influence la régulation, mais le décalage de développement est neurologique — pas la conséquence du comportement parental.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6020000-0000-0000-0000-000000000002', 'Expliquer calmement pourquoi le comportement est inacceptable', false, 1, NULL, 'Pendant une crise intense, le cortex préfrontal est hors ligne — l''enfant ne peut pas traiter une explication logique.'),
('b6020000-0000-0000-0000-000000000002', 'Sécuriser physiquement et émotionnellement — les explications viennent après le retour au calme', true, 2, 'En état de crise intense (amygdale activée), le cerveau ne peut pas apprendre, raisonner ou négocier. La priorité est de réduire l''activation — présence calme, voix basse, espace sécurisé. Les explications et conséquences n''ont de sens qu''une fois l''enfant régulé.', NULL),
('b6020000-0000-0000-0000-000000000002', 'Laisser l''enfant seul jusqu''à ce qu''il se calme', false, 3, NULL, 'L''isolement peut aider certains enfants à certaines conditions — mais "laisser seul" sans soutien n''est pas une stratégie de co-régulation.'),
('b6020000-0000-0000-0000-000000000002', 'Appliquer immédiatement la conséquence prévue au comportement', false, 4, NULL, 'Appliquer une conséquence pendant la crise n''est pas mémorisée comme un apprentissage — elle est vécue comme une agression supplémentaire.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6030000-0000-0000-0000-000000000003', 'Les enfants aiment imiter leurs parents', false, 1, NULL, 'L''imitation volontaire est différente de la régulation par co-régulation — qui est un mécanisme neurologique.'),
('b6030000-0000-0000-0000-000000000003', 'Les systèmes nerveux sont biologiquement conçus pour se synchroniser entre eux (neurones miroirs)', true, 2, 'La co-régulation repose sur les neurones miroirs et la régulation vagale. Un parent qui reste calme (respiration lente, ton posé, corps détendu) envoie des signaux de sécurité que le système nerveux de l''enfant capte et tente de synchroniser. C''est biologique, pas uniquement psychologique.', NULL),
('b6030000-0000-0000-0000-000000000003', 'Les parents ont plus d''autorité que les enfants', false, 3, NULL, 'L''autorité n''est pas le mécanisme en jeu — c''est la régulation neurobiologique par présence.'),
('b6030000-0000-0000-0000-000000000003', 'Les enfants ont peur des conséquences quand le parent reste calme', false, 4, NULL, 'La peur n''est pas le mécanisme de la co-régulation — c''est la synchronisation du système nerveux.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6040000-0000-0000-0000-000000000004', 'Cela permet à l''enfant d''avoir un meilleur vocabulaire à l''école', false, 1, NULL, 'Le vocabulaire scolaire est un bénéfice secondaire — l''impact principal est sur la régulation elle-même.'),
('b6040000-0000-0000-0000-000000000004', 'Nommer une émotion active le cortex préfrontal et réduit l''activation de l''amygdale', true, 2, 'Le "labeling" émotionnel — mettre des mots sur ce qu''on ressent — a été montré en neuroimagerie comme réduisant l''activité amygdalienne. Dire "je suis furieux" au lieu de frapper active le langage (frontal) plutôt que l''action impulsive (subcortical).', NULL),
('b6040000-0000-0000-0000-000000000004', 'Les enfants qui connaissent les émotions en ressentent moins', false, 3, NULL, 'La connaissance des émotions ne les atténue pas — elle donne des outils pour les réguler.'),
('b6040000-0000-0000-0000-000000000004', 'Cela permet aux parents de mieux expliquer les règles émotionnelles', false, 4, NULL, 'L''enjeu du vocabulaire émotionnel est d''abord pour l''enfant — pas pour la capacité d''explication parentale.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6050000-0000-0000-0000-000000000005', 'Pendant la crise, quand l''impact est maximal', false, 1, NULL, 'Pendant la crise, le cortex préfrontal est hors ligne — aucun apprentissage n''est possible à ce moment.'),
('b6050000-0000-0000-0000-000000000005', 'Bien après la crise, dans un moment calme et de connexion', true, 2, 'La règle des "deux fois le temps de la crise" avant de reparler est une heuristique utile. L''enfant a besoin de revenir à un état de sécurité complète avant de pouvoir réfléchir, comprendre et intégrer. La connexion émotionnelle vient avant la correction.', NULL),
('b6050000-0000-0000-0000-000000000005', 'Immédiatement après le retour au calme, pendant que c''est frais', false, 3, NULL, 'Juste après le retour au calme, l''enfant est encore en récupération — il peut sembler calme mais n''est pas prêt pour la réflexion.'),
('b6050000-0000-0000-0000-000000000005', 'Le lendemain matin, une fois la nuit passée', false, 4, NULL, 'Un délai peut être utile, mais l''essentiel est que le moment soit calme, connecté et non chargé émotionnellement — pas qu''il y ait un délai fixe.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6060000-0000-0000-0000-000000000006', 'Est probablement en train de mentir pour éviter une punition', false, 1, NULL, 'Interpréter comme un mensonge peut déclencher une escalade inutile — et cette interprétation est souvent fausse.'),
('b6060000-0000-0000-0000-000000000006', 'Peut avoir un accès limité à ses propres états internes (alexithymie) ou être encore en surcharge', true, 2, 'L''alexithymie (difficulté à identifier et nommer ses émotions) est fréquente dans les profils neurodivergents. "Je ne ressens rien" peut être une réponse honnête — l''enfant n''a pas accès conscient à son état interne à ce moment. Ce n''est pas de la mauvaise foi.', NULL),
('b6060000-0000-0000-0000-000000000006', 'A besoin de plus de punitions pour développer sa sensibilité émotionnelle', false, 3, NULL, 'Les punitions n''augmentent pas l''accès aux émotions internes — elles ajoutent une couche de honte ou de peur.'),
('b6060000-0000-0000-0000-000000000006', 'N''a pas eu suffisamment de modèles émotionnels de la part de ses parents', false, 4, NULL, 'Le modèle parental influence le développement émotionnel, mais l''alexithymie a des bases neurologiques qui vont au-delà du modèle reçu.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6070000-0000-0000-0000-000000000007', 'Elles distraient l''enfant de ses émotions', false, 1, NULL, 'La distraction peut parfois aider, mais le mécanisme des stratégies sensorielles est plus fondamental.'),
('b6070000-0000-0000-0000-000000000007', 'Elles activent le système nerveux parasympathique via des entrées proprioceptives et tactiles', true, 2, 'La pression proprioceptive (serrer, se comprimer), le mouvement vestibulaire (se balancer) et le toucher tactile activent le nerf vague et stimulent la réponse parasympathique — le frein du système nerveux. Ce sont des régulateurs physiologiques directs, pas des distractions.', NULL),
('b6070000-0000-0000-0000-000000000007', 'Elles permettent à l''enfant de s''occuper les mains pendant la crise', false, 3, NULL, 'S''occuper les mains est un effet, pas le mécanisme — l''effet réel est neurophysiologique.'),
('b6070000-0000-0000-0000-000000000007', 'Elles remplacent les comportements agressifs par des comportements acceptables', false, 4, NULL, 'La substitution comportementale est un bénéfice secondaire — le mécanisme primaire est la régulation du système nerveux autonome.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6080000-0000-0000-0000-000000000008', 'On valorise ses bons résultats scolaires', false, 1, NULL, 'La valorisation des résultats crée une estime conditionnelle — fragile dès que les résultats baissent.'),
('b6080000-0000-0000-0000-000000000008', 'On reconnaît ses efforts, sa singularité et on lui enseigne la narrative de ses propres forces', true, 2, 'Une estime de soi solide chez un enfant neurodivergent repose sur une narrative de soi cohérente : "Mon cerveau fonctionne différemment — voici ce que ça signifie, voici mes forces, voici ce qui est difficile." Cette narrative protège contre le narratif honteux que l''école ou les pairs peuvent imposer.', NULL),
('b6080000-0000-0000-0000-000000000008', 'On le compare favorablement à ses camarades', false, 3, NULL, 'La comparaison favorable crée une estime relative — qui s''effondre dès que la comparaison tourne.'),
('b6080000-0000-0000-0000-000000000008', 'On lui montre qu''il peut réussir comme tout le monde', false, 4, NULL, '"Comme tout le monde" est une cible qui invalide la neurodivergence — l''estime se construit sur son profil réel, pas sur une norme.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b6090000-0000-0000-0000-000000000009', 'Les règles de punition appliquées après chaque crise', false, 1, NULL, 'Un plan de crise n''est pas un plan de punition — il est centré sur la sécurité et la régulation.'),
('b6090000-0000-0000-0000-000000000009', 'Les signes avant-coureurs, les rôles de chacun, le kit de l''enfant et le protocole de reconnexion', true, 2, 'Un plan de crise efficace est préventif (signes avant-coureurs), structurel (qui fait quoi), outillé (kit de régulation) et relationnel (comment reconnecter après). Il doit être connu de tous les adultes réguliers de l''enfant — pas seulement des parents.', NULL),
('b6090000-0000-0000-0000-000000000009', 'Une liste de comportements interdits avec leurs conséquences', false, 3, NULL, 'Une liste de comportements interdits est un plan disciplinaire — pas un plan de crise centré sur la régulation.'),
('b6090000-0000-0000-0000-000000000009', 'Le numéro du pédopsychiatre à contacter en urgence', false, 4, NULL, 'Le contact professionnel peut faire partie du plan pour les cas extrêmes, mais l''essentiel du plan concerne la gestion quotidienne par la famille.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b60a0000-0000-0000-0000-00000000000a', 'Forcer la co-régulation malgré la surcharge pour ne pas abandonner l''enfant', false, 1, NULL, 'Un parent en surcharge ne peut pas co-réguler — il transmet sa désorganisation nerveuse à l''enfant.'),
('b60a0000-0000-0000-0000-00000000000a', 'Se réguler soi-même d''abord — une respiration, un pas de recul — avant de revenir vers l''enfant', true, 2, 'On ne peut pas verser d''un vase vide. Un parent qui tente de co-réguler en état de surcharge amplifie souvent la crise. Se réguler d''abord (respiration, sortir 30 secondes, boire de l''eau) n''est pas abandonner l''enfant — c''est devenir capable de l''aider.', NULL),
('b60a0000-0000-0000-0000-00000000000a', 'Demander à l''enfant de se calmer seul pendant que le parent récupère', false, 3, NULL, 'Demander à l''enfant de se réguler seul sans soutien n''est pas adapté si l''enfant est en surcharge — mais se réguler soi-même d''abord reste la priorité.'),
('b60a0000-0000-0000-0000-00000000000a', 'Appeler un professionnel immédiatement', false, 4, NULL, 'Un professionnel est une ressource long terme — dans l''urgence d''une crise, la régulation immédiate du parent est la première étape.');

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M7 — Prendre soin de soi en tant que parent accompagnant
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M7')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b7010000-0000-0000-0000-000000000001'::uuid, 'La "fatigue compassionnelle" chez un parent d''enfant neurodivergent se manifeste principalement par :', 1),
  ('b7020000-0000-0000-0000-000000000002'::uuid, 'Le "deuil de l''enfant imaginé" fait référence à :', 2),
  ('b7030000-0000-0000-0000-000000000003'::uuid, 'Pourquoi la culpabilité parentale est-elle particulièrement fréquente avec un enfant neurodivergent ?', 3),
  ('b7040000-0000-0000-0000-000000000004'::uuid, 'L''auto-compassion, contrairement à la complaisance, consiste à :', 4),
  ('b7050000-0000-0000-0000-000000000005'::uuid, 'Un parent qui s''isole progressivement de son réseau social :', 5),
  ('b7060000-0000-0000-0000-000000000006'::uuid, 'La charge mentale spécifique du parent d''enfant neurodivergent comprend notamment :', 6),
  ('b7070000-0000-0000-0000-000000000007'::uuid, 'Pourquoi rejoindre un groupe de parents d''enfants neurodivergents est-il bénéfique ?', 7),
  ('b7080000-0000-0000-0000-000000000008'::uuid, 'Un parent remarque qu''il réagit de plus en plus avec irritabilité à des situations qui ne le dérangeaient pas avant. Il s''agit probablement :', 8),
  ('b7090000-0000-0000-0000-000000000009'::uuid, 'L''accompagnement thérapeutique pour le parent lui-même (pas pour l''enfant) est :', 9),
  ('b70a0000-0000-0000-0000-00000000000a'::uuid, 'Demander de l''aide, que ce soit à son entourage ou à un professionnel :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7010000-0000-0000-0000-000000000001', 'Un manque d''amour pour son enfant', false, 1, NULL, 'La fatigue compassionnelle n''est pas un manque d''amour — c''est souvent la conséquence d''un amour sans ressource de récupération.'),
('b7010000-0000-0000-0000-000000000001', 'Un épuisement émotionnel et physique lié à l''effort continu de soutien et d''empathie', true, 2, 'La fatigue compassionnelle (ou épuisement de l''aidant) est une réponse physiologique au fait de porter continuellement la douleur de l''autre. Elle se manifeste par l''irritabilité, le désengagement émotionnel, les troubles du sommeil et un sentiment d''impuissance — pas par un manque d''amour.', NULL),
('b7010000-0000-0000-0000-000000000001', 'Une dépression clinique nécessitant un traitement immédiat', false, 3, NULL, 'La fatigue compassionnelle peut évoluer vers une dépression — mais ce sont deux états distincts, pas synonymes.'),
('b7010000-0000-0000-0000-000000000001', 'Un comportement égoïste à corriger', false, 4, NULL, 'Qualifier la fatigue compassionnelle d''égoïsme est une erreur courante et dangereuse — elle conduit à ignorer des signaux d''alarme importants.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7020000-0000-0000-0000-000000000002', 'Le fait que l''enfant soit décédé dans l''imagination parentale', false, 1, NULL, 'C''est une métaphore — pas un événement littéral.'),
('b7020000-0000-0000-0000-000000000002', 'Le processus de renoncement à l''image de l''enfant qu''on avait imaginé avant le diagnostic', true, 2, 'Avant le diagnostic, tout parent construit une image de son enfant à venir : ses facilités, son parcours, ses possibilités. Le diagnostic réorganise cette image. Faire le deuil de l''enfant imaginé n''est pas rejeter l''enfant réel — c''est libérer de la place pour l''aimer tel qu''il est.', NULL),
('b7020000-0000-0000-0000-000000000002', 'La peur que l''enfant ne devienne jamais autonome', false, 3, NULL, 'Cette peur peut coexister avec le deuil, mais le concept désigne un processus psychologique spécifique — pas une anxiété sur l''avenir.'),
('b7020000-0000-0000-0000-000000000002', 'La tristesse de ne pas avoir détecté le trouble plus tôt', false, 4, NULL, 'La culpabilité du retard de diagnostic est une réaction fréquente mais distincte du deuil de l''enfant imaginé.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7030000-0000-0000-0000-000000000003', 'Parce que les parents d''enfants neurodivergents font objectivement plus d''erreurs', false, 1, NULL, 'Ce n''est pas une question de fréquence d''erreurs — c''est la nature du contexte qui génère la culpabilité.'),
('b7030000-0000-0000-0000-000000000003', 'Parce que les difficultés de l''enfant sont souvent invisibles pour l''entourage, créant un sentiment d''incompréhension et d''échec parental', true, 2, 'Quand un enfant souffre mais paraît "normal" aux yeux de l''extérieur, les parents reçoivent des messages implicites (et parfois explicites) qu''ils font mal leur travail. La neurodivergence, souvent invisible, expose à des jugements qui alimentent la culpabilité.', NULL),
('b7030000-0000-0000-0000-000000000003', 'Parce que les parents neurodivergents eux-mêmes ont transmis le trouble', false, 3, NULL, 'La génétique peut jouer un rôle dans la neurodivergence, mais la culpabilité ne vient pas de la transmission biologique.'),
('b7030000-0000-0000-0000-000000000003', 'Parce que les spécialistes culpabilisent trop souvent les parents', false, 4, NULL, 'Certains professionnels peuvent contribuer à la culpabilité, mais la source principale est systémique — pas uniquement liée aux professionnels.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7040000-0000-0000-0000-000000000004', 'Se traiter avec la même bienveillance qu''on offrirait à un ami dans la même situation', true, 1, 'L''auto-compassion (Kristin Neff) a trois composantes : se traiter avec douceur plutôt que se juger, reconnaître que la souffrance fait partie de l''expérience humaine, et observer ses émotions sans les amplifier. Ce n''est pas se féliciter — c''est cesser de se punir pour être humain.', NULL),
('b7040000-0000-0000-0000-000000000004', 'S''accorder toutes les libertés sans contrainte', false, 2, NULL, 'L''auto-compassion n''est pas la permissivité envers soi-même — c''est une façon de se traiter avec justice et bienveillance.'),
('b7040000-0000-0000-0000-000000000004', 'Éviter de reconnaître ses erreurs pour se protéger émotionnellement', false, 3, NULL, 'L''auto-compassion n''est pas la déni — elle inclut la reconnaissance honnête des erreurs, sans auto-punition excessive.'),
('b7040000-0000-0000-0000-000000000004', 'Penser positivement à sa situation plutôt que de la voir telle qu''elle est', false, 4, NULL, 'L''auto-compassion est différente de la pensée positive — elle inclut la reconnaissance honnête de la difficulté.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7050000-0000-0000-0000-000000000005', 'Choisit délibérément de prioriser sa famille', false, 1, NULL, 'L''isolement progressif n''est généralement pas un choix délibéré — c''est un symptôme d''épuisement.'),
('b7050000-0000-0000-0000-000000000005', 'Montre souvent un signe d''épuisement et de honte — et risque d''aggraver sa situation', true, 2, 'L''isolement social est à la fois un symptôme de l''épuisement (plus d''énergie pour maintenir les liens) et un facteur aggravant. La honte ("ma vie familiale est un échec") pousse à cacher — ce qui prive le parent de soutien et de perspective extérieure.', NULL),
('b7050000-0000-0000-0000-000000000005', 'Protège son enfant des jugements extérieurs', false, 3, NULL, 'L''isolement peut sembler protecteur — mais il prive le parent du soutien dont il a besoin pour accompagner son enfant.'),
('b7050000-0000-0000-0000-000000000005', 'A besoin d''être confronté sur ses habitudes sociales', false, 4, NULL, 'Confronter un parent épuisé sur son isolement peut aggraver la honte — l''approche doit être bienveillante, pas confrontationnelle.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7060000-0000-0000-0000-000000000006', 'La gestion des devoirs scolaires chaque soir', false, 1, NULL, 'Les devoirs sont une composante, mais la charge mentale spécifique est plus large.'),
('b7060000-0000-0000-0000-000000000006', 'La veille continue, la coordination des intervenants, le plaidoyer et l''anticipation permanente', true, 2, 'La charge mentale du parent d''enfant neurodivergent inclut : surveiller les signaux de l''enfant en permanence, coordonner thérapeutes/médecins/école, préparer les réunions, anticiper les crises, gérer les administratifs (MDPH, PAP), et porter souvent seul les inquiétudes sur l''avenir. C''est une charge cognitive invisible.', NULL),
('b7060000-0000-0000-0000-000000000006', 'Le financement des thérapies et du matériel spécialisé', false, 3, NULL, 'Le financement est un stress réel, mais la charge mentale est plus large que la dimension financière.'),
('b7060000-0000-0000-0000-000000000006', 'Les conflits fréquents avec le partenaire sur l''éducation', false, 4, NULL, 'Les conflits parentaux peuvent contribuer à la charge, mais ils ne définissent pas la charge mentale spécifique.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7070000-0000-0000-0000-000000000007', 'Pour partager des conseils éducatifs validés par des professionnels', false, 1, NULL, 'Les groupes de parents sont précieux pour l''expérience partagée — pas nécessairement pour la validation professionnelle.'),
('b7070000-0000-0000-0000-000000000007', 'Pour trouver une validation de son vécu et sortir de l''isolement avec des pairs qui comprennent vraiment', true, 2, 'Être compris sans avoir à tout expliquer est une expérience rare pour ces parents. Un pair qui vit la même chose offre une validation immédiate impossible à obtenir d''un entourage non concerné. Cette validation est thérapeutique en elle-même — elle réduit la honte et l''isolement.', NULL),
('b7070000-0000-0000-0000-000000000007', 'Pour trouver un thérapeute pour son enfant par le bouche à oreille', false, 3, NULL, 'Les recommandations peuvent être un bénéfice secondaire, mais ce n''est pas la valeur principale des groupes.'),
('b7070000-0000-0000-0000-000000000007', 'Pour déléguer certaines responsabilités d''accompagnement', false, 4, NULL, 'Un groupe de soutien ne délègue pas les responsabilités — il soutient le parent dans son rôle.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7080000-0000-0000-0000-000000000008', 'D''un manque de patience qu''il faut corriger avec de la volonté', false, 1, NULL, 'L''irritabilité croissante est un signal d''alarme neurophysiologique — pas un défaut de caractère à corriger par effort.'),
('b7080000-0000-0000-0000-000000000008', 'D''un signe d''épuisement qui mérite attention — pas un défaut de caractère', true, 2, 'L''irritabilité chronique est l''un des premiers signes d''épuisement de l''aidant. Le seuil de tolérance au stress baisse quand les ressources sont épuisées. Reconnaître ce signal sans se juger est la première étape pour agir.', NULL),
('b7080000-0000-0000-0000-000000000008', 'D''un impact de l''enfant sur le parent qui justifie une séparation temporaire', false, 3, NULL, 'La séparation peut parfois être une ressource, mais le symptôme mérite d''abord une évaluation des ressources du parent — pas une conclusion hâtive.'),
('b7080000-0000-0000-0000-000000000008', 'D''un problème hormonal à explorer médicalement', false, 4, NULL, 'Un bilan médical peut être pertinent, mais l''épuisement de l''aidant est la cause la plus probable dans ce contexte.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b7090000-0000-0000-0000-000000000009', 'Un luxe réservé aux parents en crise grave', false, 1, NULL, 'Attendre la crise grave pour consulter revient à attendre que la voiture tombe en panne pour regarder le niveau d''huile.'),
('b7090000-0000-0000-0000-000000000009', 'Un outil de prévention et de soutien — accessible avant d''être en état de crise', true, 2, 'La thérapie pour le parent (pas pour l''enfant) permet de traiter la culpabilité, le deuil, l''épuisement et les schémas relationnels — avant qu''ils affectent l''accompagnement. Elle est préventive, pas seulement curative.', NULL),
('b7090000-0000-0000-0000-000000000009', 'Un aveu que le parent ne gère pas bien son rôle', false, 3, NULL, 'Consulter un thérapeute pour soi-même est un acte de responsabilité — pas un aveu d''échec.'),
('b7090000-0000-0000-0000-000000000009', 'Une démarche inutile si l''enfant est déjà suivi par un professionnel', false, 4, NULL, 'Le suivi de l''enfant ne remplace pas le soutien du parent — ce sont deux besoins distincts.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b70a0000-0000-0000-0000-00000000000a', 'Montre qu''on n''est pas capable de gérer seul', false, 1, NULL, 'Demander de l''aide n''est pas un signe d''incapacité — c''est la reconnaissance lucide de ses propres limites.'),
('b70a0000-0000-0000-0000-00000000000a', 'Est un acte de force et un exemple de régulation saine pour l''enfant', true, 2, 'Un parent qui demande de l''aide modèle pour son enfant qu''il est possible d''exprimer ses besoins et de chercher du soutien — une compétence que beaucoup d''enfants neurodivergents ont du mal à développer. Demander de l''aide est la compétence la plus utile à modéliser.', NULL),
('b70a0000-0000-0000-0000-00000000000a', 'Doit rester privé pour ne pas inquiéter l''enfant', false, 3, NULL, 'La transparence adaptée à l''âge sur les ressources parentales peut être utile — l''enfant n''a pas besoin d''être protégé de l''idée que les adultes ont des besoins.'),
('b70a0000-0000-0000-0000-00000000000a', 'Est utile seulement si le soutien demandé est de nature professionnelle', false, 4, NULL, 'Le soutien peut venir d''un ami, d''un groupe de pairs, d''un membre de la famille ou d''un professionnel — toutes ces formes sont valides.');

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M8 — Construire un plan d'accompagnement à long terme
-- ═════════════════════════════════════════════════════════════════════════

WITH m AS (SELECT id FROM public.modules WHERE code = 'M8')
INSERT INTO public.quiz_questions (id, module_id, type, text, sort_order)
SELECT q.id, m.id, 'mcq'::question_type, q.text, q.sort_order
FROM m, (VALUES
  ('b8010000-0000-0000-0000-000000000001'::uuid, 'Un objectif SMART dans le contexte de l''accompagnement d''un enfant neurodivergent doit être :', 1),
  ('b8020000-0000-0000-0000-000000000002'::uuid, 'Pourquoi est-il important de planifier des points de révision réguliers du plan d''accompagnement ?', 2),
  ('b8030000-0000-0000-0000-000000000003'::uuid, 'Impliquer l''enfant dans la construction de ses objectifs (selon son âge) :', 3),
  ('b8040000-0000-0000-0000-000000000004'::uuid, 'Quand un objectif du plan n''est pas atteint, la meilleure interprétation est :', 4),
  ('b8050000-0000-0000-0000-000000000005'::uuid, 'La "synthèse du parcours" en fin de programme sert principalement à :', 5),
  ('b8060000-0000-0000-0000-000000000006'::uuid, 'Pour qu''un plan d''accompagnement soit cohérent, il doit être :', 6),
  ('b8070000-0000-0000-0000-000000000007'::uuid, 'Identifier les ressources professionnelles nécessaires dans le plan signifie :', 7),
  ('b8080000-0000-0000-0000-000000000008'::uuid, 'Un plan d''accompagnement réussi est celui qui :', 8),
  ('b8090000-0000-0000-0000-000000000009'::uuid, 'Mesurer les progrès d''un enfant neurodivergent doit se faire en :', 9),
  ('b80a0000-0000-0000-0000-00000000000a'::uuid, 'Le sentiment d''être "moins seul(e)" qu''au début du parcours est :', 10)
) AS q(id, text, sort_order)
ON CONFLICT DO NOTHING;

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8010000-0000-0000-0000-000000000001', 'Ambitieux et inspirant, même s''il est difficile à mesurer', false, 1, NULL, 'L''ambition seule ne suffit pas — un objectif non mesurable est difficile à évaluer et peut décourager.'),
('b8010000-0000-0000-0000-000000000001', 'Spécifique, Mesurable, Atteignable, Réaliste et Temporel — ancré dans le profil réel de l''enfant', true, 2, 'SMART adapté à la neurodivergence signifie aussi "ancré dans le profil réel" : un objectif atteignable pour un enfant neurotypique peut ne pas l''être au même rythme pour un enfant neurodivergent. L''honnêteté sur les capacités actuelles est plus utile que l''optimisme naïf.', NULL),
('b8010000-0000-0000-0000-000000000001', 'Formulé par un professionnel de santé pour être valide', false, 3, NULL, 'Les professionnels peuvent contribuer, mais les objectifs du plan d''accompagnement sont co-construits — pas délégués.'),
('b8010000-0000-0000-0000-000000000001', 'Centré sur les comportements à corriger en priorité', false, 4, NULL, 'Un plan d''accompagnement n''est pas un plan de correction — il est centré sur le développement des compétences et le soutien aux besoins.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8020000-0000-0000-0000-000000000002', 'Pour montrer aux professionnels que le parent est rigoureux', false, 1, NULL, 'Les points de révision servent l''enfant — pas la perception du parent par les professionnels.'),
('b8020000-0000-0000-0000-000000000002', 'Parce que l''enfant évolue et les besoins changent — un plan statique devient rapidement inadapté', true, 2, 'Un enfant neurodivergent de 7 ans a des besoins très différents de ceux qu''il aura à 10 ou 14 ans. Les progrès, les transitions scolaires, les nouvelles évaluations changent le tableau. Un plan révisé régulièrement reste un outil vivant — pas un document archivé.', NULL),
('b8020000-0000-0000-0000-000000000002', 'Pour documenter les échecs et identifier les responsables', false, 3, NULL, 'Les révisions servent l''ajustement — pas la recherche de responsabilité.'),
('b8020000-0000-0000-0000-000000000002', 'Pour avoir une preuve de l''investissement parental en cas de litige scolaire', false, 4, NULL, 'La documentation peut avoir cette valeur secondaire, mais ce n''est pas la raison première des révisions.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8030000-0000-0000-0000-000000000003', 'Ralentit le processus car l''enfant ne comprend pas les enjeux', false, 1, NULL, 'L''implication de l''enfant peut prendre plus de temps, mais elle produit des objectifs plus motivants et plus respectueux de son vécu.'),
('b8030000-0000-0000-0000-000000000003', 'Renforce son sentiment d''agentivité et la probabilité qu''il s''investisse dans les objectifs', true, 2, 'Un objectif choisi est un objectif défendu. Même à 8 ans, un enfant peut nommer ce qu''il trouve difficile et ce qu''il voudrait réussir. Cette co-construction respecte son autonomie et crée un engagement authentique — pas une conformité externe.', NULL),
('b8030000-0000-0000-0000-000000000003', 'N''est pertinent qu''à partir de l''adolescence', false, 3, NULL, 'Une implication adaptée à l''âge est possible dès l''enfance — même les enfants jeunes peuvent contribuer à nommer leurs besoins.'),
('b8030000-0000-0000-0000-000000000003', 'Transfère trop de responsabilités à l''enfant sur sa propre prise en charge', false, 4, NULL, 'L''implication ne transfère pas la responsabilité — elle donne une voix à l''enfant dans un processus que les adultes structurent.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8040000-0000-0000-0000-000000000004', 'L''enfant n''a pas fait les efforts nécessaires', false, 1, NULL, 'Cette interprétation ignore les facteurs systémiques, les délais de développement et les obstacles environnementaux.'),
('b8040000-0000-0000-0000-000000000004', 'L''objectif était mal calibré ou le contexte a changé — c''est une information, pas un échec', true, 2, 'Un objectif non atteint signale que quelque chose n''était pas aligné — délai trop court, objectif trop ambitieux, ressource manquante, changement inattendu. C''est une donnée à analyser pour ajuster le plan, pas une preuve d''échec de l''enfant ou du parent.', NULL),
('b8040000-0000-0000-0000-000000000004', 'Le plan doit être entièrement revu depuis le début', false, 3, NULL, 'Un objectif non atteint justifie un ajustement ciblé — pas nécessairement un reset complet du plan.'),
('b8040000-0000-0000-0000-000000000004', 'Le professionnel référent n''a pas suffisamment soutenu l''enfant', false, 4, NULL, 'Chercher un responsable externe détourne de l''analyse constructive — l''objectif est d''ajuster, pas de blâmer.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8050000-0000-0000-0000-000000000005', 'Clôturer administrativement le parcours pour les équipes', false, 1, NULL, 'La synthèse sert le parent et l''enfant — pas la clôture administrative.'),
('b8050000-0000-0000-0000-000000000005', 'Consolider les apprentissages, mesurer le chemin parcouru et ancrer les changements durables', true, 2, 'La synthèse transforme un parcours d''expériences en compétences intégrées. En nommant explicitement ce qui a changé dans sa pratique, le parent renforce les nouveaux schémas comportementaux et prépare leur maintien dans le temps. La réflexion explicite consolide l''apprentissage implicite.', NULL),
('b8050000-0000-0000-0000-000000000005', 'Préparer le dossier médical pour la prochaine évaluation MDPH', false, 3, NULL, 'La synthèse a une valeur pédagogique — elle n''est pas destinée à alimenter un dossier administratif.'),
('b8050000-0000-0000-0000-000000000005', 'Identifier les modules qui méritent d''être refaits', false, 4, NULL, 'La synthèse regarde vers l''avenir et le chemin parcouru — pas vers la répétition du parcours.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8060000-0000-0000-0000-000000000006', 'Rédigé par un professionnel de santé et approuvé par l''école', false, 1, NULL, 'Le plan d''accompagnement parental n''est pas un document médical ou scolaire — c''est un outil familial.'),
('b8060000-0000-0000-0000-000000000006', 'Partagé et compris par tous les adultes qui accompagnent l''enfant au quotidien', true, 2, 'Un plan connu du seul parent est fragile. Quand l''autre parent, les grands-parents réguliers et les aidants comprennent la logique et les priorités, l''environnement de l''enfant devient cohérent — ce qui réduit son anxiété et améliore l''efficacité des stratégies.', NULL),
('b8060000-0000-0000-0000-000000000006', 'Aussi détaillé que possible pour couvrir toutes les situations', false, 3, NULL, 'Un plan trop détaillé est rarement consulté — la lisibilité et la concision sont des qualités essentielles.'),
('b8060000-0000-0000-0000-000000000006', 'Centré exclusivement sur les difficultés pour ne pas sous-estimer les besoins', false, 4, NULL, 'Un plan centré uniquement sur les difficultés ignore les forces qui sont souvent des leviers d''accompagnement essentiels.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8070000-0000-0000-0000-000000000007', 'Trouver le professionnel le moins cher pour chaque besoin', false, 1, NULL, 'Le coût est un facteur à considérer, mais il ne doit pas être le critère principal dans l''identification des ressources.'),
('b8070000-0000-0000-0000-000000000007', 'Identifier le type de soutien nécessaire (orthophoniste, psychomotricien, etc.), les délais et le budget disponible', true, 2, 'Une ressource bien identifiée mais inaccessible (liste d''attente de 18 mois, coût prohibitif) doit être accompagnée d''une alternative transitoire. Identifier les ressources inclut les délais réels et les stratégies pour les contourner temporairement.', NULL),
('b8070000-0000-0000-0000-000000000007', 'Demander à chaque professionnel de coordonner lui-même sa contribution au plan', false, 3, NULL, 'La coordination entre professionnels est souvent insuffisante spontanément — c''est au parent de jouer ce rôle de coordinateur.'),
('b8070000-0000-0000-0000-000000000007', 'S''assurer que tous les professionnels utilisent la même approche théorique', false, 4, NULL, 'Une cohérence d''approche est utile, mais imposer une théorie unique peut exclure des professionnels compétents qui ont des approches différentes.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8080000-0000-0000-0000-000000000008', 'Atteint tous ses objectifs dans les délais prévus', false, 1, NULL, 'Atteindre tous les objectifs dans les délais est un idéal — pas un critère de réussite réaliste.'),
('b8080000-0000-0000-0000-000000000008', 'Reste un outil vivant, ajusté au fur et à mesure que l''enfant et la famille évoluent', true, 2, 'La réussite d''un plan n''est pas dans l''accomplissement parfait d''objectifs figés — c''est dans sa capacité à rester utile, consulté et ajusté. Un plan vivant traduit une pratique parentale réflexive, pas une liste de cases à cocher.', NULL),
('b8080000-0000-0000-0000-000000000008', 'Est validé par l''équipe soignante et l''école', false, 3, NULL, 'La validation externe peut être utile, mais elle ne définit pas la réussite du plan d''accompagnement parental.'),
('b8080000-0000-0000-0000-000000000008', 'Résout les difficultés de l''enfant de façon définitive', false, 4, NULL, 'Les difficultés d''un enfant neurodivergent évoluent — elles ne se "résolvent" pas définitivement. L''objectif est le développement continu, pas la guérison.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b8090000-0000-0000-0000-000000000009', 'Le comparant à la moyenne de sa classe pour situer son niveau', false, 1, NULL, 'La norme scolaire est une mesure inadaptée au profil neurodivergent — elle mesure l''écart, pas le progrès.'),
('b8090000-0000-0000-0000-000000000009', 'Le comparant à lui-même dans le temps — ses propres progrès, à son rythme', true, 2, 'La seule mesure pertinente du progrès d''un enfant neurodivergent est par rapport à son propre point de départ. "Il gère mieux les transitions qu''il y a 3 mois" est une information réelle. "Il est toujours en dessous de la moyenne" ne mesure pas le même chose.', NULL),
('b8090000-0000-0000-0000-000000000009', 'Utilisant uniquement des évaluations standardisées pour être objectif', false, 3, NULL, 'Les évaluations standardisées ne capturent pas les progrès les plus importants pour un enfant neurodivergent — comme la régulation émotionnelle ou l''autonomie.'),
('b8090000-0000-0000-0000-000000000009', 'Attendant les bilans annuels pour ne pas se faire de fausses idées entre-temps', false, 4, NULL, 'Attendre les bilans annuels prive le parent d''informations précieuses pour ajuster son accompagnement au quotidien.');

INSERT INTO public.quiz_options (question_id, text, is_correct, sort_order, feedback_correct, feedback_incorrect) VALUES
('b80a0000-0000-0000-0000-00000000000a', 'Un objectif secondaire — l''essentiel est les progrès de l''enfant', false, 1, NULL, 'Le bien-être du parent est une condition du bien-être de l''enfant — pas un objectif secondaire.'),
('b80a0000-0000-0000-0000-00000000000a', 'Un indicateur concret de transformation — qui prédit la qualité de l''accompagnement sur le long terme', true, 2, 'Un parent qui se sent moins seul a accès à plus de ressources, résiste mieux à l''épuisement et modèle pour son enfant que les difficultés peuvent être traversées avec du soutien. La transformation du parent est aussi importante que celle de l''enfant — elles se nourrissent mutuellement.', NULL),
('b80a0000-0000-0000-0000-00000000000a', 'Un sentiment subjectif sans valeur indicative réelle', false, 3, NULL, 'Les états subjectifs sont des indicateurs valides — le sentiment de solitude ou de soutien prédit des comportements et des résultats concrets.'),
('b80a0000-0000-0000-0000-00000000000a', 'Le résultat attendu uniquement si le parcours a été fait en groupe', false, 4, NULL, 'Le sentiment d''être moins seul peut venir d''un parcours solo, de ressources en ligne, d''un groupe ou d''un thérapeute — il n''est pas réservé au format collectif.');

-- ═════════════════════════════════════════════════════════════════════════
-- MINI-JEUX M2–M8
-- ═════════════════════════════════════════════════════════════════════════

-- Mini jeu M2 — Vrai ou Mythe : identifier les forces
WITH m AS (SELECT id FROM public.modules WHERE code = 'M2')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'forces-vrai-mythe', 'Forces : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m2c1", "affirmation": "Un enfant neurodivergent qui rate souvent à l''école n''a pas de forces académiques.", "reponse": "MYTHE", "explication": "Les forces d''un enfant neurodivergent s''expriment souvent en dehors du cadre scolaire standard. Un enfant qui échoue dans le format classique peut exceller dans des domaines non évalués — analyse systémique, mémoire procédurale, créativité, raisonnement spatial."},
      {"id": "m2c2", "affirmation": "Les intérêts intenses d''un enfant peuvent servir de vecteurs d''apprentissage.", "reponse": "VRAI", "explication": "Utiliser l''intérêt intense comme levier pédagogique est une stratégie validée. Un enfant passionné de trains peut apprendre la géographie, l''histoire, les mathématiques et même la lecture à travers ce prisme."},
      {"id": "m2c3", "affirmation": "Un profil cognitif ''en dents de scie'' signifie que l''enfant est instable.", "reponse": "MYTHE", "explication": "Un profil en dents de scie signifie des écarts marqués entre les points forts et les points faibles — ce qui est caractéristique de nombreux profils neurodivergents. Ce n''est pas de l''instabilité : c''est un profil singulier, avec des forces réelles à côté de vraies difficultés."},
      {"id": "m2c4", "affirmation": "Observer les forces d''un enfant dans le jeu libre est aussi valide que dans un test formel.", "reponse": "VRAI", "explication": "Le jeu libre révèle les stratégies spontanées, les intérêts authentiques et les compétences non contraintes. C''est l''un des meilleurs contextes d''observation pour les enfants dont les tests formels sous-estiment les capacités."},
      {"id": "m2c5", "affirmation": "Nommer les forces d''un enfant à voix haute est superficiel et ne change rien.", "reponse": "MYTHE", "explication": "Nommer les forces contribue directement à la construction de l''identité narrative de l''enfant. Un enfant qui entend ''tu as une mémoire exceptionnelle pour les détails'' intègre cette information dans son image de soi — ce qui influence ses croyances d''efficacité et son engagement."},
      {"id": "m2c6", "affirmation": "Un enfant HPI et dyslexique peut avoir simultanément des forces intellectuelles exceptionnelles et des difficultés sévères de lecture.", "reponse": "VRAI", "explication": "Les profils 2e (doublement exceptionnels) combinent un haut potentiel dans certains domaines et des troubles dans d''autres. Ces enfants sont souvent non identifiés car leurs forces masquent leurs difficultés — et leurs difficultés font sous-estimer leurs forces."},
      {"id": "m2c7", "affirmation": "Connaître ses forces protège un enfant contre le sentiment d''incompétence.", "reponse": "VRAI", "explication": "Un enfant qui possède une narrative de ses propres forces dispose d''une ressource identitaire face aux échecs. ''Je suis nul en dictée mais j''ai une mémoire photographique'' est une protection réelle contre la dévalorisation globale de soi."},
      {"id": "m2c8", "affirmation": "L''évaluation des forces doit être laissée uniquement aux spécialistes.", "reponse": "MYTHE", "explication": "Les parents observent leur enfant dans des contextes que les spécialistes ne voient jamais. Le bilan informel parental, fait avec rigueur et bienveillance, apporte des données uniques et complémentaires aux évaluations professionnelles."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M3 — Vrai ou Mythe : décoder les comportements
WITH m AS (SELECT id FROM public.modules WHERE code = 'M3')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'comportements-vrai-mythe', 'Comportements : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m3c1", "affirmation": "Un enfant qui se comporte bien à l''école et mal à la maison manque de respect pour ses parents.", "reponse": "MYTHE", "explication": "Ce phénomène s''appelle le ''masking'' suivi d''un effondrement post-effort. L''enfant maintient un contrôle intense toute la journée et se décharge à la maison — là où il se sent en sécurité. C''est un signe de confiance, pas de manque de respect."},
      {"id": "m3c2", "affirmation": "Un comportement difficile peut être un signal de besoin non exprimé verbalement.", "reponse": "VRAI", "explication": "Le modèle de l''iceberg comportemental considère que 90% de ce qui génère un comportement est invisible : fatigue, anxiété, incompréhension, surcharge sensorielle. Le comportement est la partie visible d''un état interne que l''enfant ne peut pas encore verbaliser."},
      {"id": "m3c3", "affirmation": "La punition est le moyen le plus efficace de modifier durablement un comportement difficile.", "reponse": "MYTHE", "explication": "La punition peut suspendre un comportement à court terme, mais elle n''enseigne pas les compétences alternatives et peut renforcer la honte et l''anxiété — deux facteurs qui augmentent les comportements difficiles sur le long terme."},
      {"id": "m3c4", "affirmation": "La fenêtre de tolérance d''un enfant neurodivergent est souvent plus étroite que celle d''un enfant neurotypique.", "reponse": "VRAI", "explication": "La fenêtre de tolérance — la zone dans laquelle l''enfant peut traiter l''information et répondre de façon adaptée — est influencée par le système nerveux autonome. Beaucoup d''enfants neurodivergents ont un système nerveux plus réactif et une récupération plus lente."},
      {"id": "m3c5", "affirmation": "Un enfant qui dit ''je m''en fiche'' lors d''une réprimande est indifférent à l''opinion de ses parents.", "reponse": "MYTHE", "explication": "''Je m''en fiche'' est souvent une réponse défensive face à la honte ou à la surcharge — une façon de se protéger d''une émotion trop intense. C''est rarement une indifférence réelle."},
      {"id": "m3c6", "affirmation": "Identifier les déclencheurs récurrents d''un enfant permet de réduire la fréquence des crises.", "reponse": "VRAI", "explication": "La connaissance des déclencheurs permet d''agir en prévention : modifier l''environnement, ajuster les attentes, préparer les transitions. La plupart des crises ont des précurseurs prévisibles une fois qu''on les connaît."},
      {"id": "m3c7", "affirmation": "Co-réguler son enfant en crise implique de ressentir soi-même les émotions de l''enfant.", "reponse": "MYTHE", "explication": "La co-régulation repose sur la présence calme du parent — pas sur l''empathie fusionnelle. Un parent qui ''capte'' toutes les émotions de l''enfant amplifie souvent la crise. Rester régulé soi-même est plus efficace que ressentir avec l''enfant."},
      {"id": "m3c8", "affirmation": "Les questions ouvertes (''qu''est-ce qu''il se passe pour toi ?'') sont plus efficaces que les explications pendant et après une crise.", "reponse": "VRAI", "explication": "Les questions ouvertes invitent l''enfant à accéder à son état interne et à le verbaliser. Les explications parentales pendant la crise sont souvent traitées comme des attaques ou du bruit — elles n''entrent pas."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M4 — Vrai ou Mythe : aménager l'environnement
WITH m AS (SELECT id FROM public.modules WHERE code = 'M4')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'environnement-vrai-mythe', 'Environnement : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m4c1", "affirmation": "Un bureau bien rangé améliore objectivement la concentration d''un enfant TDAH.", "reponse": "VRAI_PARTIEL", "explication": "Réduire l''encombrement visuel aide beaucoup d''enfants TDAH — mais certains pensent mieux dans un environnement qu''ils perçoivent comme organisé même s''il semble chaotique aux adultes. L''objectif est de réduire les distracteurs, pas d''imposer un standard externe."},
      {"id": "m4c2", "affirmation": "Les routines rigides sont néfastes pour les enfants neurodivergents.", "reponse": "MYTHE", "explication": "Les routines prévisibles réduisent l''anxiété liée à l''incertitude — particulièrement bénéfique pour les profils anxieux, autistiques ou TDAH. La rigidité problématique vient de la façon dont elles sont imposées, pas de leur existence."},
      {"id": "m4c3", "affirmation": "Annoncer une transition 5 à 10 minutes à l''avance peut suffire à réduire la résistance.", "reponse": "VRAI", "explication": "Le préavis de transition permet au cerveau de se préparer à un changement de mode — ce qui est coûteux neuralement pour beaucoup d''enfants neurodivergents. Combiné à un minuteur visuel, il réduit significativement la résistance."},
      {"id": "m4c4", "affirmation": "Un enfant dyspraxique peut apprendre à s''organiser avec les bons outils visuels.", "reponse": "VRAI", "explication": "La dyspraxie affecte la planification et la séquentialisation automatique — mais avec des systèmes externes (listes, codes couleur, pictogrammes), l''enfant peut compenser efficacement. Ces outils externalisent ce que son cerveau ne peut pas automatiser."},
      {"id": "m4c5", "affirmation": "L''hyposensibilité sensorielle (besoin de plus de stimulation) est aussi fréquente que l''hypersensibilité.", "reponse": "VRAI", "explication": "Certains enfants ont besoin de plus de stimulation pour atteindre un niveau d''activation fonctionnel. Ils peuvent chercher à se balancer, toucher tout, faire du bruit — c''est un besoin neurologique, pas de la provocation."},
      {"id": "m4c6", "affirmation": "Faire les devoirs toujours dans la même pièce suffit à créer une routine efficace.", "reponse": "MYTHE", "explication": "Le lieu est un facteur parmi d''autres. Une routine efficace inclut aussi l''heure, la durée, le format des pauses et l''état de l''enfant au moment de commencer. Un lieu fixe sans les autres éléments n''est pas suffisant."},
      {"id": "m4c7", "affirmation": "Un enfant en surcharge sensorielle peut bénéficier d''un espace de retrait calme accessible librement.", "reponse": "VRAI", "explication": "L''accès libre à un espace de décharge sensorielle — sans avoir à demander la permission — développe l''autorégulation. L''enfant apprend à reconnaître sa propre surcharge et à y répondre proactivement."},
      {"id": "m4c8", "affirmation": "Adapter l''environnement est une forme de surprotection qui empêche l''enfant de ''s''endurcir''.", "reponse": "MYTHE", "explication": "L''adaptation environnementale n''est pas de la surprotection — c''est l''équivalent des lunettes pour un enfant myope. On n''oblige pas un enfant myope à ''s''endurcir'' sans lunettes pour développer sa vision. On lui donne les outils pour fonctionner."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M5 — Vrai ou Mythe : collaborer avec l'école
WITH m AS (SELECT id FROM public.modules WHERE code = 'M5')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'ecole-vrai-mythe', 'École : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m5c1", "affirmation": "Un PAP garantit que tous les enseignants appliqueront les aménagements.", "reponse": "MYTHE", "explication": "Le PAP est un cadre — pas une garantie. Son application dépend de chaque enseignant et du suivi du parent. Un aménagement écrit mais non suivi n''existe que sur le papier. Le suivi régulier est indispensable."},
      {"id": "m5c2", "affirmation": "Un parent peut demander un PAP pour son enfant sans attendre l''initiative de l''école.", "reponse": "VRAI", "explication": "Le parent peut solliciter un rendez-vous et demander formellement l''ouverture d''un PAP. Il n''a pas à attendre que l''école le propose — d''autant que certaines écoles ne le proposent pas spontanément même quand c''est justifié."},
      {"id": "m5c3", "affirmation": "Mentionner uniquement le diagnostic suffit à convaincre un enseignant de modifier ses pratiques.", "reponse": "MYTHE", "explication": "Un diagnostic sans traduction en besoins concrets n''est pas actionnable pour un enseignant. ''Il est TDAH'' n''aide pas. ''Il a besoin de consignes fragmentées, d''un bureau loin des fenêtres et d''une validation verbale avant de commencer'' — ça, oui."},
      {"id": "m5c4", "affirmation": "Les droits à l''aménagement scolaire sont opposables — l''école peut être contrainte de les appliquer.", "reponse": "VRAI", "explication": "Pour les aménagements notifiés par la MDPH, il existe un droit opposable. En cas de refus, le DASEN et le tribunal administratif peuvent être saisis. Connaître ce droit ne signifie pas l''utiliser à la moindre occasion — mais y être prêt change la posture."},
      {"id": "m5c5", "affirmation": "Un conflit ouvert avec l''école améliore généralement la situation de l''enfant.", "reponse": "MYTHE", "explication": "Un conflit ouvert peut obtenir des aménagements mais détériore souvent la relation quotidienne de l''enfant avec ses enseignants. La stratégie de collaboration, même ferme, préserve l''environnement scolaire de l''enfant sur le long terme."},
      {"id": "m5c6", "affirmation": "Implication l''enfant dans ses réunions scolaires (selon son âge) renforce son autonomie.", "reponse": "VRAI", "explication": "Un enfant qui comprend ce qui se décide pour lui développe une capacité à nommer ses propres besoins — compétence essentielle pour le collège, le lycée et au-delà. Cette implication est progressive et adaptée à l''âge."},
      {"id": "m5c7", "affirmation": "Un enseignant bienveillant mais non formé aux profils DYS peut involontairement aggraver les difficultés.", "reponse": "VRAI", "explication": "La bienveillance sans connaissance peut conduire à des adaptations contre-productives — demander à l''enfant dyslexique de ''lire plus lentement'' ou au TDAH de ''faire un effort de concentration''. La formation change ce que la bienveillance seule ne peut pas corriger."},
      {"id": "m5c8", "affirmation": "Tenir un dossier de suivi des échanges avec l''école est excessif pour la plupart des familles.", "reponse": "MYTHE", "explication": "En cas de changement d''enseignant, d''escalade ou de procédure MDPH, les traces écrites sont précieuses. Un simple dossier avec les emails et comptes-rendus de réunion peut faire la différence — et prendre 5 minutes par échange."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M6 — Vrai ou Mythe : régulation émotionnelle
WITH m AS (SELECT id FROM public.modules WHERE code = 'M6')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'emotions-vrai-mythe', 'Émotions : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m6c1", "affirmation": "Un enfant neurodivergent de 10 ans peut avoir un niveau de régulation émotionnelle d''un enfant de 7 ans.", "reponse": "VRAI", "explication": "Le développement du cortex préfrontal — responsable de la régulation émotionnelle — est souvent retardé dans les profils TDAH et autistiques. Ce décalage est neurologique, pas moral. Ajuster les attentes en conséquence est une pratique parentale adaptée."},
      {"id": "m6c2", "affirmation": "Expliquer pourquoi un comportement est mauvais pendant une crise émotionnelle est efficace.", "reponse": "MYTHE", "explication": "Pendant une crise intense, l''amygdale est en mode survie et le cortex préfrontal est hors ligne. L''enfant ne peut pas intégrer une explication logique dans cet état. Les explications n''ont de valeur qu''une fois le calme revenu."},
      {"id": "m6c3", "affirmation": "La honte est souvent plus dévastatrice que la colère dans le développement de l''enfant neurodivergent.", "reponse": "VRAI", "explication": "La honte chronique (''je suis mauvais'') mine l''estime de soi de façon plus profonde et durable que la colère (''je suis en colère''). Beaucoup d''enfants neurodivergents développent une honte liée à leurs difficultés visibles — ce qui est l''un des facteurs de risque dépressif les plus documentés."},
      {"id": "m6c4", "affirmation": "Ignorer une crise émotionnelle (extinction) est la méthode la plus efficace.", "reponse": "MYTHE", "explication": "L''extinction peut fonctionner sur certains comportements opérants, mais une crise émotionnelle liée à une surcharge neurologique n''est pas un comportement instrumentalisé. Ignorer une détresse réelle augmente l''insécurité attachement et ne développe pas la régulation."},
      {"id": "m6c5", "affirmation": "Nommer une émotion à voix haute (''tu es furieux'') peut aider à la réduire.", "reponse": "VRAI", "explication": "Le ''labeling'' émotionnel active le cortex préfrontal et réduit l''activité amygdalienne — c''est documenté en neuroimagerie. Nommer l''émotion de l''enfant sans la juger lui donne un langage et réduit l''activation."},
      {"id": "m6c6", "affirmation": "Un enfant qui se frappe lui-même pendant une crise cherche à attirer l''attention.", "reponse": "MYTHE", "explication": "L''auto-stimulation ou l''automutilation légère pendant une crise est souvent une tentative maladroite de régulation sensorielle — réorienter la surcharge vers une sensation physique. Ce n''est pas un comportement instrumental mais un signal de détresse intense."},
      {"id": "m6c7", "affirmation": "Se reconnecter avec l''enfant après une crise est aussi important que la gestion de la crise elle-même.", "reponse": "VRAI", "explication": "La reconnexion post-crise (câlin, moment doux, vérification du lien) restaure la sécurité attachement et permet à l''enfant d''intégrer que les crises ne détruisent pas la relation. Elle est aussi importante que la gestion de la crise."},
      {"id": "m6c8", "affirmation": "Un enfant qui se régule bien émotionnellement n''a plus besoin de stratégies de soutien.", "reponse": "MYTHE", "explication": "La régulation émotionnelle est une compétence continue, pas un état acquis définitivement. Un enfant qui progresse a toujours besoin de soutien environnemental — les stratégies évoluent avec lui, elles ne disparaissent pas."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M7 — Vrai ou Mythe : prendre soin de soi
WITH m AS (SELECT id FROM public.modules WHERE code = 'M7')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'parentalite-vrai-mythe', 'Parentalité : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m7c1", "affirmation": "Prendre du temps pour soi est égoïste quand on a un enfant qui a besoin de beaucoup de soutien.", "reponse": "MYTHE", "explication": "La ressource parterale est une condition de l''accompagnement. Un parent épuisé offre un accompagnement dégradé. Prendre soin de soi n''est pas de l''égoïsme — c''est de la maintenance de la capacité à donner."},
      {"id": "m7c2", "affirmation": "La fatigue compassionnelle peut coexister avec un amour profond pour son enfant.", "reponse": "VRAI", "explication": "La fatigue compassionnelle n''est pas un manque d''amour — elle est souvent la conséquence d''un amour intense sans ressource de récupération. Les deux coexistent fréquemment. Reconnaître la fatigue ne nie pas l''amour."},
      {"id": "m7c3", "affirmation": "Le deuil de l''enfant imaginé est une étape que tous les parents d''enfants neurodivergents traversent.", "reponse": "VRAI_PARTIEL", "explication": "La plupart des parents traversent une forme de ce processus, mais son intensité et sa durée varient. Certains parents, notamment ceux qui sont eux-mêmes neurodivergents, vivent ce deuil très différemment. Ce n''est pas une étape obligatoire ou universelle."},
      {"id": "m7c4", "affirmation": "Demander de l''aide est un signe de faiblesse parentale.", "reponse": "MYTHE", "explication": "Demander de l''aide est un acte de compétence et de lucidité. C''est aussi un modèle précieux pour l''enfant : voir son parent identifier ses besoins et les exprimer lui enseigne que c''est possible et acceptable."},
      {"id": "m7c5", "affirmation": "L''isolement social d''un parent aidant aggrave son épuisement.", "reponse": "VRAI", "explication": "Le soutien social est l''un des meilleurs prédicteurs de résilience face au stress chronique. L''isolement coupe l''accès à ce soutien et à la perspective extérieure — deux ressources essentielles pour les parents d''enfants neurodivergents."},
      {"id": "m7c6", "affirmation": "L''auto-compassion est équivalente à baisser ses standards parentaux.", "reponse": "MYTHE", "explication": "L''auto-compassion ne signifie pas se satisfaire de moins — c''est traiter ses erreurs avec honnêteté et sans auto-punition excessive. Elle prédit en réalité une meilleure résilience et un engagement plus soutenu que l''auto-critique sévère."},
      {"id": "m7c7", "affirmation": "Un thérapeute pour le parent (pas pour l''enfant) peut améliorer l''accompagnement de l''enfant.", "reponse": "VRAI", "explication": "Traiter sa propre culpabilité, son deuil et son épuisement libère de la capacité relationnelle et réduit la transmission intergénérationnelle des schémas anxieux. Le parent qui va mieux accompagne mieux — c''est documenté."},
      {"id": "m7c8", "affirmation": "Partager son vécu de parent dans un groupe peut suffire à réduire le sentiment d''isolement.", "reponse": "VRAI", "explication": "La simple reconnaissance — ''d''autres vivent ce que je vis'' — a un effet déculpabilisant et isolement-réducteur immédiat. Être compris sans avoir à tout expliquer est rare pour ces parents. Le groupe offre cette validation que l''entourage non concerné ne peut généralement pas fournir."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;

-- Mini jeu M8 — Vrai ou Mythe : planification à long terme
WITH m AS (SELECT id FROM public.modules WHERE code = 'M8')
INSERT INTO public.mini_games (module_id, slug, title, type, config)
SELECT m.id, 'planification-vrai-mythe', 'Planification : Vrai ou Mythe ?', 'flashcard_drag',
  '{
    "cartes": [
      {"id": "m8c1", "affirmation": "Un plan d''accompagnement doit être suivi à la lettre pour être efficace.", "reponse": "MYTHE", "explication": "Un plan rigide qui ne s''adapte pas à l''évolution de l''enfant devient rapidement inadapté. Un plan vivant, révisé régulièrement, est plus efficace qu''un plan parfait appliqué rigidement."},
      {"id": "m8c2", "affirmation": "Mesurer les progrès d''un enfant neurodivergent par rapport à la norme scolaire est la méthode la plus utile.", "reponse": "MYTHE", "explication": "La norme scolaire mesure l''écart à la moyenne — pas le progrès individuel. La mesure la plus pertinente est toujours par rapport au propre point de départ de l''enfant : ''il gère mieux les transitions qu''il y a 3 mois'' est une information réelle et actionnable."},
      {"id": "m8c3", "affirmation": "Impliquer l''enfant dans la définition de ses objectifs augmente son engagement.", "reponse": "VRAI", "explication": "Un objectif co-construit est un objectif défendu. Même un enfant de 7 ans peut nommer ce qu''il trouve difficile et ce qu''il voudrait réussir. Cette implication crée un engagement authentique plutôt qu''une conformité externe."},
      {"id": "m8c4", "affirmation": "Un objectif non atteint indique toujours que l''enfant n''a pas fait les efforts nécessaires.", "reponse": "MYTHE", "explication": "Un objectif non atteint signale le plus souvent un calibrage inadapté : délai trop court, objectif trop ambitieux, ressource manquante, ou changement de contexte inattendu. C''est une donnée à analyser pour ajuster, pas une preuve d''échec."},
      {"id": "m8c5", "affirmation": "Le plan d''accompagnement doit être partagé avec tous les adultes qui accompagnent l''enfant régulièrement.", "reponse": "VRAI", "explication": "Un plan connu du seul parent est fragile. Quand l''autre parent, les grands-parents et les aidants réguliers comprennent les priorités et les stratégies, l''environnement de l''enfant devient cohérent — ce qui réduit l''anxiété et améliore l''efficacité de toutes les interventions."},
      {"id": "m8c6", "affirmation": "Planifier des points de révision réguliers d''un plan est une perte de temps.", "reponse": "MYTHE", "explication": "Les besoins d''un enfant neurodivergent évoluent — parfois rapidement. Un plan révisé à 3 et 6 mois reste adapté à la réalité actuelle de l''enfant. Sans révision, on continue à appliquer des stratégies dépassées."},
      {"id": "m8c7", "affirmation": "Se sentir plus confiant en tant que parent prédit une meilleure qualité d''accompagnement.", "reponse": "VRAI", "explication": "La confiance parentale — le sentiment d''avoir les ressources pour accompagner son enfant — est l''un des prédicteurs les plus robustes de la qualité relationnelle et de la persistance des stratégies d''accompagnement. Ce n''est pas de l''arrogance, c''est une compétence."},
      {"id": "m8c8", "affirmation": "Un parcours de formation parentale transforme à la fois le parent ET améliore indirectement les résultats de l''enfant.", "reponse": "VRAI", "explication": "Les études sur la psychoéducation parentale montrent des effets mesurables sur les deux : amélioration du bien-être parental et réduction des comportements difficiles chez l''enfant. La transformation parentale n''est pas séparée de celle de l''enfant — elles sont interdépendantes."}
    ]
  }'::jsonb
FROM m
ON CONFLICT (module_id, slug) DO NOTHING;
