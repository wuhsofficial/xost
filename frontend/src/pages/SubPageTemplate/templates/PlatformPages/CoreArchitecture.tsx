import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Server, Database, Cloud, Network, Shield, Cpu } from 'lucide-react';
import styles from './PlatformPages.module.css';

export default function CoreArchitecture({ pageData }) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Animated counters
  const [uptime, setUptime] = useState(0);
  const [latency, setLatency] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => (prev < 99.99 ? prev + 1.11 : 99.99));
      setLatency(prev => (prev < 50 ? prev + 2 : 50));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.platformPageWrapper}>
      {/* Parallax Hero */}
      <motion.div style={{ y: yParallax }} className={styles.parallaxHero}>
        <h2 className={styles.heroHeadline}>Built to scale from day one</h2>
        <p className={styles.heroSubhead}>Scalable cloud-native foundation</p>
      </motion.div>

      {/* Animated Architecture Flow */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>System Architecture</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode}>Client</div>
          <motion.div className={styles.flowLine} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          <div className={styles.flowNode}>CDN</div>
          <motion.div className={styles.flowLine} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
          <div className={styles.flowNode}>API Gateway</div>
          <motion.div className={styles.flowLine} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
          <div className={styles.flowNode}>Microservices</div>
          <motion.div className={styles.flowLine} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} />
          <div className={styles.flowNode}>Database</div>
        </div>
      </section>

      {/* Stats Counters */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{uptime.toFixed(2)}%</span>
          <span className={styles.statLabel}>Uptime SLA</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt;{Math.floor(latency)}ms</span>
          <span className={styles.statLabel}>Global Latency</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>12+</span>
          <span className={styles.statLabel}>Core Microservices</span>
        </div>
      </section>

      {/* Bento Grid */}
      <section className={styles.bentoSection}>
        <div className={styles.bentoGridLarge}>
          <motion.div className={styles.bentoCard} whileHover={{ y: -5 }}>
            <Cloud className={styles.bentoIcon} />
            <h4>Presentation Layer</h4>
            <p>Edge-rendered static assets and highly optimized SPA delivery through global CDN networks.</p>
          </motion.div>
          <motion.div className={styles.bentoCard} whileHover={{ y: -5 }}>
            <Cpu className={styles.bentoIcon} />
            <h4>Business Logic</h4>
            <p>Decoupled stateless microservices written in Go and Node.js, running on Kubernetes.</p>
          </motion.div>
          <motion.div className={styles.bentoCard} whileHover={{ y: -5 }}>
            <Database className={styles.bentoIcon} />
            <h4>Data Layer</h4>
            <p>Distributed PostgreSQL clusters with Redis caching layers for ultra-fast query resolution.</p>
          </motion.div>
          <motion.div className={styles.bentoCard} whileHover={{ y: -5 }}>
            <Shield className={styles.bentoIcon} />
            <h4>Infrastructure</h4>
            <p>Infrastructure-as-code using Terraform, providing immutable, zero-trust network zones.</p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Our Technology Stack</h3>
        <div className={styles.techStackGrid}>
          {['Docker', 'Kubernetes', 'Kafka', 'PostgreSQL', 'Redis', 'Terraform'].map(tech => (
            <motion.div key={tech} className={styles.techBadge} whileHover={{ scale: 1.05 }}>
              <Server size={18} />
              <span>{tech}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
