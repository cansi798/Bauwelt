// Die drei handgezeichneten Erklär-Szenen (rough.js, beim Build gerendert) –
// ersetzen seit 29.09.2026 die Erklärvideos. Jede Szene gibt es hochkant fürs
// Handy und quer für den Desktop; Motive und Reihenfolge sind in beiden gleich.
import { Zeichner, F, type Szene } from "../lib/rough-szene";
import { STEPS } from "./home";
import { VERSPRECHEN } from "./versprechen";

export type Ansicht = "mobil" | "desktop";
export type SzenenName = "weg" | "partnerWeg" | "portal" | "siegel" | "siegelUeber" | "uspRegional" | "uspHand" | "uspFestpreis";

/* ─────────────── Motive (Mittelpunkt cx/cy, Maßstab s ≈ 1 → ~70 px) ─────────────── */

function rechner(z: Zeichner, cx: number, cy: number, s = 1) {
  z.rundRechteck(cx - 26 * s, cy - 34 * s, 52 * s, 68 * s, 7 * s);
  z.rechteck(cx - 18 * s, cy - 25 * s, 36 * s, 17 * s, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 1.8 });
  z.text(cx + 11 * s, cy - 11 * s, "€", { groesse: 13 * s, anker: "end" });
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++)
      z.kreis(cx + (c - 1) * 14 * s, cy + (6 + r * 14) * s, 8 * s, { strokeWidth: 1.6, roughness: 0.6 }, 0.25);
}

function sprechblasen(z: Zeichner, cx: number, cy: number, s = 1) {
  z.rundRechteck(cx - 38 * s, cy - 30 * s, 50 * s, 34 * s, 9 * s);
  z.linie(cx - 26 * s, cy + 4 * s, cx - 32 * s, cy + 14 * s, {}, 0.2);
  for (let i = 0; i < 3; i++) z.kreis(cx + (-25 + i * 12) * s, cy - 13 * s, 4 * s, { fill: F.strich, fillStyle: "solid", strokeWidth: 1 }, 0.2);
  z.rundRechteck(cx - 8 * s, cy - 2 * s, 46 * s, 30 * s, 9 * s, { fill: F.gold, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.4 });
  z.linie(cx + 26 * s, cy + 28 * s, cx + 32 * s, cy + 38 * s, {}, 0.2);
}

function dokument(z: Zeichner, cx: number, cy: number, s = 1, haken = true) {
  const x = cx - 24 * s, y = cy - 34 * s;
  z.pfad(`M${x} ${y}H${x + 34 * s}L${x + 48 * s} ${y + 14 * s}V${y + 68 * s}H${x}Z`);
  z.linie(x + 34 * s, y, x + 34 * s, y + 14 * s, { strokeWidth: 1.8 }, 0.2);
  z.linie(x + 34 * s, y + 14 * s, x + 48 * s, y + 14 * s, { strokeWidth: 1.8 }, 0.2);
  for (let i = 0; i < 3; i++) z.linie(x + 9 * s, y + (26 + i * 11) * s, x + 38 * s, y + (26 + i * 11) * s, { stroke: F.grau, strokeWidth: 1.8 }, 0.25);
  if (haken) {
    z.kreis(cx + 20 * s, cy + 24 * s, 28 * s, { fill: F.gold, fillStyle: "solid" });
    z.pfad(`M${cx + 13 * s} ${cy + 24 * s}l${5 * s} ${5 * s}l${9 * s} -${10 * s}`, { strokeWidth: 2.6, roughness: 0.5 }, 0.3);
  }
}

