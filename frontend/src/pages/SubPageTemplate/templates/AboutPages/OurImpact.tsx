import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TrendingUp, Users, Leaf, Lightbulb, MessageSquareQuote } from 'lucide-react';
import styles from './AboutPages.module.css';

function MapGestureHandler() {
  const map = useMap();
  React.useEffect(() => {
    if (!map) return;
    map.dragging.enable();
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        map.dragging.disable();
      } else {
        map.dragging.enable();
      }
    };
    const container = map.getContainer();
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, [map]);
  return null;
}

export default function OurImpact({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Ripple / Wave Lottie
    fetch("https://assets8.lottiefiles.com/packages/lf20_rpoq98a6.json") // fallback placeholder
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF'],
    plotOptions: { bar: { borderRadius: 4, dataLabels: { position: 'top' } } },
    dataLabels: { enabled: true, style: { colors: ['#334155'] } },
    xaxis: { categories: ['2020', '2021', '2022', '2023', '2024'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    title: { text: 'New Enterprise Clients per Year', style: { color: '#334155' } }
  };
  const barSeries = [{ name: 'Clients', data: [15, 28, 45, 70, 110] }];

  const areaOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#D946EF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['2020', '2021', '2022', '2023', '2024'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    title: { text: 'Cumulative End-Users Impacted (Millions)', style: { color: '#334155' } },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } }
  };
  const areaSeries = [{ name: 'End-Users (M)', data: [0.1, 0.5, 2.1, 5.8, 12.5] }];

  // Leaflet map locations
  const locations = [
    { name: "USA", coords: [37.0902, -95.7129], projects: 45 },
    { name: "UK", coords: [55.3781, -3.4360], projects: 22 },
    { name: "UAE", coords: [23.4241, 53.8478], projects: 18 },
    { name: "Pakistan", coords: [30.3753, 69.3451], projects: 50 },
    { name: "Australia", coords: [-25.2744, 133.7751], projects: 10 }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero} style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ width: '100%', height: '100%' }} />}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '2rem', color: '#fff', background: '#0a0f1e', padding: '10px', borderRadius: '50%' }}>
            X
          </div>
        </div>
        <h2 className={styles.heroHeadline}>How we change the digital world</h2>
        <p className={styles.heroSubhead}>Measuring our success by the scale of our positive impact.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>150+</span>
          <span className={styles.statLabel}>Projects Delivered</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>25+</span>
          <span className={styles.statLabel}>Countries Reached</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>$500M+</span>
          <span className={styles.statLabel}>Client Rev Generated</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>12M+</span>
          <span className={styles.statLabel}>End Users Impacted</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Global Footprint</h3>
        <div className={styles.mapContainer} style={{ zIndex: 0 }}>
          <MapContainer
            {...({
              center: [20, 0],
              zoom: 2,
              minZoom: 2,
              maxBounds: [[-85, -180], [85, 180]],
              maxBoundsViscosity: 1.0,
              style: { height: '100%', width: '100%', background: 'transparent' },
              scrollWheelZoom: false
            } as any)}
          >
            <MapGestureHandler />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {locations.map((loc, idx) => (
              <CircleMarker 
                key={idx}
                {...({
                  center: loc.coords,
                  radius: Math.max(5, loc.projects / 2),
                  pathOptions: { color: '#00FFFF', fillColor: '#00FFFF', fillOpacity: 0.6 }
                } as any)}
              >
                <Tooltip {...({ direction: "top", opacity: 1 } as any)}>
                  <div style={{ background: '#111', color: '#fff', border: 'none' }}>
                    <strong>{loc.name}</strong><br/>{loc.projects} Projects
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.splitCard}>
          <Chart options={barOptions as any} series={barSeries} type="bar" height={300} />
        </div>
        <div className={styles.splitCard}>
          <Chart options={areaOptions as any} series={areaSeries} type="area" height={300} />
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Impact Categories</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <TrendingUp className={styles.bentoIcon} />
            <h4>Economic Impact</h4>
            <p>Directly contributed to $500M+ in client revenue growth and created 200+ high-tech jobs globally.</p>
          </div>
          <div className={styles.bentoCard}>
            <Users className={styles.bentoIcon} />
            <h4>Social Impact</h4>
            <p>Supported over 500 CS students through our FYP program and delivered 5 pro-bono NGO platforms.</p>
          </div>
          <div className={styles.bentoCard}>
            <Leaf className={styles.bentoIcon} />
            <h4>Environmental Impact</h4>
            <p>Migrated 40+ clients to green-certified cloud regions, reducing server carbon footprint by 60%.</p>
          </div>
          <div className={styles.bentoCard}>
            <Lightbulb className={styles.bentoIcon} />
            <h4>Innovation Impact</h4>
            <p>Deployed 12 proprietary AI models into production and filed 3 patents in edge computing.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Client Testimonials</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <div style={{ background: 'var(--card-surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
            <MessageSquareQuote size={32} color="#00FFFF" style={{ marginBottom: '1rem' }} />
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>"XOST didn't just build our app; they completely overhauled our technical strategy. Our revenue doubled within 6 months of launch."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333' }}></div>
              <div>
                <strong style={{ display: 'block' }}>Sarah Jenkins</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CTO, FinFlow (UK)</span>
              </div>
            </div>
          </div>
          <div style={{ background: 'var(--card-surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
            <MessageSquareQuote size={32} color="#D946EF" style={{ marginBottom: '1rem' }} />
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>"The dedication to code quality and scalable architecture is unmatched. They are our permanent offshore engineering partners."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333' }}></div>
              <div>
                <strong style={{ display: 'block' }}>Ahmed Al-Farsi</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>VP Eng, GulfLogistics (UAE)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
