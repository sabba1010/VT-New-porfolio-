import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import SmartImage from '../components/ui/SmartImage';
import { CaseCard } from '../sections/CaseStudies';
import FAQ from '../sections/FAQ';
import Engagements from '../sections/Engagements';
import { getService, services, caseStudies, approach } from '../data/content';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;

  const Icon = service.icon;
  // Related work: only case studies that actually list this service — no unrelated fallback
  const related = caseStudies.filter((c) => c.services.some((s) => service.title.includes(s) || s.includes(service.short)));
  const relatedCases = related.slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
        eyebrow={
          <>
            <Icon size={14} /> {service.short}
          </>
        }
        title={service.title}
        desc={service.tagline + ' ' + service.desc}
        actions={
          <>
            <Button href="/contact" size="lg">
              Start Your Project
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              See Our Work
            </Button>
          </>
        }
        aside={<img src={service.image} alt={`${service.title} illustration`} />}
      />

      {/* Overview */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__sticky">
            <span className="eyebrow">Overview</span>
            <h2 className="h2">What we deliver</h2>
            <div className="chips" style={{ marginTop: 'var(--sp-5)' }}>
              {service.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="prose-block">
            {service.overview.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <ul className="checklist" style={{ marginTop: 'var(--sp-6)' }}>
              {service.features.slice(0, 4).map((f) => (
                <li key={f.title}>
                  <Check strokeWidth={3} /> <span>{f.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Platforms (only for services that define them, e.g. CMS) */}
      {service.platforms && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <SectionHeading
              eyebrow="Platforms"
              title="Platforms we work with"
              desc="Certified-level expertise across the CMS and commerce platforms businesses rely on."
            />
            <ul className="fgrid">
              {service.platforms.map((p, i) => (
                <Reveal as="li" key={p.name} delay={(i % 3) * 80} className="fcard platform">
                  <span className="platform__logo">
                    <SmartImage src={p.logo} alt="" fallback={p.name.slice(0, 2)} width="36" height="36" />
                  </span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="Capabilities"
            title={`Our ${service.short} expertise`}
            desc="Everything you need, delivered by one accountable team."
          />
          <ul className="fgrid">
            {service.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * 80} className="fcard">
                <span className="fcard__icon">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Process" title="How we deliver" align="center" />
          <ol className="steps">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 90} className="step">
                <span className="step__num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related work (hidden when no project matches this service) */}
      {relatedCases.length > 0 && (
      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="Related work"
            title={relatedCases[0].sample ? "Example projects" : "Recent projects"}
            action={
              <Button href="/case-studies" variant="outline">
                All Case Studies
              </Button>
            }
          />
          <div className="cases__grid">
            {relatedCases.map((c, i) => (
              <CaseCard key={c.slug} item={c} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Other services */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Explore more" title="Other services" />
          <ul className="fgrid fgrid--4">
            {services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 80} className="fcard">
                  <span className="fcard__icon">
                    <s.icon size={22} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to={`/services/${s.slug}`} className="fcard__link">
                    Learn more <ArrowRight size={16} />
                  </Link>
                </Reveal>
              ))}
          </ul>
        </div>
      </section>

      {/* engagement models on the AI services (our core offer) */}
      {service.group === 'ai' && <Engagements />}
      <FAQ />
      <CTABanner />
    </>
  );
}
