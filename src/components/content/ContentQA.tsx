import type { QAItem } from '@/data/qa/types';
import './ContentQA.css';

// Questions & answers about an article or a project (instead of invented comments).
// Server-rendered with native <details>: readable by search engines and AI answer
// engines, works without JavaScript, keyboard accessible. The same items are emitted
// as FAQPage JSON-LD by the page (qaSchema).
export function ContentQA({ items, title }: { items: QAItem[]; title: string }) {
  if (!items?.length) return null;
  return (
    <section className="content-qa" aria-labelledby="content-qa-title" dir="rtl" lang="ar">
      <h2 id="content-qa-title" className="content-qa__title">{title}</h2>
      <div className="content-qa__list">
        {items.map((item, i) => (
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
