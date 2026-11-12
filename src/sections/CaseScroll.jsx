import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { caseStudies } from '../data/content';
import './CaseScroll.css';

/**
 * Pinned horizontal-scroll showcase (home page).
 * The section sticks to the viewport while vertical scrolling slides the
 * cards in from the right. On tablets/phones or with reduced motion it
 * falls back to a normal swipeable row.
 */
export default function CaseScroll({ limit = 6 }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const items = caseStudies.slice(0, limit);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

    const mq = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    let distance = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      track.style.transform = `translate3d(${(-distance * progress).toFixed(1)}px, 0, 0)`;
      section.style.setProperty('--cs-progress', progress.toFixed(4));
    };

    const measure = () => {
      if (!mq.matches) {
        section.style.height = '';
        track.style.transform = '';
        return;
      }
      // how far the track must travel so the last card ends at the right edge
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = `${window.innerHeight + distance}px`;
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    mq.addEventListener?.('change', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      mq.removeEventListener?.('change', measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section--dark cscroll" id="work" aria-labelledby="cscroll-title">
      <div className="cscroll__sticky">
        <div className="cscroll__inner">
          <div className="cscroll__intro">
            <span className="eyebrow">Our case studies</span>
            <h2 className="cscroll__title" id="cscroll-title">
              Real projects. <span className="text-accent">Measurable</span> results.
            </h2>
            <p className="cscroll__desc">
              A selection of products we have designed, engineered and scaled with our partners.
            </p>
            <Button href="/case-studies" variant="outline">
              View All Projects
            </Button>
            <div className="cscroll__progress" aria-hidden="true">
              <span />
            </div>
          </div>

          <div ref={viewportRef} className="cscroll__viewport">
            <ul ref={trackRef} className="cscroll__track">
              {items.map((item) => (
                <li key={item.slug} className="cscard">
                  <Link to={`/case-studies/${item.slug}`} className="cscard__link">
                    <span className="cscard__media">
                      <img src={item.image} alt={`${item.name} project preview`} loading="lazy" decoding="async" />
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
