// Kundenwunsch 17.10.2026 (81): Alle Animationen laufen genau EINMAL – beim ersten
// Sichtbarwerden (≥ 25 % im Bild; was beim Laden schon zu sehen ist, startet sofort).
// Danach bleibt der Endzustand stehen; Weg- und Zurückscrollen startet nichts neu.
// Erst ein Neuladen der Seite spielt alles wieder ab (bewusst kein local/sessionStorage).
//
// Markiert werden Elemente mit `.reveal` (Einblenden per Transition) oder `[data-einmal]`
// (CSS-Animationen darin). Sie bekommen einmalig die Klasse `is-sichtbar`; global.css
// hält alle Animationen in `[data-einmal]` bis dahin pausiert (Endzustand per `forwards`).
// Ohne JS fehlt `html.js` → alles läuft/steht wie reines CSS (Progressive Enhancement).
//
// Scroll-Kopplung der Zeichnungen (Can 29.10.2026, Talk 3764): Die RoughSzene-Zeichnungen
// zeichnen sich nicht mehr nach Uhr, sondern mit dem Scrollen – Strich für Strich, so weit,
// wie die Zeichnung ins Bild gekommen ist. Regeln:
// - nur vorwärts („Sperrklinke“): Zurückscrollen radiert nichts weg und startet nichts neu
//   (Kundenwunsch 81 bleibt erfüllt); fertig ist fertig.
// - nie schneller als die bisherige Uhr-Fassung (ca. 2 s bzw. 1,5 s, Jamil 19./21.10.):
//   wer schnell scrollt oder die Zeichnung beim Laden schon sieht, bekommt genau den alten Ablauf.
// - weich: der Fortschritt läuft dem Scroll-Ziel gedämpft hinterher (kein Ruckeln bei Mausrad-Stufen).
// - es werden nur die vorhandenen CSS-Animationen vor- und zurückgestellt (stroke-dashoffset,
//   opacity, transform) – keine neue Animation, kein Layout pro Bild.
// - „Bewegung reduzieren“: keine Animationen vorhanden → nichts zu tun, fertiges Bild steht.

const ANTEIL = 0.25;
// Feine Schwellen, damit auch sehr hohe Elemente (höher als 4 Bildschirme) auslösen:
// dann reicht es, wenn sie ein Viertel des Bildschirms füllen.
const SCHWELLEN = Array.from({ length: 21 }, (_, i) => i / 20);

const ziele = document.querySelectorAll<HTMLElement>(".reveal, [data-einmal]");
const ruhig = matchMedia("(prefers-reduced-motion: reduce)");

// Sobald alle Animationen eines [data-einmal]-Elements durch sind, bekommt es zusätzlich
// „is-fertig“: Komponenten können dann auf ein ruhiges Endbild ohne Animation umschalten
// (z. B. Orts-Band ohne Kopie; Szene springt beim Drehen des Handys nicht neu an).
function sichtbar(el: HTMLElement) {
  el.classList.add("is-sichtbar");
  if (!el.hasAttribute("data-einmal")) return;
  // Nachgeladene Zeichnung (RoughSzene, Gesamt-Audit 20.10.2026 P1) noch nicht da → erst nach dem
  // Einsetzen prüfen, sonst gälte die Szene ohne Animationen sofort als „fertig“.
  if (el.hasAttribute("data-rszene") && !el.hasAttribute("data-geladen")) {
    el.addEventListener("rszene:geladen", () => nachDemBild(el), { once: true });
    return;
  }
  nachDemBild(el);
}

// Animationen erst NACH dem nächsten gezeichneten Bild abfragen: dann sind die Stile ohnehin
// berechnet. Vorher erzwang getAnimations() mitten im Scrollen eine Neuberechnung aller
// Striche (bis 75 ms Hänger, Performance-Messung 29.10.2026).
function nachDemBild(el: HTMLElement) {
  requestAnimationFrame(() => setTimeout(() => {
    if (el.hasAttribute("data-rszene")) scrollKoppeln(el);
    fertigMelden(el);
  }));
}

function fertigMelden(el: HTMLElement) {
  // Dauer-Animationen (infinite, z. B. drehende Siegel-Ringe, Kundenwunsch 19.10.2026) enden nie
  // und zählen daher nicht mit
  const laufend = el.getAnimations({ subtree: true }).filter((a) => a.effect?.getTiming().iterations !== Infinity);
  Promise.allSettled(laufend.map((a) => a.finished)).then(() => el.classList.add("is-fertig"));
}

// ---------- Scroll-Kopplung der Zeichnungen ----------

interface Strich { a: Animation; start: number; ende: number; fertig: boolean }
interface Szene {
  el: HTMLElement;
  bild: HTMLElement;
  striche: Strich[];      // nach Start sortiert
  nachlauf: Animation[];  // Puls/Drehen: laufen erst, wenn die Zeichnung fertig ist
  dauer: number;          // ms bis zum letzten Strich
  zeit: number;           // aktueller Stand (ms)
  ziel: number;           // Stand laut Scroll-Position (ms, nur steigend)
}
const NACHLAUF = new Set(["rs-puls", "rs-dreh"]);
const TEMPO = 1; // höchstens Echtzeit – nie schneller als die Uhr-Fassung
const aktiv = new Set<Szene>();
let schleife = 0;
let letzte = 0;

