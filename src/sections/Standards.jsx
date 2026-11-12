import { Clock3, FileLock2, ShieldCheck, Lock, Receipt, MessagesSquare } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import './Standards.css';

/**
 * Working standards international clients look for.
 * Wording describes practices — only add certifications (ISO 27001, SOC 2…)
 * here once your company actually holds them.
 */
const items = [
  { icon: Clock3, title: 'Your time zone', desc: '4+ hours of daily overlap with US, UK, EU and APAC teams, plus async updates.' },
  { icon: FileLock2, title: 'NDA & full IP ownership', desc: 'NDA before kickoff. Code, designs and IP transfer to you — always.' },
  { icon: ShieldCheck, title: 'GDPR-aware delivery', desc: 'Data processing agreements on request and privacy-by-design practices.' },
  { icon: Lock, title: 'Secure engineering', desc: 'OWASP-aligned reviews, least-privilege access and encrypted secrets.' },
  { icon: Receipt, title: 'Transparent pricing', desc: 'Fixed-price or monthly billing in USD, EUR or GBP. No hidden fees.' },
  { icon: MessagesSquare, title: 'Clear communication', desc: 'Fluent English, a dedicated project manager and weekly demos.' },
];

export default function Standards({ tone = 'light', compact = false }) {
  return (
    <section className={`section standards ${tone === 'cream' ? 'section--cream' : ''} ${compact ? 'standards--compact' : ''}`} aria-labelledby="standards-title">
      <div className="container">
        <SectionHeading
          id="standards-title"
          eyebrow="Built for global teams"
          title={
            <>
              Working with us from <span className="text-accent">anywhere</span>
            </>
          }
          desc="The standards international clients expect — built into every engagement from day one."
        />
        <ul className="standards__grid">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 80} className="standard">
              <span className="standard__icon">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
