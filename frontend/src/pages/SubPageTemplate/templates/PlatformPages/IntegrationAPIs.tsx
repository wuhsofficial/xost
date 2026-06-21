import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Lottie from 'lottie-react';
import { Copy, CheckCircle, Code, Workflow, Terminal } from 'lucide-react';
import styles from './PlatformPages.module.css';

// We'll use a placeholder URL for the lottie animation json since we don't have the local file
const LOTTIE_API_URL = "https://assets9.lottiefiles.com/packages/lf20_tno6cg2w.json";

export default function IntegrationAPIs({ pageData }) {
  const [activeTab, setActiveTab] = useState('REST');
  const [copied, setCopied] = useState(false);
  
  const [lottieData, setLottieData] = useState(null);

  React.useEffect(() => {
    fetch("https://assets1.lottiefiles.com/packages/lf20_Q895iE.json")
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const codeSnippets = {
    REST: `curl -X POST https://api.agency.com/v1/data \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "metrics"}'`,
    GraphQL: `query {
  platformMetrics {
    uptime
    latency
    requestsPerSecond
  }
}`,
    Webhook: `app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['x-agency-signature'];
  const event = verifyWebhook(req.body, sig, endpointSecret);
  console.log('Received event:', event.type);
  res.json({received: true});
});`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const donutOptions = {
    chart: { type: 'donut', background: 'transparent' },
    labels: ['REST API', 'GraphQL', 'Webhooks', 'gRPC'],
    colors: ['#00FFFF', '#D946EF', '#667EEA', '#764BA2'],
    stroke: { show: false },
    theme: { mode: 'light' },
    plotOptions: {
      pie: {
        donut: {
          labels: { show: true, name: { color: '#64748b' }, value: { color: '#0f172a' } }
        }
      }
    }
  };
  const donutSeries = [45, 25, 20, 10];

  return (
    <div className={styles.platformPageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>Seamless system connectivity</h2>
      </div>

      <div className={styles.splitLayout}>
        <div className={styles.splitLeft}>
          <h3 className={styles.sectionTitle}>API Usage Distribution</h3>
          <div className={styles.chartContainer}>
            <Chart options={donutOptions as any} series={donutSeries} type="donut" height={300} />
          </div>
          
          <div className={styles.partnerGrid}>
            {['Stripe', 'Twilio', 'AWS', 'Salesforce'].map(partner => (
              <div key={partner} className={styles.partnerCard}>
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.splitRight}>
          <div className={styles.codeBlockContainer}>
            <div className={styles.codeTabs}>
              {Object.keys(codeSnippets).map(tab => (
                <button 
                  key={tab} 
                  className={activeTab === tab ? styles.codeTabActive : styles.codeTab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <pre className={styles.codePre}>
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          <div className={styles.lottieContainer}>
            {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} />}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Get Started in 3 Steps</h3>
        <div className={styles.stepGrid}>
          <motion.div className={styles.stepCard} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}>
            <div className={styles.stepIcon}><Terminal /></div>
            <h4>1. Generate Keys</h4>
            <p>Create your secure API keys from the developer dashboard.</p>
          </motion.div>
          <motion.div className={styles.stepCard} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.2 }}>
            <div className={styles.stepIcon}><Code /></div>
            <h4>2. Install SDK</h4>
            <p>Use our official SDKs for Python, Node.js, or Go.</p>
          </motion.div>
          <motion.div className={styles.stepCard} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.4 }}>
            <div className={styles.stepIcon}><Workflow /></div>
            <h4>3. Make Requests</h4>
            <p>Start querying our endpoints or subscribing to webhook events.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
