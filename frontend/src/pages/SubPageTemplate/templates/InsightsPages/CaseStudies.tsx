import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { ArrowRight, BarChart2, Zap, Clock, Database, Quote } from 'lucide-react';
import styles from './InsightsPages.module.css';

export default function CaseStudies({ pageData }) {
  const [activeTab, setActiveTab] = useState('All');

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#ff7b72', '#3fb950'],
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Infrastructure Cost', 'Deployment Time', 'Downtime Incidents'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { show: false } },
    theme: { mode: 'light' },
    tooltip: { theme: 'dark' }
  };
  const barSeries = [
    { name: 'Before XOST', data: [100, 80, 50] },
    { name: 'After XOST', data: [40, 20, 5] }
  ];

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['FinTech', 'Healthcare', 'E-commerce', 'Logistics', 'EdTech'],
    colors: ['#00FFFF', '#D946EF', '#667EEA', '#ff7b72', '#43E97B'],
    stroke: { show: false },
    theme: { mode: 'light' }
  };
  const donutSeries = [30, 25, 20, 15, 10];

  const cases = [
    { client: "GlobalPay Inc", ind: "FinTech", chal: "Legacy monolith causing 5sec transaction latency.", sol: "Migrated to Go microservices on AWS EKS.", out: "↓ 80% Latency" },
    { client: "MedixHealth", ind: "Healthcare", chal: "HIPAA non-compliant on-prem servers.", sol: "Cloud adoption with zero-trust network.", out: "100% Compliant" },
    { client: "ShopStream", ind: "E-commerce", chal: "Site crashing during Black Friday.", sol: "Serverless auto-scaling architecture.", out: "0 Downtime" },
    { client: "RouteOptima", ind: "Logistics", chal: "Manual route planning taking 6 hours/day.", sol: "AI predictive routing algorithm.", out: "↑ 3x Faster" },
    { client: "LearnHub", ind: "EdTech", chal: "High video streaming costs.", sol: "Multi-CDN routing optimization.", out: "↓ 40% Cost" },
    { client: "NeoBank", ind: "FinTech", chal: "Slow onboarding process.", sol: "RPA & OCR automated KYC.", out: "2min Onboarding" }
  ];

  const filteredCases = activeTab === 'All' ? cases : cases.filter(c => c.ind === activeTab);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>How we solved complex problems</h2>
        <p className={styles.heroSubhead}>Real results for real businesses.</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2rem', background: 'var(--card-surface)', padding: '1rem 2rem', borderRadius: '50px', border: '1px solid var(--card-border)', width: 'fit-content', margin: '2rem auto 0' }}>
          <div><strong style={{ color: '#00FFFF' }}>50+</strong> Case Studies</div>
          <div style={{ width: '1px', background: 'var(--card-border)' }}></div>
          <div><strong style={{ color: '#D946EF' }}>20+</strong> Industries</div>
          <div style={{ width: '1px', background: 'var(--card-border)' }}></div>
          <div><strong style={{ color: '#3fb950' }}>3x</strong> Avg ROI</div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.featuredCard} style={{ background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(217, 70, 239, 0.05))', border: '1px solid var(--accent-aqua)', display: 'block' }}>
          <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span className={styles.cardTag} style={{ background: 'var(--accent-aqua)', color: '#000', alignSelf: 'flex-start' }}>Featured Project (XOST Portfolio)</span>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', lineHeight: '1.2' }}>Dakhala — Pakistan's Unified University Admissions Platform</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Dakhala is a student-first web platform built to simplify the university admissions journey for Pakistani students. Designed to eliminate the confusion of scattered resources, it brings every critical admissions tool under one roof — free, fast, and built specifically for the Pakistani higher education landscape.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ color: '#ff7b72', marginBottom: '0.5rem', fontSize: '1.2rem' }}>The Problem</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Every year, hundreds of thousands of Pakistani students navigate a fragmented admissions process — consulting multiple websites for merit formulas, manually calculating aggregates with outdated weightages, tracking entry test schedules across disconnected sources, and guessing which universities they qualify for.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                <h4 style={{ color: '#3fb950', marginBottom: '0.5rem', fontSize: '1.2rem' }}>The Impact</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Dakhala removes the guesswork from one of the most consequential decisions in a young Pakistani's life. Developed under the XOST product portfolio as part of our commitment to building technology that creates real, measurable impact. Completely free and optimized for all devices.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>Core Platform Solutions:</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                <li><strong style={{ color: 'var(--accent-aqua)' }}>Aggregate Calculator:</strong> Instant, accurate merit calculation for 15+ universities including NUST, FAST-NUCES, and UET using official weightage formulas.</li>
                <li><strong style={{ color: 'var(--accent-aqua)' }}>Merit Tracker:</strong> Monitor standing across programs giving real-time clarity on admission probability.</li>
                <li><strong style={{ color: 'var(--accent-aqua)' }}>AI-Powered Recommendations:</strong> Intelligent, data-driven university and program recommendations tailored to student profiles.</li>
                <li><strong style={{ color: 'var(--accent-aqua)' }}>Entry Test Calendar:</strong> A unified timeline of all major Pakistani entry tests ensuring students never miss a critical deadline.</li>
              </ul>
            </div>

            <a href="https://www.dakhala.site/" target="_blank" rel="noopener noreferrer" className={styles.filterBtnActive} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', textDecoration: 'none' }}>
              View Live Project (dakhala.site) <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <div className={styles.filterBar}>
        {['All', 'FinTech', 'Healthcare', 'E-commerce', 'Logistics', 'EdTech'].map(tab => (
          <button 
            key={tab} 
            className={activeTab === tab ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className={styles.cardGrid}>
        {filteredCases.map((c, i) => (
          <motion.div key={i} className={styles.contentCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--text-primary)' }}>{c.client}</h3>
                <span className={styles.cardTag} style={{ color: '#D946EF', background: 'rgba(217, 70, 239, 0.1)' }}>{c.ind}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>Challenge:</strong> {c.chal}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><strong>Solution:</strong> {c.sol}</p>
              
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#3fb950' }}>{c.out}</span>
                <a href={`/case-studies/${c.client.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.html`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-aqua)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                  Read <ArrowRight size={14}/>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '4rem' }}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Client Industry Distribution</h3>
          <Chart options={donutOptions as any} series={donutSeries} type="donut" height={300} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Aggregate Outcomes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', height: '100%' }}>
            <div style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Zap color="var(--accent-aqua)" style={{ marginBottom: '0.5rem' }}/>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>3x Faster</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Deployment Speed</span>
            </div>
            <div style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <BarChart2 color="#D946EF" style={{ marginBottom: '0.5rem' }}/>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>60% Cut</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Infrastructure Cost</span>
            </div>
            <div style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Clock color="#43E97B" style={{ marginBottom: '0.5rem' }}/>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>99.99%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Uptime Achieved</span>
            </div>
            <div style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Database color="#667EEA" style={{ marginBottom: '0.5rem' }}/>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>10M+</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Records Migrated</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '4rem', padding: '4rem', background: '#0a0f1e', borderRadius: '16px', border: '1px solid var(--card-border)', textAlign: 'center', position: 'relative' }}
      >
        <Quote size={48} color="var(--accent-aqua)" style={{ position: 'absolute', top: '1rem', left: '1rem', opacity: 0.2 }} />
        <p style={{ fontSize: '1.8rem', fontStyle: 'italic', color: '#c9d1d9', maxWidth: '800px', margin: '0 auto' }}>
          "The team at XOST didn't just write code; they fundamentally transformed how our business operates. The ROI was apparent within the first 3 months of deployment."
        </p>
        <div style={{ marginTop: '2rem' }}>
          <p style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Marcus Wright</p>
          <p style={{ color: 'var(--accent-aqua)' }}>CTO, GlobalPay Inc.</p>
        </div>
      </motion.div>
    </div>
  );
}
