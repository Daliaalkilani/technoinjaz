import { getAllArticles } from '@/lib/content/articles';
import { getAllProjects } from '@/lib/content/projects';
import { projectReelsData } from '@/data/projectReelsData';
import { videosList } from '@/data/videosData';
import { teamMembers as team } from '@/data/teamData';
import { ORG, absoluteUrl } from '@/config/site';
import { plainNameEn } from '@/seo/team';

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
- [مكتبة الملفات التقنية](${absoluteUrl('/library')})
- [الأسئلة الشائعة](${absoluteUrl('/faq')})
- [من نحن](${absoluteUrl('/about')})
- [اتصل بنا](${absoluteUrl('/contact')})
- [سياسة الخصوصية](${absoluteUrl('/privacy-policy')})

## Languages
- Arabic (default, RTL): ${absoluteUrl('/')}
- English (LTR): ${absoluteUrl('/en')} — every page has an English twin at the same path under /en (e.g. ${absoluteUrl('/en/articles')}), linked with hreflang ar ↔ en.

## Team Profiles
` ;

  for (const m of team.filter((t) => t && !t.isPlaceholder) as NonNullable<(typeof team)[number]>[]) {
    const en = plainNameEn(m);
    text += `- [${m.name}${en ? ` (${en})` : ''} — ${m.role}${m.roleEn ? ` / ${m.roleEn}` : ''}](${absoluteUrl('/team/' + m.id)})\n`;
  }

  text += `
## Articles
`;

  for (const a of articles) {
    text += `- [${a.title}](${absoluteUrl('/articles/' + a.slug)}): ${a.metaDescription || a.excerpt}\n`;
  }

  text += `\n## Projects\n`;
  for (const p of projects) {
    text += `- [${p.title}](${absoluteUrl('/projects/' + p.slug)}): ${p.metaDesc || p.excerpt}\n`;
  }

  text += `\n## Leadership & Founder
- **المهندس عبد الغني الحمدي (Eng. Abdalgani Alhamdi)**:
  - الدور والصفة: مستشار في المشاريع الهندسية ومشاريع التخرج، مدرب في المجالات التقنية، وقائد ومؤسس فريق تكنو إنجاز.
  - المقولة والشعار: «التغيير يبدأ من الداخل، ابدأ بنفسك ثم غيّر العالم»
  - الرؤية (Vision): تكوين مجتمع مترابط ومستقل ذو كفاءة عالية.
  - الرسالة (Mission): التطور والتقدم العلمي والعملي للرقي بجميع المجالات.
  - الأهداف (Goals): رفع الوعي للأشخاص الطموحين ومتابعتهم عن طريق استقطاب مشاريع وتدريبهم بها.
  - التعليم والشهادات: ماجستير في هندسة التحكم والأتمتة من جامعة حلب، بكالوريوس في هندسة التحكم الآلي والحواسيب من جامعة البعث (حاصل على شهادة الباسل للمرتبة الأولى للتفوق الدراسي).
  - الإنجازات والجوائز: إنجاز والإشراف على أكثر من 500 مشروع تقني وتخرج خلال 5 سنوات، ونال المركز السادس ضمن مسابقة «تميّز للإبداع والاختراع» على مستوى القطر.
  - الملف التعريفي: ${absoluteUrl('/team/abdulghani')}
  - الحسابات: X https://x.com/Abdalganih2 · GitHub https://github.com/abdalganih1 · Facebook https://www.facebook.com/share/19ZeJgTRzk/ · Instagram https://www.instagram.com/abdalgani_h1/ · Telegram https://t.me/abdalganih · البريد info@abdalgani.com
\n`;

  text += `\n## Live Platforms\n`;
  for (const r of projectReelsData) {
    text += `- [${r.title}](${r.liveUrl}): ${r.description}\n`;
  }

  text += `\n## Engineering Videos\n`;
  for (const v of videosList) {
    text += `- [${v.title} — ${v.titleEn}](${v.youtubeUrl}) (${v.duration}): ${v.description}\n`;
  }

  // English twins of every page (full English content: titles, bodies, metadata).
  text += `
## English Version
- [Home](${absoluteUrl('/en')})
- [Engineering Projects](${absoluteUrl('/en/projects')})
- [Engineering Blog](${absoluteUrl('/en/articles')})
- [Live Projects & Videos](${absoluteUrl('/en/videos')})
- [Interactive Library](${absoluteUrl('/en/library')})
- [FAQ](${absoluteUrl('/en/faq')})
- [About Us & Team](${absoluteUrl('/en/about')})
- [Contact](${absoluteUrl('/en/contact')})
- [Privacy Policy](${absoluteUrl('/en/privacy-policy')})

### Team Profiles (English)
`;
  for (const m of team.filter((t) => t && !t.isPlaceholder) as NonNullable<(typeof team)[number]>[]) {
    text += `- [${plainNameEn(m) || m.name}${m.roleEn ? ` — ${m.roleEn}` : ''}](${absoluteUrl('/en/team/' + m.id)})\n`;
  }
  text += `\n### Articles (English)\n`;
  for (const a of articles) {
    text += `- [${a.titleEn || a.title}](${absoluteUrl('/en/articles/' + a.slug)}): ${a.excerptEn || a.excerpt}\n`;
  }
  text += `\n### Projects (English)\n`;
  for (const p of projects) {
    text += `- [${p.titleEn || p.title}](${absoluteUrl('/en/projects/' + p.slug)}): ${p.metaDescEn || p.excerptEn || p.metaDesc || p.excerpt}\n`;
  }

  text += `
## Website Credits
- تم تصميم وتطوير موقع تكنو إنجاز من قبل المهندسة داليا الكيلاني (Dalia Alkilani — https://www.instagram.com/dalia.alkilani/ · https://www.linkedin.com/in/dalia-al-kilani/) والمهندسة روان هبهاب (Rawan Habhab).
- The Techno Enjaz website was designed and developed by Dalia Alkilani and Rawan Habhab.
`;

  return new Response(text.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
