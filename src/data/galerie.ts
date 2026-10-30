/** Referenz-Galerie, gegliedert nach den Leistungen aus dem Header-Menü
 *  (Kundenfeedback 07.10.2026 – ohne Immobilien-Sanierungscheck).
 *  NUR echte Bauwelt-Fotos (galerie-*.webp). Die KI-Bilder ref-01…06 sind seit
 *  Kundenwunsch 12.10.2026 (17) entfernt. Neue Bilder: scripts/galerie-bilder.py. */
import { u } from "../consts";

/** titel: Projektname unter dem Foto (Kundenwunsch 14.10.2026 (35)/(36)).
 *  ort/flaeche/art: Projektdaten – nur nach Kundenangabe (Orte Hamburg/Norderstedt laut Jamil, 14.10.2026 (41)). */
export type GalerieBild = { file: string; alt: string; titel?: string; ort?: string; flaeche?: string; art?: string };
export type GalerieGruppe = {
  id: string;          // Anker auf der Referenzseite (#bad …)
  title: string;
  href: string;        // passende Leistungsseite
  /** Kategorie-Einleitung auf der Referenzseite (Kundenwunsch 14.10.2026 (36)) */
  slogan?: string;
  intro?: string;
  bilder: GalerieBild[];
  /** Weitere Gruppen, deren Bilder auf der LEISTUNGSSEITE zusätzlich als Referenz erscheinen – auf /referenzen/
   *  bleiben sie nur in ihrer eigenen Gruppe (kein Bild doppelt). Jamil 30.10.2026 (Talk 3830): Fliesen zeigt die Badbilder. */
  zusatz?: string[];
};

export const GALERIE: GalerieGruppe[] = [
  {
    id: "bad",
    slogan: "Mehr Komfort. Mehr Design. Mehr Wohnqualität.",
    intro: "Von kompakten Gäste-WCs bis hin zum großzügigen Wellnessbad begleiten wir unsere Kunden von der Planung bis zur fertigen Übergabe.",
    title: "Badsanierung",
    href: u("leistungen/badsanierung/"),
    bilder: [
      { file: "galerie-bad-01.webp", ort: "Hamburg", titel: "Badezimmer mit bodengleicher Dusche", alt: "Schmales Bad mit bodengleicher Dusche, Holzboden und Handtuchheizkörper" },
      { file: "galerie-bad-02.webp", ort: "Norderstedt", titel: "Designbad in Natursteinoptik", alt: "Bad mit Natursteinoptik, beleuchtetem Spiegel und goldener Armatur" },
      { file: "galerie-bad-03.webp", ort: "Hamburg", titel: "Premiumbad mit Großformatfliesen", alt: "Großzügiges Bad mit dunklen Großformatfliesen und LED-Spiegel" },
      { file: "galerie-bad-04.webp", ort: "Norderstedt", titel: "Modernes Familienbad", alt: "Helles Bad mit eingefliester Badewanne und Wand-WC" },
      { file: "galerie-bad-05.webp", ort: "Hamburg", titel: "Dachgeschossbad mit Doppelwaschtisch", alt: "Dachgeschossbad mit Glasdusche und Doppelwaschtisch" },
      { file: "galerie-bad-06.webp", ort: "Norderstedt", titel: "Walk-in-Dusche unter der Dachschräge", alt: "Begehbare Dusche unter der Dachschräge mit schwarzer Armatur" },
      { file: "galerie-bad-07.webp", ort: "Hamburg", titel: "Dachgeschossbad mit freistehender Wanne", alt: "Bad mit freistehender Wanne unter dem Dachfenster" },
      { file: "galerie-bad-08.webp", ort: "Hamburg", titel: "Altbau-Bad mit Metrofliesen", alt: "Altbau-Bad mit Wanne, Metrofliesen und Aufsatzwaschbecken" },
      { file: "galerie-bad-09.webp", ort: "Norderstedt", titel: "Duschbad mit Glasabtrennung", alt: "Bad mit bodengleicher Glasdusche und Holz-Waschtisch" },
    ],
  },
  {
    id: "sanierung",
    slogan: "Bestehendes modern gedacht.",
    intro: "Ob einzelne Räume oder ganze Wohnbereiche – hier sehen Sie Beispiele für Modernisierungen.",
    title: "Komplettsanierung & Modernisierung", // Kundenwunsch 16.10.2026 (73): neuer Leistungsname
    href: u("leistungen/sanierung-modernisierung/"),
    bilder: [
      { file: "galerie-sanierung-01.webp", ort: "Norderstedt", titel: "Modernisierte Wohnküche", alt: "Modernisierte Wohnküche mit Esstisch und Schienenstrahlern" },
      // galerie-sanierung-02 (Küche mit Kochinsel) vorerst entfernt – aktuellere Bilder folgen (Jamil 30.10.2026, Talk 3832)
    ],
  },
  {
    id: "fliesen",
    slogan: "Präzision bis ins Detail.",
    intro: "Von Großformatfliesen bis zu modernen Bodenbelägen.",
    title: "Fliesen- & Bodenlegerarbeiten",
    href: u("leistungen/fliesen-boden/"),
    zusatz: ["bad"], // Jamil 30.10.2026 (Talk 3830)
    bilder: [
      { file: "galerie-fliesen-02.webp", ort: "Hamburg", titel: "Gäste-WC mit Großformatfliesen", alt: "Gäste-WC mit Großformatfliesen an Wand und Boden" },
      { file: "galerie-fliesen-03.webp", ort: "Norderstedt", titel: "WC mit raumhohen Fliesen in Marmoroptik", alt: "WC mit raumhohen Fliesen in Marmoroptik" },
    ],
  },
  {
    id: "innenausbau",
    slogan: "Räume neu gestalten.",
    intro: "Individuelle Lösungen für Wohnräume, Geschäftsräume und Umbauten.",
    title: "Innenausbau & Trockenbau",
    href: u("leistungen/innenausbau/"),
    bilder: [
      { file: "galerie-innenausbau-01.webp", ort: "Hamburg", titel: "Gastraum mit Lichtfugen-Paneelen", alt: "Gastraum mit indirekt beleuchteten Wandpaneelen" },
      { file: "galerie-innenausbau-02.webp", ort: "Hamburg", titel: "Lounge mit Wandverkleidung", alt: "Lounge mit Wandverkleidung und LED-Lichtfugen" },
      { file: "galerie-innenausbau-03.webp", ort: "Norderstedt", titel: "Raum mit Lichtfugen und Deckenvoute", alt: "Großer Raum mit Lichtfugen in der Wand und Deckenvoute" },
      { file: "galerie-innenausbau-04.webp", ort: "Norderstedt", titel: "Büro mit Holzlamellen-Wand", alt: "Büro mit Holzlamellen-Wand und indirekter Beleuchtung" },
      { file: "galerie-innenausbau-05.webp", ort: "Norderstedt", titel: "Besprechungsecke mit Lamellenwand", alt: "Besprechungsecke mit Lamellenwand und Schiebetür" },
    ],
  },
];

