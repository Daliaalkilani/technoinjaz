'use client';
import { formsConfigured, sendForm } from '@/lib/forms';

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

  // 1. Save locally
  try {
    localStorage.setItem(STORAGE_KEY_SUBSCRIBED, 'true');
    localStorage.setItem(STORAGE_KEY_EMAIL, cleanEmail);
    localStorage.setItem(STORAGE_KEY_SUBSCRIBED_AT, new Date().toISOString());
    localStorage.setItem(STORAGE_KEY_LAST_CHECK, Date.now().toString());

    // Also track in list of subscribers
    const rawList = localStorage.getItem('techno_subscribers_list');
    const list = rawList ? JSON.parse(rawList) : [];
    if (!list.includes(cleanEmail)) {
      list.push(cleanEmail);
      localStorage.setItem('techno_subscribers_list', JSON.stringify(list));
    }
  } catch (err) {
    console.error('Error writing subscription to localStorage:', err);
  }

  // 2. Deliver the subscription to the team inbox (Web3Forms) so it is really kept;
  //    the local API ping stays as a fallback when the service is not configured.
  if (formsConfigured()) {
    void sendForm('اشتراك جديد في نشرة تكنو إنجاز', {
      'البريد الإلكتروني': cleanEmail,
      'اللغة': isEn ? 'English' : 'العربية',
      'التاريخ': new Date().toISOString()
    }, cleanEmail);
  } else try {
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    }).catch(e => console.warn('API subscription ping:', e));
  } catch (err) {
    // Non-blocking
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
    message: isEn
      ? `Subscription activated for (${cleanEmail})! You will always receive notifications for any new releases.`
      : `تم اشتراكك وتفعيل التنبيهات بنجاح للبريد (${cleanEmail})! ستصلك إشعارات فورية بكل جديد يُنشر على المنصة.`,
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
