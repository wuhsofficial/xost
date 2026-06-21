import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TechGalaxy.module.css';

/* ─── Tech Stack Config ────────────────────────────────────────────────── */
interface TechNode {
  name: string;
  slug: string;
  category: string;
}

const techRows: TechNode[][] = [
  // Ring 0: Languages
  [
    { name: 'JavaScript', slug: 'javascript', category: 'Core Language' },
    { name: 'TypeScript', slug: 'typescript', category: 'Core Language' },
    { name: 'Python', slug: 'python', category: 'Core Language' },
    { name: 'Dart', slug: 'dart', category: 'Core Language' },
  ],
  // Ring 1: Frameworks & Main Tools
  [
    { name: 'React', slug: 'react', category: 'Framework / Library' },
    { name: 'Next.js', slug: 'nextdotjs', category: 'Framework / Library' },
    { name: 'Node.js', slug: 'nodedotjs', category: 'Platform / Runtime' },
    { name: 'Flutter', slug: 'flutter', category: 'Framework / SDK' },
    { name: 'Figma', slug: 'figma', category: 'Design UI/UX' },
    { name: 'AWS', slug: 'amazonwebservices', category: 'Cloud Infrastructure' },
  ],
  // Ring 2: Tools, Utilities & Libraries
  [
    { name: 'Tailwind CSS', slug: 'tailwindcss', category: 'Styling Tool' },
    { name: 'MongoDB', slug: 'mongodb', category: 'Database' },
    { name: 'Docker', slug: 'docker', category: 'Containerization' },
    { name: 'Kubernetes', slug: 'kubernetes', category: 'Orchestration' },
    { name: 'GraphQL', slug: 'graphql', category: 'API Technology' },
    { name: 'Supabase', slug: 'supabase', category: 'Backend as a Service' },
    { name: 'PyTorch', slug: 'pytorch', category: 'Machine Learning' },
    { name: 'Git', slug: 'git', category: 'Version Control' },
    { name: 'Vite', slug: 'vite', category: 'Build Tool' },
    { name: 'FastAPI', slug: 'fastapi', category: 'Framework / API' },
  ],
];

