import React from 'react';
import styles from './CompanyMarquee.module.css';

export interface CompanyMarqueeProps {
  companies: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export default function CompanyMarquee({ companies, direction = 'left', speed = 30 }: CompanyMarqueeProps) {
  // Duplicate array to ensure seamless looping
  const marqueeContent = [...companies, ...companies, ...companies];

  return (
    <div className={styles.marqueeContainer}>
      <div 
        className={`${styles.marqueeTrack} ${direction === 'right' ? styles.trackRight : styles.trackLeft}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {marqueeContent.map((company, i) => (
          <div key={i} className={styles.companyBadge}>
            {company}
          </div>
        ))}
      </div>
    </div>
  );
}
