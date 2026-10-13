// Renders the hero banners used at the top of transactional / newsletter emails
// (public/images/email/*.jpg). Each banner is laid out as HTML with the site's own font
// (Readex Pro), brand colours and the dark hero artwork, then captured with Playwright.
// Re-run after changing copy:  node scripts/generate-email-banners.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'public/images/email');
const asset = (p) => 'data:' + (p.endsWith('.png') ? 'image/png' : 'font/woff2') + ';base64,' + fs.readFileSync(path.join(ROOT, p)).toString('base64');

const BG = asset('public/images/home/hero-dark.png');
const LOGO = asset('public/images/brand/techno-logo.png');
const FONT = (w) => asset(`public/fonts/readex-pro-arabic-${w}.woff2`);
const FONT_LATIN = (w) => asset(`public/fonts/readex-pro-latin-${w}.woff2`);

const BANNERS = [
  { file: 'welcome-ar', dir: 'rtl', kicker: 'النشرة البريدية', title: 'أهلاً بك في عائلة تكنو إنجاز', sub: 'مقالات ومشاريع هندسية تصل بريدك أولاً بأول', accent: '#38bdf8' },
  { file: 'welcome-en', dir: 'ltr', kicker: 'NEWSLETTER', title: 'Welcome to Techno Enjaz', sub: 'Engineering articles & projects, straight to your inbox', accent: '#38bdf8' },
  { file: 'verify-ar', dir: 'rtl', kicker: 'حسابك', title: 'خطوة أخيرة لتفعيل حسابك', sub: 'أكّد بريدك الإلكتروني لتبدأ التعليق والحفظ', accent: '#34d399' },
  { file: 'reset-ar', dir: 'rtl', kicker: 'أمان الحساب', title: 'إعادة تعيين كلمة المرور', sub: 'رابط آمن صالح لساعة واحدة فقط', accent: '#fbbf24' },
  { file: 'confirm-ar', dir: 'rtl', kicker: 'النشرة البريدية', title: 'تأكيد الاشتراك في النشرة', sub: 'ضغطة واحدة وتصلك مقالاتنا الجديدة', accent: '#38bdf8' },
  { file: 'news-ar', dir: 'rtl', kicker: 'جديد تكنو إنجاز', title: 'نشرة تكنو إنجاز', sub: 'هندسة · ذكاء اصطناعي · روبوتات · برمجيات', accent: '#a78bfa' }
];

const html = (b) => `<!doctype html><html dir="${b.dir}"><head><meta charset="utf-8"><style>
@font-face{font-family:Readex;src:url(${FONT(400)}) format('woff2');font-weight:400}
@font-face{font-family:Readex;src:url(${FONT(600)}) format('woff2');font-weight:600}
@font-face{font-family:Readex;src:url(${FONT(700)}) format('woff2');font-weight:700}
@font-face{font-family:Readex;src:url(${FONT_LATIN(400)}) format('woff2');font-weight:400;unicode-range:U+0000-00FF}
@font-face{font-family:Readex;src:url(${FONT_LATIN(700)}) format('woff2');font-weight:700;unicode-range:U+0000-00FF}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:480px;overflow:hidden;font-family:Readex,sans-serif;background:#050b18}
.bg{position:absolute;inset:0;background:url(${BG}) center 38%/cover;filter:saturate(1.1)}
.shade{position:absolute;inset:0;background:
  linear-gradient(${b.dir === 'rtl' ? '270deg' : '90deg'},rgba(5,11,24,.97) 0%,rgba(5,11,24,.88) 42%,rgba(5,11,24,.35) 75%,rgba(5,11,24,.15) 100%),
  linear-gradient(0deg,rgba(5,11,24,.85) 0%,rgba(5,11,24,0) 45%)}
.glow{position:absolute;width:520px;height:520px;border-radius:50%;filter:blur(90px);opacity:.28;background:${b.accent};${b.dir === 'rtl' ? 'right' : 'left'}:-160px;top:-180px}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(${b.dir === 'rtl' ? '270deg' : '90deg'},#000,transparent 70%)}
.content{position:absolute;inset:0;padding:56px 72px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;color:#fff}
.brand{display:flex;align-items:center;gap:16px;margin-bottom:34px}
.brand img{width:58px;height:62px;filter:drop-shadow(0 0 18px rgba(56,189,248,.45))}
.brand span{font-size:30px;font-weight:700;letter-spacing:${b.dir === 'rtl' ? '0' : '.5px'}}
.kicker{display:inline-block;font-size:19px;font-weight:600;color:${b.accent};padding:6px 16px;border:1px solid ${b.accent}55;border-radius:999px;background:${b.accent}14;margin-bottom:18px}
h1{font-size:${b.dir === 'rtl' ? 56 : 54}px;font-weight:700;line-height:1.25;max-width:760px;text-shadow:0 4px 24px rgba(0,0,0,.5)}
p{margin-top:16px;font-size:25px;font-weight:400;color:#cbd5e1;max-width:700px}
.bar{position:absolute;bottom:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#0369a1,${b.accent},#0369a1)}
</style></head><body>
<div class="bg"></div><div class="shade"></div><div class="glow"></div><div class="grid"></div>
<div class="content">
  <div class="brand"><img src="${LOGO}" alt=""><span>${b.dir === 'rtl' ? 'تكنو إنجاز' : 'Techno Enjaz'}</span></div>
  <div class="kicker">${b.kicker}</div>
  <h1>${b.title}</h1>
  <p>${b.sub}</p>
</div>
<div class="bar"></div>
</body></html>`;

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 480 }, deviceScaleFactor: 1 });
for (const b of BANNERS) {
  await page.setContent(html(b), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const file = path.join(OUT, `${b.file}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 84 });
  console.log(path.relative(ROOT, file), Math.round(fs.statSync(file).size / 1024) + ' KB');
}
await browser.close();
