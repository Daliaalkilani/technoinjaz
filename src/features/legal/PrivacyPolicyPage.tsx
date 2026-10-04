'use client';

import Link from 'next/link';
import { ShieldCheck, Mail } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { ORG } from '@/config/site';
import './PrivacyPolicyPage.css';

interface PolicySection {
  id: string;
  titleAr: string;
  titleEn: string;
  ar: string[];
  en: string[];
}

const LAST_UPDATED = { ar: '4 تشرين الأول 2026', en: 'October 4, 2026', iso: '2026-10-04' };

const SECTIONS: PolicySection[] = [
  {
    id: 'scope',
    titleAr: 'نطاق هذه السياسة',
    titleEn: 'Scope of this policy',
    ar: [
      'توضّح هذه السياسة كيف يجمع موقع تكنو إنجاز (technoenjaz.com) البيانات الشخصية ويستخدمها ويحميها عند تصفحك للموقع أو تواصلك معنا أو اشتراكك في نشرتنا البريدية.',
      'باستخدامك للموقع فإنك تقرّ بالممارسات الموضّحة هنا. نلتزم بجمع الحد الأدنى من البيانات اللازمة لتقديم خدماتنا فقط.'
    ],
    en: [
      'This policy explains how Techno Enjaz (technoenjaz.com) collects, uses and protects personal data when you browse the site, contact us, or subscribe to our newsletter.',
      'By using the site you acknowledge the practices described here. We are committed to collecting only the minimum data needed to provide our services.'
    ]
  },
  {
    id: 'contact-form',
    titleAr: 'بيانات نموذج التواصل',
    titleEn: 'Contact form data',
    ar: [
      'عند إرسال نموذج التواصل نجمع البيانات التي تُدخلها بنفسك: الاسم، والبريد الإلكتروني، ورقم الهاتف، ونص الرسالة، إضافةً إلى الحقول الاختيارية مثل التخصص أو الجامعة.',
      'لحماية النموذج من الرسائل المزعجة وإساءة الاستخدام نسجّل أيضاً عنوان IP ونوع المتصفح ولغة الواجهة مع الرسالة.',
      'تُحفظ الرسائل في قاعدة بيانات مؤمّنة على البنية التحتية لـ Cloudflare، ويُرسَل إشعار بمحتواها إلى بريد الفريق الرسمي وقناة الإشعارات الداخلية الخاصة به كي نتمكن من الرد عليك بسرعة. لا يطّلع عليها إلا فريق تكنو إنجاز المعني بالرد.'
    ],
    en: [
      'When you submit the contact form we collect the data you enter yourself: your name, email address, phone number and message, plus optional fields such as specialization or university.',
      'To protect the form against spam and abuse, we also record your IP address, browser user agent and interface language alongside the message.',
      'Messages are stored in a secured database on Cloudflare infrastructure, and a notification with their content is sent to the team’s official mailbox and internal notification channel so we can reply quickly. Only the Techno Enjaz team members handling your request can access them.'
    ]
  },
  {
    id: 'newsletter',
    titleAr: 'النشرة البريدية والإشعارات',
    titleEn: 'Newsletter & notifications',
    ar: [
      'عند الاشتراك في النشرة البريدية نحفظ عنوان بريدك الإلكتروني فقط، ونستخدمه حصراً لإبلاغك بالمقالات والمشاريع الجديدة.',
      'إذا سمحت بإشعارات المتصفح فإن هذا الإذن يُدار من متصفحك نفسه ويمكنك سحبه في أي وقت من إعداداته. ويمكنك إلغاء الاشتراك البريدي بمراسلتنا على البريد أدناه.'
    ],
    en: [
      'When you subscribe to the newsletter we store your email address only, and use it solely to notify you about new articles and projects.',
      'If you allow browser notifications, that permission is managed by your browser and can be revoked at any time from its settings. You can unsubscribe from emails by writing to the address below.'
    ]
  },
  {
    id: 'cookies',
    titleAr: 'ملفات تعريف الارتباط والتخزين المحلي',
    titleEn: 'Cookies & local storage',
    ar: [
      'يستخدم الموقع التخزين المحلي في متصفحك (localStorage) لحفظ تفضيلاتك: السمة الداكنة أو الفاتحة، ولغة الواجهة، والعناصر المحفوظة، والإعجابات، وحالة الاشتراك، وحالة تسجيل الدخول.',
      'تبقى هذه البيانات على جهازك ولا تُرسَل إلى خوادمنا، ويمكنك حذفها في أي وقت بمسح بيانات الموقع من إعدادات المتصفح. لا نستخدم ملفات تعريف ارتباط إعلانية أو تتبعية.'
    ],
    en: [
      'The site uses your browser’s local storage (localStorage) to remember your preferences: dark or light theme, interface language, saved items, likes, subscription status and sign-in state.',
      'This data stays on your device and is not sent to our servers; you can delete it at any time by clearing site data in your browser settings. We do not use advertising or tracking cookies.'
    ]
  },
  {
    id: 'no-tracking',
    titleAr: 'لا تتبع ولا بيع للبيانات',
    titleEn: 'No tracking, no selling',
    ar: [
      'لا نستخدم أدوات تحليلات أو إعلانات تابعة لجهات خارجية لتتبّعك عبر المواقع، ولا نبيع بياناتك الشخصية أو نؤجّرها أو نشاركها لأغراض تسويقية مع أي طرف.',
      'تعمل بعض الخدمات التقنية اللازمة لتشغيل الموقع نيابةً عنا، مثل الاستضافة وتوصيل المحتوى عبر Cloudflare. كما تُعرض بعض مقاطع الفيديو من منصات خارجية (مثل يوتيوب) وتخضع عند تشغيلها لسياسات الخصوصية الخاصة بتلك المنصات.'
    ],
    en: [
      'We do not use third-party analytics or advertising tools to track you across websites, and we never sell, rent or share your personal data with anyone for marketing purposes.',
      'Some technical services required to run the site act on our behalf, such as hosting and content delivery via Cloudflare. Some videos are embedded from external platforms (such as YouTube) and, when played, are subject to those platforms’ own privacy policies.'
    ]
  },
  {
    id: 'security',
    titleAr: 'أمن البيانات ومدة الاحتفاظ',
    titleEn: 'Security & retention',
    ar: [
      'تُنقل جميع البيانات عبر اتصال مشفّر (HTTPS)، ويقتصر الوصول إلى قواعد البيانات على فريق تكنو إنجاز المخوَّل.',
      'نحتفظ برسائل التواصل وعناوين الاشتراك طالما كانت لازمة للرد على طلبك أو لإرسال النشرة، ونحذفها عند طلبك.'
    ],
    en: [
      'All data is transmitted over an encrypted connection (HTTPS), and access to our databases is restricted to authorized Techno Enjaz team members.',
      'We keep contact messages and subscription addresses for as long as they are needed to answer your request or send the newsletter, and delete them on request.'
    ]
  },
  {
    id: 'rights',
    titleAr: 'حقوقك',
    titleEn: 'Your rights',
    ar: [
      'يحق لك طلب الاطلاع على البيانات التي نحتفظ بها عنك، أو تصحيحها، أو حذفها، أو إلغاء اشتراكك في النشرة البريدية في أي وقت، دون أي تكلفة.'
    ],
    en: [
      'You may request access to the data we hold about you, ask us to correct or delete it, or unsubscribe from the newsletter at any time, free of charge.'
    ]
  },
  {
    id: 'changes',
    titleAr: 'تحديثات السياسة',
    titleEn: 'Policy updates',
    ar: [
      'قد نحدّث هذه السياسة عند تغيّر خدماتنا أو المتطلبات القانونية، وسنعرض تاريخ آخر تحديث أعلى الصفحة دائماً.'
    ],
    en: [
      'We may update this policy when our services or legal requirements change, and the date of the latest update will always be shown at the top of this page.'
    ]
  }
];

