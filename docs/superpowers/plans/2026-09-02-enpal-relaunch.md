# Enpal-Relaunch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Komplett-Relaunch der Bauwelt-Website nach Enpal-Vorbild (Aufbau, Dramaturgie, Interaktionen) als grüne Wiese auf Branch `relaunch`, am Ende Merge auf `main` + Push (GitHub Pages Deploy).

**Architecture:** Neues Astro-5-Projekt im selben Repo; alle Komponenten/Seiten/CSS neu, Inhalte (Content Collections, Bilder, Konstanten, Booking-Verhalten) migriert. Conversion-Funnel: alle Sektionen führen auf `/rechner` (mehrstufiger Projekt-Rechner). Vanilla-JS-Interaktionen mit hartem No-JS-Fallback.

**Tech Stack:** Astro 5 (statisch), TypeScript, Vanilla JS, CSS-Tokens (CI-Handbuch), GitHub Pages via `.github/workflows/deploy.yml`.

**Spec:** `docs/superpowers/specs/2026-09-02-enpal-relaunch-design.md`

## Global Constraints

- vboxsf: KEIN `npm run` (`.bin` fehlt) → `node node_modules/astro/astro.js <dev|build|preview>`; kein `sed -i`; `.npmrc` mit `bin-links=false` behalten; npm-Änderungen nur als Voll-Reinstall (`rm -rf node_modules package-lock.json && npm install`).
- `base: '/Bauwelt'`, `site: 'https://cansi798.github.io'` unverändert; ALLE internen Links über Helfer `u()`.
- CI-Tokens exakt wie bisher (Anthrazit/Gold-Palette, Montserrat/Open Sans aus `src/styles/fonts/`, Radius 4/8, Breakpoints 768/1024). Enpal-Look = Layout/Dramaturgie, Farben = CI.
- Texte durchgehend „Sie"; keine erfundenen Zahlen/Zitate/Prüfsiegel. Echte Zahlen: 30+ Bäder, 15+ Komplettsanierungen, 10+ Jahre, 24-h-Reaktion.
- Telefon `+4915142888841`, WhatsApp `4915142888841`, E-Mails aus `EMAILS` (service/impressum/bewerbung/partner).
- Ohne JS: alles sichtbar/lesbar (Reveal-Fallback!), Rechner degradiert zu Kontaktwegen.
- Rechtsseiten `noindex`. URLs identisch zu heute + neu `/rechner`.
- Jeder Task endet mit grünem `astro build` + Commit auf `relaunch`.

## File Structure (Ziel)

```
src/
  consts.ts                      # migriert + NAV neu (Dropdown-Struktur), waLink, u()
  data/versprechen.ts            # Siegel-Daten (id, title, short, long, cta)
  data/rechner.ts                # Gewerke, Fragen, Preislogik (PRICING je Gewerk)
  data/home.ts                   # Startseiten-Copy: Leistungs-Sektionen, USP, FAQ, Steps, Stats
  styles/global.css              # NEUES Design-System (Tokens beibehalten, Komponenten neu)
  styles/fonts/                  # kopiert (Montserrat, OpenSans woff2)
  layouts/BaseLayout.astro       # <head> (SEO, JSON-LD, OG), Header, Footer, Reveal-Script
  components/
    Icon.astro / IconSprite.astro  # SVG-Sprite (Pfade aus Altbestand portiert + neue Icons)
    Header.astro                 # Desktop-Nav + Dropdowns + CTA; scroll-shrink
    MobileMenu.astro             # Vollbild-Menü, aufklappbare Gruppen, safe-area, scrollbar
    StickyBar.astro              # mobile Leiste unten → /rechner + Anruf + WhatsApp
    Footer.astro                 # CTA-Band + 4 Spalten + Copyright
    SectionHead.astro            # eyebrow + H2 mit .accent + rule
    Img.astro                    # Bild mit width/height/lazy + Platzhalter-Fallback (BILDER.md-Mechanik)
    Hero.astro                   # Startseiten-Hero (Badge, Häkchen, CTA)
    TrustBand.astro              # Zahlen-Band mit Zähl-Animation
    LeistungSection.astro        # eine Bild-Text-Gewerk-Sektion (alternierend)
    VideoSection.astro           # Player-Rahmen + Poster-Platzhalter
    UspSection.astro             # 3 Säulen
    RefSlider.astro              # Referenz-Slider (scroll-snap + Pfeile)
    CtaBand.astro                # Wiederhol-CTA mit 3 Trust-Punkten
    SiegelSlider.astro + SiegelModal.astro  # Versprechen-Siegel + Overlay
    Steps.astro                  # Ablauf 4 Schritte
    Faq.astro                    # Akkordeon (details/summary)
    ContactSection.astro         # Ansprechpartner-Karten + Direktkontakt
    BookingEmbed.astro           # Relexable, 1-Klick via #termin-Delegation, origin-Check
    PageHero.astro               # Unterseiten-Hero
    Checkliste.astro             # Häkchen-Liste (Leistungsseiten)
    Gallery.astro                # Referenz-Grid mit Gewerk-Filter
  pages/  (identisch zu heute + rechner.astro; content config v5 glob loader)
public/assets/img/               # unverändert + neue Namen in BILDER.md
scripts/check-dom.mjs            # DOM-Checks auf dist/ (node, ohne neue Deps)
```

