import type { Metadata } from 'next';
import { aboutMetadata, AboutRoute } from '@/routes/about';

export const dynamic = 'force-static';

export const metadata: Metadata = aboutMetadata('en');

export default function AboutPage() {
  return <AboutRoute lang="en" />;
}
