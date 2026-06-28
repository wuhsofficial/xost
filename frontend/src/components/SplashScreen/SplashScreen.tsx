import { useState, useEffect, useCallback } from 'react';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete?: () => void;
}

/* Minimum time the splash stays up so the logo intro animation can play. */
const MIN_DISPLAY = 6500;
/* Hard cap so a slow asset can never trap the user on the splash. */
const MAX_DISPLAY = 10000;

/**
 * SplashScreen — holds the brand "X" loader on a clean light backdrop until the
 * real site is ready: the document has finished loading and web fonts are
 * resolved. Falls back to a max timeout so it can never hang. (The hero
 * background streams from YouTube independently and is not blocked on.)
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const finish = useCallback(() => {
    setFadeOut(true);
    // Let the CSS opacity transition (500ms) play out before unmounting.
    const t = setTimeout(() => onComplete?.(), 600);
    return () => clearTimeout(t);
  }, [onComplete]);

  useEffect(() => {
    const start = Date.now();
    let done = false;

    // Web fonts resolved → no text reflow/flash when the site is revealed.
    let fontsReady = false;
    if ('fonts' in document) {
      (document as Document).fonts.ready.then(() => { fontsReady = true; });
    } else {
      fontsReady = true;
    }

    const complete = () => {
      if (done) return;
      done = true;
      clearInterval(poll);
      finish();
    };

    const poll = setInterval(() => {
      const elapsed = Date.now() - start;
      const docReady = document.readyState === 'complete';
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '/platform';
      const videoReady = !isHomePage || !!(window as any).xostVideoLoaded;

      if (elapsed >= MAX_DISPLAY) {
        complete();
      } else if (docReady && fontsReady && videoReady && videoFinished) {
        complete();
      }
    }, 100);

    return () => clearInterval(poll);
  }, [finish]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {/* ── Brand "X" animated logo reveal (MP4) ──── */}
        <video
          src="/xost-logo-reveal.mp4"
          className={styles.splashVideo}
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoFinished(true)}
        />
      </div>
    </div>
  );
}
