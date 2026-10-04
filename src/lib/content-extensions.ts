import 'server-only';
import katex from 'katex';

/**
 * Content-extension pipeline for article markdown, applied to the raw source
 * before it reaches marked. Everything renders to static HTML (no client JS):
 *
 * 1. ```flow blocks  → structured, styled flow diagrams (stages / branches /
 *    annotated arrows) replacing ASCII box-drawing sketches.
 * 2. ```math blocks and `$$…$$` spans → KaTeX server-side HTML (CSS only, no
 *    runtime JS), so formulas like F1 = 2PR/(P+R) render as real math.
 *
 * Semantics of every diagram/formula stay identical to the source text.
 */

export interface FlowNode {
  /** Stage label. */
  label: string;
  /** Optional sub-label rendered smaller under the stage. */
  note?: string;
}

export interface FlowEdge {
  /** Optional label on the arrow (e.g. "success" / "عند الفشل"). */
  label?: string;
}

interface FlowSpec {
  title?: string;
  direction?: 'vertical' | 'horizontal';
  nodes: FlowNode[];
  /** edges[i] connects nodes[i] → nodes[i+1]. */
  edges: FlowEdge[];
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ */
/* Flow blocks                                                         */
/* ------------------------------------------------------------------ */

/**
 * Parse the ```flow block grammar:
 *
 * ```flow
 * title: نص العنوان (اختياري)
 * direction: vertical|horizontal (اختياري، الافتراضي vertical)
 * Node label | sub note
 *   → arrow label (a line starting with → belongs to the edge above)
 * ```
 *
 * Blank lines separate nothing (kept lenient); `->` is accepted for `→`.
 */
export function parseFlowSpec(src: string): FlowSpec | null {
  const spec: FlowSpec = { nodes: [], edges: [] };
  let pending: FlowNode | null = null;

  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    const titleM = line.match(/^title:\s*(.+)$/);
    if (titleM) {
      spec.title = titleM[1].trim();
      continue;
    }
    const dirM = line.match(/^direction:\s*(vertical|horizontal)$/i);
    if (dirM) {
      spec.direction = dirM[1].toLowerCase() as FlowSpec['direction'];
      continue;
    }

    // Edge line: → label
    const edgeM = line.match(/^(?:→|->)\s*(.*)$/);
    if (edgeM) {
      if (!pending) return null;
      const label = edgeM[1].replace(/^\|/, '').trim();
      spec.edges.push(label ? { label } : {});
      continue;
    }

    // Node line: label | note
    const parts = line.split('|').map((p) => p.trim());
    if (pending) spec.nodes.push(pending);
    pending = { label: parts[0] };
    if (parts[1]) pending.note = parts[1];
  }
  if (pending) spec.nodes.push(pending);
  if (spec.nodes.length < 2) return null;
  // one fewer edge than nodes when unlabeled chains are used
  while (spec.edges.length < spec.nodes.length - 1) spec.edges.push({});
  return spec;
}

export function renderFlow(spec: FlowSpec): string {
  const dir = spec.direction === 'horizontal' ? 'md-flowchart--h' : '';
  const items = spec.nodes.map((node, i) => {
    const edge = spec.edges[i]; // undefined for last node
    let edgeHtml = '';
    if (edge) {
      const labelHtml = edge.label
        ? `<span class="md-flowchart__edge-label" dir="auto">${esc(edge.label)}</span>`
        : '';
      edgeHtml =
        `<div class="md-flowchart__edge" aria-hidden="true">` +
        `<span class="md-flowchart__edge-arrow">→</span>${labelHtml}</div>`;
    }
    const noteHtml = node.note
      ? `<span class="md-flowchart__note" dir="auto">${esc(node.note)}</span>`
      : '';
    return (
      `<div class="md-flowchart__node-wrap">` +
      `<div class="md-flowchart__node" dir="auto">${esc(node.label)}${noteHtml}</div>` +
      edgeHtml +
      `</div>`
    );
  }).join('');

  const titleHtml = spec.title
    ? `<div class="md-flowchart__title" dir="auto">${esc(spec.title)}</div>`
    : '';

  return (
    `<figure class="md-flowchart ${dir}">` +
    titleHtml +
    `<div class="md-flowchart__track">${items}</div>` +
    `</figure>`
  );
}

/* ------------------------------------------------------------------ */
/* Math                                                                */
/* ------------------------------------------------------------------ */

function renderTex(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      output: 'html',
    });
  } catch {
    // Never break a build over one formula: fall back to styled code text.
    const cls = display ? 'md-math md-math--fallback' : 'md-math-inline md-math-inline--fallback';
    return `<code class="${cls}">${esc(tex)}</code>`;
  }
}

/** ```math blocks → display-mode KaTeX. */
export function renderMathBlock(src: string): string {
  const tex = src.trim();
  return `<div class="md-math">${renderTex(tex, true)}</div>`;
}

/**
 * Replace $$…$$ (display) and $…$ (inline) spans in markdown source with
 * placeholder tokens that marked passes through verbatim, then restore the
 * KaTeX HTML after parsing so the math never gets markdown-mangled.
 */
export function extractMath(src: string): { src: string; restore: (html: string) => string } {
  const store: string[] = [];

  const stash = (tex: string, display: boolean) => {
    const idx = store.push(renderTex(tex, display)) - 1;
    return `MATHSTASH${idx}ENDSTASH`;
  };

  let out = src
    // display math on its own lines: $$ ... $$
    .replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex: string) => `\n\n${stash(tex.trim(), true)}\n\n`)
    // inline math: $...$ (avoid $10 prices: require non-space right after $ and a closing $ not followed by a digit)
    .replace(/(^|[\s(>«])\$([^$\n]+?)\$(?![\w\d])/g, (_m, pre: string, tex: string) => `${pre}${stash(tex.trim(), false)}`);

  const restore = (html: string) =>
    html.replace(/MATHSTASH(\d+)ENDSTASH/g, (_m, i: string) => store[Number(i)]);

  return { src: out, restore };
}

/** Full pre-parse transform of an article markdown source. */
export function applyContentExtensions(md: string): { src: string; restore: (html: string) => string } {
  const { src, restore } = extractMath(md);

  // ```flow … ``` and ```math … ``` → placeholder paragraphs
  const flowStore: string[] = [];
  const src2 = src.replace(/```(flow|math)\n([\s\S]*?)```/g, (_m, kind: string, body: string) => {
    let html: string | null = null;
    if (kind === 'flow') {
      const spec = parseFlowSpec(body);
      if (spec) html = renderFlow(spec);
    } else {
      html = renderMathBlock(body);
    }
    if (!html) return _m; // leave for marked (renders as code block)
    const idx = flowStore.push(html) - 1;
    return `\n\nFLOWSTASH${idx}ENDFLOW\n\n`;
  });

  const restoreAll = (html: string) =>
    restore(html).replace(/FLOWSTASH(\d+)ENDFLOW/g, (_m, i: string) => flowStore[Number(i)]);

  return { src: src2, restore: restoreAll };
}
