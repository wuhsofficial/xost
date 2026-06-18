import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsHidden(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const checkHover = (e) => {
      const target = e.target;
      // Check if we are hovering a clickable element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (isHidden) return null;

  return (
    <>
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'var(--accent-aqua)' : 'rgba(255, 255, 255, 0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
        animate={{
          scale: isClicked ? 0.5 : isHovered ? 3 : 1,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
