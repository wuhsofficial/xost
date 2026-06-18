import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, MonitorSmartphone, Coffee, Umbrella, ShieldCheck, Sun } from 'lucide-react';
import styles from './CareersPages.module.css';

const perks = [
  { icon: <HeartPulse color="#D946EF" />, title: 'Premium Healthcare', desc: '100% covered health, dental, and vision insurance for you and your dependents.' },
  { icon: <MonitorSmartphone color="#00FFFF" />, title: 'Top-Tier Gear', desc: 'Choose your own setup. M3 Max MacBooks, ultrawide monitors, and ergonomic chairs.' },
  { icon: <Coffee color="#FFD700" />, title: 'Remote Stipend', desc: '$2,000 annual stipend for home-office upgrades, co-working spaces, or internet bills.' },
  { icon: <Umbrella color="#3fb950" />, title: 'Unlimited PTO', desc: 'Take the time you need. We mandate a minimum of 20 days off per year to prevent burnout.' },
  { icon: <ShieldCheck color="#FFA500" />, title: 'Mental Wellness', desc: 'Free access to therapy, meditation apps, and mental health resources.' },
  { icon: <Sun color="#FF4500" />, title: 'Annual Retreats', desc: 'Once a year, the entire global team meets up in a beautiful location to connect and celebrate.' }
];

export default function LifeAtXost() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader} style={{ background: 'radial-gradient(circle at center, rgba(217, 70, 239, 0.1) 0%, transparent 70%)' }}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'linear-gradient(90deg, #D946EF, #00FFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Life at XOST
        </motion.h1>
        <p className={styles.heroSubhead}>
          We work hard on hard problems, but we also take care of our own. Our culture is built on high autonomy and high support.
        </p>
      </header>

      {/* Gallery Section */}
      <section className={styles.section}>
        <motion.div 
          className={styles.imageGrid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Placeholder Images for Masonry */}
          <div style={{ height: '300px', background: 'linear-gradient(45deg, #111, #222)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>[Office Hub Dubai]</div>
          <div style={{ height: '300px', background: 'linear-gradient(45deg, #111, #222)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>[Team Offsite 2024]</div>
          <div style={{ height: '300px', background: 'linear-gradient(45deg, #111, #222)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>[Remote Desk Setup]</div>
          <div style={{ gridColumn: '1 / span 2', height: '400px', background: 'linear-gradient(45deg, #111, #222)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>[Hackathon Winning Team]</div>
          <div style={{ height: '400px', background: 'linear-gradient(45deg, #111, #222)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>[Game Room]</div>
        </motion.div>
      </section>

      {/* Perks Section */}
      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>Benefits & Perks</h2>
        <div className={styles.bentoGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {perks.map((perk, idx) => (
            <motion.div 
              key={idx}
              className={styles.bentoCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', width: 'max-content', marginBottom: '1rem' }}>
                {perk.icon}
              </div>
              <h3 className={styles.bentoTitle} style={{ fontSize: '1.2rem' }}>{perk.title}</h3>
              <p className={styles.bentoDesc}>{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
