import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { Brain, Search, MessageSquare, Image as ImageIcon, Code, TrendingUp, Zap } from 'lucide-react';
import styles from './ServicesPages.module.css';

export default function AIIntegration({ pageData }) {
  const [lottieData, setLottieData] = useState(null);
  const [activeTab, setActiveTab] = useState('NLP');

  useEffect(() => {
    // Neural network lottie
    fetch("https://assets9.lottiefiles.com/packages/lf20_UJNc2t.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const radarOptions = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['NLP', 'Computer Vision', 'Predictive Analytics', 'Recommendation', 'Automation', 'Gen AI'],
    stroke: { width: 2, colors: ['#D946EF'] },
    fill: { opacity: 0.2, colors: ['#D946EF'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#D946EF', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'dark' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(255,255,255,0.1)', connectorColors: 'rgba(255,255,255,0.1)' } } }
  };
  const radarSeries = [{ name: 'Capability', data: [100, 90, 95, 85, 95, 100] }];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div className={styles.lottieHero}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Intelligent automation algorithms</h2>
        <p className={styles.heroSubhead}>Embed AI into the core of your product.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>50+</span>
          <span className={styles.statLabel}>Models Deployed</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>92%</span>
          <span className={styles.statLabel}>Avg Model Accuracy</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>3x</span>
          <span className={styles.statLabel}>Productivity Gain</span>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>ML Ops Pipeline</h3>
        <div className={styles.flowContainer}>
          {['Data Prep', 'Feature Eng.', 'Model Training', 'Evaluation', 'Deployment', 'Monitoring'].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={styles.flowNode} style={{ borderColor: '#D946EF', color: '#D946EF', background: 'rgba(217, 70, 239, 0.1)' }}>{step}</div>
              {i < arr.length - 1 && <div className={styles.flowLine} style={{ background: 'linear-gradient(90deg, #D946EF, #00FFFF)' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className={styles.splitLayout}>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>AI Capabilities</h3>
          <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
        </div>
        <div className={styles.splitCard}>
          <h3 className={styles.sectionTitle}>Before & After AI</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #ff7b72', borderRadius: '8px', background: 'rgba(255, 123, 114, 0.1)' }}>
              <h4 style={{ color: '#ff7b72' }}>Manual Process</h4>
              <p>Human reviews 500 documents/day. High error rate, 48hr turnaround.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid #3fb950', borderRadius: '8px', background: 'rgba(63, 185, 80, 0.1)' }}>
              <h4 style={{ color: '#3fb950' }}>AI-Automated Process</h4>
              <p>LLM agent processes 50,000 documents/day. 99% accuracy, instant extraction.</p>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Core Tech Stack</h3>
        <div className={styles.techStackGrid}>
          {['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI API', 'LangChain', 'Hugging Face', 'CUDA'].map(tech => (
            <div key={tech} className={styles.techBadge}><Code size={14} /> {tech}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
