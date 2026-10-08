import 'server-only';
import { SITE_URL } from '@/config/site';
import { blogArticlesData } from '@/data/blogArticlesData';
import { PROJECTS_DATA } from '@/data/projectsData';
import { ARTICLE_QA } from '@/data/qa/articles';
import { PROJECT_QA } from '@/data/qa/projects';
import { actionEmail, sendMail } from './mail';
import { randomToken, sha256Hex } from './auth';
import type { D1 } from './db';

export const CONFIRM_TTL_MS = 72 * 60 * 60 * 1000;

export type NewsletterItemType = 'article' | 'project';

export interface NewsletterItem {
  type: NewsletterItemType;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  image: string;
  url: string;
  category: string;
  categoryEn: string;
  color: string;
  readTime?: string;
  readTimeEn?: string;
  author?: string;
  authorEn?: string;
  /** Questions the content answers (its FAQ), shown as "what you will find". */
  points: string[];
  pointsEn: string[];
  /** Technologies / topics (projects). */
  tags: string[];
}

/** Article / project announced by a newsletter (from the site's own content data). */
export function getNewsletterItem(type: string, slug: string): NewsletterItem | null {
  if (type === 'article') {
    const a = blogArticlesData.find((x) => x.slug === slug);
    if (!a) return null;
    const qa = ARTICLE_QA[a.slug] ?? [];
    return {
      type, slug,
      title: a.title, titleEn: a.titleEn || a.title,
      summary: a.excerpt || a.metaDescription, summaryEn: a.excerptEn || a.excerpt,
      image: a.image, url: `${SITE_URL}/articles/${a.slug}`,
      category: a.category, categoryEn: a.categoryEn || a.category, color: a.categoryColor || '#0369a1',
      readTime: a.readTime, readTimeEn: a.readTimeEn,
      author: a.author?.name, authorEn: a.author?.nameEn,
      points: qa.slice(0, 4).map((q) => q.q), pointsEn: qa.slice(0, 4).map((q) => q.qEn || q.q),
      tags: []
    };
  }
  if (type === 'project') {
    const p = PROJECTS_DATA.find((x) => x.slug === slug);
    if (!p) return null;
    const qa = PROJECT_QA[p.slug] ?? [];
    return {
      type, slug,
      title: p.title, titleEn: p.titleEn || p.title,
      summary: p.excerpt, summaryEn: p.excerptEn || p.excerpt,
      image: p.image, url: `${SITE_URL}/projects/${p.slug}`,
      category: p.categoryNameAr, categoryEn: p.categoryNameEn || p.categoryNameAr, color: '#0369a1',
      points: qa.slice(0, 4).map((q) => q.q), pointsEn: qa.slice(0, 4).map((q) => q.qEn || q.q),
      tags: (p.tagsEn && p.tagsEn.length ? p.tagsEn : p.tags).slice(0, 6)
    };
  }
  return null;
}

/** Everything that can be announced, newest content first (for the admin picker). */
export function listNewsletterItems() {
  return [
    ...blogArticlesData.map((a) => ({ type: 'article' as const, slug: a.slug, title: a.title, date: a.modifiedAt || a.publishedAt || '' })),
    ...PROJECTS_DATA.map((p) => ({ type: 'project' as const, slug: p.slug, title: p.title, date: '' }))
  ];
}

export const unsubscribeLink = (unsubToken: string) => `${SITE_URL}/newsletter?unsubscribe=${unsubToken}`;
const oneClickUrl = (unsubToken: string) => `${SITE_URL}/api/newsletter/unsubscribe?token=${unsubToken}`;

