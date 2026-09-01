# Design: Website-Relaunch nach Enpal-Vorbild (Grüne Wiese)

**Datum:** 2026-09-02 · **Status:** Freigegeben (Kunde hat autonome Umsetzung über Nacht
inkl. Commit & Push beauftragt; sektionsweise Design-Freigaben liegen vor)
**Ziel:** Die Bauwelt-Website übernimmt Aufbau, Dramaturgie und Interaktionsmuster von enpal.de
(Mobil + Desktop) vollständig — übersetzt auf Handwerksthemen, mit eigenen Bildern, Texten und
Animationen. Keine Übernahme von Enpal-Bildern, -Logos oder -Texten (Urheberrecht).

## 1. Entscheidungen (mit Kunde abgestimmt)

| Frage | Entscheidung |
|---|---|
| Umfang | Alles auf einmal: Startseite + alle Unterseiten |
| Ansatz | **B — Grüne Wiese:** neues Astro-Projekt, Inhalte werden migriert |
| Haupt-CTA | **Kalkulator-Funnel** „Projekt berechnen" → `/rechner`, überall wiederholt |
| Navigation | **Dropdowns wie Enpal** (Leistungen-, Unternehmen-Dropdown) |
| Video | Sektion mit Platzhalter-Standbild vorbereiten, Video wird nachgeliefert |
| Trust | **Eigene anklickbare Versprechen-Siegel** (keine fremden/erfundenen Prüfzeichen) |

## 2. Projekt-Setup & Migration

- **Neues Astro-Projekt (aktuelle Astro-5-Version; Fallback: Astro 4.16 falls der
  npm-Neuinstall auf vboxsf scheitert — der Umbau ist davon unabhängig)**, TypeScript,
  kein UI-Framework —
  Interaktionen als leichtgewichtiges Vanilla-JS in Astro-Komponenten (wie bisher, „0 JS default").
- Aufbau auf Branch **`relaunch`** im selben Repo; `main` bleibt bis zum Merge live.
- **Migriert wird (Daten/Infrastruktur, kein Komponenten-Code):**
  - `src/content/` — 6 Leistungen, 6 Referenzen, 3 Stellen (Schema wird erweitert, s. §6)
  - `src/consts.ts`-Fakten: Kontaktdaten, `EMAILS`, `waLink()`, echte Zahlen (30+ Bäder,
    15+ Komplettsanierungen, 10+ Jahre)
  - `public/assets/img/` + `BILDER.md`-Mechanik (Dateiname → erscheint automatisch, sonst Platzhalter)
  - `public/robots.txt`, Favicon, `.github/workflows/deploy.yml`, `site`/`base: '/Bauwelt'`
  - **Relexable-Booking-Embed** (`BookingEmbed`-Verhalten: 1-Klick-Laden via `#termin`-Delegation,
    origin-geprüftes Höhen-Script, Herkunftshinweis) — Verhalten übernehmen, Code neu
  - Eigene `src/pages/sitemap.xml.ts` (NICHT @astrojs/sitemap — Crash-Historie), JSON-LD
    GeneralContractor, robots-Meta, noindex auf Rechtsseiten
  - Impressum-/Datenschutz-Inhalte unverändert (nur neues Layout); Datenschutz enthält §6 Relexable
- **vboxsf-Regeln gelten weiter:** `.npmrc` mit `bin-links=false` behalten; Astro via
  `node node_modules/astro/astro.js <dev|build|preview>`; für das neue Projekt einmalig
  `rm -rf node_modules package-lock.json && npm install`; kein `sed -i`; Git-Dir liegt nativ
  unter `/home/ki-ubuntu/bauwelt-git`.

### URL-Struktur (identisch zu heute — SEO, keine toten Links)

`/` · `/leistungen/` + `/leistungen/<slug>` (6) · `/referenzen/` + `/referenzen/<slug>` (6) ·
`/ueber-uns` · `/karriere` · `/partner` · `/kontakt` · `/impressum` · `/datenschutz` · `/404`
· **NEU:** `/rechner` (mehrstufiger Projekt-Funnel als eigene Seite).

## 3. Startseite — Dramaturgie (Enpal-Mapping)

Jede Sektion beantwortet einen Kundeneinwand und endet im Haupt-CTA „Projekt berechnen":

1. **Hero:** Headline „Sanierung & Ausbau zum Festpreis" + Unterzeile (persönlich beraten,
   aus einer Hand, termintreu). 3 Trust-Häkchen: Festpreis-Garantie · Alles aus einer Hand ·
   Termintreue. CTA → `/rechner`. Hero-Bild `hero.webp` (Mobil oben, Desktop rechts).
   Ein Versprechen-Siegel als Badge an Enpals Testsiegel-Position.
