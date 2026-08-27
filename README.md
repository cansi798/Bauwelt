# Bauwelt Handwerk – Website (Vorschau)

Moderne, markenkonforme Website für die **Bauwelt Handwerk GmbH** (Norderstedt).
Kernbotschaft: Badsanierung zum Festpreis, Sanierung & Modernisierung – alles aus einer Hand.

Statische Website (HTML/CSS/JS, ohne Build-Schritt), ausgelegt für **GitHub Pages**.
Design und Inhalte folgen dem CI-Handbuch (`CI_Handbuch_Bauwelt_Handwerk.pdf`).

## Struktur

```
docs/                     ← wird von GitHub Pages ausgeliefert
  index.html              Startseite (alle Sektionen nach CI Kap. 6.8)
  impressum.html          Pflichtseite
  datenschutz.html        Pflichtseite (Entwurf – bitte prüfen lassen)
  assets/
    styles.css            Designsystem (Tokens 1:1 aus CI Kap. 6.10)
    main.js               Kalkulator, Menü, Galerie, FAQ, Formular …
    logo.png              Logo (Standard, transparent)
    logo-inverse.png      Logo invers (Footer)
    favicon-*.png         Favicons / Bildmarke
    og-image.png          Vorschaubild für geteilte Links
    fonts/                lokal gehostete Schriften (Montserrat, Open Sans)
process_logo.py           erzeugt die Logo-Assets aus "Logo PDF.pdf"
```

## Lokal ansehen

```bash
cd docs && python3 -m http.server 8000
# Browser: http://localhost:8000
```

## Noch anzupassen (Platzhalter)

- **Preise im Badkalkulator** – Konstanten `PRICING` oben in `docs/assets/main.js` durch echte Werte ersetzen.
- **Bilder** – Hero und Galerie nutzen markenkonforme Platzhalter, jeweils mit
  fertigem KI-Prompt beschriftet. Echte Fotos oder KI-Bilder einsetzen.
- **Terminbuchung** – im Abschnitt „Termin" den Einbettungs-Code des
  Buchungsanbieters (z. B. Calendly / Cal.com) einfügen (Kommentar im HTML).
- **Kontaktformular** – aktuell nur Demo-Validierung; an ein Formular-Backend
  bzw. den E-Mail-Versand anbinden (`TODO` in `main.js`).
- **Zahlen & Kundenstimmen** – Beispielwerte durch echte Angaben ersetzen.
- **Tonalität** – konsequent „Sie" (CI Kap. 9). Bei Bedarf global anpassbar.

## Deployment

GitHub Pages → Branch `main`, Ordner `/docs`.
