import {
  faMicrochip, faNetworkWired, faShieldHalved, faServer,
  faCloud, faRobot, faCode, faMobileScreen,
  faSync, faCogs, faChartPie, faDatabase,
  faNewspaper, faBriefcase, faFileLines, faVideo,
  faBuildingColumns, faHeartPulse, faCartShopping, faTruckFast, faTv,
  faHouseUser, faStar, faHandshake, faMapLocationDot, faUsers, faBriefcaseClock, faGraduationCap,
  faLandmark, faFlaskVial, faBullseye, faRocket, faHeadset
} from '@fortawesome/free-solid-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface MegaMenuItem {
  title: string;
  slug: string;
  desc: string;
  icon: IconDefinition;
}

export type MegaMenuData = Record<string, MegaMenuItem[]>;

export const megaMenuData: MegaMenuData = {
  Platform: [
    { title: 'Core Architecture', slug: 'core-architecture', desc: 'Scalable cloud-native foundation.', icon: faMicrochip },
    { title: 'Integration & APIs', slug: 'integration-apis', desc: 'Seamless system connectivity.', icon: faNetworkWired },
    { title: 'Security & Compliance', slug: 'security-compliance', desc: 'Enterprise-grade data protection.', icon: faShieldHalved },
    { title: 'Scale & Performance', slug: 'scale-performance', desc: 'Global distributed infrastructure.', icon: faServer }
  ],
  Services: [
    { title: 'Enterprise & Software Development', slug: 'enterprise-software-development', desc: 'Custom robust business logic.', icon: faCode },
    { title: 'Cloud Architecture & Migration', slug: 'cloud-architecture-migration', desc: 'Seamlessly shift to modern infrastructure.', icon: faCloud },
    { title: 'Data Engineering & Analytics', slug: 'data-engineering-analytics', desc: 'Transform data into actionable insights.', icon: faDatabase },
    { title: 'AI & Machine Learning Integration', slug: 'ai-ml-integration', desc: 'Intelligent automation algorithms.', icon: faRobot },
    { title: 'CyberSecurity & Risk Management', slug: 'cybersecurity-risk-management', desc: 'Secure boundaries against threats.', icon: faShieldHalved },
    { title: 'Academic & FYP Solutions', slug: 'academic-fyp-solutions', desc: 'End-to-end Final Year Project support.', icon: faGraduationCap }
  ],
  Solutions: [
    { title: 'Digital Transformation', slug: 'digital-transformation', desc: 'Reimagine your digital capabilities.', icon: faSync },
    { title: 'Enterprise Automation', slug: 'enterprise-automation', desc: 'Streamline critical workflows efficiently.', icon: faCogs },
    { title: 'Cloud Cost Optimization', slug: 'cloud-cost-optimization', desc: 'Maximize ROI on your infrastructure.', icon: faChartPie },
    { title: 'Data-driven Decision Making', slug: 'data-driven-decision-making', desc: 'Empower your leadership teams.', icon: faDatabase }
  ],
  Insights: [
    { title: 'Tech Blogs', slug: 'tech-blogs', desc: 'Latest thoughts on technology trends.', icon: faNewspaper },
    { title: 'Case Studies', slug: 'case-studies', desc: 'How we solved complex problems.', icon: faBriefcase },
    { title: 'White Papers', slug: 'white-papers', desc: 'In-depth research and methodologies.', icon: faFileLines },
    { title: 'Webinars and Events', slug: 'webinars-and-events', desc: 'Join our expert live sessions.', icon: faVideo }
  ],
  Industries: [
    { title: 'Fintech & Banking', slug: 'fintech-banking', desc: 'Secure financial infrastructure.', icon: faBuildingColumns },
    { title: 'HealthCare & Life Science', slug: 'healthcare-life-science', desc: 'HIPAA-compliant medical software.', icon: faHeartPulse },
    { title: 'E-Commerce & Retail', slug: 'ecommerce-retail', desc: 'Scalable shopping experiences.', icon: faCartShopping },
    { title: 'Logistics & SupplyChain', slug: 'logistics-supply-chain', desc: 'Real-time global tracking systems.', icon: faTruckFast },
    { title: 'Telecom & Media', slug: 'telecom-media', desc: 'High-bandwidth streaming capabilities.', icon: faTv }
  ],
  Careers: [
    { title: 'Careers Home', slug: 'home', desc: 'Explore your future at XOST.', icon: faHouseUser },
    { title: 'Featured Career', slug: 'featured-career', desc: 'Highlighting our top opportunities.', icon: faStar },
    { title: 'How to Apply', slug: 'how-to-apply', desc: 'Our seamless hiring process.', icon: faHandshake },
    { title: 'Hiring Path', slug: 'hiring-path', desc: 'Step-by-step interview roadmap.', icon: faMapLocationDot },
    { title: 'Life at Xost', slug: 'life-at-xost', desc: 'Our culture, perks, and values.', icon: faUsers },
    { title: 'Where we work', slug: 'where-we-work', desc: 'Discover our global footprint.', icon: faBuildingColumns },
    { title: 'Offered Jobs', slug: 'offered-jobs', desc: 'Browse all open positions.', icon: faBriefcaseClock },
    { title: 'Internships', slug: 'internships', desc: 'Start your journey with us.', icon: faGraduationCap }
  ],
  About: [
    { title: 'Our History', slug: 'our-history', desc: 'The timeline of our evolution.', icon: faLandmark },
    { title: 'Centre & Facilities', slug: 'centre-facilities', desc: 'State-of-the-art infrastructure.', icon: faFlaskVial },
    { title: 'Our Impact', slug: 'our-impact', desc: 'How we change the digital world.', icon: faBullseye },
    { title: 'Missions', slug: 'missions', desc: 'What drives us forward everyday.', icon: faRocket }
  ],
  'Contact Us': [
    { title: 'General Inquiries', slug: 'general-inquiries', desc: 'Reach out for any questions.', icon: faHouseUser },
    { title: 'Sales & Partnerships', slug: 'sales-partnerships', desc: 'Collaborate with our business team.', icon: faHandshake },
    { title: 'Support & Help', slug: 'support-help', desc: 'Technical support for our clients.', icon: faHeadset },
    { title: 'Sponsorships', slug: 'sponsorships', desc: 'Major sponsorships and events.', icon: faStar }
  ]
};
