export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Skills',
    href: '#skills',
  },
  {
    id: 5,
    name: 'Resume',
    href: '#resume',
  },
  {
    id: 6,
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'AdsUp Team',
    position: 'Tech Lead at AdsUp',
    img: 'assets/review1.png',
    review:
      'Aslam is an exceptional full-stack developer who consistently delivers high-quality work. His backend optimization skills improved our API response time by 35%, and his attention to detail in UI design is remarkable. A true professional.',
  },
  {
    id: 2,
    name: 'Web Wizards Client',
    position: 'Startup Founder',
    img: 'assets/review2.png',
    review:
      'Aslam built our entire dApp marketplace from scratch using cutting-edge Web3 technologies. His expertise in Solidity and React helped us launch ahead of schedule. Highly skilled in both frontend and blockchain development.',
  },
  {
    id: 3,
    name: 'Soulverse Team',
    position: 'Product Manager at Soulverse',
    img: 'assets/review3.png',
    review:
      'Aslam\'s contributions to our Web3 platform were invaluable. His smart contract development skills and ability to integrate complex blockchain features into our React UI made our product stand out. Great team player.',
  },
  {
    id: 4,
    name: 'Freelance Client',
    position: 'E-commerce Business Owner',
    img: 'assets/review4.png',
    review:
      'Working with Aslam was seamless. He configured our entire server infrastructure with Nginx and Cloudflare, significantly improving our site performance and security. Delivered under tight deadlines with excellent documentation.',
  },
];

export const myProjects = [
  {
    title: 'B2B Virtual Try-On API',
    desc: 'An AI-powered virtual try-on platform enabling businesses to integrate photorealistic garment visualization into their e-commerce workflows.',
    subdesc:
      'Built with a multi-tenant architecture supporting isolated environments per client. Features AI-based image generation pipelines, Stripe billing integration with usage-based metering, and a scalable REST API handling 10K+ daily requests.',
    href: 'https://github.com/aknankpuria',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'Node.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'AI/ML',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'Stripe',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Multi-Tenant',
        path: '/assets/framer.png',
      },
    ],
    impact: 'AI-based image generation with multi-tenant architecture',
  },
  {
    title: 'AURA — Web3 AI Agent',
    desc: 'A decentralized AI agent platform combining RAG-based memory with blockchain identity, enabling autonomous on-chain interactions and intelligent data retrieval.',
    subdesc:
      'Leverages IPFS for persistent memory storage, smart contract-triggered AI responses via ERC-721 identity tokens, and LangChain-powered RAG pipelines for context-aware conversations. Built as a fully decentralized autonomous agent.',
    href: 'https://github.com/aknankpuria',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      {
        id: 1,
        name: 'Solidity',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'LangChain',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'IPFS',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'ERC-721',
        path: '/assets/framer.png',
      },
    ],
    impact: 'RAG + IPFS memory with smart contract-triggered AI',
  },
  {
    title: 'Financial Dashboard API',
    desc: 'A comprehensive backend system powering real-time financial analytics with role-based access control and enterprise-grade security.',
    subdesc:
      'Features a granular RBAC system supporting multi-level permissions, JWT-based authentication with refresh token rotation, and Zod-powered request validation ensuring type-safe API boundaries across 50+ endpoints.',
    href: 'https://github.com/aknankpuria',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#60f5a1',
      background:
        'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
      border: '0.2px solid rgba(208, 213, 221, 1)',
      boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      {
        id: 1,
        name: 'Node.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'PostgreSQL',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'JWT Auth',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Zod',
        path: '/assets/framer.png',
      },
    ],
    impact: 'RBAC + JWT auth with Zod validation across 50+ endpoints',
  },
];

export const calculateSizes = (isSmall: boolean, isMobile: boolean, isTablet: boolean) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'AdsUp Technology',
    pos: 'Full Stack Developer',
    duration: '2024 - Present',
    title: "Developed and maintained scalable full-stack web applications using Next.js, Node.js, and TypeScript. Improved API response time by 35% through backend optimization and database indexing. Reduced data sync overhead by 40% via intelligent automation. Accelerated deployment cycles by 25% with CI/CD pipeline improvements.",
    icon: '/assets/framer.svg',
    animation: 'victory',
    metrics: [
      { value: '35%', label: 'Faster API Response' },
      { value: '40%', label: 'Less Sync Overhead' },
      { value: '25%', label: 'Faster Deployments' },
    ],
  },
  {
    id: 2,
    name: 'Web Wizards',
    pos: 'Freelance Developer',
    duration: '2023 - 2024',
    title: "Built 5+ full-stack and decentralized applications for clients using React, Next.js, and Node.js. Integrated blockchain functionalities using Solidity, Web3.js, and Rust for dApp projects. Configured servers using Nginx and Cloudflare for production deployments.",
    icon: '/assets/figma.svg',
    animation: 'clapping',
    metrics: [
      { value: '5+', label: 'Projects Delivered' },
      { value: 'Web3', label: 'Integrations' },
    ],
  },
  {
    id: 3,
    name: 'Soulverse',
    pos: 'Junior Web3 Developer',
    duration: '2023 - 2024',
    title: "Supported smart contract development and UI integration for Web3 platforms using React and Solidity. Collaborated with the team to deliver blockchain features and enhance platform functionality.",
    icon: '/assets/notion.svg',
    animation: 'salute',
    metrics: [
      { value: 'Solidity', label: 'Smart Contracts' },
      { value: 'React', label: 'UI Integration' },
    ],
  },
];

export const skills = [
  { name: 'Next.js', category: 'frontend', level: 95, color: '#00E5CC' },
  { name: 'React', category: 'frontend', level: 95, color: '#61DAFB' },
  { name: 'Node.js', category: 'backend', level: 90, color: '#68A063' },
  { name: 'TypeScript', category: 'frontend', level: 90, color: '#3178C6' },
  { name: 'PostgreSQL', category: 'backend', level: 85, color: '#336791' },
  { name: 'Solidity', category: 'web3', level: 80, color: '#7C3AED' },
  { name: 'LangChain', category: 'ai', level: 75, color: '#FF6B35' },
  { name: 'Docker', category: 'devops', level: 80, color: '#2496ED' },
  { name: 'MongoDB', category: 'backend', level: 85, color: '#47A248' },
  { name: 'Tailwind', category: 'frontend', level: 90, color: '#38BDF8' },
  { name: 'Web3.js', category: 'web3', level: 80, color: '#F16822' },
  { name: 'Express', category: 'backend', level: 90, color: '#999999' },
];

export const skillCategories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'web3', label: 'Web3' },
  { id: 'ai', label: 'AI' },
  { id: 'devops', label: 'DevOps' },
];