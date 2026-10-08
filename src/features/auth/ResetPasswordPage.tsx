'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { apiRequest, apiErrorMessage, setSessionDisplay } from '@/lib/auth';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './AuthPage.css';
import './AuthSwitch.css';
import './ResetPasswordPage.css';

/**
 * /reset-password            → ask for the account email, a one-hour link is emailed
 * /reset-password?token=...  → choose a new password (signs the visitor in)
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token');
    if (t) {
      setToken(t);
      // Keep the token out of history / referrers once it is in memory.
      window.history.replaceState(null, '', '/reset-password');
    }
  }, []);

  const requestLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await apiRequest('/api/auth/forgot-password', { method: 'POST', body: { email } });
    setPending(false);
    if (!res.ok) return setError(apiErrorMessage(res.error, isEn));
    setDone(
      isEn
        ? 'If an account exists for this email, a reset link is on its way. It is valid for one hour — check your spam folder too.'
        : 'إذا كان هناك حساب بهذا البريد فسيصلك رابط إعادة التعيين خلال دقائق، وهو صالح لمدة ساعة. تحقق من مجلد الرسائل غير المرغوب فيها أيضاً.'
    );
  };

  const setNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) return setError(isEn ? 'The two passwords do not match.' : 'كلمتا المرور غير متطابقتين.');
    setPending(true);
    const res = await apiRequest<{ user: { name: string } }>('/api/auth/reset-password', { method: 'POST', body: { token, password } });
    setPending(false);
    if (!res.ok) {
      return setError(
        res.error === 'invalid_token'
          ? isEn
            ? 'This reset link is invalid, expired, or already used. Request a new one.'
            : 'رابط إعادة التعيين غير صالح أو منتهي الصلاحية أو مستخدم مسبقاً. اطلب رابطاً جديداً.'
          : apiErrorMessage(res.error, isEn)
      );
    }
    setSessionDisplay(res.user);
    setDone(isEn ? 'Your password has been changed. Signing you in…' : 'تم تغيير كلمة المرور بنجاح، جارٍ تسجيل دخولك…');
    setTimeout(() => router.push('/account'), 1200);
  };

  return (
    <div className="auth-page-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="auth-ambient-bg" />
      <div className="auth-grid-overlay" />
      <div className="auth-main-content">
        <div className="reset-card">
          <div className="reset-card-icon">
            <KeyRound size={22} />
          </div>
          <h1 className="auth-switch-form-title">
            {token ? (isEn ? 'Choose a New Password' : 'اختر كلمة مرور جديدة') : isEn ? 'Forgot Your Password?' : 'نسيت كلمة المرور؟'}
          </h1>
          <p className="auth-switch-form-subtitle">
            {token
              ? isEn
                ? 'Enter a new password for your account (at least 8 characters).'
                : 'أدخل كلمة مرور جديدة لحسابك (8 أحرف على الأقل).'
              : isEn
                ? 'Enter the email you registered with and we will send you a link to set a new password.'
                : 'أدخل البريد الإلكتروني الذي سجّلت به وسنرسل لك رابطاً لتعيين كلمة مرور جديدة.'}
          </p>

          {done && (
            <div className="auth-switch-success" role="status">
              <CheckCircle2 size={18} />
              <span>{done}</span>
            </div>
          )}
          {error && (
            <div className="auth-switch-error" role="alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {!done && !token && (
            <form onSubmit={requestLink}>
              <div className="auth-switch-input-group">
                <label htmlFor="reset-email" className="auth-switch-label">{isEn ? 'Email Address' : 'البريد الإلكتروني'}</label>
                <div className="auth-switch-input-wrapper">
                  <span className="auth-switch-input-icon"><Mail size={16} /></span>
                  <input id="reset-email" type="email" autoComplete="email" required placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-switch-input" />
                </div>
              </div>
              <button type="submit" className="auth-switch-submit-btn" disabled={pending} aria-busy={pending}>
                {pending ? <Loader2 size={16} className="auth-switch-spin" /> : <Mail size={16} />}
                <span>{isEn ? 'Send Reset Link' : 'إرسال رابط إعادة التعيين'}</span>
              </button>
            </form>
          )}

          {!done && token && (
            <form onSubmit={setNewPassword}>
              {[
                { id: 'new-password', label: isEn ? 'New Password' : 'كلمة المرور الجديدة', value: password, set: setPassword },
                { id: 'confirm-password', label: isEn ? 'Confirm Password' : 'تأكيد كلمة المرور', value: confirm, set: setConfirm }
              ].map((f) => (
                <div className="auth-switch-input-group" key={f.id}>
                  <label htmlFor={f.id} className="auth-switch-label">{f.label}</label>
                  <div className="auth-switch-input-wrapper">
                    <span className="auth-switch-input-icon"><Lock size={16} /></span>
                    <input id={f.id} type={show ? 'text' : 'password'} autoComplete="new-password" required minLength={8} placeholder="••••••••" value={f.value} onChange={(e) => f.set(e.target.value)} className="auth-switch-input" />
                    {f.id === 'new-password' && (
                      <button type="button" className="auth-switch-eye-btn" onClick={() => setShow(!show)} aria-label={show ? (isEn ? 'Hide password' : 'إخفاء كلمة المرور') : isEn ? 'Show password' : 'إظهار كلمة المرور'}>
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="submit" className="auth-switch-submit-btn" disabled={pending} aria-busy={pending}>
                {pending ? <Loader2 size={16} className="auth-switch-spin" /> : <KeyRound size={16} />}
                <span>{isEn ? 'Save New Password' : 'حفظ كلمة المرور الجديدة'}</span>
              </button>
            </form>
          )}

          <div className="reset-card-footer">
            <Link href="/login">{isEn ? 'Back to sign in' : 'العودة إلى تسجيل الدخول'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
