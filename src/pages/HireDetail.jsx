import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import CTABanner from '../components/page/CTABanner';
import ContactForm from '../components/page/ContactForm';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { EngagementAndProcess } from './HirePage';
import { getRole, hireRoles } from '../data/content';
import NotFound from './NotFound';

const benefits = [
  'Senior engineers with 5+ years of average experience',
  'Overlap with your working hours for real-time collaboration',
  'Dedicated delivery lead and weekly progress reports',
  'Full IP ownership and NDA from day one',
  'Replace or scale team members anytime',
  'Transparent monthly pricing, no hidden fees',
];

export default function HireDetail() {
  const { slug } = useParams();
  const role = getRole(slug);
  if (!role) return <NotFound />;

  const siblings = hireRoles.filter((r) => r.groupId === role.groupId);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Hire Developers', to: '/hire-developers' }, { label: role.title }]}
        eyebrow={
          <>
            <role.icon size={14} /> {role.group}
          </>
        }
        title={
          <>
            Hire <span className="text-gradient">{role.title}</span>
          </>
        }
        desc={`${role.desc}. Get matched with pre-vetted ${role.title.toLowerCase()} who can join your team within two weeks — with a risk-free trial.`}
        actions={
          <>
            <Button href="#hire-form" size="lg">
              Hire Now
            </Button>
            <Button href="/case-studies" size="lg" variant="outline">
              See Our Work
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container split">
          <div>
            <Reveal>
              <span className="eyebrow">Skills</span>
              <h2 className="h2">Core expertise</h2>
              <div className="chips" style={{ marginTop: 'var(--sp-5)' }}>
                {role.skills.map((s) => (
                  <span key={s} className="chip">
                    <Check size={14} strokeWidth={3} /> {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80} style={{ marginTop: 'var(--sp-7)' }}>
              <span className="eyebrow">Why Velotech</span>
              <h2 className="h2">Why hire with us</h2>
              <ul className="checklist" style={{ marginTop: 'var(--sp-5)' }}>
                {benefits.map((b) => (
                  <li key={b}>
                    <Check strokeWidth={3} /> <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} style={{ marginTop: 'var(--sp-7)' }}>
              <div className="side-card">
                <h3>More {role.group.toLowerCase()}</h3>
                <ul className="link-list">
                  {siblings.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/hire-developers/${r.slug}`} className={r.slug === role.slug ? 'is-active' : ''}>
                        {r.title} <ArrowRight size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="split__sticky side-card side-card--form" id="hire-form">
            <ContactForm
              idPrefix="hire"
              title={`Hire ${role.title}`}
              topic={role.title}
              topicLabel="Role"
              submitLabel="Request Candidates"
            />
          </Reveal>
        </div>
      </section>

      <EngagementAndProcess />
      <CTABanner title={`Build faster with Velotech ${role.title}`} cta="Get Started" />
    </>
  );
}
