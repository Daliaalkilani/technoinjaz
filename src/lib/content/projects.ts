import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECTS_DATA, type ProjectItem, getProjectBySlug, getRelatedProjects } from '@/data/projectsData';

const DIR = path.join(process.cwd(), 'src/content/projects');

export const getAllProjects = (): ProjectItem[] => PROJECTS_DATA;

export const getProjectMeta = (slug: string): ProjectItem | null =>
  getProjectBySlug(slug) ?? null;

export async function getProjectMarkdown(slug: string): Promise<string> {
  return readFile(path.join(DIR, `${slug}.md`), 'utf8');
}

export { getRelatedProjects };
