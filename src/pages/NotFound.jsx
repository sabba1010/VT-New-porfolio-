import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/page/PageHero';
import Button from '../components/ui/Button';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <PageHero
      center
      eyebrow="404"
      title={
        <>
          This page took a <span className="text-gradient">wrong turn</span>
        </>
      }
      desc="The page you are looking for doesn't exist or has been moved."
      actions={
        <>
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" size="lg" variant="outline">
            Contact Us
          </Button>
        </>
      }
    />
  );
}
