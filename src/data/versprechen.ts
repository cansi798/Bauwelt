/** Eigene Versprechen-Siegel der Bauwelt Handwerk GmbH.
 *  WICHTIG (UWG): Das sind EIGENE Zusagen, keine fremden Prüfzeichen.
 *  Wording darf nie "Testsieger", "geprüft durch", "zertifiziert von" suggerieren. */

export type Siegel = {
  id: string;
  icon: string;   // Icon-Name im Sprite
  title: string;
  short: string;  // Einzeiler unterm Badge
  long: string;   // Erklärung im Overlay
};

export const VERSPRECHEN: Siegel[] = [
  // Sieben Zusagen laut Kundenfeedback 30.09.2026 (Meisterqualität, Saubere
  // Baustelle und 5 Jahre Gewährleistung entfallen; vier neue kommen hinzu).
  {
    id: "festpreis",
    icon: "euro",
    title: "Festpreis-Zusage",
    // Kundenwunsch 19.10.2026 (Talk, Abgleich mit AGB § 2–§ 6): Festpreis gilt für alles im Angebot,
    // Änderungen nur mit schriftlichem Nachtrag – vorher abgesprochen.
    // Jamil 20.10.2026 (Talk 2787, Gesamt-Audit R2): „keine Überraschungen auf der Rechnung“ entfällt
    // (passt nicht zu AGB § 2/§ 6) → „Mehrkosten nur nach schriftlichem Nachtrag“.
    short: "Festpreis für alles im Angebot – Mehrkosten nur nach schriftlichem Nachtrag.",
    long:
      "Festpreis für alles, was im Angebot steht. Mehrkosten entstehen nur mit einem schriftlichen " +
      "Nachtrag: Ändert sich etwas – etwa durch Ihre Zusatzwünsche oder versteckte Schäden –, " +
      "sprechen wir vorher mit Ihnen und Sie erhalten den Nachtrag schriftlich.",
  },
  {
    id: "termin",
    icon: "clock",
    title: "Termintreue",
    // Kundenwunsch 19.10.2026 (AGB § 11: verbindlich = schriftlich vereinbart)
    short: "Verbindlicher Zeitplan – Start- und Endtermin stehen schriftlich im Auftrag.",
    long:
      "Verbindlicher Zeitplan – Start- und Endtermin halten wir schriftlich im Auftrag " +
      "fest, bevor wir anfangen. Wir koordinieren alle Gewerke selbst, deshalb können wir Termine " +
      "auch halten. Verzögert sich etwas aus Gründen, die wir zu vertreten haben, " +
      "erfahren Sie es sofort von uns – nicht von der leeren Baustelle.",
  },
  {
    id: "ansprechpartner",
    icon: "user",
    title: "Ein fester Ansprechpartner", // Kundenwunsch 19.10.2026 (Audit 7.6/4.6), früher „Deutschsprachiger Ansprechpartner“
    short: "Eine Nummer für alles – vom Angebot bis zur Abnahme.",
    long:
      "Bei uns koordinieren Sie keine fünf Firmen. Sie haben einen persönlichen " +
      "Ansprechpartner, der Ihr Projekt vom ersten Gespräch bis zur Übergabe begleitet " +
      "und alle Gewerke steuert. Innerhalb von 12 Stunden erhalten Sie eine Antwort – " +
      "auch per WhatsApp.",
  },
  {
    id: "antwort",
    icon: "clock",
    title: "Antwort innerhalb von 12 Stunden",
    short: "Sie warten nicht tagelang auf einen Rückruf.",
    long:
      "Ob Anruf, WhatsApp oder E-Mail – auf Ihre Anfrage erhalten Sie werktags innerhalb von " +
      "12 Stunden eine persönliche Antwort von Ihrem festen Ansprechpartner.",
  },
  {
    id: "angebot",
    icon: "doc",
    title: "Angebot innerhalb von 24 Stunden",
    short: "Nach dem Vor-Ort-Termin schnell Klarheit.",
    long:
      "Nach dem Vor-Ort-Termin erhalten Sie innerhalb von 24 Stunden ein verständliches " +
      "Angebot mit klaren Leistungen und festen Preisen – digital abrufbar und freigebbar.",
  },
  {
    id: "transparenz",
    icon: "eye",
    title: "Volle Transparenz",
    short: "Sie wissen jederzeit, was passiert – und was es kostet.",
    long:
      "Verständliche Angebote ohne Positionsdschungel, ein Kundenportal mit aktuellem " +
      "Projektstatus und alle Dokumente an einem Ort – Sie behalten jederzeit den Überblick.",
  },
  {
    id: "gewerke",
    icon: "hand",
    title: "Alle Gewerke aus einer Hand",
    short: "Wir koordinieren alle Arbeiten – Sie lehnen sich zurück.",
    long:
      "Abbruch, Mauerarbeiten, Trockenbau, Sanitär, Elektro, Fliesen, Böden und Maler: " +
      "Wir planen und steuern alle Gewerke selbst, damit Termine und Übergänge passen. " +
      "Die Sanitär-Anschlüsse übernimmt unser Partner-Meisterbetrieb, die Elektro-Endanschlüsse " + // R3 (Jamil 20.10., Talk 2787)
      "unser Partner-Elektromeisterbetrieb.",
  },
];

export const siegelById = (id: string): Siegel | undefined =>
  VERSPRECHEN.find((s) => s.id === id);

/** Jamil 19.10.2026 (Talk 2538/2539/2541): Überall GENAU diese 7 Versprechen – Startseite (Siegel),
 *  Über uns (Siegel) und Leistungsseiten (eigene Darstellung, Komponente LeistungVorteile.astro).
 *  Jeder Vorteil steht pro Seite nur EINMAL (prüft scripts/audit-check.mjs).
 *  Die frühere Leiste mit 4 Kernvorteilen unter dem Leistungs-Hero (Audit 5.1) ist entfallen.
 *  Jamil 21.10.2026 (Talk 2867): Leistungsseiten zeigen nur noch diese 7 Versprechen (Titel + `short`,
 *  Festpreis-Zusage ab Tablet mit `long`) – keine eigenen Vorteile mehr daneben, nichts wird umgeschrieben. */
