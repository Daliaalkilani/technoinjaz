import type { Metadata, Viewport } from 'next';
import { RootDocument, rootViewport } from '@/components/layout/RootDocument';
import { buildRootMetadata } from '@/seo/metadata';

// Root layout of the Arabic site (/, RTL). The English twin is app/(en)/layout.tsx.
export const viewport: Viewport = rootViewport;

export const metadata: Metadata = buildRootMetadata('ar');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="ar">{children}</RootDocument>;
}
