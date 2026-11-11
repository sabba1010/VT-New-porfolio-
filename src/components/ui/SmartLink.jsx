import { Link } from 'react-router-dom';

/**
 * Uses client-side routing for internal paths ("/services", "/#faq")
 * and a normal <a> for external, mailto:, tel: and in-page "#hash" links.
 */
export default function SmartLink({ href = '#', children, ...rest }) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
