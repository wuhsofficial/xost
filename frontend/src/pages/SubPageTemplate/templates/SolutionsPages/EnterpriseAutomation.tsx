import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { Bot, FastForward, Activity, Settings, UserPlus, Package, Calculator, CheckCircle } from 'lucide-react';
import styles from './SolutionsPages.module.css';

export default function EnterpriseAutomation({ pageData }) {
  const [lottieData, setLottieData] = useState(null);
  
  // ROI Calculator State
  const [teamSize, setTeamSize] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursSavedPerEmployee, setHoursSaved] = useState(15);
  
  useEffect(() => {
    // Gears/Automation lottie
    fetch("https://assets10.lottiefiles.com/packages/lf20_hxart9lz.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const estimatedSavings = teamSize * hourlyRate * hoursSavedPerEmployee;

  const barOptions: any = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF'],
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['HR', 'Finance', 'IT Ops', 'Sales', 'Support'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' }
  };
  const barSeries = [{ name: 'Hours Saved/Month', data: [120, 350, 400, 200, 500] }];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 180 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Streamline critical workflows efficiently</h2>
        <p className={styles.heroSubhead}>Eliminate manual bottlenecks with Intelligent RPA.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>1M+</span>
          <span className={styles.statLabel}>Tasks Automated</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>85%</span>
          <span className={styles.statLabel}>Manual Work Reduced</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt; 2s</span>
          <span className={styles.statLabel}>Process Execution</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Automation Flow</h3>
        <div className={styles.flowContainer}>
          {['Manual Trigger', 'Process Detection', 'RPA Bot Exec', 'Validation', 'Output', 'Reporting'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={styles.flowNode}>{step}</div>
              {i < arr.length - 1 && <div className={styles.flowLine} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Hours Saved by Department</h3>
          <Chart options={barOptions as any} series={barSeries} type="bar" height={300} />
        </div>
        
        <div className={styles.roiCalculator}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-aqua)' }}>
            <Calculator /> Calculate Your ROI
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Estimate your monthly savings based on typical RPA implementation.</p>
          
          <div className={styles.roiInputGroup}>
            <label>Team Size (Employees)</label>
            <input type="number" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className={styles.roiInput} />
          </div>
          <div className={styles.roiInputGroup}>
            <label>Average Hourly Rate ($)</label>
            <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className={styles.roiInput} />
          </div>
          <div className={styles.roiInputGroup}>
            <label>Hours Saved per Employee / Month</label>
            <input type="range" min="5" max="50" value={hoursSavedPerEmployee} onChange={(e) => setHoursSaved(Number(e.target.value))} />
            <span style={{ textAlign: 'right', color: 'var(--accent-aqua)', fontWeight: 'bold' }}>{hoursSavedPerEmployee} hrs</span>
          </div>
          
          <div className={styles.roiResult}>
            <span style={{ color: 'var(--text-secondary)' }}>Estimated Monthly Savings</span>
            <span className={styles.roiAmount}>${estimatedSavings.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Use Cases</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <FastForward className={styles.bentoIcon} />
            <h4>Invoice Processing</h4>
            <p>OCR-driven extraction and automatic ERP entry.</p>
          </div>
          <div className={styles.bentoCard}>
            <UserPlus className={styles.bentoIcon} />
            <h4>HR Onboarding</h4>
            <p>Automated account creation, email setup, and doc delivery.</p>
          </div>
          <div className={styles.bentoCard}>
            <Package className={styles.bentoIcon} />
            <h4>Inventory Management</h4>
            <p>Real-time syncing and low-stock reorder triggers.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Tech Stack</h3>
        <div style={{ 
          background: 'rgba(217, 70, 239, 0.05)', 
          border: '1px solid rgba(217, 70, 239, 0.2)', 
          borderRadius: '20px', 
          padding: '3rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background decoration */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'rgba(0, 255, 255, 0.2)', filter: 'blur(50px)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(217, 70, 239, 0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
          
          {['UiPath', 'Power Automate', 'Zapier', 'n8n', 'Python Scripts', 'Custom RPA Agents'].map((tech, i) => (
            <motion.div 
              key={tech} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: 'var(--text-primary)',
                fontWeight: '500',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                zIndex: 1
              }}
            >
              <CheckCircle size={16} color={i % 2 === 0 ? "#00FFFF" : "#D946EF"} /> {tech}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
