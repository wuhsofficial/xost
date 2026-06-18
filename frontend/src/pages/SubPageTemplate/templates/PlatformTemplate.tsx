import React from 'react';
import CoreArchitecture from './PlatformPages/CoreArchitecture';
import IntegrationAPIs from './PlatformPages/IntegrationAPIs';
import SecurityCompliance from './PlatformPages/SecurityCompliance';
import ScalePerformance from './PlatformPages/ScalePerformance';

export default function PlatformTemplate({ pageData, category }) {
  // Route to the highly customized components based on slug
  if (pageData.slug === 'core-architecture') return <CoreArchitecture pageData={pageData} />;
  if (pageData.slug === 'integration-apis') return <IntegrationAPIs pageData={pageData} />;
  if (pageData.slug === 'security-compliance') return <SecurityCompliance pageData={pageData} />;
  if (pageData.slug === 'scale-performance') return <ScalePerformance pageData={pageData} />;

  // Fallback for any other platform sub-pages
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>{pageData.title}</h2>
      <p>Content for this platform feature is coming soon.</p>
    </div>
  );
}
