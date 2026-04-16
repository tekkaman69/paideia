-- ─────────────────────────────────────────────────────────────────────────
-- Batch 1 : Contenu théorique — M1 et M2 (parents)
-- À exécuter APRÈS migration 004_lesson_sections.sql
-- ─────────────────────────────────────────────────────────────────────────

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M1 — Comprendre la neurodivergence
-- ═════════════════════════════════════════════════════════════════════════

UPDATE public.modules
SET lesson_sections = '[
  {
    "titre": "Neurodivergence : de quoi parle-t-on vraiment ?",
    "contenu": "Le terme \"neurodivergence\" désigne l''ensemble des fonctionnements neurologiques qui s''écartent de ce qu''on appelle la \"norme\" — c''est-à-dire le fonctionnement majoritaire dans la population. Ce n''est pas un jugement de valeur : diverger de la norme ne signifie pas être inférieur, défectueux ou moins capable.\n\nLa neurodivergence regroupe des profils très différents : le Trouble du Déficit de l''Attention avec ou sans Hyperactivité (TDAH), les Troubles du Spectre Autistique (TSA), les troubles dys (dyslexie, dyspraxie, dyscalculie, dysorthographie), et le Haut Potentiel Intellectuel (HPI). Ces profils peuvent coexister chez un même enfant — on parle alors de comorbidités.\n\nCe qui les reunit, c''est une façon différente de traiter l''information, de percevoir le monde, de réguler les émotions et d''organiser la pensée — pas un manque d''intelligence ou de volonté.",
    "points_cles": [
      "Neurodivergence = fonctionnement neurologique différent, pas inférieur",
      "TDAH, TSA, troubles dys et HPI sont les profils les plus courants",
      "Un même enfant peut cumuler plusieurs profils",
      "Ce n''est pas un choix, une flemme ou un problème d''éducation"
    ],
    "exemple": "Lucas a 9 ans. Il est brillant à l''oral mais incapable de rester assis 20 minutes. Sa maîtresse pense qu''il est indiscipliné. Ses parents pensent qu''il le fait exprès. En réalité, Lucas a un TDAH — son cerveau est câblé différemment pour l''attention et l''impulsivité. Aucun effort de volonté ne peut compenser une différence neurologique."
  },
  {
    "titre": "Le cerveau neurodivergent : fonctionnement et différences",
    "contenu": "Comprendre la neurodivergence nécessite quelques notions de fonctionnement cérébral. Le cerveau est organisé en réseaux interconnectés qui gèrent l''attention, les émotions, la mémoire, la planification et le langage. Dans les profils neurodivergents, certains de ces réseaux fonctionnent différemment — pas de façon uniforme, mais de façon spécifique à chaque profil et à chaque individu.\n\nDans le TDAH, c''est le système dopaminergique qui est principalement concerné. La dopamine est un neurotransmetteur clé pour la motivation, la récompense et la régulation de l''attention. Un déficit de régulation dopaminergique explique pourquoi un enfant TDAH peut rester concentré des heures sur un jeu vidéo passionnant mais pas 10 minutes sur un exercice répétitif — ce n''est pas de la mauvaise volonté, c''est de la neurologie.\n\nDans la dyslexie, c''est le traitement phonologique et la voie de lecture qui sont atypiques. L''enfant dyslexique \"voit\" les lettres mais son cerveau les traite différemment — d''où les confusions, les inversions, la lenteur. Dans la dyspraxie, c''est l''automatisation des gestes et la coordination qui posent problème.\n\nDans les TSA, c''est le traitement social et sensoriel qui diverge. La flexibilité mentale et l''intégration multisensorielle fonctionnent sur un mode différent — d''où les difficultés dans les interactions sociales implicites et les réactions sensorielles intenses.",
    "points_cles": [
      "Chaque profil neurodivergent implique des circuits cérébraux spécifiques",
      "TDAH = dérégulation dopaminergique (pas un manque de volonté)",
      "Dyslexie = traitement phonologique atypique (pas un problème de vue)",
      "La différence est neurologique — pas comportementale ni éducative"
    ],
    "exemple": "Pourquoi un enfant TDAH peut jouer à Minecraft 3h sans bouger mais ne tient pas 5 min sur ses maths ? Parce que les jeux vidéo produisent de la dopamine en continu (récompenses immédiates, stimulation constante). Les maths n''offrent pas cette stimulation dopaminergique — le cerveau TDAH ne peut pas \"se forcer\" à s''intéresser sans soutien externe."
  },
  {
    "titre": "Ce que la neurodivergence n''est pas",
    "contenu": "L''un des obstacles les plus dommageables pour les enfants neurodivergents est la mauvaise interprétation de leurs comportements. Ces enfants sont souvent étiquetés comme paresseux, capricieux, mal élevés, ou immatures — alors que leurs difficultés ont des origines neurologiques réelles.\n\nLa neurodivergence n''est pas un manque d''intelligence. De nombreux enfants neurodivergents ont un QI dans la moyenne ou au-dessus. Le problème n''est pas la capacité de comprendre — c''est l''accès à cette capacité dans les conditions standards de l''école.\n\nLa neurodivergence n''est pas un problème d''éducation. Des parents attentifs, bienveillants, exigeants peuvent avoir un enfant neurodivergent. Ce n''est pas une conséquence de mauvaises pratiques parentales — même si les pratiques parentales peuvent aggraver ou atténuer les difficultés.\n\nLa neurodivergence n''est pas une phase qui passe. Elle ne disparaît pas avec l''âge. L''enfant TDAH devient un adulte TDAH — mais il peut apprendre à gérer ses défis et à utiliser ses forces. Le diagnostic et l''accompagnement changent les trajectoires, pas la neurologie fondamentale.",
    "points_cles": [
      "Neurodivergence ≠ bêtise, paresse ou mauvaise éducation",
      "L''intelligence peut être intacte même si l''accès à elle est difficile",
      "Ce n''est pas une phase — c''est un fonctionnement durable",
      "L''accompagnement change la trajectoire, pas la neurologie"
    ],
    "exemple": "Emma a 12 ans, des notes catastrophiques, et est décrite comme «peu sérieuse» à l''école. Ses parents sont désespérés. Après un bilan neuropsychologique, on découvre qu''Emma est HPI avec une dyslexie non diagnostiquée. Son intelligence lui permet de compenser — jusqu''à ce que la charge scolaire dépasse sa capacité de compensation. Elle n''était pas paresseuse. Elle était épuisée de compenser seule."
  },
  {
    "titre": "Changer de regard : du déficit aux forces",
    "contenu": "La façon dont nous parlons de la neurodivergence a un impact direct sur la façon dont l''enfant se perçoit — et donc sur ses résultats. Un enfant qui entend depuis des années qu''il est \"lent\", \"difficile\", \"inattentif\" finit par l''intégrer comme une identité. Ce processus s''appelle la honte internalisée, et ses effets sur l''estime de soi sont durables.\n\nChanger de regard, c''est passer d''une vision centrée sur les déficits à une vision qui reconnaît simultanément les difficultés réelles ET les forces spécifiques. Ce changement n''est pas du déni — il ne s''agit pas de prétendre que tout va bien. Il s''agit d''avoir une image complète et honnête de son enfant.\n\nBeaucoup de profils neurodivergents présentent des forces remarquables : créativité intense, pensée en dehors des sentiers battus, mémoire encyclopédique sur les sujets d''intérêt, capacité d''hyperfocus sur ce qui passionne, empathie profonde, sens du détail. Ces forces ne compensent pas les difficultés — mais elles constituent des leviers réels d''accompagnement et de construction identitaire.\n\nEn tant que parent, votre discours sur votre enfant — devant lui et avec lui — façonne sa narrative de soi. Un enfant dont les forces sont nommées et reconnues développe une résilience plus solide face aux échecs inévitables.",
    "points_cles": [
      "Le discours parental façonne l''identité narrative de l''enfant",
      "Honte internalisée = croire durablement qu''on est nul",
      "Forces fréquentes : créativité, hyperfocus, pensée originale, mémoire sélective",
      "Reconnaître les forces n''est pas nier les difficultés"
    ],
    "exemple": "Au lieu de dire «tu es encore dans la lune», essayez «tu es quelqu''un qui pense beaucoup à la fois — c''est une vraie force, et on va aussi travailler sur comment revenir dans la conversation quand c''est important». Ce n''est pas de la positivité naïve — c''est nommer la réalité complète."
  },
  {
    "titre": "Votre rôle en tant que parent",
    "contenu": "Comprendre la neurodivergence de votre enfant transforme votre rôle. Vous n''êtes plus seulement le parent qui surveille les devoirs et signe les carnets. Vous êtes le premier traducteur entre votre enfant et un monde qui n''est pas toujours adapté à son fonctionnement.\n\nCe rôle a plusieurs dimensions. La dimension de défenseur : représenter les besoins de votre enfant face à l''école, aux professionnels de santé, à l''entourage qui ne comprend pas toujours. La dimension d''observateur : remarquer ce qui fonctionne, ce qui déclenche des crises, ce qui apaise — et partager ces observations avec les professionnels.\n\nMais ce rôle a aussi ses limites. Vous n''êtes pas thérapeute, orthophoniste ou neuropsychologue. Votre rôle n''est pas de tout comprendre ni de tout guérir — mais de créer les conditions dans lesquelles votre enfant peut recevoir l''aide dont il a besoin et se développer à son rythme.\n\nPrendre soin de vous-même fait partie de ce rôle. Un parent épuisé, culpabilisé et isolé accompagne moins bien qu''un parent ressourcé et soutenu. Ce module est un premier pas — les suivants vous donneront des outils concrets.",
    "points_cles": [
      "Vous êtes le premier traducteur entre votre enfant et le monde",
      "Rôle de défenseur : représenter ses besoins face à l''école et aux pros",
      "Rôle d''observateur : remarquer et partager ce qui fonctionne",
      "Prendre soin de soi est une condition de l''accompagnement"
    ],
    "exemple": "Lors d''un entretien avec l''enseignante, vous pouvez dire : «J''ai observé que Thomas réussit mieux quand les consignes sont données à l''oral ET à l''écrit, et quand il est assis près du tableau. Est-ce quelque chose qu''on pourrait tester en classe ?». C''est du rôle de défenseur informé — ni agressif, ni passif."
  }
]'::jsonb
WHERE code = 'M1';

