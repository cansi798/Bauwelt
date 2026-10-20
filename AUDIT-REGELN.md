# Audit-Regeln Bauwelt Handwerk

Verbindliche Checkliste aus den beiden Audits – **Website-Audit 17.10.2026** (UX, Design, Animation, Wording, Conversion, Marke; Nummern 1.1–7.8) und **SEO-/KI-Audit 19.10.2026** (S = SEO, L = Lokal, K = KI-Konformität/Recht, G = KI-Plattformen), inkl. Jamils Entscheidungen im Talk-Raum „Bauwelt“ (Nachrichten 2154–2392).
Berichte: Nextcloud `Bauwelt/Website-Audit/`.

**Auftrag Jamil (19.10.2026, Msg 2392):** „Sobald eine Änderung Auswirkung auf eines der Audit-Themen hat, weise mich darauf hin.“

## So arbeiten (jeder Agent, jede Änderung)

1. Nach dem Build: `node scripts/audit-check.mjs` (läuft auch automatisch in GitHub Actions, blockiert den Deploy nicht).
2. Jede Zeile `AUDIT-WARNUNG` lesen. Entweder beheben oder bewusst so lassen.
3. **Berührt eine Änderung ein Thema unten → Jamil im Talk-Raum `gjcy64m2` darauf hinweisen**: *was* sich ändert, *warum* es ein Audit-Thema berührt, *Empfehlung*. Kurz, ohne Fachbegriffe.
4. Neue Entscheidungen von Jamil hier nachtragen (mit Datum + Audit-Nummer) und, wenn prüfbar, in `scripts/audit-check.mjs` ergänzen.

---

## 1. Texte & Wording (Audit 4.x, 7.5–7.8, K3)

**Einheitsbegriffe (immer so):**

| Thema | So schreiben | Nicht mehr |
|---|---|---|
| Termin (4.1) | „Kostenloser Vor-Ort-Termin“, Button „Vor-Ort-Termin buchen“ | Besichtigungstermin, Beratungstermin, Erstes Gespräch, Telefontermin |
| Rechner-CTA (4.4) | „Preis berechnen“ (im Rechner: „Preisspanne anzeigen“) | Projekt berechnen, Jetzt Preis berechnen, Festpreis ansehen |
| Rechner-Ergebnis (4.3) | „Preisspanne“, Format „14.340 – 19.500 €“ | Preisrahmen, Preiseinschätzung, Ersteinschätzung, „ab … bis …“ |
| Preis der Checks (4.2/4.3) | „Pauschalpreis“ (595 € / 199 €) | „Festpreis“ für Checks |
| Auftragspreis (4.2) | „Festpreis“, Siegel „Festpreis-Zusage“ | Festpreis-Garantie, Preisgarantie |
| Ansprechpartner (4.6/7.6) | „Ein fester Ansprechpartner“ | deutschsprachiger Ansprechpartner |
| Reaktionszeit (4.7) | „innerhalb von 12 Stunden (werktags)“ / „Angebot innerhalb von 24 Stunden“ | 12h, Antwort in 12 h |
| Ablauf Schritt 3 (Jamil 20.10., Talk 2691/2692/2694) | „Klarheit erhalten“ – Unterzeile „Ihr Angebot – klar und verständlich“ (Startseite + alle Leistungsseiten, Zeichnung und Bildbeschreibung). „24 Stunden“ steht schon im Versprechen „Angebot innerhalb von 24 Stunden“, „Festpreis“ in „Festpreis-Zusage“ – beides deshalb nicht im Ablauf (jeder Vorteil nur einmal pro Seite) | „Angebot innerhalb von 24 Stunden“ / „Ihr Festpreis-Angebot“ im Ablauf |
| Öffnungszeiten (4.9) | „Mo–Fr 8–18 Uhr“ | Montag - Freitag, 8:00 - 18:00 Uhr |
| Leistungsnamen (4.5/1.3) | nur die Namen aus `LEISTUNGEN` in `src/consts.ts` (Menü); Name fett/primär, darunter der Kundennutzen (Feld `nutzen`) als Unterzeile | eigene Varianten |
| Leistungs-Unterzeile (Jamil 20.10., Talk 2564) | konkreter **Nutzen der Leistung** für den Kunden, ≤ ca. 50 Zeichen, eine Quelle: Feld `nutzen` in `LEISTUNGEN` (Startseite, Rechner-Kacheln, Menü, Leistungsseiten-Hero, llms.txt) | allgemeine Versprechen als Unterzeile („Persönlich beraten, zum Festpreis umgesetzt“, „Ein Zeitplan. Ein Festpreis.“, „Mit festem Preis und festem Plan“) |
| Marken-Dreiklang (7.7) | „Planbar. Transparent. Verlässlich.“ | andere Dreiklänge |
| Eigene Stärken (7.5) | „Keine Lockangebote“, „Verständliche Angebote statt Positionsdschungel“ | „Alles aus einer Hand“ |
| Partner (6.7) | „seniovo“ klein; „Obi“ (großes O, kleines b und i – Jamil 19.10., Msg 2551); Obi seit 2024 über 20 Aufträge, seniovo seit 2026 über 5, Hornbach seit 2026 | SENIOVO, OBI, Logos (keine Freigabe) |
| Karriere (4.8/6.8) | positiv: „Faire Bezahlung. Prämien für gute Projekte.“, „Initiativ bewerben – wir suchen immer gute Leute“ | „Derzeit suchen wir keine Verstärkung“, abwertend über die Branche |
| Erfahrung (K3) | „15+ Jahre Erfahrung im Handwerk“ (GmbH erst ca. 2 Jahre alt) | „15 Jahre“ ohne „im Handwerk“ |
| Zahlen (6.6) | Vertrauensleiste: nur 40+ sanierte Bäder und 15+ Jahre Erfahrung im Handwerk als Zahlen (dazu die Nachweise versichert / Handwerkskammer, siehe Abschnitt 2a). 12 h Antwort / 24 h Angebot **nur** in den Versprechen (Jamil 19.10., Talk 2531/2536, Variante A) | über 30 Bäder, 15 Komplettsanierungen, 10 Jahre; 12 h / 24 h in der Zahlenleiste |

