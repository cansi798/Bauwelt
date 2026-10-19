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
  hours: "Mo–Fr 8–18 Uhr", // Audit 4.9: überall gleiche Schreibweise
  managing: "Burim Ahmedi",
  register: "HRB 27109 KI, Amtsgericht Kiel",
  vat: "DE450901631",
};

/** Haupt-CTA der ganzen Website (Enpal-Muster: ein Ziel, überall wiederholt). */
// Kundenwunsch 19.10.2026 (Audit 4.4): ein Name für den Rechner-Weg – „Preis berechnen“
export const CTA = { label: "Preis berechnen", href: u("rechner/") };

/** Button der festen Leiste unten (Audit 1.7, siehe StickyBar.astro). */
export type StickyKnopf = { label: string; href: string; extern?: boolean; termin?: boolean; ariaLabel?: string };

/** Rückruf-Formular (Kundenwunsch 19.10.2026, Audit 6.3): Anfragen gehen an service@.
 *  endpoint leer = Versand über das E-Mail-Programm des Besuchers (mailto), da die Seite statisch
 *  ist. Sobald ein Server-Endpunkt existiert (POST JSON → Mail an `an`), hier eintragen –
 *  dann auch die Datenschutzerklärung (Ziffer 6) um den Server/Dienst ergänzen. */
export const RUECKRUF = { an: EMAILS.service, endpoint: "" };

/** Kostenloser Vor-Ort-Termin (Kundenfeedback 30.09.2026): Alle Termin-Buttons öffnen
 *  per JS das Buchungsfenster (BookingDialog, `data-termin`). Ohne JS führt der
 *  Link direkt zum Relexable-Buchungsportal (neuer Tab). */
export const TERMIN = {
  // Kundenwunsch 19.10.2026 (Audit 4.1): EIN Begriff überall – „Kostenloser Vor-Ort-Termin“
  label: "Kostenlosen Vor-Ort-Termin buchen",
  kurz: "Vor-Ort-Termin buchen",
  begriff: "Kostenloser Vor-Ort-Termin",
  href: "https://portal.bauwelt-handwerk.de/buchen",
};

export type NavChild = {
  label: string; href: string; icon?: string; desc?: string;
  /** Gold hervorgehoben, unter einer Trennlinie (wie bisher der Sanierungscheck). */
  hervorheben?: boolean;
};
export type NavItem = { label: string; href?: string; children?: NavChild[] };

/** Leistungen – EINZIGE Quelle für Namen und Reihenfolge (Menü, Mobilmenü, Footer, Startseiten-
 *  Karten, Rechner, Leistungsseiten). Kundenwunsch 16.10.2026 (73): Jede Leistung hat eine
 *  Überschrift (emotionaler Slogan) und eine Unterschrift (Leistungsname).
 *  Kundenwunsch 19.10.2026 (Audit 1.3): überall steht der LEISTUNGSNAME (unterschrift) fett
 *  und primär, der Slogan (ueberschrift) klein darunter – Wortlaut beider unverändert.
 *  Reihenfolge: oben Badsanierung + Komplettsanierung, ganz unten die beiden Checks –
 *  hervorgehoben (gold, unter Trennlinie) wie zuvor der Sanierungscheck.
 *  `kurz`: Kurzname für Sätze wie „Warum Badsanierung mit Bauwelt Handwerk?“ (Standard: unterschrift). */
export type Leistung = {
  slug: string;
  ueberschrift: string;
  unterschrift: string;
  kurz?: string;
  icon: string;
  hervorheben?: boolean;
};
// Kundenwunsch 19.10.2026 (Audit 7.8): Slogans der vier Gewerke näher an den eigenen Stärken
// (früher „Ihr neues Badezimmer beginnt hier“, „Aus Alt wird Zuhause“, „Oberflächen, die Eindruck
// hinterlassen“, „Räume neu denken“). Die Checks behalten ihre Slogans.
export const LEISTUNGEN: Leistung[] = [
  { slug: "badsanierung", ueberschrift: "Persönlich beraten, zum Festpreis umgesetzt", unterschrift: "Badsanierung aus einer Hand", kurz: "Badsanierung", icon: "bath" },
  { slug: "sanierung-modernisierung", ueberschrift: "Ein Zeitplan. Ein Festpreis.", unterschrift: "Komplettsanierung & Modernisierung", icon: "reno" },
  { slug: "fliesen-boden", ueberschrift: "Präzise verlegt, fest kalkuliert", unterschrift: "Fliesen- & Bodenlegerarbeiten", icon: "tiles" },
  { slug: "innenausbau", ueberschrift: "Mit festem Preis und festem Plan", unterschrift: "Innenausbau & Trockenbau", icon: "wall" },
  // Pauschalpreis-Leistungen (Preis steht in content/leistungen/<slug>.md)
  { slug: "sanierungscheck", ueberschrift: "Klarheit vor dem Immobilienkauf", unterschrift: "Immobilien-Sanierungscheck", icon: "eye", hervorheben: true },
  // Kundenwunsch 17.10.2026 (82): Name „Sicher wohnen. Heute und morgen.“ statt „Zuhause-Check 60+“ – ohne Altersbezug
  { slug: "sicher-wohnen", ueberschrift: "Sicher und selbstbestimmt wohnen", unterschrift: "Sicher wohnen. Heute und morgen.", kurz: "Sicher wohnen", icon: "heim", hervorheben: true },
];
export const leistungBySlug = (slug: string): Leistung | undefined => LEISTUNGEN.find((l) => l.slug === slug);
/** Kurzname einer Leistung (für Fließtext-Sätze). */
export const kurzName = (l: Leistung): string => l.kurz ?? l.unterschrift;

