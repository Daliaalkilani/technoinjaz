import { SITE_URL, ORG_ID, WEBSITE_ID, ORG, absoluteUrl } from '@/config/site';
import type { BlogArticle } from '@/data/blogArticlesData';
import type { ProjectItem } from '@/data/projectsData';
import type { FaqItem } from '@/data/faqData';
import { projectTags, plainExcerpt } from '@/lib/text';

export function abdulghaniPersonSchema() {
  const url = absoluteUrl('/team/abdulghani');
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#abdulghani-alhamdi`,
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
    sameAs: [
      ORG.instagram,
      ORG.whatsapp
    ]
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

export function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: ORG.nameAr,
    alternateName: ORG.nameEn,
    inLanguage: 'ar',
    publisher: {
      '@id': ORG_ID
    }
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
    image: article.image.startsWith('http') ? article.image : absoluteUrl(article.image),
    datePublished: `${article.publishedAt}T00:00:00+03:00`,
    dateModified: `${article.modifiedAt || article.publishedAt}T00:00:00+03:00`,
    author: {
      '@id': ORG_ID
    },
    publisher: {
      '@id': ORG_ID
    },
    inLanguage: 'ar',
    articleSection: article.category,
    ...(tags ? { keywords: tags } : {}),
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
    inLanguage: 'ar',
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
