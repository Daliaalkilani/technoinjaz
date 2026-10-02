import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectMeta, getProjectMarkdown, getRelatedProjects } from '@/lib/content/projects';
import { renderMarkdown } from '@/lib/markdown';
import { plainExcerpt } from '@/lib/text';
import ProjectDetailView from '@/features/projects/ProjectDetailView';
import ProjectBody from '@/features/projects/ProjectBody';
import { pageMetadata } from '@/seo/metadata';
import ContentQA from '@/components/content/ContentQA';
import { PROJECT_QA } from '@/data/qa/projects';
import { JsonLd } from '@/seo/JsonLd';
import { projectWork, breadcrumb, qaSchema } from '@/seo/schemas';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectMeta(slug);
  if (!project) return { title: 'المشروع غير موجود' };

  return pageMetadata({
    title: project.seoTitle || project.title,
    description: plainExcerpt(project.metaDesc || project.excerpt),
    path: `/projects/${project.slug}`,
    image: project.image,
    absoluteTitle: true
  });
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectMeta(slug);
  if (!project) notFound();

  const md = await getProjectMarkdown(slug);
  const { html, toc } = renderMarkdown(md, { stripLeadingH1: true, variant: 'project' });
  const related = getRelatedProjects(slug, 3);
  const qaItems = PROJECT_QA[slug] ?? [];

  const breadcrumbItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المشاريع', path: '/projects' },
    { name: project.title, path: `/projects/${project.slug}` }
  ];

  return (
    <>
      <JsonLd data={[projectWork(project), breadcrumb(breadcrumbItems), ...(qaItems.length ? [qaSchema(qaItems)] : [])]} />
      <div className="tab-page-container" style={{ padding: 0, maxWidth: '100%' }}>
        <ProjectDetailView
          project={project}
          toc={toc}
          related={related}
          qa={<ContentQA items={qaItems} title="أسئلة وأجوبة حول المشروع" />}
        >
          <ProjectBody html={html} />
        </ProjectDetailView>
      </div>
    </>
  );
}
