import PageHero from '../components/page/PageHero';
import { company } from '../data/content';

// Generic legal copy — have it reviewed by a qualified advisor for your jurisdiction before launch,
// then update `LAST_UPDATED`.
const LAST_UPDATED = 'November 12, 2026';
const docs = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { h: 'Overview', p: `This policy explains how ${company.name} ("we", "us") collects, uses and protects personal data submitted through this website, in line with the EU GDPR, UK GDPR and similar data protection laws.` },
      { h: 'Data controller', p: `${company.name}${company.address ? `, ${company.address}` : ''}. Contact: ${company.email}.` },
      { h: 'Information we collect', p: 'Information you provide directly — such as your name, work email, company, country and project details when you submit a form — and, only if you consent, anonymous analytics about how the site is used.' },
      { h: 'Lawful basis', p: 'We process inquiry data to take steps at your request before entering into a contract, and on the basis of your consent where you give it (for example, analytics cookies or newsletters). You can withdraw consent at any time.' },
      { h: 'How we use information', p: 'To respond to your inquiry, prepare proposals, deliver our services and, with your consent, send occasional updates. We never sell your personal data.' },
      { h: 'International transfers', p: 'Our team works across several countries. Where personal data is transferred outside the UK or EEA, we use appropriate safeguards such as Standard Contractual Clauses.' },
      { h: 'Retention', p: 'Inquiry data is kept for up to 24 months after our last contact unless a longer period is required for an active contract or by law.' },
      { h: 'Your rights', p: 'Depending on where you live, you may have the right to access, correct, delete or export your data, to object to or restrict processing, and to complain to your local data protection authority. To exercise these rights, email us and we will respond within 30 days.' },
      { h: 'Service providers', p: 'We use trusted processors (for example hosting, email and form providers) bound by data processing agreements. A current list is available on request.' },
      { h: 'Cookies', id: 'cookies', p: 'This site uses only essential cookies by default. Analytics cookies are set only after you accept them in the cookie banner, and you can change your choice at any time by clearing your browser storage.' },
      { h: 'Contact', p: `Questions about this policy or your data? Email ${company.email}.` },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { h: 'Acceptance', p: `By using this website you agree to these terms. If you do not agree, please do not use the site.` },
      { h: 'Use of content', p: `All content on this site is owned by ${company.name} unless stated otherwise and may not be reproduced without permission.` },
      { h: 'No warranty', p: 'The website is provided "as is" without warranties of any kind. Project terms are governed by separate written agreements.' },
      { h: 'Changes', p: 'We may update these terms from time to time. Continued use of the site means you accept the updated terms.' },
    ],
  },
};

export default function LegalPage({ doc }) {
  const d = docs[doc];
  return (
    <>
      <PageHero crumbs={[{ label: d.title }]} title={d.title} desc={`Last updated: ${LAST_UPDATED}`} />
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
