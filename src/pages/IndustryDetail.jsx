import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { CaseCard } from '../sections/CaseStudies';
import Stats from '../sections/Stats';
import { getIndustry, industries, caseStudies, services } from '../data/content';
import NotFound from './NotFound';

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <NotFound />;

  const related = caseStudies.filter((c) => c.industrySlug === industry.slug);
  const relatedCases = related.length ? related : caseStudies.slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industries', to: '/industries' }, { label: industry.name }]}
        eyebrow={
          <>
            <industry.icon size={14} /> {industry.name}
          </>
        }
        title={
          <>
            {industry.name} <span className="text-gradient">Software Development</span>
          </>
        }
        desc={industry.desc}
        actions={
          <>
            <Button href="/contact" size="lg">
              Talk to an Expert
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              View Case Studies
            </Button>
          </>
        }
        aside={<img src={industry.image} alt={`${industry.name} solutions illustration`} />}
      />

      {/* Challenges */}
      <section className="section">
        <div className="container split">
          <Reveal className="split__sticky">
            <span className="eyebrow">Challenges</span>
            <h2 className="h2">What {industry.name.toLowerCase()} teams face today</h2>
            <p className="lead">
              We have helped organizations overcome these challenges with secure, scalable and user-friendly software.
            </p>
          </Reveal>
          <ul className="fgrid fgrid--2" style={{ gridTemplateColumns: '1fr' }}>
            {industry.challenges.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 90} className="fcard">
                <span className="fcard__icon">
                  <AlertTriangle size={20} />
                </span>
                <h3>{c}</h3>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Solutions */}
      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="Solutions"
            title={`${industry.name} solutions we build`}
            desc="Purpose-built software designed around your users, data and regulations."
          />
          <ul className="fgrid">
            {industry.solutions.map((s, i) => (
              <Reveal as="li" key={s} delay={(i % 3) * 80} className="fcard">
                <span className="fcard__icon">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s}</h3>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Stats />

      {/* Related work */}
      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="Case studies" title={`Our ${industry.name.toLowerCase()} work`} />
          <div className="cases__grid">
            {relatedCases.map((c, i) => (
              <CaseCard key={c.slug} item={c} featured={relatedCases.length === 1} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* Services + other industries */}
      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Services</span>
            <h2 className="h2">How we can help</h2>
            <ul className="link-list side-card" style={{ marginTop: 'var(--sp-5)' }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    {s.title} <ArrowRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">Explore</span>
            <h2 className="h2">Other industries</h2>
            <div className="chips" style={{ marginTop: 'var(--sp-5)' }}>
              {industries
                .filter((i) => i.slug !== industry.slug)
                .map((i) => (
                  <Link key={i.slug} to={`/industries/${i.slug}`} className="chip">
                    <i.icon size={15} /> {i.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
