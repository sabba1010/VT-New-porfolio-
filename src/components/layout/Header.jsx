import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { nav } from '../../data/content';
import { useScrolled } from '../../hooks/useScroll';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';
import './Header.css';

export default function Header() {
  const scrolled = useScrolled(10);
  const [open, setOpen] = useState(null); // id of open mega menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef();
  const headerRef = useRef(null);

  const close = useCallback(() => setOpen(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const openWithHover = (id) => {
    clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(close, 160);
  };

  // Escape + outside click close the mega menu
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Close all menus whenever the route changes
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  const section = (href) => href !== '/' && pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className={`header ${scrolled || open ? 'is-solid' : ''}`}
      onMouseLeave={scheduleClose}
    >
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="Velotech home" onClick={close}>
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          <ul className="header__list">
            {nav.map((item) =>
              item.mega ? (
                <li key={item.label} onMouseEnter={() => openWithHover(item.mega)}>
                  <button
                    className={`header__link ${open === item.mega ? 'is-open' : ''} ${section(item.href) ? 'is-current' : ''}`}
                    aria-expanded={open === item.mega}
                    aria-controls={`mega-${item.mega}`}
                    onClick={() => setOpen((o) => (o === item.mega ? null : item.mega))}
                  >
                    {item.label}
                    <ChevronDown size={15} className="header__chev" aria-hidden="true" />
                  </button>
                </li>
              ) : (
                <li key={item.label} onMouseEnter={scheduleClose}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) => `header__link ${isActive ? 'is-current' : ''}`}
                    onClick={close}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="header__actions">
          <Button href="/contact" size="sm" className="header__cta">
            Get Started
          </Button>
          <button
            className="header__burger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Desktop mega menu panels */}
      {nav
        .filter((n) => n.mega)
        .map((n) => (
          <div
            key={n.mega}
            id={`mega-${n.mega}`}
            className={`mega ${open === n.mega ? 'is-open' : ''}`}
            onMouseEnter={() => openWithHover(n.mega)}
            inert={open !== n.mega ? true : undefined}
          >
            <div className="container">
              <div className="mega__panel">
                <MegaMenu id={n.mega} onNavigate={close} />
              </div>
            </div>
          </div>
        ))}
      {open && (
        <div className="mega__scrim" aria-hidden="true" onClick={close} onMouseEnter={scheduleClose} />
      )}

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
