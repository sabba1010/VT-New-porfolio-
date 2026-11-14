import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { auditHref } from '../../data/content';
import './page.css';

/**
 * Compact dark call-to-action used at the bottom of inner pages.
 * Default offer: a free 30-minute AI audit (goes to your booking link,
 * or the contact form with the topic pre-filled).
 */
export default function CTABanner({
  title = (
    <>
      Not sure where AI fits? <span className="text-gradient">Let&apos;s find out together.</span>
    </>
  ),
  desc = 'Book a free 30-minute AI audit. We’ll look at how your team works today and show you what to automate first — no strings attached.',
  cta = 'Book a Free AI Audit',
  href = auditHref,
}) {
  return (
    <section className="section ctab-wrap">
      <div className="container">
        <Reveal className="ctab">
          <span className="ctab__orb" aria-hidden="true" />
          <div className="ctab__text">
            <h2>{title}</h2>
            <p>{desc}</p>
          </div>
          <div className="ctab__actions">
            <Button href={href} size="lg">
              {cta}
            </Button>
            <Button href="/case-studies" size="lg" variant="ghost">
              See Our Work
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
