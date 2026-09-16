import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  LayoutGrid, 
  Sparkles, 
  Radio, 
  Layers, 
  Database, 
  Activity, 
  Laptop, 
  Server, 
  Globe, 
  Flame 
} from 'lucide-react';
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
}

const liveProjectsList: LiveProject[] = [
  {
    id: 'hisab-erp',
    title: 'نظام حساب ERP السحابي',
    subtitle: 'Hisab ERP Cloud',
    category: 'أنظمة ومؤسسية',
    url: 'https://hisab-erp.pages.dev/login',
    displayDomain: 'hisab-erp.pages.dev',
    description: 'نظام ERP متكامل لإدارة الموارد المحاسبية والإدارية للشركات، الفواتير الإلكترونية المعتمدة، وإدارة المخزون والمبيعات لحظياً.',
    highlights: ['Cloud ERP', 'E-Invoicing', 'Finance'],
    color: '#0aeec3',
    iconName: 'database'
  },
  {
    id: 'projectforge',
    title: 'منصة بروجكت فورج',
    subtitle: 'ProjectForge Workspace',
    category: 'أنظمة ومؤسسية',
    url: 'https://projectforge-e3q.pages.dev/',
    displayDomain: 'projectforge-e3q.pages.dev',
    description: 'منصة رشيقة (Agile/Kanban) لتنسيق فرق التطوير البرمجي والهندسي، جدولة المهام، وتتبع الإنجاز في الوقت الفعلي.',
    highlights: ['Agile Workspace', 'Kanban Board', 'Team Sync'],
    color: '#38bdf8',
    iconName: 'activity'
  },
  {
    id: 'interactive-cv',
    title: 'السيرة الذاتية التفاعلية',
    subtitle: 'Interactive 3D Portfolio',
    category: 'هويات رقمية',
    url: 'https://cv.abdalgani.com/',
    displayDomain: 'cv.abdalgani.com',
    description: 'واجهة رقمية تفاعلية حديثة تستعرض المسار المهني والخبرات والمشاريع الهندسية المنجزة بأسلوب مبتكر وجذاب.',
    highlights: ['Interactive 3D', 'Digital CV', 'Portfolio'],
    color: '#a855f7',
    iconName: 'sparkles'
  },
  {
    id: 'taima-alwani',
    title: 'منصة تيماء علواني',
    subtitle: 'Taima Alwani Showcase',
    category: 'هويات رقمية',
    url: 'https://taima-alwani.pages.dev/',
    displayDomain: 'taima-alwani.pages.dev',
    description: 'موقع شخصي ومهني أنيق بتصميم عصري يعكس الهوية الرقمية، الأعمال الإبداعية، والخبرات المتخصصة.',
    highlights: ['Personal Brand', 'Modern UI/UX', 'Showcase'],
    color: '#ec4899',
    iconName: 'laptop'
  },
  {
    id: 'rebuild-dn9',
    title: 'بوابة الأعمال والمشاريع',
    subtitle: 'Modern Web Platform',
    category: 'هويات رقمية',
    url: 'https://abdalgani-rebuild-dn9.pages.dev/',
    displayDomain: 'abdalgani-rebuild-dn9.pages.dev',
    description: 'منصة برمجية حديثة تستعرض أحدث التطبيقات والنماذج البرمجية المبنية بتقنيات الويب الحديثة وعالية الأداء.',
    highlights: ['Full-Stack Web', 'Modern Architecture', 'Apps'],
    color: '#10b981',
    iconName: 'server'
  },
  {
    id: 'khazama-store',
    title: 'متجر خزامة السحابي',
    subtitle: 'Khazama Store',
    category: 'تطبيقات ومتاجر',
    url: 'https://khazama-store.abdalganih2.workers.dev/',
    displayDomain: 'khazama-store.workers.dev',
    description: 'متجر رقمي فائق السرعة يعمل على الحافة السحابية (Edge Cloud Workers) لتقديم تجربة تسوق فورية وسلسة وآمنة.',
    highlights: ['Edge Workers', 'Serverless Store', 'Cloudflare'],
    color: '#f59e0b',
    iconName: 'flame'
  },
  {
    id: 'modeya',
    title: 'منصة مضيئة للأزياء',
    subtitle: 'Modeya Fashion',
    category: 'تطبيقات ومتاجر',
    url: 'https://modeya.abdalgani.com/',
    displayDomain: 'modeya.abdalgani.com',
    description: 'منصة تسوق رقمية فاخرة مخصصة لخطوط الأزياء والتصميم العصري، مع تجربة استعراض المنتجات وسلة الشراء المتقدمة.',
    highlights: ['Luxury Fashion', 'E-Commerce', 'Payment Flow'],
    color: '#f43f5e',
    iconName: 'sparkles'
  },
  {
    id: 'dermocean',
    title: 'منصة ديرم أوشن',
    subtitle: 'Dermocean Care',
    category: 'تطبيقات ومتاجر',
    url: 'https://dermocean-preview.pages.dev/',
    displayDomain: 'dermocean-preview.pages.dev',
    description: 'واجهة رقمية متخصصة في مستحضرات ومنتجات العناية بالبشرة، مع استعراض علمي دقيق للمكونات والحلول الجلدية.',
    highlights: ['Dermatology', 'Care Catalog', 'Medical Beauty'],
    color: '#06b6d4',
    iconName: 'activity'
  },
  {
    id: 'wpu-cover',
    title: 'مصمم أغلفة الكتب',
    subtitle: 'WPU Book Cover',
    category: 'أدوات ومختبرات',
    url: 'https://wpu-cover.pages.dev/',
    displayDomain: 'wpu-cover.pages.dev',
    description: 'أداة تفاعلية ذكية لتصميم وتوليد أغلفة الكتب والأبحاث والمنشورات العلمية بجودة طباعية احترافية.',
    highlights: ['Book Covers', 'Design Generator', 'Export High-Res'],
    color: '#8b5cf6',
    iconName: 'layers'
  },
  {
    id: 'md-2-pdf',
    title: 'محول الماركداون الذكي',
    subtitle: 'MD to PDF Converter',
    category: 'أدوات ومختبرات',
    url: 'https://md-2-pdf.pages.dev/',
    displayDomain: 'md-2-pdf.pages.dev',
    description: 'محرك تحويل سريع وعالي الدقة لمستندات Markdown إلى ملفات PDF جاهزة للطباعة والتوزيع بمظهر احترافي.',
    highlights: ['Markdown Engine', 'PDF Exporter', 'Dev Tool'],
    color: '#3b82f6',
    iconName: 'laptop'
  },
  {
    id: 'cablexperts',
    title: 'منصة خبراء الكابلات',
    subtitle: 'Cable Experts Co.',
    category: 'أنظمة ومؤسسية',
    url: 'https://cabltexperts.com/',
    displayDomain: 'cabltexperts.com',
    description: 'منصة هندسية رائدة لشركة متخصصة في توريد وتوزيع كابلات الجهد العالي والمتوسط والاتصالات للمشاريع الكبرى.',
    highlights: ['Power Cables', 'Engineering Specs', 'Industrial'],
    color: '#eab308',
    iconName: 'server'
  },
  {
    id: 'cableksa',
    title: 'كابلات السعودية',
    subtitle: 'Cable KSA Portal',
    category: 'أنظمة ومؤسسية',
    url: 'https://cableksa.com/',
    displayDomain: 'cableksa.com',
    description: 'البوابة الشاملة لتوريدات وأنظمة الكابلات المعتمدة في المملكة العربية السعودية، توفر كتالوجات فنية ومواصفات قياسية.',
    highlights: ['Saudi Infrastructure', 'Cables Catalog', 'ISO Standards'],
    color: '#22c55e',
    iconName: 'globe'
  },
  {
    id: 'arduino-lab',
    title: 'مختبر آردوينو التفاعلي',
    subtitle: 'Arduino Virtual Lab',
    category: 'أدوات ومختبرات',
    url: 'https://arduino-lab.pages.dev/',
    displayDomain: 'arduino-lab.pages.dev',
    description: 'بيئة محاكاة تفاعلية لتجربة وبرمجة دوائر الأردوينو والحساسات الإلكترونية واختبار الأكواد الهندسية افتراضياً.',
    highlights: ['Arduino Simulation', 'IoT Sensors', 'Interactive Circuit'],
    color: '#14b8a6',
    iconName: 'activity'
  }
];

