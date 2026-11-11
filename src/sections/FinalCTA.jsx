import { CalendarCheck, Mail, Phone } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import ContactForm from '../components/page/ContactForm';
import { company } from '../data/content';
import './FinalCTA.css';

export default function FinalCTA({
  eyebrow = "Let's work together",
  title = (
    <>
      Have an Idea? Let&apos;s Build Something <span className="text-gradient">Extraordinary.</span>
    </>
  ),
  desc = "Tell us about your product and goals. We'll get back within one business day with next steps and a free consultation.",
  headingLevel: H = 'h2',
}) {
  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <div className="cta__bg" aria-hidden="true">
        <span className="cta__orb cta__orb--1" />
        <span className="cta__orb cta__orb--2" />
        <span className="cta__grid" />
      </div>

      <div className="container cta__inner">
        <Reveal className="cta__text">
          <span className="eyebrow">{eyebrow}</span>
          <H id="cta-title" className="cta__title">
            {title}
          </H>
          <p className="cta__desc">{desc}</p>
          <div className="cta__actions">
            <Button href={`mailto:${company.email}`} size="lg">
              Book a Free Consultation
            </Button>
          </div>
          <ul className="cta__contacts">
            <li>
              <span>
                <Mail size={18} />
              </span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <span>
                <Phone size={18} />
              </span>
              <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>{company.phone}</a>
            </li>
            <li>
              <span>
                <CalendarCheck size={18} />
              </span>
              Response within 24 hours
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120} className="cta__card">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
