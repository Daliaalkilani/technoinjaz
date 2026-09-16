import React, { useRef, type ElementType } from 'react';
import '../../../theme/tokens.css';
import '../../../theme/faceted-text.css';
import '../../../theme/accent-dot.css';

export interface FacetedTextProps {
  children: React.ReactNode;
  tier?: 1 | 2 | 3;
  as?: ElementType;
  className?: string;
  hasDot?: boolean;
}

export const FacetedText: React.FC<FacetedTextProps> = ({
  children,
  tier = 1,
  as: Component = 'span',
  className = '',
  hasDot = false
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  // If tier is 3, render standard clean text
  if (tier === 3) {
    return (
      <Component className={`fx-3 ${className}`}>
        {children}
      </Component>
    );
  }

  // Format string children into individual .fx-w word spans
  const renderFormattedContent = () => {
    if (typeof children === 'string') {
      let text = children;
      const endsWithPeriod = /\.\s*$/.test(text);

      if (tier === 1 && (hasDot || endsWithPeriod)) {
        text = text.replace(/\.\s*$/, '');
      }

      const words = text.split(/(\s+)/);

      return (
        <>
          {words.map((chunk, idx) => {
            if (!chunk) return null;
            if (/^\s+$/.test(chunk)) {
              return <React.Fragment key={idx}>{chunk}</React.Fragment>;
            }
            return (
              <span key={idx} className="fx-w">
                {chunk}
              </span>
            );
          })}
          {tier === 1 && (hasDot || endsWithPeriod) && (
            <>
              <span className="fx-dot" aria-hidden="true" />
              <span className="fx-sr-only">.</span>
            </>
          )}
        </>
      );
    }
    return children;
  };

  const tierClass = tier === 1 ? 'fx-1' : 'fx-2';

  return (
    <Component
      ref={containerRef as any}
      className={`fx-text ${tierClass} ${className}`}
      data-fx-tier={tier}
      data-fx-ready="true"
    >
      {renderFormattedContent()}
    </Component>
  );
};

export default FacetedText;
