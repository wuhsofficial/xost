import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useMouseTilt from '../../hooks/useMouseTilt';
import GlassmorphicCard from '../GlassmorphicCard/GlassmorphicCard';
import styles from './ServiceCard.module.css';

/**
 * ServiceCard — tilting glassmorphic card with icon, title, description,
 * learn-more link, and cursor-following radial glow.
 *
 * @param {{
 *   icon: import('@fortawesome/fontawesome-svg-core').IconDefinition,
 *   title: string,
 *   description: string,
 *   gradientColors?: [string, string],
 *   onClick?: () => void
 * }} props
 */
export default function ServiceCard({
  icon,
  title,
  description,
  gradientColors = ['#00D4FF', '#00FFB3'],
  onClick,
}) {
  const { ref, style, handlers } = useMouseTilt();
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const iconGradient = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`;
  const linkGradient = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`;

  const handleMouseMove = useCallback(
    (e) => {
      /* Track cursor relative to card for radial glow */
      const rect = e.currentTarget.getBoundingClientRect();
      setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      /* Forward to tilt handler */
      if (handlers.onMouseMove) handlers.onMouseMove(e);
    },
    [handlers],
  );

  const handleMouseEnter = useCallback(
    (e) => {
      setIsHovered(true);
      if (handlers.onMouseEnter) handlers.onMouseEnter(e);
    },
    [handlers],
  );

  const handleMouseLeave = useCallback(
    (e) => {
      setIsHovered(false);
      if (handlers.onMouseLeave) handlers.onMouseLeave(e);
    },
    [handlers],
  );

  const glowStyle = {
    background: `radial-gradient(circle 200px at ${glowPos.x}px ${glowPos.y}px, rgba(0,212,255,0.12), transparent 60%)`,
    opacity: isHovered ? 1 : 0,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={styles.tiltWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GlassmorphicCard padding={28} borderRadius={16} onClick={onClick} className={styles.card}>
        {/* Cursor-following radial glow overlay */}
        <div className={styles.glowOverlay} style={glowStyle} />

        <div className={styles.iconWrapper}>
          <FontAwesomeIcon
            icon={icon}
            className={styles.icon}
            style={{ background: iconGradient }}
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.learnMore} style={{ background: linkGradient }}>
          Learn More <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
        </span>
      </GlassmorphicCard>
    </div>
  );
}