**Verbotene Aussagen (Werberecht/UWG, K2/K3):**
- „Meisterbetrieb“ (ist es nicht). Erlaubt nur: „Elektromeisterbetrieb“ als Partner für Endanschlüsse.
- „Garantie“ ohne verlinkte Bedingungen.
- Kein „Zuhause-Check 60+“, kein Altersbezug („60+“, „Senior“).
- Keine erfundenen Bewertungen/Sterne/Kundenstimmen (6.1: es gibt noch keine).
- Kein „unser Team“ zu KI-Bildern (7.1 – alt-Texte wahrheitsgemäß).

**AGB-konform formulieren (AGB Stand 02/2026, Jamil 19.10.):**
- Festpreis gilt „für alles, was im Angebot steht“; Änderungen nur mit schriftlichem Nachtrag (Zusatzwünsche, technisch nötige Zusatzarbeiten, verdeckte Mängel, § 6 Materialpreise). **Nicht**: „Preis im Angebot = Preis auf der Rechnung“, „ohne Ihre Freigabe ändert sich nichts“.
- Termine: nur „schriftlich als verbindlich vereinbart“ (§ 11). **Nicht**: „verbindlicher Zeitplan mit Start- und Endtermin“ ohne „schriftlich“.
- Elektro: nur Vorarbeiten/Koordination; Endanschlüsse macht ein Elektromeisterbetrieb (§ 13).
- Demontage/Entsorgung/Untergrund: stehen immer in den Angebotspositionen (Jamil) – Website-Text bleibt.
- Angebote: Jamil hat Variante **B** gewählt – § 2 AGB wird beim Anwaltscheck zu „verbindliche Festpreisangebote, gültig 30 Tage“. Bis dahin Website wie besprochen.
- Kostenloser Vor-Ort-Termin: Absage jederzeit kostenfrei; Ausfallkosten (§ 11) nur für vereinbarte Ausführungstermine.
- **„5 Jahre Gewährleistung“ ist erlaubt** (Jamil 19.10., Msg 2366) – sachlich mit Bezug auf die AGB (FAQ, llms-Dateien). Nicht als reißerisches Siegel.

## 2. Design & Animation (Audit 1.x, 2.x, 3.x)