const connections: Record<string, string[]> = {
  JavaScript: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Vite'],
  TypeScript: ['JavaScript', 'React', 'Next.js', 'Node.js', 'Vite'],
  Python: ['FastAPI', 'Docker', 'PyTorch', 'Git'],
  Dart: ['Flutter', 'AWS'],
  React: ['JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
  'Next.js': ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Supabase'],
  'Node.js': ['JavaScript', 'TypeScript', 'MongoDB', 'Docker', 'GraphQL', 'FastAPI'],
  Flutter: ['Dart', 'AWS'],
  Figma: ['React', 'Tailwind CSS'],
  AWS: ['Docker', 'Kubernetes', 'Node.js', 'Supabase', 'Flutter'],
  'Tailwind CSS': ['React', 'Next.js', 'Figma'],
  MongoDB: ['Node.js', 'Next.js'],
  Docker: ['AWS', 'Kubernetes', 'Python', 'Node.js'],
  Kubernetes: ['Docker', 'AWS'],
  GraphQL: ['Node.js', 'React'],
  Supabase: ['Next.js', 'React', 'Node.js', 'AWS'],
  PyTorch: ['Python'],
  Git: ['Python', 'Docker'],
  Vite: ['React', 'TypeScript', 'Tailwind CSS'],
  FastAPI: ['Python', 'Node.js'],
};

const ringRadii = [110, 190, 270];
const ringDurations = [28, 45, 62];
const centerPoint = { x: 300, y: 300 };
const svgSize = 600;

// Position math helper
function getPositionedNodes(row: TechNode[], radius: number) {
  return row.map((tech, index) => {
    const angle = (index / row.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...tech,
      x: centerPoint.x + radius * Math.cos(angle),
      y: centerPoint.y + radius * Math.sin(angle),
    };
  });
}

// Flat array of all positioned nodes
const allPositionedNodes = techRows.flatMap((row, ringIdx) =>
  getPositionedNodes(row, ringRadii[ringIdx]).map((node) => ({ ...node, ring: ringIdx }))
);

export default function TechGalaxy() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause animation when out of view (for performance)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = useCallback((name: string) => {
    setHoveredNode(name);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  const activeNodeData = hoveredNode ? allPositionedNodes.find((n) => n.name === hoveredNode) : null;
  const activeConnections = hoveredNode ? connections[hoveredNode] ?? [] : [];

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.gridContainer}>
        {/* ─── LEFT SIDE: SVG GALAXY ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={styles.svgContainer}
        >
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            width="100%"
            height="100%"
            className={styles.galaxySvg}
            onClick={handleMouseLeave}
          >
            <defs>
              <radialGradient id="centerGlowGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="var(--accent-aqua)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nodeActiveGlow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="var(--accent-aqua)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent-aqua)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Orbit paths */}
            {ringRadii.map((radius, idx) => (
              <circle
                key={idx}
                cx={centerPoint.x}
                cy={centerPoint.y}
                r={radius}
                className={styles.orbitPath}
                strokeDasharray={idx === 0 ? '3 9' : idx === 1 ? '5 7' : '2 12'}
              />
            ))}

            {/* Central XOST Logo circle */}
            <circle
              cx={centerPoint.x}
              cy={centerPoint.y}
              r={40}
              fill="url(#centerGlowGrad)"
              className={styles.pulseCenter}
              onClick={(e) => { e.stopPropagation(); handleMouseLeave(); }}
              style={{ cursor: 'pointer' }}
            />
            <circle
              cx={centerPoint.x}
              cy={centerPoint.y}
              r={24}
              fill="var(--bg-secondary)"
              stroke="var(--accent-aqua)"
              strokeWidth="1.5"
              onClick={(e) => { e.stopPropagation(); handleMouseLeave(); }}
              style={{ cursor: 'pointer' }}
            />
            <image
              href="/x-logo.webp"
              width={38}
              height={38}
              x={centerPoint.x - 19}
              y={centerPoint.y - 19}
              className={styles.centerLogoImage}
              onClick={(e) => { e.stopPropagation(); handleMouseLeave(); }}
              style={{ cursor: 'pointer' }}
            />

            {/* Interactive orbit groups */}
            {techRows.map((row, ringIdx) => {
              const positioned = getPositionedNodes(row, ringRadii[ringIdx]);
              const duration = ringDurations[ringIdx];
              const isClockwise = ringIdx % 2 === 0;

              return (
                <g
                  key={ringIdx}
                  className={`${styles.orbitGroup} ${
                    isClockwise ? styles.orbitClockwise : styles.orbitCounter
                  }`}
                  style={{
                    animationDuration: `${duration}s`,
                    animationPlayState: !isIntersecting || hoveredNode ? 'paused' : 'running',
                  }}
                >
                  {positioned.map((node) => {
                    const isHovered = hoveredNode === node.name;
                    const isConnected = activeConnections.includes(node.name);
                    const isDimmed = hoveredNode && !isHovered && !isConnected;

                    return (
                      <g
                        key={node.name}
                        transform={`translate(${node.x}, ${node.y})`}
                        onMouseEnter={() => handleMouseEnter(node.name)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (hoveredNode === node.name) {
                            handleMouseLeave();
                          } else {
                            handleMouseEnter(node.name);
                          }
                        }}
                        className={styles.nodeInteractiveGroup}
                        style={{ opacity: isDimmed ? 0.08 : 1 }}
                      >
                        {/* Opposite rotation to keep text/icon upright */}
                        <g
                          className={isClockwise ? styles.orbitCounter : styles.orbitClockwise}
                          style={{
                            animationDuration: `${duration}s`,
                            animationPlayState: !isIntersecting || hoveredNode ? 'paused' : 'running',
                          }}
                        >
                          <g
                            style={{
                              transform: isHovered
                                ? 'scale(1.35)'
                                : isConnected
                                ? 'scale(1.15)'
                                : 'scale(1)',
                              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                          >
                            {/* Glow behind active node */}
                            {isHovered && (
                              <circle
                                r={24}
                                fill="url(#nodeActiveGlow)"
                                className={styles.pulseActive}
                              />
                            )}

                            {/* Node border/circle */}
                            <circle
                              r={18}
                              className={`${styles.nodeCircle} ${
                                isHovered || isConnected ? styles.nodeCircleActive : ''
                              }`}
                            />

                            {/* Tech Logo */}
                            <image
                              href={node.slug === 'amazonwebservices' ? 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg' : `https://cdn.simpleicons.org/${node.slug}`}
                              width={22}
                              height={22}
                              x={-11}
                              y={-11}
                              className={styles.techIconImage}
                            />

                            {/* Label */}
                            <text
                              y={30}
                              textAnchor="middle"
                              className={`${styles.nodeLabel} ${
                                isHovered || isConnected ? styles.nodeLabelActive : ''
                              }`}
                            >
                              {node.name}
                            </text>
                          </g>
                        </g>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* ─── RIGHT SIDE: INFO DETAILS PANEL ─── */}
        <div className={styles.infoColumn}>
          <AnimatePresence mode="wait">
            {hoveredNode && activeNodeData ? (
              <motion.div
                key="hover-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className={styles.infoCard}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.logoBadge}>
                    <img
                      src={activeNodeData.slug === 'amazonwebservices' ? 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg' : `https://cdn.simpleicons.org/${activeNodeData.slug}`}
                      alt={activeNodeData.name}
                      className={styles.headerLogo}
                    />
                  </div>
                  <div>
                    <span className={styles.nodeNumber}>
                      Node {String(allPositionedNodes.findIndex((n) => n.name === hoveredNode) + 1).padStart(2, '0')}
                    </span>
                    <h4 className={styles.techTitle}>{activeNodeData.name}</h4>
                    <div className={styles.categoryBadge}>
                      <span className={styles.badgeIndicator} />
                      <span className={styles.categoryText}>{activeNodeData.category}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.separator} />

                <p className={styles.sectionLabel}>Connects With</p>
                <div className={styles.connectionsGrid}>
                  {activeConnections.length > 0 ? (
                    activeConnections.map((conn) => {
                      const connData = allPositionedNodes.find((n) => n.name === conn);
                      return (
                        <div key={conn} className={styles.connectionBadge}>
                          {connData && (
                            <img
                              src={connData.slug === 'amazonwebservices' ? 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg' : `https://cdn.simpleicons.org/${connData.slug}`}
                              alt={conn}
                              className={styles.connectionLogo}
                            />
                          )}
                          <span>{conn}</span>
                        </div>
                      );
                    })
                  ) : (
                    <span className={styles.noConnections}>No defined connections</span>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="legend-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.legendContainer}
              >
                {/* Instruction Banner */}
                <div className={styles.instructionBanner}>
                  <div className={styles.pulseDot} />
                  <p className={styles.instructionText}>
                    Hover any technology node in the galaxy to freeze rotation and explore connections.
                  </p>
                </div>

                {/* Category Legends */}
                {[
                  { id: '01', title: 'Core Languages', sub: 'JavaScript, TypeScript, Python, Dart', orbit: '↻ Clockwise' },
                  { id: '02', title: 'Frameworks & Platforms', sub: 'React, Next.js, Node.js, Flutter, AWS', orbit: '↺ Counter-Clockwise' },
                  { id: '03', title: 'Tools & Utilities', sub: 'Docker, Supabase, GraphQL, Git, Tailwind...', orbit: '↻ Clockwise' },
                ].map((item, idx) => (
                  <div key={idx} className={styles.legendRow}>
                    <div className={styles.legendCircle}>
                      <span className={styles.legendId}>{item.id}</span>
                    </div>
                    <div className={styles.legendDetails}>
                      <div className={styles.legendMeta}>
                        <span className={styles.legendTitle}>{item.title}</span>
                        <span className={styles.legendOrbit}>{item.orbit}</span>
                      </div>
                      <p className={styles.legendSub}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
