import { Fragment } from 'react';
import { ShieldCheck, BadgeCheck, Timer, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { team, logos } from '../data/images';
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
