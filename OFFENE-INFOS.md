# Offene Infos & Aufgaben (Stand: Relaunch 02.09.2026)

Checkliste, was noch von euch gebraucht wird. Alles Offene zeigt auf der Website
einen sauberen Platzhalter bzw. eine neutrale Formulierung. Bilder: siehe **`BILDER.md`**.

Legende: ⬜ offen · ✅ erledigt

---

## A. Rechner „scharf" schalten (wichtigster Punkt)

- ✅ **Echte Preise für den Projekt-Rechner** (`src/data/rechner.ts`, Kundenwunsch 11.10.2026 (6)).
  Alle Anzeigen brutto inkl. 19 % MwSt. Bad: echte Preistabelle 3–15 m² (Basis/Komfort/Premium
  je +1.500 €, Barrierefreie Dusche immer unter 4.180 €). Fliesen & Boden: 55/75/85 € netto je m²
  + 500 € netto Grundpauschale. Sanierung & Modernisierung: bisherige Werte −50 %, dann + MwSt.
  - ✅ Innenausbau-Werte sind brutto, Sanierung-Altwerte waren netto (Kunde, 12.10.2026).
  - ✅ Premium-Bad enthält alles aus Komfort. Fliesen: m²-Preise nicht öffentlich zeigen.

## B. Inhalte

- ⬜ **Firmenvideo** – die Sektion „Wie arbeitet Bauwelt? In 3 Minuten erklärt" ist vorbereitet.
  YouTube-Link oder Videodatei liefern → wird in `src/data/home.ts` (`VIDEO.url`) eingetragen.
  Bis dahin: Standbild `video-poster.webp` (siehe BILDER.md).
- ⬜ **Kundenstimmen** – Referenz-Slider und -Detailseiten haben ein `quote`-Feld.
  NUR echte Zitate mit Einverständnis eintragen; aktuell bewusst leer.
- ⬜ **Google-Unternehmensprofil** – sobald vorhanden und Bewertungen da sind, können
  Sterne + Anzahl ins Zahlen-Band aufgenommen werden.
- ⬜ **Porträt Burim Ahmedi** (`burim.webp`) und echte Team-/Baustellenfotos (BILDER.md).
- ⬜ **Screenshot Kundenportal** – die neue Portal-Sektion der Startseite zeigt aktuell
  ein stilisiertes CSS-Mockup. Echten Screenshot (ohne echte Kundendaten!) liefern →
  ersetzt das Mockup in `src/components/PortalSection.astro`.
- ⬜ **Screenshot Muster-Angebot** – gleiche Lage in `src/components/AngebotSection.astro`:
  CSS-Mockup mit Markierungen (Festpreis, Leistungsumfang, digitale Freigabe …).
  Echten anonymisierten Angebots-Screenshot liefern, Markierungen bleiben erhalten.

- ✅ ~~Modul-Anteile im Rechner~~ – entfallen: Der „Genaue Angaben"-Modus wurde auf
  Kundenwunsch am 11.10.2026 entfernt, der Rechner arbeitet nur noch als schnelle Schätzung.
- ✅ ~~KI-Funktionen im Rechner~~ – am 12.09.2026 eingebaut (WebLLM/Gemma) und
  auf Kundenwunsch am selben Tag wieder entfernt („macht nicht viel Sinn").

## C. Rechtliches (vor Livegang unter eigener Domain)

- 🟡 **Datenschutzerklärung** – auf Kundenwunsch ohne Entwurfs-Hinweis, vollständig für den
  aktuellen Funktionsumfang (Hosting, Kontakt, Rechner, Relexable-Buchung, externe Links,
  Speicherdauer, Rechte). Kein Cookie-Banner nötig (keine Cookies, kein Tracking – in §4
  begründet). Externe juristische Prüfung vor Livegang unter eigener Domain bleibt empfohlen.
- ⬜ **Berufshaftpflicht** – Name/Sitz des Versicherers fürs Impressum nachreichen (optional).
- ✅ HWK Lübeck + meisterpflichtige Gewerke im Impressum.
- ✅ Versprechen-Siegel sind eigene Zusagen (kein fremdes Prüfzeichen-Wording).

## D. Domain & Betrieb

- ⬜ **Eigene Domain `www.bauwelt-handwerk.de`** – DNS-Zugang zusagen, dann:
  `base: '/'` in `astro.config.mjs`, Canonical/Sitemap prüfen, Search Console einrichten.
  Dazu **Bing Webmaster Tools** (Audit G4): Website per Import aus der Search Console
  hinzufügen, Sitemap einreichen. IndexNow ist schon eingebaut (`scripts/indexnow.mjs`,
  Schlüsseldatei in `public/`) und meldet nach dem Umzug jede Änderung automatisch an Bing.
- ⬜ **`portal.bauwelt-handwerk.de`** muss erreichbar sein, damit die Terminbuchung lädt
  (Embed ist eingebaut und origin-geprüft).

---

_Nichts davon blockiert die Vorschau – die Seite läuft mit Platzhaltern sauber weiter._
