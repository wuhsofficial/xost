import { useState, useEffect, useCallback } from 'react';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete?: () => void;
}

/**
 * SplashScreen — dynamic loader displaying the official designed logo image
 * with a smooth transition.
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleComplete = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Fade out after 2.0 seconds
    const t1 = setTimeout(() => setFadeOut(true), 2000);
    // Complete callback after 2.5 seconds
    const t2 = setTimeout(handleComplete, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleComplete]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {/* ── Brand Logo Image with CSS animation ──────────────────────── */}
        <img
          src="/logo.png"
          alt="XOST Logo"
          className={styles.splashImage}
        />
      </div>
    </div>
  );
}
