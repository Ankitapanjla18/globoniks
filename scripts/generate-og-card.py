"""
Generates public/og-card.png -- the 1200x630 social share card.

Why a committed PNG rather than Next's ImageResponse: @vercel/og fails to
prerender on Windows (fileURLToPath chokes on the bundled font's path), and
a static asset has no build-time dependency at all. Re-run this script if the
card copy or brand colour changes:

    python scripts/generate-og-card.py

Requires Pillow. Falls back across a few font paths so it runs on Windows,
macOS and Linux.
"""

import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 10, 15)
BRAND = (139, 92, 246)  # #8b5cf6
WHITE = (255, 255, 255)
GREY = (161, 161, 170)
DIM = (113, 113, 122)
LIGHT = (212, 212, 216)

PAD = 80

BOLD_CANDIDATES = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]
REGULAR_CANDIDATES = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def load(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    raise SystemExit("No usable font found. Tried:\n  " + "\n  ".join(candidates))


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    f_wordmark = load(BOLD_CANDIDATES, 92)
    f_sub = load(REGULAR_CANDIDATES, 38)
    f_meta = load(REGULAR_CANDIDATES, 26)

    # Brand rule, top left.
    d.rounded_rectangle([PAD, PAD, PAD + 120, PAD + 8], radius=4, fill=BRAND)

    # Wordmark, with the brand-purple full stop the site's nav also uses.
    baseline = 250
    d.text((PAD, baseline), "Globoniks", font=f_wordmark, fill=WHITE)
    name_w = d.textlength("Globoniks", font=f_wordmark)
    d.text((PAD + name_w, baseline), ".", font=f_wordmark, fill=BRAND)

    # One-line positioning.
    d.text(
        (PAD, baseline + 130),
        "Web, mobile and custom software development",
        font=f_sub,
        fill=GREY,
    )

    # Footer row.
    foot_y = H - PAD - 30
    d.text((PAD, foot_y), "Mohali, Punjab, India", font=f_meta, fill=DIM)
    domain = "globoniks.com"
    d.text(
        (W - PAD - d.textlength(domain, font=f_meta), foot_y),
        domain,
        font=f_meta,
        fill=LIGHT,
    )

    out = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public",
        "og-card.png",
    )
    img.save(out, "PNG", optimize=True)
    print(f"wrote {out} ({W}x{H}, {os.path.getsize(out)} bytes)")


if __name__ == "__main__":
    main()
