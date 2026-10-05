'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './TestimonialsSection.css';

// Real trainees' words about their training with the Techno Enjaz team (published
// with the owner's approval). The team — not one person — is who they refer to: the
// owner corrected an earlier data-entry mistake that named Eng. Abdalgani.
const TESTIMONIALS = [
  {
    name: 'م. زهراء الحمود',
    nameEn: 'Eng. Zahraa Alhamoud',
    tag: 'مطوّرة واجهات',
    tagEn: 'Front-end Developer',
    quote: 'تحت إشراف فريق تكنو إنجاز، استطعت اكتساب مهارات الفرونت إند وتطبيق مفاهيم البرمجة بثقة ودقة. بفضل توجيهاتهم، أصبحت مطوّرة فرونت إند أكثر فعالية.',
    quoteEn: 'Under the Techno Enjaz team’s supervision, I was able to gain front-end skills and apply programming concepts with confidence and precision. Thanks to their guidance, I became a more effective front-end developer.'
  },
  {
    name: 'ريم قصاباشي',
    nameEn: 'Reem Kassabashi',
    tag: 'مهارات حاسوب',
    tagEn: 'Computer Skills',
    quote: 'قدّم لي فريق تكنو إنجاز التدريب الذي أحتاجه لإتقان صناعة العروض التقديمية ومهارات الحاسوب الأساسية. نظرة الفريق للتعلم والتنمية الذاتية شجّعتني على التطور المستمر.',
    quoteEn: 'The Techno Enjaz team gave me the training I needed to master building presentations and core computer skills. The team’s outlook on learning and self-development encouraged me to keep growing.'
  },
  {
    name: 'علي بلال',
    nameEn: 'Ali Bilal',
    tag: 'توجيه وإرشاد',
    tagEn: 'Mentoring',
    quote: 'تعرّفت على فريق تكنو إنجاز في مرحلة كنت فيها على حافة الهاوية، لم أكن أملك أهدافًا واضحة ولا بوصلة توجّهني. لكن بفضل توجيهاتهم ونصائحهم القيّمة، تحوّلت حياتي من العشوائية إلى الابتكار والهدفية.',
    quoteEn: 'I met the Techno Enjaz team at a point when I was on the edge — I had no clear goals and no compass to guide me. Thanks to their guidance and valuable advice, my life turned from randomness to innovation and purpose.'
  },
  {
    name: 'راما حلو',
    nameEn: 'Rama Helou',
    tag: 'تخطيط استراتيجي',
    tagEn: 'Strategic Planning',
    quote: 'عبر دورات التخطيط الاستراتيجي الشخصي التي قدّمها فريق تكنو إنجاز، اكتشفت مدى الحكمة والوعي التي يتمتّع بها الفريق. هذه الخبرة أثّرت بشكل كبير على حياتي المهنية.',
    quoteEn: 'Through the personal strategic planning courses the Techno Enjaz team gave, I discovered how much wisdom and awareness the team has. This experience has greatly influenced my professional life.'
  }
];

export function TestimonialsSection() {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  return (
    <section className="testimonials" dir={isEn ? 'ltr' : 'rtl'} aria-labelledby="testimonials-title">
      <div className="testimonials__head">
        <h2 id="testimonials-title" className="testimonials__title">{isEn ? 'What our trainees say about Techno Enjaz' : 'آراء المتدربين مع فريق تكنو إنجاز'}</h2>
        <p className="testimonials__sub">
          {isEn
            ? 'Real stories from people who trained and grew with the Techno Enjaz team.'
            : 'تجارب حقيقية لأشخاص تدرّبوا وتطوّروا مع فريق تكنو إنجاز.'}
        </p>
      </div>

      <ul className="testimonials__grid">
        {TESTIMONIALS.map((t) => (
          <li key={t.name} className="testimonial-card">
            <Quote className="testimonial-card__icon" size={26} aria-hidden="true" />
            <blockquote className="testimonial-card__quote">
              <p>{isEn ? t.quoteEn : t.quote}</p>
            </blockquote>
            <div className="testimonial-card__who">
              <span className="testimonial-card__avatar" aria-hidden="true">
                {(isEn ? t.nameEn : t.name).replace(/^(م\.|Eng\.)\s*/, '').charAt(0)}
              </span>
              <span className="testimonial-card__meta">
                <cite className="testimonial-card__name">{isEn ? t.nameEn : t.name}</cite>
                <span className="testimonial-card__tag">{isEn ? t.tagEn : t.tag}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TestimonialsSection;
