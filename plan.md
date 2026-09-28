# خطة ترحيل Techno Enjaz إلى Next.js (SSG/SSR) على Cloudflare Workers

> **لمن هذه الوثيقة:** Coding Agent سينفّذ الترحيل خطوة بخطوة.
> **القاعدة الذهبية:** كل القرارات المعمارية محسومة هنا. لا تتخذ قراراً معمارياً جديداً. إذا واجهت حالة غير مغطاة، توقّف واسأل المالك.
> **Repository:** `github.com/Daliaalkilani/technoinjaz`
> **الحالة عند كتابة الخطة:** آخر commit هو `2d5567d`. المشروع React 19 + Vite 8 SPA بـhash routing.

---

## 0. قواعد غير قابلة للتفاوض

1. **لا صفحة عامة تعتمد على React CSR لإظهار محتواها الأساسي.** كل صفحة عامة تُسلَّم كـHTML كامل من الخادم (SSG أو SSR). وجود أي صفحة عامة يُبنى محتواها في المتصفح = **FAILURE**.
2. **الإطار النهائي:** Next.js App Router على Cloudflare Workers عبر `@opennextjs/cloudflare`. هذا القرار نهائي للحاضر والمستقبل. التطوير اللاحق يغيّر **إعداد rendering لكل route** فقط، ولا يغيّر المعمارية.
3. **الافتراضي لكل route عام هو SSG.** يتحول route إلى ISR أو SSR فقط وفق "دليل التحويل" (القسم 12). البنية التحتية لـISR و SSR تُجهَّز من اليوم.
4. **لا redesign.** يبقى كما هو: التصميم والألوان والخطوط والمسافات والـanimations و GSAP و framer-motion و OGL و WebGL و Canvas والسلوك على الموبايل.
5. **لا تخترع بيانات.** الـstructured data والـmetadata تأتي فقط من محتوى موجود في الـrepo أو من قيمة أكّدها المالك.
6. **حافظ على الـslugs كما هي حرفياً.** الـURLs الجديدة محددة في القسم 5.3، والروابط القديمة (hash) تُحوَّل تلقائياً.
7. كل مرحلة تنتهي بـcommit مستقل، ولا تبدأ مرحلة قبل نجاح Validation المرحلة السابقة.

---

## 1. Executive Summary

**الوضع الحالي:**
- SPA يُعرض بالكامل في المتصفح. الملف `dist/index.html` لا يحتوي إلا `<div id="root"></div>`.
- كل التنقل عبر hash: `#articles` و `#article/slug` و `#project/slug` وغيرها. محركات البحث تعامل هذا كله كـURL واحد.
- الـcanonical والـsitemap يشيران إلى دومين غير موجود (`techno-enjaz.com`) ومسارات لا تعرض المحتوى.
- ملف JS واحد بحجم 1.4MB (436KB gzip)، يضم كل المقالات والمشاريع.

**القرار:**
- **Next.js App Router + React 19 + TypeScript** على **Cloudflare Workers (OpenNext)**.
- **SSG لكل الصفحات العامة اليوم.** المحتوى كله ملفات داخل الـrepo، ولا يوجد backend.
- **بنية ISR و SSR جاهزة من اليوم:** ‏R2 incremental cache و D1 tag cache و Durable Object queue.
- **React Server Components** تبقي الـmarkdown وملفات البيانات ومكتبة `marked` على الخادم.
- **Client Components** للتفاعل فقط: الـnav والـanimations والـWebGL والفلاتر والإعجابات والتعليقات والـtheme واللغة.

**لماذا ليس SSR لكل شيء:** لا توجد اليوم أي بيانات تتغير حسب الطلب أو حسب المستخدم على الخادم. الـauth الحالي يعيش في localStorage، ولا يصل للخادم. SSR هنا يعني تشغيل Worker عند كل زيارة لإنتاج نفس الـHTML، أي زمن استجابة وتكلفة أعلى بدون أي فائدة SEO. عندما يظهر سبب حقيقي (مصادقة بـcookies أو CMS)، يتحول الـroute المعني وحده (القسم 12).

---

## 2. Repository Audit (ما وُجد فعلياً)

| البند | النتيجة |
|---|---|
| Stack | ‏React 19.2 و Vite 8.3 و TypeScript 6 و oxlint. لا router |
| Entry | `index.html` ← `src/main.tsx` ← `ThemeLanguageProvider` ← `src/App.tsx` (931 سطراً، كل الـ"routing" فيه كـstate) |
| Build الحالي | ‏`tsc -b && vite build` ينجح. ‏Lint فيه warnings فقط |
| Bundle | ‏`index.js` حجمه 1,405KB (436KB gz). ‏Lazy فقط لـ Profile و Contact و Auth و UserProfile و ProjectsCatalog و FAQ |
| Network | لا يوجد `fetch` أو API أو env. الخارجي فقط: Google Fonts، و YouTube-nocookie iframe في modal، و Google Maps iframe في Contact، وصور Unsplash لأعضاء الفريق |
| localStorage | `techno_theme`، `theme`، `techno_theme_manual`، `techno_lang`، `techno_user`، `techno_logged_out`، `techno_blog_likes`، `techno_blog_comments`، `techno_reels_likes`، `techno_reels_comments`، `techno_saved_projects` + مفاتيح per-user |
| sessionStorage | `techno_auth_return_hash` |
| Auth | **Mock:** أي بريد وكلمة سر تُقبل، ويُخزَّن user في localStorage بحالة "حساب موثق". لا backend |
| Animation libs | ‏gsap: ‏CinematicFooter و ui/CardSwap و videos/CardSwap و MagicBento. ‏framer-motion: ‏scroll-progress و svg-follow-scroll و auth-switch. ‏ogl: ‏Orb. ‏gl-matrix + WebGL2: ‏InfiniteMenu. ‏Canvas 2D: ‏TeamMomentsRing و الـloader |
| Dependencies غير مستخدمة | `three`، `@types/three`، `page-flip`، `@types/page-flip`، `pdfjs-dist` |
| Loader | صاروخ Canvas بملء الشاشة (`public/loader/`) يعمل في **كل** تحميل صفحة لمدة 2.5s تقريباً |
| Fonts | ‏Readex Pro (6 أوزان) يُحمَّل **مرتين**: `<link>` في index.html و `@import` في `src/index.css` |
| Favicon | `<link rel=icon href=/loader/assets/brand.webp>`. الملف `public/favicon.svg` هو شعار Vite الافتراضي. لا apple-touch-icon ولا manifest |
| Assets | ‏`public` حجمه 34MB و `src/assets` حجمه 47MB. صور PNG بين 1.3 و1.9MB. `5g-iot.png` مطابقة لـ`internet-of-things-iot.png` |
| Domain | `technoenjaz.com` خلف Cloudflare ويرجع 525 (مشكلة SSL في الـorigin). `techno-enjaz.com` **لا يُحلّ في DNS** |
| Hosting | غير موثّق في الـrepo. المالك قرر: **Cloudflare Workers + OpenNext** |
| SSR probe | كل المكونات الرئيسية (App و OfficeBlog و ArticleDetail و Catalog و ProjectDetail و FAQ و Contact و Reels) تُعرض بـ`renderToString` في Node **بدون crash**. الترحيل لا يحتاج إعادة كتابة المكونات |

### 2.1 ملفات غير مستخدمة (غير قابلة للوصول من entry)

- `src/App.css`، و `src/PrismaticBurst.*`، و `src/ScrollReveal.*`، و `src/TextLoop.*`.
- `src/components/articles/ArticleReaderModal.*`.
- `src/components/ui/`: ‏`FacetedText.tsx` و `GridDistortion.*` و `OptionWheel.*` و `demo.jsx` و `demo.tsx` و `interactive-hover-button.jsx` و `interactive-hover-button.tsx` و `scroll-progress.jsx` و `svg-follow-scroll.jsx`.
- `src/registry/magicui/interactive-hover-button.jsx`، و `src/lib/utils.js`، و `src/data/driveProjectsData.ts`.
- `src/assets/`: ‏`react.svg` و `vite.svg` و `hero.png` و `cinematic-engineering.jpg`.
- `src/assets/articles/*` (نسخ مكررة من `public/articles/`).
- ~~`src/assets/projects/techno-projects/*`~~ **(تحديث: أصبحت مستخدمة في الرئيسية منذ commit `3c92b59`، فلا تحذفها. انظر `responsive-plan.md` القسم 0)**.
- `src/content/articles/*-seo.md`: غير مستوردة **عمداً**. هي حزم SEO داخلية كُتب عليها "DO NOT PUBLISH". **تبقى في الـrepo.**

---

## 3. Current Architecture

```text
Request (any path) → index.html (empty #root + rocket loader overlay)
→ 1.4MB JS → React mounts → App reads location.hash
→ useState: currentTab / isContactOpen / isAuthOpen / selectedMember / isUserProfileOpen
→ conditional render of the "page"
→ Article/Project SEO: document.title + meta + canonical + JSON-LD injected in useEffect (CSR only)
```

- ثلاثة مستمعين منفصلين لـ`hashchange`: في `App.tsx` و `OfficeBlogSection.tsx` و `ProjectsCatalogSection.tsx`.
- **المقالات:** الـmetadata في `src/data/blogArticlesData.ts`، والنص في `src/content/articles/<slug>.md?raw`. التحويل في المتصفح بـ`marked`.
- **المشاريع:** كل البيانات والـmarkdown داخل `src/data/projectsData.ts` (163KB) كـstrings. الـrenderer يُضبط global عبر `marked.setOptions({renderer})`، فيتسرّب إلى renderer المقالات.
- **الـhead:** ثابت في `index.html`. الاستثناء صفحات المقال والمشروع التي تعدّله عبر useEffect.

---

## 4. Current Problems (مؤكدة)

### Rendering و Crawlability
1. CSR كامل، والـHTML الأولي فارغ.
2. كل الصفحات hash fragments، أي URL واحد من منظور محركات البحث.
3. الـcanonical للمقالات `https://techno-enjaz.com/articles/<slug>`: دومين غير موجود، والمسار نفسه لا يعرض المقال.
4. الـcanonical للمشاريع `https://techno-enjaz.com/#project/<slug>`: fragment ودومين خاطئ.
5. البطاقات والـrelated والـbreadcrumbs و MagicBento كلها `div` أو `article` أو `button` بـ`onClick`. **لا توجد `<a href>`**.
6. إجابات الـFAQ المغلقة غير موجودة في الـDOM (`{isOpen && ...}`).
7. أسماء الفريق موجودة فقط داخل WebGL canvas (InfiniteMenu).

### صحة البيانات و SEO
8. تضارب الدومين: `technoenjaz.com` في index.html و llms.txt والبريد، و `techno-enjaz.com` في sitemap و robots والمقالات والمشاريع.
9. الـsitemap فيه 5 مقالات فقط من 12، وروابط بـ`#`.
10. ‏JSON-LD للمقالات يستخدم `datePublished: 2026-09-20` لكل المقالات، مع أن 7 منها نُشرت في 21.
11. العنصر الثالث في breadcrumb المقال يشير للمقال نفسه باسم التصنيف.
12. **H1 مكرر في كل صفحة مشروع (14 من 14):** الـmarkdown يبدأ بـ`# title`، والـcomponent يعرض H1 أيضاً.
13. **124 تعليق HTML تحريري يظهر في الـDOM** في المشاريع (FEATURED IMAGE و IMAGE SLOT و GALLERY ITEM و Suggested Internal Link وروابط `docs.google.com`). مقتطف مشروع `interactive-children-ai-learning-system` يبدأ بـ`<!-- FEATURED IMAGE`، وبعض المقتطفات فيها `**`.
14. `tags` لكل المشاريع = `["WebPage","BreadcrumbList","Organization","ImageObject"]`. تُعرض للمستخدم تحت "الوسوم والكلمات المفتاحية" وتُستخدم كـkeywords.
15. العنوان متضارب: JSON-LD و README يقولان "طريق دمشق - حماة"، والـUI (Contact و FAQ و translations) يقول "حماة - ساحة العاصي - بناء الخاني - بجوار أفران السلام - الطابق الرابع".
16. `og:image` نسبي، و `og:locale:alternate en_US` بدون صفحات إنجليزية.
17. `twitter:site @TECHNO_ENJAZ` هو handle إنستغرام وغير مُتحقق على X.
18. ‏llms.txt و llms-full.txt فيهما فريق مختلف عن `teamData` (Noor Al-Huda و Omar Farooq و Tala...)، و 5 مقالات فقط.

### Trust و GEO
19. `teamData.js`: سبعة أشخاص بصور Unsplash وبريد `@company.com` وروابط LinkedIn و GitHub مُفترضة. الصورة الوحيدة الحقيقية `/abdulghani.jpg`. هذه **بيانات placeholder**.
20. أرقام تفاعل ثابتة (initialLikes و initialViews "3.4K" وتعليقات Reels جاهزة) تُعرض كأنها حقيقية.

### Performance
21. ملف JS بحجم 1.4MB على كل صفحة.
22. صور PNG بين 1.3 و1.9MB، بدون srcset أو webp.
23. الـloader يغطي كل صفحة 2.5s، حتى على صفحات المقالات القادم إليها زائر من البحث.
24. الخط يُحمَّل مرتين.

### Hydration readiness
25. قراءة window و localStorage داخل `useState(() => ...)` في: `ThemeLanguageContext` و `App.currentUser` والـlikes والتعليقات (Blog و Reels) و `ScrollExpandPrototype.config` و `ProjectsSection.isMobile` و `ProjectsCatalogSection.activeProject` و `useSavedProjects`.
26. ‏38 استخداماً لـ`theme === 'light' ? ... : ...` في inline styles.

### Accessibility
27. لا skip link، ولا `:focus-visible` مخصص. الـreduced-motion مدعوم في 4 أماكن فقط.
28. بطاقات تُفتح بالنقر لكنها غير قابلة للوصول بالكيبورد، والـcanvas بدون بديل نصي.

---

## 5. Complete Route Inventory

### 5.1 Routes الحالية

| Route الحالي | الغرض | المكونات | البيانات | Auth | Browser APIs | أهمية SEO |
|---|---|---|---|---|---|---|
| `/` و `#top` | الرئيسية | ScrollExpandPrototype (ScrollExpand و ProjectsSection/InfiniteSpiral و VideosSection/CardSwap و ArticlesSection/MagicBento) + قسم About (TeamMomentsRing و Skiper19 و InfiniteMenu و Orb) + CinematicFooter | translations و projects و videos و articles | لا | scroll و resize و WebGL و canvas | عالية جداً |
| `#projects` | قائمة المشاريع | ProjectsCatalogSection | PROJECTS_DATA | لا | — | عالية |
| `#project/<slug>` ×14 | تفاصيل مشروع | ProjectDetailView | markdownContent | الحفظ يحتاج login | clipboard و IntersectionObserver | عالية |
| `#articles` | قائمة المقالات | OfficeBlogSection | blogArticlesData | الإعجاب يحتاج login | localStorage | عالية |
| `#article/<slug>` ×12 | تفاصيل مقال | ArticleDetailView | md + metadata | التفاعل يحتاج login | localStorage و clipboard | **الأعلى** |
| `#videos` | Reels | ProjectReelsFeed | projectReelsData | الإعجاب يحتاج login | localStorage | متوسطة |
| `#faq` | الأسئلة الشائعة (13) | FaqSection | داخل الـcomponent | لا | — | عالية (AEO) |
| `#about` | من نحن والفريق | قسم About (مكرر مرتين في App) | translations و teamData | لا | WebGL | متوسطة-عالية |
| `#contact` | التواصل | ContactPage | translations | لا | — | عالية (local) |
| `#profile-<id>` ×7 | عضو فريق | ProfilePage | teamData (placeholder) | لا | — | منخفضة |
| `#login` و `#auth` و `#register` | دخول (mock) | AuthPage | — | — | localStorage | لا تُفهرس |
| `#my-profile` و `#favorites` و `#profile` | الحساب والمحفوظات | UserProfilePage | localStorage | نعم | localStorage | لا تُفهرس |
| `#academic-projects` | يُستدعى من UserProfilePage | لا handler له (dead link) | — | — | — | — |

