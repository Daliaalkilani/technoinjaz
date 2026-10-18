'use client';

// Drop-in replacements for next/link and next/navigation that keep the visitor in the
// current language: on /en pages every internal page href gets the /en prefix.

import React, { forwardRef, useMemo } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { localePath, stripLocale } from './locale';

type LinkProps = React.ComponentProps<typeof NextLink>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LocaleLink({ href, ...rest }, ref) {
  const { lang } = useThemeLanguage();
  return <NextLink ref={ref} href={typeof href === 'string' ? localePath(lang, href) : href} {...rest} />;
});

export default Link;

/** useRouter() whose push / replace / prefetch take language-neutral paths. */
export function useLocaleRouter() {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  return useMemo(
    () => ({
      ...router,
      push: (href: string, options?: Parameters<typeof router.push>[1]) => router.push(localePath(lang, href), options),
      replace: (href: string, options?: Parameters<typeof router.replace>[1]) => router.replace(localePath(lang, href), options),
      prefetch: (href: string, options?: Parameters<typeof router.prefetch>[1]) => router.prefetch(localePath(lang, href), options)
    }),
    [router, lang]
  );
}

/** usePathname() without the /en prefix, for active-route checks. */
export function useLocalePathname(): string {
  return stripLocale(usePathname() || '/');
}
