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

## 🟡 Belegt mit Übergangsbildern (Unsplash, frei lizenziert – jederzeit gegen eigene Fotos tauschbar)

> Quelle: **Unsplash** (Lizenz: kostenlose kommerzielle Nutzung, keine Namensnennung nötig),
> modellfreie/authentische Motive. Diese Bilder sind **Platzhalter mit echtem Motiv** – für
> maximale Glaubwürdigkeit später durch **eigene Projektfotos** ersetzen (gleicher Dateiname → tauscht automatisch).

| Dateiname | Seite | Motiv (aktuell) |
|---|---|---|
| `hero-referenzen.webp` | Referenzen-Übersicht | Modernes Bad, Glasdusche, Holz-Waschtisch |
| `hero-leistungen.webp` | Leistungen-Übersicht | Helles Marmorbad, freistehende Wanne |
| `hero-sanierung-modernisierung.webp` | Sanierung & Modernisierung | Heller Wohnraum, hohe Decken, Kamin |
| `hero-dach-fassade.webp` | Dach & Fassade | Dachdecker auf Gerüst, Ziegeldach |
| `hero-innenausbau.webp` | Innenausbau & Trockenbau | Heller Rohbau mit Rundbogenfenstern |
| `hero-sanitaer-heizung-elektro.webp` | Sanitär, Heizung, Elektro | Trockenbau + Heizkreisverteiler |
| `hero-maler-boeden.webp` | Maler & Bodenbeläge | Heller Raum, Malerleiter, neuer Boden |

## ⬜ Noch offen – Seiten-Heros (Querformat 16:9, ca. 1600 × 900 px)

| Dateiname | Seite | Motiv-Vorschlag |
|---|---|---|
| `hero-partner.webp` | Für Partner (B2B) | Zwei Handwerker besprechen einen Bauplan auf der Baustelle, professionell |
| `hero-ueber-uns.webp` | Über uns | Team in Anthrazit-Arbeitskleidung vor Projekt/Firmenwagen, freundlich, echt |
| `hero-karriere.webp` | Karriere | Motiviertes Handwerker-Team bei der Arbeit, gute Stimmung, echte Baustelle |
| `hero-kontakt.webp` | Kontakt | Freundlicher Ansprechpartner am Telefon im Büro, einladend |

> Diese vier zeigen **Personen/Team** – hier bewusst **keine** Stockmodelle eingesetzt
> (CI: „keine gestellten Stockfotos mit Models"). Am besten echte Team-/Baustellenfotos liefern.

## ⬜ Noch offen – Sonstige

| Dateiname | Verwendung | Format |
|---|---|---|
| `burim.webp` | Porträt Burim Ahmedi (GF) – zweiter Ansprechpartner im Kontaktbereich | quadratisch, ca. 400 × 400 |
| `team.webp` | „Über uns"-Sektion (Team-Foto) | 4:3, ca. 1200 × 900 |
| *(optional)* `og-image` -Ersatz | Vorschaubild beim Link-Teilen (aktuell Logo auf Anthrazit – funktioniert) | 1200 × 630 |

---

Weitere Referenzprojekte jederzeit ergänzbar: Bild ablegen + mir Titel/Ort nennen.
