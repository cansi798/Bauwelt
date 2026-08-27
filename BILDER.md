# Bild-Briefing

So funktioniert es: Bild erzeugen (KI oder Foto), **exakt so benennen** wie unten und in
**`public/assets/img/`** legen. Die Website zeigt es dann **automatisch** an. Fehlt ein Bild,
bleibt ein dezenter Platzhalter stehen.

**Format:** möglichst **WebP**, **unter 200 KB** (Ladezeit). PNG/JPG gehen auch – dann kurz
Bescheid geben, ich optimiere sie (`process_images.py`) und benenne sie um.

## Wichtige Regeln (CI-Handbuch Kap. 5)
- Echte Wirkung, **keine gestellten Stockfotos** mit lachenden Models.
- Natürliches, warmes Licht; Farben nicht übersättigt; keine Filter.
- Seitenverhältnis einhalten, sonst wird beschnitten.

---

## ✅ Bereits vorhanden (von dir geliefert)
| Datei | Verwendung |
|---|---|
| `hero.webp` | Startseiten-Hero (16:9) |
| `ref-01-wannenbad.webp` … `ref-06-dach.webp` | Referenz-Galerie (4:3) |

## ⬜ Noch gebraucht

### 1) Porträt von Jamil Iqbal (Ansprechpartner)
| | |
|---|---|
| **Dateiname** | `jamil.webp` |
| **Ablage** | `public/assets/img/jamil.webp` |
| **Format** | Quadratisch 1:1, ca. **600 × 600 px** |
| **Motiv** | Freundliches, echtes Porträt (Schulter aufwärts), neutraler/heller Hintergrund. Erscheint als runder Berater-Kreis im Kontaktbereich. |

### 2) Team-/Über-uns-Bild *(optional, empfohlen)*
| | |
|---|---|
| **Dateiname** | `team.webp` |
| **Ablage** | `public/assets/img/team.webp` |
| **Format** | Querformat 4:3, ca. **1200 × 900 px** |
| **Motiv** | Team in Anthrazit-Arbeitskleidung vor Baustelle/Firmenfahrzeug – echt, kein Stockfoto. |

### 3) Vorschaubild beim Teilen *(optional)*
Aktuell Logo auf Anthrazit (`og-image.png`) – funktioniert. Optional durch ein schönes
Bad-Foto mit Logo ersetzen (1200 × 630).

---

Weitere Referenzbilder jederzeit ergänzbar: Datei in `public/assets/img/` legen und mir den
gewünschten Titel/Ort nennen – ich lege die Referenz an.
