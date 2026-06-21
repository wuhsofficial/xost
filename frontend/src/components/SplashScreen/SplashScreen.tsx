import { useState, useEffect, useCallback } from 'react';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  onComplete?: () => void;
}

/* Minimum time the splash stays up so the logo intro animation can play. */
const MIN_DISPLAY = 1400;
/* Hard cap so a stalled video/asset can never trap the user on the splash. */
const MAX_DISPLAY = 9000;
/* How "ready" the hero video must be (HAVE_FUTURE_DATA) before we reveal. */
const VIDEO_READY = 3;

/**
 * SplashScreen — holds the brand "X" loader on screen until the real site is
 * actually ready: the document has finished loading and the hero video has
 * buffered enough to play. Falls back to a max timeout so it never hangs.
 */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  const finish = useCallback(() => {
    setFadeOut(true);
    // Let the CSS opacity transition (500ms) play out before unmounting.
    const t = setTimeout(() => onComplete?.(), 600);
    return () => clearTimeout(t);
  }, [onComplete]);

  useEffect(() => {
    const start = Date.now();
    let done = false;

    const complete = () => {
      if (done) return;
      done = true;
      clearInterval(poll);
      finish();
    };

    /* Poll for the real readiness signals. The hero video lives inside a
       lazily-loaded route, so it appears in the DOM a moment after mount —
       polling lets us catch it whenever it shows up. */
    const poll = setInterval(() => {
      const elapsed = Date.now() - start;
      const docReady = document.readyState === 'complete';
      const video = document.querySelector('video');
      const videoReady = !video || video.readyState >= VIDEO_READY;

      if (elapsed >= MAX_DISPLAY) {
        complete();
      } else if (docReady && videoReady && elapsed >= MIN_DISPLAY) {
        complete();
      }
    }, 120);

    return () => clearInterval(poll);
  }, [finish]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {/* ── Brand Logo Image with CSS animation ──────────────────────── */}
        <img
          src="/logo.png"
          alt="XOST Logo"
          className={styles.splashImage}
        />
        {/* ── Loading shimmer bar ──────────────────────────────────────── */}
        <div className={styles.loaderBar}>
          <span className={styles.loaderFill} />
        </div>
      </div>
    </div>
  );
}
