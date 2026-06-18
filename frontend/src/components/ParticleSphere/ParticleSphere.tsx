import { useMemo, useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import styles from './ParticleSphere.module.css';

/* ─── Fibonacci Sphere Point Distribution ───────────────────────────────── */
function generateSpherePoints(count, radius) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; /* y goes from 1 to -1 */
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const idx = i * 3;
    positions[idx] = Math.cos(theta) * radiusAtY * radius;
    positions[idx + 1] = y * radius;
    positions[idx + 2] = Math.sin(theta) * radiusAtY * radius;
  }

  return positions;
}

/* ─── Sphere Points Component ───────────────────────────────────────────── */
function SpherePoints() {
  const pointsRef = useRef();

  const positions = useMemo(() => generateSpherePoints(2000, 3), []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00D4FF"
        size={2}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <fog attach="fog" args={['#F0FFFE', 5, 12]} />
      <SpherePoints />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

/* ─── WebGL Error Boundary ──────────────────────────────────────────────── */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      /* Graceful degradation — render nothing when WebGL is unavailable */
      return null;
    }
    return this.props.children;
  }
}

/**
 * ParticleSphere — 3D rotating sphere of 2000 particles.
 * Falls back to nothing if WebGL is not supported.
 *
 * @param {{ className?: string }} props
 */
export default function ParticleSphere({ className = '' }) {
  return (
    <div className={`${styles.container} ${className}`} aria-hidden="true">
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
