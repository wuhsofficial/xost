import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO/SEO';
import GradientMesh from '../../components/GradientMesh/GradientMesh';
import GradientButton from '../../components/GradientButton/GradientButton';
import MagneticButton from '../../components/MagneticButton/MagneticButton';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <SEO 
        title="404 - Page Not Found | XOST" 
        description="The page you are looking for does not exist." 
      />
      <GradientMesh />
      
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        404
      </motion.h1>

      <motion.h2 
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        Lost in the digital void
      </motion.h2>

      <motion.p 
        className={styles.text}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </motion.p>

      <motion.div 
        className={styles.btnWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <MagneticButton>
          <Link to="/">
            <GradientButton label="Return to Base" />
          </Link>
        </MagneticButton>
      </motion.div>
    </main>
  );
}
