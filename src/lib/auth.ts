export interface TechnoUser {
  name: string;
  email: string;
  joined?: string;
  avatar?: string;
  status?: string;
}

/**
 * Returns the currently logged in user from localStorage if a valid session exists.
 * Returns null if the user has explicitly logged out or has not signed in.
 */
export function getLoggedInUser(): TechnoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const isLoggedOut = localStorage.getItem('techno_logged_out');
    if (isLoggedOut === 'true') return null;

    const stored = localStorage.getItem('techno_user');
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.name && !parsed.email) return null;

    return parsed;
  } catch (e) {
    console.error('Error reading logged-in user:', e);
    return null;
  }
}

/**
 * Checks if a user is logged in.
 * If logged in, returns true.
 * If not logged in, redirects to the login view (#login), fires 'techno_require_login',
 * records the current/intended return hash in sessionStorage, and returns false.
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
