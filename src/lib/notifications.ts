'use client';

import { PROJECTS_DATA, type ProjectItem } from '@/data/projectsData';
import { blogArticlesData, type BlogArticle } from '@/data/blogArticlesData';
import { videosList, type VideoItem } from '@/data/videosData';

export type PlatformContentType = 'project' | 'article' | 'video';

export interface PlatformNotificationItem {
  id: string;
  type: PlatformContentType;
  typeLabelAr: string;
  typeLabelEn: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  url: string;
  image?: string;
  date: string;
  badge: string;
  badgeEn: string;
}

export interface SubscriptionInfo {
  email: string;
  subscribedAt: string;
  pushEnabled: boolean;
}

const STORAGE_KEY_SUBSCRIBED = 'techno_newsletter_subscribed';
const STORAGE_KEY_EMAIL = 'techno_newsletter_email';
const STORAGE_KEY_SUBSCRIBED_AT = 'techno_newsletter_subscribed_at';
const STORAGE_KEY_READ_IDS = 'techno_read_notifications';
const STORAGE_KEY_LAST_CHECK = 'techno_last_notification_check';

/**
 * Check if the user is currently subscribed to platform updates
 */
export function isUserSubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_SUBSCRIBED) === 'true';
  } catch {
    return false;
  }
}

/**
 * Get stored subscriber email if available
 */
export function getSubscriberEmail(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY_EMAIL) || null;
  } catch {
    return null;
  }
}

/**
 * Get subscriber full info
 */
export function getSubscriptionInfo(): SubscriptionInfo | null {
  if (!isUserSubscribed()) return null;
  const email = getSubscriberEmail() || '';
  const subscribedAt = typeof window !== 'undefined' 
    ? (localStorage.getItem(STORAGE_KEY_SUBSCRIBED_AT) || new Date().toISOString())
    : new Date().toISOString();
  const pushEnabled = typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';

  return { email, subscribedAt, pushEnabled };
}

/**
 * Compile unified platform releases from projects, articles, and videos
 */
export function getAllPlatformReleases(): PlatformNotificationItem[] {
  const items: PlatformNotificationItem[] = [];

  // 1. Projects
  PROJECTS_DATA.forEach(proj => {
    items.push({
      id: `proj-${proj.id || proj.slug}`,
      type: 'project',
      typeLabelAr: 'مشروع جديد',
      typeLabelEn: 'New Project',
      title: proj.title,
      titleEn: proj.title,
      excerpt: proj.excerpt.replace(/\*\*/g, '').slice(0, 110) + '...',
      excerptEn: proj.metaDesc || '',
      url: `/projects/${proj.slug}`,
      image: proj.image,
      date: '2026',
      badge: proj.categoryNameAr || 'مشروع هندسي',
      badgeEn: proj.categoryNameEn || 'Engineering Project'
    });
  });

  // 2. Articles
  blogArticlesData.forEach(art => {
    items.push({
      id: `art-${art.id || art.slug}`,
      type: 'article',
      typeLabelAr: 'مقال جديد',
      typeLabelEn: 'New Article',
      title: art.title,
      titleEn: art.titleEn || art.title,
      excerpt: (art.excerpt || '').slice(0, 110) + '...',
      excerptEn: (art.excerptEn || '').slice(0, 110) + '...',
      url: `/articles/${art.slug}`,
      image: art.image,
      date: art.publishDate || art.publishedAt,
      badge: art.category || 'مقال تقني',
      badgeEn: art.categoryEn || 'Tech Article'
    });
  });

  // 3. Videos
  videosList.forEach(vid => {
    items.push({
      id: `vid-${vid.id}`,
      type: 'video',
      typeLabelAr: 'فيديو هندسي',
      typeLabelEn: 'New Video',
      title: vid.title,
      titleEn: vid.titleEn || vid.title,
      excerpt: vid.description.slice(0, 110) + '...',
      excerptEn: vid.descriptionEn.slice(0, 110) + '...',
      url: `/videos`,
      image: typeof vid.cover === 'string' ? vid.cover : vid.cover?.src,
      date: '2026',
      badge: vid.tag || 'فيديو تطبيقي',
      badgeEn: vid.tagEn || 'Application Video'
    });
  });

  return items;
}

/**
 * Get read notification IDs
 */
export function getReadNotificationIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_READ_IDS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Mark a single notification item as read
 */
export function markNotificationAsRead(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const read = new Set(getReadNotificationIds());
    read.add(id);
    localStorage.setItem(STORAGE_KEY_READ_IDS, JSON.stringify(Array.from(read)));
    window.dispatchEvent(new CustomEvent('techno_notifications_changed'));
  } catch (err) {
    console.error('Error saving read notifications:', err);
  }
}

/**
 * Mark all notifications as read
 */
export function markAllNotificationsAsRead(): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllPlatformReleases().map(i => i.id);
    localStorage.setItem(STORAGE_KEY_READ_IDS, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('techno_notifications_changed'));
  } catch (err) {
    console.error('Error marking all read:', err);
  }
}

/**
 * Get list of unread notification items
 */