- Zwei Kartenarten: hell (Radius 16 px, 1 px Linie, kein Schatten) und dunkel (2.1). Kartentitel 18 px / 700 / Satzschreibung (2.2).
- Gold-Text auf hellem Grund nur dunkles Gold (#8C7345 o. dunkler) – Kontrast ≥ 4,5:1 (2.3). Häkchen überall gold (2.4).
- Drei Button-Größen S/M/L als Tokens (2.7). Tap-Ziele mobil ≥ 44–48 px (1.9).
- Hover-Lift nur bei klickbaren Karten, einheitlich 2 px (3.5). Motion-Tokens für Tempo (3.4).
- Skizzen-Animationen: Texte erscheinen erst mit ihrer Form (Bugfix 19.10.), Linien in ca. 1,5–2 s fertig (3.1); goldene Linien fließen, Siegel-Ringe drehen (Sprachnachricht 19.10.).
- **Animierte Formen einheitlich kreisförmig** (Jamil 19.10., Msg 2518/2523): Siegel, Schritt-Nummern, Stempel-Effekte, Lade-Anzeigen rund – keine Rechteck-Rahmen mehr (ersetzt Kundenwunsch 15.10. (65) „Rechtecke“ auf Über uns). Symbol-Behälter (Audit 2.4) bleiben, da nicht animiert – **Ausnahme Leistungsumfang** (nächster Punkt).
- **Ein Zeichenstil für Nummern und Ringe** (Jamil 20.10.2026, Talk 2691/2692/2694 – „Design einheitlich“): Alle nummerierten und Ring-Elemente sehen aus wie von **einer** Hand gezeichnet – derselbe Skizzen-Stil wie die Ablauf-Zeichnung („So einfach kann … sein“) und die Siegel. Technisch: Komponente `SkizzenKreis.astro` (nutzt `src/lib/rough-szene.ts` = rough.js nur beim Build, kein neues Paket). Nummern = gefüllte goldene Plakette mit dunkler Ziffer wie die Ablauf-Schritte (`art="plakette"`), Ringe = dünner, handgezeichneter Goldring (`art="ring"`). Zeichnet sich **einmal**, reduzierte Bewegung = sofort fertig. **Zahlen ohne führende Null: „1, 2, 3 …“, nie „01, 02 …“.** Gilt für: Versprechen auf den Leistungsseiten (`LeistungVorteile.astro`), Leistungsumfang (Ring, ohne Nummern), Vertrauensleiste (Ringe), Ablauf-Zeichnungen, Siegel. Keine glatten Geometrie-Kreise (`<circle>`) mehr für diese Elemente. `audit-check.mjs` warnt („Skizzen-Stil“) bei „01“-Ziffern, `padStart(2, "0")` im Quelltext oder glatten Ringen.
- **Leistungsumfang auf den Leistungsseiten** (Jamil 20.10., Talk 2572: „diese Karten bei allen Leistungen bitte am Design anpassen“, ersetzt hier Audit 2.4 „Symbol-Behälter Quadrat“ und die weißen Kacheln aus Kundenwunsch 14.10. (35/53)): keine weißen Kästen, kein Sand-Quadrat. Symbol im **dünnen, handgezeichneten Goldring** (Kreis im Skizzen-Stil, siehe Punkt davor, zeichnet sich einmal; reduzierte Bewegung = sofort fertig), **ohne Nummern** (Jamil 20.10., Talk 2587: „ohne Zahlen“), Reihenfolge bleibt („Individuelle Beratung“ zuerst), feine goldene Trennlinien statt Rahmen. Desktop zentriert, 7/8 Punkte → 4 Spalten (4 + 3 / 4 + 4), sonst 3; Tablet zwei Spalten, Handy eine Liste (keine Silbentrennung mitten im Wort, nur die weichen Trennstellen aus den Daten). Nicht klickbar → kein Hover (3.5). Texte unverändert aus `kacheln` im Frontmatter. Alle anderen Symbol-Behälter (Partner, Karriere, Über uns, Sicher wohnen …) bleiben Quadrate (2.4).
- Vertrauensleiste (6.6/6.2, Jamil 19.10., Talk 2531/2536 + 2544/2547): „wie eine Errungenschaft, aber nicht übertrieben“ – EINE dunkle Leiste mit vier goldenen, handgezeichneten Kreisen (Skizzen-Stil, Jamil 20.10.) (40+ Bäder, 15+ Jahre, Schild „Versicherter Betrieb“, Hammer „Eingetragen bei der Handwerkskammer Lübeck“). Ringe zeichnen sich einmal, **nur die Zahlen** zählen hoch, Symbole stehen still; Beschriftung in Kapitälchen. **Keine Zeile „Angaben im Impressum“ darunter** (Jamil 20.10., Talk 2561) – Abstand oben/unten gleich; das Impressum bleibt im Footer verlinkt (Pflicht). Handy 2 × 2. Kein Konfetti, keine blinkenden Abzeichen.
- Hero-Wortwalze bleibt in Dauerschleife (Jamil 1.1), jedes Wort 1,6 s.
- Kein Ken-Burns-Zoom in den Leistungs-Startbildern, bis schärfere Fotos da sind (3.6).
- Rechner: Schritt-Anzeige sichtbar, Badsanierung in zwei Mini-Schritten (1.5), kurzer Übergang, Preisspanne zählt hoch (3.7); mobil Liste ohne Silbentrennung (2.9).
- Mobil: Leistungen im Menü aufgeklappt + Preis berechnen / Vor-Ort-Termin / Telefon (1.6); Sticky-Leiste passend zur Seite (1.7); kein „Nach oben“-Button (1.10); Unterseiten Text zuerst, Bild darunter (2.6); Referenzen waagerecht wischbar (1.4).
- „Sicher wohnen“ im Aufbau der anderen Leistungsseiten (2.5); alle Leistungsseiten mit Einleitung + Foto (2.8).
- Eigene Abläufe für Sanierungscheck und Kontakt (1.8). Vorteile/Versprechen: siehe Abschnitt 2a (ersetzt die frühere Leiste mit 4 Kernvorteilen, 5.1).
- Keine Doppelungen: allgemeine FAQ nur auf der Startseite (5.6), Zitat nur auf Über uns (5.2), kein doppelter Kontaktblock auf Kontakt (5.4), Preis bei den Checks max. 2× (5.7).

## 2a. Versprechen & Nachweise (Jamil 19.10.2026, Talk 2538/2539/2541 + 2544/2547)

- **Überall genau 7 Versprechen** – eine Quelle `src/data/versprechen.ts`: Festpreis-Zusage, Termintreue, Ein fester Ansprechpartner, Antwort innerhalb von 12 Stunden, Angebot innerhalb von 24 Stunden, Volle Transparenz, Alle Gewerke aus einer Hand. Startseite **und** Über uns zeigen dieselben 7 gezeichneten Siegel (kein „Regional“ / „15+ Jahre“ mehr dazwischen – das sind keine Versprechen; auf Über uns: „15+ Jahre“ in der Vertrauensleiste, Sitz/Region als Satz im Intro – siehe unten, 20.10.).
- **Jeder Vorteil nur einmal pro Seite.** Keine zweite Leiste/Karten mit denselben Vorteilen. `audit-check.mjs` warnt („Versprechen doppelt“), wenn ein Versprechen-Titel oder eine `data-versprechen`-Markierung zweimal auf einer Seite steht.
- **Leistungsseiten mit eigener Darstellung** (nicht die Siegel der Startseite): ein dunkler Abschnitt `LeistungVorteile.astro` – links groß, was die Leistung besonders macht (eigene Vorteile aus dem Frontmatter, z. B. „Keine Lockangebote“), rechts die 7 Versprechen als nummerierte Linie mit handgezeichneten goldenen Plaketten und Ziffern „1–7“ ohne führende Null wie im Ablauf (Jamil 20.10., Talk 2692/2694; Plakette zeichnet sich einmal, reduzierte Bewegung = sofort fertig). Linke Spalte (19.10.2026): bleibt am Desktop beim Scrollen stehen (sticky), darunter ein echtes Projektfoto der Leistung (kein KI-Bild, ab 3 eigenen Vorteilen keins) und der vorhandene Button „Preis berechnen“ (nicht bei Pauschal-Checks, 5.7); Handy untereinander, nichts klebt. Eigene Vorteile, die inhaltlich ein Versprechen sind („Verständliche Angebote statt Positionsdschungel“ → Volle Transparenz), werden zusammengelegt. Keine neuen Aussagen erfinden.
- **Nachweise ≠ Versprechen:** Belegbare Fakten (40+ Bäder, 15+ Jahre im Handwerk, versicherter Betrieb, Handwerkskammer Lübeck) stehen in der **Vertrauensleiste** (`Vertrauensleiste.astro`, Daten `ZAHLEN` + `NACHWEISE` in `src/data/home.ts`) – eine Komponente überall (Startseite, alle Leistungsseiten, Kontakt, Über uns), ohne Link „Angaben im Impressum“ (Jamil 20.10., Talk 2561; Impressum nur im Footer). Zusagen (Versprechen) stehen nie in dieser Leiste und umgekehrt. Kein „Meister“.
- **Über uns (Jamil 20.10.2026, Talk 2574/2576):** Die zwei Häkchen-Zeilen im Hero („15+ Jahre Erfahrung im Handwerk“, „Regional in Hamburg & Umgebung, Sitz Norderstedt“) sind entfallen. Stattdessen steht die Vertrauensleiste direkt unter dem Hero (dieselbe Komponente, nicht nachgebaut), und die Region steht als ein Satz im Intro: „Unser Sitz ist in Norderstedt – wir arbeiten in Hamburg und Umgebung.“ So steht jeder Fakt nur einmal auf der Seite (15+ Jahre nur in der Leiste, Region nur im Intro).

- **Leistungs-Unterzeile = Kundennutzen** (Jamil 20.10.2026, Talk 2564): „Früher wurden die Leistungen über den Nutzen definiert … die Nutzen gerne unter die Leistungen.“ Klare Leistungsnamen bleiben; darunter je Leistung ihr **eigener** Nutzen (Feld `nutzen`, Wortlaut aus früheren Nutzen-Texten/Claims). Festpreis, Zeitplan, Ansprechpartner usw. sind Versprechen und gehören nicht in diese Zeile (sonst steht derselbe Vorteil doppelt). Unterzeile darf den Claim im Hero derselben Seite nicht wiederholen. `audit-check.mjs` warnt („Leistungs-Nutzen“) bei fehlendem Feld, > 55 Zeichen, Versprechen-Wörtern oder doppeltem Nutzen.

## 3. Bilder & KI-Kennzeichnung (Audit 7.1/7.2, EU-KI-VO Art. 50)

- Jedes KI-Bild steht in `KI_BILDER` (`src/consts.ts`) und trägt sichtbar „KI-generiertes Bild“.
- Start- und Referenz-Hero mit echtem Projektfoto (7.2); Über uns: KI-Bild eines *fiktiven* Teams, so gekennzeichnet (7.1).
- Bilder WebP, < 200 KB, alt-Texte wahrheitsgemäß.

## 4. SEO (S1–S11)

- **Titel ≤ 60 Zeichen** mit Leistung + **Norderstedt** (S4, Jamil: „wichtig, wir wollen in Norderstedt und Umkreis sichtbarer werden“).
- **Beschreibungen ≤ ca. 155 Zeichen**, nennen Norderstedt, Hamburg und Umkreis.
- Genau eine H1, eigener Titel, Canonical; Rechtsseiten, Login und 404 auf `noindex`.
- Sitemap mit `<lastmod>` (S8). Termin-Fenster-Titel ist keine Überschrift (S9). Rückruf-Formular ohne `mailto:`-Formularziel (S10).
- Rechner-Seite mit „So rechnet der Rechner“ + 3 Fragen (S7).
- **Keine sichtbaren Preisbeispiele auf Leistungsseiten** (S5 – Jamil: nicht umsetzen); Preise nur in llms-full.txt.
- **Kein sichtbarer Faktenblock** (G2 – nicht gewünscht); Fakten nur in JSON-LD/llms.
- Offen/extern: Domain-Umzug S1 + noindex der Vorschau S2 (beim Produktivgang), Google-Profil L1, Branchenbücher L2, Bing Webmaster G4.

## 5. Strukturierte Daten (S3)

- Firma als `GeneralContractor` mit Logo, Adresse, Öffnungszeiten, Handwerkskammer, `areaServed` = Orte aus `src/data/region.ts`.
- **Nur echte Leistungen** (aus `LEISTUNGEN`) – kein Dach, Fassade, Maler, Sanitär/Heizung, Elektro.
- Je Leistungsseite `Service` (+ Preis bei Checks), `BreadcrumbList` (nur Startseite › Leistung); `FAQPage` wo Fragen stehen.
- **Kein sichtbarer Brotkrumen-Pfad** („Leistungen › …“) im Kopfbereich der Leistungsseiten (Jamil 19.10.2026, Talk 2529): Eine allgemeine Leistungsübersicht gibt es nicht mehr, der Link wäre ein schlechter Link. Auch in den strukturierten Daten keinen Zwischenschritt „Leistungen“.
- Keine Bewertungs-Daten, solange es keine echten Bewertungen gibt.

## 6. KI-Plattformen (K2, G1, G3, G4)

- `llms.txt` und `llms-full.txt` werden **automatisch aus den Website-Daten** erzeugt (`src/pages/llms*.txt.ts`) – nie von Hand pflegen, keine veralteten Aussagen (Meisterbetrieb, 100 km, Kiel/Lübeck/Stade, alte Zahlen).
- `robots.txt` erlaubt ausdrücklich: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, meta-externalagent, Amazonbot, DuckAssistBot, MistralAI-User, Bingbot.
- IndexNow meldet nach dem Domain-Umzug jede Änderung an Bing (G4).

## 7. Datenschutz & Einwilligung (K1, K4)

- Das Buchungsportal (Relexable, lädt Google Tag Manager/Ads/Fonts) lädt **erst nach Klick auf „Einverstanden – Kalender laden“**. Kein `<iframe>` zum Portal im ausgelieferten HTML, keine Google-Dienste auf der eigenen Seite.
- Alternativen daneben: Telefon, WhatsApp, Rückruf.
- Datenschutzerklärung Abschnitt `#termin` (Relexable + Google) muss bleiben. Schriften lokal, keine Cookies, kein Tracking.
- Vor dem Umzug: Datenschutz juristisch prüfen, Hosting-Abschnitt anpassen.

## 8. AGB & FAQ (K5)

- `/agb/` = AGB Stand Februar 2026, 1:1, mit PDF-Download; Link im Footer neben Impressum/Datenschutz und unter den FAQ.
- FAQ müssen zu den AGB passen (siehe Abschnitt 1). Ändert sich die AGB → FAQ und llms-Dateien mitprüfen.
- Jamil soll die AGB vom Anwalt prüfen lassen (Widerrufsbelehrung fehlt, § 2 Variante B).

## 9. Einzugsgebiet & Karte (3.3, 4.10)

- **Eine Quelle:** `src/data/region.ts` (Jamils 2. Karte, 19.10.2026): Hamburg und Umgebung – Wedel, Uetersen, Kellinghusen, Neumünster, Bargteheide, Ahrensburg, Barsbüttel; Sitz Norderstedt; **rund 40 km**.
- Nicht mehr im Gebiet: Kiel, Lübeck (nur „Handwerkskammer Lübeck“ erlaubt), Stade, Lüneburg, Itzehoe, Bad Oldesloe, Reinbek; keine „50/60/100 km“.
- Gezeichnete Karte im Skizzen-Stil statt Orts-Laufband; Ortsliste, Texte, JSON-LD und llms immer aus `region.ts`.

## 10. Rechner (Jamil 19.10., Msg 2381)

- Rechner-Optionen wie vor dem 19.10. (LED-Spots, Fußbodenheizung, „Wasser & Strom verlegen“ usw. bleiben drin) – Jamil hat die Entfernung am 19.10. (Msg 2414/2419) rückgängig machen lassen. **Kein „Dach“** im Rechner.
- Preisspanne vor jeder Datenabfrage, Rückruf-Formular darunter (6.3, geht an service@bauwelt-handwerk.de).

## 11. Barrierefreiheit & Bewegung (K6, 1.9)

- `prefers-reduced-motion` wird respektiert (Animationen aus, Endzustand sichtbar). Ohne JavaScript bleibt alles sichtbar.
- Alle Bilder mit `alt`, `lang="de"`. Kleinbetrieb → keine BFSG-Pflicht (K6), Niveau trotzdem halten (Lighthouse 100).

## 12. Performance (1.11, S6, S11)

- Logo als kleine WebP (kein PNG), Startbild am Handy in kleiner Variante (`hero-828.webp`), Zeichnungen erst bei Bedarf aufbauen.
- Bilder < 200 KB. Beim eigenen Hosting lange Cache-Zeiten (S11).

- **Kein energetischer Umbau** (Jamil 20.10., Talk 2599): Bauwelt bietet keine energetische Sanierung/Modernisierung an – das Wort „energetisch“ kommt im Angebot nicht vor (audit-check warnt).
- **Badsanierung-Kachel** (Jamil 20.10., Talk 2600): Kachel-/Menüname nur „Badsanierung“ (ohne „aus einer Hand“), Unterzeile emotional: „Endlich ein Bad, in dem Sie sich rundum wohlfühlen“.

- **Vorteils-Foto nur am PC** (Jamil 20.10., Talk 2702/2704): Das Projektfoto unter „Das Besondere bei …“ erscheint nur ab 1024 px; am Handy/Tablet nur Kasten + 7 Versprechen.
