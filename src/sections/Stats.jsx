import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { stats } from '../data/content';
import './Stats.css';

function Stat({ value, suffix, label, pad, start, index }) {
  const n = useCountUp(value, start, 1600 + index * 200);
  return (
    <li className="stat">
      <p className="stat__value">
        <span className="sr-only">
          {value}
          {suffix}
        </span>
        <span aria-hidden="true">
          {pad ? String(n).padStart(2, '0') : n}
          <em>{suffix}</em>
        </span>
      </p>
      <p className="stat__label">{label}</p>
    </li>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <section className="stats-wrap" aria-labelledby="stats-title">
      <div className="container">
        <div ref={ref} className={`stats ${inView ? 'is-visible' : ''}`}>
          <div className="stats__intro">
            <span className="eyebrow">By the numbers</span>
            <h2 id="stats-title">ROI-focused results, sprint after sprint.</h2>
          </div>
          <ul className="stats__list">
            {stats.map((s, i) => (
              <Stat key={s.label} {...s} start={inView} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
