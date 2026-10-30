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
 *    Parkett gibt es nicht mehr. Ergebnis seit 27.10.2026 eine Spanne: Betrag bis Betrag + 600 € (`aufschlag`).
 *    Die m²-Preise und der Rechenweg werden Kunden NICHT angezeigt (Kundenwunsch
 *    12.10.2026) – sichtbar ist nur der Gesamtbetrag inkl. MwSt.
 *  - Sanierung & Modernisierung: Die bisherigen Werte (8.000 € + 600/900/1.400 €/m²)
 *    waren Richtwerte OHNE MwSt.-Angabe (nirgends im Repo als brutto ausgewiesen).
 *    Kundenwunsch: um 50 % senken, DANN inkl. 19 % MwSt. anzeigen → als Nettowerte
 *    behandelt: Anzeige = (Grund + m² × Satz) × 0,5 × 1,19, ± 25 %, auf 500 € gerundet.
 *  - Innenausbau & Trockenbau (seit 27.10.2026, Jamil Talk 3441/3478): 150 € pro m² Fläche (Boden, Wände,
 *    Decken), brutto inkl. MwSt.; Spanne Betrag bis Betrag + 800 € (Dämmung, Türen, Elektro nach Bedarf).
 *    Sanierung-Altwerte waren netto (bestätigt 12.10.2026).
 *
 *  Das Ergebnis bleibt eine unverbindliche Ersteinschätzung; der genaue Preis entsteht
 *  im schriftlichen Angebot nach dem Vor-Ort-Termin (Versprechen-Check H6, 27.10.2026).
 *
 *  Module: `label`/`hint` sind LAIENSPRACHE (UI), `fach` ist der Fachbegriff –
 *  er landet im Anfrage-Text (WhatsApp/E-Mail), damit das Team sofort fachlich lesen
 *  kann, was der Kunde gewählt hat. */

import { LEISTUNGEN, kurzName } from "../consts";

/** Leistungsname aus der zentralen Liste LEISTUNGEN (consts.ts) – Kundenwunsch 16.10.2026 (73). */
const name = (slug: string): string => {
  const l = LEISTUNGEN.find((x) => x.slug === slug);
  if (!l) throw new Error(`Leistung ${slug} fehlt in LEISTUNGEN (consts.ts)`);
  return kurzName(l);
};

/** Hinweis am Rechner-Ergebnis (nur Badsanierung + Komplettsanierung, Jamil 27.10.2026, Talk 3427). */
export const HINWEIS_PREIS = "Der tatsächliche Preis hängt von Ihren individuellen Wünschen, der Art der Umsetzung und dem gewählten Material ab.";
// Jamil 30.10.2026 (Talk 3826): der Preis-Hinweis steht jetzt bei ALLEN berechneten Leistungen (vorher nur Bad/Komplett).
// Rechner-Ergebnis ohne Enthalten-/Nicht-enthalten-Kästen (Talk 3823/3824); stattdessen ein Satz je Leistung:
export const SATZ_WUNSCH = "Wir versuchen, jeden Ihrer Wünsche umzusetzen."; // sinngemäß Jamil 3823 – kein „garantiert“ (UWG)
export const SATZ_ERNEUERN = `Alles kann erneuert werden. ${SATZ_WUNSCH}`; // Jamil 3823 (Bad) + 3824 (übrige Leistungen)
export const SATZ_DAZU = `Alles, was zu den Arbeiten dazugehört, wird umgesetzt. ${SATZ_WUNSCH}`; // Jamil 3825 (Fliesen, Boden, Trockenbau)
const SATZ_JE_LEISTUNG: Record<string, string> = { "fliesen-boden": SATZ_DAZU, innenausbau: SATZ_DAZU };
export const ergebnisSatz = (slug: string) => SATZ_JE_LEISTUNG[slug] ?? SATZ_ERNEUERN;
// Jamil 30.10.2026 (Talk 3828): Bad- und Komplettsanierung – der Rechner kalkuliert eine komplette Erneuerung;
// dazu der Rat, direkt einen Besichtigungstermin zu buchen (Button mit der vorhandenen Terminbuchung).
export const KOMPLETT_SLUGS = ["badsanierung", "sanierung-modernisierung"];
export const KOMPLETT_HINWEIS = "Der Rechner kalkuliert eine komplette Erneuerung. Sind die Arbeiten bei Ihnen geringer, kann der Preis abweichen.";
export const TERMIN_RAT = "Am besten buchen Sie direkt einen kostenlosen Vor-Ort-Termin. Danach erhalten Sie ein individuelles Angebot."; // „Vor-Ort-Termin“ statt „Besichtigungstermin“ (Wording-Regel 4.1)

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
  { id: "schnell", label: "Schnelle Kalkulation", hint: "Preisspanne nur nach Badgröße" },
  { id: "detail", label: "Detaillierte Kalkulation", hint: "Mit Ihren Wunsch-Extras – der Preis passt sich sofort an" },
];
export const kalkArtLabel = (id: KalkArt) => KALK_ARTEN.find((k) => k.id === id)?.label ?? id;

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
  /** Bezeichnung der Optionswahl im Ergebnis, Anfragetext und für Screenreader (statt „Niveau“, Jamil 27.10.2026, Talk 3429). */
  auswahlLabel?: string;
  /** true = keine Optionswahl: nur eine Stufe, Ergebnis wird direkt berechnet (Innenausbau). */
  ohneAuswahl?: boolean;
  /** Kurzer Hilfetext unter dem Flächen-Regler (welche Fläche gemeint ist, Innenausbau – Jamil 27.10.2026, Talk 3478). */
  mengeHinweis?: string;
  /** Entfernt 30.10.2026 (Jamil, Talk 3820/3823) – Feld bleibt nur, damit test-rechner sein Zurückkommen meldet. */
  nichtEnthalten?: string[];
  /** Fester Aufschlag in € auf den berechneten Betrag → Ergebnis als Spanne „X – (X + aufschlag)“ (Fliesen & Boden, Jamil 27.10.2026, Talk 3434). */
  aufschlag?: number;
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
/** Detaillierte Kalkulation (Schalter): vorübergehend AUS seit 27.10.2026 auf Wunsch von Jamil (Talk 3426).
 *  Zum Wiedereinschalten auf `true` setzen – Extras, Preislogik und Rechner-Schritt sind unverändert vorhanden. */
