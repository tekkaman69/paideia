# CLAUDE.md — Paideia

## Auto-resume de génération de contenu

**RÈGLE PRIORITAIRE :** À chaque nouvelle session dans ce projet, lis d'abord
`content-generation-plan.md`. Si le fichier contient des tâches non complétées
(`[ ]`), reprends automatiquement la génération du prochain batch sans attendre
de demande explicite. Annonce simplement : "Je reprends la génération — Batch N".

## Stack technique

- **Next.js** App Router (src dans `app/`)
- **Supabase** — client non typé `createModulesClient()` pour les tables modules
- **Tailwind CSS** — palette custom : `primary`, `gold`, `sand`, `calm`
- **Fonts** : Quicksand 700 (titres), Inter (corps)

## Conventions

- Composants client : `'use client'` en première ligne
- Server actions : `'use server'` en première ligne dans `lib/actions/`
- Routes app : `app/(app)/app/parent/` pour parents, `app/(app)/app/eleve/` pour élèves
- Landing campaign : `app/(landing)/` (pas de nav principale)
- Toujours `ON CONFLICT DO NOTHING` sur les INSERTs de seed

## Profils utilisateurs

- **Parent** : tutoiement NON, ton professionnel rassurant, palette bleu primary
- **Élève** : tutoiement OUI, ton fun/encourageant, palette violet/amber, emojis

## Tables modules clés

- `modules` — `lesson_sections JSONB` (contenu cours), `audience` (parent/eleve/both)
- `profile_module_progress` — suivi par `profile_id` (auth UID) pour parents ET élèves
- `students.id` — UUID différent de `profile_id`, utilisé pour `award_xp` RPC

## Numéro WhatsApp landing

Placeholder actuel dans `app/(landing)/bilan/page.tsx` : `596696000000`
À remplacer par le vrai numéro avant mise en production.
