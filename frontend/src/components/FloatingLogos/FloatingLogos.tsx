import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FloatingLogos.module.css';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface FloatingService {
  icon: IconDefinition;
  title: string;
  gradientStart: string;
  gradientEnd: string;
}

export interface ContainerSize {
  width: number;
  height: number;
}

interface FloatingLogoProps {
  service: FloatingService;
  containerSize: ContainerSize;
}

// Pre-calculate randomized parameters so SSR and initial render match if needed.
// But we're client side, so we can generate on mount.
const FloatingLogo = ({ service, containerSize }: FloatingLogoProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    // Generate initial random position
    const initX = Math.random() * (containerSize.width - 150);
    const initY = Math.random() * (containerSize.height - 80);
    setPosition({ x: initX, y: initY });

    const moveLogo = () => {
      const newX = Math.random() * (containerSize.width - 150);
      const newY = Math.random() * (containerSize.height - 80);
      const newDuration = 10 + Math.random() * 20; // 10s to 30s
      setPosition({ x: newX, y: newY });
      setDuration(newDuration);
    };

    // Move periodically
    const interval = setInterval(moveLogo, 10000); // adjust every 10 seconds, but animation takes longer so it interrupts smoothly
    moveLogo();

    return () => clearInterval(interval);
  }, [containerSize]);

  return (
    <motion.div
      className={styles.floatingItem}
      animate={{
        x: position.x,
        y: position.y,
        rotate: [0, Math.random() > 0.5 ? 5 : -5, 0]
      }}
      transition={{
        x: { duration: duration, ease: "linear" },
        y: { duration: duration, ease: "linear" },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
    >
      <div 
        className={styles.iconContainer}
        style={{
          background: `linear-gradient(135deg, ${service.gradientStart}26, ${service.gradientEnd}14)`,
          borderColor: `${service.gradientStart}50`
        }}
      >
        <FontAwesomeIcon 
          icon={service.icon} 
          style={{
            background: `linear-gradient(135deg, ${service.gradientStart}, ${service.gradientEnd})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 24,
          }}
        />
      </div>
      <span className={styles.logoLabel}>{service.title}</span>
    </motion.div>
  );
};

export interface FloatingLogosProps {
  services: FloatingService[];
}

export default function FloatingLogos({ services }: FloatingLogosProps) {
  const [containerSize, setContainerSize] = useState<ContainerSize>({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.overlay}></div>
      {containerSize.width > 0 && services.map((service, i) => (
        <FloatingLogo key={i} service={service} containerSize={containerSize} />
      ))}
    </div>
  );
}
