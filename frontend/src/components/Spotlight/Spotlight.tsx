import { useEffect, useState } from 'react';
import styles from './Spotlight.module.css';

export default function Spotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={styles.spotlight}
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 212, 255, 0.08), transparent 40%)`
      }}
    />
  );
}
