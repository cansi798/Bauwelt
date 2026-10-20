// Kleine Zeichen-Bibliothek für die rough.js-Szenen (ersetzt die Erklärvideos).
// rough.js läuft NUR beim Build: `rough.generator()` braucht kein DOM und liefert
// fertige SVG-Pfade. Im Browser landet also kein rough.js – nur statisches SVG,
// das per CSS „von Hand" gezeichnet wird (siehe RoughSzene.astro).
import rough from "roughjs";
import type { Drawable, Options } from "roughjs/bin/core";

const gen = rough.generator();

/** Ein einzelner Strich/eine Fläche im fertigen SVG. */
export type Element =
  | { art: "strich"; d: string; farbe: string; breite: number; t: number; dauer: number }
  | { art: "flaeche"; d: string; farbe: string; breite: number; t: number }
  | {
      art: "text"; x: number; y: number; text: string; t: number;
      groesse: number; gewicht: number; farbe: string; anker: "start" | "middle" | "end";
      /** Beschriftung (Titel/Unterzeile) steht sofort; sonst gehört der Text zur Zeichnung
       *  (z. B. „12h“ im Siegel, Schritt-Nummer) und erscheint erst mit ihr (Fix 19.10.2026). */
      beschriftung?: boolean;
    }
  /** Gruppe mit „Stempel"-Effekt (kurzes Aufploppen) oder Dauer-Puls; „dreh“ (goldener Ring dreht
   *  sich nach dem Zeichnen ständig) und „fluss“ (goldene Verbindungslinie fließt ständig) –
   *  Kundenwunsch 19.10.2026 (Sprachnachricht Jamil). */
  | { art: "gruppe"; effekt: Effekt; t: number; kinder: Element[] };
/** Lebens-Effekte der Karriere-Gesichter (Jamil 21.10.2026, Msg 2863): „zwinkern“ (Auge klappt kurz zu),
 *  „laecheln“ (Mund wird kurz breiter), „nicken“ (Kopf nickt zweimal), „huepfen“ (Bommel wippt).
 *  Laufen genau einmal ab `t`, danach Ruhezustand = normale Zeichnung. */
export type Effekt = "stempel" | "puls" | "dreh" | "fluss" | "zwinkern" | "laecheln" | "nicken" | "huepfen";

export interface Szene {
  breite: number;
  hoehe: number;
  /** Zusätzliche Standzeit in ms nach dem Zeichnen (z. B. Über-uns-Siegel, Kundenwunsch 15.10.2026 (65)). */
  halten?: number;
  elemente: Element[];
  /** Zeitpunkt (s), zu dem alles steht – für den „nochmal"-Knopf. */
  ende: number;
  /** Eigene Ziel-Gesamtdauer in s (Standard 2 s, Audit 3.1) – z. B. Karriere-Gesichter mit
   *  Lebens-Effekten nach dem Zeichnen (Jamil 21.10.2026, Msg 2863). */
  zielDauer?: number;
}

// CI-Farben als CSS-Variablen (wirken auch als SVG-Präsentationsattribut).
export const F = {
  strich: "var(--anthrazit-800)",
  grau: "var(--anthrazit-400)",
  /** Unterzeilen – dunkel genug für WCAG-Kontrast auf Weiß und Sand */
  text2: "var(--anthrazit-600)",
  hell: "var(--anthrazit-200)",
  gold: "var(--gold-500)",
  goldHell: "var(--gold-300)",
  goldDunkel: "var(--gold-700)",
};

/**
 * Zeichner: sammelt Elemente mit Startzeit. `bei(t)` setzt die Uhr, alle
 * folgenden Formen starten dort. Fester Seed → jede Linie sieht bei jedem
 * Build gleich aus (kein „Zittern" zwischen Deploys).
 */
export class Zeichner {
  elemente: Element[] = [];
  private uhr = 0;
  private seed = 7;
  private ziel: Element[] = this.elemente;

  bei(t: number) { this.uhr = t; return this; }
  get jetzt() { return this.uhr; }

  private opt(o: Options = {}): Options {
    return { roughness: 1.1, bowing: 1.2, strokeWidth: 2.4, stroke: F.strich, seed: this.seed++, ...o };
  }

