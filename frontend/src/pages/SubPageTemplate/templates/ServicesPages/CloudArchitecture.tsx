import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Cloud, Server, Shield, Zap, TrendingDown, ArrowRight } from 'lucide-react';
import styles from './ServicesPages.module.css';

export default function CloudArchitecture({ pageData }) {
  const areaOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF', '#D946EF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } }
  };
  
  const areaSeries = [
    { name: 'On-Premise Cost', data: [100, 105, 110, 115, 120, 130] },
    { name: 'Cloud Native Cost', data: [100, 95, 80, 60, 55, 50] }
  ];

  const mapLocations = [
    { name: 'us-east-1 (AWS)', pos: [39.0438, -77.4874] },
    { name: 'eu-west-1 (AWS)', pos: [53.3498, -6.2603] },
    { name: 'asia-east1 (GCP)', pos: [24.0, 121.0] },
    { name: 'westeurope (Azure)', pos: [52.3676, 4.9041] }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Seamlessly shift to modern infrastructure</h2>
        <p className={styles.heroSubhead}>Migrate, optimize, and scale with confidence.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>300+</span>
          <span className={styles.statLabel}>Cloud Migrations</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>60%</span>
          <span className={styles.statLabel}>Avg. Cost Reduction</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>99.9%</span>
          <span className={styles.statLabel}>Uptime SLA</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Migration Journey</h3>
        <div className={styles.flowContainer}>
          {['On-premise', 'Assessment', 'Lift & Shift', 'Optimization', 'Cloud-native'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <motion.div className={styles.flowNode} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                {step}
              </motion.div>
              {i < arr.length - 1 && <div className={styles.flowLine} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard} style={{ borderColor: '#D946EF' }}>
          <h3 style={{ color: '#D946EF' }}>Legacy On-Premise</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <li>❌ High Capital Expenditure (CapEx)</li>
            <li>❌ Manual Scaling & Provisioning</li>
            <li>❌ Single Point of Failure</li>
            <li>❌ Maintenance Overhead</li>
          </ul>
        </div>
        <div className={styles.splitCard} style={{ borderColor: 'var(--accent-aqua)' }}>
          <h3 style={{ color: 'var(--accent-aqua)' }}>Modern Cloud Stack</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <li>✅ Pay-as-you-go (OpEx)</li>
            <li>✅ Auto-scaling & Serverless</li>
            <li>✅ Multi-AZ High Availability</li>
            <li>✅ Managed Services</li>
          </ul>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Cost Optimization Over Time</h3>
        <Chart options={areaOptions as any} series={areaSeries} type="area" height={350} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Global Infrastructure</h3>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
          <MapContainer
            {...({
              center: [20, 0],
              zoom: 2,
              style: { height: 400, width: '100%', zIndex: 1 },
              scrollWheelZoom: false
            } as any)}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            {mapLocations.map((loc, idx) => (
              <CircleMarker
                key={idx}
                {...({
                  center: loc.pos,
                  pathOptions: { color: '#D946EF', fillColor: '#D946EF', fillOpacity: 0.6 },
                  radius: 8
                } as any)}
              >
                <Tooltip {...({ direction: "top", offset: [0, -10], opacity: 1 } as any)}>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>{loc.name}</span>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
}
