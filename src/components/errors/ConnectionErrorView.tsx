'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, Layers, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import ErrorScene from './ErrorScene';
import './ErrorPages.css';

export interface ConnectionErrorViewProps {
  onRetry?: () => void;
}

export const ConnectionErrorView: React.FC<ConnectionErrorViewProps> = ({ onRetry }) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'online' | 'offline'>('idle');

  // Real retry: go back to the page the visitor was trying to open (same-origin
  // referrer / history), or home. Re-rendering /offline itself looked like nothing
  // happened.
  const resume = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    let target = '/';
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (ref && ref.origin === window.location.origin && !/^\/(offline|connection-error)/.test(ref.pathname)) {
        target = ref.pathname + ref.search + ref.hash;
      }
    } catch {
      /* ignore */
    }
    window.location.assign(target);
  };

  const isReachable = async () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return false;
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`/api/health?t=${Date.now()}`, { cache: 'no-store', signal: controller.signal });
      clearTimeout(t);
      return res.status < 500;
    } catch {
      return false;
    }
  };

  // The connection comes back by itself → resume automatically
  useEffect(() => {
    const handleOnline = async () => {
      if (await isReachable()) {
        setTestResult('online');
        setTimeout(resume, 900);
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult('idle');
    const ok = await isReachable();
    setIsTesting(false);
    if (ok) {
      setTestResult('online');
      setTimeout(resume, 700);
    } else {
      setTestResult('offline');
    }
  };

  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--connection" />
      <div className="te-error-grid" />

      <div className="te-error-card has-scene" dir={isEn ? 'ltr' : 'rtl'}>
        <ErrorScene variant="offline" label={isEn ? 'The signal between the station and the satellite is cut' : 'الإشارة بين المحطة والقمر الصناعي مقطوعة'} />


        <h1 className="te-error-title">
          {isEn ? 'Connection Unavailable' : 'انقطع الاتصال بالشبكة'}
        </h1>

        <p className="te-error-desc">
          {isEn
            ? 'We are unable to reach the Techno Enjaz cloud platform. Please verify your internet connection, Wi-Fi signal, or proxy settings.'
            : 'تعذر الوصول إلى خوادم منصة تكنو إنجاز السحابية. يرجى التأكد من تشغيل الإنترنت، إشارة الواي فاي، أو إعدادات الشبكة لديك.'}
        </p>

        {/* Diagnostics & Troubleshooting Tips */}
        <div className="te-error-diagnostics">
          <div className="te-error-diagnostics-header">
            <span>{isEn ? 'Troubleshooting Checklist' : 'خطوات التحقق السريعة'}</span>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>TELEMETRY CHECK</span>
          </div>
          <ul className="te-error-tips-list">
            <li className="te-error-tip-item">
              <span className="te-error-tip-bullet" />
              <span>{isEn ? 'Verify router Wi-Fi or cellular mobile data connection.' : 'تأكد من تشغيل موجه الواي فاي (Router) أو بيانات الهاتف.'}</span>
            </li>
            <li className="te-error-tip-item">
              <span className="te-error-tip-bullet" />
              <span>{isEn ? 'Check if VPN or ad-blocking proxies are interrupting sockets.' : 'تأكد من إيقاف أي برنامج VPN أو بروكسي قد يعيق الاتصال.'}</span>
            </li>
            <li className="te-error-tip-item">
              <span className="te-error-tip-bullet" />
              <span>{isEn ? 'Recheck your device airplane mode status.' : 'تأكد من عدم تفعيل وضع الطيران في جهازك.'}</span>
            </li>
          </ul>
        </div>

        {/* Primary and Secondary Actions */}
        <div className="te-error-actions">
          <button
            type="button"
            className="te-error-btn te-error-btn-primary"
            onClick={handleTestConnection}
            disabled={isTesting}
          >
            {isTesting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{isEn ? 'Testing Connection...' : 'جاري فحص الاتصال...'}</span>
              </>
            ) : (
              <>
                <RotateCcw size={16} />
                <span>{isEn ? 'Test Connection & Retry' : 'فحص الاتصال وإعادة المحاولة'}</span>
              </>
            )}
          </button>

          <Link href="/" className="te-error-btn te-error-btn-secondary">
            <Home size={16} />
            <span>{isEn ? 'Return Home' : 'العودة للرئيسية'}</span>
          </Link>

          <Link href="/projects" className="te-error-btn te-error-btn-secondary">
            <Layers size={16} />
            <span>{isEn ? 'Explore Projects' : 'تصفح المشاريع'}</span>
          </Link>
        </div>

        {/* Live Feedback Toast */}
        {testResult === 'online' && (
          <div className="te-error-live-status te-error-live-status--online">
            <CheckCircle2 size={15} />
            <span>{isEn ? 'Connection restored! Reconnecting now...' : 'تم استعادة الاتصال بنجاح! جاري التحديث الآن...'}</span>
          </div>
        )}

        {testResult === 'offline' && (
          <div className="te-error-live-status te-error-live-status--offline">
            <AlertCircle size={15} />
            <span>{isEn ? 'Still offline. Please check your network connection.' : 'لا يزال الاتصال منقطعاً. يرجى التحقق من الشبكة.'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionErrorView;
