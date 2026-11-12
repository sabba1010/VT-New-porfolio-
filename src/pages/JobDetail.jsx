import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import ContactForm from '../components/page/ContactForm';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { JobRow } from './CareersPage';
import { getJob, jobs } from '../data/careers';
import NotFound from './NotFound';

export default function JobDetail() {
  const { slug } = useParams();
  const job = getJob(slug);
  if (!job) return <NotFound />;

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers', to: '/careers' }, { label: job.title }]}
        eyebrow={job.team}
        title={job.title}
        desc={job.summary}
        actions={
          <Button href="#apply" size="lg">
            Apply Now
          </Button>
        }
        meta={
          <dl className="meta-strip">
            <div>
              <dt>Team</dt>
              <dd>{job.team}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{job.location}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{job.type}</dd>
            </div>
          </dl>
        }
      />

      <section className="section">
        <div className="container split">
          <div>
            <Reveal>
              <h2 className="h2" style={{ marginTop: 0 }}>
                What you&apos;ll do
              </h2>
              <ul className="checklist" style={{ marginTop: 'var(--sp-5)' }}>
                {job.responsibilities.map((r) => (
                  <li key={r}>
                    <Check strokeWidth={3} /> <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} style={{ marginTop: 'var(--sp-7)' }}>
              <h2 className="h2" style={{ marginTop: 0 }}>
                What we&apos;re looking for
              </h2>
              <ul className="checklist checklist--warn" style={{ marginTop: 'var(--sp-5)' }}>
                {job.requirements.map((r) => (
                  <li key={r}>
                    <Check strokeWidth={3} /> <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={100} className="split__sticky side-card side-card--form" id="apply">
            <ContactForm
              idPrefix="apply"
              title="Apply for this role"
              topic={job.title}
              topicLabel="Position"
              submitLabel="Submit Application"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="Open positions" title="Other roles" />
          <ul className="jobs">
            {jobs
              .filter((j) => j.slug !== job.slug)
              .map((j, i) => (
                <JobRow key={j.slug} job={j} delay={i * 60} />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
