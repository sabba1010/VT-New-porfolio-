import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { industries } from '../data/content';
import './Industries.css';

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  const onKeyDown = (e) => {
    const n = industries.length;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      document.getElementById(`ind-tab-${industries[next].slug}`)?.focus();
    }
  };

  return (
    <section className="section section--dark section--panel industries" id="industries" aria-labelledby="industries-title">
      <div className="industries__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="industries-title"
          eyebrow="Industries we serve"
          title={
            <>
              Domain expertise across <span className="text-gradient">10+ industries</span>
            </>
          }
          desc="We combine deep industry knowledge with engineering excellence to solve the challenges unique to your market."
        />

        <div className="industries__layout">
          <Reveal className="industries__list" role="tablist" aria-orientation="vertical" aria-label="Industries" onKeyDown={onKeyDown}>
            {industries.map(({ slug: id, name, icon: Icon }, i) => (
              <button
                key={id}
                id={`ind-tab-${id}`}
                role="tab"
                aria-selected={active === i}
                aria-controls="ind-panel"
                tabIndex={active === i ? 0 : -1}
                className={`ind ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="ind__icon">
                  <Icon size={20} />
                </span>
                <span className="ind__name">{name}</span>
                <ArrowRight size={18} className="ind__arrow" />
              </button>
            ))}
          </Reveal>

          <Reveal delay={120} className="industries__panel" id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${current.slug}`}>
            <div className="industries__media">
              {industries.map((ind, i) => (
                <img
                  key={ind.slug}
                  src={ind.image}
                  alt={i === active ? `${ind.name} solutions illustration` : ''}
                  className={i === active ? 'is-active' : ''}
                  loading="lazy"
                />
              ))}
              <span className="industries__tag">
                <current.icon size={16} /> {current.name}
              </span>
            </div>
            <div className="industries__body" key={current.slug}>
              <h3>{current.name} Software Solutions</h3>
              <p>{current.desc}</p>
              <ul>
                {current.points.map((p) => (
                  <li key={p}>
                    <Check size={16} /> {p}
                  </li>
                ))}
              </ul>
              <Button href={`/industries/${current.slug}`} size="sm">
                Explore {current.name} solutions
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
