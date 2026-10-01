'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Sparkles, 
  Cpu, 
  FileText, 
  Film, 
  ExternalLink,
  Send,
  X
} from 'lucide-react';
import { 
  isUserSubscribed, 
  getSubscriberEmail, 
  getAllPlatformReleases, 
  getUnreadNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  sendBrowserPushNotification,
  triggerInAppNotification,
  type PlatformNotificationItem 
} from '@/lib/notifications';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './NotificationBell.css';

export default function NotificationBell() {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const [isOpen, setIsOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
  const [unreadItems, setUnreadItems] = useState<PlatformNotificationItem[]>([]);
  const [allItems, setAllItems] = useState<PlatformNotificationItem[]>([]);
  const [testSent, setTestSent] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state
  const syncNotifications = () => {
    const isSub = isUserSubscribed();
    setSubscribed(isSub);
    setSubscriberEmail(getSubscriberEmail());
    setAllItems(getAllPlatformReleases());
    setUnreadItems(getUnreadNotifications());
  };

  useEffect(() => {
    syncNotifications();

    const handleSync = () => syncNotifications();
    window.addEventListener('techno_subscription_updated', handleSync);
    window.addEventListener('techno_notifications_changed', handleSync);
    window.addEventListener('storage', handleSync);

    // Close on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('techno_subscription_updated', handleSync);
      window.removeEventListener('techno_notifications_changed', handleSync);
      window.removeEventListener('storage', handleSync);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: PlatformNotificationItem) => {
    markNotificationAsRead(item.id);
    setIsOpen(false);
    router.push(item.url);
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
    syncNotifications();
  };

  const handleTestNotification = () => {
    const latest = allItems[0];
    if (!latest) return;

    // 1. Browser Push
    sendBrowserPushNotification(
      isEn ? `Techno Enjaz: ${latest.titleEn}` : `جديد تكنو إنجاز: ${latest.title}`,
      {
        body: isEn ? latest.excerptEn : latest.excerpt,
        data: { url: latest.url }
      }
    );

    // 2. In-App Toast
    triggerInAppNotification(latest);

    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const unreadCount = unreadItems.length;

  return (
    <div ref={containerRef} className="navbar-notif-bell-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        className={`navbar-notif-bell-btn ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isEn ? "Notifications & Updates" : "الإشعارات والتحديثات"}
        aria-label={isEn ? "Notifications & Updates" : "الإشعارات والتحديثات"}
        aria-expanded={isOpen}
      >
        <Bell size={18} className="notif-bell-icon" />
        {unreadCount > 0 && (
          <span className="notif-unread-badge" aria-label={`${unreadCount} unread`}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="notif-dropdown-panel animate-notif-fade">
          {/* Header */}
          <div className="notif-dropdown-header">
            <div className="notif-header-title-wrap">
              <span className="notif-header-title">
                {isEn ? "Platform Notifications" : "إشعارات المنصة"}
              </span>
              {unreadCount > 0 && (
                <span className="notif-header-pill">
                  {unreadCount} {isEn ? "new" : "جديد"}
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                className="notif-mark-read-btn"
                onClick={handleMarkAllRead}
                title={isEn ? "Mark all as read" : "تحديد الكل كمقروء"}
              >
                <CheckCheck size={14} />
                <span>{isEn ? "Mark read" : "قراءة الكل"}</span>
              </button>
            )}
          </div>

          {/* Subscription Status Banner */}
          <div className={`notif-sub-banner ${subscribed ? 'is-subscribed' : 'is-unsubscribed'}`}>
            {subscribed ? (
              <div className="notif-sub-banner-content">
                <span className="notif-status-dot active" />
                <div className="notif-sub-text">
                  <strong>{isEn ? "Notifications Active" : "الإشعارات مفعلة"}</strong>
                  <span className="notif-sub-email">{subscriberEmail}</span>
                </div>
              </div>
            ) : (
              <div className="notif-sub-banner-content">
                <span className="notif-status-dot inactive" />
                <div className="notif-sub-text">
                  <span>{isEn ? "Subscribe below to get instant alerts for all new releases!" : "اشترك بالأسفل لتصلك إشعارات فورية بكل جديد!"}</span>
                  <a 
                    href="#navbar" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const el = document.querySelector('.footer-newsletter-wrap');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        router.push('/#footer');
                      }
                    }}
                    className="notif-go-sub-link"
                  >
                    {isEn ? "Subscribe Now →" : "اشترك الآن ←"}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Releases List */}
          <div className="notif-items-list custom-scrollbar">
            {allItems.slice(0, 7).map((item) => {
              const isUnread = unreadItems.some(u => u.id === item.id);
              return (
                <div
                  key={item.id}
                  className={`notif-item-row ${isUnread ? 'is-unread' : ''}`}
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleItemClick(item);
                    }
                  }}
                >
                  <div className="notif-item-thumbnail">
                    {item.image ? (
                      <img src={item.image} alt={item.title} />
                    ) : item.type === 'video' ? (
                      <Film size={20} />
                    ) : item.type === 'article' ? (
                      <FileText size={20} />
                    ) : (
                      <Cpu size={20} />
                    )}
                  </div>

                  <div className="notif-item-info">
                    <div className="notif-item-badge-line">
                      <span className={`notif-type-tag ${item.type}`}>
                        {isEn ? item.typeLabelEn : item.typeLabelAr}
                      </span>
                      <span className="notif-category-name">
                        {isEn ? item.badgeEn : item.badge}
                      </span>
                      {isUnread && <span className="notif-unread-dot" />}
                    </div>

                    <h5 className="notif-item-title">
                      {isEn ? item.titleEn : item.title}
                    </h5>

                    <p className="notif-item-desc">
                      {isEn ? item.excerptEn : item.excerpt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dropdown Footer Actions */}
          <div className="notif-dropdown-footer">
            <button
              type="button"
              className="notif-test-btn"
              onClick={handleTestNotification}
              title={isEn ? "Test browser and in-app notification" : "اختبار إرسال إشعار فوري"}
            >
              <Send size={13} />
              <span>
                {testSent 
                  ? (isEn ? "Notification Sent! 🔔" : "تم إرسال التنبيه! 🔔") 
                  : (isEn ? "Test Notification" : "تجربة إشعار فوري")}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
