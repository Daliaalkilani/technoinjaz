import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

// ─────────────────────────────────────────────────────────────────────────────
// Contact form pipeline (2026-10): deliver every inquiry three ways —
//   1. Elegant HTML email from info@technoenjaz.com (Workers send_email binding,
//      routed through Cloudflare Email Routing — Hostinger fully out of the loop).
//   2. WhatsApp ping to the owner via the self-hosted bridge (best effort).
//   3. D1 archive (contact_messages table) so nothing is ever lost.
// The API returns ok as long as the D1 insert succeeded, even when the optional
// email / WhatsApp legs fail — the message is stored and flagged.
// ─────────────────────────────────────────────────────────────────────────────

type SendEmail = (message: unknown) => Promise<void>;

type CloudflareEmailModule = { EmailMessage: new (from: string, to: string, raw: string) => unknown };

type Env = {
  DB?: {
    prepare(q: string): { bind(...v: unknown[]): { run(): Promise<{ meta?: { changes?: number } }> } };
  };
  SEND_EMAIL?: SendEmail;
  WA_BRIDGE_URL?: string;
  WA_BRIDGE_KEY?: string;
};

const OWNER_JID = '164286894714983@lid';
const FROM_ADDR = 'info@technoenjaz.com';
const FROM = `Techno Enjaz <${FROM_ADDR}>`;
const TO_ADDR = 'abdalganih1@gmail.com';
const TO = TO_ADDR;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pick(formData: Record<string, unknown>, key: string, max = 600): string {
  const v = typeof formData[key] === 'string' ? (formData[key] as string).trim() : '';
  return v.slice(0, max);
}

// Raw MIME message built by hand (base64 UTF-8 for both parts — no QP
// line-length pitfalls). mimetext is not installable in this environment.
function buildMime(subject: string, textBody: string, htmlBody: string): string {
  const boundary = '----=_te_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  const b64 = (s: string) => {
    const bytes = new TextEncoder().encode(s);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    // wrap at 76 chars per MIME convention
    const raw = btoa(bin);
    return raw.replace(/(.{76})/g, '$1\r\n');
  };
  const headers =
    `From: ${FROM}\r\n` +
    `To: ${TO}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: multipart/alternative; boundary="${boundary}"\r\n`;
  const part = (type: string, body: string) =>
    `--${boundary}\r\nContent-Type: ${type}; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64(body)}\r\n`;
  return headers + '\r\n' + part('text/plain', textBody) + part('text/html', htmlBody) + `--${boundary}--\r\n`;
}

function contactEmail(name: string, data: { specialization: string; university: string; email: string; phone: string; inquiry: string }, lang: string) {
  const isEn = lang === 'en';
  const dir = isEn ? 'ltr' : 'rtl';
  const L = isEn
    ? { title: 'New website inquiry', name: 'Name', major: 'Major', univ: 'University', email: 'Email', phone: 'Phone', msg: 'Inquiry', footer: 'Message sent via technoenjaz.com contact form' }
    : { title: 'استفسار جديد عبر الموقع', name: 'الاسم', major: 'الاختصاص', univ: 'الجامعة / جهة العمل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', msg: 'نص الاستفسار', footer: 'رسالة من نموذج التواصل في technoenjaz.com' };

  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;white-space:nowrap">${esc(L[label as keyof typeof L])}</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600">${esc(value)}</td></tr>` : '';

  const textBody =
    `${L.title} — ${name}\r\n\r\n` +
    `${L.name}: ${name}\r\n${L.major}: ${data.specialization || '—'}\r\n${L.univ}: ${data.university || '—'}\r\n` +
    `${L.email}: ${data.email || '—'}\r\n${L.phone}: ${data.phone || '—'}\r\n\r\n${L.msg}:\r\n${data.inquiry}\r\n\r\n— ${L.footer}`;

  const htmlBody =
    `<!doctype html><html lang="${lang}" dir="${dir}"><body style="margin:0;background:#f1f5f9;padding:24px;font-family:Segoe UI,Tahoma,Arial,sans-serif">` +
    `<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0">` +
    `<tr><td style="background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:22px 24px">` +
    `<div style="color:#38bdf8;font-size:12px;font-weight:700;letter-spacing:1px">TECHNO ENJAZ</div>` +
    `<div style="color:#fff;font-size:19px;font-weight:800;margin-top:4px">${esc(L.title)}</div></td></tr>` +
    `<tr><td style="padding:8px 12px 0"><table role="presentation" width="100%" style="border-collapse:collapse">` +
    row('name', name) + row('major', data.specialization) + row('univ', data.university) +
    row('email', data.email) + row('phone', data.phone) +
    `</table></td></tr>` +
    `<tr><td style="padding:16px 24px"><div style="background:#f8fafc;border:1px solid #e2e8f0;border-inline-start:4px solid #38bdf8;border-radius:8px;padding:14px;color:#0f172a;font-size:14px;line-height:1.8">${esc(data.inquiry).replace(/\n/g, '<br>')}</div></td></tr>` +
    `<tr><td style="padding:14px 24px 22px;color:#94a3b8;font-size:12px">${esc(L.footer)}</td></tr>` +
    `</table></body></html>`;

  return { subject: isEn ? `🌐 New inquiry from ${name} — technoenjaz.com` : `🌐 استفسار جديد من ${name} — technoenjaz.com`, textBody, htmlBody };
}

