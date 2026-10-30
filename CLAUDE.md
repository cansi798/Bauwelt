# Bauwelt Handwerk – Hinweise für Agenten

Astro-Website, Deploy = Push auf `main` → GitHub Actions → GitHub Pages (https://cansi798.github.io/Bauwelt/).

## Audit-Wächter (Pflicht, Jamil 19.10.2026)

Jamil: „Sobald eine Änderung Auswirkung auf eines der Audit-Themen hat, weise mich darauf hin.“

- **Vor jedem Commit audit-check laufen lassen:** `astro build` und danach `node scripts/audit-check.mjs` (oder `npm run audit-check`). Läuft zusätzlich automatisch in GitHub Actions nach dem Build (blockiert nie).
- Alle Regeln aus beiden Audits stehen in **`/home/can/projekte/Bauwelt-intern/AUDIT-REGELN.md`** (intern, bewusst NICHT im öffentlichen Repo; Sicherung in Nextcloud Bauwelt/Intern-Repo-Unterlagen) – vor Text-, Design-, SEO-, Datenschutz-, AGB-, Karten- oder Rechner-Änderungen lesen.
- **Betrifft eine Änderung ein Audit-Thema → Jamil im Talk-Raum (`gjcy64m2`) darauf hinweisen: was, warum, Empfehlung.** Kurz, auf Deutsch, ohne Fachbegriffe. Neue `AUDIT-WARNUNG`-Zeilen, die durch die eigene Änderung entstehen, sind immer so ein Fall.
- Neue Entscheidungen von Jamil in `/home/can/projekte/Bauwelt-intern/AUDIT-REGELN.md` nachtragen und, wenn automatisch prüfbar, in `scripts/audit-check.mjs` ergänzen.

## Weitere Prüfungen

- `node scripts/check-dom.mjs` (Struktur, Meta, interne Links) nach dem Build.
- **Breiten-Prüfung** (Jamil 20.10.2026, Gesamt-Audit D1/W2): keine Seite darf am Handy breiter sein als der Bildschirm. Nach dem Build im Playwright-Image:
  `sudo -n docker run --rm --shm-size=1g -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.48.2-jammy sh -c "npm i --silent --prefix /tmp/pw playwright@1.48.2 && node scripts/check-breite.mjs"`
  (Standard 390 + 360 px; andere Breiten mit `-e BREITEN=390,360,320`). Läuft auch in GitHub Actions (blockiert nicht). Danach `sudo chown -R can:can .`
- Ohne node auf dem Server bauen: `sudo -n docker run --rm -v "$PWD":/app -w /app node:22-bookworm sh -c "npm ci && npm run build && node scripts/audit-check.mjs && node scripts/check-dom.mjs"`.
- Skills `.claude/skills/seo` und `.claude/skills/security-check` beachten.

## Öffentliches Repo (Sicherheitsbericht 30.10.2026)

Das Repo ist öffentlich. Keine internen Unterlagen, Kalkulationen, Kundennotizen, Chat-Links, privaten Kontaktdaten oder Geheimnisse einchecken – solche Dateien gehören nach `/home/can/projekte/Bauwelt-intern/` bzw. in die Nextcloud. Die `.gitignore` sperrt die bekannten Fälle.
