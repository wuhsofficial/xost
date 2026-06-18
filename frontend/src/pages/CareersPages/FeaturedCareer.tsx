import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ArrowRight, Clock, MapPin, DollarSign, Award } from 'lucide-react';
import styles from './CareersPages.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FeaturedCareer() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader} style={{ background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className={styles.badge} style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#FFD700', border: '1px solid rgba(255, 215, 0, 0.3)', marginBottom: '1rem' }}>
            <Star size={12} style={{ display: 'inline', marginRight: '4px' }} /> Urgent Hiring
          </div>
          <h1 className={styles.heroHeadline} style={{ background: 'linear-gradient(90deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Lead AI Architect
          </h1>
          <p className={styles.heroSubhead}>
            We are looking for a visionary AI Architect to lead our generative models division. Help us build systems that scale to millions of users.
          </p>
        </motion.div>
      </header>

      <section className={styles.section}>
        <motion.div 
          className={styles.bentoGrid} 
          style={{ gridTemplateColumns: '2fr 1fr' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {/* Main Description */}
          <motion.div className={styles.bentoCard} variants={fadeUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>The Role</h2>
            <p className={styles.bentoDesc} style={{ fontSize: '1.1rem' }}>
              As a Lead AI Architect, you will be responsible for the end-to-end design and deployment of our Large Language Model (LLM) infrastructure. You will work directly with the CTO to define the technical roadmap, mentor senior engineers, and push the boundaries of what is possible in enterprise AI.
            </p>
            
            <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Key Responsibilities</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
              {[
                'Design scalable microservices architecture for model inference.',
                'Optimize latency and throughput of custom Transformer models.',
                'Collaborate with Data Science teams to streamline MLOps pipelines.',
                'Conduct code reviews and set engineering standards for the AI division.'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                  <CheckCircle color="#00FFFF" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ lineHeight: '1.5' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.bentoCard} style={{ background: 'linear-gradient(145deg, rgba(255,215,0,0.05), rgba(255,165,0,0.05))', borderColor: 'rgba(255,215,0,0.2)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#FFD700', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Job Overview</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}><MapPin size={20} color="#00FFFF" /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Location</div>
                    <div style={{ fontWeight: 'bold' }}>Remote / Dubai Hub</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}><Clock size={20} color="#D946EF" /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Type</div>
                    <div style={{ fontWeight: 'bold' }}>Full-time</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}><DollarSign size={20} color="#3fb950" /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Salary Range</div>
                    <div style={{ fontWeight: 'bold' }}>$150k - $220k USD</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}><Award size={20} color="#FFD700" /></div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Experience</div>
                    <div style={{ fontWeight: 'bold' }}>7+ Years</div>
                  </div>
                </div>
              </div>

              <button className={styles.submitBtn} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
                Apply Now <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
