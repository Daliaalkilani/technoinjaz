// Client-side view of the account session.
//
// The real session lives in an httpOnly cookie issued by /api/auth/*; JavaScript
// can't (and shouldn't) read it. To keep the header / save buttons synchronous,
// the *display name only* is cached in localStorage under 'techno_user' and is
// re-validated against /api/auth/me on every app load (see refreshSession).
// Nothing sensitive (email, ids, tokens) is ever written to localStorage.

export interface TechnoUser {
  name: string;
}

/** Full profile as returned by /api/auth/me (kept in memory only). */
export interface AccountUser {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: number;
}

const CACHE_KEY = 'techno_user';
export const AUTH_EVENT = 'techno_auth_updated';

/**
 * Returns the cached display identity of the signed-in user, or null.
 * Synchronous on purpose (used by render paths); the cache is kept honest by refreshSession().
 */
export function getLoggedInUser(): TechnoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.name !== 'string' || !parsed.name) return null;
    return { name: parsed.name };
  } catch {
    return null;
  }
}

/** Updates the display cache and notifies listeners (AppShell, saved items, …). */
export function setSessionDisplay(user: { name: string } | null) {
  if (typeof window === 'undefined') return;
  const prev = getLoggedInUser();
  try {
    if (user) localStorage.setItem(CACHE_KEY, JSON.stringify({ name: user.name }));
    else localStorage.removeItem(CACHE_KEY);
    // Legacy keys from the old client-only flow.
    localStorage.removeItem('techno_logged_out');
    localStorage.removeItem('techno_pending_save');
  } catch {}
  if (prev?.name !== user?.name) {
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: user ? { name: user.name } : null }));
  }
}

let inflight: Promise<AccountUser | null> | null = null;

/** Asks the server who is signed in; refreshes the display cache to match. */
export function refreshSession(): Promise<AccountUser | null> {
  if (inflight) return inflight;
  inflight = fetch('/api/auth/me', { credentials: 'same-origin', cache: 'no-store' })
    .then(async (res) => {
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const user: AccountUser | null = data?.user ?? null;
      setSessionDisplay(user);
      return user;
    })
    .catch(() => {
      // Network/server hiccup: keep whatever is cached rather than logging the user out.
      return null;
    })
    .finally(() => {
      setTimeout(() => {
        inflight = null;
      }, 0);
    });
  return inflight;
}

export type ApiResult<T> = ({ ok: true } & T) | { ok: false; error: string; status: number };

/**
 * JSON fetch for the accounts/engagement API. A 401 clears the stale display cache.
 * Never throws: network failures come back as { ok: false, error: 'network' }.
 */
export async function apiRequest<T = Record<string, unknown>>(
  url: string,
  init: { method?: string; body?: unknown } = {}
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method: init.method ?? 'GET',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: init.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) setSessionDisplay(null);
    if (!res.ok || data?.ok === false) {
      return { ok: false, error: data?.error || 'server_error', status: res.status };
    }
    return { ...(data as T), ok: true };
  } catch {
    return { ok: false, error: 'network', status: 0 };
  }
}

export async function logout(): Promise<void> {
  await apiRequest('/api/auth/logout', { method: 'POST', body: {} });
  setSessionDisplay(null);
}

/**
 * Checks if a user is logged in.
 * If logged in, returns true.
 * If not logged in, fires 'techno_require_login' (AppShell routes to /login),
 * records the current/intended return path in sessionStorage, and returns false.
 */
export function requireAuth(returnPath?: string): boolean {
  const user = getLoggedInUser();
  if (!user) {
    if (typeof window !== 'undefined') {
      const currentTarget = returnPath || (window.location.pathname + window.location.search + window.location.hash);
      try {
        sessionStorage.setItem('techno_auth_return_path', currentTarget);
        sessionStorage.setItem('techno_auth_return_hash', currentTarget);
      } catch (err) {
        console.error('Error setting return path:', err);
      }

      window.dispatchEvent(
        new CustomEvent('techno_require_login', {
          detail: { returnPath: currentTarget }
        })
      );
    }
    return false;
  }
  return true;
}

/** AR/EN text for the API's error codes. */
export function apiErrorMessage(code: string, isEn: boolean): string {
  const m: Record<string, [string, string]> = {
    invalid_email: ['صيغة البريد الإلكتروني غير صحيحة.', 'Please enter a valid email address.'],
    weak_password: ['كلمة المرور يجب أن تكون 8 أحرف على الأقل.', 'Password must be at least 8 characters.'],
    invalid_password: ['كلمة المرور طويلة جداً.', 'Password is too long.'],
    invalid_name: ['يرجى إدخال اسم صحيح (حرفان على الأقل).', 'Please enter your name (at least 2 characters).'],
    email_taken: ['هذا البريد مسجّل مسبقاً، جرّب تسجيل الدخول.', 'This email is already registered — try signing in.'],
    invalid_credentials: ['البريد الإلكتروني أو كلمة المرور غير صحيحة.', 'Incorrect email or password.'],
    unauthorized: ['يجب تسجيل الدخول أولاً.', 'Please sign in first.'],
    empty_comment: ['لا يمكن نشر تعليق فارغ.', "Comment can't be empty."],
    comment_too_long: ['التعليق طويل جداً (الحد 2000 حرف).', 'Comment is too long (2000 characters max).'],
    invalid_token: ['رابط التفعيل غير صالح أو منتهي الصلاحية.', 'This verification link is invalid or has expired.'],
    rate_limited: ['محاولات كثيرة خلال وقت قصير، يرجى الانتظار قليلاً ثم المحاولة مجدداً.', 'Too many attempts in a short time. Please wait a little and try again.'],
    forbidden: ['لا تملك صلاحية لهذا الإجراء.', 'You do not have permission for this action.'],
    network: ['تعذّر الاتصال بالخادم، تحقق من الإنترنت وحاول مجدداً.', 'Could not reach the server. Check your connection and try again.']
  };
  const pair = m[code] ?? ['حدث خطأ غير متوقع، حاول مرة أخرى.', 'Something went wrong. Please try again.'];
  return isEn ? pair[1] : pair[0];
}
