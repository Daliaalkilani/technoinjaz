'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServerCrash, RotateCcw, Home, Activity, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './ErrorPages.css';

export interface ServerErrorViewProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export const ServerErrorView: React.FC<ServerErrorViewProps> = ({ error, reset }) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [checkingHealth, setCheckingHealth] = useState(false);
  const [healthStatus, setHealthStatus] = useState<string | null>(null);

  const handleRetry = () => {
    if (reset) {
      reset();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleCheckTelemetry = async () => {
    setCheckingHealth(true);
    setHealthStatus(null);
    try {
      const start = Date.now();
      const res = await fetch('/api/health', { method: 'HEAD', cache: 'no-store' }).catch(() => null);
      const ping = Date.now() - start;

      if (res && res.status < 500) {
        setHealthStatus(
          isEn
            ? `Server cluster responsive (${ping}ms) - Try reloading now`
            : `خوادم النظام تستجيب (${ping}ms) - يمكنك إعادة التحميل الآن`
        );
      } else {
        setHealthStatus(
          isEn
            ? 'Nodes self-healing in progress. Please retry shortly.'
            : 'العقد البرمجية قيد المعالجة الذاتية التلقائية. يرجى الانتظار قليلاً.'
        );
      }
    } catch {
      setHealthStatus(
        isEn
          ? 'Temporary gateway timeout. Automatic failover active.'
          : 'مهلة استجابة مؤقتة. يتم التبديل التلقائي للخوادم الاحتياطية.'
      );
    } finally {
      setCheckingHealth(false);
    }
  };

  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--server" />
      <div className="te-error-grid" />

      <div className="te-error-card" dir={isEn ? 'ltr' : 'rtl'}>
        {/* Visual Badge */}
        <div className="te-error-visual-badge te-error-visual-badge--server">
          <ServerCrash size={42} strokeWidth={2.2} />
        </div>

        {/* 500 Code Display */}
        <span className="te-error-code te-error-code--server">500</span>

        {/* Status Pill */}
        <div className="te-error-pill te-error-pill--server">
          <span className="te-error-pill-dot" />
          <span>{isEn ? 'Internal System Exception' : 'خلل فني غير متوقع في الخادم'}</span>
        </div>

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
              <span style={{ fontFamily: 'monospace', color: 'rgb(var(--c-primary))', fontSize: '11px' }}>
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
          >
            <RotateCcw size={16} />
            <span>{isEn ? 'Try Again' : 'إعادة المحاولة'}</span>
          </button>

          <button
            type="button"
            className="te-error-btn te-error-btn-secondary"
            onClick={handleCheckTelemetry}
            disabled={checkingHealth}
          >
            <Activity size={16} />
            <span>{checkingHealth ? (isEn ? 'Probing...' : 'جاري الفحص...') : (isEn ? 'Check Server Health' : 'فحص حالة الخوادم')}</span>
          </button>

          <Link href="/" className="te-error-btn te-error-btn-secondary">
            <Home size={16} />
            <span>{isEn ? 'Return Home' : 'العودة للرئيسية'}</span>
          </Link>

          <Link href="/contact" className="te-error-btn te-error-btn-secondary">
            <Send size={15} />
            <span>{isEn ? 'Report Issue' : 'إبلاغ الفريق'}</span>
          </Link>
        </div>

        {/* Telemetry Result Toast */}
        {healthStatus && (
          <div className="te-error-live-status te-error-live-status--testing">
            <CheckCircle2 size={15} />
            <span>{healthStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerErrorView;
