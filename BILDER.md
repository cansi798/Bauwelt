# Bild-Briefing – was zu erstellen ist

So funktioniert es: Bild erzeugen (KI oder echtes Foto), **exakt so benennen** wie unten
angegeben und in den Ordner **`docs/assets/img/`** legen. Die Website zeigt das Bild dann
**automatisch** an – kein Code nötig. Fehlt ein Bild, bleibt der markenkonforme Platzhalter stehen.

## Wichtige Regeln (aus dem CI-Handbuch, Kap. 5)

- **Echte Wirkung, keine gestellten Stockfotos** mit lachenden Models im Helm.
- Natürliches, warmes Licht; Farben nicht übersättigt; keine Instagram-Filter.
- Bilder werden nie eingefärbt (höchstens leicht abgedunkelt, wenn Text darauf liegt).
- **Dateiformat:** JPG (Fotos), Qualität ~80 %. **Ziel: unter 200 KB pro Bild** (Ladezeit).
- Seitenverhältnis exakt einhalten, sonst wird beschnitten.

---

## 1) Hero-Bild (Kopfbereich der Startseite)

| | |
|---|---|
| **Dateiname** | `hero.jpg` |
| **Ablage** | `docs/assets/img/hero.jpg` |
| **Format / Größe** | Querformat 16:9, ca. **1920 × 1080 px** |
| **Hinweis** | Über dem Bild liegt eine dunkle Ebene mit weißem Text – ruhiges, nicht zu unruhiges Motiv wählen. |

**KI-Prompt:**
> Fotorealistisches, modernes und helles Badezimmer: bodengleiche Regendusche mit Glaswand,
> Eichenholz-Waschtisch, anthrazitfarbene Großformatfliesen, warmes Tageslicht durch ein Fenster,
> aufgeräumt und hochwertig, Querformat 16:9, keine Menschen.

---

## 2) Referenz-Galerie (6 Bilder, Seitenverhältnis 4:3, je ~1200 × 900 px)

| Dateiname (`docs/assets/img/…`) | Motiv | KI-Prompt |
|---|---|---|
| `ref-01-wannenbad.jpg` | Wannenbad in Eiche | Modernes Badezimmer mit freistehender Badewanne, Eichenholz-Möbeln und warmem Licht, fotorealistisch, 4:3 |
| `ref-02-bodengleiche-dusche.jpg` | Bodengleiche Dusche | Bad mit großer bodengleicher Regendusche, Glaswand und anthrazitfarbenen Fliesen, hell, 4:3 |
| `ref-03-gaeste-wc.jpg` | Gäste-WC kompakt | Kleines elegantes Gäste-WC mit Aufsatzwaschbecken und indirekter Beleuchtung, 4:3 |
| `ref-04-altbau.jpg` | Altbau-Modernisierung | Sanierter Altbau-Wohnraum mit Fischgrätparkett, hohen Decken und viel Tageslicht, 4:3 |
| `ref-05-wohnung.jpg` | Wohnung komplett saniert | Modern sanierte Wohnung, offener Grundriss, neutrale warme Farben, fotorealistisch, 4:3 |
| `ref-06-dach.jpg` | Dachsanierung | Neu eingedecktes Steildach eines Einfamilienhauses, sauber, blauer Himmel, 4:3 |

> Tipp: Die Prompts stehen auch direkt auf den Platzhaltern der Live-Vorschau.

---

## Optional / später (nicht zwingend für den Start)

| Zweck | Vorschlag Dateiname | Format | Idee |
|---|---|---|---|
| Vorschaubild für geteilte Links (WhatsApp, Google) | `og-image.png` | 1200 × 630 | Aktuell Logo auf Anthrazit vorhanden. Optional durch schönes Bad-Foto mit Logo ersetzen. |
| Foto des Ansprechpartners | `team-jamil.jpg` | 1:1, 800 × 800 | Echtes, freundliches Porträt von Jamil Iqbal für den Kontaktbereich – schafft Vertrauen. |
| Vorher/Nachher-Paar | `va-01-vorher.jpg` / `va-01-nachher.jpg` | 4:3 | Für einen späteren „Vorher/Nachher"-Schieberegler. |

---

## Reihenfolge nach Wichtigkeit

1. `hero.jpg` – wichtigstes Bild, prägt den ersten Eindruck.
2. `ref-01` bis `ref-06` – füllen die Referenz-Galerie.
3. Optional: `team-jamil.jpg`, danach Vorher/Nachher.
