# Bauwelt Handwerk – Hinweise für Agenten

Astro-Website, Deploy = Push auf `main` → GitHub Actions → GitHub Pages (https://cansi798.github.io/Bauwelt/).

## Audit-Wächter (Pflicht, Jamil 19.10.2026)

Jamil: „Sobald eine Änderung Auswirkung auf eines der Audit-Themen hat, weise mich darauf hin.“

- **Vor jedem Commit audit-check laufen lassen:** `astro build` und danach `node scripts/audit-check.mjs` (oder `npm run audit-check`). Läuft zusätzlich automatisch in GitHub Actions nach dem Build (blockiert nie).
- Alle Regeln aus beiden Audits stehen in **`AUDIT-REGELN.md`** – vor Text-, Design-, SEO-, Datenschutz-, AGB-, Karten- oder Rechner-Änderungen lesen.
- **Betrifft eine Änderung ein Audit-Thema → Jamil im Talk-Raum (`gjcy64m2`) darauf hinweisen: was, warum, Empfehlung.** Kurz, auf Deutsch, ohne Fachbegriffe. Neue `AUDIT-WARNUNG`-Zeilen, die durch die eigene Änderung entstehen, sind immer so ein Fall.
- Neue Entscheidungen von Jamil in `AUDIT-REGELN.md` nachtragen und, wenn automatisch prüfbar, in `scripts/audit-check.mjs` ergänzen.

## Weitere Prüfungen

- `node scripts/check-dom.mjs` (Struktur, Meta, interne Links) nach dem Build.
- Skills `.claude/skills/seo` und `.claude/skills/security-check` beachten.