export const KALK_DETAIL_AKTIV = false;
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
    label: name("badsanierung"),
    icon: "bath",
    frage: "Wie groß ist Ihr Bad?",
    unit: "m²",
    min: 3, max: 15, step: 1, default: 8,
    preismodell: "tabelle",
    preistabelle: BAD_AB_BRUTTO,
    tabelleSpanne: BAD_STUFE,
    schnellSpanne: BAD_SCHNELL_SPANNE,
    extras: KALK_DETAIL_AKTIV ? BAD_EXTRAS : undefined, // Schalter siehe oben
    wahlFrage: "Was ist geplant?",
    auswahlLabel: "Auswahl",
    // Kasten „Nicht im Richtpreis enthalten“ entfernt (Jamil 30.10.2026, Talk 3820)
    grund: 0, proEinheit: {}, netto: false, spanne: 0,
    // Kundenwunsch 14.10.2026 (47): nur noch „Badsanierung“ und „Barrierefreie Dusche“
    // (Komfort/Premium entfallen; Extras stattdessen in der detaillierten Kalkulation).
    tiers: [
      {
        id: "bad", label: "Badsanierung",
        hint: "Komplett neues Bad – Preis nach Badgröße",
        // Enthalten-Liste entfernt (Jamil 30.10.2026, Talk 3823)
      },
      {
        id: "barrierefrei", label: "Barrierefreie Dusche",
        festBis: BAD_BARRIEREFREI_BIS,
        hint: "Alte Dusche raus, bodengleiche Dusche rein, Fliesen neu", // Preis erst im Ergebnis (Kundenwunsch 12.10.2026)
        // Enthalten-Liste entfernt (Jamil 30.10.2026, Talk 3823/3824)
        bausteine: [
          { id: "demontage", label: "Alte Dusche raus", fach: "Demontage & Entsorgung Duschbereich", hint: "" },
          { id: "dusche", label: "Bodengleiche Dusche rein", fach: "Einbau bodengleiche Dusche inkl. Abdichtung", hint: "" },
          { id: "fliesen", label: "Fliesen neu", fach: "Fliesenarbeiten Duschbereich", hint: "" },
        ],
      },
    ],
    bausteine: [
      { id: "demontage", label: "Altes Bad raus", fach: "Demontage & Entsorgung", hint: "Abbau von Wanne, Fliesen & Co. – Entsorgung laut Angebot" },
      { id: "rohinstallation", label: "Wasser & Strom vorbereiten", fach: "Vorbereitung Sanitär- & Elektro-Rohinstallation (Anschlüsse durch Fachbetriebe)", hint: "Leitungen für Dusche, WC und Waschtisch vorbereiten" },
      { id: "abdichtung", label: "Nassbereich schützen", fach: "Verbundabdichtung Nasszone", hint: "Feuchtigkeitsschutz unter Fliesen und Dusche" },
      { id: "fliesen", label: "Fliesen legen", fach: "Fliesenarbeiten Boden & Wand", hint: "Boden und Wände werden neu gefliest" },
      // Jamil 27.10.2026 (Talk 3478 D): bleibt, aber eindeutig – Sanitärobjekte, KEINE Möbel/Einrichtung
      { id: "ausstattung", label: "Sanitärobjekte montieren", fach: "Montage Sanitärobjekte (z. B. Dusche, Wanne, WC, Waschtisch)", hint: "z. B. Dusche, Wanne, WC und Waschtisch" },
    ],
  },
  {
    slug: "sanierung-modernisierung",
    label: name("sanierung-modernisierung"),
    icon: "reno",
    auswahlLabel: "Sanierungsart", // Optionen: Renovierung, Teilsanierung, Kernsanierung (Jamil 27.10.2026, Talk 3432)
    // Kasten „Nicht im Richtpreis enthalten“ entfernt (Jamil 30.10.2026, Talk 3820)
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
      { id: "technik", label: "Leitungen & Technik koordiniert", fach: "Koordination Elektro- & Sanitärarbeiten (Fachbetriebe), Heizungsarbeiten durch unseren Partner-Klempner", hint: "Strom und Wasser durch Fachbetriebe, Heizung durch unseren Partner-Klempner – wir koordinieren alles" }, // Jamil 27.10.2026 (Talk 3478 E)
      { id: "oberflaechen", label: "Wände, Böden, Decken", fach: "Oberflächenarbeiten komplett", hint: "Putz, Farbe, Böden und Türen neu" }, // Fußbodenleisten nur bei Fliesen & Boden (Jamil 27.10.2026, Talk 3478 C)
      // „Fertig einrichten“ entfernt auf Wunsch von Jamil (27.10.2026, Talk 3433)
    ],
  },
  {
    slug: "fliesen-boden",
    label: name("fliesen-boden"),
    icon: "tiles",
    aufschlag: 600, // Spanne: bisheriger „ca.“-Preis bis ca.-Preis + 600 € (Jamil 27.10., Talk 3436, vorher 1.000 €)
    auswahlLabel: "Belag", // die Optionen sind Belagarten (Vinyl & Laminat, Fliesen, Großformat), nicht der Untergrund
    frage: "Wie groß ist die Fläche, die neu belegt werden soll?",
    unit: "m²",
    min: 5, max: 200, step: 1, default: 25, // Einerschritte (Jamil 30.10.2026, Talk 3834)
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
      { id: "rueckbau", label: "Alten Belag entfernen und entsorgen", fach: "Rückbau Altbelag & Entsorgung", hint: "Alte Fliesen, Teppich oder Laminat raus – Entsorgung laut Angebot" }, // Jamil 27.10.2026 (Talk 3430)
      { id: "untergrund", label: "Untergrund vorbereiten", fach: "Untergrundvorbereitung (Schleifen, Spachteln, Ausgleichen)", hint: "Eben und tragfähig – die Basis für lange Haltbarkeit" },
      { id: "abdichtung", label: "Nassbereich schützen", fach: "Verbundabdichtung Nassbereich", hint: "In Bad und Küche: Schutz vor Feuchtigkeit" },
      { id: "verlegung", label: "Fliesen bzw. Boden verlegen", fach: "Verlegung Fliesen/Bodenbelag", hint: "Präzise verlegt im gewünschten Muster" },
      { id: "fugen", label: "Fugen & sauberer Abschluss", fach: "Verfugung, Silikon-/Anschlussfugen", hint: "Saubere Fugen, besenrein übergeben" },
      { id: "leisten", label: "Fußbodenleisten anbringen", fach: "Montage Fuß-/Sockelleisten", hint: "Neue Leisten passend zum Boden" }, // Jamil 27.10.2026 (Talk 3431), kein eigener Preis
    ],
  },
  {
    slug: "innenausbau",
    label: name("innenausbau"),
    icon: "wall",
    ohneAuswahl: true, // keine Stufen-Auswahl mehr: direkt berechnen (Jamil 27.10.2026, Talk 3441)
    aufschlag: 800, // Spanne: Fläche × 150 € bis + 800 € (Dämmung, Tür, Elektro nach Bedarf – Jamil 27.10.2026, Talk 3478 B)
    frage: "Wie viel Fläche soll ausgebaut werden?",
    mengeHinweis: "Gemeint ist die gesamte Fläche, die wir bearbeiten – Boden, Wände und Decken zusammengerechnet, in m².",
    unit: "m²",
    min: 10, max: 200, step: 5, default: 40,
    preismodell: "flaeche",
    // Jamil 27.10.2026 (Talk 3441 + 3478 A/B): fester Satz 150 € pro m² Fläche (Boden sowie Wand-/Deckenfläche),
    // brutto inkl. MwSt., ohne Grundpauschale; Ergebnis als Spanne bis + 800 € (`aufschlag`). Die alten Werte (2.500 € + 450/650/900 €/m², ± 25 %, Stufen Basis/Ausbau/Komplett) sind in Git.
    grund: 0,
    proEinheit: { standard: 150 },
    netto: false,
    spanne: 0,
    tiers: [
      { id: "standard", label: "Innenausbau bis malerfertig", hint: "Bearbeitet, bis die Oberfläche malerfertig ist" },
    ],
    bausteine: [
      { id: "unterkonstruktion", label: "Wände planen & stellen", fach: "Ständerwerk/Unterkonstruktion", hint: "Die neue Raumaufteilung entsteht" },
      { id: "beplankung", label: "Wände schließen", fach: "Beplankung", hint: "Wände und Decken werden geschlossen" },
      { id: "schallschutz", label: "Dämmung nach Bedarf", fach: "Schall-/Wärmedämmung (nach Bedarf)", hint: "Je nach Umfang: Dämmung gegen Lärm und Kälte" },
      { id: "spachteln", label: "Glatte Flächen", fach: "Spachtelung (Q2/Q3)", hint: "Übergänge verschwinden, Flächen werden glatt" },
      { id: "nachbedarf", label: "Türen und Elektro nach Bedarf", fach: "Türen/Zargen und Elektro-Vorarbeiten (nach Bedarf; Endanschlüsse durch zugelassenen Elektromeisterbetrieb)", hint: "Je nach Umfang – genau steht es im Angebot" },
      { id: "streichfertig", label: "Malerfertig übergeben", fach: "Oberflächen-Finish bis malerfertig (Spachteln, Glätten, Schleifen)", hint: "Bereit für Farbe oder Tapete" },
    ],
  },
];

