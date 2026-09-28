# خطة Responsive/Adaptive + Assets لموقع Techno Enjaz

> **لمن هذه الوثيقة:** الـCoding Agent.
>
> **خطة الترحيل إلى Next.js (المشار إليها هنا باسم "خطة الترحيل" بمراحلها P0–P12):** كانت سابقاً في هذا الملف، وهي محفوظة في تاريخ git. لقراءتها:
> ```bash
> git show 60933a1:plan.md
> ```
> أو على GitHub: `https://github.com/Daliaalkilani/technoinjaz/blob/60933a1/plan.md`
>
> **ترتيب التنفيذ:**
> - R2 و R3 من هذه الخطة تحل محل الخطوات P8.2 و P8.3 و P8.4 في خطة الترحيل.
> - باقي مراحل هذه الخطة (R0 و R1 و R4 إلى R9) تُنفذ **بعد نجاح P11 في خطة الترحيل**، لأن هذه الخطة تغيّر الشكل **عمداً** على الموبايل والتابلت، و P11 يثبت أن الترحيل لم يغيّره.
> - إذا كان الترحيل لم يبدأ بعد أو لن يُنفذ: نفّذ هذه الخطة على الكود الحالي، وطبّق المسارات والمكونات حسب ما هو موجود فعلاً في الـrepo.
>
> **القاعدة الذهبية:** القرارات هنا محسومة. أي حالة غير مغطاة: توقف واسأل المالك.

---

## 0. تصحيحات على خطة الترحيل (الـrepo تغيّر بعد كتابتها)

تحقّقت من آخر commits (`3c92b59` و `68db100`):

1. **`src/assets/projects/techno-projects/*` أصبحت مستخدمة** في الرئيسية (InfiniteSpiral: ‏`project-01` إلى `project-14`). **لا تحذفها** رغم ورودها في القسم 2.1 من خطة الترحيل. القاعدة العامة هناك (`grep` قبل الحذف) تبقى ملزمة.
2. **الأيقونات أُضيفت فعلاً في `public/`:** ‏`favicon.ico`، و `favicon-16x16.png`، و `favicon-32x32.png`، و `favicon-48x48.png`، و `apple-touch-icon.png` (180)، و `android-chrome-192x192.png`، و `android-chrome-512x512.png`، و `manifest.webmanifest`.
   - في P10 من خطة الترحيل: **استخدم هذه الملفات كما هي**.
   - انقل قيم `manifest.webmanifest` حرفياً إلى `src/app/manifest.ts` (أو اترك الملف في `public/` واحذف `manifest.ts`. **اختر واحداً فقط**، والمفضل `manifest.ts` مع حذف الملف الثابت).
   - `public/favicon.svg` ما زال **شعار Vite**. يُستبدل في R2 بشعار SVG الحقيقي.

---

## 1. نتائج الفحص الفعلي (قياس وليس تخمين)

**طريقة الفحص:**
- بناء الموقع الحالي، ثم Playwright/Chromium على 10 صفحات × 9 مقاسات: ‏320، و 360، و 390، و 844×390 (موبايل أفقي)، و 768، و 820، و 1024 أفقي، و 1180 أفقي (iPad Air)، و 1440.
- لكل حالة: قياس الـoverflow الأفقي، وأحجام أهداف اللمس، والنصوص الأصغر من 12px، والصور الأكبر من الحاجة، ووزن الصور المحمّلة.

### 1.1 مشاكل حرجة

| # | المشكلة | أين | السبب الجذري (مؤكد) |
|---|---|---|---|
| C1 | **Overflow أفقي في كل الصفحات** (scrollWidth بين 1201 و 1221) | العروض من 961 إلى ~1220px: ‏iPad أفقي 1024 و 1180، ولابتوبات صغيرة | `nav#navbar` بـ`display:grid` وأعمدة `134px + 716px + 311px = 1161px`. الـbreakpoint الوحيد للـnav هو `max-width: 960px` في `src/index.css`، فالمجال بين 961 و 1220 بلا معالجة |
| C2 | **صفحة المقال تُعرض مصغّرة (zoomed-out)** على كل الموبايلات (320، و 360، و 390) | `#article/*` | عناصر `ol > li > p` في قائمة المراجع تحتوي روابط URL طويلة غير قابلة للكسر (عرض 655px). المتصفح يوسّع الـlayout إلى 667px ويصغّر الصفحة كلها. النص يصبح صغيراً جداً |
| C3 | **الرئيسية تحمّل 22.5MB صور على الموبايل** | `/` | 14 صورة `project-NN.png` بدقة 1254×1254 (حتى 1.7MB لكل واحدة) تُعرض بعرض 140–190px. `Asset-1@4x.png` بدقة 2449px يُعرض بـ78px. ‏`im1` و `im2` و `hero-bg-distortion` PNG بين 1.3 و 1.9MB. أغلبها `loading=eager` |
| C4 | **قائمة التنقل على الموبايل مقطوعة** | كل الصفحات < 768px | 7 روابط في شريط أفقي قابل للتمرير (522px داخل 366px). "الرئيسية" و"من نحن" مقطوعتان بلا أي إشارة أن هناك المزيد. الـheader يأخذ 105px من الشاشة |
| C5 | **أهداف لمس صغيرة** | كل الصفحات | روابط الـnav بارتفاع 30px، وزر اللغة 32px، وأزرار البطاقات. المطلوب ≥ 44×44px |

### 1.2 مشاكل متوسطة

| # | المشكلة | الأرقام |
|---|---|---|
| M1 | نصوص أصغر من 12px | ‏`/projects`: 77 عنصراً (`.cat-count` 11px، و `.card-cat-badge` 11.5px، و `.card-tag-item`). ‏`/videos`: 92 عنصراً (`.engineer-pill-role` 10.56px، و `.cinema-project-desc` 11.84px). ‏`.footer-copyright` 11px في كل الصفحات |
| M2 | **235 قاعدة `:hover` بدون أي `@media (hover: hover)`** | على اللمس يعلق تأثير الـhover بعد النقر (sticky hover) |
| M3 | `100vh` مستخدم في 23 مكاناً، و `dvh` و `svh` في 8 فقط | على iOS و Android الأقسام بارتفاع الشاشة تُقص تحت شريط العنوان أو تقفز عند التمرير |
| M4 | لا دعم لـ`safe-area-inset` ولا `viewport-fit=cover` | الأجهزة ذات النوتش وشريط الإيماءات: أزرار Reels السفلية قريبة من حافة الإيماءات |
| M5 | 16 قيمة breakpoint مختلفة | ‏380، و 480، و 599، و 600، و 640، و 768، و 820، و 850، و 900، و 950، و 960، و 992، و 1024 (max)، و 600 و 1024 (min). ‏C1 نتيجة مباشرة لهذا التشتت |
| M6 | صور أكبر من الحاجة على التابلت واللابتوب | ‏`/projects` على 1440 فيه 27 صورة أكبر من ضعف الحاجة، ووزن الصفحة 22.7MB |
| M7 | صور مكررة في الـrepo | ‏`src/assets/articles/*` = ‏`public/articles/*`. ‏`Asset-1@4x.png` في الجذر = ‏`assets/logo.png` = ‏`src/assets/Asset-1@4x.png`. ‏`public/loader/assets/original-logo.png` (600KB) و `logo.webp` و `brand.webp` غير مستخدمة |

### 1.3 ما يعمل جيداً (لا تلمسه)

- الموبايل الأفقي (844×390): لا overflow.
- التابلت العمودي (768 و 820): لا overflow، والـnav على سطرين يعمل جيداً. **هذا هو النموذج لسلوك التابلت.**
- اللابتوب 1440: سليم.

---

## 2. القرارات المعمارية

### 2.1 Responsive أم Adaptive؟

**القرار: Responsive كأساس + Adaptive على مستوى المكونات فقط.**

| الطبقة | الأسلوب | السبب |
|---|---|---|
| Layout والـtypography والمسافات والشبكات | **Responsive** (fluid: `clamp()` و rem و grid auto-fit + breakpoints موحدة) | محتوى واحد يتكيف مع كل عرض، و HTML واحد (مهم للـSSG والـSEO) |
| الـNavigation | **Adaptive** (بنية مختلفة حسب العرض: desktop bar، و tablet two-row، و mobile drawer) | 7 روابط لا يمكن أن تتسع في 360px بشكل مقروء |
| المؤثرات الثقيلة (WebGL و Canvas و GSAP magnetic و hover) | **Adaptive حسب قدرة الجهاز** (`pointer` و `hover` و `prefers-reduced-motion` و `saveData` و `deviceMemory`) | نفس العرض قد يكون هاتفاً ضعيفاً أو تابلت قوياً. العرض وحده لا يكفي |
| الصور | **Responsive images** (`<picture>` + AVIF و WebP + `srcset` و `sizes`) | المتصفح يختار الملف المناسب لعرض الشاشة وكثافتها |

**لماذا ليس Adaptive كامل** (قوالب HTML منفصلة للموبايل): يضاعف الصيانة، ويكسر SSG (صفحة واحدة لكل URL)، ويسبب محتوى مختلفاً للـcrawler حسب الجهاز.

### 2.2 مسألة dp و px (مهم)

- **CSS `px` في الويب هو أصلاً وحدة مستقلة عن الكثافة.** ‏1 CSS px يعادل `dp` في Android و `pt` في iOS. المتصفح يضربه بـ`devicePixelRatio` (DPR) تلقائياً: على iPhone بـDPR=3 فإن 1 CSS px = 3 بكسلات فيزيائية.
- **لذلك:**
  1. **الأبعاد والمسافات:** `rem` للمسافات والخطوط (تحترم إعداد حجم الخط عند المستخدم)، و `px` مقبول للحدود (1px) والظلال. **ممنوع** ضبط `html { font-size: ...px }`. الأساس يبقى 16px من المتصفح.
  2. **الصور النقطية (raster):** يجب توفير ملفات بعدة عروض فيزيائية لتغطية DPR من 1 إلى 3 عبر `srcset` مع `w` descriptors، والمتصفح يحسب `sizes × DPR`. هذه هي المعالجة الصحيحة لـ"dp" في الصور.
  3. **الشعارات والأيقونات:** SVG (vector)، فتبقى حادة على أي DPR بملف واحد.
  4. **أهداف اللمس:** الحد الأدنى **44×44 CSS px** (يعادل 44pt في iOS)، والمفضّل 48×48 (يعادل 48dp في Android Material).
  5. **الـCanvas و WebGL:** حجم الـbuffer = حجم CSS × `min(devicePixelRatio, cap)`. الـcap يُحدد حسب فئة الجهاز (R6) لتفادي 3× على هواتف ضعيفة.

### 2.3 الـBreakpoints الموحّدة (نهائية)

```css
/* src/styles/breakpoints.md (documentation) — values used in all @media */
--bp-sm:  480px;   /* large phones */
--bp-md:  768px;   /* tablet portrait */
--bp-lg:  1024px;  /* tablet landscape / small laptop */
--bp-xl:  1280px;  /* laptop */
--bp-2xl: 1536px;  /* desktop */
```

- CSS custom properties لا تعمل داخل `@media`. لذلك **القيم تُكتب حرفياً** في كل ملف، ويُمنع أي رقم غير هذه الخمسة (يُفحص بسكربت في R9).
- **الاستثناء الوحيد:** `public/loader/loader.css` (380 و 600) لأنه مستقل عن React. اتركه.
- **قاعدة الكتابة:** استخدم `max-width: <bp - 0.02px>` (مثل `max-width: 767.98px`) مع `min-width: <bp>` لتفادي تداخل الحدود. الكود الحالي يستخدم `max-width` فقط، فالتحويل كالتالي.

