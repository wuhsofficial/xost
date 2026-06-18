import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark, faHeartPulse, faCartShopping, faTruck, faFilm, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import CompanyMarquee from '../../components/CompanyMarquee/CompanyMarquee';
import SEO from '../../components/SEO/SEO';
import styles from './IndustriesPage.module.css';

const detailedIndustries = [
  {
    title: 'Fintech & Banking',
    icon: faLandmark,
    gradientStart: '#4FACFE',
    gradientEnd: '#00F2FE',
    description: 'Transforming traditional banking and financial services through secure, scalable, and innovative digital solutions. We help financial institutions and fintech startups navigate complex regulatory environments while delivering exceptional user experiences.',
    bullets: [
      'Core Banking Systems Modernization',
      'Secure Payment Gateways & Processing',
      'Blockchain & Smart Contract Development',
      'Regulatory Compliance & Risk Management Tools'
    ],
    challenges: [
      { title: 'Legacy System Integration', desc: 'Seamlessly bridging modern interfaces with robust legacy banking cores without downtime.' },
      { title: 'Data Security & Fraud', desc: 'Implementing bank-grade encryption and AI-driven fraud detection to protect assets.' }
    ],
    marquee1: ['Stripe', 'PayPal', 'Goldman Sachs', 'Plaid', 'Square', 'Revolut', 'Visa', 'Mastercard'],
    marquee2: ['JPMorgan Chase', 'Robinhood', 'Coinbase', 'Adyen', 'Wise', 'Citi', 'Morgan Stanley']
  },
  {
    title: 'Healthcare & Life Science',
    icon: faHeartPulse,
    gradientStart: '#FF6B6B',
    gradientEnd: '#EE5A24',
    description: 'Empowering healthcare providers and life science organizations with HIPAA-compliant telemedicine, patient portals, and data analytics tools. Our solutions improve patient outcomes and streamline medical workflows.',
    bullets: [
      'Telehealth & Virtual Care Platforms',
      'Electronic Health Records (EHR) Integration',
      'Medical IoT & Wearable Tech',
      'AI-Powered Diagnostics & Analytics'
    ],
    challenges: [
      { title: 'Strict Compliance', desc: 'Navigating HIPAA, GDPR, and other healthcare regulations seamlessly.' },
      { title: 'Interoperability', desc: 'Connecting fragmented healthcare systems and standardizing patient data formats.' }
    ],
    marquee1: ['Pfizer', 'Johnson & Johnson', 'Novartis', 'Roche', 'Medtronic', 'Abbott', 'GSK'],
    marquee2: ['AstraZeneca', 'Siemens Healthineers', 'Sanofi', 'Epic Systems', 'Cerner', 'Philips']
  },
  {
    title: 'E-commerce & Retail',
    icon: faCartShopping,
    gradientStart: '#00D4FF',
    gradientEnd: '#00FFB3',
    description: 'Building end-to-end digital commerce solutions—from custom storefront design to advanced inventory management and conversion rate optimization. We help brands thrive in the competitive retail landscape.',
    bullets: [
      'Custom Headless Commerce Solutions',
      'Omnichannel Retail Experiences',
      'Inventory & Warehouse Management Systems',
      'AI-Driven Personalization & Recommendations'
    ],
    challenges: [
      { title: 'Cart Abandonment', desc: 'Optimizing user flows and checkout experiences to maximize conversions.' },
      { title: 'High Traffic Spikes', desc: 'Ensuring 100% uptime and blazing-fast performance during peak sales events.' }
    ],
    marquee1: ['Amazon', 'Shopify', 'Walmart', 'Alibaba', 'eBay', 'Target', 'Best Buy', 'Home Depot'],
    marquee2: ['IKEA', 'Nike', 'Sephora', 'Zalando', 'Rakuten', 'Etsy', 'ASOS', 'Wayfair']
  },
  {
    title: 'Logistics & Supply Chain',
    icon: faTruck,
    gradientStart: '#FFB800',
    gradientEnd: '#FF8C00',
    description: 'Driving efficiency across the supply chain with intelligent software. We deliver robust platforms for route optimization, fleet management, and real-time shipment visibility to keep the world moving.',
    bullets: [
      'Real-Time Fleet Tracking & Management',
      'Automated Route Optimization',
      'Supply Chain Visibility Dashboards',
      'Predictive Maintenance for Transport'
    ],
    challenges: [
      { title: 'Operational Inefficiency', desc: 'Automating manual processes to reduce delivery times and operational costs.' },
      { title: 'Data Silos', desc: 'Creating a single source of truth across vendors, warehouses, and carriers.' }
    ],
    marquee1: ['FedEx', 'UPS', 'DHL', 'Maersk', 'XPO Logistics', 'C.H. Robinson', 'DB Schenker'],
    marquee2: ['Kuehne + Nagel', 'Expeditors', 'DSV', 'Nippon Express', 'Flexport', 'Ryder']
  },
  {
    title: 'Telecom & Media',
    icon: faFilm,
    gradientStart: '#F093FB',
    gradientEnd: '#F5576C',
    description: 'Architecting scalable platforms for streaming, content delivery, and telecom operations. We help media companies and telecom providers engage audiences and manage massive data networks flawlessly.',
    bullets: [
      'High-Performance Streaming Platforms',
      'Content Management & Distribution',
      'Telecom Billing & OSS/BSS Integration',
      'Interactive Second-Screen Experiences'
    ],
    challenges: [
      { title: 'Bandwidth & Latency', desc: 'Delivering high-quality video and data with near-zero latency globally.' },
      { title: 'User Retention', desc: 'Building immersive UI/UX to keep users engaged in a saturated media market.' }
    ],
    marquee1: ['AT&T', 'Verizon', 'Comcast', 'T-Mobile', 'Vodafone', 'Orange', 'Telefonica', 'NTT'],
    marquee2: ['Netflix', 'Disney', 'Warner Bros', 'Sony', 'Spotify', 'Hulu', 'Sky', 'BBC']
  }
];

