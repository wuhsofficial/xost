import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that detects when an element scrolls into the viewport.
 * Uses IntersectionObserver. One-shot: once visible, stays visible.
 *
 * @param {number} threshold — fraction visible to trigger (default 0.15)
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export default function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold: number = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });
  }, [threshold]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin: '0px',
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold]);

  return { ref, isVisible };
}
