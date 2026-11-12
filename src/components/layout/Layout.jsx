import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ConsentBanner from './ConsentBanner';
import SmoothScroll from './SmoothScroll';
import ChatWidget from '../chat/ChatWidget';
import { getRouteMeta, applyHead } from '../../seo/meta';

/** Scrolls to top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait for the (possibly lazy) page to render
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (tries++ < 20) setTimeout(tryScroll, 50);
      };
      tryScroll();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

/** Keeps <title>, meta, Open Graph and JSON-LD in sync with the route. */
function HeadManager() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    // The prerendered HTML already has the right tags for the first page.
    if (first.current && document.head.querySelector('[data-seo]')) {
      first.current = false;
      return;
    }
    first.current = false;
    applyHead(getRouteMeta(pathname));
  }, [pathname]);
  return null;
}

function PageFallback() {
  return <div className="page-loading" aria-busy="true" aria-label="Loading page" />;
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <SmoothScroll />
      <HeadManager />
      <Header />
      <main id="main" className="page-transition" key={pathname}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ConsentBanner />
      <ChatWidget />
    </>
  );
}
