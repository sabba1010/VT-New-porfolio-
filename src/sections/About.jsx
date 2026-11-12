import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { useParallax } from '../hooks/useScroll';
import { values, approach } from '../data/content';
import Team from './Team';
import { culture } from '../data/images';
import './About.css';

export default function About() {
  const colA = useParallax(0.06);
  const colB = useParallax(-0.06);

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__intro">
          <div className="about__text">
            <Reveal>
              <span className="eyebrow">About Velotech</span>
              <h2 id="about-title" className="about__title">
                Building What&apos;s Next Through <span className="text-gradient">Technology.</span>
              </h2>
              <p className="about__lead">
                Velotech is a digital engineering agency of designers, engineers and strategists who
                partner with startups and enterprises to turn bold ideas into scalable, beautifully
                crafted products.
              </p>
              <p className="about__copy">
                We combine product thinking with deep technical expertise — so every line of code
                and every pixel moves your business metrics forward.
              </p>
            </Reveal>

            <ul className="about__values">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 90}>
                  <span className="about__check">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={150}>
              <Button href="/about" variant="dark">
                Learn More About Us
              </Button>
            </Reveal>
          </div>

          <Reveal className="about__collage" delay={100}>
            <div className="about__col" ref={colA}>
              <img src={culture[1]} alt="Velotech team collaborating (placeholder)" loading="lazy" />
              <img src={culture[2]} alt="Velotech office space (placeholder)" loading="lazy" />
            </div>
            <div className="about__col about__col--offset" ref={colB}>
              <img src={culture[3]} alt="Workshop session (placeholder)" loading="lazy" />
              <img src={culture[4]} alt="Team celebration (placeholder)" loading="lazy" />
            </div>
            <div className="about__badge">
              <strong>08+</strong>
              <span>Years building digital products</span>
            </div>
          </Reveal>
        </div>

        {/* Our approach */}
        <div className="approach">
          <SectionHeading eyebrow="Our approach" title="A proven process from idea to impact" />
          <ol className="approach__list">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 100} className="approach__item">
                <span className="approach__step">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Team — names, roles, photos and LinkedIn links: src/data/content.js (leaders) */}
        <Team />
      </div>
    </section>
  );
}
