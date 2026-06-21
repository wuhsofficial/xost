import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { megaMenuData } from '../../data/megaMenuData';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { icon: faLinkedinIn, href: 'https://linkedin.com/company/xost', label: 'LinkedIn' },
  { icon: faGithub, href: 'https://github.com/xost-agency', label: 'GitHub' },
  { icon: faInstagram, href: 'https://instagram.com/xost.agency', label: 'Instagram' },
  { icon: faXTwitter, href: 'https://x.com/xostagency', label: 'X (Twitter)' },
];

/* Sitemap columns rendered from the same data that powers the mega menu. */
const FOOTER_COLUMNS = ['Platform', 'Services', 'Solutions', 'Insights', 'Industries', 'About', 'Careers', 'Contact Us'];

const basePathFor = (catKey: string) => {
  const key = catKey.toLowerCase();
  if (key === 'contact us') return 'contact';
  if (key === 'careers') return 'careers';
  return key.replace(/\s+/g, '-');
};

/**
 * Footer — professional, expanded sitemap footer with brand block,
 * contact details, newsletter, and a legal bottom bar.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveColumn(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
    }
  };

  const toggleColumn = (catKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveColumn((prev) => (prev === catKey ? null : catKey));
  };

  return (
    <footer className={styles.footer}>
      {/* Gradient top border */}
      <div className={styles.gradientBorder} />

      <div className={styles.body}>
        {/* ── Newsletter Section ──────────────────────────────────────── */}
        <motion.div
          className={styles.newsletterSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h3 className={styles.newsletterHeadline}>Stay Ahead of the Curve</h3>
              <p className={styles.newsletterSubtext}>
                Get weekly insights on AI, cloud, and digital innovation — straight to your inbox.
              </p>
            </div>
            {newsletterSubmitted ? (
              <motion.div
                className={styles.newsletterSuccess}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.newsletterSuccessIcon}>✓</span>
                Subscribed! Thank you.
              </motion.div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className={styles.newsletterInput}
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* ── Main: brand + sitemap columns ───────────────────────────── */}
        <div className={styles.main}>
          {/* Brand block */}
          <div className={styles.brandCol}>
            <Logo variant="horizontal" size={52} />
            <span className={styles.brandTagline}>Strategy. Execution. Scale.</span>
            <p className={styles.brandDescription}>
              XOST is a product engineering studio building secure, scalable digital
              platforms — from cloud architecture to AI integration — for teams that
              refuse to compromise on craft.
            </p>

            <div className={styles.contactList}>
              <a href="mailto:hello@xost.pro" className={styles.contactItem}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                hello@xost.pro
              </a>
              <a href="tel:+923001234567" className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                +92 300 1234567
              </a>
              <span className={styles.contactItem}>
                <FontAwesomeIcon icon={faLocationDot} className={styles.contactIcon} />
                Lahore, Pakistan
              </span>
            </div>

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

          {/* Sitemap link columns */}
          <div className={styles.sitemapBox}>
            {FOOTER_COLUMNS.map((catKey, index) => {
              const items = megaMenuData[catKey];
              if (!items) return null;
              const base = basePathFor(catKey);
              const isExpanded = activeColumn === catKey;
              const openUpward = index >= 4; // Categories in the bottom rows open upward to avoid overflow cut-off

              return (
                <div key={catKey} className={`${styles.buttonWrapper} ${isExpanded ? styles.buttonWrapperActive : ''}`}>
                  <button
                    className={`${styles.sitemapButton} ${isExpanded ? styles.sitemapButtonActive : ''}`}
                    onClick={(e) => toggleColumn(catKey, e)}
                    type="button"
                  >
                    <span>{catKey}</span>
                    <FontAwesomeIcon
                      icon={isExpanded ? faChevronUp : faChevronDown}
                      className={styles.buttonChevron}
                    />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: openUpward ? -8 : 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: openUpward ? -8 : 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={`${styles.popupBox} ${openUpward ? styles.popupBoxUpward : ''}`}
                        onClick={(e) => e.stopPropagation()} // prevent clicks inside the popup from closing it
                      >
                        <ul className={styles.popupList}>
                          {items.map((link) => (
                            <li key={link.slug}>
                              <Link
                                to={`/${base}/${link.slug}`}
                                className={styles.popupLink}
                                onClick={() => setActiveColumn(null)}
                              >
                                {link.shortTitle || link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Connect / QR block */}
          <div className={styles.connectCol}>
            <h4 className={styles.connectHeadline}>Digital Experience</h4>
            <div className={styles.qrContainer}>
              <div className={styles.qrPlaceholder}>
                <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20V20H4V4ZM8 8V16H16V8H8ZM4 44H20V60H4V44ZM8 48V56H16V48H8ZM44 4H60V20H44V4ZM48 8V16H56V8H48ZM4 28H12V36H4V28ZM12 28H20V36H12V28ZM20 28H28V36H20V28ZM28 20H36V28H28V20ZM28 4H36V12H28V4ZM44 20H52V28H44V20ZM52 20H60V28H52V20ZM36 28H44V36H36V28ZM28 36H36V44H28V36ZM44 36H52V44H44V36ZM36 44H44V52H36V44ZM44 48H52V56H44V48ZM52 44H60V52H52V44ZM28 52H36V60H28V52ZM52 52H60V60H52V52Z" fill="#00D4FF" fillOpacity="0.75" />
                  <rect x="12" y="12" width="4" height="4" fill="#00D4FF" />
                  <rect x="12" y="48" width="4" height="4" fill="#00D4FF" />
                  <rect x="48" y="12" width="4" height="4" fill="#00D4FF" />
                </svg>
                <div className={styles.qrScannerBar} />
              </div>
              <div className={styles.connectBadges}>
                <span className={styles.appBadgeText}>Scan for Mobile Portal</span>
                <span className={styles.appBadgeSubtext}>iOS & Android App</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Copyright bar ──────────────────────────────────────────────── */}
      <div className={styles.copyrightBar}>
        <span className={styles.copyrightText}>
          © {year} XOST. All rights reserved.
        </span>
        <span className={styles.craftedText}>Crafted with precision in Lahore, Pakistan.</span>
        <div className={styles.legalLinks}>
          <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          <span className={styles.legalSeparator}>·</span>
          <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
