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
  shortTitle?: string;
  slug: string;
  desc: string;
  icon: IconDefinition;
}

export type MegaMenuData = Record<string, MegaMenuItem[]>;

export const megaMenuData: MegaMenuData = {
  Platform: [
    { title: 'Core Architecture', shortTitle: 'Architecture', slug: 'core-architecture', desc: 'Scalable cloud-native foundation.', icon: faMicrochip },
    { title: 'Integration & APIs', shortTitle: 'APIs', slug: 'integration-apis', desc: 'Seamless system connectivity.', icon: faNetworkWired },
    { title: 'Security & Compliance', shortTitle: 'Security', slug: 'security-compliance', desc: 'Enterprise-grade data protection.', icon: faShieldHalved },
    { title: 'Scale & Performance', shortTitle: 'Scale', slug: 'scale-performance', desc: 'Global distributed infrastructure.', icon: faServer }
  ],
  Services: [
    { title: 'Enterprise & Software Development', shortTitle: 'Software Dev', slug: 'enterprise-software-development', desc: 'Custom robust business logic.', icon: faCode },
    { title: 'Cloud Architecture & Migration', shortTitle: 'Cloud Arch', slug: 'cloud-architecture-migration', desc: 'Seamlessly shift to modern infrastructure.', icon: faCloud },
    { title: 'Data Engineering & Analytics', shortTitle: 'Data & Analytics', slug: 'data-engineering-analytics', desc: 'Transform data into actionable insights.', icon: faDatabase },
    { title: 'AI & Machine Learning Integration', shortTitle: 'AI & ML', slug: 'ai-ml-integration', desc: 'Intelligent automation algorithms.', icon: faRobot },
    { title: 'CyberSecurity & Risk Management', shortTitle: 'CyberSecurity', slug: 'cybersecurity-risk-management', desc: 'Secure boundaries against threats.', icon: faShieldHalved },
    { title: 'Academic & FYP Solutions', shortTitle: 'Academic / FYP', slug: 'academic-fyp-solutions', desc: 'End-to-end Final Year Project support.', icon: faGraduationCap }
  ],
  Solutions: [
    { title: 'Digital Transformation', shortTitle: 'Transformation', slug: 'digital-transformation', desc: 'Reimagine your digital capabilities.', icon: faSync },
    { title: 'Enterprise Automation', shortTitle: 'Automation', slug: 'enterprise-automation', desc: 'Streamline critical workflows efficiently.', icon: faCogs },
    { title: 'Cloud Cost Optimization', shortTitle: 'Cloud Cost', slug: 'cloud-cost-optimization', desc: 'Maximize ROI on your infrastructure.', icon: faChartPie },
    { title: 'Data-driven Decision Making', shortTitle: 'Data Decisions', slug: 'data-driven-decision-making', desc: 'Empower your leadership teams.', icon: faDatabase }
  ],
  Insights: [
    { title: 'Tech Blogs', shortTitle: 'Blogs', slug: 'tech-blogs', desc: 'Latest thoughts on technology trends.', icon: faNewspaper },
    { title: 'Case Studies', shortTitle: 'Case Studies', slug: 'case-studies', desc: 'How we solved complex problems.', icon: faBriefcase },
    { title: 'White Papers', shortTitle: 'White Papers', slug: 'white-papers', desc: 'In-depth research and methodologies.', icon: faFileLines },
    { title: 'Webinars and Events', shortTitle: 'Webinars', slug: 'webinars-and-events', desc: 'Join our expert live sessions.', icon: faVideo }
  ],
  Industries: [
    { title: 'Fintech & Banking', shortTitle: 'Fintech', slug: 'fintech-banking', desc: 'Secure financial infrastructure.', icon: faBuildingColumns },
    { title: 'HealthCare & Life Science', shortTitle: 'Healthcare', slug: 'healthcare-life-science', desc: 'HIPAA-compliant medical software.', icon: faHeartPulse },
    { title: 'E-Commerce & Retail', shortTitle: 'E-Commerce', slug: 'ecommerce-retail', desc: 'Scalable shopping experiences.', icon: faCartShopping },
    { title: 'Logistics & SupplyChain', shortTitle: 'Logistics', slug: 'logistics-supply-chain', desc: 'Real-time global tracking systems.', icon: faTruckFast },
    { title: 'Telecom & Media', shortTitle: 'Telecom', slug: 'telecom-media', desc: 'High-bandwidth streaming capabilities.', icon: faTv }
  ],
  Careers: [
    { title: 'Careers Home', shortTitle: 'Home', slug: 'home', desc: 'Explore your future at XOST.', icon: faHouseUser },
    { title: 'Featured Career', shortTitle: 'Featured', slug: 'featured-career', desc: 'Highlighting our top opportunities.', icon: faStar },
    { title: 'How to Apply', shortTitle: 'How to Apply', slug: 'how-to-apply', desc: 'Our seamless hiring process.', icon: faHandshake },
    { title: 'Hiring Path', shortTitle: 'Hiring Path', slug: 'hiring-path', desc: 'Step-by-step interview roadmap.', icon: faMapLocationDot },
    { title: 'Life at Xost', shortTitle: 'Life at Xost', slug: 'life-at-xost', desc: 'Our culture, perks, and values.', icon: faUsers },
    { title: 'Where we work', shortTitle: 'Locations', slug: 'where-we-work', desc: 'Discover our global footprint.', icon: faBuildingColumns },
    { title: 'Offered Jobs', shortTitle: 'Open Jobs', slug: 'offered-jobs', desc: 'Browse all open positions.', icon: faBriefcaseClock },
    { title: 'Internships', shortTitle: 'Internships', slug: 'internships', desc: 'Start your journey with us.', icon: faGraduationCap }
  ],
  About: [
    { title: 'Our History', shortTitle: 'History', slug: 'our-history', desc: 'The timeline of our evolution.', icon: faLandmark },
    { title: 'Centre & Facilities', shortTitle: 'Facilities', slug: 'centre-facilities', desc: 'State-of-the-art infrastructure.', icon: faFlaskVial },
    { title: 'Our Impact', shortTitle: 'Impact', slug: 'our-impact', desc: 'How we change the digital world.', icon: faBullseye },
    { title: 'Missions', shortTitle: 'Missions', slug: 'missions', desc: 'What drives us forward everyday.', icon: faRocket }
  ],
  'Contact Us': [
    { title: 'General Inquiries', shortTitle: 'General', slug: 'general-inquiries', desc: 'Reach out for any questions.', icon: faHouseUser },
    { title: 'Sales & Partnerships', shortTitle: 'Sales', slug: 'sales-partnerships', desc: 'Collaborate with our business team.', icon: faHandshake },
    { title: 'Support & Help', shortTitle: 'Support', slug: 'support-help', desc: 'Technical support for our clients.', icon: faHeadset },
    { title: 'Sponsorships', shortTitle: 'Sponsorships', slug: 'sponsorships', desc: 'Major sponsorships and events.', icon: faStar }
  ]
};
