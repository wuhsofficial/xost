import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { ShieldCheck, Lock, UserCheck, Eye, Key, FileText } from 'lucide-react';
import styles from './PlatformPages.module.css';

export default function SecurityCompliance({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Shield/Lock animation
    fetch("https://assets5.lottiefiles.com/packages/lf20_q5pk6p1k.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const radarOptions = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['Encryption', 'Access Control', 'Audit Logging', 'Network Security', 'Identity Mgmt', 'Threat Detection'],
    stroke: { width: 2, colors: ['#00FFFF'] },
    fill: { opacity: 0.2, colors: ['#00FFFF'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#00FFFF', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  
  const radarSeries = [{ name: 'Security Coverage', data: [98, 95, 100, 92, 96, 99] }];

  return (
    <div className={styles.platformPageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 150 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Enterprise-grade data protection</h2>
      </div>

      <section className={styles.badgesSection}>
        <div className={styles.complianceGrid}>
          {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant', 'HIPAA Ready'].map(badge => (
            <motion.div key={badge} className={styles.badgeCard} whileHover={{ scale: 1.05 }}>
              <ShieldCheck size={24} color="#00FFFF" />
              <span>{badge}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitLeft}>
          <h3 className={styles.sectionTitle}>Security Dimensions</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
        </div>
        
        <div className={styles.splitRight}>
          <h3 className={styles.sectionTitle}>Defense Architecture</h3>
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>256-bit AES Encryption</div>
            <div className={styles.progressBarBg}>
              <motion.div className={styles.progressBarFill} initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
            </div>
            
            <div className={styles.progressLabel}>Zero-trust Architecture</div>
            <div className={styles.progressBarBg}>
              <motion.div className={styles.progressBarFill} initial={{ width: 0 }} whileInView={{ width: '95%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }} />
            </div>
            
            <div className={styles.progressLabel}>End-to-end TLS</div>
            <div className={styles.progressBarBg}>
              <motion.div className={styles.progressBarFill} initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.4 }} />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Threat Response Timeline</h3>
        <div className={styles.timelineScroll}>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineItem}>
              <div className={styles.timeDot}></div>
              <h4>0s</h4>
              <p>Threat Detection via AI</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timeDot}></div>
              <h4>&lt;1s</h4>
              <p>Automated Network Isolation</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timeDot}></div>
              <h4>5s</h4>
              <p>Payload Inspection</p>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timeDot}></div>
              <h4>60s</h4>
              <p>Threat Resolution & Logging</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bentoSection}>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Eye className={styles.bentoIcon} />
            <h4>Penetration Testing</h4>
            <p>Annual third-party audits and continuous automated pen-testing.</p>
          </div>
          <div className={styles.bentoCard}>
            <UserCheck className={styles.bentoIcon} />
            <h4>Role-based Access Control</h4>
            <p>Granular IAM policies for your entire organization.</p>
          </div>
          <div className={styles.bentoCard}>
            <FileText className={styles.bentoIcon} />
            <h4>Audit Logs</h4>
            <p>Immutable ledger of all administrative and system actions.</p>
          </div>
          <div className={styles.bentoCard}>
            <Key className={styles.bentoIcon} />
            <h4>2FA & SSO</h4>
            <p>SAML, OAuth2, and hardware token support built-in.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
