import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './ScrollReveal.module.css';

const DIRECTION_CLASS = {
  up: styles.dirUp,
  left: styles.dirLeft,
  right: styles.dirRight,
  scale: styles.dirScale,
};

import { ReactNode } from 'react';

export type ScrollDirection = 'up' | 'left' | 'right' | 'scale';

export interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: ScrollDirection;
}

/**
 * ScrollReveal — wraps children and applies a directional fade-in transition
 * when the element scrolls into the viewport. One-shot reveal.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal(0.15);

  const dirClass = DIRECTION_CLASS[direction] || DIRECTION_CLASS.up;

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${dirClass} ${isVisible ? styles.visible : ''}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
