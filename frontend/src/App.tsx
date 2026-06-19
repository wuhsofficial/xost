import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import Spotlight from './components/Spotlight/Spotlight';
import { DarkModeProvider } from './contexts/DarkModeContext';

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
    <DarkModeProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'var(--bg-primary)',
          transition: 'background-color 400ms ease',
        }}
      >
        {/* Noise / Grain Texture Overlay */}
        <div className="noiseOverlay" />

        <Navbar />
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
      </div>
    </DarkModeProvider>
  );
}
