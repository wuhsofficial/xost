import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useScroll, useTransform, motion } from 'framer-motion';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import styles from './SolutionsPage.module.css';

/* ─── Static Data ──────────────────────────────────────────────────────── */
const solutions = [
  {
    title: 'Startup Launch Package',
    desc: 'MVP development, branding, and initial marketing, offering everything you need to go from idea to launch in 8 weeks.',
    features: ['Brand Identity', 'Responsive Website', 'SEO Setup', 'Social Media Kit'],
  },
  {
    title: 'Growth Accelerator',
    desc: 'Full-funnel digital marketing, performance analytics, and conversion optimization for businesses ready to scale.',
    features: ['PPC Campaigns', 'Content Strategy', 'A/B Testing', 'Analytics Dashboard'],
  },
  {
    title: 'Enterprise Digital Transformation',
    desc: 'End-to-end system modernization, custom software, and AI integration for large-scale operations.',
    features: ['Custom Software', 'AI/ML Integration', 'Cloud Migration', 'DevOps Pipeline'],
  },
  {
    title: 'Academic Excellence Suite',
    desc: 'Complete academic support including FYP development, university assessments, and research assistance.',
    features: ['FYP Development', 'Thesis Support', 'Lab Reports', 'Presentation Design'],
  },
];

const processSteps = [
  { number: '01', title: 'Discovery', desc: 'Deep dive into your goals, audience, and market landscape.' },
  { number: '02', title: 'Strategy', desc: 'Craft a data-backed roadmap tailored to your objectives.' },
  { number: '03', title: 'Execution', desc: 'Build, design, and deploy with agile precision.' },
  { number: '04', title: 'Optimize', desc: 'Measure, iterate, and scale what works.' },
];

const showcaseCards = [
  {
    gradient: 'linear-gradient(135deg, #00D4FF, #00FFB3)',
    number: '01',
    title: 'Brand Identity Overhaul',
    desc: 'Complete visual transformation for a fintech startup, from logo to landing page.',
  },
  {
    gradient: 'linear-gradient(135deg, #667EEA, #764BA2)',
    number: '02',
    title: 'E-Commerce Platform',
    desc: 'Full-stack marketplace serving 10,000+ daily transactions with sub-200ms response times.',
  },
  {
    gradient: 'linear-gradient(135deg, #FA709A, #FEE140)',
    number: '03',
    title: 'AI-Powered Analytics',
    desc: 'Machine learning dashboard that predicts customer churn with 94% accuracy.',
  },
  {
    gradient: 'linear-gradient(135deg, #11998E, #38EF7D)',
    number: '04',
    title: 'Mobile Banking App',
    desc: 'Cross-platform fintech app with biometric auth, serving 50K+ active users.',
  },
];

/* ─── Before/After Slider Component ────────────────────────────────────── */
function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const [dividerPos, setDividerPos] = useState(50);
  const isDragging = useRef(false);

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setDividerPos(pct);
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.baContainer}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Before panel */}
      <div className={styles.baBefore}>
        <div className={styles.baBeforeContent}>
          <div className={styles.baLabel}>Before</div>
          <div className={styles.baMockPlain}>
            <div className={styles.mockBarGray} />
            <div className={styles.mockBlockGray} />
            <div className={styles.mockBlockGray} style={{ width: '60%' }} />
            <div className={styles.mockBlockGray} style={{ width: '80%', opacity: 0.5 }} />
          </div>
        </div>
      </div>

      {/* After panel — clipped */}
      <div
        className={styles.baAfter}
        style={{ clipPath: `inset(0 ${100 - dividerPos}% 0 0)` }}
      >
        <div className={styles.baAfterContent}>
          <div className={styles.baLabelAfter}>After</div>
          <div className={styles.baMockVibrant}>
            <div className={styles.mockBarGradient} />
            <div className={styles.mockBlockGradient} />
            <div className={styles.mockBlockGradient} style={{ width: '60%' }} />
            <div className={styles.mockBlockAccent} style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className={styles.baDivider}
        style={{ left: `${dividerPos}%` }}
        onPointerDown={handlePointerDown}
      >
        <div className={styles.baDividerLine} />
        <div className={styles.baDividerHandle}>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.handleArrow} />
          <FontAwesomeIcon icon={faChevronRight} className={styles.handleArrow} />
        </div>
      </div>
    </div>
  );
}

