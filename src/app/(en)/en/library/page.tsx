import type { Metadata } from 'next';
import { libraryMetadata, LibraryRoute } from '@/routes/library';

export const metadata: Metadata = libraryMetadata('en');

export default function LibraryPage() {
  return <LibraryRoute lang="en" />;
}
