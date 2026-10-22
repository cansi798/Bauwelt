// Die drei handgezeichneten Erklär-Szenen (rough.js, beim Build gerendert) –
// ersetzen seit 29.09.2026 die Erklärvideos. Jede Szene gibt es hochkant fürs
// Handy und quer für den Desktop; Motive und Reihenfolge sind in beiden gleich.
import { Zeichner, F, type Szene } from "../lib/rough-szene";
import { STEPS } from "./home";
import { VERSPRECHEN } from "./versprechen";

export type Ansicht = "mobil" | "desktop";
export type SzenenName = "gebiet" | "weg" | "wegCheck" | "wegSicher" | "wegKontakt" | "partnerWeg" | "portal" | "siegel" | "uspRegional" | "uspHand" | "uspFestpreis" | "team" | "karriere" | "handschlag" | "partnerBau";

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
  erfahrung: ["15+ Jahre", "Erfahrung im", "Handwerk"], // Audit K3
  deutsch: ["Deutsch-", "sprachiger An-", "sprechpartner"], // Kundenwunsch 15.10.2026 (55)
  regional: ["Regional", "vor Ort"],
  festpreis: ["Festpreis-", "Zusage"], // Audit 4.2 (19.10.2026): „Zusage“ statt „Garantie“
  termin: ["Termin-", "treue"],
  ansprechpartner: ["Ein fester", "Ansprech-", "partner"], // Audit 7.6 (19.10.2026), früher „Deutschsprachiger Ansprechpartner“
  antwort: ["Antwort", "innerhalb von", "12 Stunden"], // Audit 4.7: einheitlich „innerhalb von“
  angebot: ["Angebot", "innerhalb von", "24 Stunden"],
  transparenz: ["Volle", "Transparenz"],
  gewerke: ["Alle Gewerke", "aus einer Hand"],
};

/* ─────────────── Szenen ─────────────── */

const WEG_MOTIVE = [rechner, sprechblasen, dokument, entspannen];
// Unterzeilen je Station (mehrzeilig möglich – Schritt 4 laut Kundenfeedback 30.09.2026)
const WEG_UNTER: string[][] = [
  ["Preis in wenigen Minuten"],
  ["Kostenloser Vor-Ort-Termin"], // Audit 4.1 (früher „Persönlicher Termin“)
  // Jamil 20.10.2026 (Talk 2691/2692/2694): „Angebot innerhalb von 24 Stunden“ steht schon als Versprechen 5
  // auf derselben Seite – hier deshalb ohne 24 h und ohne „Festpreis“ (= Versprechen 1).
  ["Ihr Angebot –", "klar und verständlich"],
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
      titel[i].forEach((tz, k) => z.text(tx, cy - 2 + k * 18, tz, { groesse: 15.5, anker, beschriftung: true }));
      const o = (titel[i].length - 1) * 18;
      unter[i].forEach((zeile, k) =>
        z.text(tx, cy + 18 + o + k * 17, zeile, { groesse: 13, gewicht: 400, farbe: F.text2, anker, beschriftung: true })
      );
    } else {
      titel[i].forEach((tz, k) => z.text(cx, 206 + k * 22, tz, { groesse: 18, beschriftung: true }));
      const o = (titel[i].length - 1) * 22;
      unter[i].forEach((zeile, k) =>
        z.text(cx, 232 + o + k * 20, zeile, { groesse: 14.5, gewicht: 400, farbe: F.text2, beschriftung: true })
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
  ["Festpreis, ein fester", "Ansprechpartner und", "saubere Dokumentation."],
  ["Klare Prozesse für", "wiederkehrende Projekte."],
];
const partnerWeg = (a: Ansicht) => wegSzene(a, PARTNER_TITEL, PARTNER_UNTER, [papierflieger, sprechblasen, dokument, wiederkehrend]);

/* ─── Eigene Abläufe (Kundenwunsch 19.10.2026, Audit 1.8) – gleicher Zeichenstil wie „weg“ ─── */
/** Haus mit Lupe: Besichtigung vor Ort */
function lupeHaus(z: Zeichner, cx: number, cy: number, s = 1) {
  const hx = cx - 10 * s, hy = cy + 6 * s;
  z.pfad(`M${hx - 24 * s} ${hy + 24 * s}V${hy - 4 * s}L${hx} ${hy - 26 * s}L${hx + 24 * s} ${hy - 4 * s}V${hy + 24 * s}Z`,
    { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.3, strokeWidth: 2.4 });
  z.rechteck(hx - 6 * s, hy + 8 * s, 12 * s, 16 * s, { strokeWidth: 2 }, 0.25);
  z.gruppe("stempel", () => {
    z.kreis(cx + 22 * s, cy - 4 * s, 30 * s, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.6 }, 0.35);
    z.linie(cx + 33 * s, cy + 7 * s, cx + 46 * s, cy + 20 * s, { strokeWidth: 3.4 }, 0.25);
  });
}
/** Münze mit Haken: Kosten des Checks werden angerechnet */
function muenzeHaken(z: Zeichner, cx: number, cy: number, s = 1) {
  z.kreis(cx - 6 * s, cy, 50 * s, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.3, strokeWidth: 2.4 });
  z.text(cx - 6 * s, cy + 9 * s, "€", { groesse: 26 * s, farbe: F.goldDunkel });
  z.gruppe("stempel", () => {
    z.kreis(cx + 22 * s, cy + 20 * s, 26 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
    z.pfad(`M${cx + 15 * s} ${cy + 20 * s}l${5 * s} ${5 * s}l${9 * s} -${9 * s}`, { strokeWidth: 2.4, roughness: 0.4 }, 0.2);
  });
}
// Sanierungscheck: Texte aus content/leistungen/sanierungscheck.md (ablauf) + Pauschal-Hinweis
const CHECK_TITEL: string[][] = [["Termin buchen"], ["Besichtigung"], ["Einschätzung"], ["Sicher entscheiden"]];
const CHECK_UNTER: string[][] = [
  ["Online oder kurz", "per WhatsApp"],
  ["Vor Ort – gern", "gemeinsam mit Ihnen"],
  ["Sanierungsbedarf", "und Kosten"],
  ["Bei Sanierung mit uns", "wird der Check angerechnet"],
];
// Sicher wohnen (Audit 2.5): Ablauf aus den Seitentexten (Partnerpfleger, Maßnahmenliste, Anrechnung)
const SICHER_TITEL: string[][] = [["Termin buchen"], ["Gemeinsame Prüfung"], ["Empfehlungen"], ["Sicher wohnen"]];
const SICHER_UNTER: string[][] = [
  ["Online oder", "per Telefon"],
  ["Zusammen mit unserem", "Partnerpfleger"],
  ["Priorisierte Maßnahmen", "und Kosteneinschätzung"],
  ["Bei Umsetzung wird", "der Check angerechnet"],
];
const wegSicher = (a: Ansicht) => wegSzene(a, SICHER_TITEL, SICHER_UNTER, [kalender, lupeHaus, dokument, muenzeHaken]);
const wegCheck = (a: Ansicht) => wegSzene(a, CHECK_TITEL, CHECK_UNTER, [kalender, lupeHaus, dokument, muenzeHaken]);
// Kontakt: „Was nach Ihrer Anfrage passiert“ – nur bestehende Zusagen (12 h, Vor-Ort-Termin, 24 h)
const KONTAKT_TITEL: string[][] = [["Anfrage senden"], ["Persönliche Antwort"], ["Termin vor Ort"], ["Klares Angebot"]];
const KONTAKT_UNTER: string[][] = [
  ["WhatsApp, E-Mail,", "Telefon oder Rückruf"],
  ["Innerhalb von 12 Stunden", "(werktags)"],
  ["Kostenlos und", "unverbindlich"],
  ["Innerhalb von 24 Stunden", "nach dem Termin"],
];
const wegKontakt = (a: Ansicht) => wegSzene(a, KONTAKT_TITEL, KONTAKT_UNTER, [papierflieger, chat, kalender, dokument]);

