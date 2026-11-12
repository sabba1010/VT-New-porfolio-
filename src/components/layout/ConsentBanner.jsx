import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../data/site';
import './ConsentBanner.css';

const KEY = 'velotech-consent';

const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

/**
 * GDPR / UK-GDPR cookie consent.
 * Only shown when analytics is enabled in src/data/site.js — the site sets
 * no non-essential cookies otherwise, so no banner is needed.
 */
export default function ConsentBanner() {
  const [choice, setChoice] = useState(null); // resolved after mount (SSR-safe)
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (choice === 'accepted' && site.analytics.enabled) site.analytics.load();
  }, [choice]);

  if (!site.analytics.enabled || !ready || choice) return null;

  const decide = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage blocked — keep choice for this session only */
    }
    setChoice(value);
  };

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <p>
        We use essential cookies to run this site and, with your permission, analytics cookies to understand how it is
        used. See our <Link to="/privacy-policy#cookies">Privacy Policy</Link>.
      </p>
      <div className="consent__actions">
        <button type="button" className="consent__btn" onClick={() => decide('rejected')}>
          Reject non-essential
        </button>
        <button type="button" className="consent__btn consent__btn--primary" onClick={() => decide('accepted')}>
          Accept all
        </button>
      </div>
    </div>
  );
}
