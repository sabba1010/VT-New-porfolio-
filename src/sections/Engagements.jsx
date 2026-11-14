import { Check } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { engagements, auditHref } from '../data/content';
import './Engagements.css';

/** "Ways to work with us" — engagement models with optional prices (content.js → engagements). */
export default function Engagements({ tone = 'light' }) {
  return (
    <section className={`section engage ${tone === 'dark' ? 'section--dark' : ''}`} id="pricing" aria-labelledby="engage-title">
      <div className="container">
        <SectionHeading
          id="engage-title"
          eyebrow="Ways to work with us"
          title={
            <>
              Start small. <span className="text-accent">Scale what works.</span>
            </>
          }
          desc="Every engagement starts with a free audit, so you know what you’re getting before you spend anything."
          align="center"
        />
        <ul className="engage__grid">
          {engagements.map((e, i) => (
            <Reveal as="li" key={e.id} delay={i * 80} className={`engage__card ${e.featured ? 'is-featured' : ''}`}>
              {e.badge && <span className="engage__badge">{e.badge}</span>}
              <h3 className="engage__name">{e.name}</h3>
              <p className="engage__price">{e.price || e.fallback}</p>
              <p className="engage__term">{e.term}</p>
              <p className="engage__desc">{e.desc}</p>
              <ul className="engage__points">
                {e.points.map((pt) => (
                  <li key={pt}>
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Button
                href={e.href === 'audit' ? auditHref : e.href}
                variant={e.featured ? undefined : 'outline'}
                className="engage__cta"
              >
                {e.cta}
              </Button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
