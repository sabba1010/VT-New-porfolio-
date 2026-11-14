import { useEffect, useRef } from 'react';
import { gsap, MQ_DESKTOP, MQ_MOTION } from '../lib/motion';
import { stats } from '../data/content';
import { site } from '../data/site';
import './Manifesto.css';

// Words wrapped in *asterisks* are highlighted in the accent colour.
const STATEMENT =
  'We are a team of engineers and AI specialists who turn bold ideas into *intelligent software* — automating the busywork, connecting your tools and helping your business *grow*.';

const words = STATEMENT.split(' ').map((raw, i) => {
  const accent = raw.includes('*');
  return { text: raw.replace(/\*/g, ''), accent, key: i };
});

/**
 * Big statement that "writes itself" as you scroll: each word fills from
 * dim to solid, scrubbed to the scrollbar. Pinned on desktop.
 */
export default function Manifesto() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    const fill = (scrollTrigger) =>
      gsap
        .timeline({ scrollTrigger })
        .fromTo(
          q('.mf__w'),
          { opacity: 0.12, y: 6 },
          { opacity: 1, y: 0, ease: 'none', stagger: 0.12, duration: 1 },
        )
        .fromTo(q('.mf__line'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: words.length * 0.12 }, 0);

    mm.add(MQ_DESKTOP, () => {
      fill({ trigger: q('.mf__pin')[0], start: 'top top', end: '+=140%', pin: true, scrub: 1, anticipatePin: 1 });
      gsap.from(q('.mf__orb'), {
        yPercent: 40,
        scale: 0.6,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      fill({ trigger: q('.mf__text')[0], start: 'top 80%', end: 'bottom 45%', scrub: 1 });
    });

    mm.add(MQ_MOTION, () => {
      gsap.from(q('.mf__label > *'), {
        y: 20,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="mf" aria-label="About Velotech">
      <div className="mf__pin">
        <span className="mf__orb" aria-hidden="true" />
        <div className="container mf__inner">
          <div className="mf__label">
            <span className="eyebrow">Who we are</span>
          </div>
          <p className="mf__text">
            {words.map((w) => (
              <span key={w.key} className={`mf__w ${w.accent ? 'mf__w--accent' : ''}`}>
                {w.text}{' '}
              </span>
            ))}
          </p>
          <div className="mf__foot">
            <span className="mf__rail">
              <span className="mf__line" />
            </span>
            <span className="mf__note">
              {site.proof?.stats
                ? stats.slice(0, 2).map((s) => `${s.value}${s.suffix} ${s.label}`).join(' · ')
                : 'AI automation · AI integration · Custom software'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