/** Navigation mit Dropdown-Gruppen (Desktop: Mega-Dropdown, Mobil: aufklappbare Gruppen). */
export const NAV2: NavItem[] = [
  {
    label: "Leistungen",
    // Kundenwunsch 19.10.2026 (Audit 1.3): fett = Leistungsname (unterschrift), grau = Slogan (ueberschrift).
    // Dach & Fassade, Maler & Böden, Sanitär/Heizung/Elektro sind seit Kundenwunsch 12.10.2026 (18)
    // ganz abgeschaltet (Inhalte in archiv/leistungen-abgeschaltet/).
    // Kundenwunsch 15.10.2026 (71): „Alle Leistungen im Überblick“ + Übersichtsseite entfernt
    children: LEISTUNGEN.map((l) => ({
      label: l.unterschrift,
      desc: l.ueberschrift,
      href: u(`leistungen/${l.slug}/`),
      icon: l.icon,
      hervorheben: l.hervorheben,
    })),
  },
  { label: "Referenzen", href: u("referenzen/") },
  {
    label: "Unternehmen",
    children: [
      { label: "Über uns", href: u("ueber-uns/"), icon: "user", desc: "Team, Werte, Arbeitsweise" },
      { label: "Karriere", href: u("karriere/"), icon: "karriere", desc: "Arbeiten bei Bauwelt Handwerk" },
      // Partner war schon bisher als letzter Eintrag gold abgesetzt – bleibt so (16.10.2026 (73))
      { label: "Partner", href: u("partner/"), icon: "shield", desc: "Zusammenarbeit für Profis", hervorheben: true },
    ],
  },
  { label: "Kontakt", href: u("kontakt/") },
];

/** WhatsApp-Chat-Link mit vorbefüllter Nachricht. Standardtext nennt die 6 Leistungen (LEISTUNGEN). */
export const waLink = (
  text = "Hallo Bauwelt Handwerk, ich interessiere mich für eine Ihrer Leistungen – " +
    "Badsanierung, Komplettsanierung & Modernisierung, Fliesen- & Bodenlegerarbeiten, " +
    "Innenausbau & Trockenbau, den Immobilien-Sanierungscheck oder „Sicher wohnen. Heute und morgen.“ " +
    "Bitte melden Sie sich bei mir für ein " +
    "unverbindliches Angebot. Vielen Dank!"
): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

/* KI-generierte Bilder (Kundenwunsch 16.10.2026, Jamil: „Diese Bilder sind KI“).
   Jedes hier gelistete Bild bekommt automatisch den Hinweis „KI-generiertes Bild“ –
   überall, wo es verwendet wird (Img, Startseiten-Hero, Leistungs-Hero).
   Neue KI-Bilder einfach hier eintragen. Hintergrund: Transparenz nach Art. 50 EU-KI-Verordnung. */
export const KI_BILDER = new Set<string>([
  "hero.webp",                           // Startseite
  "hero-sanierung-modernisierung.webp",  // Leistungen Komplettsanierung & Modernisierung + Sicher wohnen
  "ref-04-altbau.webp",                  // Leistung Immobilien-Sanierungscheck (+ Referenz-Galerie)
  "hero-referenzen.webp",                // Referenzen
  "hero-ueber-uns.webp",                 // (früher Über uns – Bagger-Bild, seit 19.10.2026 nicht mehr verwendet)
  "team-fiktiv.webp",                    // Über uns: KI-Bild eines fiktiven Teams (Kundenwunsch 19.10.2026, Audit 7.1)
  "team.webp",                           // Karriere
  "hero-partner.webp",                   // Partner
]);
export const istKiBild = (datei?: string): boolean => Boolean(datei && KI_BILDER.has(datei));
