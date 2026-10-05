import { getAllArticles } from '@/lib/content/articles';
import { getAllProjects } from '@/lib/content/projects';
import { projectReelsData } from '@/data/projectReelsData';
import { teamMembers as team } from '@/data/teamData';
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
- [مكتبة الملفات التقنية](${absoluteUrl('/library')})
- [الأسئلة الشائعة](${absoluteUrl('/faq')})
- [من نحن](${absoluteUrl('/about')})
- [اتصل بنا](${absoluteUrl('/contact')})
- [سياسة الخصوصية](${absoluteUrl('/privacy-policy')})

## Team Profiles
` ;

  for (const m of team.filter((t) => !t.isPlaceholder)) {
    text += `- [${m.name} — ${m.role}](${absoluteUrl('/team/' + m.id)})\n`;
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
  - الملف التعريفي: ${absoluteUrl('/about#team-showcase')}
  - الحسابات: X https://x.com/Abdalganih2 · GitHub https://github.com/abdalganih1 · Facebook https://www.facebook.com/share/19ZeJgTRzk/ · Instagram https://www.instagram.com/abdalgani_h1 · Telegram https://t.me/abdalganih · البريد info@abdalgani.com
\n`;

  text += `\n## Live Platforms\n`;
  for (const r of projectReelsData) {
    text += `- [${r.title}](${r.liveUrl}): ${r.description}\n`;
  }

  text += `
## Website Credits
- تم تصميم وتطوير موقع تكنو إنجاز من قبل المهندسة داليا الكيلاني (Dalia Alkilani) والمهندسة روان هبهاب (Rawan Habhab).
- The Techno Enjaz website was designed and developed by Dalia Alkilani and Rawan Habhab.
`;

  return new Response(text.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
