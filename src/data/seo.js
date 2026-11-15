/**
 * SEO copy — search-optimised titles and meta descriptions.
 * Titles: keep under ~50 characters (" | Velotech" is added → ~60 total),
 * lead with the phrase people actually search for.
 * Descriptions: ~140–160 characters, say what the page offers + a reason to click.
 * Anything not listed here falls back to the page's normal title/description.
 */

/** Static pages */
export const pageSeo = {
  '/': {
    // title: null → uses site.defaultTitle
    description:
      'Velotech is an AI and software development company. We build AI automation, add AI to your tools and develop custom web and mobile apps. Book a free AI audit.',
  },
  '/services': {
    title: 'AI & Software Development Services',
    description:
      'AI automation, AI integration and custom AI development, plus web, mobile, e-commerce and custom software development — one accountable team from idea to launch.',
  },
  '/case-studies': {
    title: 'Case Studies: AI & Software Projects',
    description:
      'See how Velotech designs and builds AI-powered and custom software products across healthcare, fintech, education, e-commerce, logistics and real estate.',
  },
  '/about': {
    title: 'About Velotech — AI & Software Team',
    description:
      'Meet Velotech: engineers, AI specialists and designers helping businesses automate work, add AI to their tools and build software that grows with them.',
  },
  '/careers': {
    title: 'Careers — Remote Engineering, AI & Design Jobs',
    description:
      'Join Velotech and build real AI and software products for global clients. Remote-friendly engineering, AI, design and DevOps roles with a learning budget.',
  },
  '/blog': {
    title: 'Blog: AI, Software & Product Insights',
    description:
      'Practical articles on AI automation, LLMs, product strategy, design systems, mobile development and cloud engineering from the Velotech team.',
  },
  '/contact': {
    title: 'Contact Us — Book a Free AI Audit',
    description:
      'Tell us about your project or book a free 30-minute AI audit. Velotech replies within one business day with next steps, a rough timeline and cost.',
  },
};

/** Service pages, by slug */
export const serviceSeo = {
  'ai-automation': {
    title: 'AI Automation Services & AI Agents for Business',
    description:
      'Automate repetitive work with AI agents and workflows that connect your CRM, email and tools — lead follow-up, support replies and invoices, running 24/7.',
  },
  'ai-integration': {
    title: 'AI Integration Services for CRM, ERP & Apps',
    description:
      'Add AI to the software you already use — CRM, ERP, help desk, website and apps — with secure integrations, AI assistants and smart search. No rebuild needed.',
  },
  'ai-business-growth': {
    title: 'AI for Business Growth: Leads, Sales & Marketing',
    description:
      'Use AI to find and win more customers — lead scoring, personalised marketing, sales insights and forecasting built on your own data. Start with a free audit.',
  },
  'ai-development': {
    title: 'Custom AI Development: LLM Apps, RAG & ML',
    description:
      'Custom AI development for real business problems — LLM assistants, RAG search over your documents, AI agents and machine-learning models built for production.',
  },
  'web-development': {
    title: 'Custom Web Development & Web App Services',
    description:
      'Custom web development — fast, SEO-ready websites and scalable web apps built with React, Next.js and Node.js, with automated testing and ongoing support.',
  },
  'mobile-app-development': {
    title: 'Mobile App Development Services: iOS & Android',
    description:
      'Native and cross-platform mobile app development for iOS and Android — polished UX, secure backends, analytics and app store launch, all from one team.',
  },
  'custom-software-development': {
    title: 'Custom Software Development Services',
    description:
      'Custom software built around how your business works — internal tools, SaaS platforms, dashboards and integrations, delivered in sprints with full code ownership.',
  },
  'ecommerce-development': {
    title: 'E-commerce Development: Shopify & Headless Stores',
    description:
      'E-commerce development for brands that want to sell more — custom Shopify and headless storefronts, marketplaces, fast checkout and AI product recommendations.',
  },
  'product-design-development': {
    title: 'Product Design & MVP Development Services',
    description:
      'Turn an idea into a market-ready digital product — discovery workshops, UX design, MVP development and launch, with one team from first sketch to scale.',
  },
  'cms-development': {
    title: 'CMS Development: WordPress, Shopify & Webflow',
    description:
      'CMS development on WordPress, Shopify, Wix, Squarespace and Webflow — custom themes, plugins, migrations and care plans so your team can update content easily.',
  },
  'software-outsourcing': {
    title: 'Software Outsourcing & Dedicated Dev Teams',
    description:
      'Extend your team with pre-vetted engineers, designers and QA — dedicated teams or staff augmentation that work in your time zone, with full IP ownership.',
  },
  'ui-ux-design': {
    title: 'UI/UX Design Services for Web & Mobile Apps',
    description:
      'UI/UX design for web and mobile apps — user research, wireframes, clickable prototypes and design systems that make your product easy to use and ready to build.',
  },
};

/** Blog posts, by slug (only where the article title is too long for search results) */
export const postSeo = {
  'how-to-scope-an-mvp': { title: 'How to Scope an MVP That Validates Your Idea' },
  'rag-vs-fine-tuning': { title: 'RAG vs Fine-Tuning: Which Is Right for Your AI?' },
  'flutter-vs-react-native-2026': { title: 'Flutter vs React Native in 2026: Which to Choose?' },
  'remote-delivery-playbook': { title: 'Remote Software Delivery Across Time Zones' },
};

/** Topics the company wants to be known for — used in Organization structured data. */
export const expertise = [
  'AI automation',
  'AI agents',
  'AI integration',
  'Large language models',
  'Retrieval-augmented generation',
  'Custom software development',
  'Web development',
  'Mobile app development',
  'E-commerce development',
  'UI/UX design',
];
