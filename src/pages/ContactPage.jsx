import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/page/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import ContactForm from '../components/page/ContactForm';
import FAQ from '../sections/FAQ';
import { company, locations } from '../data/content';

export default function ContactPage() {
  usePageMeta('Contact Us', 'Tell us about your project. Velotech replies within one business day with next steps and a free consultation.');
  const info = [
    { icon: Mail, title: 'Email us', body: <a href={`mailto:${company.email}`}>{company.email}</a> },
    { icon: Phone, title: 'Call us', body: <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>{company.phone}</a> },
    { icon: MapPin, title: 'Head office', body: <p>{company.address}</p> },
    { icon: Clock, title: 'Response time', body: <p>Within one business day</p> },
  ];

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
          <SectionHeading eyebrow="Our offices" title="Find us around the world" align="center" />
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
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FAQ />
    </>
  );
}
