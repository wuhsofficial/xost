import React, { useState, useEffect, CSSProperties } from 'react';
import { motion } from 'framer-motion';

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  blurColor?: string;
}

const LazyImage = ({ src, alt, className, style, blurColor = "rgba(0, 212, 255, 0.1)" }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        background: !isLoaded ? blurColor : 'transparent',
        ...style 
      }}
    >
      {!isLoaded && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default LazyImage;
