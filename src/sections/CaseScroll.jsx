import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { caseStudies } from '../data/content';
import { gsap, MQ_DESKTOP, MQ_MOTION } from '../lib/motion';
import './CaseScroll.css';

const TITLE = [
  { t: 'Real' },
  { t: 'projects.' },
  { t: 'Measurable', accent: true },
  { t: 'results.' },
];

/**
 * Pinned horizontal-scroll showcase (home page), powered by GSAP ScrollTrigger.
 * Desktop: the section pins, vertical scroll drives the card track sideways,
 * each image has its own parallax and cards ease in as they arrive.
 * Tablet/phone or reduced motion: a native swipeable row.
 */
export default function CaseScroll({ limit = 6 }) {
  const root = useRef(null);
  const items = caseStudies.slice(0, limit);
  const total = String(items.length).padStart(2, '0');

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    // Intro reveal (all sizes, motion allowed)
    mm.add(MQ_MOTION, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });
      tl.from(q('.cscroll__eyebrow'), { y: 20, autoAlpha: 0, duration: 0.6 })
        .from(q('.wmask__in'), { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.08, ease: 'expo.out' }, '-=0.3')
        .from(q('.cscroll__desc, .cscroll__cta, .cscroll__meter'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, '-=0.8');
    });

    // Pinned horizontal scroll (desktop)
    mm.add(MQ_DESKTOP, () => {
      const pin = q('.cscroll__pin')[0];
      const viewport = q('.cscroll__viewport')[0];
      const track = q('.cscroll__track')[0];
      const cards = q('.cscard');
      const bar = q('.cscroll__bar')[0];
      const current = q('.cscroll__current')[0];
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const scroller = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(bar, { scaleX: self.progress });
            const idx = Math.min(cards.length, Math.round(self.progress * (cards.length - 1)) + 1);
            current.textContent = String(idx).padStart(2, '0');
          },
        },
      });

      cards.forEach((card, i) => {
        const img = card.querySelector('img');
        // inner image parallax while the card travels across the screen
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scroller,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
        if (i === 0) return;
        // cards rise, straighten and un-blur as they enter
        gsap.fromTo(
          card,
          { y: 80, rotate: 3, scale: 0.9, filter: 'blur(4px)', autoAlpha: 0.35 },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
            autoAlpha: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scroller,
              start: 'left 105%',
              end: 'left 55%',
              scrub: true,
            },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="section--dark cscroll" id="work" aria-labelledby="cscroll-title">
      <div className="cscroll__pin">
        <div className="cscroll__inner">
          <div className="cscroll__intro">
            <span className="eyebrow cscroll__eyebrow">Our case studies</span>
            <h2 className="cscroll__title" id="cscroll-title">
              {TITLE.map(({ t, accent }) => (
                <span className="wmask" key={t}>
                  <span className={`wmask__in ${accent ? 'text-accent' : ''}`}>{t}</span>
                </span>
              ))}
            </h2>
            <p className="cscroll__desc">
              A selection of products we have designed, engineered and scaled with our partners.
            </p>
            <div className="cscroll__cta">
              <Button href="/case-studies" variant="outline">
                View All Projects
              </Button>
            </div>
            <div className="cscroll__meter" aria-hidden="true">
              <span className="cscroll__count">
                <span className="cscroll__current">01</span> / {total}
              </span>
              <span className="cscroll__rail">
                <span className="cscroll__bar" />
              </span>
            </div>
          </div>

          <div className="cscroll__viewport">
            <ul className="cscroll__track">
              {items.map((item, i) => (
                <li key={item.slug} className="cscard">
                  <Link to={`/case-studies/${item.slug}`} className="cscard__link">
                    <span className="cscard__media">
                      <img src={item.image} alt={`${item.name} project preview`} loading="lazy" decoding="async" />
                      <span className="cscard__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cscard__metric">
                        <strong>{item.metric.value}</strong> {item.metric.label}
                      </span>
                    </span>
                    <span className="cscard__body">
                      <span className="cscard__text">
                        <h3 className="cscard__title">{item.name}</h3>
                        <span className="cscard__industry">{item.industry}</span>
                      </span>
                      <span className="cscard__arrow" aria-hidden="true">
                        <ArrowUpRight size={18} />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
