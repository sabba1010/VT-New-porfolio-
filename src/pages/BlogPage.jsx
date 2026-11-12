import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/page/PageHero';
import PostCard from '../components/page/PostCard';
import CTABanner from '../components/page/CTABanner';
import { posts } from '../data/blog';

export default function BlogPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get('category') || 'All';
  const categories = ['All', ...new Set(posts.map((p) => p.category))];
  const list = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Blog' }]}
        eyebrow="Blog & insights"
        title={
          <>
            Insights from the <span className="text-gradient">Velotech</span> team
          </>
        }
        desc="Practical ideas on building digital products — from strategy and design to AI and cloud engineering."
      />
      <section className="section">
        <div className="container">
          <div className="chips" role="tablist" aria-label="Filter by category" style={{ marginBottom: 'var(--sp-7)' }}>
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                className={`chip ${active === c ? 'is-active' : ''}`}
                onClick={() => setParams(c === 'All' ? {} : { category: c }, { replace: true })}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="fgrid" key={active}>
            {list.map((p, i) => (
              <PostCard key={p.slug} post={p} delay={(i % 3) * 90} />
            ))}
          </div>
          {list.length === 0 && <p className="empty">No articles in this category yet.</p>}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
