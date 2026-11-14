/**
 * Build-time renderer (not shipped to browsers).
 * scripts/prerender.mjs uses this to turn every route into static HTML,
 * so search engines and social networks see full content and correct meta tags.
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export { getRouteMeta, allRoutes, headHtml } from './seo/meta';
export { site } from './data/site';

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
    {
      // Keep every <Suspense> boundary's HTML in place. By default React
      // "outlines" large boundaries into a hidden <div> and reveals them with
      // an inline "$RC" script — which our CSP (script-src 'self') blocks in
      // production, causing React error #419 and a blank flash on every page.
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
    },
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
