
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/team/ProfilePage.css';

// Mirrors ProfilePage: top bar, hero card (avatar + info), quote, triplet, cards.
export default function TeamMemberLoading() {
  return (
    <div className="profile-wrapper" aria-busy="true" aria-label="جاري تحميل ملف العضو...">
      <div className="profile-container">
        <header className="profile-top-bar"><SkBox w={190} h={45} r={999} /><SkBox w={140} h={29} r={999} /></header>
        <section className="profile-hero-card">
          <div className="profile-avatar-wrapper"><SkBox w={140} h={140} r="50%" /></div>
          <div className="profile-hero-info">
            <div className="profile-name"><SkText words={3} /></div>
            <SkLine w="45%" />
            <SkLine w="70%" />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>{[0, 1, 2, 3].map((i) => <SkBox key={i} w={40} h={40} r={999} />)}</div>
          </div>
        </section>
        <section className="profile-quote-card"><SkLine w="80%" center /><SkLine w="30%" center /></section>
        <section className="profile-triplet-grid">
          {['vision-card', 'mission-card', 'goals-card'].map((c) => (
            <div key={c} className={`triplet-card ${c}`}><SkBox w={40} h={40} r={12} /><div className="triplet-title"><SkLine w="50%" /></div><SkLines n={2} last="75%" /></div>
          ))}
        </section>
        <div className="profile-grid">
          <article className="profile-card full-width"><SkLine w="25%" /><SkLines n={3} last="60%" /></article>
          <article className="profile-card"><SkLine w="40%" /><SkLines n={5} last="55%" /></article>
          <article className="profile-card"><SkLine w="40%" /><SkLines n={5} last="55%" /></article>
        </div>
      </div>
    </div>
  );
}
