import React from 'react';

const CombinedSchema = () => {
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ChassisVIN",
      "url": "https://www.chassisvin.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.chassisvin.com/ChassisVIN.png",
        "width": "512",
        "height": "512"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://www.chassisvin.com/ChassisVIN.png",
        "width": "512",
        "height": "512"
      },
      "description": "Get your vehicle history report with ChassisVIN for accurate records on ownership, accident history, recalls, and title information with VIN or License Plate.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2039 NE 151st St.",
        "addressLocality": "North Miami Beach",
        "addressRegion": "FL",
        "postalCode": "33162",
        "addressCountry": "USA"
      },
      "email": "info@chassisvin.com",
      "telephone": "+1-404-226-5275",
      "sameAs": [
        "https://twitter.com/ChassisVIN",
        "https://www.facebook.com/ChassisVIN",
        "https://www.linkedin.com/company/chassisvin"
      ],
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+1-404-226-5275",
        "contactType": "customer service",
        "email": "info@chassisvin.com",
        "availableLanguage": ["English"]
      }]
    },
    {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "ChassisVIN",
      "url": "https://www.chassisvin.com/",
      "description": "Get your vehicle history report with ChassisVIN for accurate records on ownership, accident history, recalls, and title information with VIN or License Plate."
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default CombinedSchema;