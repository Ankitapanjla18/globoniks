"""
Generates the Globoniks Schools logo: a brand-violet rounded mark carrying a
mortarboard, with a stacked wordmark. Two variants:

  public/logos/globoniks-schools.png        light text, for the dark site
  public/logos/globoniks-schools-light.png  dark text, for light backgrounds
                                            (the product's own UI, documents)

Interim mark, generated 2026-08-30 at the owner's request so the product is
not the only one without a logo; replace both files with a designed mark
whenever one exists. Re-run:  python scripts/generate-schools-logo.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

W, H = 960, 320
VIOLET = (139, 92, 246)      # #8B5CF6, brand primary
PURPLE = (168, 85, 247)      # #A855F7, brand secondary
WHITE = (255, 255, 255)
NAVY = (15, 23, 42)          # #0F172A
LILAC = (196, 181, 253)      # #C4B5FD, "SCHOOLS" on dark
DEEP = (109, 40, 217)        # #6D28D9, "SCHOOLS" on light

BOLD = [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]
SEMI = [r"C:\Windows\Fonts\seguisb.ttf", r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]


def load(cands, size):
    for p in cands:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    raise SystemExit("no font found")


def mark(d, x, y, size):
    """Rounded violet square with a white mortarboard."""
    d.rounded_rectangle([x, y, x + size, y + size], radius=size * 0.22, fill=VIOLET)
    cx, cy = x + size / 2, y + size * 0.47
    hw, hh = size * 0.34, size * 0.17          # diamond half-width / half-height
    # mortarboard top (diamond)
    d.polygon([(cx, cy - hh), (cx + hw, cy), (cx, cy + hh), (cx - hw, cy)], fill=WHITE)
    # cap body (band below the diamond)
    bw, bt = size * 0.19, size * 0.09
    d.polygon([(cx - bw, cy + hh * 0.35), (cx + bw, cy + hh * 0.35),
               (cx + bw, cy + hh * 0.35 + bt), (cx, cy + hh * 0.35 + bt + size * 0.06),
               (cx - bw, cy + hh * 0.35 + bt)], fill=WHITE)
    # tassel
    tx = cx + hw * 0.92
    d.line([(tx, cy), (tx, cy + size * 0.22)], fill=WHITE, width=max(3, int(size * 0.035)))
    d.ellipse([tx - size * 0.035, cy + size * 0.20, tx + size * 0.035, cy + size * 0.27], fill=WHITE)


def render(text_color, sub_color, out):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    size = 240
    mark(d, 40, (H - size) // 2, size)

    f_word = load(BOLD, 112)
    f_sub = load(SEMI, 54)
    x = 40 + size + 44
    d.text((x, 62), "Globoniks", font=f_word, fill=text_color)
    # letter-spaced sub-mark
    sx = x + 4
    for ch in "SCHOOLS":
        d.text((sx, 196), ch, font=f_sub, fill=sub_color)
        sx += d.textlength(ch, font=f_sub) + 10

    img.save(out, "PNG", optimize=True)
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    base = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "logos")
    os.makedirs(base, exist_ok=True)
    render(WHITE, LILAC, os.path.join(base, "globoniks-schools.png"))
    render(NAVY, DEEP, os.path.join(base, "globoniks-schools-light.png"))
