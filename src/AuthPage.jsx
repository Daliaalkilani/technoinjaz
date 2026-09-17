import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AuthSwitch from './components/ui/auth-switch.tsx';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import './AuthPage.css';

export default function AuthPage({ initialMode = 'login', onBack }) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  return (
    <div className="auth-page-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Ambient background glow */}
      <div className="auth-ambient-bg" />
      <div className="auth-grid-overlay" />

      <main className="auth-main-content">
        {/* Back navigation button */}
        {onBack && (
          <div
            className="auth-back-nav"
            style={{ maxWidth: '860px', width: '100%', marginBottom: '16px', display: 'flex', justifyContent: 'flex-start' }}
          >
            <button onClick={onBack} className="auth-back-btn" title={isEn ? "Back to Home" : "العودة إلى الرئيسية"}>
              {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{isEn ? "Back to Home" : "العودة إلى الرئيسية"}</span>
            </button>
          </div>
        )}

        {/* Sliding AuthSwitch component */}
        <AuthSwitch
          initialState={initialMode === 'register' ? 'signUp' : 'signIn'}
          onSignIn={(data) => console.log('Sign in submitted:', data)}
          onSignUp={(data) => console.log('Sign up submitted:', data)}
        />
      </main>
    </div>
  );
}
