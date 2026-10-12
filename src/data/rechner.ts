/** Projekt-Rechner: Gewerke, Fragen und Preislogik – EINZIGE Quelle aller Rechner-Preise.
 *
 *  ALLE angezeigten Preise sind BRUTTO inkl. 19 % MwSt. (Kundenwunsch 11.10.2026 (6)).
 *  Wo der Kunde Nettopreise geliefert hat, steht hier der Nettowert und `netto: true` –
 *  die Umrechnung (× 1,19) passiert ausschließlich in `berechne()` bzw. `brutto()`.
 *
 *  - Badsanierung: echte Brutto-Preistabelle „ab“-Preis je m² (3–15 m²). Komfort = Basis
 *    + 1.500 €, Premium = Komfort + 1.500 €; angezeigt wird „ab X € bis X + 1.500 €“.
 *    4. Option „Barrierefreie Dusche“: fester Höchstpreis (Budget der Pflegekasse für
 *    wohnumfeldverbessernde Maßnahmen), kein Flächen-Slider.
 *  - Fliesen & Boden: Kunde nennt NETTO-Preise je m² + 500 € netto Grundpauschale.
 *    Parkett gibt es nicht mehr. Ergebnis ist ein konkreter Betrag (keine ±-Spanne).
 *    Die m²-Preise und der Rechenweg werden Kunden NICHT angezeigt (Kundenwunsch
 *    12.10.2026) – sichtbar ist nur der Gesamtbetrag inkl. MwSt.
 *  - Sanierung & Modernisierung: Die bisherigen Werte (8.000 € + 600/900/1.400 €/m²)
 *    waren Richtwerte OHNE MwSt.-Angabe (nirgends im Repo als brutto ausgewiesen).
 *    Kundenwunsch: um 50 % senken, DANN inkl. 19 % MwSt. anzeigen → als Nettowerte
 *    behandelt: Anzeige = (Grund + m² × Satz) × 0,5 × 1,19, ± 25 %, auf 500 € gerundet.
 *  - Innenausbau & Trockenbau: Werte unverändert, sind Bruttowerte (vom Kunden
 *    bestätigt 12.10.2026). Sanierung-Altwerte waren netto (ebenfalls bestätigt).
 *
 *  Das Ergebnis bleibt eine unverbindliche Ersteinschätzung; der Festpreis entsteht
 *  nach dem Vor-Ort-Termin.
 *
 *  Module: `label`/`hint` sind LAIENSPRACHE (UI), `fach` ist der Fachbegriff –
 *  er landet im Anfrage-Text (WhatsApp/E-Mail), damit das Team sofort fachlich lesen
 *  kann, was der Kunde gewählt hat. */

export const MWST = 0.19;
export const MWST_HINWEIS = "Bruttopreise inkl. 19 % MwSt.";
/** Netto → brutto, auf Cent gerundet. */
export const brutto = (netto: number) => Math.round(netto * (1 + MWST) * 100) / 100;

const eur = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

export type Modul = {
  id: string;
  label: string;   // laienfreundlich (Anzeige)
  fach: string;    // Fachbegriff (Anfrage-Text / Experten-Output)
  hint: string;    // eine Zeile Erklärung
};

export type Tier = {
  id: string;
  label: string;
  hint: string;
  /** Zweite Zeile unter dem Namen, z. B. „mit Zuschuss der Pflegekasse“. */
  untertitel?: string;
  /** Ausstattung dieses Niveaus (Ergebnis + Anfragetext). */
  enthalten?: string[];
  /** Badsanierung: Aufschlag in € (brutto) auf den Basis-„ab“-Preis der Tabelle. */
  aufschlag?: number;
  /** Fester Höchstpreis in € (brutto) – ohne Flächen-Slider. */
  festBis?: number;
  /** Abweichende Arbeitsschritte für dieses Niveau (sonst die des Gewerks). */
  bausteine?: Modul[];
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
  /** "tabelle": Brutto-„ab“-Preis je m² aus `preistabelle` (+ Tier-Aufschlag), bis = ab + `tabelleSpanne`.
   *  "flaeche": (Grund + Menge × €/Einheit) × faktor, ggf. × 1,19, ± spanne. */
  preismodell: "tabelle" | "flaeche";
  preistabelle?: Record<number, number>;
  tabelleSpanne?: number;
  grund: number;         // Grundpauschale €
  proEinheit: Record<string, number>; // € je Einheit, Schlüssel = Tier-id
  /** true = grund/proEinheit sind NETTO und werden für die Anzeige × 1,19 gerechnet. */
  netto: boolean;
  /** Preisfaktor auf grund/proEinheit (z. B. 0.5 = −50 %). */
  faktor?: number;
  spanne: number;        // ± relativ (0 = konkreter Betrag)
  tiers: Tier[];
  /** Enthaltene Arbeiten (Ergebnisliste + Fachbegriffe im Anfragetext). */
  bausteine: Modul[];
};

