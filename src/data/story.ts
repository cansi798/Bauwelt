// Startseite „So läuft Ihr Projekt“: bewegte Bild-Geschichte (Kundenwunsch 15.10.2026).
// „Die Figuren sollen sich tatsächlich bewegen“ – 5 Szenen à 1,6 s = 8 s, dann Endlosschleife.
// Wie bei RoughSzene rechnet rough.js NUR beim Build; im Browser liegt fertiges SVG.
// Jeder bewegliche Körperteil/Gegenstand ist eine eigene <g>-Gruppe, die per CSS-Keyframes
// (translate/rotate um einen festen Drehpunkt in SVG-Einheiten) animiert wird. Alle Keyframes
// sind Prozentwerte EINER gemeinsamen Zeitachse (--story), dadurch bleibt alles synchron.
import { Zeichner, F, type Element } from "../lib/rough-szene";

/** Länge eines Durchlaufs in Sekunden (Kundenwunsch: max. 8 s). */
export const STORY_DAUER = 8;
const SZ = STORY_DAUER / 5; // 1,6 s je Szene
const BLENDE = 0.1; // halbe Überblendzeit zwischen zwei Szenen

export const STORY_BREITE = 560;
export const STORY_HOEHE = 280;
const OBEN = 60; // oberer Rand des sichtbaren Ausschnitts (darüber ist nur Himmel)
const BODEN = 326;

export const STORY_TEXTE = [
  "Preis online berechnen",
  "Wir kommen vorbei",
  "Angebot & Zusage",
  "Wir bauen – Sie entspannen",
  "Fertig & zufrieden",
];
/** Szene, die bei „Bewegung reduzieren“ als Standbild stehen bleibt (0-basiert). */
export const STORY_STANDBILD = 3;

/* ─────────────── Bühne: verschachtelte Gruppen aus rough-Elementen ─────────────── */

type Pt = [number, number];
type Gruppe = { art: "g"; cls?: string; o?: Pt; tf?: string; attr?: string; kinder: Teil[] };
type Teil = Element | Gruppe | { art: "roh"; html: string };

class Buehne {
  z = new Zeichner();
  private stapel: Teil[][] = [[]];
  get wurzel() { return this.stapel[0]; }
  private get akt() { return this.stapel[this.stapel.length - 1]; }
  zeichne(fn: (z: Zeichner) => void) {
    this.akt.push(...this.z.sammeln(() => fn(this.z)));
  }
  /** cls = Animations-Klasse, o = Drehpunkt (SVG-Einheiten, lokales System), tf = feste Platzierung. */
  g(o: { cls?: string; o?: Pt; tf?: string; attr?: string }, fn: () => void) {
    const kinder: Teil[] = [];
    this.stapel.push(kinder);
    fn();
    this.stapel.pop();
    this.akt.push({ art: "g", ...o, kinder });
  }
  roh(html: string) { this.akt.push({ art: "roh", html }); }
}

const r1 = (x: number) => Math.round(x * 10) / 10;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// „Soll nicht so stark aussehen“ (Kundenwunsch 15.10.2026): dünnere Linien und weicheres Dunkelgrau
// statt fast Schwarz – nur in der Story, die übrigen Rough-Szenen bleiben unverändert.
const LINIE = 0.65;
const sanft = (farbe: string) => (farbe === F.strich ? "var(--anthrazit-700)" : farbe);
const breite = (b: number) => r1(b * LINIE);

function svgTeile(t: Teil[]): string {
  let out = "";
  for (let i = 0; i < t.length; i++) {
    const e = t[i];
    switch (e.art) {
      case "strich": {
        // aufeinanderfolgende Striche gleicher Farbe/Stärke zu einem Pfad zusammenfassen (schlankes HTML)
        let d = e.d;
        while (i + 1 < t.length) {
          const n = t[i + 1];
          if (n.art !== "strich" || n.farbe !== e.farbe || n.breite !== e.breite) break;
          d += n.d; i++;
        }
        out += `<path d="${d}" stroke="${sanft(e.farbe)}" stroke-width="${breite(e.breite)}"/>`;
        break;
      }
      case "flaeche":
        out += e.breite > 0
          ? `<path d="${e.d}" stroke="${sanft(e.farbe)}" stroke-width="${breite(e.breite)}"/>`
          : `<path d="${e.d}" fill="${sanft(e.farbe)}"/>`;
        break;
      case "text":
        out += `<text x="${r1(e.x)}" y="${r1(e.y)}" text-anchor="${e.anker}" font-size="${e.groesse}" font-weight="${e.gewicht}" fill="${e.farbe}">${esc(e.text)}</text>`;
        break;
      case "gruppe":
        out += svgTeile(e.kinder);
        break;
      case "roh":
        out += e.html;
        break;
      case "g":
        out += `<g${e.cls ? ` class="${e.cls}"` : ""}${e.tf ? ` transform="${e.tf}"` : ""}` +
          `${e.o ? ` style="transform-origin:${r1(e.o[0])}px ${r1(e.o[1])}px"` : ""}${e.attr ? ` ${e.attr}` : ""}>` +
          `${svgTeile(e.kinder)}</g>`;
        break;
    }
  }
  return out;
}

/* ─────────────── Zeitachse → CSS-Keyframes ─────────────── */

type KF = [number, string];
const rot = (d: number) => `transform:rotate(${d}deg)`;
const tr = (x: number, y: number) => `transform:translate(${x}px,${y}px)`;
const sc = (s: number) => `transform:scale(${s})`;
const op = (o: number) => `opacity:${o}`;

/** Wiederholt ein Muster ([Phase 0…1, Wert]) im Takt `periode` zwischen t0 und t1. */
function takt(t0: number, t1: number, periode: number, muster: KF[]): KF[] {
  const out: KF[] = [];
  for (let s = t0; s + periode <= t1 + 1e-6; s += periode)
    for (const [ph, v] of muster) out.push([s + ph * periode, v]);
  return out;
}

