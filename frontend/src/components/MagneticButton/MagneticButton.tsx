import React, { useRef, useState, useCallback, ReactNode } from 'react';
import styles from './MagneticButton.module.css';

export interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

/**
 * MagneticButton — a transparent wrapper that adds a magnetic attraction
 * effect to its children. The child element shifts toward the cursor
 * within the given radius, then springs back on mouse leave.
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  radius = 50,
  className = '',
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        setIsActive(true);
        setOffset({
          x: distX * strength,
          y: distY * strength,
        });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.inner} ${isActive ? styles.active : ''}`}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