**خريطة التحويل الإلزامية:**

| الحالي | الجديد | ملاحظة |
|---|---|---|
| `max-width: 380px` | يبقى (loader فقط) | |
| `max-width: 480px` | `max-width: 479.98px` | |
| `max-width: 599px` و `600px` و `640px` | `max-width: 639.98px` | تحقّق بصرياً بين 600 و 640 |
| `min-width: 600px` | `min-width: 640px` | MagicBento |
| `max-width: 768px` | `max-width: 767.98px` | |
| `max-width: 820px` و `850px` و `900px` و `950px` و `960px` و `992px` | `max-width: 1023.98px` | تخطيط التابلت يشمل الآن iPad العمودي كاملاً |
| `max-width: 1024px` | `max-width: 1279.98px` | ‏**يحل C1** (يشمل iPad الأفقي 1024 و 1180) |
| `min-width: 1024px` | `min-width: 1280px` | |

> ⚠️ هذا التحويل يغيّر شكل بعض المقاسات الحدّية عمداً. كل ملف يُحوَّل ثم يُراجع بلقطات 600 و 640 و 800 و 1000 و 1100 و 1200 و 1280 قبل الانتقال للذي يليه.

### 2.4 الصور: ماذا يصبح Vector وماذا يبقى Raster

**القاعدة:** الـvector مناسب فقط لما هو أشكال هندسية وألوان مسطحة أو تدرجات بسيطة. الصور الفوتوغرافية ولقطات الشاشة والصور المولَّدة بالذكاء الاصطناعي **لا تُحوَّل إلى vector أبداً**. التتبع الآلي (auto-trace) لها ينتج ملفات SVG بعدة ميغابايت بمظهر مُبسّط (posterized)، أي جودة أسوأ وأداء أسوأ.

| الأصل | النوع | القرار |
|---|---|---|
| `public/techno-logo.png` (483×517)، و `src/assets/Asset-1@4x.png` (2449×2618)، و `assets/logo.png`، و `public/loader/assets/original-logo.png` | شعار هندسي: 3 مثلثات ومعيّنات + دائرة بتدرجات (teal إلى blue/violet) | **Vector:** إعادة بناء يدوية دقيقة كـSVG |
| `public/loader/assets/rocket-body.webp` (820×877) | الشعار بدون الدائرة | **Vector** (نفس الـSVG بدون الدائرة) |
| `public/loader/assets/launch-button.webp` (240×240) | دائرة بتدرج خطي وحلقة | **Vector** |
| `public/favicon.svg` | شعار Vite | **استبدال** بـSVG الشعار |
| favicons PNG و ICO و apple و android | أيقونات أضافها المالك | **تبقى** (لا تحتاج تغييراً) |
| `public/articles/*` (12، ‏1280×720) | صور توضيحية مولَّدة | **Raster:** ‏AVIF + WebP متعدد العروض |
| `public/projects/*` (14، ‏1672×941) | صور توضيحية وفوتوغرافية | **Raster:** ‏AVIF + WebP |
| `src/assets/projects/techno-projects/project-*.png|jpg` (1254×1254) | صور منتجات ومشاريع | **Raster:** ‏AVIF + WebP |
| `src/assets/projects/techno-projects/chapter4-*.webp` | صور | **Raster** (تحقق من الاستخدام أولاً) |
| `public/projects-live/*` (13، ‏1280×800) | **لقطات شاشة بنصوص** | **Raster** بجودة أعلى (النص يجب أن يبقى حاداً)، وبعضها lossless (انظر R3) |
| `public/moments/*` (768×1024) | صور فوتوغرافية | **Raster** |
| `src/assets/{im1,im2,im3,hero-bg-distortion}.png` | خلفيات وصور hero | **Raster** |
| `src/assets/videos/*.png` | أغلفة فيديو | **Raster** |
| `public/abdulghani.jpg` | صورة شخص | **Raster** |
| أيقونات lucide-react | SVG أصلاً | تبقى |

---

## 3. المراحل

```text
R0  Baseline responsive (after plan.md P11)
R1  Foundations: viewport, tokens, breakpoints, units, safe areas
R2  Vector brand assets (logo, loader, favicon.svg)
R3  Raster image pipeline (AVIF/WebP, srcset, budgets)  ← replaces plan.md P8.2–P8.4
R4  Navigation (adaptive: desktop / tablet / mobile drawer)
R5  Page-by-page layout fixes (overflow, typography, grids, touch targets)
R6  Adaptive effects (hover, WebGL/Canvas tiers, GSAP, reduced motion)
R7  Forms & inputs on mobile
R8  Performance budgets per device
R10 Senior additions (Arabic typography, logical props, dynamic header, glass perf, container queries,
    short heights, text zoom, overscroll, motion control, art direction, fonts, content-visibility,
    forced-colors, print, foldables, regression guards, field data)   ← before R9
R9  Validation matrix (automated + real devices)
```

**ترتيب التنفيذ مع خطة الترحيل:**
- R2 و R3 تُنفذان **ضمن P8 في خطة الترحيل** (الصور والأصول لا تغير الشكل، فهي آمنة قبل P11).
- R0 و R1 و R4 إلى R10 تُنفذ **بعد P11 في خطة الترحيل**. ترتيب التنفيذ: R0، R1، R4، R5، R6، R10، R7، R8، R9. يأتي R10 بعد R6 لأن R10.4 و R10.9 يعتمدان على `data-tier` الذي يعرّفه R6.

> القواعد العامة كما في خطة الترحيل:
> - commit لكل مرحلة.
> - لا تغيير في الألوان أو الخطوط أو الهوية.
> - كل تغيير بصري مقصود يُوثَّق في `docs/responsive-changes.md` مع لقطة قبل وبعد.

---

### R0 — Baseline Responsive

**Goal:** مرجع قبل التغيير.
**Actions:**
1. `tests/responsive/devices.ts`: مصفوفة الأجهزة الرسمية.

   | الاسم | viewport | DPR | touch |
   |---|---|---|---|
   | fold-280 | 280×653 | 3 | ✓ |
   | small-320 | 320×640 | 2 | ✓ |
   | galaxy-360 | 360×800 | 3 | ✓ |
   | iphone-se | 375×667 | 2 | ✓ |
   | iphone-15 | 393×852 | 3 | ✓ |
   | pixel-7 | 412×915 | 2.625 | ✓ |
   | phone-landscape | 852×393 | 3 | ✓ |
   | ipad-mini | 768×1024 | 2 | ✓ |
   | ipad-air | 820×1180 | 2 | ✓ |
   | ipad-air-landscape | 1180×820 | 2 | ✓ |
   | ipad-pro-12 | 1024×1366 | 2 | ✓ |
   | ipad-landscape-1024 | 1024×768 | 2 | ✓ |
   | laptop-1280 | 1280×800 | 1 | ✗ |
   | laptop-1440 | 1440×900 | 2 | ✗ |
   | desktop-1920 | 1920×1080 | 1 | ✗ |
   | desktop-2560 | 2560×1440 | 1 | ✗ |
   | phone-landscape-short | 740×360 | 3 | ✓ |
   | ipad-split | 507×1024 | 2 | ✓ |

2. `tests/responsive/audit.spec.ts`: لكل جهاز × كل URL في الـsitemap + `/login` و `/account`، يسجّل **نفس المقاييس المستخدمة في هذا الفحص**:
   - `document.documentElement.scrollWidth > clientWidth` (overflow أفقي).
   - أهداف اللمس الأصغر من 44×44 (a و button و input و `[role=button]`)، مستثنياً الروابط داخل فقرات النص (`p a` و `li a` داخل `.article-fullscreen-markdown-body` و ProjectBody).
   - عناصر نص بـfont-size أقل من 12px.
   - صور `naturalWidth > renderedWidth × DPR × 2` بعرض طبيعي > 800.
   - مجموع bytes الصور المحمّلة حتى `networkidle`، والـLCP (PerformanceObserver) والـCLS.
   - يحفظ `docs/responsive-baseline.json` ولقطات `tests/responsive/__baseline__/`.
3. **الأرقام المرجعية المتوقعة** (من فحصنا، للتأكد أن الأداة تقيس صحيحاً):
   - `/` على galaxy-360: صور ≈ 22.5MB.
   - `/articles/digital-twin` على iphone-15: ‏scrollWidth ≈ 667.
   - كل الصفحات على ipad-air-landscape: ‏scrollWidth ≈ 1221.

**Validation:** ملف baseline موجود، والأرقام قريبة من المذكورة.

---

### R1 — Foundations

**Goal:** أساس موحّد: viewport، وtokens، ووحدات، و safe areas.
**Files:** `src/app/layout.tsx` (viewport)، و `src/index.css`، و `src/styles/tokens.css` (جديد، يُستورد أول شيء في `index.css`)، و `docs/breakpoints.md`.

**Actions:**
1. **Viewport** (Next `viewport` export):
   ```ts
   export const viewport: Viewport = {
     width: 'device-width', initialScale: 1, maximumScale: 5, viewportFit: 'cover',
     themeColor: [
       { media: '(prefers-color-scheme: dark)', color: '#030712' },
       { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
     ],
   };
   ```
   - ‏`maximumScale: 5` يبقى (**ممنوع** منع التكبير، فهذا شرط accessibility).
   - ‏`#f8fafc` هو لون الخلفية الفاتحة المستخدم فعلاً في `App.tsx`.
2. **`tokens.css`:** لا يغيّر أي قيمة موجودة، يضيف فقط:
   ```css
   :root{
     /* fluid type scale (min at 360px → max at 1440px) */
     --fs-xs:  max(0.75rem, 12px);                              /* hard floor 12px */
     --fs-sm:  clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem);    /* 13–14px */
     --fs-base:clamp(0.9375rem, 0.9rem + 0.2vw, 1rem);          /* 15–16px */
     --fs-lg:  clamp(1.0625rem, 1rem + 0.35vw, 1.25rem);
     --fs-xl:  clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem);
     --fs-2xl: clamp(1.5rem, 1.2rem + 1.4vw, 2.5rem);
     --fs-3xl: clamp(1.75rem, 1.3rem + 2.2vw, 3.25rem);
     /* spacing (rem-based) */
     --space-1:.25rem; --space-2:.5rem; --space-3:.75rem; --space-4:1rem; --space-5:1.25rem; --space-6:1.5rem; --space-8:2rem; --space-10:2.5rem; --space-12:3rem; --space-16:4rem;
     --gutter: clamp(1rem, 0.6rem + 1.8vw, 2rem);               /* 16px phones → 32px desktop */
     --container: min(1200px, 100% - 2 * var(--gutter));
     --tap-min: 44px;
     /* viewport heights with fallbacks */
     --vh-full: 100vh;
     --safe-top: env(safe-area-inset-top, 0px);
     --safe-bottom: env(safe-area-inset-bottom, 0px);
     --safe-left: env(safe-area-inset-left, 0px);
     --safe-right: env(safe-area-inset-right, 0px);
   }
   @supports (height: 100svh){ :root{ --vh-full: 100svh; } }
   ```
   - **لا تستبدل الأحجام الحالية بشكل شامل.** الـtokens تُستخدم فقط في الأماكن التي تصلحها R5 (النصوص تحت 12px، والعناوين التي تحتاج fluid).
