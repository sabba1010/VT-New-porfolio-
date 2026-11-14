import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Services from '../sections/Services';
import TechStack from '../sections/TechStack';
import Stats from '../sections/Stats';
import Engagements from '../sections/Engagements';
import { approach } from '../data/content';

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="Our services"
        title={
          <>
            AI &amp; software services that <span className="text-gradient">grow your business</span>
          </>
        }
        desc="AI automation, AI integration and AI-driven growth — plus web, mobile, e-commerce, CMS and custom software development and UI/UX design. One accountable team from idea to launch."
        actions={
          <>
            <Button href="/contact" size="lg">
              Get a Free Quote
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              View Case Studies
            </Button>
          </>
        }
      />
      <Services />
      <Stats />
      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="How we work" title="A proven delivery process" align="center" />
          <ol className="steps">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 90} className="step">
                <span className="step__num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <Engagements />
      <TechStack />
      <CTABanner />
    </>
  );
}
