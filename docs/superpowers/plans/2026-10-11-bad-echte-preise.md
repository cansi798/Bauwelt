# Bad-Rechner mit echten Bruttopreisen + Ehrlichkeits-Hinweis – Plan

**Goal:** Badsanierung rechnet nur nach Fläche (3–15 m², 1er-Schritte) mit echter Brutto-Preistabelle „ab … bis …“ (bis = ab + 1.500 €), zeigt die Standard-Ausstattung; am Rechner ein kurzer Ehrlichkeits-Hinweis.

**Architecture:** Preistabelle `BAD_PREISE_BRUTTO` + `BAD_SPANNE_BIS` in `src/data/rechner.ts` (eine Stelle, „zu bestätigen“ an 4/6/12 m²). `Gewerk` bekommt optional `preistabelle`, `bisAufschlag`, `standard[]`, `preisHinweis`; `tiers` darf leer sein → Niveau-Auswahl entfällt. `Rechner.astro`: Niveau-Block nur wenn Tiers vorhanden, Preis „ab X € bis Y €“ aus Tabelle, Standard-Liste in Schritt 2 + Ergebnis + Anfragetext, Hinweis unter dem Vertrauens-Kästchen. Andere Leistungen unverändert.

## Global Constraints
- Preise brutto inkl. MwSt.: 3:11305, 4:11882*, 5:12459, 6:13070*, 7:13685, 8:14340, 9:14999, 10:15970, 11:16946, 12:18920*, 13:19111, 14:20194, 15:21277 (* zu bestätigen); bis = ab + 1.500 €.
- Standard: Dusche ODER Badewanne (nicht beides), WC, Waschtisch, Erneuerung der Leitungen bis zum Knotenpunkt, Position der Sanitärobjekte anpassbar, Standard-Fliesen und alle übrigen Teile/Material.
- Hinweis: „Bruttopreise inkl. MwSt., inkl. Fliesen & Material, Standard-Ausstattung“.
- Ehrlichkeit: „Unsere Preise orientieren sich sehr nah am tatsächlichen Preis – keine Lockangebote, sondern realistische Werte.“

## Review Focus
- 3, 8, 15 m² ergeben exakt 11.305/14.340/21.277 € (+1.500 €).
- Wechsel Bad ↔ andere Leistung: Niveau-Block erscheint/verschwindet korrekt, Standard-Liste nur beim Bad.
- `/rechner/?gewerk=badsanierung` und Startseite (Bad vorausgewählt, SSR) ohne Layout-Sprung.
- WhatsApp/Mail-Text beim Bad: Größe, Standard-Ausstattung, „ab … bis …“, kein leeres „Niveau“.
