/** Einzugsgebiet: reale Orte im Umkreis von ~100 km um Norderstedt.
 *  Wird sichtbar auf der Website genannt (lokale SEO) UND als strukturierte
 *  Daten (GeoCircle + areaServed) ausgegeben. Keine Wettbewerber-Namen –
 *  Auffindbarkeit entsteht über Leistung + Ort. */

export const REGION_CENTER = {
  lat: 53.7064,
  lng: 10.0122, // Norderstedt
  radiusMeter: 100_000,
};

export const REGION_CITIES = [
  "Norderstedt",
  "Hamburg",
  "Henstedt-Ulzburg",
  "Kaltenkirchen",
  "Quickborn",
  "Pinneberg",
  "Wedel",
  "Elmshorn",
  "Itzehoe",
  "Ahrensburg",
  "Bad Oldesloe",
  "Bad Segeberg",
  "Reinbek",
  "Geesthacht",
  "Neumünster",
  "Kiel",
  "Lübeck",
  "Stade",
  "Buxtehude",
  "Winsen (Luhe)",
  "Lüneburg",
];

/** Leistungs-Typen für strukturierte Daten (Schema.org serviceType). */
export const SERVICE_TYPES = [
  "Badsanierung",
  "Komplettsanierung",
  "Modernisierung",
  "Innenausbau",
  "Trockenbau",
  "Dachsanierung",
  "Fassadensanierung",
  "Malerarbeiten",
  "Bodenverlegung",
  "Sanitärinstallation",
  "Heizungsinstallation",
  "Elektroinstallation",
];
