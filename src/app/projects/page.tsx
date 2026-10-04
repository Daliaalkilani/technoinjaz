import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import ProjectsHeader from '@/features/projects/ProjectsHeader';
import { LiveProjectsShowcase } from '@/features/projects/LiveProjectsShowcase';
import ProjectsCatalogSection from '@/features/projects/ProjectsCatalogSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, itemList } from '@/seo/schemas';

export const dynamic = 'force-static';

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

export const metadata: Metadata = pageMetadata({
  title: 'المشاريع الهندسية',
  description: 'استعرض مشاريع تكنو إنجاز المنفذة: أنظمة ذكاء اصطناعي، رؤية حاسوبية، روبوتات، وأنظمة سحابية — نماذج تطبيقية حقيقية بتفاصيل تقنية كاملة ولقطات من التنفيذ الفعلي.',
  path: '/projects'
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const listItems = projects.map((p) => ({
    name: p.title,
    path: `/projects/${p.slug}`
  }));

  return (
    <>
      {lcpPreload}
      <JsonLd
        data={[
          webPage({ path: '/projects', name: 'المشاريع الهندسية', type: 'CollectionPage' }),
          itemList(listItems)
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
