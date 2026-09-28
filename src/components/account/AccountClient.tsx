'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHydrated } from '@/hooks/useHydrated';
import { getLoggedInUser } from '@/utils/authUtils';
import UserProfilePage from '@/UserProfilePage';

export function AccountClient() {
  const router = useRouter();
  const hydrated = useHydrated();
  const [user, setUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const currentUser = getLoggedInUser();
    if (!currentUser) {
      try {
        sessionStorage.setItem('techno_auth_return_path', '/account');
      } catch (e) {}
      router.replace('/login');
    } else {
      setUser(currentUser);
      setChecked(true);
    }
  }, [hydrated, router]);

  if (!hydrated || !checked || !user) {
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
          <p style={{ fontFamily: 'var(--font-readex), sans-serif', fontSize: '15px' }}>جاري تحميل الملف الشخصي...</p>
        </div>
      </div>
    );
  }

  return (
    <UserProfilePage
      onBack={() => router.push('/')}
      onLogout={() => router.push('/')}
      onOpenReader={(project: any) => router.push(project?.slug ? `/projects/${project.slug}` : '/projects')}
      onExploreProjects={() => router.push('/projects')}
    />
  );
}

export default AccountClient;
