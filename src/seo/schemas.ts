import { SITE_URL, ORG_ID, WEBSITE_ID, ORG, absoluteUrl } from '@/config/site';
import type { BlogArticle } from '@/data/blogArticlesData';
import type { ProjectItem } from '@/data/projectsData';
import type { FaqItem } from '@/data/faqData';
import { projectTags, plainExcerpt } from '@/lib/text';

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
