import 'server-only';
import { Marked, Renderer } from 'marked';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface RenderMarkdownOptions {
  stripLeadingH1?: boolean;
  variant?: 'article' | 'project';
}

export function renderMarkdown(
  md: string,
  opts: RenderMarkdownOptions = {}
): { html: string; toc: TocHeading[] } {
  const variant = opts.variant ?? 'article';
  
  // Strip all comments (closed and unclosed)
  let src = md.replace(/<!--[\s\S]*?(?:-->|$)/g, '');
  
  // Strip draft metadata lines
  src = src.replace(/^(SEO Title|Meta Description|Suggested Slug|Filename|IMAGE SLOT|FEATURED IMAGE|GALLERY ITEM|Suggested Internal Link):.*$/gim, '');
  
  // Strip lines referencing docs.google.com draft URLs
  src = src.replace(/^.*https?:\/\/docs\.google\.com.*$/gim, '');
  
  if (opts.stripLeadingH1 !== false) {
    src = src.replace(/^\s*#\s+[^\r\n]+[\r\n]*/, '');
  }

  const toc: TocHeading[] = [];
  let i = variant === 'project' ? 1 : 0;
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const inner = this.parser.parseInline(tokens);
    // Demote any H1 in markdown content to H2 so the page only has exactly 1 H1 (the page title)
    const effectiveDepth = depth === 1 ? 2 : depth;
    
    if (effectiveDepth !== 2 && effectiveDepth !== 3) {
      return `<h${effectiveDepth}>${inner}</h${effectiveDepth}>`;
    }
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\u0621-\u064A0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const id = variant === 'project'
      ? `sec-${i++}-${slug || `section-${i}`}`
      : `sec-${i++}-${slug || 'heading'}`;

    toc.push({ id, text, level: effectiveDepth });

    const className = variant === 'project'
      ? `project-heading-${effectiveDepth} scroll-mt-offset`
      : 'article-content-heading scroll-mt-offset';

    return `<h${effectiveDepth} id="${id}" class="${className}">${inner}</h${effectiveDepth}>`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    if (href.includes('docs.google.com')) {
      return text;
    }
    let h = href.replace(/^#article\//, '/articles/').replace(/^#project\//, '/projects/');
    const ext = /^https?:\/\//.test(h);
    const t = title ? ` title="${title}"` : '';
    return `<a href="${h}"${t}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
  };

  renderer.image = function ({ href, title, text }) {
    if (href.includes('docs.google.com')) {
      return '';
    }
    const t = title ? ` title="${title}"` : '';
    return `<img src="${href}" alt="${text || ''}"${t} loading="lazy" />`;
  };

  const markedInstance = new Marked({ gfm: true, breaks: true, renderer });
  const html = markedInstance.parse(src.trim()) as string;

  return { html, toc };
}