// Kundenwunsch 15.10.2026 (56): 4. Station „Zurücklehnen & genießen“ – Sessel mit dampfender Tasse
// statt Badewanne (gilt für alle Leistungen, nicht nur Bad).
function entspannen(z: Zeichner, cx: number, cy: number, s = 1) {
  const x = cx - 8 * s; // Sessel etwas links, Tasse rechts daneben
  // Rückenlehne (goldene Schraffur) und Sitzpolster
  z.rundRechteck(x - 28 * s, cy - 32 * s, 56 * s, 38 * s, 12 * s, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.4 });
  z.rundRechteck(x - 32 * s, cy + 2 * s, 64 * s, 16 * s, 6 * s);
  // Armlehnen
  z.rundRechteck(x - 44 * s, cy - 12 * s, 14 * s, 32 * s, 6 * s, { strokeWidth: 2.2 }, 0.35);
  z.rundRechteck(x + 30 * s, cy - 12 * s, 14 * s, 32 * s, 6 * s, { strokeWidth: 2.2 }, 0.35);
  // Füße
  z.linie(x - 34 * s, cy + 20 * s, x - 37 * s, cy + 30 * s, {}, 0.2);
  z.linie(x + 34 * s, cy + 20 * s, x + 37 * s, cy + 30 * s, {}, 0.2);
  // Tasse auf einem kleinen Beistelltisch
  const tx = cx + 50 * s, ty = cy + 6 * s;
  z.linie(tx - 12 * s, ty + 10 * s, tx + 12 * s, ty + 10 * s, { strokeWidth: 2.4 }, 0.2);
  z.linie(tx, ty + 10 * s, tx, ty + 24 * s, { strokeWidth: 2 }, 0.2);
  z.pfad(`M${tx - 8 * s} ${ty - 6 * s}H${tx + 8 * s}V${ty + 4 * s}Q${tx + 8 * s} ${ty + 9 * s} ${tx + 3 * s} ${ty + 9 * s}H${tx - 3 * s}Q${tx - 8 * s} ${ty + 9 * s} ${tx - 8 * s} ${ty + 4 * s}Z`,
    { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.35);
  z.pfad(`M${tx + 8 * s} ${ty - 3 * s}Q${tx + 14 * s} ${ty - 2 * s} ${tx + 8 * s} ${ty + 5 * s}`, { strokeWidth: 1.6 }, 0.2);
  // Dampf – pulsiert danach leise weiter
  z.gruppe("puls", () => {
    z.pfad(`M${tx - 3 * s} ${ty - 10 * s}Q${tx - 7 * s} ${ty - 16 * s} ${tx - 3 * s} ${ty - 21 * s}Q${tx + 1 * s} ${ty - 26 * s} ${tx - 3 * s} ${ty - 31 * s}`,
      { stroke: F.gold, strokeWidth: 2, roughness: 0.6 }, 0.3);
    z.pfad(`M${tx + 4 * s} ${ty - 10 * s}Q${tx} ${ty - 16 * s} ${tx + 4 * s} ${ty - 21 * s}Q${tx + 8 * s} ${ty - 26 * s} ${tx + 4 * s} ${ty - 31 * s}`,
      { stroke: F.gold, strokeWidth: 2, roughness: 0.6 }, 0.3);
  });
}

function kalender(z: Zeichner, cx: number, cy: number, s = 1) {
  z.rundRechteck(cx - 24 * s, cy - 20 * s, 48 * s, 44 * s, 6 * s);
  z.rechteck(cx - 24 * s, cy - 20 * s, 48 * s, 11 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.6 });
  z.linie(cx - 12 * s, cy - 26 * s, cx - 12 * s, cy - 15 * s, {}, 0.2);
  z.linie(cx + 12 * s, cy - 26 * s, cx + 12 * s, cy - 15 * s, {}, 0.2);
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++)
      z.rechteck(cx + (-16 + c * 12) * s, cy + (-2 + r * 11) * s, 7 * s, 6 * s,
        r === 1 && c === 2 ? { fill: F.goldDunkel, fillStyle: "solid", strokeWidth: 1.2 } : { stroke: F.grau, strokeWidth: 1.2 }, 0.15);
}

function chat(z: Zeichner, cx: number, cy: number, s = 1) {
  z.rundRechteck(cx - 26 * s, cy - 20 * s, 52 * s, 34 * s, 10 * s);
  z.linie(cx - 14 * s, cy + 14 * s, cx - 20 * s, cy + 26 * s, {}, 0.2);
  z.linie(cx - 20 * s, cy + 26 * s, cx - 4 * s, cy + 14 * s, {}, 0.2);
  // „Tippt gerade …" – die drei Punkte pulsieren nach dem Zeichnen weiter
  z.gruppe("puls", () => {
    for (let i = 0; i < 3; i++) z.kreis(cx + (i - 1) * 12 * s, cy - 3 * s, 6 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1 }, 0.15);
  });
}

function pfeilKreis(z: Zeichner, cx: number, cy: number, s = 1) {
  z.kreis(cx, cy, 48 * s);
  z.linie(cx - 13 * s, cy, cx + 12 * s, cy, { strokeWidth: 2.8 }, 0.3);
  z.pfad(`M${cx + 3 * s} ${cy - 9 * s}L${cx + 13 * s} ${cy}L${cx + 3 * s} ${cy + 9 * s}`, { strokeWidth: 2.8 }, 0.3);
}

