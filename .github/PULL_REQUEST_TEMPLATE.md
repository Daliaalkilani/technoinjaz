## Summary · الملخص

<!-- What does this PR change, and why? · ماذا يغيّر هذا الطلب ولماذا؟ -->

Closes #

## Type · النوع

- [ ] Bug fix · إصلاح
- [ ] Feature · ميزة
- [ ] Content (article / project) · محتوى
- [ ] Refactor / structure · إعادة تنظيم
- [ ] Docs · توثيق

## Checks · الفحوص

- [ ] `npm run typecheck` passes · ينجح
- [ ] `npm run lint` passes (no new errors) · بلا أخطاء جديدة
- [ ] `npm run build` passes, and **every public route is ○ or ● (no ƒ)** · كل الصفحات العامة ثابتة
- [ ] `npm run verify` passes against `npm run preview` · فحص SEO والمحتوى
- [ ] `npm run test:e2e` passes (no-JS rendering, legacy redirects) · اختبارات Playwright

## Rules · القواعد

- [ ] Page content is in the initial HTML; nothing public depends on client-side rendering · المحتوى موجود في HTML الأولي
- [ ] Browser-only code is in `'use client'` components and does not read `window`/`localStorage` during the first render · لا قراءة للمتصفح في أول render
- [ ] Files follow the structure in `.github/CONTRIBUTING.md` (`features/`, `components/`, `public/images/`) · الملفات في أماكنها
- [ ] New UI strings exist in both Arabic and English · النصوص باللغتين
- [ ] No editorial notes in `src/content/` (suggested images, `Filename:`, notes to the team) · لا ملاحظات تحرير في المحتوى المنشور
- [ ] New images are ≤ 2400px and ≤ 600KB, placed under `public/images/` or `src/assets/` · الصور بحجم معقول وفي مكانها

## Screenshots · لقطات

<!-- Required for visual changes: before/after on phone, tablet and laptop, in Arabic. · مطلوبة لأي تغيير بصري: قبل وبعد على موبايل وتابلت ولابتوب. -->

| | Before · قبل | After · بعد |
|---|---|---|
| Phone · موبايل | | |
| Tablet · تابلت | | |
| Laptop · لابتوب | | |
