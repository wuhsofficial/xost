import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Server, Activity, Globe, Zap } from 'lucide-react';
import styles from './PlatformPages.module.css';

export default function ScalePerformance({ pageData }) {
  const [nodes, setNodes] = useState(1);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setNodes(prev => (prev < 200 ? prev + Math.floor(Math.random() * 5) : 200));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const areaOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], labels: { style: { colors: '#fff' } } },
    yaxis: { labels: { style: { colors: '#fff' } } },
    theme: { mode: 'dark' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } }
  };
  const areaSeries = [{ name: 'Requests (Millions)', data: [30, 40, 35, 50, 49, 60] }];

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#D946EF', '#667EEA'],
    plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['US East', 'Europe', 'Asia', 'Oceania'], labels: { style: { colors: '#fff' } } },
    yaxis: { labels: { style: { colors: '#fff' } } },
    theme: { mode: 'dark' },
    tooltip: { theme: 'dark' }
  };
  const barSeries = [
    { name: 'Our Platform (ms)', data: [12, 18, 25, 30] },
    { name: 'Industry Avg (ms)', data: [45, 60, 80, 110] }
  ];

  const mapLocations = [
    { name: 'New York Edge', pos: [40.7128, -74.0060] },
    { name: 'London Node', pos: [51.5074, -0.1278] },
    { name: 'Tokyo Core', pos: [35.6762, 139.6503] },
    { name: 'Singapore Hub', pos: [1.3521, 103.8198] },
    { name: 'Sydney Edge', pos: [-33.8688, 151.2093] },
  ];

  return (
    <div className={styles.platformPageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Global distributed infrastructure</h2>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{nodes}+</span>
          <span className={styles.statLabel}>Edge Nodes Active</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>10M+</span>
          <span className={styles.statLabel}>Requests / Day</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>5</span>
          <span className={styles.statLabel}>Continents Covered</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Live Global Network</h3>
        <div className={styles.leafletMapContainer}>
          <MapContainer
            {...({
              center: [20, 0],
              zoom: 2,
              style: { height: 400, width: '100%', borderRadius: 12, zIndex: 1 },
              scrollWheelZoom: false
            } as any)}
          >
            <TileLayer
              {...({
                url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
              } as any)}
            />
            {mapLocations.map((loc, idx) => (
              <CircleMarker
                key={idx}
                {...({
                  center: loc.pos,
                  pathOptions: { color: '#00FFFF', fillColor: '#00FFFF', fillOpacity: 0.6 },
                  radius: 6
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

      <div className={styles.splitLayout}>
        <div className={styles.splitLeft}>
          <h3 className={styles.sectionTitle}>Request Throughput</h3>
          <Chart options={areaOptions as any} series={areaSeries} type="area" height={300} />
        </div>
        
        <div className={styles.splitRight}>
          <h3 className={styles.sectionTitle}>Latency Benchmark</h3>
          <Chart options={barOptions as any} series={barSeries} type="bar" height={300} />
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Auto-Scaling Architecture</h3>
        <div className={styles.autoScaleContainer}>
          <div className={styles.scaleLoad}>
            <Activity className={styles.loadIcon} />
            <span>Traffic Spike Detected</span>
          </div>
          <div className={styles.scaleNodes}>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div 
                key={i} 
                className={styles.scaleNode} 
                initial={{ opacity: i < 3 ? 1 : 0, scale: i < 3 ? 1 : 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring' }}
              >
                <Server size={20} />
              </motion.div>
            ))}
          </div>
          <p className={styles.scaleText}>Automatically provisions new Kubernetes pods within 500ms of load threshold triggers.</p>
        </div>
      </section>
    </div>
  );
}
