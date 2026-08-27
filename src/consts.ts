// Zentrale Seitendaten & Helfer.

/** base-Pfad-bewusste URL (GitHub Pages liegt unter /Bauwelt/).
 *  BASE_URL kann mit oder ohne Slash enden – wir normalisieren. */
const RAW_BASE: string = import.meta.env.BASE_URL;
export const BASE: string = RAW_BASE.endsWith("/") ? RAW_BASE : RAW_BASE + "/";
export const u = (p = ""): string => BASE + String(p).replace(/^\//, "");

export const SITE = {
  name: "Bauwelt Handwerk",
  legal: "Bauwelt Handwerk GmbH",
  tagline: "Badsanierung zum Festpreis – alles aus einer Hand",
  region: "Hamburg und Umgebung",
  phoneDisplay: "0151 56156578",
  phoneTel: "+4915156156578",
  whatsapp: "4915156156578", // wa.me-Format (ohne +)
  email: "j.iqbal@bauwelt-handwerk.de",
  contactName: "Jamil Iqbal",
  contactRole: "Vertrieb & Kundenservice",
  street: "Schweriner Straße 16",
  zip: "22844",
  city: "Norderstedt",
  hours: "Mo–Fr, 8–18 Uhr",
  managing: "Burim Ahmedi",
  register: "HRB 27109 KI, Amtsgericht Kiel",
  vat: "DE450901631",
};

export const NAV: { label: string; href: string }[] = [
  { label: "Leistungen", href: u("leistungen/") },
  { label: "Referenzen", href: u("referenzen/") },
  { label: "Für Partner", href: u("partner/") },
  { label: "Über uns", href: u("ueber-uns/") },
  { label: "Karriere", href: u("karriere/") },
  { label: "Kontakt", href: u("kontakt/") },
];

/** WhatsApp-Chat-Link mit vorbefüllter Nachricht. */
export const waLink = (text = "Hallo, ich interessiere mich für eine Badsanierung."): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
