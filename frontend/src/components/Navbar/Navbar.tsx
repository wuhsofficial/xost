import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faSun, faMoon, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from '../../contexts/DarkModeContext';
import MegaMenu from '../MegaMenu/MegaMenu';
import { megaMenuData } from '../../data/megaMenuData';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Platform', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Insights', path: '/insights' },
  { label: 'Industries', path: '/industries' },
  { label: 'About', path: '/about' },
];

/**
 * Navbar — glassmorphic sticky nav that transitions from transparent
 * to frosted glass on scroll, with mobile bottom-sheet menu and dark mode toggle.
 */
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle: toggleDarkMode } = useDarkMode();
  const [glassOpacity, setGlassOpacity] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);
  
  /* Hover intent timeout ref to prevent flickering */
  const hoverTimeoutRef = useRef(null);

  /* Track rotation state so icon spins 180° each toggle */
  const [rotationDeg, setRotationDeg] = useState(0);

  /* ── Scroll listener for glass transition ────────────────────────── */
  useEffect(() => {
    function onScroll() {
      const opacity = Math.min(window.scrollY / 100, 1);
      setGlassOpacity(opacity);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on route change ───────────────────────────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Lock body scroll when mobile menu open ──────────────────────── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleCTA = useCallback(() => {
    navigate('/careers');
    setMobileOpen(false);
  }, [navigate]);

  const toggleMobileSubmenu = (label, e) => {
    e.preventDefault();
    setMobileExpandedMenu(prev => prev === label ? null : label);
  };

  const handleDarkModeToggle = useCallback(() => {
    setRotationDeg((prev) => prev + 180);
    toggleDarkMode();
  }, [toggleDarkMode]);

  const handleMouseEnter = (label) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (megaMenuData[label]) {
      setActiveMenu(label);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMouseLeaveNav = () => {
    // Add a 250ms delay before dismissing to allow intent
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
  };

  const isActive = (path) => location.pathname === path;

  /* ── Dynamic glass styles ────────────────────────────────────────── */
  const navStyle = {
    background: `rgba(255, 255, 255, ${0.65 * glassOpacity})`,
    backdropFilter: `blur(${20 * glassOpacity}px)`,
    WebkitBackdropFilter: `blur(${20 * glassOpacity}px)`,
    borderBottom: `1px solid rgba(0, 212, 255, ${0.25 * glassOpacity})`,
    boxShadow: `0 0 ${24 * glassOpacity}px rgba(0, 212, 255, ${0.08 * glassOpacity})`,
  };

  const toggleIconStyle = {
    transform: `rotate(${rotationDeg}deg)`,
    transition: 'transform 400ms ease-out',
  };

  return (
    <>
      <nav className={styles.navbar} style={navStyle} onMouseLeave={handleMouseLeaveNav}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            XOST
          </Link>

          {/* Desktop links */}
          <ul className={styles.desktopLinks}>
            {NAV_LINKS.map((link) => {
              // Determine alignment based on tab position
              let alignment = 'left';
              if (['Insights', 'Industries', 'About'].includes(link.label)) alignment = 'center';
              
              return (
                <li 
                  key={link.path} 
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  style={{ position: 'relative' }}
                >
                  <Link
                    to={link.path}
                    className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                  >
                    {link.label}
                    <span className={styles.underline} />
                  </Link>
                  {/* Render MegaMenu exactly under the active tab */}
                  {activeMenu === link.label && megaMenuData[link.label] && (
                    <MegaMenu activeMenu={activeMenu} alignment={alignment} onMouseLeave={handleMouseLeaveNav} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop dark mode toggle */}
          <button
            className={styles.darkModeToggle}
            onClick={handleDarkModeToggle}
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              style={toggleIconStyle}
            />
          </button>

          {/* Desktop CTAs */}
          <div className={styles.ctaGroup}>
            <button 
              className={styles.ctaButtonGhost} 
              onClick={() => { navigate('/contact'); setMobileOpen(false); }} 
              type="button"
              onMouseEnter={() => handleMouseEnter('Contact Us')}
              style={{ position: 'relative' }}
            >
              Contact Us
              {activeMenu === 'Contact Us' && megaMenuData['Contact Us'] && (
                <MegaMenu activeMenu={activeMenu} alignment="right" onMouseLeave={handleMouseLeaveNav} />
              )}
            </button>
            <button 
              className={styles.ctaButton} 
              onClick={handleCTA} 
              type="button"
              onMouseEnter={() => handleMouseEnter('Careers')}
              style={{ position: 'relative' }}
            >
              Careers
              {activeMenu === 'Careers' && megaMenuData['Careers'] && (
                <MegaMenu activeMenu={activeMenu} alignment="right" onMouseLeave={handleMouseLeaveNav} />
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
            type="button"
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>

      {/* Mobile bottom-sheet overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <div className={styles.mobileSheet} onClick={(e) => e.stopPropagation()}>
            {/* Drag handle */}
            <div className={styles.dragHandle} />

            {/* Close button */}
            <button
              className={styles.closeButton}
              onClick={() => setMobileOpen(false)}
              type="button"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* Mobile links with vertical sub-links */}
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map((link) => {
                const hasSubLinks = !!megaMenuData[link.label];
                const isExpanded = mobileExpandedMenu === link.label;

                return (
                  <li key={link.path} className={styles.mobileLinkItem}>
                    <div className={styles.mobileLinkWrapper}>
                      <Link
                        to={link.path}
                        className={`${styles.mobileLink} ${isActive(link.path) ? styles.mobileLinkActive : ''}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {isActive(link.path) && <span className={styles.activeDot} />}
                        {link.label}
                      </Link>
                      {hasSubLinks && (
                        <button 
                          className={styles.mobileSubmenuToggle}
                          onClick={(e) => toggleMobileSubmenu(link.label, e)}
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${link.label} submenu`}
                        >
                          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                        </button>
                      )}
                    </div>
                    
                    {hasSubLinks && isExpanded && (
                      <ul className={styles.mobileSubLinks}>
                        {megaMenuData[link.label].map(sub => {
                          const routePrefix = link.label === 'Careers' ? '/careers' :
                                              link.label === 'Contact Us' ? '/contact' :
                                              `/${link.label.toLowerCase()}`;
                          const destPath = `${routePrefix}/${sub.slug}`;
                          
                          return (
                            <li key={sub.slug}>
                              <Link 
                                to={destPath}
                                className={styles.mobileSubLink}
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
              
              {/* Add Contact Us to mobile nav */}
              <li className={styles.mobileLinkItem}>
                <div className={styles.mobileLinkWrapper}>
                  <Link
                    to="/contact"
                    className={`${styles.mobileLink} ${isActive('/contact') ? styles.mobileLinkActive : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {isActive('/contact') && <span className={styles.activeDot} />}
                    Contact Us
                  </Link>
                  <button 
                    className={styles.mobileSubmenuToggle}
                    onClick={(e) => toggleMobileSubmenu('Contact Us', e)}
                  >
                    <FontAwesomeIcon icon={mobileExpandedMenu === 'Contact Us' ? faChevronUp : faChevronDown} />
                  </button>
                </div>
                {mobileExpandedMenu === 'Contact Us' && (
                  <ul className={styles.mobileSubLinks}>
                    {megaMenuData['Contact Us'].map(sub => (
                      <li key={sub.slug}>
                        <Link 
                          to={`/contact/${sub.slug}`}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            {/* Mobile dark mode toggle */}
            <button
              className={styles.mobileDarkModeToggle}
              onClick={handleDarkModeToggle}
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                className={styles.mobileDarkModeIcon}
                style={toggleIconStyle}
              />
              <span className={styles.mobileDarkModeLabel}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            {/* Mobile CTA */}
            <button className={styles.mobileCTA} onClick={handleCTA} type="button">
              Careers
            </button>
          </div>
        </div>
      )}
    </>
  );
}