2. **Trust-Band** (statt „Bekannt aus"): NUR belegbare Zahlen — 30+ Bäder saniert,
   15+ Komplettsanierungen, 10+ Jahre Erfahrung, 24-h-Reaktionszeit. Zähl-Animation.
   Google-Sterne erst, wenn Profil + Bewertungen existieren (→ OFFENE-INFOS.md).
3. **6 Leistungs-Sektionen** (Enpals Produkt-Sektionen): je Gewerk eine Bild-Text-Sektion,
   Bild alternierend links/rechts, Headline im Muster „Badsanierung zum Festpreis — Ihr
   Traumbad in 3 Wochen", 2–3 Sätze, eigener CTA („Bad berechnen" → `/rechner?gewerk=bad`).
   Kein Karten-Grid auf der Startseite mehr.
4. **Video-Sektion:** „Wie arbeitet Bauwelt? In 3 Minuten erklärt" — Player-Rahmen mit
   Standbild `video-poster.webp` (BILDER.md), bis Video/YouTube-Link geliefert wird.
5. **USP-Sektion, 3 Säulen** (je mit Bild): Regional & persönlich / Alles aus einer Hand /
   Zum Festpreis fertig.
6. **Referenz-Slider** (statt Testimonial-Slider): Referenzprojekte mit Foto + Ort + Eckdaten,
   Pfeile + Wischen. **Kundenzitate NUR wenn echte existieren** (optionales Frontmatter-Feld
   `quote`; aktuell gibt es keine → Slider zeigt Projektdaten ohne Zitate).
7. **CTA-Band:** „Ihr Haus, Ihr Projekt — jetzt berechnen" + 3 Trust-Punkte.
8. **Versprechen-Slider:** anklickbare eigene Siegel (s. §5).
9. **Ablauf in 4 Schritten** (bestehende Inhalte, neues Design).
10. **FAQ** (aufklappbar; letzte Frage endet im Termin-CTA).
11. **Kontakt/Ansprechpartner:** Jamil Iqbal + Burim Ahmedi (GF), Direktkontakt-Buttons
    (Anrufen, WhatsApp, E-Mail per mailto) — KEIN Formular (bewusste Kundenentscheidung).
12. **Großer mehrspaltiger Footer** (s. §4).

## 4. Header & Footer (site-weit)

**Header Desktop:** Logo links · Nav: **Leistungen** (Dropdown: 6 Gewerke mit Icon + Einzeiler,
darunter „Alle Leistungen") · **Referenzen** · **Unternehmen** (Dropdown: Über uns, Karriere,
Für Partner) · **Kontakt** · rechts CTA-Button **„Projekt berechnen"**. Dropdowns öffnen bei
Hover UND Klick, tastaturbedienbar (Pfeiltasten, Escape, Fokusfalle vermeiden).

**Header Mobil:** Leiste mit Logo, Anruf-Icon, WhatsApp-Icon, Burger → Vollbild-Menü mit
aufklappbaren Gruppen, `overflow-y: auto` + iOS-Safe-Area (Lektion aus Mobil-Menü-Bug).
Mobile Sticky-Leiste unten bleibt; ihr Button zeigt auf `/rechner`.

**Footer:** CTA-Band oben, dann 4 Spalten: Leistungen (6) · Unternehmen (Über uns, Referenzen,
Karriere, Partner) · Kontakt (Adresse, Telefon, WhatsApp, E-Mail, 24-h-Hinweis) · Rechtliches
(Impressum, Datenschutz). Copyright-Zeile.

## 5. Projekt-Rechner (`/rechner`) & Versprechen-Siegel

### Rechner-Funnel (4 Schritte, Fortschrittsbalken, Zurück-Navigation, Zustand bleibt erhalten)

1. **Gewerk wählen:** 6 Icon-Kacheln; Vorauswahl via `?gewerk=<slug>`.
2. **Umfang:** 2–3 gewerkspezifische Fragen (Bad: m² + Niveau Basis/Komfort/Premium;
   Dach: Fläche + Dämmung; analog je Gewerk). Preislogik des Badkalkulators übernehmen,
   auf andere Gewerke mit groben Spannen erweitern. **`PRICING` ist Platzhalter-Datenstand**
  (echte Preise noch offen → OFFENE-INFOS.md); Spannen bewusst breit + als Ersteinschätzung
   gekennzeichnet.
3. **Ergebnis sofort, ohne Kontakt-Zwang:** Preisspanne + Hinweis „unverbindliche
   Ersteinschätzung, Festpreis nach Vor-Ort-Termin".
4. **Kontakt (ohne Backend, GitHub Pages):** Termin buchen (Relexable-Embed) ·
   WhatsApp mit vorbefülltem Text inkl. Rechner-Angaben (`waLink()`) · E-Mail (mailto an
   `service@`, Betreff/Body vorbefüllt).

Ohne JavaScript: Rechner zeigt statischen Hinweis + die drei Kontaktwege direkt.

### Versprechen-Siegel

