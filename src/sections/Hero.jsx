import { Fragment, useRef } from 'react';
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

  // Subtle mouse parallax for the floating UI elements
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
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid" />
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__badge hero-in" style={{ '--d': '0ms' }}>
            <span className="hero__badge-tag">
              <Sparkles size={13} /> New
            </span>
            AI-powered product engineering
          </p>

          <h1 id="hero-title" className="hero__title" aria-label="Engineering Digital Experiences That Move Businesses Forward.">
            <SplitWords
              parts={[
                { text: 'Engineering' },
                { text: 'Digital Experiences', className: 'hero__hl' },
                { text: 'That Move Businesses' },
                { text: 'Forward.', className: 'text-gradient' },
              ]}
            />
          </h1>

          <p className="hero__desc hero-in" style={{ '--d': '160ms' }}>
            Velotech transforms ambitious ideas into powerful digital products through modern
            software engineering, creative design, and intelligent technology.
          </p>

          <div className="hero__ctas hero-in" style={{ '--d': '240ms' }}>
            <Button href="/contact" size="lg">
              Let&apos;s Talk
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              Explore Our Work
            </Button>
          </div>

          <div className="hero__proof hero-in" style={{ '--d': '320ms' }}>
            <div className="hero__avatars">
              {team.slice(0, 4).map((src, i) => (
                <img key={src} src={src} alt="" width="44" height="44" style={{ zIndex: 4 - i }} />
              ))}
              <span className="hero__avatars-more">60+</span>
            </div>
            <p>
              <strong>Senior engineers & designers</strong>
              <span>ready to join your product team</span>
            </p>
          </div>

          <ul className="hero__trust hero-in" style={{ '--d': '400ms' }}>
            {trust.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={18} /> {label}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Visual stage ── */}
        <div
          className="hero__stage hero-in"
          style={{ '--d': '200ms' }}
          ref={stageRef}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          aria-hidden="true"
        >
          <span className="hero__ring hero__ring--1" />
          <span className="hero__ring hero__ring--2" />

          <div className="hero__screen" data-depth="1">
            <div className="hero__screen-bar">
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
                <img key={src} src={src} alt="" width="34" height="34" />
              ))}
              <span className="hero__live">
                <i /> Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logo strip ── */}
      <div className="container hero__logos hero-in" style={{ '--d': '500ms' }}>
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