### 5.2 الـslugs الموجودة

**المقالات (12):**
`digital-twin`، `affective-computing`، `emotion-aware-recommendation`، `model-context-protocol-mcp`، `next-token-prediction`، `5g-iot`، `facial-expression-recognition-ai`، `internet-of-things-iot`، `embedded-serial-protocols`، `ai-image-classification`، `5g-nr-radio-architecture`، `smart-ai-ride-pooling`

**المشاريع (14):**
`virtual-board-hand-tracking`، `interactive-children-ai-learning-system`، `remote-controlled-ground-robot`، `robotic-hand-gesture-control`، `syrian-tourism-app`، `employee-presence-tracking`، `exam-computer-vision-monitoring`، `student-university-guide-app`، `ultrasonic-water-level-monitoring-project`، `news-fact-checking-platform`، `face-recognition-access-control-project`، `electronic-voting-system-laravel`، `weapon-detection-yolo-ai`، `ai-children-learning-system`

**الفريق (7):** كما في `src/data/teamData.js`. أول عضو `abdulghani`.

### 5.3 خريطة الـURLs الجديدة (نهائية)

| القديم | الجديد | ملاحظة |
|---|---|---|
| `/` و `/#top` | `/` | |
| `/#projects` | `/projects` | |
| `/#project/<slug>` | `/projects/<slug>` | نفس الـslug |
| `/#articles` | `/articles` | |
| `/#article/<slug>` | `/articles/<slug>` | يطابق الـcanonical المعلن في البيانات |
| `/#videos` | `/videos` | |
| `/#faq` | `/faq` | |
| `/#about` | `/about` | |
| `/#contact` | `/contact` | |
| `/#profile-<id>` | `/team/<id>` | noindex |
| `/#login` و `/#auth` | `/login` | noindex |
| `/#register` | `/register` | noindex |
| `/#my-profile` و `/#favorites` و `/#profile` | `/account` | noindex |
| `/#academic-projects` | `/projects` | |
| `/index.html` | `/` | 301 من الخادم |

- **Trailing slash:** لا (`trailingSlash: false`).
- **Canonical domain:** `https://technoenjaz.com` (بدون www).
- الصور تبقى على مساراتها الحالية (`/articles/<slug>.png` و `/projects/<slug>.png`). لا تتعارض مع صفحات `/articles/<slug>` لأن الصور بامتداد.

---

## 6. Content/Data Architecture

### 6.1 الحالية
- **المقالات:** metadata في TS + markdown في `src/content/articles/<slug>.md`. الحقول: id و slug (متطابقان) و title و titleEn و seoTitle و metaDescription و canonical (خاطئ) و category و categoryEn و categoryColor و image و publishDate (نص عربي) و publishDateEn و readTime و readTimeEn و author (فريق، مع صورة abdulghani) و excerpt و excerptEn و rawMarkdown و content[] (غير معروض) و tags و initialLikes و initialComments. **الـbody بالعربية فقط.**
- **المشاريع:** كل شيء داخل `projectsData.ts`. مشاريع طلابية "بمساعدة تكنو إنجاز"، بلا client ولا تاريخ ولا live link.
- **Reels:** 7 عناصر في `projectReelsData.ts`، كل منها بـ`liveUrl` على pages.dev.
- **Videos (الرئيسية):** 3 فيديوهات YouTube مكتوبة داخل `VideosSection.tsx`، بدون تاريخ رفع.
- **الفريق:** 7 أعضاء (placeholder).
- **FAQ:** 13 سؤالاً داخل الـcomponent.
- **معلومات المؤسسة:** موزعة ومتضاربة بين index.html و translations و FAQ و ContactPage و README و llms.txt.

### 6.2 المستهدفة (بعد الترحيل)

```text
src/
  config/site.ts                      ← single source: domain, org facts, flags
  content/
    articles/<slug>.md                ← unchanged
    articles/<slug>-seo.md            ← unchanged (internal, never imported)
    projects/<slug>.md                ← NEW: extracted verbatim from projectsData.ts
  data/
    blogArticlesData.ts               ← metadata only (+ publishedAt ISO, − canonical, − rawMarkdown import)
    projectsData.ts                   ← metadata only (− markdownContent)
    faqData.ts                        ← NEW: moved verbatim from FaqSection.tsx
    videosData.ts                     ← NEW: moved verbatim from VideosSection.tsx
    projectReelsData.ts, teamData.js  ← unchanged
  lib/
    content/articles.ts               ← server-only loaders
    content/projects.ts               ← server-only loaders
    markdown.ts                       ← server-only renderMarkdown()
    text.ts                           ← plainExcerpt(), projectTags()
  seo/
    metadata.ts                       ← buildMetadata() helpers
    jsonld.ts                         ← schema builders
    JsonLd.tsx                        ← <script type="application/ld+json">
```

---

## 7. Article Architecture (المستهدفة)

```text
/articles (SSG, Server Component)
  → getAllArticles() metadata only
  → <ArticlesListing articles={meta[]}>  (client: search/filter/sort/likes)
      → each card: <h2><Link href="/articles/<slug>">title</Link></h2> (stretched link)

/articles/[slug] (SSG, generateStaticParams, dynamicParams=false)
  → getArticle(slug) → renderMarkdown(md) → { html, toc }  (server only)
  → generateMetadata → title/description/canonical/OG article
  → <JsonLd BlogPosting + BreadcrumbList>
  → <ArticleDetailView article={clientMeta} toc={toc} related={related}>   (client shell)
        <ArticleBody html={html} />                                          (server)
     </ArticleDetailView>
```

- **Related articles:** نفس `categoryEn` أولاً، ثم عدد الـtags المشتركة، ثم الأحدث (`publishedAt` تنازلياً). 3 عناصر.
- **التاريخ:** `publishedAt` بصيغة ISO. التواريخ المشتقة من `publishDateEn` الحالي:
  - `2026-09-20`: ‏digital-twin و affective-computing و emotion-aware-recommendation و model-context-protocol-mcp و next-token-prediction.
  - `2026-09-21`: البقية (7 مقالات).
- **Author:** "فريق تكنو إنجاز الهندسي" = Organization (نفس `@id` المؤسسة). لا Person.

## 8. Project Architecture (المستهدفة)

```text
/projects (SSG) → <ProjectsCatalog projects={meta[]}> (client filters) → <Link href="/projects/<slug>">
/projects/[slug] (SSG) → getProject(slug) → renderMarkdown(md, stripLeadingH1) → single H1
  → <JsonLd CreativeWork(contributor=Org) + BreadcrumbList>
  → <ProjectDetailView project={clientMeta} toc related><ProjectBody html/></ProjectDetailView>
```

- **Excerpt:** يُعرض عبر `plainExcerpt()`، التي تحذف تعليقات HTML ورموز markdown.
- **Tags:** عبر `projectTags()`، التي تحذف أسماء أنواع schema. إذا لم تبقَ وسوم، **لا يُعرض قسم الوسوم**.
- **Related:** يبقى منطق `getRelatedProjects` الحالي (نفس الفئة أولاً).

## 9. Authentication / Private Pages

- الـauth الحالي mock ويبقى **وظيفياً كما هو** في هذا الترحيل. كل مفاتيح localStorage تبقى.
- `/login` و `/register`: ‏SSG، و `robots: noindex, follow`، وخارج الـsitemap.
- `/account`:
  - الصفحة SSG وتعرض skeleton فقط، مع noindex.
  - Client component يقرأ المستخدم بعد mount.
  - إذا لم يوجد مستخدم: يحفظ مسار العودة ثم `router.replace('/login')`.
- الـnavbar: الخادم وأول render في المتصفح يعرضان "تسجيل الدخول"، ثم يتحدث الزر بعد mount.
- **مفتاح العودة:** الجديد `techno_auth_return_path` (pathname + search + hash). عند القراءة: إذا لم يوجد، يُقرأ `techno_auth_return_hash` القديم ويُحوَّل عبر خريطة 5.3.
- **مستقبلاً:** المصادقة الحقيقية تُضاف وفق القسم 12.

---

## 10. Rendering Analysis

| المعيار | الواقع | الاستنتاج |
|---|---|---|
| مصدر البيانات | ملفات TS و MD داخل الـrepo | معروفة وقت البناء، إذن SSG |
| تكرار التحديث | commits يدوية | إعادة البناء والنشر عند كل push تكفي |
| البيانات الحية | لا يوجد | لا حاجة لـSSR اليوم |
| التخصيص حسب المستخدم | localStorage فقط | Client Components داخل صفحات SSG |
| Backend | لا يوجد | لا يوجد ما يُعرض per-request |
| المكونات | تعمل في Node (probe) | الترحيل بدون إعادة كتابة |
| التفاعل | عالٍ جداً (WebGL و GSAP و framer) | الـClient Components تُعرض على الخادم أولاً ثم تُفعَّل (hydrate) |
| المستقبل | مصادقة حقيقية، تعليقات بـbackend، CMS محتمل | ‏ISR و SSR جاهزان في البنية التحتية من اليوم |

## 11. Architecture Options (ملخص المقارنة)

| الخيار | الحكم | السبب |
|---|---|---|
| **Next.js App Router على Cloudflare Workers (OpenNext)** | **مختار** | ‏SSG و ISR و SSR لكل route في إطار واحد. الـRSC تبقي المحتوى الثقيل على الخادم. ‏Metadata API و sitemap و robots و manifest مدمجة. البقاء على Cloudflare (الدومين هناك). الترقية لاحقاً تغيير إعداد لكل route |
| React + Vite + prerender مخصص | مرفوض | يحقق SSG فقط. أي SSR أو ISR لاحقاً يعني إعادة بناء المعمارية، والمالك يريد قراراً واحداً للمستقبل |
| Astro + React Islands | مرفوض | الـContext (theme و lang و auth) يمر عبر كل الشجرة، والـislands لا تتشاركه. أغلب الصفحة تفاعلية، فالتوفير محدود والخطر البصري عالٍ |
| Next.js بـ`output: 'export'` | مرفوض | يغلق باب SSR و ISR نهائياً |
| Next.js على Vercel | بديل صالح | المالك اختار Cloudflare |
| SSR لكل الصفحات | مرفوض | تكلفة وزمن استجابة لكل طلب بلا فائدة SEO، فالمحتوى ثابت |
| CSR (الحالي) | مرفوض | لا يصلح للـSEO |

## 12. Final Architecture Decision + دليل التحويل المستقبلي

### 12.1 القرار
- **Framework:** Next.js App Router. ثبّت الإصدار في P1: أحدث إصدار stable تدعمه `@opennextjs/cloudflare` حسب جدول التوافق في توثيقها.
- **Runtime:** Cloudflare Workers، ‏Node.js compatibility (`nodejs_compat`). **ممنوع** `export const runtime = 'edge'` في أي ملف.
- **Cache infrastructure (تُجهَّز في P1 وتبقى دائماً):**
  - Incremental cache: ‏R2 + regional cache.
  - Tag cache: ‏D1 (لـ`revalidatePath` و `revalidateTag`).
  - Queue: ‏Durable Object (للـISR الزمني).
- **كل route يعلن طريقة rendering صراحة في ملفه.** لا اعتماد على الاستنتاج التلقائي.

### 12.2 دليل التحويل (Future Playbook)

| الحالة المستقبلية | الـroutes المتأثرة | التغيير المطلوب فقط |
|---|---|---|
| مقالات أو مشاريع من CMS أو API بدل الملفات | `/articles/[slug]` و `/articles` و `/projects/[slug]` و `/projects` | `export const revalidate = 3600`، و `dynamicParams = true`، وتغيير loader واحد في `src/lib/content/*`. للتحديث الفوري: webhook إلى route handler ينفّذ `revalidatePath` |
| مصادقة حقيقية بـhttpOnly cookie | `/account` (و `/login` للـredirect) | `export const dynamic = 'force-dynamic'` + قراءة `cookies()` في الـpage |
| إعجابات وتعليقات على backend | صفحات المقالات والفيديو | الصفحة تبقى SSG. ‏Route Handlers في `src/app/api/*` مع fetch من Client Component |
| صفحة تعتمد على الطلب (بحث server-side مثلاً) | الـroute الجديد فقط | `dynamic = 'force-dynamic'` |
| نسخة إنجليزية كاملة للمحتوى | كل الصفحات | ‏`src/app/[lang]/...` + hreflang. **لا يُنفذ الآن** لأن نص المقالات عربي فقط |

---

## 13. Route-by-Route Rendering Matrix

| Route | Rendering | إعداد الملف | HTML الأولي يحتوي | JS / Client | Data | SEO |
|---|---|---|---|---|---|---|
| `/` | SSG | `dynamic='force-static'` | H1 الـhero، وعناوين وروابط أقسام Projects و Videos و Articles، و heading الـAbout، وقائمة الفريق (sr-only)، والـfooter | ScrollExpand و InfiniteSpiral و CardSwap و MagicBento و footer. ‏Orb و InfiniteMenu و TeamMomentsRing بـ`ssr:false` عند الاقتراب | translations و projects و videos و articles | index |
| `/projects` | SSG | force-static | H1، و14 بطاقة `<a>` (عنوان ومقتطف وتصنيف وصورة) | الفلاتر والبحث والحفظ | projects meta | index |
| `/projects/[slug]` | SSG | force-static + generateStaticParams + `dynamicParams=false` | H1 واحد، و lead، و roleQualifier، ونص كامل، و TOC، و related `<a>` | الحفظ والمشاركة و TOC scrollspy | md + meta | index |
| `/articles` | SSG | force-static | H1، و12 بطاقة `<a>` (عنوان ومقتطف وكاتب و `<time>`) | البحث والفلترة والترتيب والإعجابات | articles meta | index |
| `/articles/[slug]` | SSG | force-static + generateStaticParams + `dynamicParams=false` | H1 و excerpt و author و `<time>` ونص كامل و TOC و tags و related `<a>` و breadcrumbs `<a>` | الإعجابات والتعليقات والحفظ والمشاركة و scrollspy | md + meta | index |
| `/videos` | SSG | force-static | H1 و subtitle، وكل الـreels (عنوان ووصف ورابط live) | scroll-snap والإعجابات والتعليقات | projectReelsData | index |
| `/faq` | SSG | force-static | H1، و**13 سؤالاً وإجابة كاملة** (المغلقة بـ`hidden`) | الـaccordion والبحث | faqData | index + FAQPage |
| `/about` | SSG | force-static | H1 و subtitle وقائمة الفريق | WebGL و canvas بـ`ssr:false` | translations و teamData | index |
| `/contact` | SSG | force-static | H1، والهاتف والبريد و WhatsApp والعنوان كنص، والخريطة iframe lazy | الفورم (mailto) | site.ts و translations | index |
| `/team/[id]` | SSG | force-static + generateStaticParams | محتوى الـprofile | — | teamData | **noindex,follow** |
| `/login` و `/register` | SSG | force-static | واجهة الفورم | الفورم | — | noindex |
| `/account` | SSG shell + client-only | force-static | skeleton | كل المحتوى من localStorage | — | noindex |
| 404 | `not-found.tsx` | — | رسالة وروابط رئيسية | — | — | noindex، status 404 |
| `/sitemap.xml` | Static | `sitemap.ts` | — | — | الـroutes | — |
| `/robots.txt` | Static | `robots.ts` | — | — | — | — |
| `/manifest.webmanifest` | Static | `manifest.ts` | — | — | — | — |
| `/llms.txt` و `/llms-full.txt` | Static | route handler + `dynamic='force-static'` | — | — | البيانات | — |