3. **`100vh` (23 موضعاً):**
   - كل `height: 100vh` أو `min-height: 100vh` في CSS يصبح:
     ```css
     height: 100vh; height: var(--vh-full);
     ```
     (السطر الأول fallback للمتصفحات القديمة).
   - في inline styles داخل TSX و JSX: `'100vh'` يصبح `'var(--vh-full)'`.
   - **الاستثناء:** ScrollExpand و ProjectReelsFeed. هذان يحتاجان `100dvh` لأن المحتوى يجب أن يملأ الشاشة الفعلية أثناء التمرير. استخدم `100vh` ثم `100dvh` كـfallback chain.
   - المواضع الثمانية التي تستخدم `dvh` أو `svh` حالياً تبقى كما هي.
4. **Safe areas:**
   - الـnavbar الثابت: `padding-top: calc(<existing> + var(--safe-top))`.
   - أزرار Reels السفلية و `.cinema-*` actions: `padding-bottom: calc(<existing> + var(--safe-bottom))`.
   - الـfooter: `padding-bottom` مع `var(--safe-bottom)`.
   - الـdrawer (R4): كل الجهات.
   - في landscape على iPhone: الحاويات الرئيسية `padding-inline: max(var(--gutter), var(--safe-left))` (و right). طبّق على `.tab-page-container` والحاويات العليا فقط.
5. **حماية عامة من الـoverflow** (في `index.css`):
   ```css
   html, body { overflow-x: clip; }            /* not 'hidden' — keeps position:sticky working */
   img, svg, video, canvas, iframe { max-width: 100%; }
   img, video { height: auto; }
   :where(.grid, [class*="grid"]) > * { min-width: 0; }   /* grid children can shrink */
   ```
   ⚠️ ‏`overflow-x: clip` **شبكة أمان فقط، وليست الحل**. كل overflow يُصلح من سببه في R5، والفحص في R9 يعمل **مع تعطيل هذه القاعدة** (عبر `addStyleTag` بقيمة `html,body{overflow-x:visible!important}`) ليكشف أي سبب متبقٍّ.
6. **Breakpoints:** طبّق خريطة القسم 2.3 على **كل** ملفات CSS (القائمة: ‏`index.css`، و `AuthPage.css`، و `ContactPage.css`، و `InfiniteMenu.css`، و `ProfilePage.css`، و `UserProfilePage.css`، و `CinematicFooter.css`، و `TeamMomentsRing.css`، و `ArticlesSection.css`، و `OfficeBlogSection.css`، و `ProjectsCatalogSection.css`، و `InfiniteSpiral.css`، و `auth-switch.css`، و `VideoPlayerModal.css`، و `FaqSection.css`، و `ProjectsSection.css`، و `ui/CardSwap.css`، و `ProjectReelsFeed.css`، و `ScrollExpandPrototype.css` أو `HomeHero.css`، و `ArticleDetailView.css`، و `LiveProjectsShowcase.css`، و `MagicBento.css`، و `ProjectDetailView.css`، و `VideosSection.css`). ‏**ملف واحد لكل commit فرعي، مع لقطات قبل وبعد.**
   - الملفات غير المستخدمة (`App.css`، و `ScrollReveal.css`...) تُحذف في خطة الترحيل P1، فلا تحوّلها.
   - في JS: ‏`ProjectsSection` (`innerWidth < 640`)، و `MagicBento` (`MOBILE_BREAKPOINT`)، و `getResponsiveConfig` في الـhero. وحّد العتبات إلى نفس القيم، وأنشئ `src/lib/breakpoints.ts`:
     ```ts
     export const BP = { sm: 480, md: 768, lg: 1024, xl: 1280, xxl: 1536 } as const;
     ```
     واستخدم `matchMedia('(max-width: 767.98px)')` بدل `innerWidth`، مع listener على `change`.

**Validation:**
- `grep -rhoE "\((max|min)-width: *[0-9.]+px\)" src | sort -u` لا يُظهر إلا القيم المسموحة.
- ‏C1 محلول: لا overflow على 1024 و 1180 (مع تعطيل `overflow-x: clip`). التحقق الكامل بعد R4.

---

### R2 — Vector Brand Assets

**Goal:** الشعار وأصول الـloader كـSVG حادة على أي كثافة وبحجم صغير.
**Files:**
- جديدة: `public/brand/logo.svg`، و `public/brand/logo-mark.svg` (بدون الدائرة)، و `public/brand/launch-button.svg`، و `public/favicon.svg` (استبدال)، و `scripts/compare-vector.mjs`.
- معدّلة: مراجع الشعار في الـnavbar والـhero والـfooter والـloader.

**Actions:**
1. **تحليل الشعار الأصلي** (`src/assets/Asset-1@4x.png` بدقة 2449×2618، وهو الأعلى دقة):
   - الشكل: معيّنان جانبيان مائلان + مثلث علوي (حرف A مفتوح)، مع فواصل شفافة بين القطع، ودائرة في الأسفل الوسط.
   - الألوان: تدرّج خطي من teal فاتح في الأعلى إلى أزرق ثم بنفسجي في الأسفل. الدائرة بتدرج قطري بنفسجي إلى teal.
2. **إعادة البناء:**
   - (a) استخرج قناع الـalpha من PNG بسكربت (sharp: `.extractChannel('alpha').threshold(128)`).
   - (b) تتبّع الحدود بـ`potrace` (npm: `potrace`) لكل قطعة **منفصلة** للحصول على الإحداثيات.
   - (c) **بسّط يدوياً** إلى polygons: القطع هندسية، فكل قطعة 3 إلى 6 نقاط. قرّب الإحداثيات إلى 0.5.
   - (d) الدائرة: `<circle>` بمركز ونصف قطر مقاسين من القناع.
   - (e) التدرجات: خذ عينات لون من PNG عند 5 نقاط على المحور الرأسي لكل قطعة، وابنِ `<linearGradient>` بـ`gradientUnits="userSpaceOnUse"` يمتد على كامل ارتفاع الشعار (حتى تتصل الألوان بين القطع كما في الأصل)، مع 2 إلى 4 `stop` كحد أقصى.
   - (f) `viewBox` بنفس نسبة الأصل (2449:2618).
3. **الملفات:**
   - `logo.svg`: الشكل الكامل.
   - `logo-mark.svg`: بدون الدائرة (يطابق `rocket-body.webp`).
   - `launch-button.svg`: من `launch-button.webp` (دائرة بتدرج + حلقة خارجية)، وبنفس الطريقة.
   - `favicon.svg`: نسخة من `logo.svg`، مع `<style>@media (prefers-color-scheme: dark){…}</style>` **فقط إذا** احتاج الشعار تبايناً على خلفية تبويب داكنة. الأصل ملوّن ومتباين على الخلفيتين، فالأرجح لا حاجة.
4. **مقارنة الجودة** (`scripts/compare-vector.mjs`): اعرض كل SVG بـsharp على نفس أبعاد PNG الأصلي على خلفية رمادية (`#808080`)، واعرض PNG الأصلي على نفس الخلفية، ثم احسب **SSIM** (npm: `ssim.js`) على مقاسَي 512px و 64px.
   - **الشرط:** SSIM ≥ 0.97 عند 512px و ≥ 0.95 عند 64px.
   - إذا فشل: عدّل النقاط أو الـstops وأعد القياس.
   - احفظ صور المقارنة في `docs/vector-compare/`.
5. **الحجم:** ‏SVGO (`npx svgo --multipass`)، والهدف ≤ 4KB لكل ملف.
6. **الاستبدال:**
   - الـnavbar (`/techno-logo.png` بعرض 42px): ‏`<img src="/brand/logo.svg" width=".." height="..">` بنفس الأبعاد المعروضة.
   - الـhero (`Asset-1@4x.png` بعرض 78–246px): ‏`logo.svg`.
   - الـfooter وأي مرجع آخر: `grep -rn "techno-logo.png\|Asset-1@4x" src`.
   - **Loader:** في `loader.js` الـtemplate (بعد خطة الترحيل P4.3)، استبدل `rocket-body.webp` بـ`/brand/logo-mark.svg`، و `launch-button.webp` بـ`/brand/launch-button.svg`، **بنفس `width` و `height` والـclasses**. تحقّق بصرياً من الـloader (الإضاءة والـplume تبقى CSS).
   - **يبقى PNG:** `public/techno-logo.png` لأن الـJSON-LD `logo` والـOpen Graph يحتاجان raster. Google يقبل SVG للـlogo أحياناً، لكن og:image لا يقبله.
7. **حذف المكررات** (بعد `grep` = 0 لكل واحد):
   - `assets/logo.png`، و `Asset-1@4x.png` في الجذر.
   - `src/assets/Asset-1@4x.png` (بعد الاستبدال).
   - `public/loader/assets/original-logo.png` و `logo.webp` و `brand.webp`.
   - `rocket-body.webp` و `launch-button.webp` بعد نجاح الـloader بالـSVG.

**Validation:**
- SSIM ضمن الحدود.
- اللقطات: الـnavbar والـhero والـloader مطابقة بصرياً على DPR 1 و 2 و 3.
- وزن الشعار ينتقل من 137–600KB إلى ≤ 4KB.

**Risks:**
- اختلاف طفيف في التدرج، فالـSSIM يكشفه.
- الـloader يعتمد على أبعاد الصورة، فتثبيت `width` و `height` يمنع ذلك.

---

### R3 — Raster Image Pipeline (يحل محل خطة الترحيل P8.2 و P8.3 و P8.4)

**Goal:** تقليل وزن الصور 85–95% مع الحفاظ على الجودة المرئية، مع ملف مناسب لكل شاشة وكثافة.

**القرارات:**
- **الصيغ:** ‏AVIF (أساسي) ثم WebP (احتياطي) ثم الأصل (احتياطي أخير)، عبر `<picture>`. ‏AVIF مدعوم في كل المتصفحات الحديثة (Safari 16.4+)، و WebP احتياط للأقدم.
- **العروض المولَّدة:** ‏`320، 480، 640، 960، 1280، 1600، 1920`. **لا تكبير أبداً:** العرض الأقصى = العرض الأصلي. الأصل 1254 مثلاً يولّد حتى 960 + نسخة بعرضه الأصلي 1254.
- **مكان الملفات:** كل الصور المستخدمة في `public/` (مصدر واحد). صور `src/assets` المستخدمة تُنقل إلى `public/media/` بنفس الأسماء:
  - `public/media/home/im1.png` و `im2.png` و `im3.png` و `hero-bg-distortion.png`.
  - `public/media/videos/*.png`.
  - `public/media/techno-projects/*`.
  - الـimports في الكود تصبح مسارات نصية.
  - **السبب:** pipeline واحد، ولا hashing من الـbundler يعيق الـsrcset.
- **المخرجات:** ‏`public/_img/<same path without ext>.<width>.avif|webp` + `public/_img/manifest.json`. المجلد مولَّد وقت البناء وفي `.gitignore`.

**فئات الجودة** (تحددها الأداة حسب المسار):

| الفئة | المسارات | AVIF | WebP | ملاحظة |
|---|---|---|---|---|
| `photo` | `articles/`، و `projects/`، و `moments/`، و `media/home/`، و `media/videos/`، و `media/techno-projects/`، و `abdulghani.jpg` | quality 55، effort 6، chroma 4:2:0 | quality 80، effort 5 | صور مولَّدة وفوتوغرافية |
| `screenshot` | `projects-live/` | quality 65، effort 6، **chroma 4:4:4** | quality 88، `smartSubsample: true` | نصوص واجهات: الـ4:4:4 يمنع تشويش ألوان النص |
| `flat` | صورة في `screenshot` أو `photo` عدد ألوانها المصغّر < 400 (مثل `hisab-erp.jpg` و `interactive-cv.jpg` و `taima-alwani.jpg`) | quality 70 | **lossless** WebP (`lossless: true`) إذا كان أصغر من lossy، وإلا q 90 | الأداة تقارن وتختار الأصغر الذي يمر شرط الجودة |

