import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { megaMenuData } from '../../data/megaMenuData';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { icon: faLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: faXTwitter, href: 'https://x.com', label: 'X (Twitter)' },
];

/**
 * Footer — massive dark footer rendering data directly from megaMenuData.
 */
export default function Footer() {
  // We'll extract specific categories to render in the massive footer
  const footerCategories = ['Platform', 'Services', 'Solutions', 'Insights', 'Industries', 'About'];

  // State for accordion functionality
  const [expandedTabs, setExpandedTabs] = useState<Record<string, boolean>>({});

  const toggleTab = (tab: string) => {
    setExpandedTabs(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }));
  };

  return (
    <footer className={styles.footer}>
      {/* Gradient top border */}
      <div className={styles.gradientBorder} />

      {/* Main body */}
      <div className={styles.body}>
        <div className={styles.columns}>
          {/* ── Brand column ──────────────────────────────────────────── */}
          <div className={styles.brandCol}>
            <span className={styles.brandLogo}>XOST</span>
            <span className={styles.brandTagline}>Strategy. Execution. Scale.</span>
            <p className={styles.brandDescription}>
              Transforming businesses through cutting-edge technology solutions and digital innovation.
            </p>
            <div className={styles.socialRow}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Dynamic Accordion from MegaMenuData ─────────────────────── */}
          <div className={styles.accordionContainer}>
            {[...footerCategories, 'Contact Us'].map((catKey) => {
              const items = megaMenuData[catKey];
              if (!items) return null;
              const isExpanded = expandedTabs[catKey];

              return (
                <div key={catKey} className={styles.accordionSection}>
                  <div className={styles.accordionHeader} onClick={() => toggleTab(catKey)}>
                    <h4 className={styles.accordionTitle}>{catKey}</h4>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`${styles.accordionIcon} ${isExpanded ? styles.expanded : ''}`} 
                    />
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.accordionContent}
                      >
                        <ul className={styles.linkList}>
                          {items.map((link) => {
                            const basePath = catKey.toLowerCase() === 'contact us' 
                              ? 'contact' 
                              : catKey.toLowerCase().replace(/\s+/g, '-');
                            return (
                              <li key={link.slug}>
                                <Link to={`/${basePath}/${link.slug}`} className={styles.footerLink}>
                                  {link.title}
                                </Link>
                              </li>
                            );
                          })}
                          
                          {/* Static contact details inside Contact Us accordion */}
                          {catKey === 'Contact Us' && (
                            <>
                              <li style={{ marginTop: '1rem' }}>
                                <a href="mailto:hello@xost.agency" className={styles.contactItem}>
                                  <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                                  hello@xost.agency
                                </a>
                              </li>
                              <li>
                                <a href="tel:+923001234567" className={styles.contactItem}>
                                  <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                                  +92 300 1234567
                                </a>
                              </li>
                              <li>
                                <span className={styles.contactItem}>
                                  <FontAwesomeIcon icon={faLocationDot} className={styles.contactIcon} />
                                  Lahore, Pakistan
                                </span>
                              </li>
                            </>
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Copyright bar ──────────────────────────────────────────────── */}
      <div className={styles.copyrightBar}>
        <span className={styles.copyrightText}>
          © 2025 XOST Agency. Crafted with precision in Lahore, Pakistan.
        </span>
        <div className={styles.legalLinks}>
          <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          <span className={styles.legalSeparator}>|</span>
          <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
