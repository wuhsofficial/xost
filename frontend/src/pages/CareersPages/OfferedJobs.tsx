import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  faMapPin,
  faBriefcase,
  faArrowRight,
  faClock,
  faChevronRight,
  faWifi,
  faHeartPulse,
  faGraduationCap,
  faChartLine,
  faCalendarDays,
  faPlane,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './OfferedJobs.module.css';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Architect and ship high-performance React applications at scale. Work alongside world-class engineers building next-gen user interfaces powered by WebGL and AI.',
    tags: ['React', 'TypeScript', 'GraphQL'],
    color: '#00FFFF',
  },
  {
    id: 2,
    title: 'Cloud Solutions Architect',
    dept: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    description:
      'Design and own multi-cloud infrastructure across AWS, GCP, and Azure. Drive architectural decisions for systems serving millions of concurrent users globally.',
    tags: ['AWS', 'Kubernetes', 'Terraform'],
    color: '#00FFFF',
  },
  {
    id: 3,
    title: 'AI/ML Engineer',
    dept: 'AI & Data',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Build and fine-tune large language models and computer vision pipelines. Push the frontier of generative AI for enterprise clients across fintech and healthcare.',
    tags: ['PyTorch', 'LLMs', 'MLOps'],
    color: '#D946EF',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    dept: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Craft pixel-perfect, research-driven digital experiences. Own the end-to-end design lifecycle from wireframes to interactive Figma prototypes and design systems.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
    color: '#FF8C00',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    dept: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    description:
      'Automate, monitor, and harden our CI/CD pipelines. Champion reliability engineering with zero-downtime deployments and sub-second observability tooling.',
    tags: ['Docker', 'GitHub Actions', 'Prometheus'],
    color: '#00FFFF',
  },
  {
    id: 6,
    title: 'Business Development Manager',
    dept: 'Sales',
    location: 'On-site',
    type: 'Full-time',
    description:
      'Identify and close strategic partnerships with Fortune 500 companies. Lead the full sales cycle from prospecting to contract negotiation for 7-figure deals.',
    tags: ['Enterprise Sales', 'CRM', 'Strategy'],
    color: '#3fb950',
  },
];

const FILTERS = ['All', 'Engineering', 'Design', 'AI & Data', 'Sales'];

const BENEFITS = [
  {
    icon: faWifi,
    title: 'Remote Work',
    desc: 'Work from anywhere in the world. We are async-first and results-driven, not clock-watchers.',
    color: '#00FFFF',
  },
  {
    icon: faHeartPulse,
    title: 'Health Insurance',
    desc: 'Comprehensive medical, dental, and vision coverage for you and your dependants, globally.',
    color: '#D946EF',
  },
  {
    icon: faGraduationCap,
    title: 'Learning Budget',
    desc: '$3,000 annual budget for courses, certifications, conferences, and books. Never stop growing.',
    color: '#FFD700',
  },
  {
    icon: faChartLine,
    title: 'Stock Options',
    desc: 'Meaningful equity from day one. We want you to own what you build and share in our success.',
    color: '#3fb950',
  },
  {
    icon: faCalendarDays,
    title: 'Flexible Hours',
    desc: 'Core hours exist to collaborate, but your schedule is yours. We trust you to deliver.',
    color: '#FF8C00',
  },
  {
    icon: faPlane,
    title: 'Team Retreats',
    desc: 'Twice-yearly company-wide retreats to world-class destinations. Work hard, explore harder.',
    color: '#00FFFF',
  },
];

/* ─── Animation Variants ─────────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

/* ─── Department Color Mapping ───────────────────────────────────────────── */

const deptColorMap: Record<string, string> = {
  Engineering: '#00FFFF',
  'AI & Data': '#D946EF',
  Design: '#FF8C00',
  Sales: '#3fb950',
};

