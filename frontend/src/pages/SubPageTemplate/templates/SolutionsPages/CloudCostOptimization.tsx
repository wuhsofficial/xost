import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { DollarSign, Search, ShieldCheck, Activity, Trash2, Sliders } from 'lucide-react';
import styles from './SolutionsPages.module.css';

export default function CloudCostOptimization({ pageData }) {
  const [savings, setSavings] = useState(11500000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSavings(prev => prev < 12400000 ? prev + 15432 : 12400000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const areaOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#ff7b72', '#3fb950'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#fff' } } },
    yaxis: { title: { text: 'Monthly Spend ($)', style: { color: '#fff' } }, labels: { style: { colors: '#fff' } } },
    theme: { mode: 'dark' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } }
  };
  const areaSeries = [
    { name: 'Unoptimized Spend', data: [150, 155, 160, 165, 175, 185, 195, 205, 220, 230, 250, 260] },
    { name: 'Optimized Spend (XOST)', data: [150, 130, 110, 95, 85, 80, 80, 75, 70, 70, 68, 65] }
  ];

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['Compute', 'Storage', 'Networking', 'Databases', 'Misc'],
    colors: ['#D946EF', '#00FFFF', '#667EEA', '#ff7b72', '#a8b2c1'],
    stroke: { show: false },
    theme: { mode: 'dark' }
  };
  const donutSeries = [45, 20, 15, 15, 5];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Maximize ROI on your infrastructure</h2>
        <p className={styles.heroSubhead}>Stop paying for idle resources and inefficient architecture.</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(63, 185, 80, 0.1)', border: '1px solid rgba(63, 185, 80, 0.3)', padding: '1rem 2rem', borderRadius: '50px' }}>
          <DollarSign color="#3fb950" />
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3fb950' }}>${(savings / 1000000).toFixed(1)}M+</span>
          <span style={{ color: 'var(--text-secondary)' }}>Total Saved Across Clients</span>
        </div>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>60%</span>
          <span className={styles.statLabel}>Avg Cost Reduction</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>48hr</span>
          <span className={styles.statLabel}>Audit Turnaround</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>300+</span>
          <span className={styles.statLabel}>Accounts Optimized</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Audit Process</h3>
        <div className={styles.flowContainer}>
          {['Discovery', 'Usage Analysis', 'Right-sizing', 'Reserved Instances', 'Continuous Monitoring'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={styles.flowNode} style={{ borderColor: '#3fb950', color: '#3fb950', background: 'rgba(63, 185, 80, 0.1)' }}>{step}</div>
              {i < arr.length - 1 && <div className={styles.flowLine} style={{ background: '#3fb950' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>12-Month Spend Comparison</h3>
          <Chart options={areaOptions} series={areaSeries} type="area" height={300} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Cost Breakdown</h3>
          <Chart options={donutOptions} series={donutSeries} type="donut" height={300} />
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Optimization Features</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Sliders className={styles.bentoIcon} />
            <h4>Right-sizing Policies</h4>
            <p>Matching instance types exactly to workload demands.</p>
          </div>
          <div className={styles.bentoCard}>
            <Trash2 className={styles.bentoIcon} />
            <h4>Idle Resource Cleanup</h4>
            <p>Identifying and terminating orphaned volumes and idle IPs.</p>
          </div>
          <div className={styles.bentoCard}>
            <Activity className={styles.bentoIcon} />
            <h4>Spot Instance Strategy</h4>
            <p>Leveraging spot markets for fault-tolerant workloads.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Real Example Bill Comparison</h3>
        <div className={styles.tableContainer}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Service Area</th>
                <th>Unoptimized Bill (Monthly)</th>
                <th>Optimized Bill (Monthly)</th>
                <th>Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EC2 Compute Instances</td>
                <td style={{ color: '#ff7b72' }}>$45,000</td>
                <td style={{ color: '#3fb950' }}>$18,500</td>
                <td><span style={{ background: 'rgba(63, 185, 80, 0.2)', color: '#3fb950', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>-58%</span></td>
              </tr>
              <tr>
                <td>EBS Storage Volumes</td>
                <td style={{ color: '#ff7b72' }}>$12,000</td>
                <td style={{ color: '#3fb950' }}>$4,200</td>
                <td><span style={{ background: 'rgba(63, 185, 80, 0.2)', color: '#3fb950', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>-65%</span></td>
              </tr>
              <tr>
                <td>RDS Databases</td>
                <td style={{ color: '#ff7b72' }}>$28,000</td>
                <td style={{ color: '#3fb950' }}>$14,000</td>
                <td><span style={{ background: 'rgba(63, 185, 80, 0.2)', color: '#3fb950', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>-50%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
