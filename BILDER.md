# Bild-Briefing – Stand & offene Bilder

So funktioniert es: Bild erzeugen (KI oder Foto), **exakt so benennen** wie unten und in
**`public/assets/img/`** legen → erscheint **automatisch** auf der Website. Fehlt ein Bild,
bleibt ein dezenter Platzhalter.

**Format:** möglichst **WebP unter 200 KB**. PNG/JPG geht auch – kurz Bescheid geben,
ich optimiere und benenne um (`process_images.py`).

**Bildstil (CI Kap. 5):** echte Wirkung, keine gestellten Stockfotos mit Models; natürliches
warmes Licht; nicht übersättigt; keine Filter.

---

## ✅ Vorhanden

| Datei | Verwendung |
|---|---|
| `hero.webp` | Startseiten-Hero (16:9) |
| `ref-01-wannenbad.webp` … `ref-06-dach.webp` | Referenz-Galerie + Detailseiten (4:3) |
| `jamil.webp` | Porträt Jamil Iqbal – Berater-Kreis im Kontaktbereich |
| `hero-badsanierung.webp` | Hero der Gewerk-Seite Badsanierung (Kopie des Start-Heros) |

> **Wichtig – Ansprechpartner „beide":** Der Kontaktbereich zeigt jetzt **Jamil Iqbal**
> *und* **Burim Ahmedi (GF)**. Für den GF fehlt noch das Porträt. Sobald vorhanden als
> **`burim.webp`** in `public/assets/img/` ablegen (Porträt, quadratisch, WebP < 200 KB) –
> erscheint automatisch; bis dahin dezenter Platzhalter-Kreis.

> **Hinweis zu ahmedi.de:** Die „schönen" Motive dort (z. B. `luxury-modern-bathroom.jpg`,
> `renovation-of-an-old-house.jpg`, `bauarbeiter-auf-einer-baustelle.jpg`) sind **Stockfotos
> des Website-Baukastens** (CDN `site-media.eu`). Sie dürfen **nicht** auf die Bauwelt-Seite
> kopiert werden (Lizenz-/Abmahnrisiko). Nur **eigene** Fotos verwenden.

## ⬜ Noch offen – Seiten-Heros (Querformat 16:9, ca. 1600 × 900 px)

| Dateiname | Seite | Motiv-Vorschlag (KI-Prompt) |
|---|---|---|
| `hero-leistungen.webp` | Leistungen-Übersicht | Handwerker bei sauberer Arbeit auf moderner Baustelle, echtes Handwerk, warmes Licht |
| `hero-referenzen.webp` | Referenzen-Übersicht | Schöner sanierter Wohnraum oder Bad, warmes Licht, hochwertig |
| `hero-partner.webp` | Für Partner (B2B) | Zwei Handwerker besprechen einen Bauplan auf der Baustelle, professionell |
| `hero-ueber-uns.webp` | Über uns | Team in Anthrazit-Arbeitskleidung vor Projekt/Firmenwagen, freundlich, echt |
| `hero-karriere.webp` | Karriere | Motiviertes Handwerker-Team bei der Arbeit, gute Stimmung, echte Baustelle |
| `hero-kontakt.webp` | Kontakt | Freundlicher Ansprechpartner am Telefon im Büro, einladend |

## ⬜ Noch offen – Gewerk-Seiten-Heros (16:9, je Detailseite)

| Dateiname | Gewerk | Motiv-Vorschlag |
|---|---|---|
| `hero-sanierung-modernisierung.webp` | Sanierung & Modernisierung | Sanierter Altbau-Wohnraum, Fischgrätparkett, hohe Decken, Tageslicht |
| `hero-dach-fassade.webp` | Dach & Fassade | Neu eingedecktes Steildach + saubere Fassade, blauer Himmel |
| `hero-innenausbau.webp` | Innenausbau & Trockenbau | Moderner Innenraum im Ausbau, saubere Trockenbauwände, indirektes Licht |
| `hero-sanitaer-heizung-elektro.webp` | Sanitär, Heizung, Elektro | Saubere moderne Haustechnik-Installation, professionell |
| `hero-maler-boeden.webp` | Maler & Bodenbeläge | Frisch gestrichener heller Raum mit neuem Boden, warm |

## ⬜ Noch offen – Sonstige

| Dateiname | Verwendung | Format |
|---|---|---|
| `burim.webp` | Porträt Burim Ahmedi (GF) – zweiter Ansprechpartner im Kontaktbereich | quadratisch, ca. 400 × 400 |
| `team.webp` | „Über uns"-Sektion (Team-Foto) | 4:3, ca. 1200 × 900 |
| *(optional)* `og-image` -Ersatz | Vorschaubild beim Link-Teilen (aktuell Logo auf Anthrazit – funktioniert) | 1200 × 630 |

---

Weitere Referenzprojekte jederzeit ergänzbar: Bild ablegen + mir Titel/Ort nennen.
