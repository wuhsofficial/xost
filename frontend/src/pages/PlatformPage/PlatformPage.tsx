import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChess, faLayerGroup, faChartLine, faMagnifyingGlass,
  faCompassDrafting, faCode, faRocket, faLightbulb,
  faBolt, faGem, faHeadset, faGlobe, faShieldHalved, faServer, faNetworkWired
} from '@fortawesome/free-solid-svg-icons';
import useScrollReveal from '../../hooks/useScrollReveal';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';

import TypewriterText from '../../components/TypewriterText/TypewriterText';
import MagneticButton from '../../components/MagneticButton/MagneticButton';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SEO from '../../components/SEO/SEO';
import TechGalaxy from '../../components/TechGalaxy/TechGalaxy';
import styles from './PlatformPage.module.css';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const features = [
  {
    icon: faChess,
    title: 'Strategy & Consulting',
    desc: 'We analyze your market, competitors, and goals to build a data-driven roadmap. Every decision is backed by research, every move calculated for maximum impact.',
    gradient: 'linear-gradient(135deg, #00D4FF, #00FFB3)',
  },
  {
    icon: faLayerGroup,
    title: 'Design & Development',
    desc: 'From wireframes to deployment, we craft pixel-perfect interfaces and robust backends. Our full-stack teams deliver products that users love and businesses rely on.',
    gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
  },
  {
    icon: faChartLine,
    title: 'Growth & Marketing',
    desc: "We don't just build — we grow. SEO, paid media, content strategy, and analytics combine to turn your digital presence into a revenue-generating machine.",
    gradient: 'linear-gradient(135deg, #FA709A, #FEE140)',
  },
];

const approachSteps = [
  { icon: faMagnifyingGlass, title: 'Discovery', desc: 'Deep-dive into your business, audience, and competitive landscape to uncover hidden opportunities.' },
  { icon: faCompassDrafting, title: 'Design', desc: 'Translate insights into wireframes, prototypes, and visual systems that users intuitively understand.' },
  { icon: faCode, title: 'Develop', desc: 'Build robust, scalable solutions using cutting-edge technologies with continuous integration and testing.' },
  { icon: faRocket, title: 'Deploy', desc: 'Launch with confidence — monitoring, optimization, and ongoing support ensure lasting success.' },
];



const stats = [
  { endValue: 50, suffix: '+', label: 'Projects' },
  { endValue: 15, suffix: '+', label: 'Clients' },
  { endValue: 3, suffix: '', label: 'Expert Founders' },
  { endValue: 100, suffix: '%', label: 'Satisfaction' },
];

const whyItems = [
  { icon: faLightbulb, title: 'Innovation', desc: "We stay on the cutting edge — from AI-powered tools to the latest frameworks — ensuring your product is future-proof from day one." },
  { icon: faBolt, title: 'Speed', desc: "Our agile workflows and parallel team structure deliver results in weeks, not months. Your time-to-market is our top priority." },
  { icon: faGem, title: 'Quality', desc: "Every line of code is reviewed, every pixel is placed with purpose. We ship production-grade work that stands the test of scale." },
  { icon: faHeadset, title: '24/7 Support', desc: "Your project doesn't sleep and neither does our support. Dedicated channels, real humans, and fast response times — always." },
];



/* ─── Map Data ─────────────────────────────────────────────────────────── */
const lahorePos = [31.5204, 74.3587];
const globalCities = [
  { name: "New York", pos: [40.7128, -74.0060] },
  { name: "San Francisco", pos: [37.7749, -122.4194] },
  { name: "London", pos: [51.5074, -0.1278] },
  { name: "Dubai", pos: [25.2048, 55.2708] },
  { name: "Singapore", pos: [1.3521, 103.8198] },
  { name: "Sydney", pos: [-33.8688, 151.2093] },
  { name: "Tokyo", pos: [35.6762, 139.6503] },
  { name: "Berlin", pos: [52.5200, 13.4050] }
];

/* ─── Animation Variants ───────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: 'easeOut' } },
});

/* ─── Sub-Components ───────────────────────────────────────────────────── */
interface LocalAnimatedCounterProps {
  endValue: number;
  suffix?: string;
  label: string;
}

