import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import SocialIcon from '../components/ui/SocialIcon';
import { leaders, jobs } from '../data/content';
import { gsap, MQ_MOTION } from '../lib/motion';
import './Team.css';

/**
 * Leadership team — names, roles, photos and LinkedIn links live in
 * src/data/content.js (leaders). Until a name is filled in, the card
 * uses the role as its title.
 */
export default function Team() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add(MQ_MOTION, () => {
      // cards unveil like a curtain, one after another
      gsap.fromTo(
        q('.tm-card'),
        { clipPath: 'inset(100% 0% 0% 0% round 28px)', y: 60 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: q('.tm-grid')[0], start: 'top 80%', once: true },
        },
      );
      // gentle parallax on each photo while scrolling
      q('.tm-card__photo img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: img.closest('.tm-card'), start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
      gsap.from(q('.tm-join'), {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        scrollTrigger: { trigger: q('.tm-join')[0], start: 'top 90%', once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="tm" id="team" ref={root}>
      <SectionHeading
        eyebrow="Our people"
        title={
          <>
            The people behind <span className="text-accent">the product</span>
          </>
        }
        desc="A senior leadership team that stays hands-on — the people you meet on the first call are the people who ship your product."
        action={
          <Button href="/careers#culture" variant="outline">
            Inside Our Culture
          </Button>
        }
      />

      <ul className="tm-grid">
        {leaders.map((m, i) => (
          <li key={m.role} className="tm-card" style={{ '--i': i }}>
            <div className="tm-card__photo">
              <img src={m.photo} alt={m.name ? `${m.name}, ${m.role}` : m.role} loading="lazy" />
            </div>
            <span className="tm-card__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {m.linkedin && (
              <a
                className="tm-card__social"
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name || m.role} on LinkedIn`}
              >
                <SocialIcon name="linkedin" size={16} />
              </a>
            )}
            <div className="tm-card__info">
              <h3>{m.name || m.role}</h3>
              {m.name && <p className="tm-card__role">{m.role}</p>}
              {m.focus && <p className="tm-card__focus">{m.focus}</p>}
            </div>
          </li>
        ))}
      </ul>

      <Link to="/careers" className="tm-join">
        <span className="tm-join__avatars" aria-hidden="true">
          {leaders.slice(0, 3).map((m) => (
            <img key={m.role} src={m.photo} alt="" />
          ))}
          <span>+</span>
        </span>
        <span className="tm-join__text">
          <strong>Want to build with us?</strong>
          <span>
            {jobs.length > 0 ? `${jobs.length} open roles` : 'We’re always meeting great people'} — see careers at Velotech
          </span>
        </span>
        <span className="tm-join__arrow" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </Link>
    </div>
  );
}
