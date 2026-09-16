import React from 'react';
import { ArrowLeft } from 'lucide-react';
import AuthSwitch from './components/ui/auth-switch.tsx';
import './AuthPage.css';

export default function AuthPage({ initialMode = 'login', onBack }) {
  return (
    <div className="auth-page-wrapper" dir="rtl">
      {/* خلفية الإضاءة المحيطة والشبكة الرقمية */}
      <div className="auth-ambient-bg" />
      <div className="auth-grid-overlay" />

      <main className="auth-main-content">
        {/* زر العودة للصفحة الرئيسية */}
        {onBack && (
          <div
            className="auth-back-nav"
            style={{ maxWidth: '860px', width: '100%', marginBottom: '16px', display: 'flex', justifyContent: 'flex-start' }}
          >
            <button onClick={onBack} className="auth-back-btn" title="العودة إلى الرئيسية">
              <ArrowLeft size={16} />
              <span>العودة إلى الرئيسية</span>
            </button>
          </div>
        )}

        {/* المكون التفاعلي المنزلق AuthSwitch المتوافق مع هيكلية shadcn / 21st.dev */}
        <AuthSwitch
          initialState={initialMode === 'register' ? 'signUp' : 'signIn'}
          onSignIn={(data) => console.log('Sign in submitted:', data)}
          onSignUp={(data) => console.log('Sign up submitted:', data)}
        />
      </main>
    </div>
  );
}
