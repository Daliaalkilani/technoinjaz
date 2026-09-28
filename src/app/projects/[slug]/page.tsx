import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectMeta, getProjectMarkdown, getRelatedProjects } from '@/lib/content/projects';
import { renderMarkdown } from '@/lib/markdown';
import { plainExcerpt } from '@/lib/text';
import ProjectDetailView from '@/components/projects/ProjectDetailView';
import ProjectBody from '@/components/projects/ProjectBody';
import { SITE_URL } from '@/config/site';

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

  const title = `${project.seoTitle || project.title} | تكنو إنجاز`;
  const description = plainExcerpt(project.metaDesc || project.excerpt);
  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: project.image.startsWith('http') ? project.image : `${SITE_URL}${project.image}`,
          alt: project.altText || project.title
        }
      ]
    }
  };
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

  return (
    <div className="tab-page-container" style={{ padding: 0, maxWidth: '100%' }}>
      <ProjectDetailView project={project} toc={toc} related={related}>
        <ProjectBody html={html} />
      </ProjectDetailView>
    </div>
  );
}
