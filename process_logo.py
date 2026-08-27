#!/usr/bin/env python3
"""Bereitet das Logo aus dem PDF-Render fuer das Web auf.
Erzeugt: transparente Standardversion, inverse Version (Weiss+Gold) fuer den
Footer sowie die Bildmarke als Favicon-PNGs (32/180/512)."""
from PIL import Image

GOLD = (195, 165, 111)          # #C3A56F  Gold Sand
ANTHRAZIT = (45, 44, 46)        # #2D2C2E
WHITE_THRESH = 236              # ab hier gilt ein Pixel als "weisser Hintergrund"

src = Image.open("logo_render-1.png").convert("RGB")
px = src.load()
W, H = src.size


def is_white(r, g, b):
    return r >= WHITE_THRESH and g >= WHITE_THRESH and b >= WHITE_THRESH


def is_gold(r, g, b):
    # warmer Ton: Rot deutlich ueber Blau, mittlere Helligkeit
    return (r - b) > 25 and r > 120 and b < 190 and not is_white(r, g, b)


def build(recolor_dark_to_white):
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    op = out.load()
    for y in range(H):
        for x in range(W):
            r, g, b = px[x, y]
            if is_white(r, g, b):
                continue  # transparent
            if is_gold(r, g, b):
                op[x, y] = (GOLD[0], GOLD[1], GOLD[2], 255)
            else:
                if recolor_dark_to_white:
                    op[x, y] = (255, 255, 255, 255)
                else:
                    op[x, y] = (ANTHRAZIT[0], ANTHRAZIT[1], ANTHRAZIT[2], 255)
    return out


standard = build(False)
inverse = build(True)

# --- Auf Inhalt zuschneiden ---
bbox = standard.getbbox()
standard = standard.crop(bbox)
inverse = inverse.crop(bbox)

# Auf sinnvolle Webbreite herunterskalieren (max 1000 px breit -> CI Vorgabe PNG)
def resize_to_width(img, width):
    w, h = img.size
    return img.resize((width, round(h * width / w)), Image.LANCZOS)

resize_to_width(standard, 1000).save("site/assets/logo.png")
resize_to_width(inverse, 1000).save("site/assets/logo-inverse.png")
print("logo.png / logo-inverse.png gespeichert", standard.size)

# --- Bildmarke (Haus) fuer Favicon herausloesen ---
# Zeilenweises "Ink"-Profil ueber die zugeschnittene Standardmarke.
cw, ch = standard.size
sp = standard.load()
row_ink = []
for y in range(ch):
    cnt = 0
    for x in range(0, cw, 4):  # jede 4. Spalte reicht zur Erkennung
        if sp[x, y][3] > 0:
            cnt += 1
    row_ink.append(cnt)

# Uebergang Dach -> Wortmarke: ink-aermste Zeile im Band 33-52 % der Hoehe.
# (Dort liegt die Luecke zwischen Giebel-Unterkante und "BAUWELT".)
band_lo, band_hi = int(ch * 0.33), int(ch * 0.52)
mark_bottom = min(range(band_lo, band_hi), key=lambda y: row_ink[y])
mark = standard.crop((0, 0, cw, mark_bottom))
mark = mark.crop(mark.getbbox())

# In ein quadratisches, transparentes Feld mit etwas Rand zentrieren
mw, mh = mark.size
side = max(mw, mh)
pad = round(side * 0.14)
canvas = Image.new("RGBA", (side + 2 * pad, side + 2 * pad), (0, 0, 0, 0))
canvas.paste(mark, ((canvas.width - mw) // 2, (canvas.height - mh) // 2), mark)

for size in (512, 180, 32):
    canvas.resize((size, size), Image.LANCZOS).save(f"site/assets/favicon-{size}.png")
print("Favicons gespeichert, Bildmarke:", mark.size)