5–6 selbst gestaltete SVG-Badges in CI-Farben: Festpreis-Garantie · 5 Jahre Gewährleistung ·
Meisterqualität · Termintreue · Saubere Baustelle · Persönlicher Ansprechpartner.
Daten zentral in `src/data/versprechen.ts` (Titel, Kurzsatz, Erklärung, CTA-Ziel). Klick →
Overlay „Unser Versprechen an Sie: …" + Mini-CTA zum Rechner. Klar als EIGENE Zusagen
gekennzeichnet — kein „Testsieger"-Wording, keine fremden Prüfzeichen (UWG). Erscheinen als
Slider auf der Startseite, einzeln passend auf Unterseiten.

## 6. Unterseiten

- **Leistungs-Detailseiten** (Enpal-Produktseiten-Muster): Hero (Gewerk-Bild, „…zum
  Festpreis"-Headline, CTA „[Gewerk] berechnen") → Leistungsumfang als Häkchen-Liste →
  Ablauf → 1–2 passende Referenzen → passendes Siegel → Gewerk-FAQ → CTA-Band.
  **Schema-Erweiterung** `leistungen`: `checkliste: string[]`, `faq: {q,a}[]`,
  `siegel: string`, `rechnerSlug: string`.
- **Leistungen-Übersicht:** Kachel-Grid als Verteiler.
- **Referenzen-Übersicht:** Galerie mit Gewerk-Filter (Filter wieder aktivieren);
  **Detailseiten:** großes Vorher/Nachher, Eckdaten (Ort, Dauer, Umfang), Zitat nur wenn echt.
  Schema-Erweiterung `referenzen`: `dauer?`, `umfang?`, `quote?`.
- **Über uns:** Team, Werte, 3 USP-Säulen ausführlich, Ansprechpartner-Karten.
- **Karriere:** Stellen aus Collection, Benefits-Sektion; **Ansprache vereinheitlichen auf
  „Sie"** (war bisher „du").
- **Partner:** B2B, eigener Kontakt-CTA (E-Mail `partner@`, NICHT Rechner).
- **Kontakt:** Ansprechpartner, Relexable-Embed, Anfahrt, Direktkontakt-Buttons.
- **Impressum/Datenschutz:** Inhalte 1:1, neues Layout, weiterhin noindex.

## 7. Design-System, Animationen, Bilder, Texte

- **Tokens in neuer `global.css`:** Farben/Schriften aus `CI_Handbuch_Bauwelt_Handwerk.pdf`,
  Enpal-Look übersetzt (viel Weiß, große Typo, runde Karten, weiche Schatten, Pill-Buttons).
  Komponenten nutzen ausschließlich Tokens. Breakpoints 768/1024 (3 Ansichten).
- **Animationen:** Scroll-Reveal per IntersectionObserver mit hartem **No-JS-Fallback: ohne
  JS ist alles sofort sichtbar** (Designprinzip nach Reveal-Bug). Zähl-Animation im
  Trust-Band. Slider: CSS scroll-snap + Pfeil-Buttons + Tastatur. `prefers-reduced-motion`
  → keine Bewegung.
- **Bilder:** Bestand weiterverwenden; neue Motive (6 Gewerk-Sektionsbilder Startseite,
  3 USP-Bilder, `video-poster.webp`) mit exakten Dateinamen in `BILDER.md` ergänzen —
  bis dahin Platzhalter. Stil nach CI Kap. 5 (echt, warm, keine Stock-Models; ahmedi.de-Bilder
  sind tabu). Alle Bilder mit width/height (kein CLS) + lazy.
- **Texte:** komplett neu im Enpal-Ton — kurz, nutzenorientiert, konkret, durchgehend „Sie".
  Keine erfundenen Zahlen/Zitate; fehlende Fakten → `OFFENE-INFOS.md` + neutrale Formulierung.

## 8. Fehlerfälle & Qualitätssicherung

- Ohne JS: alles lesbar, Rechner degradiert zu Kontaktwegen, Menü/FAQ nutzbar (details/summary
  bzw. Checkbox-Fallback wo sinnvoll).
- Fehlende Bilder → dezenter Platzhalter (BILDER.md-Mechanik).
- **Tests:** `node node_modules/astro/astro.js build` fehlerfrei · Playwright-Screenshots je
  Seite in Mobil-/Tablet-/Desktop-Breite (768/1024) · interner Link-Check · Skills
  **security-check** und **seo** vor jedem Commit (Meta, JSON-LD, Sitemap, Alt-Texte,
  Header-Sicherheit, DSGVO).
- **Definition of Done:** Alle Seiten im neuen System, Build grün, beide Skills grün,
  Screenshots geprüft, Merge `relaunch` → `main` erst nach Kundenfreigabe.

## 9. Explizit NICHT im Umfang

Kein Backend/Formular-Server · keine echten Google-Bewertungen einbinden (erst wenn vorhanden)
· kein Enpal-Material (Bilder/Texte/Logos) · keine Magazin-/Blog-Sektion · kein Login/Portal
(Enpal hat eins — für Bauwelt ohne Funktion) · keine Mehrsprachigkeit.
