'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
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
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { faqData, faqCategories, type FaqItem, type FaqActionIconKey } from '../../data/faqData';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
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

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const question = (isEn ? item.questionEn : item.question).toLowerCase();
      const answer = (isEn ? item.answerEn : item.answer).toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  }, [activeCategory, searchQuery, isEn]);

  return (
    <section className="faq-section-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 1. Breadcrumbs */}
      <nav className="faq-breadcrumbs-nav" aria-label="Breadcrumb">
        <ol className="faq-breadcrumbs-list">
          <li className="faq-breadcrumb-item">
            <Link 
              href="/" 
              className="faq-breadcrumb-btn"
            >
              <Home size={14} />
              <span>{isEn ? "Home" : "الرئيسية"}</span>
            </Link>
          </li>
          <li className="faq-breadcrumb-separator">
            {isEn ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
          </li>
          <li className="faq-breadcrumb-item current" aria-current="page">
            <span>{isEn ? "FAQ" : "الأسئلة الشائعة"}</span>
          </li>
        </ol>
      </nav>

      {/* 2. Hero Header */}
      <div className="faq-hero-header">
        <div className="faq-badge-capsule">
          <HelpCircle size={15} />
          <span>{isEn ? "Knowledge Base & Answers" : "مركز الاستفسارات والدعم المعرفي"}</span>
        </div>
        <h1 className="faq-main-title">
          {isEn ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
        </h1>
        <p className="faq-sub-desc">
          {isEn
            ? "Comprehensive answers regarding our engineering services, prototype hardware, software systems, and collaboration models."
            : "إجابات هندسية دقيقة حول خدماتنا، النماذج التطبيقية، آلية العمل، والدعم التقني المقدم في تكنو إنجاز."}
        </p>

        {/* 3. Search Bar */}
        <div className="faq-search-wrapper">
          <Search size={18} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? "Search questions or keywords..." : "ابحث في الأسئلة أو الكلمات المفتاحية..."}
          />
          {searchQuery && (
            <button
              type="button"
              className="faq-search-clear"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 4. Category Tabs */}
      <div className="faq-category-pills-row">
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
              <span className="chip-counter">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Accordion List */}
      <div className="faq-content-area">
        {filteredItems.length === 0 ? (
          <div className="faq-empty-state">
            <HelpCircle size={44} className="empty-ico" />
            <h3>{isEn ? "No matching questions found" : "لم يتم العثور على نتائج مطابقة"}</h3>
            <p>{isEn ? "Try different keywords or view all categories." : "جرب كلمات بحث أخرى أو استعرض كافة التصنيفات."}</p>
            <button
              type="button"
              className="faq-reset-filter-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              {isEn ? "Show All Questions" : "عرض كافة الأسئلة"}
            </button>
          </div>
        ) : (
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
        )}
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
