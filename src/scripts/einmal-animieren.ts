// Kundenwunsch 17.10.2026 (81): Alle Animationen laufen genau EINMAL – beim ersten
// Sichtbarwerden (≥ 25 % im Bild; was beim Laden schon zu sehen ist, startet sofort).
// Danach bleibt der Endzustand stehen; Weg- und Zurückscrollen startet nichts neu.
// Erst ein Neuladen der Seite spielt alles wieder ab (bewusst kein local/sessionStorage).
//
// Markiert werden Elemente mit `.reveal` (Einblenden per Transition) oder `[data-einmal]`
// (CSS-Animationen darin). Sie bekommen einmalig die Klasse `is-sichtbar`; global.css
// hält alle Animationen in `[data-einmal]` bis dahin pausiert (Endzustand per `forwards`).
// Ohne JS fehlt `html.js` → alles läuft/steht wie reines CSS (Progressive Enhancement).

const ANTEIL = 0.25;
// Feine Schwellen, damit auch sehr hohe Elemente (höher als 4 Bildschirme) auslösen:
// dann reicht es, wenn sie ein Viertel des Bildschirms füllen.
const SCHWELLEN = Array.from({ length: 21 }, (_, i) => i / 20);

const ziele = document.querySelectorAll<HTMLElement>(".reveal, [data-einmal]");

// Sobald alle Animationen eines [data-einmal]-Elements durch sind, bekommt es zusätzlich
// „is-fertig“: Komponenten können dann auf ein ruhiges Endbild ohne Animation umschalten
// (z. B. Orts-Band ohne Kopie; Szene springt beim Drehen des Handys nicht neu an).
function sichtbar(el: HTMLElement) {
  el.classList.add("is-sichtbar");
  if (!el.hasAttribute("data-einmal")) return;
  // Nachgeladene Zeichnung (RoughSzene, Gesamt-Audit 20.10.2026 P1) noch nicht da → erst nach dem
  // Einsetzen prüfen, sonst gälte die Szene ohne Animationen sofort als „fertig“.
  if (el.hasAttribute("data-rszene") && !el.hasAttribute("data-geladen")) {
    el.addEventListener("rszene:geladen", () => fertigMelden(el), { once: true });
    return;
  }
  fertigMelden(el);
}

function fertigMelden(el: HTMLElement) {
  // erzwingt Style-Berechnung → neue CSS-Animationen sind dabei; Dauer-Animationen (infinite,
  // z. B. drehende Siegel-Ringe, Kundenwunsch 19.10.2026) enden nie und zählen daher nicht mit
  const laufend = el.getAnimations({ subtree: true }).filter((a) => a.effect?.getTiming().iterations !== Infinity);
  Promise.allSettled(laufend.map((a) => a.finished)).then(() => el.classList.add("is-fertig"));
}

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
  ziele.forEach((el) => io.observe(el));
}
