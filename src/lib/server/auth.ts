import 'server-only';
import type { NextResponse } from 'next/server';
import { getDB, type D1 } from './db';
import { actionEmail, sendMail } from './mail';
import { SITE_URL } from '@/config/site';

// ─────────────────────────────────────────────────────────────────────────────
// Password hashing: PBKDF2-SHA256 via WebCrypto (native in Workers, no deps).
// 100k iterations is the ceiling workerd allows for PBKDF2.
// Stored format: pbkdf2$<iterations>$<salt b64>$<hash b64>
// ─────────────────────────────────────────────────────────────────────────────
const PBKDF2_ITERATIONS = 100_000;
const enc = new TextEncoder();

const toB64 = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
};
const fromB64 = (s: string): Uint8Array<ArrayBuffer> => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const toHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toB64(salt)}$${toB64(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iter, saltB64, hashB64] = stored.split('$');
  if (scheme !== 'pbkdf2' || !iter || !saltB64 || !hashB64) return false;
  const actual = await pbkdf2(password, fromB64(saltB64), Number(iter));
  return timingSafeEqual(actual, fromB64(hashB64));
}

// Burns roughly the same CPU as a real check so unknown emails can't be detected by timing.
const DUMMY_HASH = `pbkdf2$${PBKDF2_ITERATIONS}$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`;
export const verifyDummy = (password: string) => verifyPassword(password, DUMMY_HASH);

// ─────────────────────────────────────────────────────────────────────────────
// Tokens: random 32 bytes, sent to the client raw, stored in D1 as SHA-256 hex.
// ─────────────────────────────────────────────────────────────────────────────
export function randomToken(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(32)).buffer);
}

export async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest('SHA-256', enc.encode(value)));
}

// ─────────────────────────────────────────────────────────────────────────────
// Sessions
// ─────────────────────────────────────────────────────────────────────────────
export const SESSION_COOKIE = 'te_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  email_verified: number;
  created_at: number;
}

export async function createSession(db: D1, userId: number): Promise<{ token: string; expiresAt: number }> {
  const token = randomToken();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  await db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?1, ?2, ?3)').bind(await sha256Hex(token), userId, expiresAt).run();
  // Opportunistic cleanup of this user's expired sessions.
  await db.prepare('DELETE FROM sessions WHERE user_id = ?1 AND expires_at < ?2').bind(userId, Date.now()).run();
  return { token, expiresAt };
}

export function setSessionCookie(res: NextResponse, token: string, expiresAt: number) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(expiresAt)
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });
}

export function readSessionToken(request: Request): string | null {
  const header = request.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === SESSION_COOKIE) {
      const v = part.slice(idx + 1).trim();
      return /^[a-f0-9]{64}$/.test(v) ? v : null;
    }
  }
  return null;
}

/** Resolves the signed-in user from the session cookie, or null. */
export async function getSessionUser(request: Request, db?: D1): Promise<SessionUser | null> {
  const token = readSessionToken(request);
  if (!token) return null;
  const d = db ?? (await getDB());
  return d
    .prepare(
      `SELECT u.id, u.email, u.name, u.email_verified, u.created_at
         FROM sessions s JOIN users u ON u.id = s.user_id
        WHERE s.token = ?1 AND s.expires_at > ?2`
    )
    .bind(await sha256Hex(token), Date.now())
    .first<SessionUser>();
}

export async function destroySession(request: Request, db: D1) {
  const token = readSessionToken(request);
  if (token) await db.prepare('DELETE FROM sessions WHERE token = ?1').bind(await sha256Hex(token)).run();
}

export const publicUser = (u: SessionUser) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  emailVerified: Boolean(u.email_verified),
  createdAt: u.created_at
});

// ─────────────────────────────────────────────────────────────────────────────
// Email verification + password reset (links always point at the canonical site, never
// at the request's Host header, so a forged Host cannot poison an emailed link)
// ─────────────────────────────────────────────────────────────────────────────
const VERIFY_TTL_MS = 48 * 60 * 60 * 1000;
const RESET_TTL_MS = 60 * 60 * 1000;

/** Issues a fresh verification token and emails the link. Returns whether it was sent. */
export async function issueVerificationToken(db: D1, userId: number, email: string): Promise<boolean> {
  const token = randomToken();
  await db.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?1').bind(userId).run();
  await db
    .prepare('INSERT INTO email_verification_tokens (token, user_id, expires_at) VALUES (?1, ?2, ?3)')
    .bind(await sha256Hex(token), userId, Date.now() + VERIFY_TTL_MS)
    .run();
  const link = `${SITE_URL}/account?verify=${token}`;
  const { html, text } = actionEmail({
    title: 'توثيق بريدك الإلكتروني',
    intro: 'أهلاً بك في تكنو إنجاز. اضغط الزر التالي لتوثيق بريدك الإلكتروني (الرابط صالح 48 ساعة).',
    button: 'توثيق البريد',
    link,
    note: 'إذا لم تُنشئ حساباً في technoenjaz.com فتجاهل هذه الرسالة.'
  });
  const sent = await sendMail({ to: email, subject: 'توثيق بريدك — تكنو إنجاز', text, html, tag: 'verify-email' });
  // Fallback the owner can act on (Worker logs) when delivery is refused.
  if (!sent) console.log(`[verify-email] not delivered user=${userId} link=${link}`);
  return sent;
}

/**
 * Password reset request. Only the SHA-256 of the token is stored; any older reset
 * token of the user is replaced. Returns whether the email was handed to Cloudflare.
 */
export async function issuePasswordResetToken(db: D1, userId: number, email: string): Promise<boolean> {
  const token = randomToken();
  await db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?1').bind(userId).run();
  await db
    .prepare('INSERT INTO password_reset_tokens (token, user_id, expires_at) VALUES (?1, ?2, ?3)')
    .bind(await sha256Hex(token), userId, Date.now() + RESET_TTL_MS)
    .run();
  const link = `${SITE_URL}/reset-password?token=${token}`;
  const { html, text } = actionEmail({
    title: 'إعادة تعيين كلمة المرور',
    intro: 'وصلنا طلب لإعادة تعيين كلمة مرور حسابك في تكنو إنجاز. اضغط الزر التالي لاختيار كلمة مرور جديدة (الرابط صالح ساعة واحدة ويُستخدم مرة واحدة).',
    button: 'تعيين كلمة مرور جديدة',
    link,
    note: 'إذا لم تطلب ذلك فتجاهل الرسالة؛ كلمة مرورك الحالية تبقى كما هي.'
  });
  // Never log reset links: they grant account access.
  return sendMail({ to: email, subject: 'إعادة تعيين كلمة المرور — تكنو إنجاز', text, html, tag: 'password-reset' });
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
