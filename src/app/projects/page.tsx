import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import ProjectsCatalogSection from '@/components/projects/ProjectsCatalogSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, itemList } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'المشاريع الهندسية والأنظمة التطبيقية',
  description: 'استعراض النماذج التطبيقية والمنظومات الهندسية في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات والأنظمة السحابية المنجزة بدعم ومساندة مكتب تكنو إنجاز.',
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
      <JsonLd
        data={[
          webPage({ path: '/projects', name: 'المشاريع الهندسية', type: 'CollectionPage' }),
          itemList(listItems)
        ]}
      />
      <ProjectsCatalogSection projects={projects} />
    </>
  );
}