/* ---------- Badsanierung: echte Bruttopreise (Kunde, 11.10.2026) ---------- */
/** „ab“-Preis Basis in € BRUTTO inkl. 19 % MwSt., je Badgröße in m². */
export const BAD_AB_BRUTTO: Record<number, number> = {
  3: 11305, 4: 11882, 5: 12459, 6: 13070, 7: 13685, 8: 14340, 9: 14999,
  10: 15970, 11: 16946, 12: 18029, 13: 19111, 14: 20194, 15: 21277,
};
/** Spanne „ab … bis …“: bis = ab + 1.500 €. Gleichzeitig Stufenabstand Basis → Komfort → Premium. */
export const BAD_STUFE = 1500;
/** Barrierefreie Dusche: Budget der Pflegekasse für wohnumfeldverbessernde Maßnahmen. */
export const BAD_BARRIEREFREI_BIS = 4180;

/* ---------- Fliesen & Boden: Nettopreise (Kunde, 11.10.2026) ---------- */
const FLIESEN_NETTO = { grund: 500, vinyl: 55, fliesen: 75, gross: 85 };

export const GEWERKE: Gewerk[] = [
  {
    slug: "badsanierung",
    label: "Badsanierung",
    icon: "bath",
    nutzen: "Ihr neues Bad in 2 Wochen – geplant, gebaut und übergeben aus einer Hand.",
    frage: "Wie groß ist Ihr Bad?",
    unit: "m²",
    min: 3, max: 15, step: 1, default: 8,
    preismodell: "tabelle",
    preistabelle: BAD_AB_BRUTTO,
    tabelleSpanne: BAD_STUFE,
    grund: 0, proEinheit: {}, netto: false, spanne: 0,
    tiers: [
      {
        id: "basis", label: "Basis", aufschlag: 0,
        hint: "Dusche oder Wanne, WC, Waschtisch, Standard-Fliesen",
        enthalten: [
          "Dusche ODER Badewanne (nicht beides)",
          "WC und Waschtisch",
          "Leitungen bis zum Knotenpunkt erneuert",
          "Position der Sanitärobjekte anpassbar",
          "Standard-Fliesen",
          "Alle übrigen Teile und Material",
        ],
      },
      {
        id: "komfort", label: "Komfort", aufschlag: BAD_STUFE,
        hint: "Bodengleiche Dusche, wertigere Ausstattung, Großformatfliesen",
        enthalten: [
          "Alles aus Basis, dazu:",
          "Bodengleiche Dusche",
          "Wertigere Ausstattung",
          "Großformatfliesen",
        ],
      },
      {
        id: "premium", label: "Premium", aufschlag: 2 * BAD_STUFE,
        hint: "Alles aus Komfort plus Fußbodenheizung und LED-Spots – individuell gestaltbar",
        enthalten: [
          "Alles aus Komfort, dazu:",
          "Fußbodenheizung",
          "LED-Spots",
          "Individuell gestaltbar, z. B. zusätzliche Trennwand",
        ],
      },
      {
        id: "barrierefrei", label: "Barrierefreie Dusche", untertitel: "mit Zuschuss der Pflegekasse",
        festBis: BAD_BARRIEREFREI_BIS,
        hint: "Alte Dusche raus, bodengleiche Dusche rein – immer unter 4.180 €",
        enthalten: [
          "Alte Dusche raus",
          "Bodengleiche Dusche rein",
          "Fliesen im Duschbereich neu – identische Fliesen sind nicht immer möglich, das Ergebnis wird trotzdem schön",
          "Passend zum Budget der Pflegekasse für wohnumfeldverbessernde Maßnahmen",
        ],
        bausteine: [
          { id: "demontage", label: "Alte Dusche raus", fach: "Demontage & Entsorgung Duschbereich", hint: "" },
          { id: "dusche", label: "Bodengleiche Dusche rein", fach: "Einbau bodengleiche Dusche inkl. Abdichtung", hint: "" },
          { id: "fliesen", label: "Fliesen neu", fach: "Fliesenarbeiten Duschbereich", hint: "" },
        ],
      },
    ],
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
    preismodell: "flaeche",
    // Bisherige Richtwerte (netto behandelt, s. Kopfkommentar) – −50 % per faktor, dann × 1,19
    grund: 8000,
    proEinheit: { basis: 600, komfort: 900, premium: 1400 },
    netto: true,
    faktor: 0.5,
    spanne: 0.25,
    tiers: [
      { id: "basis", label: "Renovierung", hint: "Oberflächen erneuern: Böden, Wände, Türen" },
      { id: "komfort", label: "Teilsanierung", hint: "Inkl. Bad/Küche, Elektrik in Teilen" },
      { id: "premium", label: "Kernsanierung", hint: "Bis auf den Rohbau, alle Leitungen neu" },
    ],
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
    nutzen: "Perfekte Oberflächen für Wand und Boden – Fliesen, Großformate, Vinyl und Laminat.",
    frage: "Wie groß ist die Fläche, die neu belegt werden soll?",
    unit: "m²",
    min: 5, max: 200, step: 5, default: 25,
    preismodell: "flaeche",
    grund: FLIESEN_NETTO.grund,
    proEinheit: { basis: FLIESEN_NETTO.vinyl, komfort: FLIESEN_NETTO.fliesen, premium: FLIESEN_NETTO.gross },
    netto: true,
    spanne: 0,
    tiers: [
      { id: "basis", label: "Vinyl & Laminat", hint: "Klick-Vinyl oder Laminat inkl. Trittschalldämmung" },
      { id: "komfort", label: "Fliesen bis 60 × 60 cm", hint: "Wand- oder Bodenfliesen" },
      { id: "premium", label: "Großformatfliesen", hint: "Großformat und Feinsteinzeug" },
    ],
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
    preismodell: "flaeche",
    // Unverändert (Kundenwunsch 11.10.2026) – Bruttowerte, vom Kunden bestätigt 12.10.2026.
    grund: 2500,
    proEinheit: { basis: 450, komfort: 650, premium: 900 },
    netto: false,
    spanne: 0.25,
    tiers: [
      { id: "basis", label: "Basis", hint: "Wände/Decken stellen, spachteln, streichfertig" },
      { id: "komfort", label: "Ausbau", hint: "Inkl. Böden, Türen, Schallschutz" },
      { id: "premium", label: "Komplett", hint: "Inkl. Elektro, Beleuchtung, Maßeinbauten" },
    ],
    bausteine: [
      { id: "unterkonstruktion", label: "Wände planen & stellen", fach: "Ständerwerk/Unterkonstruktion", hint: "Die neue Raumaufteilung entsteht" },
      { id: "beplankung", label: "Wände schließen", fach: "Beplankung", hint: "Wände und Decken werden geschlossen" },
      { id: "schallschutz", label: "Ruhe reinbauen", fach: "Schall-/Wärmedämmung", hint: "Dämmung gegen Lärm und Kälte" },
      { id: "spachteln", label: "Glatte Flächen", fach: "Spachtelung (Q2/Q3)", hint: "Übergänge verschwinden, Flächen werden glatt" },
      { id: "streichfertig", label: "Streichfertig übergeben", fach: "Oberflächen-Finish", hint: "Bereit für Farbe oder Tapete" },
    ],
  },
];

