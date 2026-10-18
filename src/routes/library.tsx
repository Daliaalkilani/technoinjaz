import type { Metadata } from 'next';
import Bookcase3D from '@/components/bookcase/Bookcase3D';
import { pageMetadata } from '@/seo/metadata';
import type { Lang } from '@/i18n/locale';

export const libraryMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'Interactive Library of Engineering Reports' : 'المكتبة التفاعلية للتقارير الهندسية',
    description:
      lang === 'en'
        ? 'Browse Techno Enjaz engineering curricula and documentation reports with interactive 3D page-flipping.'
        : 'استكشف المناهج الهندسية والتقارير التوثيقية بتقنية تقليب وطي الصفحات ثلاثية الأبعاد التفاعلية في تكنو إنجاز.',
    path: '/library'
  });

export function LibraryRoute({ lang }: { lang: Lang }) {
  return (
    <div className="library-page" style={{ minHeight: '85vh' }}>
      {/* The page's single main heading (the bookcase UI itself is visual) */}
      <h1 className="sr-only">
        {lang === 'en'
          ? 'Interactive Library of Engineering Reports & Curricula | Techno Enjaz'
          : 'المكتبة التفاعلية للتقارير والمناهج الهندسية | تكنو إنجاز'}
      </h1>
      <Bookcase3D />
    </div>
  );
}