function handy(z: Zeichner, x: number, y: number, b: number, h: number) {
  z.rundRechteck(x, y, b, h, 16, { strokeWidth: 2.8 }, 0.9);
  z.linie(x + b / 2 - 16, y + 13, x + b / 2 + 16, y + 13, { strokeWidth: 2.4 }, 0.2);
  const ix = x + 16, ib = b - 32;
  z.bei(z.jetzt + 0.6);
  z.text(x + b / 2, y + 40, "Mein Projekt", { groesse: 12 });
  z.rechteck(ix, y + 50, ib, 10, { strokeWidth: 1.6 }, 0.3);
  z.rechteck(ix, y + 50, ib * 0.65, 10, { fill: F.gold, fillStyle: "solid", stroke: F.gold, strokeWidth: 1 }, 0.4);
  const zeilen = [true, true, false, false];
  zeilen.forEach((fertig, i) => {
    const zy = y + 82 + i * 26;
    z.kreis(ix + 6, zy, 12, fertig ? { fill: F.gold, fillStyle: "solid", strokeWidth: 1.4 } : { strokeWidth: 1.4 }, 0.2);
    z.linie(ix + 18, zy, ix + ib, zy, { stroke: F.grau, strokeWidth: 2 }, 0.3);
  });
  z.rundRechteck(ix, y + h - 44, ib, 26, 8, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 1.6 }, 0.4);
  z.text(x + b / 2, y + h - 27, "Freigeben", { groesse: 11 });
}

