import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import ProjectsCatalogSection from '@/components/projects/ProjectsCatalogSection';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'المشاريع الهندسية والأنظمة التطبيقية | تكنو إنجاز',
  description: 'استعراض النماذج التطبيقية والمنظومات الهندسية في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات والأنظمة السحابية المنجزة بدعم ومساندة مكتب تكنو إنجاز.',
  alternates: {
    canonical: `${SITE_URL}/projects`
  }
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return <ProjectsCatalogSection projects={projects} />;
}
