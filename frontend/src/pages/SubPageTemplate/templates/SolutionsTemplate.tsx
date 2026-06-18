import React from 'react';
import DigitalTransformation from './SolutionsPages/DigitalTransformation';
import EnterpriseAutomation from './SolutionsPages/EnterpriseAutomation';
import CloudCostOptimization from './SolutionsPages/CloudCostOptimization';
import DataDrivenDecision from './SolutionsPages/DataDrivenDecision';

export default function SolutionsTemplate({ pageData, category }) {
  if (pageData.slug === 'digital-transformation') return <DigitalTransformation pageData={pageData} />;
  if (pageData.slug === 'enterprise-automation') return <EnterpriseAutomation pageData={pageData} />;
  if (pageData.slug === 'cloud-cost-optimization') return <CloudCostOptimization pageData={pageData} />;
  if (pageData.slug === 'data-driven-decision-making') return <DataDrivenDecision pageData={pageData} />;

  // Fallback
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>{pageData.title}</h2>
      <p>Content for this solution is coming soon.</p>
    </div>
  );
}
