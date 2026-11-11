import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import './page.css';

/** Compact dark call-to-action used at the bottom of inner pages. */
export default function CTABanner({
  title = (
    <>
      Have an Idea? Let&apos;s Build Something <span className="text-gradient">Extraordinary.</span>
    </>
  ),
  desc = 'Tell us about your goals — we will reply within one business day with next steps and a free consultation.',
  cta = "Let's Talk",
  href = '/contact',
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
