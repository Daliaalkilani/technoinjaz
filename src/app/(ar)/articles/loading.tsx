
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/articles/ArticlesListing.css';
import { StickyFilterBarSkeleton } from '@/components/ui/StickyFilterBarSkeleton';

// Mirrors ArticlesListing: header, search, filter rows and the real card grid.
export default function ArticlesLoading() {
  return (
    <div className="tab-page-container tab-page-articles" style={{ padding: 0, maxWidth: '100%' }} aria-busy="true" aria-label="جاري تحميل المقالات...">
      <div className="office-blog-section">
        <div className="office-blog-header">
          <div className="blog-main-title"><SkText words={4} /></div>
          <p className="blog-main-desc"><SkText words={16} /></p>
        </div>
        {/* ≤1024px: compact sticky filter bar (desktop rows below are hidden there) */}
        <StickyFilterBarSkeleton chipWidths={[72, 150, 130, 130, 140, 120]} withFilter />
        <div className="blog-search-bar-wrap">
          <div className="blog-search-inner-box" style={{ position: 'relative', minHeight: 47 }}><SkFill /></div>
        </div>
        <div className="blog-filters-capsule-row">
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', width: '100%' }}>
            <SkBox w={90} h={36} r={999} /><SkBox w={116} h={36} r={999} />
          </div>
          <div className="blog-category-chips-list">
            {[96, 120, 104, 130, 92, 112].map((w, i) => <SkBox key={i} w={w} h={34} r={999} />)}
          </div>
        </div>
        <div className="blog-cards-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="blog-modern-card">
              <div className="card-media-banner" style={{ position: 'relative', aspectRatio: '449 / 252' }}><SkFill /></div>
              <div className="card-body-content">
                <div className="card-meta-category-row"><SkBox w={120} h={25} r={999} /><SkBox w={90} h={14} /></div>
                <div className="card-main-title"><SkText words={9} /></div>
                <p className="card-main-excerpt"><SkLines n={2} last="80%" /></p>
                <div className="card-footer-capsule-row"><SkBox w="70%" h={32} r={999} /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