## 14. React / Server / Browser Boundaries

1. **`page.tsx` و `layout.tsx` دائماً Server Components.** تحمّل البيانات، وتحوّل الـmarkdown، وتبني الـmetadata و JSON-LD، ثم تمرر للـClient Component **الحقول التي يعرضها فقط**. ممنوع تمرير markdown خام.
2. **جسم المقال أو المشروع:** مكون server `<ArticleBody html />` أو `<ProjectBody html />` يُمرَّر كـ`children` إلى الـView (client).
3. **النصوص التي تتغير بين العربية والإنجليزية** تبقى في Client Components تقرأ `useThemeLanguage()`. الخادم يعرض العربية.
4. **ملفات `src/lib/content/*` و `src/lib/markdown.ts`** تبدأ بـ`import 'server-only'`.
5. **قاعدة الـhydration:** أول render في المتصفح يطابق الخادم حرفياً.
   - ممنوع قراءة `window` أو `document` أو `localStorage` أو `sessionStorage` أو `matchMedia` أو `innerWidth` أو `location` داخل الـrender أو داخل `useState` initializer.
   - القراءة مسموحة فقط داخل `useEffect` أو `useLayoutEffect` أو event handlers.
6. **الـtheme:** يُطبَّق عبر CSS على `[data-theme]` الذي يضبطه سكربت inline قبل الرسم. ممنوع `theme === 'light' ? ... : ...` في inline style أو في `src`.
7. **WebGL و Canvas:** عبر `next/dynamic(() => import(...), { ssr: false })` داخل Client wrapper، مع placeholder بنفس الأبعاد.
8. **`suppressHydrationWarning`** مسموح فقط على `<html>`، لأن السكربت inline يعدّل `data-theme` و `dir` و `lang` و `class`.

---

## 15. UX Strategy

**KEEP (لا يتغير):**
- كل الـlayout والمسافات والخطوط والألوان والـbreakpoints والـanimations والـtransitions.
- GooeyNav (الشريط الأفقي القابل للتمرير على الموبايل) و ScrollExpand hero و InfiniteSpiral و CardSwap و MagicBento و InfiniteMenu و Orb و TeamMomentsRing و CinematicFooter.
- تبديل الـtheme واللغة، والإعجابات والتعليقات والمحفوظات، وسلوك "scroll to top" عند تغيير الصفحة، والـloader على الرئيسية.

**تغييرات مقصودة (كل منها بسبب تقني):**

| التغيير | السبب | التأثير |
|---|---|---|
| الـloader على `/` فقط، ومرة واحدة لكل جلسة (`sessionStorage te_loader_seen`) | زائر قادم من البحث إلى مقال لا يجب أن ينتظر 2.5s، و LCP | تحسّن. الـflag `LOADER_MODE` في `site.ts` يعيد السلوك القديم |
| URLs حقيقية بدل hash | الـSEO، وزر Back، وفتح في tab جديد، والمشاركة | الشكل لا يتغير |
| إخفاء وسوم المشاريع الخاطئة | تعرض أسماء schema للمستخدم | إزالة نص خاطئ |
| H1 واحد في المشروع | H1 مكرر حالياً | العنوان الظاهر لا يتغير، يُحذف التكرار من الـbody فقط |
| Related articles مرتبة منطقياً | الحالي "أول 3" عشوائي | روابط داخلية أفضل |

**تبديل اللغة بدون وميض:** إذا خزّن المستخدم `en`، يضيف السكربت inline على `<html>` الـattribute `data-lang-pending`، وقاعدة CSS تخفي `#app-root` حتى يبدّل الـProvider اللغة ويحذف الـattribute (خلال أجزاء من الثانية). الـcrawlers لا تملك localStorage فلا تتأثر.

## 16. Performance Strategy

| البند | الإجراء | الهدف |
|---|---|---|
| Content JS | الـmarkdown والبيانات الكاملة و `marked` على الخادم فقط | لا وجود لأي markdown في client chunks |
| Code splitting | تلقائي لكل route في Next | صفحة المقال لا تحمّل كود الرئيسية |
| WebGL و Canvas | ‏`next/dynamic({ ssr:false })` + `useInView(rootMargin '400px')` لـ Orb و InfiniteMenu و TeamMomentsRing | لا تحميل قبل الحاجة |
| Deps | حذف three و page-flip و pdfjs-dist | — |
| Fonts | ‏`next/font/google` لـReadex Pro (arabic و latin، الأوزان 300 إلى 800)، مع حذف `<link>` و `@import` | self-hosted، بلا تحميل مزدوج |
| Images | سكربت sharp وقت البناء يولّد `.w640.webp` و `.w1280.webp` + مكون `ResponsiveImage` بـsrcset و width و height. `images.unoptimized: true` | صور أصغر بـ80–90% |
| LCP | ‏hero و banner المقال: `fetchPriority="high"` و eager | LCP < 2.5s |
| CLS | ‏width و height لكل صورة، و placeholders للـcanvas | CLS < 0.1 |
| INP | استبدال 38 inline theme style بـCSS vars | تبديل theme أسرع |
| Caching | ‏`/_next/static/*` بكاش immutable (افتراضي في Next). الصفحات من الـincremental cache | — |

## 17. SEO Strategy

- **Canonical:** `https://technoenjaz.com` + path، بدون trailing slash، في كل صفحة عبر `alternates.canonical`.
- **Head لكل صفحة:**
  - `title` (بالقالب `%s | تكنو إنجاز`، والرئيسية بعنوان كامل مخصص) و `description`.
  - `robots` (index أو noindex حسب القسم 13).
  - `openGraph`: ‏type (`website` أو `article`) و title و description و url و images (مطلقة) و `locale: 'ar_SY'` و siteName.
  - `twitter`: ‏`card: 'summary_large_image'` و title و description و images.
  - **يُحذف:** `keywords`، و `og:locale:alternate`، و `twitter:site` و `twitter:creator` (إلى أن يؤكد المالك حساب X).
  - **يبقى:** geo meta tags (`geo.region SY-HM`، `geo.placename`، `geo.position`، `ICBM`) و `theme-color #030712`، عبر `metadata.other` و `viewport`.
- **العناوين والأوصاف:**
  - المقالات: `seoTitle` و `metaDescription`.
  - المشاريع: `seoTitle` و `metaDesc`.
  - الرئيسية: title و description الحاليان من index.html حرفياً.
  - باقي الصفحات: من `translations.ar` (عنوان الصفحة و subtitle). إن لم يوجد نص مناسب، استخدم النص الحالي من index.html للرئيسية، **ولا تخترع نصاً تسويقياً جديداً.** إذا لزم وصف غير موجود، اتركه بقيمة الرئيسية وسجّله في `docs/owner-todo.md`.
- **Semantic HTML:**
  - H1 واحد لكل صفحة.
  - في `/about` يكون عنوان About هو H1، وفي الرئيسية H2.
  - الـbreadcrumbs `<nav aria-label><ol>` بروابط `<a>`.
  - التواريخ `<time dateTime>`.
  - `<main id="main-content">` واحد في الصفحة.
- **Internal linking:** كل بطاقة وكل عنصر related وكل breadcrumb وكل رابط footer أو nav أو CTA هو `<a href>` عبر `next/link`.
- **Sitemap:** 33 URL:
  - `/` و `/projects` و 14 مشروعاً و `/articles` و 12 مقالاً و `/videos` و `/faq` و `/about` و `/contact`.
  - `lastModified` للمقالات فقط (`modifiedAt ?? publishedAt`). لا `priority` ولا `changefreq`.
- **robots.txt:** `User-agent: *` + `Allow: /` + `Sitemap: https://technoenjaz.com/sitemap.xml`. لا Disallow لصفحات noindex (Google يحتاج الزحف ليقرأ noindex).
- **404:** حقيقي، مع status 404 (`dynamicParams=false` + `not-found.tsx`).

## 18. GEO Strategy

- **مصدر حقيقة واحد:** `src/config/site.ts` يغذي الـUI و JSON-LD و llms.txt و Contact.
- **Organization** (`@id: https://technoenjaz.com/#organization`)، النوع `["Organization","ProfessionalService"]`:
  - `name`: "تكنو إنجاز"، و `alternateName`: "Techno Enjaz"، و `url`، و `logo`: `https://technoenjaz.com/techno-logo.png`.
  - `telephone`: `+963958794195`، و `email`: `info@technoenjaz.com`.
  - `address`: ‏`addressLocality: "حماة"`، و `addressRegion: "حماة"`، و `addressCountry: "SY"`. ‏`streetAddress` **فقط بعد تأكيد المالك** (انظر القسم 26).
  - `geo`: ‏`35.128992, 36.754001` (موجودة ومتسقة في index.html و README و llms)، و `hasMap` (الرابط الموجود في index.html).
  - `sameAs`: `["https://instagram.com/TECHNO_ENJAZ"]` فقط.
  - `contactPoint`: ‏`{ "@type": "ContactPoint", "telephone": "+963958794195", "email": "info@technoenjaz.com", "contactType": "customer service", "availableLanguage": ["ar","en"] }`.
  - **يُحذف:** `priceRange`، و wa.me من sameAs.
- **WebSite** (`@id: .../#website`): ‏`publisher → #organization`، و `inLanguage: "ar"`.
- **المقالات:** ‏author و publisher = `{ "@id": "https://technoenjaz.com/#organization" }`.
- **المشاريع:** ‏`contributor = #organization`. لا `creator`، لأنها مشاريع طلابية بمساعدة المكتب.
- **الفريق:** لا Person entities. صفحات noindex، وقائمة الفريق تُحذف من llms.txt.
- **llms.txt و llms-full.txt:** يُولَّدان من البيانات:
  - معلومات المؤسسة من `site.ts`.
  - كل المقالات (عنوان ورابط و metaDescription).
  - كل المشاريع (عنوان ورابط و metaDesc).
  - المنصات الحية (reels: عنوان و liveUrl ووصف).
  - الصفحات الرئيسية.
  - `llms-full.txt` يضيف المقتطفات و FAQ كاملاً.
- **بديل الـcanvas:** قائمة `<ul class="sr-only">` بأسماء الفريق وروابط `/team/<id>`.

## 19. AEO Strategy

- **FAQ:** الإجابات الـ13 كلها في HTML. ‏`FAQPage` JSON-LD على `/faq` فقط، من `faqData` بنص **مطابق حرفياً** للنص المرئي بالعربية (plain text).
- **المقالات:** بنيتها الحالية سؤال وإجابة مباشرة. نحافظ على:
  - ids ثابتة للـH2 و H3 (`sec-<n>-<slug>` بنفس الخوارزمية الحالية).
  - الـTOC كروابط `<a href="#id">`.
  - الـexcerpt كـlead `<p>` تحت H1.
- **Contact و About:** الحقائق كنص قابل للاستخراج (المدينة، الهاتف، البريد، الخدمات كما وردت في translations و FAQ).
- **لا محتوى مصطنع.**

---

## 20. Migration Strategy (ترتيب الاعتماديات)

```text
P0  Baseline & safety net
P1  Next.js + OpenNext scaffold + cache infrastructure
P2  Single sources of truth (site config, content, markdown)
P3  Client boundaries + hydration safety
P4  Root layout + App shell + navigation
P5  Routes (all pages, SSG)
P6  Crawlability (links, FAQ, canvas fallbacks, H1s)
P7  SEO / GEO / AEO (metadata, JSON-LD, sitemap, robots, llms)
P8  Loader + Performance (images, fonts, lazy WebGL)
P9  Accessibility
P10 Favicon & manifest
P11 Full validation
P12 Deploy & cutover
```

**لماذا هذا الترتيب:**
- P2 و P3 تجعل المكونات جاهزة للخادم قبل إنشاء الـroutes.
- P4 قبل P5 لأن كل الصفحات تعتمد على الـshell.
- الـSEO في P7 يُبنى فوق rendering مكتمل، وليس بدلاً عنه.

---

## 21. Detailed Coding-Agent Implementation Plan

> **قبل كل مرحلة:** اقرأ الملفات المذكورة كاملة.
> **بعد كل مرحلة:** نفّذ `npm run build` و `npm run lint` واختبارات المرحلة، ثم commit.
> **ممنوع:** تعديل قيم CSS أو نصوص المحتوى إلا حيث تنص الخطة صراحة.

### P0 — Baseline & Safety Net

**Goal:** تجميد الوضع الحالي للمقارنة.
**Files:** `tests/visual/*`، و `playwright.config.ts`، و `docs/baseline.md`، و `docs/url-inventory.json`.
**Actions:**
1. `git checkout -b feat/nextjs-migration`.
2. `npm i -D @playwright/test` ثم `npx playwright install chromium webkit`.
3. `npm run build`، ثم سجّل في `docs/baseline.md` أحجام الـchunks وعدد warnings في lint.
4. أنشئ `tests/visual/baseline.spec.ts` يعمل على `vite preview` (النسخة الحالية):
   - **الـURLs:** `/#top`، و `/#projects`، و `/#project/virtual-board-hand-tracking`، و `/#articles`، و `/#article/digital-twin`، و `/#videos`، و `/#faq`، و `/#about`، و `/#contact`، و `/#profile-abdulghani`، و `/#login`.
   - **المقاسات:** 390×844، و 768×1024، و 1440×900.
   - **التركيبات:** ‏theme (dark و light) × lang (ar و en).
   - **قبل التحميل:** `addInitScript` يضبط `localStorage` (`techno_theme_manual='true'` و `theme` و `techno_theme` و `techno_lang`).
   - **إخفاء الـloader:** `addStyleTag('#te-loader{display:none!important}')`.
   - **تثبيت الحركة:** `reducedMotion: 'reduce'`، ثم انتظار `document.fonts.ready` و 1500ms.
   - **اللقطات:** للـviewport، و fullPage للمقال والمشروع و FAQ.
   - **الحفظ:** في `tests/visual/__baseline__/` مع commit.
5. `scripts/inventory-urls.mjs` يكتب `docs/url-inventory.json` بالـslugs في القسم 5.2.

**Validation:** كل اللقطات موجودة، والـinventory فيه 12 و14 و7 عناصر.
**Risks:** عدم ثبات الـanimations. الحل: reducedMotion + `mask` على عناصر canvas.

### P1 — Next.js + OpenNext Scaffold + Cache Infrastructure

**Goal:** مشروع Next.js يعمل على workerd محلياً، مع بنية ISR و SSR جاهزة.
**Files:** `package.json`، و `next.config.ts`، و `open-next.config.ts`، و `wrangler.jsonc`، و `tsconfig.json`، و `.gitignore`، و `src/app/layout.tsx` و `src/app/page.tsx` (placeholder مؤقت).

**Actions:**
1. **Dependencies:**
   ```bash
   npm i next@<PINNED> react@^19 react-dom@^19
   npm i -D @opennextjs/cloudflare@<PINNED> wrangler@<PINNED> @playwright/test @axe-core/playwright linkedom sharp @next/bundle-analyzer server-only
   npm uninstall vite @vitejs/plugin-react three @types/three page-flip @types/page-flip pdfjs-dist
   ```
   `<PINNED>`: أحدث إصدارات متوافقة حسب توثيق `@opennextjs/cloudflare`. سجّلها في `docs/baseline.md`.
2. **حذف ملفات Vite (بعد نقل محتواها):**
   - `vite.config.ts` و `tsconfig.node.json`.
   - `index.html` (بعد نسخ محتوى الـhead والسكربتات إلى `docs/legacy-index-head.html` كمرجع).
   - `src/main.tsx`.
