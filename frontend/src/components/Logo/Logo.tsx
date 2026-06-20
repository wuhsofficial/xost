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
 * The stylized X symbol is combined with "O S T" inside the SVG canvas.
 */
export default function Logo({
  variant = 'horizontal',
  size,
  className = '',
  onClick
}: LogoProps) {
  // Determine standard height based on variant if not provided
  const iconHeight = size || (variant === 'stacked' ? 180 : 32);

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  if (variant === 'horizontal') {
    // Width scales with height (ratio 1.45:1)
    const iconWidth = Math.round(iconHeight * 1.45);

    return (
      <div className={containerClasses} onClick={onClick}>
        <svg
          viewBox="0 0 1450 1000"
          width={iconWidth}
          height={iconHeight}
          className={styles.svgSymbol}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="xost-logo-grad-horiz" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#00FFB3" />
            </linearGradient>
          </defs>

          {/* Stylized X symbol shifted slightly left to merge with letters */}
          <g transform="translate(-120, 0)">
            {/* Long thin diagonal line */}
            <line
              x1="60"
              y1="10"
              x2="940"
              y2="970"
              stroke="url(#xost-logo-grad-horiz)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Short thin diagonal line */}
            <line
              x1="405"
              y1="203"
              x2="595"
              y2="797"
              stroke="url(#xost-logo-grad-horiz)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Thick stylized geometric X path */}
            <path
              d="M 520,200 L 850,200 L 620,520 L 595,797 L 500,620 L 480,800 L 150,800 L 380,480 L 405,203 L 500,380 Z"
              fill="url(#xost-logo-grad-horiz)"
            />
          </g>

          {/* Integrated brand letters spelling "Xost" */}
          <text
            x="780"
            y="610"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="500"
            fontSize="260"
            fill="currentColor"
            letterSpacing="80"
            className={styles.svgText}
          >
            OST
          </text>
        </svg>
      </div>
    );
  }

  if (variant === 'stacked') {
    // Height includes the bottom spacing for the logo title
    const iconWidth = iconHeight;
    const finalHeight = Math.round(iconHeight * 1.2);

    return (
      <div className={containerClasses} onClick={onClick}>
        <svg
          viewBox="0 0 1000 1200"
          width={iconWidth}
          height={finalHeight}
          className={styles.svgSymbol}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="xost-logo-grad-stacked" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#00FFB3" />
            </linearGradient>
          </defs>

          {/* Centered stylized X symbol */}
          <g>
            {/* Long thin diagonal line */}
            <line
              x1="60"
              y1="10"
              x2="940"
              y2="970"
              stroke="url(#xost-logo-grad-stacked)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Short thin diagonal line */}
            <line
              x1="405"
              y1="203"
              x2="595"
              y2="797"
              stroke="url(#xost-logo-grad-stacked)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Thick stylized geometric X path */}
            <path
              d="M 520,200 L 850,200 L 620,520 L 595,797 L 500,620 L 480,800 L 150,800 L 380,480 L 405,203 L 500,380 Z"
              fill="url(#xost-logo-grad-stacked)"
            />
          </g>

          {/* Under-symbol branding text */}
          <text
            x="500"
            y="1140"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize="80"
            fill="currentColor"
            letterSpacing="30"
            className={styles.svgText}
          >
            X O S T
          </text>
        </svg>
      </div>
    );
  }

  // Icon-only variant
  return (
    <div className={containerClasses} onClick={onClick}>
      <svg
        viewBox="0 0 1000 1000"
        width={iconHeight}
        height={iconHeight}
        className={styles.svgSymbol}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="xost-logo-grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke="url(#xost-logo-grad-icon)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Short thin diagonal line */}
        <line
          x1="405"
          y1="203"
          x2="595"
          y2="797"
          stroke="url(#xost-logo-grad-icon)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Thick stylized geometric X path */}
        <path
          d="M 520,200 L 850,200 L 620,520 L 595,797 L 500,620 L 480,800 L 150,800 L 380,480 L 405,203 L 500,380 Z"
          fill="url(#xost-logo-grad-icon)"
        />
      </svg>
    </div>
  );
}
