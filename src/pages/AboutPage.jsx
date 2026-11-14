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
import { site } from '../data/site';
import { auditHref } from '../data/content';

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About Velotech"
        title={
          <>
            We build AI and software that <span className="text-gradient">moves businesses forward</span>
          </>
        }
        desc="A team of engineers, AI specialists and designers across six countries, helping businesses automate their busywork, add AI to the tools they already use and build software that grows with them since 2018."
        actions={
          <>
            <Button href={auditHref} size="lg">
              Book a Free AI Audit
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              See What We Build
            </Button>
          </>
        }
        aside={<img src={culture[0]} alt="The Velotech team at work" />}
      />
      <About />
      <Stats />
      {site.proof?.offices && <GlobalPresence />}
      <Standards />
      <Testimonials />
      <Partners />
      <CTABanner />
    </>
  );
}
