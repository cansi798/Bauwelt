/** Projekt-Rechner: Gewerke, Fragen und Preislogik.
 *  >>> PLATZHALTER-PREISE – Richtwerte, bitte durch echte Kalkulationswerte ersetzen
 *  (siehe OFFENE-INFOS.md). Bad-Werte stammen aus dem bisherigen Badkalkulator. <<<
 *  Die Spannen sind bewusst breit: Das Ergebnis ist eine unverbindliche Ersteinschätzung,
 *  der Festpreis entsteht erst nach dem Vor-Ort-Termin.
 *
 *  Module: `label`/`hint` sind LAIENSPRACHE (UI), `fach` ist der Fachbegriff –
 *  er landet im Anfrage-Text (WhatsApp/E-Mail) und auf der Zeichnung, damit das
 *  Team sofort fachlich lesen kann, was der Kunde gewählt hat. */

export type Tier = { id: string; label: string; hint: string };

export type Modul = {
  id: string;
  label: string;   // laienfreundlich (Anzeige)
  fach: string;    // Fachbegriff (Anfrage-Text / Experten-Output)
  hint: string;    // eine Zeile Erklärung
  anteil: number;  // PLATZHALTER-Anteil an der Kalkulation, Summe je Gewerk = 1
};

export type Extra = { id: string; label: string; preis: number }; // Aufpreis in € (PLATZHALTER)

export type Gewerk = {
  slug: string;          // = Slug der Leistungs-Seite
  label: string;
  icon: string;          // Icon-Name im Sprite
  frage: string;         // Frage in Schritt 2
  unit: string;          // Einheit der Mengenangabe
  min: number;
  max: number;
  step: number;
  default: number;
  grund: number;         // Grundpauschale €
  proEinheit: Record<string, number>; // € je Einheit, Schlüssel = Tier-id
  tiers: Tier[];
  spanne: number;        // ± relativ
  /** Skizzen-Typ für die Zeichnung im Rechner (Bad-Grundriss, Raum, Dachfläche). */
  skizze: "bad" | "raum" | "dach";
  /** Leistungs-Module = Ebenen der Bauzeichnung (Index ↔ data-l im SVG). */
  bausteine: Modul[];
  /** Optionale Extras mit Aufpreis (nur Genau-Modus). */
  extras: Extra[];
};

