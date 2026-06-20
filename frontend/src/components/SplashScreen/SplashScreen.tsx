import { useState, useEffect, useCallback } from 'react';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete?: () => void;
}

/**
 * SplashScreen — dynamic loader displaying the stylized XOST logo
 * drawing and fading in using timed CSS path-animations.
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleComplete = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Fade out after 2.3 seconds
    const t1 = setTimeout(() => setFadeOut(true), 2300);
    // Complete callback after 2.8 seconds
    const t2 = setTimeout(handleComplete, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleComplete]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {/* ── SVG Logo symbol drawing animation ────────────────────────── */}
        <svg
          viewBox="0 0 1000 1000"
          className={styles.splashSvg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="splash-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#00FFB3" />
            </linearGradient>
          </defs>

          {/* Long thin diagonal line */}
          <line
            className={styles.longLine}
            x1="60"
            y1="10"
            x2="940"
            y2="970"
            stroke="url(#splash-logo-grad)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Short thin diagonal line */}
          <line
            className={styles.shortLine}
            x1="405"
            y1="203"
            x2="595"
            y2="797"
            stroke="url(#splash-logo-grad)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Thick stylized geometric X path */}
          <path
            className={styles.thickX}
            d="M 520,200 L 850,200 L 620,520 L 595,797 L 500,620 L 480,800 L 150,800 L 380,480 L 405,203 L 500,380 Z"
            fill="url(#splash-logo-grad)"
          />
        </svg>
      </div>
    </div>
  );
}
