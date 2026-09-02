/** Startseiten-Inhalte (Dramaturgie nach Spec §3).
 *  Bilder: vorhandene Dateien aus public/assets/img/ – Zuordnung siehe BILDER.md. */

export const HERO = {
  eyebrow: "Meisterbetrieb für Norderstedt, Hamburg & Umgebung",
  /** Headline: "Ihr <rotierender Begriff> zum Festpreis" – Begriffe rollen per CSS. */
  vor: "Ihr",
  nach: "zum Festpreis",
  /** Rotierende Begriffe (erster = Fallback ohne Animation/reduced motion). */
  begriffe: ["neues Bad", "Zuhause", "neues Dach", "Innenausbau", "Projekt"],
  sub: "Ein Ansprechpartner. Alle Gewerke. Ein fester Preis.",
  checks: ["Festpreis-Garantie", "Alles aus einer Hand", "Verbindlicher Zeitplan"],
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
    accent: "3 Wochen",
    text:
      "Vom Abriss bis zur letzten Silikonfuge: Wir bauen Ihr Bad komplett um – " +
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
      "Decken mit Beleuchtung: Unser Trockenbau schafft Räume, die zu Ihrem Leben " +
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
      "Der schnellste Weg zu einem neuen Wohngefühl: professionell gestrichene Wände " +
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
      "Neue Leitungen, moderne Elektrik, effiziente Heizungsverteilung: Wir erneuern " +
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
      "kennt Ihre Baustelle persönlich und ist in 24 Stunden erreichbar, auch per WhatsApp.",
    bild: "hero-ueber-uns.webp",
    alt: "Bauwelt-Team auf der Baustelle",
  },
  {
    icon: "hand",
    title: "Alles aus einer Hand",
    text:
      "Fliesenleger, Sanitär, Elektrik, Maler: Bei uns koordinieren Sie keine fünf " +
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

export const STEPS = [
  {
    title: "Projekt berechnen",
    text: "Beschreiben Sie Ihr Vorhaben im Online-Rechner – Sie sehen sofort eine erste Preisspanne, unverbindlich und ohne Angabe von Kontaktdaten.",
  },
  {
    title: "Vor-Ort-Termin",
    text: "Wir schauen uns Ihr Projekt persönlich an, beraten zu Ausstattung und Möglichkeiten und nehmen alle Maße auf.",
  },
  {
    title: "Festpreis-Angebot",
    text: "Sie erhalten ein schriftliches Angebot mit festem Preis und verbindlichem Zeitplan – transparent aufgeschlüsselt.",
  },
  {
    title: "Umsetzung & Übergabe",
    text: "Unser Team setzt um, Ihr Ansprechpartner hält Sie auf dem Laufenden. Am Ende: Abnahme, Übergabe, besenrein.",
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
    a: "Eine Badsanierung dauert bei uns in der Regel rund 3 Wochen, größere Sanierungen planen wir individuell. Vor Beginn erhalten Sie einen verbindlichen Zeitplan mit Start- und Endtermin.",
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
  pre: "Ihr Zuhause, Ihr Projekt – jetzt ",
  accent: "berechnen",
  text: "In einer Minute zur ersten Preisspanne. Unverbindlich, ohne Kontaktdaten.",
  checks: ["Festpreis nach Vor-Ort-Termin", "Alles aus einer Hand", "Antwort in 24 Stunden"],
};
