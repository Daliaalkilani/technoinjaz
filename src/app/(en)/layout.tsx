import type { Metadata, Viewport } from 'next';
import { RootDocument, rootViewport } from '@/components/layout/RootDocument';
import { buildRootMetadata } from '@/seo/metadata';

// Root layout of the English site (/en/…, LTR). The Arabic twin is app/(ar)/layout.tsx.
export const viewport: Viewport = rootViewport;

export const metadata: Metadata = buildRootMetadata('en');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
