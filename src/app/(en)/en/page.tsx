import type { Metadata } from 'next';
import { homeMetadata, HomeRoute } from '@/routes/home';

export const dynamic = 'force-static';

export const metadata: Metadata = homeMetadata('en');

export default function HomePage() {
  return <HomeRoute lang="en" />;
}
