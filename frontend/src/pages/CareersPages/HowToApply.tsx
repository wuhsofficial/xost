import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, Users, Award } from 'lucide-react';
import styles from './CareersPages.module.css';

const steps = [
  {
    icon: <FileText size={24} color="#00FFFF" />,
    title: '1. Profile Submission',
    desc: 'Submit your resume and portfolio. We look for impact over pedigree. Show us what you have built and the problems you have solved.'
  },
  {
    icon: <Code size={24} color="#D946EF" />,
    title: '2. Technical Screen',
    desc: 'A 60-minute technical interview focusing on real-world engineering problems. No whiteboard brain-teasers, just practical problem-solving.'
  },
  {
    icon: <Users size={24} color="#3fb950" />,
    title: '3. Team Architecture Round',
    desc: 'Meet your future team. You will collaboratively design a system architecture to see how you communicate and handle technical tradeoffs.'
  },
  {
    icon: <Award size={24} color="#FFD700" />,
    title: '4. Offer & Onboarding',
    desc: 'We move fast. If there is a mutual fit, an offer is extended within 48 hours of the final round. Welcome to XOST.'
  }
];

export default function HowToApply() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          How to Apply
        </motion.h1>
        <p className={styles.heroSubhead}>
          Our hiring process is designed to be transparent, fast, and focused on practical skills rather than trick questions.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.timeline}>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className={styles.timelineDot} style={{ background: '#222', border: '2px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', left: '-4px', zIndex: 2 }}>
                {step.icon}
              </div>
              <div className={styles.bentoCard} style={{ marginLeft: '1rem' }}>
                <h3 className={styles.bentoTitle} style={{ fontSize: '1.5rem' }}>{step.title}</h3>
                <p className={styles.bentoDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.section} style={{ textAlign: 'center', background: 'rgba(217, 70, 239, 0.05)', borderRadius: '24px', padding: '4rem 2rem', marginTop: '4rem' }}>
        <h2 className={styles.sectionTitle}>Ready to take the leap?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Check out our open roles and find where you fit in the XOST ecosystem.
        </p>
        <button className={styles.submitBtn} style={{ maxWidth: '300px' }}>View Openings</button>
      </section>
    </div>
  );
}
