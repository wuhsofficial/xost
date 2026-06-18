import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, Calendar, ChevronDown } from 'lucide-react';
import styles from './InsightsPages.module.css';

export default function TechBlogs({ pageData }) {
  const [activeTab, setActiveTab] = useState('All');
  const [typewriterText, setTypewriterText] = useState('');
  const words = ["AI Trends", "Cloud Insights", "Dev Best Practices", "Security Updates"];
  
  useEffect(() => {
    let i = 0;
    let offset = 0;
    let forwards = true;
    let skipCount = 0;
    const skipDelay = 15;
    const speed = 70;
    
    const interval = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          skipCount++;
          if (skipCount === skipDelay) {
            forwards = false;
            skipCount = 0;
          }
        }
      } else {
        if (offset === 0) {
          forwards = true;
          i = (i + 1) % words.length;
        }
      }
      
      if (skipCount === 0) {
        if (forwards) offset++;
        else offset--;
      }
      
      setTypewriterText(words[i].substring(0, offset));
    }, speed);
    
    return () => clearInterval(interval);
  }, []);

  const blogs = [
    { title: "Building RAG Pipelines with LangChain", cat: "AI & ML", date: "Oct 12", read: "8 min", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600" },
    { title: "Zero Trust Architecture Explained", cat: "Security", date: "Oct 10", read: "5 min", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" },
    { title: "Optimizing React Server Components", cat: "Development", date: "Oct 05", read: "12 min", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600" },
    { title: "Multi-Cloud Strategy for 2026", cat: "Cloud", date: "Sep 28", read: "6 min", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" },
    { title: "Real-time Analytics with Kafka", cat: "Data", date: "Sep 20", read: "10 min", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" },
    { title: "Fine-tuning Open Source LLMs", cat: "AI & ML", date: "Sep 15", read: "15 min", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600" }
  ];

  const filteredBlogs = activeTab === 'All' ? blogs : blogs.filter(b => b.cat === activeTab);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.heroHeader}>
        <h2 className={styles.heroHeadline}>
          Latest thoughts on <span style={{ color: '#00FFFF' }}>{typewriterText}</span><span className="cursor" style={{ opacity: 1, animation: 'blink 1s infinite' }}>|</span>
        </h2>
        <p className={styles.heroSubhead}>Deep dives into the tech shaping our future.</p>
      </div>

      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>150+</span>
          <span className={styles.statLabel}>Articles Published</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>50K+</span>
          <span className={styles.statLabel}>Monthly Readers</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>20+</span>
          <span className={styles.statLabel}>Expert Authors</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.featuredCard}>
          <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" alt="Featured" className={styles.featuredImage} />
          <div className={styles.cardBody} style={{ justifyContent: 'center' }}>
            <span className={styles.cardTag}>CyberSecurity</span>
            <h3 style={{ fontSize: '2rem', color: '#fff', margin: '1rem 0' }}>The Evolution of Malware Analysis using AI</h3>
            <p className={styles.cardDesc} style={{ WebkitLineClamp: 3, fontSize: '1.1rem' }}>
              How modern SOC teams are leveraging Large Language Models to reverse engineer malicious binaries and detect zero-day exploits faster than ever before.
            </p>
            <div className={styles.cardFooter} style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="https://i.pravatar.cc/100?img=11" alt="Author" style={{ width: '32px', borderRadius: '50%' }} />
                <span>Dr. Alan Walker</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14}/> 12 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.filterBar}>
        {['All', 'AI & ML', 'Cloud', 'Security', 'Development', 'Data'].map(tab => (
          <button 
            key={tab} 
            className={activeTab === tab ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.splitLayout} style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div>
          <div className={styles.cardGrid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {filteredBlogs.map((blog, i) => (
              <motion.div key={i} className={styles.contentCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <img src={blog.img} alt={blog.title} className={styles.cardImage} />
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>{blog.cat}</span>
                  <h4 className={styles.cardTitle}>{blog.title}</h4>
                  <div className={styles.cardFooter}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Calendar size={14}/> {blog.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14}/> {blog.read}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button className={styles.filterBtn}>Load More <ChevronDown size={16} style={{ verticalAlign: 'middle' }} /></button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.splitCard}>
            <h3 className={styles.sectionTitle}>Featured Authors</h3>
            <div className={styles.authorItem}>
              <img src="https://i.pravatar.cc/100?img=68" alt="Sarah" className={styles.authorAvatar} />
              <div>
                <h4 style={{ color: '#fff' }}>Sarah Jenkins</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Cloud Architecture • 12 Articles</p>
              </div>
            </div>
            <div className={styles.authorItem}>
              <img src="https://i.pravatar.cc/100?img=33" alt="David" className={styles.authorAvatar} />
              <div>
                <h4 style={{ color: '#fff' }}>David Chen</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>AI/ML Engineer • 8 Articles</p>
              </div>
            </div>
            <div className={styles.authorItem} style={{ borderBottom: 'none' }}>
              <img src="https://i.pravatar.cc/100?img=47" alt="Elena" className={styles.authorAvatar} />
              <div>
                <h4 style={{ color: '#fff' }}>Elena Rostova</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Data Science • 15 Articles</p>
              </div>
            </div>
          </div>

          <div className={styles.splitCard}>
            <h3 className={styles.sectionTitle}>Trending Topics</h3>
            <div className={styles.tagCloud}>
              <span className={styles.cloudTag} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>LLMs</span>
              <span className={styles.cloudTag} style={{ fontSize: '1rem' }}>Docker</span>
              <span className={styles.cloudTag} style={{ fontSize: '1.2rem' }}>Kubernetes</span>
              <span className={styles.cloudTag} style={{ fontSize: '0.9rem' }}>React 19</span>
              <span className={styles.cloudTag} style={{ fontSize: '1.8rem', color: 'var(--accent-aqua)' }}>Generative AI</span>
              <span className={styles.cloudTag} style={{ fontSize: '1.1rem' }}>RPA</span>
              <span className={styles.cloudTag} style={{ fontSize: '1.3rem' }}>Zero Trust</span>
              <span className={styles.cloudTag} style={{ fontSize: '0.9rem' }}>CI/CD</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.newsletterStrip}>
        <Mail size={40} color="#00FFFF" />
        <h3 style={{ color: '#fff', fontSize: '1.8rem' }}>Never miss an update</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Join 10,000+ tech leaders receiving our weekly engineering insights.</p>
        <div className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your work email" className={styles.newsletterInput} />
          <button className={styles.newsletterBtn}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}
