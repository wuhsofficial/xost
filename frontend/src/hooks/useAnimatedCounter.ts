import { useState, useEffect, useRef, useCallback } from 'react';
import useScrollReveal from './useScrollReveal';

/**
 * Easing function: easeOutCubic
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Custom hook that animates a number from 0 to `endValue` when scrolled into view.
 * Mirrors Flutter's _AnimatedCounterCard behavior.
 *
 * @param {number} endValue — target number to count up to
 * @param {number} duration — animation duration in ms (default 1500)
 */
export default function useAnimatedCounter(endValue: number, duration: number = 1500) {
  const { ref, isVisible } = useScrollReveal(0.3);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setValue(Math.round(easedProgress * endValue));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [endValue, duration]);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      animate();
    }
  }, [isVisible, animate]);

  return { ref, value };
}
