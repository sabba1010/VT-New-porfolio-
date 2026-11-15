import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/motion';

let lenis = null;

/** Smoothly scrolls back to the top of the page (through Lenis when it's running). */
export function scrollToTop() {
  if (lenis) {
    // force: works even while Lenis is paused (e.g. the mobile menu is just closing)
    lenis.scrollTo(0, { duration: 1.2, force: true });
    return;
  }
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' });
}

/**
 * Inertial smooth scrolling (Lenis) driven by GSAP's ticker, so every
 * ScrollTrigger animation stays perfectly in sync with the scroll.
 * Disabled for reduced-motion users; touch devices keep native scrolling.
 */
export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      allowNestedScroll: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // pause while the mobile menu locks the page
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains('no-scroll')) lenis.stop();
      else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);

  // new page → recalculate trigger positions once content has laid out
  useEffect(() => {
    lenis?.resize();
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
