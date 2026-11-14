import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Clock, MapPin } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { jobs, perks } from '../data/careers';
import { culture } from '../data/images';
import { site } from '../data/site';
import { company } from '../data/content';

// Open roles + perks only show once site.proof.hiring is switched on
const hiring = Boolean(site.proof?.hiring);

export function JobRow({ job, delay = 0 }) {
  return (
    <Reveal as="li" delay={delay} className="job">
      <div>
        <h3>
          <Link to={`/careers/${job.slug}`}>{job.title}</Link>
        </h3>
        <p className="job__tags">
          <span>
            <Briefcase size={14} /> {job.team}
          </span>
          <span>
            <MapPin size={14} /> {job.location}
          </span>
          <span>
            <Clock size={14} /> {job.type}
          </span>
        </p>
      </div>
      <span className="job__arrow" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </Reveal>
  );
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers' }]}
        eyebrow="Careers"
        title={
          <>
            Build what&apos;s next <span className="text-gradient">with us</span>
          </>
        }
        desc="Work on meaningful products with a talented, friendly team across six countries. We value craft, curiosity and ownership."
        actions={
          <Button href="#positions" size="lg">
            {hiring ? 'View Open Positions' : 'Get in Touch'}
          </Button>
        }
        aside={<img src={culture[2]} alt="Life at Velotech" />}
      />

      {!hiring && (
        <section className="section" id="positions">
          <div className="container" id="culture">
            <SectionHeading
              eyebrow="Join us"
              title="No open roles right now — but we’d still love to hear from you"
              desc={`We’re always happy to meet great engineers, AI specialists and designers. Send your CV or portfolio to ${company.email} and tell us what you’d love to work on.`}
              action={
                <Button href={`mailto:${company.email}?subject=${encodeURIComponent('Job application')}`} variant="outline">
                  Send Your CV
                </Button>
              }
            />
          </div>
        </section>
      )}

      {hiring && (
      <section className="section" id="culture">
        <div className="container">
          <SectionHeading eyebrow="Life at Velotech" title="Why you'll love working here" />
          <ul className="fgrid">
            {perks.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 80} className="fcard">
                <span className="fcard__icon">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="gallery" style={{ marginTop: 'var(--sp-7)' }}>
            {[culture[3], culture[1], culture[4]].map((src, i) => (
              <img key={i} src={src} alt={`Life at Velotech ${i + 1}`} loading="lazy" />
            ))}
          </Reveal>
        </div>
      </section>
      )}

      {hiring && (
      <section className="section section--cream" id="positions">
        <div className="container">
          <SectionHeading eyebrow="Open positions" title={`${jobs.length} roles open right now`} />
          <ul className="jobs">
            {jobs.map((j, i) => (
              <JobRow key={j.slug} job={j} delay={i * 60} />
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* while not hiring, the "Join us" section above already says this */}
      {hiring && (
        <CTABanner
          title="Don't see the right role?"
          desc="We are always happy to meet talented people. Send us your CV and tell us what you'd love to work on."
          cta="Get in Touch"
        />
      )}
    </>
  );
}
