import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import { services } from '../../data/content';
import '../../sections/FinalCTA.css';

const budgets = ['< $10k', '$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k+'];

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
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
  const empty = { name: '', email: '', service: '', budget: '', message: '' };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const id = (f) => `${idPrefix}-${f}`;

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(id(Object.keys(found)[0]))?.focus();
      return;
    }
    // TODO: connect to your backend / form service, e.g.
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify({ ...values, topic }) })
    setSent(true);
  };

  if (sent) {
    return (
      <div className="cta__success" role="status">
        <CheckCircle2 size={56} />
        <h3>Thanks, {values.name.split(' ')[0]}!</h3>
        <p>Your message is on its way. Our team will reach out to {values.email} shortly.</p>
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
          <Field label="Budget" id={id('budget')}>
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
      <Button type="submit" className="form__submit">
        {submitLabel}
      </Button>
      <p className="form__note">We respect your privacy. No spam, ever.</p>
    </form>
  );
}
