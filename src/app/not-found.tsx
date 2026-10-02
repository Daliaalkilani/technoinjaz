import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, BookOpen, Layers, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة (404)',
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <div 
      className="not-found-wrapper"
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <div 
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '48px 24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        <span 
          style={{
            fontSize: '72px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'block',
            lineHeight: '1',
            marginBottom: '16px'
          }}
        >
          404
        </span>
        <h1 
          style={{
            fontSize: '24px',
            fontWeight: '800',
            color: 'var(--text-main, #ffffff)',
            marginBottom: '12px'
          }}
        >
          الصفحة المطلوبة غير موجودة
        </h1>
        <p 
          style={{
            fontSize: '15px',
            color: 'var(--text-muted, #94a3b8)',
            lineHeight: '1.7',
            marginBottom: '32px'
          }}
        >
          عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله إلى مسار آخر في النظام المحدث.
        </p>
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '999px',
              background: '#0284c7',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <Home size={16} />
            <span>الرئيسية</span>
          </Link>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <Layers size={16} />
            <span>المشاريع</span>
          </Link>
          <Link
            href="/articles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <BookOpen size={16} />
            <span>المقالات</span>
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <PhoneCall size={16} />
            <span>اتصل بنا</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
