import React, { useState, useMemo } from 'react';
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
import './FaqSection.css';

export interface FaqItem {
  id: string;
  category: 'about' | 'engineering' | 'development' | 'cost' | 'contact';
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  actionLabel?: string;
  actionLabelEn?: string;
  actionTarget?: string; // e.g. '#contact', '#projects', '#about', '#articles'
  actionIcon?: React.ReactNode;
}

interface FaqSectionProps {
  onNavigateTab: (target: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigateTab }) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'q-about-1': true, // Open first question by default
  });

  const faqData: FaqItem[] = useMemo(() => [
    // 1. عن تكنو إنجاز
    {
      id: 'q-about-1',
      category: 'about',
      question: 'ما هي تكنو إنجاز؟',
      questionEn: 'What is Techno Enjaz?',
      answer: 'تكنو إنجاز مكتب هندسي في مدينة حماة السورية ينفّذ مشاريع التخرج والمشاريع الهندسية في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات وأنظمة التحكم، ويطوّر المواقع والمتاجر والأنظمة السحابية، وينشر مقالات تقنية عربية مجانية.',
      answerEn: 'Techno Enjaz is an engineering bureau located in Hama, Syria, executing graduation and industrial engineering projects in AI, computer vision, robotics, and control systems, while developing modern cloud web apps, portals, and publishing free Arabic engineering research.',
      actionLabel: 'تعرّف علينا',
      actionLabelEn: 'About Us',
      actionTarget: '#about',
      actionIcon: <Sparkles size={14} />
    },
    {
      id: 'q-about-2',
      category: 'about',
      question: 'أين يقع مكتب تكنو إنجاز؟',
      questionEn: 'Where is Techno Enjaz located?',
      answer: 'يقع المكتب في حماة، ساحة العاصي، بناء الخاني، بجوار أفران السلام، في الطابق الرابع. يمكنك فتح الموقع مباشرة على خرائط Google من صفحة التواصل.',
      answerEn: 'The office is located in Hama, Al-Assi Square, Al-Khani Building, adjacent to Al-Salam Bakeries, 4th Floor. You can view the live Google Maps location directly on our Contact page.',
      actionLabel: 'العنوان والخريطة',
      actionLabelEn: 'Address & Map',
      actionTarget: '#contact',
      actionIcon: <MapPin size={14} />
    },
    {
      id: 'q-about-3',
      category: 'about',
      question: 'هل تعملون مع عملاء من خارج حماة أو خارج سوريا؟',
      questionEn: 'Do you collaborate with clients outside Hama or outside Syria?',
      answer: 'نعم. يمكن متابعة المشروع بالكامل عن بُعد عبر واتساب والبريد الإلكتروني، ومن أعمالنا مواقع لعملاء خارج سوريا مثل بوابة «كابلات السعودية».',
      answerEn: 'Yes. Projects can be entirely managed remotely via WhatsApp, GitHub, and email. Our portfolio includes enterprise applications for international clients, such as the Saudi Cable portal.',
      actionLabel: 'مشاريع الويب',
      actionLabelEn: 'Web Projects',
      actionTarget: '#projects',
      actionIcon: <ExternalLink size={14} />
    },

    // 2. مشاريع التخرج والمشاريع الهندسية
    {
      id: 'q-eng-1',
      category: 'engineering',
      question: 'هل تنفّذون مشاريع التخرج لطلاب الهندسة؟',
      questionEn: 'Do you engineer graduation projects for engineering students?',
      answer: 'نعم. نعمل على مشاريع التخرج في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات وأنظمة التحكم وتطبيقات الويب والموبايل، من تحديد الفكرة وحتى النموذج العامل والتوثيق.',
      answerEn: 'Yes. We engineer comprehensive capstone and graduation projects in AI, computer vision, robotics, control systems, web, and mobile apps—from conceptualization to fully functioning prototypes and documentation.',
      actionLabel: 'الخدمات',
      actionLabelEn: 'Our Services',
      actionTarget: '#projects',
      actionIcon: <FolderGit2 size={14} />
    },
    {
      id: 'q-eng-2',
      category: 'engineering',
      question: 'ماذا يتضمن تسليم المشروع الهندسي؟',
      questionEn: 'What does an engineering project delivery package include?',
      answer: 'يختلف ذلك حسب المشروع، لكن التوثيق عادةً يشمل تقريراً بصيغة PDF ومستند Word قابلاً للتعديل وعرضاً تقديمياً، إلى جانب النموذج العملي أو البرمجي. يمكنك الاطلاع على أمثلة حقيقية من ملفات التوثيق في صفحة المشاريع.',
      answerEn: 'Deliverables depend on project requirements, but standard documentation typically includes an academic PDF report, editable Word document, slide presentation, source code, and practical working hardware/software models.',
      actionLabel: 'المشاريع الهندسية',
      actionLabelEn: 'Engineering Projects',
      actionTarget: '#projects',
      actionIcon: <FileText size={14} />
    },
    {
      id: 'q-eng-3',
      category: 'engineering',
      question: 'هل يمكنني اقتراح فكرة مشروعي الخاصة؟',
      questionEn: 'Can I propose my own custom project idea?',
      answer: 'نعم. أرسل لنا وصفاً مختصراً للفكرة واختصاصك وجامعتك، ونراجع معك قابلية التنفيذ والنطاق المناسب قبل البدء.',
      answerEn: 'Absolutely. Send us a brief summary of your proposal, your academic specialization, and your university, and we will review feasibility, scope, and technical milestones with you before initiation.',
      actionLabel: 'أرسل فكرتك',
      actionLabelEn: 'Submit Your Idea',
      actionTarget: '#contact',
      actionIcon: <Send size={14} />
    },

    // 3. تطوير المواقع والتطبيقات
    {
      id: 'q-dev-1',
      category: 'development',
      question: 'ما أنواع المواقع التي تطوّرونها؟',
      questionEn: 'What types of web systems and portals do you develop?',
      answer: 'نطوّر أنظمة إدارة الموارد والحسابات (ERP)، ومواقع الشركات، والمتاجر الإلكترونية، والمواقع الشخصية ومعارض الأعمال، وأدوات الويب التفاعلية. جميع الأمثلة المعروضة منشورة ويمكن تجربتها مباشرة.',
      answerEn: 'We engineer cloud ERP resource management suites, corporate portals, e-commerce storefronts, personal portfolios, and real-time interactive web applications. All listed showcase projects are live and interactive.',
      actionLabel: 'جرّب مشاريعنا الحية',
      actionLabelEn: 'Try Live Demos',
      actionTarget: '#projects',
      actionIcon: <Code2 size={14} />
    },
    {
      id: 'q-dev-2',
      category: 'development',
      question: 'هل تطوّرون تطبيقات موبايل؟',
      questionEn: 'Do you develop native or cross-platform mobile apps?',
      answer: 'نعم، نطوّر تطبيقات متعددة المنصات بتقنية Flutter تعمل على أندرويد وiOS، مثل تطبيق FocusBac لتنظيم الدراسة والتطبيق السياحي الذكي.',
      answerEn: 'Yes, we build high-performance cross-platform mobile apps utilizing Google Flutter for both Android and iOS, including our FocusBac study organizer and smart interactive tourism applications.',
      actionLabel: 'تواصل معنا',
      actionLabelEn: 'Inquire Now',
      actionTarget: '#contact',
      actionIcon: <MessageCircle size={14} />
    },

    // 4. التكلفة والمدة وطريقة البدء
    {
      id: 'q-cost-1',
      category: 'cost',
      question: 'كم تكلفة المشروع؟',
      questionEn: 'How much does a project typically cost?',
      answer: 'لا توجد تسعيرة ثابتة؛ تعتمد التكلفة على نوع المشروع وحجمه والمكونات المطلوبة. أرسل تفاصيل مشروعك وسنرسل لك تقديراً واضحاً قبل أي التزام.',
      answerEn: 'There is no fixed generic price; pricing depends specifically on technical complexity, hardware components, and feature scope. Share your requirements and we provide a clear quotation before any commitment.',
      actionLabel: 'اطلب تقديراً',
      actionLabelEn: 'Request an Estimate',
      actionTarget: '#contact',
      actionIcon: <DollarSign size={14} />
    },
    {
      id: 'q-cost-2',
      category: 'cost',
      question: 'كم يستغرق تنفيذ المشروع؟',
      questionEn: 'How long does project implementation take?',
      answer: 'تختلف المدة حسب تعقيد المشروع وتوفر القطع والمتطلبات. نتفق معك على جدول زمني واضح عند تحديد النطاق، ويُفضَّل التواصل مبكراً قبل موعد التسليم الجامعي.',
      answerEn: 'Duration varies based on system complexity, component availability, and integration depth. We establish a clear milestone timeline upon project scoping. Early engagement is recommended for academic deadlines.',
      actionLabel: 'تواصل لجدولة مشروعك',
      actionLabelEn: 'Schedule Project',
      actionTarget: '#contact',
      actionIcon: <MessageCircle size={14} />
    },
    {
      id: 'q-cost-3',
      category: 'cost',
      question: 'كيف أبدأ مشروعي معكم؟',
      questionEn: 'How do I start a project with Techno Enjaz?',
      answer: 'راسلنا على واتساب أو عبر نموذج التواصل بوصف مختصر للمشروع، ثم نحدد معك النطاق والتكلفة والمدة، ونبدأ التنفيذ مع متابعة دورية حتى التسليم.',
      answerEn: 'Contact us via WhatsApp or through our Contact form with a brief summary. We will finalize scope, milestones, and budget, initiating execution with regular milestone reviews until final handover.',
      actionLabel: 'تواصل معنا',
      actionLabelEn: 'Contact Us Now',
      actionTarget: '#contact',
      actionIcon: <PhoneCall size={14} />
    },

    // 5. التواصل والمحتوى
    {
      id: 'q-comm-1',
      category: 'contact',
      question: 'ما طرق التواصل مع تكنو إنجاز؟',
      questionEn: 'What are the available communication channels with Techno Enjaz?',
      answer: 'عبر الهاتف أو واتساب على الرقم +963 958 794 195، أو البريد info@technoenjaz.com، أو إنستغرام @TECHNO_ENJAZ، أو صفحة فيسبوك، أو بزيارة المكتب في حماة.',
      answerEn: 'Via phone or WhatsApp at +963 958 794 195, email at info@technoenjaz.com, Instagram @TECHNO_ENJAZ, Facebook page, or by visiting our office in Hama.',
      actionLabel: 'صفحة التواصل',
      actionLabelEn: 'Contact Page',
      actionTarget: '#contact',
      actionIcon: <MapPin size={14} />
    },
    {
      id: 'q-comm-2',
      category: 'contact',
      question: 'هل المقالات التقنية في الموقع مجانية؟',
      questionEn: 'Are technical and engineering articles on the platform free?',
      answer: 'نعم. جميع المقالات مجانية ومكتوبة بالعربية، وتغطي الذكاء الاصطناعي وإنترنت الأشياء وشبكات 5G والأنظمة المدمجة، مع قائمة مصادر موثوقة في نهاية كل مقال.',
      answerEn: 'Yes. All published research and technical articles are completely free, authored in Arabic, and cover Artificial Intelligence, IoT, 5G networks, and Embedded Systems with verified academic citations.',
      actionLabel: 'تصفّح المقالات',
      actionLabelEn: 'Browse Articles',
      actionTarget: '#articles',
      actionIcon: <FileText size={14} />
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', name: 'الكل', nameEn: 'All' },
    { id: 'about', name: 'عن تكنو إنجاز', nameEn: 'About Us' },
    { id: 'engineering', name: 'مشاريع التخرج والمشاريع الهندسية', nameEn: 'Graduation & Engineering' },
    { id: 'development', name: 'تطوير المواقع والتطبيقات', nameEn: 'Web & Mobile Apps' },
    { id: 'cost', name: 'التكلفة والمدة وطريقة البدء', nameEn: 'Pricing & Timelines' },
    { id: 'contact', name: 'التواصل والمحتوى', nameEn: 'Contact & Content' }
  ], []);

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
  }, [faqData, activeCategory, searchQuery, isEn]);

  return (
    <section className="faq-section-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 1. Breadcrumbs */}
      <nav className="faq-breadcrumbs-nav" aria-label="Breadcrumb">
        <ol className="faq-breadcrumbs-list">
          <li className="faq-breadcrumb-item">
            <button 
              type="button" 
              className="faq-breadcrumb-btn"
              onClick={() => onNavigateTab('#top')}
            >
              <Home size={14} />
              <span>{isEn ? "Home" : "الرئيسية"}</span>
            </button>
          </li>
          <li className="faq-breadcrumb-separator">
            {isEn ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
          </li>
          <li className="faq-breadcrumb-item current" aria-current="page">
            <span>{isEn ? "FAQ" : "الأسئلة الشائعة"}</span>
          </li>
        </ol>
      </nav>

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

      {/* 3. Search Bar */}
      <div className="faq-search-box-wrap">
        <div className="faq-search-inner">
          <Search size={18} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder={isEn ? "Search in questions and answers..." : "ابحث في الأسئلة الشائعة والإجابات..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="faq-search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
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
        {filteredItems.length === 0 ? (
          <div className="faq-empty-state">
            <HelpCircle size={44} className="faq-empty-icon" />
            <h3>{isEn ? "No Matching Questions Found" : "لم يتم العثور على نتائج تطابق بحثك"}</h3>
            <p>{isEn ? "Try changing your search terms or contact us directly." : "جرّب البحث بكلمات أخرى أو راسلنا مباشرة للإجابة على استفسارك."}</p>
            <button
              type="button"
              className="faq-reset-btn"
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
                  >
                    <span className="faq-question-text">{qText}</span>
                    <span className="faq-toggle-icon-wrap">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-drawer">
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">{aText}</p>

                        {actionText && item.actionTarget && (
                          <div className="faq-action-row">
                            <button
                              type="button"
                              className="faq-action-link-btn"
                              onClick={() => onNavigateTab(item.actionTarget!)}
                            >
                              {item.actionIcon}
                              <span>{actionText}</span>
                              {isEn ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
        <button
          type="button"
          className="faq-cta-action-btn"
          onClick={() => onNavigateTab('#contact')}
        >
          <PhoneCall size={16} />
          <span>{isEn ? "Contact Us" : "تواصل معنا مباشرة"}</span>
        </button>
      </div>
    </section>
  );
};

export default FaqSection;