class Zeitachse {
  regeln: string[] = [];
  /** Rohe Keyframes über die ganze Schleife (0…STORY_DAUER s). */
  roh(cls: string, frames: KF[], tf = "ease-in-out") {
    const m = new Map<number, string>();
    [...frames].sort((a, b) => a[0] - b[0]).forEach(([t, v]) =>
      m.set(Math.round(Math.min(Math.max(t, 0), STORY_DAUER) * 1000) / 1000, v));
    const kf = [...m].map(([t, v]) => `${+(t / STORY_DAUER * 100).toFixed(3)}%{${v}}`).join("");
    this.regeln.push(`@keyframes st-${cls}{${kf}}.story .${cls}{animation:st-${cls} var(--story) ${tf} infinite}`);
  }
  /**
   * Bewegung innerhalb von Szene i: vor dem ersten Keyframe steht der Startwert, bis zum
   * Ende der Szene der Endwert; danach (unsichtbar) zurück auf Start.
   */
  spur(cls: string, i: number, frames: KF[], tf = "ease-in-out") {
    const f = [...frames].sort((a, b) => a[0] - b[0]);
    const v0 = f[0][1], v1 = f[f.length - 1][1];
    const ende = (i + 1) * SZ;
    this.roh(cls, i < 4
      ? [[0, v0], ...f, [ende, v1], [ende + 0.01, v0], [STORY_DAUER, v0]]
      : [[0, v0], ...f, [STORY_DAUER, v1]], tf);
  }
  /**
   * Ein-/Ausblenden der Szenen (und ihrer Bildunterschrift): Szene i blendet in den letzten
   * 2·BLENDE s vor ihrem Start ein (bei Szene 1 über das Schleifenende) – Zeit 0 = reine Szene 1.
   */
  szene(i: number) {
    const a = i * SZ, e = (i + 1) * SZ, w = 2 * BLENDE;
    const sicht = (t: number) => {
      let best = 0;
      for (const tt of [t - STORY_DAUER, t, t + STORY_DAUER])
        best = Math.max(best, Math.max(0, Math.min(1, (tt - (a - w)) / w, (e - tt) / w)));
      return best;
    };
    const punkte = [0, a - w, a, e - w, e, STORY_DAUER].map((t) => ((t % STORY_DAUER) + STORY_DAUER) % STORY_DAUER);
    punkte.push(STORY_DAUER);
    this.roh(`st-sz${i + 1}`, punkte.map((t) => [t, op(+sicht(t).toFixed(3))] as KF), "linear");
  }
}

/* ─────────────── Figuren ─────────────── */

const L1 = 28, L2 = 26; // Ober-/Unterarm
const rad = (d: number) => (d * Math.PI) / 180;
/** Winkel: 0° = nach unten, 90° = nach vorn (Blickrichtung), 180° = nach oben, negativ = nach hinten. */
const pt = (p: Pt, a: number, l: number): Pt => [p[0] + l * Math.sin(rad(a)), p[1] + l * Math.cos(rad(a))];

type Requisit = (b: Buehne, hand: Pt, a2: number) => void;
type Arm = { a1: number; a2: number; ding?: Requisit };
interface FigOpt {
  id: string; x: number; s?: number; spiegeln?: boolean;
  helm?: boolean; sitzen?: boolean; mund?: "laecheln" | "lachen";
  hinten?: Arm; vorn?: Arm; beine?: [number, number];
}
const GLIED = { strokeWidth: 3.4, roughness: 0.7, bowing: 0.6 };

function arm(b: Buehne, cls: string, S: Pt, d: Arm) {
  const E = pt(S, d.a1, L1), H = pt(E, d.a2, L2);
  b.g({ cls: `${cls}1`, o: S }, () => {
    b.zeichne((z) => z.linie(S[0], S[1], E[0], E[1], GLIED));
    b.g({ cls: `${cls}2`, o: E }, () => {
      b.zeichne((z) => z.linie(E[0], E[1], H[0], H[1], GLIED));
      d.ding?.(b, H, d.a2);
      b.roh(`<circle cx="${r1(H[0])}" cy="${r1(H[1])}" r="4.3" fill="var(--anthrazit-800)"/>`);
    });
  });
}

function bein(b: Buehne, cls: string, hueftY: number, a: number) {
  const fuss = pt([0, hueftY], a, -hueftY);
  b.g({ cls, o: [0, hueftY] }, () => b.zeichne((z) => {
    z.linie(0, hueftY, fuss[0], fuss[1], GLIED);
    z.linie(fuss[0] - 2, fuss[1], fuss[0] + 9, fuss[1], { strokeWidth: 4.4, roughness: 0.3 });
  }));
}

function kopf(b: Buehne, ky: number, o: FigOpt) {
  b.zeichne((z) => {
    z.kreis(2, ky, 33, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3, roughness: 0.6 });
    if (o.helm) {
      z.pfad(`M-15 ${ky - 3}Q2 ${ky - 32} 19 ${ky - 3}Z`, { fill: F.gold, fillStyle: "solid", strokeWidth: 2.6, roughness: 0.6 });
      z.linie(-19, ky - 3, 25, ky - 3, { strokeWidth: 3.6, roughness: 0.4 });
    } else {
      // Kunde: dunkle Haare statt Helm
      z.pfad(`M-14 ${ky - 1}Q-15 ${ky - 18} 2 ${ky - 17}Q17 ${ky - 17} 18 ${ky - 6}Q9 ${ky - 12} -3 ${ky - 9}Q-9 ${ky - 7} -14 ${ky - 1}Z`,
        { fill: F.strich, fillStyle: "solid", strokeWidth: 2, roughness: 0.5 });
    }
    if (o.mund === "lachen") z.pfad(`M-1 ${ky + 6}Q5 ${ky + 15} 11 ${ky + 6}Z`, { fill: F.strich, fillStyle: "solid", strokeWidth: 1.8, roughness: 0.3 });
    else z.pfad(`M0 ${ky + 7}Q5 ${ky + 12} 10 ${ky + 6}`, { strokeWidth: 2.2, roughness: 0.3 });
  });
  b.roh(`<circle cx="-1" cy="${ky + 0.5}" r="2.1" fill="var(--anthrazit-800)"/><circle cx="9" cy="${ky + 0.5}" r="2.1" fill="var(--anthrazit-800)"/>`);
}

