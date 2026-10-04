'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AuthSwitch from './AuthSwitch';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { apiRequest, apiErrorMessage, setSessionDisplay } from '@/lib/auth';
import './AuthPage.css';

/**
 * @param {{
 *   initialMode?: 'login' | 'register',
 *   onBack?: (() => void) | null,
 *   onSuccess?: ((user?: any) => void) | null
 * }} [props]
 */
export default function AuthPage({ initialMode = 'login', onBack, onSuccess } = {}) {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('auth-no-scroll');
      document.documentElement.classList.add('auth-no-scroll');
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('auth-no-scroll');
        document.documentElement.classList.remove('auth-no-scroll');
      }
    };
  }, []);

  const defaultBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleBackAction = onBack || defaultBack;

  const navigateAfterAuth = (user) => {
    if (onSuccess) {
      onSuccess(user);
      return;
    }
    let returnPath = null;
    try {
      returnPath = sessionStorage.getItem('techno_auth_return_path') || sessionStorage.getItem('techno_auth_return_hash');
      sessionStorage.removeItem('techno_auth_return_path');
      sessionStorage.removeItem('techno_auth_return_hash');
    } catch (e) {}

    // Only same-site paths are honoured (no open redirect via sessionStorage).
    const safe = returnPath && returnPath.startsWith('/') && !returnPath.startsWith('//');
    if (safe && !returnPath.startsWith('/login') && !returnPath.startsWith('/register')) {
      router.push(returnPath);
    } else {
      router.push('/account');
    }
  };

  /**
   * Calls the real auth endpoint. Resolves to an error message for AuthSwitch
   * to display, or null on success (the session cookie is set by the server;
   * only the display name is cached locally).
   */
  const submitAuth = async (endpoint, payload) => {
    const res = await apiRequest(endpoint, { method: 'POST', body: payload });
    if (!res.ok) return apiErrorMessage(res.error, isEn);
    setSessionDisplay(res.user);
    // Brief pause so the success banner is seen before navigating away.
    setTimeout(() => navigateAfterAuth(res.user), 700);
    return null;
  };

  return (
    <div className="auth-page-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Ambient background glow */}
      <div className="auth-ambient-bg" />
      <div className="auth-grid-overlay" />

      <div className="auth-main-content">
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
          onSignIn={(data) => submitAuth('/api/auth/login', { email: data.email, password: data.password })}
          onSignUp={(data) => submitAuth('/api/auth/register', { name: data.name, email: data.email, password: data.password })}
        />
      </div>
    </div>
  );
}
