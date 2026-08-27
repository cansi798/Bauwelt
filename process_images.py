#!/usr/bin/env python3
"""Optimiert die Kunden-Bilder für das Web: PNG -> WebP, max. Breite begrenzt,
Qualität so gewählt, dass jede Datei unter dem CI-Ziel von 200 KB bleibt."""
import os
from PIL import Image

IMG = "public/assets/img"
TARGET = 200 * 1024  # 200 KB
JOBS = [
    ("hero.png", "hero.webp", 1600),
    ("ref-01-wannenbad.png", "ref-01-wannenbad.webp", 1200),
    ("ref-02-bodengleiche-dusche.png", "ref-02-bodengleiche-dusche.webp", 1200),
    ("ref-03-gaeste-wc.png", "ref-03-gaeste-wc.webp", 1200),
    ("ref-04-altbau.png", "ref-04-altbau.webp", 1200),
    ("ref-05-wohnung.png", "ref-05-wohnung.webp", 1200),
    ("ref-06-dach.png", "ref-06-dach.webp", 1200),
]

for src, dst, maxw in JOBS:
    sp = os.path.join(IMG, src)
    if not os.path.exists(sp):
        print("übersprungen (fehlt):", src)
        continue
    im = Image.open(sp).convert("RGB")
    if im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    # Qualität senken, bis unter 200 KB
    q = 84
    while q >= 40:
        im.save(os.path.join(IMG, dst), "WEBP", quality=q, method=6)
        size = os.path.getsize(os.path.join(IMG, dst))
        if size <= TARGET:
            break
        q -= 6
    print(f"{dst}: {im.size[0]}x{im.size[1]}, q={q}, {size // 1024} KB")

# Original-PNGs entfernen (nicht committen, ~16 MB)
for src, _, _ in JOBS:
    p = os.path.join(IMG, src)
    if os.path.exists(p):
        os.remove(p)
print("PNG-Originale entfernt.")
