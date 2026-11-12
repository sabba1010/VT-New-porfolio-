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
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
