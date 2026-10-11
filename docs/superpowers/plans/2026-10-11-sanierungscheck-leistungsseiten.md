# Sanierungscheck als 5. Leistung + einheitliche Leistungsseiten – Implementation Plan

> **For agentic workers:** Native execution, danach Build + Playwright-Sichtprüfung.

**Goal:** Immobilien-Sanierungscheck (Pauschal 499 €) wird überall als 5. Leistung geführt, und alle 5 Leistungsseiten folgen derselben kundenorientierten Struktur.

**Architecture:** Neue Content-Datei `src/content/leistungen/sanierungscheck.md` ist die einzige Quelle für Preis (`pauschalpreis: 499`) und Leistungsinhalt (`umfang`). `rechner.ts` bekommt `PAUSCHAL` (Karten-Daten ohne Rechenlogik); `Rechner.astro` zeigt für Pauschal-Leistungen statt Slider ein Festpreis-Panel (Inhalt aus der Collection). `leistungen/[slug].astro` wird zur einheitlichen Vorlage mit neuen Frontmatter-Feldern `introTitel`, `warum[]`, optional `h1Akzent`, `checks`, `bild`, `beschreibung`, `pauschalpreis`.

**Spec:** Kundenwunsch Jamil 11.10.2026 (3), Sprachnachricht via Koordinator.

## Global Constraints
- 5 Leistungen in Menü-Reihenfolge: Bad, Sanierung & Modernisierung, Fliesen & Boden, Innenausbau, Immobilien-Sanierungscheck.
- Sanierungscheck: Pauschalpreis 499 €, keine Rechenschritte; keine erfundenen Zertifikate/Zahlen.
- Seitenaufbau: H1 (wie bisher) → Intro ~8 Zeilen aus Kundensicht → „Warum <Leistung> mit Bauwelt Handwerk?“ (4 Vorteile) → Leistungsumfang → Ablauf → Referenzen → Versprechen → FAQ → CTA (Rechner bzw. Buchung).
- Keine „Meister“-Aussagen (Versprechen „Meisterqualität“ entfiel am 30.09.).
- SEO: eindeutiger Title, Description ≤160 Zeichen, genau eine H1, H2/H3 ohne Sprünge.

## Review Focus
- 5 Karten am Handy (2 Spalten) → 5. Karte über volle Breite, kein Überlauf.
- `/rechner/?gewerk=sanierungscheck` zeigt das Festpreis-Panel; unbekannte Slugs → Schritt 1.
- Wechsel Pauschal-Karte ↔ Rechner-Karte auf der Startseite ohne Fehler/Layout-Bruch.
- Abwechselnde Hintergründe bleiben korrekt, wenn Abschnitte fehlen (z. B. keine Referenzen beim Check).
- Die 3 nicht verlinkten Seiten (Dach, Maler, SHE) bauen weiter fehlerfrei (Felder optional).

---
### Task 1: Daten + Navigation
`sanierungscheck.md` (neu), Schema-Felder, `NAV2`, `waLink`, `PAUSCHAL` in rechner.ts, Overview-Description.
### Task 2: Rechner – Pauschal-Panel
`Rechner.astro`: Karten aus GEWERKE+PAUSCHAL, Panel `data-step="p-<slug>"`, Buttons Buchen/WhatsApp/E-Mail; Startseiten-Hinweiszeile entfernen; Desktop-Panel sticky.
### Task 3: Einheitliche Leistungsseiten
`[slug].astro` Vorlage + `PageHero` (`ctaNote`), Texte für 5 Seiten neu.
### Task 4: Verifikation + Release
Build, check-dom, Playwright (Desktop + Pixel 7: 5 Seiten, Startseite, Menü offen, /rechner/), Commit „Kundenwunsch 11.10. (3): …“, push, Live-Check.
