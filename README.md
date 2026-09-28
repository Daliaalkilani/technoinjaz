<div align="center">
  <img src="public/images/brand/techno-logo.png" alt="Techno Enjaz logo" width="96" />
  <h1>تكنو إنجاز · Techno Enjaz</h1>
  <p>الموقع الرسمي لمكتب تكنو إنجاز الهندسي في حماة، سوريا<br/>The official website of Techno Enjaz engineering office, Hama, Syria</p>
  <p><a href="#ar">العربية</a> · <a href="#en">English</a></p>
  <p><code>https://technoenjaz.com</code></p>
</div>

---

<a id="ar"></a>

<div dir="rtl">

## العربية

### نبذة

تكنو إنجاز مكتب هندسي في حماة (سوريا). يعمل على:
- مشاريع التخرج والمشاريع الهندسية في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات وأنظمة التحكم وإنترنت الأشياء.
- تطوير المواقع والمنصات والأنظمة السحابية.
- نشر مقالات تقنية عربية مجانية.

هذا المستودع هو الموقع الرسمي للمكتب. يضم:
- **12 مقالاً تقنياً.**
- **14 مشروعاً** (مشاريع طلابية وهندسية نُفّذت بمساعدة المكتب).
- **منصات حية** تُعرض كـReels.
- الأسئلة الشائعة، وصفحات من نحن والتواصل.

الموقع ثنائي اللغة (العربية أساساً، مع واجهة إنجليزية)، وفيه وضع داكن وفاتح، وهوية بصرية تفاعلية: WebGL و Canvas و GSAP و Framer Motion.

### الحالة الحالية

| البند | الحالة |
|---|---|
| الترحيل من React/Vite SPA إلى Next.js (المراحل P0 إلى P11) | ✅ مكتمل ومُتحقق منه محلياً |
| النشر على Cloudflare Workers (P12) | ⏸️ جاهز ولم يُنفذ بعد. انظر [`docs/reports/pre-deployment-validation.md`](docs/reports/pre-deployment-validation.md) |
| خطة الـResponsive والـAdaptive والأصول (R0 إلى R11 في [`plan.md`](plan.md)) | ⏳ لم تبدأ |

### التقنيات

| المجال | التقنية |
|---|---|
| الإطار | Next.js 15 (App Router) + React 19 + TypeScript |
| العرض (Rendering) | SSG لكل الصفحات العامة، و React Server Components، وتفعيل (hydration) للأجزاء التفاعلية فقط |
| الاستضافة | Cloudflare Workers عبر `@opennextjs/cloudflare` |
| التخزين المؤقت (ISR/SSR مستقبلاً) | R2 (incremental cache) + D1 (tag cache) + Durable Objects (queue) |
| المحتوى | ملفات Markdown داخل المستودع، تُحوَّل إلى HTML على الخادم بـ`marked` |
| الحركة والرسوميات | GSAP، و Framer Motion، و OGL، و WebGL2 (gl-matrix)، و Canvas 2D |
| الأيقونات | lucide-react |
| الخط | Readex Pro عبر `next/font` |
| الصور | سكربت sharp يولّد نسخ WebP متجاوبة وقت البناء |
| الجودة | oxlint، و TypeScript، و Playwright، و axe-core، وسكربت تحقق SEO خاص |

### المعمارية ومبدأ العرض

```text
Build time
  src/content/*.md + src/data/*.ts
        ↓ Server Components (marked, metadata, JSON-LD)
  Static HTML for every public page (SSG)
        ↓
Request → Cloudflare Worker → cached HTML (full content, no JS needed to read it)
        ↓
Browser → React hydrates interactive parts only (nav, filters, likes, WebGL, animations)
```

