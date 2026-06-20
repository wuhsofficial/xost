import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  size?: number;
  className?: string;
  onClick?: () => void;
}

/**
 * Logo component — renders the user's official designed logo image file.
 */
export default function Logo({
  variant = 'horizontal',
  size,
  className = '',
  onClick
}: LogoProps) {
  // Determine size based on variant if not provided
  const iconHeight = size || (variant === 'stacked' ? 120 : 32);

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} onClick={onClick}>
      <img
        src="/logo.png"
        alt="XOST Logo"
        style={{
          height: iconHeight,
          width: 'auto',
          display: 'block',
          objectFit: 'contain'
        }}
        className={styles.svgSymbol} // Retain hover scale effects from stylesheet
      />
    </div>
  );
}