/** Creates (or refreshes) a pending subscription and emails the confirmation link. */
export async function startSubscription(db: D1, email: string, lang: 'ar' | 'en') {
  const existing = await db
    .prepare('SELECT id, status, unsub_token FROM newsletter_subscribers WHERE email = ?1')
    .bind(email)
    .first<{ id: number; status: string; unsub_token: string }>();
  if (existing?.status === 'active') return { status: 'already' as const, sent: false };

  const token = randomToken();
  const now = Date.now();
  if (existing) {
    await db
      .prepare(`UPDATE newsletter_subscribers SET status = 'pending', lang = ?1, confirm_token = ?2, confirm_expires_at = ?3, unsubscribed_at = NULL WHERE id = ?4`)
      .bind(lang, await sha256Hex(token), now + CONFIRM_TTL_MS, existing.id)
      .run();
  } else {
    await db
      .prepare(
        `INSERT INTO newsletter_subscribers (email, lang, status, confirm_token, confirm_expires_at, unsub_token, created_at)
         VALUES (?1, ?2, 'pending', ?3, ?4, ?5, ?6)`
      )
      .bind(email, lang, await sha256Hex(token), now + CONFIRM_TTL_MS, randomToken(), now)
      .run();
  }

  const isEn = lang === 'en';
  const { html, text } = actionEmail({
    title: isEn ? 'Confirm your subscription' : 'تأكيد الاشتراك في النشرة',
    intro: isEn
      ? 'Thanks for subscribing to the Techno Enjaz newsletter. Confirm your email to start receiving our new articles and projects (the link is valid for 72 hours).'
      : 'شكراً لاشتراكك في نشرة تكنو إنجاز. أكّد بريدك لتصلك مقالاتنا ومشاريعنا الجديدة (الرابط صالح 72 ساعة).',
    button: isEn ? 'Confirm subscription' : 'تأكيد الاشتراك',
    link: `${SITE_URL}/newsletter?confirm=${token}`,
    note: isEn ? 'If you did not subscribe, ignore this email — you will not be added.' : 'إذا لم تشترك أنت فتجاهل الرسالة، ولن تتم إضافتك.'
  });
  const sent = await sendMail({
    to: email,
    subject: isEn ? 'Confirm your subscription — Techno Enjaz' : 'تأكيد الاشتراك — تكنو إنجاز',
    text, html, tag: 'newsletter-confirm'
  });
  return { status: 'pending' as const, sent };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The announcement email for one subscriber (language follows the subscriber).
 *  Table layout + inline styles only: the subset every mail client renders. */
export function newsletterEmail(item: NewsletterItem, sub: { lang: string; unsub_token: string }) {
  const isEn = sub.lang === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const align = isEn ? 'left' : 'right';
  const isArticle = item.type === 'article';
  const title = isEn ? item.titleEn : item.title;
  const summary = isEn ? item.summaryEn : item.summary;
  const category = isEn ? item.categoryEn : item.category;
  const points = (isEn ? item.pointsEn : item.points).filter(Boolean);
  const kind = isArticle ? (isEn ? 'New article' : 'مقالة جديدة') : isEn ? 'New project' : 'مشروع جديد';
  const cta = isArticle ? (isEn ? 'Read the full article' : 'اقرأ المقالة كاملة') : isEn ? 'Explore the project' : 'استكشف المشروع';
  const pointsTitle = isArticle ? (isEn ? 'In this article' : 'ماذا ستجد في هذه المقالة؟') : isEn ? 'What the project covers' : 'ماذا يقدّم هذا المشروع؟';
  const browse = isArticle ? { href: `${SITE_URL}/articles`, label: isEn ? 'Browse all articles' : 'تصفّح كل المقالات' } : { href: `${SITE_URL}/projects`, label: isEn ? 'Browse all projects' : 'تصفّح كل المشاريع' };
  const meta = [
    isEn ? item.readTimeEn : item.readTime,
    isEn ? item.authorEn : item.author
  ].filter(Boolean) as string[];
  const unsub = unsubscribeLink(sub.unsub_token);
  const image = item.image ? (item.image.startsWith('http') ? item.image : `${SITE_URL}${item.image}`) : '';
  const color = /^#[0-9a-f]{3,8}$/i.test(item.color) ? item.color : '#0369a1';
  const font = isEn ? "'Segoe UI',Arial,sans-serif" : "Tahoma,'Segoe UI',Arial,sans-serif";

  const pointsHtml = points.length
    ? `<tr><td style="padding:0 28px 8px"><table role="presentation" width="100%" style="background:#f0f7fc;border-radius:12px;border:1px solid #dbeafe"><tr><td style="padding:16px 18px">` +
      `<div style="font-size:14px;font-weight:bold;color:#0f172a;margin-bottom:10px">${esc(pointsTitle)}</div>` +
      points
        .map((p) => `<div style="font-size:14px;line-height:1.7;color:#334155;padding:3px 0"><span style="color:${color};font-weight:bold">●</span>&nbsp; ${esc(p)}</div>`)
        .join('') +
      `</td></tr></table></td></tr>`
    : '';
  const tagsHtml = item.tags.length
    ? `<tr><td style="padding:6px 28px 4px">` +
      item.tags.map((tag) => `<span style="display:inline-block;margin:0 0 6px 6px;padding:4px 10px;border-radius:999px;background:#f1f5f9;border:1px solid #e2e8f0;font-size:12px;color:#334155">${esc(tag)}</span>`).join('') +
      `</td></tr>`
    : '';

  const html =
    `<!doctype html><html lang="${isEn ? 'en' : 'ar'}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>` +
    `<body style="margin:0;padding:0;background:#eef2f7;font-family:${font}">` +
    // Inbox preview line (hidden in the body).
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(summary.slice(0, 140))}</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7"><tr><td align="center" style="padding:28px 12px">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0" dir="${dir}">` +
    // Header
    `<tr><td style="background:#0b1426;padding:18px 28px"><table role="presentation" width="100%"><tr>` +
    `<td style="text-align:${align}"><img src="${SITE_URL}/images/brand/techno-logo.png" width="34" height="36" alt="Techno Enjaz" style="vertical-align:middle;border:0">` +
    `<span style="vertical-align:middle;color:#ffffff;font-size:17px;font-weight:bold;margin:0 10px">${isEn ? 'Techno Enjaz' : 'تكنو إنجاز'}</span></td>` +
    `<td style="text-align:${isEn ? 'right' : 'left'};color:#38bdf8;font-size:12px;font-weight:bold;letter-spacing:.5px">${esc(kind)}</td>` +
    `</tr></table></td></tr>` +
    // Cover
    (image ? `<tr><td><a href="${esc(item.url)}"><img src="${esc(image)}" width="600" alt="${esc(title)}" style="display:block;width:100%;height:auto;border:0"></a></td></tr>` : '') +
    // Category + title + meta
    `<tr><td style="padding:24px 28px 0;text-align:${align}">` +
    `<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${color};color:#ffffff;font-size:12px;font-weight:bold">${esc(category)}</span>` +
    `<h1 style="margin:14px 0 8px;font-size:23px;line-height:1.5;color:#0f172a">${esc(title)}</h1>` +
    (meta.length ? `<div style="font-size:13px;color:#64748b;margin-bottom:6px">${meta.map(esc).join(' &nbsp;·&nbsp; ')}</div>` : '') +
    `<p style="margin:12px 0 20px;font-size:15px;line-height:1.9;color:#334155">${esc(summary)}</p></td></tr>` +
    pointsHtml +
    tagsHtml +
    // CTA
    `<tr><td align="center" style="padding:22px 28px 10px"><a href="${esc(item.url)}" style="display:inline-block;background:#0369a1;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:14px 34px;border-radius:12px">${esc(cta)}</a></td></tr>` +
    `<tr><td align="center" style="padding:4px 28px 26px"><a href="${browse.href}" style="color:#0369a1;font-size:13px;text-decoration:none">${esc(browse.label)}</a></td></tr>` +
    // Footer
    `<tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 28px;text-align:center;font-size:12px;line-height:1.9;color:#64748b">` +
    `<div style="font-weight:bold;color:#0f172a;font-size:13px">${isEn ? 'Techno Enjaz — Engineering office, Hama, Syria' : 'تكنو إنجاز — مكتب هندسي، حماة، سوريا'}</div>` +
    `<a href="${SITE_URL}" style="color:#0369a1;text-decoration:none">technoenjaz.com</a> &nbsp;·&nbsp; ` +
    `<a href="https://instagram.com/TECHNO_ENJAZ" style="color:#0369a1;text-decoration:none">Instagram</a> &nbsp;·&nbsp; ` +
    `<a href="https://wa.me/963958794195" style="color:#0369a1;text-decoration:none">WhatsApp</a>` +
    `<div style="margin-top:10px">${isEn ? 'You receive this email because you subscribed to the Techno Enjaz newsletter.' : 'وصلتك هذه الرسالة لأنك مشترك في نشرة تكنو إنجاز.'} ` +
    `<a href="${esc(unsub)}" style="color:#64748b">${isEn ? 'Unsubscribe' : 'إلغاء الاشتراك'}</a></div>` +
    `</td></tr></table></td></tr></table></body></html>`;

  const text = [
    `${kind} — ${category}`,
    title,
    meta.join(' · '),
    '',
    summary,
    ...(points.length ? ['', pointsTitle, ...points.map((p) => `• ${p}`)] : []),
    ...(item.tags.length ? ['', item.tags.join(' · ')] : []),
    '',
    `${cta}: ${item.url}`,
    '',
    `${isEn ? 'Unsubscribe' : 'إلغاء الاشتراك'}: ${unsub}`
  ].join('\r\n');

  return {
    subject: `${kind}: ${title}`,
    html,
    text,
    // RFC 8058 one-click unsubscribe (Gmail / Outlook show an "Unsubscribe" button).
    headers: {
      'List-Unsubscribe': `<${oneClickUrl(sub.unsub_token)}>, <mailto:info@technoenjaz.com?subject=unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
    }
  };
}
