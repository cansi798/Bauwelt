/** Startseiten-Inhalte (Dramaturgie nach Spec §3).
 *  Bilder: vorhandene Dateien aus public/assets/img/ – Zuordnung siehe BILDER.md. */
import { u } from "../consts";

export const HERO = {
  /** Positionierung laut Kundenfeedback 28.09.2026 (wörtlich nach Vorlage) –
   *  kurz genug für Mobil und Desktop, daher keine eigene Kurzfassung mehr. */
  eyebrow: "Badsanierung & Innenausbau für Hamburg & Umgebung",
  /** Headline: "Bereit für Ihr neues <rotierender Begriff>" – Begriffe rollen per CSS. */
  vor: "Bereit für Ihr neues",
  nach: "",
  /** Rotierende Begriffe (erster = Fallback ohne Animation/reduced motion). */
  begriffe: ["Badezimmer?", "Zuhause?", "Projekt?"],
  /** Statement groß, darunter klein und nicht fett die Unterzeile
   *  (Kundenfeedback 30.09.2026 – Stichsätze + „60 Sekunden" entfallen). */
  statement: "Handwerk, wie es heute sein sollte.",
  unterzeile: "Klare Prozesse. Transparente Kommunikation. Ein Ansprechpartner, der Verantwortung übernimmt.",
  bild: "hero.webp",
};

export const STATS = [
  { value: 30, prefix: "", suffix: "+", label: "sanierte Bäder" },
  { value: 15, prefix: "", suffix: "+", label: "Komplettsanierungen" },
  { value: 10, prefix: "", suffix: "+", label: "Jahre Erfahrung" },
  { value: 24, prefix: "", suffix: " h", label: "Reaktionszeit" },
];

/** Eine Bild-Text-Sektion je Gewerk (Enpal-Produktsektions-Muster). */
export type LeistungSection = {
  slug: string;        // Leistungs-Seite + Rechner-Vorauswahl
  eyebrow: string;
  pre: string;
  accent: string;      // goldenes Wort in der Headline
  text: string;
  bild: string;        // Datei in assets/img/
  alt: string;
  cta: string;
};

