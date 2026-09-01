# Offene Infos & Aufgaben (Stand: Relaunch 02.09.2026)

Checkliste, was noch von euch gebraucht wird. Alles Offene zeigt auf der Website
einen sauberen Platzhalter bzw. eine neutrale Formulierung. Bilder: siehe **`BILDER.md`**.

Legende: ⬜ offen · ✅ erledigt

---

## A. Rechner „scharf" schalten (wichtigster Punkt)

- ⬜ **Echte Preise für den Projekt-Rechner** (`src/data/rechner.ts`).
  Aktuell Schätz-Platzhalter mit bewusst breiten Spannen. Pro Gewerk bitte:
  - Grundpauschale: ____ €
  - Preis pro m² für die drei Niveaus (Basis / Komfort / Premium): ____ / ____ / ____ €
  - gewünschte Spanne (aktuell ±15 % Bad, ±20–30 % übrige Gewerke): ____ %
  Die Bad-Werte entsprechen dem bisherigen Badkalkulator (4.500 € + 2.200/3.000/4.200 €/m²).

## B. Inhalte

- ⬜ **Firmenvideo** – die Sektion „Wie arbeitet Bauwelt? In 3 Minuten erklärt" ist vorbereitet.
  YouTube-Link oder Videodatei liefern → wird in `src/data/home.ts` (`VIDEO.url`) eingetragen.
  Bis dahin: Standbild `video-poster.webp` (siehe BILDER.md).
- ⬜ **Kundenstimmen** – Referenz-Slider und -Detailseiten haben ein `quote`-Feld.
  NUR echte Zitate mit Einverständnis eintragen; aktuell bewusst leer.
- ⬜ **Google-Unternehmensprofil** – sobald vorhanden und Bewertungen da sind, können
  Sterne + Anzahl ins Zahlen-Band aufgenommen werden.
- ⬜ **Porträt Burim Ahmedi** (`burim.webp`) und echte Team-/Baustellenfotos (BILDER.md).

## C. Rechtliches (vor Livegang unter eigener Domain)

- ⬜ **Datenschutzerklärung final prüfen lassen** (aktuell gekennzeichneter Entwurf;
  Relexable-Buchung und lokal rechnender Projekt-Rechner sind bereits beschrieben).
- ⬜ **Berufshaftpflicht** – Name/Sitz des Versicherers fürs Impressum nachreichen (optional).
- ✅ HWK Lübeck + meisterpflichtige Gewerke im Impressum.
- ✅ Versprechen-Siegel sind eigene Zusagen (kein fremdes Prüfzeichen-Wording).

## D. Domain & Betrieb

- ⬜ **Eigene Domain `www.bauwelt-handwerk.de`** – DNS-Zugang zusagen, dann:
  `base: '/'` in `astro.config.mjs`, Canonical/Sitemap prüfen, Search Console einrichten.
- ⬜ **`portal.bauwelt-handwerk.de`** muss erreichbar sein, damit die Terminbuchung lädt
  (Embed ist eingebaut und origin-geprüft).

---

_Nichts davon blockiert die Vorschau – die Seite läuft mit Platzhaltern sauber weiter._
