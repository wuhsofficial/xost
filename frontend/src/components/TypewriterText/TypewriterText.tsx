import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './TypewriterText.module.css';

export interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * TypewriterText — types text out character by character with a blinking cursor.
 */
export default function TypewriterText({
  text,
  speed = 50,
  startDelay = 0,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  /* Keep the callback ref fresh without re-triggering the effect */
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      const nextIndex = indexRef.current;

      if (nextIndex >= text.length) {
        setDisplayedText(text);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTyping(false);

        /* Hide cursor 500ms after typing completes */
        timeoutRef.current = setTimeout(() => {
          setShowCursor(false);
          onCompleteRef.current?.();
        }, 500);
      } else {
        setDisplayedText(text.slice(0, nextIndex));
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    setDisplayedText('');
    setShowCursor(true);
    setIsTyping(false);
    indexRef.current = 0;

    const delayTimer = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startTyping, startDelay]);

  return (
    <span className={`${styles.container} ${className}`}>
      <span className={styles.text}>{displayedText}</span>
      {showCursor && (
        <span
          className={`${styles.cursor} ${isTyping ? styles.typing : ''}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