function scrollKoppeln(el: HTMLElement) {
  if (ruhig.matches) return;
  const bild = el.querySelector<HTMLElement>(".rszene__bild") ?? el;
  const striche: Strich[] = [];
  const nachlauf: Animation[] = [];
  for (const a of el.getAnimations({ subtree: true })) {
    const name = (a as CSSAnimation).animationName ?? "";
    const t = a.effect?.getComputedTiming();
    if (!t) continue;
    if (NACHLAUF.has(name)) { a.pause(); nachlauf.push(a); continue; }
    if (t.iterations === Infinity) continue; // „fließende“ Linien laufen einfach weiter
    const start = Number(a.effect!.getTiming().delay ?? 0);
    const ende = Number(t.endTime ?? 0);
    a.pause();
    a.currentTime = 0;
    striche.push({ a, start, ende, fertig: false });
  }
  if (!striche.length) { nachlauf.forEach((a) => a.play()); return; }
  striche.sort((x, y) => x.start - y.start);
  const sz: Szene = { el, bild, striche, nachlauf, dauer: Math.max(...striche.map((s) => s.ende)), zeit: 0, ziel: 0 };
  aktiv.add(sz);
  anstossen();
}

// Wie weit ist die Zeichnung im Bild? 0 = gerade 15 % sichtbar, 1 = ganz im Bild
// (Unterkante 10 % über dem unteren Rand). Sehr hohe Zeichnungen (Handy): fertig, wenn
// die Unterkante im unteren Zehntel ankommt.
function fortschritt(bild: HTMLElement): number {
  const r = bild.getBoundingClientRect();
  const vh = innerHeight;
  const gesehen = vh - r.top;
  const von = 0.15 * Math.min(r.height, vh);
  const bis = r.height + 0.1 * vh;
  return Math.min(1, Math.max(0, (gesehen - von) / Math.max(1, bis - von)));
}

function anstossen() {
  if (!schleife && aktiv.size) { letzte = performance.now(); schleife = requestAnimationFrame(bild); }
}

function bild(jetzt: number) {
  const dt = Math.min(64, jetzt - letzte); // nach Tab-Wechsel nicht springen
  letzte = jetzt;
  for (const sz of aktiv) {
    sz.ziel = Math.max(sz.ziel, fortschritt(sz.bild) * sz.dauer); // Sperrklinke: nur vorwärts
    const rest = sz.ziel - sz.zeit;
    if (rest > 0.5) {
      // gedämpft nachlaufen, aber höchstens in Echtzeit
      sz.zeit += Math.min(rest * Math.min(1, dt / 120), dt * TEMPO, rest);
      if (sz.ziel >= sz.dauer && sz.dauer - sz.zeit < 40) sz.zeit = sz.dauer; // sauber abschließen
      stellen(sz);
    }
    if (sz.zeit >= sz.dauer) abschliessen(sz);
  }
  schleife = 0;
  // weiterlaufen, solange eine Zeichnung noch ihrem Ziel hinterherläuft; sonst warten aufs Scrollen
  if ([...aktiv].some((sz) => sz.ziel - sz.zeit > 0.5)) anstossen();
}

function stellen(sz: Szene) {
  // nur Striche anfassen, die gerade laufen oder gerade fertig werden – fertige bleiben stehen,
  // noch nicht begonnene stehen schon im Anfangszustand (spart Arbeit bei 400 Strichen)
  for (const s of sz.striche) {
    if (s.start > sz.zeit) break;
    if (s.fertig) continue;
    if (sz.zeit >= s.ende) { s.a.currentTime = s.ende; s.fertig = true; }
    else s.a.currentTime = sz.zeit;
  }
}

function abschliessen(sz: Szene) {
  aktiv.delete(sz);
  for (const s of sz.striche) s.a.finish(); // löst „finished“ aus → is-fertig wie bisher
  for (const a of sz.nachlauf) {
    // Puls beginnt wie bisher 0,4 s nach dem letzten Strich, Drehen sofort
    const verzug = Number(a.effect?.getTiming().delay ?? 0);
    a.currentTime = Math.max(0, verzug - ((a as CSSAnimation).animationName === "rs-puls" ? 400 : 0));
    a.play();
  }
}

addEventListener("scroll", anstossen, { passive: true });
addEventListener("resize", anstossen, { passive: true });

// ---------- Auslöser ----------

if (!("IntersectionObserver" in window)) {
  ziele.forEach(sichtbar);
} else if (ziele.length) {
  const io = new IntersectionObserver(
    (eintraege) => {
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        const hoch = e.rootBounds ? e.rootBounds.height : innerHeight;
        if (e.intersectionRatio >= ANTEIL || e.intersectionRect.height >= hoch * ANTEIL) {
          sichtbar(e.target as HTMLElement);
          io.unobserve(e.target); // genau einmal
        }
      }
    },
    { threshold: SCHWELLEN }
  );
  // Zeichnungen schon kurz vor dem Bildrand vorbereiten: Sie stehen dann auf „Strich 0“ und
  // zeichnen sich mit dem Hereinscrollen – die teure Vorbereitung passiert, bevor man hinsieht.
  const vorab = new IntersectionObserver(
    (eintraege) => {
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        vorab.unobserve(e.target);
        io.unobserve(e.target);
        sichtbar(e.target as HTMLElement);
      }
    },
    { rootMargin: "0px 0px 200px 0px" }
  );
  ziele.forEach((el) => (el.hasAttribute("data-rszene") && !ruhig.matches ? vorab : io).observe(el));
}