**شرط الحفاظ على الدقة (إلزامي وآلي):**
- لكل ملف مولَّد: صغّر الأصل إلى نفس العرض (sharp، ‏lanczos3)، ثم احسب **SSIM** بين الأصل المصغّر والملف المولَّد بعد فك ضغطه.
- **الحد الأدنى:** `photo` ≥ 0.97، و `screenshot` ≥ 0.985، و `flat` ≥ 0.99.
- إذا لم يتحقق الشرط: ارفع الـquality بخطوات 5 حتى يتحقق (الحد الأقصى AVIF 80 و WebP 95). تُسجَّل القيمة النهائية في الـmanifest.

**Actions:**
1. **`scripts/optimize-images.mjs`** (يستبدل placeholder خطة الترحيل P1.8):
   ```js
   // inputs: public/{articles,projects,projects-live,moments,media}/**/*.{png,jpg,jpeg,webp} + public/abdulghani.jpg
   // for each file: read metadata (width,height), classify (photo|screenshot|flat),
   // widths = [320,480,640,960,1280,1600,1920].filter(w => w < origW).concat([origW])
   // for each width: resize (withoutEnlargement), encode avif + webp per class settings,
   //   verify SSIM (ssim.js on raw RGBA buffers, downscaled original vs decoded output), bump quality until pass
   // skip if output exists and newer than source (mtime) — incremental
   // write public/_img/manifest.json: { "/articles/digital-twin.jpg": { w:1280, h:720, class:"photo", widths:[...], avifQ:55, webpQ:80, lqip:"data:image/webp;base64,..." } }
   ```
   - **LQIP:** نسخة 16px WebP بـbase64 (≈ 150 byte) تُستخدم كـbackground-image placeholder أثناء التحميل. **فقط** لصور LCP وصور البطاقات الكبيرة.
   - **الأداء:** concurrency = عدد الأنوية (`os.availableParallelism()`). أول تشغيل قد يأخذ دقائق، واللاحقة incremental.
   - **في CI أو Cloudflare build:** إذا كان وقت البناء مشكلة، يُسمح بعمل commit لـ`public/_img` بدل تجاهله. **القرار الافتراضي:** مولَّد وغير متتبع في git.
2. **مكون `src/components/ResponsiveImage.tsx`:**
   ```tsx
   type Props = { src: string; alt: string; sizes: string; priority?: boolean; className?: string; style?: React.CSSProperties };
   export function ResponsiveImage({ src, alt, sizes, priority, className, style }: Props) {
     const m = imageManifest[src];            // imported JSON (server-safe)
     if (!m) return <img src={src} alt={alt} className={className} style={style} loading={priority ? 'eager' : 'lazy'} decoding="async" />;
     const set = (ext: 'avif' | 'webp') => m.widths.map(w => `/_img${stripExt(src)}.${w}.${ext} ${w}w`).join(', ');
     return (
       <picture>
         <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
         <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
         <img src={src} width={m.w} height={m.h} alt={alt} sizes={sizes} className={className} style={style}
              loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
       </picture>
     );
   }
   ```
   - `width` و `height` الحقيقيان يمنعان CLS، والـCSS الموجود (`width:100%; height:auto` أو `object-fit`) يبقى.
   - **`<picture>` يضيف عنصراً:** إذا كان CSS الحالي يستهدف `.card img` مباشرة فلا مشكلة. إذا اعتمد على `parent > img`: أضف `picture{display:contents}` في `index.css`، فيبقى الـlayout مطابقاً.
3. **قيم `sizes` الإلزامية** (مشتقة من الـlayouts الحالية، ويتحقق منها الـagent بقياس العرض المعروض في Playwright على 390 و 820 و 1440، ثم يعدّلها إذا اختلفت أكثر من 20%):

   | الاستخدام | `sizes` | priority |
   |---|---|---|
   | صورة hero الرئيسية (`im2` و `im3`) | `(max-width: 767.98px) 100vw, 60vw` | ✓ (المتغيّر الداكن فقط، انظر ThemedImage في خطة الترحيل) |
   | خلفيات أقسام الرئيسية (`im1` و `hero-bg-distortion`) | `100vw` | ✗ |
   | InfiniteSpiral (`techno-projects/project-*`) | `(max-width: 767.98px) 50vw, 25vw` | أول 2 فقط eager، والباقي lazy |
   | أغلفة الفيديو (CardSwap) | `(max-width: 767.98px) 80vw, 40vw` | ✗ |
   | بطاقات المقالات والمشاريع (القوائم) | `(max-width: 639.98px) 100vw, (max-width: 1023.98px) 50vw, 33vw` | أول بطاقة فقط eager |
   | Banner المقال / صورة المشروع (التفاصيل) | `(max-width: 1023.98px) 100vw, 900px` | ✓ |
   | Related (sidebar) | `(max-width: 1023.98px) 50vw, 280px` | ✗ |
   | Reels covers | `(max-width: 767.98px) 100vw, 480px` | أول واحدة فقط |
   | Moments (TeamMomentsRing، ‏canvas) | — | canvas يرسم الصورة، فحمّل `.640.webp` (أو `.960` على DPR ≥ 2) مباشرة بدل الأصل |
   | صورة المؤلف و الـavatar | `48px` | ✗ |

4. **Preload للـLCP:** في صفحات التفاصيل والرئيسية، أضف في الـpage:
   ```tsx
   <link rel="preload" as="image" type="image/avif" imageSrcSet={...avif set} imageSizes={sizes} fetchPriority="high" />
   ```
   (React 19 يرفعه إلى `<head>`).
5. **استبدل كل `<img>` للصور المذكورة** بـ`ResponsiveImage`: ابحث بـ`grep -rn "<img" src`. **استثناء:** الشعار (SVG من R2) والـavatars الخارجية (Unsplash، وتبقى كما هي حتى يستبدلها المالك).
6. **og:image:** يبقى الملف الأصلي (JPG أو PNG)، لأن المنصات الاجتماعية لا تدعم AVIF دائماً.
   - **الاستثناء:** PNG الأكبر من 1MB (صور المقالات والمشاريع) يُولَّد لها `/_img/og/<slug>.jpg` بدقة 1200×630 وجودة JPEG 85، وتُستخدم في `openGraph.images`. عدّل `pageMetadata` في خطة الترحيل P7.
7. **حذف المكررات:**
   - `src/assets/articles/*` (نسخ من `public/articles`).
   - `src/assets/cinematic-engineering.jpg` و `hero.png` (غير مستخدمة).
   - `grep` قبل كل حذف.
   - **لا تحذف الأصول الأصلية** من `public/`، فهي مصدر الـpipeline والـog والـfallback.
8. **صورة `5g-iot.png` مطابقة لـ`internet-of-things-iot.png`:** سجّلها في `docs/owner-todo.md` ولا تغيّرها.

**Validation:**
- كل ملف في `_img` مرّ شرط SSIM (الـmanifest يحتوي القيم).
- `/` على galaxy-360: صور ≤ **1.5MB** حتى `networkidle` (من 22.5MB).
- `/projects` على laptop-1440: ≤ **2.5MB** (من 22.7MB).
- لا صورة `naturalWidth > rendered × DPR × 1.5` (إلا أصغر نسخة متاحة).
- مقارنة بصرية: الفرق ≤ 0.1% (الصور بجودة مكافئة).

---

### R4 — Navigation (Adaptive)

**Goal:** حل C1 و C4 و C5 في الـnav، مع الإبقاء على هوية GooeyNav.
**Files:** `src/components/shell/AppShell.tsx`، و `src/components/shell/MobileNav.tsx` (جديد)، و `src/components/shell/MobileNav.css` (جديد)، و `src/index.css` (قسم الـnavbar)، و `src/GooeyNav.css`.

**القرار:**

| العرض | الشكل |
|---|---|
| ≥ 1280px | كما هو اليوم: سطر واحد (brand | GooeyNav | actions) |
| 768 إلى 1279.98px | **سطران** (نفس ما يعمل اليوم على 768 و 820): السطر الأول brand + actions، والثاني GooeyNav بكل الروابط السبعة ظاهرة ومتوسطة **بدون تمرير**. يطبَّق الآن حتى 1279.98 (كان حتى 960 فقط)، **فيُحل C1** |
| < 768px | **Header مضغوط** (سطر واحد، ارتفاع 56px + safe-top): الشعار (يمين في RTL) + أزرار الأيقونات (theme، واللغة كأيقونة كرة أرضية، والحساب) + زر قائمة ☰ (44×44). الروابط السبعة في **Drawer** |

**Actions:**
1. **CSS الـnavbar** في `index.css`:
   - ما كان تحت `@media (max-width: 960px)` ينتقل إلى `@media (min-width: 768px) and (max-width: 1279.98px)`.
   - ما كان تحت `@media (max-width: 640px)` يُراجع ويُدمج في قسم `< 768` الجديد.
   - `.navbar-center-menu` في وضع السطرين: `flex-wrap: wrap; justify-content: center; overflow: visible` بدل `overflow-x: auto`.
   - إذا لم تتسع الروابط السبعة على 768 بسطر واحد داخل السطر الثاني (قِس ذلك): قلّل `padding-inline` للروابط إلى `0.75rem`، **ولا تصغّر الخط تحت 14px**.
2. **أهداف اللمس في GooeyNav:** ارتفاع الرابط `min-height: 44px` (حالياً 30px)، مع `padding-block` لتعويض الفرق. تحقق أن تأثير الـgooey (الفقاعة) يتبع الارتفاع الجديد: `GooeyNav.jsx` يقيس `getBoundingClientRect` للعنصر، فيجب أن يعمل تلقائياً. راجع اللقطة.
3. **`MobileNav.tsx`** (`'use client'`)، يظهر فقط `< 768px` عبر CSS (`display:none` على العروض الأكبر، و GooeyNav `display:none` تحت 768). **كلاهما في HTML** لأجل الـSSG والـcrawlers.
   - **زر القائمة:** ‏`<button aria-expanded aria-controls="mobile-drawer" aria-label="فتح القائمة">` بأيقونة lucide `Menu` و `X`، بحجم 44×44.
   - **Drawer:** ‏`<nav id="mobile-drawer" aria-label="القائمة الرئيسية">`، يُفتح من جهة البداية (يمين في RTL، ويسار في LTR عبر `inset-inline-start`)، بعرض `min(84vw, 360px)` وارتفاع `var(--vh-full)`، مع padding للـsafe-areas.
   - **الخلفية:** نفس ألوان الـnavbar الحالية (`var(--bg-main)` مع الـglass الموجود)، و backdrop بـ`rgba(0,0,0,.5)`.
   - **المحتوى:** الروابط السبعة كـ`<Link>` بارتفاع 52px، وخط `var(--fs-lg)`، والرابط النشط بنفس لون الـaccent الحالي (`#00d2ff` أو class active الموجود). تحتها صف: تبديل اللغة + تبديل الـtheme + زر الدخول أو الحساب بنصه الكامل.
   - **السلوك:**
     - يُغلق عند تغيّر pathname، و Escape، والنقر على الـbackdrop.
     - **Focus trap** داخل الـdrawer أثناء الفتح.
     - إعادة الـfocus لزر القائمة عند الإغلاق.
     - `body` بـ`overflow: hidden` أثناء الفتح.
     - `inert` على `#app-root` أثناء الفتح.
   - **الحركة:** ‏`transform: translateX(±100%)` إلى `0`، بمدة 280ms `cubic-bezier(.16,1,.3,1)` (نفس المنحنى المستخدم في `FaqSection.css`). ‏`prefers-reduced-motion`: بدون transition.
