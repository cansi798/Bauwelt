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
| `hero-partner.webp` | Für Partner (B2B) | Zwei Profis mit Tablet an Trockenbauwand |
| `hero-ueber-uns.webp` | Über uns | Bau-Crew auf der Baustelle |
| `hero-karriere.webp` | Karriere | Handwerker beim Trockenbau (s/w) |
| `hero-kontakt.webp` | Kontakt | Handschlag an heller Wand |
| `team.webp` | „Über uns"-Sektion (Team-Foto) | Team misst Wandöffnung im Rohbau |

> Personen-Motive zeigen **echte Arbeitssituationen** (keine gestellten Studio-Models).
> Für maximale Glaubwürdigkeit später durch **eigene Team-/Baustellenfotos** ersetzen.

## ⬜ Noch offen – Sonstige

| Dateiname | Verwendung | Format |
|---|---|---|
| `burim.webp` | Porträt Burim Ahmedi (GF) – zweiter Ansprechpartner im Kontaktbereich (echtes Foto nötig, Platzhalter aktiv) | quadratisch, ca. 400 × 400 |
| `video-poster.webp` | Standbild der Video-Sektion auf der Startseite („In 3 Minuten erklärt") – bis das echte Firmenvideo da ist. Motiv: Team/Baustelle in Aktion, warmes Licht | 16:9, ca. 1600 × 900 |

> **Relaunch-Hinweis (02.09.2026):** Die neue Startseite nutzt vorhandene Bilder weiter:
> die 6 Gewerk-Sektionen zeigen `hero-<gewerk>.webp`, die „Warum Bauwelt"-Karten
> `hero-ueber-uns.webp`, `team.webp` und `hero-kontakt.webp`. Eigene Projektfotos können
> diese Unsplash-Übergangsbilder jederzeit per gleichem Dateinamen ersetzen.
| *(optional)* `og-image` -Ersatz | Vorschaubild beim Link-Teilen (aktuell Logo auf Anthrazit – funktioniert) | 1200 × 630 |

---

Weitere Referenzprojekte jederzeit ergänzbar: Bild ablegen + mir Titel/Ort nennen.
