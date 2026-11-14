import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services, companyLinks } from '../../data/content';
import { culture } from '../../data/images';
import Button from '../ui/Button';
import SmartLink from '../ui/SmartLink';

const serviceTabs = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'development', label: 'Development' },
];

function Promo({ title, text, cta = "Let's Talk", href = '/contact', onNavigate }) {
  return (
    <div className="mega__promo">
      <span className="mega__promo-glow" aria-hidden="true" />
      <p className="mega__promo-kicker">Velotech</p>
      <p className="mega__promo-title">{title}</p>
      <p className="mega__promo-text">{text}</p>
      <Button href={href} size="sm" onClick={onNavigate}>
        {cta}
      </Button>
    </div>
  );
}

function MoreLink({ to, children, onNavigate }) {
  return (
    <Link to={to} className="mega__more" onClick={onNavigate}>
      {children} <ArrowRight size={16} />
    </Link>
  );
}

function ServicesMenu({ onNavigate }) {
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? services : services.filter((s) => s.group === tab);
  return (
    <div className="mega__grid mega__grid--promo">
      <div>
        <div className="mega__tabs" role="tablist" aria-label="Service categories">
          {serviceTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`mega__tab ${tab === t.id ? 'is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <ul className="mega__cards">
          {list.map(({ slug, title, desc, icon: Icon }) => (
            <li key={slug}>
              <Link to={`/services/${slug}`} className="mega__card" onClick={onNavigate}>
                <span className="mega__icon">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="mega__card-title">{title}</span>
                  <span className="mega__card-desc">{desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <MoreLink to="/services" onNavigate={onNavigate}>
          View all services
        </MoreLink>
      </div>
      <Promo
        title="Not sure where to start?"
        text="Book a free 30-minute call with our design and engineering team."
        onNavigate={onNavigate}
      />
    </div>
  );
}


function CompanyMenu({ onNavigate }) {
  return (
    <div className="mega__grid mega__grid--company">
      <ul className="mega__cards mega__cards--2">
        {companyLinks.map(({ title, desc, icon: Icon, href }) => (
          <li key={title}>
            <SmartLink href={href} className="mega__card" onClick={onNavigate}>
              <span className="mega__icon">
                <Icon size={20} />
              </span>
              <span>
                <span className="mega__card-title">{title}</span>
                <span className="mega__card-desc">{desc}</span>
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
      <Link to="/careers" className="mega__feature" onClick={onNavigate}>
        <img src={culture[0]} alt="" loading="lazy" />
        <span className="mega__feature-body">
          <span className="mega__card-title">Inside Velotech</span>
          <span className="mega__card-desc">See how we work, learn and build together.</span>
        </span>
      </Link>
    </div>
  );
}

const menus = {
  services: ServicesMenu,
  company: CompanyMenu,
};

export default function MegaMenu({ id, onNavigate }) {
  const Menu = menus[id];
  return Menu ? <Menu onNavigate={onNavigate} /> : null;
}
