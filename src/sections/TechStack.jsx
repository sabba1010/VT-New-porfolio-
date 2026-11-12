import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import { techStack } from '../data/content';
import './TechStack.css';

export default function TechStack() {
  const [active, setActive] = useState(techStack[0].id);
  const group = techStack.find((g) => g.id === active);

  return (
    <section className="section tech" id="technologies" aria-labelledby="tech-title">
      <div className="container">
        <SectionHeading
          id="tech-title"
          align="center"
          eyebrow="Technology stack"
          title={
            <>
              Modern tools for <span className="text-accent">modern products</span>
            </>
          }
          desc="We pick proven, future-proof technologies that fit your product, team and growth plans."
        />

        <Reveal className="tech__tabs-wrap">
          <div className="tech__tabs" role="tablist" aria-label="Technology categories">
            {techStack.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tech-tab-${id}`}
                role="tab"
                aria-selected={active === id}
                aria-controls="tech-panel"
                className={`tech__tab ${active === id ? 'is-active' : ''}`}
                onClick={() => setActive(id)}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="tech__grid" id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${active}`} key={active}>
          {group.items.map((t, i) => (
            <li key={t.name} className="tech__item" style={{ '--i': i }}>
              <span className="tech__logo">
                <SmartImage src={t.icon} alt="" fallback={t.name.slice(0, 2)} width="44" height="44" />
              </span>
              <span className="tech__name">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
