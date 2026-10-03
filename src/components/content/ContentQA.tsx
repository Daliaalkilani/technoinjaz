'use client';

import type { QAItem } from '@/data/qa/types';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './ContentQA.css';

// Questions & answers about an article or a project (instead of invented comments).
// Language-aware: shows qEn/aEn in English mode (falls back to Arabic if missing).
// Server-rendered HTML contains both blocks is avoided — items are chosen client-side;
// FAQPage JSON-LD stays Arabic (default SEO locale).
export function ContentQA({ items, title, titleEn }: { items: QAItem[]; title: string; titleEn?: string }) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  if (!items?.length) return null;
  const active = items.map((it) => (isEn && (it.qEn || it.aEn) ? { q: it.qEn || it.q, a: it.aEn || it.a } : it));
  return (
    <section
      className="content-qa"
      aria-labelledby="content-qa-title"
      dir={isEn ? 'ltr' : 'rtl'}
      lang={isEn ? 'en' : 'ar'}
    >
      <h2 id="content-qa-title" className="content-qa__title">{isEn && titleEn ? titleEn : title}</h2>
      <div className="content-qa__list">
        {active.map((item, i) => (
          <details key={i} className="content-qa__item" open={i === 0}>
            <summary className="content-qa__q">{item.q}</summary>
            <p className="content-qa__a">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default ContentQA;
