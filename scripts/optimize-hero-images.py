"""Create WebP hero derivatives without resizing or changing the originals.

Run from any directory with Pillow installed. Existing gallery WebPs remain
unchanged: high-resolution lash photos are loaded only when their modal opens.
"""

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
destination = root / "src/assets/optimized"
destination.mkdir(exist_ok=True)
report = []
for original, name in [("Hero.jpg", "hero-mobile.webp"), ("Hero2.jpg", "hero-desktop.webp")]:
    source = root / "src/assets" / original
    before = hashlib.sha256(source.read_bytes()).hexdigest()
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        output = destination / name
        image.save(output, "WEBP", quality=90, method=6)
        report.append({"original": original, "original_bytes": source.stat().st_size,
                       "optimized": name, "bytes": output.stat().st_size,
                       "width": image.width, "height": image.height})
    assert hashlib.sha256(source.read_bytes()).hexdigest() == before
print(json.dumps(report, indent=2))
