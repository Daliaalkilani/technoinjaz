'use client';

import React from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import ErrorScene from './ErrorScene';
import './ErrorPages.css';

export interface ServerErrorViewProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export const ServerErrorView: React.FC<ServerErrorViewProps> = ({ error, reset }) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [retrying, setRetrying] = React.useState(false);

  const handleRetry = () => {
    setRetrying(true);
    if (reset) {
      try { reset(); } catch { /* fall through to full reload */ }
      // reset() re-renders the boundary, but if the underlying error persists the
      // view would stay unchanged — verify we actually left the error screen.
      window.setTimeout(() => {
        setRetrying(false);
        if (typeof window !== 'undefined') window.location.reload();
      }, 2500);
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--server" />
      <div className="te-error-grid" />

      <div className="te-error-card has-scene" dir={isEn ? 'ltr' : 'rtl'}>
        <ErrorScene variant="server" label={isEn ? 'The Techno Enjaz ship stalled on the launch pad' : 'مركبة تكنو إنجاز متعطلة على منصة الإطلاق'} />


        <h1 className="te-error-title">
          {isEn ? 'Internal Server Error' : 'خطأ في معالجة طلب الخادم'}
        </h1>

        <p className="te-error-desc">
          {isEn
            ? 'Our cloud architecture encountered an unexpected issue while handling this operation. Our engineering telemetry has logged this event.'
            : 'واجهت معمارية الخوادم السحابية مشكلة غير متوقعة أثناء معالجة هذا الطلب. تم تسجيل الحدث في سجلات المراقبة الهندسية للتعامل معه فوراً.'}
        </p>

        {/* Diagnostic Metadata (if available) */}
        {error?.digest && (
          <div className="te-error-diagnostics">
            <div className="te-error-diagnostics-header">
              <span>{isEn ? 'Diagnostic Reference' : 'معرف السجل التشخيصي'}</span>
              <span style={{ fontFamily: 'monospace', color: '#00d2ff', fontSize: '11px' }}>
                {error.digest}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-faint, #64748b)' }}>
              {isEn
                ? 'Reference code generated for technical auditing.'
                : 'كود تدقيق تم توليده لفرق الدعم والتحليل الهندسي.'}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="te-error-actions">
          <button
            type="button"
            className="te-error-btn te-error-btn-primary"
            onClick={handleRetry}
            disabled={retrying}
          >
            <RotateCcw size={16} className={retrying ? 'te-error-spin' : undefined} />
            <span>{retrying ? (isEn ? 'Retrying…' : 'جارٍ إعادة المحاولة…') : (isEn ? 'Try Again' : 'إعادة المحاولة')}</span>
          </button>


          <Link href="/" className="te-error-btn te-error-btn-secondary">
            <Home size={16} />
            <span>{isEn ? 'Return Home' : 'العودة للرئيسية'}</span>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ServerErrorView;
