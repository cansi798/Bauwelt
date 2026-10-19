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
    short: "Der Preis im Angebot ist der Preis auf der Rechnung.",
    long:
      "Nach dem Vor-Ort-Termin erhalten Sie ein Angebot mit einem festen Preis – " +
      "und der gilt. Keine Nachträge für Dinge, die wir hätten sehen müssen, keine " +
      "versteckten Positionen. Nur wenn Sie selbst zusätzliche Wünsche beauftragen, " +
      "ändert sich der Preis – vorher schriftlich, nie einfach auf der Rechnung.",
  },
  {
    id: "termin",
    icon: "clock",
    title: "Termintreue",
    short: "Ihr Projekt hat ein Startdatum und ein Enddatum.",
    long:
      "Vor Projektbeginn bekommen Sie einen verbindlichen Zeitplan mit Start- und " +
      "Endtermin. Wir koordinieren alle Gewerke selbst, deshalb können wir Termine " +
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
      "Ob Anruf, WhatsApp oder E-Mail – auf Ihre Anfrage erhalten Sie innerhalb von " +
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
      "Wir planen und steuern alle Gewerke selbst, damit Termine und Übergänge passen.",
  },
];

export const siegelById = (id: string): Siegel | undefined =>
  VERSPRECHEN.find((s) => s.id === id);

/** Kundenwunsch 19.10.2026 (Audit 5.1): EINE gemeinsame Leiste mit 4 Kernvorteilen
 *  (Komponente Kernvorteile.astro) – gleiche Namen wie die Siegel oben, Texte = `short`.
 *  Leistungsseiten zeigen darunter nur noch max. 3 eigene Vorteile („Warum …?“). */
export const KERNVORTEILE_IDS = ["festpreis", "termin", "ansprechpartner", "antwort"] as const;
export const KERNVORTEILE: Siegel[] = KERNVORTEILE_IDS.map((id) => {
  const s = siegelById(id);
  if (!s) throw new Error(`Kernvorteil ${id} fehlt in VERSPRECHEN`);
  return s;
});
