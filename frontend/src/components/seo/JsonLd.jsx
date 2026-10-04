import { Helmet } from 'react-helmet-async';

/**
 * JsonLd – Component to inject JSON-LD structured data into <head> for Google & schema.org
 *
 * @param {object} data – Structured data object (e.g., BlogPosting, BreadcrumbList, Organization)
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}
