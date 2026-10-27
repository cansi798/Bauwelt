// Fertiges SVG einer handgezeichneten Szene (aus src/data/szenen.ts) – gemeinsam genutzt von
// RoughSzene.astro (eingebettet) und src/pages/szenen/[datei].svg.ts (eigene Datei zum Nachladen).
// Gesamt-Audit 20.10.2026 P1 (Jamil, Talk 2787): Die Szenen machten die Startseite ca. 490 KB
// schwer (Lighthouse mobil 72). Seitdem liegen sie als eigene Dateien unter /szenen/ und werden erst
// kurz vor dem Sichtbarwerden geladen – Aussehen und Zeichen-Animation bleiben gleich.
import { SZENEN, type Ansicht, type SzenenName } from "../data/szenen";
import type { Element, Szene } from "./rough-szene";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const n = (x: number) => Math.round(x * 100) / 100;
/** Ziel-Gesamtdauer einer Szene in Sekunden (Audit 3.1; Kundenwunsch 19.10.2026: 2 s statt 1,5 s). */
const ZIEL_DAUER = 2;
export const ANSICHTEN: Ansicht[] = ["mobil", "desktop"];
/** „beide“ = Szene sieht auf Handy und Desktop gleich aus → nur EINE Datei/ein SVG (z. B. USP-Bilder, Karriere-Gesichter). */
export type Fassung = Ansicht | "beide";
const einheitlichCache = new Map<SzenenName, boolean>();
export function istEinheitlich(name: SzenenName): boolean {
  if (!einheitlichCache.has(name)) einheitlichCache.set(name, JSON.stringify(SZENEN[name]("mobil")) === JSON.stringify(SZENEN[name]("desktop")));
  return einheitlichCache.get(name)!;
}
/** Die Fassungen, die es von einer Szene gibt. */
export const fassungen = (name: SzenenName): Fassung[] => (istEinheitlich(name) ? ["beide"] : ANSICHTEN);
const ansichtVon = (f: Fassung): Ansicht => (f === "beide" ? "desktop" : f);

function el(e: Element, f: number): string {
  switch (e.art) {
    case "strich":
      return `<path class="rs-s" pathLength="1" d="${e.d}" stroke="${e.farbe}" stroke-width="${e.breite}" style="--t:${n(e.t * f)}s;--d:${n(Math.max(0.12, e.dauer * f))}s"/>`;
    case "flaeche":
      return e.breite > 0
        ? `<path class="rs-f" d="${e.d}" stroke="${e.farbe}" stroke-width="${e.breite}" style="--t:${n(e.t * f)}s"/>`
        : `<path class="rs-f" d="${e.d}" fill="${e.farbe}" stroke="none" style="--t:${n(e.t * f)}s"/>`;
    case "text":
      return `<text class="rs-x${e.beschriftung ? " rs-xb" : ""}" style="--t:${n(e.t * f)}s" x="${n(e.x)}" y="${n(e.y)}" text-anchor="${e.anker}" font-size="${e.groesse}" font-weight="${e.gewicht}" fill="${e.farbe}">${esc(e.text)}</text>`;
    case "gruppe":
      if (e.effekt === "fluss") return fluss(e.kinder, f);
      return `<g class="rs-g rs-g--${e.effekt}" style="--t:${n(e.t * f)}s">${e.kinder.map((k) => el(k, f)).join("")}</g>`;
  }
}

/** Goldene Verbindungslinie (Kundenwunsch 19.10.2026, 2. Sprachnachricht Jamil): Die Linie ist
 *  von Anfang an GESTRICHELT und fließt ständig. Gezeichnet wird sie über eine Maske: Ein
 *  unsichtbarer Maskenstrich läuft wie bisher an (rs-zeichnen) und gibt die gestrichelte Linie frei. */
let maskeNr = 0;
const maskePrefix = Math.random().toString(36).slice(2, 7);
function fluss(kinder: Element[], f: number): string {
  const id = `rsm-${maskePrefix}-${++maskeNr}`;
  const striche = kinder.filter((k): k is Extract<Element, { art: "strich" }> => k.art === "strich");
  const maske = striche
    .map((k) => `<path class="rs-s" pathLength="1" d="${k.d}" stroke="#fff" stroke-width="${k.breite + 8}" style="--t:${n(k.t * f)}s;--d:${n(Math.max(0.12, k.dauer * f))}s"/>`)
    .join("");
  const linie = striche
    .map((k) => `<path class="rs-fl" pathLength="1" d="${k.d}" stroke="${k.farbe}" stroke-width="${k.breite}"/>`)
    .join("");
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="-5000" y="-5000" width="10000" height="10000">${maske}</mask>` +
    `<g class="rs-g rs-g--fluss" mask="url(#${id})">${linie}</g>`;
}

/** Farben/Schrift für die eigenständige Datei (Anzeige als <img> ohne JavaScript). Beim Einbetten
 *  per Skript wird dieser Block entfernt – dann gelten die Farben der Seite (global.css). */
const DATEI_STIL =
  "<style data-datei=\"\">svg{--anthrazit-800:#2D2C2E;--anthrazit-600:#6B6A6D;--anthrazit-400:#A3A2A5;" +
  "--anthrazit-200:#D6D5D7;--gold-700:#8C7345;--gold-500:#C3A56F;--gold-300:#D9C5A0;--weiss:#FFFFFF}" +
  "text{font-family:Montserrat,Arial,sans-serif;stroke:none}</style>";

export function szeneMasse(name: SzenenName, a: Fassung): { breite: number; hoehe: number } {
  const sz = SZENEN[name](ansichtVon(a));
  return { breite: sz.breite, hoehe: sz.hoehe };
}

/** SVG-Markup einer Szene. `datei` = eigenständige .svg-Datei (mit xmlns + Farbblock). */
export function szeneSvg(name: SzenenName, a: Fassung, datei = false): string {
  const sz: Szene = SZENEN[name](ansichtVon(a));
  const ziel = sz.zielDauer ?? ZIEL_DAUER;
  const f = sz.ende > ziel ? ziel / sz.ende : 1;
  const kopf = datei ? ` xmlns="http://www.w3.org/2000/svg" width="${sz.breite}" height="${sz.hoehe}"` : "";
  return `<svg${kopf} class="rszene__svg${a === "beide" ? "" : ` rszene__svg--${a}`}" viewBox="0 0 ${sz.breite} ${sz.hoehe}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="--ende:${n(sz.ende * f)}s">` +
    (datei ? DATEI_STIL : "") + sz.elemente.map((e) => el(e, f)).join("") + "</svg>";
}
