import 'server-only';
import { Marked, Renderer } from 'marked';
import { applyContentExtensions } from './content-extensions';

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

  // Content extensions (```flow diagrams, ```math/$$ KaTeX) are resolved to
  // final HTML before marked sees the source and re-inserted after parsing.
  const ext = applyContentExtensions(src);
  src = ext.src;
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const inner = this.parser.parseInline(tokens);
    // Demote any H1 in markdown content to H2 so the page only has exactly 1 H1 (the page title)
    const effectiveDepth = depth === 1 ? 2 : depth;
    
    if (effectiveDepth !== 2 && effectiveDepth !== 3) {
      return `<h${effectiveDepth}>${inner}</h${effectiveDepth}>`;
    }
    const text = inner
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .trim();
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
    // Draft placeholders (IMAGE_01_URL…) would ship as broken images: real paths only.
    if (!href.startsWith('/') && !/^https?:\/\//.test(href)) return '';
    const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const img = `<img src="${href}" alt="${esc(text || '')}" loading="lazy" decoding="async" width="1200" height="675" style="aspect-ratio:16/9;width:100%;height:auto;object-fit:contain;background:rgba(127,127,127,0.06)" />`;
    // The markdown title is the visible caption (what the image shows + source credit).
    return title
      ? `<figure class="md-figure">${img}<figcaption>${esc(title)}</figcaption></figure>`
      : img;
  };

  // ```text blocks in the content are flow sketches ("A → B", "↓" chains, Arabic +
  // English labels), not code. As monospace <pre> they were cut off on phones and
  // their Arabic lost its shaping/direction. Render them as a flow card: one line per
  // row, each with its own text direction, wrapping on narrow screens. Real code
  // (a language tag) and box-drawing sketches that rely on column alignment keep <pre>.
  renderer.code = function ({ text, lang }) {
    const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const plainText = !lang || lang === 'text' || lang === 'txt';
    if (!plainText || /[│─┌┐└┘├┤┬┴┼═║]/.test(text)) {
      return `<pre dir="ltr"><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(text)}</code></pre>`;
    }
    const rows = text
      .split('\n')
      .map((line) => line.trim())
      .map((line) => {
        if (!line) return '<div class="md-flow__gap" aria-hidden="true"></div>';
        if (/^[↓↑→←⇄⇅▼▲|]+$/.test(line)) return `<div class="md-flow__arrow" aria-hidden="true">${esc(line)}</div>`;
        return `<div class="md-flow__line" dir="auto">${esc(line)}</div>`;
      })
      .join('');
    return `<div class="md-flow">${rows}</div>`;
  };

  // Tables scroll sideways inside their own box on phones instead of squeezing
  // every column down to one letter per line.
  const markedInstance = new Marked({ gfm: true, breaks: true, renderer });
  let html = (markedInstance.parse(src.trim()) as string)
    .replace(/<table>/g, '<div class="md-table-wrap" tabindex="0"><table>')
    .replace(/<\/table>/g, '</table></div>')
    // "المصادر والمراجع" at the end: a collapsed section that opens on tap.
    // The heading stays inside <summary> so its id / TOC link keep working.
    .replace(
      /(<h2 [^>]*>)((?:المصادر والمراجع|المراجع|المصادر|References|Sources)[^<]*)(<\/h2>)([\s\S]*?)(?=<h2 |$)/,
      (_m, open: string, label: string, close: string, body: string) =>
        `<details class="md-refs"><summary class="md-refs__summary">${open}${label}${close}<span class="md-refs__chevron" aria-hidden="true"></span></summary><div class="md-refs__body">${body}</div></details>`
    );

  html = ext.restore(html);

  return { html, toc };
}
