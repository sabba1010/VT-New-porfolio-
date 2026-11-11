import Reveal from './Reveal';
import './SectionHeading.css';

export default function SectionHeading({ eyebrow, title, desc, align = 'left', action, id }) {
  return (
    <div className={`sh sh--${align}`}>
      <Reveal className="sh__text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="sh__title" id={id}>
          {title}
        </h2>
        {desc && <p className="sh__desc">{desc}</p>}
      </Reveal>
      {action && (
        <Reveal className="sh__action" delay={120}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