export const GEWERKE: Gewerk[] = [
  {
    slug: "badsanierung",
    label: "Badsanierung",
    icon: "bath",
    frage: "Wie groß ist Ihr Bad?",
    unit: "m²",
    min: 3, max: 30, step: 1, default: 8,
    grund: 4500,
    proEinheit: { basis: 2200, komfort: 3000, premium: 4200 },
    tiers: [
      { id: "basis", label: "Basis", hint: "Solide Markenqualität, bewährte Standards" },
      { id: "komfort", label: "Komfort", hint: "Gehobene Ausstattung, z. B. bodengleiche Dusche" },
      { id: "premium", label: "Premium", hint: "Hochwertige Materialien und Sonderlösungen" },
    ],
    spanne: 0.15,
    skizze: "bad",
    bausteine: [
      { id: "demontage", label: "Altes Bad raus", fach: "Demontage & Entsorgung", hint: "Abbau und Entsorgung von Wanne, Fliesen & Co.", anteil: 0.10 },
      { id: "rohinstallation", label: "Wasser & Strom verlegen", fach: "Sanitär- & Elektro-Rohinstallation", hint: "Neue Leitungen für Dusche, WC und Waschtisch", anteil: 0.25 },
      { id: "abdichtung", label: "Nassbereich schützen", fach: "Verbundabdichtung Nasszone", hint: "Feuchtigkeitsschutz unter Fliesen und Dusche", anteil: 0.10 },
      { id: "fliesen", label: "Fliesen legen", fach: "Fliesenarbeiten Boden & Wand", hint: "Boden und Wände werden neu gefliest", anteil: 0.30 },
      { id: "ausstattung", label: "Neue Einrichtung", fach: "Objektmontage & Ausstattung", hint: "Dusche, WC, Waschtisch und Möbel montiert", anteil: 0.25 },
    ],
    extras: [
      { id: "bodengleich", label: "Bodengleiche Dusche", preis: 2500 },
      { id: "badewanne", label: "Neue Badewanne", preis: 1800 },
      { id: "doppelwaschtisch", label: "Doppelwaschtisch", preis: 900 },
      { id: "handtuchheizung", label: "Handtuchheizkörper", preis: 600 },
      { id: "fussbodenheizung", label: "Fußbodenheizung", preis: 1500 },
    ],
  },
  {
    slug: "sanierung-modernisierung",
    label: "Sanierung & Modernisierung",
    icon: "reno",
    frage: "Wie groß ist die Wohnfläche?",
    unit: "m²",
    min: 20, max: 300, step: 5, default: 80,
    grund: 8000,
    proEinheit: { basis: 600, komfort: 900, premium: 1400 },
    tiers: [
      { id: "basis", label: "Renovierung", hint: "Oberflächen erneuern: Böden, Wände, Türen" },
      { id: "komfort", label: "Teilsanierung", hint: "Inkl. Bad/Küche, Elektrik in Teilen" },
      { id: "premium", label: "Kernsanierung", hint: "Bis auf den Rohbau, alle Leitungen neu" },
    ],
    spanne: 0.25,
    skizze: "raum",
    bausteine: [
      { id: "planung", label: "Planung & Organisation", fach: "Projekt- & Ablaufplanung", hint: "Wir planen Abläufe, Termine und Gewerke", anteil: 0.05 },
      { id: "rueckbau", label: "Altes raus", fach: "Rückbau & Entkernung", hint: "Alte Beläge, Einbauten und Wände entfernen", anteil: 0.10 },
      { id: "technik", label: "Leitungen & Technik neu", fach: "Elektro-, Sanitär- & Heizungsinstallation", hint: "Strom, Wasser und Heizung auf neuen Stand", anteil: 0.35 },
      { id: "oberflaechen", label: "Wände, Böden, Decken", fach: "Oberflächenarbeiten komplett", hint: "Putz, Farbe, Böden und Türen neu", anteil: 0.35 },
      { id: "endmontage", label: "Fertig einrichten", fach: "Endmontage & Übergabe", hint: "Alles montiert, geprüft und besenrein übergeben", anteil: 0.15 },
    ],
    extras: [
      { id: "tueren", label: "Neue Innentüren", preis: 2400 },
      { id: "fussbodenheizung", label: "Fußbodenheizung", preis: 4500 },
      { id: "smarthome", label: "Smart-Home-Basis", preis: 1800 },
      { id: "fenster", label: "Neue Fenster", preis: 6000 },
    ],
  },
  {
    slug: "dach-fassade",
    label: "Dach & Fassade",
    icon: "roof",
    frage: "Wie groß ist die Dach- bzw. Fassadenfläche?",
    unit: "m²",
    min: 40, max: 400, step: 10, default: 120,
    grund: 6000,
    proEinheit: { basis: 180, komfort: 260, premium: 340 },
    tiers: [
      { id: "basis", label: "Neueindeckung", hint: "Eindeckung erneuern, ohne Dämmung" },
      { id: "komfort", label: "Mit Dämmung", hint: "Inkl. Aufsparren- oder Zwischensparrendämmung" },
      { id: "premium", label: "Komplett", hint: "Dach + Fassade inkl. Dämmung und Rinnen" },
    ],
    spanne: 0.25,
    skizze: "dach",
    bausteine: [
      { id: "geruest", label: "Gerüst stellen", fach: "Gerüststellung & Absicherung", hint: "Sicherer Zugang für alle Arbeiten", anteil: 0.10 },
      { id: "unterkonstruktion", label: "Unterbau erneuern", fach: "Lattung & Unterspannbahn", hint: "Tragfähiger, dichter Unterbau fürs Dach", anteil: 0.15 },
      { id: "daemmung", label: "Dämmen", fach: "Aufsparren-/Zwischensparrendämmung", hint: "Heizkosten runter, Wohnklima rauf", anteil: 0.30 },
      { id: "eindeckung", label: "Neu eindecken", fach: "Neueindeckung", hint: "Neue Ziegel, sauber verlegt", anteil: 0.35 },
      { id: "rinnen", label: "Rinnen & Anschlüsse", fach: "Dachentwässerung & Anschlussbleche", hint: "Regen läuft ab, Anschlüsse bleiben dicht", anteil: 0.10 },
    ],
    extras: [
      { id: "dachfenster", label: "Dachfenster", preis: 1800 },
      { id: "gaube", label: "Gauben-Instandsetzung", preis: 3500 },
      { id: "pv", label: "Photovoltaik-Vorbereitung", preis: 1200 },
      { id: "fassade", label: "Fassadenanstrich", preis: 3000 },
    ],
  },
  {
    slug: "innenausbau",
    label: "Innenausbau & Trockenbau",
    icon: "wall",
    frage: "Wie groß ist die auszubauende Fläche?",
    unit: "m²",
    min: 10, max: 200, step: 5, default: 40,
    grund: 2500,
    proEinheit: { basis: 450, komfort: 650, premium: 900 },
    tiers: [
      { id: "basis", label: "Basis", hint: "Wände/Decken stellen, spachteln, streichfertig" },
      { id: "komfort", label: "Ausbau", hint: "Inkl. Böden, Türen, Schallschutz" },
      { id: "premium", label: "Komplett", hint: "Inkl. Elektro, Beleuchtung, Maßeinbauten" },
    ],
    spanne: 0.25,
    skizze: "raum",
    bausteine: [
      { id: "unterkonstruktion", label: "Wände planen & stellen", fach: "Ständerwerk/Unterkonstruktion", hint: "Die neue Raumaufteilung entsteht", anteil: 0.20 },
      { id: "beplankung", label: "Wände schließen", fach: "Beplankung", hint: "Wände und Decken werden geschlossen", anteil: 0.25 },
      { id: "schallschutz", label: "Ruhe reinbauen", fach: "Schall-/Wärmedämmung", hint: "Dämmung gegen Lärm und Kälte", anteil: 0.15 },
      { id: "spachteln", label: "Glatte Flächen", fach: "Spachtelung (Q2/Q3)", hint: "Übergänge verschwinden, Flächen werden glatt", anteil: 0.20 },
      { id: "streichfertig", label: "Streichfertig übergeben", fach: "Oberflächen-Finish", hint: "Bereit für Farbe oder Tapete", anteil: 0.20 },
    ],
    extras: [
      { id: "schiebetuer", label: "Schiebetür", preis: 1400 },
      { id: "einbau", label: "Maß-Einbauschrank", preis: 2200 },
      { id: "akustik", label: "Akustikdecke", preis: 1900 },
      { id: "led", label: "LED-Beleuchtung", preis: 900 },
    ],
  },
  {
    slug: "maler-boeden",
    label: "Maler & Bodenbeläge",
    icon: "paint",
    frage: "Wie groß ist die Fläche?",
    unit: "m²",
    min: 10, max: 300, step: 5, default: 60,
    grund: 800,
    proEinheit: { basis: 45, komfort: 75, premium: 120 },
    tiers: [
      { id: "basis", label: "Streichen", hint: "Wände/Decken vorbereiten und streichen" },
      { id: "komfort", label: "Plus Böden", hint: "Inkl. neuer Bodenbelag (Vinyl/Laminat)" },
      { id: "premium", label: "Hochwertig", hint: "Parkett, Spachteltechniken, Tapeten" },
    ],
    spanne: 0.20,
    skizze: "raum",
    bausteine: [
      { id: "abdecken", label: "Alles abdecken", fach: "Abdeck- & Abklebearbeiten", hint: "Möbel und Böden bleiben sauber", anteil: 0.10 },
      { id: "untergrund", label: "Untergrund vorbereiten", fach: "Untergrundvorbereitung", hint: "Spachteln, schleifen, grundieren", anteil: 0.20 },
      { id: "streichen", label: "Streichen", fach: "Anstricharbeiten", hint: "Wände und Decken in Wunschfarbe", anteil: 0.30 },
      { id: "bodenbelag", label: "Neuer Boden", fach: "Bodenverlegung", hint: "Vinyl, Laminat oder Parkett verlegt", anteil: 0.35 },
      { id: "uebergabe", label: "Sauber übergeben", fach: "Endreinigung & Übergabe", hint: "Besenrein und bezugsfertig", anteil: 0.05 },
    ],
    extras: [
      { id: "spachteltechnik", label: "Spachteltechnik", preis: 1200 },
      { id: "sockelleisten", label: "Neue Sockelleisten", preis: 600 },
      { id: "tuerlack", label: "Türen lackieren", preis: 900 },
      { id: "tapete", label: "Vliestapete", preis: 800 },
    ],
  },
  {
    slug: "sanitaer-heizung-elektro",
    label: "Sanitär, Heizung, Elektro",
    icon: "tools",
    frage: "Wie groß ist die Wohnfläche?",
    unit: "m²",
    min: 20, max: 300, step: 5, default: 100,
    grund: 3500,
    proEinheit: { basis: 90, komfort: 140, premium: 220 },
    tiers: [
      { id: "basis", label: "Ein Gewerk", hint: "z. B. Elektrik ODER Sanitär erneuern" },
      { id: "komfort", label: "Zwei Gewerke", hint: "z. B. Sanitär + Heizungsverteilung" },
      { id: "premium", label: "Komplett", hint: "Sanitär, Heizung und Elektro neu" },
    ],
    spanne: 0.30,
    skizze: "raum",
    bausteine: [
      { id: "planung", label: "Planen & prüfen", fach: "Bestandsaufnahme & Planung", hint: "Was liegt, was fehlt, was muss neu", anteil: 0.10 },
      { id: "leitungen", label: "Leitungen verlegen", fach: "Leitungsinstallation", hint: "Wasser- und Stromleitungen neu", anteil: 0.35 },
      { id: "verteilung", label: "Verteiler & Sicherungen", fach: "Unterverteilung/Verteilung", hint: "Das Herzstück von Strom und Heizung", anteil: 0.20 },
      { id: "montage", label: "Geräte montieren", fach: "Endmontage Objekte & Geräte", hint: "Heizkörper, Armaturen, Schalter dran", anteil: 0.25 },
      { id: "pruefung", label: "Prüfen & dokumentieren", fach: "Prüfung & Dokumentation", hint: "Gemessen, geprüft, schriftlich bestätigt", anteil: 0.10 },
    ],
    extras: [
      { id: "thermostate", label: "Smarte Thermostate", preis: 900 },
      { id: "netzwerk", label: "Netzwerk-/LAN-Dosen", preis: 1100 },
      { id: "wallbox", label: "Wallbox-Vorbereitung", preis: 1200 },
      { id: "verteiler", label: "Neuer Sicherungskasten", preis: 1500 },
    ],
  },
];

export const gewerkBySlug = (slug: string): Gewerk | undefined =>
  GEWERKE.find((g) => g.slug === slug);

/** Preisspanne in € (gerundet auf 500er). */
export function preisspanne(g: Gewerk, menge: number, tierId: string): { von: number; bis: number } {
  const proE = g.proEinheit[tierId] ?? Object.values(g.proEinheit)[0];
  const basis = g.grund + menge * proE;
  const round500 = (n: number) => Math.round(n / 500) * 500;
  return { von: round500(basis * (1 - g.spanne)), bis: round500(basis * (1 + g.spanne)) };
}
