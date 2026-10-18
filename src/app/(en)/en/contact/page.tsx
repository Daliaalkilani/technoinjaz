import type { Metadata } from 'next';
import { contactMetadata, ContactRoute } from '@/routes/contact';

export const dynamic = 'force-static';

export const metadata: Metadata = contactMetadata('en');

export default function ContactRoutePage() {
  return <ContactRoute lang="en" />;
}
