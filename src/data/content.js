/**
 * Site-wide content. Edit copy here without touching components.
 */
import {
  Smartphone, Server, MonitorSmartphone, Database, Cloud, Sparkles, LayoutTemplate,
  Info, UsersRound, Handshake, Coffee, Briefcase, Newspaper,
} from 'lucide-react';
import * as img from './images.js';

// Detail-page data lives in its own modules; re-exported here for convenience.
export { services, getService, developmentServices, designServices } from './services.js';
export { industries, getIndustry } from './industries.js';
export { hireGroups, hireRoles, getRole } from './hire.js';
export { hireGroups as hireDevelopers } from './hire.js';
export { caseStudies, getCaseStudy } from './caseStudies.js';
export { posts, getPost } from './blog.js';
export { jobs, getJob } from './careers.js';

/**
 * COMPANY INFO — fill these in before launch.
 * Anything left empty ('' or '#') is hidden automatically, so visitors
 * never see fake phone numbers, addresses or dead social links.
 */
export const company = {
  name: 'Velotech',
  tagline: 'Software development & design agency',
  email: 'hello@velotech.example', // ← your real inbox (shown everywhere)
  phone: '', // e.g. '+880 1XXX-XXXXXX' — international format
  whatsapp: '', // e.g. '8801XXXXXXXXX' (digits only) — adds a WhatsApp button
  bookingUrl: '', // e.g. 'https://calendly.com/your-name/30min' — adds "Book a call"
  address: '', // e.g. 'House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh'
  hours: '', // e.g. 'Sun–Thu, 10:00–19:00 (GMT+6)'
  socials: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Dribbble', href: '#', icon: 'dribbble' },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'X (Twitter)', href: '#', icon: 'x' },
  ],
};

/** Socials that actually have a link. */
export const activeSocials = company.socials.filter((s) => s.href && s.href !== '#');
/** tel: link from a human-formatted phone number. */
export const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`;
export const whatsappHref = (msg = 'Hi! I would like to discuss a project.') =>
  company.whatsapp ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}` : '';

/* ─────────────────────────── Company (mega menu) ─────────────────────────── */
/* Leadership team (About page). Fill in `name` and swap the photos in
   src/data/images.js (team). While `name` is empty, the card shows the
   role as its title instead of a placeholder name. */
export const leaders = [
  {
    name: '',
    role: 'Chief Executive Officer',
    focus: 'Sets the vision and partners with every client on strategy and growth.',
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-name'
    photo: img.team[0],
  },
  {
    name: '',
    role: 'Chief Technology Officer',
    focus: 'Owns architecture, engineering quality and the tech behind every build.',
    linkedin: '',
    photo: img.team[1],
  },
  {
    name: '',
    role: 'Head of Design',
    focus: 'Leads UI/UX and product design, from research to polished interfaces.',
    linkedin: '',
    photo: img.team[2],
  },
  {
    name: '',
    role: 'Head of Delivery',
    focus: 'Keeps projects on time and clients in the loop with weekly demos.',
    linkedin: '',
    photo: img.team[3],
  },
];

export const companyLinks = [
  { title: 'About Us', desc: 'Our story, mission and values', icon: Info, href: '/about' },
  { title: 'Our Team', desc: 'Meet the people behind Velotech', icon: UsersRound, href: '/about#team' },
  // Partnership enquiries go straight to the contact form
  { title: 'Partnership', desc: 'Grow together with Velotech', icon: Handshake, href: '/contact' },
  { title: 'Life at Velotech', desc: 'Culture, people and perks', icon: Coffee, href: '/careers#culture' },
  { title: 'Careers', desc: 'Join our growing team', icon: Briefcase, href: '/careers' },
  { title: 'Blog & Insights', desc: 'Articles from our engineers', icon: Newspaper, href: '/blog' },
].filter(Boolean);

/* ─────────────────────────── Stats ─────────────────────────── */
export const stats = [
  { value: 250, suffix: '+', label: 'Projects Delivered' },
  { value: 180, suffix: '+', label: 'Happy Clients' },
  { value: 60, suffix: '+', label: 'Technology Experts' },
  { value: 8, suffix: '+', label: 'Years of Experience', pad: true },
];

