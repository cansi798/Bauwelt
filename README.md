# Bauwelt Handwerk – Website

Mehrseitige Marken-Website der **Bauwelt Handwerk GmbH** (Norderstedt).
Kernbotschaft: Badsanierung zum Festpreis, Sanierung & Modernisierung – alles aus einer Hand.

Gebaut mit **[Astro](https://astro.build)** (statische Ausgabe, 0 JS by default).
Design und Inhalte folgen dem CI-Handbuch (`CI_Handbuch_Bauwelt_Handwerk.pdf`).
Deployt über **GitHub Pages** (GitHub Action).

## Seitenstruktur (nach CI Kap. 6.8)

- `/` Startseite (Hero, Leistungen, Badkalkulator, Referenzen, Ablauf, Zahlen, Stimmen, FAQ, Termin, Kontakt)
- `/leistungen/` Übersicht + je Gewerk eine Unterseite (`/leistungen/badsanierung/` usw.)
- `/referenzen/` Galerie + Projekt-Detailseiten (`/referenzen/<projekt>/`)
- `/ueber-uns/`, `/karriere/`, `/kontakt/`
- `/impressum/`, `/datenschutz/`, `404`

## Projektstruktur

```
src/
  pages/            Seiten & dynamische Routen ([slug].astro)
  layouts/          BaseLayout (Head, Header, Footer, globales Verhalten)
  components/       Header, Footer, Hero, Calculator, Gallery, Faq, … (wiederverwendbar)
  content/          Inhalte als Markdown (leistungen/, referenzen/, stellen/)
  styles/global.css Designsystem (Tokens 1:1 aus CI Kap. 6.10) + Schriften
  consts.ts         Firmendaten (Telefon, E-Mail, Adresse) + base-URL-Helfer
public/assets/      Logo, Favicons, OG-Bild, Bilder (img/)
.github/workflows/  deploy.yml (Build + Deploy nach GitHub Pages)
```

## Lokal entwickeln

> Hinweis: Auf dem VirtualBox-Shared-Folder ist `bin-links=false` gesetzt (`.npmrc`),
> weil das Dateisystem keine Symlinks erlaubt. Astro daher direkt über Node aufrufen:

```bash
npm install
node node_modules/astro/astro.js dev        # Dev-Server
node node_modules/astro/astro.js build       # Build nach ./dist
node node_modules/astro/astro.js preview     # Vorschau des Builds
```

(Auf normalen Systemen genügen `npm run dev` / `npm run build`.)

## Inhalte pflegen

- **Neue Referenz / Stelle / Leistung:** eine Markdown-Datei in `src/content/…` anlegen –
  erscheint automatisch in Übersicht und Detailseite.
- **Bilder:** Dateien mit den Namen aus `BILDER.md` in `public/assets/img/` ablegen –
  werden automatisch angezeigt (sonst bleibt der markenkonforme Platzhalter).
- **Firmendaten** (Telefon, E-Mail, Adresse): zentral in `src/consts.ts`.
- **Kalkulator-Preise:** `PRICING`-Objekt in `src/components/Calculator.astro`.

## Noch offen

Siehe **`OFFENE-INFOS.md`** (Formular-Backend, Buchungsanbieter, echte Preise/Zahlen,
Handwerkskammer im Impressum, Datenschutz-Review, eigene Domain …) und **`BILDER.md`**.

## Deployment

Push auf `main` → GitHub Action (`.github/workflows/deploy.yml`) baut mit Astro und
veröffentlicht auf GitHub Pages. Pages-Quelle = „GitHub Actions".
Bei eigener Domain `base` in `astro.config.mjs` von `/Bauwelt` auf `/` ändern.
