import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { industryCases } from '../data/content';
import { site } from '../data/site';
import './IndustryCases.css';

const SAMPLE = Boolean(site.proof?.sampleWork);
const AUTOPLAY_MS = 6000;

/**
 * "Industries we serve" — tabs on the left, a showcase of what we build for
 * the selected industry on the right. Auto-advances (pauses on hover/focus,
 * off for reduced motion); arrow keys move between tabs.
 */
export default function IndustryCases() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const tabsRef = useRef([]);
  const n = industryCases.length;

  // only autoplay when motion is welcome (checked after mount: SSR-safe)
  useEffect(() => {
    setAutoplay(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // keep the active pill visible in the mobile scroller — scrolls only the
  // pill row sideways, never the page (autoplay must not move the reader)
  useEffect(() => {
    const tab = tabsRef.current[active];
    const row = tab?.parentElement;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - row.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const select = (i) => setActive(((i % n) + n) % n);

  const onKeyDown = (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (active + keys[e.key] + n) % n;
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  };

  if (!n) return null;

  return (
    <section className="section ind" id="industries" aria-labelledby="ind-title">
      <div className="container">
        <SectionHeading
          id="ind-title"
          eyebrow="Industries we serve"
          title={
            <>
              {SAMPLE ? 'Built for ' : 'Proven work in '}
              <span className="text-accent">your industry</span>
            </>
          }
          desc={
            SAMPLE
              ? 'Pick your industry to see an example of what we build for it — the challenge, our approach and the tech behind it.'
              : 'Pick your industry to see a project we delivered in it — the challenge, what we built and the results.'
          }
          action={
            <Link to="/case-studies" className="ind__all">
              See all projects <ArrowUpRight size={18} />
            </Link>
          }
        />

        <Reveal
          className="ind__layout"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* ── Tabs ── */}
          <div className="ind__tabs" role="tablist" aria-label="Industries" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {industryCases.map((ind, i) => {
              const Icon = ind.icon;
              const on = active === i;
              return (
                <button
                  key={ind.slug}
                  ref={(el) => (tabsRef.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`ind-tab-${ind.slug}`}
                  aria-selected={on}
                  aria-controls="ind-panel"
                  tabIndex={on ? 0 : -1}
                  className={`ind__tab ${on ? 'is-active' : ''}`}
                  onClick={() => select(i)}
                >
                  <span className="ind__tab-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="ind__tab-name">{ind.name}</span>
                  <span className="ind__tab-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* autoplay progress — when it finishes, move to the next industry */}
                  {on && autoplay && (
                    <span
                      key={`p-${active}`}
                      className="ind__tab-progress"
                      style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={() => select(active + 1)}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Showcase ── */}
          <div className="ind__stage" id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${industryCases[active].slug}`}>
            <span className="ind__glow" aria-hidden="true" />
            {industryCases.map((ind, i) => {
              const cs = ind.cases[0];
              const on = active === i;
              const multi = ind.cases.length > 1;
              return (
                <article key={ind.slug} className={`ind__slide ${on ? 'is-on' : ''}`} aria-hidden={!on} inert={!on ? true : undefined}>
                  <div className="ind__media">
                    <div className="ind__frame">
                      <span className="ind__dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <img src={cs.image} alt={`${cs.name} — ${ind.name} project preview`} loading="lazy" />
                    </div>
                  </div>

                  <div className="ind__info">
                    <span className="ind__kicker">
                      {SAMPLE ? 'Example project' : 'Case study'} · {ind.name}
                    </span>
                    <h3 className="ind__project">{multi ? `${ind.cases.length} projects in ${ind.name}` : cs.name}</h3>
                    <p className="ind__desc">{ind.desc}</p>
                    <ul className="ind__chips">
                      {(ind.points ?? []).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    {cs.metric && !multi && (
                      <p className="ind__metric">
                        <strong>{cs.metric.value}</strong> {cs.metric.label}
                      </p>
                    )}
                    <Link to={ind.href} className="ind__cta" tabIndex={on ? 0 : -1}>
                      {multi ? 'View projects' : SAMPLE ? 'View example' : 'View case study'}
                      <span aria-hidden="true">
                        <ArrowRight size={18} />
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
