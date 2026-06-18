import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Star, MapPin, Users, GraduationCap, Compass } from 'lucide-react';
import styles from './CareersPages.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CareersHome() {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <header className={styles.heroHeader}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Build the Future with XOST
        </motion.h1>
        <motion.p 
          className={styles.heroSubhead}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join a collective of elite engineers, designers, and visionaries. 
          We don't just write code; we architect the next generation of digital experiences.
        </motion.p>
      </header>

      {/* Bento Grid Hub */}
      <section className={styles.section}>
        <motion.div 
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Featured Careers */}
          <Link to="/careers/featured-career" className={styles.bentoCard} style={{ gridColumn: '1 / -1', borderImage: 'linear-gradient(90deg, #00FFFF, #D946EF) 1' }}>
            <Star color="#FFD700" size={32} className={styles.bentoIcon} />
            <h3 className={styles.bentoTitle}>Featured Careers</h3>
            <p className={styles.bentoDesc}>
              Discover our top-priority openings. We are actively searching for Staff Engineers, Lead Cloud Architects, and AI Specialists to join our core teams.
            </p>
            <div className={styles.ctaBtn}>
              Explore Roles <ArrowRight size={16} />
            </div>
          </Link>

          {/* Life at XOST */}
          <Link to="/careers/life-at-xost" className={styles.bentoCard}>
            <Users color="#D946EF" size={32} className={styles.bentoIcon} />
            <h3 className={styles.bentoTitle}>Life at XOST</h3>
            <p className={styles.bentoDesc}>
              Explore our culture, perks, and what your day-to-day looks like working in a high-performance environment.
            </p>
            <div className={styles.ctaBtn}>
              See Inside <ArrowRight size={16} />
            </div>
          </Link>

          {/* Where We Work */}
          <Link to="/careers/where-we-work" className={styles.bentoCard}>
            <MapPin color="#00FFFF" size={32} className={styles.bentoIcon} />
            <h3 className={styles.bentoTitle}>Where We Work</h3>
            <p className={styles.bentoDesc}>
              From our futuristic hubs in Dubai to fully remote setups across the globe. See our distributed architecture.
            </p>
            <div className={styles.ctaBtn}>
              View Locations <ArrowRight size={16} />
            </div>
          </Link>

          {/* How to Apply */}
          <Link to="/careers/how-to-apply" className={styles.bentoCard}>
            <Compass color="#3fb950" size={32} className={styles.bentoIcon} />
            <h3 className={styles.bentoTitle}>How to Apply</h3>
            <p className={styles.bentoDesc}>
              Learn about our transparent, fast-paced hiring process focused on practical skills.
            </p>
            <div className={styles.ctaBtn}>
              View Process <ArrowRight size={16} />
            </div>
          </Link>

          {/* Hiring Path */}
          <Link to="/careers/hiring-path" className={styles.bentoCard}>
            <MapPin color="#FFD700" size={32} className={styles.bentoIcon} />
            <h3 className={styles.bentoTitle}>Hiring Path</h3>
            <p className={styles.bentoDesc}>
              Understand how we promote and grow talent. See the path from Junior Developer to Principal Architect.
            </p>
            <div className={styles.ctaBtn}>
              View Path <ArrowRight size={16} />
            </div>
          </Link>

          {/* Internships */}
          <Link to="/careers/internships" className={styles.bentoCard}>
            <GraduationCap color="#FF8C00" size={32} className={styles.bentoIcon} />
            <h3 className={styles.bentoTitle}>Internships</h3>
            <p className={styles.bentoDesc}>
              Still studying or freshly graduated? Launch your career with hands-on mentorship on real-world enterprise projects.
            </p>
            <div className={styles.ctaBtn}>
              Join Program <ArrowRight size={16} />
            </div>
          </Link>
          
          {/* All Offered Jobs */}
          <Link to="/careers/offered-jobs" className={styles.bentoCard} style={{ gridColumn: '1 / -1', textAlign: 'center', alignItems: 'center' }}>
            <Briefcase color="#fff" size={48} className={styles.bentoIcon} style={{ margin: '0 auto 1.5rem auto' }} />
            <h3 className={styles.bentoTitle}>View All Openings</h3>
            <p className={styles.bentoDesc} style={{ maxWidth: '600px' }}>
              Ready to take the leap? Browse all our currently open positions across Engineering, Design, Product, and Sales.
            </p>
            <button className={styles.submitBtn} style={{ maxWidth: '300px', marginTop: '1.5rem' }}>
              Browse Jobs Board
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
