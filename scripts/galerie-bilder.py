#!/usr/bin/env python3
"""Neue Kundenfotos (Runde 07.10.2026) → optimierte Galerie-WebPs.

Automatische Bildoptimierung (keine generative KI – nichts wird erfunden oder
wegretuschiert): schwarze Ränder bei Video-Standbildern abschneiden, Datenschutz-
Zuschnitt (Hausnummer), sanfter Weißabgleich, Tonwertkorrektur, leichte Sättigung
und Schärfe. Ausgabe: public/assets/img/galerie-<leistung>-NN.webp, je < 200 KB.
Quelle (wird NICHT committet): "Verbesserung Kunde/07.10.2026/Bilder ergänzen".
"""
import os
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageStat

SRC = "Verbesserung Kunde/07.10.2026/Bilder ergänzen"
DST = "public/assets/img"
TARGET = 200 * 1024
MAXKANTE = 1400

# (Datei, Leistung, optionaler Zuschnitt in Originalpixeln)
JOBS = [
    ("2e707a1e-ecef-45a3-83a1-bda3bf880da1.JPG", "bad", None),
    ("8836919e-f2e5-4d8c-92e5-77e74c951fc9.JPG", "bad", None),
    ("PHOTO-2025-11-11-20-36-07 2.jpg", "bad", None),
    ("PHOTO-2025-11-11-20-36-07.jpg", "bad", None),
    ("PHOTO-2025-11-11-20-39-45.jpg", "bad", None),
    ("PHOTO-2026-05-13-16-05-39 2.jpg", "bad", None),
    ("PHOTO-2026-05-13-16-05-39.jpg", "bad", None),
    ("aec70eca-b0db-4754-8dd1-9d5b2ecc0cc6.JPG", "bad", None),
    ("c892d932-056f-48cd-baee-88a666d58b3e.JPG", "bad", None),
    # Hausnummer oben abschneiden (Datenschutz)
    ("2016262.jpeg", "fliesen", (0, 230, 1200, 900)),
    ("6a10552b-9a1c-4004-82d2-6ac6a6b1fbf8.JPG", "fliesen", None),
    ("ad00ec5b-92e1-4155-aa77-06c85dab891d.JPG", "fliesen", None),
    ("IMG_7766.jpeg", "sanierung", None),
    ("IMG_7767.jpeg", "sanierung", None),
    ("IMG_3149.PNG", "innenausbau", None),
    ("IMG_3150.PNG", "innenausbau", None),
    ("IMG_3151.PNG", "innenausbau", None),
    ("PHOTO-2025-06-22-15-29-18.jpg", "innenausbau", None),
    ("PHOTO-2025-06-22-15-29-19.jpg", "innenausbau", None),
]


def schwarze_raender_weg(im: Image.Image) -> Image.Image:
    """Schneidet fast schwarze Balken (Video-Standbilder) an allen Seiten ab."""
    maske = im.convert("L").point(lambda v: 255 if v > 24 else 0)
    box = maske.getbbox()
    return im.crop(box) if box else im


def weissabgleich(im: Image.Image, staerke: float = 0.5) -> Image.Image:
    """Sanfter Grauwelt-Abgleich: Farbstich zur Hälfte neutralisieren."""
    r, g, b = ImageStat.Stat(im).mean
    grau = (r + g + b) / 3
    faktoren = [1 + staerke * (grau / max(c, 1) - 1) for c in (r, g, b)]
    kanaele = [k.point(lambda v, f=f: min(255, round(v * f))) for k, f in zip(im.split(), faktoren)]
    return Image.merge("RGB", kanaele)


def optimieren(im: Image.Image) -> Image.Image:
    im = weissabgleich(im)
    im = ImageOps.autocontrast(im, cutoff=0.6, preserve_tone=True)
    im = ImageEnhance.Color(im).enhance(1.06)
    if max(im.size) > MAXKANTE:
        im.thumbnail((MAXKANTE, MAXKANTE), Image.LANCZOS)
    return im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=3))


zaehler: dict[str, int] = {}
for datei, leistung, zuschnitt in JOBS:
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, datei))).convert("RGB")
    if zuschnitt:
        im = im.crop(zuschnitt)
    im = optimieren(schwarze_raender_weg(im))
    zaehler[leistung] = zaehler.get(leistung, 0) + 1
    ziel = os.path.join(DST, f"galerie-{leistung}-{zaehler[leistung]:02d}.webp")
    q = 82
    while True:
        im.save(ziel, "WEBP", quality=q, method=6)
        if os.path.getsize(ziel) <= TARGET or q <= 40:
            break
        q -= 6
    print(f"{ziel}: {im.size[0]}x{im.size[1]} q={q} {os.path.getsize(ziel) // 1024} KB  ← {datei}")
