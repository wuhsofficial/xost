import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for 3D perspective tilt effect on hover.
 * Mirrors Flutter's AnimatedServiceCard Matrix4 perspective transform.
 * Max tilt: 5 degrees.
 *
 * @returns {{ ref, style, handlers }}
 */
export default function useMouseTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -1..1
    const normalX = (x / rect.width) * 2 - 1;
    const normalY = (y / rect.height) * 2 - 1;

    // Max 5 degrees tilt
    const maxDeg = 5;
    setTilt({
      rotateX: -normalY * maxDeg,
      rotateY: normalX * maxDeg,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
    transition: 'transform 200ms ease-out',
    transformStyle: 'preserve-3d',
  };

  const handlers = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return { ref, style, handlers, isHovered };
}
