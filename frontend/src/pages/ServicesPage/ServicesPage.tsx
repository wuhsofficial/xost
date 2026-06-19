import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import allServices from '../../data/servicesData';
import GradientMesh from '../../components/GradientMesh/GradientMesh';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import MagneticButton from '../../components/MagneticButton/MagneticButton';
import MorphingBlob from '../../components/MorphingBlob/MorphingBlob';
import FloatingLogos from '../../components/FloatingLogos/FloatingLogos';
import SEO from '../../components/SEO/SEO';
import styles from './ServicesPage.module.css';

/* ─── Animation helpers ────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

/* ─── Grid direction helper: 4-col grid ────────────────────────────────── */
function getCardDirection(index, columns = 4) {
  const colIndex = index % columns;
  if (colIndex === 0) return 'left';
  if (colIndex === columns - 1) return 'right';
  return 'up';
}

const categories = [
  {
    title: "Enterprise & Software Development",
    content: "We engineer bespoke enterprise solutions designed to streamline complex operations, maximize efficiency, and foster sustainable growth. Our software development lifecycle is rooted in agile methodologies, ensuring that every application we deliver is robust, scalable, and perfectly aligned with your strategic business objectives. From monolithic migrations to distributed microservices architectures, our team of seasoned engineers utilizes cutting-edge frameworks to build high-performance applications that endure the test of time.",
    blobColors: ['rgba(0,212,255,0.15)', 'rgba(0,255,179,0.1)'],
    blobPosition: 'right'
  },
  {
    title: "Cloud Architecture & Migration",
    content: "Transitioning to the cloud is more than just lifting and shifting; it's about redefining your operational capabilities. We architect cloud-native environments that ensure 99.99% uptime, seamless elasticity, and optimized cost management. Whether navigating AWS, Azure, or Google Cloud, our experts design infrastructure as code (IaC) solutions that automate provisioning, enhance disaster recovery protocols, and create an impenetrable foundation for your digital enterprise.",
    blobColors: ['rgba(102,126,234,0.15)', 'rgba(118,75,162,0.1)'],
    blobPosition: 'left'
  },
  {
    title: "Data Engineering & Analytics",
    content: "Data is the lifeblood of modern business, but its true value lies in actionable intelligence. Our data engineering teams construct highly resilient data pipelines, scalable data lakes, and high-performance warehousing solutions capable of processing petabytes of information in real time. We empower your decision-makers with advanced analytics dashboards, predictive modeling, and deep business intelligence integration, transforming raw data into your most significant competitive advantage.",
    blobColors: ['rgba(250,112,154,0.15)', 'rgba(254,225,64,0.1)'],
    blobPosition: 'right'
  },
  {
    title: "AI & Machine Learning Integration",
    content: "We integrate state-of-the-art natural language processing, computer vision, and predictive machine learning models directly into your product ecosystem. Our AI solutions are designed to automate repetitive workflows, personalize user experiences at scale, and uncover hidden patterns within your operational data. By deploying production-ready AI pipelines, we ensure that your business remains at the absolute forefront of technological innovation.",
    blobColors: ['rgba(0,255,179,0.15)', 'rgba(0,212,255,0.1)'],
    blobPosition: 'left'
  },
  {
    title: "Cybersecurity & Risk Management",
    content: "In an increasingly hostile digital landscape, proactive defense is non-negotiable. We implement zero-trust architectures, end-to-end encryption protocols, and continuous vulnerability assessments to safeguard your critical assets. Our security operations are fully compliant with global standards (SOC 2, GDPR, HIPAA), ensuring that your applications are not only incredibly fast and reliable but also fortified against the most sophisticated cyber threats.",
    blobColors: ['rgba(255,75,75,0.15)', 'rgba(255,150,75,0.1)'],
    blobPosition: 'right'
  }
];

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main className={styles.page}>
      <SEO 
        title="Our Services | XOST Agency" 
        description="Explore our premium services including Web Development, UI/UX Design, Strategy, and Digital Marketing."
      />
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <GradientMesh className={styles.heroMeshBg} />
        <motion.h1 className={styles.heroTitle} {...fadeUp(0)}>
          Services That Drive Real Results
        </motion.h1>
        <motion.p className={styles.heroSubtitle} {...fadeUp(0.3)}>
          From concept to conversion — we cover every layer of your digital presence.
        </motion.p>
      </section>

      {/* ─── Categorized Sections ───────────────────────────────────────── */}
      <section className={styles.categoriesSection}>
        {categories.map((cat, i) => (
          <div key={cat.title} className={`${styles.categoryRow} ${cat.blobPosition === 'left' ? styles.rowReverse : ''}`}>
            <div className={styles.categoryContent}>
              <ScrollReveal direction="up" delay={100}>
                <TextMaskReveal tag="h2" className={styles.categoryTitle}>
                  {cat.title}
                </TextMaskReveal>
                <p className={styles.categoryDesc}>{cat.content}</p>
              </ScrollReveal>
            </div>
            <div className={styles.categoryVisual}>
              <motion.div 
                className={styles.blobWrapper}
                style={{ y: i % 2 === 0 ? yBlob1 : yBlob2 }}
              >
                <MorphingBlob size={300} colors={cat.blobColors} duration={8 + i} />
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Categorized Services Grid ──────────────────────────────────── */}
      <section className={styles.gridSection}>
        <div className={styles.sectionTitleWrap}>
          <TextMaskReveal tag="h2" className={styles.gridSectionTitle}>
            Our Specialized Offerings
          </TextMaskReveal>
        </div>
        
        {/* Group services by category */}
        {Object.entries(
          allServices.reduce((acc: Record<string, any[]>, service) => {
            if (!acc[service.category]) acc[service.category] = [];
            acc[service.category].push(service);
            return acc;
          }, {})
        ).map(([categoryName, servicesGroup], groupIndex) => (
          <div key={categoryName} style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '2rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--card-border)', opacity: 0.9 }}>
              {categoryName}
            </h3>
            <div className={styles.servicesGrid}>
              {servicesGroup.map((service, i) => (
                <ScrollReveal
                  key={service.title}
                  delay={i * 80}
                  direction={getCardDirection(i, 4)}
                >
                  <motion.div
                    className={styles.serviceCard}
                    style={{
                      borderColor: undefined,
                    }}
                    whileHover={{
                      borderColor: `${service.gradientStart}80`,
                    }}
                  >
                    <div
                      className={styles.iconBox}
                      style={{
                        background: `linear-gradient(135deg, ${service.gradientStart}26, ${service.gradientEnd}14)`,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={service.icon}
                        style={{
                          background: `linear-gradient(135deg, ${service.gradientStart}, ${service.gradientEnd})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: 22,
                        }}
                      />
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDesc}>{service.description}</p>
                    <div
                      className={styles.accentLine}
                      style={{
                        background: `linear-gradient(135deg, ${service.gradientStart}, ${service.gradientEnd})`,
                      }}
                    />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Floating Logos Animation ───────────────────────────────────── */}
      <section style={{ margin: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <TextMaskReveal tag="h2">
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              An Ecosystem of Excellence
            </span>
          </TextMaskReveal>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            All the moving parts that make your digital vision a reality.
          </p>
        </div>
        <FloatingLogos services={allServices} />
      </section>

      {/* ─── Bottom CTA ─────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <TextMaskReveal tag="h2" className={styles.ctaTitle}>
          Not sure where to start?
        </TextMaskReveal>
        <motion.p className={styles.ctaSubtitle} {...fadeUp(0.15)}>
          Let us help you find the perfect combination of services for your goals.
        </motion.p>
        <motion.div {...fadeUp(0.4)}>
          <MagneticButton>
            <Link to="/solutions" className={styles.ctaButton}>
              Book a Free Consultation
              <span className={styles.ctaArrow}>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </Link>
          </MagneticButton>
        </motion.div>
      </section>
    </main>
  );
}
