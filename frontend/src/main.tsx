import React, { useState, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

import App from './App';
import { ErrorBoundary } from './ErrorBoundary';
import SplashScreen from './components/SplashScreen/SplashScreen';

const PlatformPage = lazy(() => import('./pages/PlatformPage/PlatformPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage/SolutionsPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage/InsightsPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage/IndustriesPage'));
const CareersHome = lazy(() => import('./pages/CareersPages/CareersHome'));
const FeaturedCareer = lazy(() => import('./pages/CareersPages/FeaturedCareer'));
const HowToApply = lazy(() => import('./pages/CareersPages/HowToApply'));
const HiringPath = lazy(() => import('./pages/CareersPages/HiringPath'));
const LifeAtXost = lazy(() => import('./pages/CareersPages/LifeAtXost'));
const WhereWeWork = lazy(() => import('./pages/CareersPages/WhereWeWork'));
const OfferedJobs = lazy(() => import('./pages/CareersPages/OfferedJobs'));
const Internships = lazy(() => import('./pages/CareersPages/Internships'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const GeneralInquiries = lazy(() => import('./pages/ContactPages/GeneralInquiries'));
const SalesPartnerships = lazy(() => import('./pages/ContactPages/SalesPartnerships'));
const SupportHelp = lazy(() => import('./pages/ContactPages/SupportHelp'));
const Sponsorships = lazy(() => import('./pages/ContactPages/Sponsorships'));
const SubPageTemplate = lazy(() => import('./pages/SubPageTemplate/SubPageTemplate'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
import PageWrapper from './components/PageWrapper/PageWrapper';

import './styles/global.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Application Entry Point
   Wraps the app in BrowserRouter and displays a splash screen on first load.
   ═══════════════════════════════════════════════════════════════════════════ */

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<App />}>
          <Route index element={<PageWrapper><PlatformPage /></PageWrapper>} />
          <Route path="services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
          <Route path="solutions" element={<PageWrapper><SolutionsPage /></PageWrapper>} />
          <Route path="insights" element={<PageWrapper><InsightsPage /></PageWrapper>} />
          <Route path="industries" element={<PageWrapper><IndustriesPage /></PageWrapper>} />
          {/* Careers Independent Routes */}
          <Route path="careers" element={<Navigate to="/careers/home" replace />} />
          <Route path="careers/home" element={<PageWrapper><CareersHome /></PageWrapper>} />
          <Route path="careers/featured-career" element={<PageWrapper><FeaturedCareer /></PageWrapper>} />
          <Route path="careers/how-to-apply" element={<PageWrapper><HowToApply /></PageWrapper>} />
          <Route path="careers/hiring-path" element={<PageWrapper><HiringPath /></PageWrapper>} />
          <Route path="careers/life-at-xost" element={<PageWrapper><LifeAtXost /></PageWrapper>} />
          <Route path="careers/where-we-work" element={<PageWrapper><WhereWeWork /></PageWrapper>} />
          <Route path="careers/offered-jobs" element={<PageWrapper><OfferedJobs /></PageWrapper>} />
          <Route path="careers/internships" element={<PageWrapper><Internships /></PageWrapper>} />
          <Route path="about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          
          {/* Independent Contact Us Sub-Pages */}
          <Route path="contact/general-inquiries" element={<PageWrapper><GeneralInquiries /></PageWrapper>} />
          <Route path="contact/sales-partnerships" element={<PageWrapper><SalesPartnerships /></PageWrapper>} />
          <Route path="contact/support-help" element={<PageWrapper><SupportHelp /></PageWrapper>} />
          <Route path="contact/sponsorships" element={<PageWrapper><Sponsorships /></PageWrapper>} />

          {/* Dynamic catch-all for mega menu sub-pages */}
          <Route path=":category/:slug" element={<PageWrapper><SubPageTemplate /></PageWrapper>} />

          {/* 404 Wildcard Route */}
          <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function Root() {
  const [showSplash, setShowSplash] = useState(true);

  const LoadingFallback = (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,212,255,0.2)', borderTopColor: 'var(--accent-aqua)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  return (
    <HelmetProvider>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      <BrowserRouter>
        <Suspense fallback={LoadingFallback}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </React.StrictMode>
);
