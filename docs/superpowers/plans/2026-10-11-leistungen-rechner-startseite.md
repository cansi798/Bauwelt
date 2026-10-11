# Leistungen-Rechner auf der Startseite – Implementation Plan

> **For agentic workers:** Native execution (eine Session), danach Build + Playwright-Sichtprüfung.

**Goal:** Der Projekt-Rechner kennt nur noch die 4 echten Leistungen und ersetzt auf der Startseite direkt unter dem Hero den Bereich „Unsere Leistungen“ (Leistungskarten = Rechner-Auswahl + „Mehr erfahren“).

**Architecture:** Die Rechner-Logik aus `src/pages/rechner.astro` wandert in `src/components/Rechner.astro` mit `variant: "seite" | "start"`. `seite` = bisheriger 3-Schritte-Funnel (/rechner/ unverändert). `start` = 4 Leistungskarten (Toggle-Buttons mit `aria-pressed`, daneben „Mehr erfahren“-Link) + Rechner-Panel (Schritt Umfang → Ergebnis), Badsanierung vorausgewählt und serverseitig vorgerendert (kein Layout-Sprung).

**Tech Stack:** Astro 7 (statisch), TypeScript-Client-Script, GitHub Pages unter `/Bauwelt/`.

**Spec:** Kundenwunsch Jamil 11.10.2026 (Sprachnachricht, im Auftrag zitiert).

## Global Constraints
- Nur 4 Leistungen: badsanierung, sanierung-modernisierung, fliesen-boden, innenausbau (Reihenfolge wie NAV2).
- Rechner-Bereich direkt UNTER dem Hero, nicht im Hero.
- Jede Karte: Icon, Titel, 1 Zeile Nutzen, „Mehr erfahren →“ zur Leistungsseite.
- Design-Sprache/Farben unverändert (gold/anthrazit, `.card`, `.section--sand`).
- Pixel 7 + Desktop 1440, keine Layout-Sprünge, Tastatur/Screenreader bedienbar.
- Dach/Fassade, Maler/Böden, SHE nicht mehr auf der Startseite verlinkt; Seiten bleiben online.

## Review Focus
- Seite /rechner/?gewerk=dach-fassade (alte Links) → darf nicht crashen, zeigt Schritt 1.
- Leistungsseiten ohne Rechner-Eintrag (dach-fassade, …) → CTA führt auf /rechner/ ohne Vorauswahl.
- fliesen-boden.md zeigt noch `rechnerSlug: maler-boeden` → auf fliesen-boden umstellen.
- Mobil: sticky „Preisspanne anzeigen“ darf nicht unter der festen StickyBar verschwinden.
- Wechsel der Leistung im Ergebnis-Schritt → zurück zu Umfang, kein Scroll-Sprung beim Laden.

---

### Task 1: Rechner-Daten auf 4 Leistungen
**Files:** Modify `src/data/rechner.ts`, `src/content/leistungen/fliesen-boden.md`
- [ ] dach-fassade, maler-boeden, sanitaer-heizung-elektro entfernen; `fliesen-boden` (icon `tiles`, skizze `raum`, Tiers Vinyl/Laminat · Fliesen · Großformat/Parkett, 5 Bausteine Summe 1.0, 4 Extras) zwischen sanierung-modernisierung und innenausbau einfügen.
- [ ] Feld `nutzen: string` (1 Zeile, Texte aus LEISTUNG_KARTEN) je Gewerk ergänzen.
- [ ] `rechnerSlug` in fliesen-boden.md → `fliesen-boden`.

### Task 2: Komponente `Rechner.astro`
**Files:** Create `src/components/Rechner.astro`; Modify `src/pages/rechner.astro`
- [ ] Markup/Style/Script aus rechner.astro übernehmen, Prop `variant`, Überschriften h2 (seite) / h3 (start).
- [ ] start: Karten-Gruppe statt Schritt 1, Panel `.card`, kein Progress, kein Zurück-Button, Termin-Button öffnet Buchungsfenster (`data-termin`), Scroll nur bei Bedarf.
- [ ] rechner.astro nutzt `<Rechner variant="seite" />`; check-dom-Marker (rechner__nojs, data-gewerke, progressbar, bookingEmbed) bleiben.

### Task 3: Startseite + Reste
**Files:** Modify `src/pages/index.astro`, `src/data/home.ts`, `src/consts.ts`, `src/components/Hero.astro`; Delete `src/components/LeistungKarten.astro`
- [ ] Sektion `#leistungen` (section--sand) mit SectionHead + `<Rechner variant="start" />` + Hinweiszeile Immobilien-Sanierungscheck.
- [ ] home.ts: 3 LEISTUNG_SECTIONS-Blöcke + LEISTUNG_KARTEN entfernen; waLink-Default nur 4 Leistungen.

### Task 4: Verifikation + Release
- [ ] Docker-Build + `node scripts/check-dom.mjs`.
- [ ] Playwright (1440 + Pixel 7): Screenshots, 4× Leistung wählen + rechnen, „Mehr erfahren“ klicken, /rechner/ prüfen.
- [ ] Commit „Kundenwunsch 11.10.: …“, push, Pages-Deploy abwarten, Live-Check per curl.
