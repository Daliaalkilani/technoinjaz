import { getAllArticles } from '@/lib/content/articles';
import { getAllProjects } from '@/lib/content/projects';
import { projectReelsData } from '@/data/projectReelsData';
import { ORG, absoluteUrl } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const articles = getAllArticles();
  const projects = getAllProjects();

  let text = `# Techno Enjaz | ${ORG.nameAr}

> ${ORG.descriptionAr}

## Identity
- Website: ${absoluteUrl('/')}
- Location: ${ORG.address.addressLocality}, ${ORG.address.addressCountry}
- Phone: ${ORG.telephone}
- Email: ${ORG.email}
- Instagram: ${ORG.instagram}

## Main Sections
- [الرئيسية](${absoluteUrl('/')})
- [المشاريع الهندسية](${absoluteUrl('/projects')})
- [المدونة الهندسية](${absoluteUrl('/articles')})
- [المشاريع الحية ومقاطع الفيديو](${absoluteUrl('/videos')})
- [الأسئلة الشائعة](${absoluteUrl('/faq')})
- [من نحن](${absoluteUrl('/about')})
- [اتصل بنا](${absoluteUrl('/contact')})

## Articles
`;

  for (const a of articles) {
    text += `- [${a.title}](${absoluteUrl('/articles/' + a.slug)}): ${a.metaDescription || a.excerpt}\n`;
  }

  text += `\n## Projects\n`;
  for (const p of projects) {
    text += `- [${p.title}](${absoluteUrl('/projects/' + p.slug)}): ${p.metaDesc || p.excerpt}\n`;
  }

  text += `\n## Live Platforms\n`;
  for (const r of projectReelsData) {
    text += `- [${r.title}](${r.liveUrl}): ${r.description}\n`;
  }

  return new Response(text.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
