import { getAllArticles } from '@/lib/content/articles';
import { getAllProjects } from '@/lib/content/projects';
import { projectReelsData } from '@/data/projectReelsData';
import { faqData } from '@/data/faqData';
import { ORG, absoluteUrl } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const articles = getAllArticles();
  const projects = getAllProjects();

  let text = `# Techno Enjaz | ${ORG.nameAr} (Comprehensive Knowledge Base)

> ${ORG.descriptionAr}

## Identity
- Website: ${absoluteUrl('/')}
- Location: ${ORG.address.addressLocality}, ${ORG.address.addressCountry}
- Address: ${ORG.address.streetAddress}
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

## Engineering Articles
`;

  for (const a of articles) {
    text += `### ${a.title}\n- URL: ${absoluteUrl('/articles/' + a.slug)}\n- Category: ${a.category} (${a.categoryEn})\n- Published: ${a.publishedAt}\n- Summary: ${a.metaDescription || a.excerpt}\n\n`;
  }

  text += `## Engineering Projects & Prototypes\n`;
  for (const p of projects) {
    text += `### ${p.title}\n- URL: ${absoluteUrl('/projects/' + p.slug)}\n- Category: ${p.categoryNameAr}\n- Nature: ${p.roleQualifier}\n- Overview: ${p.excerpt}\n\n`;
  }

  text += `## Live Platforms\n`;
  for (const r of projectReelsData) {
    text += `### ${r.title}\n- Demo URL: ${r.liveUrl}\n- Category: ${r.category}\n- Description: ${r.description}\n\n`;
  }

  text += `## Frequently Asked Questions (FAQ)\n`;
  for (const f of faqData) {
    text += `Q: ${f.question}\nA: ${f.answer}\n\n`;
  }

  return new Response(text.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
