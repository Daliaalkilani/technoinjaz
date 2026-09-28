import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const projectsDataPath = path.resolve('src/data/projectsData.ts');
const contentProjectsDir = path.resolve('src/content/projects');

if (!fs.existsSync(contentProjectsDir)) {
  fs.mkdirSync(contentProjectsDir, { recursive: true });
}

const fileContent = fs.readFileSync(projectsDataPath, 'utf8');

// Extract PROJECTS_DATA array text
const match = fileContent.match(/export const PROJECTS_DATA: ProjectItem\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not find PROJECTS_DATA array in projectsData.ts');
  process.exit(1);
}

// Evaluate PROJECTS_DATA safely by parsing JSON-like structure
// Each object in PROJECTS_DATA is valid JSON-like object
let projects;
try {
  // Try evaluating the array literal using Function
  projects = new Function(`return ${match[1]}`)();
} catch (e) {
  console.error('Failed to parse PROJECTS_DATA:', e);
  process.exit(1);
}

console.log(`Found ${projects.length} projects in projectsData.ts`);

let hasError = false;

for (const p of projects) {
  const { slug, markdownContent } = p;
  if (!slug || typeof markdownContent !== 'string') {
    console.error(`Invalid project data for ${slug}`);
    hasError = true;
    continue;
  }

  const targetFile = path.join(contentProjectsDir, `${slug}.md`);
  fs.writeFileSync(targetFile, markdownContent, { encoding: 'utf8' });

  // Read back and compare SHA-256
  const readBack = fs.readFileSync(targetFile, 'utf8');
  const originalHash = crypto.createHash('sha256').update(markdownContent, 'utf8').digest('hex');
  const readHash = crypto.createHash('sha256').update(readBack, 'utf8').digest('hex');

  if (originalHash !== readHash) {
    console.error(`SHA-256 mismatch for ${slug}!`);
    hasError = true;
  } else {
    console.log(`✓ ${slug}.md extracted and verified (SHA-256: ${originalHash.slice(0, 8)}...)`);
  }
}

if (hasError) {
  console.error('Extraction failed with errors.');
  process.exit(1);
}

console.log('All project markdown files extracted and verified successfully.');

// Now strip markdownContent from projectsData.ts
const strippedProjects = projects.map(p => {
  const copy = { ...p };
  delete copy.markdownContent;
  return copy;
});

const updatedContent = `// Techno Enjaz - Projects & Portfolio Data (Single Source of Truth)

export type ProjectCategory = 'all' | 'vision' | 'ai' | 'systems' | 'web' | 'mobile';

export interface ProjectItem {
  id: string;
  slug: string;
  folderName: string;
  title: string;
  excerpt: string;
  category: 'vision' | 'ai' | 'systems' | 'web' | 'mobile';
  categoryNameAr: string;
  categoryNameEn: string;
  seoTitle: string;
  metaDesc: string;
  h1?: string;
  altText: string;
  image: string;
  tags: string[];
  roleQualifier: string;
}

export const PROJECTS_DATA: ProjectItem[] = ${JSON.stringify(strippedProjects, null, 2)};
`;

fs.writeFileSync(projectsDataPath, updatedContent, 'utf8');
console.log('Updated projectsData.ts: stripped markdownContent and removed from interface.');
