import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, BookOpen, Layers, PhoneCall } from 'lucide-react';
import ErrorScene from '@/components/errors/ErrorScene';
import '@/components/errors/ErrorPages.css';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة (404)',
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <div className="te-error-wrapper">
      <div className="te-error-ambient te-error-ambient--connection" />
      <div className="te-error-grid" />

      <div className="te-error-card has-scene" dir="rtl">
        <ErrorScene variant="notfound" label="مركبة تكنو إنجاز خرجت عن مدارها حول كوكب الصفر في 404" />


        <h1 className="te-error-title">يبدو أن هذه الصفحة خرجت عن المدار</h1>

        <p className="te-error-desc">
          الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله إلى مسار آخر. لا تقلق، يمكنك العودة إلى المسار الصحيح من هنا.
        </p>

        <div className="te-error-actions">
          <Link href="/" className="te-error-btn te-error-btn-primary">
            <Home size={16} />
            <span>الرئيسية</span>
          </Link>
          <Link href="/projects" className="te-error-btn te-error-btn-secondary">
            <Layers size={16} />
            <span>المشاريع</span>
          </Link>
          <Link href="/articles" className="te-error-btn te-error-btn-secondary">
            <BookOpen size={16} />
            <span>المقالات</span>
          </Link>
          <Link href="/contact" className="te-error-btn te-error-btn-secondary">
            <PhoneCall size={16} />
            <span>تواصل معنا</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
