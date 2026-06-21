import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { GraduationCap, BookOpen, Code, Terminal, Server, Smartphone, Cpu, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './ServicesPages.module.css';

export default function AcademicFYP({ pageData }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "Will my project be plagiarism-free?", a: "Yes, 100%. We write all code from scratch and provide a Turnitin/plagiarism report for the documentation." },
    { q: "Do you provide documentation and viva prep?", a: "Absolutely. We provide full IEEE format documentation, SRS, architecture diagrams, and a mock viva session to prepare you." },
    { q: "Can I request changes after delivery?", a: "Yes, our Premium tier includes unlimited revisions until your supervisor approves the final deliverable." }
  ];

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#D946EF', '#00FFFF'],
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Topic Selection', 'Proposal', 'Development', 'Documentation', 'Final Prep'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' }
  };
  const barSeries = [
    { name: 'Typical Student Timeline (Weeks)', data: [4, 3, 16, 6, 4] },
    { name: 'XOST Accelerated Delivery (Weeks)', data: [1, 1, 6, 2, 1] }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>End-to-end Final Year Project support</h2>
        <p className={styles.heroSubhead}>From ideation to A-grade defense.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>200+</span>
          <span className={styles.statLabel}>FYPs Completed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>100%</span>
          <span className={styles.statLabel}>On-time Delivery</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>A+</span>
          <span className={styles.statLabel}>Avg Grade Success</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Our Streamlined Process</h3>
        <div className={styles.flowContainer}>
          {['Topic', 'Proposal', 'Development', 'Testing', 'Docs', 'Defense'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF', background: 'rgba(217, 70, 239, 0.1)' }}>{step}</div>
              {i < arr.length - 1 && <div className={styles.flowLine} style={{ background: '#D946EF' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Timeline Comparison</h3>
        <Chart options={barOptions as any} series={barSeries} type="bar" height={300} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Domain Expertise</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Cpu className={styles.bentoIcon} />
            <h4>AI / Machine Learning</h4>
            <p>Computer vision, NLP, and predictive models.</p>
          </div>
          <div className={styles.bentoCard}>
            <Server className={styles.bentoIcon} />
            <h4>Blockchain & Web3</h4>
            <p>Smart contracts, DApps, and consensus algorithms.</p>
          </div>
          <div className={styles.bentoCard}>
            <Smartphone className={styles.bentoIcon} />
            <h4>Mobile & IoT</h4>
            <p>Hardware integration and cross-platform apps.</p>
          </div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Pricing Tiers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--text-primary)' }}>Standard Code</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Source code + Setup instructions.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--accent-aqua)', borderRadius: '8px', background: 'rgba(0, 255, 255, 0.05)' }}>
              <h4 style={{ color: 'var(--accent-aqua)' }}>Premium (Recommended)</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Code + Full Docs + Presentation + Viva Prep.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>FAQ</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--card-border)', borderRadius: '8px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'space-between', color: '#fff', textAlign: 'left', background: 'var(--card-surface)' }}
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--card-border)', color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
