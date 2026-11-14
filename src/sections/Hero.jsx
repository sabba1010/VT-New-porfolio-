import { Fragment } from 'react';
import { ShieldCheck, BadgeCheck, Timer, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { team } from '../data/images';
import { realPartners, auditHref } from '../data/content';
import { site } from '../data/site';
import './Hero.css';

// Commitments we make to every client (not claims about past numbers)
const trust = [
  { icon: Timer, label: 'Free 30-min AI audit' },
  { icon: ShieldCheck, label: 'NDA on request' },
  { icon: BadgeCheck, label: 'You own 100% of the code' },
];

/** Each word slides up from behind a mask, staggered. */
function SplitWords({ parts, start = 120, step = 70 }) {
  let n = 0;
  return (
    <span aria-hidden="true">
      {parts.map((part) =>
        part.text.split(' ').map((word) => {
          const delay = start + n++ * step;
          const masked = (
            <span className="word">
              <span className={`word__in ${part.className ?? ''}`} style={{ animationDelay: `${delay}ms` }}>
                {word}
              </span>
            </span>
          );
          return (
            <Fragment key={`${word}-${n}`}>
              {part.mark ? (
                // hand-drawn swoosh under the word, drawn in after the word lands
                <span className="hero__mark">
                  {masked}
                  <svg className="hero__swoosh" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M5 21 C 55 9, 120 5, 190 10 S 275 22, 295 12"
                      pathLength="1"
                      style={{ animationDelay: `${delay + 650}ms` }}
                    />
                  </svg>
                </span>
              ) : (
                masked
              )}{' '}
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
            <Sparkles size={13} /> AI
          </span>
          Top Software Development &amp; AI Company
        </p>

        <h1 id="hero-title" className="hero__title" aria-label="AI-Powered Software That Grows Your Business.">
          <SplitWords
            parts={[
              { text: 'AI-Powered Software' },
              { text: 'That' },
              { text: 'Grows', mark: true },
              { text: 'Your' },
              { text: 'Business.', className: 'hero__dim' },
            ]}
          />
        </h1>

        <p className="hero__desc hero-in" style={{ '--d': '520ms' }}>
          We automate your workflows, integrate AI into the tools you already use and build custom
          software that helps your business grow — for startups and enterprises worldwide.
        </p>

        <div className="hero__ctas hero-in" style={{ '--d': '600ms' }}>
          <Button href={auditHref} size="lg">
            Book a Free AI Audit
          </Button>
          <Button href="/#ai" size="lg" variant="ghost">
            Explore AI Solutions
          </Button>
        </div>

        <div className="hero__meta hero-in" style={{ '--d': '680ms' }}>
          {site.proof?.stats && (
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
          )}
          <ul className="hero__trust">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={16} /> {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Logo strip: only shown once real client logos are added ── */}
      {realPartners.length > 0 && (
        <div className="container hero__logos hero-in" style={{ '--d': '760ms' }}>
          <p>Trusted by fast-growing teams worldwide</p>
          <div className="marquee" style={{ '--marquee-dur': '40s' }}>
            <div className="marquee__track">
              {[...realPartners.slice(0, 8), ...realPartners.slice(0, 8)].map(({ logo: src, name }, i) => (
                <img key={i} src={src} alt={i < 8 ? `${name} logo` : ''} aria-hidden={i >= 8} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
