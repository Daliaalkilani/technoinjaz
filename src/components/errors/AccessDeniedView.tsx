'use client';

import React from 'react';
import Link from 'next/link';
import { Home, LogIn } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import ErrorScene from './ErrorScene';
import './ErrorPages.css';

export interface AccessDeniedViewProps {
  requiredRole?: string;
  resourceName?: string;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({
  requiredRole,
  resourceName
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--access" />
      <div className="te-error-grid" />

      <div className="te-error-card has-scene" dir={isEn ? 'ltr' : 'rtl'}>
        <ErrorScene variant="forbidden" label={isEn ? 'The Techno Enjaz logo locked behind a shield' : 'شعار تكنو إنجاز مقفل خلف درع حماية'} />


        <h1 className="te-error-title">
          {isEn ? 'Access Forbidden' : 'تم رفض صلاحيات الوصول'}
        </h1>

        <p className="te-error-desc">
          {isEn
            ? `You do not have the required clearance to access ${resourceName ? `"${resourceName}"` : 'this engineering resource'}. Please sign in with an authorized account or contact an administrator.`
            : `ليس لديك ترخيص الوصول الكافي لعرض ${resourceName ? `"${resourceName}"` : 'هذا المورد الهندسي المحمي'}. يرجى تسجيل الدخول بحساب معتمد أو مراجعة إدارة النظام.`}
        </p>

        <div className="te-error-actions">
          <Link href="/login" className="te-error-btn te-error-btn-primary">
            <LogIn size={16} />
            <span>{isEn ? 'Sign In' : 'تسجيل الدخول'}</span>
          </Link>
          <Link href="/" className="te-error-btn te-error-btn-secondary">
            <Home size={16} />
            <span>{isEn ? 'Return Home' : 'العودة للرئيسية'}</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AccessDeniedView;
