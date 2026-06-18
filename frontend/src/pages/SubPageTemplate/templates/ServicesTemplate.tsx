import React from 'react';
import EnterpriseSoftware from './ServicesPages/EnterpriseSoftware';
import CloudArchitecture from './ServicesPages/CloudArchitecture';
import DataEngineering from './ServicesPages/DataEngineering';
import AIIntegration from './ServicesPages/AIIntegration';
import CyberSecurity from './ServicesPages/CyberSecurity';
import AcademicFYP from './ServicesPages/AcademicFYP';

export default function ServicesTemplate({ pageData, category }) {
  if (pageData.slug === 'enterprise-software-development') return <EnterpriseSoftware pageData={pageData} />;
  if (pageData.slug === 'cloud-architecture-migration') return <CloudArchitecture pageData={pageData} />;
  if (pageData.slug === 'data-engineering-analytics') return <DataEngineering pageData={pageData} />;
  if (pageData.slug === 'ai-ml-integration') return <AIIntegration pageData={pageData} />;
  if (pageData.slug === 'cybersecurity-risk-management') return <CyberSecurity pageData={pageData} />;
  if (pageData.slug === 'academic-fyp-solutions') return <AcademicFYP pageData={pageData} />;

  // Fallback
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>{pageData.title}</h2>
      <p>Content for this service is coming soon.</p>
    </div>
  );
}
