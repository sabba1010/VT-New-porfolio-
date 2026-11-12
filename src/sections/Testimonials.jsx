import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { testimonials } from '../data/content';
import './Testimonials.css';

const AUTOPLAY_MS = 6500;

// Only real testimonials are shown; the section disappears while all are samples.
const published = testimonials.filter((t) => !t.sample);

export default function Testimonials(props) {
  return published.length ? <TestimonialSlider {...props} /> : null;
}

function TestimonialSlider({ tone = 'dark' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ x: 0, active: false });
  const n = published.length;

  const go = useCallback((i) => setIndex(((i % n) + n) % n), [n]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  // Touch / mouse swipe
  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, active: true };
  };
  const onPointerUp = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <section className={`section ${tone === 'dark' ? 'section--cream' : ''} testi`} id="testimonials" aria-labelledby="testi-title">
      <div className="container testi__layout">
        <Reveal className="testi__intro">
          <span className="eyebrow">Testimonials</span>
          <h2 id="testi-title">What our clients say about working with us</h2>
          <p>
            Long-term partnerships built on trust, transparency and results.

          </p>
          <div className="testi__nav">
            <button className="testi__arrow" onClick={prev} aria-label="Previous testimonial">
              <ArrowLeft size={20} />
            </button>
            <span className="testi__count" aria-hidden="true">
              <strong>{String(index + 1).padStart(2, '0')}</strong> / {String(n).padStart(2, '0')}
            </span>
            <button className="testi__arrow testi__arrow--next" onClick={next} aria-label="Next testimonial">
              <ArrowRight size={20} />
            </button>
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="testi__viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current.active = false)}
        >
          <div className="testi__track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {published.map((t, i) => (
              <figure
                key={i}
                className={`tcard ${i === index ? 'is-active' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={i !== index}
              >
                <div className="tcard__top">
                  <span className="tcard__quote">
                    <Quote size={26} />
                  </span>
                  <span className="tcard__stars" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }, (_, k) => (
                      <Star key={k} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                </div>
                <blockquote>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="tcard__author">
                  <img src={t.photo} alt="" width="56" height="56" loading="lazy" />
                  <div>
                    <strong>{t.name}</strong>
                    <span>
                      {t.role}, {t.company}
                    </span>
                  </div>

                </figcaption>
              </figure>
            ))}
          </div>

          <div className="testi__dots" role="tablist" aria-label="Choose testimonial">
            {published.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                className={`testi__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => go(i)}
              >
                {i === index && !paused && <span style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
