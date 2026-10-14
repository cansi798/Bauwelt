/** Projekt-Rechner: Gewerke, Fragen und Preislogik – EINZIGE Quelle aller Rechner-Preise.
 *
 *  ALLE angezeigten Preise sind BRUTTO inkl. 19 % MwSt. (Kundenwunsch 11.10.2026 (6)).
 *  Wo der Kunde Nettopreise geliefert hat, steht hier der Nettowert und `netto: true` –
 *  die Umrechnung (× 1,19) passiert ausschließlich in `berechne()` bzw. `brutto()`.
 *
 *  - Badsanierung (Kundenwunsch 14.10.2026 (47)): nur noch ZWEI Optionen, keine Niveaus
 *    Basis/Komfort/Premium mehr.
 *    „Badsanierung“: echte Brutto-Preistabelle „ab“-Preis X je m² (3–15 m²), dann wählt der
 *    Kunde die Kalkulationsart:
 *      · „Schnelle Kalkulation“:     „ab X € bis X + 5.160 €“ (BAD_SCHNELL_SPANNE)
 *      · „Detaillierte Kalkulation“: „ab X + Extras bis X + 1.500 € + Extras“ (BAD_STUFE);
 *        Extras (BAD_EXTRAS, brutto) werden per Checkbox gewählt, der Preis ändert sich
 *        live. Die Einzelpreise der Extras werden Kunden NICHT angezeigt.
 *    „Barrierefreie Dusche“: fester Preis (Budget der Pflegekasse für wohnumfeldverbessernde
 *    Maßnahmen), kein Flächen-Slider.
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
  /** Fester Höchstpreis in € (brutto) – ohne Flächen-Slider. */
  festBis?: number;
  /** Abweichende Arbeitsschritte für dieses Niveau (sonst die des Gewerks). */
  bausteine?: Modul[];
};

/** Zusatzleistung der detaillierten Kalkulation (Badsanierung). Preis BRUTTO inkl. MwSt.
 *  `preis`/`proM2` sind NUR für die Rechnung – Kunden sehen nie den Einzelpreis. */
export type Extra = {
  id: string;
  label: string;   // laienfreundlich (Checkbox, Ergebnis)
  fach: string;    // Fachbegriff (Anfrage-Text)
  preis: number;   // € brutto (bei proM2: je m²)
  proM2?: boolean; // true = preis × gewählte m²
};

/** Kalkulationsart (Badsanierung, Kundenwunsch 14.10.2026 (47)). */
export type KalkArt = "schnell" | "detail";
export const KALK_ARTEN: { id: KalkArt; label: string; hint: string }[] = [
  { id: "schnell", label: "Schnelle Kalkulation", hint: "Preisrahmen nur nach Badgröße" },
  { id: "detail", label: "Detaillierte Kalkulation", hint: "Mit Ihren Wunsch-Extras – der Preis passt sich sofort an" },
];
export const kalkArtLabel = (id: KalkArt) => KALK_ARTEN.find((k) => k.id === id)?.label ?? id;

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
  /** "tabelle": Brutto-„ab“-Preis je m² aus `preistabelle`, bis = ab + `tabelleSpanne`
   *    (bzw. + `schnellSpanne` bei „Schnelle Kalkulation“; Extras kommen auf beide Werte).
   *  "flaeche": (Grund + Menge × €/Einheit) × faktor, ggf. × 1,19, ± spanne. */
  preismodell: "tabelle" | "flaeche";
  preistabelle?: Record<number, number>;
  tabelleSpanne?: number;
  /** Spannenbreite der „Schnellen Kalkulation“ (nur Gewerke mit Kalkulationsart). */
  schnellSpanne?: number;
  /** Gesetzt = Kalkulationsart „Schnell/Detailliert“ wählbar; Extras der detaillierten Kalkulation. */
  extras?: Extra[];
  /** Gesetzt = Optionswahl (tiers) steht VOR der Mengenangabe; Text = Überschrift der Optionswahl,
   *  `frage` beschriftet dann den Slider. */
  wahlFrage?: string;
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
/** Detaillierte Kalkulation: Spanne „ab … bis …“, bis = ab + 1.500 € (Standardpreis, vorher „Basis“). */
export const BAD_STUFE = 1500;
/** Schnelle Kalkulation: bis = ab + 5.160 € – Kundenwunsch 14.10.2026 (47), Beispiel des Kunden:
 *  8 m² → „ab 14.340 € bis 19.500 €“; gilt gleichermaßen für alle Badgrößen. */
