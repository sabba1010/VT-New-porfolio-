import { projects } from './images.js';
import { site } from './site.js';
import { pickImage } from './aiImages.js';

/**
 * Case studies — replace with your real projects (see site.proof.sampleWork).
 * Powers the home showcase, /case-studies and /case-studies/:slug.
 */
const allCaseStudies = [
  {
    slug: 'pulsecare-telehealth',
    name: 'Pulsecare Telehealth',
    industry: 'Healthcare',
    industrySlug: 'healthcare',
    desc: 'A HIPAA-aware telehealth platform connecting patients with clinicians through video visits, e-prescriptions and smart scheduling.',
    image: projects[0],
    gallery: [projects[0], projects[3], projects[1]],
    tags: ['Web App', 'React', 'Node.js'],
    metric: { value: '3.2×', label: 'faster appointment booking' },
    client: 'Sample healthcare provider',
    duration: '7 months',
    team: '9 specialists',
    services: ['Product Design', 'Web Development', 'Cloud'],
    challenge: 'Patients waited days for appointments, and clinicians juggled three disconnected tools for scheduling, video and prescriptions.',
    solution: 'We designed a unified platform with self-service booking, secure video visits and integrated e-prescriptions, connected to the existing EHR through FHIR APIs.',
    results: [
      { value: '3.2×', label: 'faster appointment booking' },
      { value: '41%', label: 'fewer no-shows' },
      { value: '4.8/5', label: 'average patient rating' },
    ],
  },
  {
    slug: 'coinvault-wallet',
    name: 'Coinvault Wallet',
    industry: 'Fintech',
    industrySlug: 'fintech',
    desc: 'A multi-currency mobile wallet with instant transfers, biometric security and real-time spending insights.',
    image: projects[1],
    gallery: [projects[1], projects[4], projects[0]],
    tags: ['Mobile', 'Flutter', 'AWS'],
    metric: { value: '500K+', label: 'monthly transactions' },
    client: 'Sample fintech startup',
    duration: '6 months',
    team: '8 specialists',
    services: ['Mobile Apps', 'UI/UX Design', 'DevOps'],
    challenge: 'The client needed a secure, regulator-ready wallet that could launch in two markets at once with a small internal team.',
    solution: 'A Flutter app with biometric auth, a microservices backend on AWS, automated KYC onboarding and real-time spending analytics.',
    results: [
      { value: '500K+', label: 'monthly transactions' },
      { value: '99.98%', label: 'uptime since launch' },
      { value: '12 wks', label: 'to first release' },
    ],
  },
  {
    // real client project — no invented numbers; add `metric` / `results` once the client shares them
    slug: 'kayil-silks',
    name: 'Kayil Silks',
    industry: 'E-commerce',
    industrySlug: 'ecommerce',
    desc: 'A Shopify store for a South Indian handloom saree boutique — bridal silk collections, easy browsing and checkout on every device.',
    image: projects[2],
    imageRatio: '3 / 2',
    liveUrl: 'https://kayilsilks.com/',
    tags: ['Shopify', 'E-commerce', 'Responsive'],
    client: 'Kayil Silks',
    services: ['E-commerce', 'UI/UX Design', 'Web Development'],
    challenge: 'Kayil Silks sells handloom sarees crafted in South India. They needed an online boutique that shows the richness of every saree and makes buying simple — whether customers shop on a desktop, tablet or phone.',
    solution: 'We designed and built a Shopify store with a maroon-and-gold look that matches the brand, bridal silk saree banners, a category strip for every saree type, filterable product listings and a mobile-first product grid and checkout.',
  },
  {
    slug: 'routewise-logistics',
    name: 'Routewise Logistics',
    industry: 'Logistics',
    industrySlug: 'logistics',
    desc: 'A fleet operations dashboard with live tracking, route optimization and predictive maintenance alerts.',
    image: projects[3],
    gallery: [projects[3], projects[0], projects[2]],
    tags: ['SaaS', 'Python', 'GCP'],
    metric: { value: '22%', label: 'lower fuel costs' },
    client: 'Sample logistics company',
    duration: '8 months',
    team: '10 specialists',
    services: ['Custom Software', 'AI Development', 'Cloud'],
    challenge: 'Dispatchers planned routes manually with spreadsheets and had no real-time view of a 600-vehicle fleet.',
    solution: 'A real-time operations platform with GPS tracking, an optimization engine for daily routes and ML models that predict maintenance needs.',
    results: [
      { value: '22%', label: 'lower fuel costs' },
      { value: '35%', label: 'faster dispatch planning' },
      { value: '600+', label: 'vehicles tracked live' },
    ],
  },
  {
    // real project — no invented numbers; add `metric` / `results` once the client shares them
    slug: 'smartlearn-lms',
    name: 'SmartLearn LMS',
    industry: 'Education',
    industrySlug: 'education',
    desc: 'A custom learning management system with SCORM course uploads, live learner progress tracking and course sales for children and adult learners.',
    image: projects[4], // replaced by public/images/ai/cases/smartlearn-lms.webp
    imageRatio: '3 / 2',
    liveUrl: 'https://lms-frontend-gray-ten.vercel.app/',
    tags: ['Custom LMS', 'SCORM 1.2', 'E-learning', 'Responsive'],
    client: 'SmartLearn',
    services: ['Custom Software', 'Web Development', 'UI/UX Design'],
    challenge:
      'SmartLearn wanted one place to sell and deliver online courses to two very different audiences — children and working adults — and to companies training their teams. Their course content was built as SCORM packages, which off-the-shelf storefronts can’t play or track, and admins needed to publish new courses without a developer.',
    solution:
      'We built a custom LMS website from the ground up. Admins upload SCORM packages straight from the dashboard and the course goes live, learners play them in the browser while a progress bar tracks how far they’ve come, and every course can be found by search, category and price, added to a cart and bought. Students and companies each get their own sign-up, so a business can enrol and manage its whole team.',
    features: [
      { title: 'SCORM file upload', desc: 'Admins upload SCORM 1.2 packages (.zip) from the dashboard — no developer needed to publish a course.' },
      { title: 'Progress tracking', desc: 'Each learner’s progress through a SCORM course is tracked and shown as a live progress bar.' },
      { title: 'Course catalog & search', desc: 'Browse every course with search plus category (Children / Adult) and price filters.' },
      { title: 'Cart & checkout', desc: 'Learners add courses to a cart and buy them online.' },
      { title: 'Student & company accounts', desc: 'Separate sign-ups for individual students and for companies managing a team of learners.' },
      { title: 'Learner dashboard', desc: 'Secure login gives every learner one place for their courses and progress.' },
    ],
  },
  {
    slug: 'nestfinder-homes',
    name: 'Nestfinder Homes',
    industry: 'Real Estate',
    industrySlug: 'real-estate',
    desc: 'A property marketplace with map search, virtual tours and an agent CRM that closes deals faster.',
    image: projects[5],
    gallery: [projects[5], projects[2], projects[0]],
    tags: ['Marketplace', 'Vue.js', 'Laravel'],
    metric: { value: '2.4×', label: 'more qualified leads' },
    client: 'Sample real estate group',
    duration: '6 months',
    team: '8 specialists',
    services: ['Web Development', 'UI/UX Design', 'Custom Software'],
    challenge: 'Listings were spread across multiple portals and agents lost leads in shared inboxes.',
    solution: 'A unified marketplace with map-based search, 3D virtual tours and a built-in CRM that routes leads to the right agent instantly.',
    results: [
      { value: '2.4×', label: 'more qualified leads' },
      { value: '18 days', label: 'shorter time to close' },
      { value: '30K', label: 'listings managed' },
    ],
  },
];

// gallery = project cover + illustrations of the services used on it
const serviceArt = {
  'Product Design': 'product-design-development', 'Web Development': 'web-development', 'Cloud': 'custom-software-development',
  'Mobile Apps': 'mobile-app-development', 'UI/UX Design': 'ui-ux-design', 'DevOps': 'custom-software-development',
  'E-commerce': 'ecommerce-development', 'AI Development': 'ai-development', 'Custom Software': 'custom-software-development',
};
const withGallery = (c) => {
  const image = pickImage(`cases/${c.slug}`, c.image);
  return {
    ...c,
    image,
    gallery: [image, ...new Set((c.services ?? []).map((s) => serviceArt[s]).filter(Boolean).map((slug) => `/images/services/${slug}.svg`))].slice(0, 3),
  };
};

/* While site.proof.sampleWork is on these are example projects: the invented
   client names and result numbers are stripped so they never appear on the
   site (or in the chatbot). Turn sampleWork off once the projects are real. */
export const caseStudies = (site.proof?.sampleWork
  ? allCaseStudies.map(({ metric, results, client, duration, team, ...c }) => ({ ...c, sample: true }))
  : allCaseStudies
).map(withGallery);

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
