import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ShieldCheck, Timer } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import Testimonials from '../sections/Testimonials';
import Standards from '../sections/Standards';
import { hireGroups } from '../data/content';
import { engagementModels, hiringSteps } from '../data/hire';
import { team } from '../data/images';

const trust = [
  { icon: ShieldCheck, title: 'Risk-free trial', desc: 'Only continue if you are fully satisfied.' },
  { icon: BadgeCheck, title: 'Pre-vetted experts', desc: 'Senior engineers who passed technical and soft-skill screening.' },
  { icon: Timer, title: 'Start in 2 weeks', desc: 'Interview candidates within 48 hours of your request.' },
];

export function EngagementAndProcess() {
  return (
    <>
      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="Engagement models" title="Flexible ways to work together" align="center" />
          <ul className="fgrid">
            {engagementModels.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 90} className="fcard">
                <span className="fcard__icon">{String(i + 1).padStart(2, '0')}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <p style={{ marginTop: 'var(--sp-4)', fontWeight: 700, color: 'var(--c-text)' }}>Best for: {m.best}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Hiring process" title="Hire in four simple steps" align="center" />
          <ol className="steps">
            {hiringSteps.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 90} className="step">
                <span className="step__num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

export default function HirePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Hire Developers' }]}
        eyebrow="Hire developers"
        title={
          <>
            Hire pre-vetted <span className="text-gradient">senior engineers</span> in two weeks
          </>
        }
        desc="Scale your team with AI, web and mobile specialists who integrate into your workflow — with a risk-free trial period."
        actions={
          <Button href="/contact" size="lg">
            Book a Meeting
          </Button>
        }
        meta={
          <div className="hero__proof" style={{ marginTop: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex' }}>
              {team.slice(0, 5).map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width="44"
                  height="44"
                  style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid var(--c-cream)', marginLeft: i ? -12 : 0, objectFit: 'cover' }}
                />
              ))}
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-text-muted)' }}>
              <strong style={{ color: 'var(--c-text)' }}>60+ engineers</strong> ready to join your team
            </p>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <ul className="fgrid">
            {trust.map(({ icon: Icon, title, desc }, i) => (
              <Reveal as="li" key={title} delay={i * 90} className="fcard">
                <span className="fcard__icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {hireGroups.map((g, gi) => (
        <section key={g.id} className={`section ${gi % 2 === 0 ? 'section--cream' : ''}`} id={g.id}>
          <div className="container">
            <SectionHeading eyebrow={g.label} title={`Hire ${g.label}`} />
            <ul className="fgrid fgrid--4">
              {g.roles.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 80} className="fcard">
                  <span className="fcard__icon">
                    <g.icon size={22} />
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <Link to={`/hire-developers/${r.slug}`} className="fcard__link">
                    View profile <ArrowRight size={16} />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <EngagementAndProcess />
      <Standards tone="cream" />
      <Testimonials />
      <CTABanner title="Ready to scale your engineering team?" cta="Hire Developers" />
    </>
  );
}