/** Leistungen mit festem Pauschalpreis – ohne Rechenschritte (Kundenwunsch 11.10.2026).
 *  Preis und Leistungsinhalt stehen NUR in der Content-Datei (pauschalpreis/umfang),
 *  hier nur die Daten für die Leistungskarte. Kartentexte (Überschrift/Unterschrift) seit
 *  16.10.2026 (73) aus LEISTUNGEN; `cta`: Beschriftung des Buchen-Buttons (Standard: „… buchen“). */
export type Pauschal = { slug: string; label: string; icon: string; cta?: string };

export const PAUSCHAL: Pauschal[] = [
  {
    slug: "sanierungscheck",
    label: name("sanierungscheck"),
    icon: "eye",
  },
  // Kundenwunsch 16.10.2026 (73): neue Leistung, pauschal 99 € brutto (Jamil 28.10.2026, Talk 3572; vorher 199 €, davor 249 €), bei Umsetzung angerechnet
  {
    slug: "sicher-wohnen", // Kundenwunsch 17.10.2026 (82): früher „Zuhause-Check 60+“
    label: name("sicher-wohnen"),
    icon: "heim",
    cta: "Sicher-wohnen-Check buchen", // Jamil 21.10.2026 (Msg 2884/2885): neuer Name
    // Audit 4.1: kein eigener Termin-Begriff (Pauschal-Check wie Sanierungscheck)
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
    const betrag = Math.round(basis);
    // Fliesen & Boden: Spanne „ca.-Preis bis ca.-Preis + 600 €“ (Jamil 27.10.2026, Talk 3434)
    if (g.aufschlag) return { art: "spanne", von: betrag, bis: betrag + g.aufschlag, ab: false };
    return { art: "betrag", betrag };
  }
  const round500 = (n: number) => Math.round(n / 500) * 500;
  return { art: "spanne", von: round500(basis * (1 - g.spanne)), bis: round500(basis * (1 + g.spanne)), ab: false };
}

/** Anzeige-Text des Ergebnisses (Ergebnisfeld, WhatsApp, E-Mail). */
export function preisText(e: Ergebnis): string {
  if (e.art === "unter") return `≈ ${eur(e.bis)} €`; // Kundenwunsch 14.10.2026 (46): „≈“ statt „unter“
  if (e.art === "betrag") return `ca. ${eur(e.betrag)} €`;
  // Kundenwunsch 19.10.2026 (Audit 4.3): ein Format für alle Preisspannen – „15.020 – 16.520 €“
  return `${eur(e.von)} – ${eur(e.bis)} €`;
}
