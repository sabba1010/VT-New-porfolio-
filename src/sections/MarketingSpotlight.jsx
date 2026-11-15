import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, MessageCircle, Send, Play, Volume2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { marketingServices, auditHref } from '../data/content';
import './MarketingSpotlight.css';

// Three example "creator" videos shown in the phone mockups (illustrative UI, not real stats)
const REELS = [
  { tone: 'a', handle: '@everyday.sara', caption: 'Okay this actually changed my morning routine 😳', tag: 'Product demo', cta: 'Shop now' },
  { tone: 'b', handle: '@tech.with.rafi', caption: 'Unboxing the app everyone keeps asking about…', tag: 'Unboxing', cta: 'Learn more' },
  { tone: 'c', handle: '@mila.reviews', caption: 'Honest review after 30 days — worth it?', tag: 'Testimonial', cta: 'Try it free' },
];

function Phone({ reel, i }) {
  return (
    <div className={`mk-phone mk-phone--${reel.tone}`} style={{ '--i': i }} aria-hidden="true">
      <div className="mk-phone__screen">
        <span className="mk-phone__notch" />
        <span className="mk-phone__tag">{reel.tag}</span>
        <span className="mk-phone__sound">
          <Volume2 size={13} />
        </span>
        <span className="mk-phone__play">
          <Play size={22} fill="currentColor" />
        </span>
        <div className="mk-phone__rail">
          <span>
            <Heart size={18} fill="currentColor" />
          </span>
          <span>
            <MessageCircle size={18} />
          </span>
          <span>
            <Send size={17} />
          </span>
        </div>
        <div className="mk-phone__meta">
          <span className="mk-phone__user">
            <i />
            {reel.handle}
          </span>
          <p>{reel.caption}</p>
          <span className="mk-phone__cta">{reel.cta}</span>
        </div>
        <span className="mk-phone__progress">
          <i />
        </span>
      </div>
    </div>
  );
}

/** Home: UGC videos, paid ads and digital marketing — the growth side of the team. */
export default function MarketingSpotlight() {
  return (
    <section className="section section--dark mk" id="marketing" aria-labelledby="mk-title">
      <span className="mk__glow" aria-hidden="true" />
      <div className="container mk__grid">
        <div className="mk__text">
          <SectionHeading
            id="mk-title"
            eyebrow="Growth & marketing team"
            title={
              <>
                We build it. <span className="text-accent">Then we help it sell.</span>
              </>
            }
            desc="Our in-house marketing team creates UGC videos, runs your ads and manages your digital marketing — working side by side with the engineers who built your product."
          />

          <ul className="mk__list">
            {marketingServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.slug} delay={i * 90}>
                  <Link to={`/services/${s.slug}`} className="mk-card">
                    <span className="mk-card__icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="mk-card__body">
                      <strong>{s.title}</strong>
                      <span>{s.desc}</span>
                    </span>
                    <ArrowUpRight size={18} className="mk-card__arrow" aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mk__actions" delay={200}>
            <Button href={auditHref}>Plan My Growth</Button>
            <Button href="/services/ugc-video-production" variant="outline">
              See UGC Services
            </Button>
          </Reveal>
        </div>

        <div className="mk__stage">
          {REELS.map((r, i) => (
            <Phone key={r.handle} reel={r} i={i} />
          ))}
          <span className="mk__badge mk__badge--1">🎬 Scripts & hooks</span>
          <span className="mk__badge mk__badge--2">📈 Ads that convert</span>
        </div>
      </div>
    </section>
  );
}
