import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { services, developmentServices, designServices } from '../data/content';
import './Services.css';

const filters = [
  { id: 'all', label: 'All Services' },
  { id: 'ai', label: 'AI' },
  { id: 'development', label: 'Development' },
  { id: 'design', label: 'Design' },
];

function ServiceCard({ service, index }) {
  const { title, desc, icon: Icon } = service;
  // Spotlight that follows the cursor
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <Reveal as="li" delay={(index % 4) * 80} className="svc" onPointerMove={onMove}>
      <div className="svc__top">
        <span className="svc__icon">
          <Icon size={26} strokeWidth={1.8} />
        </span>
        <span className="svc__num">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="svc__title">{title}</h3>
      <p className="svc__desc">{desc}</p>
      <Link to={`/services/${service.slug}`} className="svc__link" aria-label={`Explore more about ${title}`}>
        Explore More <ArrowRight size={16} />
      </Link>
    </Reveal>
  );
}

/** Compact tile used on the home page: icon + title + one-line summary. */
function ServiceTile({ service, index }) {
  const { title, desc, icon: Icon } = service;
  return (
    <Reveal as="li" delay={(index % 3) * 60} className="svc-tile">
      <span className="svc-tile__icon">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <span className="svc-tile__body">
        <Link to={`/services/${service.slug}`} className="svc-tile__title">
          {title}
        </Link>
        <span className="svc-tile__desc">{desc}</span>
      </span>
      <ArrowUpRight size={18} className="svc-tile__arrow" aria-hidden="true" />
    </Reveal>
  );
}

export default function Services({ compact = false }) {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? services : services.filter((s) => s.group === filter);

  if (compact) {
    return (
      <section className="section services services--compact" id="services" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            id="services-title"
            eyebrow="Software development"
            title={
              <>
                Full-cycle software, <span className="text-accent">engineered to scale</span>
              </>
            }
            action={
              <Button href="/services" variant="outline">
                All Services
              </Button>
            }
          />
          <ul className="svc-tiles">
            {/* six core services on the home page; the rest are under "All Services" */}
            {developmentServices.slice(0, 6).map((s, i) => (
              <ServiceTile key={s.slug} service={s} index={i} />
            ))}
          </ul>
          <Reveal className="svc-design">
            <p className="svc-design__label">
              <Sparkles size={16} aria-hidden="true" /> Plus an in-house design studio
            </p>
            <ul className="svc-design__list">
              {designServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    {s.short}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title={
            <>
              AI-powered software, <span className="text-accent">end to end</span>
            </>
          }
          desc="AI automation, AI integration and AI for growth — plus web, mobile, e-commerce and custom software development, backed by an in-house design team."
          action={
            <div className="filter" role="tablist" aria-label="Filter services">
              {filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`filter__btn ${filter === f.id ? 'is-active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          }
        />

        <ul className="services__grid" key={filter}>
          {list.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
