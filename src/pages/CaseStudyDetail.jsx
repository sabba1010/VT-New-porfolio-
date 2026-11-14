import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { CaseCard } from '../sections/CaseStudies';
import { getCaseStudy, caseStudies } from '../data/content';
import NotFound from './NotFound';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const cs = getCaseStudy(slug);
  if (!cs) return <NotFound />;

  const idx = caseStudies.indexOf(cs);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const more = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Case Studies', to: '/case-studies' }, { label: cs.name }]}
        eyebrow={cs.industry}
        title={cs.name}
        desc={cs.desc}
        meta={
          <dl className="meta-strip">
            <div>
              <dt>Client</dt>
              <dd>{cs.client}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>
                <Link to={`/case-studies?industry=${cs.industrySlug}`}>{cs.industry}</Link>
              </dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{cs.duration}</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>{cs.team}</dd>
            </div>
          </dl>
        }
      />

      <section className="section" style={{ paddingTop: 0, marginTop: 'calc(var(--sp-8) * -0.5)' }}>
        <div className="container">
          <Reveal>
            <img
              src={cs.image}
              alt={`${cs.name} product screens`}
              style={{ width: '100%', borderRadius: 'var(--r-2xl)', boxShadow: 'var(--shadow-lg)', aspectRatio: '16 / 8', objectFit: 'cover' }}
            />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <Reveal className="split__sticky">
            <span className="eyebrow">Services</span>
            <div className="chips" style={{ marginTop: 'var(--sp-4)' }}>
              {cs.services.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            <span className="eyebrow" style={{ marginTop: 'var(--sp-6)' }}>
              Tech stack
            </span>
            <div className="chips" style={{ marginTop: 'var(--sp-4)' }}>
              {cs.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="h2" style={{ marginTop: 0 }}>
                The challenge
              </h2>
              <p className="lead">{cs.challenge}</p>
            </Reveal>
            <Reveal delay={80} style={{ marginTop: 'var(--sp-7)' }}>
              <h2 className="h2" style={{ marginTop: 0 }}>
                Our solution
              </h2>
              <p className="lead">{cs.solution}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="Results" title="The impact" align="center" />
          <ul className="results">
            {cs.results.map((r, i) => (
              <Reveal as="li" key={r.label} delay={i * 100} className="result">
                <strong>{r.value}</strong>
                <span>{r.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Gallery" title="Inside the product" />
          <Reveal className="gallery">
            {cs.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${cs.name} screen ${i + 1}`} loading="lazy" />
            ))}
          </Reveal>
          <nav className="pager" aria-label="More case studies" style={{ marginTop: 'var(--section-y)' }}>
            <Link to={`/case-studies/${prev.slug}`}>
              <small>
                <ArrowLeft size={14} /> Previous
              </small>
              <strong>{prev.name}</strong>
            </Link>
            <Link to={`/case-studies/${next.slug}`}>
              <small>
                Next <ArrowRight size={14} />
              </small>
              <strong>{next.name}</strong>
            </Link>
          </nav>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="More work"
            title="Related case studies"
            action={
              <Button href="/case-studies" variant="outline">
                All Case Studies
              </Button>
            }
          />
          <div className="cases__grid">
            {more.map((c, i) => (
              <CaseCard key={c.slug} item={c} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Want results like these?" />
    </>
  );
}
