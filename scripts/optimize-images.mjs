import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, '_img');

const TARGET_PATTERNS = [
  'images/articles',
  'images/projects',
  'images/platforms',
  'images/moments',
  'images/team',
  'images/brand'
];

async function collectFiles() {
  const files = [];

  for (const item of TARGET_PATTERNS) {
    const fullPath = path.join(PUBLIC_DIR, item);
    if (!fs.existsSync(fullPath)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(fullPath);
      for (const entry of entries) {
        const ext = path.extname(entry).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          files.push({
            relPath: `/${item}/${entry}`,
            fullPath: path.join(fullPath, entry),
            folder: item,
            nameWithoutExt: path.parse(entry).name,
            ext
          });
        }
      }
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push({
          relPath: `/${item}`,
          fullPath,
          folder: '',
          nameWithoutExt: path.parse(item).name,
          ext
        });
      }
    }
  }

  return files;
}

async function main() {
  console.log('--- Starting Image Optimization (P8) ---');
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  let manifest = {};
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      manifest = {};
    }
  }

  const files = await collectFiles();
  let optimizedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const targetDir = file.folder ? path.join(OUTPUT_DIR, file.folder) : OUTPUT_DIR;
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const out640 = path.join(targetDir, `${file.nameWithoutExt}.w640.webp`);
    const out1280 = path.join(targetDir, `${file.nameWithoutExt}.w1280.webp`);
    const rel640 = `/_img${file.folder ? `/${file.folder}` : ''}/${file.nameWithoutExt}.w640.webp`;
    const rel1280 = `/_img${file.folder ? `/${file.folder}` : ''}/${file.nameWithoutExt}.w1280.webp`;

    const srcStat = fs.statSync(file.fullPath);
    const mtime = srcStat.mtimeMs;

    const needs640 = !fs.existsSync(out640) || fs.statSync(out640).mtimeMs < mtime;
    const needs1280 = !fs.existsSync(out1280) || fs.statSync(out1280).mtimeMs < mtime;

    let meta;
    try {
      meta = await sharp(file.fullPath).metadata();
    } catch (err) {
      console.warn(`Could not read metadata for ${file.relPath}:`, err.message);
      continue;
    }

    manifest[file.relPath] = {
      w: meta.width || 0,
      h: meta.height || 0,
      w640: rel640,
      w1280: rel1280
    };

    if (needs640 || needs1280) {
      try {
        if (needs640) {
          await sharp(file.fullPath)
            .resize({ width: 640, withoutEnlargement: true })
            .webp({ quality: 86 })
            .toFile(out640);
        }
        if (needs1280) {
          await sharp(file.fullPath)
            .resize({ width: 1280, withoutEnlargement: true })
            .webp({ quality: 86 })
            .toFile(out1280);
        }
        optimizedCount++;
      } catch (err) {
        console.error(`Error optimizing ${file.relPath}:`, err.message);
      }
    } else {
      skippedCount++;
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Image optimization complete: ${optimizedCount} generated, ${skippedCount} up-to-date.`);
  console.log(`Manifest written to: ${path.relative(ROOT_DIR, manifestPath)}`);
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});