4. **Header < 768:**
   - زر اللغة: `LanguageDropdown` يأخذ prop `compact` (أيقونة فقط، مع `aria-label="اللغة"`) ويفتح نفس القائمة.
   - زر الحساب: أيقونة فقط (موجود فعلاً بإخفاء الـlabel).
   - نص الـbrand "تكنو إنجاز" يبقى إذا اتسع على 360px. على 320px يُخفى النص ويبقى الشعار: `@media (max-width: 379.98px)`، وهذا استثناء موثق (ليس breakpoint layout).
5. **`isPastHero` و sticky:** السلوك الحالي يبقى، مع تحديث حساب `navHeight` لأنه أصبح أقصر على الموبايل (يُقاس بـResizeObserver بدل القياس مرة واحدة).

**Validation:**
- لا overflow أفقي على أي جهاز في المصفوفة (مع تعطيل `overflow-x: clip`).
- على 360 و 390: كل الروابط السبعة قابلة للوصول (افتح الـdrawer وعدّها = 7، كلها ≥ 44px).
- على 768 و 820 و 1024 و 1180: الروابط السبعة ظاهرة بلا تمرير.
- keyboard: Tab إلى زر القائمة، ثم Enter، ثم التركيز في الـdrawer، ثم Escape يغلق ويعيد التركيز.
- axe بلا مشاكل في الـdrawer.

---

### R5 — Page-by-Page Layout Fixes

**Goal:** حل C2 و M1 و C5 في كل صفحة، مع الإبقاء على التصميم.
**قاعدة:** كل إصلاح في CSS الخاص بالمكون، بدون إعادة هيكلة JSX إلا حيث يُذكر.

**R5.1 — المقال (`ArticleDetailView.css`)، يحل C2:**
```css
.article-fullscreen-markdown-body { overflow-wrap: anywhere; word-break: normal; }
.article-fullscreen-markdown-body a { overflow-wrap: anywhere; }
.article-fullscreen-markdown-body pre { overflow-x: auto; max-width: 100%; direction: ltr; text-align: left; }
.article-fullscreen-markdown-body code { overflow-wrap: anywhere; }
.article-fullscreen-markdown-body table { display: block; max-width: 100%; overflow-x: auto; }
.article-fullscreen-layout, .article-main-container { min-width: 0; }
.article-view-top-bar { flex-wrap: wrap; min-width: 0; }   /* measured 435px on 390 viewport */
```
- `display:block` على `table` يحافظ على الـstyling ويسمح بالتمرير الأفقي داخل الجدول. **بديل أنظف:** في `renderMarkdown` (خطة الترحيل P2.5) لفّ كل `<table>` بـ`<div class="table-scroll">`، وأضف `.table-scroll{overflow-x:auto}`. **اختر البديل الأنظف** لأنه يحافظ على `display:table`.
- **Breadcrumb على الموبايل:** العنوان الأخير `text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 60vw`.
- **حجم نص المقال:** `font-size: max(1rem, 16px)` على الموبايل، و `line-height ≥ 1.8` للعربية. تحقق من القيمة الحالية، ولا تصغّرها.
- **TOC الموبايل:** الموجود (قائمة منسدلة) يبقى. تأكد أن الـtoggle ≥ 44px.
- **Sidebar:** تحت 1024 ينتقل أسفل المحتوى (تحقق أنه يحدث حالياً عند 992، وسيصبح 1024).

**R5.2 — نفس الإصلاحات لـProjectDetailView/ProjectBody:** ‏`overflow-wrap` والجداول والـpre (المشاريع فيها روابط طويلة أيضاً).

**R5.3 — النصوص تحت 12px (M1):** كل قاعدة `font-size` أقل من 12px تصبح `var(--fs-xs)` (يعادل 12px كحد أدنى). المواضع المقاسة:
- `ProjectsCatalogSection.css`: ‏`.cat-count`، و `.card-cat-badge`، و `.card-tag-item`.
- `ProjectReelsFeed.css`: ‏`.category-item-badge`، و `.engineer-pill-role`، و `.cinema-project-desc` (هذا نص وصف، فاجعله `var(--fs-sm)` أي 13px أو أكثر).
- `CinematicFooter.css`: ‏`.footer-copyright`.
- `FaqSection.css`: ‏`.faq-chip-count`.
- للبحث عن الباقي: `grep -rnE "font-size: *(9|10|11)(\.[0-9]+)?px|font-size: *0\.(5|6|7)[0-9]*rem" src`.
- الـbadges الصغيرة قد تحتاج `padding` أقل لتعويض الحجم، فلا يتغير عرضها كثيراً.

**R5.4 — أهداف اللمس (C5):**
- كل `button` و `a` تفاعلي (ليس داخل فقرة نص) يحصل على `min-height: var(--tap-min)` و `min-width: var(--tap-min)`.
- عندما يجب أن يبقى الشكل المرئي صغيراً (أيقونة 32px): وسّع منطقة اللمس بدون تغيير الشكل:
  ```css
  .icon-btn { position: relative; }
  .icon-btn::before { content: ''; position: absolute; inset: -6px; }  /* expands hit area to ≥44px */
  ```
- **القائمة الإلزامية:** أزرار الإعجاب والحفظ والمشاركة في البطاقات والـreels، والـfilter chips في المقالات والمشاريع و FAQ، و `lang-dropdown-btn` (32px)، و ThemeSwitch، وأزرار الـcarousel و CardSwap، وأزرار الـmodal، وزر إغلاق الفيديو، والـbreadcrumb links، و TOC links (ارتفاع السطر ≥ 44px عبر padding).
- **المسافة بين أهداف متجاورة ≥ 8px.**

**R5.5 — الرئيسية:**
- **ScrollExpand hero:** على `< 768` تحقق أن حركة التوسع لا تسبب قفزة مع شريط عنوان المتصفح (استخدم `var(--vh-full)` أو `dvh` من R1). على `(pointer: coarse)`، قلّل `scrollDistance` بنسبة 30% (القيم في `getResponsiveConfig`)، لأن التمرير باللمس أقصر.
- **InfiniteSpiral:** تحقق من السحب باللمس. `touch-action: pan-y` على الحاوية حتى لا تمنع تمرير الصفحة الرأسي.
- **CardSwap** (فيديوهات الرئيسية): على `< 640`، تأكد أن البطاقة لا تتجاوز العرض (`max-width: calc(100vw - 2 * var(--gutter))`).
- **MagicBento:** على `< 640`، عمود واحد (تحقق من الحالي)، وتأثير الـborder glow و spotlight يُعطَّل على `(hover: none)` (R6).
- **About:** قسما `100vh` (`team-moments-section` و `team-showcase`) يصبحان `var(--vh-full)`، مع `min-height: 560px` على الموبايل الأفقي (بدل 700 الذي يتجاوز 390px ارتفاع).

**R5.6 — `/projects` و LiveProjectsShowcase:**
- **الشريط الأفقي على الموبايل** (البطاقات مقطوعة عند الحافة كما في اللقطة): هذا carousel مقصود. أضف:
  - `scroll-snap-type: x mandatory` و `scroll-snap-align: start`.
  - `scroll-padding-inline: var(--gutter)`.
  - مؤشر نقاط أو "1/7" أسفله.
  - عرض البطاقة `85%` حتى يظهر جزء من التالية (إشارة واضحة للتمرير).
- **شبكة الـcatalog:** `grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))`، إذا كانت الحالية ثابتة الأعمدة.

**R5.7 — `/videos` (Reels):**
- ارتفاع الـreel `100dvh` مع fallback، ومنطقة الـactions الجانبية فوق `var(--safe-bottom)`.
- على التابلت العمودي والأفقي (≥ 768): الـreel بعرض أقصى 480px متوسط (موجود ‏`max-width: 480px`، تحقق)، مع الخلفية تملأ الباقي.
- **الموبايل الأفقي:** الـreel بنسبة 9:16 لا يتسع. اعرض البطاقة بارتفاع الشاشة وعرض `calc(var(--vh-full) * 9 / 16)` متوسطة.

**R5.8 — `/faq` و `/contact` و `/login` و `/account` و `/team/*`:**
- **Contact:** الخريطة `aspect-ratio: 16/10; width: 100%` على الموبايل، والبطاقات عمود واحد تحت 1024 (كان 950).
- **Auth** (`auth-switch`): الـsliding panel على `< 768` يتحول إلى تبويبين (دخول و تسجيل) بدل اللوحة المنزلقة **إذا** كانت اللوحة تتجاوز العرض (قِس على 320 و 360). إذا لم تتجاوز، اتركها.
- **ProfilePage و UserProfilePage:** راجع الـbreakpoint الموحّد فقط.

**R5.9 — Modal الفيديو:** على `< 768`، ملء الشاشة (`inset: 0`)، و iframe بنسبة 16:9 بعرض 100%، وزر الإغلاق 44px مع safe-top.

**R5.10 — Footer:** الـMagneticButtons تُعرض كشبكة عمودين على `< 480`، والنصوص ≥ 12px.

**Validation (لكل صفحة):**
- لا overflow.
- 0 نصوص تحت 12px.
- أهداف اللمس ≥ 44 (عدا الروابط داخل النص).
- لقطات موثقة في `docs/responsive-changes.md`.

---

### R6 — Adaptive Effects (Hover، WebGL، Canvas، GSAP)

**Goal:** تجربة سلسة على الأجهزة الضعيفة واللمس، مع الإبقاء على المؤثرات على الأجهزة القادرة.

**Actions:**
1. **Hover (M2):** كل قاعدة `:hover` تُلف بـ:
   ```css
   @media (hover: hover) and (pointer: fine) { .x:hover { ... } }
   ```
   - وأضف حالة `:active` بنفس تأثير الـhover **مختصراً** (مثل `transform: scale(.98)` أو تغيير اللون) للمس.
   - **آلية التنفيذ:** سكربت codemod (`scripts/wrap-hover.mjs` بـpostcss) يلف كل rule فيها `:hover` تلقائياً، ثم مراجعة يدوية للّقطات على laptop (يجب ألا يتغير شيء على الماوس).
   - ممنوع لف `:focus-visible` (يبقى للجميع).
2. **فئات الجهاز** (`src/lib/deviceTier.ts`، client-only، يُحسب مرة واحدة بعد mount):
   ```ts
   export type Tier = 'full' | 'lite' | 'minimal';
   export function getTier(): Tier {
     const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
     const saveData = (navigator as any).connection?.saveData === true;
     const mem = (navigator as any).deviceMemory ?? 8;       // Chrome/Android only; default optimistic
     const cores = navigator.hardwareConcurrency ?? 8;
     const coarse = matchMedia('(pointer: coarse)').matches;
     if (reduce || saveData) return 'minimal';
     if (mem <= 4 || cores <= 4 || (coarse && innerWidth < 768)) return 'lite';
     return 'full';
   }
   ```
   - يُضاف كـattribute على `<html data-tier="...">` لاستخدامه في CSS.
   - يُتاح عبر `useDeviceTier()`.
