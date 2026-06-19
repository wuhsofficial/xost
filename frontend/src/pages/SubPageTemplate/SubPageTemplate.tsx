import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { megaMenuData } from '../../data/megaMenuData';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import MorphingBlob from '../../components/MorphingBlob/MorphingBlob';
import styles from './SubPageTemplate.module.css';

// Import Templates
import PlatformTemplate from './templates/PlatformTemplate';
import ServicesTemplate from './templates/ServicesTemplate';
import SolutionsTemplate from './templates/SolutionsTemplate';
import InsightsTemplate from './templates/InsightsTemplate';
import IndustriesTemplate from './templates/IndustriesTemplate';
import AboutTemplate from './templates/AboutTemplate';
import GenericTemplate from './templates/GenericTemplate';

/* ─── SubPageTemplate ──────────────────────────────────────────────────
   A dynamic wrapper that renders the UI for all 30+ sub-options
   routing to specific templates based on the category.
*/
export default function SubPageTemplate() {
  const { category, slug } = useParams();

  // Find the right data block
  const pageData = useMemo(() => {
    const catKey = Object.keys(megaMenuData).find(
      (k) => k.toLowerCase() === category?.toLowerCase()
    );
    if (!catKey) return null;
    const items = megaMenuData[catKey];
    return items.find((item) => item.slug === slug);
  }, [category, slug]);

  if (!pageData) {
    return <Navigate to="/" replace />;
  }

  // Check if this is the globe map page for "Where we work"
  const isWhereWeWork = slug === 'where-we-work';

  // Determine which template to load based on Category
  const renderTemplate = () => {
    if (isWhereWeWork) {
      return (
        <section className={styles.globeSection}>
          <div className={styles.sectionTitle}>
            <h2>Global Presence</h2>
          </div>
          <div className={styles.mapContainer}>
            <div className={styles.abstractMap}>
              {/* Map Connections (SVG) */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(0, 255, 179, 0.4)" />
                    <stop offset="100%" stopColor="rgba(0, 212, 255, 0.1)" />
                  </linearGradient>
                </defs>
                {/* Lines from HQ (50%, 50%) to all other cities */}
                <line x1="50%" y1="50%" x2="28%" y2="36%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="18%" y2="38%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="26%" y2="32%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="24%" y2="45%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="34%" y2="65%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="32%" y2="75%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="48%" y2="32%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="51%" y2="31%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="49%" y2="34%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="55%" y2="42%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="53%" y2="75%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="60%" y2="45%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="66%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="58%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="85%" y2="38%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="88%" y2="75%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              {/* The HQ Dot */}
              <div className={`${styles.mapDot} ${styles.hqDot}`}>
                <div className={styles.dotPulse}></div>
                <div className={styles.dotLabel}>Lahore, Pakistan (HQ)</div>
              </div>
              {/* North America */}
              <div className={`${styles.mapDot} ${styles.nyDot}`}><div className={styles.dotLabel}>New York</div></div>
              <div className={`${styles.mapDot} ${styles.sfDot}`}><div className={styles.dotLabel}>San Francisco</div></div>
              <div className={`${styles.mapDot} ${styles.torDot}`}><div className={styles.dotLabel}>Toronto</div></div>
              <div className={`${styles.mapDot} ${styles.mexDot}`}><div className={styles.dotLabel}>Mexico City</div></div>
              
              {/* South America */}
              <div className={`${styles.mapDot} ${styles.spDot}`}><div className={styles.dotLabel}>São Paulo</div></div>
              <div className={`${styles.mapDot} ${styles.baDot}`}><div className={styles.dotLabel}>Buenos Aires</div></div>
              
              {/* Europe */}
              <div className={`${styles.mapDot} ${styles.lonDot}`}><div className={styles.dotLabel}>London</div></div>
              <div className={`${styles.mapDot} ${styles.berDot}`}><div className={styles.dotLabel}>Berlin</div></div>
              <div className={`${styles.mapDot} ${styles.parDot}`}><div className={styles.dotLabel}>Paris</div></div>
              
              {/* Africa */}
              <div className={`${styles.mapDot} ${styles.caiDot}`}><div className={styles.dotLabel}>Cairo</div></div>
              <div className={`${styles.mapDot} ${styles.ctDot}`}><div className={styles.dotLabel}>Cape Town</div></div>
              
              {/* Asia */}
              <div className={`${styles.mapDot} ${styles.dxbDot}`}><div className={styles.dotLabel}>Dubai</div></div>
              <div className={`${styles.mapDot} ${styles.mumDot}`}><div className={styles.dotLabel}>Mumbai</div></div>
              <div className={`${styles.mapDot} ${styles.sinDot}`}><div className={styles.dotLabel}>Singapore</div></div>
              <div className={`${styles.mapDot} ${styles.tyoDot}`}><div className={styles.dotLabel}>Tokyo</div></div>
              <div className={`${styles.mapDot} ${styles.beiDot}`}><div className={styles.dotLabel}>Beijing</div></div>
              
              {/* Oceania */}
              <div className={`${styles.mapDot} ${styles.sydDot}`}><div className={styles.dotLabel}>Sydney</div></div>
            </div>
          </div>
        </section>
      );
    }

    const catName = category?.toLowerCase();
    switch (catName) {
      case 'platform': return <PlatformTemplate pageData={pageData} category={category} />;
      case 'services': return <ServicesTemplate pageData={pageData} category={category} />;
      case 'solutions': return <SolutionsTemplate pageData={pageData} category={category} />;
      case 'insights': return <InsightsTemplate pageData={pageData} category={category} />;
      case 'industries': return <IndustriesTemplate pageData={pageData} category={category} />;
      case 'about': return <AboutTemplate pageData={pageData} category={category} />;
      default: return <GenericTemplate pageData={pageData} category={category} />;
    }
  };

  return (
    <main className={styles.subPageMain}>
      {/* Dynamic Content Block */}
      <section className={styles.contentSection}>
        {renderTemplate()}
      </section>
    </main>
  );
}
