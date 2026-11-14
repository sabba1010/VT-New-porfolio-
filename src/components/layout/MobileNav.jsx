import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { nav, services, hireDevelopers, companyLinks, company, activeSocials } from '../../data/content';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import SocialIcon from '../ui/SocialIcon';
import SmartLink from '../ui/SmartLink';

const subLinks = {
  services: [
    { label: 'All Services', href: '/services' },
    ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  ],
  hire: [
    { label: 'All Roles', href: '/hire-developers' },
    ...hireDevelopers.flatMap((g) => g.roles.map((r) => ({ label: r.title, href: `/hire-developers/${r.slug}` }))),
  ],
  company: companyLinks.map((c) => ({ label: c.title, href: c.href })),
};

export default function MobileNav({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector('button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open, onClose]);

  return (
    <div className={`mnav ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open ? true : undefined}>
      <div className="mnav__scrim" onClick={onClose} />
      <div
        className="mnav__panel"
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        ref={panelRef}
      >
        <div className="mnav__top">
          <Logo />
          <button className="mnav__close" aria-label="Close menu" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <ul className="mnav__list">
          {nav.map((item) => {
            if (!item.mega) {
              return (
                <li key={item.label}>
                  <SmartLink href={item.href} className="mnav__link" onClick={onClose}>
                    {item.label}
                  </SmartLink>
                </li>
              );
            }
            const isOpen = expanded === item.mega;
            return (
              <li key={item.label}>
                <button
                  className={`mnav__link ${isOpen ? 'is-open' : ''}`}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.mega)}
                >
                  {item.label}
                  <ChevronDown size={18} className="mnav__chev" />
                </button>
                <div className={`mnav__sub ${isOpen ? 'is-open' : ''}`}>
                  <ul>
                    {subLinks[item.mega].map((s) => (
                      <li key={s.label}>
                        <SmartLink href={s.href} onClick={onClose} tabIndex={isOpen ? 0 : -1}>
                          {s.label}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mnav__bottom">
          <Button href="/contact" onClick={onClose} className="mnav__cta">
            Get Started
          </Button>
          <p className="mnav__mail">{company.email}</p>
          {activeSocials.length > 0 && (
          <div className="mnav__socials">
            {activeSocials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