/** Leistungen mit festem Pauschalpreis – ohne Rechenschritte (Kundenwunsch 11.10.2026).
 *  Preis und Leistungsinhalt stehen NUR in der Content-Datei (pauschalpreis/umfang),
 *  hier nur die Daten für die Leistungskarte. */
export type Pauschal = { slug: string; label: string; icon: string; nutzen: string };

export const PAUSCHAL: Pauschal[] = [
  {
    slug: "sanierungscheck",
    label: "Immobilien-Sanierungscheck",
    icon: "eye",
    nutzen: "Chancen, Risiken und Kosten frühzeitig erkennen – vor dem Kauf.",
  },
];

export const gewerkBySlug = (slug: string): Gewerk | undefined =>
  GEWERKE.find((g) => g.slug === slug);

/** Ergebnis einer Berechnung – alle Beträge in € BRUTTO inkl. 19 % MwSt. */
export type Ergebnis =
  | { art: "spanne"; von: number; bis: number; ab: boolean }   // „ab X bis Y“ bzw. „ca. X – Y“
  | { art: "unter"; bis: number }                              // fester Höchstpreis
  | { art: "betrag"; betrag: number };                         // konkreter Gesamtbetrag

export const tierById = (g: Gewerk, id: string): Tier => g.tiers.find((t) => t.id === id) ?? g.tiers[0];

/** Preis für Gewerk, Menge und Niveau (Brutto). */
export function berechne(g: Gewerk, menge: number, tierId: string): Ergebnis {
  const t = tierById(g, tierId);
  if (t.festBis) return { art: "unter", bis: t.festBis };
  if (g.preismodell === "tabelle") {
    const tab = g.preistabelle!;
    const m = Math.min(Math.max(Math.round(menge), g.min), g.max);
    const ab = tab[m] + (t.aufschlag ?? 0);
    return { art: "spanne", von: ab, bis: ab + (g.tabelleSpanne ?? 0), ab: true };
  }
  const f = (g.faktor ?? 1) * (g.netto ? 1 + MWST : 1);
  const grund = g.grund * f;
  const proE = (g.proEinheit[t.id] ?? Object.values(g.proEinheit)[0]) * f;
  const basis = grund + menge * proE;
  if (g.spanne === 0) {
    return { art: "betrag", betrag: Math.round(basis) };
  }
  const round500 = (n: number) => Math.round(n / 500) * 500;
  return { art: "spanne", von: round500(basis * (1 - g.spanne)), bis: round500(basis * (1 + g.spanne)), ab: false };
}

/** Anzeige-Text des Ergebnisses (Ergebnisfeld, WhatsApp, E-Mail). */
export function preisText(e: Ergebnis): string {
  if (e.art === "unter") return `unter ${eur(e.bis)} €`;
  if (e.art === "betrag") return `ca. ${eur(e.betrag)} €`;
  return e.ab ? `ab ${eur(e.von)} € bis ${eur(e.bis)} €` : `ca. ${eur(e.von)} € – ${eur(e.bis)} €`;
}
