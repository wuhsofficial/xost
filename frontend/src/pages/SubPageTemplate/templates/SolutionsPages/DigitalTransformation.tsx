import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Network, CloudCog, ArrowRight, UserCheck, Smartphone, Settings } from 'lucide-react';
import styles from './SolutionsPages.module.css';

export default function DigitalTransformation({ pageData }) {
  const radarOptions: any = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['Strategy', 'Culture', 'Technology', 'Operations', 'Data', 'Customer Exp'],
    stroke: { width: 2, colors: ['#00FFFF'] },
    fill: { opacity: 0.2, colors: ['#00FFFF'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#00FFFF', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  const radarSeries = [{ name: 'Digital Maturity', data: [90, 80, 95, 85, 100, 90] }];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Reimagine your digital capabilities</h2>
        <p className={styles.heroSubhead}>From legacy silos to a unified digital-first organization.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>500+</span>
          <span className={styles.statLabel}>Businesses Transformed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>3x</span>
          <span className={styles.statLabel}>Avg Efficiency Gain</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>70%</span>
          <span className={styles.statLabel}>Cost Reduction in Ops</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Transformation Journey</h3>
        <div className={styles.flowContainer}>
          {['Legacy Systems', 'Assessment', 'Strategy', 'Implementation', 'Digital-first'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={styles.flowNode}>{step}</div>
              {i < arr.length - 1 && <div className={styles.flowLine} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Digital Maturity Score</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Workflow Evolution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #ff7b72', borderRadius: '8px', background: 'rgba(255, 123, 114, 0.1)' }}>
              <h4 style={{ color: '#ff7b72' }}>Old Manual Workflow</h4>
              <p>Paper trails, disjointed email chains, and localized Excel sheets leading to data loss and delays.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #00FFFF', borderRadius: '8px', background: 'rgba(0, 255, 255, 0.1)' }}>
              <h4 style={{ color: '#00FFFF' }}>Fully Digitized Workflow</h4>
              <p>Automated cloud triggers, centralized data lakes, and real-time dashboard reporting.</p>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Transformation Focus Areas</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <CloudCog className={styles.bentoIcon} />
            <h4>Cloud Adoption</h4>
            <p>Migrate infrastructure for global scalability.</p>
          </div>
          <div className={styles.bentoCard}>
            <Settings className={styles.bentoIcon} />
            <h4>Process Digitization</h4>
            <p>Automate repetitive operational tasks.</p>
          </div>
          <div className={styles.bentoCard}>
            <UserCheck className={styles.bentoIcon} />
            <h4>Customer Experience</h4>
            <p>Omnichannel digital touchpoints for users.</p>
          </div>
        </div>
      </section>

      <motion.div 
        className={styles.parallaxSection}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 10px rgba(0,0,0,0.1)' 
        }}>
          "The future belongs to those who digitize today."
        </h2>
      </motion.div>
    </div>
  );
}
