import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar as CalIcon, Clock, Users, Video, Bell } from 'lucide-react';
import styles from './InsightsPages.module.css';

export default function WebinarsEvents({ pageData }) {
  const [activeTab, setActiveTab] = useState('All');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set target date 3 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(14, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const upcoming = [
    { title: "Mastering Kubernetes Auto-scaling", host: "Sarah Jenkins", date: "Oct 20, 2026", time: "2:00 PM EST", tag: "DevOps" },
    { title: "The Future of Open Source LLMs", host: "David Chen", date: "Nov 05, 2026", time: "11:00 AM EST", tag: "AI & ML" },
    { title: "Zero Trust Architecture Live Demo", host: "Dr. Alan Walker", date: "Nov 18, 2026", time: "1:00 PM EST", tag: "Security" }
  ];

  const past = [
    { title: "Migrating to React 19", views: "12K", duration: "45 min", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600", tag: "Development" },
    { title: "Cloud Cost Optimization Strategies", views: "8.5K", duration: "50 min", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600", tag: "Cloud" },
    { title: "RPA for HR Onboarding", views: "5K", duration: "30 min", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600", tag: "Automation" },
    { title: "Building RAG with LangChain", views: "15K", duration: "60 min", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600", tag: "AI & ML" },
    { title: "Securing CI/CD Pipelines", views: "7K", duration: "40 min", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600", tag: "Security" },
    { title: "Data Lake vs Data Warehouse", views: "9K", duration: "55 min", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", tag: "Data" }
  ];

  const filteredPast = activeTab === 'All' ? past : past.filter(p => p.tag === activeTab);

  // Generate a mock calendar grid (35 days)
  const calendarDays = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 75, 75, 0.1)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(255, 75, 75, 0.3)', marginBottom: '1.5rem' }}>
          <div style={{ width: '10px', height: '10px', background: '#ff4b4b', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
          <span style={{ color: '#ff4b4b', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Next Live Session In</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Seconds', val: timeLeft.seconds }
          ].map((time, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--card-surface)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', minWidth: '80px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-aqua)', lineHeight: '1' }}>
                {time.val.toString().padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '0.5rem' }}>{time.label}</span>
            </div>
          ))}
        </div>
        
        <h2 className={styles.heroHeadline}>Join our expert live sessions</h2>
        <p className={styles.heroSubhead}>Masterclasses, Q&As, and live coding with industry leaders.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>80+</span>
          <span className={styles.statLabel}>Webinars Hosted</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>25K+</span>
          <span className={styles.statLabel}>Total Attendees</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>40+</span>
          <span className={styles.statLabel}>Expert Speakers</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Upcoming Sessions</h3>
        <div className={styles.cardGrid}>
          {upcoming.map((ev, i) => (
            <div key={i} className={styles.contentCard} style={{ padding: '2rem', background: i === 0 ? 'linear-gradient(180deg, rgba(0, 255, 255, 0.05), var(--card-surface))' : 'var(--card-surface)', border: i === 0 ? '1px solid var(--accent-aqua)' : '1px solid var(--card-border)' }}>
              <span className={styles.cardTag} style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>{ev.tag}</span>
              <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>{ev.title}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CalIcon size={16}/> {ev.date} at {ev.time}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16}/> Host: {ev.host}</span>
              </div>
              
              <button className={i === 0 ? styles.filterBtnActive : styles.filterBtn} style={{ width: '100%', marginTop: 'auto' }}>Register Now</button>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>October Event Calendar</h3>
          <div className={styles.calendarWidget}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              {['S','M','T','W','T','F','S'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className={styles.calendarGrid}>
              {calendarDays.map((d, i) => {
                const isEvent = d === 5 || d === 12 || d === 20 || d === 28;
                return (
                  <div key={i} className={`${styles.calendarDay} ${isEvent ? styles.calendarEventDay : ''}`} title={isEvent ? "Live Event Scheduled" : ""}>
                    {d > 31 ? '' : d}
                    {isEvent && <span className={styles.eventDot}></span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Featured Speakers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles.authorItem}>
              <img src="https://i.pravatar.cc/100?img=68" alt="Sarah" className={styles.authorAvatar} />
              <div>
                <h4 style={{ color: '#fff' }}>Sarah Jenkins</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>COO @ TechCorp • DevOps Expert</p>
              </div>
            </div>
            <div className={styles.authorItem}>
              <img src="https://i.pravatar.cc/100?img=33" alt="David" className={styles.authorAvatar} />
              <div>
                <h4 style={{ color: '#fff' }}>David Chen</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Lead AI Researcher • GenAI</p>
              </div>
            </div>
            <div className={styles.authorItem} style={{ borderBottom: 'none' }}>
              <img src="https://i.pravatar.cc/100?img=11" alt="Alan" className={styles.authorAvatar} />
              <div>
                <h4 style={{ color: '#fff' }}>Dr. Alan Walker</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>CISO @ SecureNet • Zero Trust</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>On-Demand Library</h3>
        <div className={styles.filterBar} style={{ justifyContent: 'flex-start' }}>
          {['All', 'AI & ML', 'Cloud', 'Security', 'Development', 'Automation', 'Data'].map(tab => (
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
          {filteredPast.map((vid, i) => (
            <motion.div key={i} className={styles.contentCard} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div style={{ position: 'relative' }}>
                <img src={vid.img} alt={vid.title} className={styles.cardImage} style={{ height: '180px', filter: 'brightness(0.7)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', background: 'rgba(0,0,0,0.6)', border: '2px solid #fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Play fill="#fff" size={20} style={{ marginLeft: '4px' }} />
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardTag}>{vid.tag}</span>
                <h4 className={styles.cardTitle}>{vid.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Users size={14}/> {vid.views} Views</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14}/> {vid.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className={styles.newsletterStrip} style={{ background: 'linear-gradient(90deg, rgba(217, 70, 239, 0.1), rgba(0, 255, 255, 0.1))', borderColor: '#D946EF' }}>
        <Bell size={40} color="#D946EF" />
        <h3 style={{ color: '#fff', fontSize: '1.8rem' }}>Never miss a session</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Get notified when we announce new masterclasses and live coding events.</p>
        <div className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your work email" className={styles.newsletterInput} style={{ borderColor: 'rgba(217, 70, 239, 0.5)' }} />
          <button className={styles.newsletterBtn} style={{ background: 'linear-gradient(90deg, #D946EF, #00FFFF)' }}>Get Reminders</button>
        </div>
      </div>
    </div>
  );
}
