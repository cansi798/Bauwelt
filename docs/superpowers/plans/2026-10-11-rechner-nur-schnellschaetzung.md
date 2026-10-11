# Rechner nur Schnelle Schätzung + kleinere Ergebnis-Buttons – Implementation Plan

> **For agentic workers:** Native execution (eine Session), danach Build + Playwright-Sichtprüfung.

**Goal:** Der Projekt-Rechner (Startseite + /rechner/) rechnet immer als schnelle Schätzung ohne Modus-Auswahl; die Kontakt-Buttons im Ergebnis sind auf dem Handy kleiner.

**Architecture:** Nur `src/components/Rechner.astro` (UI + Script) und `src/data/rechner.ts` (Datenmodell). Genau-Modus komplett raus: Modus-Umschalter, Länge×Breite, Arbeits-/Extras-Auswahl, Live-Preis, Button „Genauer machen“. Preis = `grund + menge × proEinheit[tier]` ± `spanne` (wie `preisspanne()` in rechner.ts). Bausteine bleiben (Ergebnisliste „Enthaltene Arbeiten“ + Fachbegriffe im Anfragetext), Feld `anteil` und `extras` entfallen.

**Tech Stack:** Astro 7 statisch, TypeScript-Client-Script.

**Spec:** Kundenwunsch Jamil 11.10.2026 (2), Sprachnachricht via Koordinator.

## Global Constraints
- Kein Modus-Umschalter mehr, Standard = schnelle Schätzung (Slider + Niveau).
- `?gewerk=<slug>` auf /rechner/ funktioniert weiter (Vorauswahl), unbekannte Slugs → Schritt 1.
- Ergebnis-Buttons ≤ 768 px: kleiner, Touch-Höhe ≥ 44 px, Text einzeilig auf Pixel 7; Desktop unverändert.

## Review Focus
- Ergebnis → zurück zum Umfang: statt „Genauer machen“ ein Button „Angaben ändern“ (springt zu Schritt 2, Werte bleiben).
- Leistungswechsel auf der Startseite im Ergebnis-Schritt → wieder Schritt 2, kein Scroll-Sprung beim Laden.
- WhatsApp-/Mail-Text enthält weiterhin Projekt, Größe, Niveau, Arbeiten (Fachbegriffe), Preisspanne.
- Kein toter Code/CSS zum Genau-Modus (grep: rmodus, rMasse, rModule, rExtras, rLivePreis, rVerfeinern, anteil, extras).
- Buttons auf 360–412 px Breite nicht umgebrochen, ≥ 44 px hoch.

---

### Task 1: Genau-Modus entfernen
**Files:** `src/components/Rechner.astro`, `src/data/rechner.ts`, `src/pages/rechner.astro` (Meta-Description), `OFFENE-INFOS.md` (Punkt `anteil` erledigt)
- [ ] Markup/CSS/Script des Genau-Modus löschen; `spanne()` ohne Faktor/Extras; Ergebnis-Gruppe „Enthaltene Arbeiten“.
- [ ] `Modul.anteil`, `Extra`, `Gewerk.extras` + alle Daten dazu entfernen.
- [ ] „Genauer machen“ → „Angaben ändern“ (`#rAendern`, `show(2)`).

### Task 2: Ergebnis-Buttons mobil kleiner
**Files:** `src/components/Rechner.astro`
- [ ] `@media (max-width: 768px)`: `.rechner__contact .btn` padding 12px 18px, font-size 15px, min-height 48px, Icon 18 px, gap 10px.

### Task 3: Verifikation + Release
- [ ] Docker-Build + `node scripts/check-dom.mjs` ohne Befunde.
- [ ] Playwright Desktop 1440 + Pixel 7: kein `.rmodus` im DOM, 4 Leistungen rechnen, Button-Höhen ≥ 44 und einzeilig messen, `?gewerk=fliesen-boden` + `?gewerk=dach-fassade`, Screenshots ansehen.
- [ ] Commit „Kundenwunsch 11.10. (2): …“ (Co-Authored-By als letzte Zeile), push, Live-Check per curl.
