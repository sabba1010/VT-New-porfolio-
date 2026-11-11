import { useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import { CaseCard } from '../sections/CaseStudies';
import Stats from '../sections/Stats';
import { caseStudies } from '../data/content';

export default function CaseStudiesPage() {
  usePageMeta('Case Studies', 'Real projects and measurable results from products designed and engineered by Velotech.');
  // Filter is kept in the URL (?industry=fintech) so filtered views are shareable
  const [params, setParams] = useSearchParams();
  const active = params.get('industry') || 'all';
  const filters = [
    { slug: 'all', name: 'All' },
    ...Array.from(new Map(caseStudies.map((c) => [c.industrySlug, { slug: c.industrySlug, name: c.industry }])).values()),
  ];
  const list = active === 'all' ? caseStudies : caseStudies.filter((c) => c.industrySlug === active);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Case Studies' }]}
        eyebrow="Our work"
        title={
          <>
            Real projects. <span className="text-gradient">Measurable results.</span>
          </>
        }
        desc="Explore how we help startups and enterprises design, build and scale digital products. (Sample projects — replace with your own.)"
      />
      <section className="section">
        <div className="container">
          <div className="chips" role="tablist" aria-label="Filter by industry" style={{ marginBottom: 'var(--sp-7)' }}>
            {filters.map((f) => (
              <button
                key={f.slug}
                role="tab"
                aria-selected={active === f.slug}
                className={`chip ${active === f.slug ? 'is-active' : ''}`}
                onClick={() => setParams(f.slug === 'all' ? {} : { industry: f.slug }, { replace: true })}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="cases__grid" key={active}>
            {list.map((c, i) => (
              <CaseCard key={c.slug} item={c} featured={i === 0 && list.length > 2} delay={(i % 2) * 120} />
            ))}
          </div>
        </div>
      </section>
      <Stats />
      <CTABanner />
    </>
  );
}
