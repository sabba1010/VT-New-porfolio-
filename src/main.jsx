import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Self-hosted fonts (no third-party requests — GDPR friendly)
import '@fontsource-variable/manrope';
import '@fontsource-variable/sora';
import './styles/tokens.css';
import './styles/base.css';
import './components/page/page.css';
import App from './App';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered pages (production build) are hydrated; the dev server renders fresh.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
