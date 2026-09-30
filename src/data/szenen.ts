// Die drei handgezeichneten Erklär-Szenen (rough.js, beim Build gerendert) –
// ersetzen seit 29.09.2026 die Erklärvideos. Jede Szene gibt es hochkant fürs
// Handy und quer für den Desktop; Motive und Reihenfolge sind in beiden gleich.
import { Zeichner, F, type Szene } from "../lib/rough-szene";
import { STEPS } from "./home";
import { VERSPRECHEN } from "./versprechen";

export type Ansicht = "mobil" | "desktop";
export type SzenenName = "weg" | "portal" | "siegel";

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

function badewanne(z: Zeichner, cx: number, cy: number, s = 1) {
  const y = cy + 2 * s;
  // Fliesen-Andeutung hinter der Wanne
  z.linie(cx - 44 * s, cy - 36 * s, cx + 44 * s, cy - 36 * s, { stroke: F.hell, strokeWidth: 1.6 }, 0.3);
  z.linie(cx - 44 * s, cy - 18 * s, cx + 44 * s, cy - 18 * s, { stroke: F.hell, strokeWidth: 1.6 }, 0.3);
  z.linie(cx - 44 * s, y, cx + 44 * s, y, { strokeWidth: 2.8 }, 0.4);
  z.pfad(
    `M${cx - 40 * s} ${y}Q${cx - 40 * s} ${y + 30 * s} ${cx - 18 * s} ${y + 30 * s}H${cx + 18 * s}` +
      `Q${cx + 40 * s} ${y + 30 * s} ${cx + 40 * s} ${y}`,
    { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.4 }
  );
  z.linie(cx - 26 * s, y + 30 * s, cx - 30 * s, y + 38 * s, {}, 0.2);
  z.linie(cx + 26 * s, y + 30 * s, cx + 30 * s, y + 38 * s, {}, 0.2);
  z.pfad(`M${cx + 34 * s} ${y}V${cy - 40 * s}H${cx + 20 * s}V${cy - 34 * s}`, { strokeWidth: 2.4 }, 0.4);
  // Funkeln – pulsiert danach leise weiter
  z.gruppe("puls", () => {
    const fx = cx + 50 * s, fy = cy - 30 * s;
    z.linie(fx, fy - 9 * s, fx, fy + 9 * s, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.4 }, 0.2);
    z.linie(fx - 9 * s, fy, fx + 9 * s, fy, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.4 }, 0.2);
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
  gewerke: (z, cx, cy, s) => {
    // Hammer + Kelle gekreuzt = alle Gewerke
    z.linie(cx - 12 * s, cy + 14 * s, cx + 8 * s, cy - 8 * s, { strokeWidth: 2.8 }, 0.3);
    z.rechteck(cx + 2 * s, cy - 17 * s, 16 * s, 8 * s, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8 }, 0.3);
    z.linie(cx + 12 * s, cy + 14 * s, cx - 4 * s, cy - 2 * s, { stroke: F.goldDunkel, strokeWidth: 2.6 }, 0.3);
    z.pfad(`M${cx - 4 * s} ${cy - 2 * s}L${cx - 16 * s} ${cy - 6 * s}L${cx - 8 * s} ${cy - 14 * s}Z`, { strokeWidth: 2 }, 0.3);
  },
};

/** Siegel-Titel zweizeilig umbrochen (schmale Handy-Spalten). */
const SIEGEL_ZEILEN: Record<string, [string, string]> = {
  festpreis: ["Festpreis-", "Garantie"],
  termin: ["Termin-", "treue"],
  ansprechpartner: ["Ein An-", "sprechpartner"],
  antwort: ["Antwort in", "12 Stunden"],
  angebot: ["Angebot in", "24 Stunden"],
  transparenz: ["Volle", "Transparenz"],
  gewerke: ["Alle Gewerke", "aus einer Hand"],
};

/* ─────────────── Szenen ─────────────── */

const WEG_MOTIVE = [rechner, sprechblasen, dokument, badewanne];
// Unterzeilen je Station (mehrzeilig möglich – Schritt 4 laut Kundenfeedback 30.09.2026)
const WEG_UNTER: string[][] = [
  ["Preis in wenigen Minuten"],
  ["Persönlicher Termin"],
  ["Angebot in 24 Stunden"],
  ["Wir koordinieren alles", "und setzen es für Sie um"],
];

