import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Rocket, Target, Lightbulb, HeartHandshake, Code2, Shield, BookOpen, Scaling, Users, Globe2, Coffee, Gamepad2, Laptop } from 'lucide-react';
import styles from './AboutPages.module.css';

export default function Missions({ pageData }) {

  const radarOptions = {
    chart: { type: 'radar', background: 'transparent', toolbar: { show: false } },
    labels: ['Innovation', 'Client Obsession', 'Tech Excellence', 'Integrity', 'Continuous Learning', 'Impact'],
    stroke: { width: 2, colors: ['#D946EF'] },
    fill: { opacity: 0.2, colors: ['#D946EF'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: '#D946EF', strokeWidth: 2 },
    yaxis: { show: false },
    theme: { mode: 'light' },
    plotOptions: { radar: { polygons: { strokeColors: 'rgba(13,27,42,0.1)', connectorColors: 'rgba(13,27,42,0.1)' } } }
  };
  const radarSeries = [{ name: 'Cultural Alignment Score', data: [98, 100, 95, 100, 90, 95] }];

  return (
    <div className={styles.pageWrapper} style={{ paddingTop: 0 }}>
      {/* Full Width Hero */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        padding: '6rem 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, rgba(10, 15, 30, 0.9), rgba(217, 70, 239, 0.2))',
        borderBottom: '1px solid rgba(217, 70, 239, 0.3)',
        overflow: 'hidden'
      }}>
        {/* CSS Background Wave/Particle simulation via gradient animation */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 4s infinite alternate',
          zIndex: 0
        }}></div>
        
        <h1 style={{ position: 'relative', zIndex: 1, fontSize: '3rem', margin: '0 auto', maxWidth: '900px', fontWeight: 800, lineHeight: 1.2 }}>
          "To engineer the digital future, <span style={{ color: 'var(--accent-aqua)' }}>one solution at a time.</span>"
        </h1>
        <p style={{ position: 'relative', zIndex: 1, color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>
          What drives us forward everyday.
        </p>
      </div>

      <div className={styles.splitLayout} style={{ marginTop: '2rem' }}>
        <div className={styles.splitCard} style={{ background: 'rgba(0, 255, 255, 0.05)', borderColor: 'rgba(0, 255, 255, 0.3)' }}>
          <Target size={40} color="#00FFFF" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.8rem', color: '#00FFFF', margin: 0 }}>Our Mission</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            To empower businesses globally by delivering robust, scalable, and cutting-edge digital infrastructure. We solve complex problems through mathematical precision and relentless engineering.
          </p>
        </div>
        <div className={styles.splitCard} style={{ background: 'rgba(217, 70, 239, 0.05)', borderColor: 'rgba(217, 70, 239, 0.3)' }}>
          <Rocket size={40} color="#D946EF" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.8rem', color: '#D946EF', margin: 0 }}>Our Vision</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
            To become the undisputed global leader in digital transformation, recognized not just for what we build, but for the profound impact our technologies have on human progress.
          </p>
        </div>
      </div>

      <section className={styles.section} style={{ marginTop: '2rem' }}>
        <div className={styles.splitLayout}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className={styles.sectionTitle}>Core Values Assessment</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              We hold ourselves to the highest standards. This radar charts our internal commitments to the principles that govern every line of code we write and every interaction we have.
            </p>
            <Chart options={radarOptions as any} series={radarSeries} type="radar" height={350} />
          </div>
          
          <div className={styles.bentoGridLarge}>
            <div className={styles.bentoCard} style={{ padding: '1.5rem' }}>
              <Lightbulb className={styles.bentoIcon} />
              <h4>Innovation First</h4>
              <p style={{ fontSize: '0.9rem' }}>We challenge the status quo.</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem' }}>
              <HeartHandshake className={styles.bentoIcon} />
              <h4>Client Obsession</h4>
              <p style={{ fontSize: '0.9rem' }}>Your success is our metric.</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem' }}>
              <Code2 className={styles.bentoIcon} />
              <h4>Technical Excellence</h4>
              <p style={{ fontSize: '0.9rem' }}>No shortcuts, ever.</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem' }}>
              <Shield className={styles.bentoIcon} />
              <h4>Integrity & Transparency</h4>
              <p style={{ fontSize: '0.9rem' }}>Honest in every engagement.</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem' }}>
              <BookOpen className={styles.bentoIcon} />
              <h4>Continuous Learning</h4>
              <p style={{ fontSize: '0.9rem' }}>Always evolving, always growing.</p>
            </div>
            <div className={styles.bentoCard} style={{ padding: '1.5rem' }}>
              <Scaling className={styles.bentoIcon} />
              <h4>Impact over Output</h4>
              <p style={{ fontSize: '0.9rem' }}>Measured by transformation, not deliverables.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h3 className={styles.sectionTitle} style={{ borderBottom: 'none' }}>Strategic Pillars</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <Code2 size={48} color="#00FFFF" style={{ margin: '0 auto 1rem' }} />
            <h4>Technology Leadership</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Investing heavily in R&D and proprietary AI toolchains.</p>
            <strong style={{ color: '#00FFFF' }}>15% Rev reinvested in R&D</strong>
          </div>
          <div>
            <Users size={48} color="#D946EF" style={{ margin: '0 auto 1rem' }} />
            <h4>Human Capital</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Hiring the top 1% of engineering talent globally.</p>
            <strong style={{ color: '#D946EF' }}>100+ Elite Engineers</strong>
          </div>
          <div>
            <Globe2 size={48} color="#43E97B" style={{ margin: '0 auto 1rem' }} />
            <h4>Global Reach</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Building infrastructure that scales across continents effortlessly.</p>
            <strong style={{ color: '#43E97B' }}>3 Continental Hubs</strong>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ marginTop: '4rem' }}>
        <h3 className={styles.sectionTitle}>Life at XOST</h3>
        <div className={styles.splitLayout}>
          <div className={styles.masonryGrid} style={{ columnCount: 2 }}>
            <div className={styles.masonryItem}><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop" alt="Team 1" /></div>
            <div className={styles.masonryItem}><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop" alt="Team 2" /></div>
            <div className={styles.masonryItem}><img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=400&auto=format&fit=crop" alt="Team 3" /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Coffee color="#00FFFF" size={32} />
              <div><strong>Flexible & Remote-first</strong><br/><span style={{ color: 'var(--text-secondary)' }}>Work from anywhere, anytime. We care about output, not hours.</span></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Laptop color="#D946EF" size={32} />
              <div><strong>Top-tier Gear</strong><br/><span style={{ color: 'var(--text-secondary)' }}>Latest MacBooks, dual 4K monitors, and ergonomic setups for everyone.</span></div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Gamepad2 color="#43E97B" size={32} />
              <div><strong>Play Hard</strong><br/><span style={{ color: 'var(--text-secondary)' }}>Annual company retreats, weekly gaming sessions, and hackathons.</span></div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ 
        background: 'var(--card-surface)', 
        border: '1px solid var(--accent-aqua)',
        padding: '3rem', 
        borderRadius: '12px', 
        textAlign: 'center', 
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <h3 style={{ margin: 0, fontSize: '2rem' }}>Ready to shape the future?</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.1rem' }}>
          We are always looking for passionate engineers, designers, and thinkers to join our mission.
        </p>
        <Link to="/careers" style={{ 
          background: 'var(--gradient-accent)', 
          color: '#fff', 
          padding: '1rem 2.5rem', 
          borderRadius: '50px', 
          fontWeight: 'bold', 
          textDecoration: 'none',
          marginTop: '1rem',
          display: 'inline-block'
        }}>
          View Open Roles
        </Link>
      </div>
    </div>
  );
}
