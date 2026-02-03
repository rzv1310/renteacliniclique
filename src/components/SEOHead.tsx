import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://renteacliniclique.lovable.app/og-image.webp",
  ogType = "website",
  noIndex = false,
}: SEOHeadProps) => {
  const siteUrl = "https://implantmamarbucuresti.ro";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? "NOINDEX, NOFOLLOW" : "INDEX, FOLLOW, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1, MAX-IMAGE-PREVIEW:LARGE"} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ro_RO" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
    </Helmet>
  );
};

export default SEOHead;
