import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { ShieldAlert, ShieldCheck, Lock, Eye, AlertTriangle, Activity } from 'lucide-react';
import styles from './ServicesPages.module.css';

export default function CyberSecurity({ pageData }) {
  const [lottieData, setLottieData] = useState(null);
  const [threats, setThreats] = useState(10452);

  useEffect(() => {
    // Shield lottie
    fetch("https://assets5.lottiefiles.com/packages/lf20_q5pk6p1k.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
      
    const interval = setInterval(() => {
      setThreats(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const radarOptions = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['Perimeter Defense', 'Identity & Access', 'Data Protection', 'Threat Intel', 'Incident Response', 'Compliance'],
    stroke: { width: 2, colors: ['#43E97B'] },
    fill: { opacity: 0.2, colors: ['#43E97B'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#43E97B', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  const radarSeries = [{ name: 'Security Posture', data: [98, 95, 100, 92, 96, 99] }];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 150 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Secure boundaries against threats</h2>
        <p className={styles.heroSubhead}>Proactive defense and comprehensive risk management.</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 75, 75, 0.1)', border: '1px solid rgba(255, 75, 75, 0.3)', padding: '1rem 2rem', borderRadius: '50px' }}>
          <Activity color="#ff4b4b" className={styles.pulseIcon} />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4b4b' }}>{threats.toLocaleString()}</span>
          <span style={{ color: 'var(--text-secondary)' }}>Threats Blocked This Month</span>
        </div>
      </div>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Security Posture</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
        </div>
        
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Defense Metrics</h3>
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>Threat Detection Rate (99.8%)</div>
            <div className={styles.progressBarBg}>
              <motion.div className={styles.progressBarFill} style={{ background: '#43E97B' }} initial={{ width: 0 }} whileInView={{ width: '99.8%' }} viewport={{ once: true }} transition={{ duration: 1 }} />
            </div>
            
            <div className={styles.progressLabel}>Mean Response Time (&lt; 15 min)</div>
            <div className={styles.progressBarBg}>
              <motion.div className={styles.progressBarFill} style={{ background: '#D946EF' }} initial={{ width: 0 }} whileInView={{ width: '95%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} />
            </div>
            
            <div className={styles.progressLabel}>Zero Breach Guarantee (100%)</div>
            <div className={styles.progressBarBg}>
              <motion.div className={styles.progressBarFill} style={{ background: '#00FFFF' }} initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Incident Response Timeline</h3>
        <div className={styles.flowContainer}>
          {['Detect', 'Contain', 'Eradicate', 'Recover', 'Post-mortem'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={styles.flowNode} style={{ borderColor: '#43E97B', color: '#43E97B', background: 'rgba(67, 233, 123, 0.1)' }}>{step}</div>
              {i < arr.length - 1 && <div className={styles.flowLine} style={{ background: '#43E97B' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Compliance & Certifications</h3>
        <div className={styles.techStackGrid} style={{ justifyContent: 'center' }}>
          {['ISO 27001', 'SOC 2 Type II', 'GDPR', 'PCI-DSS', 'HIPAA'].map(badge => (
            <div key={badge} className={styles.techBadge} style={{ fontSize: '1rem', padding: '0.8rem 1.5rem' }}>
              <ShieldCheck size={18} color="#43E97B" /> {badge}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Services</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <ShieldAlert className={styles.bentoIcon} />
            <h4>Penetration Testing</h4>
            <p>Simulated attacks to identify and patch vulnerabilities before they are exploited.</p>
          </div>
          <div className={styles.bentoCard}>
            <Eye className={styles.bentoIcon} />
            <h4>SOC as a Service</h4>
            <p>24/7/365 monitoring and rapid incident response by our elite security team.</p>
          </div>
          <div className={styles.bentoCard}>
            <Lock className={styles.bentoIcon} />
            <h4>IAM Solutions</h4>
            <p>Identity and access management ensuring zero-trust architecture.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
