import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Clock, Phone, Mail, MessageCircle, MapPin, CheckCircle, AlertCircle, Linkedin, Twitter, Github, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './ContactPages.module.css';

export default function GeneralInquiries({ pageData }: { pageData?: any } = {}) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch("https://assets3.lottiefiles.com/packages/lf20_p0svefvw.json") // Customer Support/Message Lottie
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const validate = (field, value) => {
    let error = '';
    if (field === 'name' && value.length < 2) error = 'Name is required';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
    if (field === 'message' && value.length < 10) error = 'Message must be at least 10 characters';
    if (field === 'subject' && !value) error = 'Please select a subject';
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) validate(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true, subject: true });
    
    const isValid = ['name', 'email', 'message', 'subject'].every(field => validate(field, formData[field]));
    
    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTouched({});
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  const getInputClass = (field) => {
    if (!touched[field]) return styles.formInput;
    return errors[field] ? `${styles.formInput} ${styles.error}` : `${styles.formInput} ${styles.success}`;
  };

  const faqs = [
    { q: "How soon will I hear back?", a: "We guarantee a response within 24 business hours for all general inquiries, though our average is under 2 hours." },
    { q: "Can I schedule a call?", a: "Yes, once we review your initial message and route it to the right department, you'll receive a calendar link to book a meeting." },
    { q: "Do you work with international clients?", a: "Absolutely. Over 60% of our clients are based in North America, Europe, and the GCC." },
    { q: "What info should I include in my message?", a: "Please include a brief overview of your project, any specific technologies you are interested in, and your approximate timeline." },
    { q: "Is my data safe?", a: "Yes, all submissions are encrypted and we adhere to strict GDPR compliance guidelines regarding personal data." }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 180 }} />}
        </div>
        <h2 className={styles.heroHeadline}>Reach out for any questions</h2>
        <p className={styles.heroSubhead}>Our global team is ready to assist you with your digital transformation journey.</p>
      </div>

      <div style={{ background: 'rgba(0, 255, 255, 0.1)', border: '1px solid #00FFFF', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#00FFFF', fontWeight: 'bold' }}>
        <Clock size={20} /> We respond within 24 business hours
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt; 2hr</span>
          <span className={styles.statLabel}>Avg Response Time</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>98%</span>
          <span className={styles.statLabel}>Resolution Rate</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>24/7</span>
          <span className={styles.statLabel}>Support Available</span>
        </div>
      </section>

      <div className={styles.splitLayout}>
        {/* Form Column */}
        <div className={styles.formContainer}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={getInputClass('name')} placeholder="John Doe" />
              {touched.name && !errors.name && <CheckCircle size={18} color="#3fb950" className={styles.validationIcon} />}
              {touched.name && errors.name && <AlertCircle size={18} color="#ff7b72" className={styles.validationIcon} />}
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={getInputClass('email')} placeholder="john@example.com" />
              {touched.email && !errors.email && <CheckCircle size={18} color="#3fb950" className={styles.validationIcon} />}
              {touched.email && errors.email && <AlertCircle size={18} color="#ff7b72" className={styles.validationIcon} />}
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone (Optional)</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.formInput} placeholder="+1 (555) 000-0000" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Subject *</label>
              <select name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur} className={getInputClass('subject')}>
                <option value="">Select a subject...</option>
                <option value="General">General Inquiry</option>
                <option value="Technical">Technical Support</option>
                <option value="Business">Business / Sales</option>
                <option value="Other">Other</option>
              </select>
              {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} className={getInputClass('message')} rows={5} placeholder="How can we help you?"></textarea>
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? <div className={styles.spinner}></div> : 'Send Message'}
            </button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(63, 185, 80, 0.1)', color: '#3fb950', border: '1px solid #3fb950', borderRadius: '8px', textAlign: 'center' }}>
                  Your message has been sent successfully! We will be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.bentoCard} style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Phone color="#00FFFF" size={32} style={{ margin: '0 auto 1rem' }} />
              <h4>Phone</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>+92 300 1234567</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Mail color="#D946EF" size={32} style={{ margin: '0 auto 1rem' }} />
              <h4>Email</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>hello@xost.agency</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem', textAlign: 'center' }}>
              <MessageCircle color="#43E97B" size={32} style={{ margin: '0 auto 1rem' }} />
              <h4>WhatsApp</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>+92 300 1234567</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem', textAlign: 'center' }}>
              <MapPin color="#00FFFF" size={32} style={{ margin: '0 auto 1rem' }} />
              <h4>Address</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Lahore HQ</p>
            </div>
          </div>

          <div className={styles.splitCard}>
            <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Office Hours (PKT)</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Monday - Friday</span>
              <span>9:00 AM - 7:00 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Saturday</span>
              <span>10:00 AM - 3:00 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Sunday</span>
              <span style={{ color: '#ff7b72' }}>Closed</span>
            </div>
          </div>

          <div className={styles.mapCard}>
            <MapPin size={40} color="#D946EF" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ margin: 0 }}>XOST Headquarters</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>Main Tech Boulevard<br/>Lahore, Pakistan</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color='#0077b5'} onMouseOut={e => e.currentTarget.style.color='var(--text-secondary)'}><Linkedin size={28} /></a>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color='#1DA1F2'} onMouseOut={e => e.currentTarget.style.color='var(--text-secondary)'}><Twitter size={28} /></a>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color='#fff'} onMouseOut={e => e.currentTarget.style.color='var(--text-secondary)'}><Github size={28} /></a>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color='#FF0000'} onMouseOut={e => e.currentTarget.style.color='var(--text-secondary)'}><Youtube size={28} /></a>
          </div>

        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '3rem' }}>
        <h3 className={styles.sectionTitle}>Frequently Asked Questions</h3>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.accordionItem}>
              <div className={styles.accordionHeader} onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp size={20} color="#00FFFF" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
              </div>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={styles.accordionBody}>
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
