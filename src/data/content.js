/**
 * Site-wide content. Edit copy here without touching components.
 */
import {
  Smartphone, Server, MonitorSmartphone, Database, Cloud, Sparkles, LayoutTemplate,
  Info, UsersRound, Handshake, Coffee, Briefcase, Newspaper,
} from 'lucide-react';
import * as img from './images';

// Detail-page data lives in its own modules; re-exported here for convenience.
export { services, getService } from './services';
export { industries, getIndustry } from './industries';
export { hireGroups, hireRoles, getRole } from './hire';
export { hireGroups as hireDevelopers } from './hire';
export { caseStudies, getCaseStudy } from './caseStudies';
export { posts, getPost } from './blog';
export { jobs, getJob } from './careers';

export const company = {
  name: 'Velotech',
  tagline: 'Digital engineering & software development agency',
  email: 'hello@velotech.example',
  phone: '+1 (555) 010-2040',
  address: '100 Placeholder Avenue, Suite 400, New York, NY',
  socials: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'X (Twitter)', href: '#', icon: 'x' },
    { label: 'Dribbble', href: '#', icon: 'dribbble' },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
  ],
};

/* ─────────────────────────── Company (mega menu) ─────────────────────────── */
export const companyLinks = [
  { title: 'About Us', desc: 'Our story, mission and values', icon: Info, href: '/about' },
  { title: 'Our Team', desc: 'Meet the people behind Velotech', icon: UsersRound, href: '/about#team' },
  { title: 'Partnership', desc: 'Grow together with Velotech', icon: Handshake, href: '/about#partners' },
  { title: 'Life at Velotech', desc: 'Culture, people and perks', icon: Coffee, href: '/careers#culture' },
  { title: 'Careers', desc: 'Join our growing team', icon: Briefcase, href: '/careers' },
  { title: 'Blog & Insights', desc: 'Articles from our engineers', icon: Newspaper, href: '/blog' },
];

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
  { country: 'USA', city: 'New York', code: 'US', lat: 40.7, lon: -74, role: 'North America HQ' },
  { country: 'Canada', city: 'Toronto', code: 'CA', lat: 43.7, lon: -79.4, role: 'Client success' },
  { country: 'UK', city: 'London', code: 'GB', lat: 51.5, lon: -0.1, role: 'EMEA office' },
  { country: 'Germany', city: 'Berlin', code: 'DE', lat: 52.5, lon: 13.4, role: 'Engineering hub' },
  { country: 'Bangladesh', city: 'Dhaka', code: 'BD', lat: 23.8, lon: 90.4, role: 'Delivery center' },
  { country: 'Australia', city: 'Sydney', code: 'AU', lat: -33.9, lon: 151.2, role: 'APAC office' },
];

/* ─────────────────────────── Testimonials (SAMPLE) ─────────────────────────── */
// These are sample placeholder testimonials. Replace with real, approved client quotes.
export const testimonials = [
  {
    quote: 'Velotech felt like an extension of our own team. They challenged our assumptions, shipped every sprint on time and the product launched two weeks ahead of schedule.',
    name: 'Client Name',
    role: 'Chief Product Officer',
    company: 'Sample Company A',
    photo: img.testimonialPhotos[0],
    rating: 5,
  },
  {
    quote: 'The design quality and engineering rigor were outstanding. Our app ratings jumped and our support tickets dropped within the first month after release.',
    name: 'Client Name',
    role: 'Founder & CEO',
    company: 'Sample Company B',
    photo: img.testimonialPhotos[1],
    rating: 5,
  },
  {
    quote: 'Transparent, proactive and genuinely invested in our success. Velotech helped us modernize a legacy platform without a single minute of downtime.',
    name: 'Client Name',
    role: 'VP of Engineering',
    company: 'Sample Company C',
    photo: img.testimonialPhotos[2],
    rating: 5,
  },
  {
    quote: 'Their AI team turned a rough idea into a production assistant that now handles 60% of our customer queries. Incredible partnership.',
    name: 'Client Name',
    role: 'Head of Operations',
    company: 'Sample Company D',
    photo: img.testimonialPhotos[3],
    rating: 5,
  },
];

/* ─────────────────────────── Partners ─────────────────────────── */
export const partners = img.logos.map((src, i) => ({ name: `Partner ${i + 1}`, logo: src }));

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
  { label: 'Hire Developers', href: '/hire-developers', mega: 'hire' },
  { label: 'Company', href: '/about', mega: 'company' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact Us', href: '/contact' },
];