/* ─────────────────────────── Tech stack ─────────────────────────── */
// Icons load from the devicon CDN; a lettered badge is shown if an icon fails to load.
const dv = (name, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/${name}/${name}-${variant}.svg`;

export const techStack = [
  { id: 'frontend', label: 'Frontend', icon: MonitorSmartphone, items: [
    { name: 'React', icon: dv('react') },
    { name: 'Next.js', icon: dv('nextjs') },
    { name: 'Vue.js', icon: dv('vuejs') },
    { name: 'Angular', icon: dv('angularjs') },
    { name: 'TypeScript', icon: dv('typescript') },
    { name: 'Tailwind CSS', icon: dv('tailwindcss') },
    { name: 'Svelte', icon: dv('svelte') },
    { name: 'Redux', icon: dv('redux') },
  ] },
  { id: 'backend', label: 'Backend', icon: Server, items: [
    { name: 'Node.js', icon: dv('nodejs') },
    { name: 'Python', icon: dv('python') },
    { name: 'Go', icon: dv('go') },
    { name: 'Java', icon: dv('java') },
    { name: '.NET', icon: dv('dot-net') },
    { name: 'PHP', icon: dv('php') },
    { name: 'Laravel', icon: dv('laravel') },
    { name: 'NestJS', icon: dv('nestjs') },
  ] },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, items: [
    { name: 'Swift', icon: dv('swift') },
    { name: 'Kotlin', icon: dv('kotlin') },
    { name: 'Flutter', icon: dv('flutter') },
    { name: 'React Native', icon: dv('react') },
    { name: 'Android', icon: dv('android') },
    { name: 'iOS', icon: dv('apple') },
    { name: 'Dart', icon: dv('dart') },
    { name: 'Firebase', icon: dv('firebase') },
  ] },
  { id: 'database', label: 'Database', icon: Database, items: [
    { name: 'PostgreSQL', icon: dv('postgresql') },
    { name: 'MySQL', icon: dv('mysql') },
    { name: 'MongoDB', icon: dv('mongodb') },
    { name: 'Redis', icon: dv('redis') },
    { name: 'SQLite', icon: dv('sqlite') },
    { name: 'Cassandra', icon: dv('cassandra') },
    { name: 'Elasticsearch', icon: dv('elasticsearch') },
    { name: 'Oracle', icon: dv('oracle') },
  ] },
  { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud, items: [
    { name: 'AWS', icon: dv('amazonwebservices', 'plain-wordmark') },
    { name: 'Google Cloud', icon: dv('googlecloud') },
    { name: 'Azure', icon: dv('azure') },
    { name: 'Docker', icon: dv('docker') },
    { name: 'Kubernetes', icon: dv('kubernetes') },
    { name: 'Terraform', icon: dv('terraform') },
    { name: 'GitHub Actions', icon: dv('githubactions') },
    { name: 'Nginx', icon: dv('nginx') },
  ] },
  { id: 'cms', label: 'CMS & E-commerce', icon: LayoutTemplate, items: [
    { name: 'WordPress', icon: img.platforms.wordpress },
    { name: 'WooCommerce', icon: img.platforms.woocommerce },
    { name: 'Shopify', icon: img.platforms.shopify },
    { name: 'Wix', icon: img.platforms.wix },
    { name: 'Squarespace', icon: img.platforms.squarespace },
    { name: 'Square Online', icon: img.platforms.square },
    { name: 'Webflow', icon: img.platforms.webflow },
    { name: 'Magento', icon: dv('magento') },
  ] },
  { id: 'ai', label: 'AI & Machine Learning', icon: Sparkles, items: [
    { name: 'TensorFlow', icon: dv('tensorflow') },
    { name: 'PyTorch', icon: dv('pytorch') },
    { name: 'scikit-learn', icon: dv('scikitlearn') },
    { name: 'Pandas', icon: dv('pandas') },
    { name: 'NumPy', icon: dv('numpy') },
    { name: 'Jupyter', icon: dv('jupyter') },
    { name: 'OpenCV', icon: dv('opencv') },
    { name: 'Hugging Face', icon: null },
  ] },
];

/* ─────────────────────────── About ─────────────────────────── */
export const values = [
  { title: 'Craft over shortcuts', desc: 'We sweat the details — clean code, thoughtful UX and products built to last.' },
  { title: 'Radical transparency', desc: 'Clear estimates, weekly demos and open communication at every step.' },
  { title: 'Outcomes first', desc: 'Every sprint is tied to measurable business results, not just delivered tickets.' },
];

export const approach = [
  { step: '01', title: 'Discover', desc: 'Workshops, research and technical audits to define the right problem.' },
  { step: '02', title: 'Design', desc: 'Prototypes and design systems validated with real users.' },
  { step: '03', title: 'Build', desc: 'Agile sprints, automated testing and continuous delivery.' },
  { step: '04', title: 'Scale', desc: 'Monitoring, optimization and long-term product partnership.' },
];

/* ─────────────────────────── Global presence ─────────────────────────── */
// lat / lon are used to position pins on the map.
export const locations = [
  { country: 'USA', city: 'New York', code: 'US', lat: 40.7, lon: -74, role: 'North America HQ', tz: 'America/New_York' },
  { country: 'Canada', city: 'Toronto', code: 'CA', lat: 43.7, lon: -79.4, role: 'Client success', tz: 'America/Toronto' },
  { country: 'UK', city: 'London', code: 'GB', lat: 51.5, lon: -0.1, role: 'EMEA office', tz: 'Europe/London' },
  { country: 'Germany', city: 'Berlin', code: 'DE', lat: 52.5, lon: 13.4, role: 'Engineering hub', tz: 'Europe/Berlin' },
  { country: 'Bangladesh', city: 'Dhaka', code: 'BD', lat: 23.8, lon: 90.4, role: 'Delivery center', tz: 'Asia/Dhaka' },
  { country: 'Australia', city: 'Sydney', code: 'AU', lat: -33.9, lon: 151.2, role: 'APAC office', tz: 'Australia/Sydney' },
];

/* ─────────────────────────── Testimonials (SAMPLE) ─────────────────────────── */
// Sample testimonials are HIDDEN on the live site (sample: true).
// Add real, approved client quotes (and delete `sample: true`) to show the section.
export const testimonials = [
  {
    quote: 'Velotech felt like an extension of our own team. They challenged our assumptions, shipped every sprint on time and the product launched two weeks ahead of schedule.',
    name: 'Client Name',
    role: 'Chief Product Officer',
    company: 'Sample Company A',
    photo: img.testimonialPhotos[0],
    rating: 5,
    sample: true,
  },
  {
    quote: 'The design quality and engineering rigor were outstanding. Our app ratings jumped and our support tickets dropped within the first month after release.',
    name: 'Client Name',
    role: 'Founder & CEO',
    company: 'Sample Company B',
    photo: img.testimonialPhotos[1],
    rating: 5,
    sample: true,
  },
  {
    quote: 'Transparent, proactive and genuinely invested in our success. Velotech helped us modernize a legacy platform without a single minute of downtime.',
    name: 'Client Name',
    role: 'VP of Engineering',
    company: 'Sample Company C',
    photo: img.testimonialPhotos[2],
    rating: 5,
    sample: true,
  },
  {
    quote: 'Their AI team turned a rough idea into a production assistant that now handles 60% of our customer queries. Incredible partnership.',
    name: 'Client Name',
    role: 'Head of Operations',
    company: 'Sample Company D',
    photo: img.testimonialPhotos[3],
    rating: 5,
    sample: true,
  },
];

/* ─────────────────────────── Partners ─────────────────────────── */
// Placeholder logos — hidden until you add real partner/client logos (remove `sample: true`).
export const partners = img.logos.map((src, i) => ({ name: `Partner ${i + 1}`, logo: src, sample: true }));
export const realPartners = partners.filter((p) => !p.sample);

/* ─────────────────────────── FAQ ─────────────────────────── */
export const faqs = [
  {
    q: 'How long does it take to build a software product?',
    a: 'Timelines depend on scope. A focused MVP typically takes 8–12 weeks, while larger platforms run 4–9 months. After discovery, we provide a detailed roadmap with milestones so you always know what ships when.',
  },
  {
    q: 'How much does a project cost?',
    a: 'Every project is estimated individually based on features, integrations and team size. We offer fixed-price engagements for well-defined scopes and flexible time-and-materials or dedicated-team models for evolving products.',
  },
  {
    q: 'Which technologies do you work with?',
    a: 'We work across modern stacks — React, Next.js, Node.js, Python, Go, Flutter, Swift, Kotlin, AWS, GCP, Azure and leading AI/ML frameworks — plus CMS platforms like WordPress, Shopify, Wix, Squarespace and Square Online. We recommend technology based on your goals, not our preferences.',
  },
  {
    q: 'Do you build on WordPress, Shopify, Wix, Squarespace or Square?',
    a: 'Yes. We design and develop custom themes, plugins and stores on all major CMS platforms, migrate sites between them without losing SEO, and offer monthly care plans for updates, security and content support.',
  },
  {
    q: 'How do you communicate during a project?',
    a: 'You get a dedicated project manager, a shared Slack channel, weekly demos and transparent sprint reports. We overlap working hours with your time zone for real-time collaboration.',
  },
  {
    q: 'Do you provide maintenance after launch?',
    a: 'Yes. We offer flexible maintenance plans covering monitoring, security updates, performance tuning and new feature development so your product keeps improving after launch.',
  },
  {
    q: 'What kind of support do you offer?',
    a: 'Our support plans include SLA-backed response times, incident management and 24/7 monitoring options for business-critical applications.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a free consultation. We will discuss your goals, recommend an approach and share a proposal within a few business days — usually followed by a short paid discovery phase.',
  },
];

/* ─────────────────────────── Navigation ─────────────────────────── */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: 'services' },
  { label: 'Industries', href: '/industries', mega: 'industries' },
  // Hidden from the navbar for now — the /hire-developers pages still exist.
  // Uncomment to bring the menu back.
  // { label: 'Hire Developers', href: '/hire-developers', mega: 'hire' },
  { label: 'Company', href: '/about', mega: 'company' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact Us', href: '/contact' },
];