/** Auswahl für den Referenz-Slider auf der Startseite (je Leistung die stärksten Bilder). */
export const GALERIE_HIGHLIGHTS: (GalerieBild & { gruppe: string; anker: string })[] = [
  ["bad", "galerie-bad-02.webp"],
  ["innenausbau", "galerie-innenausbau-04.webp"],
  ["bad", "galerie-bad-05.webp"],
  ["sanierung", "galerie-sanierung-01.webp"], // statt sanierung-02 (Jamil 30.10.2026, Talk 3832)
  ["fliesen", "galerie-fliesen-02.webp"],   // Eingangstreppe entfernt (Kundenwunsch 14.10.2026)
  ["bad", "galerie-bad-07.webp"],
  ["innenausbau", "galerie-innenausbau-02.webp"],
  ["bad", "galerie-bad-03.webp"],
].map(([id, file]) => {
  const g = GALERIE.find((x) => x.id === id)!;
  const b = g.bilder.find((x) => x.file === file)!;
  return { ...b, gruppe: g.title, anker: u(`referenzen/#${g.id}`) };
});

/** Bilder einer Leistungsseite: eigene Gruppe + `zusatz`-Gruppen (ohne Doppelte), je Bild mit Anker auf /referenzen/. */
export function leistungsBilder(id: string): (GalerieBild & { anker: string })[] {
  const g = GALERIE.find((x) => x.id === id);
  if (!g) return [];
  const gesehen = new Set<string>();
  return [g, ...(g.zusatz ?? []).map((z) => GALERIE.find((x) => x.id === z)).filter((x): x is GalerieGruppe => Boolean(x))]
    .flatMap((gr) => gr.bilder.map((b) => ({ ...b, anker: gr.id })))
    .filter((b) => (gesehen.has(b.file) ? false : (gesehen.add(b.file), true)));
}
