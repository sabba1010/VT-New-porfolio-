import { Link } from 'react-router-dom';
import './Ticker.css';

// Development-focused labels for the scrolling band — each links to its service page.
// Edit freely: `label` is what scrolls, `slug` is the /services/<slug> page it opens.
const items = [
  { label: 'Web Development', slug: 'web-development' },
  { label: 'Custom Web Development', slug: 'web-development' },
  { label: 'Web App Development', slug: 'web-development' },
  { label: 'Mobile App Development', slug: 'mobile-app-development' },
  { label: 'Custom Software Development', slug: 'custom-software-development' },
  { label: 'E-commerce Development', slug: 'ecommerce-development' },
  { label: 'CMS Development', slug: 'cms-development' },
  { label: 'AI Development', slug: 'ai-development' },
  { label: 'UI/UX Design', slug: 'ui-ux-design' },
];

/** Large kinetic text band listing development services. */
export default function Ticker() {
  const loop = [...items, ...items]; // doubled for a seamless marquee
  return (
    <section className="ticker" aria-label="Our development services">
      <div className="ticker__track">
        {loop.map((s, i) => (
          <Link
            key={i}
            to={`/services/${s.slug}`}
            className={`ticker__item ${i % 2 ? 'is-outline' : ''}`}
            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : undefined}
          >
            {s.label}
            <svg className="ticker__star" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
