import {
  HeartPulse, Landmark, GraduationCap, Building2, ShoppingBag, Truck, Plane, Clapperboard, PiggyBank, Store,
} from 'lucide-react';
import { industries as img } from './images.js';

/** Industries — powers the home section, mega menu, /industries and /industries/:slug. */
export const industries = [
  {
    slug: 'healthcare', name: 'Healthcare', icon: HeartPulse, image: img.healthcare,
    desc: 'HIPAA-aware telehealth platforms, patient portals and clinical workflow tools that improve care outcomes.',
    points: ['Telemedicine apps', 'EHR integrations', 'Patient engagement'],
    challenges: ['Strict privacy and compliance requirements', 'Fragmented legacy clinical systems', 'Low patient engagement between visits'],
    solutions: ['Telehealth & virtual care platforms', 'Patient portals and mobile apps', 'EHR / HL7 / FHIR integrations', 'Remote patient monitoring', 'Clinical workflow automation', 'Healthcare analytics dashboards'],
  },
  {
    slug: 'fintech', name: 'Fintech', icon: Landmark, image: img.fintech,
    desc: 'Secure payment systems, digital wallets and lending platforms built for compliance and scale.',
    points: ['Digital wallets', 'Payment gateways', 'KYC & compliance'],
    challenges: ['Regulatory compliance across markets', 'Fraud and security threats', 'Real-time, high-volume transactions'],
    solutions: ['Digital wallets & neobanking', 'Payment gateway integrations', 'Lending & BNPL platforms', 'KYC / AML onboarding', 'Fraud detection with ML', 'Open banking APIs'],
  },
  {
    slug: 'education', name: 'Education', icon: GraduationCap, image: img.education,
    desc: 'Learning management systems and interactive edtech experiences for schools and enterprises.',
    points: ['LMS platforms', 'Live classrooms', 'Assessment tools'],
    challenges: ['Keeping learners engaged online', 'Scaling live classes reliably', 'Measuring learning outcomes'],
    solutions: ['Learning management systems', 'Live virtual classrooms', 'Gamified learning apps', 'Assessment & proctoring tools', 'AI tutoring assistants', 'Corporate training portals'],
  },
  {
    slug: 'real-estate', name: 'Real Estate', icon: Building2, image: img['real-estate'],
    desc: 'Property marketplaces, CRM tools and virtual tour experiences for modern real-estate brands.',
    points: ['Listing portals', 'Agent CRMs', 'Virtual tours'],
    challenges: ['Disconnected listing and CRM data', 'Slow, paper-heavy transactions', 'Standing out in crowded markets'],
    solutions: ['Property listing marketplaces', 'Agent & broker CRMs', 'Virtual tours & 3D walkthroughs', 'Property management software', 'Digital document signing', 'Market analytics dashboards'],
  },
  {
    slug: 'ecommerce', name: 'E-commerce', icon: ShoppingBag, image: img.ecommerce,
    desc: 'Headless storefronts, marketplaces and personalization engines that grow revenue.',
    points: ['Headless commerce', 'Marketplaces', 'Personalization'],
    challenges: ['Cart abandonment and low conversion', 'Slow storefront performance', 'Inventory sync across channels'],
    solutions: ['Headless storefronts', 'Multi-vendor marketplaces', 'Personalized recommendations', 'Checkout optimization', 'Order & inventory management', 'Loyalty and subscriptions'],
  },
  {
    slug: 'logistics', name: 'Logistics', icon: Truck, image: img.logistics,
    desc: 'Fleet tracking, warehouse management and route optimization for faster deliveries.',
    points: ['Fleet tracking', 'WMS solutions', 'Route optimization'],
    challenges: ['Limited real-time visibility', 'Rising fuel and delivery costs', 'Manual warehouse processes'],
    solutions: ['Fleet & shipment tracking', 'Warehouse management systems', 'Route optimization engines', 'Driver mobile apps', 'Predictive maintenance', 'Supply chain analytics'],
  },
  {
    slug: 'travel-hospitality', name: 'Travel & Hospitality', icon: Plane, image: img.travel,
    desc: 'Booking engines, guest apps and channel managers that delight travellers end to end.',
    points: ['Booking engines', 'Guest experience apps', 'Channel management'],
    challenges: ['Dependence on third-party booking channels', 'Inconsistent guest experiences', 'Dynamic pricing complexity'],
    solutions: ['Direct booking engines', 'Guest experience apps', 'Channel managers', 'Dynamic pricing tools', 'Itinerary & trip planners', 'Loyalty programs'],
  },
  {
    slug: 'media-entertainment', name: 'Media & Entertainment', icon: Clapperboard, image: img.media,
    desc: 'Streaming platforms, content management and audience engagement products.',
    points: ['OTT streaming', 'Content platforms', 'Creator tools'],
    challenges: ['Delivering video at scale', 'Monetizing audiences', 'Content discovery and retention'],
    solutions: ['OTT & video streaming apps', 'Content management systems', 'Subscription & paywall systems', 'Creator and community tools', 'Recommendation engines', 'Audience analytics'],
  },
  {
    slug: 'finance', name: 'Finance', icon: PiggyBank, image: img.finance,
    desc: 'Wealth management dashboards, analytics and core banking modernization.',
    points: ['Wealth dashboards', 'Risk analytics', 'Core modernization'],
    challenges: ['Ageing core systems', 'Complex reporting requirements', 'Rising client expectations for digital'],
    solutions: ['Wealth management platforms', 'Risk & compliance analytics', 'Core banking modernization', 'Client portals', 'Automated reporting', 'Data warehousing'],
  },
  {
    slug: 'retail', name: 'Retail', icon: Store, image: img.retail,
    desc: 'Omnichannel POS, loyalty programs and inventory intelligence for retail leaders.',
    points: ['Omnichannel POS', 'Loyalty programs', 'Inventory insights'],
    challenges: ['Disconnected online and in-store data', 'Stock-outs and overstock', 'Customer retention'],
    solutions: ['Omnichannel POS systems', 'Loyalty & rewards apps', 'Inventory forecasting', 'Click-and-collect', 'Store operations tools', 'Customer data platforms'],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