3. **الجدول الإلزامي:**

   | المؤثر | full | lite | minimal |
   |---|---|---|---|
   | InfiniteMenu (WebGL2) | كما هو، DPR ≤ 2 | DPR ≤ 1.5، ويبدأ عند الاقتراب (موجود من خطة الترحيل P8) | **لا WebGL**: شبكة بطاقات فريق ثابتة (نفس البيانات، ونفس ألوان البطاقة، و `<Link>` لكل عضو) |
   | Orb (OGL) | كما هو، DPR ≤ 2 | DPR ≤ 1، ونصف الدقة | **لا**: خلفية `radial-gradient` بنفس اللون (hue 360 = أحمر بنفسجي، فاستخرج اللون من الـshader الافتراضي) |
   | TeamMomentsRing (Canvas) | كما هو، DPR ≤ 2 | DPR ≤ 1.5، وصور `.640.webp` | صور ثابتة في شبكة 2×2 |
   | GSAP magnetic buttons (footer) | ✓ | ✗ (`pointer: coarse` لا يملك mousemove) | ✗ |
   | MagicBento spotlight و particles | ✓ | glow فقط، بدون particles | ✗ |
   | CardSwap auto-swap | ✓ | ✓ بفاصل أطول ×1.5 | ✗ (يدوي فقط) |
   | ScrollExpand | ✓ | ✓ | الحالة المتوسعة مباشرة |
   | Loader | ✓ | ✓ | يُتخطى (موجود: `reducedQuery`) |
   | GooeyNav particles | ✓ | ✓ بعدد جسيمات 8 بدل 15 | بدون جسيمات |

   - **تطبيق DPR:** في كل مكون WebGL و Canvas، ابحث عن `devicePixelRatio`. ‏`TeamMomentsRing.jsx:308` يستخدم `window.innerWidth * dpr`. استبدل بـ`Math.min(window.devicePixelRatio, DPR_CAP[tier])`.
   - **الإيقاف عند الخروج من الشاشة:** كل حلقة `requestAnimationFrame` في Orb و InfiniteMenu و TeamMomentsRing تتوقف عندما يكون المكون خارج الشاشة (IntersectionObserver) أو عندما `document.hidden`. وفّر البطارية.
4. **اللمس في WebGL:**
   - InfiniteMenu يستخدم pointer events (مؤكد). أضف `touch-action: none` **على الـcanvas فقط** (وليس الحاوية)، حتى لا يسرق تمرير الصفحة خارج الـcanvas.
   - على `(pointer: coarse)`: أضف زرين "السابق" و"التالي" (44px) أسفل الكرة لمن لا يريد السحب.
5. **`prefers-reduced-motion`** في كل مكتبة (مكمّل لـخطة الترحيل P9.3): ‏tier `minimal` يغطيها.

**Validation:**
- على galaxy-360 مع CPU throttling ×4 (Playwright CDP `Emulation.setCPUThrottlingRate`): ‏INP ≤ 200ms في التفاعلات (فتح الـdrawer، والإعجاب، والفلاتر)، ولا long tasks > 200ms بعد التحميل.
- على laptop: لا تغيّر بصري في المؤثرات.
- `data-tier` يظهر صحيحاً (لقطة لكل tier عبر emulation: ‏`reducedMotion: 'reduce'` = minimal).

---

### R7 — Forms & Inputs on Mobile

**Actions:**
1. كل `input` و `textarea` و `select`: ‏`font-size: max(16px, 1rem)` على `(pointer: coarse)`. **يمنع iOS Safari من التكبير التلقائي عند التركيز.**
2. **الأنواع والسمات:**
   - Contact: ‏`type="email" autocomplete="email" inputmode="email"`، و `type="tel" autocomplete="tel" inputmode="tel"` (إن وُجد حقل هاتف)، والاسم `autocomplete="name"`.
   - Auth: ‏`autocomplete="email"` و `autocomplete="current-password"` (للدخول) و `"new-password"` (للتسجيل).
   - البحث: ‏`type="search" enterkeyhint="search"`.
   - التعليقات: ‏`enterkeyhint="send"`.
3. **`CurvedInput`** (الـfooter): تحقق أنه قابل للاستخدام باللمس، وأن حقل الإدخال الحقيقي ≥ 44px ارتفاعاً.
4. **لوحة المفاتيح الافتراضية:** الحقول في أسفل الشاشة (التعليقات) تستخدم `scrollIntoView({block:'center'})` عند التركيز على `(pointer: coarse)`.

**Validation:** على iphone-15 (WebKit في Playwright): التركيز في كل حقل لا يغير `visualViewport.scale`.

---

### R8 — Performance Budgets per Device

**الميزانيات (تُفرض في CI):**

| المقياس | موبايل (galaxy-360، 4G محاكاة، CPU ×4) | تابلت (ipad-air) | لابتوب (1440) |
|---|---|---|---|
| LCP | ≤ 2.5s | ≤ 2.0s | ≤ 1.8s |
| CLS | ≤ 0.05 | ≤ 0.05 | ≤ 0.05 |
| INP (محاكاة التفاعلات في R6) | ≤ 200ms | ≤ 150ms | ≤ 100ms |
| وزن الصور حتى networkidle: `/` | ≤ 1.5MB | ≤ 2.5MB | ≤ 3.5MB |
| وزن الصور: `/projects` | ≤ 1.2MB | ≤ 2MB | ≤ 2.5MB |
| وزن الصور: `/articles/[slug]` | ≤ 400KB | ≤ 600KB | ≤ 800KB |
| JS (gzip) للصفحة الأولى | ≤ 250KB | نفسه | نفسه |

**Actions:**
1. ‏Lighthouse CI (`@lhci/cli`) بـ`lighthouserc.json`: ‏`emulatedFormFactor` mobile و desktop على `/` و `/articles/digital-twin` و `/projects/virtual-board-hand-tracking` و `/projects` و `/videos`. ‏`assertions` حسب الجدول.
2. سكربت `tests/responsive/budgets.spec.ts` يقيس bytes الصور لكل جهاز (نفس آلية R0) ويفشل عند تجاوز الميزانية.
3. **إذا تجاوزت `/` ميزانية الموبايل:** قلّل الصور eager في InfiniteSpiral إلى 2، وتأكد أن `im1` و `hero-bg-distortion` (خلفيات) `loading="lazy"` لأنهما تحت الـfold.

---

### R9 — Validation Matrix

**آلي (Playwright، على `npm run preview`):**
1. `tests/responsive/audit.spec.ts` (من R0) على **كل** أجهزة المصفوفة × كل URL. **شروط النجاح:**
   - `scrollWidth ≤ clientWidth` **مع تعطيل** `overflow-x: clip`.
   - 0 نصوص < 12px.
   - 0 أهداف لمس < 44×44 (عدا الروابط داخل النص).
   - 0 صور أكبر من `rendered × DPR × 1.5` (عدا أصغر نسخة متاحة).
   - الميزانيات (R8).
2. `tests/responsive/visual.spec.ts`: لقطات لكل جهاز × الصفحات الأساسية.
   - **على laptop-1440:** مطابقة لـbaseline خطة الترحيل (فرق ≤ 0.1%). الـdesktop لا يتغير.
   - **على الموبايل والتابلت:** تُراجع يدوياً مرة واحدة وتُعتمد كـbaseline جديد (`--update-snapshots`) بعد موافقة المالك على `docs/responsive-changes.md`.
3. `tests/responsive/nav.spec.ts`: سيناريوهات R4.
4. `tests/responsive/tiers.spec.ts`: ثلاث فئات.
5. `tests/responsive/webkit.spec.ts`: نفس audit على WebKit (iPhone و iPad) لأن Safari يختلف في `dvh` و `safe-area` والتكبير عند التركيز.
6. **فحص الـbreakpoints:** `scripts/check-breakpoints.mjs`: أي قيمة في `@media` خارج `{479.98, 480, 639.98, 640, 767.98, 768, 1023.98, 1024, 1279.98, 1280, 1535.98, 1536, 379.98}` + ملف الـloader = فشل.

**يدوي على أجهزة حقيقية (قبل الإطلاق، يوثَّق في `docs/device-qa.md` بلقطات):**

| الجهاز | المتصفح | ما يُفحص |
|---|---|---|
| iPhone (أي طراز بنوتش أو Dynamic Island) | Safari | الـnavbar والـdrawer والـsafe areas و Reels و ScrollExpand والتكبير عند التركيز والـloader والوضع الأفقي |
| Android متوسط (4GB RAM أو أقل) | Chrome | tier = lite، وسلاسة About (WebGL)، و INP، والأزرار |
| iPad (عمودي وأفقي) | Safari | سطرا الـnav، ولا overflow على 1180، والـsidebar في المقال |
| لابتوب 1280 و 1440 | Chrome و Firefox و Safari | لا تغيير عن الحالي |

**Definition of Done:**
1. كل فحوص R9 الآلية خضراء على Chromium و WebKit.
2. ‏C1 إلى C5 و M1 إلى M7 محلولة (كل واحدة مرتبطة بفحص).
   وبنود R10 كلها منفذة. الفحوص الإضافية: letter-spacing = 0 على العربية، و TOC غير مغطى تحت الـheader، ونص 200% بلا قص، و Stylelint و `check-assets` خضراء، و fold-280 بلا overflow.
3. الـdesktop مطابق بصرياً لما قبل الخطة.
4. قائمة الأجهزة الحقيقية موثقة بلا مشاكل مفتوحة.
5. `docs/responsive-changes.md` معتمد من المالك.

---

### R10 — إضافات Senior (أشياء تكسر التجربة على الأجهزة الحقيقية ولا يلتقطها فحص العرض وحده)

> كل بند هنا مبني على دليل من الكود. **الترتيب:** بعد R6 وقبل R7، و R9 يتحقق منها أيضاً.

#### R10.1 — الخط العربي و letter-spacing (خلل مرئي حقيقي)

**الدليل:** 30 موضعاً بـ`letter-spacing` سالب و 18 موجباً في `src`. من بينها عناوين عربية، مثل `letterSpacing: '-0.02em'` على `t.about.heading` في `App.tsx`.

**المشكلة:** الحروف العربية متصلة. أي `letter-spacing` غير صفري:
- يفصل الحروف أو يشوّه الاتصال في بعض المتصفحات (Safari و Firefox أوضح من Chrome).
- يظهر أكثر على الشاشات الصغيرة عالية الكثافة.

**Actions:**
```css
:lang(ar), [dir="rtl"] { letter-spacing: 0 !important; }
[dir="rtl"] :lang(en), [dir="rtl"] [lang="en"] { letter-spacing: revert; }
```
- الأنظف: في كل قاعدة فيها `letter-spacing`، أضف `:where([dir="ltr"])` كشرط، أو انقل القيمة إلى `[dir="ltr"] .selector`. **القاعدة العامة أعلاه شبكة أمان.**
- **line-height:** العربية تحتاج ≥ 1.6 للنص و ≥ 1.25 للعناوين (التشكيل والنقاط). ابحث عن `line-height` < 1.2 على عناصر عربية وارفعه إلى 1.25.
- **لا `text-transform: uppercase`** على نص عربي (لا أثر له، لكنه يسبب مشاكل في المختلط). اجعله `[dir="ltr"]` فقط.

**Validation:** لقطات مكبّرة ×3 لعناوين About والـhero والبطاقات على WebKit قبل وبعد. الحروف متصلة.

#### R10.2 — Logical CSS Properties (RTL/LTR على كل المقاسات)

