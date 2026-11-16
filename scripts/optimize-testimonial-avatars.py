"""Generate 144px WebP avatars for 48px display at up to 3x density.

Requires Pillow. Run from the project root; original photos are only read.
The centered square crop matches the existing circular avatars.
"""

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
destination = root / "src/assets/testimonials"
destination.mkdir(exist_ok=True)
report = []
for index in range(1, 4):
    source = root / f"src/assets/gallery/gallery-{index}.jpg"
    original_hash = hashlib.sha256(source.read_bytes()).hexdigest()
    with Image.open(source) as photo:
        image = ImageOps.exif_transpose(photo).convert("RGB")
    size = min(144, image.width, image.height)
    avatar = ImageOps.fit(image, (size, size), method=Image.Resampling.LANCZOS)
    output = destination / f"avatar-{index}.webp"
    avatar.save(output, "WEBP", quality=88, method=6)
    with Image.open(output) as check:
        check.load()
        assert check.format == "WEBP" and check.size == (size, size)
    assert hashlib.sha256(source.read_bytes()).hexdigest() == original_hash
    report.append({"original": source.relative_to(root).as_posix(),
                   "original_bytes": source.stat().st_size,
                   "original_sha256": original_hash,
                   "optimized": output.relative_to(root).as_posix(),
                   "bytes": output.stat().st_size, "width": size, "height": size})
print(json.dumps(report, indent=2))
