import { useState, useEffect, useCallback } from 'react';
import styles from './SplashScreen.module.css';

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleComplete = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Fade out after 1.5 seconds
    const t1 = setTimeout(() => setFadeOut(true), 1500);
    // Complete callback
    const t2 = setTimeout(handleComplete, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleComplete]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <span className={styles.largeLogo} aria-hidden="true" style={{ fontSize: '15vw', fontWeight: '900', color: 'var(--accent-aqua)', letterSpacing: '5px' }}>
          XOST
        </span>
      </div>
    </div>
  );
}