export const LEISTUNG_SECTIONS: LeistungSection[] = [
  {
    slug: "badsanierung",
    eyebrow: "Badsanierung",
    pre: "Ihr neues Bad – fertig in ",
    accent: "2 Wochen",
    text:
      "Vom Abriss bis zur letzten Silikonfuge – wir bauen Ihr Bad komplett um. " +
      "Fliesen, Sanitär, Elektrik, bodengleiche Dusche. Sie wählen die Ausstattung, " +
      "wir nennen Ihnen vorab einen festen Preis und einen festen Fertigstellungstermin.",
    bild: "hero-badsanierung.webp",
    alt: "Modern saniertes Badezimmer mit bodengleicher Dusche",
    cta: "Bad berechnen",
  },
  {
    slug: "sanierung-modernisierung",
    eyebrow: "Sanierung & Modernisierung",
    pre: "Aus alt wird ",
    accent: "Zuhause",
    text:
      "Wohnung geerbt, Haus gekauft, Altbau in die Jahre gekommen? Wir modernisieren " +
      "komplett – von der Renovierung einzelner Räume bis zur Kernsanierung. " +
      "Ein Zeitplan, ein Festpreis, ein Ansprechpartner für alle Gewerke.",
    bild: "hero-sanierung-modernisierung.webp",
    alt: "Heller modernisierter Wohnraum mit hohen Decken",
    cta: "Sanierung berechnen",
  },
  {
    slug: "innenausbau",
    eyebrow: "Innenausbau & Trockenbau",
    pre: "Mehr Raum, mehr ",
    accent: "Möglichkeiten",
    text:
      "Neue Raumaufteilung, ausgebautes Dachgeschoss, Schallschutz oder abgehängte " +
      "Decken mit Beleuchtung. Unser Trockenbau schafft Räume, die zu Ihrem Leben " +
      "passen – sauber ausgeführt und streichfertig übergeben.",
    bild: "hero-innenausbau.webp",
    alt: "Heller Innenausbau mit Rundbogenfenstern im Rohbau",
    cta: "Ausbau berechnen",
  },
  {
    slug: "dach-fassade",
    eyebrow: "Dach & Fassade",
    pre: "Dicht, gedämmt, ",
    accent: "wertsteigernd",
    text:
      "Ein saniertes Dach und eine gedämmte Fassade schützen Ihr Haus und senken " +
      "Ihre Heizkosten dauerhaft. Wir decken neu ein, dämmen nach aktuellem Standard " +
      "und erneuern Rinnen und Anschlüsse – wetterfest zum Festpreis.",
    bild: "hero-dach-fassade.webp",
    alt: "Dachdecker bei der Neueindeckung eines Ziegeldachs",
    cta: "Dach berechnen",
  },
  {
    slug: "maler-boeden",
    eyebrow: "Maler & Bodenbeläge",
    pre: "Frische Wände, neue ",
    accent: "Böden",
    text:
      "Der schnellste Weg zu einem neuen Wohngefühl sind professionell gestrichene Wände " +
      "und ein neuer Boden – Vinyl, Laminat oder Parkett. Wir arbeiten staubarm, " +
      "abgeklebt und besenrein, auch bewohnt kein Problem.",
    bild: "hero-maler-boeden.webp",
    alt: "Frisch gestrichener Raum mit neuem Bodenbelag",
    cta: "Projekt berechnen",
  },
  {
    slug: "sanitaer-heizung-elektro",
    eyebrow: "Sanitär, Heizung, Elektro",
    pre: "Technik, die einfach ",
    accent: "läuft",
    text:
      "Neue Leitungen, moderne Elektrik, effiziente Heizungsverteilung – wir erneuern " +
      "die Technik hinter Ihren Wänden – fachgerecht installiert und dokumentiert. " +
      "Damit Sie sich die nächsten Jahrzehnte keine Gedanken machen müssen.",
    bild: "hero-sanitaer-heizung-elektro.webp",
    alt: "Neu installierter Heizkreisverteiler im Trockenbau",
    cta: "Technik berechnen",
  },
];

export const VIDEO = {
  eyebrow: "So arbeiten wir",
  pre: "Aus Baustelle wird ",
  accent: "Zuhause",
  /** YouTube-/Video-URL eintragen, sobald vorhanden (OFFENE-INFOS.md).
   *  Leer = animierte Zeichnungs-Szene statt Video. */
  url: "",
  poster: "video-poster.webp",
  text:
    "Erst der Riss in der Wand, dann der Plan, dann warmes Licht im neuen Zuhause – " +
    "so fühlt es sich an, wenn wir fertig sind. Kommen Sie zu uns, wir zeigen es Ihnen.",
};

export const USP = [
  {
    icon: "pin",
    title: "Regional & persönlich",
    text:
      "Wir kommen aus Norderstedt – nicht aus einem Callcenter. Ihr Ansprechpartner " +
      "kennt Ihre Baustelle persönlich und antwortet innerhalb von 12 Stunden, auch per WhatsApp.",
    bild: "hero-ueber-uns.webp",
    alt: "Bauwelt-Team auf der Baustelle",
  },
  {
    icon: "hand",
    title: "Alles aus einer Hand",
    text:
      "Fliesenleger, Sanitär, Elektrik, Maler – bei uns koordinieren Sie keine fünf " +
      "Firmen. Wir steuern alle Gewerke selbst – deshalb greifen die Termine ineinander.",
    bild: "team.webp",
    alt: "Team bespricht Wandöffnung im Rohbau",
  },
  {
    icon: "euro",
    title: "Zum Festpreis fertig",
    text:
      "Nach dem Vor-Ort-Termin bekommen Sie einen festen Preis und einen festen " +
      "Endtermin – schriftlich. Keine Nachträge, keine Überraschungen auf der Rechnung.",
    bild: "hero-kontakt.webp",
    alt: "Handschlag zwischen Handwerker und Kunde",
  },
];

