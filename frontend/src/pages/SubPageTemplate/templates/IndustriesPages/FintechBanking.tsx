import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { ShieldCheck, Smartphone, Lock, Search, Database, CreditCard, Shield, UserCheck, Key, LockKeyhole } from 'lucide-react';
import styles from './IndustriesPages.module.css';

export default function FintechBanking({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Flowing financial data / nodes Lottie
    fetch("https://assets2.lottiefiles.com/packages/lf20_kdx6cani.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const radarOptions = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['PCI-DSS', 'GDPR', 'AML', 'KYC', 'SOX', 'ISO 27001'],
    stroke: { width: 2, colors: ['#00FFFF'] },
    fill: { opacity: 0.2, colors: ['#00FFFF'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#00FFFF', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  const radarSeries = [{ name: 'Compliance Coverage', data: [100, 100, 95, 100, 90, 100] }];

  const lineOptions = {
    chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
    colors: ['#D946EF'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' }
  };
  const lineSeries = [{ name: 'Transaction Volume (Millions)', data: [12, 15, 18, 25, 30, 45, 50, 65, 80, 95, 120, 150] }];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Secure financial infrastructure</h2>
        <p className={styles.heroSubhead}>High-frequency, compliant, and infinitely scalable banking systems.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>50+</span>
          <span className={styles.statLabel}>Fintech Clients</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>$2B+</span>
          <span className={styles.statLabel}>Processed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>99.99%</span>
          <span className={styles.statLabel}>Uptime SLA</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt; 200ms</span>
          <span className={styles.statLabel}>Tx Latency</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Secure Transaction Flow</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode}><Smartphone size={16}/> User App</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Shield size={16}/> API Gateway</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Database size={16}/> Core Banking</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Lock size={16}/> Ledger</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Search size={16}/> Audit Log</div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Compliance Radar</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Transaction Volume Growth</h3>
          <Chart options={lineOptions as any} series={lineSeries} type="line" height={350} />
        </div>
      </div>

      <div className={styles.highlightStrip} style={{ margin: '2rem 0', color: 'var(--text-primary)' }}>
        <LockKeyhole size={24} style={{ verticalAlign: 'middle', marginRight: '10px', color: 'var(--accent-aqua)' }} />
        End-to-end encryption on every transaction (AES-256 & TLS 1.3)
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Regulatory Compliance</h3>
        <div className={styles.techStackGrid} style={{ justifyContent: 'center' }}>
          {['PCI-DSS Level 1', 'GDPR Compliant', 'AML Directives', 'ISO 27001', 'SOC 2 Type II'].map(badge => (
            <div key={badge} className={styles.techBadge} style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', borderColor: 'var(--accent-aqua)', color: 'var(--text-primary)', background: 'var(--card-surface)' }}>
              <ShieldCheck size={18} color="var(--accent-aqua)" /> {badge}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Solutions</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Smartphone className={styles.bentoIcon} />
            <h4>Digital Banking Platform</h4>
            <p>White-label neobank infrastructure with mobile-first experiences.</p>
          </div>
          <div className={styles.bentoCard}>
            <CreditCard className={styles.bentoIcon} />
            <h4>Payment Gateway Integration</h4>
            <p>Multi-currency routing with dynamic 3D secure fallback.</p>
          </div>
          <div className={styles.bentoCard}>
            <UserCheck className={styles.bentoIcon} />
            <h4>KYC & AML Automation</h4>
            <p>AI-driven identity verification taking less than 2 minutes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