const SIEGEL_MOTIV: Record<string, (z: Zeichner, cx: number, cy: number, s: number) => void> = {
  festpreis: (z, cx, cy, s) => z.text(cx, cy + 11 * s, "€", { groesse: 32 * s, farbe: F.goldDunkel }),
  termin: (z, cx, cy, s) => {
    // Kalenderblatt mit Haken = verbindlicher Termin
    z.rundRechteck(cx - 15 * s, cy - 13 * s, 30 * s, 28 * s, 4 * s, { strokeWidth: 2.2 }, 0.4);
    z.linie(cx - 15 * s, cy - 5 * s, cx + 15 * s, cy - 5 * s, { strokeWidth: 2 }, 0.2);
    z.pfad(`M${cx - 6 * s} ${cy + 5 * s}l${4 * s} ${4 * s}l${8 * s} -${8 * s}`, { stroke: F.goldDunkel, strokeWidth: 2.4, roughness: 0.4 }, 0.2);
  },
  ansprechpartner: (z, cx, cy, s) => {
    z.kreis(cx, cy - 7 * s, 15 * s, { strokeWidth: 2.2 }, 0.3);
    z.pfad(`M${cx - 14 * s} ${cy + 18 * s}Q${cx - 14 * s} ${cy + 3 * s} ${cx} ${cy + 3 * s}Q${cx + 14 * s} ${cy + 3 * s} ${cx + 14 * s} ${cy + 18 * s}`,
      { stroke: F.goldDunkel, strokeWidth: 2.4 }, 0.3);
  },
  antwort: (z, cx, cy, s) => z.text(cx, cy + 7 * s, "12h", { groesse: 19 * s, farbe: F.goldDunkel }),
  angebot: (z, cx, cy, s) => z.text(cx, cy + 7 * s, "24h", { groesse: 19 * s, farbe: F.goldDunkel }),
  transparenz: (z, cx, cy, s) => {
    z.pfad(`M${cx - 17 * s} ${cy}Q${cx} ${cy - 16 * s} ${cx + 17 * s} ${cy}Q${cx} ${cy + 16 * s} ${cx - 17 * s} ${cy}Z`, { strokeWidth: 2.2 }, 0.4);
    z.kreis(cx, cy, 11 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
  },
  // Drei Fakten nur für „Über uns“ (Kundenwunsch 11.10.2026 (9))
  erfahrung: (z, cx, cy, s) => z.text(cx, cy + 7 * s, "15+", { groesse: 20 * s, farbe: F.goldDunkel }),
  deutsch: (z, cx, cy, s) => {
    // Sprechblase mit „DE“ = deutschsprachiger Ansprechpartner
    z.rundRechteck(cx - 17 * s, cy - 14 * s, 34 * s, 24 * s, 6 * s, { strokeWidth: 2.2 }, 0.4);
    z.linie(cx - 8 * s, cy + 10 * s, cx - 12 * s, cy + 18 * s, { strokeWidth: 2.2 }, 0.2);
    z.text(cx, cy + 3 * s, "DE", { groesse: 13 * s, farbe: F.goldDunkel });
  },
  regional: (z, cx, cy, s) => {
    // Kartennadel = regional vor Ort
    z.pfad(`M${cx} ${cy + 18 * s}C${cx - 6 * s} ${cy + 8 * s} ${cx - 14 * s} ${cy} ${cx - 14 * s} ${cy - 6 * s}A${14 * s} ${14 * s} 0 1 1 ${cx + 14 * s} ${cy - 6 * s}C${cx + 14 * s} ${cy} ${cx + 6 * s} ${cy + 8 * s} ${cx} ${cy + 18 * s}Z`,
      { strokeWidth: 2.2 }, 0.4);
    z.kreis(cx, cy - 6 * s, 10 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.6 }, 0.3);
  },
  gewerke: (z, cx, cy, s) => {
    // Hammer + Kelle gekreuzt = alle Gewerke
    z.linie(cx - 12 * s, cy + 14 * s, cx + 8 * s, cy - 8 * s, { strokeWidth: 2.8 }, 0.3);
    z.rechteck(cx + 2 * s, cy - 17 * s, 16 * s, 8 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
    z.linie(cx + 12 * s, cy + 14 * s, cx - 4 * s, cy - 2 * s, { stroke: F.goldDunkel, strokeWidth: 2.6 }, 0.3);
    z.pfad(`M${cx - 4 * s} ${cy - 2 * s}L${cx - 16 * s} ${cy - 6 * s}L${cx - 8 * s} ${cy - 14 * s}Z`, { strokeWidth: 2 }, 0.3);
  },
};

/** Siegel-Titel umbrochen (schmale Handy-Spalten), 2–3 Zeilen. */
const SIEGEL_ZEILEN: Record<string, string[]> = {
  erfahrung: ["15+ Jahre", "Erfahrung"],
  deutsch: ["Deutsch-", "sprachiger An-", "sprechpartner"], // Kundenwunsch 15.10.2026 (55)
  regional: ["Regional", "vor Ort"],
  festpreis: ["Festpreis-", "Zusage"], // Audit 4.2 (19.10.2026): „Zusage“ statt „Garantie“
  termin: ["Termin-", "treue"],
  ansprechpartner: ["Deutsch-", "sprachiger An-", "sprechpartner"], // Kundenwunsch 14.10.2026 (50) / 15.10. (55)
  antwort: ["Antwort in", "12 Stunden"],
  angebot: ["Angebot in", "24 Stunden"],
  transparenz: ["Volle", "Transparenz"],
  gewerke: ["Alle Gewerke", "aus einer Hand"],
};

/* ─────────────── Szenen ─────────────── */

const WEG_MOTIVE = [rechner, sprechblasen, dokument, entspannen];
// Unterzeilen je Station (mehrzeilig möglich – Schritt 4 laut Kundenfeedback 30.09.2026)
const WEG_UNTER: string[][] = [
  ["Preis in wenigen Minuten"],
  ["Kostenloser Vor-Ort-Termin"], // Audit 4.1 (früher „Persönlicher Termin“)
  ["Angebot in 24 Stunden"],
  ["Wir koordinieren alles", "und setzen es für Sie um"],
];

type Motiv = (z: Zeichner, cx: number, cy: number, s?: number) => void;
function weg(a: Ansicht): Szene {
  return wegSzene(a, STEPS.map((st) => [st.title]), WEG_UNTER, WEG_MOTIVE);
}

/** Vier Stationen mit Wegen dazwischen (Startseite/Leistungen; Partner mit eigenen Texten/Motiven). */
function wegSzene(a: Ansicht, titel: string[][], unter: string[][], motive: Motiv[]): Szene {
  const z = new Zeichner();
  const mobil = a === "mobil";
  const zeilenMax = Math.max(...titel.map((t, i) => t.length + unter[i].length));
  const B = mobil ? 360 : 1000, H = mobil ? 540 + Math.max(0, zeilenMax - 3) * 17 : 300 + Math.max(0, zeilenMax - 3) * 21;
  // Stationen: mobil im Zickzack untereinander, Desktop nebeneinander
  const pos: [number, number][] = mobil
    ? [[80, 76], [280, 206], [80, 336], [280, 466]]
    : [[125, 96], [375, 96], [625, 96], [875, 96]];

  pos.forEach(([cx, cy], i) => {
    const t = 0.2 + i * 1.15;
    z.bei(t);
    motive[i](z, cx, cy, 1);
    // Nummer-Badge
    z.bei(t + 0.3);
    const bx = cx - 52, by = cy - 46;
    z.kreis(bx, by, 28, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
    z.text(bx, by + 5, String(i + 1), { groesse: 14 });
    // Beschriftung
    z.bei(t + 0.6);
    if (mobil) {
      const links = i % 2 === 0;
      const tx = links ? 150 : 210;
      const anker = links ? "start" : "end";
      titel[i].forEach((tz, k) => z.text(tx, cy - 2 + k * 18, tz, { groesse: 15.5, anker }));
      const o = (titel[i].length - 1) * 18;
      unter[i].forEach((zeile, k) =>
        z.text(tx, cy + 18 + o + k * 17, zeile, { groesse: 13, gewicht: 400, farbe: F.text2, anker })
      );
    } else {
      titel[i].forEach((tz, k) => z.text(cx, 206 + k * 22, tz, { groesse: 18 }));
      const o = (titel[i].length - 1) * 22;
      unter[i].forEach((zeile, k) =>
        z.text(cx, 232 + o + k * 20, zeile, { groesse: 14.5, gewicht: 400, farbe: F.text2 })
      );
    }
    // Weg zur nächsten Station
    if (i < 3) {
      z.bei(t + 0.85);
      const [nx, ny] = pos[i + 1];
      const pkt: [number, number][] = mobil
        ? i % 2 === 0
          ? [[cx + 30, cy + 44], [cx + 90, cy + 70], [nx - 60, ny - 76], [nx - 4, ny - 52]]
          : [[cx - 30, cy + 44], [cx - 90, cy + 70], [nx + 60, ny - 76], [nx + 4, ny - 52]]
        : [[cx + 62, cy + 4], [cx + 110, cy - 16], [nx - 100, ny + 18], [nx - 62, ny]];
      // Kundenwunsch 19.10.2026: goldene Verbindungslinie bleibt nach dem Zeichnen in Bewegung
      z.gruppe("fluss", () => z.kurve(pkt, { stroke: F.gold, strokeWidth: 2.6, roughness: 1.4 }, 0.6));
    }
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + 3 * 1.15 + 1.2 };
}

/* ─── Partner-Ablauf (Kundenwunsch 15.10.2026 (62)): „Einfach. Direkt. Verbindlich.“ als Zeichnung ─── */
function papierflieger(z: Zeichner, cx: number, cy: number, s = 1) {
  z.pfad(`M${cx - 34 * s} ${cy + 2 * s}L${cx + 36 * s} ${cy - 30 * s}L${cx + 10 * s} ${cy + 32 * s}L${cx - 2 * s} ${cy + 12 * s}Z`,
    { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.3, strokeWidth: 2.4 });
  z.linie(cx + 36 * s, cy - 30 * s, cx - 2 * s, cy + 12 * s, { strokeWidth: 2 }, 0.3);
  z.linie(cx - 2 * s, cy + 12 * s, cx - 6 * s, cy + 28 * s, { strokeWidth: 2 }, 0.2);
  z.gruppe("puls", () => {
    z.linie(cx - 56 * s, cy + 14 * s, cx - 40 * s, cy + 12 * s, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.5 }, 0.2);
    z.linie(cx - 52 * s, cy + 26 * s, cx - 34 * s, cy + 22 * s, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.5 }, 0.2);
  });
}
function wiederkehrend(z: Zeichner, cx: number, cy: number, s = 1) {
  kalender(z, cx - 8 * s, cy, s);
  // Wiederholungs-Pfeil rechts unten
  const px = cx + 26 * s, py = cy + 22 * s, r = 15 * s;
  z.gruppe("stempel", () => {
    z.kreis(px, py, 2 * r + 10 * s, { fill: "var(--weiss)", fillStyle: "solid", stroke: F.gold, strokeWidth: 2 }, 0.3);
    z.pfad(`M${px + r} ${py}A${r} ${r} 0 1 1 ${px} ${py - r}`, { stroke: F.goldDunkel, strokeWidth: 2.4, roughness: 0.6 }, 0.3);
    z.pfad(`M${px - 6 * s} ${py - r - 5 * s}L${px} ${py - r}L${px - 5 * s} ${py - r + 6 * s}`, { stroke: F.goldDunkel, strokeWidth: 2.4, roughness: 0.4 }, 0.2);
  });
}
const PARTNER_TITEL: string[][] = [["Anfrage senden"], ["Abstimmung"], ["Umsetzung"], ["Langfristige", "Zusammenarbeit"]];
const PARTNER_UNTER: string[][] = [
  ["Beschreiben Sie kurz", "Ihr Anliegen."],
  ["Wir besprechen Umfang,", "Anforderungen und Abläufe."],
  ["Festpreis, feste, deutsch-", "sprachige Ansprechpartner", "und saubere Dokumentation."],
  ["Klare Prozesse für", "wiederkehrende Projekte."],
];
const partnerWeg = (a: Ansicht) => wegSzene(a, PARTNER_TITEL, PARTNER_UNTER, [papierflieger, sprechblasen, dokument, wiederkehrend]);

const PORTAL_TEILE = [
  // Texte wörtlich nach Kundenwunsch 14.10.2026 (31); erste Zeile fett, folgende normal
  { motiv: (z: Zeichner, x: number, y: number) => dokument(z, x, y, 0.72, false), zeilen: ["Alle Dokumente", "An einem Ort."] },
  { motiv: kalender, zeilen: ["Alle Termine", "Im Blick."] },
  { motiv: chat, zeilen: ["Kommunikation", "Per WhatsApp oder E-Mail."] },
  { motiv: pfeilKreis, zeilen: ["Projektstatus", "Jederzeit nachvollziehbar."] },
];

function portal(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === "mobil";
  const B = mobil ? 360 : 1000, H = mobil ? 536 : 316;
  const ph = { x: mobil ? 115 : 435, y: 12, b: 130, h: 236 };
  z.bei(0.1);
  handy(z, ph.x, ph.y, ph.b, ph.h);

  // Vier Kacheln: mobil 2×2 unter dem Handy, Desktop links/rechts daneben
  const pos: [number, number][] = mobil
    ? [[90, 316], [270, 316], [90, 436], [270, 436]]
    : [[170, 88], [170, 216], [830, 88], [830, 216]];
  pos.forEach(([cx, cy], i) => {
    const t = 2.0 + i * 0.75;
    if (!mobil) {
      // Verbindungslinie vom Handy zur Kachel
      z.bei(t - 0.3);
      const links = cx < 500;
      const sx = links ? ph.x - 8 : ph.x + ph.b + 8;
      const sy = ph.y + 70 + (i % 2) * 110;
      const ex = links ? cx + 110 : cx - 110;
      z.kurve([[sx, sy], [(sx + ex) / 2, sy + (i % 2 ? 14 : -14)], [ex, cy - 6]], { stroke: F.gold, strokeWidth: 2.2, roughness: 1.3 }, 0.5);
    }
    z.bei(t);
    z.gruppe("stempel", () => PORTAL_TEILE[i].motiv(z, cx, mobil ? cy - 22 : cy - 14, 1));
    z.bei(t + 0.35);
    const ty = mobil ? cy + 32 : cy + 42;
    const [kopf, ...rest] = PORTAL_TEILE[i].zeilen;
    z.text(cx, ty, kopf, { groesse: mobil ? 13.5 : 16 });
    rest.forEach((zeile, k) =>
      z.text(cx, ty + (mobil ? 18 : 21) * (k + 1), zeile, { groesse: mobil ? 12.5 : 14, gewicht: 400, farbe: F.text2 })
    );
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 2.0 + 3 * 0.75 + 1 };
}

/** Siegel-Reihe: `ids` = Motive (SIEGEL_MOTIV) in Reihenfolge, Reihen-Aufteilung je Ansicht. */
function siegelSzene(
  a: Ansicht,
  ids: string[],
  reihenMobil: number[],
  reihenDesktop: number[],
  /** Abweichende Beschriftung je Siegel-ID und Ansicht (z. B. Über uns). */
  eigeneZeilen: Record<string, { mobil: string[]; desktop: string[] }> = {},
  /** Rahmenform, Abstand zwischen zwei Siegeln (s) und Zusatz-Standzeit (ms). */
  stil: { form?: "kreis" | "rechteck"; schritt?: number; halten?: number } = {}
): Szene {
  const schritt = stil.schritt ?? 0.55;
  const z = new Zeichner();
  const mobil = a === "mobil";
  const n = ids.length;
  const reihen = mobil ? reihenMobil : reihenDesktop;
  const dreizeilig = ids.some((id) => (SIEGEL_ZEILEN[id]?.length ?? 2) > 2);
  const B = mobil ? 360 : 1000;
  const rh = mobil ? (dreizeilig ? 165 : 150) : 225; // Reihenhöhe
  const H = mobil ? reihen.length * rh + 10 : reihen.length === 1 ? 230 : reihen.length * rh;
  const d = mobil ? 78 : 100; // Ring-Durchmesser
  const s = mobil ? 0.9 : 1.15; // Motiv-Maßstab
  const pos: [number, number][] = [];
  reihen.forEach((anz, r) => {
    const sp = mobil ? 120 : B / Math.max(...reihen);
    const start = (B - sp * anz) / 2 + sp / 2;
    for (let k = 0; k < anz; k++) pos.push([start + k * sp, mobil ? 56 + r * rh : 70 + r * rh]);
  });
  ids.forEach((id, i) => {
    const [cx, cy] = pos[i];
    const t = 0.2 + i * schritt;
    z.bei(t);
    z.gruppe("stempel", () => {
      if (stil.form === "rechteck") {
        z.rundRechteck(cx - d / 2, cy - d / 2, d, d, 16, { strokeWidth: 2.6 }, 0.45);
        z.rundRechteck(cx - (d - 14) / 2, cy - (d - 14) / 2, d - 14, d - 14, 11, { stroke: F.gold, strokeWidth: 2, roughness: 1.4 }, 0.45);
      } else {
        z.kreis(cx, cy, d, { strokeWidth: 2.6 }, 0.5);
        // Kundenwunsch 19.10.2026: goldener Innenring dreht sich nach dem Zeichnen ständig
        z.gruppe("dreh", () => z.kreis(cx, cy, d - 14, { stroke: F.gold, strokeWidth: 2, roughness: 1.4 }, 0.5));
      }
      z.bei(t + 0.3);
      SIEGEL_MOTIV[id]?.(z, cx, cy, s);
    });
    z.bei(t + Math.min(0.45, schritt));
    // Desktop hat breitere Spalten – dort ohne Trennstrich
    const zeilen =
      eigeneZeilen[id] ? eigeneZeilen[id][a]
      : !mobil && id === "ansprechpartner" ? ["Deutsch-", "sprachiger", "Ansprechpartner"]
      : !mobil && id === "deutsch" ? ["Deutsch-", "sprachiger", "Ansprechpartner"]
      : SIEGEL_ZEILEN[id] ?? [VERSPRECHEN.find((v) => v.id === id)?.title ?? id];
    const ty = cy + d / 2 + (mobil ? 22 : 28);
    zeilen.forEach((zl, k) => z.text(cx, ty + k * (mobil ? 17 : 20), zl, { groesse: mobil ? 13 : 15, gewicht: 600 }));
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + (n - 1) * schritt + 1, halten: stil.halten };
}

const SIEGEL_IDS = VERSPRECHEN.map((v) => v.id);
// Startseite: 7 Siegel (mobil 2-3-2, Desktop eine Reihe)
const siegel = (a: Ansicht) => siegelSzene(a, SIEGEL_IDS, [2, 3, 2], [SIEGEL_IDS.length]);
// Über uns (Kundenwunsch 11.10.2026 (9)): 3 Fakten + 7 Siegel = 10 (mobil 2-3-2-3, Desktop 5-5)
// Kundenwunsch 14.10.2026 (37): Beschriftung wörtlich nach „Zahlen & Fakten“ (nur Über uns)
const ZEILEN_UEBER: Record<string, { mobil: string[]; desktop: string[] }> = {
  deutsch: { mobil: ["Deutsch-", "sprachiger An-", "sprechpartner"], desktop: ["Deutsch-", "sprachiger", "Ansprechpartner"] },
  regional: { mobil: ["Regional in", "Hamburg &", "Umgebung"], desktop: ["Regional in", "Hamburg & Umgebung"] },
  antwort: { mobil: ["Antwort", "innerhalb von", "12 Stunden"], desktop: ["Antwort innerhalb", "von 12 Stunden"] },
  angebot: { mobil: ["Angebot", "innerhalb von", "24 Stunden"], desktop: ["Angebot innerhalb", "von 24 Stunden"] },
};
// Kundenwunsch 15.10.2026 (60): Siegel „DE“ (deutsch) entfernt – doppelt mit „Deutschsprachiger Ansprechpartner“
// → 9 Siegel (mobil 3-3-3, Desktop 5-4)
const siegelUeber = (a: Ansicht) =>
  siegelSzene(a, ["erfahrung", "regional", ...SIEGEL_IDS], [3, 3, 3], [5, 4], ZEILEN_UEBER,
    // Kundenwunsch 15.10.2026 (65): Rechtecke statt Kreise, schneller, 1 s länger stehen
    { form: "rechteck", schritt: 0.32, halten: 1000 });

/* ─── USP-Bilder als Zeichnungen (Kundenwunsch 15.10.2026 (61), Über uns „Handwerk ohne Überraschungen“) ─── */
const USP_B = 300, USP_H = 180;
function uspRahmen(fn: (z: Zeichner, cx: number, cy: number) => void): Szene {
  const z = new Zeichner();
  z.bei(0.2);
  fn(z, USP_B / 2, USP_H / 2 + 6);
  return { breite: USP_B, hoehe: USP_H, elemente: z.elemente, ende: 3.2 };
}
// Regional & persönlich: Haus mit Standort-Pin darüber, Wege-Linie zum Haus
const uspRegional = () => uspRahmen((z, cx, cy) => {
  z.linie(cx - 120, cy + 52, cx + 120, cy + 52, { stroke: F.hell, strokeWidth: 2 }, 0.4);
  z.pfad(`M${cx - 110} ${cy + 52}Q${cx - 70} ${cy + 20} ${cx - 40} ${cy + 40}`, { stroke: F.gold, strokeWidth: 2.4, strokeLineDash: [6, 7] } as never, 0.6);
  z.bei(0.8);
  z.pfad(`M${cx - 38} ${cy + 52}V${cy + 2}L${cx} ${cy - 30}L${cx + 38} ${cy + 2}V${cy + 52}Z`, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 6, fillWeight: 1.3 });
  z.rechteck(cx - 10, cy + 22, 20, 30, { strokeWidth: 2.2 }, 0.3);
  z.rechteck(cx + 14, cy + 8, 14, 12, { stroke: F.grau, strokeWidth: 1.8 }, 0.25);
  z.bei(1.6);
  z.gruppe("stempel", () => {
    z.pfad(`M${cx + 62} ${cy - 6}C${cx + 44} ${cy - 30} ${cx + 44} ${cy - 62} ${cx + 62} ${cy - 66}C${cx + 80} ${cy - 62} ${cx + 80} ${cy - 30} ${cx + 62} ${cy - 6}Z`,
      { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2 }, 0.4);
    z.kreis(cx + 62, cy - 46, 13, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 1.8 }, 0.2);
  });
});
// Alles aus einer Hand: offene Hand von vorn (Handfläche, vier Finger, Daumen), daneben Hammer & Pinsel
const uspHand = () => uspRahmen((z, cx, cy) => {
  const hx = cx - 4, hy = cy + 14;
  // Finger (von links nach rechts unterschiedlich lang) und Handfläche
  [[-27, 40], [-12, 50], [3, 47], [18, 38]].forEach(([dx, h], i) =>
    z.rundRechteck(hx + dx, hy - 8 - h, 13, h + 14, 6.5, { strokeWidth: 2.4 }, 0.25 + i * 0.03));
  z.rundRechteck(hx - 30, hy - 10, 62, 52, 18, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.3, strokeWidth: 2.6 }, 0.6);
  // Daumen schräg nach links
  z.pfad(`M${hx - 30} ${hy + 22}L${hx - 50} ${hy + 2}Q${hx - 58} ${hy - 8} ${hx - 48} ${hy - 13}Q${hx - 42} ${hy - 15} ${hx - 36} ${hy - 8}L${hx - 28} ${hy + 2}`,
    { strokeWidth: 2.4 }, 0.4);
  // Handgelenk
  z.linie(hx - 20, hy + 42, hx - 20, hy + 58, { strokeWidth: 2.4 }, 0.2);
  z.linie(hx + 22, hy + 42, hx + 22, hy + 58, { strokeWidth: 2.4 }, 0.2);
  z.bei(1.3);
  // Werkzeuge links und rechts der Hand
  z.gruppe("stempel", () => {
    // Hammer links
    z.linie(cx - 92, cy + 30, cx - 70, cy - 18, { strokeWidth: 3 }, 0.3);
    z.rechteck(cx - 82, cy - 30, 26, 12, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
    // Pinsel rechts
    z.linie(cx + 88, cy + 30, cx + 72, cy - 6, { stroke: F.goldDunkel, strokeWidth: 3 }, 0.3);
    z.rechteck(cx + 62, cy - 30, 18, 24, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
  });
  z.gruppe("puls", () => {
    z.linie(cx + 40, cy - 60, cx + 40, cy - 44, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.4 }, 0.2);
    z.linie(cx + 32, cy - 52, cx + 48, cy - 52, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.4 }, 0.2);
  });
});
// Zum Festpreis fertig: Preisschild mit € und goldenem Haken
const uspFestpreis = () => uspRahmen((z, cx, cy) => {
  const x = cx - 70, y = cy - 40;
  z.pfad(`M${x} ${y + 40}L${x + 34} ${y}H${x + 130}V${y + 80}H${x + 34}Z`, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 6, fillWeight: 1.3, strokeWidth: 2.6 }, 0.8);
  z.kreis(x + 30, y + 40, 12, { strokeWidth: 2 }, 0.2);
  z.pfad(`M${x + 18} ${y + 40}Q${x - 10} ${y + 30} ${x - 18} ${y + 8}`, { stroke: F.grau, strokeWidth: 1.8 }, 0.3);
  z.bei(1.0);
  z.text(x + 86, y + 54, "€", { groesse: 40, farbe: F.goldDunkel, gewicht: 700 });
  z.bei(1.6);
  z.gruppe("stempel", () => {
    z.kreis(cx + 76, cy + 34, 40, { fill: F.gold, fillStyle: "solid", strokeWidth: 2 }, 0.3);
    z.pfad(`M${cx + 66} ${cy + 34}l${7} ${7}l${13} -${14}`, { strokeWidth: 3, roughness: 0.5 }, 0.3);
  });
});

export const SZENEN: Record<SzenenName, (a: Ansicht) => Szene> = { weg, partnerWeg, portal, siegel, siegelUeber, uspRegional, uspHand, uspFestpreis };
