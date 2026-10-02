import React from 'react';
import type { Metadata } from 'next';
import Bookcase3D from '@/components/bookcase/Bookcase3D';
import { pageMetadata } from '@/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'المكتبة التفاعلية للتقارير الهندسية',
  description: 'استكشف المناهج الهندسية والتقارير التوثيقية بتقنية تقليب وطي الصفحات ثلاثية الأبعاد التفاعلية في تكنو إنجاز.',
  path: '/library'
});

export default function LibraryPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '85vh' }}>
      {/* The page's single main heading (the bookcase UI itself is visual) */}
      <h1 className="sr-only">المكتبة التفاعلية للتقارير والمناهج الهندسية | تكنو إنجاز</h1>
      <Bookcase3D />
    </div>
  );
}
