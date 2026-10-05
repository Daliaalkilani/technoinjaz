import { SITE_URL, ORG_ID, WEBSITE_ID, ORG, ABDULGHANI_SOCIALS, absoluteUrl } from '@/config/site';
import type { BlogArticle } from '@/data/blogArticlesData';
import type { ProjectItem } from '@/data/projectsData';
import type { FaqItem } from '@/data/faqData';
import type { QAItem } from '@/data/qa/types';
import { projectTags, plainExcerpt } from '@/lib/text';

const ABDULGHANI_ID = `${SITE_URL}/#abdulghani-alhamdi`;
const ABDULGHANI_URL = absoluteUrl('/about#team-showcase');
const ABDULGHANI_SAME_AS = Object.values(ABDULGHANI_SOCIALS);

export function abdulghaniPersonSchema() {
  const url = ABDULGHANI_URL;
  return {
    '@type': 'Person',
    '@id': ABDULGHANI_ID,
    name: 'المهندس عبد الغني الحمدي',
    alternateName: [
      'Eng. Abdulghani Alhamdi',
      'م. عبد الغني الحمدي',
      'Abdulghani Al-Hamdi',
      'عبد الغني الحمدي'
    ],
    url,
    image: absoluteUrl('/images/team/abdulghani.jpg'),
    jobTitle: 'مستشار في المشاريع الهندسية ومدرب في المجالات التقنية',
    description: 'المهندس عبد الغني الحمدي مهندس ومستشار هندسي متخصّص في مشاريع التخرّج التقنية، وقائد ومؤسس فريق «تكنو إنجاز». حاصل على درجة البكالوريوس في هندسة التحكّم الآلي والحواسيب من جامعة البعث، ويدرس الماجستير في هندسة التحكّم والأتمتة من جامعة حلب، وحاصل على شهادة الباسل للمرتبة الأولى في السنة الرابعة. ساهم في إنجاز والإشراف على أكثر من 500 مشروع تقني وتخرج خلال السنوات الخمس الماضية، وحصل على المركز السادس ضمن مسابقة «تميّز للإبداع والاختراع» على مستوى القطر.',
    knowsAbout: [
      'مشاريع التخرج الهندسية والتقنية',
      'برمجة لوحات الأردوينو',
      'الروبوتيك والروبوتات المتنقلة',
      'هندسة التحكم والأتمتة',
      'أنظمة التحكم الصناعي',
      'استشارات المشاريع الهندسية',
      'إدارة وتطوير المشاريع الهندسية'
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'جامعة حلب - كلية الهندسة الميكانيكية والكهربائية (ماجستير هندسة التحكم والأتمتة)',
        alternateName: 'University of Aleppo'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'جامعة البعث - كلية الهندسة الميكانيكية والكهربائية (بكالوريوس هندسة التحكم الآلي والحواسيب)',
        alternateName: 'Al-Baath University'
      }
    ],
    award: [
      'المركز السادس ضمن مسابقة «تميّز للإبداع والاختراع» على مستوى القطر',
      'شهادة الباسل للمرتبة الأولى في السنة الرابعة للتفوق الدراسي',
      'إنجاز والإشراف على أكثر من 500 مشروع تقني وتخرج'
    ],
    worksFor: {
      '@id': ORG_ID
    },
    disambiguatingDescription: '«التغيير يبدأ من الداخل، ابدأ بنفسك ثم غير العالم» - رؤيته: تكوين مجتمع مترابط ومستقل ذو كفاءة عالية، رسالته: التطور والتقدم العلمي والعملي للرقي بجميع المجالات، أهدافه: رفع الوعي للأشخاص الطموحين ومتابعتهم عبر استقطاب المشاريع وتدريبهم عليها.',
    sameAs: ABDULGHANI_SAME_AS,
    email: 'info@abdalgani.com'
  };
}

export function personSchema(member: any) {
  if (member.id === 'abdulghani') {
    return abdulghaniPersonSchema();
  }
  const url = absoluteUrl(`/team/${member.id}`);
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#member-${member.id}`,
    name: member.name,
    ...(member.nameEn ? { alternateName: [member.nameEn] } : {}),
    url,
    ...(member.image ? { image: absoluteUrl(member.image) } : {}),
    jobTitle: member.role,
    description: member.shortBio || member.bio,
    knowsAbout: member.skills || undefined,
    sameAs: [
      ...(member.github ? [member.github] : []),
      ...(member.facebook ? [member.facebook] : []),
      ...(member.linkedin ? [member.linkedin] : [])
    ],
    worksFor: {
      '@id': ORG_ID
    }
  };
}

export function organization() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: ORG.nameAr,
    alternateName: ORG.nameEn,
    url: SITE_URL,
    logo: ORG.logo,
    telephone: ORG.telephone,
    email: ORG.email,
    sameAs: [ORG.instagram],
    founder: abdulghaniPersonSchema(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORG.telephone,
      email: ORG.email,
      contactType: 'customer service',
      availableLanguage: ['ar', 'en']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.address.streetAddress,
      addressLocality: ORG.address.addressLocality,
      addressRegion: ORG.address.addressRegion,
      addressCountry: ORG.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ORG.geo.latitude,
      longitude: ORG.geo.longitude
    },
    hasMap: ORG.hasMap,
    description: ORG.descriptionAr
  };
}

