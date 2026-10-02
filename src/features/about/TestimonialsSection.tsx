'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './TestimonialsSection.css';

// Real trainees' words about their training with the Techno Enjaz team, led by
// Eng. Abdulghani (published with the owner's approval).
// Only spelling / punctuation were touched; the content is theirs.
const TESTIMONIALS = [
  {
    name: 'م. زهراء الحمود',
    nameEn: 'Eng. Zahraa Alhamoud',
    tag: 'مطوّرة واجهات',
    tagEn: 'Front-end Developer',
    quote: 'تحت إشراف المهندس عبد الغني، استطعت اكتساب مهارات الفرونت إند وتطبيق مفاهيم البرمجة بثقة ودقة. بفضل توجيهاته، أصبحت مطوّرة فرونت إند أكثر فعالية.',
    quoteEn: 'Under Eng. Abdulghani’s supervision, I was able to gain front-end skills and apply programming concepts with confidence and precision. Thanks to his guidance, I became a more effective front-end developer.'
  },
  {
    name: 'ريم قصاباشي',
    nameEn: 'Reem Kassabashi',
    tag: 'مهارات حاسوب',
    tagEn: 'Computer Skills',
    quote: 'قدّم لي المهندس عبد الغني التدريب الذي أحتاجه لإتقان صناعة العروض التقديمية ومهارات الحاسوب الأساسية. نظرة المهندس الحمدي للتعلم والتنمية الذاتية شجّعتني على التطور المستمر.',
    quoteEn: 'Eng. Abdulghani gave me the training I needed to master building presentations and core computer skills. His outlook on learning and self-development encouraged me to keep growing.'
  },
  {
    name: 'علي بلال',
    nameEn: 'Ali Bilal',
    tag: 'توجيه وإرشاد',
    tagEn: 'Mentoring',
    quote: 'قابلت المهندس عبد الغني في مرحلة كنت فيها على حافة الهاوية، لم أكن أملك أهدافًا واضحة ولا بوصلة توجّهني. لكن بفضل توجيهاته ونصائحه القيّمة، تحوّلت حياتي من العشوائية إلى الابتكار والهدفية.',
    quoteEn: 'I met Eng. Abdulghani at a point when I was on the edge — I had no clear goals and no compass to guide me. Thanks to his guidance and valuable advice, my life turned from randomness to innovation and purpose.'
  },
  {
    name: 'راما حلو',
    nameEn: 'Rama Helou',
    tag: 'تخطيط استراتيجي',
    tagEn: 'Strategic Planning',
    quote: 'عبر دورات التخطيط الاستراتيجي الشخصي التي قدّمها المهندس عبد الغني، اكتشفت مدى الحكمة والوعي التي يتمتّع بها. هذه الخبرة أثّرت بشكل كبير على حياتي المهنية.',
    quoteEn: 'Through the personal strategic planning courses Eng. Abdulghani gave, I discovered how much wisdom and awareness he has. This experience has greatly influenced my professional life.'
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
