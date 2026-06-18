import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Database, Filter, Layers, PieChart, Activity, ShoppingCart, DollarSign, HeartPulse } from 'lucide-react';
import styles from './ServicesPages.module.css';

export default function DataEngineering({ pageData }) {
  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF', '#D946EF'],
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Batch (Legacy)', 'Micro-batch', 'Real-time Streaming (Ours)'], labels: { style: { colors: '#fff' } } },
    yaxis: { title: { text: 'Throughput (MB/s)', style: { color: '#fff' } }, labels: { style: { colors: '#fff' } } },
    theme: { mode: 'dark' }
  };
  const barSeries = [{ name: 'Processing Speed', data: [50, 200, 850] }];

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['SQL Databases', 'APIs/Webhooks', 'IoT Devices', 'Flat Files', 'Data Streams'],
    colors: ['#00FFFF', '#D946EF', '#667EEA', '#764BA2', '#43E97B'],
    stroke: { show: false },
    theme: { mode: 'dark' }
  };
  const donutSeries = [35, 25, 20, 10, 10];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Transform data into actionable insights</h2>
        <p className={styles.heroSubhead}>Scalable pipelines for the modern data-driven enterprise.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>500M+</span>
          <span className={styles.statLabel}>Records Processed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>10+</span>
          <span className={styles.statLabel}>BI Tools Integrated</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt; 1s</span>
          <span className={styles.statLabel}>Streaming Latency</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Modern Data Pipeline</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode}><Database size={16} /> Raw Data</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Filter size={16} /> Ingestion</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Layers size={16} /> Processing</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><Database size={16} /> Storage</div>
          <div className={styles.flowLine} />
          <div className={styles.flowNode}><PieChart size={16} /> Visualization</div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Processing Speed</h3>
          <Chart options={barOptions} series={barSeries} type="bar" height={300} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Data Sources</h3>
          <Chart options={donutOptions} series={donutSeries} type="donut" height={300} />
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Executive Dashboard Mockup</h3>
        <div className={styles.dashboardMockup}>
          <div className={styles.mockupHeader}>
            <span className={styles.mockupTitle}>Real-time Revenue Intelligence</span>
            <span className={styles.mockupValue}>$1.24M ↗</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#161b22', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>Active Users</span>
              <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>42,891</div>
            </div>
            <div style={{ background: '#161b22', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>Churn Rate</span>
              <div style={{ color: '#ff7b72', fontSize: '1.2rem', fontWeight: 'bold' }}>2.1% ↘</div>
            </div>
            <div style={{ background: '#161b22', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>Server Load</span>
              <div style={{ color: '#d2a8ff', fontSize: '1.2rem', fontWeight: 'bold' }}>45%</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Industry Use Cases</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <ShoppingCart className={styles.bentoIcon} />
            <h4>Retail Analytics</h4>
            <p>Inventory optimization and customer behavior tracking.</p>
          </div>
          <div className={styles.bentoCard}>
            <DollarSign className={styles.bentoIcon} />
            <h4>Financial Forecasting</h4>
            <p>Algorithmic risk assessment and fraud detection.</p>
          </div>
          <div className={styles.bentoCard}>
            <HeartPulse className={styles.bentoIcon} />
            <h4>Healthcare Insights</h4>
            <p>Patient outcome prediction and resource allocation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
