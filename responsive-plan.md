# خطة Responsive/Adaptive + Assets لموقع Techno Enjaz

> **لمن هذه الوثيقة:** نفس الـCoding Agent الذي ينفّذ `plan.md` (ترحيل Next.js).
> **علاقتها بـ`plan.md`:**
> - هذه الخطة **تكمّلها ولا تستبدلها**.
> - قسم الصور هنا (R3) **يحل محل** الخطوات P8.2 و P8.3 و P8.4 في `plan.md`.
> - باقي مراحل الـResponsive (R4 إلى R9) تُنفَّذ **بعد نجاح P11 في `plan.md`**.
> - السبب: P11 يثبت أن الترحيل لم يغيّر الشكل، وهذه الخطة تغيّر الشكل **عمداً** على الموبايل والتابلت. خلط الاثنين يجعل اكتشاف التراجعات مستحيلاً.
>
> **القاعدة الذهبية:** القرارات هنا محسومة. أي حالة غير مغطاة: توقف واسأل المالك.

---

## 0. تصحيحات على `plan.md` (الـrepo تغيّر بعد كتابتها)

تحقّقت من آخر commits (`3c92b59` و `68db100`):

1. **`src/assets/projects/techno-projects/*` أصبحت مستخدمة** في الرئيسية (InfiniteSpiral: ‏`project-01` إلى `project-14`). **لا تحذفها** رغم ورودها في القسم 2.1 من `plan.md`. القاعدة العامة هناك (`grep` قبل الحذف) تبقى ملزمة.
2. **الأيقونات أُضيفت فعلاً في `public/`:** ‏`favicon.ico`، و `favicon-16x16.png`، و `favicon-32x32.png`، و `favicon-48x48.png`، و `apple-touch-icon.png` (180)، و `android-chrome-192x192.png`، و `android-chrome-512x512.png`، و `manifest.webmanifest`.
   - في P10 من `plan.md`: **استخدم هذه الملفات كما هي**.
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
R9  Validation matrix (automated + real devices)
```

**ترتيب التنفيذ مع `plan.md`:**
- R2 و R3 تُنفذان **ضمن P8 في `plan.md`** (الصور والأصول لا تغير الشكل، فهي آمنة قبل P11).
- R0 و R1 و R4 إلى R9 تُنفذ **بعد P11 في `plan.md`**.

> القواعد العامة كما في `plan.md`:
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
   - الملفات غير المستخدمة (`App.css`، و `ScrollReveal.css`...) تُحذف في `plan.md` P1، فلا تحوّلها.
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
   - **Loader:** في `loader.js` الـtemplate (بعد `plan.md` P4.3)، استبدل `rocket-body.webp` بـ`/brand/logo-mark.svg`، و `launch-button.webp` بـ`/brand/launch-button.svg`، **بنفس `width` و `height` والـclasses**. تحقّق بصرياً من الـloader (الإضاءة والـplume تبقى CSS).
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

### R3 — Raster Image Pipeline (يحل محل `plan.md` P8.2 و P8.3 و P8.4)

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
1. **`scripts/optimize-images.mjs`** (يستبدل placeholder `plan.md` P1.8):
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
   | صورة hero الرئيسية (`im2` و `im3`) | `(max-width: 767.98px) 100vw, 60vw` | ✓ (المتغيّر الداكن فقط، انظر ThemedImage في `plan.md`) |
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
   - **الاستثناء:** PNG الأكبر من 1MB (صور المقالات والمشاريع) يُولَّد لها `/_img/og/<slug>.jpg` بدقة 1200×630 وجودة JPEG 85، وتُستخدم في `openGraph.images`. عدّل `pageMetadata` في `plan.md` P7.
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
- `display:block` على `table` يحافظ على الـstyling ويسمح بالتمرير الأفقي داخل الجدول. **بديل أنظف:** في `renderMarkdown` (`plan.md` P2.5) لفّ كل `<table>` بـ`<div class="table-scroll">`، وأضف `.table-scroll{overflow-x:auto}`. **اختر البديل الأنظف** لأنه يحافظ على `display:table`.
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
   | InfiniteMenu (WebGL2) | كما هو، DPR ≤ 2 | DPR ≤ 1.5، ويبدأ عند الاقتراب (موجود من `plan.md` P8) | **لا WebGL**: شبكة بطاقات فريق ثابتة (نفس البيانات، ونفس ألوان البطاقة، و `<Link>` لكل عضو) |
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
5. **`prefers-reduced-motion`** في كل مكتبة (مكمّل لـ`plan.md` P9.3): ‏tier `minimal` يغطيها.

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
   - **على laptop-1440:** مطابقة لـbaseline `plan.md` (فرق ≤ 0.1%). الـdesktop لا يتغير.
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
3. الـdesktop مطابق بصرياً لما قبل الخطة.
4. قائمة الأجهزة الحقيقية موثقة بلا مشاكل مفتوحة.
5. `docs/responsive-changes.md` معتمد من المالك.

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
| إخفاء محتوى على الموبايل يضر SEO | ممنوع `display:none` لمحتوى أساسي. البديل (شبكة الفريق مثلاً) يعرض نفس البيانات | verify-site من `plan.md` |

## 5. Rollback

- كل مرحلة R مستقلة بـcommit، والتراجع بـ`git revert`.
- R3: إذا فشل الـpipeline في بيئة البناء، `ResponsiveImage` يعود تلقائياً للأصل عند غياب الـmanifest (الـfallback مبني في المكون). الموقع يعمل بصور أثقل لكن سليمة.
- R6: متغير `FORCE_TIER` في `site.ts` (`null` افتراضياً) يسمح بفرض `full` مؤقتاً لكل الأجهزة.

## 6. قرارات تحتاج المالك

1. اعتماد شكل الـdrawer على الموبايل (لقطة قبل وبعد في `docs/responsive-changes.md`).
2. اعتماد شبكة الفريق الثابتة كبديل WebGL على الأجهزة الضعيفة و reduced-motion.
3. `public/_img`: مولَّد في البناء (افتراضي) أم commit في الـrepo؟ (حسب زمن البناء على Cloudflare.)
4. صور placeholder الفريق (Unsplash) تبقى خارج الـpipeline حتى تُستبدل بصور حقيقية.
