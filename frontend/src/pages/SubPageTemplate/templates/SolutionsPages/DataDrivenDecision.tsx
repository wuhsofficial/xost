import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { LineChart, Search, Target, Compass, Zap, Database } from 'lucide-react';
import styles from './SolutionsPages.module.css';

export default function DataDrivenDecision({ pageData }) {
  const [lottieData, setLottieData] = useState(null);
  const [activeTab, setActiveTab] = useState('Predictive');

  useEffect(() => {
    // Analytics/Data Lottie
    fetch("https://assets3.lottiefiles.com/packages/lf20_puciaact.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const lineOptions: any = {
    chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF', '#D946EF', '#3fb950'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' }
  };
  const lineSeries = [
    { name: 'Revenue Growth', data: [10, 15, 25, 45, 80] },
    { name: 'Customer Retention', data: [60, 65, 75, 85, 92] },
    { name: 'Operational Efficiency', data: [40, 50, 70, 85, 95] }
  ];

  const radarOptions: any = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['Reporting', 'Monitoring', 'Analysis', 'Prediction', 'Prescription', 'Automation'],
    stroke: { width: 2, colors: ['#667EEA'] },
    fill: { opacity: 0.2, colors: ['#667EEA'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#667EEA', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  const radarSeries = [{ name: 'Maturity Level', data: [100, 100, 95, 80, 70, 60] }];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 180 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Empower your leadership teams</h2>
        <p className={styles.heroSubhead}>Move from gut feelings to deterministic, data-backed strategies.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>10x</span>
          <span className={styles.statLabel}>Faster Decisions</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>40%</span>
          <span className={styles.statLabel}>More Predictable Revenue</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Real-time</span>
          <span className={styles.statLabel}>Data Dashboards</span>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Business Outcomes Post-Adoption</h3>
          <Chart options={lineOptions as any} series={lineSeries} type="line" height={300} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Decision Intelligence Maturity</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={300} />
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Analytics Evolution</h3>
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
          {['Descriptive', 'Predictive', 'Prescriptive'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                background: activeTab === tab ? 'var(--gradient-accent)' : 'transparent', 
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--card-border)',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {tab} Analytics
            </button>
          ))}
        </div>
        
        <div style={{ padding: '2rem', background: 'var(--card-surface)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          {activeTab === 'Descriptive' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 style={{ color: 'var(--accent-aqua)', fontSize: '1.2rem' }}>What happened?</h4>
              <p style={{ marginTop: '1rem' }}>Historical reporting, standardized dashboards, and data warehousing. Understand past performance metrics clearly.</p>
            </motion.div>
          )}
          {activeTab === 'Predictive' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 style={{ color: '#D946EF', fontSize: '1.2rem' }}>What will happen?</h4>
              <p style={{ marginTop: '1rem' }}>Machine learning models forecasting sales, predicting customer churn, and anticipating supply chain disruptions before they occur.</p>
            </motion.div>
          )}
          {activeTab === 'Prescriptive' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 style={{ color: '#43E97B', fontSize: '1.2rem' }}>What should we do?</h4>
              <p style={{ marginTop: '1rem' }}>Optimization algorithms and AI recommending exact pricing changes, marketing budget reallocations, and strategic actions.</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>High-Impact Use Cases</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <LineChart className={styles.bentoIcon} />
            <h4>Sales Forecasting</h4>
            <p>Accurately predict Q4 revenue based on historical patterns and market signals.</p>
          </div>
          <div className={styles.bentoCard}>
            <Target className={styles.bentoIcon} />
            <h4>Marketing Attribution</h4>
            <p>Know exactly which ad channel drives the highest lifetime value (LTV).</p>
          </div>
          <div className={styles.bentoCard}>
            <Zap className={styles.bentoIcon} />
            <h4>Churn Prediction</h4>
            <p>Identify at-risk customers 30 days before they cancel their subscriptions.</p>
          </div>
        </div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '2rem', padding: '3rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}
      >
        <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#c9d1d9' }}>
          "Since partnering with XOST for data analytics, our executive team no longer argues over opinions. We look at the dashboard, understand the reality, and execute. It's completely transformed our corporate culture."
        </p>
        <p style={{ marginTop: '1rem', fontWeight: 'bold', color: 'var(--accent-aqua)' }}>- Sarah Jenkins, COO at TechCorp</p>
      </motion.div>
    </div>
  );
}
