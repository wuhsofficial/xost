import React from 'react';
import FintechBanking from './IndustriesPages/FintechBanking';
import HealthcareLifeScience from './IndustriesPages/HealthcareLifeScience';
import EcommerceRetail from './IndustriesPages/EcommerceRetail';
import LogisticsSupplyChain from './IndustriesPages/LogisticsSupplyChain';
import TelecomMedia from './IndustriesPages/TelecomMedia';

export default function IndustriesTemplate({ pageData, category }) {
  if (pageData.slug === 'fintech-banking') return <FintechBanking pageData={pageData} />;
  if (pageData.slug === 'healthcare-life-science') return <HealthcareLifeScience pageData={pageData} />;
  if (pageData.slug === 'ecommerce-retail') return <EcommerceRetail pageData={pageData} />;
  if (pageData.slug === 'logistics-supplychain' || pageData.slug === 'logistics-supply-chain') return <LogisticsSupplyChain pageData={pageData} />;
  if (pageData.slug === 'telecom-media') return <TelecomMedia pageData={pageData} />;

  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>{pageData.title}</h2>
      <p>Content for this industry is coming soon.</p>
    </div>
  );
}
