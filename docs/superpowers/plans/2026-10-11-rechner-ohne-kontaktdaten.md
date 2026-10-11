# Rechner-Vertrauenshinweis „ohne Kontaktdaten“ – Implementation Plan

> **For agentic workers:** Native execution, danach Build + Playwright-Sichtprüfung.

**Goal:** Am Rechner (Startseite `#leistungen` = Ziel des Hero-CTA, und `/rechner/`) sieht der Kunde sofort, dass er ohne E-Mail/Telefonnummer seinen Preis bekommt; im Ergebnis steht, dass das Weiterleiten freiwillig ist.

**Architecture:** Ein Hinweis-Badge (Schild-Icon) oben in `src/components/Rechner.astro` → erscheint automatisch an beiden Stellen. Im Ergebnis-Schritt eine Zeile über den Kontakt-Buttons. Anrede: „Sie“ (wie die ganze Website).

**Spec:** Kundenwunsch Jamil 11.10.2026 (4).

## Global Constraints
- Text Badge: „Ohne E-Mail & ohne Telefonnummer – Preis sofort sehen“ + Unterzeile „Keine Registrierung, keine Kontaktdaten. Ihr Ergebnis bleibt bei Ihnen.“
- Ergebnis: „Nur wenn Sie möchten, schicken Sie uns Ihr Ergebnis – per WhatsApp oder E-Mail.“
- Rechner fragt nie Kontaktdaten ab: einziges Eingabefeld = Flächen-Slider, kein `<form>`, kein `fetch`/Tracking (geprüft per grep + Playwright: keine Inputs außer `type=range`, keine Netzwerk-Requests beim Rechnen).

## Review Focus
- Badge am Handy einzeilig/zweizeilig ohne Überlauf, nicht zu dominant.
- Badge auch ohne JS sinnvoll? → nur mit JS zeigen (ohne JS gibt es keinen Rechner).
- Hero-„Projekt berechnen“ springt zu `#leistungen` → Badge muss im sichtbaren Bereich nach dem Sprung liegen.

### Task 1: Badge + Ergebniszeile in `Rechner.astro`
### Task 2: Build, check-dom, Playwright (Desktop + Pixel 7: Badge sichtbar, Inputs/Requests prüfen, Ergebniszeile), Commit „Kundenwunsch 11.10. (4): …“, push, Live-Check.
