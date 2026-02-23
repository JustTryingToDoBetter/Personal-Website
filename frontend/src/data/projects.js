export const projects = [
  {
    id: 'football-tracking',
    title: 'Football Tracking System',
    category: 'ML',
    description:
      'Player detection and tracking pipeline using YOLOv8 with robust identity persistence and metrics export.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch'],
    github: 'https://github.com/JustTryingToDoBetter/football-tracking',
    demo: '',
    featured: true,
  },
  {
    id: 'analytics-server',
    title: 'Live Analytics Server',
    category: 'Web',
    description:
      'Low-latency event ingestion and leaderboard APIs optimized for real-time dashboards.',
    stack: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/JustTryingToDoBetter/analytics-server',
    demo: '',
    featured: true,
  },
  {
    id: 'portfolio-ui',
    title: 'Portfolio Frontend',
    category: 'Web',
    description:
      'Production-grade Vue frontend with a minimal design system and reusable UI primitives.',
    stack: ['Vue', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/JustTryingToDoBetter/Personal-Website',
    demo: '',
    featured: true,
  },
  {
    id: 'auth-audit-kit',
    title: 'Auth Audit Toolkit',
    category: 'Security',
    description:
      'Internal tooling for auth flow verification, token checks, and endpoint hardening audits.',
    stack: ['Node.js', 'TypeScript', 'OWASP'],
    github: '',
    demo: '',
    featured: false,
  },
  {
    id: 'recruiting-ops',
    title: 'Recruiting Ops Dashboard',
    category: 'Web',
    description:
      'Pipeline visibility dashboard with clean candidate stages and reporting automation.',
    stack: ['Vue', 'Django', 'PostgreSQL'],
    github: '',
    demo: '',
    featured: false,
  },
  {
    id: 'threat-sim-lab',
    title: 'Threat Simulation Lab',
    category: 'Security',
    description:
      'Sandbox environment for controlled attack simulations and defensive playbook validation.',
    stack: ['Python', 'Docker', 'Linux'],
    github: '',
    demo: '',
    featured: false,
  },
]
