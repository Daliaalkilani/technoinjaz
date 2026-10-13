'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle2, AlertCircle, MailCheck, MailX } from 'lucide-react';
import { apiRequest } from '@/lib/auth';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import '@/features/auth/AuthPage.css';
import '@/features/auth/AuthSwitch.css';
import '@/features/auth/ResetPasswordPage.css';

type State = 'working' | 'ask' | 'confirmed' | 'unsubscribed' | 'invalid' | 'error' | 'idle';

/**
 * /newsletter?confirm=<token>      → confirms a subscription (double opt-in)
 * /newsletter?unsubscribe=<token>  → asks, then unsubscribes on a button click. Never on
 *   page load: mail security scanners (e.g. Microsoft Safe Links) open links in a real
 *   browser and run their JS, which used to unsubscribe readers who never clicked.
 *   Mail clients' one-click button uses the RFC 8058 POST, not this page.
 */
export default function NewsletterActionPage() {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [state, setState] = useState<State>('working');
  const [email, setEmail] = useState('');
  const [kind, setKind] = useState<'confirm' | 'unsubscribe' | null>(null);
  const [unsubToken, setUnsubToken] = useState('');

  const run = (action: 'confirm' | 'unsubscribe', token: string) => {
    setState('working');
    apiRequest<{ email: string }>(`/api/newsletter/${action}`, { method: 'POST', body: { token } }).then((res) => {
      if (res.ok) {
        setEmail(res.email);
        setState(action === 'confirm' ? 'confirmed' : 'unsubscribed');
        if (action === 'unsubscribe') {
          try {
            localStorage.removeItem('techno_newsletter_subscribed');
          } catch {}
        }
      } else setState(res.error === 'invalid_token' ? 'invalid' : 'error');
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const confirm = params.get('confirm');
    const unsubscribe = params.get('unsubscribe');
    const token = confirm || unsubscribe;
    if (!token) return setState('idle');
    const action = confirm ? 'confirm' : 'unsubscribe';
    setKind(action);
    // Keep the token out of history / referrers.
    window.history.replaceState(null, '', '/newsletter');
    if (action === 'unsubscribe') {
      setUnsubToken(token);
      setState('ask');
    } else run(action, token);
  }, []);

  const text: Record<State, { title: string; body: string }> = {
    working: { title: isEn ? 'One moment…' : 'لحظة من فضلك…', body: '' },
    ask: { title: isEn ? 'Unsubscribe from the newsletter?' : 'إلغاء الاشتراك في النشرة؟', body: '' },
    confirmed: {
      title: isEn ? 'Subscription confirmed' : 'تم تأكيد اشتراكك',
      body: isEn ? `New Techno Enjaz articles and projects will reach ${email}. Every email has an unsubscribe link.` : `ستصل مقالات تكنو إنجاز ومشاريعها الجديدة إلى ${email}، وفي كل رسالة رابط لإلغاء الاشتراك.`
    },
    unsubscribed: {
      title: isEn ? 'You have been unsubscribed' : 'تم إلغاء اشتراكك',
      body: isEn ? `${email} will no longer receive the newsletter. You can subscribe again anytime from the site footer.` : `لن تصل النشرة بعد الآن إلى ${email}. يمكنك الاشتراك مجدداً في أي وقت من أسفل الموقع.`
    },
    invalid: {
      title: isEn ? 'This link is not valid' : 'الرابط غير صالح',
      body:
        kind === 'confirm'
          ? isEn ? 'The confirmation link has expired or was already used. Subscribe again from the site footer to get a new one.' : 'انتهت صلاحية رابط التأكيد أو استُخدم مسبقاً. اشترك مجدداً من أسفل الموقع ليصلك رابط جديد.'
          : isEn ? 'This unsubscribe link is not valid.' : 'رابط إلغاء الاشتراك هذا غير صالح.'
    },
    error: { title: isEn ? 'Something went wrong' : 'حدث خطأ', body: isEn ? 'Please try again in a moment.' : 'يرجى المحاولة بعد قليل.' },
    idle: { title: isEn ? 'Techno Enjaz Newsletter' : 'نشرة تكنو إنجاز', body: isEn ? 'Subscribe from the site footer to receive new articles and projects.' : 'اشترك من أسفل الموقع لتصلك المقالات والمشاريع الجديدة.' }
  };
  const Icon = state === 'working' ? Loader2 : state === 'confirmed' ? MailCheck : state === 'unsubscribed' || state === 'ask' ? MailX : state === 'idle' ? MailCheck : AlertCircle;

  return (
    <div className="auth-page-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="auth-ambient-bg" />
      <div className="auth-grid-overlay" />
      <div className="auth-main-content">
        <div className="reset-card" role="status" aria-live="polite">
          <div className="reset-card-icon">
            <Icon size={22} className={state === 'working' ? 'auth-switch-spin' : undefined} />
          </div>
          <h1 className="auth-switch-form-title">{text[state].title}</h1>
          {text[state].body && (
            <div className={state === 'invalid' || state === 'error' ? 'auth-switch-error' : 'auth-switch-success'}>
              {state === 'invalid' || state === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{text[state].body}</span>
            </div>
          )}
          {state === 'ask' && (
            <button type="button" className="auth-switch-submit-btn" onClick={() => run('unsubscribe', unsubToken)}>
              {isEn ? 'Yes, unsubscribe me' : 'نعم، ألغِ اشتراكي'}
            </button>
          )}
          <div className="reset-card-footer">
            <Link href="/">{isEn ? 'Back to the home page' : 'العودة إلى الرئيسية'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