/** „Ihr Weg zum neuen Badezimmer" – vier Schritte laut Kundenfeedback 28.09.2026.
 *  Die Kundentexte sind bereits kurz – daher kein `kurz`/„Mehr dazu“ nötig. */
export const STEPS = [
  // 4 Schritte wörtlich nach Kundenfeedback 28.09.2026 (Abschnitt 1)
  {
    title: "Orientierung erhalten",
    text: "Erhalten Sie in wenigen Minuten eine erste Preiseinschätzung für Ihr Projekt.",
  },
  {
    title: "Wünsche besprechen",
    text: "Besprechen Sie Ihre Ideen und Anforderungen bei einem persönlichen Termin.",
  },
  {
    title: "Klarheit erhalten",
    text: "Erhalten Sie innerhalb von 24 Stunden ein transparentes Angebot und geben Sie Ihr Projekt digital frei.",
  },
  {
    title: "Zurücklehnen & genießen",
    text: "Wir koordinieren die Umsetzung und halten Sie jederzeit auf dem Laufenden.",
  },
];

/** Kundenportal-Sektion („So behalten Sie Ihr Projekt jederzeit im Blick"). */
export const PORTAL = {
  // Wörtlich nach Kundenfeedback 28.09.2026 (Abschnitt 2)
  sub:
    "Schluss mit langen E-Mail-Verläufen, fehlenden Dokumenten und der Frage, " +
    "was als Nächstes passiert. Bei uns behalten Sie jederzeit den Überblick.",
  kacheln: [
    {
      icon: "doc",
      title: "Alle Dokumente an einem Ort",
      text: "Angebote, Rechnungen und wichtige Unterlagen jederzeit abrufbar.",
    },
    {
      icon: "calendar",
      title: "Alle Termine im Blick",
      text: "Nächste Schritte, Termine und wichtige Projektinformationen zentral verfügbar.",
    },
    {
      icon: "chat",
      title: "Kommunikation nach Wunsch",
      text: "Sie entscheiden selbst, ob wir per WhatsApp oder E-Mail kommunizieren.",
    },
    {
      icon: "arrow",
      title: "Jederzeit wissen, was als Nächstes passiert",
      text: "Vom Angebot bis zur Fertigstellung behalten Sie den Überblick.",
    },
  ],
};

/** Angebots-Sektion („Transparente Angebote statt Positionsdschungel"). */
export const ANGEBOT = {
  sub:
    "Wir glauben, dass Angebote verständlich sein sollten. Deshalb konzentrieren " +
    "wir uns auf das Wesentliche – klare Leistungen, transparente Kosten und eine " +
    "einfache Freigabe.",
  punkte: [
    "Verständlich aufgebaut",
    "Digital abrufbar",
    "Schnell prüfbar",
    "Ohne unübersichtliche Kleinstpositionen",
  ],
  /** Markierungen am Angebots-Mockup. */
  marker: [
    "Festpreis",
    "Leistungsumfang",
    "Projektbeschreibung",
    "Digitale Freigabe",
    "Material- und Arbeitskosten getrennt für die Steuererklärung",
  ],
};

