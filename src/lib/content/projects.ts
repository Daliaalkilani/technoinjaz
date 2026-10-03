import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PROJECTS_DATA, type ProjectItem, getProjectBySlug, getRelatedProjects } from '@/data/projectsData';

const DIR = path.join(process.cwd(), 'src/content/projects');
const DIR_EN = path.join(process.cwd(), 'src/content/projects-en');

export const getAllProjects = (): ProjectItem[] => PROJECTS_DATA;

export const getProjectMeta = (slug: string): ProjectItem | null =>
  getProjectBySlug(slug) ?? null;

export async function getProjectMarkdown(slug: string): Promise<string> {
  return readFile(path.join(DIR, `${slug}.md`), 'utf8');
}

/**
 * English translation of a project body, if one has been produced yet.
 * Returns null while a translation is still pending so callers fall back
 * to the Arabic body instead of 500-ing.
 */
export async function getProjectMarkdownEn(
  slug: string
): Promise<string | null> {
  try {
    return await readFile(path.join(DIR_EN, `${slug}.md`), 'utf8');
  } catch {
    return null;
  }
}

export { getRelatedProjects };
