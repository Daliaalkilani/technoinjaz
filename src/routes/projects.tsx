import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectMeta, getProjectMarkdown, getProjectMarkdownEn, getRelatedProjects } from '@/lib/content/projects';
import { renderMarkdown } from '@/lib/markdown';
import { plainExcerpt } from '@/lib/text';
import ProjectsHeader from '@/features/projects/ProjectsHeader';
import { LiveProjectsShowcase } from '@/features/projects/LiveProjectsShowcase';
import ProjectsCatalogSection from '@/features/projects/ProjectsCatalogSection';
import ProjectDetailView from '@/features/projects/ProjectDetailView';
import ProjectBody from '@/features/projects/ProjectBody';
import ContentQA from '@/components/content/ContentQA';
import { PROJECT_QA } from '@/data/qa/projects';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, itemList, projectWork, breadcrumb, qaSchema } from '@/seo/schemas';
import { projectLastModified } from '@/lib/content/lastModified';
import { localizeHtmlLinks, type Lang } from '@/i18n/locale';

export const projectParams = () => getAllProjects().map((p) => ({ slug: p.slug }));

export const projectsMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'Engineering Projects' : 'المشاريع الهندسية',
    description:
      lang === 'en'
        ? 'Explore projects delivered by Techno Enjaz: AI systems, computer vision, robotics and cloud platforms — real applied prototypes with full technical details and footage from the actual build.'
        : 'استعرض مشاريع تكنو إنجاز المنفذة: أنظمة ذكاء اصطناعي، رؤية حاسوبية، روبوتات، وأنظمة سحابية — نماذج تطبيقية حقيقية بتفاصيل تقنية كاملة ولقطات من التنفيذ الفعلي.',
    path: '/projects'
  });

// Preload the LCP image (first live-project preview) so the browser fetches it before JS runs.
const lcpPreload = (
  <link
    rel="preload"
    as="image"
    {...({
      imagesrcset: '/_img/images/platforms/hisab-erp.640.avif 640w, /_img/images/platforms/hisab-erp.960.avif 960w, /_img/images/platforms/hisab-erp.1280.avif 1280w',
      imagesizes: '(max-width: 640px) 100vw, 60vw',
    } as Record<string, string>)}
    fetchPriority="high"
  />
);

export function ProjectsRoute({ lang }: { lang: Lang }) {
  const en = lang === 'en';
  const projects = getAllProjects();
  const listItems = projects.map((p) => ({
    name: en ? p.titleEn || p.title : p.title,
    path: `/projects/${p.slug}`
  }));

  return (
    <>
      {lcpPreload}
      <JsonLd
        data={[
          webPage({ lang, path: '/projects', name: en ? 'Engineering Projects' : 'المشاريع الهندسية', type: 'CollectionPage' }),
          itemList(listItems, lang)
        ]}
      />
      <div className="tab-page-container tab-page-projects" style={{ padding: 0, maxWidth: '100%' }}>
        {/* 1. Live Projects & Web Systems Showcase at the beginning */}
        <ProjectsHeader />
        <LiveProjectsShowcase />

        {/* 2. Full Projects & Research Catalog */}
        <ProjectsCatalogSection projects={projects} />
      </div>
    </>
  );
}

export function projectMetadata(lang: Lang, slug: string): Metadata {
  const project = getProjectMeta(slug);
  if (!project) return { title: lang === 'en' ? 'Project not found' : 'المشروع غير موجود' };
  const en = lang === 'en';

  return pageMetadata({
    lang,
    title: en ? project.seoTitleEn || project.titleEn || project.seoTitle || project.title : project.seoTitle || project.title,
    description: en
      ? plainExcerpt(project.metaDescEn || project.excerptEn || '', project.metaDesc || project.excerpt)
      : plainExcerpt(project.metaDesc || project.excerpt),
    path: `/projects/${project.slug}`,
    image: project.image,
    absoluteTitle: true
  });
}

export async function ProjectRoute({ lang, slug }: { lang: Lang; slug: string }) {
  const project = getProjectMeta(slug);
  if (!project) notFound();
  const en = lang === 'en';

  // Only the body of the page language is rendered and shipped (falls back to the
  // Arabic body while an English translation is missing).
  const mdEn = en ? await getProjectMarkdownEn(slug) : null;
  const md = mdEn ?? (await getProjectMarkdown(slug));
  const { html, toc } = renderMarkdown(md, { stripLeadingH1: true, variant: 'project' });
  const bodyHtml = localizeHtmlLinks(lang, html);
  const related = getRelatedProjects(slug, 3);
  const qaItems = PROJECT_QA[slug] ?? [];

  // Project files are picked up by slug at build time; a project without its own file
  // shows no PDF / PPTX button and no book (never someone else's document).
  const publicFile = (rel: string) => (fs.existsSync(path.join(process.cwd(), 'public', rel)) ? `/${rel}` : undefined);
  const projectWithFiles = {
    ...project,
    pdfUrl: project.pdfUrl || publicFile(`docs/projects/${slug}.pdf`),
    presentationUrl: project.presentationUrl || publicFile(`presentations/${slug}.pptx`)
  };

  const breadcrumbItems = [
    { name: en ? 'Home' : 'الرئيسية', path: '/' },
    { name: en ? 'Projects' : 'المشاريع', path: '/projects' },
    { name: en ? project.titleEn || project.title : project.title, path: `/projects/${project.slug}` }
  ];

  return (
    <>
      <JsonLd data={[projectWork(project, { dateModified: projectLastModified(project.slug), lang }), breadcrumb(breadcrumbItems, lang), ...(qaItems.length ? [qaSchema(qaItems, lang)] : [])]} />
      <div className="tab-page-container" style={{ padding: 0, maxWidth: '100%' }}>
        <ProjectDetailView
          project={projectWithFiles}
          toc={toc}
          tocEn={mdEn ? toc : null}
          related={related}
          qa={<ContentQA items={qaItems} title="الأسئلة الشائعة حول المشروع"  titleEn="Frequently Asked Questions" />}
        >
          <ProjectBody html={bodyHtml} htmlEn={mdEn ? bodyHtml : null} />
        </ProjectDetailView>
      </div>
    </>
  );
}