**الدليل:** 103 خاصية فيزيائية (`left` و `right` و `margin-left` و `padding-right`...) مقابل 17 منطقية فقط. الموقع ثنائي الاتجاه، فكل قاعدة فيزيائية إما مكررة بـ`[dir=rtl]` أو خاطئة في إحدى اللغتين، وتظهر المشكلة أكثر على الموبايل (هوامش غير متناظرة، وأيقونات في الجهة الخطأ).

**Actions:**
1. Codemod (`scripts/logical-props.mjs` بـpostcss): ‏`margin-left` إلى `margin-inline-start` و `margin-right` إلى `margin-inline-end`، وكذلك padding و border-left و right.
   - `left` و `right` في positioning **فقط** عندما لا يكون العنصر متناظراً عمداً: `left: 0; right: 0` تبقى كما هي (أو `inset-inline: 0`).
   - `text-align: left` و `right` تصبح `start` و `end`.
   - **لا تحوّل:** قواعد داخل `[dir="rtl"]` أو `[dir="ltr"]` صريحة (هي مقصودة)، ولا ملف الـloader، ولا transforms (`translateX`).
2. **الأيقونات الاتجاهية** (أسهم Back و Next و Chevron): الكود يختار `ArrowLeft` أو `ArrowRight` حسب `isEn` في أماكن. وحّدها بـclass `.icon-directional { transform: scaleX(var(--dir-flip)); }` مع `[dir="rtl"]{--dir-flip:-1}`، **أو** اترك المنطق الحالي إذا كان صحيحاً في اللغتين (تحقق بلقطات ar و en).
3. **النص المختلط:** العناوين تحتوي مصطلحات إنجليزية ("5G NR" و "MCP" و "CNN"). على الشاشات الضيقة يلتف السطر بترتيب خاطئ أحياناً.
   - في `renderMarkdown`: لفّ كل `code` و `kbd` بـ`<bdi>` أو `unicode-bidi: isolate`.
   - في البطاقات: `unicode-bidi: plaintext` على العناوين المقصوصة بـellipsis، حتى تظهر النقاط الثلاث في الجهة الصحيحة.

**Validation:** لقطات ar و en على 360 و 768 و 1440 لكل الصفحات. `grep -cE "(margin|padding)-(left|right)" src/**/*.css` ينخفض إلى القواعد المقصودة فقط (توثَّق).

#### R10.3 — Header ديناميكي و scroll offsets (يكسر فهرس المقال على الموبايل)

**الدليل:** قيم ثابتة لا تتوافق مع header الموبايل الجديد (56px) ولا مع ارتفاعه الحالي (105px):
- `ArticleDetailView.tsx:239` (`scrollY + 130`) و `:259` (`topOffset = 95`).
- `ProjectDetailView.tsx:217` (`navbarOffset = 90`).
- `ArticleDetailView.css:554` (`scroll-margin-top: 110px`).

**Actions:**
1. في AppShell: ‏`ResizeObserver` على `#navbar` يكتب `document.documentElement.style.setProperty('--header-h', h + 'px')`، مع قيمة افتراضية في CSS: `--header-h: 78px` (desktop) و `56px` (< 768).
2. `.scroll-mt-offset { scroll-margin-top: calc(var(--header-h) + 16px); }` و `html { scroll-padding-top: calc(var(--header-h) + 16px); }`.
3. في JS: احذف الأرقام الثابتة، واقرأ `parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'))`. الأفضل: استبدل `window.scrollTo(... - offset)` بـ`el.scrollIntoView({ behavior, block: 'start' })`، فيحترم `scroll-margin-top` تلقائياً.
4. الـscrollspy: `IntersectionObserver` بـ`rootMargin: -(header+16)px 0px -65% 0px` بدل حلقة `scroll` (المقال يستخدم scroll listener، والمشروع يستخدم IO. وحّدهما على IO).

**Validation:** على iphone-15 و ipad-air و laptop: النقر على كل عنصر TOC يضع العنوان تحت الـheader مباشرة، **غير مغطّى**.

#### R10.4 — أداء الـglassmorphism على الموبايل

**الدليل:** 102 استخدام لـ`backdrop-filter` أو `backdropFilter`. ‏`backdrop-filter: blur()` من أثقل عمليات الرسم على GPU الهواتف المتوسطة، خاصة داخل عناصر sticky أو متحركة. هو سبب شائع لتقطّع التمرير (jank) على Android.

**Actions:**
1. ‏tier `lite`: `html[data-tier="lite"] * { backdrop-filter: none !important; }` مع خلفية بديلة أكثر عتامة لكل عنصر زجاجي. أضف متغير `--glass-fallback-bg` في tokens (مثلاً لون الخلفية بشفافية 0.92). **الشكل قريب جداً والأداء أفضل بكثير.**
2. ‏tier `full`: اترك blur، لكن **حدّه بـ≤ 12px** على العناصر الـsticky (الـnavbar)، إذا كانت أكبر.
3. **ممنوع** `backdrop-filter` على عنصر يتحرك باستمرار (animation). راجع CardSwap و MagicBento.

**Validation:** ‏Chrome Performance (CPU ×4، GPU throttling غير متاح، فاستخدم جهاز Android حقيقي في R9): التمرير في `/` و `/articles` بمعدل ≥ 55fps على lite.

#### R10.5 — Container Queries للبطاقات (بدل تكرار breakpoints)

**الدليل:** نفس بطاقة المقال أو المشروع تظهر في 3 سياقات بعروض مختلفة: الـlisting، و related في الـsidebar (≈ 280px)، والرئيسية. حالياً كل سياق يعيد تعريف أحجامه بـ`@media` حسب عرض **الشاشة** وليس عرض **الحاوية**. على iPad يظهر sidebar ضيق ببطاقة مصممة للعرض الكامل. لا يوجد أي `@container` في المشروع.

**Actions:**
1. حاويات البطاقات: `.cards-grid, .related-sidebar-list, .bottom-related-grid { container-type: inline-size; }` (أسماء الحاويات الفعلية حسب الـCSS).
2. داخل CSS البطاقة: استبدل الـ`@media` التي تغيّر تخطيط **البطاقة نفسها** (صورة فوق أو بجانب، وحجم العنوان) بـ`@container (max-width: 360px) {...}`.
3. **لا تستبدل** الـ`@media` التي تغيّر **عدد الأعمدة** للشبكة (هذه مسؤولية الصفحة).
4. الدعم: Safari 16+ و Chrome 105+، والـfallback (بدون container queries) هو شكل البطاقة الافتراضي. مقبول.

**Validation:** لقطات related sidebar على 1024 و 1440 والبطاقة نفسها في الـlisting. كل منها متناسق مع مساحته.

#### R10.6 — الارتفاعات القصيرة (الموبايل الأفقي و Split View على iPad)

**الدليل:** لا يوجد أي `@media (max-height: ...)`. الأقسام بـ`min-height: 700px` (فريق About) و `100vh` (hero و Reels) تنكسر عندما يكون الارتفاع 390px (موبايل أفقي) أو ≈ 500px (iPad Split View أو لوحة مفاتيح ظاهرة).

**Actions:**
```css
@media (max-height: 540px) and (orientation: landscape) {
  /* About sections */ #team-moments-section, #team-showcase { min-height: 0; height: auto; aspect-ratio: 16/9; }
  /* Hero */ .initial-title { font-size: var(--fs-2xl); }
  /* Drawer */ .mobile-drawer a { min-height: 44px; }   /* instead of 52 */
}
```
- ‏Reels في الوضع الأفقي: حسب R5.7.
- أضف إلى مصفوفة الأجهزة: `phone-landscape-short` (740×360)، و `ipad-split` (507×1024، أي نصف شاشة iPad Pro).

#### R10.7 — التكبير النصي والـReflow (WCAG 1.4.4 و 1.4.10)

**المشكلة:** مستخدمون كثيرون (خصوصاً فوق 40 سنة) يرفعون حجم الخط في إعدادات الهاتف أو يكبّرون المتصفح. الأحجام بـpx (139 موضعاً للخط) لا تتبع إعداد المستخدم في بعض المتصفحات، و Reflow عند 400% تكبير يعادل عرض 320 CSS px.

**Actions:**
1. `-webkit-text-size-adjust: 100%; text-size-adjust: 100%;` على `html`. **يمنع** iOS من تضخيم الخط عشوائياً في الوضع الأفقي، **ولا يمنع** تكبير المستخدم.
2. **أحجام الخط الأساسية** (body والفقرات وعناوين الأقسام) بـ`rem` أو tokens R1. أحجام الـbadges والزخارف بـpx مقبولة.
3. **الحاويات:** `height` ثابت بالـpx على عناصر فيها نص يصبح `min-height`، حتى لا يُقص النص عند التكبير. ابحث: `grep -nE "^\s*height: *[0-9]+px" src/**/*.css` وراجع ما يحتوي نصاً.

**Validation:**
- Playwright: `page.emulateMedia` + ضبط `document.documentElement.style.fontSize='200%'` على 390، ثم لا نص مقصوص (`scrollHeight > clientHeight` على عناصر `overflow:hidden` النصية = 0)، ولا overflow أفقي.
- وعرض 320 مع zoom 100% (يعادل 1280 عند 400%): لا overflow (مغطى في R9).

#### R10.8 — Overscroll و Scroll chaining و Pull-to-refresh

**الدليل:** استخدام واحد فقط لـ`overscroll-behavior`. الـdrawer والـmodal والـReels و TOC الموبايل عناصر قابلة للتمرير داخل الصفحة. بدون `overscroll-behavior`:
- الوصول لنهاية الـdrawer يمرّر الصفحة خلفه.
- التمرير للأعلى في أول Reel يفعّل pull-to-refresh في Chrome Android، فيعيد تحميل الصفحة وسط المشاهدة.

**Actions:**
```css
.mobile-drawer, .video-modal, .mobile-toc-dropdown, .article-toc-card-scroll { overscroll-behavior: contain; }
.reels-feed-container /* actual scroller class */ { overscroll-behavior-y: contain; }
body:has(.mobile-drawer[data-open="true"]), body:has(.video-modal) { overflow: hidden; }
```
و `-webkit-tap-highlight-color: transparent` على العناصر التفاعلية المخصصة، **مع** وجود حالة `:active` واضحة (R6) لتعويض الـfeedback.

#### R10.9 — الحركة التلقائية (WCAG 2.2.2) والتحكم فيها

**الدليل:**
- `CardSwap` (`setInterval(swap, delay)`) بـ`pauseOnHover = false` افتراضياً، ولا يوجد hover على اللمس أصلاً.
- `ProjectReelsFeed.tsx:147` فيه `setInterval`.
- الشرائط المتحركة (LiveProjectsShowcase marquee).

أي حركة تلقائية تستمر أكثر من 5 ثوانٍ تحتاج وسيلة إيقاف. على الموبايل تسرق الانتباه وتستهلك البطارية.

**Actions:**
1. زر إيقاف وتشغيل (44px، ‏`aria-label` و `aria-pressed`) لكل: CardSwap في الرئيسية، و marquee المشاريع، وأي carousel تلقائي. يُحفظ الاختيار في `sessionStorage`.
2. الإيقاف التلقائي عندما يكون المكون خارج الشاشة (IO)، أو `document.hidden`، أو التركيز داخله (`focusin`).
3. ‏tier `minimal` بلا حركة تلقائية (من R6).

#### R10.10 — Art Direction لصور الـhero و focal points

