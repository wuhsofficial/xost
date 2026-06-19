import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faCalendarDays, faClock, faEnvelope, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { getInsights } from '../../services/apiService';
import fallbackInsights from '../../data/insightsData';
import GradientMesh from '../../components/GradientMesh/GradientMesh';
import TextMaskReveal from '../../components/TextMaskReveal/TextMaskReveal';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import SEO from '../../components/SEO/SEO';
import Chart from 'react-apexcharts';
import styles from './InsightsPage.module.css';

/* ─── Constants ────────────────────────────────────────────────────────── */
const categories = ['Design', 'SEO', 'Development', 'AI/ML', 'Marketing', 'Startups'];

const sectionImages = {
  'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
  'SEO': 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=1000&auto=format&fit=crop',
  'Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
  'AI/ML': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
  'Marketing': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  'Startups': 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1000&auto=format&fit=crop'
};

const categoryGradientMap = {
  'AI': ['#6366F1', '#8B5CF6'],
  'AI/ML': ['#6366F1', '#8B5CF6'],
  'Design': ['#F472B6', '#FB923C'],
  'Development': ['#00D4FF', '#00FFB3'],
  'Marketing': ['#10B981', '#34D399'],
  'SEO': ['#FFB800', '#FF8C00'],
  'Content': ['#3B82F6', '#60A5FA'],
  'Startups': ['#F59E0B', '#FBBF24'],
};

function getCategoryGradient(category) {
  const colors = categoryGradientMap[category] || ['#00D4FF', '#00FFB3'];
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

/* ─── Animation helpers ────────────────────────────────────────────────── */
const cardEntry = (index) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: index * 0.1, ease: 'easeOut' },
});

/* ─── Floating Label Input ─────────────────────────────────────────────── */
function FloatingLabelInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  className = '',
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className={`${styles.inputWrapper} ${isActive ? styles.inputActive : ''} ${className}`}>
      <label
        htmlFor={id}
        className={styles.floatingLabel}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={styles.floatingInput}
        aria-label={label}
      />
      <div className={`${styles.inputUnderline} ${focused ? styles.inputUnderlineFocused : ''}`} />
    </div>
  );
}

