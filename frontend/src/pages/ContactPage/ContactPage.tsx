import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import GradientMesh from '../../components/GradientMesh/GradientMesh';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import GlassmorphicCard from '../../components/GlassmorphicCard/GlassmorphicCard';
import GradientButton from '../../components/GradientButton/GradientButton';
import SEO from '../../components/SEO/SEO';
import styles from './ContactPage.module.css';

const SOCIAL_LINKS = [
  { icon: faInstagram, url: 'https://instagram.com', handle: '@xost_official' },
  { icon: faXTwitter, url: 'https://twitter.com', handle: '@xost_tech' },
  { icon: faGithub, url: 'https://github.com', handle: 'xost-engineering' },
  { icon: faLinkedin, url: 'https://linkedin.com', handle: 'xost-agency' },
  { icon: faYoutube, url: 'https://youtube.com', handle: 'XOST Studios' },
];

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <SEO 
        title="Contact Us | XOST Agency" 
        description="Get in touch with XOST for general inquiries, sales, support, or partnerships."
      />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBgWrapper}>
          <GradientMesh />
        </div>
        <div className={styles.heroContent}>
          <TextMaskReveal text="Let's build the future." className={styles.heroTitle} />
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Whether you need a cutting-edge platform, custom software, or cloud integration, our team is ready to deliver. Reach out today.
          </motion.p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.grid}>
          {/* Form Side */}
          <ScrollReveal direction="left" delay={0.2} className={styles.formCol}>
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className={styles.inputGroup}>
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className={styles.inputGroup}>
                  <input type="text" id="subject" placeholder=" " required />
                  <label htmlFor="subject">Subject</label>
                </div>
                <div className={styles.inputGroup}>
                  <textarea id="message" rows="5" placeholder=" " required></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>
                <div className={styles.submitWrapper}>
                  <GradientButton type="submit">
                    Send Message
                  </GradientButton>
                </div>
              </form>
            </div>
          </ScrollReveal>

          {/* Info Side */}
          <ScrollReveal direction="right" delay={0.4} className={styles.infoCol}>
            <GlassmorphicCard className={styles.sponsorshipCard}>
              <h3 className={styles.cardTitle}>Sponsorship & Partnerships</h3>
              <p className={styles.cardText}>
                We are actively looking for strategic partners and open-source sponsorships. 
                If you align with our mission to build performant, scalable technologies, let's talk.
              </p>
              <div className={styles.cardContact}>
                <strong>Email:</strong> partnerships@xost.com
              </div>
            </GlassmorphicCard>

            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Connect With Us</h3>
              <div className={styles.socialGrid}>
                {SOCIAL_LINKS.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                  >
                    <div className={styles.socialIconWrapper}>
                      <FontAwesomeIcon icon={social.icon} />
                    </div>
                    <span className={styles.socialHandle}>{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
