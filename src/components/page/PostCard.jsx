import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { formatDate } from '../../data/blog';
import './page.css';

export default function PostCard({ post, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay} className="post-card">
      <Link to={`/blog/${post.slug}`} className="post-card__media" tabIndex={-1} aria-hidden="true">
        <img src={post.cover} alt="" loading="lazy" />
        <span className="post-card__cat">{post.category}</span>
      </Link>
      <div className="post-card__body">
        <p className="post-card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">•</span>
          <Clock size={13} aria-hidden="true" /> {post.readTime}
        </p>
        <h3>
          <Link to={`/blog/${post.slug}`} className="post-card__title">
            {post.title}
          </Link>
        </h3>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <span className="post-card__more" aria-hidden="true">
          Read article <ArrowUpRight size={15} />
        </span>
      </div>
    </Reveal>
  );
}