/** Figur mit Blick nach rechts (gespiegelt nach links), Füße bei (x, BODEN). */
function figur(b: Buehne, o: FigOpt) {
  const s = o.s ?? 1.2;
  const hueftY = o.sitzen ? -46 : -60;
  const S: Pt = [0, hueftY - 46];
  const ky = hueftY - 72;
  const id = o.id;
  b.g({ tf: `translate(${o.x} ${BODEN}) scale(${o.spiegeln ? -s : s} ${s})` }, () => {
    b.g({ cls: `${id}-fig`, o: [0, 0] }, () => {
      arm(b, `${id}-ah`, S, o.hinten ?? { a1: -8, a2: -4 });
      if (o.sitzen) {
        b.zeichne((z) => {
          z.linie(0, hueftY, 32, hueftY + 2, GLIED);
          z.linie(32, hueftY + 2, 34, 0, GLIED);
          z.linie(32, 0, 43, 0, { strokeWidth: 4.4, roughness: 0.3 });
        });
      } else {
        const [l, r] = o.beine ?? [-9, 9];
        bein(b, `${id}-bl`, hueftY, l);
        bein(b, `${id}-br`, hueftY, r);
      }
      // Oberkörper: Handwerker in goldener Weste, Kunde in grauem Pulli
      b.zeichne((z) => z.pfad(`M-14 ${S[1] - 3}Q0 ${S[1] - 8} 14 ${S[1] - 3}L12 ${hueftY + 3}H-12Z`,
        { fill: o.helm ? F.gold : F.grau, fillStyle: "hachure", hachureGap: 4.5, fillWeight: 1.5, strokeWidth: 3, roughness: 0.8 }));
      b.g({ cls: `${id}-kopf`, o: [0, ky + 16] }, () => kopf(b, ky, o));
      arm(b, `${id}-av`, S, o.vorn ?? { a1: 10, a2: 6 });
    });
  });
}

/* ─────────────── Requisiten (in der Hand) ─────────────── */

const hammer: Requisit = (b, h, a) => {
  const u: Pt = [Math.sin(rad(a)), Math.cos(rad(a))];
  const v: Pt = [u[1], -u[0]];
  const P: Pt = [h[0] + u[0] * 24, h[1] + u[1] * 24];
  const c = (k: number, m: number) => `${r1(P[0] + v[0] * k + u[0] * m)} ${r1(P[1] + v[1] * k + u[1] * m)}`;
  b.zeichne((z) => {
    z.linie(h[0] - u[0] * 5, h[1] - u[1] * 5, P[0], P[1], { stroke: F.goldDunkel, strokeWidth: 4, roughness: 0.4 });
    z.pfad(`M${c(-12, -5)}L${c(9, -5)}L${c(9, 5)}L${c(-12, 5)}Z`, { fill: F.strich, fillStyle: "solid", strokeWidth: 2, roughness: 0.4 });
  });
};
const fliese: Requisit = (b, [x, y]) =>
  b.zeichne((z) => z.rechteck(x - 2, y - 10, 15, 15, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 2, roughness: 0.5 }));
const stift: Requisit = (b, [x, y]) =>
  b.zeichne((z) => z.linie(x - 3, y + 5, x + 6, y - 13, { stroke: F.goldDunkel, strokeWidth: 3.4, roughness: 0.3 }));
const klemmbrett = (id: string): Requisit => (b, [x, y]) => {
  b.zeichne((z) => {
    z.rechteck(x - 6, y - 32, 30, 38, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.6, roughness: 0.5 });
    z.rechteck(x + 3, y - 35, 12, 6, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8, roughness: 0.3 });
  });
  [0, 1, 2].forEach((n) => b.g({ cls: `${id}-n${n}` }, () =>
    b.zeichne((z) => z.linie(x - 1, y - 22 + n * 8, x + 18 - (n === 2 ? 7 : 0), y - 22 + n * 8, { stroke: F.text2, strokeWidth: 2.2, roughness: 0.6 }))));
};
const tasse = (id: string): Requisit => (b, h) => {
  const [x, y] = h;
  b.g({ cls: `${id}-tasse`, o: h }, () => {
    b.zeichne((z) => {
      z.pfad(`M${x - 8} ${y - 12}H${x + 8}V${y - 1}Q${x + 8} ${y + 5} ${x + 2} ${y + 5}H${x - 2}Q${x - 8} ${y + 5} ${x - 8} ${y - 1}Z`,
        { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2, roughness: 0.4 });
      z.pfad(`M${x + 8} ${y - 9}Q${x + 16} ${y - 6} ${x + 8} ${y + 1}`, { strokeWidth: 2.2, roughness: 0.3 });
    });
    [-3, 4].forEach((dx, n) => b.g({ cls: `${id}-d${n}`, o: [x + dx, y - 16] }, () =>
      b.zeichne((z) => z.pfad(`M${x + dx} ${y - 16}Q${x + dx - 4} ${y - 21} ${x + dx} ${y - 26}Q${x + dx + 4} ${y - 31} ${x + dx} ${y - 36}`,
        { stroke: F.gold, strokeWidth: 2.4, roughness: 0.5 }))));
  });
};

/** Vierzackiger Glanz-Stern (Mittelpunkt, Radius). */
const glanz = (x: number, y: number, r: number) =>
  `M${x} ${y - r}Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y}Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r}` +
  `Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y}Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r}Z`;
