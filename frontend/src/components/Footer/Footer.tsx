import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
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

          {/* ── Dynamic Columns from MegaMenuData ─────────────────────── */}
          {footerCategories.map((catKey) => {
            const items = megaMenuData[catKey];
            if (!items) return null;
            return (
              <div key={catKey} className={styles.column}>
                <h4 className={styles.columnTitle}>{catKey}</h4>
                <ul className={styles.linkList}>
                  {items.map((link) => (
                    <li key={link.slug}>
                      <Link to={`/${catKey.toLowerCase()}/${link.slug}`} className={styles.footerLink}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* ── Contact column ─────────────────────────────────────────── */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <ul className={styles.linkList}>
              {megaMenuData['Contact Us']?.map((link) => (
                <li key={link.slug} className={styles.footerListItem}>
                  <Link to={`/contact/${link.slug}`} className={styles.footerLink}>
                    {link.title}
                  </Link>
                </li>
              ))}
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
            </ul>
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
