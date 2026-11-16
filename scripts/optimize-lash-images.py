"""Create responsive WebP copies. Requires Pillow and pillow-heif (Volume Class).

Run from the project root: python scripts/optimize-lash-images.py
Originals are only read; EXIF orientation is applied before resizing.
"""

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--decoder-path", type=Path)
parser.add_argument("--report", type=Path)
parser.add_argument("--widths", nargs="+", type=int, default=[480, 960, 1440])
parser.add_argument("--source", help="Exact original filename in src/assets/gallery")
parser.add_argument("--name", help="Stable output prefix, such as fox-eyes-4")
args = parser.parse_args()
if bool(args.source) != bool(args.name):
    parser.error("Use --source and --name together.")
if args.source and (Path(args.source).name != args.source or not re.fullmatch(r"[a-z0-9-]+", args.name)):
    parser.error("Use a filename without directories and a lowercase output name with letters, digits or hyphens.")
if args.decoder_path:
    sys.path.insert(0, str(args.decoder_path))

from PIL import Image, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()
root = Path(__file__).resolve().parents[1]
gallery = root / "src/assets/gallery"
output = gallery / "optimized"
output.mkdir(exist_ok=True)
sources = {
    "fox-eyes": "Modelofox.jpeg",
    "volume-brasileiro": "VolumeBrasileiro.jpeg",
    "volume-class": "VolumeClass.jpeg",  # HEIC content with a .jpeg extension.
    "volume-egipcio": "VolumeEgipcio.jpeg",
    "volume-glamour": "VolumeGlamuor.jpeg",
}
if args.source:
    sources = {args.name: args.source}
report = []
for model, filename in sources.items():
    original = gallery / filename
    original_hash = hashlib.sha256(original.read_bytes()).hexdigest()
    with Image.open(original) as source:
        source_format = source.format
        image = ImageOps.exif_transpose(source).convert("RGB")
    variants = []
    for width in sorted({min(size, image.width) for size in args.widths if size > 0}):
        height = round(image.height * width / image.width)
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        destination = output / f"{model}-{width}.webp"
        resized.save(destination, "WEBP", quality=86, method=6)
        with Image.open(destination) as check:
            check.load()
            assert check.format == "WEBP" and check.size == (width, height)
        variants.append({"file": destination.relative_to(root).as_posix(),
                         "width": width, "height": height,
                         "bytes": destination.stat().st_size})
    assert original_hash == hashlib.sha256(original.read_bytes()).hexdigest()
    report.append({"model": model, "original": filename, "format": source_format,
                   "width": image.width, "height": image.height,
                   "bytes": original.stat().st_size, "sha256": original_hash,
                   "variants": variants})

result = json.dumps(report, ensure_ascii=False, indent=2)
if args.report:
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(result + "\n", encoding="utf-8")
print(result)
