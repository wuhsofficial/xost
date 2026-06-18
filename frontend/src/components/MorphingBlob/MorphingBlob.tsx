import styles from './MorphingBlob.module.css';

/**
 * MorphingBlob — an organic shape with continuously morphing border-radius.
 * Position it absolutely in a parent with `position: relative`.
 *
 * @param {{
 *   size?: number,
 *   colors?: [string, string],
 *   duration?: number,
 *   className?: string,
 *   style?: React.CSSProperties
 * }} props
 */
export default function MorphingBlob({
  size = 200,
  colors = ['rgba(0,212,255,0.12)', 'rgba(0,255,179,0.08)'],
  duration = 8,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`${styles.blob} ${className}`}
      aria-hidden="true"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        animationDuration: `${duration}s`,
        ...style,
      }}
    />
  );
}
