import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faXTwitter,
  faGithub,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faEnvelope,
  faComment,
  faPaperPlane,
  faCircleCheck,
  faSpinner,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import GradientMesh from '../../components/GradientMesh/GradientMesh';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import GlassmorphicCard from '../../components/GlassmorphicCard/GlassmorphicCard';
import SEO from '../../components/SEO/SEO';
import styles from './ContactPage.module.css';

const SOCIAL_LINKS = [
  { icon: faInstagram, url: 'https://instagram.com', handle: '@xost_official' },
  { icon: faXTwitter, url: 'https://twitter.com', handle: '@xost_tech' },
  { icon: faGithub, url: 'https://github.com', handle: 'xost-engineering' },
  { icon: faLinkedin, url: 'https://linkedin.com', handle: 'xost-agency' },
  { icon: faYoutube, url: 'https://youtube.com', handle: 'XOST Studios' },
];

const SUBJECT_OPTIONS = [
  { value: '', label: 'Select a subject…' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'quote', label: 'Project Quote' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Support' },
];

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = 'idle' | 'loading' | 'success';

const fieldVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!values.name.trim()) e.name = 'Full name is required.';
    if (!values.email.trim()) {
      e.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!values.subject) e.subject = 'Please select a subject.';
    if (!values.message.trim()) {
      e.message = 'Message is required.';
    } else if (values.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters.';
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    // Simulate network request
    await new Promise((res) => setTimeout(res, 1500));
    setStatus('success');
    setValues({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    // Reset back to idle after 4 seconds so user can submit again
    setTimeout(() => setStatus('idle'), 4000);
  };

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
            Whether you need a cutting-edge platform, custom software, or cloud integration, our
            team is ready to deliver. Reach out today.
          </motion.p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.grid}>
          {/* Form Side */}
          <ScrollReveal direction="left" delay={0.2} className={styles.formCol}>
            <div className={styles.formWrapper}>
              <motion.h2
                className={styles.formTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Send a Message
              </motion.h2>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className={styles.successState}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <div className={styles.successIconRing}>
                      <FontAwesomeIcon icon={faCircleCheck} className={styles.successIcon} />
                    </div>
                    <p className={styles.successText}>Message Sent!</p>
                    <p className={styles.successSub}>
                      We will get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Full Name */}
                    <motion.div
                      className={`${styles.inputGroup} ${errors.name ? styles.hasError : ''}`}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <span className={styles.fieldIcon}>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder=" "
                        value={values.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      <label htmlFor="name">Full Name</label>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.span
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      className={`${styles.inputGroup} ${errors.email ? styles.hasError : ''}`}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <span className={styles.fieldIcon}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder=" "
                        value={values.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      <label htmlFor="email">Email Address</label>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.span
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.email}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Subject dropdown */}
                    <motion.div
                      className={`${styles.inputGroup} ${styles.selectGroup} ${errors.subject ? styles.hasError : ''}`}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={2}
                    >
                      <span className={styles.fieldIcon}>
                        <FontAwesomeIcon icon={faComment} />
                      </span>
                      <select
                        id="subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        className={values.subject === '' ? styles.selectPlaceholder : ''}
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="subject" className={values.subject ? styles.labelFloated : ''}>
                        Subject
                      </label>
                      <span className={styles.selectArrow}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                      <AnimatePresence>
                        {errors.subject && (
                          <motion.span
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.subject}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      className={`${styles.inputGroup} ${errors.message ? styles.hasError : ''}`}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={3}
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder=" "
                        value={values.message}
                        onChange={handleChange}
                      />
                      <label htmlFor="message">Your Message</label>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span
                            className={styles.errorMsg}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                      className={styles.submitWrapper}
                      variants={fieldVariants}
                      initial="hidden"
                      animate="visible"
                      custom={4}
                    >
                      <motion.button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={status === 'loading'}
                        whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
                        whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
                      >
                        {status === 'loading' ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Info Side */}
          <ScrollReveal direction="right" delay={0.4} className={styles.infoCol}>
            <GlassmorphicCard className={styles.sponsorshipCard}>
              <h3 className={styles.cardTitle}>Sponsorship &amp; Partnerships</h3>
              <p className={styles.cardText}>
                We are actively looking for strategic partners and open-source sponsorships.
                If you align with our mission to build performant, scalable technologies, let's
                talk.
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
