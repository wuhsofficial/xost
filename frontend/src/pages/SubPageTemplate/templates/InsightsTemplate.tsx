import React from 'react';
import TechBlogs from './InsightsPages/TechBlogs';
import CaseStudies from './InsightsPages/CaseStudies';
import WhitePapers from './InsightsPages/WhitePapers';
import WebinarsEvents from './InsightsPages/WebinarsEvents';

export default function InsightsTemplate({ pageData, category }) {
  if (pageData.slug === 'tech-blogs') return <TechBlogs pageData={pageData} />;
  if (pageData.slug === 'case-studies') return <CaseStudies pageData={pageData} />;
  if (pageData.slug === 'white-papers') return <WhitePapers pageData={pageData} />;
  if (pageData.slug === 'webinars-events') return <WebinarsEvents pageData={pageData} />;

  // Fallback
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>{pageData.title}</h2>
      <p>Content for this insight is coming soon.</p>
    </div>
  );
}
