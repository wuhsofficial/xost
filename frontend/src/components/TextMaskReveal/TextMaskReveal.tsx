import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './TextMaskReveal.module.css';

import React, { ElementType } from 'react';

export interface TextMaskRevealProps {
  children: React.ReactNode;
  tag?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
}

/**
 * TextMaskReveal — scroll-triggered text reveal with a clip-path + translateY
 * animation that slides content up from behind a mask.
 */
export default function TextMaskReveal({
  children,
  tag: Tag = 'h2',
  className = '',
  delay = 0,
  threshold = 0.2,
}: TextMaskRevealProps) {
  const { ref, isVisible } = useScrollReveal(threshold);

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} ${isVisible ? styles.visible : ''} ${className}`}
    >
      <Tag
        className={`${styles.content} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </Tag>
    </div>
  );
}
