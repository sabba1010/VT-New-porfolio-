import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './page.css';

/**
 * Inner-page hero. `crumbs` = [{ label, to? }] (last item is the current page).
 * `aside` renders on the right (image / card); `meta` renders below the actions.
 */
export default function PageHero({ eyebrow, title, desc, crumbs = [], actions, aside, meta, center = false }) {
  return (
    <section className={`phero section--dark ${aside ? 'phero--split' : ''} ${center ? 'phero--center' : ''}`}>
      <div className="phero__bg" aria-hidden="true">
        <span className="phero__grid" />
        <span className="phero__blob" />
      </div>
      <div className="container phero__inner">
        <div className="phero__content">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="crumbs hero-in" style={{ '--d': '0ms' }}>
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.label}>
                    <ChevronRight size={14} aria-hidden="true" />
                    {c.to && i < crumbs.length - 1 ? (
                      <Link to={c.to}>{c.label}</Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && (
            <span className="eyebrow hero-in" style={{ '--d': '60ms' }}>
              {eyebrow}
            </span>
          )}
          <h1 className="phero__title hero-in" style={{ '--d': '120ms' }}>
            {title}
          </h1>
          {desc && (
            <p className="phero__desc hero-in" style={{ '--d': '180ms' }}>
              {desc}
            </p>
          )}
          {actions && (
            <div className="phero__actions hero-in" style={{ '--d': '240ms' }}>
              {actions}
            </div>
          )}
          {meta && (
            <div className="hero-in" style={{ '--d': '300ms' }}>
              {meta}
            </div>
          )}
        </div>
        {aside && (
          <div className="phero__aside hero-in" style={{ '--d': '200ms' }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
