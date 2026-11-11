import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Ticker from '../sections/Ticker';
import CaseStudies from '../sections/CaseStudies';
import Stats from '../sections/Stats';
import Industries from '../sections/Industries';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import FinalCTA from '../sections/FinalCTA';

/**
 * Home is intentionally focused: each section links out to its full page
 * (Tech stack → /services, Team & global presence → /about, Blog → /blog).
 */
export default function Home() {
  usePageMeta(null);
  return (
    <>
      <Hero />
      <Services />
      <Ticker />
      <CaseStudies limit={3} />
      <Stats />
      <Industries />
      <Testimonials />
      <FAQ limit={5} />
      <FinalCTA />
    </>
  );
}