/* ─── Einzugsgebiet als Skizzen-Karte (Kundenwunsch 19.10.2026, Audit 3.3) ───
   Nach Jamils ZWEITER markierter Karte (19.10.2026): von Wedel an der Elbe durch Hamburg
   (Innenstadt/Hafen) bis Barsbüttel, nach Nordwesten über Uetersen, Horst (Holstein) und
   Kellinghusen bis Neumünster, dann im Osten über Boostedt, Wahlstedt, Sülfeld, Bargteheide,
   Großhansdorf und Siek zurück nach Barsbüttel. Eigene, vereinfachte Zeichnung – keine
   Kartenkacheln, keine fremden Dienste. Koordinaten = Pixel der Vorlage (800 × 977) × 0,75, um 30 nach rechts verschoben. */
const GEBIET_ORTE: { name: string; x: number; y: number; sitz?: boolean; gross?: boolean; anker?: "start" | "middle" | "end" }[] = [
  { name: "Norderstedt", x: 405, y: 530, sitz: true },
  { name: "Hamburg", x: 395, y: 712, gross: true },
  { name: "Neumünster", x: 392, y: 78, anker: "middle" },
  { name: "Kellinghusen", x: 213, y: 222, anker: "end" },
  { name: "Bad Bramstedt", x: 321, y: 260 },
  { name: "Kaltenkirchen", x: 370, y: 368 },
  { name: "Henstedt-Ulzburg", x: 385, y: 405 },
  { name: "Barmstedt", x: 235, y: 418, anker: "end" },
  { name: "Quickborn", x: 330, y: 495, anker: "end" },
  { name: "Uetersen", x: 175, y: 545, anker: "end" },
  { name: "Pinneberg", x: 267, y: 579, anker: "middle" },
  { name: "Wedel", x: 200, y: 672 },
  { name: "Bargteheide", x: 590, y: 495 },
  { name: "Ahrensburg", x: 575, y: 558 },
];
function gebiet(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === "mobil";
  const k = (x: number, y: number): [number, number] => [x * 0.75 + 30, (y - 20) * 0.75];
  const B = 630, H = 640; // links/rechts Platz für Beschriftungen (Kellinghusen, Bargteheide)
  // Elbe (breiter, heller Strich) mit Beschriftung
  z.bei(0.1);
  z.kurve([[0, 525], [80, 590], [160, 655], [250, 700], [340, 730], [420, 745], [480, 770], [560, 800], [680, 850], [800, 880]].map(([x, y]) => k(x, y)),
    { stroke: "var(--anthrazit-200)", strokeWidth: mobil ? 11 : 9, roughness: 0.8 }, 0.8);
  z.text(...k(650, 815), "Elbe", { groesse: mobil ? 20 : 14, gewicht: 600, farbe: F.grau, anker: "start" });
  // Gebiet: zarte goldene Fläche + gestrichelte, fließende Grenze (wie im Ablauf)
  const rand: [number, number][] = [
    [390, 48], [330, 82], [262, 132], [190, 188], [132, 242], [104, 305], [94, 385], [100, 470], [116, 560],
    [142, 628], [182, 668], [252, 706], [340, 742], [418, 768], [472, 752], [532, 702], [592, 640], [626, 560],
    [620, 455], [586, 382], [560, 300], [546, 230], [520, 168], [478, 108], [430, 62], [390, 48],
  ].map(([x, y]) => k(x, y));
  z.bei(0.4);
  z.pfad(`M${rand.map(([x, y]) => `${x} ${y}`).join("L")}Z`, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 9, fillWeight: 1, stroke: "transparent", strokeWidth: 0.1, roughness: 0.6 }, 0.6);
  z.gruppe("fluss", () => z.kurve(rand, { stroke: F.gold, strokeWidth: mobil ? 3.6 : 3, roughness: 0.9 }, 1.2));
  // Orte
  GEBIET_ORTE.forEach((o, i) => {
    const [x, y] = k(o.x, o.y);
    z.bei(1.2 + i * 0.06);
    const r = o.sitz ? (mobil ? 18 : 14) : o.gross ? (mobil ? 14 : 11) : (mobil ? 10 : 8);
    const fs = (o.gross ? 1.25 : 1) * (mobil ? 22 : 14.5);
    if (o.sitz) {
      z.gruppe("stempel", () => z.kreis(x, y, r, { fill: F.gold, fillStyle: "solid", strokeWidth: 2 }, 0.3));
    } else {
      z.kreis(x, y, r, { fill: o.gross ? F.strich : "var(--weiss)", fillStyle: "solid", strokeWidth: 1.8 }, 0.2);
    }
    const anker = o.anker ?? "start";
    const dx = anker === "end" ? -(r / 2 + 6) : anker === "middle" ? 0 : r / 2 + 6;
    const dy = anker === "middle" ? r / 2 + fs * 1.05 : fs * 0.35; // „middle“ = Name unter dem Punkt
    z.text(x + dx, y + dy, o.name, { groesse: fs, gewicht: o.sitz || o.gross ? 700 : 600, farbe: o.sitz ? F.goldDunkel : F.strich, anker });
    if (o.sitz) z.text(x + dx, y + fs * 0.35 + fs * 1.1, "Unser Sitz", { groesse: fs * 0.8, gewicht: 600, farbe: F.text2, anker });
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 2.2 };
}

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
    z.text(cx, ty, kopf, { groesse: mobil ? 13.5 : 16, beschriftung: true });
    rest.forEach((zeile, k) =>
      z.text(cx, ty + (mobil ? 18 : 21) * (k + 1), zeile, { groesse: mobil ? 12.5 : 14, gewicht: 400, farbe: F.text2, beschriftung: true })
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
  /** Abstand zwischen zwei Siegeln (s) und Zusatz-Standzeit (ms).
   *  Rahmen immer rund (Kundenwunsch 19.10.2026, Jamil Msg 2518/2523: alle Animationen einheitlich kreisförmig). */
  stil: { schritt?: number; halten?: number } = {}
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
      z.kreis(cx, cy, d, { strokeWidth: 2.6 }, 0.5);
      // Kundenwunsch 19.10.2026: goldener Innenring dreht sich nach dem Zeichnen ständig
      z.gruppe("dreh", () => z.kreis(cx, cy, d - 14, { stroke: F.gold, strokeWidth: 2, roughness: 1.4 }, 0.5));
      z.bei(t + 0.3);
      SIEGEL_MOTIV[id]?.(z, cx, cy, s);
    });
    z.bei(t + Math.min(0.45, schritt));
    // Desktop hat breitere Spalten – dort ohne Trennstrich
    const zeilen =
      eigeneZeilen[id] ? eigeneZeilen[id][a]
      : !mobil && id === "ansprechpartner" ? ["Ein fester", "Ansprechpartner"]
      : !mobil && id === "deutsch" ? ["Deutsch-", "sprachiger", "Ansprechpartner"]
      : SIEGEL_ZEILEN[id] ?? [VERSPRECHEN.find((v) => v.id === id)?.title ?? id];
    const ty = cy + d / 2 + (mobil ? 22 : 28);
    zeilen.forEach((zl, k) => z.text(cx, ty + k * (mobil ? 17 : 20), zl, { groesse: mobil ? 13 : 15, gewicht: 600, beschriftung: true }));
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + (n - 1) * schritt + 1, halten: stil.halten };
}

