/** Projekt-Rechner: Gewerke, Fragen und Preislogik.
 *  >>> PLATZHALTER-PREISE – Richtwerte, bitte durch echte Kalkulationswerte ersetzen
 *  (siehe OFFENE-INFOS.md). Bad-Werte stammen aus dem bisherigen Badkalkulator. <<<
 *  Die Spannen sind bewusst breit: Das Ergebnis ist eine unverbindliche Ersteinschätzung,
 *  der Festpreis entsteht erst nach dem Vor-Ort-Termin. */

export type Tier = { id: string; label: string; hint: string };

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
