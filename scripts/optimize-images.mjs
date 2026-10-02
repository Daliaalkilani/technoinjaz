// Responsive image pipeline (runs before `next build`).
//
// For every raster image under the source folders it writes AVIF + WebP copies at
// several widths (never upscaled) into public/_img/, and a manifest consumed by
// <ResponsiveImage>. Quality is gated, not guessed: each copy is compared with the
// original downscaled to the same width (SSIM on luma) and the encoder quality is
// raised until the copy is visually indistinguishable (≥ MIN_SSIM). The originals are
// untouched; they remain the last-resort <img src> fallback and the og:image.
//
// Incremental: a source is re-encoded only when its content hash changed, an output
// is missing, or the pipeline version changed. Hashes (not file dates) keep it valid
// after a fresh git checkout, where every file gets a new modification time; the
// generated files are committed, so deploy builds only encode new/changed images.
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, '_img');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');
const PIPELINE_VERSION = 2;

const SOURCE_FOLDERS = [
  'images/articles',
  'images/projects',
  'images/platforms',
  'images/moments',
  'images/team',
  'images/brand',
  'images/showcase',
  'images/home',
  'images/videos'
];

const WIDTHS = [320, 640, 960, 1280, 1920];
const MIN_SSIM = 0.98;
const START_Q = { avif: 55, webp: 80 };
const MAX_Q = { avif: 80, webp: 94 };

// SSIM on luma with 8×8 windows: catches blocking, banding and blur from compression.
async function luma(input, width, height) {
  return sharp(input).resize({ width, height, fit: 'fill' }).flatten({ background: '#808080' }).greyscale().raw().toBuffer();
}

function ssim(a, b, width, height) {
  const C1 = (0.01 * 255) ** 2;
  const C2 = (0.03 * 255) ** 2;
  let total = 0;
  let count = 0;
  for (let y = 0; y + 8 <= height; y += 8) {
    for (let x = 0; x + 8 <= width; x += 8) {
      let sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0;
      for (let j = 0; j < 8; j++) {
        const row = (y + j) * width + x;
        for (let i = 0; i < 8; i++) {
          const va = a[row + i];
          const vb = b[row + i];
          sa += va; sb += vb; saa += va * va; sbb += vb * vb; sab += va * vb;
        }
      }
      const ma = sa / 64, mb = sb / 64;
      const v1 = saa / 64 - ma * ma, v2 = sbb / 64 - mb * mb, cv = sab / 64 - ma * mb;
      total += ((2 * ma * mb + C1) * (2 * cv + C2)) / ((ma * ma + mb * mb + C1) * (v1 + v2 + C2));
      count++;
    }
  }
  return count ? total / count : 1;
}

function collectFiles() {
  const files = [];
  for (const folder of SOURCE_FOLDERS) {
    const dir = path.join(PUBLIC_DIR, folder);
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      const ext = path.extname(entry).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
      files.push({ relPath: `/${folder}/${entry}`, fullPath: path.join(dir, entry), folder, name: path.parse(entry).name });
    }
  }
  return files;
}

async function encode(file, width, height, format, reference) {
  let quality = START_Q[format];
  for (;;) {
    const pipeline = sharp(file.fullPath).resize({ width, withoutEnlargement: true, kernel: 'lanczos3' });
    const buffer = format === 'avif'
      ? await pipeline.avif({ quality, effort: 4 }).toBuffer()
      : await pipeline.webp({ quality, effort: 5, smartSubsample: true }).toBuffer();
    const score = ssim(reference, await luma(buffer, width, height), width, height);
    if (score >= MIN_SSIM || quality >= MAX_Q[format]) return { buffer, quality, score };
    quality = Math.min(MAX_Q[format], quality + 5);
  }
}

async function processFile(file, previous) {
  const meta = await sharp(file.fullPath).metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  const widths = [...WIDTHS.filter((x) => x < w), Math.min(w, WIDTHS[WIDTHS.length - 1])];
  const uniqueWidths = [...new Set(widths)];
  const outDir = path.join(OUTPUT_DIR, file.folder);
  fs.mkdirSync(outDir, { recursive: true });

  const hash = crypto.createHash('sha1').update(fs.readFileSync(file.fullPath)).digest('hex').slice(0, 16);
  const outputs = uniqueWidths.flatMap((x) => ['avif', 'webp'].map((f) => path.join(outDir, `${file.name}.${x}.${f}`)));
  if (previous?.v === PIPELINE_VERSION && previous.hash === hash && outputs.every((o) => fs.existsSync(o))) {
    return { entry: previous, generated: false };
  }

  let worst = 1;
  for (const x of uniqueWidths) {
    const y = Math.round((h * x) / w);
    const reference = await luma(await sharp(file.fullPath).resize({ width: x, kernel: 'lanczos3' }).png().toBuffer(), x, y);
    for (const format of ['avif', 'webp']) {
      const { buffer, score } = await encode(file, x, y, format, reference);
      worst = Math.min(worst, score);
      fs.writeFileSync(path.join(outDir, `${file.name}.${x}.${format}`), buffer);
    }
  }

  return {
    generated: true,
    worst,
    entry: { v: PIPELINE_VERSION, hash, w, h, base: `/_img/${file.folder}/${file.name}`, widths: uniqueWidths }
  };
}

async function main() {
  console.log('--- Responsive image pipeline (AVIF + WebP, SSIM-gated) ---');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  let manifest = {};
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    manifest = {};
  }

  const files = collectFiles();
  const next = {};
  let generated = 0;
  let index = 0;
  const workers = Array.from({ length: Math.max(1, Math.min(4, os.availableParallelism?.() ?? 2)) }, async () => {
    while (index < files.length) {
      const file = files[index++];
      try {
        const r = await processFile(file, manifest[file.relPath]);
        next[file.relPath] = r.entry;
        if (r.generated) {
          generated++;
          console.log(`  ${file.relPath} → ${r.entry.widths.join('/')} (min SSIM ${r.worst.toFixed(3)})`);
        }
      } catch (err) {
        console.error(`  ! ${file.relPath}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);

  const sorted = Object.fromEntries(Object.keys(next).sort().map((k) => [k, next[k]]));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted), 'utf8');
  console.log(`Images: ${files.length} sources, ${generated} encoded, ${files.length - generated} up to date.`);
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
