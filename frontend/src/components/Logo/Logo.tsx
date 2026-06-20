import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  size?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * Logo component — renders the official XOST vector icon and typography.
 * Supports horizontal (navbar/footer), stacked (splash screen), and icon-only variants.
 */
export default function Logo({
  variant = 'horizontal',
  size,
  className = '',
  onClick
}: LogoProps) {
  // Determine standard size based on variant if not provided
  const iconSize = size || (variant === 'stacked' ? 180 : 32);

  const containerClasses = [
    styles.container,
    variant === 'horizontal' ? styles.horizontal : '',
    variant === 'stacked' ? styles.stacked : '',
    variant === 'icon-only' ? styles.iconOnly : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* ── SVG Logo Symbol ────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 1000 1000"
        width={iconSize}
        height={iconSize}
        className={styles.svgSymbol}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="xost-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#00FFB3" />
          </linearGradient>
        </defs>

        {/* Long thin diagonal line */}
        <line
          x1="60"
          y1="10"
          x2="940"
          y2="970"
          stroke="url(#xost-logo-grad)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Short thin diagonal line */}
        <line
          x1="405"
          y1="203"
          x2="595"
          y2="797"
          stroke="url(#xost-logo-grad)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Thick stylized geometric X path */}
        <path
          d="M 520,200 L 850,200 L 620,520 L 595,797 L 500,620 L 480,800 L 150,800 L 380,480 L 405,203 L 500,380 Z"
          fill="url(#xost-logo-grad)"
        />
      </svg>

      {/* ── Logo Text ──────────────────────────────────────────────────── */}
      {variant !== 'icon-only' && (
        <span
          className={`${styles.text} ${
            variant === 'stacked' ? styles.textStacked : styles.textHorizontal
          }`}
        >
          {variant === 'stacked' ? 'X O S T' : 'XOST'}
        </span>
      )}
    </div>
  );
}
