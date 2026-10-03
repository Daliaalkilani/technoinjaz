import './StickyFilterBar.css';

/**
 * Static placeholder of the filter bar for route loading skeletons (same geometry).
 * Lives in its own module (no 'use client') so server-only loading.tsx skeletons
 * don't pull the interactive StickyFilterBar client module into the page bundle.
 * All styling classes come from StickyFilterBar.css (imported above) plus the
 * structural shimmer primitives (.sk) from Skeleton.css (imported by each skeleton).
 */
export function StickyFilterBarSkeleton({ chipWidths, withFilter = false }: { chipWidths: number[]; withFilter?: boolean }) {
  return (
    <div className="sfb sfb--skeleton" aria-hidden="true">
      <div className="sfb-inner">
        <div className="sfb-row">
          <div className="sfb-strip">
            {chipWidths.map((w, i) => (
              <span key={i} className="sk sfb-chip-sk" style={{ width: w }} />
            ))}
          </div>
          <div className="sfb-actions">
            <span className="sk sfb-icon-sk" />
            {withFilter && <span className="sk sfb-filter-sk" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyFilterBarSkeleton;