-- ═════════════════════════════════════════════════════════════════════════
-- MODULE M2 — Identifier les forces et le profil de son enfant
-- ═════════════════════════════════════════════════════════════════════════

UPDATE public.modules
SET lesson_sections = '[
  {
    "titre": "Pourquoi identifier les forces avant les difficultés",
    "contenu": "Le réflexe naturel face aux difficultés scolaires est de se concentrer sur ce qui ne va pas : les notes insuffisantes, les comportements problématiques, les compétences manquantes. C''est compréhensible — mais c''est aussi contre-productif comme point de départ.\n\nLes recherches en psychologie positive et en neuropsychologie montrent que partir des forces produit de meilleurs résultats que partir des déficits. Pourquoi ? Parce que les forces sont les leviers d''accès aux difficultés. Un enfant qui sait qu''il a une mémoire exceptionnelle peut utiliser cette force pour compenser ses difficultés en lecture. Un enfant créatif peut s''appuyer sur le dessin pour organiser ses idées avant d''écrire.\n\nMais il y a une raison encore plus fondamentale : l''estime de soi. Un enfant neurodivergent reçoit quotidiennement des messages négatifs sur ses performances — de l''école, parfois de la maison, souvent de ses propres pensées. Identifier et nommer explicitement ses forces contre-balance ce flux de messages négatifs. Ce n''est pas un mensonge bienveillant — c''est un rétablissement de l''équilibre informationnel.",
    "points_cles": [
      "Les forces sont les leviers d''accès aux difficultés — pas des bonus",
      "Partir des forces produit de meilleurs résultats que partir des déficits",
      "Nommer les forces contrebalance les messages négatifs reçus à l''école",
      "Identifier les forces = voir l''enfant tel qu''il est vraiment, en entier"
    ],
    "exemple": "Marie a 11 ans et a une dyslexie sévère. Elle déteste la lecture mais adore les animaux — elle peut parler pendant des heures d''espèces rares avec un vocabulaire précis. Sa mère utilise cet intérêt : ils lisent ensemble des documentaires sur les animaux, d''abord à voix haute, puis Marie lit seule des paragraphes. La progression est 3 fois plus rapide que sur des textes «scolaires» neutres."
  },
  {
    "titre": "Le profil cognitif : comprendre le fonctionnement de votre enfant",
    "contenu": "Le profil cognitif d''un enfant est la cartographie de ses capacités — ce qu''il fait facilement, ce qui lui coûte, et comment ces zones interagissent. Pour les enfants neurodivergents, ce profil est souvent «en dents de scie» : des pics remarquables dans certains domaines, des creux significatifs dans d''autres.\n\nCette hétérogénéité est caractéristique — et souvent source de confusion. Un enfant avec un vocabulaire et une culture générale d''adulte peut être incapable d''organiser ses affaires ou de suivre plusieurs instructions à la suite. Ce décalage n''est pas de la mauvaise volonté — c''est la signature d''un profil atypique.\n\nLes grandes dimensions du profil cognitif à connaître sont : la mémoire de travail (capacité à maintenir plusieurs informations en tête simultanément), la vitesse de traitement (rapidité à traiter l''information), le raisonnement fluide (capacité à résoudre des problèmes nouveaux), les compétences verbales et non-verbales, et les fonctions exécutives (planification, inhibition, flexibilité).\n\nVous n''avez pas besoin d''un bilan neuropsychologique pour commencer à observer le profil de votre enfant — même si ce bilan, quand il est accessible, reste la référence. L''observation quotidienne attentive révèle déjà beaucoup.",
    "points_cles": [
      "Profil «en dents de scie» = forces élevées ET difficultés marquées chez le même enfant",
      "Ce décalage n''est pas de la mauvaise volonté — c''est un profil atypique",
      "5 dimensions clés : mémoire de travail, vitesse, raisonnement, verbal/non-verbal, fonctions exécutives",
      "L''observation quotidienne révèle autant qu''un bilan formel sur certains points"
    ],
    "exemple": "Théo a 13 ans. Il résout mentalement des calculs complexes mais oublie systématiquement de noter ses devoirs. Sa mémoire de travail à long terme est excellente, mais sa mémoire de travail immédiate et ses fonctions exécutives sont déficitaires. Ce n''est pas de l''inattention globale — c''est un profil spécifique qui appelle des stratégies spécifiques."
  },
  {
    "titre": "Observer les forces : ce que vous voyez à la maison",
    "contenu": "Les professionnels voient l''enfant dans un contexte contrôlé et formaté — l''école ou le cabinet. Vous, vous voyez votre enfant dans tous les autres contextes : le jeu libre, les interactions sociales, les passions, les moments de stress, les conversations du soir. Ces observations ont une valeur inestimable.\n\nLes forces se révèlent souvent dans ce qui n''est pas évalué à l''école. L''enfant qui construit des structures Lego complexes pendant des heures développe une intelligence spatiale et une capacité de planification réelles. Celui qui crée des jeux inventés avec des règles sophistiquées démontre une pensée systémique. Celui qui mémorise toutes les répliques d''un film développe une mémoire procédurale et une sensibilité au langage.\n\nPour observer les forces, posez-vous ces questions : Dans quoi mon enfant entre-t-il spontanément en état de flux (concentration totale, sans effort apparent) ? Que fait-il pendant ses moments libres sans que je lui demande ? Quand est-ce qu''il est le plus fier de lui ? Quand est-ce qu''il aide spontanément les autres ? Quels sujets peut-il développer pendant des heures sans perdre le fil ?\n\nCes observations ne remplacent pas un bilan professionnel — mais elles vous donnent une matière première que vous seul(e) pouvez rassembler.",
    "points_cles": [
      "Vos observations à la maison valent autant que les évaluations formelles",
      "Les forces se révèlent dans ce qui n''est pas évalué à l''école",
      "Le jeu libre est un observatoire privilégié des forces spontanées",
      "Questions clés : où est son flux ? Ses passions ? Ses fiertés ?"
    ],
    "exemple": "Observez votre enfant jouer à Minecraft. Il organise des ressources, planifie des constructions, gère une «économie» virtuelle, résout des problèmes imprévus. Ces compétences — organisation, planification, gestion de ressources — sont réelles et transférables. Le problème n''est pas qu''il n''a pas ces compétences : c''est qu''elles ne sont pas encore mobilisées dans le contexte scolaire."
  },
  {
    "titre": "Construire une carte des forces de votre enfant",
    "contenu": "Une carte des forces est un outil simple mais puissant : un document (même une simple feuille) qui recense les forces observées de votre enfant, organisées par domaine. Ce n''est pas un exercice scolaire — c''est un outil de navigation parentale.\n\nVous pouvez l''organiser par catégories : Forces cognitives (mémoire, logique, créativité...), Forces sociales (empathie, humour, leadership...), Forces pratiques (dextérité, orientation, bricolage...), Intérêts intenses (les sujets de passion qui mobilisent l''énergie), Forces caractérielles (persévérance, générosité, honnêteté...).\n\nCette carte a plusieurs usages concrets. Elle vous aide à parler de votre enfant à l''école depuis un angle positif — «voici ce qui fonctionne chez lui, comment on peut s''appuyer dessus». Elle aide l''enfant lui-même à construire une narrative positive de lui-même — en lisant avec lui ce qui a été observé. Elle aide les professionnels à prendre en compte le profil complet, pas seulement les déficits.\n\nRévisez-la tous les 3 à 6 mois. Les forces évoluent, de nouvelles apparaissent, certaines s''affirment. Cette carte doit être vivante.",
    "points_cles": [
      "La carte des forces est un outil de navigation, pas un exercice scolaire",
      "5 catégories : cognitives, sociales, pratiques, intérêts, caractérielles",
      "Usages : dialoguer avec l''école, construire l''estime de soi, briefer les pros",
      "À réviser tous les 3-6 mois — c''est un document vivant"
    ],
    "exemple": "Carte des forces de Camille, 10 ans : Cognitives — mémoire visuelle exceptionnelle, raisonnement analogique fort. Sociales — très empathique, sait consoler les autres, bonne humour. Pratiques — danse, cuisine créative. Intérêts — astronomie, dessins manga. Caractérielles — persévérante quand elle croit en quelque chose, honnête même quand c''est difficile. Cette carte a changé la façon dont sa mère parlait d''elle à l''école."
  }
]'::jsonb
WHERE code = 'M2';