const SIEGEL_IDS = VERSPRECHEN.map((v) => v.id);
// Startseite: 7 Siegel (mobil 2-3-2, Desktop eine Reihe)
const siegel = (a: Ansicht) => siegelSzene(a, SIEGEL_IDS, [2, 3, 2], [SIEGEL_IDS.length]);
// Über uns zeigt seit Jamil 19.10.2026 (Talk 2538/2539/2541) GENAU dieselben 7 Siegel wie die
// Startseite (Szene „siegel“). Die Fakten 15+ Jahre / regional stehen dort im Hero-Text.

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

/* ─── Karriere-Startbild: vier gezeichnete Gesichter (Jamil 20.10.2026, Talk 2787, Gesamt-Audit T3/W1) ───
   Ersetzt das Stockfoto team.webp. Comic-Stil mit demselben Stift wie die anderen Zeichnungen
   (rough.js, Anthrazit-Linien, goldene Flächen). Symbolisch für die Mitarbeitenden – KEINE echten
   Personen, keine Namen. 2 × 2 Gesichter mit Arbeitskleidung, jedes mit eigenem Merkmal. */
type Typ = "bart" | "zopf" | "helm" | "muetze";
/** Lebens-Effekt eines Gesichts nach dem Zeichnen (Jamil 21.10.2026, Msg 2863), Startzeit in s. */
const LEBEN: Record<Typ, number> = { bart: 3.3, zopf: 3.4, helm: 3.4, muetze: 3.5 }; // gestaucht auf 1,5 s (Msg 2911)
function gesicht(z: Zeichner, cx: number, cy: number, typ: Typ, t0: number, name: string) {
  const hy = cy - 16; // Kopfmitte
  // Jamil 21.10.2026 (Msg 2863): jedes Gesicht zeichnet sich in Ruhe selbst – erst Jacke + Hals,
  // dann Kopf, dann Gesicht und Merkmal (Haare/Helm/Mütze), zuletzt der Name.
  z.bei(t0);
  // Schultern + Arbeitsjacke (goldene Schraffur), Kragen
  z.pfad(`M${cx - 104} ${cy + 128}Q${cx - 100} ${cy + 78} ${cx - 44} ${cy + 68}L${cx + 44} ${cy + 68}Q${cx + 100} ${cy + 78} ${cx + 104} ${cy + 128}`,
    { fill: typ === "helm" ? F.gold : F.goldHell, fillStyle: "hachure", hachureGap: 9, fillWeight: 1.3, strokeWidth: 2.4 }, 0.6);
  z.pfad(`M${cx - 24} ${cy + 68}L${cx} ${cy + 96}L${cx + 24} ${cy + 68}`, { strokeWidth: 2.2 }, 0.3);
  if (typ === "zopf" || typ === "bart") z.linie(cx, cy + 96, cx, cy + 128, { strokeWidth: 1.8, stroke: F.grau }, 0.2); // Reißverschluss
  if (typ === "muetze") { // Latzhosen-Träger
    z.linie(cx - 50, cy + 72, cx - 40, cy + 128, { strokeWidth: 2.2, stroke: F.goldDunkel }, 0.2);
    z.linie(cx + 50, cy + 72, cx + 40, cy + 128, { strokeWidth: 2.2, stroke: F.goldDunkel }, 0.2);
  }
  // Hals
  z.linie(cx - 18, hy + 58, cx - 20, cy + 70, { strokeWidth: 2.2 }, 0.2);
  z.linie(cx + 18, hy + 58, cx + 20, cy + 70, { strokeWidth: 2.2 }, 0.2);

  const kopf = () => {
    z.bei(t0 + 0.15);
    // Zopf/Haar hinter dem Kopf zuerst
    if (typ === "zopf") {
      z.pfad(`M${cx - 58} ${hy - 6}Q${cx - 72} ${hy + 50} ${cx - 50} ${hy + 84}L${cx + 50} ${hy + 84}Q${cx + 72} ${hy + 50} ${cx + 58} ${hy - 6}`,
        { fill: F.grau, fillStyle: "hachure", hachureGap: 7, fillWeight: 1.2, strokeWidth: 2.2 }, 0.5);
    }
    // Ohren + Kopf
    z.ellipse(cx - 58, hy + 6, 16, 26, { strokeWidth: 2 }, 0.25);
    z.ellipse(cx + 58, hy + 6, 16, 26, { strokeWidth: 2 }, 0.25);
    z.ellipse(cx, hy, 116, 136, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.6 }, 0.6);
    // Augen, Brauen, Nase, Mund
    z.bei(t0 + 0.45);
    z.kreis(cx - 21, hy - 4, 8, { fill: F.strich, fillStyle: "solid", strokeWidth: 1 }, 0.15);
    // rechtes Auge: Jay zwinkert
    const auge = () => z.kreis(cx + 21, hy - 4, 8, { fill: F.strich, fillStyle: "solid", strokeWidth: 1 }, 0.15);
    if (typ === "bart") z.gruppe("zwinkern", auge, LEBEN.bart); else auge();
    z.pfad(`M${cx - 31} ${hy - 20}Q${cx - 21} ${hy - 26} ${cx - 11} ${hy - 20}`, { strokeWidth: 2.4 }, 0.15);
    z.pfad(`M${cx + 11} ${hy - 20}Q${cx + 21} ${hy - 26} ${cx + 31} ${hy - 20}`, { strokeWidth: 2.4 }, 0.15);
    z.pfad(`M${cx + 2} ${hy + 2}Q${cx - 6} ${hy + 18} ${cx + 4} ${hy + 20}`, { strokeWidth: 2 }, 0.15);
    // Mund: Christina lächelt breiter
    const mund = () => z.pfad(`M${cx - 20} ${hy + 32}Q${cx} ${hy + 48} ${cx + 20} ${hy + 32}`, { strokeWidth: 2.4 }, 0.2);
    if (typ === "zopf") z.gruppe("laecheln", mund, LEBEN.zopf); else mund();
    // Wangen (goldener Hauch)
    z.kreis(cx - 34, hy + 22, 14, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 0.1, stroke: F.goldHell }, 0.1);
    z.kreis(cx + 34, hy + 22, 14, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 0.1, stroke: F.goldHell }, 0.1);
    // eigenes Merkmal
    z.bei(t0 + 0.3);
    if (typ === "bart") {
      z.pfad(`M${cx - 50} ${hy - 30}Q${cx - 46} ${hy - 72} ${cx} ${hy - 70}Q${cx + 46} ${hy - 72} ${cx + 50} ${hy - 30}Q${cx + 20} ${hy - 50} ${cx - 50} ${hy - 30}Z`,
        { fill: F.strich, fillStyle: "hachure", hachureGap: 6, fillWeight: 1.4, strokeWidth: 2.2 }, 0.4);
      z.pfad(`M${cx - 52} ${hy + 14}Q${cx - 46} ${hy + 66} ${cx} ${hy + 70}Q${cx + 46} ${hy + 66} ${cx + 52} ${hy + 14}Q${cx + 30} ${hy + 30} ${cx + 22} ${hy + 30}Q${cx} ${hy + 56} ${cx - 22} ${hy + 30}Q${cx - 30} ${hy + 30} ${cx - 52} ${hy + 14}Z`,
        { fill: F.grau, fillStyle: "hachure", hachureGap: 6, fillWeight: 1.2, strokeWidth: 2 }, 0.4);
    } else if (typ === "zopf") {
      z.pfad(`M${cx - 56} ${hy - 8}Q${cx - 50} ${hy - 70} ${cx} ${hy - 70}Q${cx + 50} ${hy - 70} ${cx + 56} ${hy - 8}Q${cx + 20} ${hy - 40} ${cx - 10} ${hy - 44}Q${cx - 40} ${hy - 30} ${cx - 56} ${hy - 8}Z`,
        { fill: F.grau, fillStyle: "hachure", hachureGap: 7, fillWeight: 1.2, strokeWidth: 2.2 }, 0.4);
      z.kreis(cx + 4, hy - 82, 30, { fill: F.grau, fillStyle: "hachure", hachureGap: 7, fillWeight: 1.2, strokeWidth: 2.2 }, 0.3); // Dutt
      z.kreis(cx - 58, hy + 26, 7, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.4 }, 0.15); // Ohrringe
      z.kreis(cx + 58, hy + 26, 7, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.4 }, 0.15);
    } else if (typ === "helm") {
      z.pfad(`M${cx - 62} ${hy - 30}Q${cx - 60} ${hy - 92} ${cx} ${hy - 92}Q${cx + 60} ${hy - 92} ${cx + 62} ${hy - 30}Z`,
        { fill: F.gold, fillStyle: "solid", strokeWidth: 2.4 }, 0.4);
      z.linie(cx - 78, hy - 28, cx + 78, hy - 28, { strokeWidth: 3 }, 0.25); // Helmrand
      z.linie(cx, hy - 92, cx, hy - 34, { strokeWidth: 1.8, stroke: F.goldDunkel }, 0.2);
      z.kreis(cx - 21, hy - 4, 26, { strokeWidth: 2 }, 0.2); // Brille
      z.kreis(cx + 21, hy - 4, 26, { strokeWidth: 2 }, 0.2);
      z.linie(cx - 8, hy - 6, cx + 8, hy - 6, { strokeWidth: 2 }, 0.1);
    } else {
      z.pfad(`M${cx - 58} ${hy - 26}Q${cx - 58} ${hy - 96} ${cx} ${hy - 96}Q${cx + 58} ${hy - 96} ${cx + 58} ${hy - 26}Z`,
        { fill: F.gold, fillStyle: "hachure", hachureGap: 7, fillWeight: 1.4, strokeWidth: 2.4 }, 0.4);
      z.rundRechteck(cx - 62, hy - 40, 124, 20, 6, { fill: F.goldDunkel, fillStyle: "solid", strokeWidth: 2.2 }, 0.3); // Umschlag
      z.gruppe("huepfen", () => z.kreis(cx, hy - 100, 16, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 1.8 }, 0.15), LEBEN.muetze); // Bommel wippt
      z.pfad(`M${cx - 24} ${hy + 26}Q${cx - 10} ${hy + 18} ${cx} ${hy + 24}Q${cx + 10} ${hy + 18} ${cx + 24} ${hy + 26}`,
        { strokeWidth: 3.2 }, 0.2); // Schnurrbart
      z.linie(cx + 52, hy - 22, cx + 78, hy + 10, { stroke: F.goldDunkel, strokeWidth: 3.4 }, 0.2); // Zimmermannsbleistift hinterm Ohr
    }
  };
  // Enes (Bauhelm) nickt
  if (typ === "helm") z.gruppe("nicken", kopf, LEBEN.helm); else kopf();

  // Name darunter (Jamil 21.10.2026, Msg 2865): Großbuchstaben in Anthrazit, goldener Strich darunter
  z.bei(t0 + 0.6);
  z.text(cx, cy + 162, name.toUpperCase(), { groesse: 26, gewicht: 800, farbe: F.strich });
  z.linie(cx - 26, cy + 174, cx + 26, cy + 173, { stroke: F.gold, strokeWidth: 3.2, roughness: 0.8 }, 0.3);
}
/** Funkelnder Stern (vier Zacken) – Wertschätzung, kein Geld-Symbol. */
function funkeln(z: Zeichner, x: number, y: number, r: number) {
  const k = r * 0.22;
  z.pfad(`M${x} ${y - r}Q${x + k} ${y - k} ${x + r} ${y}Q${x + k} ${y + k} ${x} ${y + r}Q${x - k} ${y + k} ${x - r} ${y}Q${x - k} ${y - k} ${x} ${y - r}Z`,
    { fill: F.gold, fillStyle: "solid", stroke: F.goldDunkel, strokeWidth: 1.6, roughness: 0.6 }, 0.25);
}
// Zuordnung Name ↔ Gesicht (Jamil 21.10.2026, Msg 2865; Christina = Haarknoten)
const TEAM: { typ: Typ; name: string }[] = [
  { typ: "bart", name: "Jay" }, { typ: "zopf", name: "Christina" },
  { typ: "helm", name: "Enes" }, { typ: "muetze", name: "Burim" },
];
const TEAM_B = 760, TEAM_H = 640, TEAM_ZEILE = 316;
function team(): Szene {
  const z = new Zeichner();
  // Jamil 21.10.2026 (Msg 2863): Gesichter zeichnen sich nacheinander (je ca. 1 s, Versatz 0,55 s) …
  TEAM.forEach(({ typ, name }, i) =>
    gesicht(z, TEAM_B / 4 + (i % 2) * (TEAM_B / 2), 134 + Math.floor(i / 2) * TEAM_ZEILE, typ, i * 0.55, name));
  // … dann wächst in der Mitte ein goldener Pfeil nach oben („verdienen MEHR“ = Wachstum) …
  const mx = TEAM_B / 2;
  z.bei(2.5);
  z.kurve([[mx - 8, 470], [mx + 3, 370], [mx - 3, 260], [mx + 6, 150]], { stroke: F.gold, strokeWidth: 5, roughness: 0.9 }, 0.6);
  z.bei(2.95);
  z.pfad(`M${mx - 18} ${172}L${mx + 6} ${140}L${mx + 28} ${174}`, { stroke: F.gold, strokeWidth: 5, roughness: 0.8 }, 0.25);
  // … und drei kleine goldene Sterne ploppen auf (Anerkennung).
  ([[mx + 40, 112, 15, 3.05], [mx - 44, 182, 10, 3.2], [mx + 42, 268, 9, 3.35]] as const).forEach(([x, y, r, t]) => {
    z.bei(t);
    z.gruppe("stempel", () => funkeln(z, x, y, r));
  });
  // Zeichnen bis ca. 3,4 s, danach zwinkern/lächeln/nicken/wippen bis ca. 4,9 s – einmal, keine Schleife.
  return { breite: TEAM_B, hoehe: TEAM_H, elemente: z.elemente, ende: 4.9, zielDauer: 1.5 }; // 1,5 s gesamt (Jamil 21.10., Msg 2911)
}

