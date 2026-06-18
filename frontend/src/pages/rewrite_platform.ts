const fs = require('fs');
const path = require('path');

const jsxPath = path.join(__dirname, 'PlatformPage', 'PlatformPage.jsx');
let content = fs.readFileSync(jsxPath, 'utf8');

const heroReplacement = `      {/* ═══ A) HERO ═══ */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.videoBackground}>
          <div className={styles.videoOverlay}></div>
          <video autoPlay loop muted playsInline className={styles.video}>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-global-earth-rotating-in-space-47983-large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Morphing blobs with parallax */}
        {blobConfig.map((blob, i) => (
          <motion.div
            key={i}
            className={styles.blobPositioner}
            style={{
              top: blob.top,
              left: blob.left,
              y: parallaxValues[i],
            }}
          >
            <MorphingBlob
              size={blob.size}
              colors={['rgba(0,212,255,0.08)', 'rgba(0,255,179,0.05)']}
              duration={blob.duration}
            />
          </motion.div>
        ))}

        <div className={styles.heroContent}>
          <TextMaskReveal tag="h1" className={styles.heroTitleText}>
            XOST: The Structure of Tomorrow
          </TextMaskReveal>

          <motion.div
            className={styles.subheadline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8, ease: 'easeOut' }}
          >
            <TypewriterText
              text="Strategy. Execution. Scale. — Delivered by experts who live technology."
              startDelay={1200}
              speed={40}
            />
          </motion.div>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
          >
            <MagneticButton>
              <Link to="/services" className={styles.ctaGradient}>
                Explore Services
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/solutions" className={styles.ctaGhost}>
                View Our Work
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>`;

const heroRegex = /      \{\/\* ═══ A\) HERO ═══ \*\/\}[\s\S]*?<\/section>/;
content = content.replace(heroRegex, heroReplacement);

content = content.replace("const heroWords = ['We', 'Build', 'the', 'Infrastructure', 'of', 'Tomorrow'];", "");
content = content.replace("const gradientWordIndices = [3, 5]; // 'Infrastructure', 'Tomorrow'", "");
content = content.replace("import ParticleSphere from '../../components/ParticleSphere/ParticleSphere';", "");
content = content.replace("import GradientMesh from '../../components/GradientMesh/GradientMesh';", "");

if (!content.includes('faGlobe')) {
    content = content.replace('faHeadset,', 'faHeadset, faGlobe, faShieldHalved, faServer, faNetworkWired,');
}

const newSections = `      {/* ═══ PLATFORM CORE SECTIONS ═══ */}
      <section className={styles.platformCoreSection}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            The Engineering Engine
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          Built for scale, secured by design, and optimized for unparalleled performance.
        </p>
        
        <div className={styles.coreGrid}>
          <ScrollReveal direction="up" delay={100}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faServer} />
              </div>
              <h3 className={styles.coreCardTitle}>Core Architecture</h3>
              <p className={styles.coreCardDesc}>
                Our foundations are constructed utilizing distributed microservices patterns, orchestrated via Kubernetes to ensure high availability and resilient self-healing capabilities. By decoupling application components, we achieve independent scalability and streamlined CI/CD pipelines, allowing us to iterate rapidly without compromising on robust system integrity. The backend leverages polyglot persistence, employing specialized databases tailored to specific workload profiles—from real-time graph traversal to heavy transactional processing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faNetworkWired} />
              </div>
              <h3 className={styles.coreCardTitle}>Integration & APIs</h3>
              <p className={styles.coreCardDesc}>
                We prioritize API-first design methodologies to facilitate seamless interoperability across heterogeneous enterprise ecosystems. Our RESTful and GraphQL interfaces are rigorously documented and secured with OAuth 2.0 and JWT. We implement robust event-driven architectures utilizing message brokers like Apache Kafka and RabbitMQ, guaranteeing asynchronous data synchronization and minimizing latency during complex inter-system communication streams.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>
              <h3 className={styles.coreCardTitle}>Security & Compliance</h3>
              <p className={styles.coreCardDesc}>
                Security is deeply embedded into our software development lifecycle via DevSecOps practices. We employ automated vulnerability scanning, static and dynamic code analysis, and strict adherence to OWASP Top 10 mitigation strategies. Data is protected with AES-256 encryption at rest and TLS 1.3 in transit. Our architecture supports SOC 2 Type II, HIPAA, and GDPR compliance requirements, ensuring your mission-critical data remains inviolable.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className={styles.coreCard}>
              <div className={styles.coreCardIcon}>
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3 className={styles.coreCardTitle}>Scale & Performance</h3>
              <p className={styles.coreCardDesc}>
                We engineer platforms designed to handle massive concurrency without degradation. Through global edge caching, intelligent load balancing, and read-replica database configurations, we ensure sub-100ms response times globally. Our infrastructure automatically scales horizontally based on predictive load metrics, enabling your product to seamlessly absorb traffic spikes while optimizing underlying compute resource expenditure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ GLOBAL REACH SECTION ═══ */}
      <section className={styles.globalReachSection}>
        <div className={styles.sectionTitle}>
          <TextMaskReveal tag="h2" className={styles.sectionTitleText}>
            Where We Build The Future
          </TextMaskReveal>
        </div>
        <p className={styles.sectionSubtitle}>
          A globally distributed infrastructure, centralized around engineering excellence.
        </p>

        <div className={styles.mapContainer}>
          <div className={styles.abstractMap}>
            {/* The HQ Dot */}
            <div className={`${styles.mapDot} ${styles.hqDot}`}>
              <div className={styles.dotPulse}></div>
              <div className={styles.dotLabel}>Lahore, Pakistan (HQ)</div>
            </div>
            {/* Other regional dots */}
            <div className={`${styles.mapDot} ${styles.usDot}`}>
               <div className={styles.dotLabel}>United States</div>
            </div>
            <div className={`${styles.mapDot} ${styles.canDot}`}>
               <div className={styles.dotLabel}>Canada</div>
            </div>
            <div className={`${styles.mapDot} ${styles.ukDot}`}>
               <div className={styles.dotLabel}>United Kingdom</div>
            </div>
            
            {/* Lines (using SVG overlay) */}
            <svg className={styles.mapLines} viewBox="0 0 1000 500" preserveAspectRatio="none">
               <path d="M 680 220 Q 500 100 250 180" className={styles.connectionLine} />
               <path d="M 680 220 Q 500 80 220 150" className={styles.connectionLine} />
               <path d="M 680 220 Q 550 120 480 160" className={styles.connectionLine} />
            </svg>
          </div>
          
          <div className={styles.globalStats}>
             <div className={styles.globalStat}>
                <span className={styles.globalStatValue}>50+</span>
                <span className={styles.globalStatLabel}>Countries Served</span>
             </div>
             <div className={styles.globalStat}>
                <span className={styles.globalStatValue}>10M+</span>
                <span className={styles.globalStatLabel}>Active Users</span>
             </div>
          </div>
        </div>
      </section>
`;

