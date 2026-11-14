import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import { industryCases } from '../data/content';
import './IndustryCases.css';

/**
 * "Industries we serve" — each industry links straight to the case study we
 * delivered in it. On desktop a preview of that project follows the cursor.
 */
export default function IndustryCases() {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [active, setActive] = useState(-1);

  const onMove = (e) => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const r = list.getBoundingClientRect();
    preview.style.setProperty('--mx', `${e.clientX - r.left}px`);
    preview.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="section ind-cases" id="industries" aria-labelledby="ind-cases-title">
      <div className="container">
        <SectionHeading
          id="ind-cases-title"
          eyebrow="Industries we serve"
          title={
            <>
              Proven work in <span className="text-accent">your industry</span>
            </>
          }
          desc="Pick your industry to see a project we delivered in it — the challenge, what we built and the results."
        />

        <div className="ind-cases__wrap" ref={listRef} onPointerMove={onMove} onPointerLeave={() => setActive(-1)}>
          <ul className="ind-cases__list">
            {industryCases.map((ind, i) => {
              const Icon = ind.icon;
              const cs = ind.cases[0];
              const label = ind.cases.length > 1 ? `${ind.cases.length} case studies` : cs.name;
              return (
                <Reveal as="li" key={ind.slug} delay={i * 60}>
                  <Link
                    to={ind.href}
                    className={`ind-row ${active === i ? 'is-active' : ''}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-label={`${ind.name}: view ${ind.cases.length > 1 ? 'case studies' : `the ${cs.name} case study`}`}
                  >
                    <span className="ind-row__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ind-row__thumb" aria-hidden="true">
                      <img src={cs.image} alt="" loading="lazy" />
                    </span>
                    <span className="ind-row__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <span className="ind-row__name">{ind.name}</span>
                    <span className="ind-row__case">
                      <strong>{label}</strong>
                      {cs.metric && ind.cases.length === 1 && (
                        <span>
                          {cs.metric.value} {cs.metric.label}
                        </span>
                      )}
                    </span>
                    <span className="ind-row__arrow" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          {/* floating preview of the hovered industry's case study (desktop) */}
          <div ref={previewRef} className={`ind-preview ${active >= 0 ? 'is-on' : ''}`} aria-hidden="true">
            {industryCases.map((ind, i) => (
              <img key={ind.slug} src={ind.cases[0].image} alt="" className={active === i ? 'is-current' : ''} loading="lazy" />
            ))}
            <span className="ind-preview__tag">View case study</span>
          </div>
        </div>

        <div className="ind-cases__foot">
          <Link to="/case-studies" className="ind-cases__all">
            See all case studies <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
