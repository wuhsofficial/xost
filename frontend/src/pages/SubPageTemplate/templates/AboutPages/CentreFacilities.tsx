import React, { useState } from 'react';
import { Network, Server, BrainCircuit, Users, ShieldAlert, Leaf, MapPin, ArrowRight } from 'lucide-react';
import styles from './AboutPages.module.css';

export default function CentreFacilities({ pageData }) {
  const [activeZone, setActiveZone] = useState(null);

  const galleryImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
  ];

  const zoneInfo = {
    dev: { title: 'Development Floor', desc: 'Open-plan agile workspaces with ergonomic setups for 150+ engineers.' },
    design: { title: 'Design Studio', desc: 'Creative zone equipped with 4K displays and interactive whiteboards.' },
    meeting: { title: 'Meeting Rooms', desc: 'Acoustically treated rooms with immersive telepresence systems.' },
    server: { title: 'Server Room', desc: 'On-premise edge computing nodes with Tier-III redundancy.' },
    cafe: { title: 'Cafeteria', desc: 'Relaxation zone, unlimited coffee, and collaborative break areas.' }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>State-of-the-art infrastructure</h2>
        <p className={styles.heroSubhead}>Where world-class engineering meets optimal working environments.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>15K</span>
          <span className={styles.statLabel}>Sq Ft Campus</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>200+</span>
          <span className={styles.statLabel}>Workstations</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Dedicated Labs</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>99.9%</span>
          <span className={styles.statLabel}>Power Uptime</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Campus Gallery</h3>
        <div className={styles.masonryGrid}>
          {galleryImages.map((src, idx) => (
            <div key={idx} className={styles.masonryItem}>
              <img src={src} alt="Office interior" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Interactive Floor Plan</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Click on a zone to view details.</p>
          
          <div className={styles.floorPlanContainer}>
            <svg viewBox="0 0 400 300" width="100%" height="100%">
              <defs>
                <linearGradient id="svgTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--text-primary)" />
                  <stop offset="100%" stopColor="var(--accent-aqua)" />
                </linearGradient>
              </defs>
              
              {/* Outer Boundary */}
              <rect x="10" y="10" width="380" height="280" fill="none" stroke="var(--card-border)" strokeWidth="4" />
              
              {/* Dev Floor */}
              <rect x="20" y="20" width="200" height="180" className={styles.floorZone} onClick={() => setActiveZone('dev')} />
              <text x="120" y="110" fill="url(#svgTextGrad)" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">Dev Floor</text>

              {/* Design Studio */}
              <rect x="230" y="20" width="150" height="100" className={styles.floorZone} onClick={() => setActiveZone('design')} />
              <text x="305" y="70" fill="url(#svgTextGrad)" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">Design Studio</text>

              {/* Meeting Rooms */}
              <rect x="230" y="130" width="150" height="70" className={styles.floorZone} onClick={() => setActiveZone('meeting')} />
              <text x="305" y="170" fill="url(#svgTextGrad)" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">Meeting</text>

              {/* Server Room */}
              <rect x="20" y="210" width="100" height="70" className={styles.floorZone} onClick={() => setActiveZone('server')} />
              <text x="70" y="250" fill="url(#svgTextGrad)" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">Servers</text>

              {/* Cafeteria */}
              <rect x="130" y="210" width="250" height="70" className={styles.floorZone} onClick={() => setActiveZone('cafe')} />
              <text x="255" y="250" fill="url(#svgTextGrad)" fontSize="14" fontWeight="bold" textAnchor="middle" pointerEvents="none">Cafeteria</text>
            </svg>
          </div>

          {activeZone && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0, 255, 255, 0.1)', borderLeft: '4px solid #00FFFF', borderRadius: '4px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#00FFFF' }}>{zoneInfo[activeZone].title}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>{zoneInfo[activeZone].desc}</p>
            </div>
          )}
        </div>

        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Facility Features</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Network color="#00FFFF" /><div><strong>10Gbps Fiber Network</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Triple redundant ISP backbones.</span></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Server color="#00FFFF" /><div><strong>Dedicated DevOps Lab</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>On-prem hardware for testing.</span></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <BrainCircuit color="#00FFFF" /><div><strong>AI Research Lab</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Equipped with NVIDIA A100 clusters.</span></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <ShieldAlert color="#00FFFF" /><div><strong>24/7 Security</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Biometric access and CCTV coverage.</span></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Leaf color="#00FFFF" /><div><strong>Green Energy</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Solar-powered with LEED certification.</span></div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Global Headquarters</h3>
        <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
          {/* Static Styled Map Placeholder */}
          <div style={{ width: '100%', height: '100%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} color="#D946EF" style={{ marginBottom: '1rem' }} />
              <h3 style={{ background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lahore, Pakistan</h3>
              <p style={{ background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>Tech Hub, Main Boulevard</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--gradient-accent)', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Want to see it for yourself?</h3>
        <p style={{ margin: '0 0 1.5rem 0', color: 'rgba(255,255,255,0.9)' }}>Schedule a visit or request a comprehensive virtual tour of our campus.</p>
        <button style={{ background: '#fff', color: '#000', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          Request Virtual Tour <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
