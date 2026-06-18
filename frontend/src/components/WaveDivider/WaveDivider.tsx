import { useRef, useEffect } from 'react';
import styles from './WaveDivider.module.css';

const LOOP_DURATION = 6000; // 6 second full cycle

export interface WaveDividerProps {
  flipped?: boolean;
  height?: number;
  colors?: [string, string];
}

/**
 * WaveDivider — animated dual-sine-wave gradient divider drawn on canvas.
 */
export default function WaveDivider({
  flipped = false,
  height = 60,
  colors = ['#00D4FF', '#00FFB3'],
}: WaveDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let startTime = performance.now();

    function resize() {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
      }
      canvas.height = height;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(now: number) {
      const elapsed = now - startTime;
      const phase = ((elapsed % LOOP_DURATION) / LOOP_DURATION) * Math.PI * 2;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);

      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let x = 0; x <= w; x++) {
        const normalX = x / w;
        // Primary sine wave
        const primary = Math.sin(normalX * Math.PI * 2 + phase) * h * 0.25;
        // Secondary sine wave for organic complexity
        const secondary = Math.sin(normalX * Math.PI * 4 + phase * 0.7) * h * 0.1;
        const y = h * 0.5 + primary + secondary;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [height, colors]);

  return (
    <div
      className={styles.container}
      style={{
        height: `${height}px`,
        transform: flipped ? 'scaleY(-1)' : undefined,
      }}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
