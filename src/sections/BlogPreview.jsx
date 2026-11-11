import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import PostCard from '../components/page/PostCard';
import { posts } from '../data/blog';

export default function BlogPreview() {
  return (
    <section className="section" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <SectionHeading
          id="insights-title"
          eyebrow="Latest insights"
          title={
            <>
              Ideas from our <span className="text-accent">engineering</span> team
            </>
          }
          desc="Practical articles on product, design, AI and engineering — written by the people who build with us."
          action={
            <Button href="/blog" variant="outline">
              View All Articles
            </Button>
          }
        />
        <div className="fgrid">
          {posts.slice(0, 3).map((p, i) => (
            <PostCard key={p.slug} post={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
