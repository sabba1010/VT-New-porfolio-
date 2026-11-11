import { useState } from 'react';
import { MapPin } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { locations } from '../data/content';
import { landPaths, project, MAP_W, MAP_H } from './worldShapes';
import './GlobalPresence.css';

const HUB = locations.find((l) => l.code === 'BD');

// Curved arc between two projected points
const arc = ([x1, y1], [x2, y2]) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.28;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
};

export default function GlobalPresence() {
  const [active, setActive] = useState(null);
  const hub = project(HUB.lon, HUB.lat);

  return (
    <section className="section section--dark section--panel global" id="global" aria-labelledby="global-title">
      <div className="container">
        <SectionHeading
          id="global-title"
          align="center"
          eyebrow="Global presence"
          title={
            <>
              Local partnership, <span className="text-gradient">global delivery</span>
            </>
          }
          desc="Teams across six countries let us work in your time zone and deliver around the clock."
        />

        <Reveal className="global__map">
          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="World map showing Velotech office locations">
            <defs>
              <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.25" fill="rgba(255,255,255,0.28)" />
              </pattern>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#ff5b2e" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#ff5b2e" />
                <stop offset="1" stopColor="#ffb547" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            <g fill="url(#dots)">
              {landPaths.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>

            <g className="global__arcs">
              {locations
                .filter((l) => l !== HUB)
                .map((l, i) => (
                  <path
                    key={l.code}
                    d={arc(hub, project(l.lon, l.lat))}
                    className={active === l.code ? 'is-active' : ''}
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                ))}
            </g>

            {locations.map((l) => {
              const [x, y] = project(l.lon, l.lat);
              const isActive = active === l.code;
              return (
                <g
                  key={l.code}
                  className={`pin ${isActive ? 'is-active' : ''}`}
                  transform={`translate(${x} ${y})`}
                  onMouseEnter={() => setActive(l.code)}
                  onMouseLeave={() => setActive(null)}
                >
                  <circle r="14" className="pin__pulse" />
                  <circle r="5.5" className="pin__dot" />
                  <g className="pin__label" transform={`translate(0 ${l.lat < 0 ? 26 : -18})`}>
                    <rect x="-46" y="-13" width="92" height="24" rx="12" />
                    <text textAnchor="middle" y="4">
                      {l.city}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </Reveal>

        <ul className="global__list">
          {locations.map((l, i) => (
            <Reveal
              as="li"
              key={l.code}
              delay={i * 70}
              className={`loc ${active === l.code ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(l.code)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(l.code)}
              onBlur={() => setActive(null)}
              tabIndex={0}
            >
              <span className="loc__code">{l.code}</span>
              <div>
                <h3>{l.country}</h3>
                <p>
                  <MapPin size={13} /> {l.city}
                </p>
                <span className="loc__role">{l.role}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
