---
name: seo
description: Sorgt für gute Suchmaschinen-Auffindbarkeit dieser Website. Verwenden beim Anlegen oder Ändern von Seiten, Inhalten (Leistungen/Referenzen), Metadaten, Bildern und beim Deploy. Deckt Titel/Descriptions, Canonical, Sitemap, robots, strukturierte Daten (JSON-LD), Überschriften-Hierarchie, Alt-Texte, lokale SEO und Performance ab.
---

# SEO-Check (Bauwelt Handwerk Website)

Ziel: lokale Sichtbarkeit in Hamburg/Norderstedt für „Badsanierung Festpreis" & verwandte Begriffe. Bei jeder neuen/geänderten Seite durchgehen.

## Pro Seite
- **Einzigartiger Title** (~50–60 Zeichen), mit Kernbegriff + Ort, z. B. „Badsanierung zum Festpreis in Hamburg – Bauwelt Handwerk". Wird über `title`-Prop an `BaseLayout` gesetzt.
- **Meta-Description** (~140–160 Zeichen), konkret und einladend, mit Handlungsaufforderung. Über `description`-Prop.
- **Genau eine `<h1>`** pro Seite; darunter logische `<h2>`/`<h3>`-Hierarchie (keine Ebenen überspringen). Überschriften mit Begriffen, nicht nur „Willkommen".
- **Canonical** wird automatisch gesetzt (BaseLayout). Bei Bedarf prüfen.
- **noindex** für Rechtsseiten (Impressum/Datenschutz) und 404 – über `noindex`-Prop.

## Inhalte & Keywords
- In Fließtext natürliche Begriffe: „Badsanierung", „Festpreis", „Sanierung", „Modernisierung", Orte (Hamburg, Norderstedt, Umland). **Kein Keyword-Stuffing** (CI: kein Superlativ ohne Beleg, klare Sprache).
- Interne Verlinkung: Startseite → Leistungen → einzelne Gewerke → Referenzen → Kontakt. Sprechende Linktexte („Badpreis berechnen"), keine „hier klicken".
- Sprechende URLs (Slugs) auf Deutsch, mit Bindestrich, klein – erfüllt durch Dateinamen in `src/content` / `src/pages`.

## Bilder
- **Aussagekräftige `alt`-Texte** (was ist zu sehen + Kontext), keine leeren/generischen. Deko-Bilder: leeres `alt=""`.
- Format **WebP**, **< 200 KB** pro Bild (CI 6.1). Referenz: `process_images.py`. Sinnvolle Maße (Hero ~1600px, Kacheln ~1200px).
- `loading="lazy"` für Bilder außerhalb des ersten Viewports (Galerie erfüllt das).

## Technisch (bereits eingerichtet – bei Änderungen prüfen)
- **Sitemap:** eigener Endpoint `src/pages/sitemap.xml.ts` (listet indexierbare Seiten, ohne Impressum/Datenschutz/404). Ausgabe: `/sitemap.xml`. Neue statische Seiten dort ergänzen.
- **robots.txt** in `public/` verweist auf die Sitemap.
- **Strukturierte Daten:** JSON-LD `GeneralContractor` (Name, Adresse, Telefon, Öffnungszeiten, `areaServed`) im `BaseLayout`. Mit dem Rich-Results-Test prüfen, wenn geändert.
- **Open Graph** (Titel/Beschreibung/Bild 1200×630) gesetzt – Vorschau beim Teilen.
- **`lang="de"`**, Mobile-Viewport, semantisches HTML (`main`, `nav`, `section`, `article`, `figure`).

## Lokale SEO (wichtig für Handwerk)
- Adresse/Telefon (NAP) **konsistent** auf allen Seiten und identisch zu Google-Business-Profil.
- Empfehlung an den Kunden: **Google-Unternehmensprofil** anlegen/pflegen, echte Bewertungen sammeln (die Kundenstimmen auf der Seite sollten echt & belegbar sein).

## Performance (SEO-Rankingfaktor)
- Astro liefert statisches HTML, 0 JS by default – gut. Keine schweren externen Skripte ohne Grund.
- Nach größeren Änderungen: Lighthouse/PageSpeed prüfen (Ziel: Ladezeit < 2 s, gute Core Web Vitals).

## Bei eigener Domain (später)
- `site`/`base` in `astro.config.mjs` anpassen (base auf `/`), Canonical/Sitemap/OG-URLs prüfen.
- Weiterleitungen alter URLs beachten; Google Search Console einrichten und Sitemap einreichen.
