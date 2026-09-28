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
  let src = md.replace(/<!--[\s\S]*?-->/g, '');
  src = src.replace(/^(SEO Title|Meta Description|Suggested Slug):.*$/gim, '');
  if (opts.stripLeadingH1 !== false) {
    src = src.replace(/^\s*#\s+[^\r\n]+[\r\n]*/, '');
  }

  const toc: TocHeading[] = [];
  let i = variant === 'project' ? 1 : 0;
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const inner = this.parser.parseInline(tokens);
    if (depth !== 2 && depth !== 3) {
      return `<h${depth}>${inner}</h${depth}>`;
    }
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\u0621-\u064A0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const id = variant === 'project'
      ? `sec-${i++}-${slug || `section-${i}`}`
      : `sec-${i++}-${slug || 'heading'}`;

    toc.push({ id, text, level: depth });

    const className = variant === 'project'
      ? `project-heading-${depth} scroll-mt-offset`
      : 'article-content-heading scroll-mt-offset';

    return `<h${depth} id="${id}" class="${className}">${inner}</h${depth}>`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    let h = href.replace(/^#article\//, '/articles/').replace(/^#project\//, '/projects/');
    const ext = /^https?:\/\//.test(h);
    const t = title ? ` title="${title}"` : '';
    return `<a href="${h}"${t}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
  };

  const markedInstance = new Marked({ gfm: true, breaks: true, renderer });
  const html = markedInstance.parse(src.trim()) as string;

  return { html, toc };
}
