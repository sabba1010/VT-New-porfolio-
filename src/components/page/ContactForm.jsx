import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { services, company } from '../../data/content';
import { submitForm } from '../../lib/forms';
import '../../sections/FinalCTA.css';

// Development-first ranges; 'Under $5k' still welcomes smaller design-only jobs.
const budgets = ['Under $5k', '$5k – $15k', '$15k – $50k', '$50k – $100k', '$100k+', 'Not sure yet'];

// Main markets first, then the rest alphabetically. Names are hard-coded
// (not Intl.DisplayNames) so prerendered HTML matches every browser exactly.
const countries = [
  ['US', 'United States'], ['GB', 'United Kingdom'], ['CA', 'Canada'], ['DE', 'Germany'], ['AU', 'Australia'],
  ['AE', 'United Arab Emirates'], ['NL', 'Netherlands'], ['FR', 'France'], ['SE', 'Sweden'], ['SG', 'Singapore'],
  ['AT', 'Austria'], ['BD', 'Bangladesh'], ['BE', 'Belgium'], ['BR', 'Brazil'], ['CN', 'China'], ['CZ', 'Czechia'],
  ['DK', 'Denmark'], ['EG', 'Egypt'], ['FI', 'Finland'], ['GR', 'Greece'], ['HK', 'Hong Kong'], ['IN', 'India'],
  ['IE', 'Ireland'], ['IL', 'Israel'], ['IT', 'Italy'], ['JP', 'Japan'], ['KW', 'Kuwait'], ['MY', 'Malaysia'],
  ['MX', 'Mexico'], ['NZ', 'New Zealand'], ['NG', 'Nigeria'], ['NO', 'Norway'], ['PK', 'Pakistan'], ['PH', 'Philippines'],
  ['PL', 'Poland'], ['PT', 'Portugal'], ['QA', 'Qatar'], ['RO', 'Romania'], ['SA', 'Saudi Arabia'], ['ZA', 'South Africa'],
  ['KR', 'South Korea'], ['ES', 'Spain'], ['CH', 'Switzerland'], ['TH', 'Thailand'], ['TR', 'Türkiye'], ['UA', 'Ukraine'],
].map(([code, name]) => ({ code, name }));

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.';
  if (!v.country) e.country = 'Please select your country.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  if (!v.consent) e.consent = 'Please confirm you agree so we can reply to you.';
  return e;
};

function Field({ label, id, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/**
 * Reusable project-inquiry form.
 * - `topic`: optional preset (e.g. a service title, role, or job) shown as a read-only field.
 * - `idPrefix`: keeps input ids unique when several forms exist in the app.
 */
export default function ContactForm({ title = 'Start your project', topic, topicLabel = 'Regarding', idPrefix = 'cta', submitLabel = 'Send Message' }) {
  const empty = { name: '', email: '', company: '', country: '', service: '', budget: '', message: '', consent: false };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false); // false | 'sent' | 'mailto'
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const id = (f) => `${idPrefix}-${f}`;

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(id(Object.keys(found)[0]))?.focus();
      return;
    }
    const country = countries.find((c) => c.code === values.country)?.name ?? values.country;
    const data = {
      name: values.name,
      email: values.email,
      company: values.company,
      country,
      [topic ? topicLabel.toLowerCase() : 'service']: topic || values.service || '—',
      budget: values.budget || '—',
      message: values.message,
      page: typeof window !== 'undefined' ? window.location.href : '',
    };
    setSending(true);
    setFailed(false);
    try {
      const how = await submitForm('contact', data, {
        subject: `Project enquiry from ${values.name}${values.company ? ` (${values.company})` : ''}`,
        body: `${values.message}\n\n— ${values.name}\n${values.email}\n${values.company ? values.company + '\n' : ''}${country}\nService: ${data.service ?? topic ?? '—'} · Budget: ${data.budget}`,
      });
      setSent(how);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="cta__success" role="status">
        <CheckCircle2 size={56} />
        <h3>Thanks, {values.name.split(' ')[0]}!</h3>
        <p>
          {sent === 'mailto'
            ? `Your email app should now be open with your message ready — just press send. Or write to us directly at ${company.email}.`
            : `Your message is on its way. We'll reply to ${values.email} within one business day.`}
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSent(false);
            setValues(empty);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {title && <h3 className="form__title">{title}</h3>}
      <div className="form__row">
        <Field label="Full name" id={id('name')} error={errors.name}>
          <input id={id('name')} type="text" autoComplete="name" value={values.name} onChange={update('name')} placeholder="Jane Doe" />
        </Field>
        <Field label="Work email" id={id('email')} error={errors.email}>
          <input id={id('email')} type="email" autoComplete="email" value={values.email} onChange={update('email')} placeholder="jane@company.com" />
        </Field>
      </div>
      <div className="form__row">
        <Field label="Company (optional)" id={id('company')}>
          <input id={id('company')} type="text" autoComplete="organization" value={values.company} onChange={update('company')} placeholder="Company Ltd." />
        </Field>
        <Field label="Country" id={id('country')} error={errors.country}>
          <select id={id('country')} autoComplete="country" value={values.country} onChange={update('country')}>
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
            <option value="OTHER">Other</option>
          </select>
        </Field>
      </div>
      {topic ? (
        <Field label={topicLabel} id={id('topic')}>
          <input id={id('topic')} type="text" value={topic} readOnly />
        </Field>
      ) : (
        <div className="form__row">
          <Field label="Service" id={id('service')}>
            <select id={id('service')} value={values.service} onChange={update('service')}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget (USD)" id={id('budget')}>
            <select id={id('budget')} value={values.budget} onChange={update('budget')}>
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>
      )}
      <Field label="Project details" id={id('message')} error={errors.message}>
        <textarea id={id('message')} rows="4" value={values.message} onChange={update('message')} placeholder="Tell us about your idea, timeline and goals…" />
      </Field>
      <div className={`consent-field ${errors.consent ? 'has-error' : ''}`}>
        <input id={id('consent')} type="checkbox" checked={values.consent} onChange={update('consent')} aria-describedby={errors.consent ? `${id('consent')}-error` : undefined} />
        <label htmlFor={id('consent')}>
          I agree to Velotech processing my details to respond to this inquiry, as described in the{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </label>
        {errors.consent && (
          <span className="field__error" id={`${id('consent')}-error`} role="alert">
            {errors.consent}
          </span>
        )}
      </div>
      <Button type="submit" className="form__submit" disabled={sending} aria-busy={sending}>
        {sending ? 'Sending…' : submitLabel}
      </Button>
      {failed && (
        <p className="field__error" role="alert">
          Sorry, your message couldn&apos;t be sent. Please try again or email us at{' '}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      )}
      <p className="form__note">We reply within one business day. Happy to sign an NDA before you share details.</p>
    </form>
  );
}
