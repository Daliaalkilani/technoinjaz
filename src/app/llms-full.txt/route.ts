import { getAllArticles } from '@/lib/content/articles';
import { getAllProjects } from '@/lib/content/projects';
import { projectReelsData } from '@/data/projectReelsData';
import { faqData } from '@/data/faqData';
import { ARTICLE_QA } from '@/data/qa/articles';
import { PROJECT_QA } from '@/data/qa/projects';
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
    for (const qa of ARTICLE_QA[a.slug] ?? []) text += `Q: ${qa.q}\nA: ${qa.a}\n\n`;
  }

  text += `## Engineering Projects & Prototypes\n`;
  for (const p of projects) {
    text += `### ${p.title}\n- URL: ${absoluteUrl('/projects/' + p.slug)}\n- Category: ${p.categoryNameAr}\n- Overview: ${p.excerpt}\n\n`;
    for (const qa of PROJECT_QA[p.slug] ?? []) text += `Q: ${qa.q}\nA: ${qa.a}\n\n`;
  }

  text += `## Leadership & Founder
### المهندس عبد الغني الحمدي (Eng. Abdulghani Alhamdi)
- **الصفة والدور**: مستشار في المشاريع الهندسية ومشاريع التخرج، مدرب في المجالات التقنية، وقائد ومؤسس فريق «تكنو إنجاز».
- **شعار ومقولة**: «التغيير يبدأ من الداخل، ابدأ بنفسك ثم غيّر العالم»
- **الرؤية (Vision)**: تكوين مجتمع مترابط ومستقل ذو كفاءة عالية.
- **الرسالة (Mission)**: التطور والتقدم العلمي والعملي للرقي بجميع المجالات.
- **الأهداف (Goals)**: رفع الوعي للأشخاص الطموحين ومتابعتهم عن طريق استقطاب مشاريع وتدريبهم بها.
- **الدرجات العلمية والشهادات**:
  - ماجستير في هندسة التحكم والأتمتة - جامعة حلب.
  - بكالوريوس في هندسة التحكم الآلي والحواسيب - جامعة البعث.
  - شهادة الباسل للمرتبة الأولى للتفوق الدراسي (السنة الرابعة).
- **الإنجازات والجوائز**:
  - المركز السادس ضمن مسابقة «تميّز للإبداع والاختراع» على مستوى القطر السوري.
  - إنجاز والإشراف على أكثر من 500 مشروع تقني وتخرج خلال السنوات الخمس الماضية.
- **مجالات التدريب والدورات المقدمة**:
  - برمجة لوحات الأردوينو والمتحكمات الدقيقة (Arduino Microcontrollers).
  - الروبوتات المتنقلة والروبوتيك وأنظمة الملاحة الذكية (Mobile Robotics).
  - أنظمة التحكم الصناعي والأتمتة ودوائر الـ PLC (Industrial Control Systems).
  - إدارة وتطوير وهيكلة المشاريع الهندسية (Engineering Project Management).
- **المشورة الهندسية**: يقدم الدعم والمشورة الفنية للطلاب والمهندسين في مشاريع التخرج، وتطوير المهارات في البرمجة والروبوتيك والتحكم.
- **الملف التعريفي**: ${absoluteUrl('/about#team')}

## Live Platforms\n`;
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
