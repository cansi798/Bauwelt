// Zentrale Seitendaten & Helfer.

/** base-Pfad-bewusste URL (GitHub Pages liegt unter /Bauwelt/).
 *  BASE_URL kann mit oder ohne Slash enden – wir normalisieren. */
const RAW_BASE: string = import.meta.env.BASE_URL;
export const BASE: string = RAW_BASE.endsWith("/") ? RAW_BASE : RAW_BASE + "/";
export const u = (p = ""): string => BASE + String(p).replace(/^\//, "");

/** Kontextabhängige E-Mail-Adressen – immer voll qualifiziert (@bauwelt-handwerk.de),
 *  damit die Domain an genau einer Stelle steht. */
export const EMAILS = {
  service: "service@bauwelt-handwerk.de",     // Anfragen/Formular Privatkunden
  impressum: "b.ahmedi@bauwelt-handwerk.de",  // Impressum + Datenschutz (DSGVO)
  bewerbung: "bewerbung@bauwelt-handwerk.de", // Bewerbungen
  partner: "partner@bauwelt-handwerk.de",     // Kooperationen / B2B
} as const;

export const SITE = {
  name: "Bauwelt Handwerk",
  legal: "Bauwelt Handwerk GmbH",
  tagline: "Badsanierung zum Festpreis – alles aus einer Hand",
  region: "Hamburg und Umgebung",
  phoneDisplay: "0151 42888841",
  phoneTel: "+4915142888841",
  whatsapp: "4915142888841", // wa.me-Format (ohne +)
  emails: EMAILS,
  email: EMAILS.service, // Standard-/Fallback-Adresse (Service) – u. a. für JSON-LD
  contactName: "Jamil Iqbal",
  contactRole: "Vertrieb & Kundenservice",
  /** Ansprechpartner im Kontaktbereich – Foto liegt unter assets/img/<photo> (Auto-Fallback). */
  contacts: [
    { name: "Jamil Iqbal", role: "Vertrieb & Kundenservice", photo: "jamil.webp" },
    { name: "Burim Ahmedi", role: "Geschäftsführer", photo: "burim.webp" },
  ],
  street: "Schweriner Straße 16",
  zip: "22844",
  city: "Norderstedt",
  hours: "Mo–Fr, 8–18 Uhr",
  managing: "Burim Ahmedi",
  register: "HRB 27109 KI, Amtsgericht Kiel",
  vat: "DE450901631",
};

/** Haupt-CTA der ganzen Website (Enpal-Muster: ein Ziel, überall wiederholt). */
export const CTA = { label: "Projekt berechnen", href: u("rechner/") };

export type NavChild = { label: string; href: string; icon?: string; desc?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

/** Navigation mit Dropdown-Gruppen (Desktop: Mega-Dropdown, Mobil: aufklappbare Gruppen). */
export const NAV2: NavItem[] = [
  {
    label: "Leistungen",
    children: [
      { label: "Badsanierung", href: u("leistungen/badsanierung/"), icon: "bath", desc: "Ihr neues Bad in 3 Wochen" },
      { label: "Sanierung & Modernisierung", href: u("leistungen/sanierung-modernisierung/"), icon: "reno", desc: "Von Renovierung bis Kernsanierung" },
      { label: "Innenausbau & Trockenbau", href: u("leistungen/innenausbau/"), icon: "wall", desc: "Neue Räume, neue Aufteilung" },
      { label: "Dach & Fassade", href: u("leistungen/dach-fassade/"), icon: "roof", desc: "Dicht, gedämmt, wertsteigernd" },
      { label: "Maler & Bodenbeläge", href: u("leistungen/maler-boeden/"), icon: "paint", desc: "Frische Wände, neue Böden" },
      { label: "Sanitär, Heizung, Elektro", href: u("leistungen/sanitaer-heizung-elektro/"), icon: "tools", desc: "Technik, die einfach läuft" },
      { label: "Alle Leistungen im Überblick", href: u("leistungen/"), icon: "arrow" },
    ],
  },
  { label: "Referenzen", href: u("referenzen/") },
  {
    label: "Unternehmen",
    children: [
      { label: "Über uns", href: u("ueber-uns/"), icon: "user", desc: "Team, Werte, Arbeitsweise" },
      { label: "Karriere", href: u("karriere/"), icon: "hand", desc: "Offene Stellen bei Bauwelt" },
      { label: "Für Partner", href: u("partner/"), icon: "shield", desc: "Zusammenarbeit für Profis" },
    ],
  },
  { label: "Kontakt", href: u("kontakt/") },
];

/** WhatsApp-Chat-Link mit vorbefüllter Nachricht. Standardtext deckt alle Leistungen ab. */
export const waLink = (
  text = "Hallo Bauwelt Handwerk, ich interessiere mich für eine Ihrer Leistungen – " +
    "z. B. Badsanierung, Komplettsanierung, Modernisierung, Dach & Fassade, Innenausbau, " +
    "Sanitär/Heizung/Elektro oder Maler & Böden. Bitte melden Sie sich bei mir für ein " +
    "unverbindliches Angebot. Vielen Dank!"
): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
