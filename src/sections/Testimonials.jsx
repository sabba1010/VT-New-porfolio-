import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Repeat, Star } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { reviews, reviewSummary, reviewCountries } from '../data/reviews';
import { whatsappHref } from '../data/content';
import './Testimonials.css';

const AVATAR_TONES = ['#1E3A5F', '#7A2405', '#2F4A3A', '#5A3E8C', '#9A3412', '#0F766E', '#8A1C4A', '#3F3F46'];
const toneFor = (name) => AVATAR_TONES[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_TONES.length];

function Stars({ value, size = 15 }) {
  return (
    <span className="rv-stars" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} strokeWidth={0} fill="currentColor" className={i < Math.round(value) ? '' : 'is-off'} />
      ))}
    </span>
  );
}

function Avatar({ r, className = 'rv-card__avatar', size = 44 }) {
  return r.photo ? (
    <img className={className} src={r.photo} alt="" width={size} height={size} loading="lazy" />
  ) : (
    <span className={`${className} rv-card__avatar--letter`} style={{ background: toneFor(r.name) }} aria-hidden="true">
      {r.name[0].toUpperCase()}
    </span>
  );
}

function ReviewCard({ r }) {
  return (
    <figure className="rv-card">
      <Quote className="rv-card__mark" size={64} strokeWidth={1.2} aria-hidden="true" />
      <figcaption className="rv-card__head">
        <Avatar r={r} />
        <span className="rv-card__who">
          <strong>{r.name}</strong>
          <span className="rv-card__country">
            <img src={`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${r.code}.svg`} alt="" width="16" height="12" loading="lazy" />
            {r.country}
          </span>
        </span>
        <span className="rv-card__rating">
          <Stars value={r.rating} size={13} />
          <b>{r.rating % 1 ? r.rating.toFixed(1) : r.rating}</b>
        </span>
      </figcaption>
      <blockquote lang={r.lang}>
        <p>{r.quote}</p>
      </blockquote>
      <div className="rv-card__foot">
        <span className="rv-card__verified">
          <BadgeCheck size={14} /> Verified Fiverr order
        </span>
        {r.repeat ? (
          <span className="rv-card__tag rv-card__tag--repeat">
            <Repeat size={12} /> Repeat client
          </span>
        ) : (
          <span className="rv-card__tag">{r.project}</span>
        )}
      </div>
    </figure>
  );
}

/** Fiverr client reviews — data lives in src/data/reviews.js. */
export default function Testimonials({ tone = 'dark' }) {
  if (!reviews.length) return null;
  const s = reviewSummary;

  return (
    <section className={`section ${tone === 'dark' ? 'section--cream' : ''} rv`} id="testimonials" aria-labelledby="rv-title">
      <div className="container rv__head">
        <Reveal className="rv__intro">
          <span className="eyebrow">Client reviews</span>
          <h2 id="rv-title">
            Rated <span className="text-accent">{s.rating.toFixed(1)}</span> by clients worldwide
          </h2>
          <p>
            Real reviews from verified {s.platform} orders — clients in {reviewCountries.length} countries who came back,
            recommended us and kept building with us.
          </p>
        </Reveal>

        <Reveal delay={120} className="rv__score">
          <div className="rv__score-top">
            <span className="rv__platform">
              fiverr<i>.</i>
            </span>
            <span className="rv__badge">
              <BadgeCheck size={14} /> Verified reviews
            </span>
          </div>
          <div className="rv__score-main">
            <strong>{s.rating.toFixed(1)}</strong>
            <span>
              <Stars value={s.rating} size={20} />
              <small>
                {s.count} reviews · {s.fiveStar} five-star{s.profiles > 1 ? ` · ${s.profiles} profiles` : ''}
              </small>
            </span>
          </div>
          <div className="rv__score-cta">
            {s.profileUrl ? (
              <Button href={s.profileUrl} target="_blank" rel="noopener noreferrer" size="sm">
                See reviews on Fiverr
              </Button>
            ) : (
              <Button href={whatsappHref()} target="_blank" rel="noopener noreferrer" size="sm">
                Start your project
              </Button>
            )}
          </div>
        </Reveal>
      </div>

      <ReviewSlider />
    </section>
  );
}

const AUTOPLAY_MS = 5500;
const VISIBLE = 2; // cards shown on each side of the active one

/* Infinite, centre-focused slider: every card sits in the same grid cell and is
   shifted by its circular distance from the active index. */
function ReviewSlider() {
  const n = reviews.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef({ x: 0, active: false });

  const go = useCallback((i) => setIndex(((i % n) + n) % n), [n]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    setReduced(Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));
  }, []);

  useEffect(() => {
    if (paused || reduced) return undefined;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, next]);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, active: true };
  };
  const onPointerUp = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <div
      className="rv-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${n} client reviews`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="rv-slider__stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current.active = false)}
      >
        {reviews.map((r, i) => {
          let d = i - index;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const far = Math.abs(d) > VISIBLE;
          return (
            <div
              key={i}
              className={`rv-slide ${d === 0 ? 'is-active' : ''} ${far ? 'is-far' : ''}`}
              style={{ '--d': d, '--ad': Math.abs(d) }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={d !== 0}
              onClick={d !== 0 && !far ? () => go(i) : undefined}
            >
              <ReviewCard r={r} />
            </div>
          );
        })}
      </div>

      <div className="rv-slider__controls container">
        <button className="rv-slider__arrow" onClick={prev} aria-label="Previous review">
          <ArrowLeft size={20} />
        </button>
        <div className="rv-slider__people" role="group" aria-label="Jump to a review">
          {[-3, -2, -1, 0, 1, 2, 3].map((off) => {
            const i = (((index + off) % n) + n) % n;
            const r = reviews[i];
            return (
              <button
                key={off}
                className={`rv-person ${off === 0 ? 'is-active' : ''}`}
                style={{ '--ao': Math.abs(off) }}
                onClick={() => go(i)}
                aria-label={`Review by ${r.name}`}
                aria-current={off === 0 ? 'true' : undefined}
              >
                <Avatar r={r} className="rv-person__img" size={40} />
              </button>
            );
          })}
        </div>
        <button className="rv-slider__arrow rv-slider__arrow--next" onClick={next} aria-label="Next review">
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="rv-slider__meta">
        <span className="rv-slider__count" aria-live="polite">
          <strong>{String(index + 1).padStart(2, '0')}</strong> / {String(n).padStart(2, '0')}
        </span>
        <span className="rv-slider__progress" aria-hidden="true">
          <span
            key={`${index}-${paused}`}
            className={paused || reduced ? 'is-paused' : ''}
            style={{ '--fill': `${((index + 1) / n) * 100}%`, animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </span>
      </div>
    </div>
  );
}
