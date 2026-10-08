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
export function buildMime(opts: { to: string; subject: string; text: string; html: string; replyTo?: string }): string {
  const boundary = '----=_te_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  const domain = MAIL_FROM_ADDR.split('@')[1];
  const headers = [
    `From: ${MAIL_FROM}`,
    `To: ${opts.to}`,
    ...(opts.replyTo ? [`Reply-To: ${opts.replyTo}`] : []),
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
export async function sendMail(opts: { to: string; subject: string; text: string; html: string; replyTo?: string; tag: string }): Promise<boolean> {
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

/** Branded single-action email (verification, password reset). */
export function actionEmail(opts: { title: string; intro: string; button: string; link: string; note: string }) {
  const html =
    `<!doctype html><html lang="ar" dir="rtl"><body style="margin:0;background:#f1f5f9;padding:24px;font-family:Tahoma,Arial,sans-serif">` +
    `<table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0">` +
    `<tr><td style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:20px 24px"><div style="color:#38bdf8;font-size:12px;font-weight:700;letter-spacing:1px">TECHNO ENJAZ</div>` +
    `<div style="color:#fff;font-size:19px;font-weight:800;margin-top:4px">${escapeHtml(opts.title)}</div></td></tr>` +
    `<tr><td style="padding:22px 24px;color:#0f172a;font-size:15px;line-height:1.8">${escapeHtml(opts.intro)}` +
    `<p style="margin:22px 0"><a href="${escapeHtml(opts.link)}" style="background:#0369a1;color:#fff;padding:11px 20px;border-radius:8px;text-decoration:none;font-weight:bold">${escapeHtml(opts.button)}</a></p>` +
    `<p style="font-size:12px;color:#64748b;margin:0">${escapeHtml(opts.note)}</p></td></tr></table></body></html>`;
  const text = `${opts.title}\r\n\r\n${opts.intro}\r\n\r\n${opts.link}\r\n\r\n${opts.note}`;
  return { html, text };
}