/** Fünfzackiger Stern. */
const stern = (x: number, y: number, r: number) => {
  let d = "";
  for (let k = 0; k < 10; k++) {
    const rr = k % 2 ? r * 0.45 : r, w = rad(k * 36);
    d += `${k ? "L" : "M"}${r1(x + rr * Math.sin(w))} ${r1(y - rr * Math.cos(w))}`;
  }
  return d + "Z";
};

/* ─────────────── Die fünf Szenen ─────────────── */

export function storyAnimation() {
  const b = new Buehne();
  const a = new Zeitachse();
  const szene = (i: number, fn: () => void) => { a.szene(i); b.g({ cls: `st-sz st-sz${i + 1}` }, fn); };
  const t = (i: number, dt: number) => i * SZ + dt;

  // Boden – bleibt über alle Szenen stehen
  b.zeichne((z) => z.linie(8, BODEN, STORY_BREITE - 8, BODEN, { stroke: F.hell, strokeWidth: 3, roughness: 1.2 }));

  /* 1 ── Kunde berechnet am Laptop den Preis → Bauwelt-Handy meldet „Neue Anfrage“ */
  szene(0, () => {
    b.zeichne((z) => {
      // Stuhl
      z.linie(50, 274, 104, 274, { strokeWidth: 3.4 });
      z.linie(54, 274, 51, BODEN, { strokeWidth: 3 });
      z.linie(100, 274, 103, BODEN, { strokeWidth: 3 });
      z.linie(52, 274, 44, 196, { strokeWidth: 3.4 });
      // Tisch
      z.linie(106, 250, 290, 250, { strokeWidth: 4 });
      z.linie(150, 250, 150, BODEN, { strokeWidth: 3 });
      z.linie(276, 250, 278, BODEN, { strokeWidth: 3 });
      // Laptop
      z.rechteck(136, 160, 104, 84, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3.2, roughness: 0.6 });
      z.pfad("M120 244H252L246 250H126Z", { fill: F.hell, fillStyle: "solid", strokeWidth: 2.6, roughness: 0.5 });
      z.rechteck(144, 168, 88, 9, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 1.6, roughness: 0.4 });
      z.rechteck(150, 216, 76, 8, { strokeWidth: 1.8, roughness: 0.4 });
    });
    // Preis zählt hoch
    ["0 €", "2.150 €", "5.480 €", "8.900 €"].forEach((p, n) =>
      b.g({ cls: `s1-p${n}` }, () => b.zeichne((z) => z.text(188, 205, p, { groesse: 19, farbe: n === 3 ? F.goldDunkel : F.strich }))));
    b.g({ cls: "s1-balken", o: [150, 220] }, () =>
      b.zeichne((z) => z.rechteck(150, 216, 76, 8, { fill: F.gold, fillStyle: "solid", stroke: F.gold, strokeWidth: 1, roughness: 0.3 })));
    b.g({ cls: "s1-knopf", o: [188, 234] }, () =>
      b.zeichne((z) => z.rundRechteck(162, 229, 52, 11, 4, { fill: F.gold, fillStyle: "solid", strokeWidth: 1.8, roughness: 0.4 })));
    figur(b, { id: "k1", x: 78, sitzen: true, hinten: { a1: 25, a2: 95 }, vorn: { a1: 30, a2: 88 } });
    // Anfrage fliegt zum Bauwelt-Handy
    b.g({ cls: "s1-bogen" }, () =>
      b.roh(`<path d="M238 180Q305 88 384 168" stroke="var(--gold-500)" stroke-width="3" stroke-dasharray="2 9"/>`));
    b.g({ tf: "translate(205 188)" }, () => b.g({ cls: "s1-brief", o: [0, 0] }, () => b.zeichne((z) => {
      z.rechteck(-17, -12, 34, 24, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 2.6, roughness: 0.5 });
      z.pfad("M-17 -12L0 2L17 -12", { stroke: F.goldDunkel, strokeWidth: 2.4, roughness: 0.4 });
    })));
    b.g({ cls: "s1-vib" }, () => b.zeichne((z) => {
      for (const [x, d] of [[382, -1], [514, 1]] as const) {
        z.pfad(`M${x} 170Q${x + d * 8} 184 ${x} 198`, { stroke: F.gold, strokeWidth: 3, roughness: 0.4 });
        z.pfad(`M${x + d * 9} 162Q${x + d * 19} 184 ${x + d * 9} 206`, { stroke: F.gold, strokeWidth: 3, roughness: 0.4 });
      }
    }));
    b.g({ cls: "s1-handy", o: [448, 198] }, () => {
      b.zeichne((z) => {
        z.rundRechteck(392, 98, 112, 200, 16, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3.4, roughness: 0.7 });
        z.linie(433, 111, 463, 111, { strokeWidth: 3, roughness: 0.3 });
        z.linie(433, 284, 463, 284, { strokeWidth: 3, roughness: 0.3 });
        // Bauwelt-Abzeichen: goldener Helm
        z.pfad("M432 152Q448 124 464 152Z", { fill: F.gold, fillStyle: "solid", strokeWidth: 2.4, roughness: 0.5 });
        z.linie(427, 152, 470, 152, { strokeWidth: 3.4, roughness: 0.3 });
        z.text(448, 177, "Bauwelt", { groesse: 16 });
      });
      b.g({ cls: "s1-karte", o: [448, 221] }, () => {
        b.zeichne((z) => {
          z.rundRechteck(400, 192, 96, 58, 10, { fill: "var(--gold-100)", fillStyle: "solid", stroke: F.gold, strokeWidth: 2.6, roughness: 0.5 });
          z.text(458, 217, "Neue", { groesse: 12.5 });
          z.text(458, 235, "Anfrage!", { groesse: 12.5 });
        });
        b.g({ cls: "s1-glocke", o: [416, 208] }, () => b.zeichne((z) => {
          z.pfad("M408 228Q410 222 410 216Q410 208 416 208Q422 208 422 216Q422 222 424 228Z", { fill: F.gold, fillStyle: "solid", strokeWidth: 2, roughness: 0.3 });
          z.linie(414, 232, 418, 232, { strokeWidth: 3, roughness: 0.2 });
        }));
      });
    });
    b.g({ cls: "s1-zahl", o: [503, 101] }, () => b.zeichne((z) => {
      z.kreis(503, 101, 24, { fill: F.goldDunkel, fillStyle: "solid", strokeWidth: 2, roughness: 0.4 });
      z.text(503, 106.5, "1", { groesse: 14, farbe: "var(--weiss)" });
    }));
  });
  {
    const i = 0;
    a.spur("k1-av2", i, takt(0.05, 0.57, 0.13, [[0, rot(0)], [0.5, rot(-10)], [1, rot(0)]]));
    a.spur("k1-ah2", i, takt(0.11, 0.5, 0.13, [[0, rot(0)], [0.5, rot(-10)], [1, rot(0)]]));
    a.spur("s1-p0", i, [[0.12, op(1)], [0.14, op(0)]]);
    a.spur("s1-p1", i, [[0.12, op(0)], [0.14, op(1)], [0.26, op(1)], [0.28, op(0)]]);
    a.spur("s1-p2", i, [[0.26, op(0)], [0.28, op(1)], [0.42, op(1)], [0.44, op(0)]]);
    a.spur("s1-p3", i, [[0.42, op(0)], [0.44, op(1)]]);
    a.spur("s1-balken", i, [[0.05, "transform:scaleX(0)"], [0.46, "transform:scaleX(1)"]]);
    a.spur("s1-knopf", i, [[0.5, sc(1)], [0.56, sc(0.8)], [0.64, sc(1)]]);
    a.spur("s1-bogen", i, [[0.58, op(0)], [0.66, op(1)]]);
    a.spur("s1-brief", i, [
      [0.62, "transform:translate(0px,0px) scale(0.5);opacity:0"],
      [0.68, "transform:translate(12px,-14px) scale(0.85);opacity:1"],
      [0.8, "transform:translate(95px,-80px) scale(1);opacity:1"],
      [0.93, "transform:translate(178px,-22px) scale(0.75);opacity:1"],
      [0.99, "transform:translate(190px,-8px) scale(0.5);opacity:0"],
    ]);
    a.spur("s1-handy", i, [[0.98, rot(0)], ...takt(1.0, 1.5, 0.1, [[0, rot(0)], [0.25, rot(6)], [0.75, rot(-6)], [1, rot(0)]])]);
    a.spur("s1-karte", i, [[0.98, `${sc(0)};${op(0)}`], [1.08, `${sc(1.12)};${op(1)}`], [1.15, `${sc(1)};${op(1)}`]]);
    a.spur("s1-glocke", i, takt(1.08, 1.58, 0.1, [[0, rot(0)], [0.25, rot(18)], [0.75, rot(-18)], [1, rot(0)]]));
    a.spur("s1-zahl", i, [[1.0, sc(0)], [1.1, sc(1.25)], [1.18, sc(1)]]);
    a.spur("s1-vib", i, [[0.96, op(0)], ...takt(1.0, 1.6, 0.2, [[0, op(1)], [0.5, op(0.15)], [1, op(1)]])]);
  }

  /* 2 ── Handwerker kommt vorbei, Kunde zeigt Riss und alte Wanne, Handwerker nickt & notiert */
  szene(1, () => {
    b.zeichne((z) => {
      // alte Fliesenwand
      for (let x = 278; x < 548; x += 38) z.linie(x, 142, x + 1, BODEN, { stroke: F.hell, strokeWidth: 2.2, roughness: 1.3 });
      for (let y = 178; y < BODEN; y += 38) z.linie(240, y, 548, y + 1, { stroke: F.hell, strokeWidth: 2.2, roughness: 1.3 });
      // Riss
      z.pfad("M398 150L408 170L400 188L414 206L407 226", { stroke: F.text2, strokeWidth: 2.6, roughness: 0.8 });
      // Tür
      z.rechteck(10, 150, 58, 176, { strokeWidth: 3.2, roughness: 0.8 });
      z.pfad("M68 150L92 162V316L68 326", { stroke: F.grau, strokeWidth: 2.6, roughness: 0.8 });
      // alte Wanne + Hahn
      z.pfad("M322 268H540V288Q540 322 505 322H357Q322 322 322 288Z", { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3.2, roughness: 0.9 });
      z.linie(342, 322, 339, BODEN, { strokeWidth: 3 });
      z.linie(520, 322, 523, BODEN, { strokeWidth: 3 });
      z.pfad("M532 268V246Q532 238 522 238H512", { strokeWidth: 3.2, roughness: 0.5 });
      z.linie(340, 280, 380, 280, { stroke: F.grau, strokeWidth: 2.2, roughness: 1 });
    });
    b.g({ cls: "s2-tropfen", o: [513, 247] }, () =>
      b.roh(`<path d="M513 243Q517 249 513 251Q509 249 513 243Z" fill="var(--gold-500)"/>`));
    b.g({ cls: "s2-kreis", o: [406, 188] }, () =>
      b.roh(`<ellipse cx="406" cy="188" rx="26" ry="46" stroke="var(--gold-500)" stroke-width="3" stroke-dasharray="7 6"/>`));
    figur(b, { id: "k2", x: 284, mund: "laecheln", vorn: { a1: 115, a2: 120 } });
    figur(b, {
      id: "h2", x: 142, helm: true, mund: "laecheln",
      hinten: { a1: 35, a2: 100, ding: klemmbrett("h2") }, vorn: { a1: 30, a2: 115, ding: stift },
    });
  });
  {
    const i = 1;
    const t0 = t(i, 0.02), dauer = 0.72, schritte = 8;
    a.spur("h2-fig", i, Array.from({ length: schritte + 1 }, (_, k) =>
      [t0 + (k * dauer) / schritte, tr(-110 + (110 * k) / schritte, k % 2 ? -4 : 0)] as KF), "linear");
    a.spur("h2-bl", i, takt(t0, t0 + dauer, dauer / 2, [[0, rot(0)], [0.25, rot(-24)], [0.5, rot(0)], [0.75, rot(24)], [1, rot(0)]]));
    a.spur("h2-br", i, takt(t0, t0 + dauer, dauer / 2, [[0, rot(0)], [0.25, rot(24)], [0.5, rot(0)], [0.75, rot(-24)], [1, rot(0)]]));
    a.spur("h2-kopf", i, takt(t(i, 0.82), t(i, 1.32), 0.25, [[0, rot(0)], [0.5, rot(13)], [1, rot(0)]]));
    a.spur("h2-av2", i, takt(t(i, 0.86), t(i, 1.5), 0.128, [[0, rot(0)], [0.5, rot(-12)], [1, rot(0)]]));
    [0, 1, 2].forEach((n) => a.spur(`h2-n${n}`, i, [[t(i, 0.95 + n * 0.17), op(0)], [t(i, 0.99 + n * 0.17), op(1)]]));
    a.spur("k2-av1", i, [
      [t(i, 0), rot(100)], [t(i, 0.42), rot(100)], [t(i, 0.6), rot(0)],
      [t(i, 0.68), rot(-6)], [t(i, 0.76), rot(0)], [t(i, 0.84), rot(-6)], [t(i, 0.92), rot(0)],
      [t(i, 1.08), rot(42)], [t(i, 1.16), rot(36)], [t(i, 1.24), rot(42)], [t(i, 1.32), rot(36)], [t(i, 1.4), rot(42)],
    ]);
    a.spur("s2-kreis", i, [[t(i, 0.62), `${sc(0)};${op(0)}`], [t(i, 0.76), `${sc(1.12)};${op(1)}`], [t(i, 0.84), `${sc(1)};${op(1)}`]]);
    a.spur("s2-tropfen", i, takt(t(i, 0), t(i, 1.6), 0.4, [
      [0, `${tr(0, 0)};${op(0)}`], [0.15, `${tr(0, 0)};${op(1)}`], [0.8, `${tr(0, 20)};${op(1)}`], [0.9, `${tr(0, 22)};${op(0)}`], [1, `${tr(0, 0)};${op(0)}`],
    ]));
  }

  /* 3 ── Angebot wandert zum Kunden, Unterschrift, goldener Haken – Zusage */
  szene(2, () => {
    figur(b, { id: "h3", x: 130, helm: true, mund: "laecheln", vorn: { a1: 60, a2: 80 } });
    figur(b, { id: "k3", x: 430, spiegeln: true, mund: "lachen", vorn: { a1: 60, a2: 80 }, hinten: { a1: -6, a2: -2 } });
    b.g({ tf: "translate(214 200)" }, () => b.g({ cls: "s3-doc", o: [0, 0] }, () => {
      b.zeichne((z) => {
        z.pfad("M-32 -42H18L32 -28V42H-32Z", { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3, roughness: 0.6 });
        z.pfad("M18 -42V-28H32", { strokeWidth: 2, roughness: 0.4 });
        z.text(-6, -24, "Angebot", { groesse: 11 });
        z.linie(-24, -10, 22, -10, { stroke: F.grau, strokeWidth: 2.2, roughness: 0.5 });
        z.linie(-24, -1, 16, -1, { stroke: F.grau, strokeWidth: 2.2, roughness: 0.5 });
        z.text(-14, 24, "€", { groesse: 24, farbe: F.goldDunkel });
      });
      b.g({ cls: "s3-unterschrift" }, () =>
        b.roh(`<path d="M-26 34q5-9 9-1t8-2 8 0" pathLength="1" stroke-dasharray="1 1" stroke="var(--anthrazit-800)" stroke-width="2.2"/>`));
      b.g({ cls: "s3-funken", o: [17, 22] }, () => b.zeichne((z) => {
        for (let k = 0; k < 8; k++) {
          const w = rad(k * 45 + 20);
          z.linie(17 + 20 * Math.sin(w), 22 - 20 * Math.cos(w), 17 + 28 * Math.sin(w), 22 - 28 * Math.cos(w), { stroke: F.gold, strokeWidth: 2.6, roughness: 0.3 });
        }
      }));
      b.g({ cls: "s3-stempel", o: [17, 22] }, () => b.zeichne((z) => {
        z.kreis(17, 22, 28, { fill: F.gold, fillStyle: "solid", strokeWidth: 2.2, roughness: 0.5 });
        z.pfad("M10 22l5 5l9-10", { strokeWidth: 3.2, roughness: 0.4 });
      }));
    }));
  });
  {
    const i = 2;
    a.spur("s3-doc", i, [
      [t(i, 0.1), "transform:translate(0px,0px) rotate(0deg)"],
      [t(i, 0.36), "transform:translate(66px,-46px) rotate(-10deg)"],
      [t(i, 0.6), "transform:translate(132px,0px) rotate(0deg)"],
    ]);
    a.spur("k3-av1", i, [[t(i, 0.3), rot(55)], [t(i, 0.44), rot(55)], [t(i, 0.58), rot(0)]]);
    a.spur("s3-unterschrift", i, [[t(i, 0.68), "stroke-dashoffset:1"], [t(i, 0.9), "stroke-dashoffset:0"]]);
    a.spur("s3-stempel", i, [[t(i, 0.92), `${sc(0)};${op(0)}`], [t(i, 1.04), `${sc(1.3)};${op(1)}`], [t(i, 1.12), `${sc(1)};${op(1)}`]]);
    a.spur("s3-funken", i, [[t(i, 1.0), `${sc(0.5)};${op(0)}`], [t(i, 1.08), `${sc(1)};${op(1)}`], [t(i, 1.3), `${sc(1.35)};${op(0)}`]]);
    a.spur("k3-ah1", i, [[t(i, 1.06), rot(0)], [t(i, 1.22), rot(-160)]]);
    a.spur("k3-ah2", i, [[t(i, 1.22), rot(0)], ...takt(t(i, 1.22), t(i, 1.58), 0.18, [[0, rot(0)], [0.5, rot(-22)], [1, rot(0)]])]);
    a.spur("h3-av1", i, [[t(i, 0.5), rot(0)], [t(i, 0.75), rot(62)]]);
    a.spur("h3-ah1", i, [[t(i, 1.1), rot(0)], [t(i, 1.26), rot(-150)]]);
    a.spur("h3-ah2", i, [[t(i, 1.1), rot(0)], ...takt(t(i, 1.26), t(i, 1.56), 0.15, [[0, rot(-10)], [0.5, rot(14)], [1, rot(-10)]])]);
  }

  /* 4 ── Zwei Handwerker bauen (Fliesen + Hammer), Kunde im Sessel trinkt Tee */
  const FL = { x: 92, y: 146, b: 44, h: 45 };
  szene(3, () => {
    b.zeichne((z) => {
      z.rechteck(FL.x, FL.y, FL.b * 4, FL.h * 4, { stroke: F.hell, strokeWidth: 2.4, roughness: 0.9 });
      for (let c = 1; c < 4; c++) z.linie(FL.x + c * FL.b, FL.y, FL.x + c * FL.b, BODEN, { stroke: F.hell, strokeWidth: 1.8, roughness: 0.8 });
      for (let r = 1; r < 4; r++) z.linie(FL.x, FL.y + r * FL.h, FL.x + 4 * FL.b, FL.y + r * FL.h, { stroke: F.hell, strokeWidth: 1.8, roughness: 0.8 });
      for (let c = 0; c < 4; c++)
        z.rechteck(FL.x + c * FL.b + 3, FL.y + 3 * FL.h + 3, FL.b - 6, FL.h - 6, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 2, roughness: 0.6 });
    });
    for (let n = 0; n < 12; n++) {
      const r = 2 - Math.floor(n / 4), c = n % 4;
      const x = FL.x + c * FL.b, y = FL.y + r * FL.h;
      b.g({ cls: `s4-f${n}`, o: [x + FL.b / 2, y + FL.h / 2] }, () =>
        b.zeichne((z) => z.rechteck(x + 3, y + 3, FL.b - 6, FL.h - 6, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 2, roughness: 0.6 })));
    }
    // Sägebock mit Brett
    b.zeichne((z) => {
      z.rechteck(342, 274, 86, 10, { fill: F.gold, fillStyle: "hachure", hachureGap: 4, fillWeight: 1.3, strokeWidth: 2.6, roughness: 0.6 });
      for (const [x1, x2] of [[354, 344], [354, 366], [416, 406], [416, 428]]) z.linie(x1, 284, x2, BODEN, { strokeWidth: 3 });
      z.linie(359, 266, 359, 274, { strokeWidth: 2.4, roughness: 0.2 });
    });
    b.g({ cls: "s4-funken", attr: 'opacity="0"' }, () => b.zeichne((z) => {
      for (const [x1, y1, x2, y2] of [[346, 262, 338, 254], [358, 256, 358, 246], [370, 262, 378, 254]])
        z.linie(x1, y1, x2, y2, { stroke: F.gold, strokeWidth: 3, roughness: 0.3 });
    }));
    figur(b, { id: "a4", x: 58, helm: true, mund: "laecheln", vorn: { a1: 70, a2: 75, ding: fliese } });
    figur(b, { id: "b4", x: 300, helm: true, mund: "laecheln", vorn: { a1: 20, a2: 60, ding: hammer }, hinten: { a1: 8, a2: 14 } });
    // Sessel
    b.zeichne((z) => {
      z.rundRechteck(512, 180, 42, 108, 14, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 5, fillWeight: 1.4, strokeWidth: 3, roughness: 0.8 });
      z.rundRechteck(446, 272, 108, 22, 8, { fill: F.goldHell, fillStyle: "solid", strokeWidth: 3, roughness: 0.7 });
      z.linie(456, 294, 452, BODEN, { strokeWidth: 3.2 });
      z.linie(544, 294, 548, BODEN, { strokeWidth: 3.2 });
    });
    figur(b, { id: "k4", x: 505, spiegeln: true, sitzen: true, mund: "laecheln", vorn: { a1: 15, a2: 80, ding: tasse("k4") }, hinten: { a1: 5, a2: 35 } });
  });
  {
    const i = 3;
    for (let n = 0; n < 12; n++) {
      const tn = t(i, 0.12 + n * 0.1);
      a.spur(`s4-f${n}`, i, [[tn, `${op(0)};${sc(0.3)}`], [tn + 0.07, `${op(1)};${sc(1)}`]]);
    }
    a.spur("a4-av1", i, takt(t(i, 0.05), t(i, 1.25), 0.2, [[0, rot(0)], [0.5, rot(-30)], [1, rot(0)]]));
    a.spur("a4-av2", i, takt(t(i, 0.05), t(i, 1.25), 0.2, [[0, rot(0)], [0.5, rot(10)], [1, rot(0)]]));
    const hz = (w1: number) => [[0, rot(0)], [0.5, rot(w1)], [0.82, rot(0)], [1, rot(0)]] as KF[];
    a.spur("b4-av1", i, takt(t(i, 0.04), t(i, 1.32), 0.32, hz(-62)));
    a.spur("b4-av2", i, takt(t(i, 0.04), t(i, 1.32), 0.32, hz(-78)));
    a.spur("s4-funken", i, takt(t(i, 0.04), t(i, 1.32), 0.32, [[0, op(0)], [0.8, op(0)], [0.84, op(1)], [0.98, op(0)], [1, op(0)]]));
    // Tasse zum Mund und wieder runter (Tasse bleibt dabei aufrecht)
    const trink = (w: number): KF[] => [[t(i, 0.1), rot(0)], [t(i, 0.45), rot(w)], [t(i, 0.6), rot(w)], [t(i, 0.68), rot(w * 1.04)], [t(i, 0.88), rot(w)], [t(i, 1.2), rot(0)]];
    a.spur("k4-av1", i, trink(-70));
    a.spur("k4-av2", i, trink(-62));
    a.spur("k4-tasse", i, trink(108));
    a.spur("k4-d0", i, takt(t(i, 0), t(i, 1.6), 0.4, [[0, `${tr(0, 0)};${op(0)}`], [0.3, `${tr(0, -4)};${op(1)}`], [1, `${tr(0, -14)};${op(0)}`]]));
    a.spur("k4-d1", i, takt(t(i, 0.2), t(i, 1.4), 0.4, [[0, `${tr(0, 0)};${op(0)}`], [0.3, `${tr(0, -4)};${op(1)}`], [1, `${tr(0, -14)};${op(0)}`]]));
  }

  /* 5 ── Neues Bad glänzt, Kunde springt vor Freude, Handwerker winken */
  szene(4, () => {
    b.zeichne((z) => {
      z.rechteck(335, 132, 213, 194, { fill: F.goldHell, fillStyle: "hachure", hachureGap: 9, fillWeight: 1.2, strokeWidth: 2.6, roughness: 0.7 });
      for (let x = 377; x < 548; x += 43) z.linie(x, 132, x, BODEN, { stroke: F.gold, strokeWidth: 1.8, roughness: 0.4 });
      for (let y = 171; y < BODEN; y += 39) z.linie(335, y, 548, y, { stroke: F.gold, strokeWidth: 1.8, roughness: 0.4 });
      // Spiegel
      z.ellipse(440, 186, 74, 58, { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3, roughness: 0.6 });
      z.linie(420, 196, 438, 170, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.3 });
      z.linie(430, 202, 446, 180, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.3 });
      // neue Wanne
      z.pfad("M345 262H540V280Q540 318 505 318H380Q345 318 345 280Z", { fill: "var(--weiss)", fillStyle: "solid", strokeWidth: 3.2, roughness: 0.6 });
      z.linie(360, 272, 420, 272, { stroke: F.gold, strokeWidth: 2.4, roughness: 0.4 });
      z.pfad("M530 262V242Q530 234 520 234H510", { strokeWidth: 3.2, roughness: 0.4 });
      z.linie(366, 318, 364, BODEN, { strokeWidth: 3 });
      z.linie(520, 318, 522, BODEN, { strokeWidth: 3 });
    });
    [[362, 148, 12], [528, 152, 14], [392, 236, 10], [500, 224, 11]].forEach(([x, y, r], n) =>
      b.g({ cls: `s5-g${n}`, o: [x, y] }, () => b.roh(`<path d="${glanz(x, y, r)}" fill="var(--gold-500)"/>`)));
    figur(b, { id: "a5", x: 60, helm: true, mund: "lachen", vorn: { a1: 120, a2: 155 } });
    figur(b, { id: "b5", x: 152, helm: true, mund: "lachen", vorn: { a1: 120, a2: 155 } });
    figur(b, { id: "k5", x: 262, spiegeln: true, mund: "lachen", vorn: { a1: 120, a2: 155 }, hinten: { a1: -120, a2: -155 } });
    [0, 1, 2, 3, 4].forEach((n) => {
      const x = 202 + n * 30, y = 98;
      b.g({ cls: `s5-st${n}`, o: [x, y] }, () => b.zeichne((z) => z.pfad(stern(x, y, 12), { fill: F.gold, fillStyle: "solid", stroke: F.goldDunkel, strokeWidth: 1.8, roughness: 0.4 })));
    });
  });
  {
    const i = 4;
    const winken = (start: number): KF[] => takt(t(i, start), t(i, start + 1.32), 0.33, [[0, rot(-18)], [0.5, rot(18)], [1, rot(-18)]]);
    a.spur("a5-av2", i, winken(0.08));
    a.spur("b5-av2", i, winken(0.16));
    a.spur("k5-av2", i, winken(0.1));
    a.spur("k5-ah2", i, winken(0.26));
    a.spur("k5-fig", i, [[t(i, 0.15), tr(0, 0)], [t(i, 0.4), tr(0, -18)], [t(i, 0.62), tr(0, 0)], [t(i, 0.85), tr(0, -18)], [t(i, 1.08), tr(0, 0)]]);
    [0, 1, 2, 3].forEach((n) => a.spur(`s5-g${n}`, i, takt(t(i, 0.05 + n * 0.14), t(i, 1.5), 0.6, [
      [0, `transform:scale(0) rotate(0deg);${op(0)}`], [0.5, `transform:scale(1.15) rotate(45deg);${op(1)}`], [1, `transform:scale(0) rotate(90deg);${op(0)}`],
    ])));
    [0, 1, 2, 3, 4].forEach((n) => a.spur(`s5-st${n}`, i, [[t(i, 0.2 + n * 0.1), `${sc(0)};${op(0)}`], [t(i, 0.3 + n * 0.1), `${sc(1.3)};${op(1)}`], [t(i, 0.38 + n * 0.1), `${sc(1)};${op(1)}`]]));
  }

  const svg =
    `<svg class="story__svg" viewBox="0 ${OBEN} ${STORY_BREITE} ${STORY_HOEHE}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">` +
    svgTeile(b.wurzel) + `</svg>`;
  return { svg, css: a.regeln.join("") };
}
