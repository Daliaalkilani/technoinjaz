import { SITE_URL, ORG_ID, WEBSITE_ID, ORG, ABDULGHANI_SOCIALS, absoluteUrl } from '@/config/site';
import type { BlogArticle } from '@/data/blogArticlesData';
import type { ProjectItem } from '@/data/projectsData';
import type { FaqItem } from '@/data/faqData';
import type { QAItem } from '@/data/qa/types';
import { projectTags, plainExcerpt } from '@/lib/text';
import { localePath, type Lang } from '@/i18n/locale';

// Every builder takes the page language: on /en pages names, descriptions, URLs and
// inLanguage are the English ones. @ids stay language-neutral (one entity, two pages).
const url = (lang: Lang, path: string) => absoluteUrl(localePath(lang, path));

const ABDULGHANI_ID = `${SITE_URL}/#abdulghani-alhamdi`;
const ABDULGHANI_PATH = '/team/abdulghani';
// sameAs takes profile URLs only (the email is exposed separately as `email`).
const ABDULGHANI_SAME_AS = Object.values(ABDULGHANI_SOCIALS).filter((v) => /^https?:\/\//.test(v));

export function abdulghaniPersonSchema(lang: Lang = 'ar') {
  if (lang === 'en') {
    return {
      '@type': 'Person',
      '@id': ABDULGHANI_ID,
      name: 'Eng. Abdalgani Alhamdi',
      alternateName: ['Abdalgani Al-Hamdi', 'المهندس عبد الغني الحمدي', 'م. عبد الغني الحمدي', 'عبد الغني الحمدي'],
      url: url('en', ABDULGHANI_PATH),
      image: absoluteUrl('/images/team/abdulghani.jpg'),
      jobTitle: 'Engineering Projects Consultant & Technical Trainer',
      description: 'Eng. Abdalgani Alhamdi is an engineering consultant for technical projects and the founder and leader of the Techno Enjaz team. He holds a bachelor’s degree in Automatic Control & Computer Engineering, is studying for a master’s in Control Engineering & Automation, and received the Al-Bassel award for first rank in his fourth year. Over the last five years he has delivered or supervised 500+ technical projects, and placed sixth nationwide in the “Tamayuz for Innovation & Invention” competition.',
      knowsAbout: [
        'Engineering & technical projects',
        'Arduino programming',
        'Robotics & mobile robots',
        'Control & automation engineering',
        'Industrial control systems',
        'Engineering project consultancy',
        'Engineering project management'
      ],
      alumniOf: [],
      award: [
        '6th place nationwide in the “Tamayuz for Innovation & Invention” competition',
        'Al-Bassel award for first rank academic excellence (4th year)',
        'Delivery & supervision of 500+ technical projects'
      ],
      worksFor: { '@id': ORG_ID },
      disambiguatingDescription: '“Change begins from within — start with yourself, then change the world.” Vision: an interconnected, independent and highly proficient community. Mission: scientific and practical progress to elevate every field. Goals: raising awareness among ambitious people and mentoring them through real projects and training.',
      sameAs: ABDULGHANI_SAME_AS,
      email: 'info@abdalgani.com'
    };
  }
  return {
    '@type': 'Person',
    '@id': ABDULGHANI_ID,
    name: 'المهندس عبد الغني الحمدي',
    alternateName: [
      'Eng. Abdalgani Alhamdi',
      'م. عبد الغني الحمدي',
      'Abdalgani Al-Hamdi',
      'عبد الغني الحمدي'
    ],
    url: url('ar', ABDULGHANI_PATH),
    image: absoluteUrl('/images/team/abdulghani.jpg'),
    jobTitle: 'مستشار في المشاريع الهندسية ومدرب في المجالات التقنية',
    description: 'المهندس عبد الغني الحمدي مهندس ومستشار هندسي متخصّص في المشاريع التقنية، وقائد ومؤسس فريق «تكنو إنجاز». حاصل على درجة البكالوريوس في هندسة التحكّم الآلي والحواسيب، ويدرس الماجستير في هندسة التحكّم والأتمتة، وحاصل على شهادة الباسل للمرتبة الأولى في السنة الرابعة. ساهم في إنجاز والإشراف على أكثر من 500 مشروع تقني خلال السنوات الخمس الماضية، وحصل على المركز السادس ضمن مسابقة «تميّز للإبداع والاختراع» على مستوى القطر.',
    knowsAbout: [
      'المشاريع الهندسية والتقنية',
      'برمجة لوحات الأردوينو',
      'الروبوتيك والروبوتات المتنقلة',
      'هندسة التحكم والأتمتة',
      'أنظمة التحكم الصناعي',
      'استشارات المشاريع الهندسية',
      'إدارة وتطوير المشاريع الهندسية'
    ],
    alumniOf: [],
    award: [
      'المركز السادس ضمن مسابقة «تميّز للإبداع والاختراع» على مستوى القطر',
      'شهادة الباسل للمرتبة الأولى في السنة الرابعة للتفوق الدراسي',
      'إنجاز والإشراف على أكثر من 500 مشروع تقني'
    ],
    worksFor: {
      '@id': ORG_ID
    },
    disambiguatingDescription: '«التغيير يبدأ من الداخل، ابدأ بنفسك ثم غير العالم» - رؤيته: تكوين مجتمع مترابط ومستقل ذو كفاءة عالية، رسالته: التطور والتقدم العلمي والعملي للرقي بجميع المجالات، أهدافه: رفع الوعي للأشخاص الطموحين ومتابعتهم عبر استقطاب المشاريع وتدريبهم عليها.',
    sameAs: ABDULGHANI_SAME_AS,
    email: 'info@abdalgani.com'
  };
}

/** Stable JSON-LD @id of a team member's Person node (the founder shares the Organization's). */
export const personId = (member: any) => (member.id === 'abdulghani' ? ABDULGHANI_ID : `${SITE_URL}/#member-${member.id}`);

/** Public profile URLs of a team member (top-level fields + `socials`), deduplicated; email excluded. */
export function memberProfileUrls(member: any): string[] {
  const keys = ['linkedin', 'github', 'x', 'facebook', 'instagram', 'telegram'];
  const urls = keys.flatMap((k) => [member[k], member.socials?.[k]]).filter(Boolean);
  return [...new Set(urls as string[])];
}

/** `image`: the share image (see seo/team.ts memberShareImage); null omits it (placeholder photo). */
export function personSchema(member: any, opts: { image?: string | null; lang?: Lang } = {}) {
  const lang = opts.lang ?? 'ar';
  if (member.id === 'abdulghani') {
    return abdulghaniPersonSchema(lang);
  }
  const en = lang === 'en';
  const image = opts.image === undefined ? member.image : opts.image;
  const nameEn = String(member.nameEn || '').trim();
  return {
    '@type': 'Person',
    '@id': personId(member),
    name: en && nameEn ? nameEn : member.name,
    ...(nameEn ? { alternateName: [en ? member.name : nameEn] } : {}),
    url: url(lang, `/team/${member.id}`),
    ...(image ? { image: absoluteUrl(image) } : {}),
    jobTitle: (en && member.roleEn) || member.role,
    description: en
      ? member.shortBioEn || member.bioEn || member.shortBio || member.bio
      : member.shortBio || member.bio,
    knowsAbout: (en ? member.skillsEn || member.skills : member.skills) || undefined,
    sameAs: memberProfileUrls(member),
    ...(member.socials?.email ? { email: member.socials.email } : {}),
    worksFor: {
      '@id': ORG_ID
    }
  };
}

export function organization(lang: Lang = 'ar') {
  const en = lang === 'en';
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: en ? ORG.nameEn : ORG.nameAr,
    alternateName: en ? ORG.nameAr : ORG.nameEn,
    url: url(lang, '/'),
    logo: ORG.logo,
    telephone: ORG.telephone,
    email: ORG.email,
    sameAs: [ORG.instagram],
    founder: abdulghaniPersonSchema(lang),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORG.telephone,
      email: ORG.email,
      contactType: 'customer service',
      availableLanguage: ['ar', 'en']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: en ? ORG.addressEn.streetAddress : ORG.address.streetAddress,
      addressLocality: en ? ORG.addressEn.addressLocality : ORG.address.addressLocality,
      addressRegion: en ? ORG.addressEn.addressRegion : ORG.address.addressRegion,
      addressCountry: ORG.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ORG.geo.latitude,
      longitude: ORG.geo.longitude
    },
    hasMap: ORG.hasMap,
    description: en ? ORG.descriptionEn : ORG.descriptionAr
  };
}