3. **`tsconfig.json`** (ملف واحد):
   ```jsonc
   {
     "compilerOptions": {
       "target": "ES2022", "lib": ["dom", "dom.iterable", "ES2023"],
       "allowJs": true, "skipLibCheck": true, "strict": false,
       "noEmit": true, "esModuleInterop": true, "module": "esnext",
       "moduleResolution": "bundler", "resolveJsonModule": true,
       "isolatedModules": true, "jsx": "preserve", "incremental": true,
       "plugins": [{ "name": "next" }],
       "paths": { "@/*": ["./src/*"] }
     },
     "include": ["next-env.d.ts", "src/**/*", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules", ".open-next", "demo", "theme"]
   }
   ```
   **ملاحظة:** `strict: false` يطابق المشروع الحالي (لم يكن strict). لا تفعّله في هذا الترحيل.
4. **الـimports ذات الامتداد الصريح:** عدّل `import App from './App.tsx'` و `import AuthSwitch from './components/ui/auth-switch.tsx'` بحذف الامتداد. ابحث عن غيرها: `grep -rn "from '.*\.tsx'" src`.
5. **`next.config.ts`:**
   ```ts
   import type { NextConfig } from 'next';
   import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

   const nextConfig: NextConfig = {
     trailingSlash: false,
     images: { unoptimized: true },
     poweredByHeader: false,
     async redirects() {
       return [{ source: '/index.html', destination: '/', permanent: true }];
     },
   };
   export default nextConfig;
   initOpenNextCloudflareForDev();
   ```
6. **`open-next.config.ts`** (تحقق من مسارات الـimports مقابل توثيق الإصدار المثبت، صفحة "Caching"):
   ```ts
   import { defineCloudflareConfig } from '@opennextjs/cloudflare';
   import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
   import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
   import d1NextTagCache from '@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache';
   import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

   export default defineCloudflareConfig({
     incrementalCache: withRegionalCache(r2IncrementalCache, { mode: 'long-lived' }),
     tagCache: d1NextTagCache,
     queue: doQueue,
   });
   ```
7. **`wrangler.jsonc`:**
   ```jsonc
   {
     "$schema": "node_modules/wrangler/config-schema.json",
     "name": "technoenjaz",
     "main": ".open-next/worker.js",
     "compatibility_date": "<DATE_OF_P1>",
     "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
     "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },
     "services": [{ "binding": "WORKER_SELF_REFERENCE", "service": "technoenjaz" }],
     "r2_buckets": [{ "binding": "NEXT_INC_CACHE_R2_BUCKET", "bucket_name": "technoenjaz-next-cache" }],
     "d1_databases": [{ "binding": "NEXT_TAG_CACHE_D1", "database_name": "technoenjaz-tag-cache", "database_id": "<FROM wrangler d1 create>" }],
     "durable_objects": { "bindings": [{ "name": "NEXT_CACHE_DO_QUEUE", "class_name": "DOQueueHandler" }] },
     "migrations": [{ "tag": "v1", "new_sqlite_classes": ["DOQueueHandler"] }],
     "observability": { "enabled": true }
   }
   ```
   أنشئ الموارد:
   ```bash
   npx wrangler r2 bucket create technoenjaz-next-cache
   npx wrangler d1 create technoenjaz-tag-cache
   ```
   تهيئة جدول الـD1 تتم حسب توثيق OpenNext (أمر أو migration). اتبعه حرفياً.
8. **`package.json` scripts:**
   ```json
   {
     "dev": "next dev",
     "build": "node scripts/optimize-images.mjs && next build",
     "preview": "npm run build && opennextjs-cloudflare build && opennextjs-cloudflare preview",
     "deploy": "npm run build && opennextjs-cloudflare build && opennextjs-cloudflare deploy",
     "lint": "oxlint",
     "typecheck": "tsc --noEmit",
     "verify": "node scripts/verify-site.mjs",
     "test:e2e": "playwright test"
   }
   ```
   حتى تُكتب في P8، اجعل `scripts/optimize-images.mjs` placeholder يخرج بـ0.
9. **`.gitignore`:** أضف `.next`، و `.open-next`، و `.wrangler`، و `public/_img`، و `next-env.d.ts`.
10. **Placeholder:**
    - `src/app/layout.tsx`: ‏`<html lang="ar" dir="rtl"><body>{children}</body></html>`.
    - `src/app/page.tsx`: ‏`<h1>ok</h1>`.

**Rendering:** لا شيء نهائي بعد.
**Validation:**
- `npm run build` ينجح.
- `npm run preview` يفتح `http://localhost:8787` ويعرض `ok`.
- `curl -s localhost:8787/ | grep '<h1>ok'`.

**Risks:** عدم توافق الإصدارات. الحل: اتبع جدول التوافق في توثيق OpenNext.

### P2 — Single Sources of Truth

**Goal:** مصدر واحد للمؤسسة والمحتوى، و markdown يُعالج على الخادم.
**Files:**
- جديدة: `src/config/site.ts`، و `src/lib/content/articles.ts`، و `src/lib/content/projects.ts`، و `src/lib/markdown.ts`، و `src/lib/text.ts`، و `src/content/projects/*.md`، و `src/data/faqData.ts`، و `src/data/videosData.ts`، و `scripts/extract-project-markdown.mjs`.
- معدّلة: `src/data/blogArticlesData.ts`، و `src/data/projectsData.ts`، و `FaqSection.tsx`، و `VideosSection.tsx`.

**Actions:**
1. **`src/config/site.ts`:**
   ```ts
   export const SITE_URL = 'https://technoenjaz.com';
   export const ORG_ID = `${SITE_URL}/#organization`;
   export const WEBSITE_ID = `${SITE_URL}/#website`;
   export const LOADER_MODE: 'home-first-visit' | 'always' | 'off' = 'home-first-visit';
   export const ORG = {
     nameAr: 'تكنو إنجاز',
     nameEn: 'Techno Enjaz',
     logo: `${SITE_URL}/techno-logo.png`,
     telephone: '+963958794195',
     email: 'info@technoenjaz.com',
     instagram: 'https://instagram.com/TECHNO_ENJAZ',
     whatsapp: 'https://wa.me/963958794195',
     address: {
       streetAddress: null as string | null, // OWNER MUST CONFIRM (see section 26)
       addressLocality: 'حماة', addressRegion: 'حماة', addressCountry: 'SY',
     },
     geo: { latitude: 35.128992, longitude: 36.754001 },
     hasMap: "https://www.google.com/maps/place/35%C2%B007'44.4%22N+36%C2%B045'14.4%22E/@35.1289918,36.7561901,17z",
     descriptionAr: '<copy verbatim from current index.html Organization.description>',
   } as const;
   export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;
   ```
   - `absoluteUrl('/')` يرجع `https://technoenjaz.com`.
   - الـcanonical للرئيسية: `https://technoenjaz.com/` (Next يضيف `/` للجذر).
2. **استخراج markdown المشاريع:**
   - `scripts/extract-project-markdown.mjs` يستورد `PROJECTS_DATA` (عبر `tsx` أو نسخ مؤقت) ويكتب كل `markdownContent` **حرفياً** إلى `src/content/projects/<slug>.md` (UTF-8، بدون BOM).
   - بعد الكتابة يقارن SHA-256 للنص الأصلي والملف، ويفشل عند أي اختلاف.
   - ثم احذف الحقل `markdownContent` من الـinterface ومن البيانات.
3. **`blogArticlesData.ts`:**
   - احذف الـ12 سطراً `import ... from '../content/articles/*.md?raw'`، والحقل `rawMarkdown`.
   - احذف الحقل `canonical` من الـinterface والبيانات.
   - أضف `publishedAt: string` (ISO date) حسب القسم 7، و `modifiedAt?: string` (غير معرّف حالياً).
   - لا تغيّر أي نص آخر.
4. **`src/lib/content/articles.ts`:**
   ```ts
   import 'server-only';
   import { readFile } from 'node:fs/promises';
   import path from 'node:path';
   import { blogArticlesData, type BlogArticle } from '@/data/blogArticlesData';
   const DIR = path.join(process.cwd(), 'src/content/articles');
   export const getAllArticles = () => blogArticlesData;
   export const getArticleMeta = (slug: string) => blogArticlesData.find(a => a.slug === slug) ?? null;
   export async function getArticleMarkdown(slug: string) { return readFile(path.join(DIR, `${slug}.md`), 'utf8'); }
   export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] { /* section 7 rules */ }
   ```
   - `projects.ts` بنفس النمط، و `getRelatedProjects` يُنقل كما هو.
   - القراءة من `fs` تحدث **وقت البناء فقط** لأن الصفحات SSG. إذا تحولت صفحة إلى ISR مع CMS لاحقاً، يُستبدل الـloader (القسم 12.2).