export const BAD_SCHNELL_SPANNE = 5160;
/** Extras der detaillierten Kalkulation – Bruttopreise, werden Kunden NICHT angezeigt
 *  (Kundenwunsch 14.10.2026 (47)). Reihenfolge = Anzeige-Reihenfolge. */
export const BAD_EXTRAS: Extra[] = [
  { id: "grosse-fliesen", label: "Große Fliesen", fach: "Großformatfliesen (statt Standardformat)", preis: 35, proM2: true },
  { id: "led-spots", label: "LED-Spots", fach: "LED-Einbaustrahler", preis: 400 },
  { id: "fussbodenheizung", label: "Fußbodenheizung", fach: "Fußbodenheizung", preis: 800 },
  { id: "sitzbank", label: "Sitzbank verfliest", fach: "Gemauerte Sitzbank, gefliest", preis: 400 },
  { id: "bodeneben", label: "Bodenebene Dusche verfliest", fach: "Bodengleiche Dusche, gefliest (inkl. Abdichtung)", preis: 550 },
];
/** Barrierefreie Dusche: Budget der Pflegekasse für wohnumfeldverbessernde Maßnahmen. */
export const BAD_BARRIEREFREI_BIS = 4099; // Kundenwunsch 14.10.2026 (45): vorher 4.180 €

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
    schnellSpanne: BAD_SCHNELL_SPANNE,
    extras: BAD_EXTRAS,
    wahlFrage: "Was ist geplant?",
    grund: 0, proEinheit: {}, netto: false, spanne: 0,
    // Kundenwunsch 14.10.2026 (47): nur noch „Badsanierung“ und „Barrierefreie Dusche“
    // (Komfort/Premium entfallen; Extras stattdessen in der detaillierten Kalkulation).
    tiers: [
      {
        id: "bad", label: "Badsanierung",
        hint: "Komplett neues Bad – Preis nach Badgröße, auf Wunsch mit Extras",
        // Standard-Inhalt = bisheriges „Basis“-Niveau
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
        id: "barrierefrei", label: "Barrierefreie Dusche",
        festBis: BAD_BARRIEREFREI_BIS,
        hint: "Alte Dusche raus, bodengleiche Dusche rein, Fliesen neu", // Preis erst im Ergebnis (Kundenwunsch 12.10.2026)
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

/** Optionen der Badsanierung: Kalkulationsart + gewählte Extras (ids). */
export type KalkOptionen = { art?: KalkArt; extras?: string[] };

/** Summe der gewählten Extras in € brutto (m²-Extras × Menge). */
export function extrasSumme(g: Gewerk, menge: number, ids: string[] = []): number {
  return (g.extras ?? [])
    .filter((x) => ids.includes(x.id))
    .reduce((summe, x) => summe + (x.proM2 ? x.preis * menge : x.preis), 0);
}

/** Preis für Gewerk, Menge und Niveau (Brutto). `opt` nur für Gewerke mit Kalkulationsart. */
export function berechne(g: Gewerk, menge: number, tierId: string, opt: KalkOptionen = {}): Ergebnis {
  const t = tierById(g, tierId);
  if (t.festBis) return { art: "unter", bis: t.festBis };
  if (g.preismodell === "tabelle") {
    const tab = g.preistabelle!;
    const m = Math.min(Math.max(Math.round(menge), g.min), g.max);
    // Kundenwunsch 14.10.2026 (47): schnell = „ab X bis X + 5.160 €“ (ohne Extras),
    // detailliert = „ab X + Extras bis X + 1.500 € + Extras“.
    if (g.schnellSpanne && (opt.art ?? "schnell") === "schnell") {
      return { art: "spanne", von: tab[m], bis: tab[m] + g.schnellSpanne, ab: true };
    }
    const ab = tab[m] + extrasSumme(g, m, opt.extras);
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
  if (e.art === "unter") return `≈ ${eur(e.bis)} €`; // Kundenwunsch 14.10.2026 (46): „≈“ statt „unter“
  if (e.art === "betrag") return `ca. ${eur(e.betrag)} €`;
  return e.ab ? `ab ${eur(e.von)} € bis ${eur(e.bis)} €` : `ca. ${eur(e.von)} € – ${eur(e.bis)} €`;
}
