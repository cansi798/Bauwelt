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
  {
    id: "festpreis",
    icon: "euro",
    title: "Festpreis-Garantie",
    short: "Der Preis im Angebot ist der Preis auf der Rechnung.",
    long:
      "Nach dem Vor-Ort-Termin erhalten Sie ein Angebot mit einem festen Preis – " +
      "und der gilt. Keine Nachträge für Dinge, die wir hätten sehen müssen, keine " +
      "versteckten Positionen. Nur wenn Sie selbst zusätzliche Wünsche beauftragen, " +
      "ändert sich der Preis – vorher schriftlich, nie einfach auf der Rechnung.",
  },
  {
    id: "gewaehrleistung",
    icon: "shield",
    title: "5 Jahre Gewährleistung",
    short: "Wir stehen zu unserer Arbeit – lange nach der Abnahme.",
    long:
      "Auf unsere Handwerksleistungen geben wir 5 Jahre Gewährleistung nach BGB. " +
      "Sollte innerhalb dieser Zeit ein Mangel an unserer Arbeit auftreten, beheben " +
      "wir ihn kostenlos. Ein Anruf genügt – Sie erreichen keinen Callcenter, sondern " +
      "Ihren Ansprechpartner.",
  },
  {
    id: "meister",
    icon: "tools",
    title: "Meisterqualität",
    short: "Ausführung und Abnahme nach Meister-Standard.",
    long:
      "Jedes Projekt wird nach den anerkannten Regeln des Handwerks geplant, " +
      "ausgeführt und vor der Übergabe abgenommen. Unsere Gewerke sind bei der " +
      "Handwerkskammer eingetragen. Qualität heißt für uns: Es sieht nicht nur am " +
      "Übergabetag gut aus – sondern auch in zehn Jahren.",
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
    id: "sauber",
    icon: "hand",
    title: "Saubere Baustelle",
    short: "Wir arbeiten in Ihrem Zuhause – und behandeln es so.",
    long:
      "Staubschutzwände, abgedeckte Böden und Wege, tägliches Besenrein – das ist bei " +
      "uns Standard, nicht Extra. Nach Abschluss übergeben wir das Ergebnis gereinigt. " +
      "Sie wohnen während der Sanierung weiter – wir sorgen dafür, dass das gut geht.",
  },
  {
    id: "ansprechpartner",
    icon: "user",
    title: "Ein Ansprechpartner",
    short: "Eine Nummer für alles – vom Angebot bis zur Abnahme.",
    long:
      "Bei uns koordinieren Sie keine fünf Firmen. Sie haben einen persönlichen " +
      "Ansprechpartner, der Ihr Projekt vom ersten Gespräch bis zur Übergabe begleitet " +
      "und alle Gewerke steuert. Innerhalb von 24 Stunden erhalten Sie eine Antwort – " +
      "auch per WhatsApp.",
  },
];

export const siegelById = (id: string): Siegel | undefined =>
  VERSPRECHEN.find((s) => s.id === id);
