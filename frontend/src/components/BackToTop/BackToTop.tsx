import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styles from './BackToTop.module.css';

/**
 * BackToTop — floating gradient circle that scrolls the page to the top.
 * Fades in with a scale transition after the user scrolls 300px.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    /* Initial check in case the page loads already scrolled */
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Listen to chatbot assistant toggle events */
  useEffect(() => {
    const handleAssistantToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setAssistantOpen(!!customEvent.detail?.isOpen);
    };
    window.addEventListener('xost-assistant-toggle', handleAssistantToggle);
    return () => window.removeEventListener('xost-assistant-toggle', handleAssistantToggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`${styles.button} ${visible ? styles.visible : ''} ${assistantOpen ? styles.shifted : ''}`}
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faArrowUp} className={styles.icon} />
    </button>
  );
}
