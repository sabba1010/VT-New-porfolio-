import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { services } from '../data/content';
import './Services.css';

const filters = [
  { id: 'all', label: 'All Services' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
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
            eyebrow="What we do"
            title={
              <>
                Engineering future-ready <span className="text-accent">digital products</span>
              </>
            }
            action={
              <Button href="/services" variant="outline">
                All Services
              </Button>
            }
          />
          <ul className="svc-tiles">
            {services.map((s, i) => (
              <ServiceTile key={s.slug} service={s} index={i} />
            ))}
          </ul>
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
              Engineering future-ready <span className="text-accent">digital products</span>
            </>
          }
          desc="End-to-end design and engineering services to take your product from first sketch to global scale."
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
