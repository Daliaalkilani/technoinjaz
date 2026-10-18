import type { Metadata } from 'next';
import { utilityMetadata } from '@/seo/metadata';
import type { Lang } from '@/i18n/locale';

// Titles of the noindex utility pages (auth, account, admin, error views), per language.
const TITLES = {
  login: { ar: ['تسجيل الدخول'], en: ['Sign In'] },
  register: { ar: ['إنشاء حساب جديد'], en: ['Create an Account'] },
  account: { ar: ['حسابي والملف الشخصي'], en: ['My Account & Profile'] },
  resetPassword: { ar: ['إعادة تعيين كلمة المرور'], en: ['Reset Password'] },
  newsletter: { ar: ['نشرة تكنو إنجاز'], en: ['Techno Enjaz Newsletter'] },
  adminMessages: { ar: ['رسائل التواصل'], en: ['Contact Messages'] },
  adminSubscribers: { ar: ['النشرة البريدية'], en: ['Newsletter Subscribers'] },
  accessDenied: {
    ar: ['تم رفض الوصول (403)', 'هذا المورد الهندسي محمي ويتطلب صلاحيات وصول خاصة.'],
    en: ['Access Denied (403)', 'This engineering resource is protected and requires special access rights.']
  },
  connectionError: {
    ar: ['خطأ في الاتصال بالشبكة', 'تعذر الاتصال بخوادم تكنو إنجاز السحابية. يرجى التحقق من اتصالك بالإنترنت.'],
    en: ['Network Connection Error', 'Could not reach the Techno Enjaz cloud servers. Please check your internet connection.']
  },
  offline: {
    ar: ['غير متصل بالإنترنت', 'أنت تتصفح بدون اتصال بالإنترنت حالياً.'],
    en: ['You Are Offline', 'You are currently browsing without an internet connection.']
  },
  serverError: {
    ar: ['خطأ في الخادم (500)', 'حدث خطأ غير متوقع أثناء معالجة الطلب في الخادم.'],
    en: ['Server Error (500)', 'An unexpected error occurred while the server was processing the request.']
  },
  notFound: { ar: ['الصفحة غير موجودة (404)'], en: ['Page Not Found (404)'] }
} as const;

export type UtilityPage = keyof typeof TITLES;

export function utilityPageMetadata(lang: Lang, page: UtilityPage): Metadata {
  const [title, description] = TITLES[page][lang] as readonly string[];
  return utilityMetadata(title, description);
}
