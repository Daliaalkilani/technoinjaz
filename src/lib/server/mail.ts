import 'server-only';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Outgoing mail through the Workers `send_email` binding (wrangler.jsonc → SEND_EMAIL),
// routed by Cloudflare Email Routing from info@technoenjaz.com.
//
// The binding is an object with a `.send(EmailMessage)` method — calling the binding
// itself as a function throws ("… is not a function"), which silently dropped every
// contact and verification email before this module existed.

export const MAIL_FROM_ADDR = 'info@technoenjaz.com';
const MAIL_FROM = `Techno Enjaz <${MAIL_FROM_ADDR}>`;

type SendEmailBinding = { send(message: unknown): Promise<void> };
type CloudflareEmailModule = { EmailMessage: new (from: string, to: string, raw: string) => unknown };

const b64 = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
/** RFC 2047 encoded-word, so Arabic / emoji subjects survive mail transport. */
const encodeHeader = (s: string) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
const wrap76 = (s: string) => s.replace(/(.{76})/g, '$1\r\n');

/** multipart/alternative (text + HTML), both parts base64 UTF-8. */
export function buildMime(opts: { to: string; subject: string; text: string; html: string; replyTo?: string; headers?: Record<string, string> }): string {
  const boundary = '----=_te_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  const domain = MAIL_FROM_ADDR.split('@')[1];
  const headers = [
    `From: ${MAIL_FROM}`,
    `To: ${opts.to}`,
    ...(opts.replyTo ? [`Reply-To: ${opts.replyTo}`] : []),
    // Extra headers (e.g. List-Unsubscribe); CR/LF stripped so values cannot inject headers.
    ...Object.entries(opts.headers ?? {}).map(([k, v]) => `${k}: ${String(v).replace(/[\r\n]+/g, ' ')}`),
    `Subject: ${encodeHeader(opts.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`
  ].join('\r\n');
  const part = (type: string, body: string) =>
    `--${boundary}\r\nContent-Type: ${type}; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${wrap76(b64(body))}\r\n`;
  return `${headers}\r\n\r\n${part('text/plain', opts.text)}${part('text/html', opts.html)}--${boundary}--\r\n`;
}

/**
 * Sends one email. Never throws: returns false (and logs the reason) when the binding
 * is missing or Cloudflare refuses the message — e.g. a recipient that is not a
 * verified destination while the zone only has Email Routing (not Email Sending).
 */
export async function sendMail(opts: { to: string; subject: string; text: string; html: string; replyTo?: string; headers?: Record<string, string>; tag: string }): Promise<boolean> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const binding = (env as { SEND_EMAIL?: SendEmailBinding }).SEND_EMAIL;
    if (!binding || typeof binding.send !== 'function') {
      console.error(`[mail:${opts.tag}] SEND_EMAIL binding is not configured`);
      return false;
    }
    // workerd-provided module; webpackIgnore keeps Next from bundling the cloudflare: scheme.
    const { EmailMessage } = (await import(/* webpackIgnore: true */ 'cloudflare:email' as string)) as unknown as CloudflareEmailModule;
    await binding.send(new EmailMessage(MAIL_FROM_ADDR, opts.to, buildMime(opts)));
    return true;
  } catch (err) {
    console.error(`[mail:${opts.tag}] send failed:`, err instanceof Error ? err.message : err);
    return false;
  }
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SITE = 'https://technoenjaz.com';

/**
 * Shared email frame: solid-colour header with logo, white card, footer.
 * Only table layout, inline styles and solid colours (bgcolor + background-color):
 * Gmail / Outlook drop CSS gradients, which left the old header white-on-white.
 */
export function emailShell(opts: { lang?: 'ar' | 'en'; preheader?: string; body: string; hero?: { src: string; alt: string } }) {
  const isEn = opts.lang === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const font = isEn ? "'Segoe UI',Arial,sans-serif" : "Tahoma,'Segoe UI',Arial,sans-serif";
  return (
    `<!doctype html><html lang="${isEn ? 'en' : 'ar'}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>` +
    `<body style="margin:0;padding:0;background-color:#eef2f7;font-family:${font}">` +
    (opts.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(opts.preheader)}</div>` : '') +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef2f7" style="background-color:#eef2f7"><tr><td align="center" style="padding:28px 12px">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="${dir}" style="max-width:560px;background-color:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0">` +
    // Header: a designed hero banner (logo + title baked in) when given, else a text
    // wordmark — no small standalone logo image that mail apps may block or drop.
    (opts.hero
      ? `<tr><td bgcolor="#050b18" style="background-color:#050b18;line-height:0;font-size:0">` +
        `<img src="${SITE}${opts.hero.src}" width="560" alt="${escapeHtml(opts.hero.alt)}" style="display:block;width:100%;max-width:560px;height:auto;border:0;color:#ffffff;font-size:20px;line-height:1.4;background-color:#050b18">` +
        `</td></tr>`
      : `<tr><td bgcolor="#0b1426" align="center" style="background-color:#0b1426;padding:22px 24px">` +
        `<span style="color:#38bdf8;font-size:24px;font-weight:bold;vertical-align:middle">▲</span>` +
        `<span style="display:inline-block;vertical-align:middle;color:#ffffff;font-size:20px;font-weight:bold;margin:0 10px;letter-spacing:.3px">${isEn ? 'Techno Enjaz' : 'تكنو إنجاز'}</span>` +
        `</td></tr>` +
        `<tr><td bgcolor="#0369a1" style="background-color:#0369a1;height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>`) +
    opts.body +
    // Footer
    `<tr><td bgcolor="#f8fafc" align="center" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 24px;font-size:12px;line-height:1.9;color:#64748b">` +
    `<div style="font-weight:bold;color:#0f172a;font-size:13px">${isEn ? 'Techno Enjaz — Engineering office, Hama, Syria' : 'تكنو إنجاز — مكتب هندسي، حماة، سوريا'}</div>` +
    `<a href="${SITE}" style="color:#0369a1;text-decoration:none">technoenjaz.com</a> &nbsp;·&nbsp; ` +
    `<a href="https://instagram.com/TECHNO_ENJAZ" style="color:#0369a1;text-decoration:none">Instagram</a> &nbsp;·&nbsp; ` +
    `<a href="https://wa.me/963958794195" style="color:#0369a1;text-decoration:none">WhatsApp</a>` +
    `</td></tr></table></td></tr></table></body></html>`
  );
}