/* ─── Karriere-Startbild: Karriere-Treppe (Jamil 21.10.2026, Msg 2880 – ersetzt dort die Gesichter) ───
   „Gute Handwerker verdienen mehr“: links ein Handwerker (seit Msg 2907 statt Haus), der die Treppe nach oben steigt.
   Auf den Stufen Werkzeugkiste, Wasserwaage, Bauhelm; oben wächst ein Stapel goldener Münzen, ein
   goldener Pfeil zieht die Treppe hinauf, Sterne ploppen auf. Läuft einmal, danach wippt der Helm kurz. */
const KAR_B = 760, KAR_H = 500;
function karriere(): Szene {
  const z = new Zeichner();
  const boden = 480, stufeB = 110, stufeH = 80, x0 = 260;
  // Boden
  z.bei(0);
  z.linie(30, boden, 730, boden, { stroke: F.hell, strokeWidth: 2.2 }, 0.5);
  // Handwerker am Fuß der Treppe (Jamil 21.10.2026, Msg 2907 – ersetzt das Haus): Arbeitshose, goldene
  // Jacke, Bauhelm; ein Fuß schon auf der ersten Stufe, ein Arm zeigt die Treppe hinauf. Kein Teammitglied.
  z.bei(0.05);
  z.linie(150, 380, 141, 464, { stroke: F.grau, strokeWidth: 22, roughness: 0.5 }, 0.3); // Standbein
  z.pfad("M172 380L226 352L272 388", { stroke: F.grau, strokeWidth: 22, roughness: 0.5 }, 0.35); // Bein auf der Stufe
  z.rundRechteck(120, 462, 42, 18, 7, { fill: F.strich, fillStyle: "solid", strokeWidth: 2 }, 0.2); // Stiefel
  z.rundRechteck(264, 384, 42, 16, 7, { fill: F.strich, fillStyle: "solid", strokeWidth: 2 }, 0.2);
  z.bei(0.25);
  z.pfad("M124 386L120 296Q124 270 158 268Q192 270 196 296L200 386Z", { fill: F.goldHell, fillStyle: "hachure", hachureGap: 6, fillWeight: 1.3, strokeWidth: 2.4 }, 0.4); // Jacke
  z.linie(160, 276, 160, 384, { stroke: F.grau, strokeWidth: 1.6 }, 0.2); // Reißverschluss
  z.linie(126, 292, 110, 366, { stroke: F.gold, strokeWidth: 16, roughness: 0.5 }, 0.25); // Arm hängend
  z.linie(190, 290, 240, 240, { stroke: F.gold, strokeWidth: 16, roughness: 0.5 }, 0.25); // Arm zeigt nach oben
  z.kreis(108, 374, 20, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2 }, 0.15);
  z.kreis(246, 234, 22, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2 }, 0.15);
  z.bei(0.45);
  z.kreis(160, 232, 66, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.4 }, 0.3); // Kopf
  z.kreis(175, 228, 6, { fill: F.strich, fillStyle: "solid", strokeWidth: 1 }, 0.1); // Auge (Blick zur Treppe)
  z.pfad("M164 246Q174 254 184 244", { strokeWidth: 2.4 }, 0.15); // Lächeln
  z.kreis(183, 242, 11, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 0.1, stroke: F.goldHell }, 0.1); // Wange
  z.pfad("M124 222Q126 184 160 184Q194 184 196 222Z", { fill: F.gold, fillStyle: "solid", strokeWidth: 2.4 }, 0.25); // Bauhelm
  z.linie(118, 222, 206, 222, { strokeWidth: 3.5 }, 0.15);
  // Treppe – läuft beim Zeichnen von unten nach oben
  z.bei(0.55);
  let d = `M${x0} ${boden}`;
  for (let i = 0; i < 4; i++) d += `V${boden - stufeH * (i + 1)}H${x0 + stufeB * (i + 1)}`;
  z.pfad(d + `V${boden}`, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 10, fillWeight: 1.2, strokeWidth: 2.8 }, 1.1);
  const stufe = (i: number) => ({ x: x0 + stufeB * i + stufeB / 2, y: boden - stufeH * (i + 1) });
  // Stufe 1: Werkzeugkiste
  let { x, y } = stufe(0);
  x += 27; // rechts auf der Stufe – links steht der Stiefel des Handwerkers
  z.bei(1.35);
  z.gruppe("stempel", () => {
    z.rechteck(x - 28, y - 36, 56, 36, { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2 }, 0.3);
    z.linie(x - 28, y - 22, x + 28, y - 22, { strokeWidth: 1.8 }, 0.15);
    z.pfad(`M${x - 11} ${y - 36}V${y - 47}H${x + 11}V${y - 36}`, { strokeWidth: 2.2 }, 0.2);
  });
  // Stufe 2: Wasserwaage mit Libelle
  ({ x, y } = stufe(1));
  z.bei(1.65);
  z.gruppe("stempel", () => {
    z.rechteck(x - 46, y - 18, 92, 18, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.2 }, 0.3);
    z.rundRechteck(x - 12, y - 14, 24, 10, 5, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 1.6 }, 0.2);
    z.kreis(x, y - 9, 5, { fill: F.gold, fillStyle: "solid", strokeWidth: 1 }, 0.1);
  });
  // Stufe 3: Bauhelm (wippt am Ende einmal)
  ({ x, y } = stufe(2));
  z.bei(1.95);
  z.gruppe("huepfen", () => z.gruppe("stempel", () => {
    z.pfad(`M${x - 34} ${y - 8}Q${x - 32} ${y - 50} ${x} ${y - 50}Q${x + 32} ${y - 50} ${x + 34} ${y - 8}Z`, { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2 }, 0.3);
    z.linie(x - 44, y - 6, x + 44, y - 6, { strokeWidth: 3 }, 0.2);
    z.linie(x, y - 50, x, y - 12, { stroke: F.goldDunkel, strokeWidth: 1.6 }, 0.15);
  }), 3.6);
  // Stufe 4: Münzstapel wächst
  ({ x, y } = stufe(3));
  [0, 1, 2].forEach((k) => {
    z.bei(2.25 + k * 0.15);
    z.gruppe("stempel", () => z.ellipse(x, y - 9 - k * 13, 58, 18, { fill: F.gold, fillStyle: "solid", stroke: F.goldDunkel, strokeWidth: 2 }, 0.2));
  });
  // Goldener Pfeil die Treppe hinauf
  z.bei(2.7);
  z.kurve([[300, 290], [420, 228], [540, 160], [646, 86]], { stroke: F.gold, strokeWidth: 5, roughness: 0.9 }, 0.6);
  z.bei(3.2);
  z.pfad("M614 84L650 84L638 118", { stroke: F.gold, strokeWidth: 5, roughness: 0.8 }, 0.25);
  // Sterne an der Spitze
  ([[700, 52, 15, 3.35], [596, 44, 10, 3.5], [720, 128, 9, 3.65]] as const).forEach(([sx, sy, r, t]) => {
    z.bei(t);
    z.gruppe("stempel", () => funkeln(z, sx, sy, r));
  });
  return { breite: KAR_B, hoehe: KAR_H, elemente: z.elemente, ende: 4.6, zielDauer: 1.5 }; // 1,5 s gesamt (Jamil 21.10., Msg 2911)
}

