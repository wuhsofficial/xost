import React from 'react';
import OurHistory from './AboutPages/OurHistory';
import CentreFacilities from './AboutPages/CentreFacilities';
import OurImpact from './AboutPages/OurImpact';
import Missions from './AboutPages/Missions';

export default function AboutTemplate({ pageData, category }) {
  if (pageData.slug === 'our-history') return <OurHistory pageData={pageData} />;
  if (pageData.slug === 'centre-facilities') return <CentreFacilities pageData={pageData} />;
  if (pageData.slug === 'our-impact') return <OurImpact pageData={pageData} />;
  if (pageData.slug === 'missions') return <Missions pageData={pageData} />;

  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>{pageData.title}</h2>
      <p>Content for this about section is coming soon.</p>
    </div>
  );
}
