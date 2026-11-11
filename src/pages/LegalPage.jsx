import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/page/PageHero';
import { company } from '../data/content';

// Placeholder legal copy — replace with text reviewed by your legal advisor.
const docs = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { h: 'Overview', p: `This placeholder policy explains how ${company.name} collects, uses and protects personal information submitted through this website.` },
      { h: 'Information we collect', p: 'We collect information you provide directly, such as your name, email address and project details when you submit a form, plus basic analytics data about how the site is used.' },
      { h: 'How we use information', p: 'We use your information to respond to inquiries, provide our services, improve this website and, with your consent, send occasional updates.' },
      { h: 'Cookies', id: 'cookies', p: 'This site may use essential cookies and privacy-friendly analytics. You can control cookies through your browser settings.' },
      { h: 'Contact', p: `Questions about this policy? Email ${company.email}.` },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { h: 'Acceptance', p: `By using this website you agree to these placeholder terms. If you do not agree, please do not use the site.` },
      { h: 'Use of content', p: `All content on this site is owned by ${company.name} unless stated otherwise and may not be reproduced without permission.` },
      { h: 'No warranty', p: 'The website is provided "as is" without warranties of any kind. Project terms are governed by separate written agreements.' },
      { h: 'Changes', p: 'We may update these terms from time to time. Continued use of the site means you accept the updated terms.' },
    ],
  },
};

export default function LegalPage({ doc }) {
  const d = docs[doc];
  usePageMeta(d.title);
  return (
    <>
      <PageHero crumbs={[{ label: d.title }]} title={d.title} desc="Last updated: placeholder date." />
      <section className="section">
        <div className="container">
          <article className="article">
            {d.sections.map((s) => (
              <div key={s.h} id={s.id}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