/* ─── Kontakt-Startbild: Handschlag (Jamil 21.10.2026, Msg 2897 – ersetzt das Foto hero-kontakt.webp) ───
   Zwei Hände – links Handwerker (goldene Arbeitsjacke), rechts Kunde (grauer Ärmel) – zeichnen sich,
   gleiten aufeinander zu, schlagen ein (kurzes Schütteln), dann ein goldenes Herz mit Funken. Einmal. */
const HS_B = 760, HS_H = 340;
function handschlag(): Szene {
  const z = new Zeichner();
  const weiss = { fill: "var(--weiss)", fillStyle: "solid" as const };
  // Kunde, hinterer Teil: Ärmel, Unterarm, Handfläche (wird von der Handwerker-Hand überdeckt)
  const kundeHinten = () => {
    z.pfad("M760 150L556 178L562 262L760 250Z", { fill: F.grau, fillStyle: "hachure", hachureGap: 8, fillWeight: 1.2, strokeWidth: 2.4 }, 0.6);
    z.pfad("M560 186Q520 182 500 184L496 262Q530 262 562 258Z", { ...weiss, strokeWidth: 2.2 }, 0.4); // Bündchen
    z.linie(512, 186, 508, 261, { stroke: F.grau, strokeWidth: 1.6 }, 0.2);
    z.pfad("M500 188Q450 190 420 200L366 214Q350 222 352 238L360 286Q380 300 420 290L498 262Z", { ...weiss, strokeWidth: 2.4 }, 0.6);
    // Fingerspitzen des Kunden schauen unten links heraus
    z.pfad("M352 280Q346 300 362 302Q374 300 372 288", { ...weiss, strokeWidth: 2.2 }, 0.2);
    z.pfad("M376 284Q372 304 388 304Q400 300 398 286", { ...weiss, strokeWidth: 2.2 }, 0.2);
  };
  // Handwerker: Ärmel mit Bündchen, Unterarm, Handrücken, Finger über der Kundenhand, Daumen
  const handwerker = () => {
    z.pfad("M0 168L212 190L206 280L0 272Z", { fill: F.goldHell, fillStyle: "hachure", hachureGap: 8, fillWeight: 1.3, strokeWidth: 2.4 }, 0.6);
    z.pfad("M208 186L244 190L240 282L204 280Z", { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2 }, 0.3); // Bündchen
    z.pfad("M242 198Q300 200 340 206L430 222Q452 230 446 252Q440 268 420 270L400 282Q370 296 330 284L240 274Z", { ...weiss, strokeWidth: 2.4 }, 0.6);
    // Finger legen sich über den Kundenhandrücken (vier Bögen)
    [0, 1, 2, 3].forEach((k) =>
      z.pfad(`M${386 + k * 6} ${226 + k * 15}Q${430 + k * 3} ${230 + k * 12} ${446 - k * 2} ${246 + k * 9}`, { strokeWidth: 2 }, 0.15));
    // Daumen oben
    z.pfad("M300 204Q330 186 362 192Q384 198 380 210Q372 216 350 212", { ...weiss, strokeWidth: 2.4 }, 0.3);
  };
  // Kunde, vorderer Teil: Daumen über dem Handwerker-Handrücken
  const kundeVorn = () =>
    z.pfad("M470 196Q430 182 398 190Q380 196 386 208Q394 214 420 210L452 214", { ...weiss, strokeWidth: 2.4 }, 0.3);

  // Hände gleiten aufeinander zu (zeichnen sich dabei), dann Schütteln
  z.gruppe("schuetteln", () => {
    z.bei(0);
    z.gruppe("vonrechts", kundeHinten, 0);
    z.bei(0.15);
    z.gruppe("vonlinks", handwerker, 0.15);
    z.bei(0.55);
    z.gruppe("vonrechts", kundeVorn, 0);
  }, 1.15);
  // Goldenes Herz + Funken über dem Handschlag
  const hx = 400, hy = 112;
  z.bei(1.85);
  z.gruppe("stempel", () =>
    z.pfad(`M${hx} ${hy + 4}C${hx} ${hy - 16} ${hx - 28} ${hy - 20} ${hx - 28} ${hy}C${hx - 28} ${hy + 16} ${hx - 8} ${hy + 24} ${hx} ${hy + 38}C${hx + 8} ${hy + 24} ${hx + 28} ${hy + 16} ${hx + 28} ${hy}C${hx + 28} ${hy - 20} ${hx} ${hy - 16} ${hx} ${hy + 4}Z`,
      { fill: F.gold, fillStyle: "solid", stroke: F.goldDunkel, strokeWidth: 2, roughness: 0.7 }, 0.25));
  z.bei(2.05);
  ([[hx - 44, hy - 4, hx - 66, hy - 14], [hx + 44, hy - 4, hx + 66, hy - 14], [hx - 34, hy - 32, hx - 48, hy - 50], [hx + 34, hy - 32, hx + 48, hy - 50], [hx, hy - 30, hx, hy - 52]] as const)
    .forEach(([a, b, c, d], k) => z.linie(a, b, c, d, { stroke: F.gold, strokeWidth: 3.4, roughness: 0.5 }, 0.15 + k * 0.03));
  return { breite: HS_B, hoehe: HS_H, elemente: z.elemente, ende: 2.6, zielDauer: 1.5 }; // 1,5 s gesamt (Jamil 21.10., Msg 2911)
}

