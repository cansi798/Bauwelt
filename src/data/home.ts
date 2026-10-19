/** Startseiten-Inhalte (Dramaturgie nach Spec §3).
 *  Bilder: vorhandene Dateien aus public/assets/img/ – Zuordnung siehe BILDER.md. */
import { u } from "../consts";

export const HERO = {
  /** Positionierung laut Kundenfeedback 28.09.2026 (wörtlich nach Vorlage) –
   *  kurz genug für Mobil und Desktop, daher keine eigene Kurzfassung mehr. */
  eyebrow: "Badsanierung, Fliesenarbeiten & Innenausbau für Hamburg & Umgebung",
  /** Headline: "Bereit für Ihr neues <rotierender Begriff>" – Begriffe rollen per CSS. */
  vor: "Bereit für Ihr neues",
  nach: "",
  /** Rotierende Begriffe (erster = Fallback ohne Animation/reduced motion). */
  begriffe: ["Badezimmer?", "Zuhause?", "Projekt?"],
  /** Statement groß, darunter klein und nicht fett die Unterzeile
   *  (Kundenfeedback 30.09.2026 – Stichsätze + „60 Sekunden" entfallen). */
  statement: "Handwerk, wie es heute sein sollte.",
  unterzeile: "Klare Prozesse. Transparente Kommunikation. Ein fester Ansprechpartner, der Verantwortung übernimmt.",
  bild: "hero.webp",
  /** Handy-Fassung (828 px, ca. 35 KB statt 140 KB) – SEO-/KI-Audit S6 */
  bildKlein: "hero-828.webp",
};

/** Zahlenleiste unter dem Startbild (Kundenwunsch 19.10.2026, Audit 6.6).
 *  NUR bestätigte Zahlen: 15+ Jahre (Über uns), 12 h / 24 h (Zusagen). Projektzahlen
 *  (z. B. sanierte Bäder) erst eintragen, wenn Jamil sie bestätigt – die alten Werte
 *  „30+ Bäder / 15+ Komplettsanierungen / 10+ Jahre“ waren nie freigegeben. */
export const ZAHLEN = [
  { wert: "40+", label: "sanierte Bäder" }, // bestätigt von Jamil 19.10.2026 („über 40 Bäder“)
  { wert: "15+", label: "Jahre Erfahrung im Handwerk" }, // Audit K3: Erfahrung im Handwerk (GmbH seit ca. 2024)
  { wert: "12 h", label: "bis zur Antwort (werktags)" },
  { wert: "24 h", label: "bis zum Angebot" },
];

/** Eine Bild-Text-Sektion je Gewerk (Enpal-Produktsektions-Muster) – nur die echten Leistungen. */
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
    eyebrow: "Komplettsanierung & Modernisierung",
    pre: "Aus alt wird ",
    accent: "Zuhause",
    text:
      "Wohnung geerbt, Haus gekauft, Altbau in die Jahre gekommen? Wir modernisieren " +
      "komplett – von der Renovierung einzelner Räume bis zur Kernsanierung. " +
      "Ein Zeitplan, ein Festpreis, ein fester Ansprechpartner für alle Gewerke.",
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

/** Über uns – drei Säulen. Bilder: NUR echte Bauwelt-Projektfotos (Kundenwunsch 12.10.2026 (17);
 *  vorher Stockfotos fremder Baustellen mit irreführenden Alt-Texten). */
// Kundenwunsch 14.10.2026 (37): Texte wörtlich (Über uns „Handwerk ohne Überraschungen.“)
export const USP = [
  {
    icon: "pin",
    title: "Regional & persönlich",
    text:
      "Wir kommen aus Norderstedt und betreuen unsere Kunden persönlich vor Ort. " +
      "Keine Hotline, kein Callcenter, sondern Ihr fester Ansprechpartner.",
    szene: "uspRegional" as const,
    bild: "galerie-bad-07.webp",
    alt: "Von Bauwelt saniertes Bad mit freistehender Wanne unter dem Dachfenster",
  },
  {
    icon: "hand",
    title: "Alles aus einer Hand",
    text: "Von Sanitär und Elektro bis zu Fliesen und Trockenbau koordinieren wir sämtliche Arbeiten für Sie.",
    szene: "uspHand" as const,
    bild: "galerie-sanierung-02.webp",
    alt: "Von Bauwelt modernisierte Küche mit beleuchteter Kochinsel",
  },
  {
    icon: "euro",
    title: "Zum Festpreis fertig",
    text: "Nach dem kostenlosen Vor-Ort-Termin erhalten Sie ein transparentes Angebot mit klar definiertem Leistungsumfang.",
    szene: "uspFestpreis" as const,
    bild: "galerie-innenausbau-04.webp",
    alt: "Von Bauwelt ausgebautes Büro mit Holzlamellen-Wand",
  },
];

