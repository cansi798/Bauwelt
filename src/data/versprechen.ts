import { SITE } from "../consts";

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
    title: "Klares Angebot",
    // Kundenwunsch 19.10.2026 (Talk, Abgleich mit AGB § 2–§ 6): Festpreis gilt für alles im Angebot,
    // Änderungen nur mit schriftlichem Nachtrag – vorher abgesprochen.
    // Jamil 20.10.2026 (Talk 2787, Gesamt-Audit R2): „keine Überraschungen auf der Rechnung“ entfällt
    // (passt nicht zu AGB § 2/§ 6) → „Mehrkosten nur nach schriftlichem Nachtrag“.
    // Jamil 27.10.2026 (Versprechen-Check H1): kein „Festpreis“ mehr (AGB § 2: Angebote freibleibend) →
    // „transparentes Angebot“, Zusatzarbeiten nur nach Absprache.
    short: "Nach dem Vor-Ort-Termin erhalten Sie ein schriftliches Angebot – Zusätzliches nur nach Absprache mit Ihnen.",
    long:
      "Nach dem kostenlosen Vor-Ort-Termin erhalten Sie ein transparentes, schriftliches Angebot. " +
      "Darin steht, welche Leistungen enthalten sind. Ändert sich während der Arbeiten etwas – etwa " +
      "durch Ihre Zusatzwünsche oder versteckte Schäden –, sprechen wir vorher mit Ihnen und Sie " +
      "erhalten dazu einen schriftlichen Nachtrag.",
  },
  {
    id: "termin",
    icon: "clock",
    title: "Klarer Zeitplan",
    // Versprechen-Check M1 (27.10.2026): AGB § 11 „Termine unverbindlich, außer schriftlich als verbindlich vereinbart“
    // → „abgestimmter Zeitplan“, verbindliche Termine nur auf Wunsch und schriftlich.
    short: "Der Zeitplan steht schriftlich in Ihrem Angebot – den Baustart stimmen wir vorab ab.",
    long:
      "Den Baustart stimmen wir vorab mit Ihnen ab, der Zeitplan steht schriftlich in Ihrem Angebot. " +
      "Wir koordinieren die Gewerke selbst – das hilft uns, Termine einzuhalten. Verschiebt sich etwas, " +
      "erfahren Sie es sofort von uns – nicht von der leeren Baustelle.",
  },
  {
    id: "ansprechpartner",
    icon: "user",
    title: "Ein fester Ansprechpartner", // Kundenwunsch 19.10.2026 (Audit 7.6/4.6), früher „Deutschsprachiger Ansprechpartner“
    short: "Eine Nummer für alles – vom Angebot bis zur Abnahme.",
    long:
      "Bei uns koordinieren Sie keine fünf Firmen. Ein persönlicher Ansprechpartner " +
      "begleitet Ihr Projekt vom ersten Gespräch bis zur Übergabe und hält die Fäden zusammen – " +
      "erreichbar per Telefon, WhatsApp oder E-Mail.",
  },
  {
    id: "antwort",
    icon: "clock",
    title: "Schnelle Antwort",
    // Versprechen-Check H3 (27.10.2026): keine feste Stundenzahl (passt nicht zu Mo. – Fr. 08:00 bis 18:00 Uhr)
    short: "Wir melden uns zeitnah – in der Regel am selben oder nächsten Werktag.",
    long:
      "Ob Anruf, WhatsApp oder E-Mail: Wir melden uns zeitnah bei Ihnen – in der Regel am selben " +
      `oder am nächsten Werktag (${SITE.hours}).`,
  },
  {
    id: "angebot",
    icon: "doc",
    title: "Zügig zum Angebot",
    // Versprechen-Check H4 (27.10.2026): keine 24-Stunden-Frist (bei Komplettsanierung unrealistisch)
    short: "Nach dem Vor-Ort-Termin bekommen Sie schnell Klarheit.",
    long:
      "Nach dem Vor-Ort-Termin erhalten Sie in der Regel zeitnah Ihr Angebot mit klar beschriebenen " +
      "Leistungen – digital abrufbar und freigebbar. Bei größeren Projekten nennen wir Ihnen den " +
      "Zeitrahmen direkt vor Ort.",
  },
  {
    id: "transparenz",
    icon: "eye",
    title: "Volle Transparenz",
    short: "Sie wissen, was passiert – und was es kostet.",
    long:
      "Verständliche Angebote ohne Positionsdschungel, demnächst ein Kundenportal für Ihre Unterlagen und " + // Talk 3478 F
      "Termine und klare Absprachen – damit Sie den Überblick behalten.",
  },
  {
    id: "gewerke",
    icon: "hand",
    title: "Alle Gewerke aus einer Hand",
    short: "Wir koordinieren alle Arbeiten – Sie lehnen sich zurück.",
    long:
      "Wir planen den Ablauf und koordinieren die beteiligten Gewerke – vom Rückbau über Trockenbau, " +
      "Fliesen und Böden bis zu Sanitär und Elektro –, damit Termine und Übergänge passen. " +
      // Versprechen-Check H7/M5 (27.10.2026): keine Aussagen über namenlose Partner/Meisterbetriebe ohne Beleg
      "Die Anschlüsse in Sanitär und Elektro führen zugelassene Fachbetriebe aus.",
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
