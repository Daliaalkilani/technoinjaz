'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Film, 
  FileText, 
  Cpu 
} from 'lucide-react';
import { 
  isUserSubscribed, 
  getUnreadNotifications, 
  markNotificationAsRead, 
  type PlatformNotificationItem 
} from '@/lib/notifications';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './NotificationToaster.css';

interface ToastData {
  id: string;
  type: 'release' | 'welcome';
  title: string;
  subtitle?: string;
  url?: string;
  badge?: string;
  contentType?: 'project' | 'article' | 'video';
}

export default function NotificationToaster() {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const closeToast = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveToast(null);
      setIsClosing(false);
    }, 300);
  };

  const showToast = (data: ToastData, duration = 8000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsClosing(false);
    setActiveToast(data);

    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        closeToast();
      }, duration);
    }
  };

  useEffect(() => {
    // 1. Listen for new release alerts triggered anywhere
    const handleNewRelease = (e: CustomEvent<PlatformNotificationItem>) => {
      const item = e.detail;
      if (!item) return;
      showToast({
        id: item.id,
        type: 'release',
        title: isEn ? item.titleEn : item.title,
        subtitle: isEn ? item.excerptEn : item.excerpt,
        url: item.url,
        badge: isEn ? item.typeLabelEn : item.typeLabelAr,
        contentType: item.type
      });
    };

    // 2. Listen for subscription updates
    const handleSubUpdated = (e: CustomEvent<{ email: string; pushGranted: boolean }>) => {
      const email = e.detail?.email;
      showToast({
        id: 'welcome-sub',
        type: 'welcome',
        title: isEn ? 'Subscription Active!' : 'تم تفعيل الاشتراك والإشعارات بنجاح!',
        subtitle: isEn 
          ? `You will now receive alerts for all new platform releases.` 
          : `تم تفعيل التنبيهات للبريد (${email}). ستصلك إشعارات فورية بكل جديد يُنشر على المنصة.`,
        badge: isEn ? 'Notifications Active 🔔' : 'الإشعارات مفعلة 🔔'
      }, 7000);
    };

    window.addEventListener('techno_new_release_alert' as any, handleNewRelease);
    window.addEventListener('techno_subscription_updated' as any, handleSubUpdated);

    // 3. On load, if user is already subscribed, check if there's an unread release to show
    const checkTimer = setTimeout(() => {
      if (isUserSubscribed()) {
        const unread = getUnreadNotifications();
        if (unread.length > 0) {
          const latest = unread[0];
          showToast({
            id: latest.id,
            type: 'release',
            title: isEn ? latest.titleEn : latest.title,
            subtitle: isEn ? latest.excerptEn : latest.excerpt,
            url: latest.url,
            badge: isEn ? latest.typeLabelEn : latest.typeLabelAr,
            contentType: latest.type
          }, 9000);
        }
      }
    }, 2800);

    return () => {
      window.removeEventListener('techno_new_release_alert' as any, handleNewRelease);
      window.removeEventListener('techno_subscription_updated' as any, handleSubUpdated);
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(checkTimer);
    };
  }, [isEn]);

  if (!activeToast) return null;

  const handleAction = () => {
    if (activeToast.id) {
      markNotificationAsRead(activeToast.id);
    }
    if (activeToast.url) {
      router.push(activeToast.url);
    }
    closeToast();
  };

  const getIcon = () => {
    if (activeToast.type === 'welcome') {
      return <CheckCircle2 size={20} className="notif-icon-success" />;
    }
    if (activeToast.contentType === 'video') {
      return <Film size={18} className="notif-icon-video" />;
    }
    if (activeToast.contentType === 'article') {
      return <FileText size={18} className="notif-icon-article" />;
    }
    return <Cpu size={18} className="notif-icon-project" />;
  };

  return (
    <aside 
      className={`notification-toast-container ${isClosing ? 'is-closing' : ''}`}
      dir={isEn ? 'ltr' : 'rtl'}
      role="alert"
      aria-live="polite"
      onMouseEnter={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        timerRef.current = setTimeout(closeToast, 4000);
      }}
    >
      <div className="notification-toast-card">
        {/* Glow ambient highlight */}
        <div className="notif-toast-glow" />

        {/* Header line with badge and close button */}
        <div className="notif-toast-top">
          <div className="notif-toast-badge-wrap">
            <span className="notif-toast-icon-wrap">
              {getIcon()}
            </span>
            <span className="notif-toast-badge">
              {activeToast.badge || (isEn ? 'New Release' : 'جديد المنصة')}
            </span>
          </div>

          <button 
            type="button" 
            className="notif-toast-close-btn"
            onClick={closeToast}
            aria-label={isEn ? "Close" : "إغلاق"}
          >
            <X size={15} />
          </button>
        </div>

        {/* Body content */}
        <div className="notif-toast-body">
          <h4 className="notif-toast-title">
            {activeToast.title}
          </h4>
          {activeToast.subtitle && (
            <p className="notif-toast-desc">
              {activeToast.subtitle}
            </p>
          )}
        </div>

        {/* Footer actions */}
        {activeToast.url && (
          <div className="notif-toast-actions">
            <button
              type="button"
              className="notif-toast-action-btn"
              onClick={handleAction}
            >
              <span>{isEn ? 'Explore Now' : 'استكشف الآن'}</span>
              <ExternalLink size={13} />
            </button>
            <button
              type="button"
              className="notif-toast-dismiss-btn"
              onClick={() => {
                if (activeToast.id) markNotificationAsRead(activeToast.id);
                closeToast();
              }}
            >
              {isEn ? 'Later' : 'لاحقاً'}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