/** Leistungs-Karten der Startseite – Fotos aus der Referenz-Galerie. */
export const LEISTUNG_KARTEN = [
  // Startseite „Unsere Leistungen – Wobei wir Sie unterstützen" (Kundenfeedback
  // 07.10.2026): die vier Leistungen aus dem Header-Menü + Immobilien-Sanierungscheck.
  {
    icon: "bath",
    title: "Badsanierung",
    text: "Ihr neues Bad in 2 Wochen – geplant, gebaut und übergeben aus einer Hand.",
    href: u("leistungen/badsanierung/"),
    bild: "galerie-bad-02.webp",
    alt: "Saniertes Bad mit Natursteinoptik und beleuchtetem Spiegel",
  },
  {
    icon: "reno",
    title: "Sanierung & Modernisierung",
    text: "Von der Einzelmaßnahme bis zur Kernsanierung – alle Gewerke koordiniert.",
    href: u("leistungen/sanierung-modernisierung/"),
    bild: "galerie-sanierung-02.webp",
    alt: "Modernisierte Küche mit beleuchteter Kochinsel",
  },
  {
    icon: "tiles",
    title: "Fliesen- & Bodenlegerarbeiten",
    text: "Perfekte Oberflächen für Wand und Boden – vom Großformat bis zum Parkett.",
    href: u("leistungen/fliesen-boden/"),
    bild: "galerie-fliesen-03.webp",
    alt: "Raumhohe Fliesen in Marmoroptik",
  },
  {
    icon: "wall",
    title: "Innenausbau & Trockenbau",
    text: "Räume neu gestalten und optimal nutzen – Wände, Decken, Licht und Akustik.",
    href: u("leistungen/innenausbau/"),
    bild: "galerie-innenausbau-04.webp",
    alt: "Büro mit Holzlamellen-Wand und indirekter Beleuchtung",
  },
  {
    icon: "eye",
    title: "Immobilien-Sanierungscheck",
    text: "Chancen, Risiken und Kosten frühzeitig erkennen.",
    // Noch keine eigene Seite → öffnet das Buchungsfenster (Besichtigungstermin)
    termin: true,
    bild: "ref-04-altbau.webp",
    alt: "Altbau-Wohnraum mit Fischgrätparkett und hohen Decken",
  },
];

export const FAQ_HOME = [
  {
    q: "Was kostet meine Sanierung?",
    a: "Das hängt von Umfang und Ausstattung ab – unser Online-Rechner gibt Ihnen in einer Minute eine erste Preisspanne. Den festen Preis nennen wir Ihnen nach einem kostenlosen Vor-Ort-Termin, schriftlich und verbindlich.",
  },
  {
    q: "Gilt der Festpreis wirklich?",
    a: "Ja. Der Preis aus dem Angebot ist der Preis auf der Rechnung. Nur wenn Sie nachträglich zusätzliche Leistungen beauftragen, ändert er sich – vorher schriftlich vereinbart, nie einfach auf der Rechnung.",
  },
  {
    q: "Wie lange dauert mein Projekt?",
    a: "Eine Badsanierung dauert bei uns in der Regel rund 2 Wochen, größere Sanierungen planen wir individuell. Vor Beginn erhalten Sie einen verbindlichen Zeitplan mit Start- und Endtermin.",
  },
  {
    q: "Muss ich während der Arbeiten ausziehen?",
    a: "Meistens nicht. Wir arbeiten mit Staubschutz, abgedeckten Wegen und täglicher Grundordnung, damit Wohnen neben der Baustelle funktioniert. Bei Kernsanierungen besprechen wir das gemeinsam im Vor-Ort-Termin.",
  },
  {
    q: "In welcher Region sind Sie tätig?",
    a: "Wir arbeiten in Norderstedt, Hamburg und Umgebung. Ob Ihr Projekt in unserem Einzugsgebiet liegt, klären wir gern in einem kurzen Gespräch – rufen Sie an oder buchen Sie direkt einen Termin.",
  },
];

export const CTA_BAND = {
  pre: "So sollte Handwerk ",
  accent: "sein",
  sub: "Planbar. Transparent. Verlässlich.",
  text: "Wenn Sie das genauso sehen, freuen wir uns darauf, Ihr Projekt kennenzulernen.",
  checks: ["Angebot in 24 Stunden", "Ein Ansprechpartner für alles", "Festpreis für alle vereinbarten Leistungen"],
  /** Zweit-CTA – Ziel setzt die Seite (Startseite: #termin, sonst kontakt/#termin). */
  cta2Label: "Beratung vereinbaren",
};