---

### Task 1: Branch + Astro-5-Scaffold + Basis-Build grün

**Files:** Create `package.json` (neu), `astro.config.mjs` (neu, gleiche site/base), `tsconfig.json`, `src/env.d.ts`; Branch `relaunch`.

- [ ] `git checkout -b relaunch`
- [ ] Altes `src/` nach `src_old/` verschieben (Referenz während Umbau; wird in Task 15 gelöscht), `git mv` nutzen. `src/content`, `src/consts.ts`, `src/styles/fonts/` zurückkopieren.
- [ ] Neues `package.json`: deps nur `astro@^5`. `rm -rf node_modules package-lock.json && npm install` (Fallback bei Fehler: `astro@^4.16` wiederherstellen).
- [ ] `astro.config.mjs` wie bisher (site/base/build.format/trailingSlash), Kommentar erhalten.
- [ ] Content config auf Astro-5-API prüfen: läuft `type:"content"` weiter? Sonst auf `glob()`-Loader migrieren (`import { glob } from 'astro/loaders'`), `render(entry)` statt `entry.render()`.
- [ ] Minimal-`BaseLayout.astro` + leere `index.astro` („Relaunch in Arbeit") → `node node_modules/astro/astro.js build` grün.
- [ ] Commit `relaunch: Astro-5-Scaffold, Build grün`.

### Task 2: Design-System `global.css` + `consts.ts` + Datenfiles

**Files:** Create `src/styles/global.css`, `src/data/{versprechen,rechner,home}.ts`; Modify `src/consts.ts` (NAV-Struktur).

**Interfaces (Produces):**
```ts
// consts.ts zusätzlich:
export type NavChild = { label: string; href: string; icon?: string; desc?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };
export const NAV2: NavItem[]; // Leistungen(6 children)+Alle, Referenzen, Unternehmen(3), Kontakt
export const CTA = { label: "Projekt berechnen", href: u("rechner/") };

// data/versprechen.ts:
export type Siegel = { id: string; title: string; short: string; long: string };
export const VERSPRECHEN: Siegel[]; // festpreis, gewaehrleistung(5J), meister, termin, sauber, ansprechpartner

// data/rechner.ts:
export type Tier = { id: string; label: string; hint: string };
export type Gewerk = {
  slug: string; label: string; icon: string; unit: string; min: number; max: number; default: number;
  grund: number; proEinheit: Record<string, number>; tiers: Tier[]; spanne: number;
};
export const GEWERKE: Gewerk[]; // bad(4500+2200/3000/4200, Spanne .15) + 5 weitere grobe Spannen (.25), als PLATZHALTER kommentiert
export const preisspanne = (g: Gewerk, menge: number, tier: string) => ({ von: number, bis: number });

// data/home.ts: LEISTUNG_SECTIONS (slug,titlePre,titleAccent,text,bild,ctaLabel),
// USP[3], FAQ_HOME[5], STEPS[4], STATS[4] (echte Zahlen), HERO (headline, sub, checks[3])
```

- [ ] `global.css`: Tokens 1:1 übernehmen; NEUE Komponentenschichten im Enpal-Look auf CI-Basis: `.btn` (Pill, gold-500 auf anthrazit-Text bzw. `.btn--dark`), `.card` (weiß, radius-md, shadow, hover-lift), `.slider` (scroll-snap-x + `.slider__btn`), `.reveal` (opacity/translate NUR wenn `html.js` gesetzt — Fallback-Prinzip), `.badge`, `.check-list`, `.dropdown`, Utility-Klassen, `prefers-reduced-motion` deaktiviert alles.
- [ ] Copy in `home.ts` konkret ausformulieren (Enpal-Ton, „Sie", Muster: „Badsanierung zum Festpreis — Ihr neues Bad in 3 Wochen").
- [ ] Build grün → Commit.

### Task 3: Icons + Img-Fallback + SectionHead + Reveal

**Files:** Create `IconSprite.astro` (Pfade aus `src_old/components/IconSprite.astro` portieren + neu: whatsapp, phone, chevron, play, arrow-left/right, badge-check), `Icon.astro`, `Img.astro`, `SectionHead.astro`; BaseLayout: `<script>document.documentElement.classList.add('js')</script>` früh im head + IntersectionObserver-Reveal am Body-Ende.

**Interfaces:** `<Icon name="bad" size={24}/>`; `<Img src="hero.webp" alt="…" w={960} h={640} eager?/>` (prüft NICHT Existenz zur Buildzeit — rendert `onerror`-Fallback auf Platzhalter-Div); `<SectionHead eyebrow pre accent center?/>`.

- [ ] Implementieren, in Test-Index einbauen, Build grün, per `grep` in dist prüfen: `class="reveal"` NUR mit html.js-Gate im CSS. Commit.

### Task 4: Header + MobileMenu + StickyBar + Footer

**Files:** Create `Header.astro`, `MobileMenu.astro`, `StickyBar.astro`, `Footer.astro`; BaseLayout einbinden.

- [ ] Desktop: NAV2-Dropdowns — Button mit `aria-expanded`, Panel öffnet bei Hover (CSS `:focus-within`/JS) UND Klick; Escape schließt; Pfeiltasten navigieren Items. Leistungen-Panel: 6 Einträge mit Icon + desc + „Alle Leistungen"-Link. Rechts `.btn` „Projekt berechnen".
- [ ] Scroll-Shrink (header-h → header-h-scrolled) via einfachem scroll-Listener, throttled.
- [ ] Mobil <1024px: Leiste Logo + phone/whatsapp-Icons + Burger; Vollbild-Menü (`overflow-y:auto`, `env(safe-area-inset-bottom)`), Gruppen als `<details>`; StickyBar unten: „Projekt berechnen" → `u("rechner/")`.
- [ ] Footer: CTA-Band + 4 Spalten (Leistungen aus Collection, Unternehmen, Kontakt inkl. 24-h-Hinweis, Rechtliches) + Copyright.
- [ ] Build + DOM-Check (Header/Footer auf jeder Seite, aria-expanded vorhanden). Commit.

### Task 5: Startseiten-Sektionen Teil 1 (Hero, TrustBand, LeistungSection, VideoSection)

**Files:** Create `Hero.astro`, `TrustBand.astro`, `LeistungSection.astro`, `VideoSection.astro`; `index.astro` sektionsweise aufbauen.

- [ ] Hero nach Spec §3.1 (Badge = erstes Siegel klein, 3 Häkchen, CTA, `hero.webp` eager, Mobil Bild oben).
- [ ] TrustBand: 4 STATS, Zähl-Animation (data-count, nur mit js-Klasse; ohne JS stehen Endwerte da).
- [ ] 6× LeistungSection aus `LEISTUNG_SECTIONS`, alternierend (`reverse`-Prop), Bilder `home-<slug>.webp` via Img-Fallback, CTA → `u("rechner/?gewerk="+slug)`.
- [ ] VideoSection: Poster `video-poster.webp` + Play-Overlay; Klick zeigt Hinweis „Video folgt in Kürze" solange keine `VIDEO_URL` in consts gesetzt ist (leerer String = Platzhaltermodus).
- [ ] Build + Commit.

### Task 6: Startseiten-Sektionen Teil 2 (UspSection, RefSlider, CtaBand, SiegelSlider+Modal)

**Files:** Create `UspSection.astro`, `RefSlider.astro`, `CtaBand.astro`, `SiegelSlider.astro`, `SiegelModal.astro`.

- [ ] RefSlider: Karten aus Referenz-Collection (Bild `file`, title, place, dauer/leistung als Eckdaten; `quote` NUR falls Feld existiert — existiert aktuell nicht → keine Zitate). scroll-snap, Pfeil-Buttons, Tastatur, wischbar nativ.
- [ ] SiegelSlider: Badges als Inline-SVG (Kreis, gold-Ring, Icon, Titel im Bogen NICHT nötig — schlicht: Icon + Titel darunter); Klick → `<dialog>` mit long-Text + CTA zum Rechner; ESC/Backdrop schließt; ohne JS: `<details>`-Fallback statt dialog.
- [ ] index.astro komplettieren: Reihenfolge exakt Spec §3 (1–12), dazwischen Section-Wechsel weiß/sand.
- [ ] Build + DOM-Check (12 Sektions-Anker). Commit.

### Task 7: Steps, Faq, ContactSection, BookingEmbed

**Files:** Create `Steps.astro`, `Faq.astro`, `ContactSection.astro`, `BookingEmbed.astro`.

- [ ] Faq: `<details><summary>` (funktioniert ohne JS), Schatten-Karte, letzte Antwort mit Termin-CTA (`#termin`).
- [ ] BookingEmbed: Verhalten aus `src_old` übernehmen (Delegation auf alle `a[href*="#termin"]`, hashchange, Hash-beim-Load, iframe `https://portal.bauwelt-handwerk.de/buchen?embed=1`, Höhen-Script mit `event.origin`-Prüfung, Herkunftshinweis-Text).
- [ ] ContactSection: 2 Ansprechpartner-Karten (jamil.webp, burim.webp via Img-Fallback), Buttons Anrufen/WhatsApp/E-Mail (mailto service@), Adresse, KEIN Formular.
- [ ] Build + Commit.

### Task 8: `/rechner` — 4-Schritte-Funnel

**Files:** Create `src/pages/rechner.astro` (+ Inline-Script, Logik aus `data/rechner.ts` als JSON ins data-Attribut serialisiert).

- [ ] Markup: 4 `<section data-step>` + Fortschrittsbalken + Zurück-Button. Schritt 1: 6 Icon-Kacheln (radio). Schritt 2: Range (`unit`, min/max/default) + Tier-Radios aus Gewerk-Daten. Schritt 3: Ergebnis `preisspanne()` formatiert (de-DE) + Unverbindlich-Hinweis. Schritt 4 (direkt unter Ergebnis): Termin (`#termin` + BookingEmbed auf der Seite), WhatsApp (`waLink()` mit Text inkl. Gewerk/Menge/Tier/Spanne), mailto an service@ mit vorbefülltem subject/body.
- [ ] `?gewerk=<slug>` → Schritt 1 überspringen (vorgewählt, änderbar).
- [ ] `<noscript>`: Hinweistext + die 3 Kontaktwege statisch sichtbar.
- [ ] Zustand: einfache JS-State-Var, Zurück behält Werte; kein Storage nötig (YAGNI).
- [ ] DOM-Check: noscript vorhanden, 6 Kacheln, aria auf Fortschritt. Build + Commit.

### Task 9: Leistungs-Seiten (Übersicht + 6 Details)

**Files:** Create `pages/leistungen/index.astro`, `pages/leistungen/[slug].astro`, `PageHero.astro`, `Checkliste.astro`. Modify: content config (Felder existieren schon: umfang/ablauf/faq — zusätzlich optional `rechnerSlug`, `siegel`).

- [ ] Detail nach Spec §6: PageHero (`hero-<slug>.webp`, „…zum Festpreis", CTA `rechner/?gewerk=`) → Checkliste(umfang) → Ablauf → 2 passende Referenzen (cat-Mapping) → 1 Siegel → Gewerk-FAQ → CtaBand.
- [ ] Übersicht: Kachel-Grid (Icon, teaser, Link) + CtaBand.
- [ ] Build + Commit.

### Task 10: Referenz-Seiten (Übersicht mit Filter + 6 Details)

**Files:** Create `pages/referenzen/index.astro`, `pages/referenzen/[slug].astro`, `Gallery.astro`.

- [ ] Gallery mit Gewerk-Filter (Buttons bad/sanierung/aussen/alle; ohne JS: alle sichtbar).
- [ ] Detail: großes Bild, Eckdaten-Tabelle (Ort, Dauer, Leistung), Body-Text, weitere Referenzen, CtaBand.
- [ ] Build + Commit.

### Task 11: Über uns, Karriere (→„Sie"), Partner

**Files:** Create `pages/{ueber-uns,karriere,partner}.astro`.

- [ ] Über uns: PageHero, Story/Werte, USP ausführlich, team.webp, ContactSection.
- [ ] Karriere: Stellen-Collection als Karten (aufgaben/profil), Benefits-Sektion, CTA mailto bewerbung@; ALLE Texte in „Sie"-Form neu.
- [ ] Partner: B2B-Nutzen, CTA mailto partner@ (kein Rechner-CTA).
- [ ] Build + Commit.

### Task 12: Kontakt, Impressum, Datenschutz, 404

**Files:** Create `pages/{kontakt,impressum,datenschutz,404}.astro`.

- [ ] Kontakt: ContactSection + BookingEmbed + Anfahrt (Adresse als Text + Link zu Google-Maps-Suche, kein Karten-Embed → DSGVO).
- [ ] Impressum/Datenschutz: Inhalte AUS `src_old` 1:1 übernehmen (inkl. HWK Lübeck, Gewerke, §6 Relexable), neues Layout, `noindex` Prop an BaseLayout.
- [ ] Build + Commit.

### Task 13: SEO-Schicht + Sitemap

**Files:** Modify `BaseLayout.astro` (title/description-Props je Seite, canonical, OG, JSON-LD GeneralContractor aus SITE, robots-Meta); Create `pages/sitemap.xml.ts` (aus src_old portieren, Seitenliste + rechner ergänzen, Rechtsseiten raus).

- [ ] **Skill `seo` ausführen** und Findings umsetzen (Titles/Descriptions je Seite unique, Alt-Texte, H1-Hierarchie).
- [ ] Build + Commit.

### Task 14: BILDER.md + OFFENE-INFOS.md aktualisieren

- [ ] BILDER.md: neue Dateinamen dokumentieren (`home-<slug>.webp` ×6, `usp-1..3.webp`, `video-poster.webp`) mit Motiv-Briefing nach CI Kap. 5; vorhandene Zuordnungen aktualisieren (hero-Bilder weiter genutzt).
- [ ] Wo sinnvoll vorhandene Bilder wiederverwenden (z. B. `home-badsanierung` = `ref-01`… falls passend) statt Platzhalter.
- [ ] OFFENE-INFOS.md: echte Rechner-Preise je Gewerk, Video-Link, Google-Profil, burim.webp erneut listen.
- [ ] Commit.

### Task 15: QS-Gesamtlauf + Aufräumen

- [ ] `scripts/check-dom.mjs` schreiben: liest `dist/**/index.html`, prüft pro Seite: genau ein `<h1>`, `<title>` unique, kein „undefined"/„[object", alle internen `href^="/Bauwelt"` existieren als Datei, `noscript` auf /rechner, header/footer präsent. Ausführen, Fehler fixen.
- [ ] Screenshots: falls `npx playwright` verfügbar (Browser-Cache prüfen) je Seite 375px/768px/1280px in `shots/` (gitignored); sonst dokumentieren, dass DOM-Checks greifen.
- [ ] **Skill `security-check` ausführen** (Embed-origin, keine Secrets, externe Links rel, DSGVO) und Findings fixen.
- [ ] `src_old/` löschen, `git rm -r`. Build final grün. Commit.

### Task 16: Merge + Push (Deploy)

- [ ] `git checkout main && git merge relaunch` (fast-forward oder Merge-Commit), Push `origin main`.
- [ ] Deploy-Action-Status via GitHub API (git-credential-Token, s. Memory) prüfen: Workflow grün, Live-URL stichprobenartig laden (`curl https://cansi798.github.io/Bauwelt/` → neue Hero-Headline enthalten).
- [ ] Memory-Datei des Projekts aktualisieren (neuer Stand).
