// Rechner-Test (Fliesen-Spanne +600 €, Randfälle). Aufruf: node scripts/test-rechner.mjs (nach npm ci)
import { createServer } from "vite";
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { GEWERKE, berechne, preisText } = await vite.ssrLoadModule("/src/data/rechner.ts");
let fehler = 0;
const ok = (c, m) => { if (!c) { fehler++; console.log("FEHLER:", m); } };
const f = GEWERKE.find((g) => g.slug === "fliesen-boden");
for (const t of f.tiers) for (const menge of [0, 1, 5, 25, 200, 100000]) {
  const e = berechne(f, menge, t.id);
  const basis = Math.round((f.grund + menge * f.proEinheit[t.id]) * 1.19);
  ok(e.art === "spanne", `Fliesen ${t.id} ${menge}: keine Spanne`);
  ok(e.von === basis, `Fliesen ${t.id} ${menge}: von ${e.von} != ${basis}`);
  ok(e.bis === e.von + 600, `Fliesen ${t.id} ${menge}: bis ${e.bis} != von+600`);
  ok(/^[\d.]+ – [\d.]+ €$/.test(preisText(e)), `Format ${preisText(e)}`);
}
ok(berechne(f, 25, "komfort").von === Math.round((500 + 25 * 75) * 1.19), "ca.-Preis 25 m² Fliesen");
// Innenausbau: 150 € pro m² Fläche, keine Auswahl, Spanne bis + 800 € (Jamil 27.10.2026, Talk 3441 + 3478)
const ia = GEWERKE.find((g) => g.slug === "innenausbau");
ok(ia.ohneAuswahl === true && ia.tiers.length === 1, "Innenausbau ohne Auswahl");
ok(Boolean(ia.mengeHinweis), "Innenausbau mit Hilfetext zur Fläche");
for (const menge of [0, 1, 5, 25, 200, 100000]) {
  const e = berechne(ia, menge, ia.tiers[0].id);
  ok(e.art === "spanne" && e.von === menge * 150 && e.bis === menge * 150 + 800, `Innenausbau ${menge} m²: ${JSON.stringify(e)}`);
}
ok(preisText(berechne(ia, 20, "standard")) === "3.000 – 3.800 €", "20 m² = 3.000 – 3.800 €");
ok(preisText(berechne(ia, 40, "standard")) === "6.000 – 6.800 €", "40 m² = 6.000 – 6.800 €");
// Fußbodenleisten nur bei Fliesen & Boden (Talk 3478 C), Bad/Komplett: Möbel ausdrücklich nicht enthalten (D)
for (const g of GEWERKE) {
  const hatLeisten = JSON.stringify(g.bausteine).includes("leisten");
  ok(hatLeisten === (g.slug === "fliesen-boden"), `Fußbodenleisten bei ${g.slug}: ${hatLeisten}`);
}
for (const slug of ["badsanierung", "sanierung-modernisierung"]) ok(GEWERKE.find((g) => g.slug === slug).nichtEnthalten?.length > 0, `${slug}: „nicht enthalten“ fehlt`);
// andere Gewerke unverändert
const bad = GEWERKE.find((g) => g.slug === "badsanierung");
ok(preisText(berechne(bad, 8, "bad")) === "14.340 – 19.500 €", "Bad 8 m² unverändert");
const san = GEWERKE.find((g) => g.slug === "sanierung-modernisierung");
ok(berechne(san, 80, "basis").art === "spanne", "Sanierung bleibt Spanne");
await vite.close();
console.log(fehler ? `${fehler} Fehler` : "✓ Rechner-Tests ok");
process.exit(fehler ? 1 : 0);
