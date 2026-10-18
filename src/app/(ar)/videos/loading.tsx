
import '@/components/ui/Skeleton.css';
import { SkFill, SkText } from '@/components/ui/Sk';
import '@/features/videos/ProjectReelsFeed.css';

// Mirrors /videos: the immersive reels feed (one full-height reel + side actions).
export default function VideosLoading() {
  return (
    <div className="tab-page-container tab-page-videos" style={{ padding: 0, maxWidth: '100%' }} aria-busy="true" aria-label="جاري تحميل الفيديوهات...">
      <section className="reels-shell reels-shell--skeleton">
        <ol className="reels-feed">
          <li className="reel is-active">
            <div className="reel-stage">
              <div className="reel-media" style={{ background: 'transparent' }}><SkFill /></div>
              <div className="reel-info">
                <div className="reel-title"><SkText words={5} /></div>
                <p className="reel-caption"><SkText words={14} /></p>
              </div>
            </div>
            <div className="reel-actions">
              {[0, 1, 2, 3].map(i => (
                <span key={i} className="reel-action">
                  <span className="reel-action-icon" />
                  <span className="reel-action-label">&nbsp;</span>
                </span>
              ))}
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}
