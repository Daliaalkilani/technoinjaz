# Contributing · المساهمة

<a href="#ar">العربية</a> · <a href="#en">English</a>

---

<a id="ar"></a>

<div dir="rtl">

## العربية

شكراً لاهتمامك بموقع تكنو إنجاز.

### من يمكنه المساهمة؟

- **الإبلاغ عن مشكلة أو خطأ في محتوى:** متاح للجميع عبر [Issues](../../issues/new/choose). اختر النموذج المناسب:
  - خلل في الموقع.
  - تصحيح محتوى في مقال أو مشروع.
  - اقتراح.
- **تعديلات الكود والمحتوى (Pull Requests):** لفريق تكنو إنجاز والمتعاونين المدعوّين.
  - المستودع **ليس مفتوح المصدر** (انظر [`LICENSE`](../LICENSE)).
  - إرسال Pull Request يعني موافقتك على أن تصبح مساهمتك ملكاً لتكنو إنجاز وفق شروط المستودع.
- **الثغرات الأمنية:** **لا تفتح Issue عامة.** اتبع [`SECURITY.md`](SECURITY.md).

### تجهيز بيئة العمل

```bash
# Node.js 20+
npm install
npm run dev        # http://localhost:3000
```

### قواعد تنظيم الكود

| ماذا | أين |
|---|---|
| صفحة أو مسار جديد | `src/app/<route>/page.tsx` (مكوّن خادم، يستدعي مكونات من `features/`) |
| مكونات خاصة بجزء من الموقع | `src/features/<area>/`، مع ملف CSS بنفس الاسم بجانب المكوّن |
| مكونات مشتركة | `src/components/layout` (الهيكل)، و `effects` (حركة و 3D)، و `ui` (عناصر صغيرة) |
| نص مقال أو مشروع | `src/content/{articles,projects}/<slug>.md` |
| بيانات مقال أو مشروع | `src/data/*.ts` |
| صور تُعرض عبر رابط | `public/images/<category>/` |
| صور يستوردها الكود | `src/assets/<category>/` |
| ملاحظات داخلية (SEO وتحرير) | `docs/`، **وليس** `src/content/` |

**قواعد إلزامية:**
1. **لا صفحة عامة تعتمد على JavaScript لعرض محتواها.** كل الصفحات العامة SSG. شغّل `npm run build`: أي صفحة عامة بعلامة `ƒ` (Dynamic) مرفوضة.
2. أي مكوّن يستخدم `window` أو `localStorage` أو الحركة يبدأ بـ`'use client'`، ولا يقرأ المتصفح أثناء أول render.
3. أسماء المكونات بصيغة PascalCase (`ProjectCard.tsx`)، والـimports عبر `@/`.
4. النصوص الظاهرة للمستخدم في `src/locales/translations.ts` باللغتين.
5. لا تضع ملاحظات تحرير (أماكن صور مقترحة، أو `Filename:`، أو ملاحظات للفريق) داخل ملفات المحتوى المنشورة.
6. الصور: لا ترفع صوراً أكبر من 2400px أو 600KB بدون سبب. الضغط يتم وقت البناء.

### الفروع والـCommits

- الفرع: `feat/<short-name>`، و `fix/<short-name>`، و `content/<slug>`، و `docs/<topic>`.
- رسائل الـcommit بصيغة [Conventional Commits](https://www.conventionalcommits.org/)، كما في تاريخ المستودع:
  ```text
  feat(articles): add related articles by shared tags
  fix(nav): prevent overflow on tablet landscape
  content(projects): update syrian-tourism-app scope
  docs: update README
  ```

### قبل فتح Pull Request

```bash
npm run typecheck
npm run lint
npm run build            # all public routes must be ○ or ●
npm run preview          # then, in another terminal:
BASE_URL=http://localhost:8787 npm run verify
npm run test:e2e
```

ثم املأ قالب الـPull Request (يظهر تلقائياً)، وأرفق لقطات قبل وبعد لأي تغيير بصري على موبايل وتابلت ولابتوب.

</div>

---

<a id="en"></a>

## English

Thank you for your interest in the Techno Enjaz website.

### Who can contribute?

- **Reporting a bug or a content error:** open to everyone via [Issues](../../issues/new/choose). Pick the matching form:
  - Site bug.
  - Content correction in an article or project.
  - Suggestion.
- **Code and content changes (pull requests):** for the Techno Enjaz team and invited collaborators.
  - This repository is **not open source** (see [`LICENSE`](../LICENSE)).
  - By submitting a pull request you agree that your contribution becomes the property of Techno Enjaz under the repository's terms.
- **Security vulnerabilities:** **do not open a public issue.** Follow [`SECURITY.md`](SECURITY.md).

### Setup

```bash
# Node.js 20+
npm install
npm run dev        # http://localhost:3000
```

### Code organization

| What | Where |
|---|---|
| New page or route | `src/app/<route>/page.tsx` (a Server Component that uses components from `features/`) |
| Components for one area of the site | `src/features/<area>/`, with a CSS file of the same name next to the component |
| Shared components | `src/components/layout` (shell), `effects` (motion and 3D), `ui` (small primitives) |
| Article or project body | `src/content/{articles,projects}/<slug>.md` |
| Article or project data | `src/data/*.ts` |
| Images served by URL | `public/images/<category>/` |
| Images imported by code | `src/assets/<category>/` |
| Internal notes (SEO, editorial) | `docs/`, **not** `src/content/` |

**Required rules:**
1. **No public page may depend on JavaScript to show its content.** Every public page is SSG. Run `npm run build`: any public route marked `ƒ` (Dynamic) is rejected.
2. Components that use `window`, `localStorage` or animation start with `'use client'` and never read the browser during the first render.
3. Component names are PascalCase (`ProjectCard.tsx`), and imports use `@/`.
4. User-facing strings go in `src/locales/translations.ts`, in both languages.
5. Never put editorial notes (suggested image slots, `Filename:` lines, notes to the team) in published content files.
6. Images: don't commit images larger than 2400px or 600KB without a reason. Compression happens at build time.

### Branches and commits

- Branches: `feat/<short-name>`, `fix/<short-name>`, `content/<slug>`, `docs/<topic>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), as in the repository history (see the examples in the Arabic section).

### Before opening a pull request

Run the checks listed in the Arabic section above (typecheck, lint, build, verify, e2e), then fill in the pull request template that appears automatically. Attach before/after screenshots on phone, tablet and laptop for any visual change.