function AnimatedCounter({ endValue, suffix = '', label }: LocalAnimatedCounterProps) {
  const { ref, value } = useAnimatedCounter(endValue);
  const springValue = useSpring(value, { stiffness: 300, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (value === endValue && value > 0) {
      /* Overshoot: briefly jump to 110% then spring back */
      springValue.set(endValue * 1.12);
      const timer = setTimeout(() => {
        springValue.set(endValue);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, endValue, springValue]);

  return (
    <div className={styles.statCard} ref={ref}>
      <div className={styles.statValue}>{displayValue}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

interface GlobalAnimatedCounterProps {
  endValue: number;
  suffix?: string;
  label: string;
}

function GlobalAnimatedCounter({ endValue, suffix = '', label }: GlobalAnimatedCounterProps) {
  const { ref, value } = useAnimatedCounter(endValue);
  const springValue = useSpring(value, { stiffness: 100, damping: 15 });
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (value === endValue && value > 0) {
      springValue.set(endValue * 1.05);
      const timer = setTimeout(() => {
        springValue.set(endValue);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [value, endValue, springValue]);

  return (
    <div className={styles.globalStat} ref={ref}>
      <span className={styles.globalStatValue}>{displayValue}{suffix}</span>
      <span className={styles.globalStatLabel}>{label}</span>
    </div>
  );
}

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function ScrollRevealWrapper({ children, delay = 0, className }: ScrollRevealWrapperProps) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 500ms ease-out ${delay}ms, transform 500ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── PlatformPage ─────────────────────────────────────────────────────── */
export default function PlatformPage() {
  const heroRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(!!(window as any).xostVideoLoaded);
  useEffect(() => {
    const handleLoaded = () => setVideoLoaded(true);
    window.addEventListener('xost-video-loaded', handleLoaded);
    return () => window.removeEventListener('xost-video-loaded', handleLoaded);
  }, []);
  useEffect(() => {
    // Fallback timer: force mark loaded after 8.0 seconds in case of block/slow network
    const fallbackTimer = setTimeout(() => {
      if (!(window as any).xostVideoLoaded) {
        (window as any).xostVideoLoaded = true;
        setVideoLoaded(true);
        window.dispatchEvent(new CustomEvent('xost-video-loaded'));
      }
    }, 8000);

    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (iframeRef.current) {
        try {
          const player = new (window as any).Vimeo.Player(iframeRef.current);
          
          const handleReady = () => {
            (window as any).xostVideoLoaded = true;
            setVideoLoaded(true);
            window.dispatchEvent(new CustomEvent('xost-video-loaded'));
            clearTimeout(fallbackTimer);
          };

          // Wait strictly for play or playing events (actually rendering)
          player.on('play', handleReady);
          player.on('playing', handleReady);

          // Force play command to guarantee playback trigger
          player.play().catch((err: any) => {
            console.warn("Vimeo autoplay policy check:", err);
          });
        } catch (e) {
          console.error("Vimeo Player initialization error", e);
        }
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <main>
      <SEO 
        title="XOST Platform | World-Class Digital Infrastructure" 
        description="We build the infrastructure of tomorrow. Strategy, Execution, and Scale delivered by experts who live technology." 
      />
      {/* ═══ A) HERO ═══ */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.videoBackground}>
          <div className={styles.videoOverlay}></div>
          <iframe
            ref={iframeRef}
            className={`${styles.video} ${videoLoaded ? styles.videoLoaded : ''}`}
            src="https://player.vimeo.com/video/1204087817?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&quality=1080p"
            title="XOST background reel"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>



        <div className={styles.heroContent}>
          <TextMaskReveal tag="h1" className={styles.heroTitleText}>
            We build the infrastructure of tomorrow
          </TextMaskReveal>

          <motion.div
            className={styles.subheadline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8, ease: 'easeOut' }}
          >
            <TypewriterText
              text="Strategy. Execution. Scale. Delivered by experts who live technology."
              startDelay={1200}
              speed={40}
            />
          </motion.div>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
          >
            <MagneticButton>
              <Link to="/services" className={styles.ctaGradient}>
                Explore Services
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/solutions" className={styles.ctaGhost}>
                View Our Work
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═══ B) WHAT WE DO ═══ */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            What We Do
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          Three pillars that power every project we deliver.
        </p>
        <div className={styles.featuresRow}>
          {features.map((feat, i) => (
            <ScrollRevealWrapper key={i} delay={i * 150} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FontAwesomeIcon
                  icon={feat.icon}
                  style={{
                    background: feat.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 40,
                  }}
                />
              </div>
              <h3 className={styles.featureTitle}>{feat.title}</h3>
              <p className={styles.featureDesc}>{feat.desc}</p>
              <div className={styles.featureUnderline} style={{ background: feat.gradient }} />
            </ScrollRevealWrapper>
          ))}
        </div>
      </section>

      {/* ═══ C) OUR APPROACH ═══ */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            Our Approach
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          A proven four-step process that turns ideas into impact.
        </p>
        <div className={styles.approachTimeline}>
          {approachSteps.map((step, i) => (
            <React.Fragment key={i}>
              <ScrollRevealWrapper delay={i * 200} className={styles.approachStep}>
                <div className={styles.stepIconCircle}>
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </ScrollRevealWrapper>
              {i < approachSteps.length - 1 && (
                <div className={styles.stepConnector}>
                  <div className={styles.connectorLine} />
                  <div className={styles.connectorDot} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ═══ D) TECH STACK CAROUSEL ═══ */}
      <section className={styles.techStackSection}>
        <div className={styles.section} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className={styles.sectionTitle}>
            <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
              Our Tech Stack
            </TextMaskReveal>
          </div>
          <p className={styles.sectionSubtitle}>
            Industry-leading technologies powering every solution we build.
          </p>
        </div>
        <TechGalaxy />
      </section>

      {/* ═══ PLATFORM CORE SECTIONS ═══ */}
      <section className={styles.platformCoreSection}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            The Engineering Engine
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          Built for scale, secured by design, and optimized for unparalleled performance.
        </p>
        
        <div className={styles.coreGrid}>
          <ScrollReveal direction="up" delay={100}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faServer} />
              </div>
              <h3 className={styles.coreCardTitle}>Core Architecture</h3>
              <p className={styles.coreCardDesc}>
                Distributed microservices orchestrated on Kubernetes, with polyglot persistence per workload — independently scalable and CI/CD-ready.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faNetworkWired} />
              </div>
              <h3 className={styles.coreCardTitle}>Integration & APIs</h3>
              <p className={styles.coreCardDesc}>
                API-first REST &amp; GraphQL interfaces, documented and secured, with event-driven Kafka pipelines for seamless real-time sync.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>
              <h3 className={styles.coreCardTitle}>Security & Compliance</h3>
              <p className={styles.coreCardDesc}>
                DevSecOps with automated scanning and OWASP hardening. AES-256 at rest, TLS 1.3 in transit — SOC 2, HIPAA, and GDPR compliant.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3 className={styles.coreCardTitle}>Scale & Performance</h3>
              <p className={styles.coreCardDesc}>
                Global edge caching, intelligent load balancing, and horizontal auto-scaling deliver sub-100ms responses through any traffic spike.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ E) STATS ═══ */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* ═══ F) WHY CHOOSE US ═══ */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            Why Choose Us
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          Four pillars that make every collaboration extraordinary.
        </p>
        <div className={styles.whyGrid}>
          {whyItems.map((item, i) => (
            <ScrollReveal
              key={i}
              delay={i * 120}
              direction={i % 2 === 0 ? 'left' : 'right'}
            >
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{
                      background: 'var(--gradient-accent)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: 28,
                    }}
                  />
                </div>
                <h3 className={styles.whyCardTitle}>{item.title}</h3>
                <p className={styles.whyCardDesc}>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ GLOBAL REACH SECTION ═══ */}
      <section className={styles.globalReachSection}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            Where We Build The Future
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          A globally distributed infrastructure, centralized around engineering excellence.
        </p>

        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={styles.leafletMapWrapper}
            whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(0, 212, 255, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <MapContainer
              {...({
                center: [25, 10],
                zoom: 2,
                minZoom: 2,
                maxBounds: [[-85, -180], [85, 180]],
                maxBoundsViscosity: 1.0,
                scrollWheelZoom: false,
                dragging: typeof window !== 'undefined' && !('ontouchstart' in window || navigator.maxTouchPoints > 0),
                touchZoom: true,
                style: { width: '100%', height: '500px', borderRadius: 'var(--radius-xl)', zIndex: 1 },
                attributionControl: false
              } as any)}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />

              {/* HQ Marker */}
              <CircleMarker
                {...({
                  center: lahorePos,
                  radius: 8,
                  pathOptions: {
                    className: styles.hqMarker,
                    color: '#00FFFF',
                    fillColor: '#00FFFF',
                    fillOpacity: 1
                  }
                } as any)}
              >
                <Tooltip {...({ direction: "top", offset: [0, -10], opacity: 1, permanent: true, className: styles.hqTooltip } as any)}>
                  <span style={{ color: '#00FFFF', fontWeight: 'bold' }}>Lahore (HQ)</span>
                </Tooltip>
              </CircleMarker>

              {/* Render rays and city markers */}
              {globalCities.map((city, idx) => (
                <React.Fragment key={idx}>
                  <Polyline
                    {...({
                      positions: [lahorePos, city.pos],
                      pathOptions: {
                        className: styles.connectingLine,
                        color: 'var(--accent-aqua)',
                        weight: 2,
                        opacity: 0.6
                      }
                    } as any)}
                  />
                  <CircleMarker
                    {...({
                      center: city.pos,
                      radius: 5,
                      pathOptions: {
                        className: styles.cityMarker,
                        color: 'var(--accent-mint)',
                        fillColor: 'var(--accent-mint)',
                        fillOpacity: 0.8
                      }
                    } as any)}
                  >
                    <Tooltip {...({ direction: "bottom", offset: [0, 10], opacity: 1, permanent: true, className: styles.cityTooltip } as any)}>
                      <span style={{ color: '#00FFFF', fontWeight: '600' }}>{city.name}</span>
                    </Tooltip>
                  </CircleMarker>
                </React.Fragment>
              ))}
            </MapContainer>
          </motion.div>
          
          <div className={styles.globalStats}>
             <GlobalAnimatedCounter endValue={50} suffix="+" label="Countries Served" />
             <GlobalAnimatedCounter endValue={10} suffix="M+" label="Active Users" />
          </div>
        </motion.div>
      </section>

      {/* ═══ G) PLATFORM PROMISE ═══ */}
      <section className={styles.promiseSection}>
        <h2 className={styles.promiseText}>
          Every project we touch becomes a product you&apos;re proud of.
        </h2>
        <Link to="/solutions" className={styles.promiseCta}>
          Start Your Project →
        </Link>
      </section>
    </main>
  );
}
