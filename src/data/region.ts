/** Einzugsgebiet: reale Orte im Umkreis von ~100 km um Norderstedt.
 *  Wird sichtbar auf der Website genannt (lokale SEO) UND als strukturierte
 *  Daten (GeoCircle + areaServed) ausgegeben. Keine Wettbewerber-Namen –
 *  Auffindbarkeit entsteht über Leistung + Ort. */

export const REGION_CENTER = {
  lat: 53.7064,
  lng: 10.0122, // Norderstedt
  // Kundenwunsch 19.10.2026 (Audit 3.3): Gebiet laut Jamils Karte, ca. 50 km um Norderstedt
  radiusMeter: 50_000,
};

/** Orte im Einzugsgebiet – nur Orte INNERHALB von Jamils markiertem Gebiet (19.10.2026):
 *  Elbe bei Itzehoe → Neumünster → A21 → Bad Oldesloe/Bargteheide → Reinbek → Elbe-Nordufer über Wedel. */
export const REGION_CITIES = [
  "Norderstedt",
  "Hamburg",
  "Henstedt-Ulzburg",
  "Kaltenkirchen",
  "Quickborn",
  "Pinneberg",
  "Halstenbek",
  "Wedel",
  "Uetersen",
  "Elmshorn",
  "Barmstedt",
  "Itzehoe",
  "Kellinghusen",
  "Neumünster",
  "Bad Oldesloe",
  "Bargteheide",
  "Ahrensburg",
  "Reinbek",
];

// SERVICE_TYPES entfernt (SEO-/KI-Audit S3, 19.10.2026): nannte abgeschaltete Leistungen (Dach, Fassade, Maler, SHK, Elektro). Strukturierte Daten nutzen jetzt LEISTUNGEN aus consts.ts.
