/** Projekt-Rechner: Gewerke, Fragen und Preislogik.
 *  >>> PLATZHALTER-PREISE – Richtwerte, bitte durch echte Kalkulationswerte ersetzen
 *  (siehe OFFENE-INFOS.md). Bad-Werte stammen aus dem bisherigen Badkalkulator. <<<
 *  Die Spannen sind bewusst breit: Das Ergebnis ist eine unverbindliche Ersteinschätzung,
 *  der Festpreis entsteht erst nach dem Vor-Ort-Termin.
 *
 *  Nur die 4 echten Leistungen (= Menü NAV2, Kundenwunsch 11.10.2026). Dach & Fassade,
 *  Maler & Böden, Sanitär/Heizung/Elektro sind bewusst NICHT im Rechner.
 *  Fliesen-Werte (11.10.2026) sind Richtwerte inkl. Material – bitte vom Kunden bestätigen.
 *  Nur noch „schnelle Schätzung“ (Kundenwunsch 11.10.2026 (2)): Preis = Grundpauschale
 *  + Fläche × €/m² des Niveaus ± Spanne. Modul-Anteile und Extras sind entfallen.
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
};

export type Gewerk = {
  slug: string;          // = Slug der Leistungs-Seite
  label: string;
  icon: string;          // Icon-Name im Sprite
  nutzen: string;        // 1 Zeile Nutzen (Leistungskarte Startseite)
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
  /** Skizzen-Typ für die Zeichnung im Rechner (Bad-Grundriss, Raum). */
  skizze: "bad" | "raum";
  /** Enthaltene Arbeiten (Ergebnisliste + Fachbegriffe im Anfragetext). */
  bausteine: Modul[];
};

export const GEWERKE: Gewerk[] = [
  {
    slug: "badsanierung",
    label: "Badsanierung",
    icon: "bath",
    nutzen: "Ihr neues Bad in 2 Wochen – geplant, gebaut und übergeben aus einer Hand.",
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
      { id: "demontage", label: "Altes Bad raus", fach: "Demontage & Entsorgung", hint: "Abbau und Entsorgung von Wanne, Fliesen & Co." },
      { id: "rohinstallation", label: "Wasser & Strom verlegen", fach: "Sanitär- & Elektro-Rohinstallation", hint: "Neue Leitungen für Dusche, WC und Waschtisch" },
      { id: "abdichtung", label: "Nassbereich schützen", fach: "Verbundabdichtung Nasszone", hint: "Feuchtigkeitsschutz unter Fliesen und Dusche" },
      { id: "fliesen", label: "Fliesen legen", fach: "Fliesenarbeiten Boden & Wand", hint: "Boden und Wände werden neu gefliest" },
      { id: "ausstattung", label: "Neue Einrichtung", fach: "Objektmontage & Ausstattung", hint: "Dusche, WC, Waschtisch und Möbel montiert" },
    ],
  },
  {
    slug: "sanierung-modernisierung",
    label: "Sanierung & Modernisierung",
    icon: "reno",
    nutzen: "Von der Einzelmaßnahme bis zur Kernsanierung – alle Gewerke koordiniert.",
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
      { id: "planung", label: "Planung & Organisation", fach: "Projekt- & Ablaufplanung", hint: "Wir planen Abläufe, Termine und Gewerke" },
      { id: "rueckbau", label: "Altes raus", fach: "Rückbau & Entkernung", hint: "Alte Beläge, Einbauten und Wände entfernen" },
      { id: "technik", label: "Leitungen & Technik neu", fach: "Elektro-, Sanitär- & Heizungsinstallation", hint: "Strom, Wasser und Heizung auf neuen Stand" },
      { id: "oberflaechen", label: "Wände, Böden, Decken", fach: "Oberflächenarbeiten komplett", hint: "Putz, Farbe, Böden und Türen neu" },
      { id: "endmontage", label: "Fertig einrichten", fach: "Endmontage & Übergabe", hint: "Alles montiert, geprüft und besenrein übergeben" },
    ],
  },
  {
    slug: "fliesen-boden",
    label: "Fliesen- & Bodenlegerarbeiten",
    icon: "tiles",
    nutzen: "Perfekte Oberflächen für Wand und Boden – vom Großformat bis zum Parkett.",
    frage: "Wie groß ist die Fläche, die neu belegt werden soll?",
    unit: "m²",
    min: 5, max: 200, step: 5, default: 25,
    grund: 900,
    proEinheit: { basis: 70, komfort: 140, premium: 220 },
    tiers: [
      { id: "basis", label: "Vinyl & Laminat", hint: "Klick-Vinyl oder Laminat inkl. Trittschalldämmung" },
      { id: "komfort", label: "Fliesen", hint: "Wand- oder Bodenfliesen bis ca. 60 × 60 cm" },
      { id: "premium", label: "Großformat & Parkett", hint: "Großformatfliesen, Feinsteinzeug oder Echtholz-Parkett" },
    ],
    spanne: 0.20,
    skizze: "raum",
    bausteine: [
      { id: "rueckbau", label: "Alten Belag entfernen", fach: "Rückbau Altbelag & Entsorgung", hint: "Alte Fliesen, Teppich oder Laminat raus" },
      { id: "untergrund", label: "Untergrund vorbereiten", fach: "Untergrundvorbereitung (Schleifen, Spachteln, Ausgleichen)", hint: "Eben und tragfähig – die Basis für lange Haltbarkeit" },
      { id: "abdichtung", label: "Nassbereich schützen", fach: "Verbundabdichtung Nassbereich", hint: "In Bad und Küche: Schutz vor Feuchtigkeit" },
      { id: "verlegung", label: "Fliesen bzw. Boden verlegen", fach: "Verlegung Fliesen/Bodenbelag", hint: "Präzise verlegt im gewünschten Muster" },
      { id: "fugen", label: "Fugen & sauberer Abschluss", fach: "Verfugung, Silikon-/Anschlussfugen, Sockel", hint: "Saubere Fugen, Sockelleisten, besenrein übergeben" },
    ],
  },
  {
    slug: "innenausbau",
    label: "Innenausbau & Trockenbau",
    icon: "wall",
    nutzen: "Räume neu gestalten und optimal nutzen – Wände, Decken, Licht und Akustik.",
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
      { id: "unterkonstruktion", label: "Wände planen & stellen", fach: "Ständerwerk/Unterkonstruktion", hint: "Die neue Raumaufteilung entsteht" },
      { id: "beplankung", label: "Wände schließen", fach: "Beplankung", hint: "Wände und Decken werden geschlossen" },
      { id: "schallschutz", label: "Ruhe reinbauen", fach: "Schall-/Wärmedämmung", hint: "Dämmung gegen Lärm und Kälte" },
      { id: "spachteln", label: "Glatte Flächen", fach: "Spachtelung (Q2/Q3)", hint: "Übergänge verschwinden, Flächen werden glatt" },
      { id: "streichfertig", label: "Streichfertig übergeben", fach: "Oberflächen-Finish", hint: "Bereit für Farbe oder Tapete" },
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
