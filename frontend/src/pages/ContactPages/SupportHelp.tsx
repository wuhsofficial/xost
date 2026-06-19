import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { ShieldCheck, Zap, LifeBuoy, MessageSquare, Mail, PhoneCall, MonitorPlay, Book, Terminal, CreditCard, Lock, Plug, Wrench, CheckCircle, AlertCircle, Paperclip } from 'lucide-react';
import styles from './ContactPages.module.css';

export default function SupportHelp({ pageData }: { pageData?: any } = {}) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', product: '', priority: '', title: '', desc: '' });
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch("https://assets1.lottiefiles.com/packages/lf20_5n8sxzjp.json") // IT Support Lottie
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const validate = (field, value) => {
    let error = '';
    if (field === 'name' && value.length < 2) error = 'Name required';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
    if (field === 'company' && value.length < 2) error = 'Company required';
    if (field === 'product' && !value) error = 'Select a product/service';
    if (field === 'priority' && !value) error = 'Select a priority level';
    if (field === 'title' && value.length < 5) error = 'Title must be at least 5 chars';
    if (field === 'desc' && value.length < 10) error = 'Description must be at least 10 chars';
    
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
    const fieldsToValidate = ['name', 'email', 'company', 'product', 'priority', 'title', 'desc'];
    const touchedState = {};
    fieldsToValidate.forEach(f => touchedState[f] = true);
    setTouched(prev => ({ ...prev, ...touchedState }));
    
    const isValid = fieldsToValidate.every(field => validate(field, formData[field]));
    
    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', product: '', priority: '', title: '', desc: '' });
        setTouched({});
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  const getInputClass = (field) => {
    if (!touched[field]) return styles.formInput;
    return errors[field] ? `${styles.formInput} ${styles.error}` : `${styles.formInput} ${styles.success}`;
  };

  const systemStatus = [
    { name: 'XOST Core API', uptime: 99.99 },
    { name: 'Client Dashboard', uptime: 99.95 },
    { name: 'Global CDN', uptime: 100.00 },
    { name: 'Database Clusters', uptime: 99.98 },
    { name: 'Auth Service', uptime: 99.99 }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {lottieData ? <Lottie animationData={lottieData} loop={true} style={{ height: 180 }} /> : <LifeBuoy size={64} color="#00FFFF" style={{ margin: '0 auto 1rem' }} />}
        </div>
        <h2 className={styles.heroHeadline}>Technical support for our clients</h2>
        <p className={styles.heroSubhead}>Fast, reliable, and expert-led assistance for your critical infrastructure.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(63, 185, 80, 0.1)', border: '1px solid #3fb950', padding: '0.8rem 2rem', borderRadius: '50px' }}>
          <div style={{ width: '12px', height: '12px', background: '#3fb950', borderRadius: '50%', boxShadow: '0 0 10px #3fb950', animation: 'pulse 2s infinite alternate' }}></div>
          <span style={{ color: '#3fb950', fontWeight: 'bold' }}>All Systems Operational</span>
        </div>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>&lt; 15m</span>
          <span className={styles.statLabel}>Critical Response</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>99.8%</span>
          <span className={styles.statLabel}>Resolution Rate</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>24/7</span>
          <span className={styles.statLabel}>Active Monitoring</span>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Support Tiers</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard} style={{ borderColor: 'var(--card-border)' }}>
            <h4 style={{ color: 'var(--text-secondary)' }}>Standard Support</h4>
            <p>Included with all basic plans.</p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
              <li>Email Ticketing</li>
              <li>48-hour response time</li>
              <li>Business hours (9-5 PKT)</li>
            </ul>
          </div>
          <div className={styles.bentoCard} style={{ borderColor: '#00FFFF', boxShadow: '0 0 20px rgba(0,255,255,0.1)' }}>
            <h4 style={{ color: '#00FFFF' }}>Priority Support</h4>
            <p>For mid-market enterprises.</p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
              <li>Email + Phone Support</li>
              <li>4-hour response time</li>
              <li>Extended hours (24/5)</li>
            </ul>
          </div>
          <div className={styles.bentoCard} style={{ borderColor: '#D946EF' }}>
            <h4 style={{ color: '#D946EF' }}>Enterprise Support</h4>
            <p>Mission-critical infrastructure.</p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
              <li>Dedicated L3 Engineer</li>
              <li>1-hour response SLA</li>
              <li>24/7/365 coverage</li>
            </ul>
          </div>
        </div>
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.formContainer}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Open a Support Ticket</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Client Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={getInputClass('name')} />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={getInputClass('email')} />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Company *</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} className={getInputClass('company')} />
                {errors.company && <span className={styles.errorText}>{errors.company}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product/Service *</label>
                <select name="product" value={formData.product} onChange={handleChange} onBlur={handleBlur} className={getInputClass('product')}>
                  <option value="">Select...</option>
                  <option value="api">Core API</option>
                  <option value="web">Web App</option>
                  <option value="mobile">Mobile App</option>
                  <option value="infrastructure">Cloud Infrastructure</option>
                </select>
                {errors.product && <span className={styles.errorText}>{errors.product}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Issue Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} onBlur={handleBlur} className={getInputClass('title')} />
                {errors.title && <span className={styles.errorText}>{errors.title}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Priority Level *</label>
                <select name="priority" value={formData.priority} onChange={handleChange} onBlur={handleBlur} className={getInputClass('priority')}>
                  <option value="">Select priority...</option>
                  <option value="low">Low (Cosmetic/Minor)</option>
                  <option value="medium">Medium (Partial Degration)</option>
                  <option value="high">High (Major Feature Down)</option>
                  <option value="critical">Critical (System Outage)</option>
                </select>
                {errors.priority && <span className={styles.errorText}>{errors.priority}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Detailed Description *</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} onBlur={handleBlur} className={getInputClass('desc')} rows={4}></textarea>
              {errors.desc && <span className={styles.errorText}>{errors.desc}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#00FFFF' }}>
                <Paperclip size={18} /> Attach File (Logs, Screenshots)
                <input type="file" style={{ display: 'none' }} />
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? <div className={styles.spinner}></div> : 'Submit Ticket'}
            </button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(63, 185, 80, 0.1)', color: '#3fb950', border: '1px solid #3fb950', borderRadius: '8px', textAlign: 'center' }}>
                  Ticket #T-88942 generated successfully. Check your email for confirmation.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.splitCard}>
            <h3 className={styles.sectionTitle}>System Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              {systemStatus.map((sys, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{sys.name}</span>
                    <span style={{ color: '#3fb950' }}>{sys.uptime}%</span>
                  </div>
                  <div className={styles.statusBar}>
                    <motion.div className={styles.statusFill} initial={{ width: 0 }} animate={{ width: `${sys.uptime}%` }} transition={{ duration: 1 }} />
                  </div>
                </div>
              ))}
            </div>
            <a href="#" style={{ color: '#00FFFF', fontSize: '0.9rem', textAlign: 'right', marginTop: '1rem', display: 'block' }}>View detailed metrics &rarr;</a>
          </div>

          <div className={styles.splitCard}>
            <h3 className={styles.sectionTitle}>Support Channels</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><MessageSquare color="#D946EF" /> <span>Live Chat<br/><small style={{ color: 'var(--text-secondary)' }}>24/7</small></span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Mail color="#00FFFF" /> <span>Email Ticket<br/><small style={{ color: 'var(--text-secondary)' }}>24/7</small></span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><PhoneCall color="#43E97B" /> <span>Phone Support<br/><small style={{ color: 'var(--text-secondary)' }}>Priority Only</small></span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><MonitorPlay color="#ff7b72" /> <span>Remote Session<br/><small style={{ color: 'var(--text-secondary)' }}>Scheduled</small></span></div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Knowledge Base</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            { icon: Book, title: "Getting Started" },
            { icon: Terminal, title: "API Documentation" },
            { icon: CreditCard, title: "Billing & Subscriptions" },
            { icon: Lock, title: "Security Protocols" },
            { icon: Plug, title: "Third-party Integrations" },
            { icon: Wrench, title: "Troubleshooting Guide" }
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--card-surface)', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', transition: 'background 0.3s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(0,255,255,0.05)'} onMouseOut={e=>e.currentTarget.style.background='var(--card-surface)'}>
              <item.icon size={28} color="var(--text-secondary)" style={{ margin: '0 auto 0.5rem' }} />
              <h5 style={{ margin: 0, fontWeight: 'normal' }}>{item.title}</h5>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Escalation Matrix</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto', padding: '2rem 0', gap: '1rem' }}>
          <div style={{ background: 'var(--card-surface)', border: '2px solid var(--card-border)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '150px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}>L1</h4>
            General Support
          </div>
          <div style={{ height: '2px', background: 'var(--card-border)', flexGrow: 1, minWidth: '30px' }}></div>
          <div style={{ background: 'var(--card-surface)', border: '2px solid #00FFFF', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '150px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#00FFFF' }}>L2</h4>
            Technical Support
          </div>
          <div style={{ height: '2px', background: '#00FFFF', flexGrow: 1, minWidth: '30px' }}></div>
          <div style={{ background: 'var(--card-surface)', border: '2px solid #D946EF', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '150px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#D946EF' }}>L3</h4>
            Core Engineering
          </div>
          <div style={{ height: '2px', background: '#D946EF', flexGrow: 1, minWidth: '30px' }}></div>
          <div style={{ background: 'rgba(255, 123, 114, 0.1)', border: '2px solid #ff7b72', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '150px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#ff7b72' }}>CTO</h4>
            Executive Escalation
          </div>
        </div>
      </section>
    </div>
  );
}
