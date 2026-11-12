import { Mail, MapPin, Phone, Clock, MessageCircle, CalendarDays } from 'lucide-react';
import PageHero from '../components/page/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/page/ContactForm';
import LocalTime from '../components/ui/LocalTime';
import FAQ from '../sections/FAQ';
import { company, locations, telHref, whatsappHref } from '../data/content';

export default function ContactPage() {
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
    {
      icon: Clock,
      title: 'Response time',
      body: <p>Within one business day{company.hours ? ` · ${company.hours}` : ''}</p>,
    },
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
        <div className="container split">
          <div>
            <ul className="fgrid fgrid--2" style={{ gridTemplateColumns: '1fr' }}>
              {info.map(({ icon: Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 70} className="info-card">
                  <span className="info-card__icon">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    {body}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={100} className="side-card side-card--form" id="contact">
            <ContactForm idPrefix="contact" title="Send us a message" />
          </Reveal>
        </div>
      </section>

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

      <FAQ tone="light" />
    </>
  );
}
