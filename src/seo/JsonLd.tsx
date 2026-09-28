import React from 'react';

export function JsonLd({ data }: { data: object[] }) {
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': data
  }).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default JsonLd;