/** Branded single-action email (newsletter confirmation, verification, password reset). */
export function actionEmail(opts: { title: string; intro: string; button: string; link: string; note: string; icon?: string; lang?: 'ar' | 'en'; secondary?: { label: string; href: string }; hero?: { src: string; alt: string }; features?: { icon: string; label: string }[] }) {
  const isEn = opts.lang === 'en';
  const body =
    `<tr><td align="center" style="padding:${opts.hero ? '30px' : '34px'} 32px 8px">` +
    // With a hero banner the title is already in the artwork; otherwise icon badge + title.
    (opts.hero
      ? ''
      : `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td align="center" width="72" height="72" bgcolor="#e0f2fe" style="background-color:#e0f2fe;border-radius:36px;width:72px;height:72px;font-size:34px;line-height:72px;text-align:center">${opts.icon ?? '✉️'}</td></tr></table>` +
        `<h1 style="margin:20px 0 10px;font-size:22px;line-height:1.5;color:#0f172a">${escapeHtml(opts.title)}</h1>`) +
    `<p style="margin:0 0 ${opts.features?.length ? '22px' : '26px'};font-size:16px;line-height:1.9;color:#334155">${escapeHtml(opts.intro)}</p>` +
    (opts.features?.length
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 26px"><tr>` +
        opts.features
          .map(
            (f) =>
              `<td align="center" valign="top" width="${Math.floor(100 / opts.features!.length)}%" style="padding:0 5px">` +
              `<div style="background-color:#f0f7fc;border:1px solid #dbeafe;border-radius:14px;padding:16px 8px">` +
              `<div style="font-size:28px;line-height:1">${f.icon}</div>` +
              `<div style="margin-top:8px;font-size:13px;font-weight:bold;color:#0f172a;line-height:1.5">${escapeHtml(f.label)}</div></div></td>`
          )
          .join('') +
        `</tr></table>`
      : '') +
    // Bulletproof button (table cell with background colour)
    `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td bgcolor="#0369a1" style="background-color:#0369a1;border-radius:12px">` +
    `<a href="${escapeHtml(opts.link)}" style="display:inline-block;padding:15px 38px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:12px">${escapeHtml(opts.button)}</a>` +
    `</td></tr></table>` +
    `</td></tr>` +
    // Link fallback + note
    `<tr><td style="padding:22px 32px 28px">` +
    `<p style="margin:0 0 6px;font-size:12px;color:#64748b;text-align:center">${isEn ? "If the button doesn't work, copy this link into your browser:" : 'إذا لم يعمل الزر، انسخ هذا الرابط إلى المتصفح:'}</p>` +
    `<p style="margin:0 0 18px;font-size:12px;line-height:1.6;color:#0369a1;text-align:center;word-break:break-all" dir="ltr">${escapeHtml(opts.link)}</p>` +
    `<p style="margin:0;padding:12px 14px;border-radius:10px;background-color:#f1f5f9;font-size:12px;line-height:1.8;color:#64748b;text-align:center">${escapeHtml(opts.note)}` +
    (opts.secondary ? ` <a href="${escapeHtml(opts.secondary.href)}" style="color:#0369a1;font-weight:bold">${escapeHtml(opts.secondary.label)}</a>` : '') +
    `</p>` +
    `</td></tr>`;
  const html = emailShell({ lang: opts.lang, preheader: opts.intro, body, hero: opts.hero });
  const text = `${opts.title}\r\n\r\n${opts.intro}\r\n\r\n${opts.link}\r\n\r\n${opts.note}\r\n\r\n— ${isEn ? 'Techno Enjaz' : 'تكنو إنجاز'} · technoenjaz.com`;
  return { html, text };
}
