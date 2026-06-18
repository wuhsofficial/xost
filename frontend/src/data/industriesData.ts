import {
  faCartShopping, faGraduationCap, faHeartPulse, faBuilding,
  faLandmark, faSeedling, faTruck, faFilm
} from '@fortawesome/free-solid-svg-icons';

const allIndustries = [
  {
    title: 'E-Commerce & Retail',
    description: 'End-to-end digital commerce solutions — from storefront design to payment integration and conversion optimization.',
    icon: faCartShopping,
    gradientStart: '#00D4FF',
    gradientEnd: '#00FFB3',
  },
  {
    title: 'Education & E-Learning',
    description: 'LMS platforms, virtual classrooms, and educational apps that make learning accessible and engaging.',
    icon: faGraduationCap,
    gradientStart: '#667EEA',
    gradientEnd: '#764BA2',
  },
  {
    title: 'Healthcare & MedTech',
    description: 'HIPAA-aware health platforms, telemedicine apps, and patient management systems built with care.',
    icon: faHeartPulse,
    gradientStart: '#FF6B6B',
    gradientEnd: '#EE5A24',
  },
  {
    title: 'Real Estate & PropTech',
    description: 'Property listing platforms, virtual tours, and CRM systems that modernize real estate operations.',
    icon: faBuilding,
    gradientStart: '#11998E',
    gradientEnd: '#38EF7D',
  },
  {
    title: 'Fintech & Banking',
    description: 'Secure financial applications, payment gateways, and fintech solutions built for trust and compliance.',
    icon: faLandmark,
    gradientStart: '#4FACFE',
    gradientEnd: '#00F2FE',
  },
  {
    title: 'Startups & SMEs',
    description: 'MVP development, growth hacking, and full digital presence for startups ready to scale.',
    icon: faSeedling,
    gradientStart: '#00FFB3',
    gradientEnd: '#0BA360',
  },
  {
    title: 'Logistics & Supply Chain',
    description: 'Route optimization, fleet management, and supply chain visibility platforms that deliver efficiency.',
    icon: faTruck,
    gradientStart: '#FFB800',
    gradientEnd: '#FF8C00',
  },
  {
    title: 'Media & Entertainment',
    description: 'Streaming platforms, content management systems, and media apps designed for engagement.',
    icon: faFilm,
    gradientStart: '#F093FB',
    gradientEnd: '#F5576C',
  },
];

export default allIndustries;
