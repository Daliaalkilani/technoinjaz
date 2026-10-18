# تقرير: مسارات إنكليزية حقيقية `/en/...` (2026-10-18)

## شو انعمل

- **اللغة صارت جزء من الرابط** بدل حالة بالمتصفح: العربي على `/` (RTL)، والإنكليزي على `/en/...` (LTR). الـHTML بينطلع من السيرفر باللغة الصحيحة (`<html lang="en" dir="ltr">`، العناوين، النصوص، جسم المقال/المشروع) — مو تبديل بعد التحميل.
- **بنية بلا تكرار مكونات**: مجموعتين `app/(ar)` و`app/(en)/en`، لكل وحدة root layout خاص فيها (`RootDocument` مشترك بـ`src/components/layout/RootDocument.tsx`). ملفات `page.tsx` بالطرفين رفيعة (5–15 سطر) وكلها بتستدعي **route module** مشترك بـ`src/routes/*.tsx` بياخد `lang`. كل الصفحات ضلت static (SSG).
- **الروابط الداخلية**: `src/i18n/navigation.tsx` فيه `Link` و`useLocaleRouter` و`useLocalePathname` بيضيفوا `/en` تلقائياً بالصفحات الإنكليزية. استبدلت استيرادات `next/link`/`next/navigation` بـ36 مكوّن. روابط جسم المقالات/المشاريع (markdown) كمان بتتحوّل لـ`/en/...` (`localizeHtmlLinks`). منطق المسارات كله بـ`src/i18n/locale.ts` (قائمة بيضاء لمقاطع الصفحات، يعني `/api` و`/images` و`/feed.xml` ما بتنمس).
- **SEO**: كل صفحة بلغتيها فيها canonical لنفسها + `hreflang` متقابل `ar ↔ en` + `x-default` → العربي (`languageAlternates` بـ`seo/metadata.ts`). OpenGraph: `og:locale` ‏`en_US`/`ar_SY`، و`og:url` والـsiteName والعناوين بالإنكليزي.
- **JSON-LD**: كل الـbuilders بـ`seo/schemas.ts` صارت تاخد `lang` (Organization، WebSite، WebPage، BreadcrumbList، ItemList، BlogPosting، CreativeWork، Person، FAQPage، VideoObject) بأسماء ووصف وروابط و`inLanguage` باللغة الصحيحة. ضفت `workTranslation` بين نسختي المقال/المشروع. الـ`@id` تبع الكيانات (المؤسسة، الأشخاص) ثابتة بين اللغتين.
- **404**: ‏`app/global-not-found.tsx` (مع `experimental.globalNotFound`) بيطلع صفحة 404 من السيرفر بحالة **404** حقيقية وبلغة الرابط (الـmiddleware بيبعت header ‏`x-te-lang`). مثلاً `/en/404` و`/en/أي-شي` و`/en/articles/غلط` ← 404 إنكليزي، و`/غلط` ← 404 عربي.
- **السايت ماب**: 154 إدخال (77 عربي + 77 إنكليزي)، كل واحد مع alternates لـar/en/x-default. فيديوهات `/en/videos` بعناوين ووصف إنكليزي.
- **llms.txt**: فيه قسم Languages وقسم "English Version" كامل (الأقسام، الفريق، المقالات، المشاريع بروابط `/en/`).
- **robots.txt**: ضفت نسخ `/en/` من مسارات الحساب/الأخطاء الممنوعة.
- **مبدّل اللغة** (القائمة بالـnavbar وزر الموبايل): صار ينقل لنفس الصفحة باللغة التانية (`/articles/x` ↔ `/en/articles/x`) مع الحفاظ على query وhash. الاختيار بينحفظ؛ إذا زائر اختار الإنكليزي وفتح رابط عربي، الـboot script بيحوّله لنسخة `/en` قبل الرسم. زيارة صفحة `/en` من البحث **ما** بتحفظ تفضيل (فبيضل الزائر العربي على العربي).
- Redirects جديدة: `/en/403`، `/en/500`، `/en/access-error`، `/en/index.html`، ونسخة `/en` من تحويل مشروع الروبوت المكرر، و`/team` ← `/about`، `/en/team` ← `/en/about` (ما في صفحة فريق مستقلة؛ الفريق موجود بصفحة من نحن).

