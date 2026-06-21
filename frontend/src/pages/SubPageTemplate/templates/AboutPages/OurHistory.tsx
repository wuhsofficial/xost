import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Linkedin, Award, Star, ShieldCheck, User } from 'lucide-react';
import styles from './AboutPages.module.css';

export default function OurHistory({ pageData }) {
  const timelineData = [
    { year: '2015', title: 'Foundation in Lahore', desc: 'Started as a boutique software consultancy focused on local SMEs.' },
    { year: '2016', title: 'Enterprise Onboarding', desc: 'Signed our first major enterprise client in the banking sector.' },
    { year: '2017', title: 'Cloud Expansion', desc: 'Pivoted to offer scalable cloud architecture and AWS migrations.' },
    { year: '2018', title: 'AI & ML Division', desc: 'Launched our dedicated artificial intelligence and machine learning lab.' },
    { year: '2019', title: '50+ Clients', desc: 'Crossed the 50 enterprise clients milestone and opened a second office.' },
    { year: '2020', title: 'Remote-First Scale', desc: 'Pivoted to a remote-first culture, scaling rapidly to serve international clients.' },
    { year: '2021', title: 'Academic Vertical', desc: 'Launched Academic & FYP Solutions to support the next generation of engineers.' },
    { year: '2022', title: 'ISO Certification', desc: 'Reached 100+ team members and secured ISO 27001 certification.' },
    { year: '2023', title: 'Global Reach', desc: 'Expanded physical presence to GCC and UK markets.' },
    { year: '2024', title: 'XOST Platform & Security', desc: 'Launched the proprietary XOST Platform suite and a dedicated CyberSecurity division.' }
  ];

  const lineOptions = {
    chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF', '#D946EF', '#43E97B'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    title: { text: 'Growth Index (Base 100)', style: { color: '#334155' } },
    legend: { labels: { colors: '#334155' } }
  };
  
  // Exponential / linear indexed growth data
  const lineSeries = [
    { name: 'Revenue Index', data: [100, 120, 180, 250, 400, 650, 1000, 1800, 2500, 3800] },
    { name: 'Client Base Index', data: [100, 150, 200, 350, 500, 800, 1200, 1600, 2200, 3000] },
    { name: 'Headcount Index', data: [100, 110, 140, 180, 250, 350, 500, 750, 1000, 1200] }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>The timeline of our evolution</h2>
        <p className={styles.heroSubhead}>From a local consultancy to a global digital engineering powerhouse.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>9+</span>
          <span className={styles.statLabel}>Years in Business</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>150+</span>
          <span className={styles.statLabel}>Projects Delivered</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>100+</span>
          <span className={styles.statLabel}>Team Members</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>15+</span>
          <span className={styles.statLabel}>Countries Served</span>
        </div>
      </section>

      <section className={styles.section} style={{ margin: '4rem 0' }}>
        <h3 className={styles.sectionTitle} style={{ textAlign: 'center', borderBottom: 'none' }}>Our Journey</h3>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          {timelineData.map((item, index) => (
            <motion.div 
              key={index} 
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h4 style={{ color: 'var(--accent-aqua)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.year}</h4>
                <h5 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 className={styles.sectionTitle}>Leadership</h3>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={40} color="var(--text-secondary)" />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Jane Doe</h4>
              <p style={{ margin: '0.2rem 0', color: 'var(--accent-aqua)' }}>CEO & Founder</p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Visionary leader driving the strategic global expansion of XOST.</p>
              <a href="#" style={{ color: '#0077b5', display: 'inline-block', marginTop: '0.5rem' }}><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className={styles.splitCard}>
          <Chart options={lineOptions as any} series={lineSeries} type="line" height={300} />
        </div>
      </div>

      <div style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop") center/cover fixed',
        padding: '6rem 2rem',
        textAlign: 'center',
        borderRadius: '12px',
        marginTop: '2rem',
        border: '1px solid var(--accent-aqua)'
      }}>
        <h2 style={{ fontSize: '2.5rem', color: '#fff', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
          "We didn't just adapt to change — we engineered it."
        </h2>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3 className={styles.sectionTitle} style={{ borderBottom: 'none' }}>Recognitions</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginTop: '1rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={40} color="#00FFFF" />
            <span>Top B2B Tech 2023</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={40} color="#D946EF" />
            <span>ISO 27001 Certified</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={40} color="#43E97B" />
            <span>Clutch 5-Star Agency</span>
          </div>
        </div>
      </section>
    </div>
  );
}
