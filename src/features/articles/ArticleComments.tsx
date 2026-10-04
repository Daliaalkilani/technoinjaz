'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Heart, MessageSquare, Reply, Send, User, LogIn, Loader2 } from 'lucide-react';
import { apiRequest, apiErrorMessage, getLoggedInUser, requireAuth, AUTH_EVENT } from '@/lib/auth';
import { formatRelative, formatFullDate } from '@/lib/relativeTime';
import './ArticleComments.css';

export interface ArticleComment {
  id: number;
  parentId: number | null;
  body: string;
  createdAt: number;
  author: { name: string };
  likeCount: number;
  liked: boolean;
  mine: boolean;
}

interface Props {
  slug: string;
  isEn: boolean;
  onCountChange?: (count: number) => void;
}

const MAX_LEN = 2000;

export default function ArticleComments({ slug, isEn, onCountChange }: Props) {
  const [comments, setComments] = useState<ArticleComment[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyPosting, setReplyPosting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  // Re-render once a minute so "just now" / "منذ دقيقة" stay accurate.
  const [, setTick] = useState(0);

  const load = useCallback(async () => {
    const res = await apiRequest<{ comments: ArticleComment[] }>(`/api/articles/${encodeURIComponent(slug)}/comments`);
    if (res.ok) {
      setComments(res.comments);
      setLoadError(null);
    } else {
      setComments((prev) => prev ?? []);
      setLoadError(apiErrorMessage(res.error, isEn));
    }
  }, [slug, isEn]);

  useEffect(() => {
    setSignedIn(Boolean(getLoggedInUser()));
    load();
    // Sign-in / sign-out changes "liked" and "mine" flags: refetch.
    const onAuth = () => {
      setSignedIn(Boolean(getLoggedInUser()));
      load();
    };
    window.addEventListener(AUTH_EVENT, onAuth);
    const t = window.setInterval(() => setTick((n) => n + 1), 60_000);
    return () => {
      window.removeEventListener(AUTH_EVENT, onAuth);
      window.clearInterval(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (comments) onCountChange?.(comments.length);
  }, [comments, onCountChange]);

  // Deep link from the profile page: /articles/<slug>#comment-<id>
  useEffect(() => {
    if (!comments?.length) return;
    const m = window.location.hash.match(/^#comment-(\d+)$/);
    if (!m) return;
    const el = document.getElementById(`comment-${m[1]}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('is-highlighted');
      window.setTimeout(() => el.classList.remove('is-highlighted'), 2400);
    }
  }, [comments]);

  const { topLevel, replies } = useMemo(() => {
    const top: ArticleComment[] = [];
    const rep = new Map<number, ArticleComment[]>();
    for (const c of comments ?? []) {
      if (c.parentId === null) top.push(c);
      else rep.set(c.parentId, [...(rep.get(c.parentId) ?? []), c]);
    }
    // Newest threads first; replies read top-down in the order they were written.
    top.sort((a, b) => b.createdAt - a.createdAt);
    rep.forEach((list) => list.sort((a, b) => a.createdAt - b.createdAt));
    return { topLevel: top, replies: rep };
  }, [comments]);

  const post = async (body: string, parentId: number | null) => {
    const res = await apiRequest<{ comment: ArticleComment }>(`/api/articles/${encodeURIComponent(slug)}/comments`, {
      method: 'POST',
      body: { body, parentId }
    });
    if (!res.ok) {
      if (res.status === 401) requireAuth();
      return apiErrorMessage(res.error, isEn);
    }
    setComments((prev) => [...(prev ?? []), res.comment]);
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    const body = text.trim();
    if (!body || posting) return;
    setPosting(true);
    setFormError(null);
    const err = await post(body, null);
    setPosting(false);
    if (err) setFormError(err);
    else setText('');
  };

  const handleReplySubmit = async (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!requireAuth()) return;
    const body = replyText.trim();
    if (!body || replyPosting) return;
    setReplyPosting(true);
    setReplyError(null);
    const err = await post(body, parentId);
    setReplyPosting(false);
    if (err) setReplyError(err);
    else {
      setReplyText('');
      setReplyTo(null);
    }
  };

  const openReply = (threadId: number, mentionName?: string) => {
    if (!requireAuth()) return;
    setReplyTo(threadId);
    setReplyError(null);
    setReplyText(mentionName ? `@${mentionName} ` : '');
    window.setTimeout(() => document.getElementById(`reply-input-${threadId}`)?.focus(), 30);
  };

  const toggleLike = async (c: ArticleComment) => {
    if (!requireAuth()) return;
    const nextLiked = !c.liked;
    const patch = (liked: boolean, likeCount: number) =>
      setComments((prev) => (prev ?? []).map((x) => (x.id === c.id ? { ...x, liked, likeCount } : x)));
    patch(nextLiked, Math.max(0, c.likeCount + (nextLiked ? 1 : -1)));
    const res = await apiRequest<{ liked: boolean; likeCount: number }>(`/api/comments/${c.id}/like`, {
      method: nextLiked ? 'POST' : 'DELETE',
      body: {}
    });
    if (res.ok) patch(res.liked, res.likeCount);
    else {
      patch(c.liked, c.likeCount);
      if (res.status === 401) requireAuth();
    }
  };

  const renderComment = (c: ArticleComment, threadId: number, isReply: boolean) => (
    <div key={c.id} id={`comment-${c.id}`} className={`ac-comment ${isReply ? 'is-reply' : ''}`}>
      <div className="ac-avatar" aria-hidden="true">
        {c.author.name.charAt(0).toUpperCase()}
      </div>
      <div className="ac-body">
        <div className="ac-meta">
          <span className="ac-author">
            {c.author.name}
            {c.mine && <span className="ac-you">{isEn ? 'You' : 'أنت'}</span>}
          </span>
          <time className="ac-time" dateTime={new Date(c.createdAt).toISOString()} title={formatFullDate(c.createdAt, isEn)}>
            {formatRelative(c.createdAt, isEn)}
          </time>
        </div>
        <p className="ac-text">{c.body}</p>
        <div className="ac-actions">
          <button
            type="button"
            className={`ac-action ac-like ${c.liked ? 'is-liked' : ''}`}
            onClick={() => toggleLike(c)}
            aria-pressed={c.liked}
            aria-label={c.liked ? (isEn ? 'Unlike comment' : 'إلغاء الإعجاب بالتعليق') : (isEn ? 'Like comment' : 'الإعجاب بالتعليق')}
          >
            <Heart size={15} fill={c.liked ? 'currentColor' : 'none'} />
            <span>{c.likeCount}</span>
          </button>
          <button
            type="button"
            className="ac-action"
            onClick={() => openReply(threadId, isReply ? c.author.name : undefined)}
          >
            <Reply size={15} />
            <span>{isEn ? 'Reply' : 'رد'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const count = comments?.length ?? 0;

  return (
    <section className="article-discussion-section" id="article-discussion">
      <div className="discussion-header">
        <div className="discussion-title-wrap">
          <MessageSquare size={20} className="discussion-icon" />
          <h2 className="discussion-title">
            {isEn ? `Technical Discussion (${count})` : `النقاش الهندسي والملاحظات (${count})`}
          </h2>
        </div>
      </div>

      {signedIn ? (
        <form onSubmit={handleSubmit} className="comment-input-form">
          <div className="comment-form-inner">
            <textarea
              className="comment-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isEn ? "Add your engineering insight or technical query..." : "أضف تعليقك أو استفسارك الهندسي حول محتوى المقال..."}
              aria-label={isEn ? "Technical comment" : "تعليقك الهندسي"}
              maxLength={MAX_LEN}
              rows={3}
            />
            {formError && <p className="ac-error" role="alert">{formError}</p>}
            <div className="comment-form-actions">
              <button type="submit" className="comment-submit-btn" disabled={!text.trim() || posting}>
                {posting ? <Loader2 size={15} className="ac-spin" /> : <Send size={15} />}
                <span>{posting ? (isEn ? 'Posting…' : 'جارٍ النشر…') : (isEn ? 'Post Comment' : 'نشر التعليق')}</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="ac-signin-card">
          <p>{isEn ? 'Sign in to join the discussion, reply and like comments.' : 'سجّل الدخول للمشاركة في النقاش والرد على التعليقات والإعجاب بها.'}</p>
          <button type="button" className="comment-submit-btn" onClick={() => requireAuth()}>
            <LogIn size={15} />
            <span>{isEn ? 'Sign in to comment' : 'سجّل الدخول للتعليق'}</span>
          </button>
        </div>
      )}

      <div className="comments-stream-list">
        {comments === null ? (
          <div className="ac-loading">
            <Loader2 size={20} className="ac-spin" />
            <span>{isEn ? 'Loading comments…' : 'جارٍ تحميل التعليقات…'}</span>
          </div>
        ) : loadError && comments.length === 0 ? (
          <div className="no-comments-box">
            <p>{loadError}</p>
          </div>
        ) : topLevel.length === 0 ? (
          <div className="no-comments-box">
            <User size={32} className="no-comments-icon" />
            <p>{isEn ? "Be the first to share an engineering perspective on this topic." : "كن أول من يشارك برأي أو استفسار هندسي حول هذا الموضوع."}</p>
          </div>
        ) : (
          topLevel.map((c) => {
            const thread = replies.get(c.id) ?? [];
            return (
              <div key={c.id} className="ac-thread">
                {renderComment(c, c.id, false)}
                {(thread.length > 0 || replyTo === c.id) && (
                  <div className="ac-replies">
                    {thread.map((r) => renderComment(r, c.id, true))}
                    {replyTo === c.id && (
                      <form className="ac-reply-form" onSubmit={(e) => handleReplySubmit(e, c.id)}>
                        <textarea
                          id={`reply-input-${c.id}`}
                          className="comment-textarea ac-reply-textarea"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={isEn ? `Reply to ${c.author.name}…` : `ردّك على ${c.author.name}…`}
                          aria-label={isEn ? 'Your reply' : 'ردّك'}
                          maxLength={MAX_LEN}
                          rows={2}
                        />
                        {replyError && <p className="ac-error" role="alert">{replyError}</p>}
                        <div className="ac-reply-actions">
                          <button type="button" className="ac-action" onClick={() => setReplyTo(null)}>
                            {isEn ? 'Cancel' : 'إلغاء'}
                          </button>
                          <button type="submit" className="comment-submit-btn" disabled={!replyText.trim() || replyPosting}>
                            {replyPosting ? <Loader2 size={14} className="ac-spin" /> : <Send size={14} />}
                            <span>{isEn ? 'Reply' : 'رد'}</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
