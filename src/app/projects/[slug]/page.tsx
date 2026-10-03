import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectMeta, getProjectMarkdown, getProjectMarkdownEn, getRelatedProjects } from '@/lib/content/projects';
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
  // English body: shipped in parallel so the client can flip languages without a reload.
  const mdEn = await getProjectMarkdownEn(slug);
  const mdEnRendered = mdEn ? renderMarkdown(mdEn, { stripLeadingH1: true, variant: 'project' }) : null;
  const htmlEn = mdEnRendered ? mdEnRendered.html : null;
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
    { name: 'الرئيسية', path: '/' },
    { name: 'المشاريع', path: '/projects' },
    { name: project.title, path: `/projects/${project.slug}` }
  ];

  return (
    <>
      <JsonLd data={[projectWork(project), breadcrumb(breadcrumbItems), ...(qaItems.length ? [qaSchema(qaItems)] : [])]} />
      <div className="tab-page-container" style={{ padding: 0, maxWidth: '100%' }}>
        <ProjectDetailView
          project={projectWithFiles}
          toc={toc}
          tocEn={mdEnRendered ? mdEnRendered.toc : null}
          related={related}
          qa={<ContentQA items={qaItems} title="الأسئلة الشائعة حول المشروع"  titleEn="Frequently Asked Questions" />}
        >
          <ProjectBody html={html} htmlEn={htmlEn} />
        </ProjectDetailView>
      </div>
    </>
  );
}
