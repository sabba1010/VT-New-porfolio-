import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Testimonials from '../sections/Testimonials';
import { industries } from '../data/content';

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industries' }]}
        eyebrow="Industries"
        title={
          <>
            Industry expertise that <span className="text-gradient">speeds up delivery</span>
          </>
        }
        desc="We have built products across ten industries — so we understand your compliance needs, users and market from day one."
        actions={
          <Button href="/contact" size="lg">
            Discuss Your Project
          </Button>
        }
      />
      <section className="section">
        <div className="container">
          <ul className="fgrid">
            {industries.map((ind, i) => (
              <Reveal as="li" key={ind.slug} delay={(i % 3) * 80} className="mcard">
                <div className="mcard__media">
                  <img src={ind.image} alt="" loading="lazy" />
                </div>
                <div className="mcard__body">
                  <h3>
                    <ind.icon size={20} /> {ind.name}
                  </h3>
                  <p>{ind.desc}</p>
                  <Link to={`/industries/${ind.slug}`} className="fcard__link">
                    Explore solutions <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Testimonials />
      <CTABanner />
    </>
  );
}
