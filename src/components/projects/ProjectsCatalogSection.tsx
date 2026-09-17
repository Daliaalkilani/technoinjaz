import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Download, 
  FileText, 
  Presentation, 
  FileCode, 
  Layers, 
  Cpu, 
  Eye, 
  Radio, 
  Globe, 
  Smartphone,
  Filter
} from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { DRIVE_PROJECTS, type DriveProject, type ProjectCategory } from '../../data/driveProjectsData';
import OptionWheel, { type OptionWheelItem } from '../ui/OptionWheel';
import DocumentReaderModal from './DocumentReaderModal';
import './ProjectsCatalogSection.css';

export const ProjectsCatalogSection: React.FC = () => {
  const { lang } = useThemeLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [activeReadingProject, setActiveReadingProject] = useState<DriveProject | null>(null);

  const categories: { key: ProjectCategory; labelAr: string; labelEn: string; icon: React.ReactNode }[] = useMemo(() => [
    { key: 'all', labelAr: 'الكل', labelEn: 'All Projects', icon: <Layers size={16} /> },
    { key: 'ai', labelAr: 'ذكاء اصطناعي', labelEn: 'Artificial Intelligence', icon: <Cpu size={16} /> },
    { key: 'vision', labelAr: 'رؤية حاسوبية', labelEn: 'Computer Vision', icon: <Eye size={16} /> },
    { key: 'systems', labelAr: 'اتصالات ونظم', labelEn: 'Telecom & Systems', icon: <Radio size={16} /> },
    { key: 'web', labelAr: 'تطبيقات ويب', labelEn: 'Web Applications', icon: <Globe size={16} /> },
    { key: 'mobile', labelAr: 'تطبيقات موبايل', labelEn: 'Mobile Applications', icon: <Smartphone size={16} /> },
  ], []);

  const wheelOptions: OptionWheelItem[] = useMemo(() => {
    return categories.map(cat => ({
      id: cat.key,
      label: lang === 'ar' ? cat.labelAr : cat.labelEn,
      value: cat.key,
      icon: cat.icon
    }));
  }, [categories, lang]);

  const activeCategoryKey = categories[selectedCategoryIdx]?.key || 'all';

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return DRIVE_PROJECTS.filter(project => {
      // Category filter
      if (activeCategoryKey !== 'all' && project.category !== activeCategoryKey) {
        return false;
      }
      // Search term filter
      if (!term) return true;
      const titleMatch = project.title.toLowerCase().includes(term) || project.titleEn.toLowerCase().includes(term);
      const descMatch = project.description.toLowerCase().includes(term) || project.descriptionEn.toLowerCase().includes(term);
      const tagsMatch = project.tags.some(tag => tag.toLowerCase().includes(term));
      return titleMatch || descMatch || tagsMatch;
    });
  }, [activeCategoryKey, searchTerm]);

  const getCategoryBadgeLabel = (catKey: string) => {
    const found = categories.find(c => c.key === catKey);
    return found ? (lang === 'ar' ? found.labelAr : found.labelEn) : catKey;
  };

  return (
    <section className="catalog-section" id="academic-projects" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="catalog-container">
        {/* Section Header */}
        <div className="catalog-header-wrap">
          <div className="catalog-section-badge">
            <BookOpen size={16} />
            <span>{lang === 'ar' ? 'المكتبة الأكاديمية والبحثية' : 'Engineering & Academic Library'}</span>
          </div>
          <h2 className="catalog-title">
            {lang === 'ar' ? 'مكتبة مشاريع التخرج والبحوث الهندسية' : 'Graduation Projects & Research Library'}
          </h2>
          <p className="catalog-subtitle">
            {lang === 'ar' 
              ? 'استكشف وحمّل أو تصفح ورقياً وثائق مشاريع التخرج المعتمدة وعروض البوربوينت وملفات التوثيق الشاملة.' 
              : 'Explore, download, or flip through documented graduation projects, presentations, and technical documentation.'}
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="catalog-controls-panel">
          {/* Live Search Input */}
          <div className="catalog-search-box">
            <Search size={19} className="catalog-search-icon" />
            <input
              type="text"
              className="catalog-search-input"
              placeholder={lang === 'ar' ? 'ابحث بالاسم أو التقنية (مثل: شبكات، تعرّف، أمن)...' : 'Search by title or keyword (e.g. AI, vision, security)...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button" 
                className="catalog-search-clear"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* OptionWheel Category Selector */}
          <div className="catalog-wheel-filter-box">
            <div className="catalog-wheel-label">
              <Filter size={15} />
              <span>{lang === 'ar' ? 'فلترة حسب نوع المشروع:' : 'Filter by Category:'}</span>
            </div>
            <OptionWheel
              options={wheelOptions}
              selectedIndex={selectedCategoryIdx}
              onChange={(index) => setSelectedCategoryIdx(index)}
              visibleCount={5}
              itemHeight={44}
              perspective={900}
              radius={100}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="catalog-counter-bar">
          <span className="catalog-counter-text">
            {lang === 'ar' 
              ? `تم العثور على ${filteredProjects.length} مشروعاً موثقاً` 
              : `Found ${filteredProjects.length} documented projects`}
          </span>
          {activeCategoryKey !== 'all' && (
            <span className="catalog-active-filter-badge">
              {getCategoryBadgeLabel(activeCategoryKey)}
              <button 
                type="button" 
                onClick={() => setSelectedCategoryIdx(0)}
                className="clear-cat-btn"
                title={lang === 'ar' ? 'إلغاء الفلتر' : 'Clear filter'}
              >
                ✕
              </button>
            </span>
          )}
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="catalog-empty-state">
            <BookOpen size={48} className="empty-state-icon" />
            <h3>{lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No Matching Projects Found'}</h3>
            <p>{lang === 'ar' ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة من عجلة الفلترة' : 'Try searching with different keywords or select another category from the wheel.'}</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredProjects.map((project) => {
              const projectTitle = lang === 'ar' ? project.title : project.titleEn;
              const projectDesc = lang === 'ar' ? project.description : project.descriptionEn;
              const pdfId = project.pdfId || '1edEWYRLqtgSVRw0Eq7NmCldb_fxzi5OW';
              const pdfDownloadUrl = `https://drive.google.com/uc?export=download&id=${pdfId}`;
              const pptxDownloadUrl = project.pptxId ? `https://drive.google.com/uc?export=download&id=${project.pptxId}` : null;
              const docxDownloadUrl = project.docxId ? `https://drive.google.com/uc?export=download&id=${project.docxId}` : null;

              return (
                <article key={project.id} className="catalog-card">
                  {/* Card Top: Category & File Availability Badges */}
                  <div className="catalog-card-header">
                    <span className={`catalog-cat-badge cat-${project.category}`}>
                      {getCategoryBadgeLabel(project.category)}
                    </span>
                    <div className="catalog-file-badges">
                      {project.docxId && (
                        <span className="file-badge docx" title="Word Document (DOCX)">
                          <FileCode size={12} />
                          <span>DOCX</span>
                        </span>
                      )}
                      {project.pptxId && (
                        <span className="file-badge pptx" title="PowerPoint Presentation (PPTX)">
                          <Presentation size={12} />
                          <span>PPTX</span>
                        </span>
                      )}
                      <span className="file-badge pdf" title="PDF Document">
                        <FileText size={12} />
                        <span>PDF</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="catalog-card-title">{projectTitle}</h3>
                  <p className="catalog-card-desc">{projectDesc}</p>

                  {/* Tags */}
                  <div className="catalog-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="catalog-tag">#{tag}</span>
                    ))}
                  </div>

                  {/* Card Actions: Flipbook Reader + Downloads */}
                  <div className="catalog-card-actions">
                    {/* Primary Button: Read as Flipbook */}
                    <button
                      type="button"
                      className="catalog-btn-read-flipbook"
                      onClick={() => setActiveReadingProject(project)}
                      title={lang === 'ar' ? 'تصفح وقراءة المستند ورplotقياً' : 'Read Document as Flipbook'}
                    >
                      <BookOpen size={16} />
                      <span>{lang === 'ar' ? 'قراءة المستند (تصفح ورقي)' : 'Read Document (Flipbook)'}</span>
                    </button>

                    {/* Secondary Direct Download Buttons */}
                    <div className="catalog-btn-downloads-row">
                      {docxDownloadUrl && (
                        <a
                          href={docxDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="catalog-btn-download docx"
                          title={lang === 'ar' ? 'تحميل ملف الوورد DOCX' : 'Download Word Document DOCX'}
                        >
                          <Download size={13} />
                          <span>{lang === 'ar' ? 'تحميل DOCX' : 'Download DOCX'}</span>
                        </a>
                      )}
                      {pptxDownloadUrl && (
                        <a
                          href={pptxDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="catalog-btn-download pptx"
                          title={lang === 'ar' ? 'تحميل العرض التقديمي PPTX' : 'Download Presentation PPTX'}
                        >
                          <Download size={13} />
                          <span>{lang === 'ar' ? 'تحميل PPTX' : 'Download PPTX'}</span>
                        </a>
                      )}
                      <a
                        href={pdfDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="catalog-btn-download pdf"
                        title={lang === 'ar' ? 'تحميل ملف المستند PDF' : 'Download Document PDF'}
                      >
                        <Download size={13} />
                        <span>{lang === 'ar' ? 'تحميل PDF' : 'Download PDF'}</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Realistic Paper Flipbook Reader Modal */}
      <DocumentReaderModal
        isOpen={Boolean(activeReadingProject)}
        project={activeReadingProject}
        onClose={() => setActiveReadingProject(null)}
      />
    </section>
  );
};

export default ProjectsCatalogSection;