export const WEBSITE_DESIGNERS = [
  {
    '@type': 'Person',
    name: 'داليا الكيلاني',
    alternateName: 'Dalia Alkilani',
    jobTitle: 'مصممة ومطوّرة موقع تكنو إنجاز',
    url: 'https://www.linkedin.com/in/dalia-al-kilani/',
    sameAs: ['https://github.com/Daliaalkilani', 'https://www.linkedin.com/in/dalia-al-kilani/', 'https://www.instagram.com/dalia.alkilani/']
  },
  {
    '@type': 'Person',
    name: 'روان هبهاب',
    alternateName: 'Rawan Habhab',
    jobTitle: 'مصممة ومطوّرة موقع تكنو إنجاز'
  }
];

export function website(lang: Lang = 'ar') {
  const en = lang === 'en';
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: en ? ORG.nameEn : ORG.nameAr,
    alternateName: en ? ORG.nameAr : ORG.nameEn,
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
  type = 'WebPage',
  mainEntityId,
  lang = 'ar'
}: {
  /** Language-neutral path ('/about'); the /en prefix is added for English pages. */
  path: string;
  name: string;
  description?: string;
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'ProfilePage';
  /** @id of the page's main entity (e.g. the Person of a ProfilePage). */
  mainEntityId?: string;
  lang?: Lang;
}) {
  const pageUrl = url(lang, path);
  return {
    '@type': type,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    ...(description ? { description } : {}),
    inLanguage: lang,
    isPartOf: {
      '@id': WEBSITE_ID
    },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    about: {
      '@id': mainEntityId ?? ORG_ID
    }
  };
}

