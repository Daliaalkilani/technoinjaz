'use client';

import React from 'react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

interface ArticleBodyProps {
  /** Arabic body HTML (server-rendered from markdown) — the default/fallback. */
  html: string;
  /** English body HTML — rendered when the visitor flips the site to English.
   *  Null while a translation hasn't been produced yet (falls back to Arabic). */
  htmlEn?: string | null;
}

export function ArticleBody({ html, htmlEn }: ArticleBodyProps) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en' && Boolean(htmlEn);
  return (
    <div
      className="article-fullscreen-markdown-body"
      dir={isEn ? 'ltr' : 'rtl'}
      dangerouslySetInnerHTML={{ __html: isEn ? htmlEn! : html }}
    />
  );
}

export default ArticleBody;
