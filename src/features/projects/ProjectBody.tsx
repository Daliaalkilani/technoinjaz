'use client';

import React from 'react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
// Math in bodies is pre-rendered by KaTeX; its stylesheet only ships with the pages that use it.
import 'katex/dist/katex-swap.min.css';

interface ProjectBodyProps {
  /** Arabic body HTML (server-rendered from markdown) — the default/fallback. */
  html: string;
  /** English body HTML — rendered when the visitor flips the site to English.
   *  Null while a translation hasn't been produced yet (falls back to Arabic). */
  htmlEn?: string | null;
}

export function ProjectBody({ html, htmlEn }: ProjectBodyProps) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en' && Boolean(htmlEn);
  return (
    <div
      className="markdown-prose"
      dir={isEn ? 'ltr' : 'rtl'}
      dangerouslySetInnerHTML={{ __html: isEn ? htmlEn! : html }}
    />
  );
}

export default ProjectBody;
