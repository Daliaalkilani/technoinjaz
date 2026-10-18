'use client';

import Link from '@/i18n/navigation';
import { Home, BookOpen, Layers, PhoneCall } from 'lucide-react';
import ErrorScene from '@/components/errors/ErrorScene';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import '@/components/errors/ErrorPages.css';

/** 404 body. Client component so it follows the AR/EN toggle like the other error views. */
export default function NotFoundView() {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--connection" />
      <div className="te-error-grid" />

      <div className="te-error-card has-scene" dir={isEn ? 'ltr' : 'rtl'}>
        <ErrorScene
          variant="notfound"
          label={isEn ? 'The Techno Enjaz ship drifted out of orbit around planet zero in 404' : 'مركبة تكنو إنجاز خرجت عن مدارها حول كوكب الصفر في 404'}
        />

        <h1 className="te-error-title">{isEn ? 'This page seems to have left orbit' : 'يبدو أن هذه الصفحة خرجت عن المدار'}</h1>

        <p className="te-error-desc">
          {isEn
            ? "The link you are trying to reach does not exist or has moved. Don't worry — you can get back on course from here."
            : 'الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله إلى مسار آخر. لا تقلق، يمكنك العودة إلى المسار الصحيح من هنا.'}
        </p>

        <div className="te-error-actions">
          <Link href="/" className="te-error-btn te-error-btn-primary">
            <Home size={16} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </Link>
          <Link href="/projects" className="te-error-btn te-error-btn-secondary">
            <Layers size={16} />
            <span>{isEn ? 'Projects' : 'المشاريع'}</span>
          </Link>
          <Link href="/articles" className="te-error-btn te-error-btn-secondary">
            <BookOpen size={16} />
            <span>{isEn ? 'Articles' : 'المقالات'}</span>
          </Link>
          <Link href="/contact" className="te-error-btn te-error-btn-secondary">
            <PhoneCall size={16} />
            <span>{isEn ? 'Contact us' : 'تواصل معنا'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
