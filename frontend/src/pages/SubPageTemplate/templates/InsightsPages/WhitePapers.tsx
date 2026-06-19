import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { FileText, Download, Lock, CheckCircle, Search, Layers, BarChart2, BookOpen, ArrowRight } from 'lucide-react';
import styles from './InsightsPages.module.css';

export default function WhitePapers({ pageData }) {
  const [lottieData, setLottieData] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    // Document/Research lottie
    fetch("https://assets8.lottiefiles.com/packages/lf20_1idqlwjd.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const papers = [
    { title: "The State of AI in Enterprise 2026", tag: "AI", pages: 42, date: "Nov 2025", desc: "A comprehensive analysis of how Fortune 500s are integrating LLMs.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600" },
    { title: "Zero Trust Migration Strategy", tag: "Security", pages: 28, date: "Oct 2025", desc: "Step-by-step methodology for moving from perimeter defense to zero trust.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" },
    { title: "Cloud Cost Benchmarks", tag: "Cloud", pages: 35, date: "Sep 2025", desc: "Industry averages and strategies for optimizing AWS, Azure, and GCP spend.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" },
    { title: "RPA ROI Calculator Guide", tag: "Automation", pages: 15, date: "Aug 2025", desc: "Formulas and frameworks for projecting returns on robotic process automation.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" },
    { title: "Building Modern Data Lakes", tag: "Data", pages: 50, date: "Jul 2025", desc: "Architecture patterns for scalable, high-throughput analytics pipelines.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" },
    { title: "Digital Maturity Index", tag: "Transformation", pages: 22, date: "Jun 2025", desc: "A self-assessment tool for evaluating your organization's digital readiness.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" }
  ];

  const filteredPapers = activeTab === 'All' ? papers : papers.filter(p => p.tag === activeTab);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 180 }} />}
        </div>
        <h2 className={styles.heroHeadline}>In-depth research and methodologies</h2>
        <p className={styles.heroSubhead}>Proprietary insights backed by hard data.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>30+</span>
          <span className={styles.statLabel}>Research Papers</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>500+</span>
          <span className={styles.statLabel}>Pages of Expertise</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>10K+</span>
          <span className={styles.statLabel}>Total Downloads</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.featuredCard}>
          <div style={{ background: 'url("https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800") center/cover', minHeight: '300px' }}></div>
          <div className={styles.cardBody} style={{ justifyContent: 'center' }}>
            <span className={styles.cardTag}>Premium Report</span>
            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '1rem 0' }}>The Future of Serverless Computing (2026 Edition)</h3>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <p><strong>Table of Contents Preview:</strong></p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>The evolution from VMs to Containers to Functions</li>
                <li>Cost-analysis: When serverless becomes expensive</li>
                <li>Vendor lock-in mitigation strategies</li>
                <li>Cold-start benchmarking across AWS, GCP, Azure</li>
              </ul>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><Lock size={16} color="#00FFFF" /> Enter email to download (PDF, 6MB)</h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="email" placeholder="work email address" style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: '#1a1a1a', color: '#fff' }} />
                <button style={{ padding: '0.8rem 1.5rem', background: 'var(--accent-aqua)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Download</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Our Research Methodology</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {[
            { step: '01', icon: <Search size={28} color="#00FFFF" />, title: 'Question', desc: 'Defining the core problem statement.' },
            { step: '02', icon: <BookOpen size={28} color="#D946EF" />, title: 'Literature', desc: 'Extensive academic and industry review.' },
            { step: '03', icon: <Layers size={28} color="#3fb950" />, title: 'Data Gathering', desc: 'Proprietary qualitative and quantitative data.' },
            { step: '04', icon: <BarChart2 size={28} color="#FFD700" />, title: 'Analysis', desc: 'Rigorous statistical and trend modeling.' },
            { step: '05', icon: <CheckCircle size={28} color="#FFA500" />, title: 'Solutions', desc: 'Actionable frameworks for the enterprise.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.2)', background: 'rgba(255,255,255,0.05)' }}
            >
              <div style={{ position: 'absolute', top: '-15px', right: '-10px', fontSize: '5rem', fontWeight: '900', color: 'rgba(255,255,255,0.04)', zIndex: 0, lineHeight: 1 }}>{item.step}</div>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.2rem', borderRadius: '50%', zIndex: 1 }}>{item.icon}</div>
              <h4 style={{ color: '#fff', fontSize: '1.2rem', zIndex: 1, margin: 0 }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', zIndex: 1, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className={styles.filterBar}>
        {['All', 'AI', 'Security', 'Cloud', 'Automation', 'Data', 'Transformation'].map(tab => (
          <button 
            key={tab} 
            className={activeTab === tab ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.cardGrid}>
        {filteredPapers.map((p, i) => (
          <motion.div key={i} className={styles.contentCard} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src={p.img} alt={p.title} className={styles.cardImage} style={{ height: '180px' }} />
            <div className={styles.cardBody}>
              <span className={styles.cardTag}>{p.tag}</span>
              <h4 className={styles.cardTitle}>{p.title}</h4>
              <p className={styles.cardDesc}>{p.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><FileText size={14}/> {p.pages} Pages</span>
                <span>{p.date}</span>
              </div>
              
              <a 
                href={`/downloads/whitepapers/${p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.pdf`}
                download
                style={{ width: '100%', marginTop: '1rem', padding: '0.8rem', background: 'transparent', border: '1px solid var(--accent-aqua)', color: 'var(--accent-aqua)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.3s', textDecoration: 'none' }}
              >
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--card-surface)', borderRadius: '12px', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: '#fff' }}>Looking for shorter reads?</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Check out our Tech Blogs for bite-sized engineering updates.</p>
        </div>
        <Link to="/insights/tech-blogs" className={styles.filterBtnActive} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>View Blogs <ArrowRight size={16}/></Link>
      </div>
    </div>
  );
}
