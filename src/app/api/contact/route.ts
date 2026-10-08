import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { sendMail } from '@/lib/server/mail';
import { isRateLimited, HOUR } from '@/lib/server/rateLimit';
import type { D1 } from '@/lib/server/db';

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

type Env = {
  DB?: {
    prepare(q: string): { bind(...v: unknown[]): { run(): Promise<{ meta?: { changes?: number } }> } };
  };
  WA_BRIDGE_URL?: string;
  WA_BRIDGE_KEY?: string;
};

const OWNER_JID = '164286894714983@lid';
const TO_ADDR = 'abdalganih1@gmail.com';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function pick(formData: Record<string, unknown>, key: string, max = 600): string {
  const v = typeof formData[key] === 'string' ? (formData[key] as string).trim() : '';
  return v.slice(0, max);
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

    const ip = request.headers.get('cf-connecting-ip') || null;
    const ua = (request.headers.get('user-agent') || '').slice(0, 300) || null;

    if (db && await isRateLimited(db as unknown as D1, [{ name: 'contact:ip', id: ip, limit: 5, windowMs: HOUR }])) {
      return NextResponse.json({ success: false, message: 'Too many messages, please try again later.' }, { status: 429 });
    }

    const { subject, textBody, htmlBody } = contactEmail(name, data, lang);
    const emailSent = (await sendMail({ to: TO_ADDR, subject, text: textBody, html: htmlBody, replyTo: email || undefined, tag: 'contact' })) ? 1 : 0;

    let waSent = 0;
    const waUrl = (env as unknown as Env).WA_BRIDGE_URL;
    const waKey = (env as unknown as Env).WA_BRIDGE_KEY;
    if (waUrl && waKey) {
      try { waSent = (await sendWa(waUrl, waKey, name, data)) ? 1 : 0; } catch { waSent = 0; }
    }

    let stored = false;
    try {
      if (!db) throw new Error('D1 binding "DB" is not configured');
      const result = await db
        .prepare(
          'INSERT INTO contact_messages (name, specialization, university, email, phone, inquiry, lang, ip, user_agent, email_sent, wa_sent) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)'
        )
        .bind(name, data.specialization || null, data.university || null, email || null, data.phone || null, inquiry, lang, ip, ua, emailSent, waSent)
        .run();
      stored = Boolean(result?.meta?.changes);
    } catch (err) {
      console.error('contact archive leg failed:', err instanceof Error ? err.message : err);
    }

    // Delivered if any leg reached the owner: reporting failure after the email went out
    // makes the page fall back to the visitor's mail app, i.e. a duplicate message.
    if (!stored && !emailSent && !waSent) return NextResponse.json({ success: false, message: 'Could not deliver message.' }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact api error', err);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