const renderIcon = (name: string, color: string, size = 22) => {
  switch (name) {
    case 'database': return <Database size={size} color={color} />;
    case 'activity': return <Activity size={size} color={color} />;
    case 'sparkles': return <Sparkles size={size} color={color} />;
    case 'laptop': return <Laptop size={size} color={color} />;
    case 'server': return <Server size={size} color={color} />;
    case 'flame': return <Flame size={size} color={color} />;
    case 'layers': return <Layers size={size} color={color} />;
    case 'globe': return <Globe size={size} color={color} />;
    default: return <Globe size={size} color={color} />;
  }
};

const categories = [
  'الكل',
  'أنظمة ومؤسسية',
  'تطبيقات ومتاجر',
  'أدوات ومختبرات',
  'هويات رقمية'
];

const AUTO_INTERVAL_MS = 4500;

export const LiveProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [viewMode, setViewMode] = useState<'animated' | 'grid'>('animated');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const filteredProjects = selectedCategory === 'الكل'
    ? liveProjectsList
    : liveProjectsList.filter(p => p.category === selectedCategory);

  const activeProject = filteredProjects[currentIndex % filteredProjects.length] || liveProjectsList[0];

  // Divide projects for dual-track infinite marquee
  const track1Projects = [...liveProjectsList.slice(0, 7), ...liveProjectsList.slice(0, 7)];
  const track2Projects = [...liveProjectsList.slice(7), ...liveProjectsList.slice(7)];

  // Automatic transition timer
  useEffect(() => {
    if (!isPlaying || isHovered || viewMode !== 'animated') {
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTO_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentIndex(c => (c + 1) % filteredProjects.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, viewMode, filteredProjects.length]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex(c => (c + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex(c => (c - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleSelectProject = (project: LiveProject) => {
    const idx = filteredProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setProgress(0);
    }
  };

  return (
    <div className="live-projects-container">
      {/* Control Toolbar */}
      <div className="live-projects-toolbar">
        {/* Category Filter Chips */}
        <div className="live-projects-categories">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setProgress(0);
              }}
            >
              {cat} {cat === 'الكل' ? `(${liveProjectsList.length})` : ''}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="live-projects-view-toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'animated' ? 'active' : ''}`}
            onClick={() => setViewMode('animated')}
            title="عرض تلقائي متحرك"
          >
            <Radio size={16} />
            <span>عرض تلقائي متحرك</span>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="عرض شبكة المشاريع"
          >
            <LayoutGrid size={16} />
            <span>شبكة المشاريع</span>
          </button>
        </div>
      </div>

      {viewMode === 'animated' ? (
        <>
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

            {/* Top Bar: Status Badge & Navigation Controls */}
            <div className="spotlight-top-controls">
              <div className="spotlight-badge">
                <span className="spotlight-badge-dot" />
                <span>مشروع نشط ويعمل الآن أونلاين</span>
              </div>

              <div className="spotlight-nav-actions">
                <button
                  type="button"
                  className="spotlight-btn-icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </button>
                <button
                  type="button"
                  className="spotlight-btn-icon"
                  onClick={handlePrev}
                  title="المشروع السابق"
                >
                  <ChevronRight size={19} />
                </button>
                <button
                  type="button"
                  className="spotlight-btn-icon"
                  onClick={handleNext}
                  title="المشروع التالي"
                >
                  <ChevronLeft size={19} />
                </button>
              </div>
            </div>

            {/* Spotlight Grid Content */}
            <div className="spotlight-content-grid">
              <div className="spotlight-details">
                <span className="spotlight-category-tag" style={{ color: activeProject.color }}>
                  {activeProject.category}
                </span>
                <h2 className="spotlight-title">{activeProject.title}</h2>
                <div className="spotlight-subtitle">{activeProject.subtitle}</div>
                <p className="spotlight-desc">{activeProject.description}</p>

                <div className="spotlight-tags">
                  {activeProject.highlights.map(tag => (
                    <span key={tag} className="spotlight-tag-item">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="spotlight-cta-row">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotlight-launch-btn"
                  >
                    <span>زيارة وتجربة المشروع الحي</span>
                    <ExternalLink size={17} />
                  </a>

                  <div className="spotlight-url-display">
                    <span>{activeProject.displayDomain}</span>
                  </div>
                </div>
              </div>

              {/* Browser Mockup Window */}
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
                <div className="preview-window-body">
                  <div 
                    className="preview-hero-icon"
                    style={{ background: `${activeProject.color}18`, border: `1px solid ${activeProject.color}50` }}
                  >
                    {renderIcon(activeProject.iconName, activeProject.color, 32)}
                  </div>
                  <div className="preview-hero-title">{activeProject.title}</div>
                  <div className="preview-hero-subtitle">{activeProject.subtitle}</div>
                  <div className="preview-hero-domain">{activeProject.displayDomain}</div>
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
              <span>استعراض متحرك لكافة المشاريع الحية (13 مشروعاً)</span>
            </h3>
          </div>

          <div className="marquee-wrapper">
            {/* Track 1: Moving left */}
            <div className="marquee-track track-left">
              {track1Projects.map((project, idx) => (
                <div
                  key={`track1-${project.id}-${idx}`}
                  className={`marquee-card ${activeProject.id === project.id ? 'active-selected' : ''}`}
                  onClick={() => handleSelectProject(project)}
                >
                  <div className="marquee-card-top">
                    <span className="marquee-card-badge">🟢 مباشر</span>
                    <div 
                      className="marquee-card-icon"
                      style={{ background: `${project.color}18` }}
                    >
                      {renderIcon(project.iconName, project.color, 18)}
                    </div>
                  </div>
                  <h4 className="marquee-card-title">{project.title}</h4>
                  <div className="marquee-card-subtitle">{project.subtitle}</div>
                  <p className="marquee-card-desc">{project.description}</p>
                  <div className="marquee-card-footer">
                    <span className="marquee-card-domain">{project.displayDomain}</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="marquee-card-link-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>تشغيل</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Track 2: Moving right */}
            <div className="marquee-track track-right">
              {track2Projects.map((project, idx) => (
                <div
                  key={`track2-${project.id}-${idx}`}
                  className={`marquee-card ${activeProject.id === project.id ? 'active-selected' : ''}`}
                  onClick={() => handleSelectProject(project)}
                >
                  <div className="marquee-card-top">
                    <span className="marquee-card-badge">🟢 مباشر</span>
                    <div 
                      className="marquee-card-icon"
                      style={{ background: `${project.color}18` }}
                    >
                      {renderIcon(project.iconName, project.color, 18)}
                    </div>
                  </div>
                  <h4 className="marquee-card-title">{project.title}</h4>
                  <div className="marquee-card-subtitle">{project.subtitle}</div>
                  <p className="marquee-card-desc">{project.description}</p>
                  <div className="marquee-card-footer">
                    <span className="marquee-card-domain">{project.displayDomain}</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="marquee-card-link-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>تشغيل</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Full Grid Mode */
        <div className="live-projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="grid-card">
              <div className="grid-card-header">
                <div 
                  className="grid-card-icon"
                  style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}
                >
                  {renderIcon(project.iconName, project.color, 22)}
                </div>
                <span className="spotlight-badge" style={{ padding: '0.2rem 0.75rem', fontSize: '0.75rem' }}>
                  <span className="spotlight-badge-dot" />
                  <span>يعمل الآن</span>
                </span>
              </div>
              <h3 className="grid-card-title">{project.title}</h3>
              <div className="grid-card-subtitle">{project.subtitle}</div>
              <p className="grid-card-desc">{project.description}</p>
              <div className="spotlight-tags" style={{ margin: 0 }}>
                {project.highlights.map(tag => (
                  <span key={tag} className="spotlight-tag-item">#{tag}</span>
                ))}
              </div>
              <div className="grid-card-footer">
                <span className="marquee-card-domain">{project.displayDomain}</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid-card-btn"
                >
                  <span>فتح المشروع الحي</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveProjectsShowcase;