/* ─── Partner-Startbild: zwei Firmen arbeiten zusammen (Jamil 21.10.2026, Msg 2899 + 2909) ───
   Msg 2899 ersetzte das KI-Foto hero-partner.webp; Msg 2909: „Zusammenarbeit zwischen zwei Firmen – das Haus
   bildet das nicht richtig ab.“ Jetzt: links das Bauwelt-Gebäude (gold, Satteldach, Schild „BAUWELT HANDWERK“, Msg 2914), rechts
   das Partner-Büro (anthrazit/weiß, Flachdach, Schild „PARTNER“). Msg 3118 (22.10.): statt Brücke führen
   gestrichelte Wege zur Mitte, wo zwei Puzzleteile (Gold/Anthrazit) einrasten; darüber ein goldener Haken. Bewusst anders als der Handschlag auf Kontakt. Einmal, 1,5 s (Msg 2911). */
const PB_B = 760, PB_H = 400;
function partnerBau(): Szene {
  const z = new Zeichner();
  const boden = 370;
  z.bei(0);
  z.linie(30, boden, 730, boden, { stroke: F.hell, strokeWidth: 2.2 }, 0.4);
  // Bauwelt: Werkstatt mit Satteldach
  z.bei(0.05);
  z.rechteck(60, 210, 190, boden - 210, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 9, fillWeight: 1.2, strokeWidth: 2.6 }, 0.45);
  z.pfad(`M44 214L155 136L266 214Z`, { fill: F.gold, fillStyle: "solid", strokeWidth: 2.6 }, 0.4);
  z.rechteck(132, 300, 46, boden - 300, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.2 }, 0.3); // Tor
  z.rechteck(80, 296, 34, 30, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 1.8 }, 0.2);
  z.rechteck(196, 296, 34, 30, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 1.8 }, 0.2);
  // Schild mit vollem Firmennamen (Jamil 21.10.2026, Msg 2914: „Wir heißen Bauwelt Handwerk.“)
  z.rechteck(68, 220, 174, 70, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2 }, 0.25);
  z.text(155, 249, "BAUWELT", { groesse: 26, gewicht: 800, farbe: F.goldDunkel });
  z.text(155, 279, "HANDWERK", { groesse: 26, gewicht: 800, farbe: F.goldDunkel });
  // Partner: Bürogebäude mit Flachdach und Fensterraster
  z.bei(0.2);
  z.rechteck(510, 170, 190, boden - 170, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.6 }, 0.45);
  z.linie(498, 170, 712, 170, { strokeWidth: 5 }, 0.25); // Flachdach
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++)
    z.rechteck(530 + c * 56, 244 + r * 46, 36, 30, { fill: F.grau, fillStyle: "hachure", hachureGap: 5, fillWeight: 1, strokeWidth: 1.8 }, 0.15);
  z.rechteck(588, 336, 34, boden - 336, { fill: F.strich, fillStyle: "solid", strokeWidth: 2 }, 0.2); // Tür
  z.rechteck(530, 188, 150, 44, { fill: F.strich, fillStyle: "solid", strokeWidth: 2 }, 0.25); // Schild
  z.text(605, 219, "PARTNER", { groesse: 26, gewicht: 800, farbe: "var(--weiss)" });
  // Verbindung (Jamil 22.10.2026, Msg 3118: „die Brücke passt nicht“): aus jeder Firma führt ein
  // gestrichelter Weg zur Mitte; dort greifen zwei Puzzleteile ineinander – Gold = Bauwelt, Anthrazit = Partner.
  // Die Teile gleiten von ihrer Seite herein und rasten ein, danach stempelt der goldene Haken.
  const py = 226, ph = 78, mx = 380, pw = 80, km = py + ph / 2; // Puzzle: oben, Höhe, Fuge, Breite, Nasenmitte
  const nase = `V${km - 12}C${mx + 12} ${km - 20} ${mx + 30} ${km - 16} ${mx + 30} ${km}C${mx + 30} ${km + 16} ${mx + 12} ${km + 20} ${mx} ${km + 12}`;
  const nasePlatz = `V${km + 12}C${mx + 12} ${km + 20} ${mx + 30} ${km + 16} ${mx + 30} ${km}C${mx + 30} ${km - 16} ${mx + 12} ${km - 20} ${mx} ${km - 12}`;
  z.bei(0.55);
  [[256, 270], [280, 292], [468, 480], [492, 504]].forEach(([a, b], k) => {
    z.bei(0.55 + (k % 2) * 0.08);
    z.linie(a, km, b, km, { stroke: F.gold, strokeWidth: 3.4, roughness: 0.6 }, 0.1);
  });
  z.bei(0.7);
  z.gruppe("vonlinks", () =>
    z.pfad(`M${mx - pw} ${py}H${mx}${nase}V${py + ph}H${mx - pw}Z`, { fill: F.gold, fillStyle: "solid", stroke: F.goldDunkel, strokeWidth: 2.6, roughness: 0.9 }, 0.35), 0.7);
  z.bei(0.78);
  z.gruppe("vonrechts", () =>
    z.pfad(`M${mx} ${py}H${mx + pw}V${py + ph}H${mx}${nasePlatz}Z`, { fill: F.strich, fillStyle: "solid", strokeWidth: 2.6, roughness: 0.9 }, 0.35), 0.78);
  // Einrasten: kleine goldene Funken an der Fuge
  z.bei(1.15);
  ([[mx - 8, py - 8, mx - 18, py - 22], [mx + 8, py - 8, mx + 18, py - 22], [mx - 8, py + ph + 8, mx - 18, py + ph + 22], [mx + 8, py + ph + 8, mx + 18, py + ph + 22]] as const)
    .forEach(([a, b, c, d]) => z.linie(a, b, c, d, { stroke: F.gold, strokeWidth: 3, roughness: 0.5 }, 0.12));
  // Goldener Haken über dem Puzzle
  z.bei(1.2);
  z.gruppe("stempel", () => {
    z.kreis(mx, 158, 62, { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2 }, 0.2);
    z.pfad(`M${mx - 16} 158l11 11l20 -22`, { strokeWidth: 3.6, roughness: 0.5 }, 0.2);
  });
  return { breite: PB_B, hoehe: PB_H, elemente: z.elemente, ende: 1.5, zielDauer: 1.5 };
}

export const SZENEN: Record<SzenenName, (a: Ansicht) => Szene> = { gebiet, weg, wegCheck, wegSicher, wegKontakt, partnerWeg, portal, siegel, uspRegional, uspHand, uspFestpreis, team, karriere, handschlag, partnerBau };
