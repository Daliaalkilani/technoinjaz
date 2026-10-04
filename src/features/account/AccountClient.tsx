'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHydrated } from '@/hooks/useHydrated';
import { refreshSession, apiRequest, apiErrorMessage, type AccountUser } from '@/lib/auth';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import UserProfilePage from './UserProfilePage';

export type VerifyNotice = { type: 'success' | 'error'; message: string } | null;

export function AccountClient() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [user, setUser] = useState<AccountUser | null>(null);
  const [verifyNotice, setVerifyNotice] = useState<VerifyNotice>(null);

  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    (async () => {
      // Email verification link: /account?verify=<token>
      const params = new URLSearchParams(window.location.search);
      const token = params.get('verify');
      if (token) {
        window.history.replaceState(null, '', '/account');
        const res = await apiRequest('/api/auth/verify-email', { method: 'POST', body: { token } });
        if (!cancelled) {
          setVerifyNotice(
            res.ok
              ? { type: 'success', message: isEn ? 'Your email address has been verified.' : 'تم تأكيد بريدك الإلكتروني بنجاح.' }
              : { type: 'error', message: apiErrorMessage(res.error, isEn) }
          );
        }
      }

      const me = await refreshSession();
      if (cancelled) return;
      if (!me) {
        try {
          sessionStorage.setItem('techno_auth_return_path', '/account');
        } catch (e) {}
        router.replace('/login');
        return;
      }
      setUser(me);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, router]);

  if (!hydrated || !user) {
    return (
      <div
        className="account-skeleton-wrapper"
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-main, #030712)',
          color: 'var(--text-muted, #94a3b8)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(0, 210, 255, 0.2)',
              borderTopColor: '#00d2ff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px auto'
            }}
          />
          <p style={{ fontFamily: 'var(--font-readex), sans-serif', fontSize: '15px' }}>
            {isEn ? 'Loading your profile…' : 'جاري تحميل الملف الشخصي...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <UserProfilePage
      user={user}
      verifyNotice={verifyNotice}
      onUserChange={setUser}
      onBack={() => router.push('/')}
      onLogout={() => router.push('/')}
      onOpenReader={(project: any) => router.push(project?.slug || project?.id ? `/projects/${project.slug || project.id}` : '/projects')}
      onExploreProjects={() => router.push('/projects')}
    />
  );
}

export default AccountClient;
