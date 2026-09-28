import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

// Articles
const blogArticlesFile = fs.readFileSync(path.join(rootDir, 'src/data/blogArticlesData.ts'), 'utf8');
const articleMatches = [...blogArticlesFile.matchAll(/["']?slug["']?:\s*['"]([a-z0-9-]+)['"]/g)].map(m => m[1]);
const articles = [...new Set(articleMatches)];

// Projects
const projectsFile = fs.readFileSync(path.join(rootDir, 'src/data/projectsData.ts'), 'utf8');
const projectMatches = [...projectsFile.matchAll(/["']?slug["']?:\s*['"]([a-z0-9-]+)['"]/g)].map(m => m[1]);
const projects = [...new Set(projectMatches)];

// Team members
const teamFile = fs.readFileSync(path.join(rootDir, 'src/data/teamData.js'), 'utf8');
const teamMatches = [...teamFile.matchAll(/["']?id["']?:\s*['"]([a-z0-9-]+)['"]/g)].map(m => m[1]);
const team = [...new Set(teamMatches)];

const inventory = {
  canonicalDomain: 'https://technoenjaz.com',
  generatedAt: new Date().toISOString(),
  counts: {
    articles: articles.length,
    projects: projects.length,
    team: team.length
  },
  routes: {
    static: [
      '/',
      '/projects',
      '/articles',
      '/videos',
      '/faq',
      '/about',
      '/contact'
    ],
    private: [
      '/login',
      '/register',
      '/account'
    ],
    articles: articles.map(s => `/articles/${s}`),
    projects: projects.map(s => `/projects/${s}`),
    team: team.map(id => `/team/${id}`)
  },
  slugs: {
    articles,
    projects,
    team
  }
};

fs.writeFileSync(path.join(rootDir, 'docs/url-inventory.json'), JSON.stringify(inventory, null, 2), 'utf8');
console.log(`URL inventory generated successfully: ${articles.length} articles, ${projects.length} projects, ${team.length} team members.`);
