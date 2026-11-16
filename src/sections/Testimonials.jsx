import { BadgeCheck, Repeat, Star } from 'lucide-react';
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

function ReviewCard({ r }) {
  return (
    <figure className="rv-card">
      <figcaption className="rv-card__head">
        {r.photo ? (
          <img className="rv-card__avatar" src={r.photo} alt="" width="44" height="44" loading="lazy" />
        ) : (
          <span className="rv-card__avatar rv-card__avatar--letter" style={{ background: toneFor(r.name) }} aria-hidden="true">
            {r.name[0].toUpperCase()}
          </span>
        )}
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
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];
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
                {s.count} reviews · {s.fiveStar} five-star
              </small>
            </span>
          </div>
          <div className="rv__score-cta">
            {s.profileUrl ? (
              <Button href={s.profileUrl} target="_blank" rel="noopener noreferrer" size="sm">
                See all reviews on Fiverr
              </Button>
            ) : (
              <Button href={whatsappHref()} target="_blank" rel="noopener noreferrer" size="sm">
                Start your project
              </Button>
            )}
          </div>
        </Reveal>
      </div>

      <div className="rv__wall" role="region" aria-label={`${reviews.length} client reviews`} tabIndex={0}>
        {rows.map((row, i) => (
          <div key={i} className={`rv__row ${i ? 'rv__row--reverse' : ''}`}>
            <div className="rv__track">
              {row.map((r, k) => (
                <ReviewCard key={`a${k}`} r={r} />
              ))}
              {/* duplicate set for a seamless loop — hidden from assistive tech */}
              <div className="rv__dupe" aria-hidden="true">
                {row.map((r, k) => (
                  <ReviewCard key={`b${k}`} r={r} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
