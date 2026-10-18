import type { Metadata } from 'next';
import { libraryMetadata, LibraryRoute } from '@/routes/library';

export const metadata: Metadata = libraryMetadata('ar');

export default function LibraryPage() {
  return <LibraryRoute lang="ar" />;
}
