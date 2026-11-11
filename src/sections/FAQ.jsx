import { useState } from 'react';
import { Plus, Mail } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { faqs, company } from '../data/content';
import './FAQ.css';

export default function FAQ({ limit } = {}) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--cream faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__layout">
        <Reveal className="faq__intro">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>Everything you need to know about working with Velotech. Can&apos;t find an answer?</p>
          <div className="faq__card">
            <span className="faq__card-icon">
              <Mail size={22} />
            </span>
            <p className="faq__card-title">Still have questions?</p>
            <p className="faq__card-text">Our team usually replies within one business day.</p>
            <Button href="/contact" size="sm" variant="dark">
              Contact Us
            </Button>
            <a className="faq__mail" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        </Reveal>

        <div className="faq__list">
          {(limit ? faqs.slice(0, limit) : faqs).map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq__q">{f.q}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__answer">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
