import 'server-only';
import type { D1 } from './db';

// Fixed-window rate limiting on D1 (table `rate_limits`, migrations/003). One row per
// key; the first hit after the window expires restarts the count. Fails OPEN — if the
// table is missing or D1 errors, the request is allowed (logins must never break
// because of the limiter).

export interface LimitRule {
  /** Bucket name, e.g. "login:ip". */
  name: string;
  /** Who is counted (IP, lowercased email, user id). */
  id: string | number | null | undefined;
  limit: number;
  windowMs: number;
}

export const MIN = 60_000;
export const HOUR = 60 * MIN;

export function clientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

/** Counts one hit against every rule; returns true when any of them is over its limit. */
export async function isRateLimited(db: D1, rules: LimitRule[]): Promise<boolean> {
  const now = Date.now();
  let limited = false;
  for (const r of rules) {
    if (r.id === null || r.id === undefined || r.id === '') continue;
    try {
      const row = await db
        .prepare(
          `INSERT INTO rate_limits (key, count, reset_at) VALUES (?1, 1, ?2)
           ON CONFLICT(key) DO UPDATE SET
             count    = CASE WHEN rate_limits.reset_at <= ?3 THEN 1 ELSE rate_limits.count + 1 END,
             reset_at = CASE WHEN rate_limits.reset_at <= ?3 THEN ?2 ELSE rate_limits.reset_at END
           RETURNING count`
        )
        .bind(`${r.name}:${String(r.id).toLowerCase().slice(0, 200)}`, now + r.windowMs, now)
        .first<{ count: number }>();
      if (row && row.count > r.limit) limited = true;
    } catch (err) {
      console.error('rate limit check failed (allowing):', err instanceof Error ? err.message : err);
    }
  }
  // Occasional cleanup of expired buckets (~1% of calls).
  if (Math.random() < 0.01) {
    db.prepare('DELETE FROM rate_limits WHERE reset_at < ?1').bind(now).run().catch(() => {});
  }
  return limited;
}
