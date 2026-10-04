'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SocialButtons from '@/components/ui/SocialButtons';
import { ABDULGHANI_SOCIALS } from '@/config/site';
import './AuthorBioCard.css';

const { whatsapp: _whatsapp, ...AUTHOR_SOCIALS } = ABDULGHANI_SOCIALS;

/** "About the author" box rendered under every article body (E-E-A-T). */
export default function AuthorBioCard({ isEn }: { isEn: boolean }) {
  const name = isEn ? 'Eng. Abdul Ghani Al-Hamdi' : 'م. عبد الغني الحمدي';
  return (
    <aside className="author-bio-card" aria-label={isEn ? 'About the author' : 'عن الكاتب'}>
      <span className="author-bio-kicker">{isEn ? 'About the author' : 'عن الكاتب'}</span>
      <div className="author-bio-main">
        <Link href="/about#team-showcase" rel="author" className="author-bio-photo-link" tabIndex={-1} aria-hidden="true">
          <img
            src="/images/team/abdulghani.320.avif"
            alt=""
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="author-bio-photo"
          />
        </Link>
        <div className="author-bio-text">
          <Link href="/about#team-showcase" rel="author" className="author-bio-name">
            {name}
          </Link>
          <span className="author-bio-role">
            {isEn ? 'Founder & Lead Engineer at Techno Enjaz' : 'المؤسس والمهندس الرئيسي في تكنو إنجاز'}
          </span>
          <p className="author-bio-desc">
            {isEn
              ? 'Software and AI engineer who leads the design and delivery of Techno Enjaz systems — from computer-vision and recommendation models to IoT and cloud platforms — and writes from hands-on experience building these projects for real clients.'
              : 'مهندس برمجيات وذكاء اصطناعي يقود تصميم وتنفيذ أنظمة تكنو إنجاز، من نماذج الرؤية الحاسوبية والتوصية إلى منصات إنترنت الأشياء والحوسبة السحابية، ويكتب من خبرة عملية في بناء هذه المشاريع لعملاء حقيقيين.'}
          </p>
          <div className="author-bio-footer">
            <SocialButtons socials={AUTHOR_SOCIALS} />
            <Link href="/about#team-showcase" rel="author" className="author-bio-more">
              <span>{isEn ? 'Meet the team' : 'تعرّف على الفريق'}</span>
              {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
