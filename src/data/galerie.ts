/** Referenz-Galerie, gegliedert nach den Leistungen aus dem Header-Menü
 *  (Kundenfeedback 07.10.2026 – ohne Immobilien-Sanierungscheck).
 *  Nur echte Bauwelt-Fotos. Neue Bilder: scripts/galerie-bilder.py. */
import { u } from "../consts";

export type GalerieBild = { file: string; alt: string };
export type GalerieGruppe = {
  id: string;          // Anker auf der Referenzseite (#bad …)
  title: string;
  href: string;        // passende Leistungsseite
  bilder: GalerieBild[];
};

export const GALERIE: GalerieGruppe[] = [
  {
    id: "bad",
    title: "Badsanierung",
    href: u("leistungen/badsanierung/"),
    bilder: [
      { file: "galerie-bad-01.webp", alt: "Schmales Bad mit bodengleicher Dusche, Holzboden und Handtuchheizkörper" },
      { file: "galerie-bad-02.webp", alt: "Bad mit Natursteinoptik, beleuchtetem Spiegel und goldener Armatur" },
      { file: "galerie-bad-03.webp", alt: "Großzügiges Bad mit dunklen Großformatfliesen und LED-Spiegel" },
      { file: "galerie-bad-04.webp", alt: "Helles Bad mit eingefliester Badewanne und Wand-WC" },
      { file: "galerie-bad-05.webp", alt: "Dachgeschossbad mit Glasdusche und Doppelwaschtisch" },
      { file: "galerie-bad-06.webp", alt: "Begehbare Dusche unter der Dachschräge mit schwarzer Armatur" },
      { file: "galerie-bad-07.webp", alt: "Bad mit freistehender Wanne unter dem Dachfenster" },
      { file: "galerie-bad-08.webp", alt: "Altbau-Bad mit Wanne, Metrofliesen und Aufsatzwaschbecken" },
      { file: "galerie-bad-09.webp", alt: "Bad mit bodengleicher Glasdusche und Holz-Waschtisch" },
      { file: "ref-01-wannenbad.webp", alt: "Wannenbad mit Eichenholz-Akzenten" },
      { file: "ref-03-gaeste-wc.webp", alt: "Modern saniertes Gäste-WC" },
    ],
  },
  {
    id: "sanierung",
    title: "Sanierung & Modernisierung",
    href: u("leistungen/sanierung-modernisierung/"),
    bilder: [
      { file: "galerie-sanierung-01.webp", alt: "Modernisierte Wohnküche mit Esstisch und Schienenstrahlern" },
      { file: "galerie-sanierung-02.webp", alt: "Küche mit beleuchteter Kochinsel und dunklen Hochschränken" },
      { file: "ref-04-altbau.webp", alt: "Sanierter Altbau-Wohnraum mit Fischgrätparkett" },
      { file: "ref-05-wohnung.webp", alt: "Komplett sanierte Wohnung" },
    ],
  },
  {
    id: "fliesen",
    title: "Fliesen- & Bodenlegerarbeiten",
    href: u("leistungen/fliesen-boden/"),
    bilder: [
      { file: "galerie-fliesen-01.webp", alt: "Neu geflieste Eingangstreppe mit großformatigen Platten" },
      { file: "galerie-fliesen-02.webp", alt: "Gäste-WC mit Großformatfliesen an Wand und Boden" },
      { file: "galerie-fliesen-03.webp", alt: "WC mit raumhohen Fliesen in Marmoroptik" },
      { file: "ref-02-bodengleiche-dusche.webp", alt: "Großformatig geflieste bodengleiche Dusche" },
    ],
  },
  {
    id: "innenausbau",
    title: "Innenausbau & Trockenbau",
    href: u("leistungen/innenausbau/"),
    bilder: [
      { file: "galerie-innenausbau-01.webp", alt: "Gastraum mit indirekt beleuchteten Wandpaneelen" },
      { file: "galerie-innenausbau-02.webp", alt: "Lounge mit Wandverkleidung und LED-Lichtfugen" },
      { file: "galerie-innenausbau-03.webp", alt: "Großer Raum mit Lichtfugen in der Wand und Deckenvoute" },
      { file: "galerie-innenausbau-04.webp", alt: "Büro mit Holzlamellen-Wand und indirekter Beleuchtung" },
      { file: "galerie-innenausbau-05.webp", alt: "Besprechungsecke mit Lamellenwand und Schiebetür" },
    ],
  },
];

/** Auswahl für den Referenz-Slider auf der Startseite (je Leistung die stärksten Bilder). */
export const GALERIE_HIGHLIGHTS: (GalerieBild & { gruppe: string; anker: string })[] = [
  ["bad", "galerie-bad-02.webp"],
  ["innenausbau", "galerie-innenausbau-04.webp"],
  ["bad", "galerie-bad-05.webp"],
  ["sanierung", "galerie-sanierung-02.webp"],
  ["fliesen", "galerie-fliesen-01.webp"],
  ["bad", "galerie-bad-07.webp"],
  ["innenausbau", "galerie-innenausbau-02.webp"],
  ["bad", "galerie-bad-03.webp"],
].map(([id, file]) => {
  const g = GALERIE.find((x) => x.id === id)!;
  const b = g.bilder.find((x) => x.file === file)!;
  return { ...b, gruppe: g.title, anker: u(`referenzen/#${g.id}`) };
});