**المشكلة:** صورة الـhero (`im2` و `im3` بنسبة 16:9) تُعرض في بطاقة شبه مربعة على الموبايل (اللقطة: الشخص في المنتصف، والشاشة مقصوصة). على الموبايل العمودي يضيع موضوع الصورة. نفس الأمر في بطاقات المشاريع بـ`object-fit: cover`.

**Actions:**
1. **Focal point** لكل صورة في الـmanifest (R3): حقل اختياري `focal: "50% 30%"`، يُطبّق كـ`object-position` في `ResponsiveImage`. القيمة الافتراضية `50% 50%` (الحالي).
   - للـhero وصور المشاريع الـ14: الـagent يحدد النقطة بفحص بصري (أين الموضوع الرئيسي)، ويوثقها في `docs/focal-points.md` بلقطة.
2. **Hero على الموبايل:** `<picture>` بـ`<source media="(max-width: 767.98px) and (orientation: portrait)">` يشير إلى قصّة 4:5 مولَّدة من الأصل حول الـfocal point (sharp `extract` + resize). السكربت يولدها تلقائياً للصور الموسومة `artDirection: true` في config (الـhero فقط مبدئياً).
3. **لا تعدّل الصور الأصلية.**

#### R10.11 — تحسين تحميل الخط العربي

**الدليل:** ‏Readex Pro بـ6 أوزان (300 إلى 800). على شبكات الموبايل كل وزن ملف منفصل (arabic + latin).

**Actions:**
1. **قِس الأوزان المستخدمة فعلاً:** `grep -rhoE "font-weight: *[0-9]+" src | sort | uniq -c`. احذف من `next/font` الأوزان غير المستخدمة، **أو** استخدم النسخة variable (`Readex_Pro` في next/font تدعم `weight: 'variable'` إن توفرت، فملف واحد لكل subset).
2. **`adjustFontFallback`** (افتراضي في next/font) يولّد fallback بمقاييس مطابقة (`size-adjust`)، فيقل CLS عند تبديل الخط. تأكد أنه غير معطّل.
3. **الأولوية:** `preload: true` للـsubset `arabic` فقط، لأن الموقع عربي أولاً. الـlatin بدون preload.

#### R10.12 — `content-visibility` للصفحات الطويلة

**الدليل:** المقالات 15 إلى 22 دقيقة قراءة (آلاف العناصر)، و FAQ و Projects طويلة. الموبايل يرسم الصفحة كلها عند التحميل.

**Actions:**
```css
.article-fullscreen-markdown-body > h2 ~ * { content-visibility: auto; contain-intrinsic-size: auto 400px; }
.article-comments-section, .bottom-related-section, footer { content-visibility: auto; contain-intrinsic-size: auto 600px; }
```
- ⚠️ ‏`content-visibility` قد يؤثر على `Ctrl+F` في متصفحات قديمة (الحديثة تدعم البحث فيه)، وعلى حساب `offsetTop` للـscrollspy. لذلك الـscrollspy يعتمد IO (R10.3) وليس offsetTop.

**Validation:** INP و "Rendering" time في Lighthouse mobile لـ`/articles/smart-ai-ride-pooling` (الأطول، 22 دقيقة) ينخفض. لا قفزات في شريط التمرير (`contain-intrinsic-size: auto` يتذكر الحجم الحقيقي).

#### R10.13 — وضع التباين العالي و forced-colors

**الدليل:** صفر قواعد لـ`forced-colors` أو `prefers-contrast`. الموقع يعتمد على glassmorphism وتدرجات و `color: #c4b5fd` على خلفيات شفافة. في Windows High Contrast أو Android "High contrast text" قد تختفي الحدود والأزرار.

**Actions:**
```css
@media (forced-colors: active) {
  .navbar-auth-btn, .cta-button, [class*="card"], .mobile-drawer, button { border: 1px solid CanvasText; }
  .themed, .gradient-text, [class*="gradient"] { forced-color-adjust: auto; }
}
@media (prefers-contrast: more) {
  :root { --text-muted: var(--text-main); }   /* use the existing token names */
  * { backdrop-filter: none !important; }
}
```

#### R10.14 — Print stylesheet للمقالات والمشاريع

**لماذا:** مقالات هندسية طويلة (مراجع وجداول ومقارنات)، والطلاب والمهندسون يطبعونها أو يحفظونها PDF.

**Actions** (`src/styles/print.css`، يُستورد في layout):
```css
@media print {
  #navbar, .mobile-drawer, footer, .article-engagement-bar, .article-comments-section, .article-related-sidebar,
  .bottom-related-section, #te-loader, .skip-link, canvas, [data-print="hide"] { display: none !important; }
  body { background: #fff !important; color: #000 !important; }
  * { backdrop-filter: none !important; box-shadow: none !important; }
  .article-fullscreen-markdown-body a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; overflow-wrap: anywhere; }
  h2, h3 { break-after: avoid; } pre, table, figure, img { break-inside: avoid; }
  img { max-width: 100% !important; }
}
```

#### R10.15 — Foldables و الشاشات الكبيرة جداً

- **Galaxy Z Fold (مغلق):** العرض **280px**، وهو أضيق من 320. أضف `fold-280` (280×653) إلى المصفوفة. الهدف: لا overflow ولا قص نصوص (قد يحتاج الـheader إخفاء نص الـbrand، وهو موجود من R4 تحت 379.98px).
- **Fold مفتوح:** (≈ 673×841) يقع في تخطيط التابلت. غطِّه بلقطة.
- **الشاشات ≥ 1920 و ultra-wide:** تأكد أن كل حاوية نصية لها `max-width` (قراءة المقال ≤ 75ch)، وأن الخلفيات تمتد بينما المحتوى متوسط. أضف `desktop-2560` (2560×1440) للمصفوفة.

#### R10.16 — منع التراجع مستقبلاً (الأهم على المدى الطويل)

**لماذا:** كل ما سبق يُصلح مرة واحدة. بدون قواعد آلية، أول مكون جديد يعيد المشاكل (breakpoint عشوائي، أو صورة 2MB، أو خط 10px).

**Actions:**
1. **Stylelint** (`stylelint` + `stylelint-config-standard` + `stylelint-use-logical`) بـ`.stylelintrc.json`:
   - `media-feature-range-notation` و قاعدة مخصصة (plugin بسيط في `scripts/stylelint-breakpoints.js`) ترفض أي قيمة `@media` خارج القائمة المعتمدة.
   - `declaration-property-value-disallowed-list`: ‏`{"font-size": ["/^([0-9]|1[01])(\\.\\d+)?px$/"], "letter-spacing": ["/^-/"]}` (الأخيرة مع استثناء `[dir=ltr]` عبر تعليق disable موثق).
   - `csstools/use-logical` بمستوى warning (ترتفع إلى error بعد اكتمال R10.2).
   - أضف `"lint:css": "stylelint \"src/**/*.css\""` إلى scripts.
2. **حارس الصور** (`scripts/check-assets.mjs`، يعمل في CI و pre-commit):
   - يفشل إذا أُضيفت صورة raster في `public/` أو `src/` أكبر من **600KB**، أو أبعادها > 2400px، دون أن تكون ضمن مصادر الـpipeline.
   - ويفشل إذا استُخدم `<img` مباشرة لصورة في مسارات الـpipeline بدل `ResponsiveImage` (فحص نصي بسيط).
3. **GitHub Actions** (`.github/workflows/quality.yml`): عند كل PR: `lint` و `lint:css` و `typecheck` و `build` و `check-assets` و `test:e2e --project=responsive-smoke` (مجموعة مصغّرة: 3 أجهزة × 5 صفحات، ≈ 3 دقائق).
4. **`docs/assets-guide.md` للمالك** (بالعربية، صفحة واحدة): المقاس الموصى به لصورة مقال جديد (1600×900، JPG أو PNG بأي حجم لأن الـpipeline يضغط)، ومكان وضعها، وكيف تُحدد نقطة التركيز، ولماذا لا تُرفع صور > 2400px.

#### R10.17 — القياس الحقيقي بعد الإطلاق (Field data، وليس مختبر فقط)

**لماذا:** Lighthouse يقيس جهازاً محاكى. الزوار الفعليون في سوريا والمنطقة قد يستخدمون أجهزة أضعف وشبكات أبطأ من المحاكاة. القرارات اللاحقة (مثل تفعيل tier `lite` لفئات أوسع) تحتاج بيانات حقيقية.

**Actions:**
1. تفعيل **Cloudflare Web Analytics** (مجاني، بدون cookies، والموقع على Cloudflare أصلاً). يعطي Core Web Vitals (LCP و INP و CLS) من الزوار الحقيقيين مقسّمة حسب الجهاز والدولة والصفحة. التفعيل من Dashboard (Web Analytics ثم Automatic setup للدومين)، بدون كود.
2. **بعد أسبوعين من الإطلاق:** راجع الـp75 لكل من mobile و tablet و desktop. إذا كان LCP mobile p75 > 2.5s أو INP > 200ms: وثّق أسوأ 3 صفحات في `docs/field-vitals.md` كمدخل لتحسين لاحق.
3. **الخصوصية:** لا يُضاف أي analytics آخر بـcookies دون قرار المالك.

---

## 4. Risks & Mitigations

| الخطر | التخفيف | التحقق |
|---|---|---|
| توحيد الـbreakpoints يغيّر شكل عروض حدّية | ملف واحد لكل commit + لقطات 600 و 640 و 800 و 1000 و 1100 و 1200 و 1280 | visual |
| `<picture>` يكسر selectors | `picture{display:contents}` | visual |
| AVIF بطيء في البناء | incremental + التوازي، والخيار commit لـ`_img` | زمن البناء |
| SVG الشعار يختلف عن الأصل | SSIM ≥ 0.97 | compare-vector |
| الـdrawer يتعارض مع GooeyNav | GooeyNav مخفي بـCSS تحت 768، وكلاهما في HTML | nav.spec |
| codemod الـhover يكسر قواعد مركّبة | مراجعة لقطات laptop، و postcss يحافظ على البنية | visual laptop |
| DPR cap يجعل WebGL ضبابياً على iPad قوي | tier `full` حتى DPR 2 | يدوي iPad |
| `overflow-x: clip` يخفي مشاكل | الفحص يعطّله | audit |
| إخفاء محتوى على الموبايل يضر SEO | ممنوع `display:none` لمحتوى أساسي. البديل (شبكة الفريق مثلاً) يعرض نفس البيانات | verify-site من خطة الترحيل |

## 5. Rollback

- كل مرحلة R مستقلة بـcommit، والتراجع بـ`git revert`.
- R3: إذا فشل الـpipeline في بيئة البناء، `ResponsiveImage` يعود تلقائياً للأصل عند غياب الـmanifest (الـfallback مبني في المكون). الموقع يعمل بصور أثقل لكن سليمة.
- R6: متغير `FORCE_TIER` في `site.ts` (`null` افتراضياً) يسمح بفرض `full` مؤقتاً لكل الأجهزة.

## 6. قرارات تحتاج المالك

1. اعتماد شكل الـdrawer على الموبايل (لقطة قبل وبعد في `docs/responsive-changes.md`).
2. اعتماد شبكة الفريق الثابتة كبديل WebGL على الأجهزة الضعيفة و reduced-motion.
3. `public/_img`: مولَّد في البناء (افتراضي) أم commit في الـrepo؟ (حسب زمن البناء على Cloudflare.)
4. صور placeholder الفريق (Unsplash) تبقى خارج الـpipeline حتى تُستبدل بصور حقيقية.