export default function IndustriesPage() {
  return (
    <main className={styles.page}>
      <SEO 
        title="Industries We Serve | XOST Agency" 
        description="Discover how we transform fintech, healthcare, e-commerce, and logistics with cutting-edge digital platforms."
      />
      <div className={styles.heroSection}>
        <TextMaskReveal tag="h1" className={styles.pageTitle}>
          Industries We Serve
        </TextMaskReveal>
        <p className={styles.pageSubtitle}>
          Deep domain expertise across key verticals. We don&apos;t just build software—we solve complex, industry-specific problems for global leaders.
        </p>
      </div>

      <div className={styles.detailedList}>
        {detailedIndustries.map((ind, i) => (
          <ScrollReveal
            key={ind.title}
            delay={100}
            direction="up"
          >
            <div className={styles.industryBlock}>
              <div className={styles.blockHeader}>
                <div
                  className={styles.iconBox}
                  style={{
                    background: `linear-gradient(135deg, ${ind.gradientStart}, ${ind.gradientEnd})`,
                  }}
                >
                  <FontAwesomeIcon icon={ind.icon} />
                </div>
                <h2 className={styles.blockTitle}>{ind.title}</h2>
              </div>
              
              <div className={styles.blockContent}>
                <div className={styles.mainInfo}>
                  <p className={styles.description}>{ind.description}</p>
                  <div className={styles.bullets}>
                    <h3 className={styles.subHeading}>What We Deliver</h3>
                    <ul>
                      {ind.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={styles.challengesPanel}>
                  <h3 className={styles.subHeading}>Key Challenges Solved</h3>
                  <div className={styles.challengesGrid}>
                    {ind.challenges.map((challenge, idx) => (
                      <div key={idx} className={styles.challengeItem}>
                        <h4 className={styles.challengeTitle}>
                          <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
                          {challenge.title}
                        </h4>
                        <p className={styles.challengeDesc}>{challenge.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.marqueeWrapper}>
                <h4 className={styles.marqueeHeading}>Trusted by Industry Leaders Worldwide</h4>
                <CompanyMarquee companies={ind.marquee1} direction="left" speed={25} />
                <CompanyMarquee companies={ind.marquee2} direction="right" speed={30} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </main>
  );
}
