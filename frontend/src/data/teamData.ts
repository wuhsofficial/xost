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
    name: 'Muhammad Waleed',
    role: 'Co-Founder & CEO',
    initials: 'MW',
    bio: 'A technologist specializing in AI and backend architecture. Passionate about building systems that scale to millions.',
    linkedinUrl: 'https://www.linkedin.com/in/muhammad-waleed01/',
    githubUrl: 'https://github.com/W-N-R',
    portfolioUrl: 'https://muhammadwaleed.site/',
  },
  {
    name: 'Umair Amjad',
    role: 'Co-Founder & CTO',
    initials: 'UA',
    bio: 'Full-stack engineer with a passion for clean, scalable code. Believes every line of code should tell a story.',
    githubUrl: 'https://github.com/UmairAmjad-developer',
    portfolioUrl: 'https://umairamjad-developer.github.io/portfolio/',
  },
  {
    name: 'Azher Bashir',
    role: 'Co-Founder & CDO',
    initials: 'AB',
    bio: 'Product & design lead with deep Figma and UX expertise. Obsessed with crafting experiences users remember.',
    linkedinUrl: 'https://www.linkedin.com/in/azher-bashir-047512268/',
    githubUrl: 'https://github.com/Azher-Bashir',
    portfolioUrl: 'https://azher-bashir.github.io/PORTFOLIO/',
  },
];

export default allTeamMembers;
