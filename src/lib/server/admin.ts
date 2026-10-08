import 'server-only';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getSessionUser, type SessionUser } from './auth';
import type { D1 } from './db';

// Owner inboxes allowed into /admin/*. Override with the ADMIN_EMAILS Worker variable
// (comma-separated). The account must also have a verified email, so registering one
// of these addresses without owning the mailbox grants nothing.
const DEFAULT_ADMINS = ['abdalganih1@gmail.com', 'info@abdalgani.com', 'info@technoenjaz.com'];

export function adminEmails(): string[] {
  try {
    const raw = (getCloudflareContext().env as { ADMIN_EMAILS?: string }).ADMIN_EMAILS;
    if (raw) return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  } catch {}
  return DEFAULT_ADMINS;
}

/** The signed-in admin, or the error code to answer with ('unauthorized' | 'forbidden'). */
export async function requireAdmin(request: Request, db: D1): Promise<{ user: SessionUser } | { error: 'unauthorized' | 'forbidden' }> {
  const user = await getSessionUser(request, db);
  if (!user) return { error: 'unauthorized' };
  if (!user.email_verified || !adminEmails().includes(user.email.toLowerCase())) return { error: 'forbidden' };
  return { user };
}
