'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle, Download, Send, FlaskConical, Users } from 'lucide-react';
import { apiRequest, apiErrorMessage } from '@/lib/auth';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './AdminMessages.css';

type Sub = { id: number; email: string; lang: string; status: 'active' | 'pending' | 'unsubscribed'; created_at: number; confirmed_at: number | null };
type Item = { type: 'article' | 'project'; slug: string; title: string; date: string };
type SendRow = { id: number; item_type: string; item_slug: string; subject: string; sent_count: number; fail_count: number; total: number; created_at: number; finished_at: number | null };

/** Newsletter admin: subscribers, CSV export, announce an article / project. */
export default function AdminSubscribers() {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [subs, setSubs] = useState<Sub[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [items, setItems] = useState<Item[]>([]);
  const [sends, setSends] = useState<SendRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [choice, setChoice] = useState('');
  const [busy, setBusy] = useState<null | 'test' | 'send'>(null);
  const [progress, setProgress] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [note, setNote] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = useCallback(async () => {
    const [a, b] = await Promise.all([
      apiRequest<{ counts: Record<string, number>; subscribers: Sub[] }>('/api/admin/subscribers'),
      apiRequest<{ items: Item[]; sends: SendRow[] }>('/api/admin/newsletter')
    ]);
    if (!a.ok) return setError(a.error);
    if (!b.ok) return setError(b.error);
    setSubs(a.subscribers);
    setCounts(a.counts);
    setItems(b.items);
    setSends(b.sends);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const [type, slug] = choice.split(':') as ['article' | 'project', string];
  const sentBefore = useMemo(() => sends.find((s) => s.item_type === type && s.item_slug === slug), [sends, type, slug]);
  const fmt = (ms: number) => new Date(ms).toLocaleString(isEn ? 'en-GB' : 'ar-SY', { dateStyle: 'medium', timeStyle: 'short' });

  const sendTest = async () => {
    setBusy('test');
    setNote(null);
    const res = await apiRequest<{ sent: boolean; to: string }>('/api/admin/newsletter', { method: 'POST', body: { mode: 'test', type, slug } });
    setBusy(null);
    setNote(
      res.ok && res.sent
        ? { type: 'ok', text: isEn ? `Test sent to ${res.to}.` : `أُرسلت نسخة تجريبية إلى ${res.to}.` }
        : { type: 'err', text: res.ok ? (isEn ? 'Cloudflare refused the email (check Email Sending).' : 'رفضت Cloudflare إرسال الرسالة (تحقق من تفعيل Email Sending).') : apiErrorMessage(res.error, isEn) }
    );
  };

  const sendAll = async () => {
    const confirmText = sentBefore
      ? isEn ? 'This item was already sent. Send it again to every active subscriber?' : 'أُرسلت هذه النشرة سابقاً. إرسالها مجدداً لكل المشتركين؟'
      : isEn ? `Send to ${counts.active || 0} active subscribers?` : `إرسال النشرة إلى ${counts.active || 0} مشتركاً مؤكداً؟`;
    if (!window.confirm(confirmText)) return;
    setBusy('send');
    setNote(null);
    const start = await apiRequest<{ sendId: number; total: number }>('/api/admin/newsletter', {
      method: 'POST',
      body: { mode: 'start', type, slug, force: Boolean(sentBefore) }
    });
    if (!start.ok) {
      setBusy(null);
      return setNote({ type: 'err', text: start.error === 'no_subscribers' ? (isEn ? 'There are no confirmed subscribers yet.' : 'لا يوجد مشتركون مؤكدون بعد.') : apiErrorMessage(start.error, isEn) });
    }
    let afterId = 0;
    let sent = 0;
    let failed = 0;
    setProgress({ sent, failed, total: start.total });
    for (let guard = 0; guard < 2000; guard++) {
      const step = await apiRequest<{ done: boolean; nextAfterId: number; sent: number; failed: number }>('/api/admin/newsletter', {
        method: 'POST',
        body: { mode: 'continue', sendId: start.sendId, afterId }
      });
      if (!step.ok) {
        setNote({ type: 'err', text: apiErrorMessage(step.error, isEn) });
        break;
      }
      sent += step.sent;
      failed += step.failed;
      afterId = step.nextAfterId;
      setProgress({ sent, failed, total: start.total });
      if (step.done) {
        setNote({
          type: failed ? 'err' : 'ok',
          text: isEn ? `Done: ${sent} sent${failed ? `, ${failed} failed` : ''}.` : `تم: أُرسلت ${sent}${failed ? `، وفشلت ${failed}` : ''}.`
        });
        break;
      }
    }
    setBusy(null);
    load();
  };

  if (error) {
    return (
      <div className="admin-msgs" dir={isEn ? 'ltr' : 'rtl'}>
        <div className="admin-msgs-notice">
          <AlertCircle size={20} />
          <span>
            {error === 'forbidden'
              ? isEn ? 'This page is only available to the site owners (with a verified email).' : 'هذه الصفحة متاحة لأصحاب الموقع فقط (ببريد إلكتروني مؤكد).'
              : apiErrorMessage(error, isEn)}
          </span>
          {error === 'unauthorized' && <Link href="/login">{isEn ? 'Sign in' : 'تسجيل الدخول'}</Link>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-msgs" dir={isEn ? 'ltr' : 'rtl'}>
      <header className="admin-msgs-header">
        <h1>{isEn ? 'Newsletter' : 'النشرة البريدية'}</h1>
        <Link href="/admin/messages" className="admin-msgs-count">{isEn ? 'Contact messages →' : 'رسائل التواصل ←'}</Link>
      </header>

      {loading ? (
        <div className="admin-msgs-loading"><Loader2 className="admin-msgs-spin" size={22} /></div>
      ) : (
        <>
          <div className="admin-nl-stats">
            <div><strong>{counts.active || 0}</strong><span>{isEn ? 'confirmed' : 'مؤكد'}</span></div>
            <div><strong>{counts.pending || 0}</strong><span>{isEn ? 'awaiting confirmation' : 'بانتظار التأكيد'}</span></div>
            <div><strong>{counts.unsubscribed || 0}</strong><span>{isEn ? 'unsubscribed' : 'ألغوا الاشتراك'}</span></div>
            <a className="admin-msgs-more admin-nl-export" href="/api/admin/subscribers?format=csv">
              <Download size={16} />
              {isEn ? 'Export CSV' : 'تصدير CSV'}
            </a>
          </div>

          <section className="admin-msg admin-nl-send">
            <h2>{isEn ? 'Announce new content' : 'إرسال نشرة عن محتوى جديد'}</h2>
            <select value={choice} onChange={(e) => setChoice(e.target.value)} className="admin-nl-select">
              <option value="">{isEn ? 'Choose an article or a project…' : 'اختر مقالة أو مشروعاً…'}</option>
              <optgroup label={isEn ? 'Articles' : 'المقالات'}>
                {items.filter((i) => i.type === 'article').map((i) => (
                  <option key={i.slug} value={`article:${i.slug}`}>{i.title}</option>
                ))}
              </optgroup>
              <optgroup label={isEn ? 'Projects' : 'المشاريع'}>
                {items.filter((i) => i.type === 'project').map((i) => (
                  <option key={i.slug} value={`project:${i.slug}`}>{i.title}</option>
                ))}
              </optgroup>
            </select>
            {sentBefore && (
              <p className="admin-msg-meta">
                {isEn ? `Already sent on ${fmt(sentBefore.created_at)} (${sentBefore.sent_count} delivered).` : `أُرسلت سابقاً بتاريخ ${fmt(sentBefore.created_at)} (${sentBefore.sent_count} رسالة).`}
              </p>
            )}
            <div className="admin-nl-actions">
              <button type="button" className="admin-msgs-more" disabled={!choice || busy !== null} onClick={sendTest}>
                {busy === 'test' ? <Loader2 className="admin-msgs-spin" size={16} /> : <FlaskConical size={16} />}
                {isEn ? 'Send me a test' : 'أرسل لي نسخة تجريبية'}
              </button>
              <button type="button" className="admin-msgs-more admin-nl-primary" disabled={!choice || busy !== null || !counts.active} onClick={sendAll}>
                {busy === 'send' ? <Loader2 className="admin-msgs-spin" size={16} /> : <Send size={16} />}
                {isEn ? `Send to ${counts.active || 0} subscribers` : `إرسال إلى ${counts.active || 0} مشتركاً`}
              </button>
            </div>
            {progress && busy === 'send' && (
              <progress className="admin-nl-progress" max={progress.total} value={progress.sent + progress.failed} />
            )}
            {note && <p className={`admin-nl-note ${note.type}`}>{note.text}</p>}
          </section>

          {sends.length > 0 && (
            <section className="admin-nl-history">
              <h2>{isEn ? 'Sent newsletters' : 'النشرات المرسلة'}</h2>
              <ul className="admin-msgs-list">
                {sends.map((s) => (
                  <li key={s.id} className="admin-msg">
                    <div className="admin-msg-top"><strong>{s.subject}</strong><time>{fmt(s.created_at)}</time></div>
                    <div className="admin-msg-meta">
                      {isEn ? `${s.sent_count}/${s.total} delivered` : `${s.sent_count} من ${s.total}`}
                      {s.fail_count ? (isEn ? ` · ${s.fail_count} failed` : ` · فشل ${s.fail_count}`) : ''}
                      {!s.finished_at ? (isEn ? ' · interrupted' : ' · لم يكتمل') : ''}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="admin-nl-history">
            <h2><Users size={18} /> {isEn ? 'Subscribers' : 'المشتركون'}</h2>
            {subs.length === 0 ? (
              <div className="admin-msgs-notice">{isEn ? 'No subscribers yet.' : 'لا يوجد مشتركون بعد.'}</div>
            ) : (
              <div className="md-table-wrap">
                <table className="admin-nl-table">
                  <thead>
                    <tr>
                      <th>{isEn ? 'Email' : 'البريد'}</th>
                      <th>{isEn ? 'Status' : 'الحالة'}</th>
                      <th>{isEn ? 'Language' : 'اللغة'}</th>
                      <th>{isEn ? 'Subscribed' : 'تاريخ الاشتراك'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((s) => (
                      <tr key={s.id}>
                        <td dir="ltr">{s.email}</td>
                        <td className={`admin-nl-status ${s.status}`}>
                          {s.status === 'active' ? (isEn ? 'confirmed' : 'مؤكد') : s.status === 'pending' ? (isEn ? 'pending' : 'بانتظار التأكيد') : isEn ? 'unsubscribed' : 'ألغى'}
                        </td>
                        <td>{s.lang === 'en' ? 'EN' : 'AR'}</td>
                        <td>{fmt(s.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
