// „Das ist in unserer Standard-… immer enthalten“ (Jamil 22.10.2026, Talk Bauwelt Msg 3138):
// „bei den Badsanierungsleistungen ergänzen, was bei einer Standard-Badsanierung für uns immer enthalten ist.
// Jedem Kunde ist es selbst überlassen, vom Standard abzuweichen. Das gleiche auch für die Komplettsanierung.“
// ENTWURF – Grundlage: Leistungsumfang/Kacheln der Seiten, Rechner-Positionen, AGB § 3 (Demontage/Untergrund,
// laut Jamil immer als Angebotsposition) und § 13 (Elektro nur vorbereitend, Endanschlüsse Partner-Elektromeister),
// R3 (Sanitär nur über Partner-Meisterbetrieb). Erst sichtbar, wenn Jamil die Liste bestätigt hat:
// dann Punkte anpassen und `freigegeben: false` setzen.
export interface Standard {
  freigegeben: boolean;
  titel: string;
  punkte: string[];
}

export const ABWEICHEN = "Sie möchten etwas anders? Sie können jederzeit vom Standard abweichen – wir planen das mit Ihnen individuell.";

export const STANDARD: Record<string, Standard> = {
  badsanierung: {
    freigegeben: false,
    titel: "Das ist in unserer *Standard-Badsanierung* immer enthalten",
    punkte: [
      "Persönliche Beratung und Aufmaß bei Ihnen vor Ort",
      "Beratung bei der Auswahl von Fliesen, Armaturen und Möbeln", // Jamil 22.10., Msg 3152
      "Transparentes Angebot und abgestimmter Zeitplan",
      "Schutz- und Abdeckarbeiten (Staubschutz, abgedeckte Wege)",
      "Demontage des alten Bads und Entsorgung des Bauschutts (laut Angebot)",
      "Vorbereitung des Untergrunds und Abdichtung",
      "Trockenbau, z. B. Vorwand für WC und Waschtisch",
      "Vorbereitende Elektroarbeiten (Kabel ziehen, Dosen setzen) – Endanschlüsse durch einen zugelassenen Elektromeisterbetrieb",
      "Sanitär-Anschlüsse durch einen zugelassenen Fachbetrieb",
      "Fliesen an Wand und Boden",
      "Montage von Dusche bzw. Wanne, WC, Waschtisch und Badmöbeln",
      "Maler- und Abschlussarbeiten",
      "Ein fester Ansprechpartner, der alle Gewerke koordiniert",
      "Gemeinsame Abnahme und besenreine Übergabe",
    ],
  },
  "sanierung-modernisierung": {
    freigegeben: false,
    titel: "Das ist in unserer *Standard-Komplettsanierung* immer enthalten",
    punkte: [
      "Persönliche Beratung und Bestandsaufnahme bei Ihnen vor Ort",
      "Beratung bei der Auswahl von Fliesen, Armaturen und Möbeln", // Jamil 22.10., Msg 3152
      "Plan mit transparentem Angebot und abgestimmtem Zeitplan",
      "Schutz- und Abdeckarbeiten (Staubschutz, abgedeckte Wege)",
      "Rückbau und Entkernung, Entsorgung laut Angebot",
      "Vorbereitung der Untergründe",
      "Trockenbau und Grundrissänderungen nach gemeinsamem Plan",
      "Vorbereitende Elektroarbeiten (Kabel ziehen, Dosen setzen) – Endanschlüsse durch einen zugelassenen Elektromeisterbetrieb",
      "Sanitär-Anschlüsse durch einen zugelassenen Fachbetrieb",
      "Fliesen und Böden",
      "Maler- und Abschlussarbeiten",
      "Ein fester Ansprechpartner, der alle Gewerke koordiniert",
      "Gemeinsame Abnahme und besenreine Übergabe",
    ],
  },
};
