import { useRef, useEffect, useCallback } from 'react';
import styles from './ParticleBackground.module.css';

const PARTICLE_COUNT = 80;
const CONNECTION_THRESHOLD = 120;
const MOUSE_RADIUS = 180;
const MOUSE_STRENGTH = 0.0015;
const DAMPING = 0.99;
const MAX_SPEED = 1.2;

/**
 * Generate an array of particles with random initial positions & velocities.
 */
function createParticles(width, height) {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 2 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
    });
  }
  return particles;
}

/**
 * ParticleBackground — canvas-based floating particle system with
 * connection lines and mouse attraction. Fills its parent container.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const overlay = e.currentTarget;
    const rect = overlay.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;

      // Re-initialize particles on first load or if array is empty
      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(width, height);
      }
    }

    resize();
    window.addEventListener('resize', resize);

    function tick() {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          p.vx += dx * MOUSE_STRENGTH;
          p.vy += dy * MOUSE_STRENGTH;
        }

        // Damping & speed clamp
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Edge wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECTION_THRESHOLD) {
            const alpha = (1 - d / CONNECTION_THRESHOLD) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    }

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div
        className={styles.overlay}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