function weg(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === "mobil";
  const B = mobil ? 360 : 1000, H = mobil ? 540 : 300;
  // Stationen: mobil im Zickzack untereinander, Desktop nebeneinander
  const pos: [number, number][] = mobil
    ? [[80, 76], [280, 206], [80, 336], [280, 466]]
    : [[125, 96], [375, 96], [625, 96], [875, 96]];

  pos.forEach(([cx, cy], i) => {
    const t = 0.2 + i * 1.15;
    z.bei(t);
    WEG_MOTIVE[i](z, cx, cy, 1);
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
      z.text(tx, cy - 2, STEPS[i].title, { groesse: 15.5, anker });
      WEG_UNTER[i].forEach((zeile, k) =>
        z.text(tx, cy + 18 + k * 17, zeile, { groesse: 13, gewicht: 400, farbe: F.text2, anker })
      );
    } else {
      z.text(cx, 206, STEPS[i].title, { groesse: 18 });
      WEG_UNTER[i].forEach((zeile, k) =>
        z.text(cx, 232 + k * 20, zeile, { groesse: 14.5, gewicht: 400, farbe: F.text2 })
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
      z.kurve(pkt, { stroke: F.gold, strokeWidth: 2.6, roughness: 1.4 }, 0.6);
    }
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + 3 * 1.15 + 1.2 };
}

const PORTAL_TEILE = [
  { motiv: (z: Zeichner, x: number, y: number) => dokument(z, x, y, 0.72, false), zeilen: ["Alle Dokumente", "an einem Ort"] },
  { motiv: kalender, zeilen: ["Alle Termine", "im Blick"] },
  // Erste Zeile fett, folgende normal (Kundenfeedback 30.09.2026)
  { motiv: chat, zeilen: ["WhatsApp oder E-Mail", "wie Sie wollen"] },
  { motiv: pfeilKreis, zeilen: ["Aktueller Projektstatus", "Immer wissen, was als", "Nächstes passiert"] },
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

function siegel(a: Ansicht): Szene {
  const z = new Zeichner();
  const mobil = a === "mobil";
  const n = VERSPRECHEN.length;
  // Mobil im Muster 2-3-2 (Reihen versetzt), Desktop alle in einer Reihe
  const reihen = mobil ? [2, 3, 2] : [n];
  const B = mobil ? 360 : 1000;
  const rh = 150; // Reihenhöhe mobil
  const H = mobil ? reihen.length * rh + 10 : 230;
  const d = mobil ? 78 : 100; // Ring-Durchmesser
  const s = mobil ? 0.9 : 1.15; // Motiv-Maßstab
  const pos: [number, number][] = [];
  reihen.forEach((anz, r) => {
    const sp = mobil ? 120 : B / anz;
    const start = (B - sp * anz) / 2 + sp / 2;
    for (let k = 0; k < anz; k++) pos.push([start + k * sp, (mobil ? 56 + r * rh : 70)]);
  });
  VERSPRECHEN.forEach((v, i) => {
    const [cx, cy] = pos[i];
    const t = 0.2 + i * 0.55;
    z.bei(t);
    z.gruppe("stempel", () => {
      z.kreis(cx, cy, d, { strokeWidth: 2.6 }, 0.5);
      z.kreis(cx, cy, d - 14, { stroke: F.gold, strokeWidth: 2, roughness: 1.4 }, 0.5);
      z.bei(t + 0.3);
      SIEGEL_MOTIV[v.id]?.(z, cx, cy, s);
    });
    z.bei(t + 0.45);
    // Desktop hat breitere Spalten – dort ohne Trennstrich
    const [z1, z2] = !mobil && v.id === "ansprechpartner" ? ["Ein", "Ansprechpartner"] : SIEGEL_ZEILEN[v.id] ?? [v.title, ""];
    const ty = cy + d / 2 + (mobil ? 22 : 28);
    z.text(cx, ty, z1, { groesse: mobil ? 13 : 15, gewicht: 600 });
    z.text(cx, ty + (mobil ? 17 : 20), z2, { groesse: mobil ? 13 : 15, gewicht: 600 });
  });
  return { breite: B, hoehe: H, elemente: z.elemente, ende: 0.2 + (n - 1) * 0.55 + 1 };
}

export const SZENEN: Record<SzenenName, (a: Ansicht) => Szene> = { weg, portal, siegel };
