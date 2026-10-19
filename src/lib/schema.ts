// Schema.org-Bausteine für einzelne Seiten (SEO-/KI-Audit S3, 19.10.2026).
type FAQ = { q: string; a: string };
export const faqSchema = (items: FAQ[]) =>
  items.length
    ? [{ "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
    : [];
export const breadcrumbSchema = (teile: { name: string; url: string }[]) => [{
  "@type": "BreadcrumbList",
  itemListElement: teile.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: t.url })),
}];
export const serviceSchema = (o: { name: string; beschreibung: string; url: string; preis?: number; gebiet: string }) => [{
  "@type": "Service",
  name: o.name,
  serviceType: o.name,
  description: o.beschreibung,
  url: o.url,
  areaServed: o.gebiet,
  ...(o.preis ? { offers: { "@type": "Offer", price: o.preis, priceCurrency: "EUR", description: "Pauschalpreis inkl. 19 % MwSt." } } : {}),
}];
