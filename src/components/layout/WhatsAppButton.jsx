import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CalendarCheck, Mail } from 'lucide-react';
import { company, whatsappHref, auditHref } from '../../data/content';
import { team } from '../../data/images';
import './WhatsAppButton.css';

// Who visitors see on the button — swap the photo for a real one when you have it.
const AGENT = { photo: team[0], label: 'Discuss Your Project' };
const MESSAGE = 'Hello Team Velotech! I would like to discuss a project.';

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="#25D366"
        d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3z"
      />
      <path
        fill="#fff"
        d="M22.6 18.9c-.4-.2-2.1-1-2.4-1.1-.3-.1-.6-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7l-1.1-2.6c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.6 5.8 5 2.8 1.1 3.4.9 4 .8.6-.1 2.1-.8 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.1-.3-.2-.7-.4z"
      />
    </svg>
  );
}

/**
 * Floating "Discuss Your Project" pill → opens WhatsApp with a ready message.
 * The chevron opens a small menu with other ways to get in touch.
 * Shows only when company.whatsapp is set (src/data/content.js).
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const href = whatsappHref(MESSAGE);

  // slide in shortly after load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  // close the menu on outside click / Escape
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!href) return null;

  return (
    <div ref={ref} className={`wab ${visible ? 'is-visible' : ''} ${open ? 'is-open' : ''}`}>
      {open && (
        <div className="wab__menu" role="menu" aria-label="Contact options">
          <a role="menuitem" href={href} target="_blank" rel="noopener noreferrer" className="wab__item" onClick={() => setOpen(false)}>
            <span className="wab__item-icon wab__item-icon--wa">
              <WhatsAppIcon size={18} />
            </span>
            <span>
              <strong>Chat on WhatsApp</strong>
              <small>Usually replies within minutes</small>
            </span>
          </a>
          <Link role="menuitem" to={auditHref} className="wab__item" onClick={() => setOpen(false)}>
            <span className="wab__item-icon">
              <CalendarCheck size={17} />
            </span>
            <span>
              <strong>Book a free AI audit</strong>
              <small>30-minute call, no obligation</small>
            </span>
          </Link>
          <a role="menuitem" href={`mailto:${company.email}`} className="wab__item" onClick={() => setOpen(false)}>
            <span className="wab__item-icon">
              <Mail size={17} />
            </span>
            <span>
              <strong>Email us</strong>
              <small>{company.email}</small>
            </span>
          </a>
        </div>
      )}

      <div className="wab__pill">
        <a href={href} target="_blank" rel="noopener noreferrer" className="wab__main" aria-label="Discuss your project on WhatsApp">
          <span className="wab__avatar">
            <img src={AGENT.photo} alt="" width="34" height="34" />
            <i aria-hidden="true" />
          </span>
          <span className="wab__label">{AGENT.label}</span>
        </a>
        <span className="wab__divider" aria-hidden="true" />
        <button
          type="button"
          className="wab__toggle"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={open ? 'Hide contact options' : 'More ways to contact us'}
          onClick={() => setOpen((o) => !o)}
        >
          <WhatsAppIcon size={20} />
          <ChevronDown size={15} className="wab__chev" />
        </button>
      </div>
    </div>
  );
}
