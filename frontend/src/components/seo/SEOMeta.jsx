import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'AstroFrance';
const DEFAULT_DESCRIPTION =
  'Découvrez votre horoscope du jour, votre thème natal et vos compatibilités astrales sur AstroFrance, la référence française de l\'astrologie.';
const DEFAULT_IMAGE = '/og-image.jpg';

/**
 * SEOMeta – reusable head tag manager
 *
 * @param {string} title – Page title (appended with " | AstroFrance")
 * @param {string} description – Meta description
 * @param {string} canonical – Canonical URL path (e.g. "/horoscope/belier")
 * @param {string} image – OG image URL
 * @param {string} type – OG type (default: "website")
 * @param {object} extra – Additional meta props
 */
export default function SEOMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} – Horoscope & Astrologie en Français`;
  const canonicalUrl = canonical ? `https://astrofrance.fr${canonical}` : undefined;

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