export default function PrivacyPolicyPage() {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  return (
    <section className="privacy-page-container" dir={isEn ? 'ltr' : 'rtl'}>
      <header className="privacy-header">
        <span className="privacy-badge">
          <ShieldCheck size={15} />
          <span>{isEn ? 'Your data, protected' : 'بياناتك في أمان'}</span>
        </span>
        <h1 className="privacy-title">{isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}</h1>
        <p className="privacy-lead">
          {isEn
            ? 'A clear account of what we collect, why we collect it, and how you stay in control of your information.'
            : 'شرح واضح لما نجمعه من بيانات، ولماذا نجمعه، وكيف تبقى متحكماً بمعلوماتك.'}
        </p>
        <p className="privacy-updated">
          {isEn ? 'Last updated: ' : 'آخر تحديث: '}
          <time dateTime={LAST_UPDATED.iso}>{isEn ? LAST_UPDATED.en : LAST_UPDATED.ar}</time>
        </p>
      </header>

      <nav className="privacy-toc" aria-label={isEn ? 'Policy sections' : 'أقسام السياسة'}>
        <ol>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{isEn ? s.titleEn : s.titleAr}</a>
            </li>
          ))}
          <li>
            <a href="#contact">{isEn ? 'Contact us' : 'تواصل معنا'}</a>
          </li>
        </ol>
      </nav>

      <div className="privacy-body">
        {SECTIONS.map((s, i) => (
          <section key={s.id} id={s.id} className="privacy-section">
            <h2>
              <span className="privacy-section-num">{i + 1}</span>
              {isEn ? s.titleEn : s.titleAr}
            </h2>
            {(isEn ? s.en : s.ar).map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}

        <section id="contact" className="privacy-section privacy-contact">
          <h2>
            <span className="privacy-section-num">{SECTIONS.length + 1}</span>
            {isEn ? 'Contact us' : 'تواصل معنا'}
          </h2>
          <p>
            {isEn
              ? 'For any question about this policy or to exercise your rights, email us and we will respond within a few business days:'
              : 'لأي استفسار حول هذه السياسة أو لممارسة حقوقك، راسلنا وسنرد عليك خلال أيام عمل قليلة:'}
          </p>
          <div className="privacy-contact-actions">
            <a href={`mailto:${ORG.email}`} className="privacy-email-link" dir="ltr">
              <Mail size={16} />
              <span>{ORG.email}</span>
            </a>
            <Link href="/contact" className="privacy-secondary-link">
              {isEn ? 'Or use the contact page' : 'أو استخدم صفحة التواصل'}
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