export default function InsightsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState(null);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInsights();
      setArticles(data.length > 0 ? data : fallbackInsights);
    } catch (err) {
      setError('Failed to load articles.');
      setArticles(fallbackInsights);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const getArticlesForSection = (sectionName) => {
    // Filter articles that exactly match the section name
    let matched = articles.filter(a => a.category === sectionName);
    
    // If no articles found for this category, generate some visually appealing fallback dummy articles
    if (matched.length === 0) {
      matched = [
        {
          id: `${sectionName}-1`,
          title: `The Future of ${sectionName} in 2026`,
          excerpt: `Explore the emerging trends and paradigm shifts that are redefining ${sectionName} landscapes.`,
          category: sectionName,
          author: 'Xost Team',
          date: new Date().toISOString(),
          readTime: '5 min read',
          imageUrl: sectionImages[sectionName]
        },
        {
          id: `${sectionName}-2`,
          title: `Mastering ${sectionName} Strategies`,
          excerpt: `Actionable insights and proven frameworks to elevate your ${sectionName} initiatives globally.`,
          category: sectionName,
          author: 'Expert Panel',
          date: new Date(Date.now() - 86400000 * 5).toISOString(),
          readTime: '8 min read',
          imageUrl: sectionImages[sectionName]
        }
      ];
    }
    return matched;
  };

  const featured = articles.length > 0 ? articles[0] : null;

  /* Grid direction: 3-col grid, left half = left, right half = right */
  const getArticleDirection = (index) => {
    const col = index % 3;
    if (col === 0) return 'left';
    if (col === 2) return 'right';
    return 'up';
  };

  const showSnackbar = (msg) => {
    setSnackbar(msg);
    setTimeout(() => setSnackbar(null), 3000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showSnackbar('Please enter a valid email address.');
      return;
    }
    showSnackbar('Subscribed successfully!');
    setEmail('');
    setSubscribeSuccess(true);
    setTimeout(() => setSubscribeSuccess(false), 3000);
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className={styles.page}>
      <SEO 
        title="Insights & Analytics | XOST Agency" 
        description="Data-driven insights, metrics, and trends that empower modern businesses to scale securely."
      />
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <GradientMesh className={styles.heroMeshBg} />
        <TextMaskReveal tag="h1" className={styles.heroTitle}>
          Insights from the Frontier
        </TextMaskReveal>
        <p className={styles.heroSubtitle}>
          Perspectives on AI, design, development, and digital growth.
        </p>
      </section>

      {/* ─── Charts Section ─────────────────────────────────────────────── */}
      <section className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Articles Published by Category</h3>
          <Chart
            options={{
              chart: { type: 'bar', toolbar: { show: false  as any}, background: 'transparent' },
              theme: { mode: 'dark' },
              colors: ['#00D4FF'],
              plotOptions: { bar: { borderRadius: 4, horizontal: false } },
              xaxis: { categories: ['AI/ML', 'Design', 'Dev', 'Marketing', 'SEO'], labels: { style: { colors: '#94a3b8' } } },
              yaxis: { labels: { style: { colors: '#94a3b8' } } },
              grid: { borderColor: '#1e293b' },
              dataLabels: { enabled: false }
            }}
            series={[{ name: 'Articles Published', data: [45, 32, 68, 24, 18] }]}
            type="bar"
            height={300}
          />
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Monthly Readership Growth</h3>
          <Chart
            options={{
              chart: { type: 'area', toolbar: { show: false  as any}, background: 'transparent' },
              theme: { mode: 'dark' },
              colors: ['#8B5CF6'],
              fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } },
              dataLabels: { enabled: false },
              stroke: { curve: 'smooth', width: 2 },
              xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], labels: { style: { colors: '#94a3b8' } } },
              yaxis: { labels: { style: { colors: '#94a3b8' } } },
              grid: { borderColor: '#1e293b' },
            }}
            series={[{ name: 'Monthly Readers', data: [1200, 1900, 3000, 4500, 6200, 8400] }]}
            type="area"
            height={300}
          />
        </div>
      </section>

      {/* ─── Featured Article ───────────────────────────────────────────── */}
      {featured && (
        <section className={styles.featuredSection}>
          <div
            className={styles.featuredCard}
            style={{ background: getCategoryGradient(featured.category) }}
          >
            <div className={styles.featuredOverlay} />
            <div className={styles.featuredGlass} />
            <div className={styles.featuredContent}>
              <span className={styles.categoryPill}>{featured.category}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <div className={styles.metaRow}>
                <span className={styles.metaChip}>
                  <FontAwesomeIcon icon={faUser} />
                  {featured.author}
                </span>
                <span className={styles.metaChip}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  {formatDate(featured.date)}
                </span>
                <span className={styles.metaChip}>
                  <FontAwesomeIcon icon={faClock} />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Category Sections ──────────────────────────────────────────── */}
      <div className={styles.categorySections}>
        {loading ? (
          <div className={styles.shimmerGrid}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={styles.shimmerCard} />
            ))}
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
            <button type="button" className={styles.retryBtn} onClick={fetchArticles}>
              Retry
            </button>
          </div>
        ) : (
          categories.map((cat, sectionIdx) => (
            <section key={cat} className={styles.distinctSection}>
              <div className={styles.sectionHeader}>
                <TextMaskReveal tag="h2" className={styles.sectionTitle}>
                  {cat}
                </TextMaskReveal>
              </div>
              <div className={styles.massiveGrid}>
                {getArticlesForSection(cat).map((article, i) => (
                  <ScrollReveal
                    key={article.id || i}
                    delay={i * 100}
                    direction={getArticleDirection(i)}
                  >
                    <motion.article className={styles.massiveCard} {...cardEntry(i)}>
                      <div className={styles.massiveCardImgWrap}>
                        <img 
                          src={article.imageUrl || sectionImages[cat]} 
                          alt={article.title} 
                          className={styles.massiveCardImg} 
                        />
                        <div className={styles.massiveCardOverlay} />
                        <span
                          className={styles.massiveBadge}
                          style={{ background: getCategoryGradient(article.category) }}
                        >
                          {article.category}
                        </span>
                      </div>
                      <div className={styles.massiveCardContent}>
                        <h3 className={styles.massiveTitle}>{article.title}</h3>
                        <p className={styles.massiveExcerpt}>{article.excerpt}</p>
                        <div className={styles.articleFooter}>
                          <div className={styles.authorAvatar}>
                            {(article.author || 'T')[0]}
                          </div>
                          <span className={styles.authorName}>{article.author}</span>
                          <span className={styles.articleMeta}>
                            {formatDate(article.date)} · {article.readTime}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* ─── Newsletter ─────────────────────────────────────────────────── */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterIcon}>
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          />
        </div>
        <TextMaskReveal tag="h2" className={styles.newsletterTitle}>
          Get insights delivered to your inbox
        </TextMaskReveal>
        <p className={styles.newsletterSubtitle}>
          Join 2,000+ founders, developers, and marketers who get our weekly breakdown of
          trends, tools, and strategies.
        </p>
        <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
          <FloatingLabelInput
            id="newsletter-email"
            label="you@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.newsletterInputWrap}
          />
          <div className={styles.subscribeBtnWrap}>
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
            {subscribeSuccess && (
              <span className={styles.successCheck}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
          </div>
        </form>
      </section>

      {/* ─── Snackbar ───────────────────────────────────────────────────── */}
      {snackbar && <div className={styles.snackbar}>{snackbar}</div>}
    </main>
  );
}
