import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { HeartPulse, FileText, Activity, ShieldCheck, CheckCircle2, User, Database, LineChart, Brain } from 'lucide-react';
import styles from './IndustriesPages.module.css';

export default function HealthcareLifeScience({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Heartbeat/Medical Lottie
    fetch("https://assets9.lottiefiles.com/packages/lf20_5n8yxz.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const radarOptions = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['Patient Safety', 'Data Privacy', 'Interoperability', 'Clinical Efficiency', 'Compliance', 'AI Diagnostics'],
    stroke: { width: 2, colors: ['#ff7b72'] },
    fill: { opacity: 0.18, colors: ['#ff7b72'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#ff7b72', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  const radarSeries = [{ name: 'Tech Coverage', data: [100, 100, 90, 85, 100, 80] }];

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#ff7b72', '#00b4d8'],
    plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } },
    dataLabels: { enabled: true, offsetX: 20, style: { colors: ['#334155'] } },
    xaxis: { categories: ['Admissions', 'Billing', 'Pharmacy', 'Radiology', 'Outpatient'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    legend: { labels: { colors: '#334155' } },
    title: { text: 'Time Saved per Task (Minutes)', style: { color: '#334155' } }
  };
  const barSeries = [
    { name: 'Manual Paperwork', data: [45, 60, 30, 40, 35] },
    { name: 'Digital Automated', data: [5, 10, 5, 15, 8] }
  ];

  const hipaaChecklist = [
    "PHI Encryption at Rest (AES-256)",
    "PHI Encryption in Transit (TLS 1.3)",
    "Role-Based Access Control (RBAC)",
    "Immutable Audit Logging",
    "Automatic Session Timeouts"
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 180 }} />}
        </div>
        <h2 className={styles.heroHeadline}>HIPAA-compliant medical software</h2>
        <p className={styles.heroSubhead}>Empowering providers with interoperable, secure clinical systems.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#ff7b72' }}>30+</span>
          <span className={styles.statLabel}>Healthcare Clients</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#ff7b72' }}>5M+</span>
          <span className={styles.statLabel}>Patient Records</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#ff7b72' }}>100%</span>
          <span className={styles.statLabel}>HIPAA Compliant</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#ff7b72' }}>40%</span>
          <span className={styles.statLabel}>Less Admin Overhead</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Interoperable Data Flow</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode}><User size={16}/> Patient</div>
          <div className={styles.flowLine} style={{ background: '#ff7b72' }} />
          <div className={styles.flowNode}><FileText size={16}/> EHR</div>
          <div className={styles.flowLine} style={{ background: '#ff7b72' }} />
          <div className={styles.flowNode}><Database size={16}/> Analytics Engine</div>
          <div className={styles.flowLine} style={{ background: '#ff7b72' }} />
          <div className={styles.flowNode}><LineChart size={16}/> Clinical Dash</div>
          <div className={styles.flowLine} style={{ background: '#ff7b72' }} />
          <div className={styles.flowNode}><Brain size={16}/> Decision Support</div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Healthcare Tech Radar</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Efficiency Improvements</h3>
          <Chart options={barOptions as any} series={barSeries} type="bar" height={350} />
        </div>
      </div>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.splitCard} style={{ background: 'rgba(255, 123, 114, 0.05)', borderColor: 'rgba(255, 123, 114, 0.3)' }}>
          <h3 className={styles.sectionTitle} style={{ borderBottomColor: 'rgba(255, 123, 114, 0.3)' }}>HIPAA Architecture Checklist</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {hipaaChecklist.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CheckCircle2 color="#ff7b72" />
                <span style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Regulatory Standards</h3>
          <div className={styles.techStackGrid}>
            {['HIPAA', 'HL7 v2/v3', 'FHIR R4', 'FDA 21 CFR Part 11', 'GDPR for EU'].map(badge => (
              <div key={badge} className={styles.techBadge} style={{ fontSize: '1rem', padding: '0.8rem', borderColor: '#ff7b72', color: '#ff7b72' }}>
                <ShieldCheck size={18} /> {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Core Solutions</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Activity className={styles.bentoIcon} style={{ color: '#ff7b72' }} />
            <h4>Telemedicine Platforms</h4>
            <p>WebRTC-based HD video consulting with integrated e-prescriptions.</p>
          </div>
          <div className={styles.bentoCard}>
            <FileText className={styles.bentoIcon} style={{ color: '#ff7b72' }} />
            <h4>EHR / EMR Integrations</h4>
            <p>Custom APIs linking Epic, Cerner, and legacy hospital systems seamlessly.</p>
          </div>
          <div className={styles.bentoCard}>
            <Brain className={styles.bentoIcon} style={{ color: '#ff7b72' }} />
            <h4>Medical Imaging AI</h4>
            <p>Computer vision models to assist radiologists with anomaly detection.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
