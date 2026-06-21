import { useEffect, useRef, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import Spotlight from './components/Spotlight/Spotlight';
import GenAIAssistant from './components/GenAIAssistant/GenAIAssistant';
import AISearchModal from './components/AISearchModal/AISearchModal';

/* ═══════════════════════════════════════════════════════════════════════════
   App Shell — Layout with Lenis smooth scroll, page transitions,
   noise overlay, dark mode, and back-to-top.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Page Transition Variants ────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function App(): JSX.Element {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  /* ── Global Ctrl+K shortcut ──────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* ── Initialize Lenis smooth scroll ─────────────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ── Scroll to top on route change ─────────────────────────────── */
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
        {/* Noise / Grain Texture Overlay */}
        <div className="noiseOverlay" />

        <Navbar onSearchOpen={openSearch} />
        <Spotlight />

        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            className="pageTransition"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <Footer />
        <BackToTop />

        {/* AI Integrations — global */}
        <GenAIAssistant />
        <AISearchModal isOpen={searchOpen} onClose={closeSearch} />
    </div>
  );
}
