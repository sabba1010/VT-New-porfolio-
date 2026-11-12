import { Fragment, useEffect, useRef } from 'react';
import { CheckCircle2, ShieldCheck, BadgeCheck, Timer, TrendingUp, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { team, projects, logos } from '../data/images';
import './Hero.css';

const trust = [
  { icon: ShieldCheck, label: 'Risk-free trial' },
  { icon: BadgeCheck, label: 'Pre-vetted senior experts' },
  { icon: Timer, label: 'Kick-off in 2 weeks' },
];

/** Each word slides up from behind a mask, staggered. */
function SplitWords({ parts, start = 120, step = 70 }) {
  let n = 0;
  return (
    <span aria-hidden="true">
      {parts.map((part) =>
        part.text.split(' ').map((word) => {
          const delay = start + n++ * step;
          return (
            <Fragment key={`${word}-${n}`}>
              <span className="word">
                <span className={`word__in ${part.className ?? ''}`} style={{ animationDelay: `${delay}ms` }}>
                  {word}
                </span>
              </span>{' '}
            </Fragment>
          );
        }),
      )}
    </span>
  );
}

export default function Hero() {
  const stageRef = useRef(null);

  // Product window starts tilted back and flattens as the page scrolls
  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.6), 0), 1);
      el.style.setProperty('--tilt', `${(1 - p) * 16}deg`);
      el.style.setProperty('--lift', p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Subtle mouse parallax for the floating cards
  const onPointerMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onPointerLeave = () => {
    stageRef.current?.style.setProperty('--mx', 0);
    stageRef.current?.style.setProperty('--my', 0);
  };

  return (
    <section className="hero section--dark" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid" />
        <span className="hero__spot" />
      </div>

      <div className="container hero__content">
        <p className="hero__badge hero-in" style={{ '--d': '0ms' }}>
          <span className="hero__badge-tag">
            <Sparkles size={13} /> New
          </span>
          AI-powered product engineering
        </p>

        <h1 id="hero-title" className="hero__title" aria-label="Engineering Digital Experiences That Move Businesses Forward.">
          <SplitWords
            parts={[
              { text: 'Engineering Digital Experiences' },
              { text: 'That Move Businesses' },
              { text: 'Forward.', className: 'hero__dim' },
            ]}
          />
        </h1>

        <p className="hero__desc hero-in" style={{ '--d': '520ms' }}>
          Velotech transforms ambitious ideas into powerful digital products through modern software
          engineering, creative design, and intelligent technology.
        </p>

        <div className="hero__ctas hero-in" style={{ '--d': '600ms' }}>
          <Button href="/contact" size="lg">
            Let&apos;s Talk
          </Button>
          <Button href="/case-studies" size="lg" variant="ghost">
            Explore Our Work
          </Button>
        </div>

        <div className="hero__meta hero-in" style={{ '--d': '680ms' }}>
          <div className="hero__proof">
            <div className="hero__avatars">
              {team.slice(0, 4).map((src, i) => (
                <img key={src} src={src} alt="" width="36" height="36" style={{ zIndex: 4 - i }} />
              ))}
            </div>
            <span>
              <strong>60+</strong> senior engineers &amp; designers
            </span>
          </div>
          <ul className="hero__trust">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={16} /> {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Product stage ── */}
      <div className="container">
        <div
          className="hero__stage hero-in"
          style={{ '--d': '420ms' }}
          ref={stageRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          aria-hidden="true"
        >
          <div className="hero__frame">
            <div className="hero__frame-bar">
              <i /> <i /> <i />
              <span>app.velotech.dev</span>
            </div>
            <img src={projects[0]} alt="" />
          </div>

          <div className="hero__float hero__code" data-depth="3">
            <div className="hero__code-head">
              <i /> <i /> <i /> <span>deploy.ts</span>
            </div>
            <pre>
              <code>
                <b className="k">const</b> product = <b className="f">build</b>({'{'}
                {'\n'}  idea: <b className="s">&apos;ambitious&apos;</b>,
                {'\n'}  team: <b className="s">&apos;velotech&apos;</b>,
                {'\n'}  scale: <b className="n">Infinity</b>,
                {'\n'}{'}'});
              </code>
            </pre>
          </div>

          <div className="hero__float hero__metric" data-depth="2">
            <span className="hero__metric-icon">
              <TrendingUp size={18} />
            </span>
            <div>
              <p className="hero__metric-label">Conversion</p>
              <p className="hero__metric-value">+38.4%</p>
            </div>
            <div className="hero__bars">
              {[40, 62, 48, 74, 58, 90].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="hero__float hero__toast" data-depth="4">
            <CheckCircle2 size={20} />
            <div>
              <p>Deployed to production</p>
              <span>Build passed · 2.4s</span>
            </div>
          </div>

          <div className="hero__float hero__team" data-depth="2.5">
            <p>Your dedicated squad</p>
            <div className="hero__team-row">
              {team.slice(4, 7).map((src) => (
                <img key={src} src={src} alt="" width="32" height="32" />
              ))}
              <span className="hero__live">
                <i /> Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logo strip ── */}
      <div className="container hero__logos hero-in" style={{ '--d': '760ms' }}>
        <p>Trusted by fast-growing teams worldwide</p>
        <div className="marquee" style={{ '--marquee-dur': '40s' }}>
          <div className="marquee__track">
            {[...logos.slice(0, 8), ...logos.slice(0, 8)].map((src, i) => (
              <img key={i} src={src} alt={i < 8 ? `Client logo placeholder ${i + 1}` : ''} aria-hidden={i >= 8} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
