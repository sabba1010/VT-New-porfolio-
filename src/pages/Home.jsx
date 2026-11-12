import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Ticker from '../sections/Ticker';
import CaseStudies from '../sections/CaseStudies';
import Stats from '../sections/Stats';
import Standards from '../sections/Standards';
import Testimonials from '../sections/Testimonials';
import CTABanner from '../components/page/CTABanner';

/**
 * Home is a short, focused overview. Everything else has its own page:
 * Industries → /industries, FAQ → /contact & service pages, full contact
 * form → /contact, Tech stack → /services, Team & offices → /about, Blog → /blog.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services compact />
      <Ticker />
      <CaseStudies compact limit={3} />
      <Stats />
      <Standards compact tone="dark" />
      <Testimonials tone="light" />
      <CTABanner />
    </>
  );
}
