export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

const allTeamMembers: TeamMember[] = [
  {
    name: 'Founder 1',
    role: 'Co-Founder & CEO',
    initials: 'F1',
    bio: 'A technologist specializing in AI and backend architecture. Passionate about building systems that scale to millions.',
    linkedinUrl: '#',
    githubUrl: '#',
    portfolioUrl: '#',
  },
  {
    name: 'Founder 2',
    role: 'Co-Founder & CTO',
    initials: 'F2',
    bio: 'Full-stack engineer with a passion for clean, scalable code. Believes every line of code should tell a story.',
    linkedinUrl: '#',
    githubUrl: '#',
    portfolioUrl: '#',
  },
  {
    name: 'Founder 3',
    role: 'Co-Founder & CDO',
    initials: 'F3',
    bio: 'Product & design lead with deep Figma and UX expertise. Obsessed with crafting experiences users remember.',
    linkedinUrl: '#',
    githubUrl: '#',
    portfolioUrl: '#',
  },
];

export default allTeamMembers;
