import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap, Code, Terminal, Server, Cpu } from 'lucide-react';
import styles from './CareersPages.module.css';

const pathData = [
  { level: 'Level 1', role: 'Junior Engineer', icon: <Terminal size={32} color="#00FFFF" />, desc: 'Focuses on learning the codebase, shipping small features, and mastering our tech stack.' },
  { level: 'Level 2', role: 'Mid-Level Engineer', icon: <Code size={32} color="#D946EF" />, desc: 'Owns end-to-end features, mentors juniors, and begins participating in architecture discussions.' },
  { level: 'Level 3', role: 'Senior Engineer', icon: <Server size={32} color="#3fb950" />, desc: 'Architects large systems, drives technical decisions, and ensures high performance across the product.' },
  { level: 'Level 4', role: 'Staff Engineer', icon: <Cpu size={32} color="#FFD700" />, desc: 'Sets technical direction for multiple teams, solves the hardest engineering problems, and impacts company-wide infrastructure.' }
];

export default function HiringPath() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader} style={{ background: 'radial-gradient(circle at center, rgba(63, 185, 80, 0.1) 0%, transparent 70%)' }}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'linear-gradient(90deg, #3fb950, #00FFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Engineering Progression
        </motion.h1>
        <p className={styles.heroSubhead}>
          We believe in transparent career ladders. At XOST, your growth is tied to your impact, not your tenure.
        </p>
      </header>

      <section className={styles.section}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {pathData.map((node, i) => (
            <motion.div 
              key={i}
              className={styles.bentoCard}
              style={{ display: 'flex', alignItems: 'center', gap: '2rem', overflow: 'visible' }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px' }}>
                {node.icon}
                <span style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{node.level}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>{node.role}</h3>
                <p className={styles.bentoDesc}>{node.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '3rem' }}>
        <div className={styles.bentoGrid}>
          <div className={styles.bentoCard}>
            <Zap size={32} color="#FFD700" style={{ marginBottom: '1rem' }} />
            <h3 className={styles.bentoTitle}>Fast-Track Growth</h3>
            <p className={styles.bentoDesc}>If you perform at the next level, you get promoted to the next level. We run bi-annual performance cycles to ensure high-achievers are recognized instantly.</p>
          </div>
          <div className={styles.bentoCard}>
            <TrendingUp size={32} color="#00FFFF" style={{ marginBottom: '1rem' }} />
            <h3 className={styles.bentoTitle}>Individual Contributor Track</h3>
            <p className={styles.bentoDesc}>You don't have to become a manager to grow. Our IC track goes all the way up to Principal and Distinguished levels, with compensation matching VP of Engineering.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
