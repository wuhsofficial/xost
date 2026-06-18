import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { Radio, Upload, Cpu, Network, MonitorPlay, Activity, Tv, PlayCircle, ShieldAlert } from 'lucide-react';
import styles from './IndustriesPages.module.css';

export default function TelecomMedia({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Media/Signal/Tower Lottie
    fetch("https://assets5.lottiefiles.com/packages/lf20_UJNc2t.json") // fallback placeholder
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const areaOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF', '#D946EF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['18:00', '19:00', '20:00', '21:00 (Peak)', '22:00', '23:00'], labels: { style: { colors: '#fff' } } },
    yaxis: [
      { title: { text: 'Concurrent Viewers (M)', style: { color: '#00FFFF' } }, labels: { style: { colors: '#fff' } } },
      { opposite: true, title: { text: 'Bandwidth Served (Tbps)', style: { color: '#D946EF' } }, labels: { style: { colors: '#fff' } } }
    ],
    theme: { mode: 'dark' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } }
  };
  const areaSeries = [
    { name: 'Concurrent Viewers', data: [1.2, 2.5, 4.8, 8.5, 5.0, 2.1] },
    { name: 'Bandwidth Served', data: [4, 8, 15, 28, 16, 7] }
  ];

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['VOD', 'Live Sports', 'News Streams', 'Education', 'Audio/Podcasts'],
    colors: ['#00FFFF', '#D946EF', '#ff7b72', '#43E97B', '#667EEA'],
    stroke: { show: false },
    theme: { mode: 'dark' }
  };
  const donutSeries = [45, 25, 15, 10, 5];

  const barOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    colors: ['#00FFFF', '#ff7b72'],
    plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } },
    dataLabels: { enabled: true, offsetX: 20, style: { colors: ['#fff'] }, formatter: (val) => val + 's' },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { style: { colors: '#fff' } } },
    theme: { mode: 'dark' },
    title: { text: 'Stream Start Time Latency', style: { color: '#fff' } }
  };
  const barSeries = [
    { name: 'XOST Optimized CDN', data: [0.8, 1.2, 1.5] },
    { name: 'Industry Average', data: [3.5, 4.2, 5.0] }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {/* <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} /> */}
          <Radio size={80} color="#00FFFF" style={{ marginBottom: '1rem' }} />
        </div>
        <h2 className={styles.heroHeadline}>High-bandwidth streaming capabilities</h2>
        <p className={styles.heroSubhead}>Deliver 4K video to millions of concurrent users without dropping a frame.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>20+</span>
          <span className={styles.statLabel}>Telecom Clients</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>50M+</span>
          <span className={styles.statLabel}>Streams Delivered</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt; 2s</span>
          <span className={styles.statLabel}>Stream Start Time</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue} style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>4K / HDR</span>
          <span className={styles.statLabel}>Fully Supported</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>OTT Delivery Pipeline</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode} style={{ borderColor: '#00FFFF', color: '#00FFFF' }}><Upload size={16}/> Content Upload</div>
          <div className={styles.flowLine} style={{ background: '#00FFFF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#00FFFF', color: '#00FFFF' }}><Cpu size={16}/> Transcoding</div>
          <div className={styles.flowLine} style={{ background: '#00FFFF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#00FFFF', color: '#00FFFF' }}><Network size={16}/> CDN Edge</div>
          <div className={styles.flowLine} style={{ background: '#00FFFF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#00FFFF', color: '#00FFFF' }}><MonitorPlay size={16}/> Viewer App</div>
          <div className={styles.flowLine} style={{ background: 'linear-gradient(90deg, #00FFFF, transparent)' }} />
          <div className={styles.flowNode} style={{ borderColor: 'var(--text-secondary)', color: 'var(--text-secondary)', borderStyle: 'dashed' }}><Activity size={16}/> Telemetry Feedback Loop</div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Live Event Traffic Handling (Prime Time)</h3>
          <Chart options={areaOptions} series={areaSeries} type="area" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Content Type Distribution</h3>
          <Chart options={donutOptions} series={donutSeries} type="donut" height={350} />
        </div>
      </div>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Latency Benchmarks</h3>
          <Chart options={barOptions} series={barSeries} type="bar" height={250} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }}>
            Tests conducted across US East, EU Central, and AP-South on standard 4G networks.
          </p>
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Streaming Tech Stack</h3>
          <div className={styles.techStackGrid}>
            {['HLS / DASH Protocol', 'FFmpeg Transcoding', 'AWS MediaLive', 'Cloudflare Stream', 'WebRTC for Ultra-low Latency', 'DRM Encryption (Widevine/FairPlay)', 'Redis Session Cache'].map(badge => (
              <div key={badge} className={styles.techBadge} style={{ borderColor: '#00FFFF', color: '#fff' }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Core Solutions</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Tv className={styles.bentoIcon} />
            <h4>OTT Streaming Platforms</h4>
            <p>End-to-end white-label Netflix-style applications for Smart TVs, Web, and Mobile.</p>
          </div>
          <div className={styles.bentoCard}>
            <PlayCircle className={styles.bentoIcon} />
            <h4>Ad Insertion & Monetization</h4>
            <p>Server-side Ad Insertion (SSAI) to bypass ad-blockers and maximize AVOD revenue.</p>
          </div>
          <div className={styles.bentoCard}>
            <ShieldAlert className={styles.bentoIcon} />
            <h4>Network Operations Center</h4>
            <p>Real-time Grafana dashboards monitoring CDN edge health and buffering ratios globally.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
