import { ArrowUpRight } from 'lucide-react';
import SmartLink from './SmartLink';
import './Button.css';

/**
 * Pill button rendered as <a> when `href` is given, otherwise <button>.
 * variant: 'primary' | 'dark' | 'outline' | 'ghost' | 'light'
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size} ${icon ? '' : 'btn--no-icon'} ${className}`.trim();
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowUpRight size={18} strokeWidth={2.2} />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <SmartLink href={href} className={cls} {...rest}>
        {content}
      </SmartLink>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {content}
    </button>
  );
}
