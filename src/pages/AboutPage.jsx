import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import Button from '../components/ui/Button';
import About from '../sections/About';
import Stats from '../sections/Stats';
import GlobalPresence from '../sections/GlobalPresence';
import Testimonials from '../sections/Testimonials';
import Partners from '../sections/Partners';
import Standards from '../sections/Standards';
import { culture } from '../data/images';

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About Velotech"
        title={
          <>
            We engineer products that <span className="text-gradient">move businesses forward</span>
          </>
        }
        desc="A team of designers, engineers and strategists across six countries, partnering with startups and enterprises since 2018."
        actions={
          <>
            <Button href="/careers" size="lg">
              Join Our Team
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Work With Us
            </Button>
          </>
        }
        aside={<img src={culture[0]} alt="Velotech team at work (placeholder)" />}
      />
      <About />
      <Stats />
      <GlobalPresence />
      <Standards />
      <Testimonials />
      <Partners />
      <CTABanner />
    </>
  );
}
