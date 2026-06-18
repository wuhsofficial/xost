import styles from './GlassmorphicCard.module.css';

/**
 * GlassmorphicCard — frosted-glass container with hover glow.
 *
 * @param {{
 *   children: React.ReactNode,
 *   padding?: number,
 *   borderRadius?: number,
 *   onClick?: () => void,
 *   className?: string
 * }} props
 */
export default function GlassmorphicCard({
  children,
  padding = 24,
  borderRadius = 16,
  onClick,
  className = '',
}) {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ padding: `${padding}px`, borderRadius: `${borderRadius}px` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