/** „Ihr Weg zum neuen Badezimmer" – vier Schritte laut Kundenfeedback 28.09.2026.
 *  Die Kundentexte sind bereits kurz – daher kein `kurz`/„Mehr dazu“ nötig. */
export const STEPS = [
  // 4 Schritte wörtlich nach Kundenfeedback 28.09.2026 (Abschnitt 1)
  {
    title: "Orientierung erhalten",
    text: "Erhalten Sie in wenigen Minuten eine erste Preisspanne für Ihr Projekt.",
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

/** Angebots-Sektion („Verständliche Angebote statt Positionsdschungel“, 14.10.2026). */
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

/* LEISTUNG_KARTEN entfallen (Kundenwunsch 11.10.2026): Die Leistungskarten der
 * Startseite kommen jetzt aus src/data/rechner.ts + LEISTUNGEN in consts.ts (Überschrift/Unterschrift, 16.10.2026 (73)) und sind
 * gleichzeitig die Auswahl des Projekt-Rechners (components/Rechner.astro). */

export const FAQ_HOME = [
  // Kundenwunsch 19.10.2026 (Jamil, AGB Stand Februar 2026): alle Antworten mit den AGB
  // abgeglichen – nichts versprechen, was die AGB anders regeln (Festpreis-Grenzen § 3/§ 4/§ 6,
  // Termine § 11, Zahlung § 7, Abnahme § 15, Gewährleistung § 16). AGB: /agb/
  {
    q: "Was kostet meine Sanierung?",
    a: "Das hängt von Umfang und Ausstattung ab – unser Online-Rechner gibt Ihnen in einer Minute eine erste Preisspanne. Den festen Preis nennen wir Ihnen nach einem kostenlosen Vor-Ort-Termin in einem schriftlichen Angebot. Darin steht genau, welche Leistungen enthalten sind.",
  },
  {
    q: "Gilt der Festpreis wirklich?",
    a: "Ja – für alle Leistungen, die im Angebot stehen. Zusätzlich berechnet wird nur, was nicht im Angebot enthalten ist: Wünsche, die Sie nachträglich beauftragen, technisch notwendige Zusatzarbeiten und verdeckte Mängel, die erst während der Arbeiten sichtbar werden. Dafür erhalten Sie einen schriftlichen Nachtrag mit den Zusatzkosten – nicht einfach eine höhere Rechnung. Steigen Materialpreise stark und wird das Material erst später geliefert, behalten wir uns eine angemessene Preisangleichung vor (§ 6 unserer AGB).",
  },
  {
    q: "Was ist im Festpreis nicht enthalten?",
    a: "Wenn es nicht ausdrücklich im Angebot vereinbart ist, gehören diese Leistungen nicht zum Pauschalpreis: Untergrundvorbereitung bei unbekanntem Zustand, Ausgleichsspachtelungen und Estrichnachbesserungen, Entsorgung von Altmaterialien, Schutz- und Abdeckarbeiten über das Standardmaß hinaus sowie Zusatzarbeiten anderer Gewerke. Was davon Sie brauchen, klären wir beim Vor-Ort-Termin – und nehmen es auf Wunsch gleich mit ins Angebot.",
  },
  {
    q: "Wie lange dauert mein Projekt?",
    a: "Eine Badsanierung dauert bei uns in der Regel rund 2 Wochen, größere Sanierungen planen wir individuell. Vor Beginn erhalten Sie einen Zeitplan mit Start- und Endtermin. Fest zugesagt ist ein Termin, wenn wir ihn schriftlich als verbindlich vereinbaren. Bei höherer Gewalt oder Materialengpässen verlängern sich Fristen angemessen.",
  },
  {
    q: "Muss ich während der Arbeiten ausziehen?",
    a: "Meistens nicht. Wir arbeiten mit Staubschutz, abgedeckten Wegen und täglicher Grundordnung, damit Wohnen neben der Baustelle funktioniert. Ganz vermeiden lassen sich Staub und Lärm trotzdem nicht. Bitte räumen Sie die Arbeitsbereiche vorher frei (Möbel, Wertgegenstände) und sorgen Sie für Zugang, Strom und Wasser. Bei Kernsanierungen besprechen wir das gemeinsam im Vor-Ort-Termin.",
  },
  // Kundenwunsch 19.10.2026 (Audit 5.6): allgemeine Fragen stehen EINMAL hier, auf den
  // Leistungsseiten nur noch leistungsspezifische Fragen (+ Link hierher)
  {
    q: "Wie läuft der Vor-Ort-Termin ab?",
    a: "Sie buchen online einen Termin, wir kommen zu Ihnen, nehmen alles vor Ort auf und besprechen Ihre Wünsche. Der Vor-Ort-Termin ist kostenlos und unverbindlich. Innerhalb von 24 Stunden erhalten Sie danach Ihr Angebot zum Festpreis. Der Auftrag kommt erst mit unserer schriftlichen Auftragsbestätigung oder dem Beginn der Arbeiten zustande.",
  },
  {
    q: "Muss ich mehrere Handwerker koordinieren?",
    a: "Nein. Wir koordinieren alle beteiligten Gewerke selbst. Sie haben einen festen Ansprechpartner, der Ihr Projekt von Anfang bis Ende begleitet. Elektro-Endanschlüsse und deren Abnahme übernimmt ein zugelassener Elektromeisterbetrieb.",
  },
  {
    q: "Was passiert bei verdeckten Schäden?",
    a: "Manches zeigt sich erst, wenn Wand oder Boden geöffnet sind – etwa Feuchtigkeit, Schimmel, marode Leitungen oder ein instabiler Untergrund. Solche Mängel sind nicht im Angebot enthalten. Wir unterbrechen die Arbeiten an dieser Stelle, zeigen Ihnen den Befund und Sie erhalten einen schriftlichen Nachtrag mit den Zusatzkosten. Besteht der Verdacht auf Schadstoffe wie Asbest, stoppen wir sofort – die fachgerechte Untersuchung und Entsorgung veranlassen dann Sie.",
  },
  {
    q: "Wie und wann bezahle ich?",
    a: "Rechnungen zahlen Sie innerhalb von 14 Tagen ohne Abzug. Bei Aufträgen über 4.000 € zahlen Sie in drei Abschlägen: 30 % bei Arbeitsbeginn bzw. Materialbestellung, 60 % während der Arbeiten und 10 % nach Fertigstellung. Für speziell für Sie bestelltes Material kann eine Vorauskasse verlangt werden.",
  },
  {
    q: "Was gilt bei Abnahme und Gewährleistung?",
    a: "Ist alles fertig, nehmen Sie die Arbeiten ab – kleine Mängel sind kein Grund, die Abnahme zu verweigern, wir beheben sie natürlich trotzdem. Auf unsere Bauleistungen haben Sie 5 Jahre Gewährleistung, auf gelieferte bewegliche Sachen 2 Jahre. Melden Sie Mängel bitte sofort, dann bessern wir nach. Für Material, das Sie selbst stellen, übernehmen wir keine Gewährleistung.",
  },
  {
    q: "Was passiert, wenn ich einen Termin absagen muss?",
    a: "Sagen Sie uns bitte so früh wie möglich Bescheid. Bei einer Absage weniger als 3 Arbeitstage vorher können wir die bereits entstandenen Ausfallkosten berechnen – bis zu 100 %. Verzögert sich der Ablauf auf Ihrer Seite, können Wartezeiten und erneute Anfahrten berechnet werden.",
  },
  // „In welcher Region sind Sie tätig?“ entfernt (Kundenwunsch 13.10.2026 (21))
];

/** Dunkler Footer-Kopf auf jeder Seite (Kundenwunsch 10.10.2026: ersetzt das
 *  frühere CTA-Band und die Kontakt-Buttons – „nur noch den Text verwenden“). */
export const FOOTER_KONTAKT = {
  pre: "So sollte Handwerk ",
  accent: "sein.",
  sub: "Planbar. Transparent. Verlässlich.",
  text:
    // Audit 5.2: gekürzt – „Service-Standards moderner Dienstleistungsunternehmen“ steht auf Über uns
    "Hochwertige Handwerksarbeit mit klaren Prozessen und persönlicher Betreuung.",
  kontaktHead: "Sprechen Sie mit uns",
  kontaktText: "Kurze Frage, konkretes Projekt oder erst einmal unverbindlich beraten lassen?",
  zeiten: "Mo–Fr 8–18 Uhr", // Audit 4.9
};
