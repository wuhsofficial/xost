import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Layers, Smartphone, Server, Database, Globe, Briefcase, RefreshCw, Code, LayoutTemplate } from 'lucide-react';
import styles from './ServicesPages.module.css';

export default function EnterpriseSoftware({ pageData }) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Custom robust business logic</h2>
        <p className={styles.heroSubhead}>Scalable enterprise software tailored to your workflow.</p>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>SDLC Lifecycle</h3>
        <div className={styles.flowContainer}>
          {['Requirements', 'Design', 'Development', 'Testing', 'Deployment', 'Maintenance'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <motion.div 
                className={styles.flowNode}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {step}
              </motion.div>
              {i < arr.length - 1 && <div className={styles.flowLine} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>150+</span>
          <span className={styles.statLabel}>Projects Delivered</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>98%</span>
          <span className={styles.statLabel}>Client Satisfaction</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>8+</span>
          <span className={styles.statLabel}>Years Experience</span>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 style={{ color: '#D946EF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase /> The Problem
          </h3>
          <p>Off-the-shelf software forces you to change your business processes to fit the tool. This leads to inefficiencies, data silos, and frustrated employees.</p>
        </div>
        <div className={styles.splitCard}>
          <h3 style={{ color: 'var(--accent-aqua)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle /> The Solution
          </h3>
          <p>We build custom software that perfectly models your unique domain logic, integrates seamlessly with your existing tools, and scales as you grow.</p>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Domain Expertise</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Globe className={styles.bentoIcon} />
            <h4>Web Applications</h4>
            <p>High-performance, responsive PWAs and portals.</p>
          </div>
          <div className={styles.bentoCard}>
            <Smartphone className={styles.bentoIcon} />
            <h4>Mobile Apps</h4>
            <p>Cross-platform iOS and Android applications.</p>
          </div>
          <div className={styles.bentoCard}>
            <Server className={styles.bentoIcon} />
            <h4>API Development</h4>
            <p>Secure, RESTful and GraphQL microservices.</p>
          </div>
          <div className={styles.bentoCard}>
            <Database className={styles.bentoIcon} />
            <h4>ERP Systems</h4>
            <p>Centralized resource planning and management.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Tech Stack</h3>
        <div className={styles.techStackGrid}>
          {['React', 'Node.js', '.NET', 'Java', 'Python', 'Flutter', 'PostgreSQL', 'Redis', 'Docker'].map(tech => (
            <motion.div key={tech} className={styles.techBadge} whileHover={{ scale: 1.05 }}>
              <Code size={14} /> {tech}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
