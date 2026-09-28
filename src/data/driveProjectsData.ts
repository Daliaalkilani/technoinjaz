// Legacy Drive Projects alias - mapped directly to PROJECTS_DATA (Single Source of Truth)
import { PROJECTS_DATA } from './projectsData';

export type ProjectCategory = 'all' | 'ai' | 'vision' | 'systems' | 'web' | 'mobile';

export interface DriveProject {
  id: string;
  title: string;
  titleEn: string;
  category: 'ai' | 'vision' | 'systems' | 'web' | 'mobile';
  description: string;
  descriptionEn: string;
  pdfId?: string;
  docxId?: string;
  pptxId?: string;
  folderId?: string;
  tags: string[];
  image?: string;
}

export const DRIVE_PROJECTS: DriveProject[] = PROJECTS_DATA.map((p) => ({
  id: p.slug,
  title: p.title,
  titleEn: p.seoTitle,
  category: p.category,
  description: p.excerpt,
  descriptionEn: p.metaDesc,
  tags: p.tags,
  image: p.image
}));