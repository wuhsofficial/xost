import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Handshake, Store, Combine, Route, Users, Banknote, CalendarDays, LineChart, ShieldCheck, Megaphone, CheckCircle, AlertCircle, Linkedin, Mail } from 'lucide-react';
import styles from './ContactPages.module.css';

export default function SalesPartnerships({ pageData }: { pageData?: any } = {}) {
  const [lottieData, setLottieData] = useState(null);
  const [formData, setFormData] = useState({ company: '', name: '', email: '', phone: '', size: '', type: '', desc: '' });
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Handshake Lottie
    fetch("https://assets1.lottiefiles.com/packages/lf20_mK7DGA.json") // fallback placeholder
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const validate = (field, value) => {
    let error = '';
    if (field === 'company' && value.length < 2) error = 'Company Name is required';
    if (field === 'name' && value.length < 2) error = 'Name is required';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
    if (field === 'size' && !value) error = 'Please select company size';
    if (field === 'type' && !value) error = 'Please select partnership type';
    if (field === 'desc' && value.length < 10) error = 'Description must be at least 10 characters';
    
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
    const fieldsToValidate = ['company', 'name', 'email', 'size', 'type', 'desc'];
    const touchedState = {};
    fieldsToValidate.forEach(f => touchedState[f] = true);
    setTouched(prev => ({ ...prev, ...touchedState }));
    
    const isValid = fieldsToValidate.every(field => validate(field, formData[field]));
    
    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ company: '', name: '', email: '', phone: '', size: '', type: '', desc: '' });
        setTouched({});
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  const getInputClass = (field) => {
    if (!touched[field]) return styles.formInput;
    return errors[field] ? `${styles.formInput} ${styles.error}` : `${styles.formInput} ${styles.success}`;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.splitLayout} style={{ alignItems: 'center' }}>
        <div>
          <h2 className={styles.heroHeadline} style={{ textAlign: 'left', fontSize: '3rem' }}>Let's build something great together</h2>
          <p className={styles.heroSubhead} style={{ textAlign: 'left', maxWidth: '500px' }}>Join the XOST Global Partner Network. Leverage our enterprise infrastructure and engineering capabilities to accelerate your growth.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {lottieData ? <Lottie animationData={lottieData} loop={true} style={{ height: 300 }} /> : <Handshake size={150} color="#00FFFF" />}
        </div>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>50+</span>
          <span className={styles.statLabel}>Active Partners</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>30+</span>
          <span className={styles.statLabel}>Countries Reached</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>3x</span>
          <span className={styles.statLabel}>Avg Partner Growth</span>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Partnership Models</h3>
        <div className={styles.bentoGridLarge}>
          <div className={styles.bentoCard}>
            <Store className={styles.bentoIcon} />
            <h4>Reseller Partner</h4>
            <p>Sell XOST cloud & software solutions directly to your clients with highly competitive margins.</p>
          </div>
          <div className={styles.bentoCard}>
            <Combine className={styles.bentoIcon} />
            <h4>Technology Integration</h4>
            <p>Integrate your product with the XOST platform ecosystem using our secure APIs.</p>
          </div>
          <div className={styles.bentoCard}>
            <Route className={styles.bentoIcon} />
            <h4>Strategic Alliance</h4>
            <p>Joint go-to-market strategies for enterprise digital transformation projects.</p>
          </div>
          <div className={styles.bentoCard}>
            <Users className={styles.bentoIcon} />
            <h4>Co-development</h4>
            <p>Build custom intellectual property and vertical SaaS products together.</p>
          </div>
        </div>
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.formContainer}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Partnership Inquiry</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Company Name *</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} className={getInputClass('company')} />
                {errors.company && <span className={styles.errorText}>{errors.company}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={getInputClass('name')} />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={getInputClass('email')} />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.formInput} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Company Size *</label>
                <select name="size" value={formData.size} onChange={handleChange} onBlur={handleBlur} className={getInputClass('size')}>
                  <option value="">Select size...</option>
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201+">201+ Employees</option>
                </select>
                {errors.size && <span className={styles.errorText}>{errors.size}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Partnership Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} onBlur={handleBlur} className={getInputClass('type')}>
                  <option value="">Select type...</option>
                  <option value="Reseller">Reseller</option>
                  <option value="Technology">Technology Partner</option>
                  <option value="Strategic">Strategic Alliance</option>
                  <option value="Co-development">Co-development</option>
                </select>
                {errors.type && <span className={styles.errorText}>{errors.type}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Brief Description *</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} onBlur={handleBlur} className={getInputClass('desc')} rows={4} placeholder="Tell us about how we can collaborate..."></textarea>
              {errors.desc && <span className={styles.errorText}>{errors.desc}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? <div className={styles.spinner}></div> : 'Submit Inquiry'}
            </button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(63, 185, 80, 0.1)', color: '#3fb950', border: '1px solid #3fb950', borderRadius: '8px', textAlign: 'center' }}>
                  Inquiry submitted! Our partnership team will contact you within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h3 className={styles.sectionTitle}>Partner Benefits</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div className={styles.splitCard} style={{ padding: '1.5rem', flexDirection: 'row', alignItems: 'center' }}>
              <Banknote size={24} color="#00FFFF" />
              <div><strong>Revenue Sharing</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Lucrative commission structures and tier bonuses.</span></div>
            </div>
            <div className={styles.splitCard} style={{ padding: '1.5rem', flexDirection: 'row', alignItems: 'center' }}>
              <Megaphone size={24} color="#D946EF" />
              <div><strong>Co-marketing Support</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>MDF funds, joint webinars, and dedicated PR campaigns.</span></div>
            </div>
            <div className={styles.splitCard} style={{ padding: '1.5rem', flexDirection: 'row', alignItems: 'center' }}>
              <ShieldCheck size={24} color="#43E97B" />
              <div><strong>Technical Enablement</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Free access to sandbox environments and API docs.</span></div>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(90deg, rgba(0, 255, 255, 0.1), rgba(217, 70, 239, 0.1))', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(0, 255, 255, 0.3)', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Accelerate the Process</h4>
            <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)' }}>Skip the queue and talk to our Partnership Directors directly.</p>
            <button style={{ background: '#fff', color: '#000', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarDays size={18} /> Book Discovery Call
            </button>
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle} style={{ textAlign: 'center', borderBottom: 'none' }}>Sales Leadership Team</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
          {[
            { name: "Marcus Thorne", title: "VP of Global Sales", region: "North America & EU" },
            { name: "Aisha Rahman", title: "Head of Partnerships", region: "MENA Region" },
            { name: "David Chen", title: "Director, Channel Sales", region: "APAC Region" }
          ].map((member, i) => (
            <div key={i} className={styles.bentoCard} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-border)', marginBottom: '1rem' }}></div>
              <h4 style={{ margin: '0 0 0.25rem 0' }}>{member.name}</h4>
              <p style={{ margin: 0, color: 'var(--accent-aqua)', fontSize: '0.9rem' }}>{member.title}</p>
              <p style={{ margin: '0.5rem 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{member.region}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: 'var(--text-secondary)' }}><Linkedin size={20} /></a>
                <a href="#" style={{ color: 'var(--text-secondary)' }}><Mail size={20} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle}>Partnership Process</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto', padding: '2rem 0', gap: '1rem' }}>
          {['Inquiry', 'Discovery', 'Proposal', 'Agreement', 'Onboarding', 'Growth'].map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{ background: 'var(--card-surface)', border: '2px solid var(--accent-aqua)', padding: '1rem 1.5rem', borderRadius: '50px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {idx + 1}. {step}
              </div>
              {idx < 5 && <div style={{ height: '2px', background: 'var(--accent-aqua)', flexGrow: 1, minWidth: '30px' }}></div>}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