const promiseIndex = content.indexOf('{/* ═══ G) PLATFORM PROMISE ═══ */}');
content = content.slice(0, promiseIndex) + newSections + '\n      ' + content.slice(promiseIndex);

fs.writeFileSync(jsxPath, content, 'utf8');

const cssPath = path.join(__dirname, 'PlatformPage', 'PlatformPage.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const cssAppend = `
/* ─── VIDEO HERO ───────────────────────────────────────────────────────── */
.videoBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.videoOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 15, 30, 0.7);
  z-index: 1;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.heroTitleText {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: var(--text-primary);
  margin-bottom: 24px;
}

/* ─── PLATFORM CORE SECTION ────────────────────────────────────────────── */
.platformCoreSection {
  padding: 80px 80px;
}

.coreGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.coreCard {
  background: var(--card-surface);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 12px var(--card-shadow);
  padding: 32px;
  transition: transform 250ms ease-out, border-color 250ms ease-out, box-shadow 250ms ease-out;
  height: 100%;
}

.coreCard:hover {
  transform: translateY(-4px);
  border-color: var(--accent-aqua);
  box-shadow: 0 8px 32px var(--hover-glow);
}

.coreCardIcon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.coreCardIcon svg {
  font-size: 24px;
  color: var(--accent-aqua);
}

.coreCardTitle {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.coreCardDesc {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* ─── GLOBAL REACH SECTION ─────────────────────────────────────────────── */
.globalReachSection {
  padding: 80px 80px;
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.mapContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
}

.abstractMap {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 500px;
  background: radial-gradient(circle at center, rgba(0,212,255,0.05) 0%, transparent 70%);
  border-radius: var(--radius-xl);
  border: 1px solid var(--card-border);
}

.mapLines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.connectionLine {
  fill: none;
  stroke: var(--accent-aqua);
  stroke-width: 2;
  stroke-dasharray: 6, 6;
  opacity: 0.5;
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}

.mapDot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--accent-aqua);
  border-radius: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
}

.hqDot {
  top: 44%;
  left: 68%;
  background: var(--accent-mint);
}

.dotPulse {
  position: absolute;
  top: -12px;
  left: -12px;
  width: 36px;
  height: 36px;
  background: var(--accent-mint);
  border-radius: 50%;
  opacity: 0.5;
  animation: pulse 2s infinite ease-out;
}

@keyframes pulse {
  0% { transform: scale(0.5); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

.dotLabel {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  background: var(--card-surface);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--card-border);
}

.usDot { top: 36%; left: 25%; }
.canDot { top: 30%; left: 22%; }
.ukDot { top: 32%; left: 48%; }

.globalStats {
  display: flex;
  gap: 64px;
  margin-top: 48px;
}

.globalStat {
  text-align: center;
}

.globalStatValue {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.globalStatLabel {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-top: 8px;
}

@media (max-width: 1023px) {
  .heroTitleText { font-size: 44px; }
  .platformCoreSection, .globalReachSection { padding: 80px 48px; }
}

@media (max-width: 767px) {
  .heroTitleText { font-size: 34px; }
  .platformCoreSection, .globalReachSection { padding: 80px 24px; }
  .abstractMap { height: 300px; }
  .globalStats { flex-direction: column; gap: 24px; }
}
`;

fs.writeFileSync(cssPath, cssContent + '\n' + cssAppend, 'utf8');