- **لا توجد صفحة عامة تعتمد على JavaScript لعرض محتواها.** العنوان والنص والروابط والبيانات المنظمة موجودة في الـHTML الأولي.
- **الوضع الافتراضي لكل صفحة هو SSG.** البنية جاهزة لتحويل صفحة بعينها إلى ISR أو SSR عند الحاجة (مثلاً مصادقة حقيقية أو CMS)، بتغيير إعداد تلك الصفحة فقط. التفاصيل في خطة الترحيل ([`60933a1:plan.md`](https://github.com/Daliaalkilani/technoinjaz/blob/60933a1/plan.md)، القسم 12.2).
- **الحدود بين الخادم والمتصفح:**
  - `page.tsx` مكونات خادم.
  - كل ما يستخدم localStorage أو WebGL أو الحركة مكوّن عميل (`'use client'`).
  - مكتبة `marked` وملفات المحتوى لا تصل إلى المتصفح (`server-only`).

### الصفحات

| المسار | المحتوى | الفهرسة |
|---|---|---|
| `/` | الرئيسية: Hero، ومشاريع، وفيديوهات، ومقالات، والفريق | index |
| `/projects` | كتالوج المشاريع مع الفلاتر | index |
| `/projects/[slug]` | تفاصيل المشروع (14) | index |
| `/articles` | المقالات مع البحث والفلاتر | index |
| `/articles/[slug]` | المقال الكامل (12) | index |
| `/videos` | عرض المنصات الحية (Reels) | index |
| `/faq` | 13 سؤالاً وجواباً | index |
| `/about` | من نحن والفريق | index |
| `/contact` | التواصل والخريطة | index |
| `/team/[id]` | ملف عضو الفريق | noindex |
| `/login` و `/register` و `/account` | حساب محلي تجريبي (localStorage) | noindex |
| `/sitemap.xml` و `/robots.txt` و `/llms.txt` و `/llms-full.txt` و `/manifest.webmanifest` | ملفات مولّدة من البيانات | — |

**الروابط القديمة:** كان الموقع يستخدم روابط hash مثل `/#article/digital-twin`. سكربت في `<head>` (`src/lib/inline-scripts.ts`) يحوّلها تلقائياً إلى المسارات الجديدة (`/articles/digital-twin`)، فلا تنكسر الروابط المنشورة سابقاً.

### بنية المشروع

```text
src/
  app/                    Routes only (App Router): pages, sitemap, robots, manifest, llms.txt
  features/               One folder per product area; each holds its components and their CSS
    home/                   Hero + home sections (projects, videos, articles bento)
    articles/               Listing, article view, server-rendered body
    projects/               Catalog, project view, live platforms showcase
    videos/                 Reels feed, video modal
    faq/  about/  team/  contact/  auth/  account/
  components/             Shared, feature-agnostic building blocks
    layout/                 App shell, navbar (GooeyNav, language, theme), footer, scroll-to-top
    effects/                Visual/animation primitives (WebGL Orb & InfiniteMenu, ScrollExpand, CardSwap, MagicBento...)
    ui/                     Small UI primitives (Button, ResponsiveImage, ThemedImage, SocialButtons, ClientOnly)
  content/                Published content only (Markdown)
    articles/<slug>.md
    projects/<slug>.md
  data/                   Structured metadata: articles, projects, reels, videos, FAQ, team
  lib/                    Server/content helpers: markdown, content loaders, text, auth, inline scripts
  seo/                    Metadata builders, JSON-LD schemas
  config/site.ts          Single source of truth: domain, organization info, loader mode
  context/  hooks/        React context providers and hooks
  locales/                Arabic/English UI strings
  styles/globals.css      Global styles and design tokens
  assets/                 Images imported by components (bundled): brand/, home/, showcase/, videos/
  types/                  Ambient type declarations
public/
  images/                 Static images served by URL
    articles/  projects/  platforms/  moments/  team/  brand/
  loader/                 Rocket loader (standalone script + assets)
  favicon-*.png, apple-touch-icon.png, manifest.webmanifest
scripts/                  Build & maintenance: image optimization, SEO verification, URL inventory
tests/                    Playwright: no-JS rendering, legacy redirects, visual baseline
docs/
  reports/                Baseline, verification and pre-deployment reports
  reference/              URL inventory, legacy head, favicon notes, old→new path map
  seo/articles/           Internal SEO research per article (never published)
design/brand-theme/       Standalone brand typography kit + demo page (not part of the app)
plan.md                   Responsive / adaptive / assets plan (next phase)
```

### إضافة محتوى

**مقال جديد:**
1. النص: `src/content/articles/<slug>.md`. أول سطر `# العنوان` يُحذف تلقائياً لأن العنوان يُعرض من البيانات. استخدم `##` للأقسام و `###` للفرعية.
2. الصورة: `public/images/articles/<slug>.jpg`، ويفضّل 1600×900 أو 1280×720.
3. البيانات: أضف عنصراً في `src/data/blogArticlesData.ts`. الحقول: `slug`، و `title` و `titleEn`، و `seoTitle`، و `metaDescription`، و `category`، و `publishedAt` بصيغة `YYYY-MM-DD`، و `excerpt`، و `tags`، و `image`.
4. `npm run build`. الصفحة والـsitemap و `llms.txt` تُحدَّث تلقائياً.

**مشروع جديد:** نفس الخطوات:
- النص في `src/content/projects/<slug>.md`.
- الصورة في `public/images/projects/<slug>.png`.
- البيانات في `src/data/projectsData.ts`.

> ملاحظات التحرير الداخلية (أماكن الصور المقترحة، و Filename و Alt، والملاحظات للفريق) لا توضع في ملفات المحتوى المنشورة.

### SEO و GEO و AEO

- عنوان ووصف و canonical (`https://technoenjaz.com/...`) لكل صفحة، مع Open Graph و Twitter Card.
- بيانات منظمة JSON-LD من البيانات الحقيقية فقط:
  - `Organization` و `WebSite` لكل الصفحات.
  - `BlogPosting` للمقالات، و `CreativeWork` للمشاريع.
  - `FAQPage` و `BreadcrumbList` و `CollectionPage`.
- `sitemap.xml` بـ33 رابطاً، و `robots.txt`.
- `llms.txt` و `llms-full.txt` مولّدان من البيانات، لمحركات الإجابة ونماذج الذكاء الاصطناعي.
- عنوان H1 واحد لكل صفحة، و breadcrumbs، وروابط داخلية حقيقية (`<a href>`) في كل البطاقات.

### الأداء وإمكانية الوصول

- الـloader (الصاروخ) يظهر على الرئيسية فقط، وفي أول زيارة للجلسة (`LOADER_MODE` في `site.ts`).
- مؤثرات WebGL و Canvas لا تُحمّل على الخادم، وتبدأ عند اقترابها من الشاشة.
- صور WebP متجاوبة (640 و 1280) تُولّد في `public/_img/` وقت البناء.
- رابط "تخطَّ إلى المحتوى"، ومؤشرات تركيز واضحة، و `<main>` واحد، وتسميات للحقول، وبدائل نصية للعناصر المرسومة على canvas.

### التشغيل محلياً

المتطلبات: Node.js 20 أو أحدث.

```bash
npm install
npm run dev          # http://localhost:3000
```

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | خادم التطوير |
| `npm run build` | تحسين الصور ثم بناء Next.js |
| `npm run preview` | بناء ومعاينة داخل بيئة Cloudflare محلياً (workerd): `http://localhost:8787` |
| `npm run deploy` | بناء ونشر على Cloudflare Workers |
| `npm run lint` | oxlint |
| `npm run typecheck` | TypeScript |
| `npm run verify` | فحص SEO والمحتوى على الموقع العامل (يتطلب `preview` قيد التشغيل) |
| `npm run test:e2e` | اختبارات Playwright |

### الاختبار والتحقق

- `scripts/verify-site.mjs`: يفحص كل روابط الـsitemap. يتحقق من:
  - العنوان والوصف والـcanonical، وعنوان H1 واحد، و JSON-LD.
  - غياب مسودات التحرير والروابط الداخلية الخاطئة.
  - الروابط الداخلية، وصفحة 404.

  التقرير في [`docs/reports/verify-report.md`](docs/reports/verify-report.md).
- `tests/no-js.spec.ts`: يتأكد أن المحتوى يظهر **بدون JavaScript**.
- `tests/legacy-redirects.spec.ts`: يتأكد من تحويل روابط hash القديمة.
- `tests/visual/`: لقطات مرجعية لمقارنة الشكل (3 مقاسات، ووضعان، ولغتان).

### النشر

الخطوات الكاملة في [`docs/reports/pre-deployment-validation.md`](docs/reports/pre-deployment-validation.md). باختصار:

```bash
npx wrangler login
npx wrangler r2 bucket create technoenjaz-next-cache
npx wrangler d1 create technoenjaz-tag-cache   # put the returned database_id in wrangler.jsonc
npm run deploy
```

ثم في لوحة Cloudflare: **Workers ← technoenjaz ← Settings ← Domains & Routes**، وأضف `technoenjaz.com` كـCustom Domain.

### أعمال متبقية وقيود معروفة

1. **مسودات تحرير ظاهرة في 8 مشاريع:** ملفات `src/content/projects/` ما زالت تحتوي أقساماً تحريرية مكتوبة كنص عادي (أماكن الصور المقترحة، و "الصور الخارجية المقترحة"، وملاحظات "يجب تعديل"، وعنوان `CTA`). البناء يحذف بعض الأسطر فقط. الحل الصحيح: نقل هذه الأقسام إلى ملفات داخلية مثل `docs/editorial/projects/`.
2. **عنوان المكتب متضارب:** `src/config/site.ts` (والبيانات المنظمة) فيه "طريق دمشق - حماة"، بينما صفحة التواصل والأسئلة الشائعة فيهما "ساحة العاصي - بناء الخاني". يلزم تأكيد العنوان الصحيح.
3. **`wrangler.jsonc`:** قيمة `database_id` لقاعدة D1 مؤقتة، وتُستبدل بالمعرّف الحقيقي بعد `wrangler d1 create`.
4. **الفريق:** 5 من 7 أعضاء في `src/data/teamData.js` بيانات مؤقتة ("Future Team Member"). صفحات الفريق noindex ولا تدخل البيانات المنظمة.
5. **الحساب والإعجابات والتعليقات** محلية في المتصفح (localStorage)، ولا يوجد backend.
6. **Responsive و Adaptive:** مشاكل مُقاسة على الموبايل والتابلت (القائمة على الموبايل، و overflow على iPad الأفقي، وأحجام الصور، وأهداف اللمس). الخطة كاملة في [`plan.md`](plan.md).
7. **صور ناقصة:** نص مشروع `virtual-board-hand-tracking` يشير إلى 4 صور غير موجودة في المستودع (`/images/projects/virtual-board/*`).
8. **عرض المنصات الحية (`LiveProjectsShowcase`)** كان يظهر في صفحة المشاريع قبل الترحيل، ولم يعد مستخدماً في أي صفحة. الكود محفوظ في `src/features/projects/`، ويحتاج قراراً بإعادته.

### المساهمة والترخيص

- دليل المساهمة: [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md)، وقواعد السلوك: [`.github/CODE_OF_CONDUCT.md`](.github/CODE_OF_CONDUCT.md).
- الثغرات الأمنية: [`.github/SECURITY.md`](.github/SECURITY.md). لا تُنشر في Issues عامة.
- **الترخيص:** جميع الحقوق محفوظة لتكنو إنجاز. المستودع معروض للاطلاع فقط. انظر [`LICENSE`](LICENSE).

### التواصل

- الهاتف وواتساب: `+963 958 794 195`
- البريد: `info@technoenjaz.com`
- إنستغرام: [@TECHNO_ENJAZ](https://instagram.com/TECHNO_ENJAZ)
- الموقع: حماة، سوريا

</div>

---

<a id="en"></a>

## English

### About

Techno Enjaz is an engineering office in Hama, Syria. It works on:
- Graduation and engineering projects in AI, computer vision, robotics, control systems and IoT.
- Websites, platforms and cloud systems.
- Free Arabic technical articles.

This repository is the office's official website. It includes:
- **12 technical articles.**
- **14 projects** (student and engineering projects built with the office's support).
- **Live platforms** presented as reels.
- FAQ, About and Contact pages.

The site is bilingual (Arabic first, with an English UI), has dark and light themes, and an interactive visual identity built with WebGL, Canvas, GSAP and Framer Motion.

### Current status

| Item | Status |
|---|---|
| Migration from React/Vite SPA to Next.js (phases P0–P11) | ✅ Complete and verified locally |
| Deployment to Cloudflare Workers (P12) | ⏸️ Ready, not yet executed. See [`docs/reports/pre-deployment-validation.md`](docs/reports/pre-deployment-validation.md) |
| Responsive / adaptive / assets plan (R0–R11 in [`plan.md`](plan.md)) | ⏳ Not started |

### Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Rendering | SSG for every public page, React Server Components, hydration for interactive parts only |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` |
| Caching (future ISR/SSR) | R2 (incremental cache) + D1 (tag cache) + Durable Objects (queue) |
| Content | Markdown files in the repo, rendered to HTML on the server with `marked` |
| Motion and graphics | GSAP, Framer Motion, OGL, WebGL2 (gl-matrix), Canvas 2D |
| Icons | lucide-react |
| Font | Readex Pro via `next/font` |
| Images | Build-time sharp script generating responsive WebP variants |
| Quality | oxlint, TypeScript, Playwright, axe-core, custom SEO verification script |

### Architecture and rendering

```text
Build time
  src/content/*.md + src/data/*.ts
        ↓ Server Components (marked, metadata, JSON-LD)
  Static HTML for every public page (SSG)
        ↓
Request → Cloudflare Worker → cached HTML (full content, no JS needed to read it)
        ↓
Browser → React hydrates interactive parts only (nav, filters, likes, WebGL, animations)
```

- **No public page depends on JavaScript to show its content.** The title, body, links and structured data are all in the initial HTML.
- **SSG is the default for every page.** The infrastructure is ready to switch an individual page to ISR or SSR when needed (for example real authentication or a CMS) by changing that page's configuration only. See the migration plan ([`60933a1:plan.md`](https://github.com/Daliaalkilani/technoinjaz/blob/60933a1/plan.md), section 12.2).
- **Server/client boundaries:**
  - `page.tsx` files are Server Components.
  - Anything that uses localStorage, WebGL or animation is a Client Component (`'use client'`).
  - `marked` and the content files never reach the browser (`server-only`).

### Routes

| Path | Content | Indexing |
|---|---|---|
| `/` | Home: hero, projects, videos, articles, team | index |
| `/projects` | Project catalog with filters | index |
| `/projects/[slug]` | Project detail (14) | index |
| `/articles` | Articles with search and filters | index |
| `/articles/[slug]` | Full article (12) | index |
| `/videos` | Live platforms (reels) | index |
| `/faq` | 13 questions and answers | index |
| `/about` | About and team | index |
| `/contact` | Contact and map | index |
| `/team/[id]` | Team member profile | noindex |
| `/login`, `/register`, `/account` | Local demo account (localStorage) | noindex |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Generated from the data | — |

**Legacy links:** the old site used hash URLs such as `/#article/digital-twin`. A script in `<head>` (`src/lib/inline-scripts.ts`) redirects them to the new paths (`/articles/digital-twin`), so previously shared links keep working.

### Project structure

See the tree in the Arabic section above (it is written in English and applies to both).

### Adding content

**New article:**
1. Body: `src/content/articles/<slug>.md`. The first `# Title` line is removed automatically because the title comes from the data. Use `##` for sections and `###` for subsections.
2. Image: `public/images/articles/<slug>.jpg`, preferably 1600×900 or 1280×720.
3. Data: add an entry to `src/data/blogArticlesData.ts`. Fields: `slug`, `title` and `titleEn`, `seoTitle`, `metaDescription`, `category`, `publishedAt` as `YYYY-MM-DD`, `excerpt`, `tags`, `image`.
4. `npm run build`. The page, the sitemap and `llms.txt` update automatically.

**New project:** the same steps:
- Body in `src/content/projects/<slug>.md`.
- Image in `public/images/projects/<slug>.png`.
- Data in `src/data/projectsData.ts`.

> Internal editorial notes (suggested image slots, Filename and Alt lines, notes to the team) must not go into published content files.

### SEO, GEO and AEO

- A title, description and canonical URL (`https://technoenjaz.com/...`) for every page, with Open Graph and Twitter Card.
- JSON-LD structured data built from real data only:
  - `Organization` and `WebSite` on every page.
  - `BlogPosting` for articles, `CreativeWork` for projects.
  - `FAQPage`, `BreadcrumbList` and `CollectionPage`.
- `sitemap.xml` with 33 URLs, and `robots.txt`.
- `llms.txt` and `llms-full.txt` generated from the data, for answer engines and AI models.
- One H1 per page, breadcrumbs, and real internal links (`<a href>`) on every card.

### Performance and accessibility

- The rocket loader shows on the home page only, on the first visit of a session (`LOADER_MODE` in `site.ts`).
- WebGL and Canvas effects are not rendered on the server and start when they approach the viewport.
- Responsive WebP images (640 and 1280) are generated into `public/_img/` at build time.
- Skip link, visible focus indicators, a single `<main>`, labelled form fields, and text alternatives for canvas content.

### Running locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Optimize images, then build Next.js |
| `npm run preview` | Build and preview locally in the Cloudflare runtime (workerd): `http://localhost:8787` |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run lint` | oxlint |
| `npm run typecheck` | TypeScript |
| `npm run verify` | SEO and content checks against the running site (requires `preview` running) |
| `npm run test:e2e` | Playwright tests |

### Testing and verification

- `scripts/verify-site.mjs` checks every sitemap URL for:
  - Title, description, canonical, a single H1, and JSON-LD.
  - Absence of editorial drafts and wrong internal links.
  - Internal links and the 404 page.

  Report: [`docs/reports/verify-report.md`](docs/reports/verify-report.md).
- `tests/no-js.spec.ts` confirms content is visible **with JavaScript disabled**.
- `tests/legacy-redirects.spec.ts` confirms the old hash links redirect correctly.
- `tests/visual/` holds reference screenshots for visual comparison (3 sizes, 2 themes, 2 languages).

### Deployment

Full steps are in [`docs/reports/pre-deployment-validation.md`](docs/reports/pre-deployment-validation.md). In short:

```bash
npx wrangler login
npx wrangler r2 bucket create technoenjaz-next-cache
npx wrangler d1 create technoenjaz-tag-cache   # put the returned database_id in wrangler.jsonc
npm run deploy
```

Then in the Cloudflare dashboard, go to **Workers → technoenjaz → Settings → Domains & Routes** and add `technoenjaz.com` as a Custom Domain.

### Open work and known limitations

1. **Visible editorial drafts in 8 projects:** files in `src/content/projects/` still contain editorial sections written as plain text (suggested image slots, "suggested external images", "must be edited" notes, a `CTA` heading). The build only strips some of these lines. The proper fix is to move these sections into internal files such as `docs/editorial/projects/`.
2. **Conflicting office address:** `src/config/site.ts` (and the structured data) says "طريق دمشق - حماة", while the Contact page and FAQ say "ساحة العاصي - بناء الخاني". The correct address needs to be confirmed.
3. **`wrangler.jsonc`:** the D1 `database_id` is a placeholder. Replace it with the real ID after `wrangler d1 create`.
4. **Team:** 5 of the 7 entries in `src/data/teamData.js` are placeholders ("Future Team Member"). Team pages are noindex and are excluded from the structured data.
5. **Account, likes and comments** are local to the browser (localStorage). There is no backend.
6. **Responsive and adaptive:** measured issues on phones and tablets (the mobile menu, horizontal overflow on landscape iPad, image weight, touch targets). The full plan is in [`plan.md`](plan.md).
7. **Missing images:** the `virtual-board-hand-tracking` project text references 4 images that are not in the repo (`/images/projects/virtual-board/*`).
8. **The live platforms showcase (`LiveProjectsShowcase`)** used to appear on the Projects page before the migration and is no longer used on any page. The code is kept in `src/features/projects/` and needs a decision on restoring it.

### Contributing and license

- Contributing guide: [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md). Code of conduct: [`.github/CODE_OF_CONDUCT.md`](.github/CODE_OF_CONDUCT.md).
- Security issues: [`.github/SECURITY.md`](.github/SECURITY.md). Never report them in public issues.
- **License:** all rights reserved by Techno Enjaz. The repository is public for reference only. See [`LICENSE`](LICENSE).

### Contact

- Phone and WhatsApp: `+963 958 794 195`
- Email: `info@technoenjaz.com`
- Instagram: [@TECHNO_ENJAZ](https://instagram.com/TECHNO_ENJAZ)
- Location: Hama, Syria
