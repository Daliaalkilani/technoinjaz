import type { Metadata } from 'next';
import { projectParams, projectMetadata, ProjectRoute } from '@/routes/projects';

export const dynamic = 'force-static';
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return projectMetadata('ar', (await params).slug);
}

export default async function ProjectPage({ params }: Props) {
  return <ProjectRoute lang="ar" slug={(await params).slug} />;
}
