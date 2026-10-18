import type { Metadata } from 'next';
import { projectsMetadata, ProjectsRoute } from '@/routes/projects';

export const dynamic = 'force-static';

export const metadata: Metadata = projectsMetadata('ar');

export default function ProjectsPage() {
  return <ProjectsRoute lang="ar" />;
}
