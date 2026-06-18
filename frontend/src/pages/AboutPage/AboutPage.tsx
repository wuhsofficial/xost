import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faBolt, faShieldHalved, faChartLine, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import allTeamMembers from '../../data/teamData';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import SEO from '../../components/SEO/SEO';
import styles from './AboutPage.module.css';

/* ─── Static Data ──────────────────────────────────────────────────────── */
const aboutValues = [
  {
    icon: faGem,
    title: 'Quality First',
    desc: 'We never cut corners. Every pixel, every line of code, every strategy is crafted with care.',
  },
  {
    icon: faBolt,
    title: 'Speed Matters',
    desc: 'Fast execution without sacrificing quality. We ship on time, every time.',
  },
  {
    icon: faShieldHalved,
    title: 'Transparency',
    desc: 'No hidden fees, no scope creep surprises. Open communication from day one.',
  },
  {
    icon: faChartLine,
    title: 'Results-Driven',
    desc: 'Beautiful deliverables are table stakes. We measure success by the outcomes we generate.',
  },
];

/* ─── TeamCard with radial glow ────────────────────────────────────────── */
function TeamCard({ member }) {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  return (
    <div
      className={styles.teamCard}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--glow-x': `${glowPos.x}%`,
        '--glow-y': `${glowPos.y}%`,
      }}
    >
      {isHovered && <div className={styles.teamCardGlow} />}
      <div className={styles.avatar}>
        <span className={styles.avatarInitials}>{member.initials}</span>
      </div>
      <h3 className={styles.memberName}>{member.name}</h3>
      <p className={styles.memberRole}>{member.role}</p>
      <p className={styles.memberBio}>{member.bio}</p>
      <div className={styles.socialRow}>
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        )}
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        )}
        {member.portfolioUrl && (
          <a
            href={member.portfolioUrl}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} Portfolio`}
          >
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <SEO 
        title="About XOST | The Founders & Our Mission" 
        description="Learn about the history, founders, and core values that drive XOST to deliver world-class digital solutions."
      />
      {/* ─── Bento Box: History, Centers, Impact, Missions ────────────── */}
      <div className={styles.bentoGrid}>
        {/* Missions */}
        <div className={`${styles.bentoItem} ${styles.bentoMissions}`}>
          <TextMaskReveal tag="h1" className={styles.missionTitle}>
            Our Mission
          </TextMaskReveal>
          <p className={styles.missionBody}>
            We are a premium digital agency founded by technologists who believe
            that strategy, execution, and scale are the pillars of digital success.
            Every project we take on is a partnership — built on transparency,
            technical excellence, and an obsession with results.
          </p>
          <div className={styles.quoteCardInline}>
            <p className={styles.quoteText}>
              &ldquo;Build it right. Build it once. Scale it forever.&rdquo;
            </p>
          </div>
        </div>

        {/* Our History */}
        <div className={`${styles.bentoItem} ${styles.bentoHistory}`}>
          <h2 className={styles.bentoHeading}>Our History</h2>
          <p className={styles.bentoText}>
            From a tiny desk in 2018 to a global hub. We started with one goal: 
            eliminate the friction between ambitious ideas and production-ready code. 
            Today, XOST has delivered 100+ platforms across 3 continents.
          </p>
          <div className={styles.historyYear}>Est. 2018</div>
        </div>

        {/* Our Impact */}
        <div className={`${styles.bentoItem} ${styles.bentoImpact}`}>
          <h2 className={styles.bentoHeading}>Our Impact</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>100+</h3>
              <p className={styles.statLabel}>Projects Shipped</p>
            </div>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>$500M+</h3>
              <p className={styles.statLabel}>Client Rev. Gen.</p>
            </div>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>50M+</h3>
              <p className={styles.statLabel}>Active Users</p>
            </div>
            <div className={styles.statBox}>
              <h3 className={styles.statValue}>0</h3>
              <p className={styles.statLabel}>Failed Deliveries</p>
            </div>
          </div>
        </div>

        {/* Centers & Facilities */}
        <div className={`${styles.bentoItem} ${styles.bentoCenters}`}>
          <h2 className={styles.bentoHeading}>Centers & Facilities</h2>
          <p className={styles.bentoText}>
            Headquartered in Lahore, Pakistan, our state-of-the-art innovation center is designed for hyper-collaboration. 
            We also maintain satellite hubs across Europe and North America to stay close to our partners.
          </p>
          <div className={styles.bentoCentersVisual}>
            <span className={styles.cityPill}>Lahore (HQ)</span>
            <span className={styles.cityPill}>London</span>
            <span className={styles.cityPill}>New York</span>
          </div>
        </div>
      </div>

      {/* ─── Team ───────────────────────────────────────────────────────── */}
      <TextMaskReveal tag="h2" className={styles.sectionTitle}>
        The Founders
      </TextMaskReveal>
      <p className={styles.sectionSubtitle}>
        Three builders obsessed with craft, quality, and delivering results that matter.
      </p>
      <div className={styles.teamGrid}>
        {allTeamMembers.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>

      {/* ─── Values ─────────────────────────────────────────────────────── */}
      <TextMaskReveal tag="h2" className={styles.sectionTitle}>
        Our Values
      </TextMaskReveal>
      <div className={styles.valuesGrid}>
        {aboutValues.map((val) => (
          <div key={val.title} className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <FontAwesomeIcon
                icon={val.icon}
                style={{
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              />
            </div>
            <h3 className={styles.valueTitle}>{val.title}</h3>
            <p className={styles.valueDesc}>{val.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
