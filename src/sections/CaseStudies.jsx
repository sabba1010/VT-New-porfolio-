import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { caseStudies } from '../data/content';
import './CaseStudies.css';

export function CaseCard({ item, featured, delay }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--cx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--cy', `${e.clientY - r.top}px`);
  };
  return (
    <Reveal as="article" delay={delay} className={`case ${featured ? 'case--featured' : ''}`}>
      <Link to={`/case-studies/${item.slug}`} className="case__media" onPointerMove={onMove} aria-label={`View case study: ${item.name}`}>
        <img src={item.image} alt={`${item.name} project preview`} loading="lazy" />
        <span className="case__badge">{item.industry}</span>
        <span className="case__metric">
          <strong>{item.metric.value}</strong> {item.metric.label}
        </span>
        <span className="case__cursor" aria-hidden="true">
          View <ArrowUpRight size={16} />
        </span>
      </Link>
      <div className="case__body">
        <div className="case__meta">
          {item.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h3 className="case__title">{item.name}</h3>
        <p className="case__desc">{item.desc}</p>
        <Link to={`/case-studies/${item.slug}`} className="case__link">
          View Case Study
          <span>
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </Reveal>
  );
}

export default function CaseStudies({ limit = 5 }) {
  const [first, ...rest] = caseStudies.slice(0, limit);
  return (
    <section className="section cases" id="work" aria-labelledby="cases-title">
      <div className="container">
        <SectionHeading
          id="cases-title"
          eyebrow="Case studies"
          title={
            <>
              Real projects. <span className="text-accent">Measurable</span> results.
            </>
          }
          desc="A selection of products we have designed, engineered and scaled with our partners. (Sample projects — replace with your own.)"
          action={
            <Button href="/case-studies" variant="outline">
              View All Projects
            </Button>
          }
        />
        <div className="cases__grid">
          <CaseCard item={first} featured />
          {rest.map((item, i) => (
            <CaseCard key={item.name} item={item} delay={(i % 2) * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
