'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AuthSwitch from './components/ui/auth-switch';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import './AuthPage.css';

export default function AuthPage({ initialMode = 'login', onBack, onSuccess }) {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const defaultBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleBackAction = onBack || defaultBack;

  const handleAuthComplete = (data, defaultName) => {
    try {
      const user = {
        name: data?.name || data?.email?.split('@')[0] || defaultName,
        email: data?.email || 'user@technoenjaz.com',
        joined: isEn ? 'Member since 2026' : 'عضو منذ 2026',
        status: isEn ? 'Verified Account' : 'حساب موثق'
      };
      if (typeof window !== 'undefined') {
        localStorage.removeItem('techno_logged_out');
        localStorage.setItem('techno_user', JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('techno_auth_updated', { detail: user }));
        window.dispatchEvent(new CustomEvent('storage'));
      }
      if (onSuccess) {
        onSuccess(user);
      } else {
        let returnPath = null;
        try {
          returnPath = sessionStorage.getItem('techno_auth_return_path') || sessionStorage.getItem('techno_auth_return_hash');
          sessionStorage.removeItem('techno_auth_return_path');
          sessionStorage.removeItem('techno_auth_return_hash');
        } catch (e) {}

        if (returnPath && !returnPath.startsWith('/login') && !returnPath.startsWith('/register') && !returnPath.startsWith('#login') && !returnPath.startsWith('#register')) {
          router.push(returnPath);
        } else {
          router.push('/account');
        }
      }
    } catch (e) {
      console.error('Error during auth handling:', e);
      handleBackAction();
    }
  };

  return (
    <div className="auth-page-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Ambient background glow */}
      <div className="auth-ambient-bg" />
      <div className="auth-grid-overlay" />

      <main className="auth-main-content">
        {/* Back navigation button */}
        {handleBackAction && (
          <div
            className="auth-back-nav"
            style={{ maxWidth: '860px', width: '100%', marginBottom: '16px', display: 'flex', justifyContent: 'flex-start' }}
          >
            <button onClick={handleBackAction} className="auth-back-btn" title={isEn ? "Back to Home" : "العودة إلى الرئيسية"}>
              {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{isEn ? "Back to Home" : "العودة إلى الرئيسية"}</span>
            </button>
          </div>
        )}

        {/* Sliding AuthSwitch component */}
        <AuthSwitch
          initialState={initialMode === 'register' ? 'signUp' : 'signIn'}
          onSignIn={(data) => handleAuthComplete(data, isEn ? 'Techno User' : 'مستخدم تكنو')}
          onSignUp={(data) => handleAuthComplete(data, isEn ? 'New Member' : 'عضو جديد')}
        />
      </main>
    </div>
  );
}