  /** Wandelt ein rough-Drawable in einzelne, nacheinander gezeichnete Striche. */
  private aufnehmen(dr: Drawable, dauer: number) {
    const o = dr.options;
    for (const set of dr.sets) {
      const d = gen.opsToPath(set, 1); // 1 Nachkommastelle reicht, hält das HTML schlank
      if (set.type === "fillPath") {
        // Vollfläche (fillStyle "solid") – blendet ein, sobald der Umriss halb steht
        this.ziel.push({ art: "flaeche", d, farbe: o.fill!, breite: 0, t: this.uhr + dauer * 0.5 });
      } else if (set.type === "fillSketch") {
        // Schraffur – als Ganzes einblenden (hunderte Mini-Striche einzeln wären zu unruhig)
        const breite = o.fillWeight && o.fillWeight > 0 ? o.fillWeight : o.strokeWidth / 2;
        this.ziel.push({ art: "flaeche", d, farbe: o.fill!, breite, t: this.uhr + dauer * 0.5 });
      } else {
        // Umriss: rough zeichnet jede Kante doppelt (mehrere M…-Teilpfade). Einzeln
        // ausgeben, damit jeder Teilpfad mit pathLength=1 sauber „anläuft".
        d.split(/(?=M)/).map((s) => s.trim()).filter(Boolean).forEach((teil, i) =>
          this.ziel.push({ art: "strich", d: teil, farbe: o.stroke, breite: o.strokeWidth, t: this.uhr + (i % 2) * dauer * 0.25, dauer })
        );
      }
    }
    return this;
  }

  linie(x1: number, y1: number, x2: number, y2: number, o?: Options, dauer = 0.5) {
    return this.aufnehmen(gen.line(x1, y1, x2, y2, this.opt(o)), dauer);
  }
  rechteck(x: number, y: number, b: number, h: number, o?: Options, dauer = 0.7) {
    return this.aufnehmen(gen.rectangle(x, y, b, h, this.opt(o)), dauer);
  }
  kreis(cx: number, cy: number, d: number, o?: Options, dauer = 0.7) {
    return this.aufnehmen(gen.circle(cx, cy, d, this.opt(o)), dauer);
  }
  ellipse(cx: number, cy: number, b: number, h: number, o?: Options, dauer = 0.7) {
    return this.aufnehmen(gen.ellipse(cx, cy, b, h, this.opt(o)), dauer);
  }
  pfad(d: string, o?: Options, dauer = 0.7) {
    return this.aufnehmen(gen.path(d, this.opt(o)), dauer);
  }
  kurve(punkte: [number, number][], o?: Options, dauer = 1) {
    return this.aufnehmen(gen.curve(punkte, this.opt(o)), dauer);
  }
  /** Abgerundetes Rechteck (rough kennt keins) als Pfad. */
  rundRechteck(x: number, y: number, b: number, h: number, r: number, o?: Options, dauer = 0.8) {
    const d = `M${x + r} ${y}H${x + b - r}Q${x + b} ${y} ${x + b} ${y + r}V${y + h - r}` +
      `Q${x + b} ${y + h} ${x + b - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}` +
      `V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
    return this.pfad(d, o, dauer);
  }
  text(x: number, y: number, text: string, o: Partial<{ groesse: number; gewicht: number; farbe: string; anker: "start" | "middle" | "end"; beschriftung: boolean }> = {}) {
    this.ziel.push({
      art: "text", x, y, text, t: this.uhr,
      groesse: o.groesse ?? 16, gewicht: o.gewicht ?? 700, farbe: o.farbe ?? F.strich, anker: o.anker ?? "middle",
      beschriftung: o.beschriftung ?? false,
    });
    return this;
  }
  /** Alles in `fn` Gezeichnete als eigene Liste zurückgeben (für einzeln animierte Teile, StoryAnimation). */
  sammeln(fn: () => void): Element[] {
    const kinder: Element[] = [];
    const vorher = this.ziel;
    this.ziel = kinder;
    fn();
    this.ziel = vorher;
    return kinder;
  }
  /** Alles in `fn` Gezeichnete bekommt einen Stempel- oder Puls-Effekt. `t` = Start des Effekts
   *  (Standard: Uhrzeit nach `fn`). */
  gruppe(effekt: Effekt, fn: () => void, t?: number) {
    const kinder: Element[] = [];
    const vorher = this.ziel;
    this.ziel = kinder;
    fn();
    this.ziel = vorher;
    this.ziel.push({ art: "gruppe", effekt, t: t ?? this.uhr, kinder });
    return this;
  }
}
