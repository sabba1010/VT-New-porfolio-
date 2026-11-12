/**
 * Shared GSAP setup (client only — never runs during prerender).
 * Import { gsap, ScrollTrigger } from here so the plugin is registered once.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });
}

export { gsap, ScrollTrigger };

/** Desktop + motion allowed: where pinned / scrubbed effects run. */
export const MQ_DESKTOP = '(min-width: 901px) and (prefers-reduced-motion: no-preference)';
export const MQ_MOTION = '(prefers-reduced-motion: no-preference)';

/** Splits a string into word spans for word-by-word animation. */
export function splitWords(text) {
  return text.split(' ').map((w, i, arr) => ({ word: w, key: `${w}-${i}`, space: i < arr.length - 1 }));
}
