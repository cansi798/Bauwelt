/** Einzugsgebiet: reale Orte rund um Norderstedt (laut Jamils Karte, 19.10.2026).
 *  Wird sichtbar auf der Website genannt (lokale SEO) UND als strukturierte
 *  Daten (GeoCircle + areaServed) ausgegeben. Keine Wettbewerber-Namen –
 *  Auffindbarkeit entsteht über Leistung + Ort. */

export const REGION_CENTER = {
  lat: 53.7064,
  lng: 10.0122, // Norderstedt
  // Jamils 2. Karte (19.10.2026): Norderstedt bis Neumünster/Wedel ca. 40 km
  radiusMeter: 40_000,
};

/** EIN Satz für das Gebiet (Startseite, Kontakt, llms.txt …) – laut Jamils 2. Karte (19.10.2026). */
export const REGION_TEXT =
  "Hamburg und Umgebung – von Wedel und Uetersen über Kellinghusen bis Neumünster, im Osten bis Bargteheide, Ahrensburg und Barsbüttel";
export const REGION_KARTE =
  "Gezeichnete Karte unseres Einzugsgebiets: von Wedel an der Elbe über Hamburg bis Barsbüttel, nach Norden über Uetersen und Kellinghusen " +
  "bis Neumünster und im Osten über Bargteheide und Ahrensburg zurück. Unser Sitz Norderstedt liegt in der Mitte.";

/** Orte im Einzugsgebiet – nur Orte INNERHALB von Jamils markiertem Gebiet (2. Karte, 19.10.2026):
 *  Wedel/Elbe → Hamburg (bis Barsbüttel) → Uetersen, Horst, Kellinghusen → Neumünster →
 *  Boostedt, Wahlstedt, Sülfeld, Bargteheide, Großhansdorf, Siek → Barsbüttel. */
export const REGION_CITIES = [
  "Norderstedt",
  "Hamburg",
  "Henstedt-Ulzburg",
  "Kaltenkirchen",
  "Quickborn",
  "Ellerau",
  "Tangstedt",
  "Pinneberg",
  "Halstenbek",
  "Schenefeld",
  "Wedel",
  "Uetersen",
  "Elmshorn",
  "Barmstedt",
  "Kellinghusen",
  "Bad Bramstedt",
  "Neumünster",
  "Bargteheide",
  "Ammersbek",
  "Ahrensburg",
  "Großhansdorf",
  "Barsbüttel",
];

// SERVICE_TYPES entfernt (SEO-/KI-Audit S3, 19.10.2026): nannte abgeschaltete Leistungen (Dach, Fassade, Maler, SHK, Elektro). Strukturierte Daten nutzen jetzt LEISTUNGEN aus consts.ts.
