import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { realPartners as partners } from '../data/content';
import './Partners.css';

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`} style={{ '--marquee-dur': '45s' }}>
      <ul className="marquee__track">
        {doubled.map((p, i) => (
          <li key={i} className="partner" aria-hidden={i >= items.length}>
            <img src={p.logo} alt={i < items.length ? `${p.name} logo` : ''} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Partners() {
  if (!partners.length) return null; // hidden until real logos are added
  const half = Math.ceil(partners.length / 2);
  return (
    <section className="section partners" id="partners" aria-labelledby="partners-title">
      <div className="container">
        <div className="partners__head">
          <Reveal>
            <span className="eyebrow">Partners & ecosystem</span>
            <h2 id="partners-title">Trusted partners powering what we build</h2>
          </Reveal>
          <Reveal delay={100}>
            <Button href="/contact" variant="outline">
              Become a Partner
            </Button>
          </Reveal>
        </div>
      </div>
      <Reveal className="partners__rows" delay={150}>
        <Row items={partners.slice(0, half)} />
        <Row items={partners.slice(half)} reverse />
      </Reveal>
    </section>
  );
}
