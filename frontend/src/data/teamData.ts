export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  image: string;
  quote: string;
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
    image: '/assets/founders/waleed.jpg',
    quote: 'Leading the convergence of human creativity and scalable intelligence.',
    linkedinUrl: 'https://www.linkedin.com/in/muhammad-waleed01/',
    githubUrl: 'https://github.com/W-N-R',
    portfolioUrl: 'https://muhammadwaleed.site/',
  },
  {
    name: 'Umair Amjad',
    role: 'Co-Founder & CTO',
    initials: 'UA',
    bio: 'Full-stack engineer with a passion for clean, scalable code. Believes every line of code should tell a story.',
    image: '/assets/founders/umair.jpg',
    quote: 'Writing code that scales is science; architecting systems that endure is art.',
    githubUrl: 'https://github.com/UmairAmjad-developer',
    portfolioUrl: 'https://umairamjad-developer.github.io/portfolio/',
  },
  {
    name: 'Azher Bashir',
    role: 'Co-Founder & CDO',
    initials: 'AB',
    bio: 'Product & design lead with deep Figma and UX expertise. Obsessed with crafting experiences users remember.',
    image: '/assets/founders/azher.jpg',
    quote: 'Design is not how it looks, but how effortlessly it connects with the human mind.',
    linkedinUrl: 'https://www.linkedin.com/in/azher-bashir-047512268/',
    githubUrl: 'https://github.com/Azher-Bashir',
    portfolioUrl: 'https://azher-bashir.github.io/PORTFOLIO/',
  },
];

export default allTeamMembers;

