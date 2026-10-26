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
  hours: "Mo. – Fr. 08:00 bis 18:00 Uhr", // Jamil 26.10.2026 (Talk, Bild 19811): überall diese Schreibweise
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
 *  und primär, der Nutzen (nutzen, früher ueberschrift) klein darunter (Nutzen seit 20.10., Talk 2564).
 *  Reihenfolge: oben Badsanierung + Komplettsanierung, ganz unten die beiden Checks –
 *  hervorgehoben (gold, unter Trennlinie) wie zuvor der Sanierungscheck.
 *  `kurz`: Kurzname für Sätze wie „Warum Badsanierung mit Bauwelt Handwerk?“ (Standard: unterschrift). */
export type Leistung = {
  slug: string;
  /** Kundennutzen der Leistung in einer Zeile (max. ~50 Zeichen) – Unterzeile unter dem Namen überall. */
  nutzen: string;
  unterschrift: string;
  kurz?: string;
  icon: string;
  hervorheben?: boolean;
};
// Kundenwunsch 20.10.2026 (Jamil, Talk 2564): Unterzeile = konkreter KUNDENNUTZEN je Leistung (Feld `nutzen`),
// Leistungsname bleibt. Kein allgemeines Versprechen (Festpreis, Zeitplan …) – die stehen in
// versprechen.ts (AUDIT-REGELN 2a). Wortlaut aus früheren Nutzen-Texten/Claims (git-Historie).
// Davor 19.10. (Audit 7.8): „Persönlich beraten, zum Festpreis umgesetzt“, „Ein Zeitplan. Ein Festpreis.“,
// „Präzise verlegt, fest kalkuliert“, „Mit festem Preis und festem Plan“, „Klarheit vor dem
// Immobilienkauf“, „Sicher und selbstbestimmt wohnen“.
export const LEISTUNGEN: Leistung[] = [
  { slug: "badsanierung", nutzen: "Endlich ein Bad, in dem Sie sich rundum wohlfühlen", unterschrift: "Badsanierung", kurz: "Badsanierung", icon: "bath" },
  { slug: "sanierung-modernisierung", nutzen: "Auf heutigem Stand: technisch und optisch", unterschrift: "Komplettsanierung & Modernisierung", icon: "reno" },
  { slug: "fliesen-boden", nutzen: "Gerade Kanten, saubere Fugen, lange Freude", unterschrift: "Fliesen- & Bodenlegerarbeiten", icon: "tiles" },
  { slug: "innenausbau", nutzen: "Mehr aus Ihren Räumen machen – nach Maß", unterschrift: "Innenausbau & Trockenbau", icon: "wall" },
  // Pauschalpreis-Leistungen (Preis steht in content/leistungen/<slug>.md)
  { slug: "sanierungscheck", nutzen: "Risiken und Kosten kennen, bevor Sie kaufen", unterschrift: "Immobilien-Sanierungscheck", icon: "eye", hervorheben: true },
  // Kundenwunsch 17.10.2026 (82): kein „Zuhause-Check 60+“ – ohne Altersbezug.
  // Jamil 21.10.2026 (Msg 2884/2885): Name überall „Sicher-wohnen-Check“ (Duden: Durchkopplung, wie
  // „Immobilien-Sanierungscheck“) statt „Sicher wohnen. Heute und morgen.“ – Adresse /leistungen/sicher-wohnen/ bleibt.
  { slug: "sicher-wohnen", nutzen: "Ihr Zuhause sicherer, komfortabler, barrierearm", unterschrift: "Sicher-wohnen-Check", icon: "heim", hervorheben: true },
];
export const leistungBySlug = (slug: string): Leistung | undefined => LEISTUNGEN.find((l) => l.slug === slug);
/** Kurzname einer Leistung (für Fließtext-Sätze). */
export const kurzName = (l: Leistung): string => l.kurz ?? l.unterschrift;

/** Navigation mit Dropdown-Gruppen (Desktop: Mega-Dropdown, Mobil: aufklappbare Gruppen). */
export const NAV2: NavItem[] = [
  {
    label: "Leistungen",
    // Kundenwunsch 19.10.2026 (Audit 1.3): fett = Leistungsname (unterschrift), grau = Kundennutzen (nutzen).
    // Dach & Fassade, Maler & Böden, Sanitär/Heizung/Elektro sind seit Kundenwunsch 12.10.2026 (18)
    // ganz abgeschaltet (Inhalte in archiv/leistungen-abgeschaltet/).
    // Kundenwunsch 15.10.2026 (71): „Alle Leistungen im Überblick“ + Übersichtsseite entfernt
    children: LEISTUNGEN.map((l) => ({
      label: l.unterschrift,
      desc: l.nutzen,
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
    "Innenausbau & Trockenbau, den Immobilien-Sanierungscheck oder den Sicher-wohnen-Check. " +
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
  "hero-sanierung-modernisierung.webp",  // (früher Leistungs-Hero Komplettsanierung + Sicher wohnen, seit 21.10.2026 ki-hero-*)
  "ref-04-altbau.webp",                  // Referenz-Galerie (früher Hero Immobilien-Sanierungscheck)
  // Leistungs-Heros (Jamil 20.10.2026, Talk 2784): KI-Bild passend zur Leistung, je Leistung
  // ki-hero-<slug>-{828,1280,1920,2560}.{avif,webp}. Erzeugt 21.10.2026 mit Seedream 5 Lite
  // (ElevenLabs), 2560 × 1440, Prompts in content/leistungen/<slug>.md (heroPrompt). Eintrag = Stamm.
  "ki-hero-badsanierung.webp",
  "ki-hero-sanierung-modernisierung.webp",
  "ki-hero-fliesen-boden.webp",
  "ki-hero-innenausbau.webp",
  "ki-hero-sanierungscheck.webp",
  "ki-hero-sicher-wohnen.webp",
  "hero-referenzen.webp",                // Referenzen
  "hero-ueber-uns.webp",                 // (früher Über uns – Bagger-Bild, seit 19.10.2026 nicht mehr verwendet)
  "team-fiktiv.webp",                    // (früher Platzhalter Über uns – seit 21.10.2026 gezeichnetes Team, Msg 2865)
  // team.webp (Karriere) entfällt seit 20.10.2026 (Gesamt-Audit T3): dort jetzt gezeichnete Gesichter, Datei gelöscht
  // hero-partner.webp (Partner) entfällt seit 21.10.2026 (Jamil, Msg 2899): gezeichnete Szene, Datei gelöscht
]);
/** Größen-Varianten eines Bildes (name-1920.webp, name-828.avif …) zählen wie der Stamm (name.webp). */
const kiStammName = (datei: string): string => datei.replace(/-\d{3,4}(\.\w+)$/, "$1").replace(/\.avif$/, ".webp");
export const istKiBild = (datei?: string): boolean => Boolean(datei && (KI_BILDER.has(datei) || KI_BILDER.has(kiStammName(datei))));
/** Breiten der KI-Leistungs-Heros (Dateien ki-hero-<slug>-<breite>.avif/.webp). */
export const KI_HERO_BREITEN = [828, 1280, 1920, 2560] as const;
/** „ki-hero-badsanierung.webp“ → „ki-hero-badsanierung“ (sonst undefined = einzelnes Bild). */
export const kiHeroStamm = (datei: string): string | undefined => /^ki-hero-[a-z-]+\.webp$/.test(datei) ? datei.replace(/\.webp$/, "") : undefined;
