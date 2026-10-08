'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, Phone, MessageCircle, AlertCircle, Inbox } from 'lucide-react';
import { apiRequest, apiErrorMessage } from '@/lib/auth';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './AdminMessages.css';

type Message = {
  id: number;
  name: string;
  specialization: string | null;
  university: string | null;
  email: string | null;
  phone: string | null;
  inquiry: string;
  lang: string;
  email_sent: number;
  wa_sent: number;
  created_at: number;
};

/** Contact-form archive (D1) for the site owners. Access is enforced by the API. */
export default function AdminMessages() {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState<'loading' | 'ready' | 'more' | { error: string }>('loading');

  const load = useCallback(async (before?: number) => {
    setState(before ? 'more' : 'loading');
    const res = await apiRequest<{ messages: Message[]; total: number }>(`/api/admin/messages${before ? `?before=${before}` : ''}`);
    if (!res.ok) return setState({ error: res.error });
    setMessages((prev) => (before ? [...prev, ...res.messages] : res.messages));
    setTotal(res.total);
    setState('ready');
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const fmt = (ms: number) =>
    new Date(ms).toLocaleString(isEn ? 'en-GB' : 'ar-SY', { dateStyle: 'medium', timeStyle: 'short' });

  if (typeof state === 'object') {
    const needsLogin = state.error === 'unauthorized';
    return (
      <div className="admin-msgs" dir={isEn ? 'ltr' : 'rtl'}>
        <div className="admin-msgs-notice">
          <AlertCircle size={20} />
          <span>
            {state.error === 'forbidden'
              ? isEn
                ? 'This page is only available to the site owners (with a verified email).'
                : 'هذه الصفحة متاحة لأصحاب الموقع فقط (ببريد إلكتروني مؤكد).'
              : apiErrorMessage(state.error, isEn)}
          </span>
          {needsLogin && <Link href="/login">{isEn ? 'Sign in' : 'تسجيل الدخول'}</Link>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-msgs" dir={isEn ? 'ltr' : 'rtl'}>
      <header className="admin-msgs-header">
        <h1>{isEn ? 'Contact Messages' : 'رسائل نموذج التواصل'}</h1>
        <span className="admin-msgs-count">
          {isEn ? `${total} total` : `المجموع: ${total}`} ·{' '}
          <Link href="/admin/subscribers">{isEn ? 'Newsletter →' : 'النشرة البريدية ←'}</Link>
        </span>
      </header>

      {state === 'loading' ? (
        <div className="admin-msgs-loading"><Loader2 className="admin-msgs-spin" size={22} /></div>
      ) : messages.length === 0 ? (
        <div className="admin-msgs-notice"><Inbox size={20} /><span>{isEn ? 'No messages yet.' : 'لا توجد رسائل بعد.'}</span></div>
      ) : (
        <ul className="admin-msgs-list">
          {messages.map((m) => (
            <li key={m.id} className="admin-msg">
              <div className="admin-msg-top">
                <strong>{m.name}</strong>
                <time>{fmt(m.created_at)}</time>
              </div>
              {(m.specialization || m.university) && (
                <div className="admin-msg-meta">{[m.specialization, m.university].filter(Boolean).join(' · ')}</div>
              )}
              <p className="admin-msg-body">{m.inquiry}</p>
              <div className="admin-msg-links">
                {m.email && <a href={`mailto:${m.email}`}><Mail size={14} />{m.email}</a>}
                {m.phone && <a href={`tel:${m.phone}`}><Phone size={14} />{m.phone}</a>}
                <span className={m.email_sent ? 'ok' : 'warn'}>
                  <Mail size={13} />
                  {m.email_sent ? (isEn ? 'emailed' : 'أُرسل بالبريد') : isEn ? 'email not sent' : 'لم يُرسل بالبريد'}
                </span>
                {m.wa_sent ? <span className="ok"><MessageCircle size={13} />WhatsApp</span> : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      {state !== 'loading' && messages.length < total && (
        <button type="button" className="admin-msgs-more" disabled={state === 'more'} onClick={() => load(messages[messages.length - 1]?.id)}>
          {state === 'more' ? <Loader2 className="admin-msgs-spin" size={16} /> : null}
          {isEn ? 'Load older messages' : 'عرض رسائل أقدم'}
        </button>
      )}
    </div>
  );
}
