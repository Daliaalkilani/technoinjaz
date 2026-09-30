import React from 'react';
import type { Metadata } from 'next';
import Bookcase3D from '@/components/bookcase/Bookcase3D';

export const metadata: Metadata = {
  title: 'المكتبة التفاعلية ثلاثية الأبعاد (3D Bookcase & Flipbook) | تكنو إنجاز',
  description: 'استكشف المناهج الهندسية والتقارير التوثيقية بتقنية تقليب وطي الصفحات ثلاثية الأبعاد التفاعلية في تكنو إنجاز.'
};

export default function LibraryPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '85vh' }}>
      <Bookcase3D />
    </div>
  );
}
