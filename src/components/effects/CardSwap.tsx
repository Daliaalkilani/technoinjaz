'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.35,
          durMove: 1.35,
          durReturn: 1.35,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.9,
          durMove: 0.9,
          durReturn: 0.9,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  const isAnimatingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const setAnimatingState = (animating: boolean) => {
      isAnimatingRef.current = animating;
      if (container.current) {
        if (animating) {
          container.current.setAttribute('data-animating', 'true');
        } else {
          container.current.removeAttribute('data-animating');
        }
      }
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = 0;
      }
    };

    const startInterval = () => {
      stopInterval();
      if (isVisibleRef.current && (!pauseOnHover || !isHoveredRef.current)) {
        intervalRef.current = window.setInterval(() => {
          if (!isAnimatingRef.current && (!pauseOnHover || !isHoveredRef.current)) {
            swap();
          }
        }, delay);
      }
    };

    const swap = () => {
      if (order.current.length < 2) return;
      if (isAnimatingRef.current) return;
      if (pauseOnHover && isHoveredRef.current) return;

      setAnimatingState(true);
      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;

      const tl = gsap.timeline({
        onComplete: () => {
          setAnimatingState(false);
          // Cards have reached resting state (ثبوتها).
          // If mouse is still hovering, do not schedule next swap until mouse leaves.
          if (isVisibleRef.current && (!pauseOnHover || !isHoveredRef.current)) {
            startInterval();
          }
        }
      });
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (isVisibleRef.current) {
        startInterval();
      } else {
        stopInterval();
      }
    }, { threshold: 0.05 });

    if (container.current) {
      observer.observe(container.current);
    }

    if (pauseOnHover && container.current) {
      const node = container.current;
      const onEnter = () => {
        isHoveredRef.current = true;
        // When cards are resting, hovering stops the next swap from starting.
        stopInterval();
        // If an animation has already started, we DO NOT halt tlRef.current; it continues smoothly.
      };
      const onLeave = () => {
        isHoveredRef.current = false;
        // When mouse leaves, resume auto-swap interval if not currently in flight
        if (!isAnimatingRef.current) {
          startInterval();
        }
      };
      node.addEventListener('mouseenter', onEnter);
      node.addEventListener('mouseleave', onLeave);
      return () => {
        observer.disconnect();
        node.removeEventListener('mouseenter', onEnter);
        node.removeEventListener('mouseleave', onLeave);
        stopInterval();
        tlRef.current?.kill();
      };
    }

    return () => {
      observer.disconnect();
      stopInterval();
      tlRef.current?.kill();
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            if (isAnimatingRef.current) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