export function breadcrumb(items: { name: string; path: string }[], lang: Lang = 'ar') {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: url(lang, item.path)
    }))
  };
}

export function blogPosting(article: BlogArticle, lang: Lang = 'ar') {
  const en = lang === 'en';
  const pageUrl = url(lang, `/articles/${article.slug}`);
  const clean = (tags: string[] | undefined) => (tags || []).map((t) => t.replace(/_/g, ' ')).join(', ');
  const title = en ? article.titleEn || article.title : article.title;
  const otherTitle = en ? article.title : article.titleEn;
  const tags = en ? clean(article.tagsEn?.length ? article.tagsEn : article.tags) : clean(article.tags);
  const headline = title.length > 110 ? title.slice(0, 107) + '...' : title;

  return {
    '@type': 'BlogPosting',
    // One article entity per language copy: the two pages are translations of each other.
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: pageUrl,
    headline,
    name: en ? title : article.seoTitle || article.title,
    ...(otherTitle ? { alternativeHeadline: otherTitle } : {}),
    description: en ? article.excerptEn || article.excerpt : article.metaDescription || article.excerpt,
    image: article.image ? (article.image.startsWith('http') ? article.image : absoluteUrl(article.image)) : absoluteUrl('/og-image.png'),
    datePublished: `${article.publishedAt}T00:00:00+03:00`,
    dateModified: `${article.modifiedAt || article.publishedAt}T00:00:00+03:00`,
    // Every article is founder-authored (ARTICLE_AUTHOR) — same @id as the Organization founder node
    author: {
      '@type': 'Person',
      '@id': ABDULGHANI_ID,
      name: en ? article.author.nameEn : article.author.name,
      alternateName: en
        ? [article.author.name, 'Abdalgani Alhamdi', 'المهندس عبد الغني الحمدي']
        : [article.author.nameEn, 'المهندس عبد الغني الحمدي', 'Abdalgani Alhamdi'],
      jobTitle: en ? article.author.roleEn : article.author.role,
      url: url(lang, ABDULGHANI_PATH),
      image: absoluteUrl(article.author.avatar),
      sameAs: ABDULGHANI_SAME_AS,
      worksFor: { '@id': ORG_ID }
    },
    publisher: {
      '@id': ORG_ID
    },
    inLanguage: lang,
    // The same article in the other language.
    workTranslation: { '@id': `${url(en ? 'ar' : 'en', `/articles/${article.slug}`)}#article` },
    // AEO: voice assistants & answer engines read these sections aloud
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-excerpt', '.article-body > p:first-of-type']
    },
    articleSection: en ? article.categoryEn || article.category : article.category,
    ...(tags ? { keywords: tags } : {}),
    isPartOf: {
      '@id': WEBSITE_ID
    }
  };
}

export function projectWork(project: ProjectItem, opts: { dateModified?: Date; lang?: Lang } = {}) {
  const lang = opts.lang ?? 'ar';
  const en = lang === 'en';
  const pageUrl = url(lang, `/projects/${project.slug}`);
  const cleanTags = projectTags(en && project.tagsEn?.length ? project.tagsEn : project.tags);
  const name = en ? project.titleEn || project.title : project.title;
  const otherName = en ? project.title : project.titleEn;

  return {
    '@type': 'CreativeWork',
    '@id': `${pageUrl}#project`,
    name,
    headline: en ? project.seoTitleEn || name : project.seoTitle || project.title,
    ...(otherName ? { alternativeHeadline: otherName } : {}),
    description: plainExcerpt(en ? project.metaDescEn || project.excerptEn || project.metaDesc || project.excerpt : project.metaDesc || project.excerpt),
    image: project.image.startsWith('http') ? project.image : absoluteUrl(project.image),
    url: pageUrl,
    inLanguage: lang,
    workTranslation: { '@id': `${url(en ? 'ar' : 'en', `/projects/${project.slug}`)}#project` },
    // AEO: voice assistants read the project title + lead paragraph
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.project-detail-title', '.project-detail-lead']
    },
    genre: en ? project.categoryNameEn : project.categoryNameAr,
    ...(opts.dateModified ? { dateModified: opts.dateModified.toISOString() } : {}),
    contributor: {
      '@id': ORG_ID
    },
    ...(cleanTags.length > 0 ? { keywords: cleanTags.join(', ') } : {}),
    isPartOf: {
      '@id': WEBSITE_ID
    }
  };
}

export function itemList(items: { name: string; path: string }[], lang: Lang = 'ar') {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: url(lang, item.path)
    }))
  };
}

export function faqPageSchema(items: FaqItem[], lang: Lang = 'ar') {
  const en = lang === 'en';
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: (en && item.questionEn) || item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: (en && item.answerEn) || item.answer
      }
    }))
  };
}

// Questions & answers shown on an article/project page (ContentQA), in the page language.
export function qaSchema(items: QAItem[], lang: Lang = 'ar') {
  const en = lang === 'en';
  return {
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: (en && item.qEn) || item.q,
      acceptedAnswer: { '@type': 'Answer', text: (en && item.aEn) || item.a }
    }))
  };
}
