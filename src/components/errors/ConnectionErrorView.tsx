'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WifiOff, RotateCcw, Home, Layers, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './ErrorPages.css';

export interface ConnectionErrorViewProps {
  onRetry?: () => void;
}

export const ConnectionErrorView: React.FC<ConnectionErrorViewProps> = ({ onRetry }) => {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'online' | 'offline'>('idle');

  // Listen to browser online events
  useEffect(() => {
    const handleOnline = () => {
      setTestResult('online');
      setTimeout(() => {
        if (onRetry) onRetry();
        else router.refresh();
      }, 1000);
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [onRetry, router]);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult('idle');

    // 1. Check navigator.onLine
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setTimeout(() => {
        setIsTesting(false);
        setTestResult('offline');
      }, 700);
      return;
    }

    // 2. Perform live lightweight ping test
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.status < 500) {
        setTestResult('online');
        setTimeout(() => {
          if (onRetry) onRetry();
          else router.refresh();
        }, 800);
      } else if (navigator.onLine) {
        // Fallback: network is connected
        setTestResult('online');
        setTimeout(() => {
          if (onRetry) onRetry();
          else router.refresh();
        }, 800);
      } else {
        setTestResult('offline');
      }
    } catch {
      setTestResult(navigator.onLine ? 'online' : 'offline');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--connection" />
      <div className="te-error-grid" />

      <div className="te-error-card" dir={isEn ? 'ltr' : 'rtl'}>
        {/* Radar Visual Badge */}
        <div className="te-error-visual-badge te-error-visual-badge--connection">
          <div className="te-error-radar-ping" />
          <WifiOff size={42} strokeWidth={2.2} />
        </div>

        {/* Status Pill */}
        <div className="te-error-pill te-error-pill--connection">
          <span className="te-error-pill-dot" />
          <span>{isEn ? 'Network Link Severed' : 'تعذر الاتصال بالشبكة'}</span>
        </div>

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
