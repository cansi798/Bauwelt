// Rechner-Test (Fliesen-Spanne +1.000 €, Randfälle). Aufruf: node scripts/test-rechner.mjs (nach npm ci)
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
  ok(e.bis === e.von + 1000, `Fliesen ${t.id} ${menge}: bis ${e.bis} != von+1000`);
  ok(/^[\d.]+ – [\d.]+ €$/.test(preisText(e)), `Format ${preisText(e)}`);
}
ok(berechne(f, 25, "komfort").von === Math.round((500 + 25 * 75) * 1.19), "ca.-Preis 25 m² Fliesen");
// andere Gewerke unverändert
const bad = GEWERKE.find((g) => g.slug === "badsanierung");
ok(preisText(berechne(bad, 8, "bad")) === "14.340 – 19.500 €", "Bad 8 m² unverändert");
const san = GEWERKE.find((g) => g.slug === "sanierung-modernisierung");
ok(berechne(san, 80, "basis").art === "spanne", "Sanierung bleibt Spanne");
await vite.close();
console.log(fehler ? `${fehler} Fehler` : "✓ Rechner-Tests ok");
process.exit(fehler ? 1 : 0);