5. **`src/lib/markdown.ts`:**
   ```ts
   import 'server-only';
   import { Marked, Renderer } from 'marked';
   export interface TocHeading { id: string; text: string; level: number }
   export function renderMarkdown(md: string, opts: { stripLeadingH1?: boolean } = {}) {
     let src = md.replace(/<!--[\s\S]*?-->/g, '');
     src = src.replace(/^(SEO Title|Meta Description|Suggested Slug):.*$/gim, '');
     if (opts.stripLeadingH1 !== false) src = src.replace(/^\s*#\s+[^\r\n]+[\r\n]*/, '');
     const toc: TocHeading[] = []; let i = 0;
     const renderer = new Renderer();
     renderer.heading = function ({ tokens, depth }) {
       const inner = this.parser.parseInline(tokens);
       if (depth !== 2 && depth !== 3) return `<h${depth}>${inner}</h${depth}>`;
       const text = inner.replace(/<[^>]+>/g, '').trim();
       const slug = text.toLowerCase().replace(/[^\w\u0621-\u064A0-9]+/g, '-').replace(/^-+|-+$/g, '');
       const id = `sec-${i++}-${slug || 'heading'}`;
       toc.push({ id, text, level: depth });
       return `<h${depth} id="${id}" class="article-content-heading scroll-mt-offset">${inner}</h${depth}>`;
     };
     renderer.link = function ({ href, title, tokens }) {
       const text = this.parser.parseInline(tokens);
       let h = href.replace(/^#article\//, '/articles/').replace(/^#project\//, '/projects/');
       const ext = /^https?:\/\//.test(h);
       const t = title ? ` title="${title}"` : '';
       return `<a href="${h}"${t}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
     };
     const html = new Marked({ gfm: true, breaks: true, renderer }).parse(src.trim()) as string;
     return { html, toc };
   }
   ```
   - **خوارزمية الـids** مطابقة لـ`ArticleDetailView` الحالي (`sec-${index}-${slug}`، والعدّاد يبدأ من 0).
   - **class الـheading للمشاريع:** `ProjectDetailView` الحالي يستخدم `project-heading-${depth} scroll-mt-offset` وعدّاداً يبدأ من 1. أضف خيار `variant: 'article' | 'project'` يحافظ على class وعدّاد كل نوع كما هو، حتى يبقى الـCSS مطابقاً.
   - **تحقق من signature الـrenderer** في إصدار `marked` المثبت (^18). إذا اختلف `this.parser`، استخدم API الإصدار نفسه.
6. **`src/lib/text.ts`:**
   ```ts
   export const plainExcerpt = (s: string) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').trim();
   const SCHEMA_TYPES = new Set(['WebPage','BreadcrumbList','Organization','ImageObject','CreativeWork','FAQPage','Article','BlogPosting']);
   export const projectTags = (tags: string[]) => tags.filter(t => !SCHEMA_TYPES.has(t));
   ```
   - مقتطف `interactive-children-ai-learning-system` يبدأ بتعليق مقطوع (`"<!-- FEATURED IMAGE ... واج..."` بدون `-->`). أضف قاعدة: إذا بدأ النص بـ`<!--` ولا يحتوي `-->`، استخدم `plainExcerpt(metaDesc)` لهذا المشروع. **لا تعدّل البيانات.**
7. **نقل faqData:** انقل المصفوفة من `FaqSection.tsx` إلى `src/data/faqData.ts` **حرفياً**. استبدل `actionIcon: <Sparkles/>` بـ`actionIconKey: 'sparkles'`، ويبقى map للأيقونات داخل `FaqSection`.
8. **نقل videosList:** انقل `videosList` من `VideosSection.tsx` إلى `src/data/videosData.ts` حرفياً. الصور تُستورد كما هي.
9. **حذف `techno-enjaz.com`** من كل الكود. المصدر الوحيد للدومين `SITE_URL`.

**Validation:**
- `grep -rn "techno-enjaz.com" src` = 0.
- `grep -rn "markdownContent\|rawMarkdown" src` = 0 خارج `lib/content`.
- سكربت التطابق SHA-256 ينجح.
- `npm run typecheck` ينجح.

**Risks:** اختلاف ids الـTOC. الحل: اختبار في P11 يقارن ids الحالية لمقال ومشروع.

### P3 — Client Boundaries + Hydration Safety

**Goal:** كل مكون تفاعلي يعمل كـClient Component، ويعطي نفس النتيجة على الخادم وفي أول render بالمتصفح.
**Files:** كل الملفات في القائمة أدناه، و `src/index.css`، و `src/hooks/useHydrated.ts` و `src/hooks/useInView.ts` و `src/components/ThemedImage.tsx` و `src/components/ClientOnly.tsx` (جديدة).

**Actions:**
1. **أضف `'use client';` كأول سطر في:**
   - `src/context/ThemeLanguageContext.tsx`، و `src/GooeyNav.jsx`، و `src/components/ui/ThemeSwitch.tsx`، و `src/components/ui/LanguageDropdown.tsx`.
   - `src/components/ui/ScrollExpand.tsx`، و `src/pages/ScrollExpandPrototype.tsx` (انقله إلى `src/components/home/HomeHero.tsx`، لأن `src/pages/` محجوز في Next).
   - `src/components/projects/ProjectsSection.tsx`، و `src/components/ui/InfiniteSpiral.tsx`.
   - `src/components/videos/VideosSection.tsx`، و `src/components/videos/CardSwap.tsx`، و `src/components/ui/CardSwap.tsx`، و `src/components/videos/VideoPlayerModal.tsx`، و `src/components/videos/ProjectReelsFeed.tsx`.
   - `src/components/articles/ArticlesSection.tsx`، و `src/components/articles/MagicBento.tsx`، و `src/components/ui/MagicBento.tsx`.
   - `src/components/CinematicFooter.jsx`، و `src/components/CurvedInput.jsx`، و `src/registry/magicui/scroll-progress.jsx`، و `src/components/ui/svg-follow-scroll.tsx`.
   - `src/components/TeamMomentsRing.jsx`، و `src/InfiniteMenu.jsx`، و `src/Orb.jsx`.
   - `src/components/articles/OfficeBlogSection.tsx`، و `src/components/articles/ArticleDetailView.tsx`.
   - `src/components/projects/ProjectsCatalogSection.tsx`، و `src/components/projects/ProjectDetailView.tsx`.
   - `src/components/faq/FaqSection.tsx`، و `src/ContactPage.jsx`، و `src/AuthPage.jsx`، و `src/components/ui/auth-switch.tsx`، و `src/UserProfilePage.jsx`، و `src/ProfilePage.jsx`، و `src/components/SocialButtons.jsx`، و `src/components/ui/button.tsx`.
   - `src/hooks/useSavedProjects.ts` (hook يستخدم state).
   - **مهم:** مجلد `src/pages/` يجب ألا يبقى فيه أي ملف، لأن Next يعامله كـPages Router.
2. **`ThemeLanguageContext`:**
   - `useState<Theme>('dark')` و `useState<Language>('ar')`، بدون initializers تقرأ المتصفح.
   - `useLayoutEffect` عند mount:
     ```ts
     const attr = document.documentElement.getAttribute('data-theme');
     if (attr === 'light' || attr === 'dark') setTheme(attr);
     try { const l = localStorage.getItem('techno_lang'); if (l === 'en' || l === 'ar') setLangState(l); } catch {}
     document.documentElement.removeAttribute('data-lang-pending');
     ```
   - `data-lang-pending` يُحذف **بعد** تطبيق اللغة: في effect يعتمد على `lang` ويعمل بعد أول مزامنة.
   - باقي المنطق (متابعة النظام والحفظ و toggle) يبقى كما هو.
3. **38 inline theme style:**
   - في `App.tsx` (18، وستنتقل إلى AboutTeamSection و AppShell في P4)، و `CinematicFooter.jsx` (7)، و `svg-follow-scroll.tsx` (2)، و `ProjectsSection` و `VideosSection` و `ArticlesSection` و `ScrollExpandPrototype` و `MagicBento` و `TeamMomentsRing` (1 لكل منها).
   - كل تعبير `theme === 'light' ? A : B` داخل `style` يصبح `var(--token)`. عرّف الـtoken في `src/index.css`:
     ```css
     :root, [data-theme='dark'] { --about-bg: #050508; /* B */ }
     [data-theme='light'] { --about-bg: #f8fafc; /* A */ }
     ```
     - سمِّ الـtokens حسب الغرض: `--about-bg`، و `--about-fade-bottom`، و `--team-showcase-bg`، و `--team-showcase-fade-top`، و `--members-badge-bg`، و `--members-badge-border`، وهكذا.
     - **القيم حرفياً كما هي.**
   - **استثناء:** props تُمرَّر إلى canvas أو WebGL (`Orb.backgroundColor`، و `TeamMomentsRing isLight`، و `Skiper19 strokeColor` إن كان مرتبطاً بالـtheme). هذه تبقى من الـContext، لأن مكوناتها client-only وتُعرض بعد mount.
   - للـSVG أو attributes المرتبطة بالـtheme داخل مكونات تُعرض على الخادم: استخدم `currentColor` أو CSS var.
4. **`ThemedImage`:**
   ```tsx
   export function ThemedImage({ dark, light, alt, className, priority }: {...}) {
     return (<>
       <img src={dark.src} width={dark.width} height={dark.height} alt={alt} className={`${className} themed themed--dark`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
       <img src={light.src} width={light.width} height={light.height} alt={alt} className={`${className} themed themed--light`} loading="lazy" decoding="async" />
     </>);
   }
   ```
   ```css
   [data-theme='light'] .themed--dark, :root:not([data-theme='light']) .themed--light { display: none; }
   ```
   - الاستخدام: الـhero (`im3` داكن و `im2` فاتح)، وخلفيات Projects و Videos و Articles (`hero-bg-distortion` داكن و `im1` فاتح).
   - إذا كان `ScrollExpand` يقبل `src` فقط: أضف prop اسمه `media?: ReactNode` يُعرض بدل `<img>` الداخلي، **مع نفس الـclasses والأنماط**. لا تغيّر CSS الـcomponent.
5. **قراءات المتصفح داخل الـrender:**

   | الملف | الحالي | المطلوب |
   |---|---|---|
   | `App.tsx` (ينتقل إلى AppShell) | `useState(() => getLoggedInUser())` | `useState(null)` + `useEffect(() => setCurrentUser(getLoggedInUser()), [])` |
   | `OfficeBlogSection.tsx` | likes و comments من localStorage في initializer | initial من البيانات، و `useEffect` يحمّل localStorage |
   | `ProjectReelsFeed.tsx` | نفس الشيء (`techno_reels_*`) | نفس الحل |
   | `useSavedProjects.ts` | قراءة عند التهيئة | `[]` ثم effect |
   | `ScrollExpandPrototype` (HomeHero) | `getResponsiveConfig(window.innerWidth)` | `getResponsiveConfig(1200)` ثم `useLayoutEffect` يضبط القيمة الحقيقية |
   | `ProjectsSection.tsx` | `isMobile` من innerWidth | `false` ثم `useLayoutEffect` |
   | `ProjectsCatalogSection.tsx` | `activeProject` من hash | يُحذف كلياً في P5 (التفاصيل route مستقل) |
   | `CinematicFooter.jsx` | `gsap.registerPlugin` على مستوى الـmodule | داخل `useEffect` في الـcomponent الرئيسي |

   - **ScrollExpand على الموبايل:** بعد تغيير config يعاد mount مرة واحدة (بسبب `key`). تحقق بصرياً (P11). إذا ظهرت قفزة واضحة: احذف `key`، ومرّر الأبعاد كـCSS custom properties مع media queries بنفس القيم في `getResponsiveConfig`.
6. **Hooks:**
   - `useHydrated()`: يرجع `false` حتى mount.
   - `useInView(ref, { rootMargin: '400px', once: true })`.
   - `<ClientOnly fallback>` يعرض `children` فقط عندما `useHydrated()` true.
7. **الخط:**
   - في layout (P4): ‏`const readex = Readex_Pro({ subsets: ['arabic','latin'], weight: ['300','400','500','600','700','800'], display: 'swap', variable: '--font-readex' })`.
   - استبدل كل `'Readex Pro'` في ملفات CSS بـ`var(--font-readex)` (مع الإبقاء على fallback stack الموجود بعده).
   - احذف السطر الأول `@import url('https://fonts.googleapis.com/...')` من `src/index.css`.

**Validation:**
- `npm run build` بدون `window is not defined` أو `localStorage is not defined`.
- `next dev`: لا تحذيرات hydration في الـconsole لأي صفحة (بعد P5).

**Risks:** مكون ناقص من `'use client'` يسبب خطأ build واضحاً ("useState only works in Client Components"). أضفه.

### P4 — Root Layout + App Shell + Navigation

**Goal:** استبدال `App.tsx` بـlayout و shell، والتنقل بمسارات حقيقية.
**Files:**
- جديدة: `src/app/layout.tsx`، و `src/components/shell/AppShell.tsx`، و `src/components/shell/ScrollToTop.tsx`، و `src/components/about/AboutTeamSection.tsx`، و `src/lib/inline-scripts.ts`.
- معدّلة: `GooeyNav.jsx`، و `CinematicFooter.jsx`، و `authUtils.ts`، و `AuthPage.jsx`، و `UserProfilePage.jsx`، و `ProfilePage.jsx`، و `public/loader/loader.js`.
- محذوفة: `src/App.tsx`.

**Actions:**
1. **`src/lib/inline-scripts.ts`:** يصدّر ثلاثة سكربتات كنصوص.
   ```ts
   export const LEGACY_HASH_REDIRECT = `(function(){try{
     if(location.pathname!=='/')return;var h=location.hash;if(!h)return;
     var map={'#projects':'/projects','#articles':'/articles','#videos':'/videos','#faq':'/faq','#about':'/about','#contact':'/contact','#login':'/login','#auth':'/login','#register':'/register','#my-profile':'/account','#favorites':'/account','#profile':'/account','#academic-projects':'/projects'};
     if(h==='#top'){history.replaceState(null,'','/');return;}
     if(map[h]){location.replace(map[h]);return;}
     var m;
     if((m=h.match(/^#article\\/([a-z0-9-]+)\\/?$/)))location.replace('/articles/'+m[1]);
     else if((m=h.match(/^#project\\/([a-z0-9-]+)\\/?$/)))location.replace('/projects/'+m[1]);
     else if((m=h.match(/^#profile-([a-z0-9-]+)$/)))location.replace('/team/'+m[1]);
   }catch(e){}})();`;
   ```
   - **`THEME_LANG_BOOT`:** انسخ سكربت الـtheme و lang الموجود في `index.html` الحالي **حرفياً**، مع تعديلين:
     - في حالة `savedLang === 'en'` أضف `document.documentElement.setAttribute('data-lang-pending','')`.
     - أضف كتلة الـloader:
       ```js
       var skip = location.pathname!=='/' || sessionStorage.getItem('te_loader_seen')==='1';
       if(skip){document.documentElement.setAttribute('data-skip-loader','');}
       else{sessionStorage.setItem('te_loader_seen','1');}
       ```
       ملفوفة في try.
     - إذا كان `LOADER_MODE` في site.ts بقيمة `'always'`: يُولَّد السكربت بشرط `pathname!=='/'` فقط. وإذا كان `'off'`: `skip=true` دائماً.
2. **`src/app/layout.tsx`:**
   ```tsx
   import './globals-import.css'; // imports '../index.css' first, then nothing else
   export const metadata: Metadata = buildRootMetadata(); // P7
   export const viewport: Viewport = { themeColor: '#030712', width: 'device-width', initialScale: 1, maximumScale: 5 };
   export default function RootLayout({ children }) {
     return (
       <html lang="ar" dir="rtl" suppressHydrationWarning className={readex.variable}>
         <head>
           <script dangerouslySetInnerHTML={{ __html: LEGACY_HASH_REDIRECT }} />
           <script dangerouslySetInnerHTML={{ __html: THEME_LANG_BOOT }} />
           <link rel="stylesheet" href="/loader/loader.css" />
           <script src="/loader/loader.js" defer />
         </head>
         <body>
           <ThemeLanguageProvider>
             <AppShell>{children}</AppShell>
           </ThemeLanguageProvider>
           <JsonLd data={[organization(), website()]} />
         </body>
       </html>
     );
   }
   ```
   - **CSS:** استورد `src/index.css` في layout أولاً. كل مكون يبقى يستورد CSS الخاص به كما هو (App Router يسمح بـglobal CSS imports في أي component).
   - **القاعدة في `index.css`:** `html[data-lang-pending] #app-root{visibility:hidden}`، حيث `#app-root` هو wrapper الـAppShell.
3. **`public/loader/loader.js`:**
   - الـmarkup الموجود حالياً في `index.html` (من `<div id="te-loader">` حتى إغلاقه) يُنقل **حرفياً** إلى template string داخل الـIIFE، ويُنشأ بـ`document.body.insertAdjacentHTML('afterbegin', TEMPLATE)`، **قبل** أي `getElementById`.
   - أول سطر داخل الـIIFE:
     ```js
     if (document.documentElement.hasAttribute('data-skip-loader')) { window.dispatchEvent(new CustomEvent('techno:completed')); return; }
     ```
   - السكربت `defer`، فيعمل بعد تحليل الـHTML وقبل `DOMContentLoaded`. React 19 يتسامح مع عناصر أضافها سكربت خارجي داخل `<body>`.
   - تحقق في P11 من عدم وجود تحذير hydration بسببه. إذا ظهر: أنشئ الـloader داخل `document.documentElement` بدل body، أو استخدم `<div id="te-loader-host" suppressHydrationWarning />` في layout كحاوية فارغة يملؤها السكربت.
4. **`AppShell.tsx` (`'use client'`):** ينقل من `App.tsx` كما هي:
   - `<ScrollProgress className="top-0" />`.
   - الـnavbar بنفس الـmarkup والـclasses:
     - `navItems` تصبح `{ label, href: '/', '/projects', '/videos', '/articles', '/faq', '/about', '/contact' }`.
     - `activeIndex` مشتق من `usePathname()`: `/projects*` = 1، و `/videos` = 2، و `/articles*` = 3، و `/faq` = 4، و `/about` أو `/team/*` = 5، و `/contact` = 6، و `/` = 0. صفحات `/login` و `/register` و `/account` = -1.
     - زر الـauth: ‏`router.push(currentUser ? '/account' : '/login')` بعد حفظ return path.
     - `isPastHero`: نفس المنطق، والشرط `pathname === '/'`.
     - الـclass `is-tab-sticky` عندما `pathname !== '/'`.
   - `<div id="app-root"><main id="main-content">{children}</main></div>`، ويليه `<CinematicFooter key={pathname} />`.
   - مستمع `techno_require_login`: يحفظ return path ثم `router.push('/login')`.
   - مستمعا `techno_auth_updated` و `storage`: كما هما.
   - `isLoaderDone`: `true` فوراً إذا كان `data-skip-loader` موجوداً أو `pathname !== '/'`. غير ذلك، استمع لـ`techno:completed` مع fallback 2700ms (كما هو). يُمرَّر عبر Context صغير `LoaderContext` لأن Orb في AboutTeamSection يحتاجه.
   - `<ScrollToTop />`: عند تغيّر `pathname` (وليس الـhash): `window.scrollTo({ top: 0, behavior: 'smooth' })`.
5. **`GooeyNav.jsx`:** في `handleClick` نفّذ `e.preventDefault()`، وشغّل نفس الـanimation، ثم `router.push(item.href)` بدل `window.location.hash = ...`. الـ`<a href>` يبقى بالمسار الحقيقي (Ctrl+Click يعمل).
6. **`AboutTeamSection.tsx`:** استخرج JSX قسم About من `App.tsx` (مكرر حالياً في السطور 556–733 و 745–922) **حرفياً**، مع:
   - prop `headingLevel: 'h1' | 'h2'`.
   - الـinline styles المرتبطة بالـtheme تصبح CSS vars (P3).
   - `Orb` و `InfiniteMenu` و `TeamMomentsRing` عبر `next/dynamic(..., { ssr: false })` + `useInView` (P8)، مع placeholder بنفس حاوية الأبعاد (الحاويات الحالية لها `height: 100vh` و `minHeight: 700px`، فلا CLS).
   - داخل حاوية `#team-showcase`:
     ```tsx
     <ul className="sr-only">{teamMembers.map(m => <li key={m.id}><Link href={`/team/${m.id}`}>{m.name} — {m.role}</Link></li>)}</ul>
     ```
   - `onSelectMember` من InfiniteMenu يصبح `router.push('/team/' + member.id)`.
   - `onScrollDown` يبقى `scrollToTeam`.
7. **`CinematicFooter.jsx`:** كل `href="#projects"` وما شابهه يصبح مساراً حقيقياً عبر `next/link`. مع `MagneticButton as={Link}`: تأكد أن forwardRef يعمل، وإلا لفّ `Link` داخل `<a>` مخصص.
8. **الـauth:**
   - `authUtils.requireAuth()`: احذف `window.location.hash = '#login'` و `scrollTo`. احفظ `techno_auth_return_path = location.pathname + location.search + location.hash`، ثم أطلق الـevent فقط.
   - `AuthPage`: `onBack` = `router.back()` إذا كان في history، وإلا `router.push('/')`. `onSuccess` = الانتقال لـreturn path أو `/account`.
   - `UserProfilePage`: `onBack` = `router.push('/')`، و `onLogout` = `router.push('/')`، و `onOpenReader` و `onExploreProjects` = `router.push('/projects')`.
   - `ProfilePage.onBack` = `router.push('/about#team-showcase')`.
9. **احذف `src/App.tsx`** بعد نقل كل شيء. تحقق أن لا ملف يستورده.

**Validation:**
- كل عنصر nav ينقل إلى المسار الصحيح، والـactive highlight صحيح.
- Back و Forward يعملان.
- Ctrl+Click على nav يفتح tab جديداً.
- `/#article/digital-twin` يتحول إلى `/articles/digital-twin`، و `/#top` يصبح `/` بدون reload.

**Risks:** الـGSAP ScrollTrigger في الـfooter بعد التنقل. الحل: `key={pathname}` (موجود) + `ScrollTrigger.refresh()` في effect بعد تغيّر pathname.

### P5 — Routes (All Pages, SSG)

**Goal:** إنشاء كل الصفحات بـSSG.
**Files (جديدة):**
```text
src/app/page.tsx
src/app/projects/page.tsx
src/app/projects/[slug]/page.tsx
src/app/articles/page.tsx
src/app/articles/[slug]/page.tsx
src/app/videos/page.tsx
src/app/faq/page.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
src/app/team/[id]/page.tsx
src/app/login/page.tsx
src/app/register/page.tsx
src/app/account/page.tsx
src/app/not-found.tsx
src/components/articles/ArticleBody.tsx
src/components/projects/ProjectBody.tsx
src/components/articles/ArticlesListing.tsx
src/components/account/AccountClient.tsx
```

**قواعد مشتركة لكل ملف page:**
- `export const dynamic = 'force-static';`.
- صفحات `[param]` فقط: `export const dynamicParams = false;` + `generateStaticParams`.
- `generateMetadata` أو `metadata` من `src/seo/metadata.ts` (P7). حتى P7: title و canonical على الأقل.
- JSON-LD الخاص بالصفحة عبر `<JsonLd />` (P7).
- الـwrappers والأنماط المنقولة من App تبقى حرفياً (مثل `tab-page-container` و `style={{ padding: '0', maxWidth: '100%' }}`).

**Actions:**
1. **`/` (`src/app/page.tsx`):**
   ```tsx
   export default function Home() {
     return (<>
       <HomeHero />                 {/* ex ScrollExpandPrototype: Hero + ProjectsSection + VideosSection + ArticlesSection */}
       <AboutTeamSection headingLevel="h2" />
     </>);
   }
   ```
   - في `HomeHero`: الـcallbacks `onNavigateTo*` تُحذف، والأزرار تصبح `<Link>`: "استكشف المشاريع" إلى `/projects`، و"تقديم طلب مشروع" إلى `/contact`. تحتفظ بنفس الـclasses (`cta-button cta-primary` وغيرها).
   - أزرار "عرض الكل" في الأقسام الثلاثة تصبح `<Link>` إلى `/projects` و `/videos` و `/articles`.
2. **`/projects`:**
   - الصفحة (server) تمرر `PROJECTS_DATA` بدون markdown إلى `ProjectsCatalogSection`.
   - في `ProjectsCatalogSection`: احذف state `activeProject` ومستمع الـhash وعرض `ProjectDetailView`. البطاقة تُعرض بـ`<Link href={`/projects/${slug}`}>` على العنوان بنمط stretched link:
     ```css
     .card-title a::after { content: ''; position: absolute; inset: 0; }
     ```
     (الـcard الأب `position: relative`). الأزرار الداخلية (save) تأخذ `position: relative; z-index: 1`. **الشكل لا يتغير.**
   - العنوان H1 الحالي (`catalog-hero-title`) يبقى.
3. **`/projects/[slug]`:**
   ```tsx
   export function generateStaticParams() { return getAllProjects().map(p => ({ slug: p.slug })); }
   export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
     const { slug } = await params;
     const meta = getProjectMeta(slug); if (!meta) notFound();
     const { html, toc } = renderMarkdown(await getProjectMarkdown(slug), { stripLeadingH1: true, variant: 'project' });
     const related = getRelatedProjects(slug, 3).map(toProjectCard);
     return (<>
       <JsonLd data={[projectJsonLd(meta), breadcrumbJsonLd([...])]} />
       <div className="tab-page-container" style={{ padding: '0', maxWidth: '100%' }}>
         <ProjectDetailView project={toProjectClient(meta)} toc={toc} related={related}>
           <ProjectBody html={html} />
         </ProjectDetailView>
       </div>
     </>);
   }
   ```
   - **`ProjectDetailView`:**
     - احذف `useEffect` الخاص بالـSEO (title و meta و canonical و schema) بالكامل.
     - احذف `useMemo` الخاص بـmarked. الـtoc يأتي كـprop، والـbody يأتي كـ`children` في نفس مكان `dangerouslySetInnerHTML` السابق وبنفس الـwrapper والـclass.
     - `onBack` و `onSelectProject` تصبح `<Link>`.
     - الـexcerpt بـ`plainExcerpt()` (يُحسب في الـpage).
     - الوسوم بـ`projectTags()`، والقسم لا يُعرض إذا كانت فارغة.
     - `handleShare` يستخدم `absoluteUrl('/projects/' + slug)`.
     - `window.scrollTo` عند mount يُحذف (ScrollToTop يتكفل).
     - CTA `href="#contact"` يصبح `<Link href="/contact">`.
     - الـbreadcrumb: `<nav aria-label="مسار التصفح"><ol>`: ‏`<Link href="/">`، ثم `<Link href="/projects">`، ثم التصنيف `<span>`، ثم العنوان `aria-current="page"`. **نفس الـclasses الحالية.**
   - **`ProjectBody` (server):**
     ```tsx
     <div className="<existing markdown body class>" dangerouslySetInnerHTML={{ __html: html }} />
     ```
     class الـbody الحالي يُنقل كما هو.
4. **`/articles`:**
   - `OfficeBlogSection` يُقسم إلى:
     - `ArticlesListing` (client): الـhero banner والبحث والفلاتر والترتيب والبطاقات والإعجابات والحفظ والمشاركة. نفس الـJSX.
     - الصفحة (server): تمرر metadata فقط.
   - البطاقة: `<h2 className="card-main-title"><Link href={`/articles/${slug}`}>` (كانت `h3`، والتغيير في الـtag فقط مع نفس الـclass، ويُضاف في CSS `.card-main-title{font-size:<same computed value>}` إذا تأثر الحجم) + stretched link.
   - احذف `onClick={() => setSelectedArticle(article)}`.
   - التاريخ: `<time dateTime={publishedAt}>{publishDate}</time>`.
   - `handleShare`: `absoluteUrl('/articles/' + slug)`.
   - احذف كل منطق `selectedArticle` ومستمع الـhash.
5. **`/articles/[slug]`:** بنفس نمط المشروع.
   - `renderMarkdown(md, { stripLeadingH1: true, variant: 'article' })`.
   - `ArticleDetailView`:
     - احذف useEffect الـSEO و useMemo الـmarked.
     - الـbody عبر `children` داخل wrapper الحالي (`article-fullscreen-markdown-body`).
     - `handleContentClick` يُحذف (الروابط الداخلية أصبحت مسارات، ونقرها يعمل بشكل طبيعي). **للتنقل بدون reload:** أضف handler يعترض `<a>` داخلية تبدأ بـ`/` فينفّذ `router.push`.
     - الـbreadcrumb: ‏`<Link href="/">`، ثم `<Link href="/articles">`، ثم التصنيف `<span>`، ثم العنوان.
     - "العودة للمقالات" تصبح `<Link href="/articles">`.
     - related في الـsidebar: `<Link>` بنمط stretched على العنوان.
     - التاريخ في `<time>`.
     - الإعجابات والتعليقات تنتقل إلى hook جديد `useArticleEngagement(article.id, initialLikes)` (client، localStorage في effect، **نفس المفاتيح**).
6. **`/videos`:**
   ```tsx
   <div className="tab-page-container tab-page-videos" style={...}>
     <div className="tab-page-header reels-page-header" style={...}>
       <h1 className="tab-page-title reels-page-title">...</h1>
       <p>...</p>
     </div>
     <ProjectReelsFeed />
   </div>
   ```
   - الـheader نفسه منقول من App. النص من `translations.ar.videos` في الخادم، أو اجعل الـheader client ليتبع اللغة (الأبسط: client wrapper صغير `VideosHeader`).
   - روابط `liveUrl`: `<a href target="_blank" rel="noopener noreferrer">`.
7. **`/faq`:**
   - `FaqSection` بدون `onNavigateTab`.
   - أزرار الـaction تصبح `<Link href={map[actionTarget]}>` حيث `map = {'#contact':'/contact','#projects':'/projects','#articles':'/articles','#about':'/about'}`، والافتراضي `/`.
   - الإجابة:
     ```tsx
     <div id={`faq-a-${item.id}`} role="region" hidden={!isOpen} className="...existing...">...</div>
     ```
     بدل `{isOpen && ...}`. والزر: `aria-expanded={isOpen} aria-controls={`faq-a-${item.id}`}`.
   - إذا كانت الـanimation تعتمد على mount: أبقِ class `is-open` وأضف CSS `[hidden]{display:none}` (موجودة افتراضياً في المتصفح).
8. **`/about`:** ‏`<AboutTeamSection headingLevel="h1" />`.
9. **`/contact`:**
   - `ContactPage` بدون `onBack` (أو Back إلى `/`).
   - الـiframe: `loading="lazy"` و `title="خريطة موقع تكنو إنجاز"`.
   - كل بيانات التواصل من `ORG` في site.ts.
   - العنوان النصي المعروض يبقى كما في translations.
10. **`/team/[id]`:** ‏`generateStaticParams` من `teamMembers`، وعرض `ProfilePage`، و `metadata.robots = { index: false, follow: true }`.
11. **`/login` و `/register`:** ‏`AuthPage initialMode="login"` و `"register"`، مع noindex.
12. **`/account`:** ‏`AccountClient` (client):
    - `useHydrated()`، ثم قراءة المستخدم.
    - إذا لا يوجد: `router.replace('/login')` بعد حفظ return path `/account`.
    - إذا وُجد: `UserProfilePage`.
    - قبل الـhydration: skeleton بخلفية `var(--bg-main)` و `min-height: 100vh` (نفس fallback الـSuspense الحالي).
    - noindex.
13. **`not-found.tsx`:** H1 "الصفحة غير موجودة"، مع روابط `/` و `/articles` و `/projects` و `/contact`، ونفس الـcontainer classes. noindex.

**Rendering:** كل صفحة HTML كامل وقت البناء.
**Validation:**
- مخرجات `next build` في جدول الـroutes: **كل** الصفحات أعلاه بعلامة `○` (Static) أو `●` (SSG). ‏**`ƒ` (Dynamic) لأي route = FAILURE.**
- `curl -s localhost:8787/articles/digital-twin | grep -c '<h1'` = 1، ويحتوي عنوان المقال.
- `curl -s localhost:8787/projects/virtual-board-hand-tracking | grep -c '<h1'` = 1.
- `curl -s localhost:8787/faq | grep -o 'faq-a-' | wc -l` ≥ 13.
- `curl -o /dev/null -w '%{http_code}' localhost:8787/articles/does-not-exist` = 404.

**Risks:** تمرير props غير قابلة للـserialization (دوال أو JSX) من server إلى client. الحل: الـcallbacks تُستبدل بـ`Link` و `router`، والأيقونات عبر keys.

### P6 — Crawlability

**Goal:** كل تنقل هو `<a href>`، وكل محتوى أساسي موجود في HTML.
**Actions:**
1. **MagicBento** (`src/components/ui/MagicBento.tsx`): ‏`cardProps.onClick` (`window.location.hash = '#article/...'`) يُحذف. داخل البطاقة `<Link href={`/articles/${targetSlug}`} className="magic-bento-card__link">` بنمط stretched على العنوان. زر الحفظ `position: relative; z-index: 2`.
2. **InfiniteSpiral:** في `ProjectsSection` أضف `href: '/projects/' + p.slug` لكل item (الـcomponent يدعم `href` أصلاً). تحقق أن `onClickCapture` لا يمنع التنقل أثناء السحب إلا عند السحب الفعلي (المنطق الحالي). إذا كان `<a>` عادياً، استبدله بـ`Link`.
3. **VideosSection (CardSwap):** البطاقة تفتح modal (يبقى). أضف رابط نصي `<a href={youtubeUrl} target="_blank" rel="noopener">` مخفي بصرياً (sr-only) داخل كل بطاقة، حتى يكون للفيديو رابط قابل للزحف.
4. **فحص شامل:**
   ```bash
   grep -rn "window.location.hash\s*=" src
   grep -rn "location.hash" src
   grep -rn "href=\"#\(projects\|articles\|videos\|faq\|about\|contact\|top\)\"" src
   ```
   **النتيجة يجب أن تكون صفراً.** المسموح فقط روابط TOC (`#sec-...`) و `#team-showcase`.
5. **الـcanvases:** `aria-hidden="true"` على TeamMomentsRing و InfiniteMenu و Orb canvas و loader canvas (موجود).
6. **H1 واحد لكل صفحة:**
   - الرئيسية: H1 في الـhero (`initial-title`)، و `expanded-hero-title` يبقى H2.
   - About في الرئيسية H2، وفي `/about` H1.

**Validation:** ‏`scripts/verify-site.mjs` (P11) + فحص يدوي بـ`curl` لروابط البطاقات.

### P7 — SEO / GEO / AEO

**Goal:** metadata و structured data و sitemap و robots و llms، من البيانات الفعلية.
**Files:** `src/seo/metadata.ts`، و `src/seo/jsonld.ts`، و `src/seo/JsonLd.tsx`، و `src/app/sitemap.ts`، و `src/app/robots.ts`، و `src/app/llms.txt/route.ts`، و `src/app/llms-full.txt/route.ts`. احذف `public/sitemap.xml` و `public/robots.txt` و `public/llms.txt` و `public/llms-full.txt`.

**Actions:**
1. **`metadata.ts`:**
   ```ts
   export function buildRootMetadata(): Metadata {
     return {
       metadataBase: new URL(SITE_URL),
       title: { default: '<current index.html <title> verbatim>', template: '%s | تكنو إنجاز' },
       description: '<current index.html meta description verbatim>',
       applicationName: 'تكنو إنجاز',
       openGraph: { siteName: 'تكنو إنجاز | Techno Enjaz', locale: 'ar_SY', type: 'website', images: [{ url: '/techno-logo.png' }] },
       twitter: { card: 'summary_large_image' },
       robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
       other: { 'geo.region': 'SY-HM', 'geo.placename': 'Hama, Syria', 'geo.position': '35.128992;36.754001', ICBM: '35.128992, 36.754001' },
     };
   }
   export function pageMetadata(o: { title: string; description: string; path: string; image?: string; type?: 'website' | 'article'; publishedTime?: string; modifiedTime?: string; noindex?: boolean; absoluteTitle?: boolean }): Metadata {
     const url = absoluteUrl(o.path);
     const images = [{ url: o.image ?? '/techno-logo.png' }];
     return {
       title: o.absoluteTitle ? { absolute: o.title } : o.title,
       description: o.description,
       alternates: { canonical: url },
       robots: o.noindex ? { index: false, follow: true } : undefined,
       openGraph: { url, title: o.title, description: o.description, type: o.type ?? 'website', images, ...(o.type === 'article' ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime ?? o.publishedTime } : {}) },
       twitter: { card: 'summary_large_image', title: o.title, description: o.description, images: images.map(i => i.url) },
     };
   }
   ```
   **مصادر العناوين والأوصاف:**

   | الصفحة | title | description |
   |---|---|---|
   | `/` | title الحالي في index.html (absolute) | description الحالي |
   | `/articles/[slug]` | `seoTitle` | `metaDescription` |
   | `/projects/[slug]` | `seoTitle` (يحتوي "تكنو إنجاز" أصلاً، فاستخدم absolute) | `metaDesc` |
   | `/articles` و `/projects` و `/videos` و `/faq` و `/about` و `/contact` | من `translations.ar` (مفاتيح `pageTitle` و `heading` الموجودة لكل قسم) | من `translations.ar` (`pageSubtitle` و `subtitle`). إذا غاب: description الرئيسية + سجّل في `docs/owner-todo.md` |
   | `/team/[id]` | اسم العضو | `description` أو `bio` الخاص به (noindex) |
   | `/login` و `/register` و `/account` | من translations | noindex |

2. **`jsonld.ts`:** دوال ترجع كائنات، ويجمعها `<JsonLd data={[...]}/>` في `@graph` واحد لكل صفحة.
   - `organization()` و `website()`: في layout لكل صفحة.
   - `webPage({ path, name, type })`، حيث type من: `WebPage` و `CollectionPage` و `AboutPage` و `ContactPage` و `FAQPage`.
   - `breadcrumb(items: { name, path }[])`: أول عنصر الرئيسية `/`، وآخر عنصر الصفحة الحالية مع `item`.
   - `blogPosting(a)`:
     ```json
     {
       "@type": "BlogPosting", "@id": "<url>#article", "mainEntityOfPage": "<url>",
       "headline": "<title, max 110 chars>", "name": "<seoTitle>", "description": "<metaDescription>",
       "image": "<absolute image>", "datePublished": "<publishedAt>T00:00:00+03:00",
       "dateModified": "<(modifiedAt ?? publishedAt)>T00:00:00+03:00",
       "author": { "@id": "https://technoenjaz.com/#organization" },
       "publisher": { "@id": "https://technoenjaz.com/#organization" },
       "inLanguage": "ar", "articleSection": "<category>",
       "keywords": "<tags joined by ', ' with '_' replaced by ' '>",
       "isPartOf": { "@id": "https://technoenjaz.com/#website" }
     }
     ```
   - `projectWork(p)`: ‏`CreativeWork` بـname (title) و headline (seoTitle) و description (metaDesc) و image مطلقة و url و `inLanguage: 'ar'` و `genre: categoryNameAr` و `contributor: {@id: ORG_ID}`. أضف `keywords` فقط إذا كانت `projectTags(p.tags)` غير فارغة.
   - `itemList(items: { name, path }[])`: لـ`/articles` و `/projects` داخل CollectionPage (`mainEntity`).
   - `faqPage(items)`: ‏`mainEntity: [{ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }]`. النص العربي **حرفياً** من faqData.
   - **ممنوع:** Person، و VideoObject (لا يوجد uploadDate)، و Review، و AggregateRating، و InteractionCounter، و priceRange.
   - **`JsonLd.tsx`:**
     ```tsx
     export function JsonLd({ data }: { data: object[] }) {
       const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': data }).replace(/</g, '\\u003c');
       return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
     }
     ```
3. **`sitemap.ts`:**
   ```ts
   export const dynamic = 'force-static';
   export default function sitemap(): MetadataRoute.Sitemap {
     const s = (p: string) => ({ url: absoluteUrl(p) });
     return [
       s('/'), s('/projects'), ...getAllProjects().map(p => s(`/projects/${p.slug}`)),
       s('/articles'), ...getAllArticles().map(a => ({ url: absoluteUrl(`/articles/${a.slug}`), lastModified: a.modifiedAt ?? a.publishedAt })),
       s('/videos'), s('/faq'), s('/about'), s('/contact'),
     ];
   }
   ```
   **33 URL بالضبط.**
4. **`robots.ts`:**
   ```ts
   export const dynamic = 'force-static';
   export default function robots(): MetadataRoute.Robots {
     return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
   }
   ```
5. **`llms.txt/route.ts` و `llms-full.txt/route.ts`:**
   - `export const dynamic = 'force-static'`، و GET يرجع `text/plain; charset=utf-8`.
   - **المحتوى:**
     - `# Techno Enjaz | تكنو إنجاز` + ملخص من `ORG.descriptionAr`.
     - الهوية (الدومين والهاتف والبريد و Instagram والمدينة).
     - `## Articles`: لكل مقال `- [title](absoluteUrl): metaDescription`.
     - `## Projects`: بنفس الشكل.
     - `## Live Platforms`: من reels (title و liveUrl و description).
     - `## Pages`: الروابط الأساسية.
     - `llms-full` يضيف excerpt كل مقال ومشروع + FAQ كاملاً (سؤال وإجابة).
   - **ممنوع:** قائمة الفريق، وأي stack تقني غير موجود في البيانات.

**Validation:**
- `curl localhost:8787/sitemap.xml | grep -c '<loc>'` = 33.
- كل JSON-LD يمر `JSON.parse`، ويحتوي `@id` المؤسسة نفسه في كل الصفحات.
- validator.schema.org و Google Rich Results Test (بعد النشر) لعينات: `/`، و `/articles/digital-twin`، و `/projects/virtual-board-hand-tracking`، و `/faq`.
- `grep -rn "twitter:site\|keywords\|priceRange" .open-next/assets` = 0.

### P8 — Loader + Performance

> **تحديث:** خطوات الصور هنا (P8.2 و P8.3 و P8.4) **يحل محلها** القسمان R2 (الشعار كـSVG) و R3 (AVIF/WebP + SSIM) في `responsive-plan.md`. نفّذهما بدلاً منها.

**Goal:** تقليل JS والصور، وتأجيل WebGL.
**Actions:**
1. **WebGL و Canvas:**
   ```tsx
   const Orb = dynamic(() => import('@/Orb'), { ssr: false });
   const InfiniteMenu = dynamic(() => import('@/InfiniteMenu'), { ssr: false });
   const TeamMomentsRing = dynamic(() => import('@/components/TeamMomentsRing'), { ssr: false });
   ```
   داخل AboutTeamSection: تُعرض فقط عندما يكون `useInView(containerRef)` true، و Orb يبقى مشروطاً بـ`isLoaderDone` (كما هو).
2. **`scripts/optimize-images.mjs` (sharp):**
   - المصادر: `public/articles/*`، و `public/projects/*`، و `public/projects-live/*`، و `public/moments/*`، و `public/abdulghani.jpg`، و `public/techno-logo.png`.
   - المخرجات: `public/_img/<same relative path without ext>.w640.webp` و `.w1280.webp` (quality 78)، و `public/_img/manifest.json` بالأبعاد الأصلية `{ "/articles/digital-twin.jpg": { w, h } }`.
   - يتخطى الملفات المحدّثة (مقارنة mtime).
   - يعمل ضمن `npm run build` قبل `next build`.
3. **`ResponsiveImage`:**
   ```tsx
   <img src={orig} srcSet={`${w640} 640w, ${w1280} 1280w`} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={className} />
   ```
   - `orig` يبقى المسار الأصلي (fallback و og:image).
   - يُستخدم في: بطاقات المقالات والمشاريع، و banner المقال (priority)، وصورة المشروع (priority)، و related، و reels covers.
4. **صور `src/assets` المستخدمة:** ‏`im1.png` و `im2.png` و `im3.png` و `hero-bg-distortion.png` و `videos/*.png` و `Asset-1@4x.png`.
   - حوّلها **مرة واحدة** إلى `.webp` بنفس الأبعاد (quality 80) بسكربت sharp، وحدّث الـimports.
   - الأصول تبقى في الـrepo إلى نهاية P11، ثم تُحذف في commit مستقل.
   - في Next، import الصورة يرجع كائناً `{ src, width, height }` (StaticImageData). حدّث الاستخدامات إلى `.src` أو مرّرها إلى `ThemedImage`.
5. **حذف ما تبقى من P1 cleanup:** احذف الملفات في القسم 2.1 (باستثناء `*-seo.md`). قبل حذف كل ملف: `grep -rn "<basename>" src` = 0.
6. **Bundle check:**
   ```bash
   ANALYZE=true npm run build
   ```
   مع `withBundleAnalyzer` في `next.config.ts` عند `ANALYZE`.
   - تأكد أن `marked` وملفات `src/content` و `blogArticlesData.rawMarkdown` **غير موجودة** في أي client chunk.
   - `grep -rl "SEO Title:" .next/static` = 0.

**Validation:**
- ‏Lighthouse (mobile) على `/` و `/articles/digital-twin` و `/projects/virtual-board-hand-tracking`: ‏LCP < 2.5s، و CLS < 0.1، و TBT < 300ms. سجّل مقابل baseline.
- الـloader يظهر فقط في أول زيارة لـ`/` في الجلسة.

### P9 — Accessibility

**Actions:**
1. **Skip link** في AppShell قبل الـnavbar:
   ```tsx
   <a href="#main-content" className="skip-link">تخطَّ إلى المحتوى</a>
   ```
   ```css
   .skip-link{position:absolute;inset-inline-start:8px;top:-60px;z-index:100000;padding:10px 14px;background:var(--bg-main);color:var(--text-main);border-radius:8px}
   .skip-link:focus{top:8px}
   ```
2. **`:focus-visible` عام:**
   ```css
   :where(a,button,input,textarea,select,[tabindex]):focus-visible{outline:2px solid #00d2ff;outline-offset:2px}
   ```
3. **`prefers-reduced-motion`:**
   - GSAP (CinematicFooter و MagicBento و CardSwap): `gsap.matchMedia()` أو فحص `matchMedia('(prefers-reduced-motion: reduce)')` داخل effect، وعند reduce تُعطَّل الحركة المستمرة (magnetic و auto-swap و particles) وتبقى الحالة النهائية.
   - framer-motion: `useReducedMotion()`.
   - ScrollExpand: عند reduce يعرض الحالة المتوسعة مباشرة.
   - الـloader يدعمها أصلاً (`reducedQuery`).
4. **`aria-label`** للأزرار الأيقونية: الإعجاب والحفظ والمشاركة و ThemeSwitch و LanguageDropdown وإغلاق الـmodal.
5. **النصوص البديلة:** `alt` من `altText` و title. الصور الزخرفية (خلفيات الأقسام) `alt=""`.
6. **Labels:** `<label htmlFor>` لكل input في Contact و Auth والتعليقات و البحث. إذا كان التصميم لا يعرض label: `className="sr-only"`.
7. **الـmodal (VideoPlayerModal):** ‏`role="dialog"` و `aria-modal="true"`، وإغلاق بـEscape، وإعادة التركيز للعنصر السابق. إذا وُجد بعضها فلا تكرّره.
8. **`<main>` واحد:** `AuthPage` تستخدم `<main className="auth-main-content">`، فغيّرها إلى `<div>` بنفس الـclass. افعل نفس الشيء لأي `<main>` داخلي آخر.

**Validation:** ‏`@axe-core/playwright` على كل صفحة indexable، بدون violations من مستوى serious أو critical. اختبار keyboard: ‏Tab (skip link)، ثم Enter، ثم Tab إلى أول بطاقة، ثم Enter يفتح الصفحة.

### P10 — Favicon & Manifest

> **تحديث:** المالك أضاف الأيقونات و `manifest.webmanifest` في `public/` (commit `68db100`). استخدمها كما هي، واتبع `responsive-plan.md` القسم 0 البند 2. ‏`favicon.svg` يُستبدل في R2.

**Actions:**
1. افحص المجلد المحلي `C:\Users\PC\Downloads\favicons` مباشرة: اسرد الملفات وأبعادها (`sharp(file).metadata()`) وسجّلها في `docs/favicons.md`.
2. **App Router file conventions:**
   - `src/app/favicon.ico` (يجب أن يحتوي 16 و32 و48).
   - `src/app/icon.svg` إن وُجد SVG، وإلا `src/app/icon.png` (96×96 أو 192×192).
   - `src/app/apple-icon.png` (180×180).
   - `public/web-app-manifest-192x192.png` و `public/web-app-manifest-512x512.png`.
3. **`src/app/manifest.ts`:**
   ```ts
   export default function manifest(): MetadataRoute.Manifest {
     return {
       name: 'تكنو إنجاز | Techno Enjaz', short_name: 'تكنو إنجاز', start_url: '/', display: 'standalone',
       dir: 'rtl', lang: 'ar', theme_color: '#030712', background_color: '#030712',
       icons: [
         { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
         { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
       ],
     };
   }
   ```
   أضف `purpose: 'maskable'` فقط إذا كانت أيقونة المجلد مصممة بـsafe zone (المحتوى داخل 80% من المركز).
4. أي مقاس ناقص يُولَّد بـsharp من أكبر PNG أو SVG متاح، مع توثيق ذلك.
5. احذف `public/favicon.svg` (شعار Vite) ورابط `brand.webp`، وتحقق من `public/icons.svg` (هل يُستخدم؟ `grep -rn "icons.svg" src`).

**Validation:**
- كل أيقونة ترجع 200.
- Chrome DevTools ← Application ← Manifest بدون أخطاء.
- الأيقونة تظهر في Chrome و Firefox و Safari، و Add to Home Screen على iOS يُظهر apple-icon.

### P11 — Full Validation

**Goal:** إثبات أن كل شيء يعمل قبل الدمج.
**بيئة الاختبار:** دائماً `npm run preview` (workerd على `localhost:8787`).

**1. `scripts/verify-site.mjs` (linkedom):**
- يجلب `/sitemap.xml` ويستخرج كل URL، ويضيف صفحات noindex (`/login` و `/register` و `/account` و `/team/abdulghani`) و `/this-page-does-not-exist`.
- **لكل صفحة indexable:**
  - status = 200، بدون redirect.
  - `<title>` غير فارغ وفريد عبر كل الصفحات.
  - `meta[name=description]` طولها بين 50 و 200.
  - `link[rel=canonical]` = `https://technoenjaz.com` + path.
  - لا `noindex`.
  - `h1` عددها 1 بالضبط.
  - نص `main` > 300 حرف.
  - `og:title` و `og:url` و `og:image` (مطلق يبدأ بـ`https://technoenjaz.com`).
  - كل `script[type="application/ld+json"]` يمر `JSON.parse` ويحتوي `@graph`.
- **للمقالات:** وجود نص أول H2 من الـmarkdown الأصلي في HTML، ووجود `BlogPosting` بـ`datePublished` صحيح لكل slug حسب القسم 7.
- **للمشاريع:** وجود `CreativeWork`، وعدم وجود `WebPage` أو `BreadcrumbList` كنص وسوم ظاهر.
- **لـ`/faq`:** 13 عنصراً بـid يبدأ بـ`faq-a-`، و `FAQPage` بـ13 سؤالاً.
- **لكل الصفحات، فشل إذا وُجد:**
  - `<!--` متبوعاً بأحد: `FEATURED IMAGE` أو `IMAGE SLOT` أو `GALLERY ITEM` أو `Suggested Internal Link` أو `Filename:`.
  - `docs.google.com`، أو `techno-enjaz.com`.
  - `href="#article/` أو `href="#project/`، أو `href="#projects"` وما شابهها.
- **الروابط الداخلية:** كل `a[href^="/"]` (بدون hash) يرجع 200.
- **noindex pages:** `robots` يحتوي `noindex`، وغير موجودة في الـsitemap.
- `/this-page-does-not-exist` يرجع 404.
- **الناتج:** تقرير في `docs/verify-report.md`، و exit 1 عند أي فشل.

**2. `tests/no-js.spec.ts`:**
- `test.use({ javaScriptEnabled: false })` لكل URL في الـsitemap.
- `h1` مرئي، وأول فقرة محتوى مرئية.
- في صفحات القوائم: عدد روابط البطاقات = 12 أو 14.
- في المقال: الـbody مرئي.
- **أي فشل = FAILURE** (القاعدة 0.1).

**3. `tests/hydration.spec.ts`:**
- لكل URL في الـsitemap × (dark,ar) و (light,ar) و (dark,en) و (light,en) × viewports (390 و 1440).
- اجمع `console` (error و warning) و `pageerror`.
- فشل عند: `Hydration`، أو `did not match`، أو `Minified React error #418` أو `#423` أو `#425`، أو `Text content does not match`.
- **يُشغَّل مرتين:** على `next dev` (رسائل مفصلة) و على `preview`.

**4. `tests/visual/compare.spec.ts`:**
- نفس تركيبات P0، والـURLs الجديدة تقابل القديمة: `/projects` مقابل `/#projects`، وهكذا.
- `toHaveScreenshot` مع `maxDiffPixelRatio: 0.001` و `mask` لكل `canvas`.
- **الفروق المتوقعة (توثّق ولا تعتبر فشلاً):**
  - صفحات المشاريع: اختفاء H1 المكرر من الـbody، واختفاء قسم الوسوم الخاطئ، والـexcerpt النظيف.
  - مقتطف `interactive-children-ai-learning-system` في الـcatalog.
  - غير ذلك **أي فرق = FAILURE** ويُصلح.

**5. `tests/legacy-redirects.spec.ts`:** كل صف في جدول 5.3: زيارة القديم تنتهي بـ`page.url()` = الجديد.

**6. `tests/navigation.spec.ts`:**
- nav لكل عنصر، و back و forward، و scroll إلى الأعلى عند تغيير الصفحة.
- TOC anchor لا يغيّر الصفحة.
- الإعجاب بدون login يحوّل إلى `/login`، وبعد login يعود لنفس المقال، ويبقى الإعجاب محفوظاً بعد reload.
- حفظ مشروع يظهر في `/account`.
- تبديل الـtheme واللغة يبقى بعد reload، بدون وميض عربي لمستخدم en (screenshot عند `domcontentloaded` لا يُظهر نصاً عربياً).
- الـloader: أول زيارة لـ`/` يظهر، وثاني زيارة في نفس الجلسة لا يظهر، و `/articles/digital-twin` مباشرة لا يظهر.

**7. `tests/a11y.spec.ts`:** ‏axe على كل URL في الـsitemap.

**8. Lighthouse CI:** كما في P8.

**9. TOC ids:** مقارنة ids الـH2 لمقال `digital-twin` ومشروع `virtual-board-hand-tracking` مع ids baseline (استخرجها في P0 من DOM النسخة القديمة بعد التحميل).

**10. Build output:** جدول `next build` لا يحتوي `ƒ` لأي صفحة (الاستثناء الوحيد المسموح: route handlers مستقبلية تحت `/api`).

**11.** `npm run typecheck` و `npm run lint` (warnings ≤ baseline).

### P12 — Deploy & Cutover

**Actions:**
1. `npx wrangler login` (المالك)، ثم `npm run deploy`.
2. **حجم الـWorker:** راجع حجم `.open-next/worker.js` المضغوط في مخرجات الـdeploy. الحد 3MB في الخطة المجانية و10MB في المدفوعة. إذا تجاوز الحد: أبلغ المالك (ترقية الخطة). لا تحذف features.
3. **الدومين:** في Cloudflare Dashboard ← Workers ← technoenjaz ← Settings ← Domains & Routes، أضف `technoenjaz.com` كـCustom Domain، ثم `www.technoenjaz.com` مع redirect rule إلى الدومين بدون www.
   - هذا يحل خطأ 525 الحالي (سببه origin قديم).
   - **قبل التبديل:** سجّل الإعداد الحالي للدومين في `docs/rollback.md`.
4. **Post-deploy checks:**
   ```bash
   curl -sI https://technoenjaz.com/ | head -1                          # 200
   curl -sI https://technoenjaz.com/articles/digital-twin | head -1     # 200 (no redirect)
   curl -sI https://technoenjaz.com/index.html | grep -i location       # → /
   curl -sI https://technoenjaz.com/nope | head -1                      # 404
   curl -s  https://technoenjaz.com/sitemap.xml | grep -c '<loc>'       # 33
   ```
   شغّل `scripts/verify-site.mjs` مع `BASE_URL=https://technoenjaz.com`.
5. **Search Console:**
   - أضف الـproperty (Domain).
   - أرسل `https://technoenjaz.com/sitemap.xml`.
   - URL Inspection (Live test) لـ`/` و `/articles/digital-twin` و `/projects/virtual-board-hand-tracking`، وتأكد أن الـHTML المعروض يحتوي المحتوى.
6. **Rich Results Test** لمقال و `/faq`.

---

## 22. Expected Files/Folders to Change

### ADD
- **Config:** `next.config.ts`، و `open-next.config.ts`، و `wrangler.jsonc`، و `playwright.config.ts`.
- **App:**
  ```text
  src/app/layout.tsx
  src/app/page.tsx
  src/app/not-found.tsx
  src/app/sitemap.ts
  src/app/robots.ts
  src/app/manifest.ts
  src/app/favicon.ico
  src/app/icon.(svg|png)
  src/app/apple-icon.png
  src/app/projects/page.tsx
  src/app/projects/[slug]/page.tsx
  src/app/articles/page.tsx
  src/app/articles/[slug]/page.tsx
  src/app/videos/page.tsx
  src/app/faq/page.tsx
  src/app/about/page.tsx
  src/app/contact/page.tsx
  src/app/team/[id]/page.tsx
  src/app/login/page.tsx
  src/app/register/page.tsx
  src/app/account/page.tsx
  src/app/llms.txt/route.ts
  src/app/llms-full.txt/route.ts
  ```
- **Lib, SEO, Config:** `src/config/site.ts`، و `src/lib/{markdown,text,inline-scripts}.ts`، و `src/lib/content/{articles,projects}.ts`، و `src/seo/{metadata,jsonld}.ts`، و `src/seo/JsonLd.tsx`.
- **Components:**
  ```text
  src/components/shell/AppShell.tsx
  src/components/shell/ScrollToTop.tsx
  src/components/about/AboutTeamSection.tsx
  src/components/home/HomeHero.tsx
  src/components/articles/ArticleBody.tsx
  src/components/articles/ArticlesListing.tsx
  src/components/projects/ProjectBody.tsx
  src/components/account/AccountClient.tsx
  src/components/ThemedImage.tsx
  src/components/ResponsiveImage.tsx
  src/components/ClientOnly.tsx
  ```
- **Hooks:** `src/hooks/{useHydrated,useInView,useArticleEngagement}.ts`.
- **Data و Content:** `src/data/{faqData,videosData}.ts`، و `src/content/projects/*.md` (14).
- **Scripts:** `scripts/{inventory-urls,extract-project-markdown,optimize-images,verify-site}.mjs`.
- **Tests:** `tests/**`.
- **Docs:** `docs/{baseline.md,url-inventory.json,legacy-index-head.html,owner-todo.md,favicons.md,verify-report.md,rollback.md}`.
- **Public:** `public/web-app-manifest-*.png`.

### REFACTOR
- `package.json`، و `tsconfig.json`، و `.gitignore`، و `src/index.css`.
- `src/context/ThemeLanguageContext.tsx`.
- `src/data/{blogArticlesData,projectsData}.ts`.
- `src/components/articles/{OfficeBlogSection,ArticleDetailView,ArticlesSection,MagicBento}.tsx`.
- `src/components/projects/{ProjectsCatalogSection,ProjectDetailView,ProjectsSection}.tsx`.
- `src/components/videos/{VideosSection,ProjectReelsFeed,VideoPlayerModal}.tsx`.
- `src/components/faq/FaqSection.tsx`، و `src/components/ui/{MagicBento,ScrollExpand,InfiniteSpiral}.tsx`.
- `src/components/{CinematicFooter,TeamMomentsRing}.jsx`، و `src/{GooeyNav,ContactPage,AuthPage,UserProfilePage,ProfilePage}.jsx`.
- `src/hooks/useSavedProjects.ts`، و `src/utils/authUtils.ts`، و `public/loader/loader.js`.
- كل ملفات CSS التي تستخدم `'Readex Pro'`، وتُضاف إليها CSS vars للـtheme.

### REPLACE
- `index.html` يصبح `layout.tsx`.
- `src/main.tsx` يصبح App Router.
- `public/sitemap.xml` و `robots.txt` و `llms*.txt` تصبح مولَّدة.
- `public/favicon.svg` (Vite) يصبح أيقونات المالك.
- `src/pages/ScrollExpandPrototype.tsx` يصبح `src/components/home/HomeHero.tsx`.

### REMOVE
- `vite.config.ts`، و `tsconfig.node.json`، و `tsconfig.app.json`، و `src/App.tsx`.
- الملفات في القسم 2.1 (عدا `*-seo.md`).
- الـdependencies: `vite`، و `@vitejs/plugin-react`، و `three`، و `@types/three`، و `page-flip`، و `@types/page-flip`، و `pdfjs-dist`.

### KEEP (لا تُلمس)
- `src/content/articles/*.md` و `*-seo.md`.
- `src/data/{projectReelsData.ts,teamData.js}`، و `src/locales/translations.ts`.
- كل ملفات CSS للمكونات (تعديلات vars و font فقط).
- `public/loader/assets/*`، و `public/articles/*`، و `public/projects/*`، و `public/projects-live/*`، و `public/moments/*`، و `public/abdulghani.jpg`، و `public/techno-logo.png`.
- `theme/`، و `demo/`، و `test-scroll-expand.js`، و `puppeteer-core`، و `Asset-1@4x.png` في الجذر: قرار المالك (القسم 26).

---

## 23. Testing & Validation (ملخص)

| المجال | الأداة | معيار النجاح |
|---|---|---|
| Build | `npm run build` و `typecheck` و `lint` | صفر أخطاء، و warnings ≤ baseline |
| Rendering mode | جدول `next build` | لا `ƒ` لأي صفحة |
| HTML content | `verify-site.mjs` + no-JS Playwright | كل صفحة indexable فيها H1 واحد ومحتوى كامل. **أي فشل = FAILURE** |
| Hydration | hydration.spec | صفر أخطاء في 4 تركيبات × 2 viewports |
| SEO | verify-site + Rich Results + schema validator | canonical مطلق، و sitemap بـ33 URL كلها 200، و JSON-LD صالح |
| GEO و AEO | verify-site + llms.txt | ‏`@id` موحد، و FAQPage بـ13 سؤالاً، ولا Person |
| UX | visual compare + navigation.spec | فرق ≤ 0.1% (عدا الموثّق)، والتنقل سليم |
| Accessibility | axe + keyboard | لا serious ولا critical |
| Performance | Lighthouse CI + bundle analyzer | ‏LCP < 2.5s، و CLS < 0.1، ولا markdown في client chunks |
| Content | verify-site | 12 مقالاً و14 مشروعاً، ولا روابط مكسورة، و 404 صحيح |
| Legacy URLs | legacy-redirects.spec | كل الصفوف تنجح |

## 24. Risks & Mitigations

| الخطر | السبب | الأثر | التخفيف | التحقق |
|---|---|---|---|---|
| Hydration mismatch | قراءة المتصفح أثناء الـrender | وميض أو فقدان تفاعل | قواعد القسم 14، و P3 | hydration.spec |
| تغيّر ترتيب CSS | App Router يجمع CSS بترتيب الاستيراد | تراجع بصري | `index.css` أولاً في layout، وكل مكون يستورد CSS الخاص به كما اليوم | visual compare |
| قفزة ScrollExpand على الموبايل | config يُحسب بعد mount | اهتزاز | الخيار البديل بـCSS vars (P3.5) | visual mobile |
| WebGL على الخادم | ogl و gl-matrix | فشل البناء | `dynamic({ssr:false})` | build |
| GSAP ScrollTrigger بعد التنقل | triggers قديمة | animations معطلة | `gsap.context().revert()` في الـcleanup + `ScrollTrigger.refresh()` | navigation.spec |
| الـloader مع hydration | DOM يضيفه سكربت | تحذير | React 19 يتسامح مع body، والبديل في P4.3 | hydration.spec |
| حجم الـWorker | bundle الخادم | فشل deploy على الخطة المجانية | server-only للمحتوى، وخطة مدفوعة إن لزم | P12.2 |
| مسارات OpenNext overrides | اختلاف الإصدارات | فشل build | اتباع توثيق الإصدار المثبت | P1 |
| كسر روابط قديمة | الانتقال من hash | فقدان روابط مشاركة | السكربت inline | legacy spec |
| تسرّب محتوى داخلي | تعليقات markdown | روابط Docs مكشوفة | الحذف في `renderMarkdown` | verify-site |
| وميض الـtheme أو اللغة | الخادم يعرض dark و ar | وميض | CSS vars + ThemedImage + `data-lang-pending` | navigation.spec |
| فقدان بيانات المستخدم المحلية | إعادة تسمية مفاتيح | فقدان الإعجابات والمحفوظات | لا إعادة تسمية. المفتاح الجديد للـreturn path فقط مع fallback | navigation.spec |
| next/font يغيّر اسم العائلة | hash في الاسم | خط خاطئ | `var(--font-readex)` | visual |
| تعارض `src/pages` | Next يعامله كـPages Router | أخطاء routing | نقل ScrollExpandPrototype وحذف المجلد | build |

## 25. Rollback Strategy

- **الفروع:** كل العمل على `feat/nextjs-migration`، و `main` يبقى نسخة Vite الحالية إلى نجاح P11 كاملة. كل مرحلة commit مستقل، والتراجع عنها بـ`git revert <sha>`.
- **علامات الفشل:**
  - أي فحص في P11 أحمر.
  - `ƒ` في جدول البناء لصفحة عامة.
  - فرق بصري غير موثّق.
  - 404 لأي URL في `docs/url-inventory.json` بعد تحويله.
- **بعد النشر:**
  - Worker الإصدار السابق: `npx wrangler rollback` (يعود لآخر deployment ناجح).
  - فشل كامل: أعد إعداد الدومين المسجّل في `docs/rollback.md` (الـorigin السابق)، وهذا تغيير Custom Domain أو DNS فقط.
- **ما لا يُفقد أبداً:**
  - `src/content/**` (تحقق SHA قبل وبعد).
  - الـslugs.
  - مفاتيح localStorage.
  - `tests/visual/__baseline__`.

## 26. Final Pre-Implementation Checklist

**قرارات المالك (تُسجَّل في `docs/owner-todo.md`، والتنفيذ يبدأ بالقيم الافتراضية المذكورة):**

| # | القرار | الافتراضي في الخطة |
|---|---|---|
| 1 | الدومين الرسمي `https://technoenjaz.com` | ✅ معتمد |
| 2 | خطة Cloudflare Workers (مجانية أو مدفوعة) | مدفوعة إذا تجاوز الـWorker 3MB |
| 3 | العنوان الصحيح للمكتب: "ساحة العاصي - بناء الخاني - الطابق الرابع" أم "طريق دمشق"؟ وصحة الإحداثيات | `streetAddress` فارغ في schema حتى التأكيد. الـUI يبقى كما هو |
| 4 | بيانات الفريق الحقيقية (أسماء وصور وروابط) | صفحات الفريق noindex، ولا Person schema |
| 5 | الـloader على الرئيسية أول زيارة فقط | ✅ `LOADER_MODE='home-first-visit'` |
| 6 | حساب X (Twitter) | لا `twitter:site` |
| 7 | أرقام التفاعل الثابتة وشارة "حساب موثق" في mock auth | تبقى في الـUI كما هي، ولا تدخل الـschema |
| 8 | صورة `5g-iot.png` مطابقة لـ`internet-of-things-iot.png` | تبقى |
| 9 | `demo/` و `theme/` و `test-scroll-expand.js` و `Asset-1@4x.png` في الجذر | تبقى |
| 10 | مجلد `C:\Users\PC\Downloads\favicons` متاح على جهاز التنفيذ | مطلوب لـP10 |

**قبل البدء، تحقق الـagent من:**
- [ ] Node.js بإصدار يدعمه Next.js المثبت.
- [ ] حساب Cloudflare مع صلاحية Workers و R2 و D1.
- [ ] `git status` نظيف، والـbranch `feat/nextjs-migration`.
- [ ] baseline P0 مكتمل ومحفوظ.
- [ ] قراءة هذه الوثيقة كاملة.

**تعريف "مكتمل" (Definition of Done):**
1. كل فحوص P11 خضراء.
2. لا صفحة عامة بعلامة `ƒ`.
3. كل صفحة عامة تُظهر H1 ومحتواها الكامل بدون JavaScript.
4. 33 URL في الـsitemap، كلها 200 على `https://technoenjaz.com`.
5. الروابط القديمة (hash) كلها تتحول للمسارات الجديدة.
6. الشكل مطابق للـbaseline (عدا الفروق الموثقة).
