import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../SubPageTemplate.module.css';

export default function GenericTemplate({ pageData, category }) {
  return (
    <section className={styles.contentSection}>
      <div className={styles.bentoGrid}>
        <div className={`${styles.bentoItem} ${styles.bentoHighlight}`}>
          <h3>Overview</h3>
          <p>
            Our approach to {pageData.title} combines industry best practices with modern tooling. 
            We engineer resilience, optimize pipelines, and deliver consistent quality at scale.
          </p>
        </div>
        <div className={styles.bentoItem}>
          <h3>Key Capabilities</h3>
          <ul className={styles.featureList}>
            <li>Advanced architecture patterns</li>
            <li>Continuous monitoring & analytics</li>
            <li>Cross-platform integrations</li>
          </ul>
        </div>
        <div className={styles.bentoItem}>
          <h3>Get Started</h3>
          <p>Ready to leverage our expertise? Contact our engineering teams today.</p>
          <Link to="/contact" className={styles.ctaButton}>Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
