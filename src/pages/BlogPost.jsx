import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/page/PageHero';
import PostCard from '../components/page/PostCard';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import { getPost, posts, formatDate } from '../data/blog';
import NotFound from './NotFound';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'list':
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case 'quote':
      return <blockquote>{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  usePageMeta(post?.title, post?.excerpt);
  if (!post) return <NotFound />;

  const idx = posts.indexOf(post);
  const prev = posts[idx - 1];
  const next = posts[idx + 1];
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        center
        crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.category }]}
        eyebrow={post.category}
        title={post.title}
        desc={post.excerpt}
        meta={
          <div className="author" style={{ justifyContent: 'center' }}>
            <img src={post.author.photo} alt="" />
            <div style={{ textAlign: 'left' }}>
              <strong>{post.author.name}</strong>
              <span>
                {post.author.role} · <time dateTime={post.date}>{formatDate(post.date)}</time> ·{' '}
                <Clock size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {post.readTime}
              </span>
            </div>
          </div>
        }
      />
      <section className="section">
        <div className="container">
          <article className="article">
            <img className="article__cover" src={post.cover} alt="" />
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
            <nav className="pager" aria-label="More articles" style={{ marginTop: 'var(--sp-8)' }}>
              {prev ? (
                <Link to={`/blog/${prev.slug}`}>
                  <small>
                    <ArrowLeft size={14} /> Previous
                  </small>
                  <strong>{prev.title}</strong>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link to={`/blog/${next.slug}`}>
                  <small>
                    Next <ArrowRight size={14} />
                  </small>
                  <strong>{next.title}</strong>
                </Link>
              )}
            </nav>
          </article>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="Keep reading" title="Related articles" />
          <div className="fgrid">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