## بنية المسارات

```
src/app/
  (ar)/layout.tsx            ← <html lang="ar" dir="rtl">
  (ar)/page.tsx, about/, articles/[slug]/, projects/[slug]/, team/[id]/, …
  (en)/layout.tsx            ← <html lang="en" dir="ltr">
  (en)/en/page.tsx, about/, articles/[slug]/, projects/[slug]/, team/[id]/, …
  global-not-found.tsx       ← 404 من السيرفر للغتين
  api/, sitemap.ts, robots.ts, llms.txt/, feed.xml/  (بلا تغيير بالمكان)
src/routes/                  ← metadata + JSX لكل صفحة حسب lang (مشترك)
src/i18n/locale.ts, navigation.tsx
```

## أمثلة روابط

- https://technoenjaz.com/en
- https://technoenjaz.com/en/about — https://technoenjaz.com/en/contact — https://technoenjaz.com/en/faq
- https://technoenjaz.com/en/articles/digital-twin
- https://technoenjaz.com/en/projects/remote-controlled-ground-robot
- https://technoenjaz.com/en/team/abdulghani
- https://technoenjaz.com/en/videos — https://technoenjaz.com/en/library — https://technoenjaz.com/en/privacy-policy
- https://technoenjaz.com/en/404 (حالة 404)

## التحقق

- `npx tsc -p tsconfig.json --noEmit` ← 0 أخطاء. `npm run build` ← ناجح (كل صفحات `/en` اتولّدت static، 13 مقال و44 مشروع و11 عضو فريق).
- `next start` + Chrome: نصوص الصفحات الإنكليزية والـh1 والـnav (`/en/...`) سليمة؛ المبدّل بيتنقل بين `/en/articles/x` و`/articles/x`؛ تحويل التفضيل شغال؛ صفحات 404 بتطلع من السيرفر بحالة 404؛ 0 أخطاء console.
- الـoxlint: نفس التحذيرات القديمة، ما في جديد.

## شو بدو انتباه بعد النشر

1. **جرّب على Workers بعد النشر**: `curl -I https://technoenjaz.com/en/about` (200)، `curl -I https://technoenjaz.com/en/404` (404 بصفحة إنكليزية)، وتأكد إنو الـmiddleware ما عم يحوّل `/en` لشي تاني. الـ404 صار ديناميكي (`ƒ /_not-found` بيقرا header) — كان static؛ تأكد إنو opennext عم يخدّمه مظبوط.
2. **Google Search Console**: ابعت السايت ماب من جديد وراقب تقرير hreflang/International targeting وصفحات "Alternate page with proper canonical" بالأسابيع الجاية.
3. **`experimental.globalNotFound`** ميزة تجريبية بـNext 15.5؛ انتبه إلها وقت ترقية Next.
4. **المستخدمين القدام** يلي كانوا مختارين إنكليزي (`techno_lang=en`) رح يتحوّلوا تلقائياً لـ`/en/...` — هاد مقصود.
5. **روابط برّا الموقع** (مشاركات، النشرة البريدية، الإشعارات، `feed.xml`) لسا بتشاور عالعربي — منطقي، بس إذا بدكن نشرة إنكليزية بدها روابط `/en`.
6. **محتوى ناقص بالإنكليزي**: إذا انضاف مقال/مشروع جديد بلا ملف `src/content/*-en/<slug>.md`، صفحة `/en` إلو رح تعرض الجسم العربي (fallback). ضيفوا الترجمة مع كل محتوى جديد.
7. اختبارات Playwright الموجودة (`tests/`) ما شغّلتها؛ الـvisual baseline بيغيّر اللغة بـlocalStorage وهلق هاد بيعمل تحويل لـ`/en` — يمكن الـsnapshots بدها تحديث.
8. شلت الـCSS والسكريبت القديم يلي كان يخبّي الصفحة لحين تطبيق الإنكليزي (`data-lang-pending`) — ما عاد إلو لزوم.
