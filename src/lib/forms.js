import { site } from '../data/site';
import { company } from '../data/content';

/**
 * Sends a form as JSON to the endpoint configured in `site.forms[kind]`.
 * Resolves to 'sent' or 'mailto' (no endpoint set → opens the visitor's
 * email app with the message pre-filled). Throws on network/server errors.
 */
export async function submitForm(kind, data, { subject = 'New enquiry', body } = {}) {
  const endpoint = site.forms?.[kind];
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, _subject: subject }),
    });
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
    return 'sent';
  }
  const text = body ?? Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  return 'mailto';
}

export const hasEndpoint = (kind) => Boolean(site.forms?.[kind]);
