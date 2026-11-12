import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Services from '../sections/Services';
import TechStack from '../sections/TechStack';
import Stats from '../sections/Stats';
import { approach } from '../data/content';

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="Our services"
        title={
          <>
            Design &amp; development services that <span className="text-gradient">grow your brand</span>
          </>
        }
        desc="Creative design — product, packaging, UI/UX, book cover, graphic and social media — plus web, mobile, AI, e-commerce and custom software development, delivered by one accountable team."
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
      <TechStack />
      <CTABanner />
    </>
  );
}