async function sendWa(url: string, key: string, name: string, data: { email: string; phone: string; inquiry: string }) {
  const text =
    `📬 *رسالة تواصل جديدة — تكنو إنجاز*\n` +
    `👤 ${name}\n` +
    (data.email ? `📧 ${data.email}\n` : '') +
    (data.phone ? `📱 ${data.phone}\n` : '') +
    `\n💬 ${data.inquiry.slice(0, 500)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Notify-Key': key },
    body: JSON.stringify({ chatId: OWNER_JID, message: text }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) return NextResponse.json({ success: false, message: 'Invalid JSON.' }, { status: 400 });

    const name = pick(body, 'name', 120);
    const inquiry = pick(body, 'inquiry', 4000);
    const email = pick(body, 'email', 160);
    if (!name || !inquiry) return NextResponse.json({ success: false, message: 'Name and inquiry are required.' }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, message: 'Invalid email.' }, { status: 400 });

    const data = {
      specialization: pick(body, 'specialization', 160),
      university: pick(body, 'university', 160),
      email,
      phone: pick(body, 'phone', 40),
      inquiry,
    };
    const lang = body.lang === 'en' ? 'en' : 'ar';

    const { env } = await getCloudflareContext();
    const db = (env as unknown as Env).DB;
    if (!db) return NextResponse.json({ success: false, message: 'Storage not configured.' }, { status: 500 });

    const ip = request.headers.get('cf-connecting-ip') || null;
    const ua = (request.headers.get('user-agent') || '').slice(0, 300) || null;

    let emailSent = 0;
    try {
      const send = (env as unknown as Env).SEND_EMAIL;
      if (send) {
        // EmailMessage lives in the workerd-provided "cloudflare:email" module.
        // webpackIgnore keeps Next from trying to bundle the cloudflare: scheme;
        // OpenNext leaves it native in the final worker bundle.
        const emailMod = (await import(/* webpackIgnore: true */ 'cloudflare:email' as string)) as unknown as CloudflareEmailModule;
        const { subject, textBody, htmlBody } = contactEmail(name, data, lang);
        const raw = buildMime(subject, textBody, htmlBody);
        await send(new emailMod.EmailMessage(FROM_ADDR, TO_ADDR, raw));
        emailSent = 1;
      }
    } catch (err) {
      console.error('contact email leg failed:', err instanceof Error ? err.message : err);
    }

    let waSent = 0;
    const waUrl = (env as unknown as Env).WA_BRIDGE_URL;
    const waKey = (env as unknown as Env).WA_BRIDGE_KEY;
    if (waUrl && waKey) {
      try { waSent = (await sendWa(waUrl, waKey, name, data)) ? 1 : 0; } catch { waSent = 0; }
    }

    const result = await db
      .prepare(
        'INSERT INTO contact_messages (name, specialization, university, email, phone, inquiry, lang, ip, user_agent, email_sent, wa_sent) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)'
      )
      .bind(name, data.specialization || null, data.university || null, email || null, data.phone || null, inquiry, lang, ip, ua, emailSent, waSent)
      .run();

    if (!result?.meta?.changes) return NextResponse.json({ success: false, message: 'Could not store message.' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact api error', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
