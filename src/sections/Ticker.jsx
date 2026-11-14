import { Link } from 'react-router-dom';
import { aiServices, developmentServices } from '../data/content';
import './Ticker.css';

// AI first, then core software services
const services = [...aiServices, ...developmentServices];

/** Large kinetic text band listing services — links to each service page. */
export default function Ticker() {
  const items = [...services, ...services];
  return (
    <section className="ticker" aria-label="Our services">
      <div className="ticker__track">
        {items.map((s, i) => (
          <Link
            key={i}
            to={`/services/${s.slug}`}
            className={`ticker__item ${i % 2 ? 'is-outline' : ''}`}
            aria-hidden={i >= services.length}
            tabIndex={i >= services.length ? -1 : undefined}
          >
            {s.short}
            <svg className="ticker__star" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
