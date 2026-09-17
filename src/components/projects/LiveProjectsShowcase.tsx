import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck
} from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import './LiveProjectsShowcase.css';

export interface LiveProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  url: string;
  displayDomain: string;
  description: string;
  highlights: string[];
  color: string;
  iconName: string;
  image: string;
}

const liveProjectsList: LiveProject[] = [
  {
    id: 'hisab-erp',
    title: 'نظام حساب ERP السحابي',
    subtitle: 'نظام سحابي لإدارة الموارد المحاسبية والإدارية',
    category: 'أنظمة ومؤسسية',
    url: 'https://hisab-erp.pages.dev/login',
    displayDomain: 'hisab-erp.pages.dev',
    description: 'نظام متكامل لإدارة الموارد المحاسبية والإدارية للشركات، الفواتير الإلكترونية المعتمدة، وإدارة المخزون والمبيعات لحظياً.',
    highlights: ['إدارة سحابية', 'فوترة إلكترونية', 'حسابات ومخزون'],
    color: '#0aeec3',
    iconName: 'database',
    image: '/projects-live/hisab-erp.jpg'
  },
  {
    id: 'projectforge',
    title: 'منصة بروجكت فورج',
    subtitle: 'مساحة عمل لإدارة وتنسيق الفرق البرمجية',
    category: 'أنظمة ومؤسسية',
    url: 'https://projectforge-e3q.pages.dev/',
    displayDomain: 'projectforge-e3q.pages.dev',
    description: 'منصة متقدمة لتنسيق فرق التطوير البرمجي والهندسي، جدولة المهام، وتتبع الإنجاز في الوقت الفعلي عبر لوحات تفاعلية.',
    highlights: ['إدارة المشاريع', 'لوحات كانبان', 'مزامنة المهام'],
    color: '#38bdf8',
    iconName: 'activity',
    image: '/projects-live/projectforge.jpg'
  },
  {
    id: 'interactive-cv',
    title: 'السيرة الذاتية التفاعلية',
    subtitle: 'معرض أعمال وسيرة مهنية تفاعلية',
    category: 'هويات رقمية',
    url: 'https://cv.abdalgani.com/',
    displayDomain: 'cv.abdalgani.com',
    description: 'واجهة رقمية تفاعلية حديثة تستعرض المسار المهني والخبرات والمشاريع الهندسية المنجزة بأسلوب مبتكر وجذاب.',
    highlights: ['تفاعل ثلاثي الأبعاد', 'سيرة ذاتية', 'معرض أعمال'],
    color: '#a855f7',
    iconName: 'sparkles',
    image: '/projects-live/interactive-cv.jpg'
  },
  {
    id: 'taima-alwani',
    title: 'منصة تيماء علواني',
    subtitle: 'منصة الهوية الرقمية والأعمال الإبداعية',
    category: 'هويات رقمية',
    url: 'https://taima-alwani.pages.dev/',
    displayDomain: 'taima-alwani.pages.dev',
    description: 'موقع شخصي ومهني أنيق بتصميم عصري يعكس الهوية الرقمية، الأعمال الإبداعية، والخبرات المتخصصة.',
    highlights: ['هوية رقمية', 'تصميم عصري', 'معرض إبداعي'],
    color: '#ec4899',
    iconName: 'laptop',
    image: '/projects-live/taima-alwani.jpg'
  },
  {
    id: 'rebuild-dn9',
    title: 'بوابة الأعمال والمشاريع',
    subtitle: 'بوابة شاملة لتطبيقات الويب الحديثة',
    category: 'هويات رقمية',
    url: 'https://abdalgani-rebuild-dn9.pages.dev/',
    displayDomain: 'abdalgani-rebuild-dn9.pages.dev',
    description: 'منصة برمجية حديثة تستعرض أحدث التطبيقات والنماذج البرمجية المبنية بتقنيات الويب الحديثة وعالية الأداء.',
    highlights: ['تطبيقات متكاملة', 'معمارية سحابية', 'أداء متقدم'],
    color: '#10b981',
    iconName: 'server',
    image: '/projects-live/rebuild-dn9.jpg'
  },
  {
    id: 'khazama-store',
    title: 'متجر خزامة السحابي',
    subtitle: 'متجر تجارة إلكترونية فائق السرعة',
    category: 'تطبيقات ومتاجر',
    url: 'https://khazama-store.abdalganih2.workers.dev/',
    displayDomain: 'khazama-store.workers.dev',
    description: 'متجر رقمي فائق السرعة يعمل على الحافة السحابية لتقديم تجربة تسوق فورية وسلسة وآمنة.',
    highlights: ['معالجة سحابية', 'تسوق رقمي', 'أمان عالي'],
    color: '#f59e0b',
    iconName: 'flame',
    image: '/projects-live/khazama-store.jpg'
  },
  {
    id: 'modeya',
    title: 'منصة مضيئة للأزياء',
    subtitle: 'منصة تسوق رقمية فاخرة للأزياء',
    category: 'تطبيقات ومتاجر',
    url: 'https://modeya.abdalgani.com/',
    displayDomain: 'modeya.abdalgani.com',
    description: 'منصة تسوق رقمية فاخرة مخصصة لخطوط الأزياء والتصميم العصري، مع تجربة استعراض المنتجات وسلة الشراء المتقدمة.',
    highlights: ['أزياء راقية', 'تجارة إلكترونية', 'دفع إلكتروني'],
    color: '#f43f5e',
    iconName: 'sparkles',
    image: '/projects-live/modeya.jpg'
  },
  {
    id: 'dermocean',
    title: 'منصة ديرم أوشن',
    subtitle: 'منصة متخصصة في العناية بالبشرة والحلول الجلدية',
    category: 'تطبيقات ومتاجر',
    url: 'https://dermocean-preview.pages.dev/',
    displayDomain: 'dermocean-preview.pages.dev',
    description: 'واجهة رقمية متخصصة في مستحضرات ومنتجات العناية بالبشرة، مع استعراض علمي دقيق للمكونات والحلول الجلدية.',
    highlights: ['عناية بالبشرة', 'كتالوج متقدم', 'حلول تجميلية'],
    color: '#06b6d4',
    iconName: 'activity',
    image: '/projects-live/dermocean.jpg'
  },
  {
    id: 'wpu-cover',
    title: 'مصمم أغلفة الكتب',
    subtitle: 'أداة تفاعلية لتصميم وتوليد أغلفة الكتب',
    category: 'أدوات ومختبرات',
    url: 'https://wpu-cover.pages.dev/',
    displayDomain: 'wpu-cover.pages.dev',
    description: 'أداة تفاعلية ذكية لتصميم وتوليد أغلفة الكتب والأبحاث والمنشورات العلمية بجودة طباعية احترافية.',
    highlights: ['أغلفة كتب', 'توليد تصاميم', 'تصدير عالي الدقة'],
    color: '#8b5cf6',
    iconName: 'layers',
    image: '/projects-live/wpu-cover.jpg'
  },
  {
    id: 'md-2-pdf',
    title: 'محول الماركداون الذكي',
    subtitle: 'محرك تحويل المستندات إلى ملفات جاهزة للطباعة',
    category: 'أدوات ومختبرات',
    url: 'https://md-2-pdf.pages.dev/',
    displayDomain: 'md-2-pdf.pages.dev',
    description: 'محرك تحويل سريع وعالي الدقة لمستندات النصوص والماركداون إلى ملفات جاهزة للطباعة والتوزيع بمظهر احترافي.',
    highlights: ['محرك نصوص', 'تصدير وثائق', 'أدوات مكتبية'],
    color: '#3b82f6',
    iconName: 'laptop',
    image: '/projects-live/md-2-pdf.jpg'
  },
  {
    id: 'cablexperts',
    title: 'منصة خبراء الكابلات',
    subtitle: 'بوابة حلول وتوريدات كابلات الطاقة والاتصالات',
    category: 'أنظمة ومؤسسية',
    url: 'https://cabltexperts.com/',
    displayDomain: 'cabltexperts.com',
    description: 'منصة هندسية رائدة لشركة متخصصة في توريد وتوزيع كابلات الجهد العالي والمتوسط والاتصالات للمشاريع الكبرى.',
    highlights: ['كابلات صناعية', 'مواصفات هندسية', 'توريدات معتمدة'],
    color: '#eab308',
    iconName: 'server',
    image: '/projects-live/cablexperts.jpg'
  },
  {
    id: 'cableksa',
    title: 'كابلات السعودية',
    subtitle: 'البوابة الوطنية لأنظمة ومواصفات الكابلات',
    category: 'أنظمة ومؤسسية',
    url: 'https://cableksa.com/',
    displayDomain: 'cableksa.com',
    description: 'البوابة الشاملة لتوريدات وأنظمة الكابلات المعتمدة في المملكة العربية السعودية، توفر كتالوجات فنية ومواصفات قياسية.',
    highlights: ['بنية تحتية', 'كتالوج معتمد', 'مواصفات قياسية'],
    color: '#22c55e',
    iconName: 'globe',
    image: '/projects-live/cableksa.jpg'
  },
  {
    id: 'arduino-lab',
    title: 'مختبر آردوينو التفاعلي',
    subtitle: 'بيئة محاكاة تفاعلية لاختبار الدوائر الإلكترونية',
    category: 'أدوات ومختبرات',
    url: 'https://arduino-lab.pages.dev/',
    displayDomain: 'arduino-lab.pages.dev',
    description: 'بيئة محاكاة تفاعلية لتجربة وبرمجة دوائر الأردوينو والحساسات الإلكترونية واختبار الأكواد الهندسية افتراضياً.',
    highlights: ['محاكاة إلكترونية', 'حساسات ذكية', 'دوائر تفاعلية'],
    color: '#14b8a6',
    iconName: 'activity',
    image: '/projects-live/arduino-lab.jpg'
  }
];

