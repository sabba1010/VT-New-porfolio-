import { useState } from 'react';
import { ArrowUp, ArrowRight, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import Logo from '../ui/Logo';
import SocialIcon from '../ui/SocialIcon';
import SmartLink from '../ui/SmartLink';
import { company, services, nav, activeSocials, telHref, whatsappHref } from '../../data/content';
import { submitForm, hasEndpoint } from '../../lib/forms';
import './Footer.css';

const resources = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/contact#faq' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'ok' | 'error'

  const subscribe = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    try {
      await submitForm('newsletter', { email }, { subject: 'Newsletter signup' });
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo light />
            <p>
              Velotech is a software development and AI company. We automate workflows, integrate AI
              into your tools and build custom software that helps businesses worldwide grow.
            </p>
            {activeSocials.length > 0 && (
              <div className="footer__socials">
                {activeSocials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className="footer__col" aria-label="Company">
            <h3>Company</h3>
            <ul>
              {nav.map((n) => (
                <li key={n.label}>
                  <SmartLink href={n.href}>{n.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h3>Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <SmartLink href={`/services/${s.slug}`}>{s.title}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Resources">
            <h3>Resources</h3>
            <ul>
              {resources.map((r) => (
                <li key={r.label}>
                  <SmartLink href={r.href}>{r.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__contact">
            <h3>Get in touch</h3>
            <ul>
              <li>
                <Mail size={16} /> <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              {company.phone && (
                <li>
                  <Phone size={16} /> <a href={telHref(company.phone)}>{company.phone}</a>
                </li>
              )}
              {company.whatsapp && (
                <li>
                  <MessageCircle size={16} />{' '}
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </li>
              )}
              {company.address && (
                <li>
                  <MapPin size={16} /> <span>{company.address}</span>
                </li>
              )}
            </ul>

            {hasEndpoint('newsletter') && (
            <form className="newsletter" onSubmit={subscribe} noValidate>
              <label htmlFor="newsletter-email">Subscribe to our newsletter</label>
              <div className="newsletter__field">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus(null);
                  }}
                  aria-invalid={status === 'error'}
                  aria-describedby="newsletter-msg"
                />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </div>
              <p id="newsletter-msg" className={`newsletter__msg ${status ?? ''}`} aria-live="polite">
                {status === 'ok' && 'Thanks for subscribing!'}
                {status === 'error' && 'Please enter a valid email address.'}
                {status === 'failed' && 'Something went wrong — please try again.'}
              </p>
            </form>
            )}
          </div>
        </div>

        <div className="footer__word" aria-hidden="true">
          VELOTECH
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Velotech. All rights reserved.</p>
          <ul>
            <li>
              <SmartLink href="/privacy-policy">Privacy Policy</SmartLink>
            </li>
            <li>
              <SmartLink href="/terms">Terms of Service</SmartLink>
            </li>
            <li>
              <SmartLink href="/privacy-policy#cookies">Cookies</SmartLink>
            </li>
          </ul>
          <button type="button" className="footer__top-btn" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
