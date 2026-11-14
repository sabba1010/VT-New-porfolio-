import Hero from '../sections/Hero';
import AISpotlight from '../sections/AISpotlight';
import Services from '../sections/Services';
import Manifesto from '../sections/Manifesto';
import Ticker from '../sections/Ticker';
import IndustryCases from '../sections/IndustryCases';
import CaseScroll from '../sections/CaseScroll';
import Stats from '../sections/Stats';
import Process from '../sections/Process';
import Standards from '../sections/Standards';
import Testimonials from '../sections/Testimonials';
import CTABanner from '../components/page/CTABanner';

/**
 * Home is a short, focused overview. Everything else has its own page:
 * Industries → home section linking to case studies, FAQ → /contact & service pages, full contact
 * form → /contact, Tech stack → /services, Team & offices → /about, Blog → /blog.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <AISpotlight />
      <Services compact />
      <Manifesto />
      <Ticker />
      <IndustryCases />
      <CaseScroll limit={6} />
      <Stats />
      <Process />
      <Standards compact tone="dark" />
      <Testimonials tone="light" />
      <CTABanner />
    </>
  );
}
