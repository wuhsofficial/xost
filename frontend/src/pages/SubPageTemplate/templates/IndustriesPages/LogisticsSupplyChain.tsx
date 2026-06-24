import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Lottie from 'lottie-react';
import { Globe, Truck, Package, Factory, MapPin, CheckCircle, Navigation, Box, Zap } from 'lucide-react';
import styles from './IndustriesPages.module.css';

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

export default function LogisticsSupplyChain({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Map/Globe Lottie
    fetch("https://assets1.lottiefiles.com/packages/lf20_jmz1a3s7.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const lineOptions = {
    chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
    colors: ['#3fb950'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    title: { text: 'On-time Delivery Rate (%)', style: { color: '#334155' } }
  };
  const lineSeries = [{ name: 'On-Time Rate', data: [82, 84, 85, 88, 89, 91, 92, 94, 95, 96, 98, 99] }];

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#ff7b72', '#3fb950'],
    plotOptions: { bar: { horizontal: false, borderRadius: 4, columnWidth: '50%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Air Freight', 'Ocean Freight', 'Last-Mile', 'Warehouse Ops'], labels: { style: { colors: '#64748b' } } },
    yaxis: { labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    title: { text: 'Cost Per Unit ($)', style: { color: '#334155' } }
  };
  const barSeries = [
    { name: 'Before XOST', data: [120, 45, 15, 8] },
    { name: 'After Optimization', data: [95, 38, 9, 4] }
  ];

  // Leaflet map lines
  const NY = [40.7128, -74.0060];
  const LDN = [51.5074, -0.1278];
  const LA = [34.0522, -118.2437];
  const TYO = [35.6762, 139.6503];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Real-time global tracking systems</h2>
        <p className={styles.heroSubhead}>Visibility, optimization, and automation across the entire supply chain.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#3fb950' }}>40+</span>
          <span className={styles.statLabel}>Logistics Clients</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#3fb950' }}>10M+</span>
          <span className={styles.statLabel}>Shipments Tracked</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#3fb950' }}>28%</span>
          <span className={styles.statLabel}>Delivery Time Cut</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ color: '#3fb950', fontSize: '1.5rem', marginTop: '0.5rem' }}>Sub-second</span>
          <span className={styles.statLabel}>GPS Accuracy</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Global Shipment Activity</h3>
        <div className={styles.mapContainer} style={{ zIndex: 0 }}>
          <MapContainer
            {...({
              center: [30, -30],
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
              {...({
                url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
              } as any)}
            />
            {/* Markers */}
            <Marker position={NY}><Popup>New York Hub</Popup></Marker>
            <Marker position={LDN}><Popup>London Dist Center</Popup></Marker>
            <Marker position={LA}><Popup>Port of LA</Popup></Marker>
            <Marker position={TYO}><Popup>Tokyo Hub</Popup></Marker>

            {/* Routes */}
            <Polyline {...({ positions: [NY, LDN], color: "#3fb950", weight: 3, dashArray: "5, 10" } as any)} />
            <Polyline {...({ positions: [LA, TYO], color: "#00FFFF", weight: 3, dashArray: "5, 10" } as any)} />
            <Polyline {...({ positions: [NY, LA], color: "var(--accent-mint)", weight: 3, dashArray: "5, 10" } as any)} />
          </MapContainer>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Supply Chain Flow</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode} style={{ borderColor: '#3fb950', color: '#3fb950' }}><Factory size={16}/> Supplier</div>
          <div className={styles.flowLine} style={{ background: '#3fb950' }} />
          <div className={styles.flowNode} style={{ borderColor: '#3fb950', color: '#3fb950' }}><Box size={16}/> Warehouse</div>
          <div className={styles.flowLine} style={{ background: '#3fb950' }} />
          <div className={styles.flowNode} style={{ borderColor: '#3fb950', color: '#3fb950' }}><Truck size={16}/> Dist. Center</div>
          <div className={styles.flowLine} style={{ background: '#3fb950' }} />
          <div className={styles.flowNode} style={{ borderColor: '#3fb950', color: '#3fb950' }}><MapPin size={16}/> Last Mile</div>
          <div className={styles.flowLine} style={{ background: '#3fb950' }} />
          <div className={styles.flowNode} style={{ borderColor: '#3fb950', color: '#3fb950' }}><CheckCircle size={16}/> Customer</div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>On-Time Delivery Optimization</h3>
          <Chart options={lineOptions as any} series={lineSeries} type="line" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Cost Per Shipment Comparison</h3>
          <Chart options={barOptions as any} series={barSeries} type="bar" height={350} />
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Platform Features</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Navigation className={styles.bentoIcon} style={{ color: '#3fb950' }} />
            <h4>Real-time Fleet Tracking</h4>
            <p>Sub-second IoT GPS telemetry piped directly into your command center.</p>
          </div>
          <div className={styles.bentoCard}>
            <Box className={styles.bentoIcon} style={{ color: '#3fb950' }} />
            <h4>Warehouse Management</h4>
            <p>Automated inventory sync, pick-path optimization, and barcode scanning integration.</p>
          </div>
          <div className={styles.bentoCard}>
            <Zap className={styles.bentoIcon} style={{ color: '#3fb950' }} />
            <h4>Route Optimization AI</h4>
            <p>Machine learning models adapting delivery routes based on live traffic and weather.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
