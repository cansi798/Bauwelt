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

/** Besichtigungstermin (Kundenfeedback 30.09.2026): Alle Termin-Buttons öffnen
 *  per JS das Buchungsfenster (BookingDialog, `data-termin`). Ohne JS führt der
 *  Link direkt zum Relexable-Buchungsportal (neuer Tab). */
export const TERMIN = {
  label: "Kostenlosen Besichtigungstermin buchen",
  kurz: "Besichtigungstermin buchen",
  href: "https://portal.bauwelt-handwerk.de/buchen",
};

export type NavChild = { label: string; href: string; icon?: string; desc?: string };
export type NavItem = { label: string; href?: string; children?: NavChild[] };

/** Navigation mit Dropdown-Gruppen (Desktop: Mega-Dropdown, Mobil: aufklappbare Gruppen). */
export const NAV2: NavItem[] = [
  {
    label: "Leistungen",
    children: [
      // 5 Leistungen im Menü (Kundenfeedback 30.09. + 11.10.2026). Dach & Fassade,
      // Maler & Böden, Sanitär/Heizung/Elektro sind seit Kundenwunsch 12.10.2026 (18)
      // ganz abgeschaltet (Inhalte in archiv/leistungen-abgeschaltet/).
      { label: "Badsanierung", href: u("leistungen/badsanierung/"), icon: "bath", desc: "Ihr neues Bad in 2 Wochen" },
      { label: "Sanierung & Modernisierung", href: u("leistungen/sanierung-modernisierung/"), icon: "reno", desc: "Von der Einzelmaßnahme bis zur Kernsanierung" },
      { label: "Fliesen- & Bodenlegerarbeiten", href: u("leistungen/fliesen-boden/"), icon: "tiles", desc: "Perfekte Oberflächen für Wand und Boden" },
      { label: "Innenausbau & Trockenbau", href: u("leistungen/innenausbau/"), icon: "wall", desc: "Räume neu gestalten und optimal nutzen" },
      // 5. Leistung seit Kundenwunsch 11.10.2026 (Pauschalpreis steht in content/leistungen/sanierungscheck.md)
      { label: "Immobilien-Sanierungscheck", href: u("leistungen/sanierungscheck/"), icon: "eye", desc: "Chancen, Risiken und Kosten frühzeitig erkennen" },
      // Kundenwunsch 15.10.2026 (71): „Alle Leistungen im Überblick“ + Übersichtsseite entfernt
    ],
  },
  { label: "Referenzen", href: u("referenzen/") },
  {
    label: "Unternehmen",
    children: [
      { label: "Über uns", href: u("ueber-uns/"), icon: "user", desc: "Team, Werte, Arbeitsweise" },
      { label: "Karriere", href: u("karriere/"), icon: "karriere", desc: "Arbeiten bei Bauwelt Handwerk" },
      { label: "Partner", href: u("partner/"), icon: "shield", desc: "Zusammenarbeit für Profis" },
    ],
  },
  { label: "Kontakt", href: u("kontakt/") },
];

/** WhatsApp-Chat-Link mit vorbefüllter Nachricht. Standardtext nennt die 5 Leistungen (Menü NAV2). */
export const waLink = (
  text = "Hallo Bauwelt Handwerk, ich interessiere mich für eine Ihrer Leistungen – " +
    "Badsanierung, Sanierung & Modernisierung, Fliesen- & Bodenlegerarbeiten, " +
    "Innenausbau & Trockenbau oder den Immobilien-Sanierungscheck. Bitte melden Sie sich bei mir für ein " +
    "unverbindliches Angebot. Vielen Dank!"
): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/* KI-generierte Bilder (Kundenwunsch 16.10.2026, Jamil: „Diese Bilder sind KI“).
   Jedes hier gelistete Bild bekommt automatisch den Hinweis „KI-generiertes Bild“ –
   überall, wo es verwendet wird (Img, Startseiten-Hero, Leistungs-Hero).
   Neue KI-Bilder einfach hier eintragen. Hintergrund: Transparenz nach Art. 50 EU-KI-Verordnung. */
export const KI_BILDER = new Set<string>([
  "hero.webp",                           // Startseite
  "hero-sanierung-modernisierung.webp",  // Leistung Sanierung & Modernisierung
  "ref-04-altbau.webp",                  // Leistung Immobilien-Sanierungscheck (+ Referenz-Galerie)
  "hero-referenzen.webp",                // Referenzen
  "hero-ueber-uns.webp",                 // Über uns
  "team.webp",                           // Karriere
  "hero-partner.webp",                   // Partner
]);
export const istKiBild = (datei?: string): boolean => Boolean(datei && KI_BILDER.has(datei));
