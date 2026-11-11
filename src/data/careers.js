/**
 * Open positions (placeholders) — powers /careers and /careers/:slug.
 */
export const jobs = [
  {
    slug: 'senior-react-engineer',
    title: 'Senior React Engineer',
    team: 'Engineering',
    location: 'Remote / Dhaka',
    type: 'Full-time',
    summary: 'Build polished, high-performance web applications for global clients using React, Next.js and TypeScript.',
    responsibilities: ['Lead frontend architecture on client projects', 'Ship accessible, well-tested features', 'Mentor mid-level engineers', 'Collaborate closely with designers and product owners'],
    requirements: ['5+ years of professional frontend experience', 'Deep knowledge of React and TypeScript', 'Experience with testing and CI/CD', 'Strong written English communication'],
  },
  {
    slug: 'flutter-developer',
    title: 'Flutter Developer',
    team: 'Mobile',
    location: 'Remote',
    type: 'Full-time',
    summary: 'Create beautiful cross-platform mobile apps used by thousands of people every day.',
    responsibilities: ['Develop and maintain Flutter apps', 'Integrate REST and GraphQL APIs', 'Optimize app performance', 'Manage releases to app stores'],
    requirements: ['3+ years with Flutter and Dart', 'State management experience (Bloc/Riverpod)', 'Published apps on App Store or Play Store', 'Good understanding of mobile UX'],
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    team: 'AI',
    location: 'Remote / Berlin',
    type: 'Full-time',
    summary: 'Design and deploy LLM-powered features and machine-learning systems for real business problems.',
    responsibilities: ['Build RAG pipelines and AI assistants', 'Design evaluation frameworks', 'Deploy and monitor models in production', 'Advise clients on AI strategy'],
    requirements: ['Strong Python skills', 'Hands-on experience with LLM APIs and vector databases', 'Solid ML fundamentals', 'Experience shipping to production'],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer (UI/UX)',
    team: 'Design',
    location: 'Remote / London',
    type: 'Full-time',
    summary: 'Shape end-to-end product experiences, from research and flows to polished interfaces and design systems.',
    responsibilities: ['Run user research and usability tests', 'Design flows, wireframes and high-fidelity UI', 'Contribute to design systems', 'Present work to clients'],
    requirements: ['4+ years of product design experience', 'Excellent Figma skills', 'A portfolio showing process and outcomes', 'Comfort working with engineers'],
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Contract',
    summary: 'Own cloud infrastructure, CI/CD and reliability for a portfolio of client products.',
    responsibilities: ['Manage AWS and GCP environments', 'Build CI/CD pipelines', 'Implement monitoring and alerting', 'Improve security and cost efficiency'],
    requirements: ['3+ years in DevOps or SRE roles', 'Terraform and Kubernetes experience', 'Scripting in Bash or Python', 'On-call experience'],
  },
];

export const getJob = (slug) => jobs.find((j) => j.slug === slug);

export const perks = [
  { title: 'Remote-friendly', desc: 'Work from home or one of our hubs.' },
  { title: 'Learning budget', desc: 'Annual budget for courses, books and conferences.' },
  { title: 'Health coverage', desc: 'Medical insurance for you and your family.' },
  { title: 'Flexible hours', desc: 'Core overlap hours, the rest is up to you.' },
  { title: 'Latest gear', desc: 'A modern laptop and setup allowance.' },
  { title: 'Team retreats', desc: 'Yearly meetups to connect in person.' },
];
