import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Clock, MessageCircle, CalendarDays, ShieldCheck, BadgeCheck } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/page/ContactForm';
import LocalTime from '../components/ui/LocalTime';
import FAQ from '../sections/FAQ';
import { company, locations, telHref, whatsappHref } from '../data/content';
import { site } from '../data/site';
import './contact.css';

const NEXT_STEPS = [
  { title: 'We reply within one business day', desc: 'With a few questions or a first idea of how we would approach it.' },
  { title: 'A free 30-minute call', desc: 'We dig into your goals, users and timeline — no obligation.' },
  { title: 'A clear proposal', desc: 'Scope, timeline and cost in writing, so you can decide with confidence.' },
];

// ?topic=ai-audit (from the "Book a free AI audit" buttons) pre-fills the form
const TOPICS = { 'ai-audit': 'Free 30-minute AI automation audit' };

export default function ContactPage() {
  // read after mount so the prerendered HTML and first client render match
  const [topic, setTopic] = useState();
  useEffect(() => {
    setTopic(TOPICS[new URLSearchParams(window.location.search).get('topic')]);
  }, []);
  const ext = { target: '_blank', rel: 'noopener noreferrer' };
  // Only channels you've actually filled in (src/data/content.js → company) are shown.
  const info = [
    company.bookingUrl && {
      icon: CalendarDays,
      title: 'Book a free 30-min call',
      body: <a href={company.bookingUrl} {...ext}>Pick a time that suits your time zone</a>,
    },
    { icon: Mail, title: 'Email us', body: <a href={`mailto:${company.email}`}>{company.email}</a> },
    company.whatsapp && {
      icon: MessageCircle,
      title: 'WhatsApp',
      body: <a href={whatsappHref()} {...ext}>Chat with us instantly</a>,
    },
    company.phone && { icon: Phone, title: 'Call us', body: <a href={telHref(company.phone)}>{company.phone}</a> },
    company.address && { icon: MapPin, title: 'Head office', body: <p>{company.address}</p> },
    // reply time is covered in "What happens next"; show office hours only if set
    company.hours && { icon: Clock, title: 'Working hours', body: <p>{company.hours}</p> },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact Us' }]}
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-gradient">extraordinary</span>
          </>
        }
        desc="Tell us about your idea, product or team needs. We'll reply within one business day with next steps and a free consultation."
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-aside">
            <span className="contact-aside__glow" aria-hidden="true" />
            <span className="eyebrow">Get in touch</span>
            <h2 className="contact-aside__title">
              Tell us what you want to <span className="text-gradient">build</span>
            </h2>
            <p className="contact-aside__lead">
              Share a few details about your project. We read every message and reply personally.
            </p>

            <ul className="contact-aside__channels">
              {info.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <span className="contact-aside__icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <span className="contact-aside__label">{title}</span>
                    {body}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-aside__next">
              <h3>What happens next</h3>
              <ol>
                {NEXT_STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span className="contact-aside__step">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <span>{s.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="contact-aside__trust">
              <li>
                <ShieldCheck size={15} /> NDA on request
              </li>
              <li>
                <BadgeCheck size={15} /> You own 100% of the code
              </li>
            </ul>
          </Reveal>
          <Reveal delay={100} className="side-card side-card--form contact-form-card" id="contact">
            <ContactForm
              key={topic ?? "general"}
              idPrefix="contact"
              title={topic ? "Book your free AI audit" : "Send us a message"}
              topic={topic}
              submitLabel={topic ? "Request My Free Audit" : "Send Message"}
            />
          </Reveal>
        </div>
      </section>

      {/* office list — hidden until site.proof.offices is switched on */}
      {site.proof?.offices && (
      <section className="section section--cream">
        <div className="container">
          <SectionHeading eyebrow="Our offices" title="Find us around the world" desc="Teams in six countries — so there is always someone online in your working hours." align="center" />
          <ul className="fgrid">
            {locations.map((l, i) => (
              <Reveal as="li" key={l.code} delay={(i % 3) * 80} className="info-card">
                <span className="info-card__icon" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                  {l.code}
                </span>
                <div>
                  <h3>
                    {l.city}, {l.country}
                  </h3>
                  <p>{l.role}</p>
                  <LocalTime tz={l.tz} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      )}

      <FAQ tone="light" />
    </>
  );
}
