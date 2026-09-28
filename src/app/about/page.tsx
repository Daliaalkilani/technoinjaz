import type { Metadata } from 'next';
import AboutTeamSection from '@/components/about/AboutTeamSection';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'من نحن وفريق العمل الهندسي | تكنو إنجاز',
  description: 'تعرف على رؤية تكنو إنجاز، بنيتنا الهندسية المتكاملة، وفريق المهندسين المتخصصين في الذكاء الاصطناعي والأنظمة المدمجة.',
  alternates: {
    canonical: `${SITE_URL}/about`
  }
};

export default function AboutPage() {
  return <AboutTeamSection headingLevel="h1" />;
}
