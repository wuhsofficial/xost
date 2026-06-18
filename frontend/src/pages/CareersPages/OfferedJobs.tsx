import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Filter, ArrowRight } from 'lucide-react';
import styles from './CareersPages.module.css';

const jobs = [
  { id: 1, title: 'Lead AI Architect', dept: 'Engineering', loc: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Senior React Native Developer', dept: 'Engineering', loc: 'Dubai', type: 'Full-time' },
  { id: 3, title: 'Product Designer (UI/UX)', dept: 'Design', loc: 'London', type: 'Full-time' },
  { id: 4, title: 'DevOps Engineer', dept: 'Infrastructure', loc: 'Remote', type: 'Contract' },
  { id: 5, title: 'Technical Recruiter', dept: 'HR', loc: 'Dubai', type: 'Full-time' },
  { id: 6, title: 'Backend Node.js Developer', dept: 'Engineering', loc: 'Remote', type: 'Full-time' }
];

const departments = ['All', 'Engineering', 'Design', 'Infrastructure', 'HR'];

export default function OfferedJobs() {
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesDept = activeDept === 'All' || job.dept === activeDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.heroHeader}>
        <motion.h1 
          className={styles.heroHeadline}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Open Positions
        </motion.h1>
        <p className={styles.heroSubhead}>
          Find your next big challenge. We are constantly looking for exceptional talent to join our ranks.
        </p>
      </header>

      <section className={styles.section} style={{ paddingTop: '2rem' }}>
        {/* Filters and Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: `1px solid ${activeDept === dept ? '#00FFFF' : 'var(--card-border)'}`,
                  background: activeDept === dept ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                  color: activeDept === dept ? '#00FFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {dept}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search color="var(--text-secondary)" size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search roles..." 
              className={styles.formInput}
              style={{ paddingLeft: '2.5rem', borderRadius: '20px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {filteredJobs.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No jobs found matching your criteria.
              </motion.div>
            ) : (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'var(--card-surface)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '12px',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                >
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Briefcase size={16} /> {job.dept}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16} /> {job.loc}</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className={styles.ctaBtn} style={{ color: '#D946EF' }}>Apply <ArrowRight size={16} /></button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