/* ─── SolutionsPage ────────────────────────────────────────────────────── */
export default function SolutionsPage() {
  const horizontalRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ['start start', 'end end'],
  });
  const translateX = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <main className={styles.page}>
      {/* ─── Header ────────────────────────────────────────────────────── */}
      <TextMaskReveal tag="h1" className={styles.pageTitle}>
        Our Solutions
      </TextMaskReveal>
      <p className={styles.pageSubtitle}>
        Tailored solution packages that combine our core services into powerful,
        results-driven offerings for every business stage.
      </p>

      {/* ─── Solution Cards ────────────────────────────────────────────── */}
      <div className={styles.solutionsGrid}>
        {solutions.map((sol) => (
          <div key={sol.title} className={styles.solutionCard}>
            <h2 className={styles.solutionTitle}>{sol.title}</h2>
            <p className={styles.solutionDesc}>{sol.desc}</p>
            <ul className={styles.featuresList}>
              {sol.features.map((feat) => (
                <li key={feat} className={styles.featureItem}>
                  <span className={styles.featureIcon}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      style={{
                        background: 'var(--gradient-accent)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: 18,
                      }}
                    />
                  </span>
                  <span className={styles.featureText}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ─── Bento Box Layout ─────────────────────────────────────────────────── */}
      <section className={styles.bentoSection}>
        <TextMaskReveal tag="h2" className={styles.bentoTitle}>
          Pioneering the Future
        </TextMaskReveal>
        <div className={styles.bentoGrid}>
          {/* Digital Transformation */}
          <div className={`${styles.bentoCard} ${styles.bentoDigital}`}>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
              alt="Digital Transformation" 
              className={styles.bentoBg} 
            />
            <div className={styles.bentoOverlay} />
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoCardTitle}>Digital Transformation</h3>
              <p className={styles.bentoCardDesc}>
                Reimagine your business for the digital age with our end-to-end transformation strategies,
                turning legacy systems into agile powerhouses.
              </p>
            </div>
          </div>

          {/* Enterprise Automation */}
          <div className={`${styles.bentoCard} ${styles.bentoAutomation}`}>
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
              alt="Enterprise Automation" 
              className={styles.bentoBg} 
            />
            <div className={styles.bentoOverlay} />
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoCardTitle}>Enterprise Automation</h3>
              <p className={styles.bentoCardDesc}>
                Streamline operations with AI-driven workflows and RPA.
              </p>
            </div>
          </div>

          {/* Cloud Cost Optimization */}
          <div className={`${styles.bentoCard} ${styles.bentoCloud}`}>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" 
              alt="Cloud Cost Optimization" 
              className={styles.bentoBg} 
            />
            <div className={styles.bentoOverlay} />
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoCardTitle}>Cloud Cost Optimization</h3>
              <p className={styles.bentoCardDesc}>
                Maximize ROI with efficient, scalable infrastructure.
              </p>
            </div>
          </div>

          {/* Data-driven Decision Making */}
          <div className={`${styles.bentoCard} ${styles.bentoData}`}>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
              alt="Data-driven Decision Making" 
              className={styles.bentoBg} 
            />
            <div className={styles.bentoOverlay} />
            <div className={styles.bentoContent}>
              <h3 className={styles.bentoCardTitle}>Data-driven Decision Making</h3>
              <p className={styles.bentoCardDesc}>
                Harness big data and advanced analytics to uncover insights, predict trends, and outpace the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Horizontal Scroll Showcase ─────────────────────────────────── */}
      <section ref={horizontalRef} className={styles.horizontalScrollOuter}>
        <div className={styles.horizontalScrollSticky}>
          <div className={styles.horizontalScrollTitle}>
            <TextMaskReveal tag="h2" className={styles.showcaseTitle}>
              Our Work in Action
            </TextMaskReveal>
          </div>
          <motion.div className={styles.horizontalTrack} style={{ x: translateX }}>
            {showcaseCards.map((card) => (
              <div
                key={card.number}
                className={styles.showcaseCard}
                style={{ background: card.gradient }}
              >
                <span className={styles.showcaseNumber}>{card.number}</span>
                <h3 className={styles.showcaseCardTitle}>{card.title}</h3>
                <p className={styles.showcaseCardDesc}>{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Before / After Slider ──────────────────────────────────────── */}
      <section className={styles.baSection}>
        <TextMaskReveal tag="h2" className={styles.baTitle}>
          The Transformation
        </TextMaskReveal>
        <BeforeAfterSlider />
      </section>

      {/* ─── Process Section ───────────────────────────────────────────── */}
      <TextMaskReveal tag="h2" className={styles.processTitle}>
        Our Process
      </TextMaskReveal>
      <div className={styles.processGrid}>
        {processSteps.map((step) => (
          <div key={step.number} className={styles.processStep}>
            <div className={styles.stepNumber}>{step.number}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
