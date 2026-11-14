import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { aiServices } from '../data/content';
import { gsap, MQ_MOTION } from '../lib/motion';
import './AISpotlight.css';

const TITLE = [{ t: 'Put' }, { t: 'AI' }, { t: 'to' }, { t: 'work' }, { t: 'across', a: true }, { t: 'your', a: true }, { t: 'business.', a: true }];

/** Small animated visuals that make each AI card feel alive. */
function Visual({ slug }) {
  if (slug === 'ai-automation') {
    const steps = ['New lead', 'AI agent', 'CRM updated', 'Follow-up sent'];
    return (
      <div className="aiv-flow" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s} className={`aiv-flow__node ${i === 1 ? 'is-ai' : ''}`} style={{ '--n': i }}>
            {i === 1 && <Sparkles size={13} />}
            {s}
          </span>
        ))}
        <span className="aiv-flow__line">
          <i />
        </span>
        <ul className="aiv-log">
          {[
            'Lead qualified and added to CRM',
            'Invoice details extracted to accounting',
            'Support reply drafted for review',
            'Weekly sales report sent to Slack',
          ].map((t, i) => (
            <li key={t} style={{ '--n': i }}>
              <span className="aiv-log__dot" />
              {t}
              <em>Automated</em>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (slug === 'ai-development') {
    return (
      <div className="aiv-chat" aria-hidden="true">
        <p className="aiv-chat__q">Summarise the renewal terms in our supplier contracts.</p>
        <div className="aiv-chat__a">
          <span className="aiv-chat__badge">
            <Sparkles size={12} /> Your AI assistant
          </span>
          <span className="aiv-chat__line" style={{ '--w': '92%' }} />
          <span className="aiv-chat__line" style={{ '--w': '78%' }} />
          <span className="aiv-chat__line" style={{ '--w': '64%' }} />
          <span className="aiv-chat__src">Sources: 3 contracts · 2 policies</span>
        </div>
      </div>
    );
  }
  if (slug === 'ai-integration') {
    const tools = ['CRM', 'ERP', 'Website', 'WhatsApp', 'Help desk', 'Docs'];
    return (
      <div className="aiv-hub" aria-hidden="true">
        <span className="aiv-hub__core">
          <Sparkles size={18} />
        </span>
        {tools.map((t, i) => (
          <span key={t} className="aiv-hub__tool" style={{ '--a': `${(360 / tools.length) * i}deg` }}>
            {t}
          </span>
        ))}
      </div>
    );
  }
  if (slug === 'ai-business-growth') {
    return (
      <div className="aiv-bars" aria-hidden="true">
        {[34, 46, 41, 58, 66, 79, 92].map((h, i) => (
          <span key={i} style={{ '--h': `${h}%`, '--n': i }} />
        ))}
      </div>
    );
  }
  return null;
}

/**
 * Home-page AI spotlight: the company's core focus, shown right after the hero.
 * Cards come from the 'ai' group in src/data/services.js.
 */
export default function AISpotlight() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add(MQ_MOTION, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
      tl.from(q('.ais__eyebrow'), { y: 20, autoAlpha: 0, duration: 0.6 })
        .from(q('.ais__title .wmask__in'), { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.06, ease: 'expo.out' }, '-=0.3')
        .from(q('.ais__lead'), { y: 20, autoAlpha: 0, duration: 0.8 }, '-=0.8');
      gsap.from(q('.ais-card'), {
        y: 70,
        scale: 0.96,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: q('.ais__grid')[0], start: 'top 80%', once: true },
      });
      gsap.from(q('.ais__cta'), {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        scrollTrigger: { trigger: q('.ais__cta')[0], start: 'top 92%', once: true },
      });
    });
    return () => mm.revert();
  }, []);

  const askSara = () =>
    window.dispatchEvent(new CustomEvent('velotech:chat', { detail: 'Where could AI save time or grow revenue in my business?' }));

  return (
    <section ref={root} className="section section--dark ais" id="ai" aria-labelledby="ais-title">
      <span className="ais__glow" aria-hidden="true" />
      <div className="container">
        <div className="ais__head">
          <span className="eyebrow ais__eyebrow">AI-first software company</span>
          <h2 className="ais__title" id="ais-title">
            {TITLE.map(({ t, a }) => (
              <span className="wmask" key={t}>
                <span className={`wmask__in ${a ? 'text-accent' : ''}`}>{t}</span>
              </span>
            ))}
          </h2>
          <p className="ais__lead">
            Automation, AI integration and AI-driven growth are what we do best — built on solid software
            engineering, so it works reliably in the real world, not just in a demo.
          </p>
        </div>

        <ul className="ais__grid">
          {aiServices.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.slug} className={`ais-card ais-card--${i}`}>
                <Link to={`/services/${s.slug}`} className="ais-card__link">
                  <div className="ais-card__top">
                    <span className="ais-card__icon">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="ais-card__arrow" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <Visual slug={s.slug} />
                  <h3 className="ais-card__title">{s.title}</h3>
                  <p className="ais-card__desc">{s.desc}</p>
                  <ul className="ais-card__tags">
                    {s.features.slice(0, 3).map((f) => (
                      <li key={f.title}>{f.title}</li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ais__cta">
          <div>
            <strong>Not sure where AI fits in your business?</strong>
            <span>Tell us how you work today — we’ll show you what to automate first.</span>
          </div>
          <div className="ais__cta-actions">
            <button type="button" className="ais__ask" onClick={askSara}>
              <MessageCircle size={18} /> Ask Sara, our AI assistant
            </button>
            <Button href="/contact">Free AI Consultation</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