const AUTO_INTERVAL_MS = 4500;

export const LiveProjectsShowcase: React.FC = () => {
  const { lang, t } = useThemeLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const { isSaved, toggleSave } = useSavedProjects();

  const activeProject = liveProjectsList[currentIndex % liveProjectsList.length] || liveProjectsList[0];
  const activeTrans = t.liveProjects.projects[activeProject.id];
  const activeTitle = activeTrans?.title || activeProject.title;
  const activeDescription = activeTrans?.description || activeProject.description;
  const activeHighlights = activeTrans?.highlights || activeProject.highlights;

  // Seamless continuous dual-track infinite marquee with full duplicates
  const track1Projects = [...liveProjectsList, ...liveProjectsList];
  const track2Projects = [...[...liveProjectsList].reverse(), ...[...liveProjectsList].reverse()];

  // Automatic transition timer
  useEffect(() => {
    if (!isPlaying || isHovered) {
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTO_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(c => (c + 1) % liveProjectsList.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex(c => (c + 1) % liveProjectsList.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex(c => (c - 1 + liveProjectsList.length) % liveProjectsList.length);
  };

  const handleSelectProject = (project: LiveProject) => {
    const idx = liveProjectsList.findIndex(p => p.id === project.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setProgress(0);
    }
  };

  return (
    <div className="live-projects-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Featured Auto-Advancing Spotlight */}
      <div 
        className="spotlight-hero"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ borderColor: `${activeProject.color}40` }}
          >
            <div 
              className="spotlight-glow" 
              style={{ background: `radial-gradient(circle, ${activeProject.color}25 0%, transparent 70%)` }} 
            />

            {/* Top Bar: Controls */}
            <div className="spotlight-top-controls">
              <div className="spotlight-project-number">
                <span>{t.liveProjects.projectWord} {currentIndex + 1} {t.liveProjects.ofWord} {liveProjectsList.length}</span>
              </div>

              <div className="spotlight-nav-actions">
                <button
                  type="button"
                  className="spotlight-btn-icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </button>
                <button
                  type="button"
                  className="spotlight-btn-icon"
                  onClick={handlePrev}
                  title="Previous"
                >
                  <ChevronRight size={19} />
                </button>
                <button
                  type="button"
                  className="spotlight-btn-icon"
                  onClick={handleNext}
                  title="Next"
                >
                  <ChevronLeft size={19} />
                </button>
              </div>
            </div>

            {/* Spotlight Grid Content */}
            <div className="spotlight-content-grid">
              <div className="spotlight-details">
                <h2 className="spotlight-title">{activeTitle}</h2>
                <p className="spotlight-desc">{activeDescription}</p>

                <div className="spotlight-tags">
                  {activeHighlights.map(tag => (
                    <span key={tag} className="spotlight-tag-item">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="spotlight-cta-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotlight-launch-btn"
                  >
                    <span>{t.liveProjects.visitLive}</span>
                    <ExternalLink size={17} />
                  </a>

                  <button
                    type="button"
                    className={`project-save-btn spotlight-save-btn ${isSaved(activeProject.id) ? 'is-saved' : ''}`}
                    onClick={() => {
                      toggleSave({
                        id: activeProject.id,
                        title: activeTitle,
                        titleEn: activeProject.title,
                        category: activeProject.category,
                        description: activeDescription,
                        descriptionEn: activeProject.description,
                        type: 'live',
                        url: activeProject.url,
                        image: activeProject.image,
                        tags: activeHighlights
                      });
                    }}
                    title={isSaved(activeProject.id) 
                      ? (lang === 'ar' ? 'تم الحفظ في المفضلة' : 'Saved to Favorites') 
                      : (lang === 'ar' ? 'حفظ المشروع في المفضلة' : 'Save Project to Favorites')}
                  >
                    {isSaved(activeProject.id) ? (
                      <>
                        <BookmarkCheck size={16} />
                        <span>{lang === 'ar' ? 'تم الحفظ' : 'Saved'}</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={16} />
                        <span>{lang === 'ar' ? 'حفظ المشروع' : 'Save Project'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Browser Mockup Window with Captured Live Website Screenshot */}
              <div className="spotlight-preview-window">
                <div className="preview-window-header">
                  <div className="preview-window-dots">
                    <span className="preview-dot red" />
                    <span className="preview-dot yellow" />
                    <span className="preview-dot green" />
                  </div>
                  <div className="preview-window-address">
                    <span>https://{activeProject.displayDomain}</span>
                  </div>
                </div>
                <div className="preview-window-body preview-image-container">
                  <img
                    src={activeProject.image}
                    alt={activeTitle}
                    className="preview-project-image"
                  />
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-image-overlay"
                  >
                    <span className="preview-overlay-btn">
                      <span>{t.liveProjects.visitMockup}</span>
                      <ExternalLink size={16} />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="spotlight-progress-track">
              <div 
                className="spotlight-progress-fill" 
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, #0ea5e9, ${activeProject.color})`
                }} 
              />
            </div>
          </div>

          {/* Continuous Dual-Track Infinite Marquee */}
          <div className="marquee-section-header">
            <h3 className="marquee-section-title">
              <Sparkles size={20} color="#0aeec3" />
              <span>{t.liveProjects.marqueeTitle.replace('{count}', String(liveProjectsList.length))}</span>
            </h3>
          </div>

          <div className="marquee-wrapper" dir="ltr">
            {/* Track 1: Moving left */}
            <div className="marquee-track track-left">
              {track1Projects.map((project, idx) => {
                const pTrans = t.liveProjects.projects[project.id];
                const pTitle = pTrans?.title || project.title;
                const pDesc = pTrans?.description || project.description;
                return (
                  <div
                    key={`track1-${project.id}-${idx}`}
                    className={`marquee-card ${activeProject.id === project.id ? 'active-selected' : ''}`}
                    onClick={() => handleSelectProject(project)}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="marquee-card-top">
                      <div className="marquee-card-thumb-wrap">
                        <img src={project.image} alt={pTitle} className="marquee-card-thumb-img" loading="lazy" />
                      </div>
                    </div>
                    <h4 className="marquee-card-title">{pTitle}</h4>
                    <p className="marquee-card-desc">{pDesc}</p>
                    <div className="marquee-card-footer">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="marquee-card-link-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{t.liveProjects.launch}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Track 2: Moving right */}
            <div className="marquee-track track-right">
              {track2Projects.map((project, idx) => {
                const pTrans = t.liveProjects.projects[project.id];
                const pTitle = pTrans?.title || project.title;
                const pDesc = pTrans?.description || project.description;
                return (
                  <div
                    key={`track2-${project.id}-${idx}`}
                    className={`marquee-card ${activeProject.id === project.id ? 'active-selected' : ''}`}
                    onClick={() => handleSelectProject(project)}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="marquee-card-top">
                      <div className="marquee-card-thumb-wrap">
                        <img src={project.image} alt={pTitle} className="marquee-card-thumb-img" loading="lazy" />
                      </div>
                    </div>
                    <h4 className="marquee-card-title">{pTitle}</h4>
                    <p className="marquee-card-desc">{pDesc}</p>
                    <div className="marquee-card-footer">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="marquee-card-link-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{t.liveProjects.launch}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

export default LiveProjectsShowcase;
