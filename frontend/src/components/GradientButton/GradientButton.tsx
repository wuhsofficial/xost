import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './GradientButton.module.css';

/**
 * GradientButton — filled or ghost variant with shimmer sweep on hover
 * and ripple effect on click.
 *
 */
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface GradientButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconDefinition;
  isGhost?: boolean;
}

export default function GradientButton({ label, onClick, icon, isGhost = false }: GradientButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();

      setRipples((prev) => [...prev, { x, y, id }]);

      /* Remove ripple after animation completes (600ms) */
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      if (onClick) onClick(e);
    },
    [onClick],
  );

  return (
    <button
      className={`${styles.button} ${isGhost ? styles.ghost : styles.filled}`}
      onClick={handleClick}
      type="button"
    >
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      <span className={styles.label}>{label}</span>

      {/* Ripple layer */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}
