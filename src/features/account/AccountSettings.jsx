'use client';

import React, { useState } from 'react';
import Link from '@/i18n/navigation';
import { KeyRound, Trash2, Loader2, CheckCircle2, AlertCircle, ShieldCheck, Inbox, Mail } from 'lucide-react';
import { apiRequest, apiErrorMessage, logout } from '@/lib/auth';
import './AccountSettings.css';

/**
 * Account settings on /account: change password (signs out other devices), delete the
 * account (password-confirmed, irreversible), and admin shortcuts for site owners.
 */
export default function AccountSettings({ user, isEn, onDeleted }) {
  const [open, setOpen] = useState(null); // 'password' | 'delete' | null
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [delPassword, setDelPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const toggle = (k) => {
    setOpen(open === k ? null : k);
    setMsg(null);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (next !== confirm) return setMsg({ type: 'err', text: isEn ? 'The new passwords do not match.' : 'كلمتا المرور الجديدتان غير متطابقتين.' });
    setBusy(true);
    const res = await apiRequest('/api/auth/change-password', { method: 'POST', body: { current, password: next } });
    setBusy(false);
    if (!res.ok) return setMsg({ type: 'err', text: apiErrorMessage(res.error, isEn) });
    setCurrent(''); setNext(''); setConfirm('');
    setMsg({ type: 'ok', text: isEn ? 'Password changed. Other devices were signed out.' : 'تم تغيير كلمة المرور، وتم تسجيل الخروج من الأجهزة الأخرى.' });
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    const ask = isEn
      ? 'Delete your account permanently? Your comments, likes and saved items will be removed. This cannot be undone.'
      : 'حذف حسابك نهائياً؟ ستُحذف تعليقاتك وإعجاباتك ومحفوظاتك، ولا يمكن التراجع.';
    if (!window.confirm(ask)) return;
    setBusy(true);
    const res = await apiRequest('/api/auth/account', { method: 'DELETE', body: { password: delPassword } });
    setBusy(false);
    if (!res.ok) return setMsg({ type: 'err', text: apiErrorMessage(res.error, isEn) });
    await logout().catch(() => {});
    onDeleted?.();
  };

  return (
    <section className="acct-settings" aria-label={isEn ? 'Account settings' : 'إعدادات الحساب'}>
      <h2 className="acct-settings-title">{isEn ? 'Account settings' : 'إعدادات الحساب'}</h2>

      {user?.isAdmin && (
        <div className="acct-admin-links">
          <ShieldCheck size={16} />
          <span>{isEn ? 'Site owner tools:' : 'أدوات صاحب الموقع:'}</span>
          <Link href="/admin/messages"><Inbox size={14} /> {isEn ? 'Contact messages' : 'رسائل التواصل'}</Link>
          <Link href="/admin/subscribers"><Mail size={14} /> {isEn ? 'Newsletter' : 'النشرة البريدية'}</Link>
        </div>
      )}

      <div className="acct-row">
        <button type="button" className="acct-row-btn" aria-expanded={open === 'password'} onClick={() => toggle('password')}>
          <KeyRound size={16} /> {isEn ? 'Change password' : 'تغيير كلمة المرور'}
        </button>
        {open === 'password' && (
          <form className="acct-form" onSubmit={changePassword}>
            <input type="password" autoComplete="current-password" required placeholder={isEn ? 'Current password' : 'كلمة المرور الحالية'} value={current} onChange={(e) => setCurrent(e.target.value)} />
            <input type="password" autoComplete="new-password" required minLength={8} placeholder={isEn ? 'New password (8+ characters)' : 'كلمة المرور الجديدة (8 أحرف على الأقل)'} value={next} onChange={(e) => setNext(e.target.value)} />
            <input type="password" autoComplete="new-password" required minLength={8} placeholder={isEn ? 'Confirm new password' : 'تأكيد كلمة المرور الجديدة'} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <button type="submit" className="acct-primary" disabled={busy}>
              {busy ? <Loader2 size={15} className="acct-spin" /> : null}
              {isEn ? 'Save new password' : 'حفظ كلمة المرور'}
            </button>
          </form>
        )}
      </div>

      <div className="acct-row">
        <button type="button" className="acct-row-btn acct-danger" aria-expanded={open === 'delete'} onClick={() => toggle('delete')}>
          <Trash2 size={16} /> {isEn ? 'Delete account' : 'حذف الحساب'}
        </button>
        {open === 'delete' && (
          <form className="acct-form" onSubmit={deleteAccount}>
            <p className="acct-warn">
              {isEn
                ? 'This permanently deletes your account, comments, likes and saved items.'
                : 'سيؤدي هذا إلى حذف حسابك وتعليقاتك وإعجاباتك ومحفوظاتك نهائياً.'}
            </p>
            <input type="password" autoComplete="current-password" required placeholder={isEn ? 'Confirm with your password' : 'أكّد بكلمة المرور'} value={delPassword} onChange={(e) => setDelPassword(e.target.value)} />
            <button type="submit" className="acct-primary acct-danger-btn" disabled={busy}>
              {busy ? <Loader2 size={15} className="acct-spin" /> : <Trash2 size={15} />}
              {isEn ? 'Delete my account' : 'حذف حسابي نهائياً'}
            </button>
          </form>
        )}
      </div>

      {msg && (
        <p className={`acct-msg ${msg.type}`} role={msg.type === 'err' ? 'alert' : 'status'}>
          {msg.type === 'ok' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />} {msg.text}
        </p>
      )}
    </section>
  );
}
