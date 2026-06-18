import styles from './GradientMesh.module.css';

/**
 * GradientMesh — four radial gradient blobs that drift organically.
 * Use as an absolute-positioned background layer.
 *
 * @param {{
 *   className?: string,
 *   colors?: [string, string, string, string],
 *   animated?: boolean
 * }} props
 */
export default function GradientMesh({
  className = '',
  colors = ['#00D4FF', '#00FFB3', '#667EEA', '#F093FB'],
  animated = true,
}) {
  const blobConfig = [
    { className: styles.blob1, animationClass: styles.drift1 },
    { className: styles.blob2, animationClass: styles.drift2 },
    { className: styles.blob3, animationClass: styles.drift3 },
    { className: styles.blob4, animationClass: styles.drift4 },
  ];

  return (
    <div
      className={`${styles.container} ${className}`}
      aria-hidden="true"
    >
      {blobConfig.map((blob, i) => (
        <div
          key={i}
          className={`${styles.blob} ${blob.className} ${animated ? blob.animationClass : ''}`}
          style={{
            background: `radial-gradient(circle, ${colors[i]} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
