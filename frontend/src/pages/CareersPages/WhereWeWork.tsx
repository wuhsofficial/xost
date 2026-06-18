import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe2, Wifi, Coffee } from 'lucide-react';
import styles from './CareersPages.module.css';

const locations = [
  {
    city: 'Dubai Hub',
    type: 'HQ & Innovation Center',
    icon: <MapPin color="#D946EF" size={32} />,
    desc: 'Our flagship office located in the heart of Internet City. Floor-to-ceiling windows, dedicated server labs, and endless coffee.',
    time: 'GST (UTC+4)',
    imgUrl: 'linear-gradient(to bottom, rgba(217, 70, 239, 0.2), rgba(0,0,0,0.8))'
  },
  {
    city: 'London Studio',
    type: 'Design & Strategy',
    icon: <MapPin color="#00FFFF" size={32} />,
    desc: 'A creative warehouse space in Shoreditch where our UX/UI and product strategy teams collaborate.',
    time: 'GMT (UTC+0)',
    imgUrl: 'linear-gradient(to bottom, rgba(0, 255, 255, 0.2), rgba(0,0,0,0.8))'
  },
  {
    city: 'Fully Remote',
    type: 'Work From Anywhere',
    icon: <Globe2 color="#3fb950" size={32} />,
    desc: 'Over 60% of our engineering team works completely remotely across 15+ different time zones.',
    time: 'Your Timezone',
    imgUrl: 'linear-gradient(to bottom, rgba(63, 185, 80, 0.2), rgba(0,0,0,0.8))'
  }
];

export default function WhereWeWork() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader} style={{ background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)' }}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'linear-gradient(90deg, #00FFFF, #00BFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Distributed by Design
        </motion.h1>
        <p className={styles.heroSubhead}>
          We hire the best talent globally. Whether you thrive in a bustling tech hub or your own home office, we support how you work best.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.bentoGrid}>
          {locations.map((loc, idx) => (
            <motion.div 
              key={idx}
              className={styles.bentoCard}
              style={{ minHeight: '400px', background: loc.imgUrl, justifyContent: 'flex-end', border: '1px solid rgba(255,255,255,0.1)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', backdropFilter: 'blur(10px)' }}>
                {loc.time}
              </div>
              <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                {loc.icon}
                <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '1rem 0 0.5rem 0' }}>{loc.city}</h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{loc.type}</div>
                <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>{loc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <div className={styles.bentoCard} style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.05), rgba(0, 255, 255, 0.05))' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>The Asynchronous Advantage</h2>
            <p className={styles.bentoDesc}>
              Because our team is spread across the globe, we rely heavily on asynchronous communication. Less meetings, more deep work. We use Slack, Notion, and Loom to keep everyone aligned without the Zoom fatigue.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', textAlign: 'center', flex: 1 }}>
              <Wifi size={32} color="#00FFFF" style={{ margin: '0 auto 1rem auto' }} />
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>Async First</div>
            </div>
            <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', textAlign: 'center', flex: 1 }}>
              <Coffee size={32} color="#D946EF" style={{ margin: '0 auto 1rem auto' }} />
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>Deep Work</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