const locationColorMap: Record<string, string> = {
  Remote: '#3fb950',
  Hybrid: '#FFD700',
  'On-site': '#D946EF',
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function OfferedJobs() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredJobs =
    activeFilter === 'All' ? JOBS : JOBS.filter((j) => j.dept === activeFilter);

  return (
    <div className={styles.pageWrapper}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        {/* Animated gradient orbs */}
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroPill}
            custom={0}
            initial="hidden"
            animate="show"
            variants={heroTextVariants}
          >
            <span className={styles.pillDot} />
            We're Hiring
          </motion.div>

          <motion.h1
            className={styles.heroHeadline}
            custom={0.15}
            initial="hidden"
            animate="show"
            variants={heroTextVariants}
          >
            Join the{' '}
            <span className={styles.heroGradient}>XOST Team</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubhead}
            custom={0.3}
            initial="hidden"
            animate="show"
            variants={heroTextVariants}
          >
            We build the digital infrastructure of tomorrow. Join a collective of
            elite engineers, designers, and visionaries shaping what's next.
          </motion.p>

          <motion.div
            className={styles.heroStats}
            custom={0.45}
            initial="hidden"
            animate="show"
            variants={heroTextVariants}
          >
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>6+</span>
              <span className={styles.heroStatLabel}>Open Roles</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>4</span>
              <span className={styles.heroStatLabel}>Departments</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>100%</span>
              <span className={styles.heroStatLabel}>Remote Friendly</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Filter Bar ────────────────────────────────────────────────── */}
      <section className={styles.filterSection}>
        <div className={styles.filterBar}>
          <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
          <span className={styles.filterCount}>
            {filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── Job Listings ──────────────────────────────────────────────── */}
      <section className={styles.jobsSection}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={styles.jobsGrid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredJobs.length === 0 ? (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No positions found in this category.
              </motion.div>
            ) : (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  className={styles.jobCard}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  style={{ '--accent': job.color } as React.CSSProperties}
                >
                  {/* Glow border on hover */}
                  <div className={styles.jobCardGlow} style={{ background: job.color }} />

                  <div className={styles.jobCardHeader}>
                    <div className={styles.jobBadges}>
                      <span
                        className={styles.deptBadge}
                        style={{
                          color: deptColorMap[job.dept] ?? '#00FFFF',
                          borderColor: `${deptColorMap[job.dept] ?? '#00FFFF'}40`,
                          background: `${deptColorMap[job.dept] ?? '#00FFFF'}12`,
                        }}
                      >
                        {job.dept}
                      </span>
                    </div>
                    <div className={styles.jobMeta}>
                      <span
                        className={styles.locationBadge}
                        style={{ color: locationColorMap[job.location] ?? '#fff' }}
                      >
                        <FontAwesomeIcon icon={faMapPin} className={styles.metaIcon} />
                        {job.location}
                      </span>
                      <span className={styles.typeBadge}>
                        <FontAwesomeIcon icon={faClock} className={styles.metaIcon} />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.jobTitle}>{job.title}</h3>

                  <p className={styles.jobDesc}>{job.description}</p>

                  <div className={styles.jobTags}>
                    {job.tags.map((tag) => (
                      <span key={tag} className={styles.jobTag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.jobCardFooter}>
                    <button className={styles.applyBtn}>
                      Apply Now
                      <FontAwesomeIcon icon={faArrowRight} className={styles.applyArrow} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Benefits Section ──────────────────────────────────────────── */}
      <section className={styles.benefitsSection}>
        <motion.div
          className={styles.benefitsInner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.benefitsHeader}>
            <h2 className={styles.benefitsTitle}>Why Work at XOST?</h2>
            <p className={styles.benefitsSubtitle}>
              We invest in our team the same way we invest in our products, without compromise.
            </p>
          </div>

          <motion.div
            className={styles.benefitsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                className={styles.benefitCard}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div
                  className={styles.benefitIconWrap}
                  style={{ background: `${b.color}18`, borderColor: `${b.color}30` }}
                >
                  <FontAwesomeIcon
                    icon={b.icon}
                    className={styles.benefitIcon}
                    style={{ color: b.color }}
                  />
                </div>
                <h4 className={styles.benefitTitle}>{b.title}</h4>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaBanner}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaOrb} />
          <h2 className={styles.ctaTitle}>Don't see a perfect fit?</h2>
          <p className={styles.ctaText}>
            We are always on the lookout for exceptional talent. Send us your résumé and we'll reach out when the right opportunity arises.
          </p>
          <button className={styles.ctaButton}>
            Send Open Application
            <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '0.5rem' }} />
          </button>
        </motion.div>
      </section>

    </div>
  );
}
