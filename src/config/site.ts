export const SITE_URL = 'https://technoenjaz.com';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOADER_MODE: 'home-first-visit' | 'always' | 'off' = 'home-first-visit';

export const ORG = {
  nameAr: 'تكنو إنجاز',
  nameEn: 'Techno Enjaz',
  logo: `${SITE_URL}/techno-logo.png`,
  telephone: '+963958794195',
  email: 'info@technoenjaz.com',
  instagram: 'https://instagram.com/TECHNO_ENJAZ',
  whatsapp: 'https://wa.me/963958794195',
  address: {
    streetAddress: 'طريق دمشق - حماة',
    addressLocality: 'حماة',
    addressRegion: 'حماة',
    addressCountry: 'SY',
  },
  geo: { latitude: 35.128992, longitude: 36.754001 },
  hasMap: "https://www.google.com/maps/place/35%C2%B007'44.4%22N+36%C2%B045'14.4%22E/@35.1289918,36.7561901,17z",
  descriptionAr: 'مكتب هندسي متخصص في تطوير البرمجيات المعقدة، النظم السحابية، إنترنت الأشياء، وحلول الذكاء الاصطناعي في سوريا والوطن العربي.',
} as const;

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;
