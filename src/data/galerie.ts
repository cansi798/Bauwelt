/** Referenz-Galerie, gegliedert nach den Leistungen aus dem Header-Menü
 *  (Kundenfeedback 07.10.2026 – ohne Immobilien-Sanierungscheck).
 *  NUR echte Bauwelt-Fotos (galerie-*.webp). Die KI-Bilder ref-01…06 sind seit
 *  Kundenwunsch 12.10.2026 (17) entfernt. Neue Bilder: scripts/galerie-bilder.py. */
import { u } from "../consts";

/** titel: Projektname unter dem Foto (Kundenwunsch 14.10.2026 (35)/(36)).
 *  ort/flaeche/art: echte Projektdaten – NUR eintragen, wenn der Kunde sie liefert (nie erfinden). */
export type GalerieBild = { file: string; alt: string; titel?: string; ort?: string; flaeche?: string; art?: string };
export type GalerieGruppe = {
  id: string;          // Anker auf der Referenzseite (#bad …)
  title: string;
  href: string;        // passende Leistungsseite
  /** Kategorie-Einleitung auf der Referenzseite (Kundenwunsch 14.10.2026 (36)) */
  slogan?: string;
  intro?: string;
  bilder: GalerieBild[];
};

export const GALERIE: GalerieGruppe[] = [
  {
    id: "bad",
    slogan: "Mehr Komfort. Mehr Design. Mehr Wohnqualität.",
    intro: "Von kompakten Gäste-WCs bis hin zum großzügigen Wellnessbad begleiten wir unsere Kunden von der Planung bis zur fertigen Übergabe.",
    title: "Badsanierung",
    href: u("leistungen/badsanierung/"),
    bilder: [
      { file: "galerie-bad-01.webp", titel: "Badezimmer mit bodengleicher Dusche", alt: "Schmales Bad mit bodengleicher Dusche, Holzboden und Handtuchheizkörper" },
      { file: "galerie-bad-02.webp", titel: "Designbad in Natursteinoptik", alt: "Bad mit Natursteinoptik, beleuchtetem Spiegel und goldener Armatur" },
      { file: "galerie-bad-03.webp", titel: "Premiumbad mit Großformatfliesen", alt: "Großzügiges Bad mit dunklen Großformatfliesen und LED-Spiegel" },
      { file: "galerie-bad-04.webp", titel: "Modernes Familienbad", alt: "Helles Bad mit eingefliester Badewanne und Wand-WC" },
      { file: "galerie-bad-05.webp", titel: "Dachgeschossbad mit Doppelwaschtisch", alt: "Dachgeschossbad mit Glasdusche und Doppelwaschtisch" },
      { file: "galerie-bad-06.webp", titel: "Walk-in-Dusche unter der Dachschräge", alt: "Begehbare Dusche unter der Dachschräge mit schwarzer Armatur" },
      { file: "galerie-bad-07.webp", titel: "Dachgeschossbad mit freistehender Wanne", alt: "Bad mit freistehender Wanne unter dem Dachfenster" },
      { file: "galerie-bad-08.webp", titel: "Altbau-Bad mit Metrofliesen", alt: "Altbau-Bad mit Wanne, Metrofliesen und Aufsatzwaschbecken" },
      { file: "galerie-bad-09.webp", titel: "Duschbad mit Glasabtrennung", alt: "Bad mit bodengleicher Glasdusche und Holz-Waschtisch" },
    ],
  },
  {
    id: "sanierung",
    slogan: "Bestehendes modern gedacht.",
    intro: "Ob einzelne Räume oder ganze Wohnbereiche – hier sehen Sie Beispiele realisierter Modernisierungen.",
    title: "Sanierung & Modernisierung",
    href: u("leistungen/sanierung-modernisierung/"),
    bilder: [
      { file: "galerie-sanierung-01.webp", titel: "Modernisierte Wohnküche", alt: "Modernisierte Wohnküche mit Esstisch und Schienenstrahlern" },
      { file: "galerie-sanierung-02.webp", titel: "Küche mit beleuchteter Kochinsel", alt: "Küche mit beleuchteter Kochinsel und dunklen Hochschränken" },
    ],
  },
  {
    id: "fliesen",
    slogan: "Präzision bis ins Detail.",
    intro: "Von Großformatfliesen bis zu modernen Bodenbelägen.",
    title: "Fliesen- & Bodenlegerarbeiten",
    href: u("leistungen/fliesen-boden/"),
    bilder: [
      { file: "galerie-fliesen-02.webp", titel: "Gäste-WC mit Großformatfliesen", alt: "Gäste-WC mit Großformatfliesen an Wand und Boden" },
      { file: "galerie-fliesen-03.webp", titel: "WC mit raumhohen Fliesen in Marmoroptik", alt: "WC mit raumhohen Fliesen in Marmoroptik" },
    ],
  },
  {
    id: "innenausbau",
    slogan: "Räume neu gestalten.",
    intro: "Individuelle Lösungen für Wohnräume, Geschäftsräume und Umbauten.",
    title: "Innenausbau & Trockenbau",
    href: u("leistungen/innenausbau/"),
    bilder: [
      { file: "galerie-innenausbau-01.webp", titel: "Gastraum mit Lichtfugen-Paneelen", alt: "Gastraum mit indirekt beleuchteten Wandpaneelen" },
      { file: "galerie-innenausbau-02.webp", titel: "Lounge mit Wandverkleidung", alt: "Lounge mit Wandverkleidung und LED-Lichtfugen" },
      { file: "galerie-innenausbau-03.webp", titel: "Raum mit Lichtfugen und Deckenvoute", alt: "Großer Raum mit Lichtfugen in der Wand und Deckenvoute" },
      { file: "galerie-innenausbau-04.webp", titel: "Büro mit Holzlamellen-Wand", alt: "Büro mit Holzlamellen-Wand und indirekter Beleuchtung" },
      { file: "galerie-innenausbau-05.webp", titel: "Besprechungsecke mit Lamellenwand", alt: "Besprechungsecke mit Lamellenwand und Schiebetür" },
    ],
  },
];

/** Auswahl für den Referenz-Slider auf der Startseite (je Leistung die stärksten Bilder). */
export const GALERIE_HIGHLIGHTS: (GalerieBild & { gruppe: string; anker: string })[] = [
  ["bad", "galerie-bad-02.webp"],
  ["innenausbau", "galerie-innenausbau-04.webp"],
  ["bad", "galerie-bad-05.webp"],
  ["sanierung", "galerie-sanierung-02.webp"],
  ["fliesen", "galerie-fliesen-02.webp"],   // Eingangstreppe entfernt (Kundenwunsch 14.10.2026)
  ["bad", "galerie-bad-07.webp"],
  ["innenausbau", "galerie-innenausbau-02.webp"],
  ["bad", "galerie-bad-03.webp"],
].map(([id, file]) => {
  const g = GALERIE.find((x) => x.id === id)!;
  const b = g.bilder.find((x) => x.file === file)!;
  return { ...b, gruppe: g.title, anker: u(`referenzen/#${g.id}`) };
});
