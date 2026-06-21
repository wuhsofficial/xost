import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { ShoppingCart, Eye, PlusSquare, CreditCard, CheckCircle, RefreshCcw, LayoutTemplate, Zap, Package, Smartphone, Gauge } from 'lucide-react';
import styles from './IndustriesPages.module.css';

export default function EcommerceRetail({ pageData }) {
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    // Shopping/E-commerce Lottie
    fetch("https://assets10.lottiefiles.com/packages/lf20_q5pk6p1k.json") // fallback placeholder, or generic cart
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const areaOptions = {
    chart: { type: 'area', background: 'transparent', toolbar: { show: false } },
    colors: ['#D946EF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4 (Holiday)', 'Q1', 'Q2', 'Q3'], labels: { style: { colors: '#64748b' } } },
    yaxis: { title: { text: 'GMV ($ Millions)', style: { color: '#334155' } }, labels: { style: { colors: '#64748b' } } },
    theme: { mode: 'light' },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } }
  };
  const areaSeries = [{ name: 'Gross Merchandise Value', data: [15, 22, 28, 85, 45, 60, 75] }];

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['Web (Desktop)', 'Mobile App', 'Social Commerce', 'Marketplaces'],
    colors: ['#D946EF', '#00FFFF', '#ff7b72', '#43E97B'],
    stroke: { show: false },
    theme: { mode: 'light' }
  };
  const donutSeries = [35, 40, 15, 10];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {/* <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} /> */}
          <ShoppingCart size={80} color="#D946EF" style={{ marginBottom: '1rem' }} />
        </div>
        <h2 className={styles.heroHeadline}>Scalable shopping experiences</h2>
        <p className={styles.heroSubhead}>From headless storefronts to AI-driven multi-vendor marketplaces.</p>
      </div>

      <div className={styles.highlightStrip} style={{ background: 'rgba(217, 70, 239, 0.1)', borderColor: 'rgba(217, 70, 239, 0.3)', margin: '0 auto 2rem', maxWidth: '800px', display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
          <Gauge size={20} color="var(--accent-aqua)" /> 
          <span style={{ background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Page load &lt; 1.2s</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
          <CheckCircle size={20} color="var(--accent-aqua)" /> 
          <span style={{ background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>99.99% Cart Uptime</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
          <Smartphone size={20} color="var(--accent-aqua)" /> 
          <span style={{ background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mobile-first Checkout</span>
        </span>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>80+</span>
          <span className={styles.statLabel}>Storefronts Built</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>500%</span>
          <span className={styles.statLabel}>Traffic Scalability</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>+35%</span>
          <span className={styles.statLabel}>Avg Conv. Rate</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>2x</span>
          <span className={styles.statLabel}>Faster Checkout</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Conversion Funnel Flow</h3>
        <div className={styles.flowContainer}>
          <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF' }}><Eye size={16}/> Visitor</div>
          <div className={styles.flowLine} style={{ background: '#D946EF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF' }}><ShoppingCart size={16}/> View</div>
          <div className={styles.flowLine} style={{ background: '#D946EF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF' }}><PlusSquare size={16}/> Cart</div>
          <div className={styles.flowLine} style={{ background: '#D946EF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF' }}><CreditCard size={16}/> Checkout</div>
          <div className={styles.flowLine} style={{ background: '#D946EF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF' }}><CheckCircle size={16}/> Purchase</div>
          <div className={styles.flowLine} style={{ background: '#D946EF' }} />
          <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF' }}><RefreshCcw size={16}/> Retain</div>
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>GMV Growth Trajectory</h3>
          <Chart options={areaOptions as any} series={areaSeries} type="area" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Revenue by Channel</h3>
          <Chart options={donutOptions as any} series={donutSeries} type="donut" height={350} />
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>E-Commerce Tech Stack</h3>
        <div className={styles.techStackGrid}>
          {['Shopify Plus', 'WooCommerce', 'Magento 2', 'Custom React/Next.js', 'Stripe API', 'Razorpay', 'Algolia Search', 'Contentful CMS'].map(badge => (
            <div key={badge} className={styles.techBadge} style={{ fontSize: '1.1rem', padding: '0.8rem 1.5rem', borderColor: '#D946EF', fontWeight: 'bold' }}>
              <span style={{ background: 'linear-gradient(90deg, var(--text-primary), var(--accent-aqua))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Core Solutions</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <LayoutTemplate className={styles.bentoIcon} style={{ color: '#D946EF' }} />
            <h4>Headless Commerce</h4>
            <p>Decoupled frontends for blazing fast load times and omnichannel delivery.</p>
          </div>
          <div className={styles.bentoCard}>
            <Zap className={styles.bentoIcon} style={{ color: '#D946EF' }} />
            <h4>AI Recommendations</h4>
            <p>Personalized product feeds driving higher AOV (Average Order Value).</p>
          </div>
          <div className={styles.bentoCard}>
            <Package className={styles.bentoIcon} style={{ color: '#D946EF' }} />
            <h4>Multi-vendor Marketplaces</h4>
            <p>Complex vendor routing, split payments, and inventory sync systems.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
