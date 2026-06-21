import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
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

/* Four expanded sitemap columns — heading links to the section landing page,
   sub-links come from the same data that powers the mega menu. */
const FOOTER_COLUMNS: { key: string; base: string }[] = [
  { key: 'About', base: '/about' },
  { key: 'Services', base: '/services' },
  { key: 'Careers', base: '/careers' },
  { key: 'Contact Us', base: '/contact' },
];

const subPathFor = (catKey: string) => {
  const key = catKey.toLowerCase();
  if (key === 'contact us') return 'contact';
  if (key === 'careers') return 'careers';
  return key.replace(/\s+/g, '-');
};

/**
 * Footer — professional, fully-expanded sitemap footer with brand block,
 * contact details, newsletter, and a legal bottom bar.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
    }
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

        {/* ── Main: brand + expanded sitemap columns ──────────────────── */}
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

          {/* Expanded nav columns */}
          {FOOTER_COLUMNS.map(({ key, base }) => {
            const items = megaMenuData[key];
            if (!items) return null;
            const sub = subPathFor(key);

            return (
              <nav key={key} className={styles.navColumn} aria-label={key}>
                <Link to={base} className={styles.navColumnTitle}>
                  {key}
                </Link>
                <ul className={styles.navList}>
                  {items.map((link) => (
                    <li key={link.slug}>
                      <Link to={`/${sub}/${link.slug}`} className={styles.footerLink}>
                        {link.shortTitle || link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
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
