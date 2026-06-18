import re

with open(r"C:\Users\ibre4\.gemini\antigravity\scratch\agency-website\frontend\src\pages\PlatformPage\PlatformPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace Hero
hero_replacement = """      {/* ═══ A) HERO ═══ */}
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
      </section>"""

hero_pattern = re.compile(r"      \{\/\* ═══ A\) HERO ═══ \*\/}.*?      <\/section>", re.DOTALL)
content = hero_pattern.sub(hero_replacement, content)

# Remove unused imports and constants
content = content.replace("const heroWords = ['We', 'Build', 'the', 'Infrastructure', 'of', 'Tomorrow'];", "")
content = content.replace("const gradientWordIndices = [3, 5]; // 'Infrastructure', 'Tomorrow'", "")
content = content.replace("import ParticleSphere from '../../components/ParticleSphere/ParticleSphere';", "")
content = content.replace("import GradientMesh from '../../components/GradientMesh/GradientMesh';", "")

if "faGlobe" not in content:
    content = content.replace("faHeadset,", "faHeadset, faGlobe, faShieldHalved, faServer, faNetworkWired,")

new_sections = """
      {/* ═══ PLATFORM CORE SECTIONS ═══ */}
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
"""

promise_index = content.find("{/* ═══ G) PLATFORM PROMISE ═══ */}")
content = content[:promise_index] + new_sections + "\n      " + content[promise_index:]

with open(r"C:\Users\ibre4\.gemini\antigravity\scratch\agency-website\frontend\src\pages\PlatformPage\PlatformPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)