export const WEBSITE_DESIGNERS = [
  {
    '@type': 'Person',
    name: 'داليا الكيلاني',
    alternateName: 'Dalia Alkilani',
    jobTitle: 'مصممة ومطوّرة موقع تكنو إنجاز',
    url: 'https://www.linkedin.com/in/dalia-al-kilani/',
    sameAs: ['https://github.com/Daliaalkilani', 'https://www.linkedin.com/in/dalia-al-kilani/']
  },
  {
    '@type': 'Person',
    name: 'روان هبهاب',
    alternateName: 'Rawan Habhab',
    jobTitle: 'مصممة ومطوّرة موقع تكنو إنجاز'
  }
];

export function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: ORG.nameAr,
    alternateName: ORG.nameEn,
    inLanguage: ['ar', 'en'],
    publisher: {
      '@id': ORG_ID
    },
    // Website design & development credits
    creator: WEBSITE_DESIGNERS,
    author: WEBSITE_DESIGNERS
  };
}

export function webPage({
  path,
  name,
  description,
  type = 'WebPage'
}: {
  path: string;
  name: string;
  description?: string;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'FAQPage';
}) {
  const url = absoluteUrl(path);
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: 'ar',
    isPartOf: {
      '@id': WEBSITE_ID
    },
    about: {
      '@id': ORG_ID
    }
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function blogPosting(article: BlogArticle) {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const tags = (article.tags || []).map((t) => t.replace(/_/g, ' ')).join(', ');

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    headline: article.title.length > 110 ? article.title.slice(0, 107) + '...' : article.title,
    name: article.seoTitle || article.title,
    description: article.metaDescription || article.excerpt,
    image: article.image ? (article.image.startsWith('http') ? article.image : absoluteUrl(article.image)) : absoluteUrl('/og-image.png'),
    datePublished: `${article.publishedAt}T00:00:00+03:00`,
    dateModified: `${article.modifiedAt || article.publishedAt}T00:00:00+03:00`,
    // Every article is founder-authored (ARTICLE_AUTHOR) — same @id as the Organization founder node
    author: {
      '@type': 'Person',
      '@id': ABDULGHANI_ID,
      name: article.author.name,
      alternateName: [article.author.nameEn, 'المهندس عبد الغني الحمدي', 'Abdulghani Alhamdi'],
      jobTitle: article.author.role,
      description: article.author.roleEn,
      url: ABDULGHANI_URL,
      image: absoluteUrl(article.author.avatar),
      sameAs: ABDULGHANI_SAME_AS,
      worksFor: { '@id': ORG_ID }
    },
    publisher: {
      '@id': ORG_ID
    },
    inLanguage: ['ar', 'en'],
    // AEO: voice assistants & answer engines read these sections aloud
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-excerpt', '.article-body > p:first-of-type']
    },
    articleSection: article.category,
    ...(article.categoryEn ? { alternateSection: article.categoryEn } : {}),
    ...(tags ? { keywords: tags } : {}),
    ...(article.titleEn
      ? {
          headlineEn: article.titleEn.length > 110 ? article.titleEn.slice(0, 107) + '...' : article.titleEn,
          alternativeHeadline: article.titleEn,
          ...(article.excerptEn ? { descriptionEn: article.excerptEn } : {}),
          ...(article.tagsEn?.length
            ? { keywordsEn: article.tagsEn.map((t: string) => t.replace(/_/g, ' ')).join(', ') }
            : {})
        }
      : {}),
    isPartOf: {
      '@id': WEBSITE_ID
    }
  };
}

export function projectWork(project: ProjectItem) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const cleanTags = projectTags(project.tags);

  return {
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: project.title,
    headline: project.seoTitle || project.title,
    description: plainExcerpt(project.metaDesc || project.excerpt),
    image: project.image.startsWith('http') ? project.image : absoluteUrl(project.image),
    url,
    inLanguage: ['ar', 'en'],
    // AEO: voice assistants read the project title + lead paragraph
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.project-detail-title', '.project-detail-lead']
    },
    ...(project.titleEn
      ? {
          headlineEn: project.seoTitleEn || project.titleEn,
          alternativeHeadline: project.titleEn,
          ...(project.metaDescEn ? { descriptionEn: project.metaDescEn } : {})
        }
      : {}),
    genre: project.categoryNameAr,
    contributor: {
      '@id': ORG_ID
    },
    ...(cleanTags.length > 0 ? { keywords: cleanTags.join(', ') } : {}),
    isPartOf: {
      '@id': WEBSITE_ID
    }
  };
}

export function itemList(items: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path)
    }))
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

// Questions & answers shown on an article/project page (ContentQA).
export function qaSchema(items: QAItem[]) {
  // Bilingual FAQPage: the EN variant is emitted as an extra Question entity when
  // translations exist (both languages live on the same URL).
  const entities = items.flatMap((item) => {
    const ar = {
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    };
    if (!item.qEn && !item.aEn) return [ar];
    return [
      ar,
      {
        '@type': 'Question',
        name: item.qEn || item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.aEn || item.a }
      }
    ];
  });
  return {
    '@type': 'FAQPage',
    inLanguage: ['ar', 'en'],
    mainEntity: entities
  };
}
