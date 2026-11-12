import { useEffect, useRef } from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { approach } from '../data/content';
import { gsap, MQ_DESKTOP, MQ_MOTION } from '../lib/motion';
import './Process.css';

const ICONS = [Search, PenTool, Code2, Rocket];
const DETAILS = [
  ['Stakeholder workshops', 'User research', 'Technical audit'],
  ['Wireframes & prototypes', 'Design system', 'Usability testing'],
  ['Agile sprints', 'Automated QA', 'CI/CD pipelines'],
  ['Performance monitoring', 'Growth experiments', 'Ongoing support'],
];

/**
 * "How we work" — cards stick and stack on top of each other while
 * scrolling; the cards underneath scale back and dim (GSAP scrub).
 */
export default function Process() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(MQ_MOTION, () => {
      gsap.from(q('.proc__head .wmask__in'), {
        yPercent: 115,
        rotate: 4,
        duration: 1.1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });
      gsap.from(q('.proc__head .eyebrow, .proc__lead'), {
        y: 24,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });
    });

    mm.add(MQ_DESKTOP, () => {
      const cards = q('.pcard');
      const last = cards[cards.length - 1];

      cards.forEach((card, i) => {
        const inner = card.querySelector('.pcard__inner');
        // entrance: each card tilts up into place
        gsap.from(inner, {
          y: 120,
          rotateX: -18,
          transformPerspective: 1200,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 55%', scrub: 1 },
        });
        if (card === last) return;
        // stacked: shrink + dim as the following cards cover it
        const depth = cards.length - 1 - i;
        gsap.to(inner, {
          scale: 1 - depth * 0.05,
          '--dim': 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            // begins once the card reaches its sticky position
            start: () => `top ${parseFloat(getComputedStyle(card).top) || 0}px`,
            endTrigger: last,
            end: 'top 60%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        // the icon spins once while the card is active
        gsap.to(card.querySelector('.pcard__icon'), {
          rotate: 360,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="section proc" aria-labelledby="proc-title">
      <div className="container proc__grid">
        <div className="proc__head">
          <span className="eyebrow">How we work</span>
          <h2 className="proc__title" id="proc-title">
            {['From', 'idea', 'to', 'impact,'].map((w) => (
              <span className="wmask" key={w}>
                <span className="wmask__in">{w}</span>
              </span>
            ))}
            {['step', 'by', 'step.'].map((w) => (
              <span className="wmask" key={w}>
                <span className="wmask__in text-accent">{w}</span>
              </span>
            ))}
          </h2>
          <p className="proc__lead">
            A proven four-stage process that keeps every sprint tied to outcomes — with weekly demos and zero
            surprises.
          </p>
        </div>

        <ol className="proc__stack">
          {approach.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={s.step} className="pcard" style={{ '--i': i }}>
                <article className={`pcard__inner pcard__inner--${i % 4}`}>
                  <div className="pcard__top">
                    <span className="pcard__step">{s.step}</span>
                    <span className="pcard__icon" aria-hidden="true">
                      <Icon size={26} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3 className="pcard__title">{s.title}</h3>
                  <p className="pcard__desc">{s.desc}</p>
                  <ul className="pcard__list">
                    {(DETAILS[i] ?? []).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <span className="pcard__big" aria-hidden="true">
                    {s.step}
                  </span>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
