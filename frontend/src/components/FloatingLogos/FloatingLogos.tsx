import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faRotateRight, faTrophy, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  isPlaying: boolean;
  gameKey: number;
  onCatch: () => void;
}

const FloatingLogo = ({ service, containerSize, isPlaying, gameKey, onCatch }: FloatingLogoProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [duration, setDuration] = useState(20);
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    setCaught(false);
  }, [gameKey]);

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
    const interval = setInterval(moveLogo, 10000);
    moveLogo();

    return () => clearInterval(interval);
  }, [containerSize]);

  const handlePointerDown = () => {
    if (isPlaying && !caught) {
      setCaught(true);
      onCatch();
    }
  };

  return (
    <motion.div
      className={styles.floatingItem}
      animate={caught ? { scale: 0, opacity: 0 } : {
        x: position.x,
        y: position.y,
        rotate: [0, Math.random() > 0.5 ? 5 : -5, 0]
      }}
      transition={caught ? { duration: 0.3 } : {
        x: { duration: duration, ease: "linear" },
        y: { duration: duration, ease: "linear" },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.2 }
      }}
      whileHover={!caught ? { scale: 1.1, zIndex: 10 } : {}}
      onPointerDown={handlePointerDown}
      style={{ 
        cursor: isPlaying ? 'crosshair' : 'default',
        pointerEvents: caught ? 'none' : 'auto'
      }}
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);

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

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameKey(prev => prev + 1);
  };

  const stopGame = () => {
    setIsPlaying(false);
    setScore(0);
    setGameKey(prev => prev + 1);
  };

  const handleCatch = () => {
    setScore(prev => prev + 1);
  };

  const total = services.length;
  const isWon = isPlaying && score === total;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.overlay}></div>
      
      {/* Game HUD */}
      <div className={styles.gameHud}>
        {!isPlaying ? (
          <button className={styles.gameBtn} onClick={startGame}>
            <FontAwesomeIcon icon={faGamepad} /> Play Mini-Game
          </button>
        ) : (
          <div className={styles.gameScoreBoard}>
            <span className={styles.scoreText}>Caught: {score} / {total}</span>
            <button className={styles.gameBtnGhost} onClick={stopGame} title="Quit">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button className={styles.gameBtnGhost} onClick={startGame} title="Restart">
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        )}
      </div>

      {/* Win Overlay */}
      <AnimatePresence>
        {isWon && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.winOverlay}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className={styles.winMessage}
            >
              <FontAwesomeIcon icon={faTrophy} className={styles.winIcon} />
              <h3 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-primary)' }}>You caught them all!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Excellent reflexes. The ecosystem is fully captured.</p>
              <button className={styles.gameBtn} onClick={startGame} style={{ marginTop: '1rem' }}>
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {containerSize.width > 0 && services.map((service, i) => (
        <FloatingLogo 
          key={i} 
          service={service} 
          containerSize={containerSize} 
          isPlaying={isPlaying}
          gameKey={gameKey}
          onCatch={handleCatch}
        />
      ))}
    </div>
  );
}
