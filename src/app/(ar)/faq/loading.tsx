
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/faq/FaqSection.css';

// Mirrors FaqSection: header, category chips, accordion (first item open), CTA.
export default function FAQLoading() {
  return (
    <section className="faq-section-container" aria-busy="true" aria-label="جاري تحميل الأسئلة الشائعة...">
      <div className="faq-header-wrapper">
        <div className="faq-page-main-title"><SkText words={2} /></div>
        <p className="faq-page-lead-desc"><SkText words={16} /></p>
      </div>
      <div className="faq-categories-chips-wrap">
        <div className="faq-categories-scroll">
          {[90, 142, 260, 221, 231, 175].map((w, i) => <SkBox key={i} w={w} h={35} r={999} />)}
        </div>
      </div>
      <div className="faq-accordion-container">
        <div className="faq-accordion-list">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <article key={i} className={`faq-accordion-item${i === 0 ? ' is-open' : ''}`}>
              <div className="faq-question-btn" style={{ cursor: 'default' }}>
                <span style={{ flex: 1 }}><SkText words={[3, 5, 8, 6, 5, 7, 4, 6][i]} /></span>
                <SkBox w={32} h={32} r={999} />
              </div>
              {i === 0 && (
                <div className="faq-answer-drawer is-open" style={{ padding: '0 24px 20px' }}>
                  <SkText words={30} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
