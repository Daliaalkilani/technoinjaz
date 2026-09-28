'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  MessageCircle, 
  FolderGit2, 
  FileText, 
  MapPin, 
  Send, 
  Code2, 
  DollarSign, 
  PhoneCall 
} from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { faqData, faqCategories, type FaqItem, type FaqActionIconKey } from '@/data/faqData';
import './FaqSection.css';

export type { FaqItem };

const ICON_MAP: Record<FaqActionIconKey, React.ReactNode> = {
  sparkles: <Sparkles size={14} />,
  mapPin: <MapPin size={14} />,
  externalLink: <ExternalLink size={14} />,
  folderGit2: <FolderGit2 size={14} />,
  fileText: <FileText size={14} />,
  send: <Send size={14} />,
  code2: <Code2 size={14} />,
  messageCircle: <MessageCircle size={14} />,
  dollarSign: <DollarSign size={14} />,
  phoneCall: <PhoneCall size={14} />
};

const ACTION_ROUTE_MAP: Record<string, string> = {
  '#contact': '/contact',
  '#projects': '/projects',
  '#articles': '/articles',
  '#about': '/about',
  '#videos': '/videos'
};

export const FaqSection: React.FC = () => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'q-about-1': true, // Open first question by default
  });

  const categories = faqCategories;

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredItems = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;
      return true;
    });
  }, [activeCategory]);

  return (
    <section className="faq-section-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 2. Page Header */}
      <div className="faq-header-wrapper">
        <div className="faq-header-badge">
          <HelpCircle size={15} />
          <span>{isEn ? "Knowledge Base & Inquiries" : "مركز الإجابات والاستفسارات"}</span>
        </div>
        <h1 className="faq-page-main-title">
          {isEn ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
        </h1>
        <p className="faq-page-lead-desc">
          {isEn
            ? "Short, direct answers to common questions asked by students, researchers, and partners. Didn't find your answer? Contact us directly."
            : "إجابات قصيرة ومباشرة عن أكثر ما يسألنا عنه الطلاب والعملاء. لم تجد إجابتك؟ راسلنا وسنجيبك مباشرة."}
        </p>
      </div>

      {/* 4. Category Filter Chips */}
      <div className="faq-categories-chips-wrap">
        <div className="faq-categories-scroll">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? faqData.length
              : faqData.filter(i => i.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                className={`faq-category-chip ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{isEn ? cat.nameEn : cat.name}</span>
                <span className="faq-chip-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Accordion Items List */}
      <div className="faq-accordion-container">
          <div className="faq-accordion-list">
            {filteredItems.map((item) => {
              const isOpen = !!openItems[item.id];
              const qText = isEn ? item.questionEn : item.question;
              const aText = isEn ? item.answerEn : item.answer;
              const actionText = isEn ? item.actionLabelEn : item.actionLabel;
              const targetRoute = item.actionTarget ? (ACTION_ROUTE_MAP[item.actionTarget] || item.actionTarget) : '/';

              return (
                <article 
                  key={item.id} 
                  className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${item.id}`}
                  >
                    <span className="faq-question-text">{qText}</span>
                    <span className="faq-toggle-icon-wrap">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  <div 
                    id={`faq-a-${item.id}`}
                    role="region"
                    hidden={!isOpen}
                    className={`faq-answer-drawer ${isOpen ? 'is-open' : ''}`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer-text">{aText}</p>

                      {actionText && item.actionTarget && (
                        <div className="faq-action-row">
                          <Link
                            href={targetRoute}
                            className="faq-action-link-btn"
                          >
                            {item.actionIconKey ? ICON_MAP[item.actionIconKey] : null}
                            <span>{actionText}</span>
                            {isEn ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
      </div>

      {/* 6. Quick Help Banner Footer */}
      <div className="faq-contact-cta-banner">
        <div className="faq-cta-content">
          <div className="faq-cta-icon-stub">
            <MessageCircle size={26} />
          </div>
          <div className="faq-cta-text-wrap">
            <h3 className="faq-cta-title">
              {isEn ? "Have an inquiry not answered above?" : "لديك سؤال أو استفسار لم تجد إجابته؟"}
            </h3>
            <p className="faq-cta-sub">
              {isEn
                ? "Our engineering team responds promptly to all academic and technical project inquiries."
                : "فريقنا الهندسي مستعد للإجابة على استفساراتك حول كافة المشاريع البرمجية والهندسية."}
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="faq-cta-action-btn"
        >
          <PhoneCall size={16} />
          <span>{isEn ? "Contact Us" : "تواصل معنا مباشرة"}</span>
        </Link>
      </div>
    </section>
  );
};

export default FaqSection;
