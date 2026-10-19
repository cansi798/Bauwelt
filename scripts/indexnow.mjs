// SEO-/KI-Audit G4 (19.10.2026): Bing & IndexNow.
// Meldet nach jedem Deploy alle Adressen aus der Sitemap per IndexNow an Bing
// (und damit auch an ChatGPT-Suche/Copilot, die den Bing-Index nutzen) sowie Yandex, Seznam u. a.
//
// Aufruf: node scripts/indexnow.mjs <Website-Adresse>   (im Deploy-Workflow nach dem Deploy:
//                                                      liest die LIVE-Sitemap <Adresse>sitemap.xml)
//         node scripts/indexnow.mjs                     (lokal nach `astro build`: liest dist/sitemap.xml)
//         … --dry-run                                   (zeigt nur, was gemeldet würde)
//
// Solange die Seite unter *.github.io läuft (Vorschau), wird NICHTS gemeldet –
// erst nach dem Umzug auf www.bauwelt-handwerk.de (site in astro.config.mjs) startet es automatisch.
// Der Schlüssel liegt als public/<KEY>.txt und wird mit ausgeliefert.
import { readFileSync, existsSync } from "node:fs";

const KEY = "0e61224310f1c459bd5c437f8b32d779";
const dryRun = process.argv.includes("--dry-run");

const siteArg = process.argv.slice(2).find((a) => /^https?:\/\//.test(a));
let xml = "";
if (siteArg) {
  try {
    const res = await fetch(new URL("sitemap.xml", siteArg.endsWith("/") ? siteArg : siteArg + "/"));
    if (res.ok) xml = await res.text();
  } catch {}
} else if (existsSync("dist/sitemap.xml")) {
  xml = readFileSync("dist/sitemap.xml", "utf8");
}
if (!xml) {
  console.log("IndexNow: keine Sitemap gefunden – nichts gemeldet.");
  process.exit(0);
}
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) {
  console.log("IndexNow: Sitemap ist leer.");
  process.exit(0);
}

const first = new URL(urls[0]);
const host = first.host;
// Schlüsseldatei liegt im Wurzelverzeichnis der Website (base-Pfad beachten)
const basePath = first.pathname.replace(/[^/]*$/, ""); // z. B. "/Bauwelt/" oder "/"
const keyLocation = `${first.protocol}//${host}${basePath}${KEY}.txt`;

if (host.endsWith("github.io") && !process.argv.includes("--force")) {
  console.log(`IndexNow: Vorschau-Adresse (${host}) – keine Meldung. Startet automatisch nach dem Domain-Umzug.`);
  process.exit(0);
}

const body = { host, key: KEY, keyLocation, urlList: urls };
if (dryRun) {
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = angenommen, 202 = angenommen (Schlüssel wird noch geprüft)
  console.log(`IndexNow: ${urls.length} Adressen gemeldet → HTTP ${res.status}`);
} catch (e) {
  // Ein Fehler hier darf den Deploy nie scheitern lassen.
  console.log(`IndexNow: Meldung fehlgeschlagen (${e.message}) – nicht schlimm, Bing findet die Seite trotzdem.`);
}
