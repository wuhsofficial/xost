import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, UserCheck, BookOpen, MessageSquareQuote } from 'lucide-react';
import styles from './CareersPages.module.css';

const internshipTracks = [
  { title: 'Software Engineering Intern', icon: <Code size={24} color="#00FFFF" />, desc: 'Write production code, ship features, and learn modern software architecture from senior engineers.' },
  { title: 'Product Design Intern', icon: <Lightbulb size={24} color="#D946EF" />, desc: 'Conduct user research, design high-fidelity prototypes, and see your ideas come to life.' },
  { title: 'Data Science Intern', icon: <Rocket size={24} color="#3fb950" />, desc: 'Train models, analyze massive datasets, and contribute to our predictive analytics engine.' }
];

// Need to import Code locally since it's not exported from lucide above
import { Code } from 'lucide-react';

export default function Internships() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader} style={{ background: 'radial-gradient(circle at center, rgba(255, 140, 0, 0.1) 0%, transparent 70%)' }}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'linear-gradient(90deg, #FF8C00, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Launchpad Program
        </motion.h1>
        <p className={styles.heroSubhead}>
          We don't do coffee runs. Our interns push code to production on their first week.
          Accelerate your career with our 12-week intensive mentorship program.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What to Expect</h2>
        <div className={styles.bentoGrid}>
          <div className={styles.bentoCard}>
            <Rocket size={32} color="#FF8C00" style={{ marginBottom: '1rem' }} />
            <h3 className={styles.bentoTitle}>Real Impact</h3>
            <p className={styles.bentoDesc}>You will be embedded into a core product team. The work you do will ship to thousands of actual users. No artificial "intern projects".</p>
          </div>
          <div className={styles.bentoCard}>
            <UserCheck size={32} color="#00FFFF" style={{ marginBottom: '1rem' }} />
            <h3 className={styles.bentoTitle}>1:1 Mentorship</h3>
            <p className={styles.bentoDesc}>You'll be paired with a dedicated Senior Engineer who will review your code, guide your architecture decisions, and help you grow.</p>
          </div>
          <div className={styles.bentoCard}>
            <BookOpen size={32} color="#D946EF" style={{ marginBottom: '1rem' }} />
            <h3 className={styles.bentoTitle}>Learning Budget</h3>
            <p className={styles.bentoDesc}>Access to a $500 personal learning budget for courses, books, or conference tickets during your internship.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <div className={styles.bentoCard} style={{ background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.05), rgba(255, 215, 0, 0.05))', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <MessageSquareQuote size={48} color="#FF8C00" style={{ marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '1.5rem', fontStyle: 'italic', maxWidth: '800px', lineHeight: '1.6', marginBottom: '2rem' }}>
            "The XOST internship was the most intense and rewarding 12 weeks of my life. I went from writing college assignments to deploying microservices that handled live traffic. I accepted my return offer immediately."
          </p>
          <div>
            <strong style={{ display: 'block', fontSize: '1.1rem' }}>Sarah Ahmed</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Software Engineer (Former 2024 Intern)</span>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>Open Internship Tracks</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
          {internshipTracks.map((track, idx) => (
            <motion.div 
              key={idx}
              className={styles.bentoCard}
              style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                {track.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 className={styles.bentoTitle}>{track.title}</h3>
                <p className={styles.bentoDesc} style={{ marginBottom: 0 }}>{track.desc}</p>
              </div>
              <button className={styles.submitBtn} style={{ padding: '0.8rem 1.5rem', width: 'auto', flexShrink: 0 }}>Apply</button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
