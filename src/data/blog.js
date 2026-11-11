import { projects, culture, team } from './images';

/**
 * Blog / insights — powers the home "Latest insights" section, /blog and /blog/:slug.
 * Body is an array of blocks: { type: 'p' | 'h2' | 'list' | 'quote', text | items }.
 */
export const posts = [
  {
    slug: 'how-to-scope-an-mvp',
    title: 'How to Scope an MVP That Actually Validates Your Idea',
    excerpt: 'A practical framework for deciding what goes into your first release — and what can safely wait.',
    category: 'Product',
    date: '2026-10-02',
    readTime: '6 min read',
    cover: projects[0],
    author: { name: 'Team Member', role: 'Product Strategist', photo: team[0] },
    body: [
      { type: 'p', text: 'Most MVPs fail not because the idea is bad, but because the first release tries to do too much. Scope creep delays launch, burns budget and muddies the signal you get from early users.' },
      { type: 'h2', text: 'Start with the riskiest assumption' },
      { type: 'p', text: 'List every assumption your product depends on, then rank them by risk. Your MVP should exist to test the top one or two — nothing more.' },
      { type: 'list', items: ['Who exactly is the first user?', 'What job are they hiring your product to do?', 'What would make them pay or come back next week?'] },
      { type: 'h2', text: 'Cut features, not quality' },
      { type: 'p', text: 'A small product that feels polished earns more trust than a large one that feels broken. Ship fewer features, but make each one reliable and well designed.' },
      { type: 'quote', text: 'The goal of an MVP is learning, not launching. Launching is just how you start learning.' },
      { type: 'h2', text: 'Define success before you build' },
      { type: 'p', text: 'Agree on two or three metrics up front — activation rate, retention after week one, or conversion to paid. Instrument them from day one so every release teaches you something.' },
    ],
  },
  {
    slug: 'rag-vs-fine-tuning',
    title: 'RAG vs. Fine-Tuning: Choosing the Right Approach for Your AI Product',
    excerpt: 'When to ground a model in your data with retrieval, and when to teach it new behaviour through training.',
    category: 'AI',
    date: '2026-09-18',
    readTime: '8 min read',
    cover: projects[3],
    author: { name: 'Team Member', role: 'AI Engineer', photo: team[1] },
    body: [
      { type: 'p', text: 'Teams building with large language models usually face the same early question: should we retrieve relevant context at query time, or fine-tune a model on our data?' },
      { type: 'h2', text: 'When retrieval wins' },
      { type: 'p', text: 'Retrieval-augmented generation is ideal when knowledge changes often, answers must cite sources, or data access must respect user permissions.' },
      { type: 'list', items: ['Help centers and internal knowledge bases', 'Policy, legal and compliance assistants', 'Product catalogues that change daily'] },
      { type: 'h2', text: 'When fine-tuning wins' },
      { type: 'p', text: 'Fine-tuning shines when you need a consistent tone, a specific output format, or better performance on a narrow, repetitive task.' },
      { type: 'quote', text: 'Retrieval changes what the model knows. Fine-tuning changes how the model behaves.' },
      { type: 'h2', text: 'Often, the answer is both' },
      { type: 'p', text: 'Many production systems combine the two: a lightly tuned model for format and tone, grounded with retrieval for up-to-date facts. Start simple, evaluate rigorously, and add complexity only when the metrics justify it.' },
    ],
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Scale With Your Product Team',
    excerpt: 'How tokens, components and clear ownership keep a growing product consistent and fast to build.',
    category: 'Design',
    date: '2026-09-04',
    readTime: '5 min read',
    cover: projects[2],
    author: { name: 'Team Member', role: 'Head of Design', photo: team[2] },
    body: [
      { type: 'p', text: 'A design system is not a Figma file — it is a shared language between design and engineering. Done well, it makes every new feature faster to build and easier to maintain.' },
      { type: 'h2', text: 'Begin with tokens' },
      { type: 'p', text: 'Colors, typography, spacing and radius should be defined once as tokens and consumed everywhere. Changing your brand palette should be a one-line change.' },
      { type: 'h2', text: 'Build components from real screens' },
      { type: 'p', text: 'Extract components from the product you already have rather than designing an abstract library up front. Real usage reveals the variants you actually need.' },
      { type: 'list', items: ['Document when to use each component', 'Version changes and publish release notes', 'Assign clear owners for review'] },
      { type: 'quote', text: 'Consistency is a feature your users notice even when they cannot name it.' },
    ],
  },
  {
    slug: 'flutter-vs-react-native-2026',
    title: 'Flutter vs. React Native in 2026: A Practical Comparison',
    excerpt: 'Performance, ecosystem, hiring and long-term maintenance — what matters when choosing a cross-platform stack.',
    category: 'Mobile',
    date: '2026-08-21',
    readTime: '7 min read',
    cover: projects[1],
    author: { name: 'Team Member', role: 'Mobile Lead', photo: team[3] },
    body: [
      { type: 'p', text: 'Both frameworks are mature and production-proven. The right choice depends less on benchmarks and more on your team, product and roadmap.' },
      { type: 'h2', text: 'Choose Flutter when' },
      { type: 'list', items: ['Pixel-perfect custom UI is central to your brand', 'You want consistent rendering across platforms', 'Your team is starting fresh without a web codebase'] },
      { type: 'h2', text: 'Choose React Native when' },
      { type: 'list', items: ['You already have React developers and web code to share', 'You rely heavily on native platform components', 'You want access to the broad JavaScript ecosystem'] },
      { type: 'p', text: 'Whichever you choose, invest early in architecture, automated testing and release pipelines. Those decisions matter far more over the life of an app than the framework itself.' },
    ],
  },
  {
    slug: 'remote-delivery-playbook',
    title: 'Our Playbook for Smooth Remote Delivery Across Time Zones',
    excerpt: 'The rituals, tools and habits that keep distributed teams aligned and shipping every week.',
    category: 'Culture',
    date: '2026-08-07',
    readTime: '4 min read',
    cover: culture[1],
    author: { name: 'Team Member', role: 'Head of Delivery', photo: team[4] },
    body: [
      { type: 'p', text: 'Working across six countries taught us that great remote delivery is not about more meetings — it is about clear, written communication and predictable rhythms.' },
      { type: 'h2', text: 'Overlap hours are sacred' },
      { type: 'p', text: 'We protect a daily window of shared hours with every client for standups, decisions and pairing. Everything else happens asynchronously.' },
      { type: 'h2', text: 'Demo every week' },
      { type: 'p', text: 'Weekly demos keep everyone honest. Clients see real progress, give feedback early and never get surprised at the end of a milestone.' },
      { type: 'list', items: ['Written decision logs', 'Shared Slack channels with clients', 'Sprint reports with risks highlighted'] },
    ],
  },
  {
    slug: 'cloud-cost-optimization',
    title: '7 Quick Wins for Reducing Your Cloud Bill',
    excerpt: 'Simple, low-risk changes that typically cut infrastructure costs by 20–40% without hurting performance.',
    category: 'Engineering',
    date: '2026-07-24',
    readTime: '6 min read',
    cover: projects[4],
    author: { name: 'Team Member', role: 'DevOps Engineer', photo: team[5] },
    body: [
      { type: 'p', text: 'Cloud costs tend to grow quietly. A focused review every quarter usually uncovers savings that require very little engineering effort.' },
      { type: 'h2', text: 'The quick wins' },
      { type: 'list', items: ['Right-size over-provisioned instances', 'Use autoscaling for variable workloads', 'Move infrequently accessed data to cheaper storage tiers', 'Commit to savings plans for steady workloads', 'Delete orphaned volumes and snapshots', 'Cache aggressively at the edge', 'Set budgets and anomaly alerts'] },
      { type: 'quote', text: 'The cheapest resource is the one you turned off.' },
      { type: 'p', text: 'Make cost a visible metric in your dashboards, and give teams ownership of their own spend. Awareness alone often drives meaningful savings.' },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
