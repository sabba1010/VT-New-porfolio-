import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { useParallax } from '../hooks/useScroll';
import { values, approach, auditHref } from '../data/content';
import Team from './Team';
import { culture } from '../data/images';
import { site } from '../data/site';
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
                Practical AI, built on <span className="text-gradient">solid engineering.</span>
              </h2>
              <p className="about__lead">
                Velotech is an AI automation and software development company. We help businesses
                cut repetitive work, plug AI into the tools they already use and build web, mobile
                and custom software around how they actually operate.
              </p>
              <p className="about__copy">
                We start small — one workflow, one measurable win — then scale what works. Every
                build is production-grade, secure and handed over with full ownership of the code.
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
              <Button href={auditHref} variant="dark">
                Work With Us
              </Button>
            </Reveal>
          </div>

          <Reveal className="about__collage" delay={100}>
            <div className="about__col" ref={colA}>
              <img src={culture[1]} alt="Team collaborating" loading="lazy" />
              <img src={culture[2]} alt="Workspace" loading="lazy" />
            </div>
            <div className="about__col about__col--offset" ref={colB}>
              <img src={culture[3]} alt="Workshop session" loading="lazy" />
              <img src={culture[4]} alt="Team celebration" loading="lazy" />
            </div>
            {site.proof?.stats && (
              <div className="about__badge">
                <strong>08+</strong>
                <span>Years building digital products</span>
              </div>
            )}
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