export function getUnreadNotifications(): PlatformNotificationItem[] {
  const read = new Set(getReadNotificationIds());
  return getAllPlatformReleases().filter(item => !read.has(item.id));
}

/**
 * Trigger native browser system notification if permitted
 */
export function sendBrowserPushNotification(title: string, options?: NotificationOptions): boolean {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;

  if (Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        icon: '/images/brand/techno-logo.png',
        badge: '/images/brand/techno-logo.png',
        ...options
      });

      notif.onclick = () => {
        window.focus();
        if (options?.data?.url) {
          window.location.href = options.data.url;
        }
        notif.close();
      };
      return true;
    } catch (e) {
      console.warn('Browser notification trigger failed:', e);
      return false;
    }
  }
  return false;
}

/**
 * Register a user subscription with their email
 */
export async function subscribeUser(email: string, isEn = false): Promise<{
  success: boolean;
  message: string;
  pushGranted: boolean;
}> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Client context required', pushGranted: false };
  }

  const cleanEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return {
      success: false,
      message: isEn ? 'Please enter a valid email address.' : 'يرجى إدخال بريد إلكتروني صحيح.',
      pushGranted: false
    };
  }

  // 1. Server: double opt-in. Stores a pending subscription and emails a confirmation
  //    link; the address only receives newsletters after clicking it.
  let apiStatus: 'pending' | 'already' | null = null;
  let mailSent = true;
  try {
    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email: cleanEmail, lang: isEn ? 'en' : 'ar' })
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; status?: 'pending' | 'already'; sent?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      const code = data?.error || 'server_error';
      return {
        success: false,
        message:
          code === 'rate_limited'
            ? isEn ? 'Too many attempts. Please try again later.' : 'محاولات كثيرة، يرجى المحاولة لاحقاً.'
            : code === 'invalid_email'
              ? isEn ? 'Please enter a valid email address.' : 'يرجى إدخال بريد إلكتروني صحيح.'
              : isEn ? 'Subscription failed. Please try again.' : 'تعذّر الاشتراك، يرجى المحاولة مرة أخرى.',
        pushGranted: false
      };
    }
    apiStatus = data.status ?? 'pending';
    mailSent = data.sent !== false;
  } catch {
    return {
      success: false,
      message: isEn ? 'Could not reach the server. Check your connection and try again.' : 'تعذّر الاتصال بالخادم، تحقق من الإنترنت وحاول مجدداً.',
      pushGranted: false
    };
  }

  // 2. Remember locally (drives the footer / bell state on this device).
  try {
    localStorage.setItem(STORAGE_KEY_SUBSCRIBED, 'true');
    localStorage.setItem(STORAGE_KEY_EMAIL, cleanEmail);
    localStorage.setItem(STORAGE_KEY_SUBSCRIBED_AT, new Date().toISOString());
    localStorage.setItem(STORAGE_KEY_LAST_CHECK, Date.now().toString());
  } catch (err) {
    console.error('Error writing subscription to localStorage:', err);
  }

  // 3. Request native browser notification permission
  let pushGranted = false;
  if ('Notification' in window) {
    try {
      let perm = Notification.permission;
      if (perm === 'default') {
        perm = await Notification.requestPermission();
      }
      pushGranted = perm === 'granted';

      if (pushGranted) {
        sendBrowserPushNotification(
          isEn ? 'Techno Enjaz | Notifications Enabled' : 'تكنو إنجاز | تم تفعيل الإشعارات بنجاح',
          {
            body: isEn
              ? `You will now receive instant alerts for all new projects, articles, and videos on the platform.`
              : `ستصلك الآن تنبيهات دورية وفورية بكل مشروع أو مقال أو فيديو جديد يُنشر على المنصة!`,
            data: { url: '/' }
          }
        );
      }
    } catch (e) {
      console.warn('Push permission error:', e);
    }
  }

  // 4. Dispatch global subscription event for navbar bell and toast components
  window.dispatchEvent(
    new CustomEvent('techno_subscription_updated', {
      detail: { email: cleanEmail, pushGranted }
    })
  );

  return {
    success: true,
    message:
      apiStatus === 'already'
        ? isEn
          ? `(${cleanEmail}) is already subscribed to the newsletter.`
          : `البريد (${cleanEmail}) مشترك مسبقاً في النشرة.`
        : mailSent
          ? isEn
            ? `Almost done! We sent a confirmation link to (${cleanEmail}) — click it to start receiving our newsletter.`
            : `خطوة أخيرة! أرسلنا رابط تأكيد إلى (${cleanEmail})، اضغطه لتبدأ النشرة بالوصول إليك.`
          : isEn
            ? `Saved (${cleanEmail}). The confirmation email could not be sent right now; we will retry later.`
            : `تم حفظ (${cleanEmail})، لكن تعذّر إرسال رسالة التأكيد الآن.`,
    pushGranted
  };
}

/**
 * Dispatch an in-app toast notification alert
 */
export function triggerInAppNotification(item: PlatformNotificationItem): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('techno_new_release_alert', {
      detail: item
    })
  );
}
