import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Trophy, Medal, Star, Crown, Check, Calendar, Users, Eye, TrendingUp, Handshake, MessageSquareQuote, MapPin, Globe2 } from 'lucide-react';
import styles from './ContactPages.module.css';

export default function Sponsorships({ pageData }) {
  const [formData, setFormData] = useState({ company: '', name: '', email: '', phone: '', tier: '', event: '', budget: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lottieData, setLottieData] = useState(null);

  useEffect(() => {
    fetch("https://assets7.lottiefiles.com/packages/lf20_touohxv0.json") // Celebration/Trophy Lottie
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(e => console.log('Lottie fetch err', e));
  }, []);

  const validate = (field, value) => {
    let error = '';
    if (field === 'company' && value.length < 2) error = 'Company Name required';
    if (field === 'name' && value.length < 2) error = 'Contact Name required';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
    if (field === 'tier' && !value) error = 'Select a tier';
    if (field === 'event' && !value) error = 'Select an event/initiative';
    if (field === 'budget' && !value) error = 'Select a budget range';
    
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
    const fieldsToValidate = ['company', 'name', 'email', 'tier', 'event', 'budget'];
    const touchedState = {};
    fieldsToValidate.forEach(f => touchedState[f] = true);
    setTouched(prev => ({ ...prev, ...touchedState }));
    
    const isValid = fieldsToValidate.every(field => validate(field, formData[field]));
    
    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ company: '', name: '', email: '', phone: '', tier: '', event: '', budget: '', message: '' });
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
    <div className={styles.pageWrapper} style={{ paddingTop: 0 }}>
      {/* Hero Section */}
      <div style={{ 
        padding: '6rem 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(180deg, rgba(217, 70, 239, 0.15) 0%, rgba(10, 15, 30, 1) 100%)',
        borderBottom: '1px solid var(--card-border)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {lottieData && <Lottie animationData={lottieData} loop={true} style={{ height: 200 }} />}
        </div>
        <h1 style={{ fontSize: '3.5rem', margin: '0 auto 1rem', maxWidth: '800px', fontWeight: 800 }}>
          Partner With Us at <span style={{ color: '#D946EF' }}>Scale</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Align your brand with the fastest-growing digital engineering community. Reach thousands of decision-makers, developers, and tech enthusiasts.
        </p>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <h3 className={styles.sectionTitle} style={{ textAlign: 'center', borderBottom: 'none' }}>Sponsorship Tiers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {/* Bronze */}
          <div className={styles.bentoCard} style={{ display: 'flex', flexDirection: 'column' }}>
            <Trophy size={32} color="#cd7f32" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: '#cd7f32', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Bronze</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 2rem 0', flexGrow: 1, color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Logo on website</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> 1 Social media mention</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> 1 Event ticket</li>
            </ul>
            <button className={styles.submitBtn} style={{ background: 'transparent', border: '1px solid #cd7f32', color: '#cd7f32' }}>Select Bronze</button>
          </div>
          {/* Silver */}
          <div className={styles.bentoCard} style={{ display: 'flex', flexDirection: 'column' }}>
            <Medal size={32} color="#C0C0C0" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: '#C0C0C0', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Silver</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 2rem 0', flexGrow: 1, color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> All Bronze features</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Blog feature post</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Email newsletter mention</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> 3 Event tickets</li>
            </ul>
            <button className={styles.submitBtn} style={{ background: 'transparent', border: '1px solid #C0C0C0', color: '#C0C0C0' }}>Select Silver</button>
          </div>
          {/* Gold */}
          <div className={styles.bentoCard} style={{ display: 'flex', flexDirection: 'column', borderColor: '#FFD700', transform: 'scale(1.05)', zIndex: 1, boxShadow: '0 10px 30px rgba(255,215,0,0.1)' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: '#FFD700', color: '#000', padding: '0.2rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
            <Star size={32} color="#FFD700" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: '#FFD700', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Gold</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 2rem 0', flexGrow: 1, color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> All Silver features</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> 15-min Speaking slot</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Co-branded social campaign</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> 5 Event tickets</li>
            </ul>
            <button className={styles.submitBtn} style={{ background: '#FFD700', color: '#000' }}>Select Gold</button>
          </div>
          {/* Platinum */}
          <div className={styles.bentoCard} style={{ display: 'flex', flexDirection: 'column' }}>
            <Crown size={32} color="#E5E4E2" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: '#E5E4E2', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Platinum</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 2rem 0', flexGrow: 1, color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> All Gold features</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Exclusive Keynote slot</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Dedicated landing page</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> Press release inclusion</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#3fb950" /> 10 Event tickets</li>
            </ul>
            <button className={styles.submitBtn} style={{ background: 'transparent', border: '1px solid #E5E4E2', color: '#E5E4E2' }}>Select Platinum</button>
          </div>
        </div>
      </section>

      <section className={styles.statsGrid} style={{ marginTop: '2rem' }}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>50K+</span>
          <span className={styles.statLabel}>Monthly Visitors</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>25K+</span>
          <span className={styles.statLabel}>LinkedIn Followers</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>10K+</span>
          <span className={styles.statLabel}>Event Attendees/Yr</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>20+</span>
          <span className={styles.statLabel}>Annual Events</span>
        </div>
      </section>

      <div className={styles.splitLayout} style={{ marginTop: '3rem' }}>
        <div className={styles.formContainer}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Sponsorship Inquiry</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Company Name *</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} onBlur={handleBlur} className={getInputClass('company')} />
                {errors.company && <span className={styles.errorText}>{errors.company}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Contact Name *</label>
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
                <label className={styles.formLabel}>Interested Tier *</label>
                <select name="tier" value={formData.tier} onChange={handleChange} onBlur={handleBlur} className={getInputClass('tier')}>
                  <option value="">Select tier...</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Custom">Custom Package</option>
                </select>
                {errors.tier && <span className={styles.errorText}>{errors.tier}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Budget Range *</label>
                <select name="budget" value={formData.budget} onChange={handleChange} onBlur={handleBlur} className={getInputClass('budget')}>
                  <option value="">Select budget...</option>
                  <option value="<5k">&lt; $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-50k">$15,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
                {errors.budget && <span className={styles.errorText}>{errors.budget}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Event/Initiative of Interest *</label>
              <select name="event" value={formData.event} onChange={handleChange} onBlur={handleBlur} className={getInputClass('event')}>
                <option value="">Select event...</option>
                <option value="DevCon2025">XOST DevCon 2025</option>
                <option value="AIHackathon">Global AI Hackathon</option>
                <option value="WebinarSeries">Monthly CTO Webinar Series</option>
                <option value="OpenSource">Open Source Fund</option>
              </select>
              {errors.event && <span className={styles.errorText}>{errors.event}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Additional Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className={styles.formInput} rows="3"></textarea>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? <div className={styles.spinner}></div> : 'Submit Inquiry'}
            </button>

            <AnimatePresence>
              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(63, 185, 80, 0.1)', color: '#3fb950', border: '1px solid #3fb950', borderRadius: '8px', textAlign: 'center' }}>
                  Inquiry received! Our sponsorship team will review and contact you shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.splitCard}>
            <h3 className={styles.sectionTitle}>Why Sponsor XOST?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Users color="#D946EF" size={24} />
                <div><strong>Tech-savvy Audience</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Direct access to senior developers and architects.</span></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Handshake color="#D946EF" size={24} />
                <div><strong>B2B Decision Makers</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Over 40% of our attendees hold C-level or VP titles.</span></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Globe2 color="#D946EF" size={24} />
                <div><strong>Global Reach</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Strong presence in MENA, North America, and South Asia.</span></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <TrendingUp color="#D946EF" size={24} />
                <div><strong>High Engagement</strong><br/><span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>78% email open rates and active Discord communities.</span></div>
              </div>
            </div>
          </div>

          <div className={styles.splitCard} style={{ background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(217, 70, 239, 0.05))' }}>
            <MessageSquareQuote size={32} color="#00FFFF" style={{ marginBottom: '1rem' }} />
            <p style={{ fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.6' }}>"Sponsoring the XOST Hackathon yielded our highest ROI for developer acquisition this year. The leads were highly qualified and engaged."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#333' }}></div>
              <div>
                <strong style={{ display: 'block' }}>David Rodriguez</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CMO, CloudScale Inc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '3rem' }}>
        <h3 className={styles.sectionTitle}>Upcoming Sponsorable Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { date: "Oct 15, 2025", name: "XOST DevCon 2025", format: "Hybrid (Lahore + Online)", attendance: "5,000+" },
            { date: "Nov 20, 2025", name: "Global AI Hackathon", format: "100% Online", attendance: "10,000+" },
            { date: "Jan 10, 2026", name: "Enterprise Security Summit", format: "In-Person (Dubai)", attendance: "500 (Exec Only)" }
          ].map((evt, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-surface)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(217, 70, 239, 0.1)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '80px' }}>
                  <Calendar size={20} color="#D946EF" style={{ marginBottom: '0.25rem' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{evt.date.split(',')[0]}</div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{evt.name}</h4>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14}/> {evt.format}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={14}/> {evt.attendance}</span>
                  </div>
                </div>
              </div>
              <button style={{ background: 'transparent', color: '#D946EF', border: '1px solid #D946EF', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Download Prospectus</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
