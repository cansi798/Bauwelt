/** Startseiten-Inhalte (Dramaturgie nach Spec §3).
 *  Bilder: vorhandene Dateien aus public/assets/img/ – Zuordnung siehe BILDER.md. */

export const HERO = {
  /** Positionierung laut Kundenfeedback 12.09.2026 (wörtlich nach Vorlage). */
  eyebrow: "Ihr Partner für Badsanierung und Innenausbau in Hamburg & Umgebung – Selbstverständlich alles aus einer Hand!",
  /** Mobile Kurzfassung – der volle Satz sprengt den kleinen Viewport. */
  eyebrowKurz: "Badsanierung & Innenausbau – alles aus einer Hand",
  /** Headline: "Bereit für Ihr neues <rotierender Begriff>" – Begriffe rollen per CSS. */
  vor: "Bereit für Ihr neues",
  nach: "",
  /** Rotierende Begriffe (erster = Fallback ohne Animation/reduced motion). */
  begriffe: ["Badezimmer?", "Zuhause?", "Projekt?"],
  /** Eigenes Statement über der Unterzeile (Vorlage: eigene Zeile). */
  statement: "Handwerk, wie es heute sein sollte.",
  sub:
    "Wir verbinden handwerkliche Qualität mit klaren Prozessen, " +
    "digitalem Kundenservice und voller Transparenz.",
  /** Die fünf Zusagen aus dem Kundenpapier (ersetzen Häkchen + Pillen). */
  checks: [
    "Antwort innerhalb von 12 Stunden",
    "Angebot innerhalb von 24 Stunden",
    "Ein persönlicher Ansprechpartner",
    "Kundenportal mit Live-Projektstatus",
    "Transparente Festpreise für alle vereinbarten Leistungen",
  ],
  /** Kurzformen für den Zusagen-Wechsler: 2 Gruppen à 3, sliden horizontal durch. */
  checksKurz: [
    "Antwort in 12 Stunden",
    "Angebot in 24 Stunden",
    "Ein persönlicher Ansprechpartner",
    "Kundenportal mit Live-Status",
    "Transparente Festpreise",
    "Alles aus einer Hand",
  ],
  note: "Unverbindlich · Ergebnis in 60 Sekunden",
  cta2: { label: "Kostenlosen Besichtigungstermin buchen", href: "#termin" },
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

/** „Ihr Weg zum neuen Badezimmer" – sechs Schritte laut Kundenfeedback 12.09.2026.
 *  `kurz` = scannbare Zeile (sichtbar), `text` = voller Kundentext (aufklappbar,
 *  bleibt im DOM und damit für Suchmaschinen indexierbar). */
export const STEPS = [
  {
    title: "Orientierung erhalten",
    kurz: "Erste Preisspanne in wenigen Minuten – mit dem Projektrechner.",
    text: "Mit unserem Projektrechner erhalten Sie in wenigen Minuten eine erste transparente Preiseinschätzung und wissen schnell, in welchem Kostenrahmen sich Ihr Vorhaben bewegt.",
  },
  {
    title: "Wünsche besprechen",
    kurz: "Persönlicher Vor-Ort-Termin für Ihre Ideen und Fragen.",
    text: "Bei einem persönlichen Vor-Ort-Termin nehmen wir uns Zeit für Ihre Ideen, beantworten Ihre Fragen und entwickeln gemeinsam die passende Lösung.",
  },
  {
    title: "Transparentes Angebot erhalten",
    kurz: "Detailliertes Angebot innerhalb von 24 Stunden.",
    text: "Innerhalb von 24 Stunden erhalten Sie ein detailliertes Angebot, damit Sie schnell Klarheit über Leistungen, Kosten und den weiteren Ablauf haben.",
  },
  {
    title: "Projekt beauftragen",
    kurz: "Angebot online prüfen und mit wenigen Klicks freigeben.",
    text: "Prüfen Sie Ihr Angebot bequem online, stellen Sie Rückfragen oder geben Sie Ihr Projekt mit wenigen Klicks frei.",
  },
  {
    title: "Entspannt zurücklehnen",
    kurz: "Wir koordinieren alle Gewerke und halten Sie auf dem Laufenden.",
    text: "Wir koordinieren alle Gewerke, organisieren die Abläufe und halten Sie jederzeit über den aktuellen Projektstand informiert.",
  },
  {
    title: "Das Ergebnis genießen",
    kurz: "Gemeinsame Abnahme – dann ist Ihr neues Zuhause fertig.",
    text: "Nach der Fertigstellung und gemeinsamen Abnahme können Sie Ihr neues Badezimmer, Zuhause oder Projekt in vollen Zügen genießen.",
  },
];

/** Kundenportal-Sektion („So behalten Sie Ihr Projekt jederzeit im Blick"). */
export const PORTAL = {
  intro:
    "Während der gesamten Projektlaufzeit haben Sie Zugriff auf Angebote, Dokumente, " +
    "Termine und den aktuellen Projektstand – per WhatsApp oder E-Mail, wie Sie möchten.",
  kacheln: [
    {
      icon: "doc",
      title: "Alle Dokumente an einem Ort",
      text: "Angebote, Rechnungen und wichtige Unterlagen jederzeit abrufbar.",
    },
    {
      icon: "calendar",
      title: "Termine im Überblick",
      text: "Alle wichtigen Termine und Projektinformationen zentral verfügbar.",
    },
    {
      icon: "chat",
      title: "Kommunikation nach Wunsch",
      text: "Sie entscheiden selbst, ob die Kommunikation per WhatsApp oder E-Mail erfolgt.",
    },
    {
      icon: "shield",
      title: "Volle Transparenz",
      text: "Wichtige Informationen zu Ihrem Projekt stehen jederzeit zur Verfügung.",
    },
  ],
  schluss:
    "Schluss mit langen E-Mail-Verläufen, fehlenden Dokumenten und der Frage, " +
    "was als Nächstes passiert. Bei uns behalten Sie jederzeit den Überblick.",
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

/** Gewerke-Karten („Zurücklehnen statt koordinieren") – verlinken auf Leistungsseiten.
 *  Fotos: vorhandene Gewerk-Bilder aus assets/img/ (BILDER.md). */
export const GEWERKE_KARTEN = [
  {
    icon: "bath",
    title: "Bad & Sanitär",
    text: "Sanitärinstallationen, Armaturen, Duschen, WCs, Rohrleitungen und Badmodernisierung.",
    slug: "badsanierung",
    bild: "hero-badsanierung.webp",
    alt: "Modern saniertes Badezimmer mit bodengleicher Dusche",
  },
  {
    icon: "wall",
    title: "Wände & Raumgestaltung",
    text: "Mauerarbeiten, Ytong-Arbeiten, Trockenbau, Spachtelarbeiten und Raumaufteilungen.",
    slug: "innenausbau",
    bild: "hero-innenausbau.webp",
    alt: "Heller Innenausbau mit neuen Trockenbauwänden",
  },
  {
    icon: "paint",
    title: "Oberflächen & Gestaltung",
    text: "Fliesenarbeiten, Malerarbeiten, Bodenbeläge und Oberflächenbearbeitung.",
    slug: "maler-boeden",
    bild: "hero-maler-boeden.webp",
    alt: "Frisch gestrichener Raum mit neuem Bodenbelag",
  },
  {
    icon: "tools",
    title: "Technik & Anschlüsse",
    text: "Elektroarbeiten, Beleuchtung, Steckdosen, Schalter und Anschlüsse.",
    slug: "sanitaer-heizung-elektro",
    bild: "hero-sanitaer-heizung-elektro.webp",
    alt: "Neu installierte Haustechnik im Trockenbau",
  },
  {
    icon: "reno",
    title: "Innenausbau & Modernisierung",
    text: "Umbauten, Renovierungen und die Koordination aller weiteren Arbeiten.",
    slug: "sanierung-modernisierung",
    bild: "hero-sanierung-modernisierung.webp",
    alt: "Modernisierter Wohnraum nach Komplettsanierung",
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
  pre: "So sollte Handwerk ",
  accent: "sein",
  sub: "Planbar. Transparent. Verlässlich.",
  text: "Wenn Sie das genauso sehen, freuen wir uns darauf, Ihr Projekt kennenzulernen.",
  checks: ["Antwort in 12 Stunden", "Angebot in 24 Stunden", "Festpreis für alle vereinbarten Leistungen"],
  /** Zweit-CTA – Ziel setzt die Seite (Startseite: #termin, sonst kontakt/#termin). */
  cta2Label: "Beratung vereinbaren",
};
